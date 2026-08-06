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
    test: `T${i + 1}`,
    wpm: r.wpm,
    accuracy: r.accuracy,
  }));

  return (
    <div className="flex flex-col items-center justify-center gap-10 py-16 px-4">

      <div className="flex flex-col items-center gap-6">
        <div className="w-36 h-36 bg-yellow-300 border-[3px] border-black shadow-[6px_6px_0_0_#000] flex items-center justify-center -rotate-2 hover:rotate-0 transition-transform">
          <span className="font-mono text-7xl font-bold text-black">{grade}</span>
        </div>
        <h2 className="text-3xl font-bold uppercase tracking-tight">
          Test Complete<span className="text-red-600">!</span>
        </h2>
      </div>

      <div className="grid grid-cols-3 gap-6 max-w-md">
        <div className="bg-white border-2 border-black brutal-shadow px-6 py-4 text-center">
          <div className="font-mono text-4xl font-bold text-black">{metrics.wpm.toFixed(2)}</div>
          <div className="mt-1.5 font-mono text-[10px] uppercase tracking-widest text-black/60">WPM</div>
        </div>
        <div className="bg-white border-2 border-black brutal-shadow px-6 py-4 text-center">
          <div className="font-mono text-4xl font-bold text-black">{metrics.accuracy.toFixed(1)}%</div>
          <div className="mt-1.5 font-mono text-[10px] uppercase tracking-widest text-black/60">Accuracy</div>
        </div>
        <div className="bg-white border-2 border-black brutal-shadow px-6 py-4 text-center">
          <div className="font-mono text-4xl font-bold text-black">{metrics.rawWpm}</div>
          <div className="mt-1.5 font-mono text-[10px] uppercase tracking-widest text-black/60">Raw WPM</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 max-w-md w-full text-sm">
        <div className="bg-white border-2 border-black brutal-shadow p-4">
          <div className="font-mono text-[10px] uppercase tracking-widest text-black/60">Correct</div>
          <div className="mt-1 font-mono text-lg font-bold">{metrics.correctChars}</div>
        </div>
        <div className="bg-white border-2 border-black brutal-shadow p-4">
          <div className="font-mono text-[10px] uppercase tracking-widest text-black/60">Incorrect</div>
          <div className="mt-1 font-mono text-lg font-bold text-red-600">{metrics.incorrectChars}</div>
        </div>
        <div className="bg-white border-2 border-black brutal-shadow p-4">
          <div className="font-mono text-[10px] uppercase tracking-widest text-black/60">Total Chars</div>
          <div className="mt-1 font-mono text-lg font-bold">{metrics.totalChars}</div>
        </div>
        <div className="bg-white border-2 border-black brutal-shadow p-4">
          <div className="font-mono text-[10px] uppercase tracking-widest text-black/60">Mode</div>
          <div className="mt-1 font-mono text-lg font-bold capitalize">{testMode}</div>
        </div>
      </div>

      {chartData.length > 0 && (
        <div className="w-full max-w-2xl border-2 border-black brutal-shadow bg-white p-6">
          <h3 className="text-lg font-bold uppercase mb-4">Recent Tests</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="4 4" stroke="#000" />
              <XAxis dataKey="test" stroke="#000" tick={{ fontSize: 12, fontFamily: 'monospace' }} />
              <YAxis stroke="#000" tick={{ fontSize: 12, fontFamily: 'monospace' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '2px solid #000',
                  borderRadius: 0,
                  boxShadow: '3px 3px 0 0 #000',
                }}
                labelStyle={{ color: '#000', fontFamily: 'monospace' }}
              />
              <Legend wrapperStyle={{ fontFamily: 'monospace', fontSize: 12 }} />
              <Bar dataKey="wpm" fill="#000" />
              <Bar dataKey="accuracy" fill="#ffd400" stroke="#000" strokeWidth={1.5} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="flex gap-6 mt-4">
        <Button
          onClick={onRetry}
          className="px-8 py-2 bg-yellow-300 hover:bg-yellow-200"
        >
          Try Again
        </Button>
        <Button
          onClick={() => window.location.href = '/'}
          variant="outline"
          className="px-8 py-2 bg-white"
        >
          Home
        </Button>
      </div>
    </div>
  );
}