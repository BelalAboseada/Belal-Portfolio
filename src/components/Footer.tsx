"use client";

export default function Footer() {
  const links = [
    { label: "About", href: "#about" },
    { label: "Work", href: "#projects" },
    { label: "Content", href: "#content" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer className="relative bg-[#080810] py-16 border-t border-[#1e1e35] overflow-hidden">
      <svg className="absolute bottom-0 right-0 w-64 h-64 opacity-5 pointer-events-none" viewBox="0 0 100 100" fill="none">
        <path d="M100 100 L0 100 M100 100 L100 0" stroke="#1EAEDB" strokeWidth="1" />
        <path d="M100 50 Q50 50 50 100" stroke="#1EAEDB" strokeWidth="1" strokeDasharray="4 4" />
        <path d="M100 20 Q20 20 20 100" stroke="#1EAEDB" strokeWidth="1" opacity="0.5" />
        <circle cx="100" cy="100" r="80" stroke="#1EAEDB" strokeWidth="0.5" />
        <circle cx="100" cy="100" r="50" stroke="#1EAEDB" strokeWidth="0.5" />
      </svg>

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center gap-12">
        <div className="flex flex-col">
          <h2 className="font-display font-black text-2xl md:text-4xl text-[#8a8a9e]">
            Always shipping. Always creating.
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-12">
          {links.map((link, i) => (
            <a key={i} href={link.href} className="font-mono text-sm text-[#f0f0f5] hover:text-[#1EAEDB] transition-colors">
              {link.label}
            </a>
          ))}
        </div>

        <div className="w-full h-px bg-[#1e1e35] max-w-3xl" />

        <div className="w-full max-w-5xl flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-xs text-[#8a8a9e]">
          <p>© 2026 Belal Aboseada. All rights reserved.</p>
          <p>Built with Next.js & too much coffee ☕</p>
        </div>
      </div>
    </footer>
  );
}
