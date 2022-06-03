import mongoose from 'mongoose'
import slugGenerator from 'mongoose-slug-generator'

mongoose.plugin(slugGenerator)

const Schema = mongoose.Schema

const Product = new Schema({
	name: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
		min: 0,
	},
	image: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	slug: {
		type: String,
		slug: 'name',
		unique: true,
	},
})

export default mongoose.model('Products', Product)
