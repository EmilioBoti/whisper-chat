import type { AuthPayload } from '../../models/schema/authPayload.js'
import { updateSocketConnction, setUserOffline } from './online.repository.js'

export const updateUserOnlineStatus = async (user: AuthPayload, status: boolean): Promise<void> => {
  try {
    if (status) {
      await updateSocketConnction(user.userId, { id: user.userId, email: user.email })
    } else {
      await setUserOffline(user.userId)
    }
    await updateSocketConnction(user.userId, { id: user.userId, email: user.email })
  } catch (error) {
    console.error('Error setting user online:', error)
  }
}
