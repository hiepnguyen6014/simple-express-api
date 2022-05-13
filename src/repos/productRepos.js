import Product from '../models/product'

class productRepos {
	async getAll() {
		return await Product.find()
	}

	async getOne(id) {
		return await Product.findById(id)
	}

	async create(name, price, description, image) {
		return await Product.create({ name, price, description, image })
	}

	async delete(id) {
		return await Product.findByIdAndDelete(id)
	}

	async update(id, name, price, description) {
		return await Product.findByIdAndUpdate(id, { name, price, description }, { new: true })
	}
}

export default new productRepos()
