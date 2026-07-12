import type { Request, Response } from 'express'
import { BadRequestError } from '../../lib/errors/BadRequestError.js'
import { createUserProfile, exploreUsers } from './user.service.js'

export const createProfile = async (req: Request, res: Response) => {
  const { id, name, email } = req.body
  if (!id || !name || !email) throw new BadRequestError('Not user data provided')

  const result = await createUserProfile({ id, name, email })
  return res.status(201).json({ ...result })
}

export const exploreNewUsers = async (req: Request, res: Response) => {
  const result = await exploreUsers()
  return res.status(200).json(result)
}
