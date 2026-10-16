'use client';

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ReactLenis, useLenis } from 'lenis/react';
import { useEffect, useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

/**
 * Drives the root Lenis instance from the GSAP ticker. Lenis runs off the
 * ticker so scroll position and ScrollTrigger resolve in the same frame —
 * otherwise the pinned sections trail the scroll by a frame and read as stutter.
 */
const GsapTickerSync = () => {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const onScroll = () => ScrollTrigger.update();
    lenis.on('scroll', onScroll);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off('scroll', onScroll);
      gsap.ticker.remove(raf);
      gsap.ticker.lagSmoothing(500, 33);
    };
  }, [lenis]);

  return null;
};

/**
 * Root smooth-scroll provider. Uses ReactLenis (rather than `new Lenis()`) so
 * `useLenis()` in Nav, Link, Button and Footer actually receives the instance —
 * without it every in-page `#section` link silently did nothing.
 */
export const LenisProvider = ({ children }: { children: React.ReactNode }) => {
  // Options don't affect markup, so reading matchMedia here can't cause a
  // hydration mismatch.
  const [prefersReducedMotion] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.5,
        smoothWheel: !prefersReducedMotion,
        // Touch devices get native scrolling unless syncTouch is on, which is why
        // the phone felt nothing like the desktop. These values keep the touch
        // glide close to the wheel one instead of overshooting.
        syncTouch: !prefersReducedMotion,
        syncTouchLerp: 0.075,
        touchInertiaExponent: 1.7,
        autoRaf: false,
      }}
    >
      <GsapTickerSync />
      {children}
    </ReactLenis>
  );
};
