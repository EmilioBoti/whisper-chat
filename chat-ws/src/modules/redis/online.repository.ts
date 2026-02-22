import RedisClient from '../../lib/config/redis.js'


export default class OnlineRepository {

  private static redisClient = RedisClient.getInstance()

  static async findUserSocket(userID: string): Promise<string> {
    const socketId = await this.redisClient.hGet(`user:online:${userID}`, 'socketId')
    return socketId ?? ''
  }

  static async isUserOnline(userId: string): Promise<boolean> {
    return await this.redisClient.exists(`user:online:${userId}`) === 1
  }

  static async setUserOnline(userId: string, socketId: string): Promise<number> {
    return await this.redisClient.hSet(`user:online:${userId}`, { socketId: socketId })
  }

  static async setUserOffline(userId: string): Promise<number> {
    return await this.redisClient.del(`user:online:${userId}`)
  }

  static async updateSocketConnction(userId: string, socketId: string): Promise<number> {
    return await this.redisClient.hSet(`user:online:${userId}`, { socketId: socketId })
  }

}