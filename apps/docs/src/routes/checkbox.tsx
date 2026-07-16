import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'

import { Button, Checkbox } from '@avara/react'
import { DemoPage } from '../components/DemoPage'
import { DemoGrid, DemoRow, DemoStack, VariantLabel } from '../components/DemoRow'
import { Section } from '../components/Section'
import { colors, sizes, variants } from '../lib/demo'

export const Route = createFileRoute('/checkbox')({ component: CheckboxPage })

const radii = ['none', 'sm', 'md', 'lg', 'full'] as const
const motions = ['pop', 'wave', 'stagger'] as const

function CheckboxPage() {
  const [terms, setTerms] = useState(false)
  const [selectAll, setSelectAll] = useState<boolean | 'indeterminate'>('indeterminate')

  return (
    <DemoPage
      title="Checkbox"
      description="Binary and indeterminate selection — variants, colors, drawn checkmark, and temporary motion styles (pop / wave / stagger). Toggle checkboxes to compare entrance animations."
    >
      <Section
        title="Motion"
        description="Temporary testing prop — toggle each to compare. pop = spring scale on the box; wave = fill expands from center; stagger = longer delay before the check draws in."
      >
        <DemoStack>
          {motions.map((motion) => (
            <DemoRow key={motion} label={motion}>
              {colors.map((color) => (
                <Checkbox
                  key={color}
                  motion={motion}
                  color={color}
                  label={color}
                  defaultChecked
                />
              ))}
            </DemoRow>
          ))}
        </DemoStack>
      </Section>

      <Section
        title="Motion side-by-side"
        description="Same color, three motions — click repeatedly to feel the timing difference."
      >
        <DemoRow>
          {motions.map((motion) => (
            <Checkbox key={motion} motion={motion} label={motion} />
          ))}
        </DemoRow>
      </Section>

      <Section title="Variant × color" description="Default motion (pop). Every variant against every semantic color — defaultChecked so the filled look is visible.">
        <DemoStack>
          {variants.map((variant) => (
            <div key={variant} className="flex flex-col gap-3">
              <VariantLabel>{variant}</VariantLabel>
              <DemoGrid>
                {colors.map((color) => (
                  <Checkbox
                    key={color}
                    variant={variant}
                    color={color}
                    label={color}
                    defaultChecked
                  />
                ))}
              </DemoGrid>
            </div>
          ))}
        </DemoStack>
      </Section>

      <Section title="Unchecked" description="Same matrix, unchecked — border/focus should still look right.">
        <DemoStack>
          {variants.map((variant) => (
            <DemoRow key={variant} label={variant}>
              {colors.map((color) => (
                <Checkbox key={color} variant={variant} color={color} aria-label={color} />
              ))}
            </DemoRow>
          ))}
        </DemoStack>
      </Section>

      <Section title="Sizes">
        <DemoRow>
          {sizes.map((size) => (
            <Checkbox key={size} size={size} label={size.toUpperCase()} defaultChecked />
          ))}
        </DemoRow>
      </Section>

      <Section title="Radius">
        <DemoRow>
          {radii.map((radius) => (
            <Checkbox key={radius} radius={radius} label={radius} defaultChecked />
          ))}
        </DemoRow>
      </Section>

      <Section title="Label & description">
        <DemoStack>
          <Checkbox
            label="Email me weekly tips"
            description="You can unsubscribe anytime."
            defaultChecked
          />
          <Checkbox label="I accept the terms" isRequired />
        </DemoStack>
      </Section>

      <Section
        title="Invalid"
        description="Error replaces description. Invalid always renders danger, regardless of color."
      >
        <DemoStack>
          <Checkbox
            label="Agree to terms"
            description="This won't show while invalid"
            isInvalid
            errorMessage="You must accept the terms to continue."
          />
          <DemoRow>
            {colors.map((color) => (
              <Checkbox key={color} color={color} isInvalid label={color} />
            ))}
          </DemoRow>
        </DemoStack>
      </Section>

      <Section title="Indeterminate" description="Minus icon — useful for “select all” parents. Drawn check is skipped in this state.">
        <DemoStack>
          <Checkbox label="Select all (uncontrolled)" isIndeterminate defaultChecked />
          <Checkbox
            label={`Select all (controlled: ${String(selectAll)})`}
            checked={selectAll === true}
            isIndeterminate={selectAll === 'indeterminate'}
            onCheckedChange={(checked) => setSelectAll(checked)}
          />
          <DemoRow>
            <Button size="sm" variant="outline" color="neutral" onClick={() => setSelectAll(true)}>
              Set checked
            </Button>
            <Button size="sm" variant="outline" color="neutral" onClick={() => setSelectAll(false)}>
              Set unchecked
            </Button>
            <Button
              size="sm"
              variant="outline"
              color="neutral"
              onClick={() => setSelectAll('indeterminate')}
            >
              Set indeterminate
            </Button>
          </DemoRow>
        </DemoStack>
      </Section>

      <Section title="States">
        <DemoStack>
          <Checkbox label="Disabled unchecked" isDisabled />
          <Checkbox label="Disabled checked" isDisabled defaultChecked />
          <Checkbox label="Read only" isReadOnly defaultChecked />
          <Checkbox label="Loading" isLoading defaultChecked />
          <Checkbox
            label="Controlled terms"
            description={terms ? 'Thanks — terms accepted.' : 'Please accept to continue.'}
            checked={terms}
            onCheckedChange={setTerms}
          />
        </DemoStack>
      </Section>

      <Section title="Focus ring" description="Tab through — ring color should match each checkbox.">
        <DemoRow>
          {colors.map((color) => (
            <Checkbox key={color} color={color} label={color} defaultChecked />
          ))}
        </DemoRow>
      </Section>
    </DemoPage>
  )
}
