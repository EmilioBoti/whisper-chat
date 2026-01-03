export interface UserModel {
  id: string,
  name: string,
  email: string,
  password?: string,
  isPublic: boolean,
  createAt: string
}

export interface NewUserModel {
  name: string,
  email: string,
  password: string
}