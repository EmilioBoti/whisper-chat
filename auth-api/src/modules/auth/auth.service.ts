import bcrypt from "bcrypt"
import { signJwtToken, verifyJwtToken } from "../../lib/jwt.js"
import InternalErrorHandler from "../../lib/errors/InternalErrorHandler.js"
import { BadRequestError } from "../../lib/errors/BadRequestError.js"
import { UnAuthorized } from "../../lib/errors/Unauthorized.js"
import { AuthRepository } from "./auth.repository.js"
import { isValidEmailFormat } from "../../lib/utils/validation.js"
import { AuthToken, LoginResponse, LogoutResponse } from "../../models/dto/auth.dto.js"
import { NewUserCredential } from "../../models/dto/auth.dto.js"
import { createProfile } from "../../lib/netwotk/client.chat.js"
import { User } from "@prisma/client"
import AuthMapper from "../../lib/utils/mapper/auth.mapper.js"

export class AuthService {

  public static readonly saltRounds: number = 10
  public static readonly accessTokenExpiresIn: string = "60m"
  public static readonly refreshTokenExpiresIn: string = "30d"


  static async loginUser(newUser: NewUserCredential): Promise<LoginResponse> {
    try {
      const result = await AuthRepository.findUserByEmail(newUser.email)
      const hashPassword = await bcrypt.compare(newUser.password, result.user?.password ?? "")

      if(!result) throw new UnAuthorized("User does not extist.")
      if(!isValidEmailFormat(newUser.email) || !hashPassword) throw new BadRequestError("Invalid email or password.")
      return AuthMapper.toAuthResponse(result.tokens, result.user)
    } catch (error) {
      throw InternalErrorHandler.handler(error)
    }
  }

  static async registerNewUser(newUser: NewUserCredential): Promise<LoginResponse> {
    let createdUser: User | undefined = undefined

    try {
      const salt = await bcrypt.genSalt(this.saltRounds)
      const hashPassword = await bcrypt.hash(newUser.password, salt)
      const result = await AuthRepository.createNewUser({...newUser, password: hashPassword})

      createdUser = result.user

      await createProfile(result.user.id, result.user.name)
      
      return AuthMapper.toAuthResponse(result.tokens, result.user)
    } catch (error) {
      /**
       * If createProfile fails delete the newUser created
       */
      if (createdUser) {
        await AuthRepository.deleteUser(createdUser.id)
      }
      throw InternalErrorHandler.handler(error)
    }
  }

  static async logoutUser(refreshToken: string): Promise<LogoutResponse> {
    try {
      const { userId } = verifyJwtToken(refreshToken)
      const result = await AuthRepository.deleteRefreshToken(userId, refreshToken)
      
      if(result.count <= 0) {
        throw new BadRequestError("Failed to logout user, no refresh token found.")
      }

      const logoutResponse: LogoutResponse = {
        isSuccess: true,
        message: "Logout successful."
      }
      return logoutResponse
    } catch (error) {
      throw InternalErrorHandler.handler(error)
    }
  }

  static async refreshToken(oldRefreshToken: string): Promise<AuthToken> {
    try {
      const { userId, email } = verifyJwtToken(oldRefreshToken)
      return await AuthRepository.updateRefreshToken(userId, email, oldRefreshToken)
    } catch (error) {
      throw InternalErrorHandler.handler(error)
    }
  }

}