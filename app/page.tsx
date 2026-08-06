'use client';

import { useState, useEffect, useCallback } from 'react';
import { Header } from '@/components/Header';
import { TypingDisplay } from '@/components/TypingDisplay';
import { ResultsScreen } from '@/components/ResultsScreen';
import { SettingsModal } from '@/components/SettingsModal';
import { StatsModal } from '@/components/StatsModal';
import { useTypingTest, TypingMetrics } from '@/hooks/useTypingTest';
import { useTestText } from '@/hooks/useTestText';
import { useTypingStore } from '@/lib/typing-store';
import { playSound } from '@/lib/sound';
import { v4 as uuidv4 } from 'uuid';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [testComplete, setTestComplete] = useState(false);
  const [lastInput, setLastInput] = useState('');

  const {
    testMode,
    timerDuration,
    wordCount,
    soundEnabled,
    addResult,
    results,
  } = useTypingStore();

  const { text, regenerate } = useTestText(
    testMode as 'words' | 'quotes',
    wordCount
  );

  const effectiveDuration = testMode === 'timed' ? timerDuration : 600; // 10 minutes for non-timed modes

  const {
    input,
    setInput,
    isActive,
    timeLeft,
    metrics,
    inputRef,
    reset,
  } = useTypingTest(text, effectiveDuration, (finalMetrics) => {
    setTestComplete(true);
    if (soundEnabled) playSound('success');
    addResult({
      id: uuidv4(),
      mode: testMode as any,
      wpm: finalMetrics.wpm,
      accuracy: finalMetrics.accuracy,
      rawWpm: finalMetrics.rawWpm,
      duration: testMode === 'timed' ? timerDuration : effectiveDuration - timeLeft,
      correctChars: finalMetrics.correctChars,
      incorrectChars: finalMetrics.incorrectChars,
      timestamp: Date.now(),
    });
  });

  // Handle input changes with sound feedback
  const handleInput = (value: string) => {
    const prevInput = input;
    setInput(value);

    if (soundEnabled && value.length > prevInput.length) {
      const lastChar = value[value.length - 1];
      const expectedChar = text[value.length - 1];
      playSound(lastChar === expectedChar ? 'correct' : 'incorrect');
    }
  };

  const handleRetry = () => {
    setTestComplete(false);
    regenerate();
    reset();
    setLastInput(input);
  };

  // Regenerate text on mode change
  useEffect(() => {
    regenerate();
    reset();
  }, [testMode]);

  // Wait until hydration is done so that the persisted store values
  // and the random test text render identically on server and client.
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-brutal-grid" />;
  }

  return (
    <div className="min-h-screen bg-brutal-grid">
      <Header onSettingsClick={() => setShowSettings(true)} onStatsClick={() => setShowStats(true)} />

      <main className="max-w-7xl mx-auto">
        {testComplete ? (
          <ResultsScreen
            metrics={metrics}
            testMode={testMode}
            onRetry={handleRetry}
            previousResults={results}
          />
        ) : (
          <>
            {/* Instructions/Mode Info */}
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

            {/* Typing Area */}
            {text && (
              <>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => handleInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') {
                      handleRetry();
                    }
                  }}
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
                />
              </>
            )}

            {/* Footer Info */}
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

      {/* Modals */}
      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
      {showStats && <StatsModal onClose={() => setShowStats(false)} />}
    </div>
  );
}
