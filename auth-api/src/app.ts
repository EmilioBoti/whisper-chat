import express from 'express'
import type { Request, Response } from 'express'
import cors, { CorsOptions } from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.route.js'
import { errorMiddleware } from './middleware/error.middleware.js'

const app = express()

const port = parseInt(process.env.AUTH_SERVER_PORT || "3001") || 3001
const envFile = process.env.NODE_ENV === 'production' 
  ? '.env.production' 
  : '.env.development'

dotenv.config({path: envFile })

const allowedOrigins = process.env.NODE_ENV === 'production'
  ? ['https://myfrontend.com']
  : ['http://localhost:3000']

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // Postman / mobile apps

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  methods: ['POST', 'DELETE']
}

app.set('trust proxy', true) // trust first proxy

//Middleware
app.use(cors(corsOptions))
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