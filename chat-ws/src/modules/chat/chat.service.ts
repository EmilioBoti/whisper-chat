import {
  upsertChat,
  getUserChats,
  findChatMessages,
  storeMessage,
  updateMessageStatus,
  findPendingMessage,
} from './chat.repository.js'
import { internalErrorHandler } from '../../lib/errors/InternalErrorHandler.js'
import type { NewChatSchema, ChatDto } from '../../models/dto/chat.dto.js'
import {
  toSimpleChat,
  toListUserChat,
  toPaginatedMessages,
  toMessage,
  toMessages,
} from '../../utils/mapers/chat.mapper.js'
import type { MessageDTO, MessageSentDTO, PaginatedMessages } from '../../models/dto/messange.dto.js'
import type { ChatType, MessageStatus } from '@prisma/client'
import { BadRequestError } from '../../lib/errors/BadRequestError.js'

const generateDirectKey = (userId: string, userBId: string): string => {
  return [userId, userBId].sort().join('_')
}

export const createNewChat = async (type: ChatType, userId: string, newChat: NewChatSchema): Promise<ChatDto> => {
  const member = newChat.members.filter((member) => member !== userId)

  if (member.length !== 1 || newChat.members.length < 2) throw new BadRequestError('It must be at least two members')

  const directKey = generateDirectKey(userId, member[0])
  const chatMembers = newChat.members.map((memberId) => ({ userId: memberId }))

  return await upsertChat(type, newChat.chatId, userId, chatMembers, directKey)
    .then((data) => toSimpleChat(data))
    .catch((error) => {
      throw internalErrorHandler(error)
    })
}

export const fetchUserChats = async (userId: string): Promise<ChatDto[]> => {
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

export const fetchPendingMessage = async (userId: string) => {
  try {
    const chats = await findPendingMessage(userId)
    return toMessages(chats)
  } catch (error) {
    throw internalErrorHandler(error)
  }
}

export const storeNewMessage = async (newMessage: MessageSentDTO): Promise<MessageDTO> => {
  try {
    return await storeMessage(newMessage.id, newMessage.chatId, newMessage.senderId, newMessage.content).then((data) =>
      toMessage(data),
    )
  } catch (error) {
    throw internalErrorHandler(error)
  }
}

export const updateStatus = async (messageIds: string[], status: MessageStatus) => {
  try {
    await updateMessageStatus(messageIds, status)
  } catch (error) {
    throw internalErrorHandler(error)
  }
}
