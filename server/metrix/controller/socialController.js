const config = require('config')
const passport = require('passport')
const account = require('../../model/account')
const invite = require('../../model/invite')
const token = require('../../model/token')
const user = require('../../model/user')
const facebook = config.get('facebook')
const twitter = config.get('twitter')
const facebookstrategy = require('passport-facebook')
const twitterstrategy = require('@passport-js/passport-twitter')

// config passport
const FacebookStrategy = facebookstrategy.Strategy
const TwitterStrategy = twitterstrategy.Strategy

passport.serializeUser((user, done) => {
	done(null, user)
})
passport.deserializeUser((obj, done) => {
	done(null, obj)
})

if (process.env.FACEBOOK_APP_ID && process.env.FACEBOOK_APP_SECRET) {
	passport.use(
		new FacebookStrategy(
			{
				clientID: process.env.FACEBOOK_APP_ID,
				clientSecret: process.env.FACEBOOK_APP_SECRET,
				callbackURL: facebook.callback_url,
				profileFields: ['id', 'name', 'email'],
				enableProof: true,
				passReqToCallback: true
			},
			async function (req, accessToken, refreshToken, profile, done) {
				await handleCallback(req, profile, {access: accessToken, refresh: refreshToken}, done)
			}
		)
	)
}

if (process.env.TWITTER_API_KEY && process.env.TWITTER_API_SECRET) {
	passport.use(
		new TwitterStrategy(
			{
				consumerKey: process.env.TWITTER_API_KEY,
				consumerSecret: process.env.TWITTER_API_SECRET,
				callbackURL: twitter.callback_url,
				userProfileURL: 'https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true',
				passReqToCallback: true
			},
			async function (req, accessToken, refreshToken, profile, done) {
				await handleCallback(req, profile, {access: accessToken, refresh: refreshToken}, done)
			}
		)
	)
}

async function handleCallback(req, profile, tokens, done) {
	if (!profile) return done({message: 'Error getting profile.'})

	const provider = profile.provider
	const email = profile.emails[0]?.value
	const data = {
		name: profile?.name?.givenName || profile.username,
		email: email,
		...(provider === 'facebook' && {facebook_id: profile.id}),
		...(provider === 'twitter' && {twitter_id: profile.id})
	}

	let userData = await user.get({email: email, social: {provider: provider, id: profile.id}})

	if (req.session.signup && !req.session.invite && userData) {
		userData.accounts = await user.account({id: userData.id})

		if (!userData.accounts.find((x) => x.permission === 'owner')) {
			const accountData = await account.create()
			await user.account.add({id: userData.id, account: accountData.id, permission: 'owner'})
			await user.update({id: userData.id, account: accountData.id, data: {default_account: accountData.id}})
		}
	}

	if (req.session.invite) {
		const inviteData = await invite.get({id: req.session.invite})
		if (!inviteData) return done({message: 'Invalid invite. Please contact the account holder'})

		if (userData) {
			const social = {default_account: inviteData.account_id}
			social[`${provider}_id`] = profile.id
			await user.update({id: userData.id, account: userData.account_id, data: social})
		} else {
			userData = await user.create({user: data, account: inviteData.account_id})
		}

		await user.account.add({id: userData.id, account: inviteData.account_id, permission: inviteData.permission})
		await invite.update({id: req.session.invite, data: {used: true}})
	} else if (userData) {
		if (!userData[`${provider}_id`]) {
			const social = {}
			social[`${provider}_id`] = profile.id
			await user.update({id: userData.id, account: userData.account_id, data: social})
		}

		await token.save({provider: provider, data: tokens, user: userData.id})
		return done(null, profile)
	} else {
		const accountData = await account.create()
		userData = await user.create({user: data, account: accountData.id})
		await user.account.add({id: userData.id, account: accountData.id, permission: 'owner'})
	}
	await token.save({provider: provider, data: tokens, user: userData.id})
	done(null, profile)
}
