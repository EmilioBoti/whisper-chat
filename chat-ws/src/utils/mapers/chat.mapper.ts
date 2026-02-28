import type { Profile } from '@prisma/client'
import type { ChatMemberProfile, ChatWithMembers, MemberWithProfile } from '../../models/db.model/chat.model.js'
import type { UserChat, Member, SimpleChat } from '../../models/dto/chat.dto.js'
import type { SimpleProfile } from '../../models/dto/user.dto.js'

// chat.mapper.ts
export const toListUserChat = (chats: ChatMemberProfile[]): UserChat[] => {
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

export const toUserChat = (chat: ChatMemberProfile): UserChat => {
  return {
    id: chat.id,
    type: chat.type.toString(),
    createdBy: chat.createdBy,
    createdAt: chat.createdAt.toISOString(),
    members: chat.members.map((member) => toMember(member)),
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
