"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface MarqueeTextProps {
  children: React.ReactNode;
  direction?: "left" | "right";
  speed?: number;
  className?: string;
}

export default function MarqueeText({ children, direction = "left", speed = 50, className = "" }: MarqueeTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trackRef.current || !containerRef.current) return;
    
    const track = trackRef.current;
    // Calculate total width of one set of content
    const contentWidth = track.scrollWidth / 2;
    
    // Set up the animation
    const tl = gsap.timeline({ repeat: -1 });
    
    if (direction === "left") {
      tl.fromTo(track, 
        { x: 0 },
        { x: -contentWidth, ease: "none", duration: contentWidth / speed }
      );
    } else {
      tl.fromTo(track, 
        { x: -contentWidth },
        { x: 0, ease: "none", duration: contentWidth / speed }
      );
    }

    return () => {
      tl.kill();
    };
  }, [direction, speed]);

  return (
    <div ref={containerRef} className="w-full overflow-hidden whitespace-nowrap flex">
      <div ref={trackRef} className={`flex w-max ${className}`}>
        {/* We duplicate the content to ensure seamless looping */}
        <div className="flex shrink-0 px-4">{children}</div>
        <div className="flex shrink-0 px-4">{children}</div>
      </div>
    </div>
  );
}
