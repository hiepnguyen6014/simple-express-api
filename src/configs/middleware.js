import rateLimit from 'express-rate-limit'
import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import path from 'path'
import cors from 'cors'

dotenv.config()

const rateLimitOptions = {
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // 100 requests
}

export default (app) => {
	app.use(rateLimit(rateLimitOptions))
	app.use(morgan('short'))
	app.use(cors())
	app.use(express.json())
	app.use(express.urlencoded({ extended: true }))
	app.use(express.static(path.join(__dirname, '../../public')))
}
