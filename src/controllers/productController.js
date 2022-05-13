import { validator, deleteFile } from '../utils'
import productRepos from '../repos/productRepos'

class ProductController {
	// [GET] /api/products
	async getAll(req, res) {
		const products = await productRepos.getAll()

		res.header('Content-Type', 'application/json')
		res.status(200)
		res.json({
			status: true,
			data: products,
		})
	}

	// [GET] /api/products/:id
	async getOne(req, res) {
		const isValid = await validator(req)
		if (isValid !== true) {
			res.header('Content-Type', 'application/json')
			res.status(400)
			return res.json({ status: false, message: isValid })
		}

		const { id } = req.params

		const product = await productRepos.getOne(id)

		if (!product) {
			res.header('Content-Type', 'application/json')
			res.status(400)
			return res.json({ status: false, message: 'product not found' })
		}

		res.header('Content-Type', 'application/json')
		res.status(200)
		res.json({
			status: true,
			data: product,
		})
	}

	// [POST] /api/products
	async create(req, res) {
		const isValid = await validator(req)
		if (isValid !== true) {
			res.header('Content-Type', 'application/json')
			res.status(400)
			return res.json({ status: false, message: isValid })
		}

		if (!req.file) {
			res.header('Content-Type', 'application/json')
			res.status(400)
			return res.json({ status: false, message: 'image not found' })
		}

		const { filename } = req.file
		const { name, price, description } = req.body

		const product = await productRepos.create(name, price, description, filename)

		if (!product) {
			res.header('Content-Type', 'application/json')
			res.status(400)
			return res.json({ status: false, message: 'product not created' })
		}

		res.header('Content-Type', 'application/json')
		res.status(201)
		res.json({
			status: 'success',
			data: product,
		})
	}

	// [PUT] /api/products/:id
	async update(req, res) {
		const isValid = await validator(req)
		if (isValid !== true) {
			res.header('Content-Type', 'application/json')
			res.status(400)
			return res.json({ status: false, message: isValid })
		}

		const { id } = req.params
		const { name, price, description } = req.body

		const product = await productRepos.getOne(id)

		if (!product) {
			res.header('Content-Type', 'application/json')
			res.status(400)
			return res.json({ status: false, message: 'product not found' })
		}

		const updatedProduct = await productRepos.update(id, name, price, description)

		if (!updatedProduct) {
			res.header('Content-Type', 'application/json')
			res.status(400)
			return res.json({ status: false, message: 'product not updated' })
		}

		res.header('Content-Type', 'application/json')
		res.status(200)
		res.json({
			status: true,
			data: updatedProduct,
		})
	}

	// [DELETE] /api/products/:id
	async delete(req, res) {
		const idValid = await validator(req)
		if (idValid !== true) {
			res.header('Content-Type', 'application/json')
			res.status(400)
			return res.json({ status: false, message: idValid })
		}

		const { id } = req.params

		const product = await productRepos.delete(id)
		const image = product.image

		if (!image) {
			res.header('Content-Type', 'application/json')
			res.status(400)
			return res.json({ status: false, message: 'product not exist' })
		}

		const deleteImage = await deleteFile(image)

		// one in a blue moon
		if (!deleteImage) {
			res.header('Content-Type', 'application/json')
			res.status(400)
			return res.json({ status: false, message: 'image not deleted' })
		}

		res.header('Content-Type', 'application/json')
		res.status(200)
		res.json({
			status: true,
			data: product,
			message: 'product deleted',
		})
	}
}

export default new ProductController()
