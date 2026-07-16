import type { Profile } from '@prisma/client'
import type { BasicUserInfoDto, ExploreUserDto } from '../../models/dto/user.dto.js'
import type { ProfileWithUserRequest } from '../../models/db.model/chat.model.js'
import { parseToFriendStatus } from './notification.mapper.js'

export const toBasicProfileInfoList = (userId: string, profiles: ProfileWithUserRequest[]): ExploreUserDto[] => {
  return profiles.map((user) => {
    const requests = [...user.sentNotifications, ...user.sentNotifications]
    const request = requests.find((it) => it.senserId === userId || it.receiverId === userId)

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      photo: user.photo,
      isPublic: user.isPublic,
      friendStatus: request?.status ? parseToFriendStatus(request.status) : undefined,
    }
  })
}

export const toBasicProfileInfo = (userProfile: Profile): BasicUserInfoDto => {
  return {
    id: userProfile.id,
    name: userProfile.name,
    email: userProfile.email,
    photo: userProfile.photo,
    isPublic: userProfile.isPublic,
  }
}
