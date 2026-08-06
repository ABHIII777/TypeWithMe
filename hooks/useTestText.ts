import { useState, useEffect } from 'react';

const COMMON_WORDS = [
  'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i',
  'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
  'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she',
  'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what',
  'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me',
  'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know', 'take',
  'people', 'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see', 'other',
  'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over', 'think', 'also',
  'back', 'after', 'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way',
  'even', 'new', 'want', 'because', 'any', 'these', 'give', 'day', 'most', 'us',
  'is', 'was', 'are', 'been', 'being', 'has', 'had', 'does', 'did', 'doing',
  'should', 'am', 'such', 'very', 'too', 'more', 'much', 'through', 'before', 'under',
  'where', 'should', 'right', 'those', 'may', 'might', 'must', 'can', 'yours', 'itself',
];

const QUOTES = [
  'The quick brown fox jumps over the lazy dog.',
  'To be or not to be, that is the question.',
  'All that glitters is not gold.',
  'It was the best of times, it was the worst of times.',
  'The early bird catches the worm.',
  'Actions speak louder than words.',
  'Where there is a will, there is a way.',
  'Beauty is in the eye of the beholder.',
  'The pen is mightier than the sword.',
  'Knowledge is power.',
  'Practice makes perfect.',
  'Better late than never.',
  'Every cloud has a silver lining.',
  'The ball is in your court.',
  'Break a leg.',
];

const generateText = (mode: 'words' | 'quotes', wordCount: number): string => {
  if (mode === 'quotes') {
    const randomQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
    return randomQuote;
  } else {
    const words: string[] = [];
    for (let i = 0; i < wordCount; i++) {
      words.push(COMMON_WORDS[Math.floor(Math.random() * COMMON_WORDS.length)]);
    }
    return words.join(' ');
  }
};

export const useTestText = (mode: 'words' | 'quotes', wordCount: number = 50) => {
  const [text, setText] = useState('');

  useEffect(() => {
    setText(generateText(mode, wordCount));
  }, [mode, wordCount]);

  const regenerate = () => {
    setText(generateText(mode, wordCount));
  };

  return { text, regenerate };
};
