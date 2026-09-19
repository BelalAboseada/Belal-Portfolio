'use client';

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export const LenisProvider = ({ children }: { children: React.ReactNode }) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.5,
      smoothWheel: !prefersReducedMotion,
      // Touch devices get native scrolling unless syncTouch is on, which is why
      // the phone felt nothing like the desktop. These values keep the touch
      // glide close to the wheel one instead of overshooting.
      syncTouch: !prefersReducedMotion,
      syncTouchLerp: 0.075,
      touchInertiaExponent: 1.7,
      // Lenis runs off the GSAP ticker so scroll position and ScrollTrigger
      // resolve in the same frame — otherwise the pinned sections trail the
      // scroll by a frame and read as stutter.
      autoRaf: false,
    });

    lenisRef.current = lenis;

    const onScroll = () => ScrollTrigger.update();
    lenis.on('scroll', onScroll);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off('scroll', onScroll);
      gsap.ticker.remove(raf);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};
