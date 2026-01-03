import { NewUserModel } from "../../models/dto/user.dtoSchema.ts"
import { prisma } from "../../lib/config/prisma.ts"
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
  
}