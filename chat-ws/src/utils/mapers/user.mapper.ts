import { Profile } from '@prisma/client'
import { SimpleProfile } from '../../models/dto/user.dto.js'

export default class UserMapper {

  static toSimpleUser(userProfile: Profile): SimpleProfile {
    return {
      id: userProfile.id,
      name: userProfile.name,
      photo: userProfile.photo,
      isPublic: userProfile.isPublic
    }
  }

}