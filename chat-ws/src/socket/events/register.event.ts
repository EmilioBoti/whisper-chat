// import {   } from '../SocketServer.ts'
import { Server, Socket } from 'socket.io'
import { Message } from '../../models/schema/message.ts'


const MESSAGE = 'MESSAGE'

export const registeSocketEvent = (io: Server) => {
  /**
   * Listener eache new connection
   */
  io.on('connection', (socket: Socket) => {
    console.log(`new connection: >>> ${socket.id}`)
    /**
     * listen any message sent by user
     * @argument Message
     */
    socket.on(MESSAGE, (data: Message) => {

    })

  })

} 