const config = require('config')
const auth = require('../../model/auth')
const account = require('../../model/account')
const user = require('../../model/user')
const login = require('../../model/login')
const utility = require('../../helper/utility')
require('./socialController')

exports.signin = async function (req, res, next) {
	const data = req.body
	let userData,
		useEmail = false
	if (data.email) {
		useEmail = true
		data.provider = 'app'
		utility.validate(data, ['email', 'password'])
	} else {
		utility.validate(data, ['token'])
		const decode = auth.token.verify({token: data.token})
		data.provider = decode.provider
		data.provider_id = decode.provider_id
		data.email = decode.email
	}
	userData = useEmail ? await user.get({email: data.email}) : await user.get({social: {provider: data.provider, id: data.provider_id}})
	utility.assert(userData, 'Please enter the correct login details', 'email')
	if (useEmail) {
		const verified = await user.password.verify({id: userData.id, account: userData.account_id, password: data.password})
		utility.assert(verified, 'Please enter the correct login details', 'password')
	}
	const accountData = await account.get(userData.account_id)
	utility.assert(accountData?.active, 'Your account has been deactivated. Please contact support.')
	const log = await login.create({user: userData.id, req: req})
	const risk = await login.verify({user: userData.id, current: log})
	if (useEmail) {
		if (risk.level === 3 || userData.disabled) {
			await user.update({id: userData.id, account: userData.account_id, data: {disabled: true}})
			const msg = risk.level === 3 ? 'Your sign in attempt has been blocked due to suspicious activity. ' : 'Your account has been disabled due to suspicious activity. '
			return res.status(403).send({message: msg + 'Please check your email for further instructions.'})
		}
	}
	if (userData['2fa_enabled']) {
		const jwt = auth.token({data: {email: userData.email, provider: data.provider}, duration: 300})
		return res.status(200).send({'2fa_required': true, token: jwt})
	}
	return authenticate(req, res, userData, data)
}
