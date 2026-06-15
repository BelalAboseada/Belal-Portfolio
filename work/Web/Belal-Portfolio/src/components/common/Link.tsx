'use client';

import React from 'react';
import { gotoSection, cn } from '@/lib/utils';
import { useLenis } from 'lenis/react';

type LinkTag = 'p' | 'li';

interface LinkProps extends React.HTMLAttributes<HTMLElement> {
  tag?: LinkTag;
  label: string;
  url: string;
  icon?: boolean;
}

export const Link: React.FC<LinkProps> = ({ tag = 'p', label, url, icon = false, className, ...props }) => {
  const lenis = useLenis();
  const Component: LinkTag = tag;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    gotoSection(url, lenis);
  };

  const SvgIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      role="img"
      className="-scale-x-75 scale-y-75 fill-current"
    >
      <path
        d="M7.82834 17.2929L10.1213 19.586L8.70709 21.0001L4 16.2929L8.7071 11.5858L10.1213 13L7.82844 15.2929L18 15.2928L17.9999 3H19.9999L20 16.2928C20 16.8451 19.5523 17.2928 19 17.2928L7.82834 17.2929Z"
      ></path>
    </svg>
  );

  return (
    <Component className={cn("h-[2ch] w-fit overflow-y-hidden select-none max-md:h-5", className)} {...props}>
      <a onClick={handleClick} href={url} className="group cursor-pointer">
        <p
          className={cn(
            "font-fancy -translate-y-0 transition-all duration-300 ease-in-out will-change-auto group-hover:translate-y-[-100%]",
            { flex: icon }
          )}
        >
          {icon && <SvgIcon />}
          {label}
        </p>
        <p
          className={cn(
            "font-fancy transition-all duration-300 ease-in-out will-change-auto group-hover:translate-y-[-100%]",
            { flex: icon }
          )}
        >
          {icon && <SvgIcon />}
          {label}
        </p>
      </a>
    </Component>
  );
};
