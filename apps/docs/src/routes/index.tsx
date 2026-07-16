import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'

import { Card } from '@avara/react'
import { DemoPage } from '../components/DemoPage'
import { DemoGrid } from '../components/DemoRow'

export const Route = createFileRoute('/')({ component: Library })

const components = [
  {
    name: 'Button',
    description: 'Actions, CTAs, and interactive controls across variants, colors, and sizes.',
    to: '/button' as const,
  },
  {
    name: 'Input',
    description: 'Text fields with labels, validation, adornments, and clearable states.',
    to: '/input' as const,
  },
  {
    name: 'Card',
    description: 'Composable surfaces with headers, bodies, footers, and press/hover states.',
    to: '/card' as const,
  },
  {
    name: 'Modal',
    description: 'Dialog overlays with sizes, backdrops, placement, and dismiss behavior.',
    to: '/modal' as const,
  },
  {
    name: 'Toast',
    description: 'Transient notifications with colors, actions, durations, and promises.',
    to: '/toast' as const,
  },
  {
    name: 'Checkbox',
    description: 'Binary and indeterminate selection with labels, validation, and loading.',
    to: '/checkbox' as const,
  },
  {
    name: 'Switch',
    description: 'On/off toggles with thumb icons, track content, validation, and loading.',
    to: '/switch' as const,
  },
  {
    name: 'Radio',
    description: 'Single-choice groups with orientation, motion, validation, and item overrides.',
    to: '/radio' as const,
  },
  {
    name: 'Select',
    description: 'Single and multi select menus with clearable, placement, and validation.',
    to: '/select' as const,
  },
]

function Library() {
  return (
    <DemoPage
      title="Component library"
      description="Visual playground for every Avara component — flip themes, poke variants, catch the bugs."
      glassDemo="gradient"
      showBack={false}
    >
      <DemoGrid>
        {components.map((component) => (
          <Link key={component.to} to={component.to} className="group block h-full outline-none">
            <Card isHoverable shadow="sm" className="h-full transition-[border-color] duration-200 group-hover:border-primary-500 group-focus-visible:border-primary-500">
              <Card.Header>
                <Card.Title className="group-hover:text-primary-700 dark:group-hover:text-primary-400">
                  {component.name}
                </Card.Title>
                <Card.Description>{component.description}</Card.Description>
                <Card.Action>
                  <ArrowUpRight className="size-4 text-muted transition-colors group-hover:text-primary-600" />
                </Card.Action>
              </Card.Header>
            </Card>
          </Link>
        ))}
      </DemoGrid>
    </DemoPage>
  )
}
