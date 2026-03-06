import bcrypt from 'bcrypt'
import { verifyJwtToken } from '../../lib/jwt.js'
import { internalErrorHandler } from '../../lib/errors/InternalErrorHandler.js'
import { BadRequestError } from '../../lib/errors/BadRequestError.js'
import { UnAuthorized } from '../../lib/errors/Unauthorized.js'
import * as AuthRepository from './auth.repository.js'
import { isValidEmailFormat } from '../../lib/utils/validation.js'
import type { AuthToken, LoginResponse, LogoutResponse } from '../../models/dto/auth.dto.js'
import type { NewUserCredential } from '../../models/dto/auth.dto.js'
import { createProfile } from '../../lib/netwotk/client.chat.js'
import type { User } from '@prisma/client'
import { toAuthResponse } from '../../lib/utils/mapper/auth.mapper.js'

const saltRounds = 10

export const loginUser = async (newUser: NewUserCredential): Promise<LoginResponse> => {
  try {
    const result = await AuthRepository.logUserIn(newUser.email)

    if (!result) throw new UnAuthorized('User does not extist.')

    const hashPassword = await bcrypt.compare(newUser.password, result.user.password)

    if (!isValidEmailFormat(newUser.email) || !hashPassword) {
      throw new BadRequestError('Invalid email or password.')
    }

    return toAuthResponse(result.tokens, result.user)
  } catch (error) {
    throw internalErrorHandler(error)
  }
}

export const registerNewUser = async (newUser: NewUserCredential): Promise<LoginResponse> => {
  let createdUser: User | undefined = undefined

  try {
    const salt = await bcrypt.genSalt(saltRounds)
    const hashPassword = await bcrypt.hash(newUser.password, salt)
    const result = await AuthRepository.createNewUser({ ...newUser, password: hashPassword })

    createdUser = result.user

    await createProfile(result.user.id, result.user.name)

    return toAuthResponse(result.tokens, result.user)
  } catch (error) {
    /**
     * If createProfile fails delete the newUser created
     */
    if (createdUser) {
      await AuthRepository.deleteUser(createdUser.id)
    }
    throw internalErrorHandler(error)
  }
}

export const logoutUser = async (refreshToken: string): Promise<LogoutResponse> => {
  try {
    const { userId } = verifyJwtToken(refreshToken)
    const result = await AuthRepository.deleteRefreshToken(userId, refreshToken)

    if (result <= 0) {
      throw new BadRequestError('Failed to logout user, no refresh token found.')
    }

    const logoutResponse: LogoutResponse = {
      isSuccess: true,
      message: 'Logout successful.',
    }
    return logoutResponse
  } catch (error) {
    throw internalErrorHandler(error)
  }
}

export const deleteUserAccount = async (id: string): Promise<void> => {
  try {
    await AuthRepository.deleteUser(id)
  } catch (error) {
    throw internalErrorHandler(error)
  }
}

export const refreshToken = async (oldRefreshToken: string): Promise<AuthToken> => {
  try {
    const { userId, email } = verifyJwtToken(oldRefreshToken)
    return await AuthRepository.updateRefreshToken(userId, email, oldRefreshToken)
  } catch (error) {
    throw internalErrorHandler(error)
  }
}
