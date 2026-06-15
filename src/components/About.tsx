"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { splitTextIntoSpans } from "@/lib/gsap-init";
import WebLines from "./WebLines";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let ctx = gsap.context(() => {
      const chars = splitTextIntoSpans(headerRef.current);
      gsap.from(chars, {
        y: 120, opacity: 0, duration: 0.9, ease: "back.out(1.2)", stagger: 0.04,
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });

      gsap.from(textRef.current, {
        x: -40, opacity: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 60%" },
      });

      if (cardsRef.current) {
        gsap.from(Array.from(cardsRef.current.children), {
          y: 60, opacity: 0, duration: 0.6, ease: "power3.out", stagger: 0.1,
          scrollTrigger: { trigger: cardsRef.current, start: "top 80%" },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const stats = [
    { value: "3+", label: "Years experience" },
    { value: "10+", label: "Projects shipped" },
    { value: "50K+", label: "Arabic viewers reached" },
  ];

  return (
    <section id="about" ref={sectionRef} className="relative w-full py-32 bg-[#080810] overflow-hidden">
      <WebLines position="top-right" opacity={0.08} />

      <div className="container relative z-10 mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-16">
          {/* Left */}
          <div className="w-full md:w-[60%] flex flex-col gap-8">
            <h2 ref={headerRef} className="font-mono text-[#1EAEDB] text-xl tracking-[0.2em] uppercase">
              About
            </h2>

            <div ref={textRef} className="flex flex-col gap-6">
              <h3 className="font-display font-bold text-[#f0f0f5] leading-tight" style={{ fontSize: "clamp(1.8rem, 6vw, 3rem)" }}>
                Two roles. One mission. Build things that matter.
              </h3>
              <p className="font-body text-[#8a8a9e] text-base md:text-lg leading-[1.6] max-w-2xl">
                I&apos;m Belal — a web & mobile developer from Damanhur, Egypt. I build fast,
                clean interfaces with React, Next.js, and TypeScript. By night I create
                Arabic-language tech content that breaks down complex ideas for a generation
                that wants to understand, not just use.
              </p>
            </div>
          </div>

          {/* Right — Stats */}
          <div ref={cardsRef} className="w-full md:w-[40%] flex flex-col gap-6 justify-center">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="group relative bg-[#10101c] border border-[#1e1e35] rounded-xl p-8 flex flex-col gap-2 overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:border-[#1EAEDB]"
                style={{ boxShadow: "0 4px 32px rgba(0,0,0,0.5)" }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 16px 64px rgba(230,57,70,0.2), 0 0 0 1px #1EAEDB")}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 4px 32px rgba(0,0,0,0.5)")}
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-[#1EAEDB] scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom duration-300" />
                <span className="font-display font-black text-5xl text-[#1EAEDB]">{stat.value}</span>
                <span className="font-mono text-sm text-[#8a8a9e]">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
