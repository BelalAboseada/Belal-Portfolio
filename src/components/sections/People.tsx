'use client';

import React from 'react';
import { Slider } from '../design';

export const People: React.FC = () => {
  return (
    <section
      id="testimonials-section"
      className="common-padding relative mx-auto min-h-svh -translate-y-0 overflow-y-clip py-0 will-change-transform"
    >
      <div className="border-flax-smoke-300 grid w-full grid-cols-12 border-b-[1px] pb-[clamp(2.25rem,2.1786rem_+_0.3571vi,2.5rem)]">
        <h3 className="heading-1 max-sm:heading-2 text-flax-smoke-950 col-span-full leading-none font-bold uppercase will-change-auto">
          Don&apos;t take my <br />
          word for it /
        </h3>
        <div className="text-flax-smoke-800 col-span-full mt-[5%] flex justify-end gap-10 sm:gap-20 lg:col-span-10">
          <p className="heading-6 text-center text-nowrap uppercase">
            ( Testimonials )
          </p>
          <p className="heading-6 font-fancy w-full text-balance sm:max-w-[40ch]">
            Here&apos;s what my clients say about our collaboration. Their satisfaction
            and meeting expectations are my top priorities, ensuring the best
            experience possible.
          </p>
        </div>
      </div>

      <Slider />
    </section>
  );
};
