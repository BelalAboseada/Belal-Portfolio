'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { BrandMark } from '@/components/design/BrandMark';
import { Logo } from '@/components/design/Logo';

export default function NotFound() {
  const logoRef    = useRef<HTMLDivElement>(null);
  const numRef     = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef     = useRef<HTMLParagraphElement>(null);
  const btnRef     = useRef<HTMLAnchorElement>(null);
  const bottomRef  = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.inOut' } });

    // Set initial states
    gsap.set([logoRef.current, numRef.current, headingRef.current, subRef.current, btnRef.current, bottomRef.current], {
      opacity: 0,
      y: 40,
    });

    // Staggered entrance — same feel as animateHeroNav
    tl.to(logoRef.current,    { opacity: 1, y: 0, duration: 1 })
      .to(numRef.current,     { opacity: 1, y: 0, duration: 1.2 }, '<0.1')
      .to(headingRef.current, { opacity: 1, y: 0, duration: 1   }, '<0.15')
      .to(subRef.current,     { opacity: 1, y: 0, duration: 0.9 }, '<0.15')
      .to(btnRef.current,     { opacity: 1, y: 0, duration: 0.9 }, '<0.15')
      .to(bottomRef.current,  { opacity: 1, y: 0, duration: 0.8 }, '<0.1');

    // Subtle float on the 404 number
    gsap.to(numRef.current, {
      y: -18,
      duration: 3,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: 1.5,
    });

    return () => { tl.kill(); };
  }, []);

  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-flax-smoke-950 text-flax-smoke-100 select-none">

      {/* Oversized mark watermark */}
      <BrandMark className="pointer-events-none absolute top-1/2 left-1/2 z-0 h-[70vh] w-auto -translate-x-1/2 -translate-y-1/2 text-flax-smoke-900/40" />

      {/* Noise texture overlay */}
      <div className="pointer-events-none fixed inset-0 z-10">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <filter id="noise404">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves={1} stitchTiles="stitch" />
            <feBlend mode="screen" />
          </filter>
          <rect className="size-full" filter="url(#noise404)" opacity="0.12" />
        </svg>
      </div>

      {/* Logo top-left */}
      <div ref={logoRef} className="padding-x absolute top-6 left-0 z-20 w-full">
        <Link href="/" aria-label="Belal Aboseada — home" className="w-fit">
          <Logo
            variant="horizontal"
            className="text-flax-smoke-100 text-base md:text-xl"
          />
        </Link>
      </div>

      {/* Main content */}
      <div className="relative z-20 flex flex-col items-center gap-6 text-center padding-x">

        {/* Giant floating 404 */}
        <p
          ref={numRef}
          className="font-title leading-none font-extrabold text-flax-smoke-800 select-none"
          style={{ fontSize: 'clamp(8rem, 25vw, 22rem)' }}
          aria-hidden="true"
        >
          404
        </p>

        {/* Heading + sub */}
        <div className="-mt-6 flex flex-col items-center gap-3">
          <h1 ref={headingRef} className="font-fancy heading-2 font-bold text-flax-smoke-100">
            Page not found
          </h1>
          <p ref={subRef} className="font-fancy heading-6 max-w-md text-flax-smoke-400">
            Looks like you wandered off the map. This page doesn&apos;t exist.
          </p>
        </div>

        {/* Go Home — exact same hover animation as Button component */}
        <Link
          ref={btnRef}
          href="/"
          className="group pointer-events-auto relative mt-4 overflow-clip rounded-full bg-flax-smoke-100 px-8 py-3 text-sm font-semibold uppercase text-flax-smoke-950"
        >
          <span
            style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
            className="flex-center absolute bottom-0 left-0 z-10 size-full translate-y-full text-nowrap rounded-t-[15rem] bg-flax-smoke-500 font-fancy text-flax-smoke-100 transition-all duration-700 group-hover:translate-y-0 group-hover:rounded-none"
          >
            Go Home
          </span>
          <span className="flex-center relative z-20 font-fancy">
            <span
              style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
              className="text-nowrap font-fancy transition-all duration-700 group-hover:-translate-y-full"
            >
              Go Home
            </span>
          </span>
        </Link>
      </div>

      {/* Bottom watermark */}
      <p
        ref={bottomRef}
        className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 font-fancy text-xs uppercase tracking-widest text-flax-smoke-700"
      >
        belalaboseada.vercel.app
      </p>
    </div>
  );
}