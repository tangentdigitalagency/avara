import { Link } from '@tanstack/react-router'
import { Sun, Moon } from 'lucide-react'
import { Button } from '@avara/react'
import type { Theme } from '../hooks/use-theme'

export function PageHeader({
  title,
  description,
  theme,
  onThemeChange,
  showBack = true,
}: {
  title: string
  description?: string
  theme: Theme
  onThemeChange: (theme: Theme) => void
  showBack?: boolean
}) {
  return (
    <header className="mb-12 flex items-start justify-between gap-6 flex-wrap">
      <div className="min-w-0">
        {showBack ? (
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted transition-colors hover:text-foreground"
          >
            ← Library
          </Link>
        ) : (
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-700 dark:text-primary-400">
            Avara
          </p>
        )}
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h1>
        {description ? <p className="mt-2 max-w-xl text-muted">{description}</p> : null}
      </div>

      <div
        className="flex shrink-0 gap-1 rounded-full border border-border bg-surface/80 p-1 shadow-sm backdrop-blur"
        role="group"
        aria-label="Color theme"
      >
        <Button
          size="sm"
          radius="full"
          variant={theme === 'light' ? 'soft' : 'ghost'}
          color="neutral"
          isIconOnly
          aria-label="Light mode"
          onClick={() => onThemeChange('light')}
          startContent={<Sun />}
        />
        <Button
          size="sm"
          radius="full"
          variant={theme === 'dark' ? 'soft' : 'ghost'}
          color="neutral"
          isIconOnly
          aria-label="Dark mode"
          onClick={() => onThemeChange('dark')}
          startContent={<Moon />}
        />
      </div>
    </header>
  )
}
