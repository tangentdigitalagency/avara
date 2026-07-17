import { Link } from '@tanstack/react-router'
import { Sun, Moon } from 'lucide-react'
import { Button } from '@avara/react'
import type { Glass, Mode, Theme } from '../hooks/use-theme'

const pillGroup =
  'flex w-full gap-1 rounded-full border border-border bg-surface/80 p-1 shadow-sm backdrop-blur sm:w-auto'

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
    <header className="mb-8 flex flex-col gap-5 sm:mb-12 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
      <div className="min-w-0 flex-1">
        {showBack ? (
          <Link
            to="/"
            className="inline-flex min-h-11 items-center gap-1.5 py-1 text-sm font-semibold text-muted transition-colors hover:text-foreground sm:min-h-0 sm:py-0"
          >
            ← Library
          </Link>
        ) : (
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-700 dark:text-primary-400 sm:text-sm">
            Avara
          </p>
        )}
        <h1 className="mt-1 text-2xl font-extrabold tracking-tight break-words sm:mt-2 sm:text-4xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted sm:text-base">{description}</p>
        ) : null}
      </div>

      <div className="flex w-full flex-col gap-2 sm:w-auto sm:max-w-md sm:flex-row sm:flex-wrap sm:items-center lg:max-w-none">
        <div className={pillGroup} role="group" aria-label="Color mode">
          <Button
            size="sm"
            radius="full"
            variant={mode === 'light' ? 'soft' : 'ghost'}
            color="neutral"
            isIconOnly
            aria-label="Light mode"
            className="flex-1 sm:flex-none"
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
            className="flex-1 sm:flex-none"
            onClick={() => onModeChange('dark')}
            startContent={<Moon />}
          />
        </div>

        <div className={pillGroup} role="group" aria-label="Design theme">
          <Button
            size="sm"
            radius="full"
            variant={themeVariant === 'bold' ? 'soft' : 'ghost'}
            color="neutral"
            className="flex-1 sm:flex-none"
            onClick={() => onThemeVariantChange('bold')}
          >
            Bold
          </Button>
          <Button
            size="sm"
            radius="full"
            variant={themeVariant === 'premium' ? 'soft' : 'ghost'}
            color="neutral"
            className="flex-1 sm:flex-none"
            onClick={() => onThemeVariantChange('premium')}
          >
            Premium
          </Button>
        </div>

        <div className={pillGroup} role="group" aria-label="Glass intensity">
          <Button
            size="sm"
            radius="full"
            variant={glass === 'off' ? 'soft' : 'ghost'}
            color="neutral"
            className="flex-1 sm:flex-none"
            onClick={() => onGlassChange('off')}
          >
            Off
          </Button>
          <Button
            size="sm"
            radius="full"
            variant={glass === 'regular' ? 'soft' : 'ghost'}
            color="neutral"
            className="flex-1 sm:flex-none"
            onClick={() => onGlassChange('regular')}
          >
            Regular
          </Button>
          <Button
            size="sm"
            radius="full"
            variant={glass === 'clear' ? 'soft' : 'ghost'}
            color="neutral"
            className="flex-1 sm:flex-none"
            onClick={() => onGlassChange('clear')}
          >
            Clear
          </Button>
        </div>
      </div>
    </header>
  )
}
