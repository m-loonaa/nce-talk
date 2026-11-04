import express, { type Express } from 'express'
import { chatRoutes } from './routes/index.ts'
import { protect, clerk } from './middleware/auth.ts'
import { errorHandler, errorNotFound } from './middleware/error.ts'
import { logger } from './middleware/logger.ts'

const app: Express = express()

app.use(express.json())
app.use(clerk)
app.use(logger)
app.use('/api/chat', protect, chatRoutes)
app.use(errorNotFound)
app.use(errorHandler)

export default app
