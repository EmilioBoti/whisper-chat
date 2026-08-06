import type { Message, Profile } from '@prisma/client'
import type {
  ChatMemberProfile,
  ChatWithMembers,
  ChatWithMessage,
  MemberWithProfile,
} from '../../models/db.model/chat.model.js'
import type { ChatDto, MemberDto } from '../../models/dto/chat.dto.js'
import type { BasicUserInfoDto } from '../../models/dto/user.dto.js'
import type { PaginatedMessages } from '../../models/dto/messange.dto.js'
import { MessageDTO } from '../../models/dto/messange.dto.js'

// chat.mapper.ts
export const toListUserChat = (chats: ChatMemberProfile[]): ChatDto[] => {
  return chats.map((chat) => toUserChat(chat))
}

export const toSimpleChat = (chat: ChatWithMembers): ChatDto => {
  return {
    id: chat.id,
    type: chat.type,
    createdBy: chat.createdBy,
    createdAt: chat.createdAt.toISOString(),
    members: chat.members.map((member) => ({
      id: member.id,
      chatId: member.chatId,
      role: member.role,
      joinedAt: member.joinedAt.toISOString(),
    })),
  }
}

export const toUserChat = (chat: ChatMemberProfile): ChatDto => {
  return {
    id: chat.id,
    type: chat.type.toString(),
    createdBy: chat.createdBy,
    createdAt: chat.createdAt.toISOString(),
    members: chat.members.map((member) => toMember(member)),
    lastMessages: chat.messages[0] ? toMessage(chat.messages[0]) : undefined,
  }
}

export const toMessage = (message: Message): MessageDTO => {
  return new MessageDTO(message)
}

export const toMessages = (chatWithMessage: ChatWithMessage[]): MessageDTO[] => {
  return chatWithMessage.flatMap((chat) => {
    return chat.messages.map((sms) => new MessageDTO(sms))
  })
}

export const toPaginatedMessages = (messages: Message[], limit: number): PaginatedMessages => {
  return {
    nextCursor: messages.length === limit ? messages[messages.length - 1].id : null,
    messages: messages.map((message) => toMessage(message)),
  }
}

export const toMember = (member: MemberWithProfile): MemberDto => {
  return {
    id: member.id,
    chatId: member.chatId,
    role: member.role.toString(),
    joinedAt: member.joinedAt.toISOString(),
    profile: toBasicProfileInfo(member.profile),
  }
}

export const toBasicProfileInfo = (profile: Profile): BasicUserInfoDto => {
  return {
    id: profile.id,
    name: profile.name,
    email: profile.email,
    photo: profile.photo,
    isPublic: profile.isPublic,
  }
}
