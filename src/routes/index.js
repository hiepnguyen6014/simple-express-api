import accountRoute from './account.route'
import productRoute from './product.route'
import orderRoute from './order.route'

export const setRoutes = (app) => {
	app.use('/api/account', accountRoute)
	app.use('/api/products', productRoute)
	app.use('/api/orders', orderRoute)

	app.get((req, res) => {
		res.status(404).json({ status: 'error', message: 'not found 404' })
	})

	app.use((err, req, res, next) => {
		res.status(500).json({ status: 'error', message: err.message })
	})
}
