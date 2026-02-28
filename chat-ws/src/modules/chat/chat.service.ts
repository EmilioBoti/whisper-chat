import { upsertDirectChat, getUserChats } from './chat.repository.js'
import { internalErrorHandler } from '../../lib/errors/InternalErrorHandler.js'
import type { SimpleChat, UserChat } from '../../models/dto/chat.dto.js'
import { toSimpleChat, toListUserChat } from '../../utils/mapers/chat.mapper.js'

export const findOrCreateDirectChat = async (userId: string, userBId: string): Promise<SimpleChat> => {
  try {
    const chat = await upsertDirectChat(userId, userBId)
    return toSimpleChat(chat)
  } catch (error) {
    throw internalErrorHandler(error)
  }
}

export const fetchUserChats = async (userId: string): Promise<UserChat[]> => {
  try {
    const chats = await getUserChats(userId)
    return toListUserChat(chats)
  } catch (error) {
    throw internalErrorHandler(error)
  }
}
