import type { FriendShipStatus } from '@prisma/client'

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

export type ExploreUserDto = Omit<ProfileUserDto, 'about' | 'birthdate' | 'createdAt'> & {
  request?:
    | {
        id: string
        friendStatus?: FriendShipStatus | undefined | null
      }
    | undefined
    | null
}
export type BasicUserInfoDto = Pick<ProfileUserDto, 'id' | 'name' | 'email' | 'isPublic' | 'photo'>
