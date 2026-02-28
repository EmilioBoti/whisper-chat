export class AppError extends Error {
  public readonly status: number

  constructor(message = 'Internal error', status = 500) {
    super(message)
    this.status = status

    Error.captureStackTrace(this, this.constructor)
  }
}
