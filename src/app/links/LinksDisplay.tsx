'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { LoadingScreen } from '@/components/design';

interface Link {
  id: string;
  category: 'social' | 'product';
  label: string;
  url: string;
  icon: string | null;
  sort_order: number;
  is_active: boolean;
}

interface Props {
  social: Link[];
  products: Link[];
}

/**
 * Client shell for the public /links page.
 * Handles the loading-screen scroll-lock effect and renders the static markup.
 * Data is fetched server-side by the parent page.tsx and passed in as props.
 */
export default function LinksDisplay({ social, products }: Props) {
  useEffect(() => {
    document.body.classList.add('stop-scrolling');
    const timer = setTimeout(() => {
      document.body.classList.remove('stop-scrolling');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  /** Fire-and-forget click tracking — never blocks navigation */
  const trackClick = (id: string) => {
    fetch(`/api/track/${id}`, { method: 'POST' }).catch(() => {});
  };

  return (
    <>
      <LoadingScreen />
      <main className="relative min-h-screen bg-flax-smoke-50 text-flax-smoke-950">
        {/* TOP NAV-STYLE BAR */}
        <header className="padding-x pt-6 w-full flex justify-between items-center relative z-20">
          <Link href="/" className="group h-fit cursor-pointer">
            <h2 className="font-fancy flex items-start text-xl font-extrabold uppercase md:text-3xl">
              belal
              <span className="font-fancy inline! origin-center! text-xl transition-transform duration-500 ease-in-out group-hover:rotate-[360deg]">
                &copy;
              </span>
            </h2>
          </Link>
        </header>

        {/* HEADER SECTION (Light Block) */}
        <section className="common-padding pt-20 pb-16 md:pt-32 md:pb-24 flex flex-col items-center text-center">
          <h1 className="heading-1-alt font-bold uppercase leading-none mb-6">Find Me /</h1>
          <p className="heading-5 w-full max-w-[35ch] leading-snug font-medium text-balance">
            Software Engineer &times; Tech Content Creator — reviews, AI, and everything tech.
          </p>
        </section>

        {/* LINKS SECTION (Dark Block) */}
        <section className="relative rounded-t-3xl bg-[#0B0B0A] text-flax-smoke-200 py-[10%] px-[5%] flex flex-col items-center">

          {/* SOCIAL LINKS */}
          <div className="w-full max-w-2xl mb-20">
            <p className="heading-6 text-flax-smoke-400 text-center text-nowrap mb-8 font-semibold">
              ( SOCIAL )
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {social.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  onClick={() => trackClick(link.id)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden rounded-full bg-flax-smoke-100 px-6 py-3 text-[1rem] font-semibold uppercase tracking-normal text-flax-smoke-950 sm:text-sm transition-transform hover:scale-105"
                >
                  <span className="relative z-10 font-fancy">{link.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* PRODUCTS SECTION */}
          <div className="w-full max-w-2xl mb-20">
            <p className="heading-6 text-flax-smoke-400 text-center text-nowrap mb-8 font-semibold">
              ( PRODUCTS I REVIEW )
            </p>
            <div className="flex flex-col gap-4">
              {products.map((product) => (
                <a
                  key={product.id}
                  href={product.url}
                  onClick={() => trackClick(product.id)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between border-flax-smoke-600 hover:bg-flax-smoke-300 hover:text-flax-smoke-900 rounded-2xl border p-4 transition-[background-color,color] duration-500 ease-in-out"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-center size-12 overflow-hidden rounded-lg bg-flax-smoke-900/50">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-flax-smoke-400 group-hover:text-flax-smoke-900"
                      >
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                        <polyline points="3.29 7 12 12 20.71 7" />
                        <line x1="12" y1="22" x2="12" y2="12" />
                      </svg>
                    </div>
                    <span className="heading-5 font-fancy font-bold">{product.label}</span>
                  </div>
                  <span className="border-flax-smoke-600 group-hover:border-flax-smoke-900 rounded-full border px-4 py-2 text-sm font-fancy shrink-0">
                    View
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* BOTTOM CTA */}
          <div className="mt-10 mb-20 text-center w-full max-w-2xl">
            <a
              href="mailto:belalaboseada@gmail.com?subject=[Client Name] - Offer"
              className="group inline-flex items-center justify-center rounded-full bg-flax-smoke-500 px-10 py-5 text-xl font-bold uppercase text-flax-smoke-50 transition-transform hover:scale-105 font-fancy"
            >
              Work With Me
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
