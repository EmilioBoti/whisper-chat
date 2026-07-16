import type { Profile } from '@prisma/client'
import { prisma } from '../../lib/config/prisma.js'
import type { CreateUserProfileDto } from '../../models/dto/auth.dto.js'
import type { ProfileWithUserRequest } from '../../models/db.model/chat.model.js'

export const createProfile = async (userProfile: CreateUserProfileDto): Promise<Profile> => {
  return prisma.profile.create({
    data: {
      id: userProfile.id,
      name: userProfile.name,
      email: userProfile.email,
    },
  })
}

export const findUsers = async (isPublic: boolean, userId: string): Promise<ProfileWithUserRequest[]> => {
  return prisma.profile.findMany({
    where: {
      NOT: { id: userId },
      isPublic: isPublic,
    },
    include: {
      receivedNotifications: true,
      sentNotifications: true,
    },
  })
}
