import express from 'express'

import productController from '../controllers/productController'
import multer from '../middlewares/imageUpload'
import productValidator from '../payloadValidators/productValidator'
import authentication from '../middlewares/authentication'

const router = express.Router()

router.put('/:id', authentication, productValidator.update(), productController.update)
router.get('/:id', authentication, productValidator.getOne(), productController.getOne)
router.delete('/:id', authentication, productValidator.delete(), productController.delete)

router.get('/', productController.getAll)
router.post('/', authentication, multer, productValidator.create(), productController.create)

export default router
