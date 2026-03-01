import { Router } from 'express'
import { createProfile, exploreNewUsers } from '../modules/user/user.controller.js'
import authMiddleware from 'src/middleware/auth.middleware.js'

const router = Router()

router.post('/create-profile', createProfile)
router.get('/public', authMiddleware, exploreNewUsers)

export default router
