"use client";

import { useActionState, useEffect, useState } from "react";
import { joinWaitlist, type JoinResult } from "../actions";
import type { PainSegment } from "@/lib/supabase";

const OPTIONS: { value: PainSegment; label: string; tone: "coral" | "sky" | "violet"; emoji: string }[] = [
  { value: "payments",      label: "Get paid on time",        tone: "coral",  emoji: "💸" },
  { value: "fragmentation", label: "One desk, not seven tabs", tone: "sky",    emoji: "🗂️" },
  { value: "mental_load",   label: "Clock out for real",      tone: "violet", emoji: "🌙" },
];

export function JoinForm() {
  const [state, formAction, pending] = useActionState<
    JoinResult | null,
    FormData
  >(joinWaitlist, null);
  const [segment, setSegment] = useState<PainSegment | "">("");

  useEffect(() => {
    function handler(e: Event) {
      const detail = (e as CustomEvent<{ segment: PainSegment }>).detail;
      if (detail?.segment) setSegment(detail.segment);
    }
    window.addEventListener("flowdesk:vote", handler);
    return () => window.removeEventListener("flowdesk:vote", handler);
  }, []);

  if (state?.ok) {
    const tone = OPTIONS.find((o) => o.value === state.segment)?.tone ?? "coral";
    return (
      <div className={`soft-card ${tone === "coral" ? "tint-coral" : tone === "sky" ? "tint-sky" : "tint-violet"} text-center py-14`}>
        <div className="text-6xl mb-5">🎉</div>
        <h3 className="text-4xl md:text-5xl font-semibold tracking-tight text-ink">
          Vote recorded.
        </h3>
        <p className="mt-4 text-ink-soft text-lg max-w-md mx-auto">
          We'll send <span className="serif-italic">one</span> email when the winning fix ships. Nothing before.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-7">
      <input type="hidden" name="segment" value={segment} />

      {/* Step 1: emoji pickers */}
      <div>
        <div className="text-xs uppercase tracking-widest text-ink-soft mb-4 font-semibold">
          1 · Pick your problem
        </div>
        <div className="grid grid-cols-3 gap-3">
          {OPTIONS.map((opt) => {
            const active = segment === opt.value;
            const ring =
              opt.tone === "coral"
                ? "ring-coral"
                : opt.tone === "sky"
                  ? "ring-sky"
                  : "ring-violet";
            const tint =
              opt.tone === "coral"
                ? "tint-coral"
                : opt.tone === "sky"
                  ? "tint-sky"
                  : "tint-violet";
            return (
              <button
                type="button"
                key={opt.value}
                onClick={() => setSegment(opt.value)}
                className={[
                  "rounded-2xl p-5 text-left transition-all border-2",
                  active
                    ? `${tint} border-ink scale-[1.02]`
                    : "bg-white border-[#d8d0b8] hover:border-ink",
                ].join(" ")}
              >
                <div className="text-3xl mb-3">{opt.emoji}</div>
                <div className="text-sm font-semibold text-ink leading-tight">
                  {opt.label}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 2: email */}
      <div>
        <label htmlFor="email" className="text-xs uppercase tracking-widest text-ink-soft mb-3 block font-semibold">
          2 · Your email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          inputMode="email"
          autoComplete="email"
          placeholder="you@studio.com"
          className="field"
        />
      </div>

      {state?.ok === false && (
        <div className="bg-coral-soft text-coral rounded-xl px-4 py-3 text-sm">
          {state.error}
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
        <button type="submit" disabled={pending} className="btn btn-lime !text-base !py-4 !px-7 disabled:opacity-50">
          {pending ? "Sending…" : "Send my vote"}
          <span aria-hidden>→</span>
        </button>
        <p className="text-xs text-ink-soft font-medium">
          One email · ever · no spam
        </p>
      </div>
    </form>
  );
}
