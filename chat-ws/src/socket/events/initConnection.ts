import type { Server, Socket } from 'socket.io'
import { userIsOnline } from '../../modules/redis/online.service.js'
import type { MessageDTO, MessageSentDTO } from 'src/models/dto/messange.dto.js'
import { decodeToken } from 'src/middleware/auth.middleware.js'
import { setUserOffline } from 'src/modules/redis/online.repository.js'
import { MessageStatus } from '@prisma/client'
import { acknowledgeMessageReceived, storeNewMessage, updateStatus } from 'src/modules/chat/chat.service.js'

const NEW_MESSAGE = 'NEW_MESSAGE'

export const initConnection = (io: Server) => {
  /**
   * register user connection and events
   * @argument Socket
   */
  io.on('connection', async (socket: Socket) => {
    const token = socket.handshake.auth['token']
    /**
     * Set user connection as online
     */
    const userOnline = await userIsOnline(token, socket.id)

    if (!userOnline) {
      socket.disconnect()
      return
    } else {
      /**
       * Create a private message room for each user connection
       */
      await socket.join(userOnline.userId)
    }

    socket.on(NEW_MESSAGE, async (data: MessageSentDTO, acknowledgeMessageSent: (strig: MessageDTO) => void) => {
      try {
        const message = await storeNewMessage(data)
        io.timeout(70000)
          .in(data.receiverIds)
          .except(data.senderId)
          .emit(NEW_MESSAGE, message, acknowledgeMessageReceived)

        await updateStatus(message.id, MessageStatus.SENT)
        /**
         * The message was sent properly to the users
         */
        acknowledgeMessageSent(message)
      } catch (error) {
        console.error('onReceiveMessage error:', error)
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
      }
    })
  })
}
