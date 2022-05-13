import { MulterError } from 'multer'
import accountRoute from './accountRoute'
import productRoute from './productRoute'
import orderRoute from './orderRoute'

function routes(app) {
	app.use('/api/account', accountRoute)
	app.use('/api/products', productRoute)
	app.use('/api/orders', orderRoute)

	app.get((req, res) => {
		res.status(404).json({ status: 'error', message: 'not found 404' })
	})

	app.use((err, req, res, next) => {
		if (err instanceof MulterError) {
			res.status(500).json({ status: 'error', message: err })
		} else {
			res.status(500).json({ status: 'error', message: err.message })
		}
	})
}

export default routes
