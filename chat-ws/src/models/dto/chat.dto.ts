import type { MessageDTO } from './messange.dto.js'
import type { SimpleProfile } from './user.dto.js'

export class SimpleChat {
  id = ''
  type = ''
  createdBy = ''
  createdAt = ''
  lastMessages?: MessageDTO | undefined
  constructor(id: string, type: string, createdBy: string, createdAt: string, lastMessages?: MessageDTO) {
    this.id = id
    this.type = type
    this.createdBy = createdBy
    this.createdAt = createdAt
    this.lastMessages = lastMessages
  }
}

export class ChatRoom extends SimpleChat {
  id = ''
  type = ''
  createdBy = ''
  createdAt = ''
  members?: Member[] | undefined
  constructor(
    id: string,
    type: string,
    createdBy: string,
    createdAt: string,
    members?: Member[],
    lastMessages?: MessageDTO,
  ) {
    super(id, type, createdBy, createdAt, lastMessages)
    this.members = members
  }
}

export type ChatRoomWithMember = Omit<ChatRoom, 'messages'>

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
