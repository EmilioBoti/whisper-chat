export interface UserDto {
  id: string,
  name: string,
  email: string,
  password?: string,
  isPublic: boolean,
  createAt: string
}