import { useState, useEffect } from 'react';
import texts from '@/data/texts.json';

export interface CodeLine {
  indent: string;
  content: string;
}

type GeneratedText = {
  text: string;
  codeLines?: CodeLine[];
};

const generateText = (
  mode: 'words' | 'quotes' | 'code',
  wordCount: number
): GeneratedText => {
  if (mode === 'quotes') {
    const buckets = [texts.quotes.small, texts.quotes.medium, texts.quotes.large];
    const bucket = buckets[Math.floor(Math.random() * buckets.length)];
    const randomQuote = bucket[Math.floor(Math.random() * bucket.length)];
    return { text: randomQuote.text };
  }

  if (mode === 'code') {
    const buckets = [texts.code.small, texts.code.medium, texts.code.large];
    const bucket = buckets[Math.floor(Math.random() * buckets.length)];
    const raw = bucket[Math.floor(Math.random() * bucket.length)];

    const codeLines: CodeLine[] = raw.split('\n').map((line) => {
      const indentMatch = line.match(/^\s*/);
      return {
        indent: indentMatch ? indentMatch[0] : '',
        content: line.trim(),
      };
    });

    return {
      text: codeLines.map((line) => line.content).join(''),
      codeLines,
    };
  }

  const words: string[] = [];
  for (let i = 0; i < wordCount; i++) {
    words.push(
      texts.words.common[Math.floor(Math.random() * texts.words.common.length)]
    );
  }
  return { text: words.join(' ') };
};

export const useTestText = (
  mode: 'words' | 'quotes' | 'code',
  wordCount: number = 50
) => {
  const [text, setText] = useState('');
  const [codeLines, setCodeLines] = useState<CodeLine[] | undefined>(undefined);

  useEffect(() => {
    const generated = generateText(mode, wordCount);
    setText(generated.text);
    setCodeLines(generated.codeLines);
  }, [mode, wordCount]);

  const regenerate = () => {
    const generated = generateText(mode, wordCount);
    setText(generated.text);
    setCodeLines(generated.codeLines);
  };

  return { text, regenerate, codeLines };
};