'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push('/admin/links');
        router.refresh();
      } else {
        setError('Incorrect password. Try again.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0B0B0A] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        {/* Logo / heading */}
        <div className="text-center mb-10">
          <h1 className="font-fancy text-flax-smoke-100 text-2xl font-bold uppercase tracking-wide">
            belal
            <span className="inline-block font-fancy origin-center">©</span>
          </h1>
          <p className="font-fancy text-flax-smoke-500 text-sm mt-2 uppercase tracking-widest">
            Admin Access
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            id="admin-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoComplete="current-password"
            required
            className="w-full bg-flax-smoke-100 text-flax-smoke-950 placeholder-flax-smoke-500 rounded-full px-6 py-3 text-sm font-fancy outline-none focus:ring-2 focus:ring-flax-smoke-400 transition"
          />

          {error && (
            <p
              role="alert"
              className="text-red-400 text-xs text-center font-fancy"
            >
              {error}
            </p>
          )}

          <button
            id="admin-login-submit"
            type="submit"
            disabled={loading}
            className="w-full bg-flax-smoke-500 hover:bg-flax-smoke-400 disabled:opacity-50 text-flax-smoke-50 rounded-full px-6 py-3 text-sm font-semibold uppercase font-fancy transition-colors"
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
