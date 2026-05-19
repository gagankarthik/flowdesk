"use server";

import { getSupabase, PAIN_SEGMENTS, type PainSegment } from "@/lib/supabase";

export type JoinResult =
  | { ok: true; segment: PainSegment }
  | { ok: false; error: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function joinWaitlist(
  _prev: JoinResult | null,
  formData: FormData,
): Promise<JoinResult> {
  try {
    const email = String(formData.get("email") ?? "").trim().toLowerCase();
    const segment = String(formData.get("segment") ?? "").trim();
    const costNote = String(formData.get("cost_note") ?? "").trim();

    if (!EMAIL_RE.test(email)) {
      return { ok: false, error: "That email looks off. Try again." };
    }
    if (!PAIN_SEGMENTS.includes(segment as PainSegment)) {
      return { ok: false, error: "Pick the pain that hits hardest." };
    }

    // Env-var check, surfaced as a friendly error rather than a throw.
    if (
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ) {
      console.error(
        "[waitlist] Missing Supabase env vars. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local, then restart the dev server.",
      );
      return {
        ok: false,
        error: "Supabase isn't connected. Check your .env.local and restart.",
      };
    }

    const supabase = getSupabase();
    const { error } = await supabase.from("waitlist").insert({
      email,
      pain_segment: segment,
      cost_note: costNote ? costNote.slice(0, 500) : null,
    });

    if (error) {
      // Duplicate (email + segment already voted) — treat as success.
      if (error.code === "23505") {
        return { ok: true, segment: segment as PainSegment };
      }
      console.error("[waitlist insert]", error);

      // Translate common Supabase errors into actionable messages.
      const code = error.code ?? "";
      const msg = error.message ?? "";

      if (code === "42P01" || msg.includes("does not exist")) {
        return {
          ok: false,
          error:
            "Table missing. Run the SQL in README.md (Supabase → SQL Editor).",
        };
      }
      if (code === "42501" || msg.toLowerCase().includes("row-level")) {
        return {
          ok: false,
          error:
            "RLS is blocking the insert. Add the policy from README.md step 2.",
        };
      }
      if (msg.toLowerCase().includes("invalid api key")) {
        return {
          ok: false,
          error: "Supabase rejected the API key. Recheck .env.local.",
        };
      }
      return {
        ok: false,
        error: "Couldn't save — try again in a moment.",
      };
    }

    return { ok: true, segment: segment as PainSegment };
  } catch (err) {
    console.error("[waitlist exception]", err);
    return { ok: false, error: "Server hiccup. Try again." };
  }
}
