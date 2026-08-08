import { useState, useEffect } from 'react';
import texts from '@/data/texts.json';
import { TextSize } from '@/lib/typing-store';

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
  wordCount: number,
  textSize: TextSize = 'medium'
): GeneratedText => {
  if (mode === 'quotes') {
    const bucket = texts.quotes[textSize];
    const randomQuote = bucket[Math.floor(Math.random() * bucket.length)];
    return { text: randomQuote.text };
  }

  if (mode === 'code') {
    const bucket = texts.code[textSize];
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
  wordCount: number = 50,
  textSize: TextSize = 'medium'
) => {
  const [text, setText] = useState('');
  const [codeLines, setCodeLines] = useState<CodeLine[] | undefined>(undefined);

  useEffect(() => {
    const generated = generateText(mode, wordCount, textSize);
    setText(generated.text);
    setCodeLines(generated.codeLines);
  }, [mode, wordCount, textSize]);

  const regenerate = () => {
    const generated = generateText(mode, wordCount, textSize);
    setText(generated.text);
    setCodeLines(generated.codeLines);
  };

  return { text, regenerate, codeLines };
};