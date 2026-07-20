import { prisma } from '../../lib/config/prisma.js'
import type { UserFriendNotification } from '@prisma/client'
import { FriendShipStatus } from '@prisma/client'
import { generateUniqueKey } from '../../utils/GenerateKey.js'
import type { UserRequestWithSenderProfile } from '../../models/db.model/chat.model.js'

export const createUserRequest = async (senderId: string, receiverId: string): Promise<UserFriendNotification> => {
  const key = generateUniqueKey(senderId, receiverId)
  return prisma.userFriendNotification.create({
    data: {
      notiKey: key,
      senserId: senderId,
      receiverId: receiverId,
    },
  })
}

export const updateFriendShipStatus = async (id: number, status: FriendShipStatus): Promise<UserFriendNotification> => {
  return await prisma.$transaction(async (tx) => {
    const updated = await tx.userFriendNotification.update({
      where: { id: id },
      data: {
        status: status,
      },
    })

    const key = generateUniqueKey(updated.senserId, updated.receiverId)

    await tx.userFriendShip.upsert({
      where: { friendsKey: key },
      create: {
        friendsKey: key,
        userIdA: updated.senserId,
        userIdB: updated.receiverId,
        senderId: updated.senserId,
      },
      update: {},
    })

    return updated
  })
}

export const findUserNotificationRequest = async (userId: string): Promise<UserRequestWithSenderProfile[]> => {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)

  return await prisma.userFriendNotification.findMany({
    where: {
      receiverId: userId,
      status: {
        not: FriendShipStatus.REJECTED,
      },
      createdAt: {
        gte: thirtyDaysAgo,
      },
    },
    include: { sender: true },
  })
}
