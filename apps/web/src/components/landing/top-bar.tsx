import { Show, SignInButton, SignOutButton } from "@clerk/tanstack-react-start"
import { FaGithub } from "react-icons/fa"
import { cn } from "@workspace/ui/lib/utils"
import { Button } from "@workspace/ui/components/button"
import { LogOut } from "lucide-react"

export const Topbar = () => {
  return (
    <div className={cn("fixed inset-x-0 top-0 w-full p-4")}>
      <div className="flex w-full items-center justify-between">
        <h1>Kindle</h1>
        <Show when={"signed-out"}>
          <SignInButton forceRedirectUrl={"/dashboard"} mode="modal">
            <Button
              size={"sm"}
              className={cn(
                "cursor-pointer bg-neutral-800 bg-linear-to-b hover:bg-neutral-900/80"
              )}
            >
              <FaGithub />
              Login
            </Button>
          </SignInButton>
        </Show>

        <Show when={"signed-in"}>
          <SignOutButton>
            <Button
              size={"sm"}
              className={cn(
                "cursor-pointer border-red-200 bg-red-500 bg-linear-to-b hover:bg-red-500/90"
              )}
            >
              <LogOut />
              Logout
            </Button>
          </SignOutButton>
        </Show>
      </div>
    </div>
  )
}
