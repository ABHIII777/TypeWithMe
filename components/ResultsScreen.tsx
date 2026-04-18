'use client';

import { Button } from '@/components/ui/button';
import { TypingMetrics } from '@/hooks/useTypingTest';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ResultsScreenProps {
  metrics: TypingMetrics;
  testMode: string;
  onRetry: () => void;
  previousResults?: { wpm: number; accuracy: number; timestamp: number }[];
}

export function ResultsScreen({
  metrics,
  testMode,
  onRetry,
  previousResults = [],
}: ResultsScreenProps) {
  const getGrade = (wpm: number) => {
    if (wpm >= 100) return 'S+';
    if (wpm >= 90) return 'S';
    if (wpm >= 80) return 'A+';
    if (wpm >= 70) return 'A';
    if (wpm >= 60) return 'B';
    if (wpm >= 50) return 'C';
    if (wpm >= 40) return 'D';
    return 'F';
  };

  const grade = getGrade(metrics.wpm);
  const recentResults = previousResults.slice(0, 5);
  const chartData = recentResults.reverse().map((r, i) => ({
    test: `Test ${i + 1}`,
    wpm: r.wpm,
    accuracy: r.accuracy,
  }));

  return (
    <div className="flex flex-col items-center justify-center gap-8 py-16 px-4">
      {/* Grade Circle */}
      <div className="flex flex-col items-center gap-4">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center">
          <span className="text-6xl font-bold text-white">{grade}</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-100">Test Complete!</h2>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-3 gap-8 max-w-md">
        <div className="text-center">
          <div className="text-4xl font-bold text-green-400">{metrics.wpm.toFixed(2)}</div>
          <div className="text-sm text-gray-400 mt-2">WPM</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-blue-400">{metrics.accuracy.toFixed(1)}%</div>
          <div className="text-sm text-gray-400 mt-2">Accuracy</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-yellow-400">{metrics.rawWpm}</div>
          <div className="text-sm text-gray-400 mt-2">Raw WPM</div>
        </div>
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-2 gap-6 max-w-md w-full text-sm">
        <div className="bg-gray-800/50 rounded p-4 border border-gray-700">
          <div className="text-gray-400">Correct</div>
          <div className="text-lg font-bold text-green-400">{metrics.correctChars}</div>
        </div>
        <div className="bg-gray-800/50 rounded p-4 border border-gray-700">
          <div className="text-gray-400">Incorrect</div>
          <div className="text-lg font-bold text-red-400">{metrics.incorrectChars}</div>
        </div>
        <div className="bg-gray-800/50 rounded p-4 border border-gray-700">
          <div className="text-gray-400">Total Chars</div>
          <div className="text-lg font-bold text-cyan-400">{metrics.totalChars}</div>
        </div>
        <div className="bg-gray-800/50 rounded p-4 border border-gray-700">
          <div className="text-gray-400">Mode</div>
          <div className="text-lg font-bold text-purple-400 capitalize">{testMode}</div>
        </div>
      </div>

      {/* Chart */}
      {chartData.length > 0 && (
        <div className="w-full max-w-2xl bg-gray-800/50 rounded-lg border border-gray-700 p-6 mt-4">
          <h3 className="text-lg font-bold text-gray-100 mb-4">Recent Tests</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="test" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1a1a1a',
                  border: '1px solid #4b5563',
                  borderRadius: '0.5rem',
                }}
                labelStyle={{ color: '#e5e7eb' }}
              />
              <Legend />
              <Bar dataKey="wpm" fill="#10b981" />
              <Bar dataKey="accuracy" fill="#06b6d4" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4 mt-8">
        <Button
          onClick={onRetry}
          className="px-8 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded font-semibold"
        >
          Try Again
        </Button>
        <Button
          onClick={() => window.location.href = '/'}
          className="px-8 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded font-semibold"
        >
          Home
        </Button>
      </div>
    </div>
  );
}
