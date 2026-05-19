import type { PainSegment } from "./supabase";

export type JoinResult =
  | { ok: true; segment: PainSegment }
  | { ok: false; error: string };
