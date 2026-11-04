import type { Request, Response } from 'express'
import { Session, Message } from '#models/index.ts'
import type { SessionEntity, MessageEntity } from '@nce-talk/types'

const getThreads = async (req: Request, res: Response) => {
  const userId = req.userId
  const sessions = await Session.findAll({
    where: { userId },
    order: [['updatedAt', 'DESC']],
  })
  return res.json(sessions)
}

const createThread = async (req: Request, res: Response) => {
  const userId = req.userId
  const session = await Session.create({ userId })
  return res.json(session)
}

const updateThread = async (
  req: Request<
    { id: string },
    unknown,
    Pick<SessionEntity, 'title' | 'status'>
  >,
  res: Response,
) => {
  const {
    userId,
    params: { id },
    body: { title, status },
  } = req

  await Session.update({ title, status }, { where: { id, userId } })
  return res.sendStatus(204)
}

const getThreadMessages = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const {
    userId,
    params: { id },
  } = req

  const session = await Session.findOne({ where: { id, userId } })
  if (!session) {
    return res.sendStatus(404)
  }

  const messages = await Message.findAll({
    where: { threadId: id },
    order: [['createdAt', 'ASC']],
  })
  return res.json(messages)
}

const createThreadMessage = async (
  req: Request<{ id: string }, unknown, MessageEntity>,
  res: Response,
) => {
  const {
    userId,
    params: { id },
    body,
  } = req

  const session = await Session.findOne({ where: { id, userId } })
  if (!session) {
    return res.sendStatus(404)
  }
  await Message.create({
    id: body.id,
    threadId: id,
    parentId: body.parentId,
    format: body.format,
    content: body.content,
  })
  return res.sendStatus(204)
}

export {
  getThreads,
  createThread,
  updateThread,
  getThreadMessages,
  createThreadMessage,
}
