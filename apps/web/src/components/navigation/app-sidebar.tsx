import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@workspace/ui/components/sidebar"
import { Logo } from "@/components/icons/logo"
import { Button } from "@workspace/ui/components/button"
import { Cog, Key, LogOut, Plus } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"
import { MdSpaceDashboard } from "react-icons/md"
import { BsFillFolderFill } from "react-icons/bs"
import { SignOutButton, useUser } from "@clerk/tanstack-react-start"

export const AppSidebar = () => {
  const { user } = useUser()

  return (
    <Sidebar variant="inset">
      <SidebarHeader className="rounded-xl border bg-neutral-950! bg-linear-to-b from-neutral-950 to-neutral-900 py-2">
        <div className="flex items-center gap-2">
          <div className="rounded-lg border bg-[#2b2a2a] p-2.5">
            <Logo color="#fff" size={15} />
          </div>
          <div className="flex flex-col pt-1">
            <h1 className="font-sans text-[14px] leading-4 font-medium">
              {user?.username}
            </h1>
            <p className="text-[13px] font-light text-muted-foreground">
              Workspace
            </p>
          </div>
        </div>
        <Button
          className={cn(
            "cursor-pointer border border-neutral-300 bg-linear-to-br! from-neutral-100! to-neutral-400!"
          )}
          size={"sm"}
        >
          <Plus />
          New Project
        </Button>
      </SidebarHeader>

      <SidebarContent className="mt-1.5 rounded-xl border bg-neutral-950! bg-linear-to-b from-neutral-950 to-neutral-900 p-0">
        <SidebarGroup>
          <SidebarGroupLabel className="text-[12px] font-light capitalize">
            Main menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <MdSpaceDashboard />
                Dashboard
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton>
                <BsFillFolderFill />
                Projects
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton>
                <Cog />
                Settings
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="mt-1.5 rounded-xl border bg-neutral-950! bg-linear-to-b from-neutral-950 to-neutral-900">
        <Button
          size={"sm"}
          className="cursor-pointer rounded-lg border border-neutral-600 bg-linear-to-b! from-neutral-900 to-neutral-600 text-neutral-200 hover:bg-neutral-900/80"
        >
          <Key />
          API Key
        </Button>
        <SignOutButton>
          <Button
            size={"sm"}
            className="border-red-400 bg-red-500 hover:bg-red-500/90 text-neutral-100"
          >
            <LogOut />
            Logout
          </Button>
        </SignOutButton>
      </SidebarFooter>
    </Sidebar>
  )
}
