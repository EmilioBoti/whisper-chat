import type { AuthPayload } from 'src/models/schema/authPayload.js'
import { varifyToken } from '../../middleware/auth.middleware.js'
import { updateSocketConnction, setUserOffline } from './online.repository.js'

export const userIsOnline = async (token: string, socketId: string): Promise<AuthPayload | null> => {
  try {
    const user: AuthPayload = varifyToken(token)
    await updateSocketConnction(user.userId, socketId)
    return user
  } catch (error) {
    console.error('Error setting user online:', error)
    return null
  }
}

export const userIsOffline = async (userId: string): Promise<boolean> => {
  try {
    const result = await setUserOffline(userId)
    return result === 1
  } catch (error) {
    console.error('Error setting user offline:', error)
    return false
  }
}
