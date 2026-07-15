import { PageHeader } from './PageHeader'
import { PageShell } from './PageShell'
import { useTheme } from '../hooks/use-theme'

type GlassDemo = false | 'gradient' | 'texture'

/**
 * Shared playground page shell — wires theme toggles so demos only paint
 * glass backdrops when glass is actually on.
 */
export function DemoPage({
  title,
  description,
  glassDemo = 'gradient',
  showBack = true,
  children,
}: {
  title: string
  description?: string
  /** Backdrop used only while glass ≠ off. Default gradient; Button uses texture. */
  glassDemo?: GlassDemo
  showBack?: boolean
  children: React.ReactNode
}) {
  const { mode, setMode, theme, setTheme, glass, setGlass } = useTheme()

  const shellDemo: boolean | 'texture' =
    glass === 'off' || glassDemo === false
      ? false
      : glassDemo === 'texture'
        ? 'texture'
        : true

  return (
    <PageShell glassDemo={shellDemo}>
      <PageHeader
        title={title}
        description={description}
        mode={mode}
        onModeChange={setMode}
        themeVariant={theme}
        onThemeVariantChange={setTheme}
        glass={glass}
        onGlassChange={setGlass}
        showBack={showBack}
      />
      {children}
    </PageShell>
  )
}
