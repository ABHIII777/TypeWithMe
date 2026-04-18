'use client';

import { TypingMetrics } from '@/hooks/useTypingTest';

interface TypingDisplayProps {
  text: string;
  input: string;
  isActive: boolean;
  timeLeft: number;
  metrics: TypingMetrics;
}

export function TypingDisplay({
  text,
  input,
  isActive,
  timeLeft,
  metrics,
}: TypingDisplayProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-8 py-16 px-4">
      {/* Metrics Bar */}
      <div className="flex gap-8 text-center">
        <div className="flex flex-col items-center">
          <div className="text-3xl font-bold text-cyan-400">{metrics.wpm.toFixed(2)}</div>
          <div className="text-sm text-gray-400">WPM</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-3xl font-bold text-cyan-400">{metrics.accuracy.toFixed(1)}%</div>
          <div className="text-sm text-gray-400">Accuracy</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-3xl font-bold text-cyan-400">{timeLeft}s</div>
          <div className="text-sm text-gray-400">Time</div>
        </div>
      </div>

      {/* Typing Area */}
      <div className="w-full max-w-3xl">
        <div className="relative rounded-lg bg-gray-900/50 border border-gray-700 p-8 min-h-32 focus-within:border-cyan-400/50 transition-colors">
          {/* Text Display with Character Highlighting */}
          <div className="flex flex-wrap gap-1 text-xl font-mono leading-relaxed">
            {text.split('').map((char, idx) => {
              const inputChar = input[idx];
              let charClass = 'text-gray-400';

              if (inputChar !== undefined) {
                charClass = inputChar === char ? 'text-green-400' : 'text-red-500';
              } else if (idx === input.length && isActive) {
                charClass = 'text-cyan-400 animate-blink';
              }

              return (
                <span key={idx} className={`${charClass} transition-colors`}>
                  {char === ' ' ? '·' : char}
                </span>
              );
            })}
          </div>
        </div>

        {/* Instructions */}
        {!isActive && input.length === 0 && (
          <div className="text-center mt-8 text-gray-500 text-sm">
            <p>Click above or start typing to begin</p>
          </div>
        )}
      </div>
    </div>
  );
}
