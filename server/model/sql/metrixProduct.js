const db = require('./knex')()
const { v4: uuidv4 } = require('uuid')

/*
 * product.create()
 * create a new product
 */

exports.create = async function ({ product }) {
	const data = {
		id: uuidv4(),
		name: product.name,
		description: product?.description,
		logo: product?.logo,
		team_id: product?.team_id,
		status: product?.status ?? 'active'
	}

	await db('product').insert(data)
	return data
}

/*
 * team.get()
 * get a team by id
 * will return the team on the specified account
 */

exports.get = async function ({ id, name, team_id, description, logo }) {
	const cols = ['id', 'name', 'team_id', 'description', 'logo']

	const data = await db('product')
		.select(cols)
		.where({
			...(id && { id: id }),
			...(name && { name: name }),
			...(team_id && { team_id: team_id }),
		})

	return id || name || team_id ? data[0] : data
}

/*
 * get all product by team id.
 * will return the team on the specified account
 */

exports.getAll = async function ({ id, name, team_id, description, logo }) {
	const cols = ['id', 'name', 'team_id', 'description', 'logo']

	const data = await db('product')
		.select(cols)
		.where({
			...(id && { id: id }),
			...(name && { name: name }),
			...(team_id && { team_id: team_id }),
		})

	return data
}
/*
 * team.delete()
 * delete team
 */

exports.delete = async function ({ id }) {
	return await db('product').del().where({ id: id })
}

//delete product with team id
exports.deleteWithTeam = async function ({ team_id }) {
	return await db('product').del().where({ team_id: team_id })
}

/*
 * team.update()
 * update the team 
 */

exports.update = async function ({ id, data }) {
	const team = { ...data }

	// update cols in user table?
	if (Object.keys(user).length) {
		await db('product')
			.update(team)
			.where({ id: id })
	}

	return data
}
