'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useWindowSize } from '@/lib/hooks';
import {
  animateLoadingPath,
  animateLoadingText,
  animateLoadingTextContainer,
} from '@/lib/animations';
import dynamic from 'next/dynamic';

// Client-only: lottie-web touches the DOM at import time.
const BMark = dynamic(() => import('./BMark').then((m) => m.BMark), {
  ssr: false,
});

export const LoadingScreen: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const pathRef = useRef<SVGPathElement>(null);
  const { width, height } = useWindowSize();

  useEffect(() => {
    setMounted(true);
  }, []);

  const curveHeight = useMemo(() => {
    let multiplier = 0.3;
    if (width < 600) {
      multiplier = 0.15;
    } else if (width < 900) {
      multiplier = 0.2;
    }
    return height + height * multiplier;
  }, [width, height]);

  const initialPath = `M0 0 L${width} 0 L${width} ${height} Q${width / 2} ${curveHeight} 0 ${height}  L0 0`;
  const targetPath = `M0 0 L${width} 0 L${width} ${height} Q${width / 2} ${height} 0 ${height}  L0 0`;

  useEffect(() => {
    if (!mounted) return;

    const isSamsungBrowser =
      typeof navigator !== 'undefined' && /samsung/i.test(navigator.userAgent);

    animateLoadingTextContainer();
    animateLoadingText('.loading-text');

    if (pathRef) {
      animateLoadingPath(pathRef, targetPath, isSamsungBrowser);
    }
  }, [mounted, targetPath]);

  if (!mounted) return null;

  return (
    <div
      id="loading-screen"
      className="flex-center fixed bottom-0 z-[99999] size-full cursor-wait"
    >
      <div className="size-full flex-col">
        <svg
          width={width}
          height={height * 2}
          className="fill-flax-smoke-800 absolute top-0 z-0 h-[calc(100%_+_300px)] brightness-50"
        >
          <path ref={pathRef} className="w-full" d={initialPath}></path>
        </svg>
        <div
          id="text"
          style={{ transform: 'translateZ(0px)' }}
          className="text-flax-smoke-50/75 z-1 flex size-full flex-col items-center justify-center text-center text-4xl font-bold opacity-0 md:text-6xl"
        >
          <BMark variant="loader" size={180} />

          <p className="heading-6 overflow-clip font-normal">
            <span className="loading-text absolute bottom-10 left-5 inline-block font-mono sm:left-14">
              Version 1.5v
            </span>

            <span className="loading-text absolute right-5 bottom-10 inline-block animate-pulse font-mono sm:right-14">
              Loading...
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
