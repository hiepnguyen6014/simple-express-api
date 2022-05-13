import express from 'express'

import orderController from '../controllers/orderController'
import orderValidator from '../payloadValidators/orderValidator'
import authentication from '../middlewares/authentication'

const router = express.Router()

router.get('/:id', authentication, orderValidator.getOne(), orderController.getOne)
router.put('/:id', authentication, orderValidator.update(), orderController.update)
router.delete('/:id', authentication, orderValidator.delete(), orderController.delete)

router.get('/', orderController.getAll)
router.post('/', authentication, orderValidator.create(), orderController.create)

export default router
