# TypeWithMe

A brutalist typing trainer built for speed. No fluff, no ads — just raw typing tests with hard-edged feedback.

## Features

- **Multiple Test Modes**: Timed (15/30/60/120s), Words (25-100), Quotes, and Code snippets
- **Real-time Metrics**: Live WPM, raw WPM, accuracy, correct/incorrect character counts
- **Brutalist UI**: High-contrast, monospace-driven design with sharp shadows and zero rounded corners
- **Sound Feedback**: Web Audio API-powered tones for correct/incorrect keystrokes and test completion
- **Persistent Stats**: Local storage tracks your last 100 tests with charts (recharts)
- **Multiplayer Ready**: Auth system with JWT + PostgreSQL (Drizzle ORM) for future competitive play
- **Keyboard-First**: `Esc` to restart, auto-focus input, no mouse required

## Tech Stack

| Layer           | Technology                             |
| --------------- | -------------------------------------- |
| Framework       | Next.js 16 (App Router)                |
| Language        | TypeScript, React 19                   |
| Styling         | Tailwind CSS v4 + tw-animate-css       |
| UI Components   | Radix UI primitives                    |
| State           | Zustand (persisted)                    |
| Database        | PostgreSQL + Drizzle ORM               |
| Auth            | JWT (jsonwebtoken) + bcrypt            |
| Charts          | Recharts                               |
| Audio           | Web Audio API (synthesized, no assets) |
| Package Manager | pnpm                                   |

## Project Structure

```
app/
├── page.tsx              # Landing page with features & daily samples
├── test/page.tsx         # Main typing test (client)
├── multiplayer/page.tsx  # Multiplayer lobby (WIP)
├── login/page.tsx        # Auth pages
├── signup/page.tsx
components/
├── TypingDisplay.tsx     # Core rendering: chars, cursor, code/word views
├── ResultsScreen.tsx     # Post-test stats + grade + chart
├── SettingsModal.tsx     # Mode, duration, word count, text size, sound
├── StatsModal.tsx        # Lifetime stats, mode breakdown, history
├── DailySamples.tsx      # SSR-rendered quote + code snippet
├── Header.tsx            # Navigation + branding
├── ui/                   # 40+ Radix-based primitive components
hooks/
├── useTypingTest.ts      # Timer, metrics computation, completion logic
├── useTestText.ts        # Text generation (words/quotes/code)
├── use-toast.ts
├── use-mobile.ts
lib/
├── typing-store.ts       # Zustand store (settings + results)
├── auth.ts               # JWT sign/verify
├── db/schema.ts          # Drizzle tables: users, typing_tests
├── sound.ts              # Synthesized audio feedback
├── rate-limit.ts         # Client-side rate limiters
├── validators.ts         # Zod schemas
data/
��── texts.json            # 1400+ words, 300+ code snippets, quotes
```

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm 9+
- PostgreSQL (for auth/multiplayer)

### Installation

```bash
# Clone and install
git clone https://github.com/yourusername/TypeWithMe.git
cd TypeWithMe
pnpm install

# Configure environment
cp .env.example .env.local  # Add DATABASE_URL, JWT_SECRET

# Setup database
pnpm drizzle-kit push

# Run dev server
pnpm dev
```

### Environment Variables

| Variable         | Required | Description                       |
| ---------------- | -------- | --------------------------------- |
| `DATABASE_URL` | Yes      | PostgreSQL connection string      |
| `JWT_SECRET`   | Yes      | 32+ char secret for token signing |

## Test Modes

| Mode             | Description                       | Config                 |
| ---------------- | --------------------------------- | ---------------------- |
| **Timed**  | Race the clock                    | 15s, 30s, 60s, 120s    |
| **Words**  | Chained common words              | 25, 50, 75, 100 words  |
| **Quotes** | Famous quotations                 | Small / Medium / Large |
| **Code**   | Real code snippets (TS/JS/Python) | Small / Medium / Large |

## Scoring

- **WPM** = `(correct chars / 5) / minutes` — standard adjusted speed
- **Raw WPM** = `(total chars / 5) / minutes` — unadjusted speed
- **Accuracy** = `correct / total * 100`
- **Grades**: S+ (≥100), S (≥90), A+ (≥80), A (≥70), B (≥60), C (≥50), D (≥40), F (<40)

## Keyboard Shortcuts

| Key          | Action                |
| ------------ | --------------------- |
| `Esc`      | Restart current test  |
| Settings btn | Open settings modal   |
| Stats btn    | Open statistics modal |

## Deployment

```bash
# Build for production
pnpm build

# Start production server
pnpm start

# Or deploy to Vercel (recommended)
# - Connect repo
# - Add DATABASE_URL, JWT_SECRET to env
# - Deploy
```

## Docker

```bash
docker-compose up -d  # Runs app + Postgres
```

## Scripts

```bash
pnpm dev        # Development server
pnpm build      # Production build
pnpm start      # Production server
pnpm lint       # ESLint
pnpm drizzle-kit push  # Push schema changes
pnpm drizzle-kit studio  # Drizzle Studio UI
```

## Design Philosophy

TypeWithMe embraces **brutalist web design**:

- System fonts (Geist Mono / Geist)
- Hard shadows (`shadow-[4px_4px_0_0_#000]`)
- Zero border-radius
- High contrast: black, white, yellow (#c8ff00), red (#ff0000)
- Monospace everywhere
- Visible borders (2-3px)
- Deliberate "imperfections" (rotated elements, asymmetric layouts)

## License

MIT — free forever.
