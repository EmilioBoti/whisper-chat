import { UserModel } from "./User.dto.ts"

export interface LoginResponse {
 tokens: {
   accessToken: string,
   refreshToken: string
 },
  user: UserModel
}