import type { Server, Socket } from 'socket.io'
import { userIsOnline } from '../../modules/redis/online.service.js'
import type { MessageSentDTO } from 'src/models/dto/messange.dto.js'
import { storeMessage } from 'src/modules/chat/chat.repository.js'
import { toMessage } from 'src/utils/mapers/chat.mapper.js'
import { decodeToken } from 'src/middleware/auth.middleware.js'
import { setUserOffline } from 'src/modules/redis/online.repository.js'

const NEW_MESSAGE = 'NEW_MESSAGE'
const MESSAGE_ERROR = 'MESSAGE_ERROR'

export const initConnection = (io: Server) => {
  /**
   * register user connection and events
   * @argument Socket
   */
  io.on('connection', async (socket: Socket) => {
    const token = socket.handshake.auth['token']
    /**
     * This is a simple mecanism to handle user events connection
     * Must use Redis to handle user connection and reconection in a more robust way
     */
    const userOnline = await userIsOnline(token, socket.id)

    if (!userOnline) {
      socket.disconnect()
      return
    } else {
      await socket.join(userOnline.userId)
    }

    socket.on(NEW_MESSAGE, async (data: MessageSentDTO) => {
      try {
        const message = await storeMessage(data.chatId, data.senderId, data.content).then((data) => toMessage(data))
        io.in(data.receiverIds).except(data.senderId).emit(NEW_MESSAGE, message)
      } catch (error) {
        console.error('onReceiveMessage error:', error)
        socket.emit(MESSAGE_ERROR, { message: 'An error occurred while sending the message.' })
      }
    })

    socket.on('disconnect', async (reason) => {
      try {
        const token = socket.handshake.auth.token
        const user = decodeToken(token)
        console.info('socket disconnected', { socketId: socket.id, userId: user.email, reason })
        await setUserOffline(user.userId)
        socket.rooms.delete(user.userId)
      } catch (error) {
        console.error('onUserDisconnect error:', error)
        socket.emit(MESSAGE_ERROR, { message: 'An error occurred while trying to disconnect the user.' })
      }
    })
  })
}
