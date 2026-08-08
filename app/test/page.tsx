'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { TypingDisplay } from '@/components/TypingDisplay';
import { useTypingTest, TypingMetrics } from '@/hooks/useTypingTest';
import { useTestText } from '@/hooks/useTestText';
import { useTypingStore } from '@/lib/typing-store';
import { playSound } from '@/lib/sound';
import { createRateLimiter } from '@/lib/rate-limit';
import { ResultsFallback, ModalFallback } from '@/components/fallbacks';
import { v4 as uuidv4 } from 'uuid';

const ResultsScreen = dynamic(
  () => import('@/components/ResultsScreen').then((m) => m.ResultsScreen),
  { ssr: false, loading: () => <ResultsFallback /> }
);

const SettingsModal = dynamic(
  () => import('@/components/SettingsModal').then((m) => m.SettingsModal),
  { ssr: false, loading: () => <ModalFallback /> }
);

const StatsModal = dynamic(
  () => import('@/components/StatsModal').then((m) => m.StatsModal),
  { ssr: false, loading: () => <ModalFallback /> }
);

const soundLimiter = createRateLimiter(8, 1000);
const resultLimiter = createRateLimiter(1, 1000);

export default function TypingTest() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [testComplete, setTestComplete] = useState(false);
  const [lastInput, setLastInput] = useState('');

  const {
    testMode,
    timerDuration,
    wordCount,
    textSize,
    soundEnabled,
    addResult,
    results,
  } = useTypingStore();

  const { text, regenerate, codeLines } = useTestText(
    testMode as 'words' | 'quotes' | 'code',
    wordCount,
    textSize
  );

  const effectiveDuration = testMode === 'timed' ? timerDuration : 600;

  const handleComplete = useCallback(
    (finalMetrics: TypingMetrics, elapsedSeconds: number) => {
      setTestComplete(true);
      if (soundEnabled && soundLimiter.allow()) playSound('success');
      if (!resultLimiter.allow()) return;
      addResult({
        id: uuidv4(),
        mode: testMode,
        wpm: finalMetrics.wpm,
        accuracy: finalMetrics.accuracy,
        rawWpm: finalMetrics.rawWpm,
        duration: Math.round(elapsedSeconds),
        correctChars: finalMetrics.correctChars,
        incorrectChars: finalMetrics.incorrectChars,
        timestamp: Date.now(),
      });
    },
    [soundEnabled, addResult, testMode]
  );

  const {
    input,
    setInput,
    isActive,
    timeLeft,
    metrics,
    inputRef,
    reset,
  } = useTypingTest(text, effectiveDuration, handleComplete);

  const handleInput = (value: string) => {
    const prevInput = input;
    setInput(value);

    if (soundEnabled && value.length > prevInput.length && soundLimiter.allow()) {
      const lastChar = value[value.length - 1];
      const expectedChar = text[value.length - 1];
      playSound(lastChar === expectedChar ? 'correct' : 'incorrect');
    }
  };

  const handleRetry = useCallback(() => {
    setTestComplete(false);
    regenerate();
    reset();
    setLastInput(input);
  }, [regenerate, reset, input]);

  useEffect(() => {
    regenerate();
    reset();
  }, [testMode, textSize, effectiveDuration]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !showSettings && !showStats) {
        handleRetry();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleRetry, showSettings, showStats]);

  const goHome = useCallback(() => {
    router.push('/');
  }, [router]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-brutal-grid" />;
  }

  return (
    <div
      className="min-h-screen bg-brutal-grid"
      onClick={() => inputRef.current?.focus()}
    >
      <Header onSettingsClick={() => setShowSettings(true)} onStatsClick={() => setShowStats(true)} />

      <main className="max-w-7xl mx-auto">
        {testComplete ? (
          <Suspense fallback={<ResultsFallback />}>
            <ResultsScreen
              metrics={metrics}
              testMode={testMode}
              onRetry={handleRetry}
              onHome={goHome}
              previousResults={results}
            />
          </Suspense>
        ) : (
          <>

            <div className="flex items-center justify-center gap-4 mt-8 px-4">
              <div className="text-center">
                <div className="inline-block font-mono text-xs uppercase tracking-widest bg-white border-2 border-black brutal-shadow px-4 py-1 mb-2">
                  <span className="text-black/60">TEST MODE:</span>{' '}
                  <span className="font-bold capitalize text-black">{testMode}</span>
                </div>
                {testMode === 'timed' && (
                  <div className="font-mono text-xs uppercase tracking-widest text-black/70">
                    ⏱ {timerDuration} second test • press esc to restart
                  </div>
                )}
              </div>
            </div>

            {text && (
              <>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => handleInput(e.target.value)}
                  className="absolute opacity-0 w-0 h-0"
                  autoFocus
                  spellCheck="false"
                />
                <TypingDisplay
                  text={text}
                  input={input}
                  isActive={isActive}
                  timeLeft={timeLeft}
                  metrics={metrics}
                  codeLines={codeLines}
                  mode={testMode}
                  duration={effectiveDuration}
                />
              </>
            )}

            <div className="text-center mt-12 px-4 pb-8">
              <div className="font-mono text-xs uppercase tracking-widest space-y-1">
                <p className="bg-white border-2 border-black brutal-shadow inline-block px-3 py-1">
                  [ESC] restart • [⚙] customize
                </p>
                <p className="mt-2 text-black/70">
                  {testComplete ? 'TEST COMPLETE' : isActive ? 'TEST IN PROGRESS...' : 'CLICK ABOVE TO START'}
                </p>
              </div>
            </div>
          </>
        )}
      </main>

      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
      {showStats && <StatsModal onClose={() => setShowStats(false)} />}
    </div>
  );
}