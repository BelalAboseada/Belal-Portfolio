'use client';

import React, { useEffect, useMemo } from 'react';
import { animateSplitText } from '@/lib/animations';
import { textSplitterIntoChar } from '@/lib/utils';
import { ServicesCard } from '../common/ServicesCard';

export const Services: React.FC = () => {
  const whatIDo = useMemo(() => {
    return {
      __html: textSplitterIntoChar('My services /', true),
    };
  }, []);

  const servicesCardProps = [
    {
      title: 'Web Development',
      body: 'I create custom-coded websites specifically for your brand. I focus on making sure they are scalable, fast, accessible, and have engaging animations to provide a memorable experience for users.',
      headings: ['Modern Websites', 'Motion & Animations', 'Scalability'],
      shape: `<svg viewBox="0 0 200 200"  xmlns="http://www.w3.org/2000/svg">
  <path d="M100 0C103.395 53.7596 146.24 96.6052 200 100C146.24 103.395 103.395 146.24 100 200C96.6052 146.24 53.7596 103.395 0 100C53.7596 96.6052 96.6052 53.7596 100 0Z"/>
  </svg>
  `,
    },
    {
      title: 'Advanced Solutions',
      body: 'I specialize in developing advanced web applications that redefine the possibilities of online platforms, crafting progressive web apps and integrating complex systems.',
      headings: [
        'Progressive Web Apps',
        'Complex Integrations',
        'Innovative Tech Solutions',
      ],
      shape: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <path d="M127.14 200C99.9942 200 99.9943 167.423 72.8487 167.423C41.6048 167.423 0 158.386 0 127.133C0 99.9885 32.5678 99.9885 32.5678 72.8445C32.5678 41.6139 41.6048 0 72.8602 0C100.006 0 100.006 32.5774 127.151 32.5774C158.384 32.5774 200 41.6139 200 72.8675C200 100.012 167.421 100.012 167.421 127.156C167.409 158.444 158.384 200 127.14 200Z" />
  </svg>
  `,
    },
    {
      title: 'Code Optimization',
      body: 'Your website deserves to be seen, speed, and responsiveness. By optimizing load times, improving user experiences, I ensure your site runs smoothly and efficiently.',
      headings: [
        'Modern Frameworks',
        'Responsive Design',
        'Speed Optimization',
      ],
      shape: `<svg  viewBox="0 0 200 200"  xmlns="http://www.w3.org/2000/svg">
  <path d="M100 0L170.711 29.2893L200 100L170.711 170.711L100 200L29.2893 170.711L0 100L29.2893 29.2893L100 0Z" />
  </svg>
  `,
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      animateSplitText('#what-i-do .letters', '#services-text', 0.7, 0.01, 0);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const getStyle = (index: number) => {
    if (index === 0) return 'top-[calc(20vh_+_0em)] mb-[17.25em]';
    if (index === 1) return 'top-[calc(20vh_+_5.75em)] mb-[11.5em]';
    if (index === 2) return 'top-[calc(20vh_+_11.5em)] mb-[5.75em]';
    return '';
  };

  return (
    <section id="services" className="padding-x mb-20">
      <div className="flex w-full flex-col">
        <h3
          id="what-i-do"
          className="heading-1 font-extrabold uppercase"
          dangerouslySetInnerHTML={whatIDo}
        ></h3>

        <div
          id="services-text"
          className="grid-gap text-flax-smoke-300 mt-[5%] grid grid-cols-12 justify-end opacity-0 lg:grid"
        >
          <p className="heading-6 text-flax-smoke-300/85 col-span-4 col-start-0 text-center text-nowrap md:col-start-4">
            ( SERVICES )
          </p>
          <p className="heading-4 font-fancy col-span-8 w-full text-balance sm:font-semibold md:col-span-5">
            User-Friendly interface don't happen by chance, they are built with
            intention. I code intuitive responsive solutions that make your users'
            journey effortless
          </p>
        </div>
      </div>

      <div className="relative mt-12 w-full lg:mt-[10%]">
        <div className="mt-12 flex flex-col justify-between gap-y-16">
          {servicesCardProps.map((card, index) => (
            <ServicesCard
              key={index}
              number={index + 1}
              title={card.title}
              body={card.body}
              headings={card.headings}
              shape={card.shape}
              className={`border-flax-smoke-500/50 sticky border-t bg-[#0B0B0A] ${getStyle(index)}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
