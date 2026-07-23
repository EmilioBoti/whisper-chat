import { createProfile, findUserFriends, findUsers } from './user.repository.js'
import { internalErrorHandler } from '../../lib/errors/InternalErrorHandler.js'
import { toBasicProfileInfo, toBasicProfileInfoList, toFriendProfileDto } from '../../utils/mapers/user.mapper.js'
import type { CreateUserProfileDto } from '../../models/dto/auth.dto.js'
import type { BasicUserInfoDto, ExploreUserDto, FriendUserDto } from '../../models/dto/user.dto.js'

export const createUserProfile = async (user: CreateUserProfileDto): Promise<BasicUserInfoDto> => {
  try {
    const result = await createProfile(user)
    return toBasicProfileInfo(result)
  } catch (error) {
    throw internalErrorHandler(error)
  }
}

export const exploreUsers = async (userId: string): Promise<ExploreUserDto[]> => {
  try {
    const result = await findUsers(true, userId)
    return toBasicProfileInfoList(userId, result)
  } catch (error) {
    throw internalErrorHandler(error)
  }
}

export const getUserFriends = async (userId: string): Promise<FriendUserDto[]> => {
  return await findUserFriends(userId)
    .then((data) => data.map((user) => toFriendProfileDto(user)))
    .catch((error) => {
      throw internalErrorHandler(error)
    })
}
