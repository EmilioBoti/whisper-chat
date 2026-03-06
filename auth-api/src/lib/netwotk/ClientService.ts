import { BadRequestError } from '../errors/BadRequestError.js'

export default class InternalService {
  private url = ''

  constructor(url: string) {
    this.url = url
  }

  async request<T>(endpoint: string, config: RequestInit): Promise<T> {
    const url = `${this.url}${endpoint}`
    console.info(url)
    try {
      const result = await fetch(url, {
        ...config,
        headers: {
          'Content-Type': 'application/json',
          ...config.headers,
        },
      })

      if (!result.ok) throw new BadRequestError()
      if (result.status === 204) return {} as T
      return await result.json()
    } catch (error) {
      throw error
    }
  }
}
