import React from 'react';
import { cn } from '@/lib/utils';
import { B_MARK_PATH, B_MARK_TRANSFORM, B_MARK_VIEW_BOX } from './b-mark-path';

type BrandMarkProps = React.SVGProps<SVGSVGElement> & {
  /** Accessible label. Omit for a purely decorative mark. */
  title?: string;
};

/**
 * The B monogram from the visual identity, drawn as one flat colour.
 * Inherits `currentColor`, so colour it with a text utility on the parent
 * (e.g. `text-flax-smoke-950`, `text-flax-smoke-50`, `text-flax-smoke-500`).
 * Minimum size per the guidelines: 24px.
 */
export const BrandMark: React.FC<BrandMarkProps> = ({
  className,
  title,
  ...props
}) => (
  <svg
    viewBox={B_MARK_VIEW_BOX}
    xmlns="http://www.w3.org/2000/svg"
    role={title ? 'img' : 'presentation'}
    aria-hidden={title ? undefined : true}
    className={cn('block h-[1em] w-auto', className)}
    {...props}
  >
    {title && <title>{title}</title>}
    <g transform={B_MARK_TRANSFORM}>
      <path d={B_MARK_PATH} fill="currentColor" fillRule="evenodd" />
    </g>
  </svg>
);
