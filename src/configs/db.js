import mongoose from 'mongoose'
require('dotenv').config()

const { MONGODB_CONNECTION } = process.env

export default async () => {
	try {
		await mongoose.connect(MONGODB_CONNECTION)
		console.log('Connect database success')
	} catch (err) {
		console.log("Can't connect database", err)
	}
}
