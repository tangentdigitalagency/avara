export function Section({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <section className="mb-8 last:mb-0">
      <div className="mb-3">
        <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
          {title}
        </h2>
        {description ? <p className="mt-1.5 pl-3.5 text-sm text-muted">{description}</p> : null}
      </div>
      <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6">{children}</div>
    </section>
  )
}
