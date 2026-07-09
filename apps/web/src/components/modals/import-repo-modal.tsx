import { Button } from "@workspace/ui/components/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog"
import { Input } from "@workspace/ui/components/input"
import { cn } from "@workspace/ui/lib/utils"
import { Plus } from "lucide-react"
import { TbExternalLinkFilled } from "react-icons/tb"

export const ImportRepoModal = () => {


  return (
    <Dialog>
      <DialogTrigger>
        <Button
        
          className={cn(
            "cursor-pointer rounded-lg border border-neutral-600 bg-linear-to-b! from-neutral-900 to-neutral-600 text-neutral-200 hover:bg-neutral-900/80"
          )}
          size={"sm"}
        >
          <Plus />
          New Project
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-md">
        <DialogHeader>
          <DialogTitle>Import a Repo</DialogTitle>
          <DialogDescription>
            Select any repo you want. Only supports Nextjs framework as of now.
          </DialogDescription>
        </DialogHeader>

        <form>
          <div className="flex items-center gap-2">
            <Input placeholder="Search" />
            <Button>Search</Button>
          </div>
          <div className="mt-5 flex flex-col divide-y overflow-hidden overflow-y-scroll rounded-xl border shadow-xl">
            {Array.from({ length: 5 }).map((_, idx) => (
              <RepoCard repoName="Sparkles" key={idx} />
            ))}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

interface RepoCardProps {
  repoName: string
}

export const RepoCard = ({ repoName }: RepoCardProps) => {
  return (
    <div
      className={cn(
        "flex cursor-pointer items-center justify-between bg-[#121212] px-2.5 py-1.5 transition-all duration-200 hover:scale-102"
      )}
    >
      <div className="flex items-center gap-2">
        <div className="h-4 w-4 rounded-full bg-neutral-200" />
        <div className="text-sm font-light">{repoName}</div>
      </div>

      <div className="flex items-center gap-1">
        <div className="text-xs text-neutral-500">2m ago</div>
        <Button size={"sm"} variant={"ghost"} className="p-0">
          <TbExternalLinkFilled />
        </Button>
      </div>
    </div>
  )
}
