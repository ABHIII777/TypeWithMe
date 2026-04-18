'use client';

import { Button } from '@/components/ui/button';
import { X, Volume2, VolumeX } from 'lucide-react';
import { useTypingStore, TestMode } from '@/lib/typing-store';

interface SettingsModalProps {
  onClose: () => void;
}

export function SettingsModal({ onClose }: SettingsModalProps) {
  const {
    theme,
    setTheme,
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
  const themes = ['dark', 'light', 'neon', 'terminal'] as const;
  const durations = [15, 30, 60, 120];
  const wordCounts = [25, 50, 75, 100];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-lg max-w-md w-full max-h-96 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-gray-100">Settings</h2>
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-gray-100"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Test Mode */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-3">
              Test Mode
            </label>
            <div className="grid grid-cols-2 gap-2">
              {modes.map((mode) => (
                <button
                  key={mode}
                  onClick={() => setTestMode(mode)}
                  className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                    testMode === mode
                      ? 'bg-cyan-500 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Duration */}
          {testMode === 'timed' && (
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-3">
                Duration (seconds)
              </label>
              <div className="grid grid-cols-4 gap-2">
                {durations.map((duration) => (
                  <button
                    key={duration}
                    onClick={() => setTimerDuration(duration)}
                    className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                      timerDuration === duration
                        ? 'bg-cyan-500 text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {duration}s
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Word Count */}
          {testMode === 'words' && (
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-3">
                Word Count
              </label>
              <div className="grid grid-cols-4 gap-2">
                {wordCounts.map((count) => (
                  <button
                    key={count}
                    onClick={() => setWordCount(count)}
                    className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                      wordCount === count
                        ? 'bg-cyan-500 text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {count}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Theme */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-3">
              Theme
            </label>
            <div className="grid grid-cols-2 gap-2">
              {themes.map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                    theme === t
                      ? 'bg-cyan-500 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Sound Toggle */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-700">
            <label className="text-sm font-semibold text-gray-300">Sound Effects</label>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                soundEnabled ? 'bg-cyan-500' : 'bg-gray-700'
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                  soundEnabled ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-700 p-6">
          <Button
            onClick={onClose}
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white rounded font-semibold"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
