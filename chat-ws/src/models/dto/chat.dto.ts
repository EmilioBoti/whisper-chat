import { SimpleProfile } from './user.dto.js'

export class SimpleChat {
  constructor(
    id: string,
    type: string,
    createdBy: string,
    createdAt: string
  ){}
}

export class UserChat {
  constructor(
    id: string,
    type: string,
    createdBy: string,
    createdAt: string,
    members: Member[]
  ){}
}

export class Member {
  constructor(
    id: string,
    chatId: string,
    role: string,
    joinedAt: string,
    profile: SimpleProfile
  ){}
}