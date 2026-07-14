import { createFileRoute } from '@tanstack/react-router'
import "@avara/react";


export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div className="bg-background text-foreground border border-border p-8 rounded-lg">
  Testing semantic tokens
</div>
  )
}
