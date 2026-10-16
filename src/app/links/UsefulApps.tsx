'use client';

import { useEffect, useRef, useState } from 'react';
import { FaApple, FaGooglePlay } from 'react-icons/fa';
import { FiGlobe, FiX } from 'react-icons/fi';

// ─── Data ────────────────────────────────────────────────────────────────────

interface StoreLinks {
  appStore?: string;
  googlePlay?: string;
  web?: string;
}

interface UsefulApp {
  id: string;
  name: string;
  description: string;
  logos: { src: string; alt: string }[];
  /** One entry per downloadable app — the Not Boring group ships three. */
  downloads: { label?: string; links: StoreLinks }[];
}

/**
 * Apps featured in the "Useful Apps | 2026" YouTube video.
 * Hard-coded rather than stored in Supabase because this link opens a popup
 * instead of navigating, so it doesn't fit the flat `links` table.
 */
const USEFUL_APPS: UsefulApp[] = [
  {
    id: 'cosmos',
    name: 'Cosmos',
    description:
      'A calm, ad-free home for visual inspiration. Search by color, keyword or image, save in one tap and build shared moodboards.',
    logos: [{ src: '/images/apps/cosmos.jpg', alt: 'Cosmos app icon' }],
    downloads: [
      {
        links: {
          appStore: 'https://apps.apple.com/app/id1577975475',
          web: 'https://www.cosmos.so',
        },
      },
    ],
  },
  {
    id: 'not-boring',
    name: '!Camera · !Weather · !Habits · !Calculator',
    description:
      'Award-winning everyday apps from Not Boring Software — tactile 3D interfaces that make photos, forecasts, habits and quick maths actually fun.',
    logos: [
      { src: '/images/apps/not-boring-camera.jpg', alt: '!Camera app icon' },
      { src: '/images/apps/not-boring-weather.jpg', alt: '!Weather app icon' },
      { src: '/images/apps/not-boring-habits.jpg', alt: '!Habits app icon' },
      { src: '/images/apps/not-boring-calculator.jpg', alt: '!Calculator app icon' },
    ],
    downloads: [
      { label: '!Camera', links: { appStore: 'https://apps.apple.com/app/id6737783441' } },
      { label: '!Weather', links: { appStore: 'https://apps.apple.com/app/id1531063436' } },
      { label: '!Habits', links: { appStore: 'https://apps.apple.com/app/id1593891243' } },
      { label: '!Calculator', links: { appStore: 'https://apps.apple.com/app/id1533591596' } },
    ],
  },
  {
    id: 'blip',
    name: 'Blip',
    description:
      'Send files of any size straight between your phone and computer — no cloud uploads, no size limits, just one click.',
    logos: [{ src: '/images/apps/blip.jpg', alt: 'Blip app icon' }],
    downloads: [
      {
        links: {
          appStore: 'https://apps.apple.com/app/id6463305181',
          googlePlay: 'https://play.google.com/store/apps/details?id=net.blip.android',
        },
      },
    ],
  },
  {
    id: 'anybox',
    name: 'Anybox',
    description:
      'A fast bookmark and read-later manager for iPhone, iPad and Mac, with tags, smart lists and Spotlight search.',
    logos: [{ src: '/images/apps/anybox.jpg', alt: 'Anybox app icon' }],
    downloads: [{ links: { appStore: 'https://apps.apple.com/app/id1593408455' } }],
  },
  {
    id: 'say',
    name: 'Say',
    description:
      'An AI expense tracker that logs your spending automatically from bank SMS, notifications and Apple Pay — or just say it out loud.',
    logos: [{ src: '/images/apps/say.jpg', alt: 'Say app icon' }],
    downloads: [
      {
        links: {
          appStore: 'https://apps.apple.com/app/id6746735689',
          googlePlay: 'https://play.google.com/store/apps/details?id=com.moments.expenses',
          web: 'https://www.sayapp.net',
        },
      },
    ],
  },
];

// ─── Pieces ──────────────────────────────────────────────────────────────────

function AppLogos({ app, size = 'size-14' }: { app: UsefulApp; size?: string }) {
  if (app.logos.length === 0) {
    return (
      <div
        className={`${size} flex-center shrink-0 rounded-2xl bg-flax-smoke-800 font-fancy text-xl font-bold text-flax-smoke-200`}
        aria-hidden="true"
      >
        {app.name.charAt(0)}
      </div>
    );
  }

  return (
    <div className="flex shrink-0">
      {app.logos.map((logo, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={logo.src}
          src={logo.src}
          alt={logo.alt}
          width={56}
          height={56}
          loading="lazy"
          className={`${size} rounded-2xl ring-2 ring-[#0B0B0A] ${i > 0 ? (app.logos.length > 2 ? '-ml-9' : '-ml-5') : ''}`}
        />
      ))}
    </div>
  );
}

const storeButton =
  'inline-flex items-center gap-2 rounded-full border border-flax-smoke-600 px-4 py-2 text-sm font-fancy font-semibold text-flax-smoke-100 transition-[background-color,color,border-color] duration-300 hover:border-flax-smoke-200 hover:bg-flax-smoke-200 hover:text-flax-smoke-950';

function StoreButtons({ label, links }: { label?: string; links: StoreLinks }) {
  const prefix = label ? `${label} — ` : '';
  const hasAny = links.appStore || links.googlePlay || links.web;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {label && (
        <span className="mr-1 min-w-24 font-fancy text-sm font-bold text-flax-smoke-300">
          {label}
        </span>
      )}
      {links.appStore && (
        <a
          href={links.appStore}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${prefix}Download on the App Store`}
          className={storeButton}
        >
          <FaApple aria-hidden="true" className="size-4" />
          App Store
        </a>
      )}
      {links.googlePlay && (
        <a
          href={links.googlePlay}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${prefix}Get it on Google Play`}
          className={storeButton}
        >
          <FaGooglePlay aria-hidden="true" className="size-3.5" />
          Google Play
        </a>
      )}
      {links.web && (
        <a
          href={links.web}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${prefix}Open on the web`}
          className={storeButton}
        >
          <FiGlobe aria-hidden="true" className="size-4" />
          Web
        </a>
      )}
      {!hasAny && (
        <span className="rounded-full border border-dashed border-flax-smoke-700 px-4 py-2 text-sm font-fancy text-flax-smoke-500">
          Links coming soon
        </span>
      )}
    </div>
  );
}

// ─── Main ────────────────────────────────────────────────────────────────────

/**
 * "Useful Apps | 2026" custom link for the /links page.
 * Renders a row styled like the product links; clicking it opens a modal
 * listing each app with its logo, description and store download links.
 */
export default function UsefulApps() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();

    document.body.classList.toggle('stop-scrolling', open);
    return () => document.body.classList.remove('stop-scrolling');
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className="group flex w-full cursor-pointer items-center justify-between gap-4 rounded-2xl border border-flax-smoke-600 p-4 text-left transition-[background-color,color] duration-500 ease-in-out hover:bg-flax-smoke-300 hover:text-flax-smoke-900"
      >
        <div className="flex min-w-0 items-center gap-4">
          <div className="flex shrink-0">
            {USEFUL_APPS.flatMap((app) => app.logos.slice(0, 1))
              .map((logo, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={logo.src}
                  src={logo.src}
                  alt=""
                  width={48}
                  height={48}
                  className={`size-10 rounded-xl ring-2 ring-[#0B0B0A] transition-shadow duration-500 group-hover:ring-flax-smoke-300 md:size-12 ${i > 0 ? '-ml-5 md:-ml-6' : ''}`}
                />
              ))}
          </div>
          <span className="heading-5 truncate font-fancy font-bold">Useful Apps | 2026</span>
        </div>
        <span className="shrink-0 rounded-full border border-flax-smoke-600 px-4 py-2 font-fancy text-sm group-hover:border-flax-smoke-900">
          {USEFUL_APPS.length} Apps
        </span>
      </button>

      <dialog
        ref={dialogRef}
        onClose={() => setOpen(false)}
        onClick={(e) => {
          // Clicks on the ::backdrop land on the <dialog> element itself
          if (e.target === e.currentTarget) setOpen(false);
        }}
        aria-labelledby="useful-apps-title"
        data-lenis-prevent
        className="m-auto max-h-[85svh] w-[calc(100%-2rem)] max-w-xl overflow-hidden rounded-3xl border border-flax-smoke-800 bg-[#0B0B0A] p-0 text-flax-smoke-200 opacity-0 transition-[opacity,translate,overlay,display] transition-discrete duration-300 ease-out backdrop:bg-black/70 backdrop:backdrop-blur-sm open:translate-y-0 open:opacity-100 starting:open:translate-y-4 starting:open:opacity-0"
      >
        <div className="flex max-h-[85svh] flex-col">
          <header className="flex items-center justify-between gap-4 border-b border-flax-smoke-800 px-6 py-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-flax-smoke-500">
                ( From the video )
              </p>
              <h2 id="useful-apps-title" className="heading-5 font-fancy font-bold text-flax-smoke-50">
                Useful Apps | 2026
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="flex-center size-10 shrink-0 cursor-pointer rounded-full border border-flax-smoke-700 text-flax-smoke-300 transition-colors hover:bg-flax-smoke-200 hover:text-flax-smoke-950"
            >
              <FiX aria-hidden="true" className="size-5" />
            </button>
          </header>

          <ul className="flex flex-col divide-y divide-flax-smoke-800 overflow-y-auto overscroll-contain px-6">
            {USEFUL_APPS.map((app, index) => (
              <li key={app.id} className="flex flex-col gap-4 py-6">
                <div className="flex items-start gap-4">
                  <AppLogos app={app} />
                  <div className="min-w-0">
                    <p className="font-fancy text-xs font-semibold text-flax-smoke-500">
                      {String(index + 1).padStart(2, '0')}
                    </p>
                    <h3 className="font-fancy text-xl font-bold text-flax-smoke-50">{app.name}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-flax-smoke-400">
                      {app.description}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  {app.downloads.map((download, i) => (
                    <StoreButtons key={download.label ?? i} label={download.label} links={download.links} />
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </dialog>
    </>
  );
}
