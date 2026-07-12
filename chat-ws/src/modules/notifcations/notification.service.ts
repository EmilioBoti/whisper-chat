import type { NotificationDto } from '../../models/dto/notification.dto.js'
import { internalErrorHandler } from '../../lib/errors/InternalErrorHandler.js'
import { createNotification } from './notification.repository.js'
import { toFriendShipNotification } from '../../utils/mapers/notification.mapper.js'

export const createFriendShipNotitifcation = async (sender: string, receiver: string): Promise<NotificationDto> => {
  try {
    const result = await createNotification(sender, receiver)
    return toFriendShipNotification(result)
  } catch (e) {
    throw internalErrorHandler(e)
  }
}
