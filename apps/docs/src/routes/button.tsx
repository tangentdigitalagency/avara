import { createFileRoute } from '@tanstack/react-router'
import { Plus, ArrowRight, Download, Trash2, Heart, Settings } from 'lucide-react'

import { Button } from '@avara/react'
import { DemoPage } from '../components/DemoPage'
import { DemoRow, DemoStack } from '../components/DemoRow'
import { Section } from '../components/Section'
import { colors, sizes, variants } from '../lib/demo'

export const Route = createFileRoute('/button')({ component: ButtonPage })

const radii = ['sm', 'md', 'lg', 'full'] as const

function ButtonPage() {
  return (
    <DemoPage
      title="Button"
      description="Action control — variants, colors, sizes, icons, and loading states. Texture backdrop appears with Glass for blur testing."
      glassDemo="texture"
    >
      <Section title="Variant × color" description="Every variant against every semantic color.">
        <DemoStack>
          {variants.map((variant) => (
            <DemoRow key={variant} label={variant}>
              {colors.map((color) => (
                <Button key={color} variant={variant} color={color}>
                  {color}
                </Button>
              ))}
            </DemoRow>
          ))}
        </DemoStack>
      </Section>

      <Section title="Sizes">
        <DemoRow>
          {sizes.map((size) => (
            <Button key={size} size={size}>
              {size.toUpperCase()}
            </Button>
          ))}
        </DemoRow>
      </Section>

      <Section title="Radius">
        <DemoRow>
          {radii.map((radius) => (
            <Button key={radius} radius={radius}>
              {radius}
            </Button>
          ))}
        </DemoRow>
      </Section>

      <Section title="Shadow" description="Hover to see lift and shadow grow.">
        <DemoRow>
          <Button shadow="none">None</Button>
          <Button shadow="sm">SM</Button>
          <Button shadow="md">MD</Button>
          <Button shadow="lg">LG</Button>
        </DemoRow>
      </Section>

      <Section title="Focus ring" description="Tab through — ring color should match each button.">
        <DemoRow>
          {colors.map((color) => (
            <Button key={color} color={color}>
              {color}
            </Button>
          ))}
        </DemoRow>
      </Section>

      <Section title="Icons" description="startContent / endContent — auto-sized, no manual className.">
        <DemoRow>
          <Button startContent={<Plus />}>Add item</Button>
          <Button endContent={<ArrowRight />}>Continue</Button>
          <Button variant="outline" startContent={<Download />}>
            Download
          </Button>
          <Button variant="soft" color="danger" startContent={<Trash2 />}>
            Delete
          </Button>
        </DemoRow>
      </Section>

      <Section title="Icon scaling" description="Icons scale with button size.">
        <DemoRow>
          {sizes.map((size) => (
            <Button key={size} size={size} startContent={<Heart />}>
              {size.toUpperCase()}
            </Button>
          ))}
        </DemoRow>
      </Section>

      <Section title="States">
        <DemoRow>
          <Button isLoading>Loading</Button>
          <Button isDisabled>Disabled</Button>
          <Button isDisabled startContent={<Plus />}>
            Disabled with icon
          </Button>
          <Button isLoading startContent={<Plus />}>
            Loading with icon
          </Button>
        </DemoRow>
      </Section>

      <Section title="Full width">
        <DemoStack>
          <Button fullWidth>Full width</Button>
          <Button fullWidth variant="outline" color="secondary" endContent={<ArrowRight />}>
            Full width with icon
          </Button>
        </DemoStack>
      </Section>

      <Section title="Icon only">
        <DemoRow>
          {sizes.map((size) => (
            <Button key={size} size={size} isIconOnly aria-label="Add item" startContent={<Plus />} />
          ))}
          <Button
            variant="outline"
            color="danger"
            isIconOnly
            aria-label="Delete item"
            startContent={<Trash2 />}
          />
          <Button
            variant="soft"
            color="neutral"
            isIconOnly
            aria-label="Settings"
            startContent={<Settings />}
          />
          <Button isLoading isIconOnly aria-label="Loading" />
        </DemoRow>
      </Section>
    </DemoPage>
  )
}
