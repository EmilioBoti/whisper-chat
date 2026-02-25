import { SimpleProfile } from '../../models/dto/user.dto.js'
import InternalService from './ClientService.js'

const service = new InternalService(process.env.CLIENT_CHAT_BASE_URL || '')

export const createProfile = async (id: string, name: string): Promise<SimpleProfile> => {
  return await service.request<SimpleProfile>('/ws/user/create-profile', {
    method: 'POST',
    body: JSON.stringify({ id, name })
  })
}