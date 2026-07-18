import { Button } from "@workspace/ui/components/button"
import type { RepoCardProps } from "../modals/import-repo-modal"
import { TbExternalLinkFilled } from "react-icons/tb"
import { cn } from "@workspace/ui/lib/utils"

export const RepoCard = ({
    projectId,
    cloneUrl,
    defaultBranch,
    isFork,
    fullName,
    isPrivate,
    onClick,
  }: RepoCardProps) => {
    return (
      <div
        onClick={() =>
          onClick({
            projectId,
            cloneUrl,
            defaultBranch,
            isFork,
            fullName,
            isPrivate,
          })
        }
        className={cn(
          "flex cursor-pointer items-center justify-between bg-[#121212] px-2.5 py-1.5 transition-all duration-200 hover:scale-102"
        )}
      >
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-full bg-neutral-200" />
          <div className="text-sm font-light">{fullName}</div>
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