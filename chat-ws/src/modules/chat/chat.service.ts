import ChatRepository from './chat.repository.js'
// import OnlineRepository from '../redis/online.repository.js'
import InternalErrorHandler from '../../lib/errors/InternalErrorHandler.js'
import { Chat, UserChat } from 'src/models/dto/chat.dto.js'

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

  static async fetchUserChats(userId: string): Promise<any[]> {
    try {
      const chats = await ChatRepository.getUserChats(userId)
      return chats
    } catch (error) {
      throw InternalErrorHandler.handler(error)
    }
  } 

}