import { prisma } from '../../lib/config/prisma.js'
import type { UserFriendNotification } from '@prisma/client'
import { generateUniqueKey } from '../../utils/GenerateKey.js'

export const createNotification = async (senderId: string, receiverId: string): Promise<UserFriendNotification> => {
  const key = generateUniqueKey(senderId, receiverId)
  return prisma.userFriendNotification.create({
    data: {
      notiKey: key,
      senserId: senderId,
      receiverId: receiverId,
    },
  })
}
