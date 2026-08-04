'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface ServicesCardProps extends React.HTMLAttributes<HTMLDivElement> {
  number: number;
  title: string;
  body: string;
  headings: string[];
  shape: string;
}

export const ServicesCard: React.FC<ServicesCardProps> = ({
  number,
  title,
  body,
  headings,
  shape,
  className,
  ...props
}) => {
  return (
    <div className={className} {...props}>
      <div className="heading-2 max-sm:heading-3 flex grid-cols-12 items-center justify-start gap-5 py-6 text-left font-semibold sm:py-5 md:grid md:justify-between">
        <span className="col-span-2 self-center text-nowrap">
          ( {`0${number}`} )
        </span>
        <h3 className="col-span-6 col-start-5 text-nowrap">{title}</h3>
        <div
          dangerouslySetInnerHTML={{ __html: shape }}
          className="heading-size-3 hidden animate-[spin_10s_linear_infinite] fill-flax-smoke-400/50 lg:block"
        />
      </div>

      <div className="relative flex min-h-[35vh] flex-col place-items-start md:grid md:min-h-[40vh] md:grid-cols-12">
        <div className="heading-4 text-heading-4 col-span-7 col-start-5 flex w-full flex-col gap-y-5">
          <p className="text-balance text-base font-medium text-flax-smoke-300/80 sm:max-w-[40ch]">
            {body}
          </p>

          <div>
            {headings.map((heading, index) => (
              <p
                key={index}
                className={cn(
                  "flex gap-x-3 py-1 font-bold",
                  index === 1 && "border-y border-flax-smoke-500/50 py-1.5!"
                )}
              >
                <span className="self-center font-mono text-base font-medium text-flax-smoke-500/70">
                  {(index + 1).toString().padStart(2, '0')}
                </span>
                {heading}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
