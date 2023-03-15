const mongoose = require('mongoose')

exports.connect = async (settings) => {
	try {
		const url = `mongodb://${process.env.DB_USER}:${encodeURIComponent(process.env.DB_PASSWORD)}@${process.env.DB_HOST}/${process.env.DB_NAME}`
		//const url = 'mongodb://localhost:27017'
		await mongoose.connect(url)
		console.log('✅ Connected to Mongo')
	} catch (err) {
		console.error(err)
	}
}
