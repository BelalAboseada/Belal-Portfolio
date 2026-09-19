'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Lottie, { type LottieRefCurrentProps } from 'lottie-react';
import { cn } from '@/lib/utils';
import comingSoonAnimation from '../../../public/coming-soon.json';

type ComingSoonTileProps = {
  /** Largest edge in px. The tile is always square and shrinks with its parent. */
  size?: number;
  className?: string;
};

/** Frame the grid is fully built on — where reduced motion parks it. */
const STILL_FRAME = 85;

/**
 * The looping "coming soon" app-grid tile. The single colour (#A8A89A) is baked
 * into the Lottie file — never tint it with filters or opacity on top.
 */
export const ComingSoonTile: React.FC<ComingSoonTileProps> = ({
  size = 240,
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
   * Driven from `onDOMLoaded` rather than an effect: lottie-web rebuilds the
   * animation whenever the player remounts (Strict Mode does exactly that in
   * dev), and this fires once per *live* instance, so the seek can never land
   * on a destroyed one.
   */
  const parkIfReduced = useCallback(() => {
    if (!reducedMotion) return;
    lottieRef.current?.goToAndStop(STILL_FRAME, true);
  }, [reducedMotion]);

  return (
    <div
      className={cn('aspect-square w-full', className)}
      style={{ maxWidth: size }}
    >
      {reducedMotion !== null && (
        <Lottie
          lottieRef={lottieRef}
          animationData={comingSoonAnimation}
          loop={!reducedMotion}
          autoplay={!reducedMotion}
          onDOMLoaded={parkIfReduced}
          style={{ width: '100%', height: '100%' }}
        />
      )}
    </div>
  );
};
