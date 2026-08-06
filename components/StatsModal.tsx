'use client';

import { Button } from '@/components/ui/button';
import { X, Trash2 } from 'lucide-react';
import { useTypingStore } from '@/lib/typing-store';
import { useMemo } from 'react';

interface StatsModalProps {
  onClose: () => void;
}

export function StatsModal({ onClose }: StatsModalProps) {
  const { results, clearResults } = useTypingStore();

  const stats = useMemo(() => {
    if (results.length === 0) {
      return {
        totalTests: 0,
        avgWpm: 0,
        avgAccuracy: 0,
        bestWpm: 0,
        bestAccuracy: 0,
      };
    }

    const avgWpm = results.reduce((sum, r) => sum + r.wpm, 0) / results.length;
    const avgAccuracy = results.reduce((sum, r) => sum + r.accuracy, 0) / results.length;
    const bestWpm = Math.max(...results.map((r) => r.wpm));
    const bestAccuracy = Math.max(...results.map((r) => r.accuracy));

    return {
      totalTests: results.length,
      avgWpm: avgWpm.toFixed(2),
      avgAccuracy: avgAccuracy.toFixed(1),
      bestWpm,
      bestAccuracy: bestAccuracy.toFixed(1),
    };
  }, [results]);

  const modeBreakdown = useMemo(() => {
    const breakdown: Record<string, number> = {};
    results.forEach((r) => {
      breakdown[r.mode] = (breakdown[r.mode] || 0) + 1;
    });
    return breakdown;
  }, [results]);

  const statTile = 'bg-white border-2 border-black brutal-shadow p-4';

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white border-[3px] border-black shadow-[8px_8px_0_0_#000] max-w-md w-full max-h-[90vh] overflow-y-auto animate-pop">

        <div className="flex items-center justify-between px-6 py-4 border-b-[3px] border-black bg-cyan-300 sticky top-0 z-10">
          <h2 className="text-xl font-bold uppercase tracking-tight">// Statistics</h2>
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
          {results.length === 0 ? (
            <div className="text-center py-10 border-2 border-dashed border-black">
              <p className="font-mono text-sm uppercase tracking-widest">
                No tests completed yet.
              </p>
              <p className="mt-2 font-mono text-xs uppercase tracking-widest text-black/60">
                Go type something!
              </p>
            </div>
          ) : (
            <>

              <div className="grid grid-cols-2 gap-4">
                <div className={statTile}>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-black/60">Total Tests</div>
                  <div className="mt-1 font-mono text-2xl font-bold">{stats.totalTests}</div>
                </div>
                <div className={statTile}>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-black/60">Avg WPM</div>
                  <div className="mt-1 font-mono text-2xl font-bold">{stats.avgWpm}</div>
                </div>
                <div className={statTile}>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-black/60">Best WPM</div>
                  <div className="mt-1 font-mono text-2xl font-bold">{stats.bestWpm}</div>
                </div>
                <div className={statTile}>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-black/60">Avg Accuracy</div>
                  <div className="mt-1 font-mono text-2xl font-bold">{stats.avgAccuracy}%</div>
                </div>
              </div>

              {Object.keys(modeBreakdown).length > 0 && (
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-widest text-black mb-3 border-b-2 border-black pb-1">
                    By Mode
                  </h3>
                  <div className="space-y-2">
                    {Object.entries(modeBreakdown).map(([mode, count]) => (
                      <div
                        key={mode}
                        className="flex items-center justify-between border-2 border-black bg-white px-3 py-2"
                      >
                        <span className="font-mono text-sm uppercase tracking-wide">{mode}</span>
                        <span className="font-mono text-sm font-bold bg-yellow-300 border-2 border-black px-2">
                          {count}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h3 className="font-mono text-xs uppercase tracking-widest text-black mb-3 border-b-2 border-black pb-1">
                  Recent Tests
                </h3>
                <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                  {results.slice(0, 5).map((result) => (
                    <div
                      key={result.id}
                      className="flex items-center justify-between border-2 border-black bg-white px-3 py-2"
                    >
                      <div>
                        <span className="font-mono text-sm uppercase">{result.mode}</span>
                        <span className="font-mono text-xs text-black/60 ml-2">
                          {new Date(result.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <span className="font-mono text-sm font-bold">{result.wpm.toFixed(0)} WPM</span>
                        <span className="font-mono text-sm font-bold">{result.accuracy.toFixed(0)}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="border-t-[3px] border-black p-6 flex gap-3">
          {results.length > 0 && (
            <Button
              onClick={() => {
                if (confirm('Clear all statistics? This cannot be undone.')) {
                  clearResults();
                }
              }}
              variant="outline"
              className="flex-1 bg-red-500 text-white hover:bg-red-400 border-black shadow-[4px_4px_0_0_#000]"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear
            </Button>
          )}
          <Button
            onClick={onClose}
            className="flex-1 bg-black text-white hover:bg-black/80 shadow-[4px_4px_0_0_#ffd400]"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}