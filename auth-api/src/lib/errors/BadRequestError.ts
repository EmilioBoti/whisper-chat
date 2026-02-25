import { AppError } from "../../models/AppError.js";

export class BadRequestError extends AppError {
  constructor(message = "Bad request", status = 400) {
    super(message, status);
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Resource not found", status = 404) {
    super(message, status);
  }
}