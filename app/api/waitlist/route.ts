import { NextRequest, NextResponse } from "next/server";
import { getSupabase, PAIN_SEGMENTS, type PainSegment } from "@/lib/supabase";
import type { JoinResult } from "@/lib/types";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest): Promise<NextResponse<JoinResult>> {
  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ ok: false, error: "Bad request." }, { status: 400 });
    }

    const email = String(body.email ?? "").trim().toLowerCase();
    const segment = String(body.segment ?? "").trim();
    const costNote = String(body.cost_note ?? "").trim();

    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ ok: false, error: "That email looks off. Try again." });
    }
    if (!PAIN_SEGMENTS.includes(segment as PainSegment)) {
      return NextResponse.json({ ok: false, error: "Pick the pain that hits hardest." });
    }

    if (
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ) {
      console.error("[waitlist] Missing Supabase env vars in .env.local");
      return NextResponse.json({
        ok: false,
        error: "Supabase isn't connected. Check your .env.local and restart.",
      });
    }

    const supabase = getSupabase();
    const { error } = await supabase.from("waitlist").insert({
      email,
      pain_segment: segment,
      cost_note: costNote ? costNote.slice(0, 500) : null,
    });

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json({ ok: true, segment: segment as PainSegment });
      }
      console.error("[waitlist insert]", error);

      const code = error.code ?? "";
      const msg = error.message ?? "";

      if (code === "42P01" || msg.includes("does not exist")) {
        return NextResponse.json({
          ok: false,
          error: "Table missing. Run the SQL in README.md (Supabase → SQL Editor).",
        });
      }
      if (code === "42501" || msg.toLowerCase().includes("row-level")) {
        return NextResponse.json({
          ok: false,
          error: "RLS is blocking the insert. Add the policy from README.md.",
        });
      }
      if (msg.toLowerCase().includes("invalid api key")) {
        return NextResponse.json({
          ok: false,
          error: "Supabase rejected the API key. Recheck .env.local.",
        });
      }
      return NextResponse.json({
        ok: false,
        error: "Couldn't save — try again in a moment.",
      });
    }

    return NextResponse.json({ ok: true, segment: segment as PainSegment });
  } catch (err) {
    console.error("[waitlist exception]", err);
    return NextResponse.json(
      { ok: false, error: "Server hiccup. Try again." },
      { status: 500 },
    );
  }
}
