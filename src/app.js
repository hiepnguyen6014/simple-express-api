import express from 'express'

import { initDatabase, setMiddleware } from './configs'
import { setRoutes } from './routes'

const app = express()

setMiddleware(app)
initDatabase()
setRoutes(app)

const { PORT } = process.env || 3000

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`)
})
