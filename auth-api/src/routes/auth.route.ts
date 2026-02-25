import { Router } from "express"
import AuthController, { signInUser, signUpUser, logoutUser, refreshToken } from "../modules/auth/auth.controller.js"
import authMiddleware from "../middleware/auth.middleware.js"

const router = Router()

router.post('/signin', signInUser)
router.post('/signup', signUpUser)
router.post('/logout', authMiddleware, logoutUser)
router.post('/refresh', authMiddleware, refreshToken)
router.delete('/account', authMiddleware, AuthController.deleteUserAccount)

export default router
