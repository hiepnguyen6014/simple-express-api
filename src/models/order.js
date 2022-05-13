import mongoose from 'mongoose'

export default mongoose.model(
	'orders',
	mongoose.Schema({
		total: {
			type: Number,
			required: true,
			min: 0,
		},
		products: [
			{
				product: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Products',
					required: true,
				},
				quantity: {
					type: Number,
					required: true,
					min: 1,
				},
			},
		],
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Accounts',
			required: true,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
	})
)
