import type { AuthJwtPayload } from '../models/dto/auth.dto.js'

/**
 * Extend Express Request object to add USER field
 */
declare global {
  namespace Express {
    interface Request {
      user: AuthJwtPayload
    }
  }
}

export {}
