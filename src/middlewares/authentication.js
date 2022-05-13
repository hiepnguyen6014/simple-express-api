import accountRepos from '../repos/accountRepos'

const authentication = (req, res, next) => {
	//get Bearer token from header
	const bearerToken = req.headers.authorization
	if (!bearerToken) {
		res.header('Content-Type', 'application/json')
		res.status(403)
		return res.json({ status: false, message: 'token not found' })
	}

	//get token from header
	const token = bearerToken.split(' ')[1]
	if (!token) {
		res.header('Content-Type', 'application/json')
		res.status(403)
		return res.json({ status: false, message: 'token not found' })
	}

	//get user from token
	const id = accountRepos.authorize(token)
	if (!id) {
		res.header('Content-Type', 'application/json')
		res.status(403)
		return res.json({ status: false, message: 'token not found' })
	}

	next()
}

export default authentication
