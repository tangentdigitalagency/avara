import { createFileRoute } from '@tanstack/react-router'

import { Button } from "@avara/react";



export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
 <div className="p-8 flex flex-col gap-6">
  <div className="flex gap-4 items-center">
    <Button size="xs">XS</Button>
    <Button size="sm">SM</Button>
    <Button size="md">MD</Button>
    <Button size="lg">LG</Button>
    <Button size="xl">XL</Button>
  </div>

  <div className="flex gap-4 items-center">
    <Button radius="sm">Radius SM</Button>
    <Button radius="md">Radius MD</Button>
    <Button radius="lg">Radius LG</Button>
    <Button radius="full">Radius Full</Button>
  </div>

  <div className="flex gap-4">
    <Button>Default</Button>
    <Button color="success">Success</Button>
    <Button variant="outline" color="danger">Delete</Button>
    <Button variant="soft" color="warning">Warning</Button>
    <Button variant="ghost">Ghost</Button>
    <Button isLoading>Loading</Button>
    <Button isDisabled>Disabled</Button>
  </div>
</div>
  )
}
