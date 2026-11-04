import { Router } from 'express'
import { chat } from '#controllers/chat.ts'
import {
  getThreads,
  createThread,
  updateThread,
  getThreadMessages,
  createThreadMessage,
} from '#controllers/threads.ts'

const router = Router()

router.post('/', chat)
router.get('/threads', getThreads)
router.post('/threads', createThread)
router.patch('/threads/:id', updateThread)
router.get('/threads/:id/messages', getThreadMessages)
router.post('/threads/:id/messages', createThreadMessage)

export default router
