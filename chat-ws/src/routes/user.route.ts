import { Router } from 'express'
import UserController from '../modules/user/user.controller.js'

const router = Router()

router.post('/create-profile', UserController.createProfile)

export default router