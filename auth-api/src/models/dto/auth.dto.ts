import { UserModel } from "./user.dtoSchema.ts"

export interface LoginResponse {
 tokens: {
   accessToken: string,
   refreshToken: string
 },
  user: UserModel
}

export interface TokenAuth {
  accessToken: string,
  refreshToken: string
}

export interface AuthJwtPayload {
  userId: string,
  email: string,
  iat: number,
  exp: number
}

export interface LogoutResponse {
  isSuccess: boolean,
  message: string
}