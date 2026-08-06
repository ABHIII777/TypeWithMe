import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type TestMode = 'timed' | 'words' | 'quotes' | 'survival';

export interface TestResult {
  id: string;
  mode: TestMode;
  wpm: number;
  accuracy: number;
  rawWpm: number;
  duration: number;
  correctChars: number;
  incorrectChars: number;
  timestamp: number;
}

interface TypingStore {
  // Sound
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;

  // Stats
  results: TestResult[];
  addResult: (result: TestResult) => void;
  clearResults: () => void;
  
  // Settings
  testMode: TestMode;
  setTestMode: (mode: TestMode) => void;
  timerDuration: number;
  setTimerDuration: (duration: number) => void;
  wordCount: number;
  setWordCount: (count: number) => void;
}

export const useTypingStore = create<TypingStore>()(
  persist(
    (set) => ({
      soundEnabled: true,
      setSoundEnabled: (enabled) => set({ soundEnabled: enabled }),

      results: [],
      addResult: (result) =>
        set((state) => ({
          results: [result, ...state.results].slice(0, 100), // Keep last 100 results
        })),
      clearResults: () => set({ results: [] }),

      testMode: 'timed',
      setTestMode: (mode) => set({ testMode: mode }),
      timerDuration: 60,
      setTimerDuration: (duration) => set({ timerDuration: duration }),
      wordCount: 50,
      setWordCount: (count) => set({ wordCount: count }),
    }),
    {
      name: 'typing-store',
    }
  )
);
