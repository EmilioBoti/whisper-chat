import { AppError } from "../../models/AppError.js"
import { Prisma } from "@prisma/client"
import { BadRequestError, NotFoundError } from "./BadRequestError.js"
import { USER_REGISTERED_CODE_P2002, USER_REGISTERED_CODE_P2025 } from "../utils/constants.js"

export default class InternalErrorHandler {

  static handler(error: any): AppError | any {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error.code)
      switch(error.code) {
        case USER_REGISTERED_CODE_P2002:
          return new BadRequestError("This user Already exist.")
        case USER_REGISTERED_CODE_P2025:
          return new NotFoundError("Resource not found")
      }
    }
    return error
  }

}