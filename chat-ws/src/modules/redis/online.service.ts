import { varifyToken } from '../../middleware/auth.middleware.js'
import { updateSocketConnction, setUserOffline } from './online.repository.js'

export const userIsOnline = async (token: string, socketId: string): Promise<boolean> => {
  try {
    const user = varifyToken(token)
    await updateSocketConnction(user.userId, socketId)
    return true
  } catch (error) {
    console.error('Error setting user online:', error)
    return false
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
