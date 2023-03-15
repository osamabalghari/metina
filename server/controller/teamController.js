const config = require('config')
const team = require('../model/metrixTeam')
const Cryptr = require('cryptr')
const utility = require('../helper/utility')
const authController = require('../controller/authController')
const user = require('../model/user')
const product = require('../model/metrixProduct')
const s3 = require('../helper/s3')
const teamMembers = require('../model/metrixTeamMembers')
const auth = require('../model/auth')
/*
 * team.create()
 * create a new user
 */

exports.create = async function (req, res) {
	const data = req.body
	// utility.validate(data, ['name', 'logo'])
	let logo
	if (req?.files?.length) {
		for (file of req.files) {
			logo = await s3.uploadImage({bucket: process.env.AWS_S3_BUCKET, file: file})
		}
	}
	// check the invite is valid
	// const inviteData = await invite.get({id: data.invite_id, email: data.email})
	// utility.assert(inviteData, 'Invalid invite. Please contact the account holder')

	// check if the user already exists
	let teamData = await team.get({name: data.name})
	if (teamData.length) {
		// team is already exist
		utility.assert(!teamData, `Team with this name already exist`)
	} else {
		console.log('data?.members', data?.members)
		let members = data?.members ? JSON?.parse(data?.members) : []
		teamData = await team.create({team: {name: data.name, description: data.description, user_id: data?.user_id && data?.user_id, image: logo?.Key}})
		for (let i = 0; i < members?.length; i++) {
			await teamMembers.create({teamMember: {team_id: teamData.id, user_id: members[i]}})
		}

		console.log(`✅ Team created: ${teamData?.name}`)
		return res.status(200).send({data: teamData})
	}
}

/*
 * team.get()
 * get team with id
 */

exports.get = async function (req, res) {
	const id = req.params.id
	utility.assert(id, 'Please log in or specify a user ID')

	const teamData = await team.get({id: id})

	return res.status(200).send({data: teamData})
}

/*
 * team.getAll()
 * get team with id
 */

exports.getAll = async function (req, res) {
	const currentUser = await auth.getUserFromToken(req)
	let teamData = currentUser?.permission == 'user' ? await team.getAll({user_id: currentUser?.userId}) : await team.getAll({})
	console.log('teamData======', teamData)
	for (let i = 0; i < teamData.length; i++) {
		teamData[i].products = await product.getAll({team_id: teamData[i].id})
		if (teamData[i].user_id) {
			teamData[i].user_id = await user.get({id: teamData[i].user_id})
			teamData[i].teamMembers = await teamMembers.getAll({team_id: teamData[i].id})
		}
	}

	// permission: 'owner'
	const allUsers = await user.get({})
	return res.status(200).send({data: {team: teamData, allUsers: allUsers}})
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
	let logo
	if (req?.files?.length) {
		for (file of req.files) {
			logo = await s3.uploadImage({bucket: process.env.AWS_S3_BUCKET, file: file})
		}
	}

	const id = req.params.id
	utility.assert(id, 'Please provide a user ID')

	const getTeam = await team.get({id: id})
	utility.assert(getTeam, 'Team does not exist')

	logo?.Key && (await s3.delete({bucket: process.env.AWS_S3_BUCKET, filename: getTeam.image}))
	const teamData = await team.update({id: id, data: {...data, image: logo?.Key ? logo?.Key : getTeam.image}})
	const userData = await user.get({id: teamData?.user_id})
	return res.status(200).send({message: msg, data: {...teamData, user_id: userData}})
}

/*
 * delete team
 * delete team by id
 */

exports.deleteTeam = async function (req, res) {
	const id = req.params.id
	let getTeam = await team.get({id: id})
	getTeam?.image && (await s3.delete({bucket: process.env.AWS_S3_BUCKET, filename: getTeam?.image}))
	await product.deleteWithTeam({team_id: id})
	let teamData = await team.delete({id: id})

	return res.status(200).send({message: 'Team deleted successfully', data: teamData})
}
