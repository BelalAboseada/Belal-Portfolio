import { useState, useEffect, useRef } from 'react';

export interface TerminalLine {
  type: 'command' | 'output';
  content: string | JSX.Element;
  delay?: number; // Delay before starting this line (ms)
}

interface UseTerminalTypingOptions {
  lines: TerminalLine[];
  typingSpeed?: number; // ms per character
  onComplete?: () => void;
}

interface UseTerminalTypingReturn {
  displayedLines: Array<{ type: 'command' | 'output'; content: string | JSX.Element }>;
  currentLineIndex: number;
  isTyping: boolean;
  isComplete: boolean;
}

export function useTerminalTyping({
  lines,
  typingSpeed = 60,
  onComplete,
}: UseTerminalTypingOptions): UseTerminalTypingReturn {
  const [displayedLines, setDisplayedLines] = useState<
    Array<{ type: 'command' | 'output'; content: string | JSX.Element }>
  >([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isWaiting, setIsWaiting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Reset state when lines change
    setDisplayedLines([]);
    setCurrentLineIndex(0);
    setCurrentCharIndex(0);
    setIsWaiting(false);
    setIsComplete(false);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [lines]);

  useEffect(() => {
    if (currentLineIndex >= lines.length) {
      if (!isComplete) {
        setIsComplete(true);
        onComplete?.();
      }
      return;
    }

    const currentLine = lines[currentLineIndex];

    // Handle initial delay for the line
    if (currentCharIndex === 0 && currentLine.delay && !isWaiting) {
      setIsWaiting(true);
      timeoutRef.current = setTimeout(() => {
        setIsWaiting(false);
      }, currentLine.delay);
      return;
    }

    if (isWaiting) return;
    
    // For output lines, show instantly
    if (currentLine.type === 'output') {
      setDisplayedLines((prev) => [...prev, currentLine]);
      setCurrentLineIndex((prev) => prev + 1);
      setCurrentCharIndex(0);
      return;
    }

    // For command lines, type character by character
    if (typeof currentLine.content === 'string' && currentCharIndex < currentLine.content.length) {
      timeoutRef.current = setTimeout(() => {
        const char = (currentLine.content as string)[currentCharIndex];
        
        setDisplayedLines((prev) => {
          const newLines = [...prev];
          const lastIndex = newLines.length - 1;
          
          if (lastIndex >= 0 && newLines[lastIndex].type === 'command' && currentCharIndex > 0) {
            // Update existing command line
            newLines[lastIndex] = {
              ...newLines[lastIndex],
              content: (newLines[lastIndex].content as string) + char,
            };
          } else {
            // Start new command line
            newLines.push({
              type: 'command',
              content: char,
            });
          }
          
          return newLines;
        });
        
        setCurrentCharIndex((prev) => prev + 1);
      }, typingSpeed);
    } else {
      // Command finished typing or content is not string, move to next line
      setCurrentLineIndex((prev) => prev + 1);
      setCurrentCharIndex(0);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentLineIndex, currentCharIndex, lines, typingSpeed, isWaiting, isComplete, onComplete]);

  const isTyping = 
    currentLineIndex < lines.length && 
    lines[currentLineIndex]?.type === 'command' &&
    typeof lines[currentLineIndex].content === 'string' &&
    currentCharIndex < (lines[currentLineIndex].content as string).length;

  return {
    displayedLines,
    currentLineIndex,
    isTyping,
    isComplete,
  };
}
