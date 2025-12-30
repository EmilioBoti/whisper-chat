import { AppError } from "../../models/AppError.ts";

export class BadRequestError extends AppError {
  constructor(message = "Bad request") {
    super(message, 400)
  }

}