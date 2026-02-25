import express, { Request, Response } from 'express'
import { createServer } from 'http'
import dotenv from 'dotenv'
import { SocketServer } from './socket/SocketServer.js'
import { initConnection } from './socket/events/initConnection.js'
import chatRoutes from './routes/chat.route.js'
import userRoutes from './routes/user.route.js'
import { errorMiddleware } from './middleware/error.middleware.js'

const port = Number(process.env.CHAT_WS_SERVER_PORT) || 3002
const envFile = process.env.NODE_ENV === 'production' 
  ? '.env.production' 
  : '.env.development'

dotenv.config({ path: envFile })

const app = express()
const server = createServer(app)

const io = SocketServer.initSocket(server)

// trust first proxy
app.set('trust proxy', true)

//Middlewares
app.use(express.json())

//API Endpoints
app.get('/ws/health', (req: Request, res: Response) => { res.send('Chat WebSocket Server is running!!!') })
app.use('/ws/chat', chatRoutes)
app.use('/ws/user', userRoutes)

/**
 * Register user connection and events
 * @argument Server
 */
initConnection(io)

/**
 * MUST BE LAST
 * Capture error 
 */
app.use(errorMiddleware)

server.listen(port, "0.0.0.0", () => {
  console.log(`Chat WebSocket Server is running on port: ${port}`)
})
