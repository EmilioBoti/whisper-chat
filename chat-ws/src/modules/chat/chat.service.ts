import {
  upsertDirectChat,
  getUserChats,
  findChatMessages,
  storeMessage,
  updateMessageStatus,
} from './chat.repository.js'
import { internalErrorHandler } from '../../lib/errors/InternalErrorHandler.js'
import type { SimpleChat, ChatRoom } from '../../models/dto/chat.dto.js'
import { toSimpleChat, toListUserChat, toPaginatedMessages, toMessage } from '../../utils/mapers/chat.mapper.js'
import type { MessageDTO, MessageSentDTO, PaginatedMessages } from '../../models/dto/messange.dto.js'
import { MessageStatus } from '@prisma/client'

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

export const storeNewMessage = async (newMessage: MessageSentDTO): Promise<MessageDTO> => {
  try {
    return await storeMessage(newMessage.chatId, newMessage.senderId, newMessage.content).then((data) =>
      toMessage(data),
    )
  } catch (error) {
    throw internalErrorHandler(error)
  }
}

export const updateStatus = async (messageId: string, status: MessageStatus) => {
  try {
    await updateMessageStatus(messageId, status)
  } catch (error) {
    throw internalErrorHandler(error)
  }
}

export const acknowledgeMessageReceived = async (err: unknown, responseIds: string[]) => {
  try {
    /**
     * The message was not reached by the other side
     */
    if (err) throw err

    /**
     * The message was reached by the other side
     */
    await Promise.all(responseIds.map((id) => updateMessageStatus(id, MessageStatus.RECEIVED)))
  } catch (error) {
    console.error(error)
  }
}
