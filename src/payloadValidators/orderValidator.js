import { check, param } from 'express-validator'

class orderValidator {
	getOne() {
		return [check('id').isMongoId().withMessage('id must be a mongo id')]
	}
	create() {
		return [
			check('total')
				.notEmpty()
				.withMessage('name is required')
				.matches('^[0-9]+(\\.[0-9]{1,2})?$')
				.withMessage('price must be a number greater than 0'),
			check('user').isMongoId().withMessage('user must be a mongo id'),
			check('products')
				.notEmpty()
				.withMessage('products is required')
				.isArray()
				.withMessage('products must be an array'),
			check('products.*.product')
				.notEmpty()
				.withMessage('products.product is required')
				.isMongoId()
				.withMessage('products.product must be a mongo id'),
			check('products.*.quantity')
				.notEmpty()
				.withMessage('products.quantity is required')
				.matches('^[0-9]+(\\.[0-9]{1,2})?$')
				.withMessage('products.*.quantity must be a number greater than 0'),
		]
	}

	update() {
		return []
	}

	delete() {
		return [param('id').isMongoId().withMessage('id must be a mongo id')]
	}
}

export default new orderValidator()
