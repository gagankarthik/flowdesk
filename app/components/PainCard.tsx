import type { PainSegment } from "@/lib/supabase";
import { VoteButton } from "./VoteButton";

export type Pain = {
  id: PainSegment;
  tone: "coral" | "sky" | "violet";
  title: string;
  oneLiner: string;
  metric: string;
  metricLabel: string;
  voteShare: number;
  illustration: React.ReactNode;
};

const TONE_BG: Record<Pain["tone"], string> = {
  coral: "tint-coral",
  sky: "tint-sky",
  violet: "tint-violet",
};
const TONE_TEXT: Record<Pain["tone"], string> = {
  coral: "text-coral",
  sky: "text-sky",
  violet: "text-violet",
};
const TONE_FILL: Record<Pain["tone"], string> = {
  coral: "bg-coral",
  sky: "bg-sky",
  violet: "bg-violet",
};

export function PainCard({ pain }: { pain: Pain }) {
  return (
    <article className={`soft-card ${TONE_BG[pain.tone]} flex flex-col gap-6`}>
      {/* Illustration block */}
      <div className="h-36 flex items-center justify-center relative">
        {pain.illustration}
      </div>

      {/* Title + one-liner */}
      <div>
        <h3 className="text-3xl md:text-[2rem] font-semibold tracking-tight text-ink leading-[1.05]">
          {pain.title}
        </h3>
        <p className="mt-3 text-ink-soft text-[15px] leading-snug">
          {pain.oneLiner}
        </p>
      </div>

      {/* Metric */}
      <div className={`text-5xl font-semibold tracking-tight ${TONE_TEXT[pain.tone]}`}>
        {pain.metric}
        <span className="ml-2 text-sm font-normal text-ink-muted align-middle">
          {pain.metricLabel}
        </span>
      </div>

      {/* Vote share bar */}
      <div className="mt-auto">
        <div className="flex items-baseline justify-between text-xs text-ink-muted mb-2">
          <span>Current vote share</span>
          <span className={`font-semibold ${TONE_TEXT[pain.tone]}`}>
            {Math.round(pain.voteShare * 100)}%
          </span>
        </div>
        <div className="bar">
          <div
            className={`bar-fill ${TONE_FILL[pain.tone]}`}
            style={{ width: "100%", ["--w" as string]: pain.voteShare.toString() }}
          />
        </div>
      </div>

      <VoteButton segment={pain.id} tone={pain.tone} />
    </article>
  );
}
