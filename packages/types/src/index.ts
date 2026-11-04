interface SessionEntity {
  id: string
  userId: string
  title?: string
  status?: 'regular' | 'archived'
  custom?: unknown
  createdAt: Date
  updatedAt: Date
}

interface SessionItemEntity {
  id: number
  sessionId: string
  item: unknown
  createdAt: Date
}

interface MessageEntity {
  id: string
  threadId: string
  parentId: string
  format: string
  content: Record<string, unknown>
  createdAt: Date
}

export type { SessionEntity, SessionItemEntity, MessageEntity }
