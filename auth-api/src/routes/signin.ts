import { Router } from 'express'
import type { Request, Response } from 'express'

const router = Router()


router.get('/signin', (req: Request, res: Response) => {
  try {
    res.status(200).json({
      data: "successfull!!"
    })
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: "Internal server error"
    })
  }
})

router.post('/signup', (req: Request, res: Response) => {
  try {
    res.status(200).json({
      data: "successfull!!"
    })
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: "Internal server error"
    })
  }
})

export default router
