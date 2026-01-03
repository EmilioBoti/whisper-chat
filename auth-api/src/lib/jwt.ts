import jwt, { Jwt } from "jsonwebtoken"
import { BadRequestError } from "./errors/BadRequestError.ts"

const secret_key: string = process.env.JWT_SECRET ?? ''

export const signJwtToken = (userId: string, email: string, expiresIn: string): string => {
  return jwt.sign({ userId: userId, email: email }, secret_key, { expiresIn: expiresIn })
}

export const verifyJwtToken = (token: string): Jwt => {
  try {
    return jwt.verify(token, secret_key, { complete: true })
  } catch (error) {
    throw new BadRequestError("Invalid token.")
  }
  
}