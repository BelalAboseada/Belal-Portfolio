'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const Cursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const inner = innerRef.current;
    if (!cursor || !inner) return;

    const innerX = gsap.quickTo(inner, 'x', {
      duration: 0.65,
      ease: 'power4',
    });
    const innerY = gsap.quickTo(inner, 'y', {
      duration: 0.65,
      ease: 'power4',
    });

    const xCursorTo = gsap.quickTo(cursor, 'x', {
      duration: 0.5,
      ease: 'power4',
    });
    const yCursorTo = gsap.quickTo(cursor, 'y', {
      duration: 0.5,
      ease: 'power4',
    });

    const handleMouseMove = (e: MouseEvent) => {
      xCursorTo(e.clientX + 32);
      yCursorTo(e.clientY + 32);

      innerX(e.clientX + 32);
      innerY(e.clientY + 32);
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="invisible relative z-[99999999] hidden md:visible md:block">
      <div
        id="cursor"
        ref={cursorRef}
        className="fixed z-[100] h-[2.5rem] w-[6rem] origin-center scale-0 rounded-md bg-flax-smoke-500 opacity-0"
      ></div>

      <div
        id="inner"
        ref={innerRef}
        className="fixed left-1.5 top-1.5 z-[101] flex scale-0 object-center text-flax-smoke-50 opacity-0"
      >
        <div className="flex-center size-7 rounded-xs bg-flax-smoke-200 text-flax-smoke-900">
          ⮡
        </div>
        <p className="pl-3.5 pt-0.5">view</p>
      </div>
    </div>
  );
};
