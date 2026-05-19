export function Footer() {
  return (
    <footer className="bg-cream py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-ink-muted">
        <div className="flex items-center gap-2.5">
          <span className="relative inline-flex w-6 h-6 items-center justify-center rounded-lg bg-ink">
            <span className="absolute top-0.5 left-0.5 w-2 h-2 rounded-full bg-coral" />
            <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-sky" />
            <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-violet" />
          </span>
          <span className="font-medium text-ink">FlowDesk</span>
          <span>© 2026</span>
        </div>
        <div>
          Built by vote. <span className="serif-italic">No product, yet.</span>
        </div>
      </div>
    </footer>
  );
}
