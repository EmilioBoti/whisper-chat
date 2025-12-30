import { AppError } from "../../models/AppError.ts"
import { Prisma } from "@prisma/client"
import { BadRequestError } from "./BadRequestError.ts"
import { USER_REGISTERED_CODE_P2002 } from "../utils/constants.ts"

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