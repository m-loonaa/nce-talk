import express, { type Express } from 'express'
import chatRoutes from './routes/chat.ts'
import { protect, clerk } from './middleware/auth.ts'

const app: Express = express()

app.use(clerk)
app.use('/chat', protect, chatRoutes)

export default app
