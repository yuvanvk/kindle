import { Hero } from "@/components/landing/hero"
import { Topbar } from "@/components/landing/top-bar"
import { auth } from "@clerk/tanstack-react-start/server"
import { createFileRoute, redirect } from "@tanstack/react-router"
import { createServerFn } from "@tanstack/react-start"

const authStateFn = createServerFn({ method: "GET" }).handler(async () => {
  const { isAuthenticated, userId } = await auth()

  if (isAuthenticated) {
    throw redirect({
      to: "/dashboard",
    })
  }
  return { userId }
})

export const Route = createFileRoute("/")({
  beforeLoad: async () => {
    const { userId } = await authStateFn()
    return userId
  },
  component: App,
})

function App() {
  return (
    <div className="mx-auto flex min-h-svh max-w-7xl border-x border-dashed border-neutral-300 p-6 dark:border-neutral-800">
      <Topbar />
      <Hero />
    </div>
  )
}
