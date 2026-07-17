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
    <section className="mb-6 last:mb-0 sm:mb-8">
      <div className="mb-2.5 sm:mb-3">
        <h2 className="flex items-start gap-2 text-xs font-bold uppercase tracking-wider text-muted">
          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" />
          <span className="min-w-0 break-words">{title}</span>
        </h2>
        {description ? (
          <p className="mt-1.5 pl-3.5 text-sm leading-relaxed text-muted">{description}</p>
        ) : null}
      </div>
      <div className="overflow-x-auto rounded-xl border border-border bg-surface p-4 text-foreground shadow-sm sm:rounded-2xl sm:p-6">
        {children}
      </div>
    </section>
  )
}
