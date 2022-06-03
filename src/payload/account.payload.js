import { body } from 'express-validator'

class AccountPayload {
	register() {
		return [
			body('email').isEmail().withMessage('Email is invalid or not provided with key email.'),
			body('password')
				.isLength({ min: 8, max: 20 })
				.withMessage(
					'Password must be at least 8 characters and less than 20 characters long.'
				),
		]
	}

	login() {
		return [
			body('email').isEmail().withMessage('Email is invalid or not provided with key email.'),
			body('password')
				.isLength({ min: 8, max: 20 })
				.withMessage(
					'Password must be at least 8 characters and less than 20 characters long.'
				),
		]
	}
}

export default new AccountPayload()
