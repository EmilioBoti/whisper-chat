import { Router } from "express"
import { signInUser, signUpUser, logoutUser } from "../modules/auth/auth.controller.ts"

const router = Router()

router.post('/signin', signInUser)
router.post('/signup', signUpUser)
router.post('/logout', logoutUser)

export default router
