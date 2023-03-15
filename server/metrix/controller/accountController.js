const config = require('config')
const account = require('../../model/account')
const user = require('../../model/user')
const mail = require('../../helper/mail')
const utility = require('../../helper/utility')
const authController = require('../../controller/authController')

exports.create = async function (req, res) {
	const data = req.body
	utility.validate(data, ['email', 'name', 'password'])
	if (data.hasOwnProperty('confirm_password') && data.confirm_password) throw {message: 'Registration denied'}
	let userData = await user.get({email: data.email})
	if (userData) {
		const userAccounts = await user.account({id: userData.id})
		const ownerAccount = userAccounts.find((x) => x.permission === 'owner')
		utility.assert(!ownerAccount, 'You have already registered an account')
		const verified = await user.password.verify({id: userData.id, account: userData.account_id, password: data.password})
		utility.assert(verified, 'You already have an account registered with this email address. Please enter your original password to continue.')
		req.body.duplicate_user = true
		req.body.has_password = userData.has_password
		if (!req.body.has_password && req.body.password) await user.password.save({id: userData.id, password: req.body.password})
	}
	const accountData = await account.create(data.plan)
	req.body.account_id = accountData.id
	userData = !userData ? await user.create({user: data, account: accountData.id}) : userData
	await user.account.add({id: userData.id, account: accountData.id, permission: 'owner'})
	await res.status(200).json({data: userData})
	console.log(`✅ Account created for: ${data.email}`)
}
