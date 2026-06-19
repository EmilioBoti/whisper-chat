import type { Message } from '@prisma/client'

type type = 'TEXT' | 'IMAGE'
type Status = 'PENDING' | 'SENT' | 'RECEIVED' | 'READ'

export class MessageDTO {
  id = ''
  chatId = ''
  senderId = ''
  content = ''
  createdAt = ''
  attributes: MessageAttribute = { status: 'PENDING', type: 'TEXT' }

  constructor(message: Message) {
    this.id = message.id
    this.chatId = message.chatId
    this.content = message.content
    this.senderId = message.senderId
    this.createdAt = message.createdAt.toISOString()
    this.attributes = {
      status: message.status,
      type: message.type,
    }
  }
}

export interface MessageSentDTO {
  id: string
  senderId: string
  receiverIds: string[]
  chatId: string
  content: string
  date: string
}

export interface PaginatedMessages {
  nextCursor: string | null
  messages: MessageDTO[]
}

export interface MessageAttribute {
  status: Status
  type: type
}
