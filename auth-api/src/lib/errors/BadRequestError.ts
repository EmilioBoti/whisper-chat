import { AppError } from "../../models/AppError.ts";

export class BadRequestError extends AppError {
  constructor(message = "Bad request", status = 400) {
    super(message, status);
  }

}