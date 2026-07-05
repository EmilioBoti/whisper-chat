export interface NotificationDto {
  pushEnabled: boolean
  inAppSoundEnabled: boolean
}

export interface SettingsDto {
  notification: NotificationDto
}
