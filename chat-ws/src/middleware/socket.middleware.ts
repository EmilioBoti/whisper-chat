import type { ExtendedError, Socket } from 'socket.io'
import type { AuthPayload } from '../models/schema/authPayload.js'
import { varifyToken } from './auth.middleware.js'
import { UnAuthorized } from 'src/lib/errors/Unauthorized.js'

export const socketMiddleware = async (socket: Socket, next: (err?: ExtendedError) => void) => {
  const error = new UnAuthorized('Invalid or expired token.')
  try {
    const token = socket.handshake.auth['token']
    const user: AuthPayload = varifyToken(token)

    if (!user) {
      next({
        data: error.status,
        name: 'UnAuthorized',
        message: error.message,
      })
    }
    socket.data.user = user
    next()
  } catch {
    next({
      data: 401,
      name: 'UnAuthorized',
      message: error.message,
    })
  }
}
