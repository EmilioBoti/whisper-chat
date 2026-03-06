export class MessageDTO {
  id = ''
  chatId = ''
  senderId = ''
  content = ''
  createdAt = ''

  constructor(id: string, chatId: string, senderId: string, content: string, createdAt: string) {
    this.id = id
    this.chatId = chatId
    this.content = content
    this.senderId = senderId
    this.createdAt = createdAt
  }
}

export interface MessageSentDTO {
  sender: string
  receiver: string
  chatId: string
  content: string
  date: string
}

export interface PaginatedMessages {
  nextCursor: string | null
  messages: MessageDTO[]
}
