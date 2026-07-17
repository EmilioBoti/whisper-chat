import type { Request, Response } from 'express'
import { BadRequestError } from '../../lib/errors/BadRequestError.js'
import { createFriendShisRequest, getUserFriendShipRequest, updateFriendShip } from './notification.service.js'
import { parseToFriendStatusEntity } from '../../utils/mapers/notification.mapper.js'

export const requestUserFriendShip = async (req: Request, res: Response) => {
  const userSender = req.user
  const userReceiverId = req.body.receiverId

  if (!userReceiverId) throw new BadRequestError('Not receiverId field provided')

  const notification = await createFriendShisRequest(userSender.userId, userReceiverId)
  return res.json(notification)
}

export const updateFriendShipRequest = async (req: Request, res: Response) => {
  const { id } = req.params
  const action = req.body.action

  if (!id || !action) throw new BadRequestError('Not status field provided')

  const status = parseToFriendStatusEntity(action)
  const notification = await updateFriendShip(id.toString(), status)
  return res.json(notification)
}

export const getUserNotifications = async (req: Request, res: Response) => {
  const userId = req.user.userId
  const result = await getUserFriendShipRequest(userId)
  return res.json(result)
}
