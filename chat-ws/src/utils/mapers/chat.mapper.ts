import { Profile } from "@prisma/client"
import { ChatMemberProfile, ChatWithMembers, MemberWithProfile } from "../../models/db.model/chat.model.js"
import { UserChat, Member, SimpleChat } from "../../models/dto/chat.dto.js"
import { SimpleProfile } from "../../models/dto/user.dto.js"

// chat.mapper.ts
export default class ChatMapper {

  static toListUserChat(chats: ChatMemberProfile[]): UserChat[] {
    return chats.map( chat => ChatMapper.toUserChat(chat))
  }

  static toSimpleChat(chat: ChatWithMembers): SimpleChat {
    return {
      id: chat.id,
      type: chat.type,
      createdBy: chat.createdBy,
      createdAt: chat.createdAt.toISOString()
    }
  }

  static toUserChat(chat: ChatMemberProfile): UserChat {
    return {
      id: chat.id,
      type: chat.type.toString(),
      createdBy: chat.createdBy,
      createdAt: chat.createdAt.toISOString(),
      members: chat.members.map( member => this.toMember(member))
    }
  }

  static toMember(member: MemberWithProfile): Member {
    return {
      id: member.id,
      chatId: member.chatId,
      role: member.role.toString(),
      joinedAt: member.joinedAt.toISOString(),
      profile: this.toProfile(member.profile)
    }
  }

  static toProfile(profile: Profile): SimpleProfile {
    return {
      id: profile.id,
      name: profile.name,
      photo: profile.photo,
      isPublic: profile.isPublic
    }
  }

}