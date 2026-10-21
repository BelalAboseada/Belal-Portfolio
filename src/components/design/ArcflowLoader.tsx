'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

type ArcflowLoaderProps = {
  /** Largest edge in px. The loader is always square and shrinks with its parent. */
  size?: number;
  className?: string;
};

/** Same pacing and easing as the arcflow.digital preloader. */
const DUR = '3.6s';
const SPLINE = '.6 0 .4 1';
const SHAPE_KEY_TIMES = '0;0.16;0.34;0.5;0.66;0.84;1';
const SHAPE_SPLINES = Array(6).fill(SPLINE).join(';');

/**
 * Each arc rests on the Arcflow mark, bends into a loop, then folds into one
 * half of a figure-eight before unwinding back — while the pair turns 360°.
 * The first frame of each is the static mark.
 */
const ARCS = [
  [
    'M20 64 C17 47 23.5 34.5 34.25 27.75 C45 21 60 20 74 26 C62 26 51 29.5 41.75 36 C32.5 42.5 25 52 20 64 Z',
    'M25.02 67.49 C14.35 55.46 15.92 32.36 30.5 22.15 C45.08 11.94 67.33 18.37 74.98 32.51 C64.32 20.48 46.09 19.77 34.51 27.88 C22.93 35.99 17.36 53.36 25.02 67.49 Z',
    'M49.97 50.05 C38.46 66.74 6 83.37 6 50 C6 16.63 38.46 33.26 49.97 49.95 C27.31 40.95 10.6 21.61 10.6 50 C10.6 78.39 27.31 59.05 49.97 50.05 Z',
  ],
  [
    'M80 36 C83 53 76.5 65.5 65.75 72.25 C55 79 40 80 26 74 C38 74 49 70.5 58.25 64 C67.5 57.5 75 48 80 36 Z',
    'M74.98 32.51 C85.65 44.54 84.08 67.64 69.5 77.85 C54.92 88.06 32.67 81.63 25.02 67.49 C35.68 79.52 53.91 80.23 65.49 72.12 C77.07 64.01 82.64 46.64 74.98 32.51 Z',
    'M50.03 49.95 C61.54 33.26 94 16.63 94 50 C94 83.37 61.54 66.74 50.03 50.05 C72.69 59.05 89.4 78.39 89.4 50 C89.4 21.61 72.69 40.95 50.03 49.95 Z',
  ],
] as const;

/**
 * The Arcflow mark running its preloader loop, drawn in the portfolio's single
 * tile colour (#A8A89A) so it sits beside the other featured tiles.
 */
export const ArcflowLoader: React.FC<ArcflowLoaderProps> = ({
  size = 240,
  className,
}) => {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }, []);

  return (
    <div
      className={cn('aspect-square w-full text-[#A8A89A]', className)}
      style={{ maxWidth: size }}
    >
      <svg
        viewBox="0 0 100 100"
        className="block size-full overflow-visible"
        role="img"
        aria-label="Arcflow"
      >
        <g fill="currentColor">
          {!reducedMotion && (
            <animateTransform
              attributeName="transform"
              type="rotate"
              dur={DUR}
              repeatCount="indefinite"
              values="0 50 50;0 50 50;180 50 50;180 50 50;360 50 50;360 50 50"
              keyTimes="0;0.16;0.34;0.66;0.84;1"
              calcMode="spline"
              keySplines={Array(5).fill(SPLINE).join(';')}
            />
          )}
          {ARCS.map(([rest, loop, eight], i) => (
            <path key={i} d={rest}>
              {!reducedMotion && (
                <animate
                  attributeName="d"
                  dur={DUR}
                  repeatCount="indefinite"
                  calcMode="spline"
                  keyTimes={SHAPE_KEY_TIMES}
                  keySplines={SHAPE_SPLINES}
                  values={[rest, rest, loop, eight, eight, loop, rest].join(';')}
                />
              )}
            </path>
          ))}
        </g>
      </svg>
    </div>
  );
};
