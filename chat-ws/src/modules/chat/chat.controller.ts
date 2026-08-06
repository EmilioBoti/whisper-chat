import type { Request, Response } from 'express'
import { createNewChat, fetchUserChats, fetchChatRoomMessage } from './chat.service.js'
import { BadRequestError } from '../../lib/errors/BadRequestError.js'
import { CreatedChat, ParamsSchema } from '../../models/validationSchema/chat.validation.js'

export const createChatController = async (req: Request, res: Response) => {
  const user = req.user

  const type = ParamsSchema.safeParse(req.params.type)
  const data = CreatedChat.safeParse(req.body)

  if (data.error || type.error) throw new BadRequestError(data.error?.message || type.error?.message)

  const chat = await createNewChat(type.data, user.userId, data.data)

  return res.status(201).json(chat)
}

export const getUserChats = async (req: Request, res: Response) => {
  const userId = req.user.userId
  const chats = await fetchUserChats(userId)
  return res.status(200).json([...chats])
}

export const openChatMessage = async (req: Request, res: Response) => {
  const id = req.params.id
  const { limit, nextCursor } = req.query

  const chatId = id as string
  const cursor = nextCursor as string
  const smsLimit = Number(limit)

  if (!id) throw new BadRequestError('Chat id is not been provided')

  const chats = await fetchChatRoomMessage(chatId, smsLimit, cursor)

  return res.status(200).json(chats)
}
