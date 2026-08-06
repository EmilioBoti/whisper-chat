import type { Profile } from '@prisma/client'
import { prisma } from '../../lib/config/prisma.js'
import type { CreateUserProfileDto } from '../../models/dto/auth.dto.js'
import type { ProfileFriend, ProfileWithUserRequest } from '../../models/db.model/chat.model.js'

export const createProfile = async (userProfile: CreateUserProfileDto): Promise<Profile> => {
  return prisma.profile.create({
    data: {
      id: userProfile.id,
      name: userProfile.name,
      email: userProfile.email,
      isPublic: true,
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

export const findUserFriends = async (userId: string): Promise<ProfileFriend[]> => {
  const select = {
    id: true,
    name: true,
    photo: true,
    email: true,
    lastname: true,
    createdAt: true,
  }
  const friendShip = await prisma.userFriendShip.findMany({
    where: {
      OR: [{ userIdA: userId }, { userIdB: userId }],
    },
    include: {
      friendshipsAsA: { select: select },
      friendshipsAsB: { select: select },
    },
  })
  return friendShip.map((friend) => {
    return friend.userIdA === userId ? friend.friendshipsAsB : friend.friendshipsAsA
  })
}
