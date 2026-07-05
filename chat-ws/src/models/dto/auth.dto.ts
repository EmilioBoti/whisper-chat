export class AuthUser {
  id = ''
  name = ''
  email = ''
  password?: string | null
  createdAt = ''

  constructor(id: string, name: string, email: string, createdAt: string, password?: string) {
    this.id = id
    this.email = email
    this.name = name
    this.password = password
    this.createdAt = createdAt
  }
}

export interface LoginResponse {
  tokens: AuthToken
  user: SimpleAuthUser
}

export interface AuthJwtPayload {
  userId: string
  email: string
}

export interface LogoutResponse {
  isSuccess: boolean
  message: string
}

export interface AuthToken {
  accessToken: string
  refreshToken: string
}

export type SimpleAuthUser = Omit<AuthUser, 'password'>
type BaseCredential = Pick<AuthUser, 'name' | 'email'>
export type NewUserCredential = BaseCredential & { password: string }
