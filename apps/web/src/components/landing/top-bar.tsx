import { useSignIn } from "@clerk/tanstack-react-start"
import { FaGithub } from "react-icons/fa"
import { cn } from "@workspace/ui/lib/utils"
import { Button } from "@workspace/ui/components/button"
import { Logo } from "@/components/icons/logo"

export const Topbar = () => {
  const { signIn } = useSignIn();
  return (
    <div className={cn("fixed inset-x-0 top-0 w-full px-4 py-4")}>
      <div className="flex w-full items-center justify-between max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-1">
          <Logo color="#fff"/>
          <h1 className="font-sans text-2xl font-medium tracking-tighter">
            Kindle
          </h1>
        </div>
        <Button 
          onClick={async () => {
            await signIn.sso({
              strategy: "oauth_github",
              redirectUrl: "/dashboard",
              redirectCallbackUrl: ""
            })
          }}
              size={"sm"}
              className={cn(
                "cursor-pointer px-4 py-2  bg-linear-to-b from-neutral-900 to-neutral-500  hover:bg-neutral-900/80 rounded-full border-neutral-500 text-white",
                "dark:from-neutral-100 dark:to-neutral-400 dark:text-neutral-800/80"
              )}
            >
              <FaGithub />
              Login
            </Button>
      </div>
    </div>
  )
}
