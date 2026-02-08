import { Server as HttpServer } from 'http'
import { Server as ServerSocket } from 'socket.io'


export class SocketServer {
  private static io?: ServerSocket = undefined

  static initSocket(server: HttpServer): ServerSocket {
    if (!this.io) {
      this.io = new ServerSocket(server, {
        cors: {
          origin: "*", //remove "*" for production
        }
      })
    }
    return this.io
  }

  static getIOSocket(): ServerSocket {
    if (!this.io) {
      throw new Error('Socket not initialized')
    }
    return this.io
  }

}
  
