import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'

import { PageHeader } from '../components/PageHeader'
import { PageShell } from '../components/PageShell'
import { useTheme } from '../hooks/use-theme'

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
]

function Library() {
  const { theme, setTheme } = useTheme()

  return (
    <PageShell>
      <PageHeader
        title="Component library"
        description="Visual playground for every Avara component — flip themes, poke variants, catch the bugs."
        theme={theme}
        onThemeChange={setTheme}
        showBack={false}
      />

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {components.map((component) => (
          <li key={component.to}>
            <Link
              to={component.to}
              className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-6 shadow-sm transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-primary-500 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="text-lg font-extrabold transition-colors group-hover:text-primary-700 dark:group-hover:text-primary-400">
                  {component.name}
                </span>
                <ArrowUpRight className="size-4 shrink-0 text-muted transition-colors group-hover:text-primary-600" />
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted">{component.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </PageShell>
  )
}
