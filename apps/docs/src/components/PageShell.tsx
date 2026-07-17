const glassDemoAtmosphere =
  'bg-[radial-gradient(ellipse_90%_70%_at_0%_0%,oklch(0.82_0.09_195)_0%,transparent_55%),radial-gradient(ellipse_80%_60%_at_100%_5%,oklch(0.84_0.08_55)_0%,transparent_50%),radial-gradient(ellipse_70%_65%_at_85%_95%,oklch(0.78_0.07_250)_0%,transparent_55%),radial-gradient(ellipse_65%_55%_at_10%_90%,oklch(0.8_0.08_145)_0%,transparent_50%),linear-gradient(165deg,oklch(0.9_0.03_100)_0%,oklch(0.86_0.04_220)_45%,oklch(0.84_0.05_40)_100%)] dark:bg-[radial-gradient(ellipse_90%_70%_at_0%_0%,oklch(0.38_0.08_210)_0%,transparent_55%),radial-gradient(ellipse_80%_60%_at_100%_5%,oklch(0.36_0.07_45)_0%,transparent_50%),radial-gradient(ellipse_70%_65%_at_85%_95%,oklch(0.32_0.07_260)_0%,transparent_55%),radial-gradient(ellipse_65%_55%_at_10%_90%,oklch(0.34_0.06_160)_0%,transparent_50%),linear-gradient(165deg,oklch(0.22_0.03_250)_0%,oklch(0.18_0.03_220)_45%,oklch(0.2_0.04_40)_100%)]'

const glassDemoTextureUrl =
  'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1600'

export function PageShell({
  children,
  glassDemo = false,
}: {
  children: React.ReactNode
  /** Test-only backdrop so glass translucency is visible. `"texture"` uses a busy photo. */
  glassDemo?: boolean | 'texture'
}) {
  const isTexture = glassDemo === 'texture'
  const isGradient = glassDemo === true

  return (
    <div
      className={[
        'relative min-h-dvh overflow-x-clip text-foreground',
        isTexture ? 'bg-cover bg-center' : isGradient ? glassDemoAtmosphere : 'bg-background',
      ].join(' ')}
      style={isTexture ? { backgroundImage: `url('${glassDemoTextureUrl}')` } : undefined}
    >
      {!glassDemo ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[radial-gradient(ellipse_80%_60%_at_20%_-10%,color-mix(in_oklab,var(--color-primary-500)_22%,transparent),transparent),radial-gradient(ellipse_60%_50%_at_90%_0%,color-mix(in_oklab,var(--color-secondary-500)_14%,transparent),transparent)] sm:h-72"
        />
      ) : null}
      <div className="relative mx-auto w-full max-w-5xl px-4 py-8 pb-[max(2rem,env(safe-area-inset-bottom))] pt-[max(2rem,env(safe-area-inset-top))] sm:px-8 sm:py-14">
        {children}
      </div>
    </div>
  )
}
