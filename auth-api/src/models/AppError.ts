export class AppError extends Error {
  public readonly status: number

  constructor(
    message: string = "Internal error",
    status: number = 500,
  ) {
    super(message)
    this.status = status

    Error.captureStackTrace(this, this.constructor)
  }
}