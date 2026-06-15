'use client';

import React from 'react';
import { gotoSection, cn } from '@/lib/utils';
import { useLenis } from 'lenis/react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  url?: string;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ label, url, className, ...props }) => {
  const lenis = useLenis();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (url) {
      e.preventDefault();
      gotoSection(url, lenis);
    }
    if (props.onClick) {
      props.onClick(e as any);
    }
  };

  const baseClasses = cn(
    "leading-base group pointer-events-auto relative h-full max-w-full transform-none overflow-clip rounded-full bg-flax-smoke-950 px-5 py-2 text-[1rem] font-semibold uppercase tracking-normal text-flax-smoke-100 sm:text-sm",
    className
  );

  const inner = (
    <>
      <span
        style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
        className="flex-center absolute bottom-0 left-0 z-10 my-auto size-full w-full will-change-auto translate-y-full text-nowrap rounded-t-[15rem] bg-flax-smoke-500 font-fancy transition-all duration-700 group-hover:translate-y-0 group-hover:rounded-none"
      >
        {label}
      </span>
      <span
        style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
        className="flex-center relative z-20 overflow-hidden transition-all after:absolute after:left-0 after:inline-block after:will-change-auto after:translate-y-0 after:text-flax-smoke-200 after:transition-all after:duration-700 after:content-[attr(after)] group-hover:after:-translate-y-[100%]"
      >
        <span
          style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
          className="text-nowrap font-fancy transition-all duration-700 group-hover:-translate-y-full"
        >
          {label}
        </span>
      </span>
    </>
  );

  if (url) {
    return (
      <a id="button" className={baseClasses} href={url} onClick={handleClick}>
        {inner}
      </a>
    );
  }

  return (
    <button id="button" className={baseClasses} onClick={handleClick} {...props}>
      {inner}
    </button>
  );
};