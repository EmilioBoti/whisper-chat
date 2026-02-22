import { createClient, RedisClientType } from 'redis'

class RedisClient { 
  private static instance: RedisClientType

  constructor() {}

  static getInstance(): RedisClientType {
    if (!this.instance) {
      const client: RedisClientType = createClient({
        socket: {
          host: process.env.REDIS_HOST || 'localhost',
          port: Number(process.env.REDIS_PORT) || 6379,
        },
        password: process.env.REDIS_DB_PASSWORD || undefined,
      })

      client.on('error', (err) => {
         console.error('Redis Error:', err);
      })
      client.connect()

      this.instance = client
    }
    return this.instance
  }

}

export default RedisClient