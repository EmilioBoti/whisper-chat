import { AppError } from '../../models/AppError.js'

export class NotFoundError extends AppError {
  constructor(message = 'Not found', status = 404) {
    super(message, status)
  }
}
