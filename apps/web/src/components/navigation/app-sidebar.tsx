import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarHeader } from "@workspace/ui/components/sidebar"
import { Logo } from "@/components/icons/logo"
import { Button } from "@workspace/ui/components/button"
import { Plus } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"

export const AppSidebar = () => {
  return (
    <Sidebar variant="inset">
      <SidebarHeader className="rounded-xl bg-linear-to-b from-neutral-950 to-neutral-900 bg-neutral-950! py-2 border ">
        <div className="flex items-center gap-2">
          <div className="p-2.5 bg-[#2b2a2a] rounded-lg border">
            <Logo color="#fff" size={15} />
          </div>
          <div className="flex flex-col pt-1">
            <h1 className="font-sans text-[14px] font-medium leading-4">
              Yuvan Vignesh
            </h1>
            <p className="text-[13px] font-light text-muted-foreground">Workspace</p>
          </div>
        </div>
        <Button
          className={cn("bg-linear-to-br! from-neutral-100! to-neutral-400! border border-neutral-300 cursor-pointer")}
          size={"sm"}
        >
          <Plus />
          New Project
        </Button>
      </SidebarHeader>

      <SidebarContent className="bg-linear-to-b from-neutral-950 to-neutral-900 bg-neutral-950!  border rounded-xl p-0 mt-1.5">
          <SidebarGroup>
            <SidebarGroupLabel className="capitalize font-light text-[12px]">
              Main menu
            </SidebarGroupLabel>
          </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

/*
 * Build the Dasboard
 * Importing the nextjs repos
 * 
 **/
