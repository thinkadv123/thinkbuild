export function Marquee({ items, dark = false }: { items: string[]; dark?: boolean }) {
  const row = [...items, ...items];
  return (
    <div
      className={`relative flex overflow-hidden py-6 ${dark ? "bg-ink text-white" : "bg-brand text-ink"}`}
      aria-hidden
    >
      <div className="animate-marquee flex shrink-0 items-center whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} className="flex items-center font-display text-2xl font-extrabold uppercase tracking-tight sm:text-3xl">
            <span className="px-8">{t}</span>
            <svg viewBox="0 0 24 24" className={`h-5 w-5 ${dark ? "text-brand" : "text-ink"}`} fill="currentColor">
              <path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z" />
            </svg>
          </span>
        ))}
      </div>
    </div>
  );
}
