import type { Request, Response } from 'express'
import { BadRequestError } from '../../lib/errors/BadRequestError.js'
import { createUserProfile } from './user.service.js'

export const createProfile = async (req: Request, res: Response) => {
  const { id, name } = req.body

  if (!id || !name) throw new BadRequestError()

  const result = await createUserProfile({ id, name })
  return res.status(201).json({ ...result })
}
