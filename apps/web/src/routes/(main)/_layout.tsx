import { AppSidebar } from "@/components/navigation/app-sidebar"
import { Topbar } from "@/components/navigation/topbar"
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router"
import { createServerFn } from "@tanstack/react-start"
import { SidebarInset, SidebarProvider } from "@workspace/ui/components/sidebar"
import { auth } from '@clerk/tanstack-react-start/server'


const authStateFn = createServerFn({ method: "GET" }).handler(async () => {
  const { isAuthenticated, userId } = await auth();

  if (!isAuthenticated) {
    throw redirect({
      to: "/"
    })
  }
  return { userId }
})

export const Route = createFileRoute("/(main)/_layout")({
  beforeLoad: async () => {
    const { userId } = await authStateFn()
    return userId
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="border bg-linear-to-b from-[#121212] to-[#141414]">
        <Topbar />
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  )
}
