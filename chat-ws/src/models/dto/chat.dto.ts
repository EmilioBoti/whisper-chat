import type { SimpleProfile } from './user.dto.js'

export class SimpleChat {
  id = ''
  type = ''
  createdBy = ''
  createdAt = ''
  constructor(id: string, type: string, createdBy: string, createdAt: string) {
    this.id = id
    this.type = type
    this.createdBy = createdBy
    this.createdAt = createdAt
  }
}

export class UserChat extends SimpleChat {
  id = ''
  type = ''
  createdBy = ''
  createdAt = ''
  members: Member[] = []
  constructor(id: string, type: string, createdBy: string, createdAt: string, members: Member[]) {
    super(id, type, createdBy, createdAt)
    this.members = members
  }
}

export class Member {
  id = ''
  chatId = ''
  role = ''
  joinedAt = ''
  profile: SimpleProfile
  constructor(id: string, chatId: string, role: string, joinedAt: string, profile: SimpleProfile) {
    this.id = id
    this.chatId = chatId
    this.role = role
    this.joinedAt = joinedAt
    this.profile = profile
  }
}
