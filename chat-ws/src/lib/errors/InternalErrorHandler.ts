import { AppError } from '../../models/AppError.js'
import { Prisma } from '@prisma/client'
import { BadRequestError } from './BadRequestError.js'
import { USER_REGISTERED_CODE_P2002 } from '../../utils/constants.js'

export default class InternalErrorHandler {

  static handler(error: any): AppError | any {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch(error.code) {
        case USER_REGISTERED_CODE_P2002: 
          return new BadRequestError("This user Already exist.")
      }
    }
    return error
  }

}