import { UserModel } from "./user.dtoSchema.ts"

export interface LoginResponse {
  tokens: AuthToken,
  user: UserModel
}

export interface TokenAuth {
  accessToken: string,
  refreshToken: string
}

export interface AuthJwtPayload {
  userId: string,
  email: string
}

export interface LogoutResponse {
  isSuccess: boolean,
  message: string
}

export interface AuthToken {
  accessToken: string,
  refreshToken: string
}