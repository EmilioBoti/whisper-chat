import type { Prisma } from '@prisma/client'

type ChatWithMembers = Prisma.ChatGetPayload<{
  include: { members: true }
}>

type MemberWithProfile = Prisma.ChatMemberGetPayload<{
  include: { profile: true }
}>

type ChatMemberProfile = Prisma.ChatGetPayload<{
  include: { members: { include: { profile: true } } }
}>

export { ChatWithMembers, ChatMemberProfile, MemberWithProfile }
