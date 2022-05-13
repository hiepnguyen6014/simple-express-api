import { validator } from '../utils'
import orderRepos from '../repos/orderRepos'

class OrderController {
	// [GET] /api/orders
	async getAll(req, res) {
		const orders = await orderRepos.getAll()

		res.header('Content-Type', 'application/json')
		res.status(200)
		res.json({
			status: true,
			data: orders,
		})
	}

	// [GET] /api/orders/:id
	async getOne(req, res) {
		const isValid = await validator(req)
		if (isValid !== true) {
			res.header('Content-Type', 'application/json')
			res.status(400)
			return res.json({ status: false, message: isValid })
		}

		const { id } = req.params

		const order = await orderRepos.getOne(id)

		if (!order) {
			res.header('Content-Type', 'application/json')
			res.status(400)
			return res.json({ status: false, message: 'order not found' })
		}

		res.header('Content-Type', 'application/json')
		res.status(200)
		res.json({
			status: true,
			data: order,
		})
	}

	// [POST] /api/orders
	async create(req, res) {
		const isValid = await validator(req)
		if (isValid !== true) {
			res.header('Content-Type', 'application/json')
			res.status(400)
			return res.json({ status: false, message: isValid })
		}

		const { user, products, total } = req.body

		const order = await orderRepos.create(total, user, products)

		if (!order) {
			res.header('Content-Type', 'application/json')
			res.status(400)
			return res.json({ status: false, message: 'order not created' })
		}

		res.header('Content-Type', 'application/json')
		res.status(200)
		res.json({
			status: true,
			data: order,
		})
	}

	// [PUT] /api/orders/:id
	async update(req, res) {
		//
		res.header('Content-Type', 'application/json')
		res.status(200)
		res.json({
			status: true,
			data: 'order updated',
			message: 'no idea what to do here',
		})
	}

	// [DELETE] /api/orders/:id
	async delete(req, res) {
		const isValid = await validator(req)
		if (isValid !== true) {
			res.header('Content-Type', 'application/json')
			res.status(400)
			return res.json({ status: false, message: isValid })
		}

		const { id } = req.params

		const order = await orderRepos.getOne(id)

		if (!order) {
			res.header('Content-Type', 'application/json')
			res.status(400)
			return res.json({ status: false, message: 'order not found' })
		}

		const deletedOrder = await orderRepos.delete(id)

		if (!deletedOrder) {
			res.header('Content-Type', 'application/json')
			res.status(400)
			return res.json({ status: false, message: 'order not deleted' })
		}

		res.header('Content-Type', 'application/json')
		res.status(200)
		res.json({
			status: true,
			data: deletedOrder,
		})
	}
}

export default new OrderController()
