import type { UserSettings } from '@prisma/client'
import type { NotificationDto, SettingsDto } from '../../models/dto/settings.dto.js'

export const toNotificationDto = (settings: UserSettings | null): NotificationDto => {
  return {
    pushEnabled: settings?.pushEnabled ?? true,
    inAppSoundEnabled: settings?.inAppSoundEnabled ?? true,
  }
}

export const toSettingsDto = (settings: UserSettings | null): SettingsDto => {
  return {
    notification: {
      pushEnabled: settings?.pushEnabled ?? true,
      inAppSoundEnabled: settings?.inAppSoundEnabled ?? true,
    },
  }
}
