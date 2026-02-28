import jwt from 'jsonwebtoken'
import type { AuthJwtPayload } from '../models/dto/auth.dto.js'
import { UnAuthorized } from './errors/Unauthorized.js'

const secret_key: string = process.env.JWT_SECRET ?? ''

export const signJwtToken = (userId: string, email: string, expiresIn: string): string => {
  return jwt.sign({ userId: userId, email: email }, secret_key, { expiresIn: expiresIn })
}

/**
 * @param token
 * @returns AuthJwtPayload
 * @throws BadRequestError if token is invalid of has expired
 */
export const verifyJwtToken = (token: string): AuthJwtPayload => {
  try {
    return jwt.verify(token, secret_key, { complete: true }).payload as AuthJwtPayload
  } catch {
    throw new UnAuthorized('Invalid or expired token.')
  }
}
