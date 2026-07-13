import type { UserFriendNotification } from '@prisma/client'
import { FriendShipStatus } from '@prisma/client'
import type { FriendShipStatus as Status, NotificationDto } from '../../models/dto/notification.dto.js'

export const toFriendShipNotification = (friendShip: UserFriendNotification): NotificationDto => {
  const id = friendShip.id.toString()
  return {
    id: id,
    type: 'FRIENDSHIP',
    friend: {
      id: id,
      senderId: friendShip.senserId,
      receiver: friendShip.receiverId,
      status: parseToFriendStatus(friendShip.status),
    },
    createdAt: friendShip.createdAt.toISOString(),
  }
}

const parseToFriendStatus = (status: FriendShipStatus): Status => {
  if (status === FriendShipStatus.PENDING) {
    return 'PENDING'
  } else if (status === FriendShipStatus.ACCEPTED) {
    return 'ACCEPTED'
  } else if (status === FriendShipStatus.REJECTED) {
    return 'REJECTED'
  }
  return 'PENDING'
}

export const parseToFriendStatusEntity = (status: string): FriendShipStatus => {
  if (status === 'PENDING') {
    return FriendShipStatus.PENDING
  } else if (status === 'ACCEPTED') {
    return FriendShipStatus.ACCEPTED
  } else if (status === 'REJECTED') {
    return FriendShipStatus.REJECTED
  }
  return FriendShipStatus.PENDING
}
