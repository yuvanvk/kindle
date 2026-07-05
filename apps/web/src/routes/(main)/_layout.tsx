import { AppSidebar } from "@/components/navigation/app-sidebar"
import { Topbar } from "@/components/navigation/topbar"
import { createFileRoute, Outlet } from "@tanstack/react-router"
import { SidebarInset, SidebarProvider } from "@workspace/ui/components/sidebar"

export const Route = createFileRoute("/(main)/_layout")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-linear-to-b from-[#121212] to-[#141414] border">
        <Topbar />
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  )
}
