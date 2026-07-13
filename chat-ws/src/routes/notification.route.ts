import { Router } from 'express'
import { requestFriendShip, updateFriendShipRequest } from '../modules/notifcations/notification.controller.js'
import authMiddleware from '../middleware/auth.middleware.js'

const router = Router()

router.patch('/friends/request/:id', authMiddleware, updateFriendShipRequest)
router.post('/friends/request', authMiddleware, requestFriendShip)

export default router
