
import type { Request, Response, NextFunction } from "express"
import { UnAuthorized } from "../lib/errors/Unauthorized.ts"
import { verifyJwtToken } from "../lib/jwt.ts"


const authMiddleware = (
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
    verifyJwtToken(token)


    return next()
  } catch (error) {
    throw new UnAuthorized("Invalid or expired token")
  }

}

export default authMiddleware
