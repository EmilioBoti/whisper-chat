import { Router } from 'express'
import { createProfile, exploreNewUsers, getUserFriendsController } from '../modules/user/user.controller.js'
import authMiddleware from '../middleware/auth.middleware.js'

const router = Router()

router.post('/create-profile', createProfile)
router.get('/friends', authMiddleware, getUserFriendsController)
router.get('/public', authMiddleware, exploreNewUsers)

export default router
