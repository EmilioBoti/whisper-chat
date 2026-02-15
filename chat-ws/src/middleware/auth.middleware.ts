
import type { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { UnAuthorized } from "../lib/errors/Unauthorized.js"
import { AuthPayload } from "src/models/schema/authPayload.js"

const secret_key: string = process.env.JWT_SECRET ?? ''


/**
 * Extend Express Request object to add USER field
 */
declare global {
  namespace Express {
    interface Request {
      user: AuthPayload
    }
  }
}


export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization']

  if (!authHeader) {
    throw new UnAuthorized("Unauthorized: No token provided.")
  }

  if(!authHeader.startsWith('Bearer ')) {
    throw new UnAuthorized("Unauthorized: Invalid token format.")
  }

  try {
    const token = authHeader.split(' ')[1]

    if(!token) {
      throw new UnAuthorized("Unauthorized: No token provided.")
    }
    /**
     * Skip token verification for refresh token endpoint
     */
    if (req.path === '/refresh') return next()

    /**
     * @throws BadRequestError if token is invalid or has expired
     */

    req.user = varifyToken(token)

    return next()
  } catch (error) {
    throw new UnAuthorized("Invalid or expired token")
  }

}

/**
 * 
 * @param token 
 * @returns AuthJwtPayload
 * @throws BadRequestError if token is invalid of has expired
 */
export const varifyToken = (token: string): AuthPayload => {
  try {
    const payload =  jwt.verify(token, secret_key, { complete: true }).payload as AuthPayload
    return payload
  } catch (error) {
    throw new UnAuthorized("Invalid or expired token.")
  }
  
}




export default authMiddleware