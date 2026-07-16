export interface ProfileUserDto {
  id: string
  name: string
  email: string
  photo?: string | null | undefined
  isPublic: boolean
  about: string
  birthdate: string
  createdAt: string
}

export type ExploreUserDto = Pick<ProfileUserDto, 'id' | 'name' | 'email'> & { isFriend: boolean }
export type BasicUserInfoDto = Pick<ProfileUserDto, 'id' | 'name' | 'email' | 'isPublic' | 'photo'>
