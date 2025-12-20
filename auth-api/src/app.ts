import express from 'express'
import type { Request, Response } from 'express'
import dotenv from 'dotenv'
import loginRoutes from './routes/signin.ts'

const app = express()

dotenv.config({path: './.env'})

//Middleware
app.use(express.json())

//Routes
app.get('/api/healty', (req: Request, res: Response) => { res.send('Auth server is running!') })
app.use('/api/', loginRoutes)

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server is running on port: 3001`)
})

export default app