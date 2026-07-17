import { useMemo, useState, type ChangeEvent } from "react"
import { Plus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog"
import { cn } from "@workspace/ui/lib/utils"
import { Input } from "@workspace/ui/components/input"
import { TbExternalLinkFilled } from "react-icons/tb"
import { Button } from "@workspace/ui/components/button"
import { Skeleton } from "@workspace/ui/components/skeleton"

interface RepoCardProps {
  id: string
  fullName: string
  cloneUrl: string
  private: string
  isFork: string
  defaultBranch: string
}

export const ImportRepoModal = () => {
  const [search, setSearch] = useState<string>("");
  const [repos, setRepos] = useState<RepoCardProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [repoDetails, setRepoDetails] = useState({
    repoDetails: {
      
    },
    environmentVariables: {

    }
  });

  const reposToShow = useMemo(
    () => repos.filter((repo) => repo.fullName.includes(search)),
    [repos, search]
  )

  const fetchRepos = async () => {
    setLoading(true)
    const response = await fetch(
      "http://localhost:8787/api/v1/user/get-repos",
      { credentials: "include" }
    )
    const json = await response.json()
    setRepos(json.data.repos)
    setLoading(false)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button
          onClick={fetchRepos}
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
            <Input placeholder="Search" onChange={handleChange} />
            <Button
              className={cn(
                "cursor-pointer border border-neutral-300 bg-linear-to-br! from-neutral-100! to-neutral-400!"
              )}
            >
              Search
            </Button>
          </div>
          <div className="mt-5 flex h-64 flex-col divide-y overflow-x-hidden overflow-y-scroll rounded-xl border shadow-xl">
            {!loading ? (
              reposToShow.map((repo) => (
                <RepoCard
                  fullName={repo.fullName}
                  private={repo.private}
                  id={repo.id}
                  isFork={repo.isFork}
                  defaultBranch={repo.defaultBranch}
                  cloneUrl={repo.cloneUrl}
                  key={repo.id}
                />
              ))
            ) : (
              <>
                {Array.from({ length: 7 }).map((_, i) => (
                  <RepoCardSkeleton key={i} />
                ))}
              </>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export const RepoCard = ({ fullName }: RepoCardProps) => {
  return (
    <div
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

export const RepoCardSkeleton = () => {
  return (
    <div className="flex items-center justify-between bg-[#121212] px-2.5 py-1.5">
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-4 rounded-full" />
        <Skeleton className="h-4 w-32" />
      </div>

      <div className="flex items-center gap-1">
        <Skeleton className="h-3 w-10" />
        <Skeleton className="h-6 w-6 rounded-md" />
      </div>
    </div>
  )
}
