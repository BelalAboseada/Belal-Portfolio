'use client';

import React, { useEffect, useRef } from 'react';
import { LoadingScreen, SamsungError, Cursor, Footer, Marquee } from '@/components/design';
import { Nav } from '@/components/common/Nav';
import { Hero, Services, Works, AboutMe, People, Contact } from '@/components/sections';
import { useWindowSize } from '@/lib/hooks';

export default function Home() {
  const { width, height } = useWindowSize();
  const noiseRef = useRef<SVGRectElement>(null);
  const noise2Ref = useRef<SVGRectElement>(null);

  useEffect(() => {
    if (noiseRef.current && noise2Ref.current) {
      noiseRef.current.style.height = `${height * 2}px`;
      noiseRef.current.style.width = `${width}px`;
      noise2Ref.current.style.height = `${height * 2}px`;
      noise2Ref.current.style.width = `${width}px`;
    }
  }, [width, height]);

  useEffect(() => {
    document.body.classList.add('stop-scrolling');
    const timer = setTimeout(() => {
      document.body.classList.remove('stop-scrolling');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingScreen />
      <SamsungError />

      <div className="pointer-events-none fixed inset-0 z-50">
        <svg
          className="h-[150vh] w-full object-cover object-center"
          xmlns="http://www.w3.org/2000/svg"
        >
          <filter id="noise1">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves={1}
              stitchTiles="stitch"
            />
            <feBlend mode="screen" />
          </filter>
          <rect
            ref={noiseRef}
            className="size-full"
            filter="url(#noise1)"
            opacity="0.15"
          />

          <filter id="noise2">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves={1}
              stitchTiles="stitch"
            />
            <feBlend mode="screen" />
          </filter>
          <rect
            ref={noise2Ref}
            className="size-full"
            filter="url(#noise2)"
            opacity="0.12"
          />
        </svg>
      </div>

      <Cursor />
      <Nav />

      <main className="relative min-h-full">
        <Hero />
        <div className="text-flax-smoke-200 relative rounded-t-3xl bg-[#0B0B0A] py-[5%]">
          <Services />
          <Marquee />
          <Works />
        </div>

        <AboutMe />
        <People />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
