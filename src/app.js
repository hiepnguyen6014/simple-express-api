import express from 'express'
import morgan from 'morgan'
import path from 'path'
import cors from 'cors'
import rateLimit from 'express-rate-limit'

import database from './configs/db'
import routes from './routes'
database()

const app = express()

app.use(
	rateLimit({
		windowMs: 15 * 60 * 1000, // 15 minutes
		max: 100, // 100 requests
	})
)
app.use(morgan('short'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '..', 'public')))

routes(app)

const { PORT } = process.env || 3000

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`)
})
