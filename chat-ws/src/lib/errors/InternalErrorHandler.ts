import type { AppError } from '../../models/AppError.js'
import { Prisma } from '@prisma/client'
import { BadRequestError } from './BadRequestError.js'
import { CODE_P2025, USER_REGISTERED_CODE_P2002 } from '../../utils/constants.js'
import { NotFoundError } from './NotFoundError.js'

export const internalErrorHandler = (error: unknown): AppError | unknown => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const err: Record<string, AppError> = {
      [USER_REGISTERED_CODE_P2002]: new BadRequestError('This user Already exist.'),
      [CODE_P2025]: new NotFoundError(),
    }
    return err[error.code]
  }
  return error
}
