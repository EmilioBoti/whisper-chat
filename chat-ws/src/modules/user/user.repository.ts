import type { Profile } from '@prisma/client'
import { prisma } from '../../lib/config/prisma.js'
import type { SimpleUser } from '../../models/dto/user.dto.js'

export const createProfile = async (userProfile: SimpleUser): Promise<Profile> => {
  return prisma.profile.create({
    data: {
      id: userProfile.id,
      name: userProfile.name,
    },
  })
}
