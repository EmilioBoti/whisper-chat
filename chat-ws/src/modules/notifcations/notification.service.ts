import type { FriendShipStatus, NotificationDto } from '../../models/dto/notification.dto.js'
import { internalErrorHandler } from '../../lib/errors/InternalErrorHandler.js'
import { createNotification, updateFriendShipStatus } from './notification.repository.js'
import { toFriendShipNotification } from '../../utils/mapers/notification.mapper.js'

export const createFriendShipNotitifcation = async (sender: string, receiver: string): Promise<NotificationDto> => {
  try {
    const result = await createNotification(sender, receiver)
    return toFriendShipNotification(result)
  } catch (e) {
    throw internalErrorHandler(e)
  }
}

export const updateFriendShip = async (notificationId: string, status: FriendShipStatus): Promise<NotificationDto> => {
  try {
    const result = await updateFriendShipStatus(Number(notificationId), status)
    return toFriendShipNotification(result)
  } catch (e) {
    throw internalErrorHandler(e)
  }
}
