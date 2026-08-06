'use client';

import { TypingMetrics } from '@/hooks/useTypingTest';

interface TypingDisplayProps {
  text: string;
  input: string;
  isActive: boolean;
  timeLeft: number;
  metrics: TypingMetrics;
}

const STAT_TILES = [
  { label: 'WPM', value: (m: TypingMetrics) => m.wpm.toFixed(2), color: 'text-black' },
  { label: 'ACC', value: (m: TypingMetrics) => `${m.accuracy.toFixed(1)}%`, color: 'text-black' },
  { label: 'TIME', value: (m: TypingMetrics, timeLeft: number) => `${timeLeft}s`, color: 'text-black' },
] as const;

export function TypingDisplay({
  text,
  input,
  isActive,
  timeLeft,
  metrics,
}: TypingDisplayProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-10 py-16 px-4">

      <div className="flex gap-6 text-center">
        {STAT_TILES.map((tile) => (
          <div
            key={tile.label}
            className={`bg-white px-6 py-3 border-2 border-black brutal-shadow ${tile.color}`}
          >
            <div className="font-mono text-3xl leading-none tracking-tight">
              {tile.value(metrics, timeLeft)}
            </div>
            <div className="mt-1.5 font-mono text-[10px] uppercase tracking-widest text-black/60">
              {tile.label}
            </div>
          </div>
        ))}
      </div>

      <div className="w-full max-w-3xl">
        <div className="border-2 border-black brutal-shadow bg-white">

          <div className="flex items-center justify-between border-b-2 border-black px-4 py-1.5 font-mono text-[10px] uppercase tracking-widest bg-yellow-300">
            <span>typing.exe</span>
            <span className="text-black/70">esc = restart</span>
          </div>

          <div className="px-6 py-8 min-h-32">

            <div className="flex flex-wrap gap-1 font-mono text-xl leading-relaxed">
              {text.split('').map((char, idx) => {
                const inputChar = input[idx];
                let charClass = 'text-black/35';

                if (inputChar !== undefined) {
                  charClass =
                    inputChar === char
                      ? 'text-black bg-green-100'
                      : 'text-white bg-red-600';
                } else if (idx === input.length && isActive) {
                  charClass = 'bg-yellow-300 text-black animate-blink';
                }

                return (
                  <span
                    key={idx}
                    className={`${charClass} transition-colors`}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        {!isActive && input.length === 0 && (
          <div className="text-center mt-6 font-mono text-sm uppercase tracking-widest text-black">
            <span className="inline-block bg-yellow-300 border-2 border-black px-3 py-1 brutal-shadow">
              Start typing to begin
            </span>
          </div>
        )}
      </div>
    </div>
  );
}