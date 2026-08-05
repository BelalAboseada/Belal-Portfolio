'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { IconType } from 'react-icons';
import {
  RiHome4Line,
  RiHome4Fill,
  RiLinksLine,
  RiLinksFill,
  RiBarChart2Line,
  RiBarChart2Fill,
} from 'react-icons/ri';

// ─── Nav Items ────────────────────────────────────────────────────────────────

const NAV_ITEMS: {
  href: string;
  label: string;
  ActiveIcon: IconType;
  InactiveIcon: IconType;
  exact: boolean;
}[] = [
  {
    href: '/admin',
    label: 'Home',
    ActiveIcon: RiHome4Fill,
    InactiveIcon: RiHome4Line,
    exact: true,
  },
  {
    href: '/admin/links',
    label: 'Links',
    ActiveIcon: RiLinksFill,
    InactiveIcon: RiLinksLine,
    exact: false,
  },
  {
    href: '/admin/analysis',
    label: 'Analysis',
    ActiveIcon: RiBarChart2Fill,
    InactiveIcon: RiBarChart2Line,
    exact: false,
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-[#0B0B0A]/95 backdrop-blur-sm border-t border-flax-smoke-900">
      <div className="flex items-stretch justify-around max-w-3xl mx-auto px-2 pt-1.5 pb-3">
        {NAV_ITEMS.map(({ href, label, ActiveIcon, InactiveIcon, exact }) => {
          const isActive = exact ? pathname === href : pathname.startsWith(href);
          const IconComponent = isActive ? ActiveIcon : InactiveIcon;

          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-1 flex-1 py-2 rounded-xl transition-colors ${
                isActive
                  ? 'text-flax-smoke-100'
                  : 'text-flax-smoke-600 hover:text-flax-smoke-400 active:text-flax-smoke-300'
              }`}
            >
              {/* Active indicator dot */}
              <span
                className={`block w-1 h-1 rounded-full mb-0.5 transition-opacity ${
                  isActive ? 'bg-flax-smoke-400 opacity-100' : 'opacity-0'
                }`}
              />
              <IconComponent size={22} aria-hidden="true" />
              <span
                className={`text-xs font-fancy font-medium transition-colors ${
                  isActive ? 'text-flax-smoke-100' : 'text-flax-smoke-700'
                }`}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
