import { UserDto } from "./UserDto.ts"

export interface LoginResponse {
 tokens: {
   accessToken: string,
   refreshToken: string
 },
  user: UserDto
}