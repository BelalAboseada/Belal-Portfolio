'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollToPlugin, ScrollTrigger } from 'gsap/all';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);
}

const createMarquee = (
  container: HTMLElement,
  direction: number,
  duration: number
): void => {
  const items = Array.from(container.children) as HTMLElement[];

  const cloneCount = 2;
  for (let i = 0; i < cloneCount; i++) {
    Array.from(items).forEach((item) => {
      let clone = item.cloneNode(true) as HTMLElement;
      container.appendChild(clone);
    });
  }

  // We need to wait for layout in React sometimes, but usually offsetWidth is fine
  const itemWidth = items[0].clientWidth;
  const totalWidth = itemWidth * items.length * cloneCount;

  // Set initial position based on direction
  const startPosition = direction === 1 ? 0 : totalWidth;

  gsap.set(container, {
    x: -startPosition,
  });

  gsap.to(container, {
    x: direction === 1 ? -totalWidth : 0,
    duration: duration,
    ease: 'none',
    repeat: -1,
  });
};

export const Marquee: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const marquee1Ref = useRef<HTMLDivElement>(null);
  const marquee2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Delay slightly to ensure fonts/layout are loaded before calculating width
    const timer = setTimeout(() => {
      if (marquee1Ref.current) createMarquee(marquee1Ref.current, 1, 50);
      if (marquee2Ref.current) createMarquee(marquee2Ref.current, -1, 50);

      if (sectionRef.current && marquee1Ref.current && marquee2Ref.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            markers: false,
            trigger: sectionRef.current,
            start: 'top center',
            end: '110% center',
            scrub: 0.1,
          },
        });
        tl.fromTo(
          marquee1Ref.current,
          { yPercent: 0 },
          { yPercent: -100 }
        );
        tl.fromTo(
          marquee2Ref.current,
          { yPercent: 0 },
          { yPercent: -100 },
          '<'
        );
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const SvgIcon = () => (
    <svg
      className="ms-10 me-10 fill-current"
      style={{ width: 'var(--heading-display)' }}
      viewBox="0 0 100 101"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M49.8234 1.99099C49.4293 9.09696 46.8886 17.4122 43.0707 24.0426C35.0272 38.01 21.1141 47.4665 5.21739 49.7899C4.1712 49.9394 2.55435 50.1024 1.65761 50.1567C0.747283 50.1975 0 50.279 0 50.3334C0 50.3877 0.747283 50.4692 1.65761 50.51C2.55435 50.5644 4.1712 50.7274 5.21739 50.8769C21.1141 53.2002 35.0272 62.6567 43.0707 76.6241C46.8886 83.2546 49.4293 91.5698 49.8234 98.6758C49.8641 99.5861 49.9457 100.333 50 100.333C50.0543 100.333 50.1359 99.5861 50.1766 98.6758C50.5707 91.5698 53.1114 83.2546 56.9293 76.6241C64.9728 62.6567 78.8859 53.2002 94.7826 50.8769C95.8288 50.7274 97.4456 50.5644 98.3424 50.51C99.2527 50.4692 100 50.3877 100 50.3334C100 50.279 99.2527 50.1975 98.3424 50.1567C97.4456 50.1024 95.8288 49.9394 94.7826 49.7899C78.8859 47.4665 64.9728 38.01 56.9293 24.0426C53.1114 17.4122 50.5707 9.09696 50.1766 1.99099C50.1359 1.08066 50.0543 0.333377 50 0.333377C49.9457 0.333377 49.8641 1.08066 49.8234 1.99099Z" />
    </svg>
  );

  return (
    <section
      ref={sectionRef}
      id="marquee-section"
      className="text-flax-smoke-200 relative mb-50 h-fit w-full overflow-clip leading-none will-change-auto"
    >
      <div
        ref={marquee1Ref}
        id="marquee-1"
        className="flex h-fit translate-y-0 whitespace-nowrap will-change-transform"
        role="marquee"
      >
        {[1, 2].map((_) => (
          <h4
            key={`marquee-item-1-${_}`}
            className="sm:heading-1 flex w-full items-center text-3xl font-bold text-nowrap whitespace-nowrap max-sm:mx-6"
          >
            Web Developer & Tech Content Creator
            <div className="w-fit scale-50 sm:scale-75">
              <SvgIcon />
            </div>
          </h4>
        ))}
      </div>
      <div
        ref={marquee2Ref}
        id="marquee-2"
        className="absolute bottom-0 z-50 flex h-fit translate-y-full whitespace-nowrap will-change-transform"
        role="marquee"
      >
        {[1, 2].map((_) => (
          <h4
            key={`marquee-item-2-${_}`}
            className="sm:heading-1 flex w-full items-center text-3xl font-bold text-nowrap whitespace-nowrap max-sm:mx-6"
          >
            Web Developer & Tech Content Creator
            <div className="mx-2 inline-block scale-50 sm:scale-75">
              <SvgIcon />
            </div>
          </h4>
        ))}
      </div>
    </section>
  );
};
