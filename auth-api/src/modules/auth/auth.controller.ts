import type { Request, Response } from "express"
import { AuthService } from "./auth.service.ts"
import { NewUserModel } from "../../models/dto/user.dtoSchema.ts"
import { asyncHandler } from "../../lib/utils/asyncHandler.ts"
import { singUpErrorHandler } from "../../lib/errors/httpErrorHandler.ts"
import { BadRequestError } from "../../lib/errors/BadRequestError.ts"


export async function signInUser(req: Request, res: Response) {
  const newUser: NewUserModel = req.body

  const error = singUpErrorHandler(newUser)
  
  if(error) throw error
  
  const result = await AuthService.loginUser(newUser)
  return res.status(200).json(result)

}

export const signUpUser = asyncHandler( async (req: Request, res: Response) => {
  const newUser: NewUserModel = req.body
  const error = singUpErrorHandler(newUser)

  if(error) throw error

  const result = await AuthService.registerNewUser(newUser)
  return res.status(201).json(result)

})

export const logoutUser = asyncHandler( async (req: Request, res: Response) => {
  const { refreshToken } = req.body

  if(!refreshToken) {
    throw new BadRequestError("Refresh token is required.")
  }

  const result = await AuthService.logoutUser(refreshToken)
  return res.status(200).json(result)

})
