import type { DisconnectReason } from 'socket.io'
import { updateUserOnlineStatus } from '../../modules/redis/online.service.js'
import type { MessageDTO, MessageSentDTO } from '../../models/dto/messange.dto.js'
import { MessageStatus } from '@prisma/client'
import { fetchPendingMessage, storeNewMessage, updateStatus } from '../../modules/chat/chat.service.js'
import { updateMessageStatus } from '../../modules/chat/chat.repository.js'
import type { AppIO, AppSocket } from '../SocketServer.js'

const NEW_MESSAGE = 'NEW_MESSAGE'
const RECOVERY_CONNECTION = 'RECOVERY_CONNECTION'

export const initConnection = (io: AppIO) => {
  /**
   * register user connection and events
   * @argument Socket
   */
  io.on('connection', async (socket: AppSocket) => {
    const user = socket.data.user

    /**
     * Set user connection as online
     */
    await updateUserOnlineStatus(user, true)

    /**
     * Create a Room chat for user connection
     */
    await socket.join(user.userId)

    if (!socket.recovered) {
      try {
        const pendingMessages = await fetchPendingMessage(user.userId)
        console.info(`pendingMessages: ${pendingMessages.length}`)
        if (pendingMessages.length > 0) {
          io.timeout(7000)
            .to(user.userId)
            .emit(RECOVERY_CONNECTION, pendingMessages, async (err: unknown, responseIds: string[][]) => {
              try {
                /**
                 * The message was not reached by the other side
                 */
                if (err) console.error(`error`, { ...err })
                /**
                 * The message was reached by the other side
                 */
                const ids = responseIds.flat()
                await updateMessageStatus(ids, MessageStatus.RECEIVED)
              } catch (error) {
                console.error(`error-2`, error)
              }
            })
        }
      } catch (error) {
        console.error(error)
      }
    }

    socket.on(NEW_MESSAGE, async (data: MessageSentDTO, acknowledgeMessageSent: (strig: MessageDTO) => void) => {
      try {
        const message = await storeNewMessage(data)
        io.timeout(7000)
          .in(data.receiverIds)
          // .except(data.senderId)
          .emit(NEW_MESSAGE, message, async (err: unknown, responseIds: string[]) => {
            try {
              /**
               * The message was not reached by the other side
               */
              if (err) console.error(`error`, { ...err })
              /**
               * The message was reached by the other side
               */
              await updateMessageStatus(responseIds, MessageStatus.RECEIVED)
            } catch (error) {
              console.error(`error-2`, error)
            }
          })

        await updateStatus([message.id], MessageStatus.SENT)
        /**
         * The message was sent properly to the users
         */
        acknowledgeMessageSent(message)
      } catch (error) {
        console.error('onReceiveMessage error:', error)
      }
    })

    socket.on('disconnect', async (reason: DisconnectReason) => {
      try {
        const user = socket.data.user
        await updateUserOnlineStatus(user, false)
        console.info('socket disconnected', {
          socketId: socket.id,
          userId: user.email,
          reason,
          auth: socket.handshake.auth,
        })
      } catch (error) {
        console.error('onUserDisconnect error:', error)
      }
    })
  })
}
