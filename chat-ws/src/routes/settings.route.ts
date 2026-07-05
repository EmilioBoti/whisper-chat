import { Router } from 'express'
import authMiddleware from '../middleware/auth.middleware.js'
import {
  getUserSettings,
  getNotificationSettings,
  updateNotificationSettings,
} from '../modules/settings/settings.controller.js'

const router = Router()

router.get('/', authMiddleware, getUserSettings)
router.get('/notifications', authMiddleware, getNotificationSettings)
router.patch('/notifications', authMiddleware, updateNotificationSettings)

export default router
