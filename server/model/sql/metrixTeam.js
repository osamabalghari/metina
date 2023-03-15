const db = require('./knex')()
const { v4: uuidv4 } = require('uuid')

/*
 * team.create()
 * create a new team
 */

exports.create = async function ({ team }) {
	const data = {
		id: uuidv4(),
		name: team.name,
		description: team.description,
		members: team.members,
		image: team.image,
		user_id: team.user_id
	}

	await db('team').insert(data)
	return data
}

/*
 * team.get()
 * get a team by id
 * will return the team on the specified account
 */

exports.get = async function ({ id, name, user_id, description, members, image }) {
	const cols = ['id', 'name', 'user_id', 'description', 'members', 'image']

	const data = await db('team')
		.select(cols)
		.where({
			...(id && { id: id }),
			...(name && { name: name }),
		})

	return id ? data [0]: data
}


//get all teams
exports.getAll = async function () {
	const cols = ['id', 'name', 'user_id', 'description', 'members', 'image']

	const data = await db('team')
		.select(cols)

	return  data
}

/*
 * team.delete()
 * delete team
 */

exports.delete = async function ({ id }) {
	return await db('team').del().where({ id: id })
}

/*
 * team.update()
 * update the team 
 */

exports.update = async function ({ id, data }) {
	const team = { ...data }
	const cols = ['id', 'name', 'user_id', 'description', 'members', 'image']
	// update cols in user table?
	if (Object.keys(team).length) {
		await db('team')
			.update(team)
			.where({ id: id })
	}

	const updateData = await db('team')
		.select(cols)
		.where({
			...(id && { id: id }),
		})

	return updateData[0]
}
