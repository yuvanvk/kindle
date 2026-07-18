import { useMemo, useState, type ChangeEvent } from "react"
import { Download, Plus } from "lucide-react"
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
import { Button } from "@workspace/ui/components/button"
import { AnimatePresence, motion } from "motion/react"
import { RepoCard } from "../cards/repo-card"
import { RepoCardSkeleton } from "../skeletons/repo-card.skeleton"

export interface RepoCardProps {
  projectId: string
  fullName: string
  cloneUrl: string
  isPrivate: string
  isFork: string
  defaultBranch: string
  onClick: (props: Info) => void
}

type Info = Omit<RepoCardProps, "onClick">

interface RepoDetails {
  info: Info
  environmentVariables: Record<string, string>[]
}

export const ImportRepoModal = () => {
  const [search, setSearch] = useState<string>("")
  const [repos, setRepos] = useState<RepoCardProps[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false);

  const [repoDetails, setRepoDetails] = useState<RepoDetails>({
    info: {
      projectId: "",
      fullName: "",
      cloneUrl: "",
      isPrivate: "",
      isFork: "",
      defaultBranch: "",
    },
    environmentVariables: [{ key: "", value: "" }],
  })

  const [step, setStep] = useState<"select-repo" | "enter-env">("select-repo")

  const reposToShow = useMemo(
    () => repos.filter((repo) => repo.fullName.includes(search)),
    [repos, search]
  )

  const fetchRepos = async () => {
    setLoading(true)
    setOpen(true)
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

  const handleRepoSelect = ({
    projectId,
    cloneUrl,
    defaultBranch,
    isFork,
    fullName,
    isPrivate,
  }: Info) => {
    setRepoDetails({
      ...repoDetails,
      info: {
        projectId,
        cloneUrl,
        defaultBranch,
        isFork,
        fullName,
        isPrivate,
      },
    })
    setStep("enter-env")
  }

  const handeAddVariable = () => {
    setRepoDetails({
      ...repoDetails,
      environmentVariables: [
        ...repoDetails.environmentVariables,
        { key: "", value: "" },
      ],
    })
  }

  const handleKeyChange = (idx: number, key: string) => {
    setRepoDetails((prev) => ({
      ...prev,
      environmentVariables: prev.environmentVariables.map((v, i) =>
        i === idx ? { ...v, key } : v
      ),
    }))
  }

  const handleValueChange = (idx: number, value: string) => {
    setRepoDetails((prev) => ({
      ...prev,
      environmentVariables: prev.environmentVariables.map((v, i) =>
        i === idx ? { ...v, value } : v
      ),
    }))
  }

  const handleSumbit = () => {
    
  }

  const handleReset = () => {
    setRepoDetails({
      info: {
        projectId: "",
        fullName: "",
        cloneUrl: "",
        isPrivate: "",
        isFork: "",
        defaultBranch: ""
      },
      environmentVariables: [{ key: "", value: "" }]
    })
    setOpen(false)

  }

  return (
    <Dialog open={open}>
      <DialogTrigger>
        <Button
          type="button"
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
          <DialogTitle>
            {step === "select-repo"
              ? "Import a Repo"
              : "Add Environment Variables"}
          </DialogTitle>
          <DialogDescription>
            {step === "select-repo"
              ? "Select any repo you want. Only supports Nextjs framework as of now."
              : "Enter the env variables, paste the .env file"}
          </DialogDescription>
        </DialogHeader>

        <form onReset={handleReset} onSubmit={handleSumbit}>
          <AnimatePresence>
            {step === "select-repo" ? (
              <motion.div
                initial={{ x: -30 }}
                animate={{ x: 0 }}
                exit={{ x: 30 }}
                transition={{
                  duration: 0.2,
                  ease: "easeOut",
                }}
                className="h-full w-full"
              >
                <div className="flex items-center gap-2">
                  <Input placeholder="Search" onChange={handleChange} />
                  <Button
                    type="button"
                    className={cn(
                      "cursor-pointer border border-neutral-300 bg-linear-to-br! from-neutral-100! to-neutral-400!"
                    )}
                  >
                    Search
                  </Button>
                </div>
                <motion.div
                
                className="mt-5 flex h-64 flex-col divide-y overflow-x-hidden overflow-y-scroll rounded-xl border shadow-xl">
                  {!loading ? (
                    reposToShow.map((repo) => (
                      <RepoCard
                        fullName={repo.fullName}
                        isPrivate={repo.isPrivate}
                        projectId={repo.projectId}
                        isFork={repo.isFork}
                        defaultBranch={repo.defaultBranch}
                        cloneUrl={repo.cloneUrl}
                        key={repo.projectId}
                        onClick={handleRepoSelect}
                      />
                    ))
                  ) : (
                    <>
                      {Array.from({ length: 7 }).map((_, i) => (
                        <RepoCardSkeleton key={i} />
                      ))}
                    </>
                  )}
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ x: -30 }}
                animate={{ x: 0 }}
                exit={{ x: 30 }}
                transition={{
                  duration: 0.2,
                  ease: "easeOut",
                }}
                className="flex min-h-full w-full flex-col gap-4"
              >
                <div className="flex flex-col gap-2">
                  {repoDetails.environmentVariables.map((variable, idx) => {
                    return (
                      <div className="flex items-center gap-2" key={idx}>
                        <Input
                          key={`${idx}key`}
                          placeholder="KEY"
                          value={variable.key}
                          onChange={(e) => handleKeyChange(idx, e.target.value)}
                        />
                        <span>=</span>
                        <Input
                          key={`${idx}value`}
                          placeholder="VALUE"
                          value={variable.value}
                          onChange={(e) =>
                            handleValueChange(idx, e.target.value)
                          }
                        />
                      </div>
                    )
                  })}

                  <Button
                    type="button"
                    onClick={handeAddVariable}
                    className="mt-2 cursor-pointer rounded-lg border border-neutral-600 bg-linear-to-br! from-neutral-900 to-neutral-600 text-neutral-200 hover:bg-neutral-900/80"
                  >
                    <Plus />
                    Add Variable
                  </Button>
                  <Button
                    type="button"
                    variant={"outline"}
                    className={cn(
                      "cursor-pointer border-neutral-500! bg-linear-to-b from-neutral-400/90 to-neutral-600"
                    )}
                  >
                    <Download />
                    Import .env
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <Button
                    type="reset"
                    size={"sm"}
                    className={cn(
                      "cursor-pointer border border-red-400 bg-linear-to-br! from-red-400! to-red-500! text-white"
                    )}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    size={"sm"}
                    className={cn(
                      "cursor-pointer border border-neutral-300 bg-linear-to-br! from-neutral-100! to-neutral-400!"
                    )}
                  >
                    Create
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </DialogContent>
    </Dialog>
  )
}
