import type { AppError } from '../../models/AppError.js'
import { Prisma } from '@prisma/client'
import { BadRequestError, NotFoundError } from './BadRequestError.js'
import { USER_REGISTERED_CODE_P2002, USER_REGISTERED_CODE_P2025 } from '../utils/constants.js'

export const internalErrorHandler = (error: unknown): AppError | unknown => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const err: Record<string, AppError> = {
      [USER_REGISTERED_CODE_P2002]: new BadRequestError('This user Already exist.'),
      [USER_REGISTERED_CODE_P2025]: new NotFoundError('Resource not found'),
    }
    return err[error.code]
  }
  return error
}
