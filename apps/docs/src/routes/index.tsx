import { useEffect, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Plus, ArrowRight, Download, Trash2, Heart, Settings } from 'lucide-react'

import { Button } from '@avara/react'

export const Route = createFileRoute('/')({ component: Home })

type Theme = 'light' | 'dark'

const variants = ['solid', 'outline', 'soft', 'ghost'] as const
const colors = ['primary', 'secondary', 'neutral', 'success', 'warning', 'danger', 'info'] as const
const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
const radii = ['sm', 'md', 'lg', 'full'] as const

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2 className="text-xs font-bold uppercase tracking-wide text-muted mb-3">{title}</h2>
      {children}
    </div>
  )
}

function Home() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof document === 'undefined') return 'light'
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return (
    <div className="min-h-dvh bg-background text-foreground p-8">
      <div className="mb-10 flex items-center gap-3">
        <span className="text-sm text-muted">Theme</span>
        <div className="flex gap-2">
          <Button size="sm" variant={theme === 'light' ? 'solid' : 'outline'} color="neutral" onClick={() => setTheme('light')}>
            Light
          </Button>
          <Button size="sm" variant={theme === 'dark' ? 'solid' : 'outline'} color="neutral" onClick={() => setTheme('dark')}>
            Dark
          </Button>
        </div>
      </div>

      <Section title="Variant × color matrix">
        <div className="flex flex-col gap-3">
          {variants.map((variant) => (
            <div key={variant} className="flex gap-3 items-center flex-wrap">
              <span className="text-xs text-muted w-16 shrink-0">{variant}</span>
              {colors.map((color) => (
                <Button key={color} variant={variant} color={color}>
                  {color}
                </Button>
              ))}
            </div>
          ))}
        </div>
      </Section>

      <Section title="Sizes">
        <div className="flex gap-3 items-center flex-wrap">
          {sizes.map((size) => (
            <Button key={size} size={size}>
              {size.toUpperCase()}
            </Button>
          ))}
        </div>
      </Section>

      <Section title="Radius">
        <div className="flex gap-3 items-center flex-wrap">
          {radii.map((radius) => (
            <Button key={radius} radius={radius}>
              {radius}
            </Button>
          ))}
        </div>
      </Section>

      <Section title="Shadow (hover to see lift + shadow grow)">
        <div className="flex gap-3 items-center flex-wrap">
          <Button shadow="none">None</Button>
          <Button shadow="sm">SM</Button>
          <Button shadow="md">MD</Button>
          <Button shadow="lg">LG</Button>
        </div>
      </Section>

      <Section title="Focus ring (tab through these — ring should match each color)">
        <div className="flex gap-3 items-center flex-wrap">
          {colors.map((color) => (
            <Button key={color} color={color}>
              {color}
            </Button>
          ))}
        </div>
      </Section>

      <Section title="Icons — startContent / endContent (auto-sized, no manual className)">
        <div className="flex gap-3 items-center flex-wrap">
          <Button startContent={<Plus />}>Add item</Button>
          <Button endContent={<ArrowRight />}>Continue</Button>
          <Button variant="outline" startContent={<Download />}>Download</Button>
          <Button variant="soft" color="danger" startContent={<Trash2 />}>Delete</Button>
        </div>
      </Section>

      <Section title="Icon auto-scaling across sizes">
        <div className="flex gap-3 items-center flex-wrap">
          {sizes.map((size) => (
            <Button key={size} size={size} startContent={<Heart />}>
              {size.toUpperCase()}
            </Button>
          ))}
        </div>
      </Section>

      <Section title="States">
        <div className="flex gap-3 items-center flex-wrap">
          <Button isLoading>Loading</Button>
          <Button isDisabled>Disabled</Button>
          <Button isDisabled startContent={<Plus />}>Disabled with icon</Button>
          <Button isLoading startContent={<Plus />}>Loading with icon</Button>
        </div>
      </Section>

      <Section title="Full width">
        <div className="flex flex-col gap-3">
          <Button fullWidth>Full width</Button>
          <Button fullWidth variant="outline" color="secondary" endContent={<ArrowRight />}>
            Full width with icon
          </Button>
        </div>
      </Section>

      <Section title="Icon only — across sizes and variants">
        <div className="flex gap-3 items-center flex-wrap">
          {sizes.map((size) => (
            <Button key={size} size={size} isIconOnly aria-label="Add item" startContent={<Plus />} />
          ))}
          <Button variant="outline" color="danger" isIconOnly aria-label="Delete item" startContent={<Trash2 />} />
          <Button variant="soft" color="neutral" isIconOnly aria-label="Settings" startContent={<Settings />} />
          <Button isLoading isIconOnly aria-label="Loading" />
        </div>
      </Section>
    </div>
  )
}