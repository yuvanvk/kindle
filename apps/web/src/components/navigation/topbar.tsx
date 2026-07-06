import { Show, useAuth } from "@clerk/tanstack-react-start"
import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"
import { ChevronLeft, Loader, Plus } from "lucide-react"
import { FaGithub } from "react-icons/fa"
import { MdLibraryAdd } from "react-icons/md"
import { useTransition } from "react"
import { redirect } from "@tanstack/react-router"
import { toast } from "sonner"
import { useSuspenseQuery } from "@tanstack/react-query"
import { convexQuery } from "@convex-dev/react-query"
import { api } from "@workspace/convex"

export const Topbar = () => {
  const [isPending, startRedirectTransition] = useTransition()
  const { isLoaded, isSignedIn, userId } = useAuth()

  const { data } = useSuspenseQuery(
    convexQuery(api.githubInstallations.queryISGithubConnected, {
      clerkUserId: userId,
    })
  )

  if (!isLoaded) {
    return
  }
  if (!isSignedIn) {
    throw redirect({ to: "/" })
  }

  const handleConnectGithubRedirect = async () => {
    const response = await fetch(
      "http://localhost:8787/api/v1/user/connect-github",
      { credentials: "include" }
    )
    const json = await response.json()

    if (!response.ok) {
      toast.error("Cannot Connect right now. Please try again later.")
      return
    }

    const url = json.url
    console.log(url)
    startRedirectTransition(() => {
      window.location.href = url
    })
  }

  return (
    <div className={cn("flex w-full items-center justify-between px-3 py-3")}>
      <div className={cn("flex items-center gap-0.5")}>
        <Button size={"icon-sm"} variant={"ghost"}>
          <ChevronLeft />
        </Button>
        <h1 className="text-[15px] font-medium tracking-tight">Dashboard</h1>
      </div>

      <div className="flex items-center gap-2">
        <Show when={"signed-in"}>
          <Button
            className={cn(
              "cursor-pointer rounded-lg border border-neutral-600 bg-linear-to-b! from-neutral-900 to-neutral-600 text-neutral-200 hover:bg-neutral-900/80"
            )}
            size={"sm"}
          >
            <Plus />
            New Project
          </Button>
        </Show>
        <Show when={"signed-in"}>
          <Button
            onClick={handleConnectGithubRedirect}
            disabled={isPending}
            className={cn(
              "cursor-pointer rounded-lg border border-neutral-600 bg-linear-to-b! from-neutral-900 to-neutral-600 text-neutral-200 hover:bg-neutral-900/80"
            )}
            size={"sm"}
          >
            {isPending ? (
              <Loader className="animate-spin" />
            ) : (
              <>
                <FaGithub />
                {data ? "Connected" : "Connect Github"}
              </>
            )}
          </Button>
        </Show>
      </div>
    </div>
  )
}
