import express from 'express'

import { OrderController } from '../controllers'
import { OrderPayload } from '../payload'
import { auth } from '../middlewares'

const router = express.Router()

router.get('/:id', auth, OrderPayload.getOne(), OrderController.getOne)
router.put('/:id', auth, OrderPayload.update(), OrderController.update)
router.delete('/:id', auth, OrderPayload.delete(), OrderController.delete)

router.get('/', OrderController.getAll)
router.post('/', auth, OrderPayload.create(), OrderController.create)

export default router
