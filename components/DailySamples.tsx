import fs from 'node:fs/promises';
import path from 'node:path';

interface TextData {
  words: { common: string[]; medium?: string[] };
  quotes: { small: { text: string; author: string }[]; medium: { text: string; author: string }[]; large: { text: string; author: string }[] };
  code: { small: string[]; medium: string[]; large: string[] };
}

const pick = <T extends unknown>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export default async function DailySamples() {
  const raw = await fs.readFile(
    path.join(process.cwd(), 'data', 'texts.json'),
    'utf8'
  );
  const texts: TextData = JSON.parse(raw);

  const quoteBuckets = [texts.quotes.small, texts.quotes.medium, texts.quotes.large];
  const quote = pick(pick(quoteBuckets));

  const codeBuckets = [texts.code.small, texts.code.medium, texts.code.large];
  const code = pick(pick(codeBuckets));

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
      <div className="bg-white border-2 border-black brutal-shadow p-6 -rotate-1 hover:rotate-0 transition-transform">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-mono text-[10px] uppercase tracking-widest bg-black text-yellow-300 px-2 py-0.5">
            daily quote
          </h3>
          <span className="font-mono text-[10px] uppercase tracking-widest text-black/50">
            quotes pool
          </span>
        </div>
        <p className="font-mono text-sm leading-relaxed">
          &ldquo;{quote.text}&rdquo;
        </p>
        <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-black/60">
          — {quote.author}
        </p>
      </div>

      <div className="bg-white border-2 border-black brutal-shadow p-6 rotate-1 hover:rotate-0 transition-transform">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-mono text-[10px] uppercase tracking-widest bg-yellow-300 border-2 border-black px-2 py-0.5">
            random snippet
          </h3>
          <span className="font-mono text-[10px] uppercase tracking-widest text-black/60">
            code pool
          </span>
        </div>
        <pre className="font-mono text-xs leading-relaxed whitespace-pre-wrap overflow-x-auto">
          {code.slice(0, 200)}
          {code.length > 200 ? '…' : ''}
        </pre>
      </div>
    </section>
  );
}