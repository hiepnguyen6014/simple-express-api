import express from 'express'

import { AccountController } from '../controllers'
import { AccountPayload } from '../payload'

const Router = express.Router()

Router.post('/register', AccountPayload.register(), AccountController.register)
Router.post('/login', AccountPayload.login(), AccountController.login)

export default Router
