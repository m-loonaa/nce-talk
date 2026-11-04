import type { Request, Response, NextFunction } from 'express'
import { NODE_ENV } from '#lib/config.ts'

const isDev = NODE_ENV === 'development'

type HttpError = Error & { status?: number, statusCode?: number }

function errorHandler(err: HttpError, req: Request, res: Response, next: NextFunction) {
  if (res.headersSent) {
    next(err)
    return
  }

  const status = err.status ?? err.statusCode ?? 500
  const statusCode = status >= 400 && status < 600 ? status : 500

  console.error(err)

  if (isDev) {
    res.status(statusCode).json({ error: err.message, stack: err.stack })
    return
  }

  res.status(statusCode).json({
    error: statusCode < 500 ? err.message : 'Internal Server Error',
  })
}

function errorNotFound(req: Request, res: Response) {
  res.status(404).json({ error: 'Not Found' })
}

export { errorHandler, errorNotFound }
