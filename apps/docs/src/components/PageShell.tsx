export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-dvh bg-background text-foreground">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(ellipse_80%_60%_at_20%_-10%,color-mix(in_oklab,var(--color-primary-500)_22%,transparent),transparent),radial-gradient(ellipse_60%_50%_at_90%_0%,color-mix(in_oklab,var(--color-secondary-500)_14%,transparent),transparent)]"
      />
      <div className="relative mx-auto max-w-5xl px-6 py-10 sm:px-8 sm:py-14">{children}</div>
    </div>
  )
}
