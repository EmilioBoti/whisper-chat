import type { SettingsDto } from '../../models/dto/settings.dto.js'
import { prisma } from '../../lib/config/prisma.js'
import type { UserSettings } from '@prisma/client'

export const findUserSettings = async (userId: string): Promise<UserSettings | null> => {
  return prisma.userSettings.findFirst({
    where: {
      userId: userId,
    },
  })
}

export const updateSettings = async (userId: string, settingsDto: Partial<SettingsDto>): Promise<UserSettings> => {
  return prisma.userSettings.upsert({
    where: { userId: userId },
    create: {
      userId: userId,
      ...(settingsDto.notification !== undefined && {
        pushEnabled: settingsDto.notification.pushEnabled,
        inAppSoundEnabled: settingsDto.notification.inAppSoundEnabled,
      }),
    },
    update: {
      ...(settingsDto.notification !== undefined && {
        pushEnabled: settingsDto.notification.pushEnabled,
        inAppSoundEnabled: settingsDto.notification.inAppSoundEnabled,
      }),
    },
  })
}
