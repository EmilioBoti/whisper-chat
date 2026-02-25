import type { Request, Response } from "express"
import { AuthService } from "./auth.service.js"
import { NewUserCredential } from "../../models/dto/auth.dto.js"
import { asyncHandler } from "../../lib/utils/asyncHandler.js"
import { singUpErrorHandler } from "../../lib/errors/httpErrorHandler.js"
import { BadRequestError } from "../../lib/errors/BadRequestError.js"


export default class AuthController {

  static async deleteUserAccount(req: Request, res: Response) {
    const { userId } = req.user
    await AuthService.deleteUserAccount(userId)
    return res.status(204).json({ success: true })
  }

}

export async function signInUser(req: Request, res: Response) {
  const newUser: NewUserCredential = req.body

  const error = singUpErrorHandler(newUser)
  
  if(error) throw error
  
  const result = await AuthService.loginUser(newUser)
  return res.status(200).json(result)

}

export const signUpUser = asyncHandler( async (req: Request, res: Response) => {
  const newUser: NewUserCredential = req.body
  const error = singUpErrorHandler(newUser)

  if(error) throw error

  const result = await AuthService.registerNewUser(newUser)
  return res.status(201).json(result)

})

export const logoutUser = asyncHandler( async (req: Request, res: Response) => {
  const { refreshToken } = req.body

  if(!refreshToken) {
    throw new BadRequestError("Refresh and AccessToken are required.")
  }

  const result = await AuthService.logoutUser(refreshToken)
  return res.status(200).json(result)

})

export const refreshToken = asyncHandler( async (req: Request, res: Response) => {
  const { refreshToken } = req.body

  if(!refreshToken) {
    throw new BadRequestError("Refresh and AccessToken are required.")
  }

  const result = await AuthService.refreshToken(refreshToken)
  return res.status(200).json(result)

})