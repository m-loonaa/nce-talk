'use client'

import {
  useAui,
  type RemoteThreadListAdapter,
  type ThreadHistoryAdapter,
} from '@assistant-ui/react'
import { createAssistantStream } from 'assistant-stream'
import { useMemo } from 'react'

function useThreadListAdapters() {
  const aui = useAui()
  const history = useMemo<ThreadHistoryAdapter>(
    () => ({
      async load() {
        return { messages: [] }
      },
      async append() {},
      withFormat: (fmt) => ({
        async load() {
          const { remoteId } = aui.threadListItem.getState()
          if (!remoteId) return { messages: [] }
          const rows = await fetch(
            `/api/chat/threads/${remoteId}/messages`,
          ).then((r) => r.json())
          return {
            messages: rows.map((row: any) =>
              fmt.decode({
                id: row.id,
                parent_id: row.parentId,
                format: row.format,
                content: row.content,
              }),
            ),
          }
        },
        async append(item) {
          const { remoteId } = await aui.threadListItem.initialize()
          await fetch(`/api/chat/threads/${remoteId}/messages`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              parentId: item.parentId,
              format: fmt.format,
              content: fmt.encode(item),
            }),
          })
        },
      }),
    }),
    [aui],
  )
  return useMemo(() => ({ history }), [history])
}

export const threadListAdapter: RemoteThreadListAdapter = {
  async list() {
    const rows = await fetch('/api/chat/threads').then((r) => r.json())
    return {
      threads: rows.map((t: any) => ({
        status: t.status,
        remoteId: t.id,
        title: t.title ?? undefined,
      })),
    }
  },
  async initialize() {
    const { id } = await fetch('/api/chat/threads', { method: 'POST' }).then(
      (r) => r.json(),
    )
    return { remoteId: id }
  },
  async rename(remoteId, title) {
    await fetch(`/api/chat/threads/${remoteId}`, {
      method: 'PATCH',
      body: JSON.stringify({ title }),
    })
  },
  async archive(remoteId) {
    await fetch(`/api/chat/threads/${remoteId}`, {
      method: 'PATCH',
      body: JSON.stringify({ status: 'archived' }),
    })
  },
  async unarchive(remoteId) {
    await fetch(`/api/chat/threads/${remoteId}`, {
      method: 'PATCH',
      body: JSON.stringify({ status: 'regular' }),
    })
  },
  async delete(remoteId) {
    await fetch(`/api/chat/threads/${remoteId}`, { method: 'DELETE' })
  },
  async fetch(remoteId) {
    const t = await fetch(`/api/chat/threads/${remoteId}`).then((r) => r.json())
    return { status: t.status, remoteId: t.id, title: t.title }
  },
  async generateTitle(remoteId, messages) {
    return createAssistantStream(async (controller) => {
      const { title } = await fetch(`/api/chat/threads/${remoteId}/title`, {
        method: 'POST',
        body: JSON.stringify({ messages }),
      }).then((r) => r.json())
      controller.appendText(title)
    })
  },
  unstable_useAdapters: useThreadListAdapters,
}
