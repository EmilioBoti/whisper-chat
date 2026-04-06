import { upsertDirectChat, getUserChats, findChatMessages } from './chat.repository.js'
import { internalErrorHandler } from '../../lib/errors/InternalErrorHandler.js'
import type { SimpleChat, ChatRoom } from '../../models/dto/chat.dto.js'
import { toSimpleChat, toListUserChat, toPaginatedMessages } from '../../utils/mapers/chat.mapper.js'
import type { PaginatedMessages } from '../../models/dto/messange.dto.js'

export const findOrCreateDirectChat = async (userId: string, userBId: string): Promise<SimpleChat> => {
  try {
    const chat = await upsertDirectChat(userId, userBId)
    return toSimpleChat(chat)
  } catch (error) {
    throw internalErrorHandler(error)
  }
}

export const fetchUserChats = async (userId: string): Promise<ChatRoom[]> => {
  try {
    const chats = await getUserChats(userId)
    return toListUserChat(chats)
  } catch (error) {
    throw internalErrorHandler(error)
  }
}

export const fetchChatRoomMessage = async (id: string, limit?: number, cursor?: string): Promise<PaginatedMessages> => {
  try {
    const l = limit || 20
    const message = await findChatMessages(id, l, cursor)
    return toPaginatedMessages(message, l)
  } catch (error) {
    throw internalErrorHandler(error)
  }
}
