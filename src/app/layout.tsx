import type { Metadata, Viewport } from 'next';
import './globals.css';
import 'lenis/dist/lenis.css';
import { LenisProvider } from './LenisProvider';
import { ServiceWorkerRegistration } from '@/components/common/ServiceWorkerRegistration';

export const metadata: Metadata = {
  title: 'Belal Aboseada - Web Developer & Tech Content Creator',
  description: 'Portfolio of Belal Aboseada, a Web Developer & Tech Content Creator.',
  icons: {
    icon: '/images/profile.jpg',
  },
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Belal.dev',
  },
};

export const viewport: Viewport = {
  themeColor: '#1c1d16',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </head>
      <body  suppressHydrationWarning className="antialiased font-sans text-flax-smoke-950 bg-flax-smoke-50">
        <LenisProvider>{children}</LenisProvider>
        <ServiceWorkerRegistration />
      </body>
    </html>
  );
}
