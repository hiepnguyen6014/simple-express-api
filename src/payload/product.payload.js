import { check, param } from 'express-validator'

class ProductPayload {
	getOne() {
		return [param('id').isMongoId().withMessage('id must be a mongo id')]
	}
	create() {
		return [
			check('name').notEmpty().withMessage('name is required'),
			check('price')
				.notEmpty()
				.withMessage('price is required')
				.matches('^[0-9]+(\\.[0-9]{1,2})?$')
				.withMessage('price must be a number greater than 0'),
			check('description').notEmpty().withMessage('description is required'),
		]
	}

	update() {
		return [
			check('name').notEmpty().withMessage('name is required'),
			check('price')
				.notEmpty()
				.withMessage('price is required')
				.matches('^[0-9]+(\\.[0-9]{1,2})?$')
				.withMessage('price must be a number greater than 0'),
			check('description').notEmpty().withMessage('description is required'),
		]
	}

	delete() {
		return [param('id').isMongoId().withMessage('id must be a mongo id')]
	}
}

export default new ProductPayload()
