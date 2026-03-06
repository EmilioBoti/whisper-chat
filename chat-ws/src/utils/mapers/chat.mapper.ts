import type { Message, Profile } from '@prisma/client'
import type { ChatMemberProfile, ChatWithMembers, MemberWithProfile } from '../../models/db.model/chat.model.js'
import type { ChatRoom, ChatRoomWithMember, Member, SimpleChat } from '../../models/dto/chat.dto.js'
import type { SimpleProfile } from '../../models/dto/user.dto.js'
import type { MessageDTO, PaginatedMessages } from 'src/models/dto/messange.dto.js'

// chat.mapper.ts
export const toListUserChat = (chats: ChatMemberProfile[]): ChatRoom[] => {
  return chats.map((chat) => toUserChat(chat))
}

export const toSimpleChat = (chat: ChatWithMembers): SimpleChat => {
  return {
    id: chat.id,
    type: chat.type,
    createdBy: chat.createdBy,
    createdAt: chat.createdAt.toISOString(),
  }
}

export const toUserChat = (chat: ChatMemberProfile): ChatRoomWithMember => {
  return {
    id: chat.id,
    type: chat.type.toString(),
    createdBy: chat.createdBy,
    createdAt: chat.createdAt.toISOString(),
    members: chat.members.map((member) => toMember(member)),
  }
}

export const toMessage = (message: Message): MessageDTO => {
  return {
    id: message.id,
    chatId: message.chatId,
    content: message.content,
    senderId: message.senderId,
    createdAt: message.createdAt.toISOString(),
  }
}

export const toPaginatedMessages = (messages: Message[], limit: number): PaginatedMessages => {
  return {
    nextCursor: messages.length === limit ? messages[messages.length - 1].id : null,
    messages: messages.map((message) => toChatMessage(message)),
  }
}

export const toChatMessage = (message: Message): MessageDTO => {
  return {
    id: message.id,
    chatId: message.chatId,
    senderId: message.senderId,
    content: message.content,
    createdAt: message.createdAt.toISOString(),
  }
}

export const toMember = (member: MemberWithProfile): Member => {
  return {
    id: member.id,
    chatId: member.chatId,
    role: member.role.toString(),
    joinedAt: member.joinedAt.toISOString(),
    profile: toProfile(member.profile),
  }
}

export const toProfile = (profile: Profile): SimpleProfile => {
  return {
    id: profile.id,
    name: profile.name,
    photo: profile.photo,
    isPublic: profile.isPublic,
  }
}
