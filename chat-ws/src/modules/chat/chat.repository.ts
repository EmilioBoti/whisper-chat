import type { Message } from '@prisma/client'
import { ChatType } from '@prisma/client'
import { MessageStatus } from '@prisma/client'
import { prisma } from '../../lib/config/prisma.js'
import type { ChatMemberProfile, ChatWithMembers, ChatWithMessage } from '../../models/db.model/chat.model.js'

export const upsertChat = async (
  type: ChatType,
  chatId: string,
  userId: string,
  members: { userId: string }[],
  directKey?: string,
): Promise<ChatWithMembers> => {
  const condition = type === ChatType.DIRECT ? { directKey: directKey } : { id: chatId }
  const chat = prisma.chat.upsert({
    where: condition,
    create: {
      id: chatId,
      type: type,
      createdBy: userId,
      directKey: directKey,
      members: {
        create: members,
      },
    },
    include: { members: true },
    update: {
      members: {
        deleteMany: {},
        create: members,
      },
    },
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
