/// <reference types="@clerk/express/env" />

declare namespace Express {
  interface Request {
    userId: string
  }
}
