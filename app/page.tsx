import { Nav } from "./components/Nav";
import { PainCard, type Pain } from "./components/PainCard";
import { JoinForm } from "./components/JoinForm";
import { Footer } from "./components/Footer";

const PAINS: Pain[] = [
  {
    id: "payments",
    tone: "coral",
    title: "Get paid on time.",
    oneLiner: "Late invoices and silent scope creep — the two slowest leaks in every freelance P&L.",
    metric: "$3,400",
    metricLabel: "/ yr lost",
    voteShare: 0.46,
    illustration: <PaymentsArt />,
  },
  {
    id: "fragmentation",
    tone: "sky",
    title: "One desk, not seven tabs.",
    oneLiner: "Notion, Stripe, Slack, Cal, Drive… the work isn't the work anymore.",
    metric: "7+",
    metricLabel: "tools",
    voteShare: 0.32,
    illustration: <StackArt />,
  },
  {
    id: "mental_load",
    tone: "violet",
    title: "Clock out for real.",
    oneLiner: "The brain that won't quit at 6pm. Future clients, future invoices, future deadlines.",
    metric: "11h",
    metricLabel: "/ wk off-clock",
    voteShare: 0.22,
    illustration: <FocusArt />,
  },
];

export default function Page() {
  return (
    <>
      <Nav />

      <main id="top">
        {/* ═══════════════════ HERO ═══════════════════ */}
        <section className="relative overflow-hidden">
          {/* Soft color blobs in background */}
          <div className="blob bg-coral w-[520px] h-[520px] -top-40 -left-40" />
          <div className="blob bg-sky w-[480px] h-[480px] -top-32 right-0" />
          <div className="blob bg-violet w-[440px] h-[440px] top-40 left-1/3 opacity-40" />

          <div className="relative mx-auto max-w-7xl px-6 lg:px-10 pt-24 md:pt-32 pb-24 md:pb-32 grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="rise rise-1 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cream-2 text-xs font-medium text-ink-soft">
                <span className="w-1.5 h-1.5 rounded-full bg-coral animate-pulse" />
                Pre-launch · 1,247 freelancers voting
              </div>

              <h1 className="rise rise-2 mt-7 text-5xl md:text-7xl lg:text-[5.5rem] font-semibold tracking-[-0.03em] leading-[0.98] text-ink">
                We're building <span className="serif-italic text-coral">one</span>
                <br />
                freelancer tool.
                <br />
                <span className="text-ink-muted">You pick which.</span>
              </h1>

              <p className="rise rise-3 mt-8 text-lg md:text-xl text-ink-soft leading-relaxed max-w-lg">
                Three problems every freelancer has. Vote for the one that hurts most — we ship that fix first.
              </p>

              <div className="rise rise-4 mt-10 flex flex-wrap items-center gap-3">
                <a href="#vote" className="btn btn-lime !text-base">
                  Cast your vote
                  <span aria-hidden>→</span>
                </a>
                <a href="#problems" className="btn btn-light">
                  See the problems
                </a>
              </div>
            </div>

            {/* Hero visual — three floating ballot cards */}
            <div className="lg:col-span-5 relative h-[440px] hidden lg:block rise rise-3">
              <div
                className="ballot float-a bg-coral-soft"
                style={{ top: "20px", left: "10px", transform: "rotate(-8deg)" }}
              >
                <div className="text-3xl mb-2">💸</div>
                <div className="text-sm text-coral font-medium">/ 01 Payments</div>
                <div className="text-lg font-semibold text-ink mt-1 leading-tight">
                  Get paid on time
                </div>
                <div className="mt-4 bar">
                  <div className="bar-fill bg-coral" style={{ width: "100%", ["--w" as string]: "0.46" }} />
                </div>
                <div className="mt-2 text-xs text-ink-muted">46% of votes</div>
              </div>

              <div
                className="ballot float-b bg-sky-soft"
                style={{ top: "60px", right: "0", transform: "rotate(4deg)" }}
              >
                <div className="text-3xl mb-2">🗂️</div>
                <div className="text-sm text-sky font-medium">/ 02 Stack</div>
                <div className="text-lg font-semibold text-ink mt-1 leading-tight">
                  One desk, not seven tabs
                </div>
                <div className="mt-4 bar">
                  <div className="bar-fill bg-sky" style={{ width: "100%", ["--w" as string]: "0.32" }} />
                </div>
                <div className="mt-2 text-xs text-ink-muted">32% of votes</div>
              </div>

              <div
                className="ballot float-c bg-violet-soft"
                style={{ bottom: "20px", left: "70px", transform: "rotate(-3deg)" }}
              >
                <div className="text-3xl mb-2">🌙</div>
                <div className="text-sm text-violet font-medium">/ 03 Focus</div>
                <div className="text-lg font-semibold text-ink mt-1 leading-tight">
                  Clock out for real
                </div>
                <div className="mt-4 bar">
                  <div className="bar-fill bg-violet" style={{ width: "100%", ["--w" as string]: "0.22" }} />
                </div>
                <div className="mt-2 text-xs text-ink-muted">22% of votes</div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════ PROBLEMS — three colorful cards ═══════════════════ */}
        <section id="problems" className="py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="max-w-3xl mb-14">
              <div className="text-xs uppercase tracking-widest text-ink-muted font-medium mb-4">
                The ballot
              </div>
              <h2 className="text-4xl md:text-6xl font-semibold tracking-[-0.03em] leading-[1.02] text-ink">
                Pick the one <span className="serif-italic text-ink-muted">that costs you the most.</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {PAINS.map((p) => (
                <PainCard key={p.id} pain={p} />
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════ VOTE / FORM ═══════════════════ */}
        <section id="vote" className="py-20 md:py-28">
          <div className="mx-auto max-w-4xl px-6 lg:px-10">
            <div className="soft-card bg-ink text-cream md:p-14 !rounded-[40px]" style={{ background: "var(--color-ink)" }}>
              <div className="grid md:grid-cols-12 gap-10 items-start">
                <div className="md:col-span-5">
                  <div className="text-xs uppercase tracking-widest text-cream/60 font-medium mb-4">
                    Cast your vote
                  </div>
                  <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.02] text-cream">
                    Two clicks.
                    <br />
                    <span className="serif-italic text-lime">One email</span>
                    <br />
                    when we ship.
                  </h2>
                  <p className="mt-5 text-cream/70 leading-relaxed">
                    No drip campaign. No newsletter. No "quick check-in."
                  </p>
                </div>

                <div className="md:col-span-7 bg-cream rounded-3xl p-7 md:p-9">
                  <JoinForm />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

/* ─────────── SVG illustrations for the three pains ─────────── */

function PaymentsArt() {
  return (
    <svg viewBox="0 0 200 140" className="w-full h-full" aria-hidden>
      <circle cx="100" cy="70" r="55" fill="var(--color-coral)" opacity="0.18" />
      <circle cx="100" cy="70" r="38" fill="var(--color-coral)" />
      <text
        x="100"
        y="83"
        textAnchor="middle"
        fontSize="42"
        fontFamily="var(--font-display)"
        fontWeight="700"
        fill="white"
      >
        $
      </text>
      <circle cx="160" cy="35" r="8" fill="var(--color-coral)" opacity="0.5" />
      <circle cx="40" cy="100" r="6" fill="var(--color-coral)" opacity="0.4" />
      <circle cx="175" cy="100" r="5" fill="var(--color-coral)" opacity="0.3" />
    </svg>
  );
}

function StackArt() {
  return (
    <svg viewBox="0 0 200 140" className="w-full h-full" aria-hidden>
      <rect x="55" y="20" width="90" height="70" rx="10" fill="var(--color-sky)" opacity="0.25" transform="rotate(-6 100 55)" />
      <rect x="50" y="35" width="100" height="75" rx="10" fill="var(--color-sky)" opacity="0.6" />
      <rect x="60" y="55" width="80" height="65" rx="10" fill="var(--color-sky)" />
      <rect x="72" y="70" width="56" height="4" rx="2" fill="white" opacity="0.9" />
      <rect x="72" y="82" width="40" height="4" rx="2" fill="white" opacity="0.7" />
      <rect x="72" y="94" width="48" height="4" rx="2" fill="white" opacity="0.5" />
    </svg>
  );
}

function FocusArt() {
  return (
    <svg viewBox="0 0 200 140" className="w-full h-full" aria-hidden>
      <circle cx="105" cy="70" r="42" fill="var(--color-violet)" opacity="0.2" />
      <path
        d="M130 70 A30 30 0 1 1 95 41 A22 22 0 0 0 130 70 Z"
        fill="var(--color-violet)"
      />
      <circle cx="55" cy="35" r="2.5" fill="var(--color-violet)" opacity="0.6" />
      <circle cx="170" cy="50" r="3" fill="var(--color-violet)" opacity="0.5" />
      <circle cx="40" cy="95" r="2" fill="var(--color-violet)" opacity="0.4" />
      <circle cx="155" cy="105" r="2.5" fill="var(--color-violet)" opacity="0.5" />
    </svg>
  );
}
