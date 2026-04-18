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

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-lg max-w-md w-full max-h-96 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-gray-100">Your Statistics</h2>
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
          {results.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400">No tests completed yet. Complete your first test!</p>
            </div>
          ) : (
            <>
              {/* Overall Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800/50 rounded p-4 border border-gray-700">
                  <div className="text-xs text-gray-400">Total Tests</div>
                  <div className="text-2xl font-bold text-cyan-400 mt-1">
                    {stats.totalTests}
                  </div>
                </div>
                <div className="bg-gray-800/50 rounded p-4 border border-gray-700">
                  <div className="text-xs text-gray-400">Avg WPM</div>
                  <div className="text-2xl font-bold text-green-400 mt-1">
                    {stats.avgWpm}
                  </div>
                </div>
                <div className="bg-gray-800/50 rounded p-4 border border-gray-700">
                  <div className="text-xs text-gray-400">Best WPM</div>
                  <div className="text-2xl font-bold text-yellow-400 mt-1">
                    {stats.bestWpm}
                  </div>
                </div>
                <div className="bg-gray-800/50 rounded p-4 border border-gray-700">
                  <div className="text-xs text-gray-400">Avg Accuracy</div>
                  <div className="text-2xl font-bold text-blue-400 mt-1">
                    {stats.avgAccuracy}%
                  </div>
                </div>
              </div>

              {/* Mode Breakdown */}
              {Object.keys(modeBreakdown).length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-300 mb-3">By Mode</h3>
                  <div className="space-y-2">
                    {Object.entries(modeBreakdown).map(([mode, count]) => (
                      <div
                        key={mode}
                        className="flex items-center justify-between text-sm bg-gray-800/50 rounded p-3"
                      >
                        <span className="text-gray-300 capitalize">{mode}</span>
                        <span className="text-cyan-400 font-semibold">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recent Tests */}
              <div>
                <h3 className="text-sm font-semibold text-gray-300 mb-3">Recent Tests</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {results.slice(0, 5).map((result, idx) => (
                    <div
                      key={result.id}
                      className="flex items-center justify-between text-sm bg-gray-800/50 rounded p-3"
                    >
                      <div>
                        <span className="text-gray-400 capitalize">{result.mode}</span>
                        <span className="text-gray-600 ml-2 text-xs">
                          {new Date(result.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-green-400 font-semibold">{result.wpm.toFixed(0)} WPM</span>
                        <span className="text-blue-400 font-semibold">{result.accuracy.toFixed(0)}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-700 p-6 flex gap-3">
          {results.length > 0 && (
            <Button
              onClick={() => {
                if (confirm('Clear all statistics? This cannot be undone.')) {
                  clearResults();
                }
              }}
              variant="ghost"
              className="flex-1 text-red-400 hover:bg-red-500/10"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear
            </Button>
          )}
          <Button
            onClick={onClose}
            className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white rounded font-semibold"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
