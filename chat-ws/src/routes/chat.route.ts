import { Router } from 'express'
import { authMiddleware } from '../middleware/auth.middleware.js'
import { getUserChats, openChatMessage, createChatController } from '../modules/chat/chat.controller.js'

const router = Router()

router.get('/', authMiddleware, getUserChats)
router.post('/create/:type', authMiddleware, createChatController)
router.get('/:id', authMiddleware, openChatMessage)

export default router
