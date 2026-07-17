import type { FriendShipStatus, NotificationDto, UpdatedUserRequestDto } from '../../models/dto/notification.dto.js'
import { internalErrorHandler } from '../../lib/errors/InternalErrorHandler.js'
import { createUserRequest, updateFriendShipStatus, findUserNotificationRequest } from './notification.repository.js'
import { toFriendShipRequestDto, toUseRequestDto } from '../../utils/mapers/notification.mapper.js'

export const createFriendShisRequest = async (sender: string, receiver: string): Promise<NotificationDto> => {
  try {
    const result = await createUserRequest(sender, receiver)
    return toFriendShipRequestDto(result, 'FRIENDSHIP')
  } catch (e) {
    throw internalErrorHandler(e)
  }
}

export const updateFriendShip = async (
  notificationId: string,
  status: FriendShipStatus,
): Promise<UpdatedUserRequestDto> => {
  try {
    const result = await updateFriendShipStatus(Number(notificationId), status)
    return toFriendShipRequestDto(result, 'FRIENDSHIP')
  } catch (e) {
    throw internalErrorHandler(e)
  }
}

export const getUserFriendShipRequest = async (userId: string): Promise<NotificationDto[]> => {
  try {
    const result = await findUserNotificationRequest(userId)
    return toUseRequestDto(result, 'FRIENDSHIP')
  } catch (e) {
    throw internalErrorHandler(e)
  }
}
