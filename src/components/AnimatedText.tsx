
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  texts: string[];
  className?: string;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ texts, className }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [delta, setDelta] = useState(100);

  useEffect(() => {
    const ticker = setInterval(() => {
      tick();
    }, delta);

    return () => clearInterval(ticker);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayText, isDeleting, currentTextIndex]);

  const tick = () => {
    const currentText = texts[currentTextIndex];
    const updatedText = isDeleting
      ? currentText.substring(0, displayText.length - 1)
      : currentText.substring(0, displayText.length + 1);

    setDisplayText(updatedText);

    if (isDeleting) {
      setDelta(100);
    }

    if (!isDeleting && updatedText === currentText) {
      setIsDeleting(true);
      setDelta(1000);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setDelta(300);
      setCurrentTextIndex((currentTextIndex + 1) % texts.length);
    }
  };

  return (
    <span className={cn("relative", className)}>
      <span className="absolute">{displayText}</span>
      <span className="invisible">{texts[0]}</span>
      <span className={cn("animate-pulse ml-1", isDeleting ? "opacity-100" : "opacity-0")}>|</span>
    </span>
  );
};

export default AnimatedText;
