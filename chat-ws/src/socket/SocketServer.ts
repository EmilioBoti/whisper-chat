import type { Server as HttpServer } from 'http'
import { Server as ServerSocket } from 'socket.io'

export class SocketServer {
  private static io?: ServerSocket = undefined

  static initSocket(server: HttpServer): ServerSocket {
    if (!this.io) {
      this.io = new ServerSocket(server, {
        cors: {
          origin: '*', //remove "*" for production
        },
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

  /**
   * This method is to avoid the rule "Unexpected class with only static properties."
   * In this case it'is fine
   * @returns
   */
  public isInstanceCreated(): boolean {
    return SocketServer.io !== undefined
  }
}
