import express from 'express'
import type { Request, Response } from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.route.js'
import { errorMiddleware } from './middleware/error.middleware.js'

const app = express()

const port = parseInt(process.env.AUTH_SERVER_PORT || "3001") || 3001
const envFile = process.env.NODE_ENV === 'production' 
  ? '.env.production' 
  : '.env.development'

dotenv.config({path: envFile })

app.set('trust proxy', true) // trust first proxy
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

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port: ${process.env.AUTH_SERVER_PORT}`)
})

export default app