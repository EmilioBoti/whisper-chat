import { ChatType, Message } from '@prisma/client'
import { prisma } from '../../lib/config/prisma.js'
import { ChatWithMembers } from 'src/models/db.model/chat.model.js'

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

}
