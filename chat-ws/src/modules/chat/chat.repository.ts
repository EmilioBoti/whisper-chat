import type { ChatType, Message } from '@prisma/client'
import { MessageStatus } from '@prisma/client'
import { prisma } from '../../lib/config/prisma.js'
import type { ChatMemberProfile, ChatWithMembers, ChatWithMessage } from '../../models/db.model/chat.model.js'

const directType: ChatType = 'DIRECT'

const generateDirectKey = (userId: string, userBId: string): string => {
  return [userId, userBId].sort().join('_')
}

export const upsertDirectChat = async (userId: string, userBId: string): Promise<ChatWithMembers> => {
  const directKey = generateDirectKey(userId, userBId)
  const chat = prisma.chat.upsert({
    where: { directKey: directKey },
    create: {
      type: directType,
      createdBy: userId,
      directKey: directKey,
      members: {
        create: [{ userId: userId }, { userId: userBId }],
      },
    },
    include: { members: true },
    update: {},
  })
  return chat
}

export const findChatMessages = async (id: string, limit: number, cursor?: string): Promise<Message[]> => {
  return prisma.message.findMany({
    where: { chatId: id },
    orderBy: { id: 'desc' },
    take: limit,
    ...(cursor && {
      skip: 1,
      cursor: {
        id: cursor,
      },
    }),
  })
}

export const storeMessage = async (id: string, chatId: string, senderId: string, content: string): Promise<Message> => {
  return await prisma.message.create({
    data: {
      id: id,
      chatId: chatId,
      senderId: senderId,
      content: content,
    },
  })
}

export const updateMessageStatus = async (messageIds: string[], status: MessageStatus) => {
  await prisma.message.updateMany({
    where: {
      id: {
        in: messageIds,
      },
    },
    data: {
      status: status,
    },
  })
}

export const findPendingMessage = async (userId: string): Promise<ChatWithMessage[]> => {
  return prisma.chat.findMany({
    where: {
      members: {
        some: { userId },
      },
    },
    include: {
      messages: {
        where: {
          OR: [{ status: MessageStatus.PENDING }, { status: MessageStatus.SENT }],
          NOT: { senderId: userId },
        },
      },
    },
  })
}

export const getUserChats = async (userId: string): Promise<ChatMemberProfile[]> => {
  return prisma.chat.findMany({
    where: {
      members: {
        some: { userId },
      },
    },
    include: {
      members: {
        include: {
          profile: true,
        },
      },
      messages: {
        take: 1,
        orderBy: { id: 'desc' },
      },
    },
  })
}
