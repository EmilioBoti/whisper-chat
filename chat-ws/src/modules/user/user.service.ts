import UserRepository from './user.repository.js'
import InternalErrorHandler from '../../lib/errors/InternalErrorHandler.js'
import { SimpleUser } from '../../models/dto/user.dto.js'
import UserMapper from '../../utils/mapers/user.mapper.js'

class UserService {

  static async createUserProfile(user: SimpleUser) {
    try {
      const result = await UserRepository.createUserProfile(user)
      return UserMapper.toSimpleUser(result)
    } catch (error) {
      throw InternalErrorHandler.handler(error)
    }
  }

}

export default UserService