import type { RequestHandler } from 'express'
import {
  getAuth,
  clerkMiddleware,
  type ClerkMiddlewareOptions,
} from '@clerk/express'
import { NODE_ENV } from '#lib/config.ts'

const options: ClerkMiddlewareOptions =
  NODE_ENV === 'development' ? { clockSkewInMs: 60 * 1000 } : {}

const clerk = clerkMiddleware(options)

const protect: RequestHandler = (req, res, next) => {
  const { isAuthenticated, userId } = getAuth(req)
  if (!isAuthenticated) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }
  req.userId = userId
  next()
}

export { protect, clerk }
