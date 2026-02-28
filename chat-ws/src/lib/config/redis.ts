import type { RedisClientType } from 'redis'
import { createClient } from 'redis'

class RedisClient {
  private static instance: RedisClientType

  static getInstance(): RedisClientType {
    if (!this.instance) {
      const client: RedisClientType = createClient({
        socket: {
          host: process.env.REDIS_HOST || 'localhost',
          port: Number(process.env.REDIS_PORT) || 6379,
        },
        password: process.env.REDIS_DB_PASSWORD || undefined,
      })

      client.on('error', (err) => console.error('Redis Error:', err))
      void client.connect()

      this.instance = client
    }
    return this.instance
  }

  /**
   * This method is to avoid the rule "Unexpected class with only static properties."
   * In this case it's fine
   * @returns
   */
  public isInstanceCreated(): boolean {
    return RedisClient.instance !== undefined
  }
}

export default RedisClient
