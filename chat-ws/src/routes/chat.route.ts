import { Router } from 'express'
import { authMiddleware } from '../middleware/auth.middleware.js'
import { ChatController } from '../modules/chat/chat.controller.js'

const router = Router()

router.get('/', authMiddleware, ChatController.getUserChats)
router.post('/open/:userId', authMiddleware, ChatController.openDirectChat)

export default router