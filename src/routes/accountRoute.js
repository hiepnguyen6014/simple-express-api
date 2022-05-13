import express from 'express'

import accountController from '../controllers/accountController'
import validateAccount from '../payloadValidators/accountValidator'

const Router = express.Router()

Router.post('/register', validateAccount.register(), accountController.register)
Router.post('/login', validateAccount.login(), accountController.login)

export default Router
