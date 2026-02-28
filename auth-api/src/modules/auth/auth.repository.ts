import type { NewUserCredential } from '../../models/dto/auth.dto.js'
import { prisma } from '../../lib/config/prisma.js'
import type { Session, User } from '@prisma/client'
import { signJwtToken } from '../../lib/jwt.js'
import type { AuthToken } from '../../models/dto/auth.dto.js'

const accessTokenExpiresIn: string = process.env.NODE_ENV === 'production' ? '15m' : '1h'
const refreshTokenExpiresIn = '30d'

export const logUserIn = async (email: string): Promise<{ tokens: AuthToken; user: User } | null> => {
  return await prisma.$transaction(async (tx) => {
    const user = await tx.user.findUnique({
      where: {
        email: String(email),
      },
    })

    if (!user) return null

    const accessToken = signJwtToken(user.id, user.email, accessTokenExpiresIn)
    const refreshToken = signJwtToken(user.id, user.email, refreshTokenExpiresIn)

    await tx.session.create({
      data: {
        userId: String(user.id),
        refreshToken: String(refreshToken),
      },
    })

    return {
      tokens: {
        accessToken,
        refreshToken,
      },
      user: user,
    }
  })
}

export const createNewUser = async (newUser: NewUserCredential): Promise<{ tokens: AuthToken; user: User }> => {
  return await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        name: String(newUser.name),
        email: String(newUser.email),
        password: String(newUser.password),
      },
    })

    const accessToken = signJwtToken(user.id, user.email, accessTokenExpiresIn)
    const refreshToken = signJwtToken(user.id, user.email, refreshTokenExpiresIn)

    await tx.session.create({
      data: {
        userId: String(user.id),
        refreshToken: String(refreshToken),
      },
    })

    return {
      tokens: {
        accessToken,
        refreshToken,
      },
      user: user,
    }
  })
}

export const deleteUser = async (userId: string): Promise<User> => {
  return await prisma.user.delete({
    where: {
      id: userId,
    },
  })
}

export const storeRefreshToken = async (userId: string, refreshToken: string): Promise<Session> => {
  return await prisma.session.create({
    data: {
      userId: String(userId),
      refreshToken: String(refreshToken),
    },
  })
}

export const deleteRefreshToken = async (userId: string, refreshToken: string): Promise<number> => {
  const sessions = await prisma.session.deleteMany({
    where: {
      userId: String(userId),
      refreshToken: String(refreshToken),
    },
  })
  return sessions.count
}

export const updateRefreshToken = async (
  userId: string,
  email: string,
  oldRefreshToken: string,
): Promise<AuthToken> => {
  return await prisma.$transaction(async (tx) => {
    const newAccessToken = signJwtToken(userId, email, accessTokenExpiresIn)
    const newRefreshToken = signJwtToken(userId, email, refreshTokenExpiresIn)
    await tx.session.updateMany({
      where: {
        userId: String(userId),
        refreshToken: String(oldRefreshToken),
      },
      data: {
        refreshToken: String(newRefreshToken),
      },
    })

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    }
  })
}
