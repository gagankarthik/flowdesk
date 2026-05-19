"use client";

import type { PainSegment } from "@/lib/supabase";

export function VoteButton({
  segment,
  tone = "dark",
}: {
  segment: PainSegment;
  tone?: "dark" | "coral" | "sky" | "violet";
}) {
  const toneClass =
    tone === "coral"
      ? "bg-coral text-white"
      : tone === "sky"
        ? "bg-sky text-white"
        : tone === "violet"
          ? "bg-violet text-white"
          : "bg-ink text-cream";

  return (
    <button
      type="button"
      onClick={() => {
        window.dispatchEvent(
          new CustomEvent("flowdesk:vote", { detail: { segment } }),
        );
        const el = document.getElementById("vote");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }}
      className={`btn ${toneClass} hover:opacity-90`}
    >
      Pick this
      <span aria-hidden>→</span>
    </button>
  );
}
