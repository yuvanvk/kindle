import { createFileRoute } from "@tanstack/react-router"
import { BsFillFolderFill } from "react-icons/bs"
import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"
import { Plus } from "lucide-react"

export const Route = createFileRoute("/(main)/_layout/dashboard")({
  loader: async () => {},
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="mb-20 flex h-full flex-col items-center justify-center">
      <BsFillFolderFill size={300} className="text-neutral-400" />
      <h1 className="text-center text-xl font-medium tracking-tight text-neutral-200">
        No projects yet
      </h1>
      <h2 className="text-light mt-2 max-w-[300px] text-center font-sans tracking-tight text-muted-foreground">
        Import a Project by clicking the button below and ship a change, Open a
        PR.
      </h2>
      <Button
        className={cn(
          "mt-5 cursor-pointer rounded-lg border border-neutral-600 bg-linear-to-b! from-neutral-900 to-neutral-600 text-neutral-200 hover:bg-neutral-900/80"
        )}
        size={"sm"}
      >
        <Plus />
        New Project
      </Button>
    </div>
  )
}
