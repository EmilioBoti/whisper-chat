import { ChatType, Message } from '@prisma/client'
import { prisma } from '../../lib/config/prisma.js'
import { ChatMemberProfile, ChatWithMembers } from '../../models/db.model/chat.model.js'

export default class ChatRepository {

  private static readonly directType: ChatType = 'DIRECT'


  private static generateDirectKey(userId: string, userBId: string): string {
    return [userId, userBId].sort().join('_')
  }

  static async openDirectChat(userId: string, userBId: string): Promise<ChatWithMembers> {
    const directKey = this.generateDirectKey(userId, userBId)
    const chat = prisma.chat.upsert({
      where: { directKey: directKey },
      create: {
        type: this.directType,
        createdBy: userId,
        directKey: directKey,
        members: {
          create: [
            { userId: userId },
            { userId: userBId },
          ]
        }
      },
      include: { members: true },
      update: {}
    })
    return chat
  }

  static async storeMessage(chatId: string, senderId: string, content: string): Promise<Message> {
    return await prisma.message.create({
      data: {
        chatId: chatId,
        senderId: senderId,
        content: content
      }
    })
  }

  static async getUserChats(userId: string): Promise<ChatMemberProfile[]> {
    return prisma.chat.findMany({
      where: {
        members: {
          some: { userId }
        }
       },
      include: { 
        members: {
          include: {
            profile: true
          }
        }
      }
    })
  }

}
