import type { Profile } from '@prisma/client'
import type { SimpleProfile } from '../../models/dto/user.dto.js'

export const toSimpleUser = (userProfile: Profile): SimpleProfile => {
  return {
    id: userProfile.id,
    name: userProfile.name,
    photo: userProfile.photo,
    isPublic: userProfile.isPublic,
  }
}
