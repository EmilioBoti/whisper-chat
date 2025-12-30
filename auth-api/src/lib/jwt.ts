import jwt from "jsonwebtoken"

const secret_key: string = process.env.JWT_SECRET ?? ''

export const signJwtToken = (userId: string, email: string, expiresIn: string): string => {
  return jwt.sign({ userId: userId, email: email }, secret_key, { expiresIn: expiresIn })
}