import ChatRepository from './chat.repository.js'
import InternalErrorHandler from '../../lib/errors/InternalErrorHandler.js'
import { Chat } from 'src/models/dto/chat.dto.js'

export class ChatService {

  static async openDirectChat(userId: string, userBId: string): Promise<Chat> {
    try {
      const chat = await ChatRepository.openDirectChat(userId, userBId)
      return {
        id: chat.id,
        type: chat.type,
        createdBy: chat.createdBy,
        createdAt: chat.createdAt.toISOString()
      }
    } catch (error) {
      throw InternalErrorHandler.handler(error)
    }
  }

}