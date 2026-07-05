import { Show, useAuth } from "@clerk/tanstack-react-start"
import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"
import { ChevronLeft, Loader } from "lucide-react"
import { FaGithub } from "react-icons/fa"
import { useTransition } from "react"
import { buildGitHubAppInstallURl } from "@/lib/build-github-app-install"
import { redirect } from "@tanstack/react-router"

export const Topbar = () => {
  const [isPending, startRedirectTransition] = useTransition();
  const { userId, isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return
  }
  if (!isSignedIn) {
    throw redirect({ to: "/" })
  }

  const handleConnectGithubRedirect = () => {
    startRedirectTransition(() => {
    const url = buildGitHubAppInstallURl({ clerkUserID: userId! })
      window.location.href = url!
    });
  }

  return (
    <div className={cn("flex w-full items-center justify-between px-3 py-3")}>
      <div className={cn("flex items-center gap-0.5")}>
        <Button size={"icon-sm"} variant={"ghost"}>
          <ChevronLeft />
        </Button>
        <h1 className="text-[15px] font-medium tracking-tight">Dashboard</h1>
      </div>

      <Show when={"signed-in"}>
        <Button
          onClick={handleConnectGithubRedirect}
          disabled={isPending}
          className={cn(
            "cursor-pointer border border-neutral-300 bg-linear-to-br! from-neutral-100! to-neutral-400!"
          )}
          size={"sm"}
        >
          {isPending ? (
            <Loader className="animate-spin"/>
          ) : (
            <>
              <FaGithub />
              Connect Github
            </>
          )}
        </Button>
      </Show>
    </div>
  )
}
