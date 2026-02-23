import type { Request, Response } from "express"
import { ChatService } from "./chat.service.js"
import { BadRequestError } from "src/lib/errors/BadRequestError.ts"

export class ChatController {

  static async openDirectChat(req: Request, res: Response) {
    const userId = req.params.userId as string
    const user = req.user
    
    if (!userId) {
      throw new BadRequestError('UserId is not been provided')
    }
    const chat = await ChatService.openDirectChat(user.userId, userId)

    return res.status(201).json({ ...chat })
  }

  static async getUserChats(req: Request, res: Response) {
    const userId = req.user.userId
    
    const chats = await ChatService.fetchUserChats(userId)
    return res.status(200).json([ ...chats ])
  }

}