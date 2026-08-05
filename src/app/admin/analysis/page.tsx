'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// ─── Types ────────────────────────────────────────────────────────────────────

interface LinkRecord {
  id: string;
  category: 'social' | 'product';
  label: string;
  url: string;
  visit_count: number;
  is_active: boolean;
  sort_order: number;
  created_at: string;
}

// ─── Analysis Bar ─────────────────────────────────────────────────────────────

function AnalysisBar({
  label,
  url,
  count,
  shareOfCategory,
  shareOfTotal,
  maxCount,
  isActive,
  accent,
}: {
  label: string;
  url: string;
  count: number;
  shareOfCategory: number;
  shareOfTotal: number;
  maxCount: number;
  isActive: boolean;
  accent?: boolean;
}) {
  const barPct = maxCount > 0 ? (count / maxCount) * 100 : 0;

  return (
    <div className="py-3 border-b border-flax-smoke-900 last:border-0">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span
              className={`shrink-0 w-1.5 h-1.5 rounded-full ${
                isActive ? 'bg-emerald-500' : 'bg-flax-smoke-700'
              }`}
            />
            <p className="font-fancy font-semibold text-flax-smoke-100 text-sm truncate">
              {label}
            </p>
          </div>
          <p className="font-fancy text-flax-smoke-700 text-xs truncate mt-0.5 ml-3.5">
            {url}
          </p>
        </div>
        <div className="text-right shrink-0">
          <p
            className={`font-fancy text-base font-bold ${
              accent ? 'text-emerald-400' : 'text-flax-smoke-300'
            }`}
          >
            {count.toLocaleString()}
          </p>
          <p className="font-fancy text-flax-smoke-700 text-xs">
            {shareOfCategory.toFixed(1)}% of category
          </p>
        </div>
      </div>

      {/* Bar */}
      <div className="h-1.5 bg-flax-smoke-900 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${
            accent ? 'bg-emerald-500' : 'bg-flax-smoke-500'
          }`}
          style={{ width: `${barPct || (count > 0 ? 2 : 0)}%` }}
        />
      </div>

      <p className="font-fancy text-flax-smoke-800 text-xs mt-1">
        {shareOfTotal.toFixed(2)}% of all traffic
      </p>
    </div>
  );
}

// ─── Overview Tile ────────────────────────────────────────────────────────────

function Tile({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string | number;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-xl p-3 border ${
        accent
          ? 'border-emerald-500/30 bg-emerald-500/5'
          : 'border-flax-smoke-900 bg-[#0d0d0c]'
      }`}
    >
      <p className="font-fancy text-flax-smoke-600 text-xs uppercase tracking-widest mb-1">
        {label}
      </p>
      <p
        className={`font-fancy text-xl font-bold ${
          accent ? 'text-emerald-300' : 'text-flax-smoke-100'
        }`}
      >
        {value}
      </p>
      {sub && (
        <p className="font-fancy text-flax-smoke-600 text-xs mt-0.5">{sub}</p>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminAnalysisPage() {
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

  // ── Derived ────────────────────────────────────────────────────────────────
  const sorted = [...links].sort(
    (a, b) => (b.visit_count ?? 0) - (a.visit_count ?? 0),
  );

  const products = links
    .filter((l) => l.category === 'product')
    .sort((a, b) => (b.visit_count ?? 0) - (a.visit_count ?? 0));

  const social = links
    .filter((l) => l.category === 'social')
    .sort((a, b) => (b.visit_count ?? 0) - (a.visit_count ?? 0));

  const totalClicks = links.reduce((s, l) => s + (l.visit_count ?? 0), 0);
  const productClicks = products.reduce((s, l) => s + (l.visit_count ?? 0), 0);
  const socialClicks = social.reduce((s, l) => s + (l.visit_count ?? 0), 0);
  const activeCount = links.filter((l) => l.is_active).length;
  const inactiveCount = links.length - activeCount;
  const topLink = sorted[0];
  const maxProductVisits = Math.max(products[0]?.visit_count ?? 0, 1);
  const maxSocialVisits = Math.max(social[0]?.visit_count ?? 0, 1);
  const activeRatio = links.length > 0 ? (activeCount / links.length) * 100 : 0;

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
              Analytics
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
            {/* ── Overview ── */}
            <section className="bg-[#111110] rounded-2xl border border-flax-smoke-900 overflow-hidden">
              <div className="px-4 sm:px-5 py-4 border-b border-flax-smoke-900">
                <p className="font-fancy text-flax-smoke-400 text-xs uppercase tracking-widest">
                  Overview
                </p>
              </div>
              <div className="p-3 sm:p-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                <Tile
                  label="Total Clicks"
                  value={totalClicks.toLocaleString()}
                  accent={totalClicks > 0}
                  sub="All links combined"
                />
                <Tile
                  label="Product Clicks"
                  value={productClicks.toLocaleString()}
                  sub={
                    totalClicks > 0
                      ? `${((productClicks / totalClicks) * 100).toFixed(1)}% of traffic`
                      : '0% of traffic'
                  }
                />
                <Tile
                  label="Social Clicks"
                  value={socialClicks.toLocaleString()}
                  sub={
                    totalClicks > 0
                      ? `${((socialClicks / totalClicks) * 100).toFixed(1)}% of traffic`
                      : '0% of traffic'
                  }
                />
                <Tile
                  label="Top Performer"
                  value={topLink?.label ?? '—'}
                  sub={
                    topLink && topLink.visit_count > 0
                      ? `${topLink.visit_count.toLocaleString()} clicks`
                      : 'No clicks yet'
                  }
                />
                <Tile
                  label="Active Links"
                  value={`${activeCount} / ${links.length}`}
                  sub={`${inactiveCount} inactive`}
                />
                <Tile
                  label="Total Links"
                  value={links.length}
                  sub={`${products.length} products · ${social.length} social`}
                />
              </div>
            </section>

            {/* ── Link Health ── */}
            <section className="bg-[#111110] rounded-2xl border border-flax-smoke-900 p-4 sm:p-5">
              <p className="font-fancy text-flax-smoke-400 text-xs uppercase tracking-widest mb-4">
                Link Health
              </p>
              <div className="flex items-center gap-4 mb-3">
                <div className="flex-1">
                  <div className="flex justify-between font-fancy text-xs mb-1.5">
                    <span className="text-emerald-400 font-semibold">
                      ✓ {activeCount} Active
                    </span>
                    <span className="text-flax-smoke-600">
                      {inactiveCount} Inactive
                    </span>
                  </div>
                  <div className="h-2 bg-flax-smoke-900 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all duration-700"
                      style={{ width: `${activeRatio}%` }}
                    />
                  </div>
                </div>
                <span className="font-fancy text-flax-smoke-500 text-sm font-bold shrink-0">
                  {activeRatio.toFixed(0)}%
                </span>
              </div>
              <p className="font-fancy text-flax-smoke-700 text-xs">
                Inactive links are hidden from the public /links page.
              </p>
            </section>

            {/* ── Products Performance ── */}
            <section className="bg-[#111110] rounded-2xl border border-flax-smoke-900 overflow-hidden">
              <div className="bg-emerald-500/5 border-b border-emerald-500/20 px-4 sm:px-5 py-4">
                <p className="font-fancy text-emerald-600 text-xs uppercase tracking-widest mb-0.5">
                  Performance
                </p>
                <h2 className="font-fancy text-flax-smoke-100 font-bold text-base">
                  Products
                </h2>
                <p className="font-fancy text-flax-smoke-600 text-xs mt-1">
                  {productClicks.toLocaleString()} total product clicks ·{' '}
                  {products.length} products
                </p>
              </div>
              <div className="px-4 sm:px-5 pb-2">
                {products.length === 0 ? (
                  <p className="font-fancy text-flax-smoke-700 text-sm text-center py-6">
                    No products added yet.
                  </p>
                ) : (
                  products.map((link) => (
                    <AnalysisBar
                      key={link.id}
                      label={link.label}
                      url={link.url}
                      count={link.visit_count ?? 0}
                      shareOfCategory={
                        productClicks > 0
                          ? ((link.visit_count ?? 0) / productClicks) * 100
                          : 0
                      }
                      shareOfTotal={
                        totalClicks > 0
                          ? ((link.visit_count ?? 0) / totalClicks) * 100
                          : 0
                      }
                      maxCount={maxProductVisits}
                      isActive={link.is_active}
                      accent
                    />
                  ))
                )}
              </div>
            </section>

            {/* ── Social Performance ── */}
            <section className="bg-[#111110] rounded-2xl border border-flax-smoke-900 overflow-hidden">
              <div className="border-b border-flax-smoke-900 px-4 sm:px-5 py-4">
                <p className="font-fancy text-flax-smoke-500 text-xs uppercase tracking-widest mb-0.5">
                  Performance
                </p>
                <h2 className="font-fancy text-flax-smoke-100 font-bold text-base">
                  Social Links
                </h2>
                <p className="font-fancy text-flax-smoke-600 text-xs mt-1">
                  {socialClicks.toLocaleString()} total social clicks ·{' '}
                  {social.length} platforms
                </p>
              </div>
              <div className="px-4 sm:px-5 pb-2">
                {social.length === 0 ? (
                  <p className="font-fancy text-flax-smoke-700 text-sm text-center py-6">
                    No social links added yet.
                  </p>
                ) : (
                  social.map((link) => (
                    <AnalysisBar
                      key={link.id}
                      label={link.label}
                      url={link.url}
                      count={link.visit_count ?? 0}
                      shareOfCategory={
                        socialClicks > 0
                          ? ((link.visit_count ?? 0) / socialClicks) * 100
                          : 0
                      }
                      shareOfTotal={
                        totalClicks > 0
                          ? ((link.visit_count ?? 0) / totalClicks) * 100
                          : 0
                      }
                      maxCount={maxSocialVisits}
                      isActive={link.is_active}
                    />
                  ))
                )}
              </div>
            </section>

            {/* ── All Links Table ── */}
            <section className="bg-[#111110] rounded-2xl border border-flax-smoke-900 overflow-hidden">
              <div className="border-b border-flax-smoke-900 px-4 sm:px-5 py-4">
                <p className="font-fancy text-flax-smoke-400 text-xs uppercase tracking-widest">
                  All Links — sorted by clicks
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm font-fancy">
                  <thead>
                    <tr className="border-b border-flax-smoke-900">
                      <th className="text-left text-flax-smoke-600 text-xs uppercase py-3 px-4 sm:px-5 font-medium">
                        Label
                      </th>
                      <th className="text-left text-flax-smoke-600 text-xs uppercase py-3 px-2 font-medium hidden sm:table-cell">
                        Type
                      </th>
                      <th className="text-right text-flax-smoke-600 text-xs uppercase py-3 px-2 font-medium">
                        Clicks
                      </th>
                      <th className="text-right text-flax-smoke-600 text-xs uppercase py-3 px-4 sm:px-5 font-medium">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sorted.map((link) => (
                      <tr
                        key={link.id}
                        className="border-b border-flax-smoke-900 last:border-0 hover:bg-flax-smoke-900/20 transition-colors"
                      >
                        <td className="py-3 px-4 sm:px-5 text-flax-smoke-100 font-semibold max-w-[140px] sm:max-w-none truncate">
                          {link.label}
                        </td>
                        <td className="py-3 px-2 text-flax-smoke-500 text-xs capitalize hidden sm:table-cell">
                          {link.category}
                        </td>
                        <td className="py-3 px-2 text-right font-bold text-flax-smoke-200">
                          {(link.visit_count ?? 0).toLocaleString()}
                        </td>
                        <td className="py-3 px-4 sm:px-5 text-right">
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                              link.is_active
                                ? 'bg-emerald-500/15 text-emerald-400'
                                : 'bg-flax-smoke-800 text-flax-smoke-600'
                            }`}
                          >
                            {link.is_active ? 'Active' : 'Off'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}
