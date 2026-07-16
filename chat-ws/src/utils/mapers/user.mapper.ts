import type { Profile } from '@prisma/client'
import type { BasicUserInfoDto } from '../../models/dto/user.dto.js'

export const toBasicProfileInfoList = (profiles: Profile[]): BasicUserInfoDto[] => {
  return profiles.map((user) => toBasicProfileInfo(user))
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
