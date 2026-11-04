'use client'

import type { ReactNode } from 'react'
import { useChatRuntime, AssistantChatTransport } from '@assistant-ui/ai-sdk'
import {
  AssistantRuntimeProvider,
  useRemoteThreadListRuntime,
} from '@assistant-ui/react'

import { threadListAdapter } from '@/lib/thread-adapter'

export function RuntimeProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const runtime = useRemoteThreadListRuntime({
    runtimeHook: () =>
      useChatRuntime({
        transport: new AssistantChatTransport({
          api: '/api/chat',
        }),
      }),
    adapter: threadListAdapter,
  })
  return (
    <AssistantRuntimeProvider runtime={runtime}>
      {children}
    </AssistantRuntimeProvider>
  )
}
