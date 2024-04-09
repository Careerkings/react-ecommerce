import express from 'express'
import { createProductRouter, getProductRouter } from '../controllers/product.contoller.js'


const router = express.Router()

router.post('/create-product', createProductRouter)
router.get('/get-product', getProductRouter)

export default router