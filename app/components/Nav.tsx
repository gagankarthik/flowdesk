export function Nav() {
  return (
    <header className="sticky top-0 z-50 bg-cream/85 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5 group">
          <span className="relative inline-flex w-8 h-8 items-center justify-center rounded-xl bg-ink">
            <span className="absolute top-1 left-1 w-2.5 h-2.5 rounded-full bg-coral" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-sky" />
            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-violet" />
          </span>
          <span className="font-semibold tracking-tight text-ink text-lg">
            FlowDesk
          </span>
        </a>

        <a href="#vote" className="btn btn-dark text-sm !py-2.5 !px-5">
          Cast your vote
          <span aria-hidden>→</span>
        </a>
      </div>
    </header>
  );
}
