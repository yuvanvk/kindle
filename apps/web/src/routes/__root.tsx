import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router"
import appCss from "@workspace/ui/globals.css?url"
import { ClerkProvider } from "@clerk/tanstack-react-start"
import { ThemeProvider } from "@/components/theme-provider"
import { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext } from "@tanstack/react-router";
import { Toaster } from "@workspace/ui/components/sonner";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Kindle",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  notFoundComponent: () => (
    <main className="container mx-auto p-4 pt-16">
      <h1>404</h1>
      <p>The requested page could not be found.</p>
    </main>
  ),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="bg-[#EEF0EE] dark:bg-[#121212]">
        <ThemeProvider defaultTheme="light" storageKey="theme">
          <ClerkProvider>{children}</ClerkProvider>
          <Toaster />
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  )
}
