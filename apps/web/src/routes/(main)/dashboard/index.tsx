import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(main)/dashboard/')({
    loader: async () => {
        const response = await fetch("http://localhost:8787", { credentials: "include" })
        const json = await response.json();
        console.log(json);
        
        console.log(json.userId)
    
        return { userId: json.userId }
      },
  component: RouteComponent,
})

function RouteComponent() {
    const { userId } = Route.useLoaderData();
  return <div>Hello "/(main)/dashboard/"! {JSON.stringify(userId)}</div>
}
