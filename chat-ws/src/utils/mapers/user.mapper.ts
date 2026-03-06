import type { Profile } from '@prisma/client'
import type { SimpleProfile } from '../../models/dto/user.dto.js'

export const toSimpleUserList = (profiles: Profile[]): SimpleProfile[] => {
  return profiles.map((user) => toSimpleUser(user))
}

export const toSimpleUser = (userProfile: Profile): SimpleProfile => {
  return {
    id: userProfile.id,
    name: userProfile.name,
    photo: userProfile.photo,
    isPublic: userProfile.isPublic,
  }
}
