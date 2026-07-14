export type FriendShipStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED'
export type NotificationType = 'FRIENDSHIP'

export interface NotificationDto {
  id: string
  type: NotificationType
  friend?: FriendNotificationDto
  createdAt: string
}

export interface FriendNotificationDto {
  id: string
  name: string
  photo?: string | null | undefined
  isPublic: boolean
  status: FriendShipStatus
}
