import { Router } from "express"
import { signInUser, signUpUser, logoutUser, refreshToken } from "../modules/auth/auth.controller.ts"
import authMiddleware from "../middleware/auth.middleware.ts"

const router = Router()

router.post('/signin', signInUser)
router.post('/signup', signUpUser)
router.post('/logout', authMiddleware, logoutUser)
router.post('/refresh', authMiddleware, refreshToken)

export default router
