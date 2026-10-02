import { useState, useEffect, useCallback } from 'react';
import { playTypingTick } from '../utils/sound';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_#$&%*+=-/[]<>';

export function useTextScramble(targetText: string, delay = 0): { text: string; replay: () => void } {
  const [text, setText] = useState(targetText);

  const runScramble = useCallback(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setText(
        targetText
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) {
              return targetText[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('')
      );

      // Play soft typing tick
      playTypingTick();

      if (iteration >= targetText.length) {
        clearInterval(interval);
      }
      iteration += 1 / 2;
    }, 28);

    return () => clearInterval(interval);
  }, [targetText]);

  useEffect(() => {
    const timer = setTimeout(() => {
      runScramble();
    }, delay);
    return () => clearTimeout(timer);
  }, [runScramble, delay]);

  return { text, replay: runScramble };
}
