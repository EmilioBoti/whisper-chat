import { Server, Socket } from 'socket.io'
import { MessageSentDTO } from 'src/models/dto/messange.dto.js'

const MESSAGE = 'MESSAGE'

const connectionsUser = new Map<string, string>()


export const initConnection = (io: Server) => {
  /**
  * register user connection and events
  * @argument Socket
  */
  io.on('connection', (socket: Socket) => {
    
    const user = socket.handshake.auth
    /**
     * This is a simple mecanism to handle user events connection
     * Must use Redis to handle user connection and reconection in a more robust way
     */
    if (connectionsUser.has(user.id) && user !== undefined) {
      socket.rooms.delete(socket.id) // Remove the socket from its roo
    }

    if (user === undefined) {
      socket.disconnect()
      return
    }
    connectionsUser.set(user.id, socket.id)
    socket.rooms.add(socket.id)
    
    /**
     * listen any message sent by user
     * @argument Message
     */
    socket.on(MESSAGE, (data: MessageSentDTO) => {

      /**
       * Find the receiver socket and send the message to it
       */
      const receiverSocket = connectionsUser.get(data.receiver)
      if (receiverSocket) {
        socket.to(receiverSocket).emit(MESSAGE, data) // send message to receiver
      }
      console.log(data)
    })
    /**
     * listen user disconnection
     * remove user socker from connectionsUser and its room
     */
    socket.on('disconnect', () => {
      connectionsUser.delete(socket.id)
      socket.rooms.delete(socket.id)
    })

  })

} 