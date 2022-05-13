import bcrypt from 'bcrypt'

import isValidPayload from '../utils/validator'
import accountRepos from '../repos/accountRepos'

class accountController {
	// [POST] /api/account/register
	async register(req, res) {
		//check payload
		const isValid = await isValidPayload(req)
		if (isValid !== true) {
			res.header('Content-Type', 'application/json')
			res.status(400)
			return res.json({ status: true, message: isValid })
		}

		const { email, password } = req.body

		//check account exist
		const isExist = await accountRepos.isExist(email)
		if (isExist) {
			res.header('Content-Type', 'application/json')
			res.status(400)
			return res.json({ status: false, message: 'account already exist' })
		}

		//create account
		const account = await accountRepos.create(email, password)

		if (!account) {
			res.header('Content-Type', 'application/json')
			res.status(400)
			return res.json({ status: false, message: 'create account failed' })
		}

		const token = await accountRepos.createToken(account._id)

		res.header('Content-Type', 'application/json')
		res.status(201)
		return res.json({ status: true, token })
	}

	// [POST] /api/account/login
	async login(req, res) {
		//check payload
		const isValid = await isValidPayload(req)
		if (isValid !== true) {
			res.header('Content-Type', 'application/json')
			res.status(400)
			return res.json({ status: true, message: isValid })
		}
		const { email, password } = req.body

		//find account
		const account = await accountRepos.findOne(email)
		if (!account) {
			res.header('Content-Type', 'application/json')
			res.status(400)
			return res.json({ status: false, message: 'account not found' })
		}

		//check password
		const isMatch = bcrypt.compareSync(password, account.password)
		if (!isMatch) {
			res.header('Content-Type', 'application/json')
			res.status(400)
			return res.json({ status: false, message: 'wrong account' })
		}

		const token = await accountRepos.createToken(account._id)

		res.header('Content-Type', 'application/json')
		res.status(200)
		return res.json({ status: true, token })
	}
}

export default new accountController()
