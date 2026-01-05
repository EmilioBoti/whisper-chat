import { NewUserModel } from "../../models/dto/user.dtoSchema.js"
import { prisma } from "../../lib/config/prisma.js"
import { User } from "@prisma/client"


export class AuthRepository {

  static async findUserByEmail(email: string): Promise<User> {
    return await prisma.user.findUnique({
      where: {
        email: String(email)
      }
    }) as User
  }

  static async createNewUser(newUser: NewUserModel): Promise<User> {
    return await prisma.user.create({
      data: {
        name: String(newUser.name),
        email: String(newUser.email),
        password: String(newUser.password),
        isPublic: true
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
  
  static async updateRefreshToken(userId: string, oldRefreshToken: string, newRefreshToken: string): Promise<any> {
    return await prisma.refreshToken.updateMany({
      where: {
        userId: String(userId),
        refreshToken: String(oldRefreshToken)
      },
      data: {
        refreshToken: String(newRefreshToken)
      }
    })
  }
  
}