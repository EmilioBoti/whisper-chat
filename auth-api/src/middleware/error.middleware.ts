import type { Request, Response, NextFunction } from 'express'
import { AppError } from '../models/AppError.js'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorMiddleware = (err: Error, req: Request, res: Response, _next: NextFunction) => {
  console.error(err)
  if (err instanceof AppError) {
    return res.status(err.status).json({
      message: err.message,
    })
  }

  // Unknown errors
  return res.status(500).json({
    message: 'Internal server error',
  })
}
