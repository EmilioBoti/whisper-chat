import { AppError } from '../../models/AppError.js'

export class UnAuthorized extends AppError {
  constructor(message = 'Unauthorized') {
    super(message, 401)
  }
}
