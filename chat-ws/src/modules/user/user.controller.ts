import type { Request, Response } from 'express'
import { BadRequestError } from '../../lib/errors/BadRequestError.js'
import { createUserProfile, exploreUsers } from './user.service.js'
import { CreateProfileSchema } from '../../models/dto/auth.dto.js'

export const createProfile = async (req: Request, res: Response) => {
  // Validate data
  const data = CreateProfileSchema.safeParse(req.body)

  if (data.error) throw new BadRequestError(data.error.message)

  const result = await createUserProfile({ id: data.data.id, name: data.data.name, email: data.data.email })
  return res.status(201).json({ ...result })
}

export const exploreNewUsers = async (req: Request, res: Response) => {
  const user = req.user
  const result = await exploreUsers(user.userId)
  return res.status(200).json(result)
}
