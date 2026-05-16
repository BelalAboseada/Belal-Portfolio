"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export default function ContentCreator() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const [hasCounted, setHasCounted] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!sectionRef.current || !headerRef.current || !fillRef.current) return;

    gsap.to(fillRef.current, {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      ease: "none",
      scrollTrigger: {
        trigger: headerRef.current,
        start: "top 80%",
        end: "bottom 40%",
        scrub: true,
      }
    });

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !hasCounted && countRef.current) {
        setHasCounted(true);
        gsap.to(countRef.current, {
          innerHTML: 50000, duration: 2.5, snap: { innerHTML: 1 }, ease: "power2.out",
          onUpdate: function() {
            if (countRef.current) {
              countRef.current.innerHTML = Number(countRef.current.innerHTML).toLocaleString();
            }
          }
        });
      }
    }, { threshold: 0.5 });

    if (countRef.current) observer.observe(countRef.current);
    return () => observer.disconnect();
  }, [hasCounted]);

  const thumbnails = Array(6).fill(0);
  
  const platforms = [
    { name: "Instagram", icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" },
    { name: "YouTube", icon: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" },
    { name: "TikTok", icon: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.12-.51 4.24-1.64 6.09-1.87 3.05-5.26 5.15-8.81 4.96-3.83-.2-7.14-2.8-8.24-6.42-1.12-3.69-.12-7.85 2.75-10.5 2.65-2.45 6.46-3.32 9.87-2.31v4.21c-1.92-.76-4.14-.62-5.82.68-1.55 1.2-2.22 3.32-1.57 5.15.52 1.48 1.83 2.64 3.35 2.94 2.11.41 4.34-.33 5.48-2.16.8-1.28 1.1-2.85 1.08-4.38.03-4.57.01-9.14.02-13.71z" },
    { name: "Facebook", icon: "M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103v3.328h-2.328c-2.311 0-2.587.717-2.587 2.328v1.8h3.738v3.667h-3.738v7.98z" }
  ];

  return (
    <section id="content" ref={sectionRef} className="py-24 bg-[#10101c] relative overflow-hidden">
      <div className="container mx-auto px-6 mb-16 relative">
        <h2 ref={headerRef} className="relative font-display font-black text-6xl md:text-[10vw] leading-none uppercase text-center">
          <span className="relative z-10" style={{ WebkitTextStroke: "1px #f0f0f5", color: "transparent" }}>CONTENT</span>
          <span ref={fillRef} className="absolute top-0 left-0 w-full h-full text-[#1EAEDB] z-20" style={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}>
            CONTENT
          </span>
        </h2>
        <div className="text-center mt-2">
          <span className="font-mono text-[#1EAEDB] tracking-widest text-sm md:text-base">
            OFF SCREEN
          </span>
        </div>
      </div>

      <div className="container mx-auto px-6 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {thumbnails.map((_, i) => (
            <div key={i} className="group relative aspect-video bg-[#181828] rounded-xl border border-[#1e1e35] overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-[#1EAEDB] hover:shadow-[0_16px_64px_rgba(230,57,70,0.2),0_0_0_1px_#1EAEDB]">
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-12 h-12 text-[#1e1e35] group-hover:text-[#1EAEDB] transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </div>
              <div className="absolute inset-0 bg-[#1EAEDB] opacity-0 group-hover:opacity-10 transition-opacity" />
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 mb-20">
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {platforms.map(platform => (
            <a key={platform.name} href="#" className="group flex flex-col items-center gap-3">
              <svg className="w-10 h-10 fill-[#f0f0f5] group-hover:fill-[#1EAEDB] group-hover:-translate-y-1 transition-all duration-300" viewBox="0 0 24 24">
                <path d={platform.icon} />
              </svg>
              <span className="font-mono text-[11px] text-[#8a8a9e] uppercase tracking-widest">{platform.name}</span>
            </a>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 text-center">
        <div className="mb-6 font-display font-bold text-3xl md:text-4xl text-[#f0f0f5]">
          <span ref={countRef}>0</span><span>+ Arabic viewers</span>
        </div>
        <div className="inline-block relative group cursor-pointer">
          <h3 className="font-display font-bold text-xl text-white">Follow for weekly Arabic tech content</h3>
          <div className="absolute -bottom-2 left-0 w-full h-[2px] bg-[#1EAEDB] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
        </div>
      </div>
    </section>
  );
}
