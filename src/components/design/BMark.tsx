'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Lottie, { type LottieRefCurrentProps } from 'lottie-react';
import { cn } from '@/lib/utils';
import loaderAnimation from '../../../public/b-loader.json';
import introAnimation from '../../../public/b-intro.json';

type BMarkProps = {
  /**
   * `loader` — draws the B once, then loops a light around the outline forever.
   * `intro` — draws the B once and holds on the finished mark.
   */
  variant?: 'loader' | 'intro';
  /** Rendered box in px. The artwork is a 512×512 square, so width === height. */
  size?: number;
  className?: string;
};

/** Frame the B is fully drawn on, per variant — where reduced motion parks it. */
const STILL_FRAME = { loader: 55, intro: 59 } as const;

/**
 * The animated B monogram. Colours are baked into the Lottie files
 * (#C9C9C4 fill, #FFFFFF travelling light) — never tint it with filters,
 * opacity or colour overrides on top.
 */
export const BMark: React.FC<BMarkProps> = ({
  variant = 'loader',
  size = 180,
  className,
}) => {
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);
  // matchMedia is client-only, and the reduced-motion answer has to be known
  // *before* the first frame renders — so hold the box until we're mounted.
  const [reducedMotion, setReducedMotion] = useState<boolean | null>(null);

  useEffect(() => {
    setReducedMotion(
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }, []);

  /**
   * Driven from `onDOMLoaded` rather than an effect: lottie-web tears the
   * animation down and rebuilds it whenever the player remounts (Strict Mode
   * does exactly that in dev), and this fires once per *live* instance — so the
   * playback commands can never land on a destroyed one.
   */
  const startPlayback = useCallback(() => {
    const lottie = lottieRef.current;
    if (!lottie) return;

    if (reducedMotion) {
      lottie.goToAndStop(STILL_FRAME[variant], true);
      return;
    }

    if (variant === 'loader') {
      // Intro once (0–145), then hand off to the seamless 55–145 loop.
      lottie.playSegments(
        [
          [0, 145],
          [55, 145],
        ],
        true
      );
    }
  }, [reducedMotion, variant]);

  const box = { width: size, height: size };

  return (
    <div
      role="img"
      aria-label="Belal"
      className={cn('shrink-0', className)}
      style={box}
    >
      {reducedMotion !== null && (
        <Lottie
          lottieRef={lottieRef}
          animationData={variant === 'loader' ? loaderAnimation : introAnimation}
          loop={variant === 'loader' && !reducedMotion}
          autoplay={variant === 'intro' && !reducedMotion}
          onDOMLoaded={startPlayback}
          style={box}
        />
      )}
    </div>
  );
};
