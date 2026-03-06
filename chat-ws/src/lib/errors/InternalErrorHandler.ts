import type { AppError } from '../../models/AppError.js'
import { Prisma } from '@prisma/client'
import { BadRequestError } from './BadRequestError.js'
import { USER_REGISTERED_CODE_P2002 } from '../../utils/constants.js'

export const internalErrorHandler = (error: unknown): AppError | unknown => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const err: Record<string, AppError> = {
      [USER_REGISTERED_CODE_P2002]: new BadRequestError('This user Already exist.'),
    }
    return err[error.code]
  }
  return error
}
