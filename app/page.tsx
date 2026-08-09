import { Suspense } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import DailySamples from '@/components/DailySamples';
import { SamplesFallback } from '@/components/fallbacks';

export const revalidate = 3600;

const FEATURES = [
  {
    title: 'Timed',
    desc: 'Race the clock. 15, 30, 60 or 120 second sprints with live WPM.',
    tag: '00:60',
  },
  {
    title: 'Words',
    desc: 'Chained word lists from 25 to 100 words. Pure flow practice.',
    tag: '500 WPM?',
  },
  {
    title: 'Code',
    desc: 'Real code snippets with indentation across languages.',
    tag: '</>',
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-brutal-grid flex flex-col">
      <header className="border-b-[3px] border-black bg-[#c8ff00] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-black flex items-center justify-center shadow-[3px_3px_0_0_#fff]">
              <span className="text-yellow-300 font-bold text-xl leading-none">T</span>
            </div>
            <div className="leading-none">
              <h1 className="text-2xl font-bold text-black tracking-tight uppercase">
                TypeWithMe
              </h1>
              <p className="font-mono text-[10px] uppercase tracking-widest text-black/70">
                KEYBOARD ACCELERATOR
              </p>
            </div>
          </Link>
          <Button asChild variant="secondary" size="sm" className="bg-[#c8ff00]">
            <Link href="/test">Start Typing</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center px-4 py-16 gap-16">
        <section className="text-center w-full max-w-3xl mx-auto flex flex-col items-center animate-pop pt-4">
          <div className="inline-block bg-white border-2 border-black brutal-shadow px-4 py-1 font-mono text-xs uppercase tracking-widest mb-6 -rotate-1">
            <span className="text-black/60">// the internet&apos;s brutalist typing trainer</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tight leading-none">
            Type
            <span className="bg-yellow-300 border-2 border-black brutal-shadow px-3 mx-2 inline-block -rotate-2">
              Faster
            </span>
            <br />
            Beat the
            <span className="text-red-600"> Clock</span>
          </h2>
          <p className="mt-8 font-mono text-sm md:text-base uppercase tracking-widest text-black/70 max-w-xl mx-auto">
            No fluff. No ads. Just raw speed tests with hard-edged feedback.
            Hit the button and start hammering those keys.
          </p>
          <div className="mt-10">
            <Button
              asChild
              size="lg"
              className="px-10 py-5 text-lg bg-black text-white shadow-[6px_6px_0_0_#ffd400] hover:bg-black/80"
            >
              <Link href="/test">Start Typing →</Link>
            </Button>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-black/50">
              [no account needed] [free forever] [esc to restart]
            </p>
          </div>
        </section>

        <div className="border-y-[3px] border-black bg-[#c8ff00] w-full -rotate-1">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 text-center md:text-left">
            <span className="bg-black text-[#c8ff00] font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 shrink-0">
              Up Next
            </span>
            <p className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-black">
              Introducing Multiplayer mode — here, you can compete with your friends.
            </p>
            <span className="font-mono text-[10px] uppercase tracking-widest text-black/60 shrink-0">
              &mdash; me
            </span>
            <Button asChild size="sm" className="bg-black text-[#c8ff00] shadow-[3px_3px_0_0_#000] hover:bg-black/80">
              <Link href="/login">Compete &mdash; Now</Link>
            </Button>
          </div>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="bg-white border-2 border-black brutal-shadow p-6 hover:-translate-y-1 hover:translate-x-1 hover:shadow-[2px_2px_0_0_#000] transition-transform"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold uppercase tracking-tight">
                  {feature.title}
                </h3>
                <span className="font-mono text-xs bg-black text-yellow-300 border-2 border-black px-2 py-0.5">
                  {feature.tag}
                </span>
              </div>
              <p className="font-mono text-xs uppercase tracking-widest text-black/70 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </section>

        <Suspense fallback={<SamplesFallback />}>
          <DailySamples />
        </Suspense>
      </main>

      <footer className="border-t-[3px] border-black bg-white">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="font-mono text-[10px] uppercase tracking-widest text-black/60">
            TYPEWITHME © 2026 — BUILT WITH BLOOD, SWEAT &amp; BRUTALISM
          </p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-black/60">
            wpm &gt; life
          </p>
        </div>
      </footer>
    </div>
  );
}