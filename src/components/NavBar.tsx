"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import gsap from "gsap";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      gsap.fromTo(
        ".mobile-link",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.4, ease: "power2.out" },
      );
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 h-16 transition-all duration-400 ${
          scrolled
            ? "bg-[rgba(8,8,16,0.9)] backdrop-blur-[20px] border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto h-full px-6 flex items-center justify-between">
          {/* Logo - Monogram only */}
          <a
            href="#"
            className="font-display font-black text-[20px] text-[#f0f0f5] tracking-widest"
            aria-label="Back to top"
          >
            BA
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 h-full">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative font-body text-[14px] text-[#8a8a9e] tracking-[0.05em] hover:text-[#f0f0f5] transition-colors duration-200 flex items-center h-full"
              >
                {link.label}
                {/* Simulated active state dot on hover for demonstration, actual active logic would go here */}
                <span className="absolute bottom-4 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#1EAEDB] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </a>
            ))}
            <a
              href="#contact"
              className="ml-4 px-5 py-[10px] rounded-[6px] border border-[rgba(255,255,255,0.15)] text-[#f0f0f5] font-display font-semibold text-[14px] hover:border-[#1EAEDB] hover:text-[#1EAEDB] transition-colors duration-300 bg-transparent"
            >
              Hire Me
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden w-11 h-11 border border-white/10 flex items-center justify-center hover:border-white/30 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={
              mobileOpen ? "Close navigation menu" : "Open navigation menu"
            }
          >
            {mobileOpen ? (
              <X size={20} className="text-[#f0f0f5]" />
            ) : (
              <Menu size={20} className="text-[#f0f0f5]" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-[#080810] z-40 flex flex-col items-center justify-center gap-10 pt-16">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="mobile-link font-display font-black text-4xl text-white hover:text-[#1EAEDB] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="mobile-link font-display font-black text-4xl text-[#1EAEDB]"
          >
            Hire Me
          </a>
        </div>
      )}
    </>
  );
}
