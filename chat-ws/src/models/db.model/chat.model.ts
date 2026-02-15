import { Prisma } from '@prisma/client'

type ChatWithMembers = Prisma.ChatGetPayload<{
  include: { members: true }
}>

export {
  ChatWithMembers
}