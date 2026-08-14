# ⌨️ TypeWithMe

**A brutalist typing trainer built for speed.** No fluff. No ads. No rounded corners. Just you, a keyboard, and a timer that does not care about your feelings.

TypeWithMe is a fully-featured typing speed test application — think monkeytype, but punk. It gives you instant, hard-edged feedback on your WPM, accuracy, and raw speed across four distinct test modes, tracks your history locally in your browser, and is already wired with an auth backend (PostgreSQL + JWT) as the foundation for a competitive multiplayer mode.

---

## ✨ What Makes This Project Interesting

- **Four test modes** — Timed sprints, word lists, famous quotes, and real code snippets (`</>` for the coders).
- **Live metrics while you type** — WPM, raw WPM, and accuracy update on every keystroke, in real time.
- **A brutalist design language** — thick black borders, hard offset shadows, monospace everywhere, zero border-radius, deliberate rotated/imperfect elements. The UI is a design statement, not an afterthought.
- **Synthesized sound feedback** — No audio files. Every keypress tone is generated on the fly with the Web Audio API (800Hz→1000Hz sweep for correct, 400Hz→200Hz drop for errors, arpeggio on completion).
- **Client-side state persistence** — Your settings and last 100 test results survive page reloads via Zustand's `persist` middleware (localStorage).
- **Auth backend ready out of the box** — Signup/login routes with bcrypt password hashing, JWT sessions in httpOnly cookies, and a Postgres database via Drizzle ORM — the seam for upcoming multiplayer races.
- **Keyboard-first** — The whole test runs without touching the mouse: click anywhere to focus, `Esc` to restart.

---

## 🧭 The Big Picture — How the App Flows

Here's the journey a user takes, and the code that powers each step:

```
                      ┌─────────────────────────────────────────┐
                      │   LANDING PAGE (app/page.tsx)          │
                      │   - Headline + feature cards           │
                      │   - "Up Next: Multiplayer" banner      │
                      │   - Daily quote + code sample (SSR)    │
                      └────────────────┬────────────────────────┘
                                       │  "Start Typing"
                                       ▼
┌──────────────────────────────────────────────────────────────────────┐
│  TYPING TEST PAGE (app/test/page.tsx) — the heart of the app         │
│                                                                      │
│  1. On load: useTestText generates a random text for the mode        │
│     (words ▸ random words from data/texts.json,                      │
│      quotes ▸ random quote,  code ▸ random snippet)                  │
│                                                                      │
│  2. You click / focus the hidden input. First keystroke starts       │
│     the countdown via useTypingTest (setInterval, 1s ticks).         │
│                                                                      │
│  3. Every keystroke:                                                 │
│     ├─ TypingDisplay re-renders — correct chars turn green,          │
│     │  mistakes turn red, and the cursor (yellow block) advances.    │
│     ├─ Metrics recompute instantly (wpm/raw/accuracy)                │
│     └─ Web Audio plays a correct / incorrect blip                    │
│                                                                      │
│  4. When the timer hits 0 (or the text is fully typed):              │
│     ├─ ResultsScreen takes over — grade, metrics, and a             │
│     │  bar chart of your last 5 tests (recharts)                     │
│     └─ The result is saved to the Zustand store (last 100)           │
└───────────────────────────┬──────────────────────────────────────────┘
                            │
                            ▼
        ┌────────────────────────────────┐
        │  AUTH / MULTIPLAYER (WIP)      │
        │  /login · /signup · /api/...   │
        │  Cookie session → future races │
        └────────────────────────────────┘
```

### Detailed walkthrough of a single test

1. **Setup** — The test page reads your preferences from `useTypingStore` (mode, duration, word count, text size, sound). These settings are persisted, so your last configuration is restored on every visit.
2. **Text generation** — `useTestText` (`hooks/useTestText.ts`) picks content from `data/texts.json`:
   - **Words mode**: `N` random words from a pool of 300 common + 900+ medium-difficulty words.
   - **Quotes mode**: a random quote from small/medium/large buckets.
   - **Code mode**: a random snippet (Python / JavaScript / TypeScript) split into indented lines so you also train your muscle memory for indentation.
3. **The race** — Typing begins on the first character. `useTypingTest` (`hooks/useTypingTest.ts`) flips `isActive`, starts a 1-second `setInterval` countdown, and computes metrics on every input change. Input is deliberately capped at the text length — you can't "skip ahead."
4. **Feedback** — `TypingDisplay` (`components/TypingDisplay.tsx`) maps every character against your input: green = correct, red = incorrect, yellow blinking block = cursor. If sound is on, each keystroke plays a synthesized tone (rate-limited to avoid audio spam).
5. **Completion** — Two ways to finish: the countdown reaches 0, or you type the entire text. Either way, `onComplete` fires → the result (mode, wpm, accuracy, raw wpm, duration, char counts, timestamp) is prepended to the results history and `ResultsScreen` appears.
6. **Results & growth** — `ResultsScreen` grades your WPM (S+ → F), shows the full stat breakdown, and plots your recent performance. The `⚙ Stats` modal in the header shows lifetime aggregates: total tests, average WPM, best WPM, average accuracy, and a per-mode breakdown.

---

## 🎮 Test Modes

| Mode | What it is | Why you'd use it | Config options |
|------|-----------|------------------|----------------|
| **⏱ Timed** | Race the clock | The classic benchmark. Push your speed in fixed sprints. | 15s · 30s · 60s · 120s |
| **📝 Words** | Chained random words | Pure flow practice — no punctuation, no capitals, just momentum. | 25 · 50 · 75 · 100 words |
| **💬 Quotes** | Famous quotations | Real-world text with punctuation and capitals. Tests rhythm, not just speed. | Small · Medium · Large |
| **💻 Code** | Real code snippets | Type Go/Python/JS-style code with indentation. Unique to this trainer — great for developers. | Small · Medium · Large |

> **Note on timed mode:** non-timed modes give you an effective 600s budget, so the timer never cuts you off mid-flow.

---

## 📐 How Metrics Are Computed

All scoring lives in `hooks/useTypingTest.ts` and is recomputed on every keystroke:

```
WPM      = (correct characters ÷ 5) ÷ minutes          // the "straight" speed
Raw WPM  = (total characters   ÷ 5) ÷ minutes          // speed ignoring mistakes
Accuracy = (correct ÷ total) × 100
```

- The `÷ 5` is the standard "one word = 5 characters" convention.
- Elapsed time is derived from the mode duration minus the countdown remaining.

### Grade scale

| WPM   | Grade |
|-------|-------|
| ≥ 100 | **S+** |
| ≥ 90  | **S** |
| ≥ 80  | **A+** |
| ≥ 70  | **A** |
| ≥ 60  | **B** |
| ≥ 50  | **C** |
| ≥ 40  | **D** |
| < 40  | **F** |

---

## 🏗️ Architecture & Tech Stack

### Stack overview

| Layer | Technology | Why |
|-------|-----------|-----|
| **Framework** | Next.js 16 (App Router) | Server components for the landing page, route handlers for auth, and a fully client-side test experience (no server latency on keystrokes). |
| **Language** | TypeScript · React 19 | End-to-end types — `TypingMetrics`, `CodeLine`, `TestResult` are shared across hooks, components, and store. |
| **Styling** | Tailwind CSS v4 · tw-animate-css | The brutalist look is 100% utility classes (hard shadows, 3px borders, oklch palette). |
| **UI primitives** | Radix UI (40+ components) | Accessible, headless building blocks for the modals, toggles, and buttons. |
| **State** | Zustand (+ `persist`) | Lightweight global store for settings and results history — survives reloads via localStorage. |
| **Database** | PostgreSQL · Drizzle ORM | `users` and `typing_tests` tables; migrations in `drizzle/`. |
| **Auth** | JWT (`jsonwebtoken`) · bcrypt | Session token stored in an httpOnly cookie; passwords hashed with 10 salt rounds. |
| **Charts** | Recharts | Results screen bar chart (WPM + accuracy per test). |
| **Audio** | Web Audio API | Zero-bundle synthesized keystroke sounds. |
| **Package manager** | pnpm | Fast, disk-efficient installs (the repo also has a `pnpm-workspace.yaml`). |
| **Deployment** | Docker / Vercel-ready | `Dockerfile` + `docker-compose.yml` (app + Postgres) ship in the repo. |

### How auth currently works (the multiplayer foundation)

```
/signup POST
  1. Request body validated with Zod (lib/validators.ts)
  2. Password hashed with bcrypt (10 rounds)
  3. User row inserted into Postgres (lib/db/schema.ts → users table)
  4. JWT signed ({ userId }, 1-day expiry) → set as httpOnly "token" cookie

/login POST
  1. Zod validation → 2. look up user by email → 3. bcrypt.compare
  4. On success: JWT set as httpOnly cookie → client redirects to /test
```

The `users` table also maps to a `typing_tests` table (`wpm`, `accuracy`, `mode`, `time_taken`) — the schema for persisting race results once multiplayer lands.

### Why it's fast

- The typing test page is a **client component** — every keystroke is handled locally; no network round-trips on the critical path.
- The landing page is **server-rendered** with a `revalidate = 3600` cache and `Suspense` fallbacks for the daily samples.
- Heavy UI (results, modals) is **dynamically imported with `ssr: false`** so it never blocks initial paint.
- Every `playSound` call is **rate-limited** (8 per second max) so fast typists don't explode the audio stack.

---

## 📁 Project Structure

```
TypeWithMe/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (fonts, theme provider)
│   ├── page.tsx                  # Landing: hero, features, daily samples (SSR)
│   ├── loading.tsx               # Route loading state
│   ├── test/
│   │   ├── page.tsx              # ⭐ THE typing test (client component)
│   │   └── loading.tsx
│   ├── login/page.tsx            # Auth portal (client form)
│   ├── signup/page.tsx
│   ├── multiplayer/page.tsx      # Multiplayer header stub (WIP)
│   └── api/
│       ├── login/route.ts        # POST login → JWT cookie
│       └── signup/route.ts       # POST signup → hashed user + JWT cookie
│
├── components/                   # React components (features + UI kit)
│   ├── TypingDisplay.tsx         # Renders text, per-char colors, cursor
│   ├── ResultsScreen.tsx         # Post-test screen: grade, stats, chart
│   ├── SettingsModal.tsx         # Mode / duration / word count / size / sound
│   ├── StatsModal.tsx            # Lifetime aggregates + per-mode breakdown
│   ├── DailySamples.tsx          # SSR daily quote + code snippet (reads data/ at build)
│   ├── Header.tsx                # Brand + Stats / Settings / Multiplayer nav
│   ├── fallbacks.tsx             # Loading skeletons for dynamic imports
│   ├── theme-provider.tsx        # next-themes wrapper
│   └── ui/                       # 40+ Radix-based primitives (button, dialog, ...)
│
├── hooks/
│   ├── useTypingTest.ts          # ⭐ Timer, metrics engine, completion logic
│   ├── useTestText.ts            # ⭐ Text generation per mode (words/quotes/code)
│   ├── use-toast.ts / use-mobile.ts
│
├── lib/                          # Framework-agnostic logic
│   ├── typing-store.ts           # ⭐ Zustand persisted store (settings + results)
│   ├── auth.ts                   # JWT sign / verify
│   ├── validators.ts             # Zod schemas (login, signup)
│   ├── sound.ts                  # Web Audio synthesized tones
│   ├── rate-limit.ts             # Client-side call throttling
│   ├── utils.ts                  # cn() helper
│   └── db/
│       ├── index.ts              # Drizzle + pg Pool
│       └── schema.ts             # users, typing_tests tables
│
├── data/
│   └── texts.json                # 300+ common words, 900+ medium words,
│                                 # quotes (S/M/L), code snippets (S/M/L)
│
├── drizzle/                      # Generated SQL migrations + snapshots
├── styles/globals.css            # Tailwind v4 theme, oklch tokens
├── docker-compose.yml            # Postgres 18 + web (port 3001)
├── Dockerfile
└── drizzle.config.ts             # Drizzle CLI config (reads .env.local)
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js 20+**
- **pnpm 9+** (`npm i -g pnpm`)
- **PostgreSQL 15+** — only needed for auth/signup. The typing test itself runs 100% client-side.

### 1. Install

```bash
git clone <your-repo-url> TypeWithMe
cd TypeWithMe
pnpm install
```

### 2. Environment variables

Create `.env.local` in the project root:

```bash
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/typewithme
JWT_SECRET=replace-with-a-long-random-string-32-chars-min
```

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes (auth only) | PostgreSQL connection string |
| `JWT_SECRET` | Yes (auth only) | 32+ char secret used to sign/verify session tokens |

### 3. Prepare the database

```bash
pnpm drizzle-kit push    # create the users / typing_tests tables
pnpm drizzle-kit studio  # (optional) browse the DB in a GUI
```

### 4. Run it

```bash
pnpm dev        # → http://localhost:3000
```

### Docker alternative (one command)

```bash
docker-compose up -d   # Postgres 18 + app, app on http://localhost:3001
```

The compose file runs a health-checked Postgres and waits for it before starting the web container, so DB credentials are ready on first boot.

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Esc` | Restart the current test (new text, fresh timer) |
| Any key | Focus/start the test (input is auto-focused) |
| Header buttons | Open ⚙ Settings and 📊 Stats modals |

---

## 🧰 Scripts

| Command | What it does |
|---------|--------------|
| `pnpm dev` | Start the Next.js dev server (HMR) |
| `pnpm build` | Production build |
| `pnpm start` | Serve the production build |
| `pnpm lint` | ESLint over the whole repo |
| `pnpm drizzle-kit push` | Apply schema changes to the DB |
| `pnpm drizzle-kit studio` | Open Drizzle Studio (DB GUI) |

---

## 🗺️ Roadmap

- [x] Four test modes + live WPM/accuracy metrics
- [x] Brutalist UI + sound feedback + persisted stats
- [x] Auth backend (signup/login, JWT sessions)
- [ ] **Multiplayer races** — real-time head-to-head typing against friends (auth + `typing_tests` table are already in place)
- [ ] Leaderboards & global WPM rankings
- [ ] Account-linked history sync (move results from localStorage → Postgres)
- [ ] More quote/code content + user-submitted snippets

---

## 🎨 Design Philosophy

TypeWithMe wears its brutality on its sleeve. The design rules that make it feel like a punk zine rather than another SaaS dashboard:

- **Zero rounded corners.** Verdict: sharp. Every card, button, and modal is a hard rectangle.
- **Hard offset shadows** (`shadow-[4px_4px_0_0_#000]`) — elements look physically printed on the page, with no blur.
- **Monospace everywhere.** Geist Mono for numbers and labels — speed is a serious business.
- **A tight, loud palette:** black, white, acid green (`#c8ff00`), safety yellow (`#ffd400`), and alert red.
- **Deliberate imperfection:** rotated badges (`-rotate-1`, `-rotate-2`), asymmetric layouts, and "window title bar" chrome (`typing.exe`, `code.exe`).
- **No bullshit copy:** the UI talks to you — `wpm > life`, `[no account needed] [free forever]`.

---

## 📄 License

MIT — free forever. Type fast, stay legend.
