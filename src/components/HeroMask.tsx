"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { splitTextIntoSpans } from "@/lib/gsap-init";

export default function HeroMask() {
  const sectionRef = useRef<HTMLElement>(null);

  // Animation refs
  const topLabelRef = useRef<HTMLParagraphElement>(null);
  const name1Ref = useRef<HTMLHeadingElement>(null);
  const name2Ref = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRowRef = useRef<HTMLDivElement>(null);
  const photoContainerRef = useRef<HTMLDivElement>(null);
  const statusCardRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const vertLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference) and (min-width: 768px)", () => {
      const tl = gsap.timeline();

      // Initial States
      gsap.set(topLabelRef.current, { opacity: 0, y: -10 });
      gsap.set(vertLineRef.current, { scaleY: 0, transformOrigin: "top" });
      gsap.set([name1Ref.current, name2Ref.current], { opacity: 0 });
      gsap.set(roleRef.current, { opacity: 0, y: 20 });
      gsap.set(dividerRef.current, { scaleX: 0, transformOrigin: "left" });
      gsap.set(taglineRef.current, { opacity: 0, y: 15 });
      gsap.set(ctaRowRef.current, { opacity: 0 });
      gsap.set(photoContainerRef.current, { y: 30, x: 0, opacity: 0, scale: 1 });
      gsap.set(statusCardRef.current, { y: 20, opacity: 0 });
      gsap.set(scrollIndicatorRef.current, { opacity: 0 });

      // Spans setup for text reveal
      const name1Chars = splitTextIntoSpans(name1Ref.current);
      const name2Chars = splitTextIntoSpans(name2Ref.current);

      // We apply initial opacity 0 and y: 100 to the spans, and then set parent opacity to 1
      gsap.set([...name1Chars, ...name2Chars], { opacity: 0, y: 100 });
      gsap.set([name1Ref.current, name2Ref.current], { opacity: 1 });

      // Animation Timeline
      // t=0.20s - Vertical line draws
      tl.to(
        vertLineRef.current,
        { scaleY: 1, duration: 0.7, ease: "power3.inOut" },
        0.2,
      );

      // t=0.30s - Top label fades in
      tl.to(
        topLabelRef.current,
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
        0.3,
      );

      // t=0.30s - Terminal block enters
      tl.to(
        photoContainerRef.current,
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        0.3,
      );

      // t=0.50s - BELAL
      tl.to(
        name1Chars,
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: "power4.out" },
        0.5,
      );

      // t=0.65s - ABOSEADA
      tl.to(
        name2Chars,
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: "power4.out" },
        0.65,
      );

      // t=0.80s - Role line
      tl.to(
        roleRef.current,
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        0.8,
      );

      // t=0.90s - Red divider line
      tl.to(
        dividerRef.current,
        { scaleX: 1, duration: 0.5, ease: "power2.out" },
        0.9,
      );

      // t=1.00s - Tagline
      tl.to(
        taglineRef.current,
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        1.0,
      );

      // t=1.10s - CTA Row
      tl.to(
        ctaRowRef.current,
        { opacity: 1, duration: 0.4, ease: "power2.out" },
        1.1,
      );

      // t=1.40s - Status card
      tl.to(
        statusCardRef.current,
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
        1.4,
      );

      // t=1.60s - Scroll indicator
      tl.to(
        scrollIndicatorRef.current,
        { opacity: 1, duration: 0.4, ease: "power2.out" },
        1.6,
      );
    });

    mm.add("(prefers-reduced-motion: reduce) and (min-width: 768px)", () => {
      // Just fade everything in
      gsap.to(
        [
          topLabelRef.current,
          name1Ref.current,
          name2Ref.current,
          roleRef.current,
          dividerRef.current,
          taglineRef.current,
          ctaRowRef.current,
          photoContainerRef.current,
          statusCardRef.current,
          scrollIndicatorRef.current,
          vertLineRef.current,
        ],
        { opacity: 1, duration: 0.3, stagger: 0.05 },
      );
      gsap.set(vertLineRef.current, { scaleY: 1 });
      gsap.set(dividerRef.current, { scaleX: 1 });
    });

    // Handle scroll trigger refresh on image load — throttle to single call
    let refreshTimer: ReturnType<typeof setTimeout>;
    const images = document.querySelectorAll("img");
    images.forEach((img) => {
      img.addEventListener("load", () => {
        clearTimeout(refreshTimer);
        refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 100);
      });
    });

    // Scroll indicator fade out on scroll — uses CSS transition via class toggle
    const scrollEl = scrollIndicatorRef.current;
    if (!scrollEl) return;
    const onScroll = () => {
      scrollEl.style.opacity = window.scrollY > 100 ? "0" : "1";
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      ScrollTrigger.getAll().forEach((t) => t.kill());
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative w-full overflow-hidden flex flex-col md:flex-row items-end md:items-stretch"
      style={{ minHeight: "100svh", backgroundColor: "#080810" }}
    >

      

      {/* BACKGROUND LAYER (Mobile Only Orbs) */}
      <div className="md:hidden absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[0%] left-[-20%] w-[200px] h-[200px] rounded-full bg-[#00b4d8] opacity-20 blur-[80px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[250px] h-[250px] rounded-full bg-[#0066ff] opacity-15 blur-[100px]" />
        <div className="absolute top-[40%] left-[20%] w-[180px] h-[180px] rounded-full bg-[#00b4d8] opacity-[0.08] blur-[120px]" />
      </div>

      {/* 1px Vertical Dividing Line */}
      <div
        ref={vertLineRef}
        className="hidden md:block absolute left-[55%] top-0 w-[1px] h-full z-10"
        style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
      />

      {/* LEFT COLUMN - Typography */}
      <div className="w-full md:w-[55%] z-10 flex flex-col justify-center px-[20px] md:px-[6%] pt-[80px] md:pt-32 pb-[40px] md:pb-24 h-auto items-center md:items-start text-center md:text-left gap-[16px] md:gap-0">
        
        <div
          ref={topLabelRef}
          className="mobile-animate-badge md:mb-8 bg-white/5 md:bg-transparent border border-white/10 md:border-transparent backdrop-blur-[10px] md:backdrop-blur-none rounded-full md:rounded-none px-[14px] md:px-0 py-[4px] md:py-0"
        >
          <p className="font-mono text-[11px] text-[#f0f0f5] md:text-[#8a8a9e] tracking-[0.15em] md:tracking-[0.2em] uppercase m-0">
            PORTFOLIO — 2026
          </p>
        </div>

        {/* Giant Name */}
        <div className="mobile-animate-name flex flex-col md:mb-6 select-none leading-[0.92]">
          <h1
            ref={name1Ref}
            className="font-display font-black text-white md:text-[#f0f0f5] uppercase m-0 p-0 drop-shadow-[0_0_40px_rgba(0,180,216,0.3)] md:drop-shadow-none"
            style={{ fontSize: "clamp(3rem, 12vw, 7rem)" }}
          >
            BELAL
          </h1>
          <h1
            ref={name2Ref}
            className="font-display font-black uppercase m-0 p-0 text-transparent md:text-stroke [-webkit-text-stroke:2px_rgba(255,255,255,0.9)] md:[-webkit-text-stroke:initial]"
            style={{ fontSize: "clamp(3rem, 12vw, 7rem)" }}
          >
            ABOSEADA
          </h1>
        </div>

        {/* Available Badge */}
        <div className="mobile-animate-badge flex items-center gap-2 md:mb-6 bg-[#00b4d8]/[0.08] md:bg-transparent border border-[#00b4d8]/25 md:border-transparent backdrop-blur-[12px] md:backdrop-blur-none rounded-full md:rounded-none px-3 py-1.5 md:p-0">
          <div className="w-[6px] h-[6px] bg-[#22c55e] rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" style={{ animation: "pulse 2s infinite" }} />
          <span className="font-mono text-[10px] md:text-[11px] text-[#00b4d8] md:text-[#8a8a9e] tracking-[0.12em] md:tracking-wider uppercase m-0">
            Available for hire
          </span>
        </div>

        <p
          ref={roleRef}
          className="mobile-animate-badge font-display font-normal text-[16px] md:text-[18px] text-[#8a8a9e] md:mb-0"
        >
          Web & Mobile Developer
        </p>

        {/* Desktop divider */}
        <div
          ref={dividerRef}
          className="hidden md:block w-[60px] h-[1px] bg-[#1EAEDB] my-[28px]"
        />

        <p
          ref={taglineRef}
          className="mobile-animate-badge font-body text-[15px] md:text-[16px] text-[#8a8a9e] leading-[1.7] max-w-[340px] md:mb-[40px] md:mt-0"
        >
          Developer by day, creator by night.
        </p>

        {/* Mobile Divider */}
        <div className="md:hidden w-full h-[1px] my-[8px]" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)", border: "none" }} />

        {/* CTA Row */}
        <div
          ref={ctaRowRef}
          className="mobile-animate-btns w-full max-w-[340px] flex flex-col md:flex-row items-stretch md:items-center justify-start md:justify-between md:gap-0 gap-[12px]"
        >
          <a
            href="#projects"
            className="cta-link group relative flex items-center justify-center md:justify-start gap-2 font-display font-semibold text-[16px] text-[#f0f0f5] w-full md:w-auto h-[52px] md:h-auto border border-white/[0.15] md:border-transparent rounded-[12px] md:rounded-none bg-white/[0.06] md:bg-transparent backdrop-blur-[16px] md:backdrop-blur-none hover:border-[#00b4d8] hover:shadow-[0_0_20px_rgba(0,180,216,0.3)] md:hover:border-transparent md:hover:shadow-none transition-all duration-300"
          >
            <span className="relative z-10 cta-text transition-transform duration-300 group-hover:translate-x-[6px]">
              See the work
            </span>
            <span className="cta-arrow opacity-0 -translate-x-1 relative z-10 hidden md:inline-block transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-[6px]">
              →
            </span>
            <span className="cta-underline absolute -bottom-1 left-0 w-full h-[1px] bg-[#f0f0f5] origin-left scale-x-0 hidden md:block transition-transform duration-300 group-hover:scale-x-100" />
          </a>
          
          <a
            href="#contact"
            className="md:hidden flex items-center justify-center h-[52px] rounded-[12px] bg-[#00b4d8]/[0.15] border border-[#00b4d8]/40 backdrop-blur-[16px] text-[#00b4d8] font-display font-bold text-[16px] hover:bg-[#00b4d8]/25 hover:border-[#00b4d8]/60 hover:shadow-[0_0_20px_rgba(0,180,216,0.4)] transition-all duration-300"
          >
            Hire Me
          </a>
        </div>
      </div>

      {/* RIGHT COLUMN  */}
      <div className="w-full md:w-[45%] h-auto md:h-auto min-h-0 md:min-h-[50vh] relative overflow-hidden flex justify-center items-center mt-[8px] md:mt-0 pb-[40px] md:pb-0 px-[20px] md:px-0 mobile-animate-term">
        <div
          ref={photoContainerRef}
          className="md:absolute md:inset-0 w-full md:h-full group flex items-center justify-center"
        >
          {/* Terminal / Code Editor Block */}
          <div className="relative w-full md:w-[90%] max-w-[440px] max-h-[220px] md:max-h-none rounded-[16px] md:rounded-xl border border-white/[0.08] md:border-[#1EAEDB]/20 bg-white/[0.03] md:bg-[#05050a] backdrop-blur-[20px] md:backdrop-blur-none overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] md:shadow-[0_0_40px_rgba(30,174,219,0.08)] p-[20px] md:p-0">
            
            {/* Ambient Glow behind terminal */}
            <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#1EAEDB] rounded-full blur-[100px] opacity-[0.06] pointer-events-none transition-opacity duration-1000 group-hover:opacity-[0.12]" />
            
            {/* Terminal Header */}
            <div className="relative z-10 w-full h-10 border-b border-transparent md:border-[#1EAEDB]/20 bg-transparent md:bg-black/40 flex items-center px-0 md:px-4 gap-2 md:backdrop-blur-sm mb-[16px] md:mb-0">
              <div className="w-2.5 h-2.5 rounded-full bg-[#00b4d8]/60 md:bg-[#1EAEDB]/20 border-none md:border md:border-[#1EAEDB]/40" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#00b4d8]/30 md:bg-[#1EAEDB]/20 border-none md:border md:border-[#1EAEDB]/40" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#00b4d8]/15 md:bg-[#1EAEDB]/20 border-none md:border md:border-[#1EAEDB]/40" />
              <div className="ml-auto">
                <div className="md:hidden bg-white/5 border border-white/10 backdrop-blur-[10px] rounded-full px-[14px] py-[4px] font-mono text-[11px] text-[#f0f0f5] tracking-[0.15em] uppercase">
                  developer.tsx
                </div>
                <div className="hidden md:block font-mono text-[10px] text-[#8a8a9e]">developer.tsx</div>
              </div>
            </div>

            {/* Code Content */}
            <div className="relative z-10 p-0 md:p-5 md:pt-7 font-mono text-[13px] md:text-[14px] leading-relaxed text-[#f0f0f5] overflow-hidden pb-10 md:pb-0">
              <div className="text-white/30 md:text-[#8a8a9e] mb-4">{"// Initialize creator identity"}</div>
              
              <div className="mb-2">
                <span className="text-[#00b4d8] md:text-[#1EAEDB]">import</span> {"{"} <span className="text-white">Developer</span> {"}"} <span className="text-[#00b4d8] md:text-[#1EAEDB]">from</span> <span className="text-white/70 md:text-[#8a8a9e]">"@/core"</span>;
              </div>

              <div className="mb-5">
                <span className="text-[#00b4d8] md:text-[#1EAEDB]">const</span> <span className="text-white">BelalAboseada</span> <span className="text-[#00b4d8] md:text-[#1EAEDB]">=</span> () <span className="text-[#00b4d8] md:text-[#1EAEDB]">=&gt;</span> (
              </div>
              
              <div className="pl-4 md:pl-6 mb-2">
                <span className="text-white/30 md:text-[#8a8a9e]">&lt;</span><span className="text-[#00b4d8] md:text-[#1EAEDB]">Developer</span>
              </div>
              
              <div className="pl-8 md:pl-12 mb-1">
                <span className="text-white">role</span><span className="text-[#00b4d8] md:text-[#1EAEDB]">="</span><span className="text-white/70 md:text-[#8a8a9e]">Full Stack</span><span className="text-[#00b4d8] md:text-[#1EAEDB]">"</span>
              </div>
              <div className="pl-8 md:pl-12 mb-1 flex items-center">
                <span>
                  <span className="text-white">focus</span><span className="text-[#00b4d8] md:text-[#1EAEDB]">="</span><span className="text-white/70 md:text-[#8a8a9e]">Web & Mobile</span><span className="text-[#00b4d8] md:text-[#1EAEDB]">"</span>
                </span>
                {/* Mobile blinking cursor */}
                <span className="md:hidden inline-block w-2 h-4 bg-[#00b4d8] ml-2" style={{ animation: "blink 1s step-end infinite" }} />
              </div>
              <div className="pl-8 md:pl-12 mb-1">
                <span className="text-white">available</span><span className="text-[#00b4d8] md:text-[#1EAEDB]">={"={"}</span><span className="text-white">true</span><span className="text-[#00b4d8] md:text-[#1EAEDB]">{"}"}</span>
              </div>
              <div className="pl-8 md:pl-12 mb-2 flex flex-wrap">
                <span className="text-white">stack</span><span className="text-[#00b4d8] md:text-[#1EAEDB]">={"={"}</span>[<span className="text-white/70 md:text-[#8a8a9e]">'React'</span>, <span className="text-white/70 md:text-[#8a8a9e]">'Next.js'</span>, <span className="text-white/70 md:text-[#8a8a9e]">'React Native'</span>]<span className="text-[#00b4d8] md:text-[#1EAEDB]">{"}"}</span>
              </div>
              
              <div className="pl-4 md:pl-6 mb-2 flex items-center">
                <span className="text-white/30 md:text-[#8a8a9e]">/&gt;</span>
                {/* Desktop blinking cursor */}
                <span className="hidden md:inline-block w-2 h-4 bg-[#1EAEDB] ml-2 animate-pulse" />
              </div>
              
              <div>
                );
              </div>
              
              <div className="mt-5">
                <span className="text-[#00b4d8] md:text-[#1EAEDB]">export default</span> <span className="text-white">BelalAboseada</span>;
              </div>

              {/* Mobile Fade Gradient */}
              <div className="md:hidden absolute bottom-0 left-0 w-full h-[60px] bg-gradient-to-t from-[#080810] to-transparent pointer-events-none z-20" />
            </div>

            {/* CRT Scanline Overlay */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] z-20 opacity-40 mix-blend-overlay" />
          </div>

          {/* Floating Status Card - Hidden on mobile */}
          <div
            ref={statusCardRef}
            className="hidden md:block absolute bottom-[40px] right-[24px] z-10 w-[180px] p-[16px_20px] rounded-[12px] border border-white/5"
            style={{
              background: "rgba(8, 8, 16, 0.75)",
              backdropFilter: "blur(20px) saturate(180%)",
            }}
          >
            <div className="flex items-center gap-[6px] mb-[10px]">
              <div className="w-[5px] h-[5px] bg-[#22c55e] rounded-full animate-pulse-gentle shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
              <span className="font-mono text-[10px] text-[#8a8a9e] tracking-widest uppercase">
                AVAILABLE
              </span>
            </div>
            <div className="w-full h-[1px] bg-white/5 mb-[10px]" />
            <h3 className="font-display font-bold text-[13px] text-[#f0f0f5] leading-tight mb-[4px]">
              Web & Mobile Dev
            </h3>
            <p className="font-mono text-[10px] text-[#8a8a9e]">Since 2022</p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="hidden md:flex absolute bottom-8 left-[55%] -translate-x-1/2 flex-col items-center gap-3 z-20"
      >
        <div className="w-[1px] h-10 bg-[#8a8a9e]/30 relative overflow-hidden">
          {/* Drip line */}
          <div className="absolute top-0 left-0 w-full h-1/2 bg-[#f0f0f5] animate-scroll-drip" />
        </div>
        <span className="font-mono text-[9px] text-[#8a8a9e] tracking-[0.3em]">
          SCROLL
        </span>
      </div>
    </section>
  );
}
