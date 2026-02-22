import { Socket } from 'socket.io'
import { MessageSentDTO } from '../models/dto/messange.dto.ts'
import OnlineRepository from '../modules/redis/online.repository.ts'
import ChatRepository from '../modules/chat/chat.repository.ts'

const MESSAGE = 'MESSAGE'
const MESSAGE_ERROR = 'MESSAGE_ERROR'
const DISCONNECT_ERROR = 'DISCONNECT_ERROR'


export default class SocketEventHandler {

  constructor(private socket: Socket) {
    this.registerEvents()
  }

  private registerEvents() {
    this.socket.on(MESSAGE, this.onReceiveMessage.bind(this))
    this.socket.on('disconnect', this.onUserDisconnect.bind(this))
  }

  private async onReceiveMessage(data: MessageSentDTO) {
    try {
      const userSocket = await OnlineRepository.findUserSocket(data.receiver)
      const message = await ChatRepository.storeMessage(data.chatId, data.sender, data.content)
      if (userSocket) this.socket.to(userSocket).emit(MESSAGE, message)
    } catch (error) {
      console.error('onReceiveMessage error:', error)
      this.handleError(MESSAGE_ERROR, 'An error occurred while sending the message.')
    }
  }

  private async onUserDisconnect() {
    try {
      const user = this.socket.handshake.auth
      await OnlineRepository.setUserOffline(user.id)
      this.socket.rooms.delete(this.socket.id)
    } catch (error) {
      console.error('onUserDisconnect error:', error)
      this.handleError(DISCONNECT_ERROR, 'An error occurred while trying to disconnect the user.')
    }
  }

  private handleError(errorEventName: string, message: string) {
    this.socket.emit(errorEventName, { message: message })
  }



}