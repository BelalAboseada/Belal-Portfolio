"use client";

interface WebLinesProps {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  animated?: boolean;
  opacity?: number;
  className?: string;
}

export default function WebLines({ position, opacity = 0.15, className = "" }: WebLinesProps) {
  const transforms = {
    "top-left":    "translate(0,0)",
    "top-right":   "translate(200,0) scale(-1,1)",
    "bottom-left": "translate(0,200) scale(1,-1)",
    "bottom-right":"translate(200,200) scale(-1,-1)",
  };

  const positionClasses = {
    "top-left":    "top-0 left-0",
    "top-right":   "top-0 right-0",
    "bottom-left": "bottom-0 left-0",
    "bottom-right":"bottom-0 right-0",
  };

  return (
    <svg
      className={`absolute w-48 h-48 md:w-72 md:h-72 pointer-events-none ${positionClasses[position]} ${className}`}
      style={{ opacity }}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g transform={transforms[position]}>
        {/* Radial web lines from corner */}
        <line x1="0" y1="0" x2="200" y2="200" stroke="#1d3557" strokeWidth="1" />
        <line x1="0" y1="0" x2="160" y2="200" stroke="#1d3557" strokeWidth="1" />
        <line x1="0" y1="0" x2="200" y2="160" stroke="#1d3557" strokeWidth="1" />
        <line x1="0" y1="0" x2="100" y2="200" stroke="#1d3557" strokeWidth="1" />
        <line x1="0" y1="0" x2="200" y2="100" stroke="#1d3557" strokeWidth="1" />
        <line x1="0" y1="0" x2="60"  y2="200" stroke="#1d3557" strokeWidth="1" opacity="0.6" />
        <line x1="0" y1="0" x2="200" y2="60"  stroke="#1d3557" strokeWidth="1" opacity="0.6" />

        {/* Concentric arc cross-hatches */}
        <path d="M0 60 Q30 30 60 0"   stroke="#1EAEDB" strokeWidth="0.8" opacity="0.4" />
        <path d="M0 110 Q55 55 110 0" stroke="#1EAEDB" strokeWidth="0.8" opacity="0.3" />
        <path d="M0 160 Q80 80 160 0" stroke="#1EAEDB" strokeWidth="0.8" opacity="0.2" />
      </g>
    </svg>
  );
}
