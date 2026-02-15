import { Router } from 'express'
import { authMiddleware } from '../middleware/auth.middleware.js'
import { ChatController } from '../modules/chat/chat.controller.js'

const router = Router()

router.post('/open/:userId', authMiddleware, ChatController.openDirectChat)

export default router