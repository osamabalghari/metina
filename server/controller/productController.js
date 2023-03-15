const config = require('config')
const product = require('../model/metrixProduct')
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
const authController = require('./authController')
const team = require('../model/metrixTeam')
const s3 = require('../helper/s3')
/*
 * team.create()
 * create a new user
 */

exports.create = async function (req, res) {
	const data = req.body
	// utility.validate(data, ['name', 'team_id', 'logo'])

	let logo
	if (req.files.length){
		for (file of req.files){
	
			logo= await s3.uploadImage({ bucket: process.env.AWS_S3_BUCKET, file: file });
	
		}
	}
	// check the invite is valid
	// const inviteData = await invite.get({id: data.invite_id, email: data.email})
	// utility.assert(inviteData, 'Invalid invite. Please contact the account holder')

	// check if the user already exists
	let productData = await product.get({ name: data.name, team_id: data.team_id })
	if (productData) {
		// product is already exist
		utility.assert(!productData, `Product with this name already exist`)
	} else {
		s3.upload
		productData = await product.create({ product: {...data, logo: logo.Key} })
		let teamData = await team.get({id: productData?.team_id})
		productData.team_id = teamData
		console.log(`✅ Product created: ${productData?.name}`)
		return res.status(200).send({ data: productData })
	}
}

/*
 * product.get()
 * get product with id
 */

exports.get = async function (req, res) {
	const id = req.params.id
	utility.assert(id, 'Please log in or specify a user ID')

	const productData = await product.get({ id: id })

	return res.status(200).send({ data: productData })
}

/*
 * productAll.get()
 * get product with id
 */

exports.getAll = async function (req, res) {
	const id = req.params.id
	utility.assert(id, 'Please log in or specify a user ID')
	let productData = await product.getAll({ team_id: id })
	let teamData = await team.get({id:id})
	for(let i=0; i<productData.length; i++){
		productData[0].team_id = teamData
	}
	
	return res.status(200).send({ data: productData })
}

/*
 * user.update()
 * update a user profile
 * handles permission checks
 */

exports.update = async function (req, res) {
	let data = req.body,
		accountName
	let msg = 'Team updated'
	const authError = { message: 'You do not have permission to perform this action. Please contact the account owner' }

	const userId = req.body.id || req.user
	utility.assert(userId, 'Please provide a user ID')

	const userData = await team.get({ id: userId, account: req.account })
	utility.assert(userData, 'Profile does not exist')

	// if changing email - check if it's already used
	if (data.hasOwnProperty('email') && data.email !== userData.email) {
		const exists = await user.get({ email: data.email })
		if (exists) throw { inputError: 'email', message: 'This email address is already registered' }
	}

	// prevent permission injections
	if (data.hasOwnProperty('permission') && data.permission !== userData.permission) {
		// account owners can not adjust their own permission level
		if (userData.permission === 'owner' && req.permission === 'owner') throw { message: 'You can not change your own permission level' }

		// master accounts can not be downgraded
		if (userData.permission === 'master' && req.permission === 'master') throw { message: 'You can not change your own permission level' }

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
		await account.update({ id: req.account, data: { name: data.account_name } })
		delete data.account_name
	}

	// update the user
	data = await user.update({ id: userId, account: req.account, data: data })

	// format data for client
	if (accountName) data.account_name = accountName
	const productData = await product.update({ id: id, data })
	return res.status(200).send({ message: msg, data: data })
}
