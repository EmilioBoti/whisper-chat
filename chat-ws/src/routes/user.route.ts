import { Router } from 'express'
import { createProfile } from '../modules/user/user.controller.js'

const router = Router()

router.post('/create-profile', createProfile)

export default router
