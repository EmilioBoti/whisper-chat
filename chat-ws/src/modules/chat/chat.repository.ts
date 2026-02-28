import type { ChatType, Message } from '@prisma/client'
import { prisma } from '../../lib/config/prisma.js'
import type { ChatMemberProfile, ChatWithMembers } from '../../models/db.model/chat.model.js'

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

export const storeMessage = async (chatId: string, senderId: string, content: string): Promise<Message> => {
  return await prisma.message.create({
    data: {
      chatId: chatId,
      senderId: senderId,
      content: content,
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
    },
  })
}
