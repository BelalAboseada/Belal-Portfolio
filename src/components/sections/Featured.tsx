'use client';

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import gsap from 'gsap';
import { useWindowSize } from '@/lib/hooks';
import { textSplitterIntoChar } from '@/lib/utils';
import { animateSplitText } from '@/lib/animations';
import { RiInstagramFill, RiPlayCircleLine } from 'react-icons/ri';
import dynamic from 'next/dynamic';
import { ArcflowLoader } from '../design/ArcflowLoader';

// Client-only: lottie-web touches the DOM at import time.
const ComingSoonTile = dynamic(
  () => import('../design/ComingSoonTile').then((m) => m.ComingSoonTile),
  { ssr: false }
);


export const Featured: React.FC = () => {
  const { width } = useWindowSize();
  const isSmallScreen = width < 768;
  const [index, setIndex] = useState(0);

  const featuredTitle = useMemo(() => {
    return { __html: textSplitterIntoChar('Featured / ', true) };
  }, []);

  const featuredItems = useMemo(() => [
    {
      type: 'arcflow',
      name: 'Arcflow',
      category: '',
      tags: ['Coming Soon'],
      url: 'https://arcflow.digital/',
      year: '2026',
    },
    {
      type: 'coming-soon',
      name: 'Coming Soon',
      category: 'Something new is in the works.',
      tags: ['In Progress'],
      url: '#',
      year: '2026',
    },
  ], []);

  const createForwardTimeline = useCallback((i: number) => {
    const tl = gsap.timeline({ defaults: { duration: 0.3 } });
    tl.set('#featured-index', {
      yPercent: 100,
      onComplete: () => {
        setIndex(Math.min(i, featuredItems.length - 1));
      },
    }).to('#featured-index', {
      yPercent: 0,
      ease: 'power1.inOut',
    });
    return tl;
  }, [featuredItems.length]);

  const createBackwardTimeline = (i: number) => {
    const tl = gsap.timeline({ defaults: { duration: 0.3 } });
    tl.set('#featured-index', {
      yPercent: -100,
      onComplete: () => {
        setIndex(Math.max(i, 0));
      },
    }).to('#featured-index', {
      yPercent: 0,
      ease: 'power1.inOut',
    });
    return tl;
  };


  useEffect(() => {
    setTimeout(() => {
      animateSplitText(
        '#featuredTitle .letters',
        '#featured-text',
        0.7,
        0.01,
        0
      );

      if (!isSmallScreen) {
        (gsap.utils.toArray('.featured-card') as Element[]).forEach((div, i) => {
          gsap.timeline({ defaults: { duration: 0.7 } }).to(div, {
            scrollTrigger: {
              trigger: div,
              start: 'top 25%',
              end: 'bottom 25%',
              scrub: 0.01,
              onLeaveBack: () => {
                setIndex((prev) => {
                  if (prev !== 0) {
                    gsap.to('#featured-index', {
                      yPercent: 100,
                      duration: 0.3,
                      ease: 'power4.inOut',
                      onComplete: () => {
                        createBackwardTimeline(i - 1);
                      },
                    });
                  }
                  return prev;
                });
              },
            },
            ease: 'power1.inOut',
            onComplete: () => {
              setIndex((prev) => {
                if (prev !== featuredItems.length - 1) {
                  gsap.to('#featured-index', {
                    yPercent: -100,
                    duration: 0.3,
                    ease: 'power4.inOut',
                    onComplete: () => {
                      createForwardTimeline(i + 1);
                    },
                  });
                }
                return prev;
              });
            },
          });
        });
      }
    }, 100);
  }, [isSmallScreen, featuredItems.length, createForwardTimeline]);

  return (
    <section id="featured" className="common-padding mb-20">
      <div className="flex flex-col">
          <h3
            id="featuredTitle"
            className="heading-1 text-start leading-none font-bold uppercase"
            dangerouslySetInnerHTML={featuredTitle}
          ></h3>
          <div
            id="featured-text"
            className="md:column-gap text-flax-smoke-300 mt-[5%] grid grid-cols-12 justify-end opacity-0 lg:grid"
          >
            <p className="heading-6 text-flax-smoke-300/85 col-span-4 text-center text-nowrap lg:col-start-2">
              ( PRODUCTS )
            </p>
            <p className="heading-4 font-fancy col-span-8 w-full text-balance sm:font-semibold lg:col-span-7">
              My own products — designed, built, and shipped by me.
            </p>
          </div>
        </div>

        <div className="sm:column-gap relative mt-12 grid size-full grid-cols-12 lg:mt-[10%]">
          <div className="text-flax-smoke-100 sticky top-12 col-span-5 hidden h-fit w-full overflow-hidden text-[22vw] leading-[0.8] font-semibold md:flex">
            <span className="font-title! relative -tracking-wider">0</span>
            <span
              id="featured-index"
              className="font-title! relative -tracking-wider will-change-transform"
            >
              {index + 1}.
            </span>
          </div>
          <aside
            className="relative col-span-full flex flex-col space-y-10 md:col-span-7"
          >
            {featuredItems.map((item, i) => (
              <div key={i} className="featured-card @container">
                <a className="group" target="_blank" rel="noreferrer" href={item.url}>
                  <div className="flex-center relative aspect-square overflow-clip rounded-lg bg-[#0B0B0A] border border-flax-smoke-900 group-hover:border-flax-smoke-700 transition-colors">
                    {item.type === 'instagram' ? (
                      <div className="size-full flex flex-col items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-linear-to-br from-flax-smoke-900/20 to-transparent opacity-50"></div>
                        <div className="relative z-10 flex flex-col items-center">
                          <div className="w-20 h-20 rounded-full bg-[#111110] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform backdrop-blur-sm border border-flax-smoke-800 shadow-xl">
                            <RiPlayCircleLine className="text-4xl text-flax-smoke-300" aria-hidden="true" />
                          </div>
                          <span className="font-fancy text-flax-smoke-200 text-lg font-semibold flex items-center gap-2">
                            <RiInstagramFill className="text-flax-smoke-400" aria-hidden="true" />
                            Watch Reel
                          </span>
                        </div>
                      </div>
                    ) : item.type === 'arcflow' ? (
                      <div className="size-full flex items-center justify-center relative overflow-hidden">
                         <div className="absolute inset-0 bg-linear-to-br from-flax-smoke-900/10 to-transparent"></div>
                         <ArcflowLoader size={260} className="relative z-10 w-[40cqw]" />
                      </div>
                    ) : (
                      <div className="size-full flex items-center justify-center relative overflow-hidden">
                         <div className="absolute inset-0 bg-linear-to-br from-flax-smoke-900/10 to-transparent"></div>
                         <ComingSoonTile size={260} className="relative z-10 w-[40cqw]" />
                      </div>
                    )}
                  </div>
                  <div>
                    {item.category && (
                      <p className="heading-6 font-title! mt-[2%] mb-[1%] leading-none">
                        {item.category}
                      </p>
                    )}
                    <div className={`items-center justify-between sm:flex ${item.category ? '' : 'mt-[2%]'}`}>
                      <h3 className="heading-3 font-title! font-bold uppercase">
                        {item.name}
                      </h3>
                      <div className="flex gap-1.5 select-none">
                        {item.tags.map((tag) => (
                          <p
                            key={tag}
                            className="border-flax-smoke-300 hover:bg-flax-smoke-300 hover:text-flax-smoke-900 rounded-full border px-4 py-2 transition-[background-color,color] duration-500 ease-in-out"
                          >
                            <span>{tag}</span>
                          </p>
                        ))}
                        <p className="border-flax-smoke-300 bg-flax-smoke-300 text-flax-smoke-900 hover:text-flax-smoke-300 rounded-full border px-4 py-2 transition-[background-color,color] duration-500 ease-in-out hover:bg-transparent">
                          <span>{item.year}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </aside>
        </div>
      </section>
  );
};
