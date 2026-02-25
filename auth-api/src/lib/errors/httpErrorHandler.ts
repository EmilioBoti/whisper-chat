import { BadRequestError } from "./BadRequestError.js"
import { isValidEmailFormat, isValidPwdFormat, isValidUsername } from "../utils/validation.js"
import { AppError } from "../../models/AppError.js"
import { NewUserCredential } from "../../models/dto/auth.dto.js"


export const singUpErrorHandler = (newUser: NewUserCredential): AppError | undefined => {
  if(!newUser.name || !newUser.email || !newUser.password) {
    return new BadRequestError("Bad request.")
  }

  if(!isValidUsername(newUser.name) || !isValidEmailFormat(newUser.email) || !isValidPwdFormat(newUser.password)) {
    return new BadRequestError("Invalid username, email or password.")
  }
  return undefined
}