import { validationResult } from 'express-validator'

async function isValidPayload(req) {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return errors.errors[0].msg
	} else {
		return true
	}
}

export default isValidPayload
