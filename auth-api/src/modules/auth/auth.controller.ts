import type { Request, Response } from 'express'
import * as AuthService from './auth.service.js'
import type { NewUserCredential } from '../../models/dto/auth.dto.js'
import { singUpErrorHandler } from '../../lib/errors/httpErrorHandler.js'
import { BadRequestError } from '../../lib/errors/BadRequestError.js'

export async function deleteUserAccount(req: Request, res: Response) {
  const { userId } = req.user
  await AuthService.deleteUserAccount(userId)
  return res.status(204).json({ success: true })
}

export async function signInUser(req: Request, res: Response) {
  const newUser: NewUserCredential = req.body

  const error = singUpErrorHandler(newUser)

  if (error) throw error

  const result = await AuthService.loginUser(newUser)
  return res.status(200).json(result)
}

export const signUpUser = async (req: Request, res: Response) => {
  const newUser: NewUserCredential = req.body
  const error = singUpErrorHandler(newUser)

  if (error) throw error

  const result = await AuthService.registerNewUser(newUser)
  return res.status(201).json(result)
}

export const logoutUser = async (req: Request, res: Response) => {
  const { refreshToken } = req.body

  if (!refreshToken) {
    throw new BadRequestError('Refresh and AccessToken are required.')
  }

  const result = await AuthService.logoutUser(refreshToken)
  return res.status(200).json(result)
}

export const refreshToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.body

  if (!refreshToken) {
    throw new BadRequestError('Refresh and AccessToken are required.')
  }

  const result = await AuthService.refreshToken(refreshToken)
  return res.status(200).json(result)
}
