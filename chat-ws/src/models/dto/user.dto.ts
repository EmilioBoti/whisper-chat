import type { FriendShipStatus } from '@prisma/client'

export interface ProfileUserDto {
  id: string
  name: string
  email: string
  lastname: string
  photo?: string | null | undefined
  isPublic: boolean
  about: string
  birthdate: string
  createdAt: string
}

export type ExploreUserDto = Omit<ProfileUserDto, 'about' | 'birthdate' | 'createdAt' | 'lastname'> & {
  request?:
    | {
        id: string
        friendStatus?: FriendShipStatus | undefined | null
      }
    | undefined
    | null
}
export type BasicUserInfoDto = Pick<ProfileUserDto, 'id' | 'name' | 'email' | 'isPublic' | 'photo'>
export type FriendUserDto = Pick<ProfileUserDto, 'id' | 'name' | 'photo' | 'lastname'>
