import type { Request, Response } from 'express'
import { findOrCreateDirectChat, fetchUserChats } from './chat.service.js'
import { BadRequestError } from '../../lib/errors/BadRequestError.js'

export const openDirectChat = async (req: Request, res: Response) => {
  const userId = req.params.userId as string
  const user = req.user
  if (!userId) {
    throw new BadRequestError('UserId is not been provided')
  }
  const chat = await findOrCreateDirectChat(user.userId, userId)

  return res.status(201).json({ ...chat })
}

export const getUserChats = async (req: Request, res: Response) => {
  const userId = req.user.userId
  const chats = await fetchUserChats(userId)
  return res.status(200).json([...chats])
}
