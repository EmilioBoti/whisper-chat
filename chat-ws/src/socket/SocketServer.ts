/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Server as HttpServer } from 'http'
import type { Socket } from 'socket.io'
import { Server as ServerSocket } from 'socket.io'
import type { AuthPayload } from '../models/schema/authPayload.js'

export type AppIO = ServerSocket<Record<string, any>, Record<string, any>, Record<string, any>, SocketData>
export type AppSocket = Socket<Record<string, any>, Record<string, any>, Record<string, any>, SocketData>

export interface SocketData {
  user: AuthPayload
}

export class SocketServer {
  private static io?: AppIO = undefined

  static initSocket(server: HttpServer): AppIO {
    if (!this.io) {
      this.io = new ServerSocket<object, object, object, SocketData>(server, {
        cors: {
          origin: '*', //remove "*" for production
        },
        connectionStateRecovery: {
          maxDisconnectionDuration: 60000,
          skipMiddlewares: true,
        },
      })
    }
    return this.io
  }

  static getIOSocket(): AppIO {
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
