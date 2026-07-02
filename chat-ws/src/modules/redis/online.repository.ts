import RedisClient from '../../lib/config/redis.js'

const redisClient = RedisClient.getInstance()

const onlineKey = (userId: string): string => 'user:#userID'.replace('#userID', userId)

export const findUserSocket = async (ids: string[]): Promise<string[]> => {
  const keys = ids.map((id) => onlineKey(id))
  const socketIds = (await Promise.all(keys.map((key) => redisClient.hGet(key, 'socketId')))).filter(
    (it) => it !== null,
  )
  return socketIds ?? []
}

export const isUserOnline = async (userId: string): Promise<boolean> => {
  return (await redisClient.exists(onlineKey(userId))) === 1
}

export const setUserOnline = async (userId: string, socketId: string): Promise<number> => {
  return await redisClient.hSet(onlineKey(userId), { socketId: socketId })
}

export const setUserOffline = async (userId: string): Promise<number> => {
  return await redisClient.del(onlineKey(userId))
}

export const updateSocketConnction = async (userId: string, user: { id: string; email: string }): Promise<number> => {
  return await redisClient.hSet(onlineKey(userId), user)
}
