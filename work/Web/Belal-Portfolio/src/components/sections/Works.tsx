'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import gsap from 'gsap';
import { useWindowSize } from '@/lib/hooks';
import { textSplitterIntoChar } from '@/lib/utils';
import { animateSplitText } from '@/lib/animations';

export const Works: React.FC = () => {
  const { width } = useWindowSize();
  const isSmallScreen = width < 768;
  const [index, setIndex] = useState(0);

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const cursorTl = useRef<gsap.core.Timeline | null>(null);

  const selectedWorks = useMemo(() => {
    return { __html: textSplitterIntoChar('Selected Works / ', true) };
  }, []);

  const selectedWorksProps = useMemo(() => [
    {
      name: 'Madar',
      category: 'Frontend',
      tags: ['Vue.js', 'Tailwind', 'Gsap'],
      videoSrc: '/videos/work5.webm',
      imageBg: '/images/5.webp',
      url: 'https://madar.services/',
      year: '2025',
    },
    {
      name: 'Iphone 15 Clone',
      category: 'Frontend & Animation & 3D',
      tags: ['Animation', '3D'],
      videoSrc: '/videos/work2.webm',
      imageBg: '/images/2.webp',
      url: '#',
      year: '2024',
    },
    {
      name: 'Axon',
      category: 'Frontend & Documentation',
      tags: ['Vue.js', 'Tailwind', 'AI'],
      videoSrc: '/videos/work3.webm',
      imageBg: '/images/3.webp',
      url: '#',
      year: '2024',
    },
    {
      name: 'Blogy',
      category: 'Frontend & Backend',
      tags: ['Vue.js', 'Laravel'],
      videoSrc: '/videos/work4.webm',
      imageBg: '/images/4.webp',
      url: '#',
      year: '2023',
    },
    {
      name: 'Pyutube',
      category: 'CLI Tool & Cross Platform',
      tags: ['Python', 'CLI', 'Youtube'],
      videoSrc: '/videos/work1.webm',
      imageBg: '/images/1.webp',
      url: '#',
      year: '2024',
    },
  ], []);

  const createForwardTimeline = (i: number) => {
    const tl = gsap.timeline({ defaults: { duration: 0.3 } });
    tl.set('#index', {
      yPercent: 100,
      onComplete: () => {
        setIndex(Math.min(i, selectedWorksProps.length - 1));
      },
    }).to('#index', {
      yPercent: 0,
      ease: 'power1.inOut',
    });
    return tl;
  };

  const createBackwardTimeline = (i: number) => {
    const tl = gsap.timeline({ defaults: { duration: 0.3 } });
    tl.set('#index', {
      yPercent: -100,
      onComplete: () => {
        setIndex(Math.max(i, 0));
      },
    }).to('#index', {
      yPercent: 0,
      ease: 'power1.inOut',
    });
    return tl;
  };

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      const video = entry.target as HTMLVideoElement;
      if (entry.isIntersecting) {
        video.play().catch(() => {});
        video.classList.remove('blur');
      }
    });
  };

  const stopAllVideos = () => {
    videoRefs.current.forEach((video) => {
      if (video && !video.paused) {
        video.pause();
        video.currentTime = 0;
      }
    });
  };

  useEffect(() => {
    cursorTl.current = gsap
      .timeline({ defaults: { duration: 0.25 } })
      .to(['#cursor', '#inner'], { scale: 1, opacity: 1 })
      .paused(true);

    stopAllVideos();

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.75,
    });

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    setTimeout(() => {
      animateSplitText(
        '#selectedWorks .letters',
        '#selected-works-text',
        0.7,
        0.01,
        0
      );

      if (!isSmallScreen) {
        gsap.utils.toArray('.work-card').forEach((div: any, i: any) => {
          gsap.timeline({ defaults: { duration: 0.7 } }).to(div, {
            scrollTrigger: {
              trigger: div,
              start: 'top 25%',
              end: 'bottom 25%',
              scrub: 0.01,
              onLeaveBack: () => {
                setIndex((prev) => {
                  if (prev !== 0) {
                    gsap.to('#index', {
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
                if (prev !== selectedWorksProps.length - 1) {
                  gsap.to('#index', {
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

    return () => observer.disconnect();
  }, [isSmallScreen, selectedWorksProps.length]);

  const showCursor = () => cursorTl.current?.play();
  const hideCursor = () => cursorTl.current?.reverse();

  return (
    <section id="works" className="common-padding mb-20">
      <div className="flex flex-col">
        <h3
          id="selectedWorks"
          className="heading-1 text-start leading-none font-bold uppercase"
          dangerouslySetInnerHTML={selectedWorks}
        ></h3>
        <p className="heading-1 text-flax-smoke-400 text-opacity-50 hidden w-4/5 text-end font-extrabold sm:block">
          ( {selectedWorksProps.length} )
        </p>

        <div
          id="selected-works-text"
          className="md:column-gap text-flax-smoke-300 mt-[5%] grid grid-cols-12 justify-end opacity-0 lg:grid"
        >
          <p className="heading-6 text-flax-smoke-300/85 col-span-4 text-center text-nowrap lg:col-start-2">
            (
            <span className="inline sm:hidden">{selectedWorksProps.length} </span>
            PROJECTS )
          </p>
          <p className="heading-4 font-fancy col-span-8 w-full text-balance sm:font-semibold lg:col-span-7">
            Featured client projects that have been meticulously crafted with
            passion and purpose over the years.
          </p>
        </div>
      </div>

      <div className="sm:column-gap relative mt-12 grid size-full grid-cols-12 lg:mt-[10%]">
        <div className="text-flax-smoke-100 sticky top-12 col-span-5 hidden h-fit w-full overflow-hidden text-[22vw] leading-[0.8] font-semibold md:flex">
          <span className="font-title! relative -tracking-wider">0</span>
          <span
            id="index"
            className="font-title! relative -tracking-wider will-change-transform"
          >
            {index + 1}.
          </span>
        </div>
        <aside
          onMouseEnter={showCursor}
          onMouseLeave={hideCursor}
          className="relative col-span-full flex flex-col space-y-10 md:col-span-7"
        >
          {selectedWorksProps.map((work, i) => (
            <div key={i} className="work-card @container">
              <a className="group" target="_blank" rel="noreferrer" href={work.url}>
                <div className="flex-center relative aspect-square overflow-clip rounded-lg">
                  <img
                    alt="work-background"
                    loading="lazy"
                    className="absolute size-full object-cover select-none"
                    src={work.imageBg}
                  />
                  <div className="flex-center z-10 aspect-4/3 size-full overflow-clip rounded-lg object-cover">
                    <video
                      ref={(el) => {
                        videoRefs.current[i] = el;
                      }}
                      src={work.videoSrc}
                      muted
                      autoPlay={false}
                      className="size-[80%] rounded-md object-contain blur transition-all duration-500 ease-in-out"
                    ></video>
                  </div>
                </div>
                <div>
                  <p className="heading-6 font-title! mt-[2%] mb-[1%] leading-none">
                    {work.category}
                  </p>
                  <div className="items-center justify-between sm:flex">
                    <h3 className="heading-3 font-title! font-bold uppercase">
                      {work.name}
                    </h3>
                    <div className="flex gap-1.5 select-none">
                      {work.tags.map((tag) => (
                        <p
                          key={tag}
                          className="border-flax-smoke-300 hover:bg-flax-smoke-300 hover:text-flax-smoke-900 rounded-full border px-4 py-2 transition-[background-color,color] duration-500 ease-in-out"
                        >
                          <span>{tag}</span>
                        </p>
                      ))}
                      <p className="border-flax-smoke-300 bg-flax-smoke-300 text-flax-smoke-900 hover:text-flax-smoke-300 rounded-full border px-4 py-2 transition-[background-color,color] duration-500 ease-in-out hover:bg-transparent">
                        <span>{work.year}</span>
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
