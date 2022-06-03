import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import Account from '../models/Account'

const { SECRET_KEY_JWT } = process.env

class AccountServices {
	async createToken(id) {
		return jwt.sign({ _id: id }, SECRET_KEY_JWT)
	}

	async authorize(token) {
		const decoded = jwt.verify(token, SECRET_KEY_JWT)

		console.log(decoded)

		return Account.findById(decoded._id).then((account) => {
			if (!account) {
				return false
			}
			return account
		})
	}

	async isExist(email) {
		return Account.findOne({ email }).then((account) => {
			if (account) {
				return true
			}
			return false
		})
	}

	async create(email, password) {
		const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10))

		return await Account({
			email,
			password: hash,
		})
			.save()
			.then((account) => {
				return account
			})
	}

	async findOne(email) {
		return Account.findOne({ email }).then((account) => {
			if (account) {
				return account
			}
			return null
		})
	}
}

export default new AccountServices()
