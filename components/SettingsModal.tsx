'use client';

import { Button } from '@/components/ui/button';
import { X, Volume2, VolumeX } from 'lucide-react';
import { useTypingStore, TestMode } from '@/lib/typing-store';

interface SettingsModalProps {
  onClose: () => void;
}

export function SettingsModal({ onClose }: SettingsModalProps) {
  const {
    soundEnabled,
    setSoundEnabled,
    testMode,
    setTestMode,
    timerDuration,
    setTimerDuration,
    wordCount,
    setWordCount,
  } = useTypingStore();

  const modes: TestMode[] = ['timed', 'words', 'quotes', 'survival'];
  const durations = [15, 30, 60, 120];
  const wordCounts = [25, 50, 75, 100];

  const toggleClass = (active: boolean) =>
    `px-4 py-2 font-mono text-sm font-bold uppercase tracking-wide border-2 border-black transition-colors btn-press ${
      active
        ? 'bg-black text-white brutal-shadow'
        : 'bg-white text-black hover:bg-yellow-200'
    }`;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white border-[3px] border-black shadow-[8px_8px_0_0_#000] max-w-md w-full max-h-[90vh] overflow-y-auto animate-pop">

        <div className="flex items-center justify-between px-6 py-4 border-b-[3px] border-black bg-yellow-300 sticky top-0 z-10">
          <h2 className="text-xl font-bold uppercase tracking-tight">⚙ Settings</h2>
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon-sm"
            className="border-2 border-black bg-white text-black hover:bg-red-500 hover:text-white brutal-shadow"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="p-6 space-y-8">

          <div>
            <label className="block font-mono text-xs uppercase tracking-widest text-black mb-3">
              Test Mode
            </label>
            <div className="grid grid-cols-2 gap-3">
              {modes.map((mode) => (
                <button
                  key={mode}
                  onClick={() => setTestMode(mode)}
                  className={toggleClass(testMode === mode)}
                >
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {testMode === 'timed' && (
            <div>
              <label className="block font-mono text-xs uppercase tracking-widest text-black mb-3">
                Duration (seconds)
              </label>
              <div className="grid grid-cols-4 gap-2">
                {durations.map((duration) => (
                  <button
                    key={duration}
                    onClick={() => setTimerDuration(duration)}
                    className={toggleClass(timerDuration === duration)}
                  >
                    {duration}s
                  </button>
                ))}
              </div>
            </div>
          )}

          {testMode === 'words' && (
            <div>
              <label className="block font-mono text-xs uppercase tracking-widest text-black mb-3">
                Word Count
              </label>
              <div className="grid grid-cols-4 gap-2">
                {wordCounts.map((count) => (
                  <button
                    key={count}
                    onClick={() => setWordCount(count)}
                    className={toggleClass(wordCount === count)}
                  >
                    {count}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between py-4 border-y-[3px] border-black">
            <label className="font-mono text-xs uppercase tracking-widest text-black">
              Sound Effects
            </label>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`relative inline-flex items-center h-9 w-20 border-2 border-black brutal-shadow transition-colors ${
                soundEnabled ? 'bg-yellow-300' : 'bg-white'
              }`}
              aria-pressed={soundEnabled}
            >
              <span
                className={`absolute inset-y-0 w-8 border-r-2 border-black transition-all ${
                  soundEnabled
                    ? 'left-12 bg-black text-yellow-300'
                    : 'left-0 bg-gray-300 text-black'
                } flex items-center justify-center`}
              >
                {soundEnabled ? (
                  <Volume2 className="w-4 h-4" />
                ) : (
                  <VolumeX className="w-4 h-4" />
                )}
              </span>
              <span className={`w-full text-center font-mono text-[10px] uppercase font-bold ${soundEnabled ? 'text-black/70' : 'text-black/40'}`}>
                {soundEnabled ? 'on' : 'off'}
              </span>
            </button>
          </div>
        </div>

        <div className="border-t-[3px] border-black p-6">
          <Button
            onClick={onClose}
            className="w-full bg-black text-white hover:bg-black/80 shadow-[4px_4px_0_0_#ffd400]"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}