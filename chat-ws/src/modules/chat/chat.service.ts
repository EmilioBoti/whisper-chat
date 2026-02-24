import ChatRepository from './chat.repository.js'
import InternalErrorHandler from '../../lib/errors/InternalErrorHandler.js'
import { SimpleChat, UserChat } from '../../models/dto/chat.dto.js'
import ChatMapper from '../../utils/mapers/chat.mapper.js'

export class ChatService {

  static async openDirectChat(userId: string, userBId: string): Promise<SimpleChat> {
    try {
      const chat = await ChatRepository.openDirectChat(userId, userBId)
      return ChatMapper.toSimpleChat(chat)
    } catch (error) {
      throw InternalErrorHandler.handler(error)
    }
  }

  static async fetchUserChats(userId: string): Promise<UserChat[]> {
    try {
      const chats = await ChatRepository.getUserChats(userId)
      return ChatMapper.toListUserChat(chats)
    } catch (error) {
      throw InternalErrorHandler.handler(error)
    }
  } 

}