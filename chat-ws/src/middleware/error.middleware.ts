import type { Request, Response, NextFunction } from 'express'
import { AppError } from '../models/AppError.js'

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Unknown errors
  if (process.env.NODE_ENV !== "production") console.error(err)

  if(err instanceof AppError) {
    return res.status(err.status).json({
      message: err.message
    })
  }

  return res.status(500).json({
    message: "Internal server error"
  })

}