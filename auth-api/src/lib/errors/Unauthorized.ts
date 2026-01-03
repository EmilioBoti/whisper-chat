import { AppError } from "../../models/AppError.ts"

export class UnAuthorized extends AppError {
  constructor(
    message: string = "Unauthorized"
  ){
    super(message, 401)
 }
}