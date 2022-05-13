import mongoose from 'mongoose'

export default mongoose.model(
	'Accounts',
	mongoose.Schema({
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
	})
)
