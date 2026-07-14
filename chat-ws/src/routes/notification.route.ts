import { Router } from 'express'
import {
  requestUserFriendShip,
  updateFriendShipRequest,
  getUserNotifications,
} from '../modules/notifcations/notification.controller.js'
import authMiddleware from '../middleware/auth.middleware.js'

const router = Router()

router.get('/', authMiddleware, getUserNotifications)
router.patch('/friends/request/:id', authMiddleware, updateFriendShipRequest)
router.post('/friends/request', authMiddleware, requestUserFriendShip)

export default router
