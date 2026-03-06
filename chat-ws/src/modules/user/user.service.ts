import { createProfile, findUsers } from './user.repository.js'
import { internalErrorHandler } from '../../lib/errors/InternalErrorHandler.js'
import type { SimpleProfile, SimpleUser } from '../../models/dto/user.dto.js'
import { toSimpleUser, toSimpleUserList } from '../../utils/mapers/user.mapper.js'

export const createUserProfile = async (user: SimpleUser): Promise<SimpleProfile> => {
  try {
    const result = await createProfile(user)
    return toSimpleUser(result)
  } catch (error) {
    throw internalErrorHandler(error)
  }
}

export const exploreUsers = async (): Promise<SimpleProfile[]> => {
  try {
    const result = await findUsers(false)
    return toSimpleUserList(result)
  } catch (error) {
    throw internalErrorHandler(error)
  }
}
