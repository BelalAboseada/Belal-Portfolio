'use client';

import React, { useEffect, useMemo } from 'react';
import { Button } from '../common';
import { Link } from '../common';
import Lottie from 'lottie-react';
import earthLottie from '../../../public/videos/earth.json';
import { textSplitterIntoChar } from '@/lib/utils';
import { animateSplitText } from '@/lib/animations';

export const Contact: React.FC = () => {
  const makeItHappen = useMemo(() => {
    return {
      __html: textSplitterIntoChar("Let's Make it happen"),
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      animateSplitText(
        '#make-it-happen .letters',
        '#make-it-happen',
        1.5,
        0.01,
        0
      );
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="contact-section"
      className="relative min-h-[100dvh] w-full overflow-y-clip p-[4vh] select-none"
    >
      <div className="flex-center relative h-[92vh] w-full flex-col rounded-lg bg-black uppercase">
        <video
          className="absolute bottom-0 left-0 size-full rounded-lg object-cover object-bottom brightness-50"
          src="/videos/contact.mp4"
          autoPlay
          muted
          loop
          playsInline
        ></video>
        <div className="flex-center z-10 flex-col gap-y-10">
          <p className="heading-4 text-flax-smoke-300 max-w-[30ch] text-center font-mono">
            Your design is a masterpiece waiting to become alive.
          </p>
          <h3
            id="make-it-happen"
            className="heading-1 text-flax-smoke-200 max-w-[10ch] text-center leading-none"
            dangerouslySetInnerHTML={makeItHappen}
          ></h3>
          <div className="mt-[5%] flex scale-150 items-center lg:scale-[1.5] xl:scale-[3] 2xl:scale-[3.5]">
            <Button label="Get in touch" url="https://wa.me/967775367671" />
          </div>
        </div>
        <div className="absolute bottom-5 flex w-full items-center justify-center px-5 md:justify-between">
          <div className="hidden md:flex">
            <div className="border-flax-smoke-300 relative border">
              <Lottie
                animationData={earthLottie}
                loop={true}
                autoPlay={true}
                style={{
                  height: '100px',
                  width: 'fit-content',
                  margin: '-10px -30px',
                  padding: 0,
                }}
              />
            </div>
            <div className="flex-center border-flax-smoke-300 text-flax-smoke-300 w-fit flex-col border border-l-0 font-mono">
              <p className="border-flax-smoke-300 flex size-full items-center justify-start border-b pr-2 pl-1 font-bold">
                Working Globally
              </p>
              <p className="flex size-full items-center justify-start pr-2 pl-1">
                Available Sep '24
              </p>
            </div>
          </div>

          {/* Email section removed */}
        </div>
      </div>
    </section>
  );
};
