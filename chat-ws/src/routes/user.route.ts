import { Router } from 'express'
import { authMiddleware } from '../middleware/auth.middleware.js'
import UserController from '../modules/user/user.controller.js'

const router = Router()

router.post('/create-profile', authMiddleware, UserController.createProfile)

export default router