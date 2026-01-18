import express, { Request, Response } from 'express'
import { createServer } from 'http'
import dotenv from 'dotenv'
import { Server } from 'socket.io'

const app = express()
const server = createServer(app)

const io = new Server(server, {
  cors: {
    origin: "*", //remove "*" for production
  }
})

const port = Number(process.env.CHAT_WS_SERVER_PORT) || 3002
const envFile = process.env.NODE_ENV === 'production' 
  ? '.env.production' 
  : '.env.development'

dotenv.config({ path: envFile })

app.set('trust proxy', true) // trust first proxy
app.use(express.json())

app.get('/api/health', (req: Request, res: Response) => { res.send('Chat WebSocket Server is running!!!') })

io.on("connection", (socket) => {
  console.log('a user connected:', socket.id)

  socket.on("chat-message", (msg) => {
    console.log('message received:', msg)
    // io.emit("chat message", msg) // broadcast the message to all connected clients
  })

})

io.on("disconnect", (socket) => {
  console.log('user disconnected:', socket.id)
})

server.listen(port, "0.0.0.0", () => {
  console.log(`Chat WebSocket Server is running on port: ${port}`)
})
