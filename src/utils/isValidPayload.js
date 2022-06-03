import { validationResult } from 'express-validator'

export default async (req) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return errors.errors[0].msg
	} else {
		return true
	}
}
