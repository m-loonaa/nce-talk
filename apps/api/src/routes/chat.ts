import { Router } from 'express'
import { clerkClient } from '@clerk/express'

const router = Router()

router.get('/', async (req, res) => {
  const user = await clerkClient.users.getUser(req.userId)
  res.json({ user })
})

export default router
