import { clerkMiddleware } from '@clerk/nextjs/server'
import type { ClerkMiddlewareOptions } from '@clerk/nextjs/server'

const options: ClerkMiddlewareOptions =
  process.env.NODE_ENV === 'development' ? { clockSkewInMs: 60 * 1000 } : {}

export default clerkMiddleware(options)

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
    // Always run for Clerk-specific frontend API routes
    '/__clerk/(.*)',
  ],
}
