import { Router } from 'express'
import { authMiddleware } from '../middleware/auth.middleware.js'
import { getUserChats, openDirectChat } from '../modules/chat/chat.controller.js'

const router = Router()

router.get('/', authMiddleware, getUserChats)
router.post('/open/:userId', authMiddleware, openDirectChat)

export default router
