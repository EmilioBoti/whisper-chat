import OnlineRepository from './online.repository.js'

export class OnlineService {

  static async setUserOnline(userId: string, socketId: string): Promise<boolean> {
    try {
      const result = await OnlineRepository.updateSocketConnction(userId, socketId)
      return result === 1
    } catch (error) {
      console.error('Error setting user online:', error)
      return false
    }
  }

  static async setUserOffline(userId: string): Promise<boolean> {
    try {
      const result = await OnlineRepository.setUserOffline(userId)
      return result === 1
    } catch (error) {
      console.error('Error setting user offline:', error)
      return false
    }
  }

}

export default OnlineService