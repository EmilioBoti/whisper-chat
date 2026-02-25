import { User } from '@prisma/client'
import { AuthToken, LoginResponse } from '../../../models/dto/auth.dto.js'

export default class AuthMapper {

  static toAuthResponse(tokens: AuthToken, user: User) {
    const authResponse: LoginResponse = {
      tokens: { ...tokens },
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createAt.toISOString()
      }
    }
    return authResponse
  }

}