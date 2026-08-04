'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useWindowSize } from '@/lib/hooks';
import {
  animateLoadingPath,
  animateLoadingText,
  animateLoadingTextContainer,
} from '@/lib/animations';

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
    animateLoadingText('span.loading-text');

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
          <h3 className="overflow-clip">
            <span className="loading-text inline-block translate-y-full will-change-auto">
              Belal
            </span>
          </h3>

          <p className="overflow-clip">
            <span className="loading-text inline-block translate-y-full opacity-70 will-change-auto">
              &copy; Folio {new Date().getFullYear()}
            </span>
          </p>

          <p className="heading-6 overflow-clip font-normal">
            <span className="loading-text absolute bottom-10 left-5 inline-block font-mono sm:left-14">
              Version 1.4v
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