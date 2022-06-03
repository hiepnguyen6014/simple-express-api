import express from 'express'

import { ProductController } from '../controllers'
import { upload, auth } from '../middlewares'
import { ProductPayload } from '../payload'

const router = express.Router()

router.put('/:id', auth, ProductPayload.update(), ProductController.update)
router.get('/:id', auth, ProductPayload.getOne(), ProductController.getOne)
router.delete('/:id', auth, ProductPayload.delete(), ProductController.delete)

router.get('/', ProductController.getAll)
router.post('/', auth, upload, ProductPayload.create(), ProductController.create)

export default router
