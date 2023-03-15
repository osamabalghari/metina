const config = require('config')
const domain = config.get('domain')
const permissions = config.get('permissions')
const user = require('../model/user')
const auth = require('../model/auth')
const invite = require('../model/invite')
const account = require('../model/account')
const mail = require('../helper/mail')
const speakeasy = require('speakeasy')
const randomstring = require('randomstring')
const qrcode = require('qrcode')
const Cryptr = require('cryptr')
const crypto = new Cryptr(process.env.CRYPTO_SECRET)
const token = require('../model/token')
const utility = require('../helper/utility')
const authController = require('../controller/authController')

/*
 * user.create()
 * create a new user
 */

exports.create = async function (req, res) {
	const data = req.body,
		hasPassword = false
	utility.validate(data, ['name', 'email', 'password'])

	// confirm_password field is a dummy field to prevent bot signups
	if (req.body.hasOwnProperty('confirm_password') && req.body.confirm_password) throw {message: 'Registration denied'}

	// check the invite is valid
	const inviteData = await invite.get({id: data.invite_id, email: data.email})
	utility.assert(inviteData, 'Invalid invite. Please contact the account holder')
	console.log('inviteData=============', inviteData)
	// check if the user already exists
	let userData = await user.get({email: data.email})

	if (userData) {
		// user is already on this account
		const userAccounts = await user.account({id: userData.id})
		const registered = userAccounts.find((x) => x.id === inviteData.account_id)
		utility.assert(!registered, `You're already registered`)

		if (userData.account_id === inviteData.account_id) throw {message: "You're already registered"}

		// user already owns a child account, verify password
		const verified = await user.password.verify({id: userData.id, account: userData.account_id, password: data.password})
		utility.assert(verified, 'You already have an account registered with this email address. Please enter your original password to continue.')

		// flag for authController to notify onboarding ui
		// that the users existing account was used
		req.body.duplicate_user = true
		req.body.account_id = inviteData.account_id
		req.body.has_password = userData.has_password

		// save the new password if it exists and user doesn't have one
		if (!req.body.has_password && req.body.password) await user.password.save({id: userData.id, password: req.body.password})
	} else userData = await user.create({user: data, account: inviteData.account_id})

	// add user to account and close invite
	const accountData = await account.get(inviteData.account_id)
	await user.account.add({id: userData.id, account: inviteData.account_id, permission: inviteData.permission})
	await invite.update({id: data.invite_id, data: {used: true}})

	// send welcome email to user
	await mail.send({
		to: userData.email,
		template: req.body.duplicate_user && req.body.has_password ? 'duplicate-user' : 'new-user',
		content: {name: userData.name}
	})

	// notify account owner
	await mail.send({
		to: accountData.owner_email,
		template: 'invite-accepted',
		content: {
			name: accountData.owner_name,
			friend: userData.name
		}
	})

	// authenticate the user
	console.log(`✅ User created: ${userData.email}`)
	return authController.signup(req, res)
}

/*
 * user.get()
 * get a single user
 */

exports.get = async function (req, res) {
	const id = req.params.id || req.user
	utility.assert(id, 'Please log in or specify a user ID')

	const userData = await user.get({id: id, account: req.account})
	userData.accounts = await user.account({id: id})

	if (req.permission === 'owner') {
		const accountData = await account.get(req.account)
		userData.account_name = accountData.name
	}

	return res.status(200).send({data: userData})
}

/*
 * user.update()
 * update a user profile
 * handles permission checks
 */

exports.update = async function (req, res) {
	let data = req.body,
		accountName
	let msg = req.body.id ? 'User updated' : 'Profile updated'
	const authError = {message: 'You do not have permission to perform this action. Please contact the account owner'}

	const userId = req.body.id || req.user
	utility.assert(userId, 'Please provide a user ID')

	const userData = await user.get({id: userId, account: req.account})
	utility.assert(userData, 'Profile does not exist')

	// if changing email - check if it's already used
	if (data.hasOwnProperty('email') && data.email !== userData.email) {
		const exists = await user.get({email: data.email})
		if (exists) throw {inputError: 'email', message: 'This email address is already registered'}
	}

	// prevent permission injections
	if (data.hasOwnProperty('permission') && data.permission !== userData.permission) {
		// account owners can not adjust their own permission level
		if (userData.permission === 'owner' && req.permission === 'owner') throw {message: 'You can not change your own permission level'}

		// master accounts can not be downgraded
		if (userData.permission === 'master' && req.permission === 'master') throw {message: 'You can not change your own permission level'}

		// prevent escalating to owner/master
		if (data.permission === 'owner' || data.permission === 'master') throw authError

		// admins can not downgrade another admin account
		if (req.permission === 'admin' && userData.permission === 'admin' && data.permission !== 'admin') throw authError

		// users can not edit their own permission
		if (data.permission !== 'user' && req.permission === 'user') throw authError
	}

	// only account owners can edit their own account
	if (userData.permission === 'owner' && req.permission !== 'owner') throw authError

	if (data.support_enabled) {
		msg = 'Support access updated'
		data.support_enabled = data.support_enabled === 'Yes' ? true : false
	}

	// only owner can update account name
	if (data.account_name && req.permission === 'owner') {
		accountName = data.account_name
		await account.update({id: req.account, data: {name: data.account_name}})
		delete data.account_name
	}

	// update the user
	data = await user.update({id: userId, account: req.account, data: data})

	// format data for client
	if (accountName) data.account_name = accountName
	return res.status(200).send({message: msg, data: data})
}

/*
 * user.password()
 * update password or create a new one if signed in via social
 */

exports.password = async function (req, res) {
	const data = req.body
	let userData

	// update an existing password
	if (data.has_password) {
		// verify old password
		utility.validate(data, ['oldpassword'])
		userData = await user.password.verify({id: req.user, account: req.account, password: req.body.oldpassword})
		utility.assert(userData, 'Please enter the correct password', 'oldpassword')
	} else {
		userData = await user.get({id: req.user})
	}

	utility.validate(data, ['newpassword'])

	// all ok - save the password
	await user.password.save({id: req.user, password: data.newpassword})

	// notify user
	await mail.send({
		to: userData.email,
		template: 'password-updated',
		content: {name: userData.name}
	})

	return res.status(200).send({message: 'Your new password has been saved'})
}

/*
 * user.password.reset()
 * reset the password
 */

exports.password.reset = async function (req, res) {
	const data = req.body
	utility.validate(data, ['email', 'jwt', 'password'])

	// verify the user exists
	const userData = await user.get({email: data.email})

	if (userData) {
		// verify the token
		const hash = await user.password({id: userData.id, account: userData.account_id})
		const token = auth.token.verify({token: req.body.jwt, secret: hash.password})

		// check ids match
		if (token.user_id !== userData.id) throw {message: 'Please enter the correct email address'}

		if (token) {
			// save new password and notify the user
			await user.password.save({id: userData.id, password: data.password})
			await mail.send({
				to: userData.email,
				template: 'password-updated',
				content: {
					token: token
				}
			})

			// authenticate user
			return authController.signin(req, res)
		}
	}

	return res.status(401).send({message: 'Your password reset request has been denied'})
}

/*
 * user.password.reset.request()
 * request a password reset
 */

exports.password.reset.request = async function (req, res) {
	const data = req.body
	utility.validate(data, ['email'])

	// check the user exists
	const userData = await user.get({email: data.email})

	if (userData) {
		// generate a JWT and sign it with the current
		// hashed password set to expire in 5 minutes
		const hash = await user.password({id: userData.id, account: userData.account_id})
		const token = auth.token({data: {timestamp: Date.now(), user_id: userData.id}, secret: hash.password, duration: 300})

		// trigger a reset password email
		await mail.send({
			to: data.email,
			template: 'password-reset',
			content: {
				token: token,
				domain: utility.validateNativeURL(data.resetpassword_view_url) || `${domain}/resetpassword`
			}
		})
	}

	// don't return any indication if the account exists or not
	return res.status(200).send({message: 'Please check your email for further instructions'})
}

/*
 * user.2fa()
 * enable 2fa for the user
 * generate a secret/qr code
 */

exports['2fa'] = async function (req, res) {
	const data = req.body
	utility.validate(data)

	// user enabled 2fa
	if (data['2fa_enabled']) {
		// generate a secret and qr code
		const secret = speakeasy.generateSecret({length: 32, name: process.env.APP_NAME})
		await user.update({id: req.user, account: req.account, data: {'2fa_secret': crypto.encrypt(secret.base32)}})
		data.qr_code = await qrcode.toDataURL(secret.otpauth_url)
		data.otpauth = secret.otpauth_url
	} else {
		// disable it
		await user.update({
			id: req.user,
			account: req.account,
			data: {
				'2fa_enabled': false,
				'2fa_secret': null,
				'2fa_backup_code': null
			}
		})
	}

	res.status(200).send({data: data})
}

/*
 * user.2fa()
 * verify the users code and generate backup code
 */

exports['2fa'].verify = async function (req, res) {
	const data = req.body
	utility.validate(data, ['code'])

	const secret = await user['2fa'].secret({id: req.user})

	// verify the secret
	const verified = speakeasy.totp.verify({secret: secret, encoding: 'base32', token: req.body.code.replace(/\s+/g, '')})
	utility.assert(verified, 'Invalid verification code. Please try again')

	// secret was ok, enable 2fa and return backup code
	const backupCode = randomstring.generate({length: 12})
	await user.update({id: req.user, account: req.account, data: {'2fa_enabled': true}})
	await user['2fa'].backup.save({id: req.user, code: backupCode})

	res.status(200).send({data: {backup_code: backupCode}})
}

/*
 * user.delete()
 * un-assign/delete the user
 */

exports.delete = async function (req, res) {
	const id = req.params.id || req.user
	utility.assert(id, 'Please provide a user ID')

	const userData = await user.get({id: id, account: req.account})
	utility.assert(userData, 'User does not exist')

	// owner is attempting to delete their own account
	if (req.permission === 'owner' && req.user === userData.id) throw {message: 'Please close your own account using the profile page.'}

	if (req.permission === 'admin' && req.user === userData.id && req.body.id) throw {message: 'You can not delete yourself, please contact the account owner.'}

	if (userData.permission === 'owner') return res.status(403).send({message: 'Account owners cannot be deleted.'})

	// user is closing their own account - force delete
	if (userData.id === req.user) {
		await user.delete({id: userData.id, account: req.account})
		await user.account.delete({id: userData.id, account: req.account})
		return res.status(200).send()
	}

	// owner/admin is deleting a user
	// un-assign user if attached multiple accounts, delete if only on one account
	const userAccounts = await user.account({id: userData.id})
	await token.delete({user: userData.id})

	// user is on multiple accounts
	if (userAccounts.length > 1) {
		// if this account is the user's default account
		// update to prevent a redundant default
		if (userData.default_account === req.account) {
			userAccounts.splice(
				userAccounts.findIndex((x) => x.id === req.account),
				1
			)
			await user.update({id: userData.id, account: req.account, data: {default_account: userAccounts[0].id}})
		}
	} else {
		// delete the user entirely
		await user.delete({id: userData.id, account: req.account})
	}

	await user.account.delete({id: userData.id, account: req.account}) // un-assign user from this account
	return res.status(200).send({message: 'User deleted'})
}

/*
 * user.permissions()
 * return available user permissions
 */

exports.permissions = async function (req, res) {
	let perms = {...permissions}

	Object.keys(perms).map((perm) => {
		if (perm === 'master') delete perms[perm]
	})

	return res.status(200).send({data: perms})
}

/*
 * user.accounts()
 * return accounts this user belongs to
 */

exports.account = async function (req, res) {
	const data = await user.account({id: req.user})
	res.status(200).send({data: data})
}
