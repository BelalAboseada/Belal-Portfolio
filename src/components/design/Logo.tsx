import React from 'react';
import { cn } from '@/lib/utils';
import { BrandMark } from './BrandMark';

type LogoProps = {
  /** `mark` = monogram only. `horizontal` / `vertical` = monogram + wordmark lockup. */
  variant?: 'mark' | 'horizontal' | 'vertical';
  /** Show the "Developer by day, creator by night" tagline under the wordmark. */
  tagline?: boolean;
  className?: string;
  /** Extra classes for the monogram itself (sizing lives here, e.g. `text-[2rem]`). */
  markClassName?: string;
};

/**
 * Brand lockups per the visual identity guidelines: the mark is always one flat
 * colour and the wordmark is live Bricolage Grotesque — Bold 700 at +170 tracking,
 * tagline Medium 500 at +300. Both inherit `currentColor` from the parent.
 */
export const Logo: React.FC<LogoProps> = ({
  variant = 'horizontal',
  tagline = false,
  className,
  markClassName,
}) => {
  if (variant === 'mark') {
    return (
      <BrandMark
        title="Belal Aboseada"
        className={cn('h-[1.1em] w-auto', markClassName, className)}
      />
    );
  }

  const isVertical = variant === 'vertical';

  return (
    <span
      className={cn(
        'flex select-none',
        isVertical
          ? 'flex-col items-center gap-[0.55em] text-center'
          : 'flex-row items-center gap-[0.5em]',
        className
      )}
    >
      <BrandMark className={cn('h-[1.6em] w-auto shrink-0', markClassName)} />
      <span className={cn('flex flex-col', isVertical ? 'items-center' : 'items-start')}>
        <span className="font-fancy leading-none font-bold uppercase tracking-[0.17em]">
          elal Aboseada
        </span>
        {tagline && (
          <span className="font-fancy mt-[0.5em] text-[0.5em] leading-none font-medium uppercase tracking-[0.3em] opacity-70">
            Developer by day, creator by night
          </span>
        )}
      </span>
    </span>
  );
};
