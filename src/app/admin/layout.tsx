'use client';

import { usePathname } from 'next/navigation';
import { AdminNav } from '@/components/admin/AdminNav';

/**
 * Admin layout — client component so it can read pathname to
 * hide the nav on the login page and add bottom padding on all other pages.
 * Note: metadata cannot be exported from 'use client' layouts;
 * set it per-page with generateMetadata or a page-level export.
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  return (
    <>
      {/* Extra bottom padding so content isn't hidden behind the fixed nav */}
      <div className={!isLoginPage ? 'pb-20' : ''}>
        {children}
      </div>
      {!isLoginPage && <AdminNav />}
    </>
  );
}
