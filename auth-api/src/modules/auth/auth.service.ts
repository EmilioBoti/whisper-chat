import bcrypt from "bcrypt"
import { signJwtToken, verifyJwtToken } from "../../lib/jwt.js"
import InternalErrorHandler from "../../lib/errors/InternalErrorHandler.js"
import { BadRequestError } from "../../lib/errors/BadRequestError.js"
import { UnAuthorized } from "../../lib/errors/Unauthorized.js"
import { AuthRepository } from "./auth.repository.js"
import { isValidEmailFormat } from "../../lib/utils/validation.js"
import { AuthToken, LoginResponse, LogoutResponse } from "../../models/dto/auth.dto.js"
import { NewUserModel } from "../../models/dto/user.dtoSchema.js"


export class AuthService {

  public static readonly saltRounds: number = 10
  public static readonly accessTokenExpiresIn: string = "15m"
  public static readonly refreshTokenExpiresIn: string = "30d"


  static async loginUser(newUser: NewUserModel): Promise<LoginResponse> {
    try {
      const result = await AuthRepository.findUserByEmail(newUser.email)
      const hashPassword = await bcrypt.compare(newUser.password, result?.password ?? "")

      if(!result) throw new UnAuthorized("User does not extist.")
      if(!isValidEmailFormat(newUser.email) || !hashPassword) throw new BadRequestError("Invalid email or password.")

      const accessToken = signJwtToken(result.id, result.email, this.accessTokenExpiresIn)
      const refreshToken = signJwtToken(result.id, result.email, this.refreshTokenExpiresIn)

      /**
       * Store refresh token in DB
       */
      await AuthRepository.storeRefreshToken(result.id, refreshToken)

      const userResponse: LoginResponse = {
        tokens: {
          accessToken,
          refreshToken,
        },
        user: {
          id: result.id,
          name: result.name,
          email: result.email,
          isPublic: result.isPublic,
          createAt: result.createAt.toISOString()
        }
      }
      return userResponse
    } catch (error) {
      throw InternalErrorHandler.handler(error)
    }
  }

  static async registerNewUser(newUser: NewUserModel): Promise<LoginResponse> {
    try {
      const salt = await bcrypt.genSalt(this.saltRounds)
      const hashPassword = await bcrypt.hash(newUser.password, salt)
      const result = await AuthRepository.createNewUser({...newUser, password: hashPassword})

      const accessToken = signJwtToken(result.id, result.email, this.accessTokenExpiresIn)
      const refreshToken = signJwtToken(result.id, result.email, this.refreshTokenExpiresIn)

      /**
       * Store refresh token in DB
       */
      await AuthRepository.storeRefreshToken(result.id, refreshToken)
      
      const userResponse: LoginResponse = {
        tokens: {
          accessToken,
          refreshToken,
        },
        user: {
          id: result.id,
          name: result.name,
          email: result.email,
          isPublic: result.isPublic,
          createAt: result.createAt.toISOString()
        }
      }
      return userResponse
    } catch (error) {
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
      const newAccessToken = signJwtToken(userId, email, this.accessTokenExpiresIn)
      const newRefreshToken = signJwtToken(userId, email, this.refreshTokenExpiresIn)
      
      /**
       * Update refresh token in DB
       */
      const tokenUpdated =  await AuthRepository.updateRefreshToken(userId, oldRefreshToken, newRefreshToken)

      if(tokenUpdated.count <= 0) {
        throw new BadRequestError("Failed to refresh token, no refresh token found.")
      }

      const token: AuthToken = {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
      }
      return token
    } catch (error) {
      throw InternalErrorHandler.handler(error)
    }
  }

}