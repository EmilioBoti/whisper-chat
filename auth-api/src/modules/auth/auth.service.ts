import bcrypt from "bcrypt"
import { signJwtToken, verifyJwtToken } from "../../lib/jwt.ts"
import InternalErrorHandler from "../../lib/errors/InternalErrorHandler.ts"
import { BadRequestError } from "../../lib/errors/BadRequestError.ts"
import { UnAuthorized } from "../../lib/errors/Unauthorized.ts"
import { AuthRepository } from "./auth.repository.ts"
import { isValidEmailFormat } from "../../lib/utils/validation.ts"
import { LoginResponse, LogoutResponse } from "../../models/dto/auth.dto.ts"
import { NewUserModel } from "../../models/dto/user.dtoSchema.ts"


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
          createAt: result.createAt
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
          createAt: result.createAt
        }
      }
      return userResponse
    } catch (error) {
      throw InternalErrorHandler.handler(error)
    }
  }

  static async logoutUser(refreshToken: string): Promise<LogoutResponse> {
    try {
      const decodedToken = verifyJwtToken(refreshToken).payload
      const userId = (decodedToken as any).userId
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

}