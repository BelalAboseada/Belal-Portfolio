'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  RiShoppingBag3Fill,
  RiSmartphoneFill,
  RiLinksFill,
  RiBarChart2Fill,
} from 'react-icons/ri';

// ─── Types ────────────────────────────────────────────────────────────────────

interface LinkRecord {
  id: string;
  category: 'social' | 'product';
  label: string;
  url: string;
  visit_count: number;
  is_active: boolean;
  sort_order: number;
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  sub,
  highlight,
}: {
  label: string;
  value: string | number;
  sub?: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl p-4 border ${
        highlight
          ? 'bg-emerald-500/10 border-emerald-500/30'
          : 'bg-[#111110] border-flax-smoke-900'
      }`}
    >
      <p className="font-fancy text-flax-smoke-600 text-xs uppercase tracking-widest mb-1">
        {label}
      </p>
      <p
        className={`font-fancy text-2xl font-bold ${
          highlight ? 'text-emerald-300' : 'text-flax-smoke-100'
        }`}
      >
        {value}
      </p>
      {sub && (
        <p className="font-fancy text-flax-smoke-600 text-xs mt-1">{sub}</p>
      )}
    </div>
  );
}

// ─── Leaderboard Row ─────────────────────────────────────────────────────────

function LeaderboardRow({
  rank,
  link,
  maxVisits,
  accent,
}: {
  rank: number;
  link: LinkRecord;
  maxVisits: number;
  accent?: boolean;
}) {
  const pct = maxVisits > 0 ? Math.round((link.visit_count / maxVisits) * 100) : 0;
  const isTop3 = rank <= 3;

  return (
    <div className="py-3 border-b border-flax-smoke-900 last:border-0">
      <div className="flex items-center gap-2.5 mb-1.5">
        <span className="shrink-0 w-6 text-center">
          <span className={`font-fancy text-xs ${isTop3 ? 'text-flax-smoke-300 font-bold' : 'text-flax-smoke-600'}`}>
            #{rank}
          </span>
        </span>
        <span className="font-fancy font-semibold text-flax-smoke-100 text-sm flex-1 truncate">
          {link.label}
        </span>
        <span
          className={`font-fancy text-xs font-bold shrink-0 ${
            accent ? 'text-emerald-400' : 'text-flax-smoke-400'
          }`}
        >
          {link.visit_count.toLocaleString()}
          <span className="font-normal text-flax-smoke-700 ml-1">clicks</span>
        </span>
      </div>
      <div className="ml-8 h-1 bg-flax-smoke-900 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${
            accent ? 'bg-emerald-500' : 'bg-flax-smoke-500'
          }`}
          style={{ width: `${pct || (link.visit_count === 0 ? 0 : 2)}%` }}
        />
      </div>
    </div>
  );
}

// ─── Empty leaderboard state ──────────────────────────────────────────────────

function EmptyLeaderboard({ message }: { message: string }) {
  return (
    <div className="py-8 text-center">
      <p className="font-fancy text-flax-smoke-700 text-sm">{message}</p>
      <p className="font-fancy text-flax-smoke-800 text-xs mt-1">
        Clicks appear here after visitors use your /links page.
      </p>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminHomePage() {
  const router = useRouter();
  const [links, setLinks] = useState<LinkRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    fetch('/api/admin/links')
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data: LinkRecord[]) => setLinks(data))
      .catch(() => setError('Failed to load data.'))
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    setLoggingOut(true);
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  // ── Derived stats ──────────────────────────────────────────────────────────
  const social = links.filter((l) => l.category === 'social');
  const products = links.filter((l) => l.category === 'product');
  const totalClicks = links.reduce((s, l) => s + (l.visit_count ?? 0), 0);
  const activeCount = links.filter((l) => l.is_active).length;

  const topProducts = [...products]
    .sort((a, b) => (b.visit_count ?? 0) - (a.visit_count ?? 0))
    .slice(0, 5);

  const topSocial = [...social]
    .sort((a, b) => (b.visit_count ?? 0) - (a.visit_count ?? 0))
    .slice(0, 5);

  const maxProductVisits = Math.max(topProducts[0]?.visit_count ?? 0, 1);
  const maxSocialVisits = Math.max(topSocial[0]?.visit_count ?? 0, 1);

  const topOverall = [...links].sort(
    (a, b) => (b.visit_count ?? 0) - (a.visit_count ?? 0),
  )[0];

  return (
    <div className="min-h-screen bg-[#0B0B0A] text-flax-smoke-200">
      {/* ── Header ── */}
      <header className="sticky top-0 z-20 border-b border-flax-smoke-900 bg-[#0B0B0A]/90 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-3 sm:px-4 py-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="hidden sm:inline font-fancy text-flax-smoke-600 text-xs uppercase tracking-widest shrink-0">
              Admin
            </span>
            <span className="hidden sm:inline text-flax-smoke-800">/</span>
            <h1 className="font-fancy text-flax-smoke-100 text-sm font-semibold truncate">
              Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <a
              href="/links"
              target="_blank"
              rel="noopener noreferrer"
              className="font-fancy text-flax-smoke-500 hover:text-flax-smoke-200 text-xs underline underline-offset-2 transition-colors"
              aria-label="View public links page"
            >
              <span className="sm:hidden">↗</span>
              <span className="hidden sm:inline">View public page ↗</span>
            </a>
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="bg-flax-smoke-900 hover:bg-flax-smoke-800 border border-flax-smoke-700 text-flax-smoke-300 rounded-full px-3 sm:px-4 py-2 text-xs font-semibold uppercase font-fancy transition-colors disabled:opacity-50 whitespace-nowrap"
            >
              {loggingOut ? (
                '…'
              ) : (
                <>
                  <span className="sm:hidden">Out</span>
                  <span className="hidden sm:inline">Log out</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ── Content ── */}
      <main className="max-w-3xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
        {loading && (
          <div className="flex items-center justify-center py-24">
            <p className="font-fancy text-flax-smoke-600 text-sm uppercase tracking-widest">
              Loading…
            </p>
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-5 py-4 text-center">
            <p className="font-fancy text-red-400 text-sm">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="flex flex-col gap-5">
            {/* ── Greeting ── */}
            <div className="mb-1">
              <p className="font-fancy text-flax-smoke-600 text-xs uppercase tracking-widest mb-1">
                Welcome back
              </p>
              <h2 className="font-fancy text-flax-smoke-100 text-xl sm:text-2xl font-bold">
                Belal &copy;
              </h2>
              {topOverall && topOverall.visit_count > 0 && (
                <p className="font-fancy text-flax-smoke-500 text-xs mt-1">
                  🔥 Top link:{' '}
                  <span className="text-flax-smoke-300 font-semibold">
                    {topOverall.label}
                  </span>{' '}
                  with {topOverall.visit_count.toLocaleString()} clicks
                </p>
              )}
            </div>

            {/* ── Stat cards ── */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <StatCard
                label="Total Links"
                value={links.length}
                sub={`${activeCount} active`}
              />
              <StatCard
                label="Total Clicks"
                value={totalClicks.toLocaleString()}
                highlight={totalClicks > 0}
                sub={totalClicks === 0 ? 'No clicks yet' : 'All time'}
              />
              <StatCard
                label="Products"
                value={products.length}
                sub={`${products.filter((l) => l.is_active).length} active`}
              />
              <StatCard
                label="Social"
                value={social.length}
                sub={`${social.filter((l) => l.is_active).length} active`}
              />
            </div>

            {/* ── Top Products — FEATURED ── */}
            <section className="bg-[#111110] rounded-2xl border border-flax-smoke-900 overflow-hidden">
              {/* Section header with accent strip */}
              <div className="bg-emerald-500/10 border-b border-emerald-500/20 px-4 sm:px-5 py-4 flex items-center justify-between">
                <div>
                  <p className="font-fancy text-emerald-600 text-xs uppercase tracking-widest mb-0.5">
                    Most Visited
                  </p>
                  <h2 className="font-fancy text-flax-smoke-100 font-bold text-base sm:text-lg">
                    Products Leaderboard
                  </h2>
                </div>
                <RiShoppingBag3Fill className="text-3xl text-emerald-500 opacity-80" aria-hidden="true" />
              </div>
              <div className="px-4 sm:px-5 pb-2">
                {topProducts.length === 0 || topProducts[0].visit_count === 0 ? (
                  <EmptyLeaderboard message="No product clicks tracked yet." />
                ) : (
                  topProducts.map((link, i) => (
                    <LeaderboardRow
                      key={link.id}
                      rank={i + 1}
                      link={link}
                      maxVisits={maxProductVisits}
                      accent
                    />
                  ))
                )}
              </div>
            </section>

            {/* ── Top Social ── */}
            <section className="bg-[#111110] rounded-2xl border border-flax-smoke-900 overflow-hidden">
              <div className="border-b border-flax-smoke-900 px-4 sm:px-5 py-4 flex items-center justify-between">
                <div>
                  <p className="font-fancy text-flax-smoke-600 text-xs uppercase tracking-widest mb-0.5">
                    Most Visited
                  </p>
                  <h2 className="font-fancy text-flax-smoke-100 font-bold text-base sm:text-lg">
                    Social Leaderboard
                  </h2>
                </div>
                <RiSmartphoneFill className="text-3xl text-flax-smoke-500 opacity-80" aria-hidden="true" />
              </div>
              <div className="px-4 sm:px-5 pb-2">
                {topSocial.length === 0 || topSocial[0].visit_count === 0 ? (
                  <EmptyLeaderboard message="No social clicks tracked yet." />
                ) : (
                  topSocial.map((link, i) => (
                    <LeaderboardRow
                      key={link.id}
                      rank={i + 1}
                      link={link}
                      maxVisits={maxSocialVisits}
                    />
                  ))
                )}
              </div>
            </section>

            {/* ── Quick Actions ── */}
            <section>
              <p className="font-fancy text-flax-smoke-600 text-xs uppercase tracking-widest mb-3">
                Quick Actions
              </p>
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/admin/links"
                  className="group bg-[#111110] border border-flax-smoke-900 hover:border-flax-smoke-700 rounded-2xl p-4 sm:p-5 flex flex-col items-center gap-2 text-center transition-all"
                >
                  <RiLinksFill className="text-3xl text-flax-smoke-600 group-hover:text-flax-smoke-400 transition-colors" aria-hidden="true" />
                  <p className="font-fancy text-flax-smoke-400 group-hover:text-flax-smoke-100 text-sm font-semibold transition-colors">
                    Manage Links
                  </p>
                  <p className="font-fancy text-flax-smoke-700 text-xs">
                    Add · Edit · Reorder
                  </p>
                </Link>

                <Link
                  href="/admin/analysis"
                  className="group bg-[#111110] border border-flax-smoke-900 hover:border-flax-smoke-700 rounded-2xl p-4 sm:p-5 flex flex-col items-center gap-2 text-center transition-all"
                >
                  <RiBarChart2Fill className="text-3xl text-flax-smoke-600 group-hover:text-flax-smoke-400 transition-colors" aria-hidden="true" />
                  <p className="font-fancy text-flax-smoke-400 group-hover:text-flax-smoke-100 text-sm font-semibold transition-colors">
                    Full Analysis
                  </p>
                  <p className="font-fancy text-flax-smoke-700 text-xs">
                    Breakdown · Trends
                  </p>
                </Link>
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}
