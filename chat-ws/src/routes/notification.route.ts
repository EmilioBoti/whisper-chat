import { Router } from 'express'
import { requestFriendShip } from '../modules/notifcations/notification.controller.js'
import authMiddleware from '../middleware/auth.middleware.js'

const router = Router()

router.post('/friends/request', authMiddleware, requestFriendShip)

export default router
