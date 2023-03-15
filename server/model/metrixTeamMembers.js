const db = require('./knex')()
const { v4: uuidv4 } = require('uuid')

/*
 * team.create()
 * create a new team member
 */

exports.create = async function ({ teamMember }) {
	const data = {
		id: uuidv4(),
		team_id: teamMember.team_id,
		user_id: teamMember.user_id,
	}

	await db('team_members').insert(data)
	return data
}

/*
 * team.get()
 * get a team member by id
 * will return the team on the specified account
 */

exports.get = async function ({ id, user_id, team_id }) {
	const cols = ['id', 'user_id', 'team_id']

	const data = await db('team_members')
		.select(cols)
		.where({
			...(id && { id: id }),
			...(user_id && { user_id: user_id }),
			...(team_id && { team_id: team_id }),
		})

	return data
}

exports.getAll = async function ({ id, user_id, team_id }) {
	const cols = ['id', 'user_id', 'team_id']

	let data = await db('team_members')
		.select(cols)
		.where({
			...(id && { id: id }),
			...(user_id && { user_id: user_id }),
			...(team_id && { team_id: team_id }),
		})

	for (let i = 0; i < data.length; i++) {
		let user =  await db('user').select(['id', 'name', 'email']).where({ id: data[i].user_id })
		data[i].user =user[0]
	}
	return data
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

	// update cols in user table?
	if (Object.keys(user).length) {
		await db('team')
			.update(team)
			.where({ id: id })
	}

	return data
}
