import { NewUserCredential } from "../../models/dto/auth.dto.js"
import { prisma } from "../../lib/config/prisma.js"
import { User } from "@prisma/client"
import { signJwtToken } from "../../lib/jwt.js"
import { AuthToken } from "../../models/dto/auth.dto.js"

export class AuthRepository {

  public static readonly accessTokenExpiresIn: string = "60m"
  public static readonly refreshTokenExpiresIn: string = "30d"

  static async findUserByEmail(email: string): Promise<{ tokens: AuthToken, user: User }> {
    return await prisma.$transaction( async (tx) => {
      
      const user = await prisma.user.findUnique({
        where: {
          email: String(email)
        }
      }) as User

      const accessToken = signJwtToken(user.id, user.email, this.accessTokenExpiresIn)
      const refreshToken = signJwtToken(user.id, user.email, this.refreshTokenExpiresIn)

      await tx.refreshToken.create({
        data: {
          userId: String(user.id),
          refreshToken: String(refreshToken)
        }
      })

      return {
        tokens: {
          accessToken,
          refreshToken,
        },
        user: user
      }

    })
  }

  static async createNewUser(newUser: NewUserCredential): Promise<{ tokens: AuthToken, user: User }> {
    return await prisma.$transaction( async (tx) => {

      const user = await tx.user.create({
        data: {
          name: String(newUser.name),
          email: String(newUser.email),
          password: String(newUser.password)
        }
      })

      const accessToken = signJwtToken(user.id, user.email, this.accessTokenExpiresIn)
      const refreshToken = signJwtToken(user.id, user.email, this.refreshTokenExpiresIn)

      await tx.refreshToken.create({
        data: {
          userId: String(user.id),
          refreshToken: String(refreshToken)
        }
      })

      return {
        tokens: {
          accessToken,
          refreshToken,
        },
        user: user
      }
    })
  }

  static async deleteUser(userId: string): Promise<void> {
    await prisma.user.delete({
      where: {
        id: userId
      }
    })
  }

  static async storeRefreshToken(userId: string, refreshToken: string): Promise<any> {
    return await prisma.refreshToken.create({
      data: {
        userId: String(userId),
        refreshToken: String(refreshToken)
      }
    })
  }

  static async deleteRefreshToken(userId: string, refreshToken: string): Promise<any> {
    return await prisma.refreshToken.deleteMany({
      where: {
        userId: String(userId),
        refreshToken: String(refreshToken)
      }
    })
  }
  
  static async updateRefreshToken(userId: string, email: string, oldRefreshToken: string): Promise<AuthToken> {
    return await prisma.$transaction(async (tx) => {
      const newAccessToken = signJwtToken(userId, email, this.accessTokenExpiresIn)
      const newRefreshToken = signJwtToken(userId, email, this.refreshTokenExpiresIn)
      
      await tx.refreshToken.updateMany({
        where: {
          userId: String(userId),
          refreshToken: String(oldRefreshToken)
        },
        data: {
          refreshToken: String(newRefreshToken)
        }
      })

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
      }
    })
  }
  
}