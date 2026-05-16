import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Belal Aboseada | Web & Mobile Developer",
  description: "Developer by day, creator by night. Portfolio of Belal Aboseada — web & mobile developer from Damanhur, Egypt.",
  keywords: ["Belal Aboseada", "Frontend Developer", "Next.js", "React", "Portfolio", "Egypt"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="theme-color" content="#080810" />
        {/* Google Fonts — loaded via <link> for performance, avoids CSS @import ordering issues */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning className="antialiased overflow-x-hidden bg-bg text-text">
        {children}
      </body>
    </html>
  );
}
