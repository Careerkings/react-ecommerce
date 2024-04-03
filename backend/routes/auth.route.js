import express from 'express'
import { googleRouter, signinRouter,  signupRouter } from '../controllers/auth.controller.js'

const router = express.Router()

router.post('/signup', signupRouter)
router.post('/signin', signinRouter)
router.post('/google', googleRouter)


export default router

