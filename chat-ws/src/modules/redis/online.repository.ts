import RedisClient from '../../lib/config/redis.js'

const redisClient = RedisClient.getInstance()

const onlineKey = (userId: string): string => 'user:#userID'.replace('#userID', userId)

export const findUserSocket = async (userId: string): Promise<string> => {
  const socketId = await redisClient.hGet(onlineKey(userId), 'socketId')
  return socketId ?? ''
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

export const updateSocketConnction = async (userId: string, socketId: string): Promise<number> => {
  return await redisClient.hSet(onlineKey(userId), { socketId: socketId })
}
