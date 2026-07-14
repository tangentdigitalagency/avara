import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Mail, Search, Lock } from 'lucide-react'

import { Input } from '@avara/react'
import { DemoGrid, DemoRow, DemoStack } from '../components/DemoRow'
import { PageHeader } from '../components/PageHeader'
import { PageShell } from '../components/PageShell'
import { Section } from '../components/Section'
import { useTheme } from '../hooks/use-theme'

export const Route = createFileRoute('/input')({ component: InputPage })

const variants = ['outline', 'soft', 'solid', 'ghost'] as const
const colors = ['primary', 'secondary', 'neutral', 'success', 'warning', 'danger', 'info'] as const
const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
const radii = ['sm', 'md', 'lg', 'full'] as const

function InputPage() {
  const { mode, setMode, theme, setTheme } = useTheme()
  const [clearableValue, setClearableValue] = useState('Try clearing me')

  return (
    <PageShell>
      <PageHeader
        title="Input"
        description="Text fields with labels, validation, adornments, and clearable states."
        mode={mode}
        onModeChange={setMode}
        themeVariant={theme}
        onThemeVariantChange={setTheme}
      />

      <Section title="Variant × color" description="Every variant against every semantic color.">
        <DemoStack>
          {variants.map((variant) => (
            <div key={variant} className="flex flex-col gap-3">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted">{variant}</span>
              <DemoGrid>
                {colors.map((color) => (
                  <Input
                    key={color}
                    variant={variant}
                    color={color}
                    label={color}
                    placeholder={`${variant} / ${color}`}
                  />
                ))}
              </DemoGrid>
            </div>
          ))}
        </DemoStack>
      </Section>

      <Section title="Sizes">
        <DemoStack>
          {sizes.map((size) => (
            <Input key={size} size={size} label={size.toUpperCase()} placeholder={`Size ${size}`} />
          ))}
        </DemoStack>
      </Section>

      <Section title="Radius">
        <DemoStack>
          {radii.map((radius) => (
            <Input key={radius} radius={radius} label={radius} placeholder={`Radius ${radius}`} />
          ))}
        </DemoStack>
      </Section>

      <Section title="Label & description">
        <DemoStack>
          <Input
            label="Email"
            description="We'll never share your email."
            placeholder="you@example.com"
          />
          <Input label="Username" isRequired placeholder="Enter a username" />
        </DemoStack>
      </Section>

      <Section
        title="Invalid"
        description="Error replaces description. Invalid always renders danger, regardless of color."
      >
        <DemoStack>
          <Input
            label="Email"
            description="This won't show while invalid"
            isInvalid
            errorMessage="Please enter a valid email address."
            defaultValue="not-an-email"
          />
          <DemoRow>
            {colors.map((color) => (
              <div key={color} className="min-w-[10rem] flex-1">
                <Input color={color} isInvalid placeholder={color} />
              </div>
            ))}
          </DemoRow>
        </DemoStack>
      </Section>

      <Section title="States">
        <DemoStack>
          <Input label="Disabled" isDisabled defaultValue="Can't touch this" />
          <Input label="Read only" isReadOnly defaultValue="Read only value" />
          <Input
            label="Clearable"
            isClearable
            value={clearableValue}
            onValueChange={setClearableValue}
          />
        </DemoStack>
      </Section>

      <Section title="Icons" description="startContent / endContent adornments.">
        <DemoStack>
          <Input label="Email" startContent={<Mail />} placeholder="you@example.com" />
          <Input label="Search" startContent={<Search />} placeholder="Search…" />
          <Input label="Password" startContent={<Lock />} type="password" placeholder="••••••••" />
        </DemoStack>
      </Section>

      <Section title="Focus ring" description="Tab through — focus ring should match each color.">
        <DemoGrid>
          {colors.map((color) => (
            <Input key={color} color={color} label={color} placeholder="Focus me" />
          ))}
        </DemoGrid>
      </Section>
    </PageShell>
  )
}
