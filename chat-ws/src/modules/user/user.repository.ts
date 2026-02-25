import { Profile } from '@prisma/client'
import { prisma } from '../../lib/config/prisma.js'
import { SimpleUser } from '../../models/dto/user.dto.js'

class UserRepository {

  static async createUserProfile(userProfile: SimpleUser): Promise<Profile> {
    return prisma.profile.create({
      data: {
        id: userProfile.id,
        name: userProfile.name
      }
    })
  }

}

export default UserRepository