import { Router } from 'express'
import { signInUser, signUpUser, logoutUser, refreshToken, deleteUserAccount } from '../modules/auth/auth.controller.js'
import authMiddleware from '../middleware/auth.middleware.js'

const router = Router()

router.post('/signin', signInUser)
router.post('/signup', signUpUser)
router.post('/logout', authMiddleware, logoutUser)
router.post('/refresh', authMiddleware, refreshToken)
router.delete('/account', authMiddleware, deleteUserAccount)

export default router
