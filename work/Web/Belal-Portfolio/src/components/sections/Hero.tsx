'use client';

import React, { useMemo } from 'react';
import { MyName, Star } from '../design';
import { Button } from '../common';
import { getAvailableForWorkDate, textSplitterIntoChar } from '@/lib/utils';

export const Hero: React.FC = () => {
  const whoAmI = useMemo(() => {
    return {
      __html: textSplitterIntoChar(
        'A freelance full-stack developer, cutting-edge technologies to deliver comprehensive solutions for your business.'
      ),
    };
  }, []);

  const availableForWorkDate = useMemo(() => getAvailableForWorkDate(), []);

  return (
    <section className="padding-x mb-[-100svh] py-0">
      <div
        id="hero"
        className="sticky top-0 flex min-h-[100svh] w-full items-end pb-[clamp(2.25rem,2.1786rem_+_0.3571vi,2.5rem)]"
      >
        <div className="relative flex w-full flex-col items-center">
          <div className="w-full items-end overflow-clip">
            <div className="flex w-full items-start gap-10">
              <MyName />
              {/* Star component does not explicitly take id, but I passed it in vue. We can wrap it or modify it. 
                  Actually Star just renders a div. We should modify Star to accept id/className if needed. */}
              <div id="star" className="hide-on-mobile translate-x-full">
                <Star />
              </div>
            </div>
          </div>

          <div className="lg:column-gap spacing-t grid w-full grid-cols-12">
            <div className="col-span-full flex flex-col items-start gap-14 sm:col-span-4">
              <div className="overflow-hidden">
                <svg
                  id="down-arrow"
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="1.25"
                  viewBox="6 6 12 12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="hide-on-mobile m-0 size-4 -translate-x-full p-0 md:size-6"
                  color="#8C8C73"
                  style={{ color: '#8c8c73' }}
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line x1="7" y1="7" x2="17" y2="17"></line>
                  <polyline points="17 7 17 17 7 17"></polyline>
                </svg>
              </div>

              <p className="sr-only">
                A freelance full-stack developer, cutting-edge technologies to
                deliver comprehensive solutions for your business.
              </p>
              <p
                id="whoAmI"
                className="who-am-i heading-5 w-full max-w-[30ch] overflow-clip leading-snug font-medium text-balance sm:max-w-[37ch] lg:text-start"
                dangerouslySetInnerHTML={whoAmI}
              ></p>

              <div className="relative origin-left overflow-hidden sm:scale-150">
                <div id="contact-btn" className="flex -translate-y-full">
                  <Button label="Get in touch" url="" />
                </div>
              </div>
            </div>

            <div
              id="profile-container"
              className="relative col-span-4 mt-10 h-[20vh] max-w-lg flex-col rounded-lg select-none sm:mt-0 sm:h-full md:flex md:h-[50vh]"
            >
              <div className="overlay bg-flax-smoke-50 absolute inset-0 z-[2]"></div>
              <img
                id="profile-img"
                src="/images/profile.webp"
                alt="Belal profile"
                className="size-full scale-90 rounded-lg object-cover object- brightness-110 grayscale"
              />
            </div>

            <div className="relative col-span-8 size-full overflow-clip text-end sm:col-span-4">
              <div
                id="available-for-work"
                className="absolute right-0 bottom-0 flex translate-y-full flex-col items-end"
              >
                <p className="3xl:text-base block leading-snug font-medium -tracking-tight uppercase">
                  Available for freelance work
                </p>
                <h3 className="3xl:heading-1 heading-1-alt font-fancy block leading-none font-bold -tracking-tight">
                  {availableForWorkDate}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[100svh]"></div>
    </section>
  );
};
