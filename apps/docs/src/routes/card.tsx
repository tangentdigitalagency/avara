import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Heart, Settings, MoreHorizontal, ArrowRight } from 'lucide-react'

import { Card, Button } from '@avara/react'
import { DemoGrid, DemoStack } from '../components/DemoRow'
import { PageHeader } from '../components/PageHeader'
import { PageShell } from '../components/PageShell'
import { Section } from '../components/Section'
import { useTheme } from '../hooks/use-theme'

export const Route = createFileRoute('/card')({ component: CardPage })

const variants = ['outline', 'solid', 'soft', 'ghost'] as const
const colors = ['primary', 'secondary', 'neutral', 'success', 'warning', 'danger', 'info'] as const
const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
const radii = ['none', 'sm', 'md', 'lg', 'xl'] as const

function CardPage() {
  const { theme, setTheme } = useTheme()
  const [pressCount, setPressCount] = useState(0)

  return (
    <PageShell>
      <PageHeader
        title="Card"
        description="Composable surface — variants, density, press/hover behavior, and header actions."
        theme={theme}
        onThemeChange={setTheme}
      />

      <Section title="Variant × color" description="Every variant against every semantic color.">
        <DemoStack>
          {variants.map((variant) => (
            <div key={variant} className="flex flex-col gap-3">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted">{variant}</span>
              <DemoGrid>
                {colors.map((color) => (
                  <Card key={color} variant={variant} color={color}>
                    <Card.Body>
                      <p className="text-sm font-semibold">
                        {variant} / {color}
                      </p>
                    </Card.Body>
                  </Card>
                ))}
              </DemoGrid>
            </div>
          ))}
        </DemoStack>
      </Section>

      <Section title="Sizes" description="Padding and gap scale with size.">
        <DemoStack>
          {sizes.map((size) => (
            <Card key={size} size={size}>
              <Card.Header>
                <Card.Title>Size: {size}</Card.Title>
                <Card.Description>Padding and gap scale with size.</Card.Description>
              </Card.Header>
              <Card.Body>
                <p className="text-sm">Body content at {size} density.</p>
              </Card.Body>
              <Card.Footer>
                <Button size="sm">Action</Button>
              </Card.Footer>
            </Card>
          ))}
        </DemoStack>
      </Section>

      <Section title="Radius">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {radii.map((radius) => (
            <Card key={radius} radius={radius}>
              <Card.Body>
                <p className="text-sm">radius: {radius}</p>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Shadow">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {(['none', 'sm', 'md', 'lg'] as const).map((shadow) => (
            <Card key={shadow} shadow={shadow}>
              <Card.Body>
                <p className="text-sm">shadow: {shadow}</p>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        title="Hoverable vs pressable"
        description="Hover both to compare lift. Pressable renders as a real button."
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Card isHoverable shadow="sm">
            <Card.Body>
              <Card.Title>Hoverable</Card.Title>
              <p className="mt-1 text-sm text-muted">Lifts on hover, not clickable.</p>
            </Card.Body>
          </Card>
          <Card
            isPressable
            shadow="sm"
            color="primary"
            onClick={() => setPressCount((n) => n + 1)}
          >
            <Card.Body>
              <Card.Title>Pressable ({pressCount})</Card.Title>
              <p className="mt-1 text-sm text-muted">Renders as a real button. Click me.</p>
            </Card.Body>
          </Card>
        </div>
      </Section>

      <Section title="Disabled pressable">
        <Card
          isPressable
          isDisabled
          shadow="sm"
          onClick={() => setPressCount((n) => n + 1)}
        >
          <Card.Body>
            <Card.Title>Disabled pressable card</Card.Title>
            <p className="mt-1 text-sm text-muted">Should not fire onClick, should look dimmed.</p>
          </Card.Body>
        </Card>
      </Section>

      <Section title="Full width">
        <Card fullWidth shadow="sm">
          <Card.Body>Full width card</Card.Body>
        </Card>
      </Section>

      <Section
        title="Header action layout"
        description="Action sits top-right; title/description should not overlap. Without action, grid collapses to one column."
      >
        <DemoStack>
          <Card shadow="sm">
            <Card.Header>
              <Card.Title>Recent sales</Card.Title>
              <Card.Description>You made 265 sales this month.</Card.Description>
              <Card.Action>
                <Button
                  isIconOnly
                  size="sm"
                  variant="ghost"
                  aria-label="More options"
                  startContent={<MoreHorizontal />}
                />
              </Card.Action>
            </Card.Header>
            <Card.Body>
              <p className="text-sm">
                Body content below a header that has an action — action should sit top-right.
              </p>
            </Card.Body>
          </Card>

          <Card shadow="sm">
            <Card.Header>
              <Card.Title>No action here</Card.Title>
              <Card.Description>
                Grid should be single-column, title should take full width.
              </Card.Description>
            </Card.Header>
            <Card.Body>
              <p className="text-sm">Plain body.</p>
            </Card.Body>
          </Card>
        </DemoStack>
      </Section>

      <Section title="Composed examples" description="Realistic layouts — metric, activity feed, and pressable product.">
        <DemoStack>
          <Card shadow="md" className="max-w-sm">
            <Card.Header>
              <Card.Title>Upgrade to Pro</Card.Title>
              <Card.Description>Unlock every component and priority support.</Card.Description>
              <Card.Action>
                <Heart className="size-4 text-muted" />
              </Card.Action>
            </Card.Header>
            <Card.Body>
              <ul className="space-y-1 text-sm text-muted">
                <li>Unlimited components</li>
                <li>Priority support</li>
                <li>Early access to new releases</li>
              </ul>
            </Card.Body>
            <Card.Footer>
              <Button fullWidth endContent={<ArrowRight />}>
                Upgrade now
              </Button>
            </Card.Footer>
          </Card>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Card shadow="sm">
              <Card.Body>
                <Card.Description>Revenue</Card.Description>
                <p className="mt-1 text-3xl font-extrabold">$12,480</p>
                <p className="mt-1 text-xs text-success-600 dark:text-success-500">+8.2% this month</p>
              </Card.Body>
            </Card>

            <Card shadow="sm">
              <Card.Header>
                <Card.Title>Activity</Card.Title>
              </Card.Header>
              <Card.Body className="flex flex-col gap-3">
                {['Sarah joined the team', 'Invoice #1092 paid', 'New comment on Button'].map(
                  (item) => (
                    <div key={item} className="flex items-center gap-2 text-sm">
                      <span className="size-1.5 shrink-0 rounded-full bg-primary-500" />
                      {item}
                    </div>
                  ),
                )}
              </Card.Body>
            </Card>

            <Card
              isPressable
              isHoverable
              shadow="sm"
              onClick={() => alert('Product clicked')}
            >
              <Card.Body>
                <div className="mb-3 aspect-video rounded-md bg-neutral-500/10" />
                <Card.Title>Wireless Headphones</Card.Title>
                <Card.Description className="mt-1">$149.00</Card.Description>
              </Card.Body>
            </Card>
          </div>
        </DemoStack>
      </Section>

      <Section title="classNames override" description="Slot-level class overrides for base/header/body/footer.">
        <Card
          shadow="sm"
          classNames={{
            base: 'border-2 border-dashed',
            header: 'bg-primary-500/5',
            body: 'bg-secondary-500/5',
            footer: 'bg-neutral-500/5',
          }}
        >
          <Card.Header>
            <Card.Title>classNames override</Card.Title>
          </Card.Header>
          <Card.Body>Each section should have a visibly different tint.</Card.Body>
          <Card.Footer>
            <Button size="sm" variant="ghost" startContent={<Settings />}>
              Settings
            </Button>
          </Card.Footer>
        </Card>
      </Section>
    </PageShell>
  )
}
