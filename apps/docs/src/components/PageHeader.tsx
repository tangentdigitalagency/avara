import { Link } from '@tanstack/react-router'
import { Sun, Moon } from 'lucide-react'
import { Button } from '@avara/react'
import type { Glass, Mode, Theme } from '../hooks/use-theme'

export function PageHeader({
  title,
  description,
  mode,
  onModeChange,
  themeVariant,
  onThemeVariantChange,
  glass,
  onGlassChange,
  showBack = true,
}: {
  title: string
  description?: string
  mode: Mode
  onModeChange: (mode: Mode) => void
  themeVariant: Theme
  onThemeVariantChange: (theme: Theme) => void
  glass: Glass
  onGlassChange: (glass: Glass) => void
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

      <div className="flex shrink-0 flex-wrap items-center gap-2">
        <div
          className="flex gap-1 rounded-full border border-border bg-surface/80 p-1 shadow-sm backdrop-blur"
          role="group"
          aria-label="Color mode"
        >
          <Button
            size="sm"
            radius="full"
            variant={mode === 'light' ? 'soft' : 'ghost'}
            color="neutral"
            isIconOnly
            aria-label="Light mode"
            onClick={() => onModeChange('light')}
            startContent={<Sun />}
          />
          <Button
            size="sm"
            radius="full"
            variant={mode === 'dark' ? 'soft' : 'ghost'}
            color="neutral"
            isIconOnly
            aria-label="Dark mode"
            onClick={() => onModeChange('dark')}
            startContent={<Moon />}
          />
        </div>

        <div
          className="flex gap-1 rounded-full border border-border bg-surface/80 p-1 shadow-sm backdrop-blur"
          role="group"
          aria-label="Design theme"
        >
          <Button
            size="sm"
            radius="full"
            variant={themeVariant === 'bold' ? 'soft' : 'ghost'}
            color="neutral"
            onClick={() => onThemeVariantChange('bold')}
          >
            Bold
          </Button>
          <Button
            size="sm"
            radius="full"
            variant={themeVariant === 'premium' ? 'soft' : 'ghost'}
            color="neutral"
            onClick={() => onThemeVariantChange('premium')}
          >
            Premium
          </Button>
        </div>

        <div
          className="flex gap-1 rounded-full border border-border bg-surface/80 p-1 shadow-sm backdrop-blur"
          role="group"
          aria-label="Glass intensity"
        >
          <Button
            size="sm"
            radius="full"
            variant={glass === 'off' ? 'soft' : 'ghost'}
            color="neutral"
            onClick={() => onGlassChange('off')}
          >
            Off
          </Button>
          <Button
            size="sm"
            radius="full"
            variant={glass === 'regular' ? 'soft' : 'ghost'}
            color="neutral"
            onClick={() => onGlassChange('regular')}
          >
            Regular
          </Button>
          <Button
            size="sm"
            radius="full"
            variant={glass === 'clear' ? 'soft' : 'ghost'}
            color="neutral"
            onClick={() => onGlassChange('clear')}
          >
            Clear
          </Button>
        </div>
      </div>
    </header>
  )
}
