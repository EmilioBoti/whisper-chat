import type { Request, Response, NextFunction } from 'express'
import { AppError } from '../models/AppError.js'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorMiddleware = (err: Error, req: Request, res: Response, _next: NextFunction) => {
  console.error(err)

  if (err instanceof AppError) {
    return res.status(err.status).json({
      code: err.status,
      message: err.message,
    })
  }

  return res.status(500).json({
    code: 500,
    message: 'Internal server error',
  })
}
