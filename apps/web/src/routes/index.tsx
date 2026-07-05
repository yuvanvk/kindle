import { Hero } from "@/components/landing/hero"
import { Topbar } from "@/components/landing/top-bar"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({ component: App })

function App() {
  return (
    <div className="mx-auto flex min-h-svh max-w-7xl border-x border-dashed border-neutral-300 p-6 dark:border-neutral-800">
      <Topbar />
      <Hero />
    </div>
  )
}
