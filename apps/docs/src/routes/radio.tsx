import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'

import { Radio, RadioGroup } from '@avara/react'
import { DemoPage } from '../components/DemoPage'
import { DemoGrid, DemoRow, DemoStack, VariantLabel } from '../components/DemoRow'
import { Section } from '../components/Section'
import { colors, sizes, variants } from '../lib/demo'

export const Route = createFileRoute('/radio')({ component: RadioPage })

const motions = ['pop', 'wave', 'stagger'] as const

function RadioPage() {
  const [plan, setPlan] = useState('pro')

  return (
    <DemoPage
      title="Radio"
      description="Single-choice groups — variants, colors, sizes, orientation, motion, and validation. Styles inherit from RadioGroup; individual Radios can override."
    >
      <Section
        title="Motion"
        description="pop / stagger share the spring pop (no path to draw on a dot). wave is reserved for API parity — toggle to compare."
      >
        <DemoStack>
          {motions.map((motion) => (
            <RadioGroup
              key={motion}
              motion={motion}
              label={motion}
              defaultValue="a"
              orientation="horizontal"
            >
              <Radio value="a" label="Option A" />
              <Radio value="b" label="Option B" />
              <Radio value="c" label="Option C" />
            </RadioGroup>
          ))}
        </DemoStack>
      </Section>

      <Section title="Variant × color" description="One group per color, defaultValue set so the selected look is visible.">
        <DemoStack>
          {variants.map((variant) => (
            <div key={variant} className="flex flex-col gap-3">
              <VariantLabel>{variant}</VariantLabel>
              <DemoGrid>
                {colors.map((color) => (
                  <RadioGroup
                    key={color}
                    variant={variant}
                    color={color}
                    label={color}
                    defaultValue="on"
                    orientation="horizontal"
                  >
                    <Radio value="on" label="On" />
                    <Radio value="off" label="Off" />
                  </RadioGroup>
                ))}
              </DemoGrid>
            </div>
          ))}
        </DemoStack>
      </Section>

      <Section title="Sizes">
        <DemoStack>
          {sizes.map((size) => (
            <RadioGroup
              key={size}
              size={size}
              label={size.toUpperCase()}
              defaultValue="a"
              orientation="horizontal"
            >
              <Radio value="a" label="Alpha" />
              <Radio value="b" label="Beta" />
            </RadioGroup>
          ))}
        </DemoStack>
      </Section>

      <Section title="Orientation">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <RadioGroup label="Vertical (default)" defaultValue="email">
            <Radio value="email" label="Email" description="Classic inbox notifications." />
            <Radio value="sms" label="SMS" description="Text messages to your phone." />
            <Radio value="push" label="Push" description="In-app alerts only." />
          </RadioGroup>
          <RadioGroup
            label="Horizontal (wraps on narrow screens)"
            orientation="horizontal"
            defaultValue="email"
          >
            <Radio value="email" label="Email" />
            <Radio value="sms" label="SMS" />
            <Radio value="push" label="Push" />
          </RadioGroup>
        </div>
      </Section>

      <Section title="Label & description" description="Group-level label/description plus per-item copy.">
        <RadioGroup
          label="Billing cycle"
          description="You can change this later in settings."
          defaultValue="monthly"
          isRequired
        >
          <Radio value="monthly" label="Monthly" description="$12 / month" />
          <Radio value="yearly" label="Yearly" description="$120 / year — save 2 months" />
        </RadioGroup>
      </Section>

      <Section
        title="Invalid"
        description="Group error replaces description. Circles render danger regardless of color."
      >
        <DemoStack>
          <RadioGroup
            label="Preferred contact"
            description="This won't show while invalid"
            isInvalid
            errorMessage="Pick a contact method to continue."
            defaultValue="email"
          >
            <Radio value="email" label="Email" />
            <Radio value="phone" label="Phone" />
          </RadioGroup>
          <DemoRow>
            {colors.map((color) => (
              <RadioGroup
                key={color}
                color={color}
                isInvalid
                defaultValue="a"
                aria-label={color}
                orientation="horizontal"
              >
                <Radio value="a" label={color} />
                <Radio value="b" aria-label={`${color} b`} />
              </RadioGroup>
            ))}
          </DemoRow>
        </DemoStack>
      </Section>

      <Section title="Per-item override" description="Group sets primary; one Radio overrides to danger.">
        <RadioGroup label="Severity" color="primary" defaultValue="low" orientation="horizontal">
          <Radio value="low" label="Low" />
          <Radio value="medium" label="Medium" />
          <Radio value="high" label="High" color="danger" />
        </RadioGroup>
      </Section>

      <Section title="States">
        <DemoStack>
          <RadioGroup label="Disabled" isDisabled defaultValue="a" orientation="horizontal">
            <Radio value="a" label="Selected" />
            <Radio value="b" label="Other" />
          </RadioGroup>
          <RadioGroup label="Read only" isReadOnly defaultValue="a" orientation="horizontal">
            <Radio value="a" label="Locked selection" />
            <Radio value="b" label="Can't pick" />
          </RadioGroup>
          <RadioGroup label="One item disabled" defaultValue="a" orientation="horizontal">
            <Radio value="a" label="Available" />
            <Radio value="b" label="Unavailable" isDisabled />
          </RadioGroup>
          <RadioGroup
            label="Controlled plan"
            description={`Current: ${plan}`}
            value={plan}
            onValueChange={(value) => setPlan(String(value))}
          >
            <Radio value="free" label="Free" />
            <Radio value="pro" label="Pro" />
            <Radio value="team" label="Team" />
          </RadioGroup>
        </DemoStack>
      </Section>

      <Section title="Focus ring" description="Tab through — ring color should match each group.">
        <DemoStack>
          {colors.map((color) => (
            <RadioGroup
              key={color}
              color={color}
              label={color}
              defaultValue="a"
              orientation="horizontal"
            >
              <Radio value="a" label="A" />
              <Radio value="b" label="B" />
            </RadioGroup>
          ))}
        </DemoStack>
      </Section>
    </DemoPage>
  )
}
