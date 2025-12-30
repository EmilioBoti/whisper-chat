import bcrypt from "bcrypt"
import { NewUserDto } from "../../models/NewUserDto.ts"
import { AuthRepository } from "./auth.repository.ts"
import { User } from "@prisma/client"
import InternalErrorHandler from "../../lib/errors/InternalErrorHandler.ts"
import { signJwtToken } from "../../lib/jwt.ts"
import { LoginResponse } from "../../models/LoginResponse.ts"


export class AuthService {
  public static readonly saltRounds: number = 10
  public static readonly accessTokenExpiresIn: string = "15m"
  public static readonly refreshTokenExpiresIn: string = "30d"


  static async loginUser(newUser: NewUserDto): Promise<User> {
    try {
      const hashPassword = await bcrypt.hash(newUser.password, this.saltRounds)
      console.log("Hashed Password:", hashPassword)
      const result = await AuthRepository.findUserByEmail(newUser.email)
      return result
    } catch (error: any) {
      throw InternalErrorHandler.handler(error)
    }
  }

  static async registerNewUser(newUser: NewUserDto): User {
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
    } catch (error: any) {
      throw InternalErrorHandler.handler(error)
    }
  }

}