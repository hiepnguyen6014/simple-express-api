import Order from '../models/Order'

class OrderServices {
	async getAll() {
		return await Order.find()
	}

	async getOne(id) {
		return await Order.findById(id)
	}

	async create(total, user, products) {
		return await Order.create({ total, user, products })
	}

	async delete(id) {
		return await Order.findByIdAndDelete(id)
	}
}

export default new OrderServices()
