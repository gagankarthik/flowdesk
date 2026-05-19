# FlowDesk — Validation Landing

> *The FlowDesk Gazette · Vol. 01 · Issue №001*

A single-page Next.js site that asks 1,000 freelancers which problem to fix first. Three "receipts" (late payments, tool sprawl, mental load), one waitlist form, signal stored in Supabase. Deploys to Vercel.

This is **a validation site, not a product.** If one segment wins decisively, build that. If none do, you saved months.

---

## Stack

- **Next.js 15** (App Router, React 19, Server Actions)
- **TypeScript**
- **Tailwind CSS v4** (CSS-first config in `app/globals.css`)
- **Supabase** (Postgres + RLS for waitlist storage)
- **Vercel** (deploy)
- Fonts via `next/font/google`: Instrument Serif (display), Newsreader (body), JetBrains Mono (UI labels)

---

## Local setup

### 1. Install

```bash
npm install
```

### 2. Set up Supabase

Create a project at [supabase.com](https://supabase.com), then open **SQL Editor** and run:

```sql
-- Table
create table public.waitlist (
  id           uuid primary key default gen_random_uuid(),
  email        text not null,
  pain_segment text not null check (pain_segment in ('payments','fragmentation','mental_load')),
  cost_note    text,
  created_at   timestamptz not null default now(),
  unique (email, pain_segment)
);

-- Lock the table down, then open ONLY anonymous inserts
alter table public.waitlist enable row level security;

create policy "anon can insert votes"
  on public.waitlist
  for insert
  to anon
  with check (true);

-- (Optional) index for the dashboard query you'll write later
create index waitlist_segment_created_idx
  on public.waitlist (pain_segment, created_at desc);
```

> **Why this RLS shape:** we want the public site to write votes with the anon key, but nobody (not even logged-in users) should be able to read the list back through the API. You read it yourself via the Supabase dashboard / SQL editor.

### 3. Env vars

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Fill in from **Supabase → Settings → API**:

```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT-REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
```

### 4. Run

```bash
npm run dev
```

Open <http://localhost:3000>.

---

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. On [vercel.com](https://vercel.com/new), import the repo.
3. In **Environment Variables**, add the same two vars:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy. Vercel auto-detects Next.js — no further config.

That's it. Your validation site is live.

---

## Reading the results

Open Supabase → **SQL Editor** and run:

```sql
select pain_segment, count(*) as votes
from public.waitlist
group by pain_segment
order by votes desc;
```

The pain_segment with the most votes is your wedge.

Want the qualitative side (what it cost them)?

```sql
select pain_segment, cost_note, created_at
from public.waitlist
where cost_note is not null
order by created_at desc
limit 100;
```

---

## Decision criteria

Before launching, decide:

- **Kill threshold:** if you don't hit 100 signups in 30 days across all promotion channels, the positioning is wrong (or the channels are).
- **Build threshold:** if one segment gets 500+ votes AND ≥40% share of total, build that one.
- **No-decision:** if votes are evenly split (each segment <40%), the all-in-one positioning is fighting you. Pick the segment with the strongest **qualitative** cost notes — that's the buyer who'll actually pay.

---

## File map

```
flowdesk/
├── app/
│   ├── actions.ts              # Server Action: writes waitlist row
│   ├── components/
│   │   ├── JoinForm.tsx        # Client form with useActionState
│   │   ├── Receipt.tsx         # The three pain cards
│   │   ├── Ticker.tsx          # Newspaper marquee
│   │   └── VoteButton.tsx      # Per-receipt "vote this is mine"
│   ├── globals.css             # Tailwind v4 theme + paper texture + receipt mask
│   ├── layout.tsx              # Fonts (Instrument Serif, Newsreader, JetBrains Mono)
│   └── page.tsx                # The Gazette
├── lib/supabase.ts             # Single Supabase client factory
├── .env.example
├── next.config.ts
├── package.json
├── postcss.config.mjs
└── tsconfig.json
```

---

## Promotion channels (suggested first 30 days)

- **r/freelance**, **r/freelancing**, **r/digitalnomad**, **r/forhire** — post the page as "I'm validating which freelancer pain to build for; pick one."
- **Indie Hackers** milestone post
- **Twitter/X** thread: each tweet = one receipt
- **LinkedIn** post targeting solo consultants
- **Hacker News** "Show HN" — only if you have a strong angle on the editorial design itself

Track UTMs per channel in Vercel Analytics to see which audience actually segments how.
