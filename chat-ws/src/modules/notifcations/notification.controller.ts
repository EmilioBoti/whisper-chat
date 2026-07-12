import type { Request, Response } from 'express'
import { BadRequestError } from '../../lib/errors/BadRequestError.js'
import { createFriendShipNotitifcation } from './notification.service.js'

export const requestFriendShip = async (req: Request, res: Response) => {
  const userSender = req.user
  const userReceiverId = req.body.receiverId

  if (!userReceiverId) throw new BadRequestError('Not receiver userId provided')

  const notification = await createFriendShipNotitifcation(userSender.userId, userReceiverId)
  return res.json({ ...notification })
}
