'use client'

import type { ReactNode } from 'react'
import {
  AssistantRuntimeProvider,
  useLocalRuntime,
  type ChatModelAdapter,
} from '@assistant-ui/react'

const ModelAdapter: ChatModelAdapter = {
  async run({ messages, abortSignal }) {
    const result = await fetch('<YOUR_API_ENDPOINT>', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
      signal: abortSignal,
    })
    const data = await result.json()
    return {
      content: [{ type: 'text', text: data.text }],
    }
  },
}

export function RuntimeProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const runtime = useLocalRuntime(ModelAdapter)
  return (
    <AssistantRuntimeProvider runtime={runtime}>
      {children}
    </AssistantRuntimeProvider>
  )
}
