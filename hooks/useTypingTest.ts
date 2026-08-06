import { useState, useEffect, useCallback, useRef } from 'react';

export interface TypingMetrics {
  wpm: number;
  rawWpm: number;
  accuracy: number;
  correctChars: number;
  incorrectChars: number;
  totalChars: number;
}

export const useTypingTest = (
  text: string,
  duration: number,
  onComplete?: (metrics: TypingMetrics) => void
) => {
  const [input, setInput] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [metrics, setMetrics] = useState<TypingMetrics>({
    wpm: 0,
    rawWpm: 0,
    accuracy: 0,
    correctChars: 0,
    incorrectChars: 0,
    totalChars: 0,
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (input.length === 1 && !isActive) {
      setIsActive(true);
    }
  }, [input, isActive]);

  useEffect(() => {
    if (!isActive) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive]);

  useEffect(() => {
    if (!isActive && input.length === 0) return;

    let correct = 0;
    let incorrect = 0;

    for (let i = 0; i < input.length; i++) {
      if (input[i] === text[i]) {
        correct++;
      } else {
        incorrect++;
      }
    }

    const elapsedSeconds = duration - timeLeft;
    const minutes = elapsedSeconds / 60;
    const rawWpm = Math.round((input.length / 5) / minutes) || 0;
    const wpm = Math.round(((correct / 5) / minutes) * 100) / 100 || 0;
    const accuracy =
      input.length > 0
        ? Math.round((correct / input.length) * 10000) / 100
        : 0;

    setMetrics({
      wpm: Math.max(0, wpm),
      rawWpm: Math.max(0, rawWpm),
      accuracy,
      correctChars: correct,
      incorrectChars: incorrect,
      totalChars: input.length,
    });
  }, [input, text, duration, timeLeft, isActive]);

  useEffect(() => {
    if (!isActive && input.length > 0 && timeLeft === 0) {
      onComplete?.(metrics);
    }
  }, [isActive, timeLeft, input.length, metrics, onComplete]);

  const handleInput = useCallback(
    (value: string) => {
      if (!isActive && value.length === 0) return;
      if (value.length <= text.length) {
        setInput(value);
      }
    },
    [text.length, isActive]
  );

  const reset = useCallback(() => {
    setInput('');
    setIsActive(false);
    setTimeLeft(duration);
    setMetrics({
      wpm: 0,
      rawWpm: 0,
      accuracy: 0,
      correctChars: 0,
      incorrectChars: 0,
      totalChars: 0,
    });
    inputRef.current?.focus();
  }, [duration]);

  return {
    input,
    setInput: handleInput,
    isActive,
    timeLeft,
    metrics,
    inputRef,
    reset,
  };
};
