import { Server, Socket } from 'socket.io'
import OnlineService from '../../modules/redis/online.service.js'
import SocketEventHandler from '../SocketEventHandler.ts'

export const initConnection = (io: Server) => {
  /**
  * register user connection and events
  * @argument Socket
  */
  io.on('connection', async (socket: Socket) => {
    
    const user = socket.handshake.auth
    /**
     * This is a simple mecanism to handle user events connection
     * Must use Redis to handle user connection and reconection in a more robust way
     */
    const isOnline = OnlineService.setUserOnline(user.id, socket.id)
    if (!isOnline) {
      socket.disconnect()
      return
    }
    
    /**
     * Handle user events
     */
    new SocketEventHandler(socket)

  })

} 