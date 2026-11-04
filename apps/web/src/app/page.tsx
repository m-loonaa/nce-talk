import { RuntimeProvider } from '@/providers/RuntimeProvider'
import { Thread } from '@/components/assistant-ui/elements/thread.aui'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { ThreadListSidebar } from '@/components/assistant-ui/elements/threadlist-sidebar.aui'

export default function Page() {
  return (
    <RuntimeProvider>
      <SidebarProvider>
        <ThreadListSidebar />
        <SidebarInset>
          <Thread />
        </SidebarInset>
      </SidebarProvider>
    </RuntimeProvider>
  )
}
