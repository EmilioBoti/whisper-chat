import type { MessageDTO } from './messange.dto.js'
import type { BasicUserInfoDto } from './user.dto.js'

export interface ChatDto {
  id: string
  type: string
  createdBy: string
  createdAt: string
  lastMessages?: MessageDTO | undefined
  members: MemberDto[]
}

export interface MemberDto {
  id: string
  chatId: string
  role: string
  joinedAt: string
  profile?: BasicUserInfoDto | null | undefined
}

export interface NewChatSchema {
  chatId: string
  members: string[]
}
