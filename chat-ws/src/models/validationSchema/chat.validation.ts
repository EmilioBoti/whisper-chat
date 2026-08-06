import z from 'zod'
import type { NewChatSchema } from '../dto/chat.dto.js'

export const CreatedChat = z.object({
  chatId: z.uuid(),
  members: z.array(z.uuid()),
}) satisfies z.ZodType<NewChatSchema>

export const ParamsSchema = z.enum(['DIRECT', 'GROUP'])
