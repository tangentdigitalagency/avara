import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'

import { Select } from '@avara/react'
import { DemoPage } from '../components/DemoPage'
import { DemoGrid, DemoStack, VariantLabel } from '../components/DemoRow'
import { Section } from '../components/Section'
import { colors, sizes, variants } from '../lib/demo'

export const Route = createFileRoute('/select')({ component: SelectPage })

const radii = ['sm', 'md', 'lg', 'full'] as const

const fruitItems = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'durian', label: 'Durian', isDisabled: true },
  { value: 'elderberry', label: 'Elderberry' },
]

const planItems = [
  { value: 'free', label: 'Free', description: 'For personal projects' },
  { value: 'pro', label: 'Pro', description: '$12 / month — everything unlocked' },
  { value: 'team', label: 'Team', description: '$29 / month — shared workspaces' },
]

const frameworkItems = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'solid', label: 'Solid' },
]

function SelectPage() {
  const [fruit, setFruit] = useState<string | null>('apple')
  const [frameworks, setFrameworks] = useState<string[]>(['react'])

  return (
    <DemoPage
      title="Select"
      description="Single and multi select — variants, sizes, clearable, placement, disabled items, and validation. Open menus to check popup glass and item highlight."
    >
      <Section title="Variant × color" description="Every variant against every semantic color.">
        <DemoStack>
          {variants.map((variant) => (
            <div key={variant} className="flex flex-col gap-3">
              <VariantLabel>{variant}</VariantLabel>
              <DemoGrid>
                {colors.map((color) => (
                  <Select
                    key={color}
                    variant={variant}
                    color={color}
                    label={color}
                    items={fruitItems}
                    placeholder={`${variant} / ${color}`}
                    defaultValue="apple"
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
            <Select
              key={size}
              size={size}
              label={size.toUpperCase()}
              items={fruitItems}
              placeholder={`Size ${size}`}
              defaultValue="banana"
            />
          ))}
        </DemoStack>
      </Section>

      <Section title="Radius">
        <DemoStack>
          {radii.map((radius) => (
            <Select
              key={radius}
              radius={radius}
              label={radius}
              items={fruitItems}
              placeholder={`Radius ${radius}`}
              defaultValue="cherry"
            />
          ))}
        </DemoStack>
      </Section>

      <Section title="Label & description">
        <DemoStack>
          <Select
            label="Favorite fruit"
            description="We'll use this to personalize your feed."
            items={fruitItems}
            placeholder="Pick a fruit"
          />
          <Select label="Plan" isRequired items={planItems} placeholder="Choose a plan" />
        </DemoStack>
      </Section>

      <Section title="Item descriptions" description="Secondary line under each option label.">
        <Select
          label="Subscription"
          items={planItems}
          placeholder="Select a plan"
          defaultValue="pro"
        />
      </Section>

      <Section
        title="Invalid"
        description="Error replaces description. Invalid always renders danger on the trigger."
      >
        <DemoStack>
          <Select
            label="Country"
            description="This won't show while invalid"
            isInvalid
            errorMessage="Please select a country."
            items={fruitItems}
            placeholder="Select…"
          />
          <DemoGrid>
            {colors.map((color) => (
              <Select
                key={color}
                color={color}
                isInvalid
                label={color}
                items={fruitItems}
                placeholder={color}
              />
            ))}
          </DemoGrid>
        </DemoStack>
      </Section>

      <Section title="Multiple" description="isMultiple — values join as a comma-separated label.">
        <Select
          label="Frameworks"
          description={`Selected: ${frameworks.join(', ') || 'none'}`}
          items={frameworkItems}
          isMultiple
          value={frameworks}
          onValueChange={(value) => setFrameworks(Array.isArray(value) ? value : [])}
          placeholder="Pick frameworks"
        />
      </Section>

      <Section title="Clearable" description="X clears selection — needs a controlled value + onValueChange.">
        <Select
          label="Fruit"
          items={fruitItems}
          isClearable
          value={fruit}
          onValueChange={(value) => setFruit(typeof value === 'string' ? value : null)}
          placeholder="Pick a fruit"
        />
      </Section>

      <Section title="Placement" description="Popup side relative to the trigger.">
        <DemoGrid>
          {(['bottom', 'top', 'left', 'right'] as const).map((side) => (
            <Select
              key={side}
              label={side}
              side={side}
              items={fruitItems}
              placeholder={`Open ${side}`}
              defaultValue="apple"
            />
          ))}
        </DemoGrid>
      </Section>

      <Section title="States">
        <DemoStack>
          <Select label="Disabled" items={fruitItems} isDisabled defaultValue="apple" />
          <Select label="Read only" items={fruitItems} isReadOnly defaultValue="banana" />
          <Select
            label="With disabled item"
            description="Durian is disabled in the list."
            items={fruitItems}
            placeholder="Try selecting Durian"
          />
        </DemoStack>
      </Section>

      <Section title="Focus ring" description="Tab through — ring color should match each select.">
        <DemoGrid>
          {colors.map((color) => (
            <Select
              key={color}
              color={color}
              label={color}
              items={fruitItems}
              placeholder="Focus me"
            />
          ))}
        </DemoGrid>
      </Section>
    </DemoPage>
  )
}
