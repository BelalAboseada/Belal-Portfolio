import type { Metadata, Viewport } from 'next';
import './globals.css';
import 'lenis/dist/lenis.css';
import { LenisProvider } from './LenisProvider';
import { ServiceWorkerRegistration } from '@/components/common/ServiceWorkerRegistration';

const siteUrl = 'https://belalaboseada.vercel.app';
const title = 'Belal Aboseada - Web Developer & Tech Content Creator';
const description =
  'Portfolio of Belal Aboseada, a Web Developer & Tech Content Creator.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  // Favicons come from the app-dir file conventions: icon.svg, icon.png, apple-icon.png
  manifest: '/manifest.webmanifest',
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'Belal Aboseada',
    title,
    description,
    images: [
      {
        url: '/brand/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Belal Aboseada — developer by day, creator by night',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/brand/og-image.png'],
  },
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
      <body  suppressHydrationWarning className="antialiased font-sans text-flax-smoke-950 bg-flax-smoke-50">
        <LenisProvider>{children}</LenisProvider>
        <ServiceWorkerRegistration />
      </body>
    </html>
  );
}
