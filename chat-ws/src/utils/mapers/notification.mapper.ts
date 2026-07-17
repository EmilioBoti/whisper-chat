import type { UserFriendNotification } from '@prisma/client'
import { FriendShipStatus } from '@prisma/client'
import type {
  FriendShipStatus as Status,
  NotificationDto,
  NotificationType,
  UpdatedUserRequestDto,
} from '../../models/dto/notification.dto.js'
import type { UserRequestWithSenderProfile } from '../../models/db.model/chat.model.js'

export const toUseRequestDto = (
  requests: UserRequestWithSenderProfile[],
  type: NotificationType,
): NotificationDto[] => {
  return requests.map((req) => {
    return {
      id: req.id.toString(),
      type: type,
      friend: {
        id: req.sender.id,
        name: req.sender.name,
        photo: req.sender.photo,
        isPublic: req.sender.isPublic,
        status: parseToFriendStatus(req.status),
      },
      createdAt: req.createdAt.toISOString(),
    }
  })
}

export const toFriendShipRequestDto = (
  friendShip: UserFriendNotification,
  type: NotificationType,
): UpdatedUserRequestDto => {
  const id = friendShip.id.toString()
  return {
    id: id,
    type: type,
    status: friendShip.status,
    createdAt: friendShip.createdAt.toISOString(),
  }
}

export const parseToFriendStatus = (status: FriendShipStatus): Status => {
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
