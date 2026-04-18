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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
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
                <div className="text-sm font-semibold text-gray-400 mb-2">
                  Test Mode: <span className="text-cyan-400 capitalize">{testMode}</span>
                </div>
                {testMode === 'timed' && (
                  <div className="text-xs text-gray-500">
                    {timerDuration} second test • Press ESC to restart
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
              <div className="text-xs text-gray-500 space-y-1">
                <p>Press ESC to restart • Click settings to customize</p>
                <p className="text-gray-600">
                  {testComplete ? 'Test complete!' : isActive ? 'Test in progress...' : 'Click above to start'}
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
