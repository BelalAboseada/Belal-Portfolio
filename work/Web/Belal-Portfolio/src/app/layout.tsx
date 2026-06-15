import type { Metadata } from 'next';
import './globals.css';
import 'lenis/dist/lenis.css';
import { LenisProvider } from '@/components/LenisProvider';

export const metadata: Metadata = {
  title: 'Belal Aboseada - Web Developer & Tech Content Creator',
  description: 'Portfolio of Belal Aboseada, a Web Developer & Tech Content Creator.',
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
      </body>
    </html>
  );
}
