import express from 'express'
import type { Request, Response } from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.route.ts'
import { errorMiddleware } from './middleware/error.middleware.ts'

const app = express()

dotenv.config({path: './.env.development'})

//Middleware
app.use(express.json())
app.use(errorMiddleware)

//Routes
app.get('/api/healty', (req: Request, res: Response) => { res.send('Auth server is running!') })
app.use('/api/', authRoutes)


/**
 * MUST BE LAST
 * Capture error 
 */
app.use(errorMiddleware)

app.listen(process.env.AUTH_SERVER_PORT, () => {
  console.log(`Server is running on port: ${process.env.AUTH_SERVER_PORT}`)
})

export default app