'use client';

import React, { useEffect, useMemo } from 'react';
import {
  animateSplitText,
  xToZero,
  animateAboutMeSectionLeave,
} from '@/lib/animations';
import { textSplitterIntoChar } from '@/lib/utils';

export const AboutMe: React.FC = () => {
  const aboutMe = useMemo(() => {
    return {
      __html: textSplitterIntoChar(
        'Web Developer, Tech Content Creator/',
        true,
        true
      ),
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      animateSplitText(
        '#little-bit-about-me .letters',
        '#little-bit-about-me',
        1,
        0.01,
        0,
        () => {
          xToZero('#down-arrow-2');
        }
      );

      animateAboutMeSectionLeave('#about-me-section');
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="about-me-section"
      className="common-padding text-flax-smoke-200 relative z-10 overflow-y-clip rounded-b-3xl bg-[#0B0B0A] shadow-2xl will-change-auto sm:mt-0"
    >
      <div className="md:column-gap grid grid-cols-12">
        <div className="hide-on-mobile overflow-hidden md:col-span-4">
          <svg
            id="down-arrow-2"
            stroke="currentColor"
            fill="none"
            strokeWidth="1.25"
            viewBox="6 6 12 12"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="hide-on-mobile m-0 size-20 -translate-x-full p-0"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="7" y1="7" x2="17" y2="17"></line>
            <polyline points="17 7 17 17 7 17"></polyline>
          </svg>
        </div>

        <h3
          id="little-bit-about-me"
          className="heading-1-alt lg:heading-1 section-heading col-span-full leading-none font-extrabold uppercase md:col-span-8 md:col-start-6"
          dangerouslySetInnerHTML={aboutMe}
        ></h3>
      </div>

      <div className="padding-y md:column-gap mt-6 grid grid-cols-12">
        <div className="pointer-events-none col-span-full content-end rounded-lg select-none md:col-span-4">
          <img
            src="/images/profile2.webp"
            className="aspect-[1/1.5] rounded-lg object-cover object-top mix-blend-screen brightness-90 grayscale"
            alt="Headshot of Ebraheem facing a camera"
          />
        </div>
        <div className="col-span-11 mt-10 md:col-span-8 md:col-start-6">
          <p className="heading-4 relative w-full max-w-[40ch] leading-snug font-medium text-balance">
            Web developer specializing in React & Node.js, building SaaS products, and creating Arabic tech content that simplifies complex topics for everyday people.
          </p>

          <div className="text-flax-smoke-300 mt-[5%] flex justify-start gap-10 sm:gap-20">
            <p className="heading-6 text-flax-smoke-300/85 text-center text-nowrap">
              ( ABOUT ME )
            </p>
            <p className="heading-6 font-fancy w-full text-balance sm:max-w-[40ch]">
              I am a Mid-level Web Developer and Junior Mobile Developer. I focus on creating high-quality web experiences and making complex technology easy to understand through my content.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
