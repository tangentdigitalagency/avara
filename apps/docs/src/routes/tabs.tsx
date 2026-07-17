import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Home, Settings, User } from 'lucide-react'

import { Tabs, Card } from '@avara/react'
import { DemoPage } from '../components/DemoPage'
import { DemoGrid, DemoStack, VariantLabel } from '../components/DemoRow'
import { Section } from '../components/Section'
import { colors } from '../lib/demo'

export const Route = createFileRoute('/tabs')({ component: TabsPage })

const tabVariants = ['solid', 'underline'] as const
const tabSizes = ['sm', 'md', 'lg', 'xl'] as const

function TabsPage() {
  const [active, setActive] = useState('overview')

  return (
    <DemoPage
      title="Tabs"
      description="Segmented navigation — solid vs underline, sizes, colors, full-width, vertical orientation, and panel enter/exit motion. Switch tabs to watch the indicator slide."
    >
      <Section
        title="Variants"
        description="solid = soft pill indicator behind the active tab. underline = thin bar along the bottom edge."
      >
        <DemoStack>
          {tabVariants.map((variant) => (
            <div key={variant} className="flex flex-col gap-2">
              <VariantLabel>{variant}</VariantLabel>
              <Tabs defaultValue="overview" variant={variant}>
                <Tabs.List>
                  <Tabs.Tab value="overview">Overview</Tabs.Tab>
                  <Tabs.Tab value="analytics">Analytics</Tabs.Tab>
                  <Tabs.Tab value="reports">Reports</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="overview">
                  <p className="text-sm text-muted">{variant} — overview panel.</p>
                </Tabs.Panel>
                <Tabs.Panel value="analytics">
                  <p className="text-sm text-muted">{variant} — analytics panel.</p>
                </Tabs.Panel>
                <Tabs.Panel value="reports">
                  <p className="text-sm text-muted">{variant} — reports panel.</p>
                </Tabs.Panel>
              </Tabs>
            </div>
          ))}
        </DemoStack>
      </Section>

      <Section title="Variant × color" description="Every variant against every semantic color.">
        <DemoStack>
          {tabVariants.map((variant) => (
            <div key={variant} className="flex flex-col gap-3">
              <VariantLabel>{variant}</VariantLabel>
              <DemoStack>
                {colors.map((color) => (
                  <div key={color} className="flex flex-col gap-1.5">
                    <span className="text-xs text-muted">{color}</span>
                    <Tabs defaultValue="a" variant={variant} color={color}>
                      <Tabs.List>
                        <Tabs.Tab value="a">One</Tabs.Tab>
                        <Tabs.Tab value="b">Two</Tabs.Tab>
                        <Tabs.Tab value="c">Three</Tabs.Tab>
                      </Tabs.List>
                    </Tabs>
                  </div>
                ))}
              </DemoStack>
            </div>
          ))}
        </DemoStack>
      </Section>

      <Section title="Sizes" description="sm → xl — padding and type scale with size.">
        <DemoStack>
          {tabSizes.map((size) => (
            <div key={size} className="flex flex-col gap-2">
              <VariantLabel>{size}</VariantLabel>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {tabVariants.map((variant) => (
                  <Tabs key={variant} defaultValue="a" variant={variant} size={size}>
                    <Tabs.List>
                      <Tabs.Tab value="a">{size}</Tabs.Tab>
                      <Tabs.Tab value="b">{variant}</Tabs.Tab>
                    </Tabs.List>
                  </Tabs>
                ))}
              </div>
            </div>
          ))}
        </DemoStack>
      </Section>

      <Section title="Full width" description="List and tabs stretch to fill the container — both variants.">
        <DemoStack>
          {tabVariants.map((variant) => (
            <Tabs key={variant} defaultValue="home" variant={variant} color="secondary">
              <Tabs.List fullWidth>
                <Tabs.Tab value="home" fullWidth>
                  Home
                </Tabs.Tab>
                <Tabs.Tab value="profile" fullWidth>
                  Profile
                </Tabs.Tab>
                <Tabs.Tab value="settings" fullWidth>
                  Settings
                </Tabs.Tab>
              </Tabs.List>
              <Tabs.Panel value="home">
                <p className="text-sm text-muted">{variant} full-width — home.</p>
              </Tabs.Panel>
              <Tabs.Panel value="profile">
                <p className="text-sm text-muted">{variant} full-width — profile.</p>
              </Tabs.Panel>
              <Tabs.Panel value="settings">
                <p className="text-sm text-muted">{variant} full-width — settings.</p>
              </Tabs.Panel>
            </Tabs>
          ))}
        </DemoStack>
      </Section>

      <Section title="Vertical" description="orientation=&quot;vertical&quot; — list stacks, panels sit beside.">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {tabVariants.map((variant) => (
            <div key={variant} className="flex flex-col gap-2">
              <VariantLabel>{variant}</VariantLabel>
              <Tabs
                defaultValue="general"
                variant={variant}
                orientation="vertical"
                className="flex flex-col gap-3 sm:flex-row sm:items-start"
              >
                <Tabs.List>
                  <Tabs.Tab value="general">General</Tabs.Tab>
                  <Tabs.Tab value="security">Security</Tabs.Tab>
                  <Tabs.Tab value="billing">Billing</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="general" className="min-w-0 flex-1">
                  <p className="text-sm text-muted">General settings.</p>
                </Tabs.Panel>
                <Tabs.Panel value="security" className="min-w-0 flex-1">
                  <p className="text-sm text-muted">Security settings.</p>
                </Tabs.Panel>
                <Tabs.Panel value="billing" className="min-w-0 flex-1">
                  <p className="text-sm text-muted">Billing settings.</p>
                </Tabs.Panel>
              </Tabs>
            </div>
          ))}
        </div>
      </Section>

      <Section title="With icons">
        <DemoStack>
          {tabVariants.map((variant) => (
            <Tabs key={variant} defaultValue="home" variant={variant}>
              <Tabs.List>
                <Tabs.Tab value="home">
                  <Home className="size-4" />
                  Home
                </Tabs.Tab>
                <Tabs.Tab value="account">
                  <User className="size-4" />
                  Account
                </Tabs.Tab>
                <Tabs.Tab value="settings">
                  <Settings className="size-4" />
                  Settings
                </Tabs.Tab>
              </Tabs.List>
              <Tabs.Panel value="home">
                <p className="text-sm text-muted">{variant} — home.</p>
              </Tabs.Panel>
              <Tabs.Panel value="account">
                <p className="text-sm text-muted">{variant} — account.</p>
              </Tabs.Panel>
              <Tabs.Panel value="settings">
                <p className="text-sm text-muted">{variant} — settings.</p>
              </Tabs.Panel>
            </Tabs>
          ))}
        </DemoStack>
      </Section>

      <Section title="Disabled" description="Group-level isDisabled, or disable a single Tab.">
        <DemoStack>
          <Tabs defaultValue="a" isDisabled>
            <Tabs.List>
              <Tabs.Tab value="a">All disabled</Tabs.Tab>
              <Tabs.Tab value="b">Can't select</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="a">
              <p className="text-sm text-muted">Group is disabled.</p>
            </Tabs.Panel>
            <Tabs.Panel value="b">
              <p className="text-sm text-muted">Unreachable while group disabled.</p>
            </Tabs.Panel>
          </Tabs>

          <Tabs defaultValue="a" variant="underline">
            <Tabs.List>
              <Tabs.Tab value="a">Available</Tabs.Tab>
              <Tabs.Tab value="b" disabled>
                Disabled tab
              </Tabs.Tab>
              <Tabs.Tab value="c">Also available</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="a">
              <p className="text-sm text-muted">Available panel.</p>
            </Tabs.Panel>
            <Tabs.Panel value="b">
              <p className="text-sm text-muted">Disabled tab panel.</p>
            </Tabs.Panel>
            <Tabs.Panel value="c">
              <p className="text-sm text-muted">Also available panel.</p>
            </Tabs.Panel>
          </Tabs>
        </DemoStack>
      </Section>

      <Section title="Controlled" description={`Current value: ${active}`}>
        <Tabs value={active} onValueChange={(value) => setActive(String(value))} variant="underline">
          <Tabs.List>
            <Tabs.Tab value="overview">Overview</Tabs.Tab>
            <Tabs.Tab value="activity">Activity</Tabs.Tab>
            <Tabs.Tab value="settings">Settings</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="overview">
            <p className="text-sm text-muted">Controlled overview — panels keepMounted with enter/exit fade.</p>
          </Tabs.Panel>
          <Tabs.Panel value="activity">
            <p className="text-sm text-muted">Controlled activity.</p>
          </Tabs.Panel>
          <Tabs.Panel value="settings">
            <p className="text-sm text-muted">Controlled settings.</p>
          </Tabs.Panel>
        </Tabs>
      </Section>

      <Section title="Focus ring" description="Tab through — focus ring should match each color.">
        <DemoGrid>
          {colors.map((color) => (
            <Tabs key={color} defaultValue="a" color={color} variant="solid">
              <Tabs.List>
                <Tabs.Tab value="a">{color}</Tabs.Tab>
                <Tabs.Tab value="b">Next</Tabs.Tab>
              </Tabs.List>
            </Tabs>
          ))}
        </DemoGrid>
      </Section>

      <Section title="Composed example" description="Underline tabs driving Card content.">
        <Tabs defaultValue="team" color="info" variant="underline" size="lg">
          <Tabs.List fullWidth>
            <Tabs.Tab value="team" fullWidth>
              Team
            </Tabs.Tab>
            <Tabs.Tab value="billing" fullWidth>
              Billing
            </Tabs.Tab>
            <Tabs.Tab value="danger" fullWidth>
              Danger
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="team">
            <Card shadow="sm">
              <Card.Header>
                <Card.Title>Team members</Card.Title>
                <Card.Description>Invite people to your workspace.</Card.Description>
              </Card.Header>
              <Card.Body>
                <p className="text-sm text-muted">3 members · 2 pending invites</p>
              </Card.Body>
            </Card>
          </Tabs.Panel>
          <Tabs.Panel value="billing">
            <Card shadow="sm">
              <Card.Header>
                <Card.Title>Billing</Card.Title>
                <Card.Description>Pro plan · renews Apr 1</Card.Description>
              </Card.Header>
              <Card.Body>
                <p className="text-sm text-muted">Next invoice: $29.00</p>
              </Card.Body>
            </Card>
          </Tabs.Panel>
          <Tabs.Panel value="danger">
            <Card shadow="sm" color="danger" variant="soft">
              <Card.Header>
                <Card.Title>Delete workspace</Card.Title>
                <Card.Description>This cannot be undone.</Card.Description>
              </Card.Header>
            </Card>
          </Tabs.Panel>
        </Tabs>
      </Section>
    </DemoPage>
  )
}
