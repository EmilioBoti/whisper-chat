import type { NotificationDto, SettingsDto } from '../../models/dto/settings.dto.js'
import { internalErrorHandler } from '../../lib/errors/InternalErrorHandler.js'
import { findUserSettings, updateSettings } from './settings.repository.js'
import { toNotificationDto, toSettingsDto } from '../../utils/mapers/settings.mapper.js'

export const fetchSettingsNotification = async (userId: string): Promise<NotificationDto> => {
  try {
    const settings = await findUserSettings(userId)
    return toNotificationDto(settings)
  } catch (error) {
    throw internalErrorHandler(error)
  }
}

export const fetchAllSettings = async (userId: string): Promise<SettingsDto> => {
  try {
    const settings = await findUserSettings(userId)
    return toSettingsDto(settings)
  } catch (error) {
    throw internalErrorHandler(error)
  }
}

export const updateUserSettings = async (
  userId: string,
  settingsDto: Partial<SettingsDto>,
): Promise<NotificationDto> => {
  try {
    const settings = await updateSettings(userId, settingsDto)
    console.info(settings)
    return toSettingsDto(settings).notification
  } catch (error) {
    throw internalErrorHandler(error)
  }
}
