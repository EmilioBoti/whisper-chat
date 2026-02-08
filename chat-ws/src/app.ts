import express, { Request, Response } from 'express'
import { createServer } from 'http'
import dotenv from 'dotenv'
import { SocketServer } from './socket/SocketServer.ts'
import { registeSocketEvent } from './socket/events/register.event.ts'

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

/**
 * Register user connection and events
 * @argument Server
 */
registeSocketEvent(io)


server.listen(port, "0.0.0.0", () => {
  console.log(`Chat WebSocket Server is running on port: ${port}`)
})
