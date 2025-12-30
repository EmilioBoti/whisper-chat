import { NewUserDto } from "../../models/NewUserDto.ts"
import { AppError } from "../../models/AppError.ts"
import { BadRequestError } from "./BadRequestError.ts"
import { isValidEmailFormat, isValidPwdFormat, isValidUsername } from "../utils/validation.ts"


export const singUpErrorHandler = (newUser: NewUserDto): AppError | undefined => {
  if(!newUser.name || !newUser.email || !newUser.password) {
    return new BadRequestError("Bad request.")
  }

  if(!isValidUsername(newUser.name) || !isValidEmailFormat(newUser.email) || !isValidPwdFormat(newUser.password)) {
    return new BadRequestError("Invalid username, email or password.")
  }
  return undefined
}