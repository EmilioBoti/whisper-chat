import type { Request, Response } from 'express'
import { BadRequestError } from '../../lib/errors/BadRequestError.js'
import UserService from './user.service.js'

class UserController {

  static async createProfile(req: Request, res: Response) {
    const { id, name } = req.body

    if(!id || !name) throw new BadRequestError()

    const result = await UserService.createUserProfile({ id, name })
    return res.status(201).json({ ...result })
  }

}

export default UserController