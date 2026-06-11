"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Code2, Smartphone, Server, Database, PenTool, Globe } from "lucide-react";

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      if (!cardsRef.current) return;
      
      const mm = gsap.matchMedia();

      // Mobile: Horizontal GSAP scrub
      mm.add("(max-width: 767px)", () => {
        const track = cardsRef.current;
        if (!track || !sectionRef.current) return;

        gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth + 40),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => `+=${track.scrollWidth}`,
            invalidateOnRefresh: true,
          }
        });

        gsap.fromTo(Array.from(track.children),
          { opacity: 0 },
          {
            opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 80%" }
          }
        );
      });

      // Desktop: Simple Grid Fade In
      mm.add("(min-width: 768px)", () => {
        gsap.fromTo(Array.from(cardsRef.current!.children),
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 70%" }
          }
        );
      });

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const bentoItems = [
    {
      colSpan: "col-span-1 md:col-span-2", rowSpan: "row-span-2",
      icon: <Code2 size={32} className="text-[#1EAEDB] mb-4" />,
      title: "React Ecosystem", category: "Frontend",
      tech: "React, Next.js, TypeScript, Tailwind CSS, GSAP",
      featured: true
    },
    {
      colSpan: "col-span-1", rowSpan: "row-span-1",
      icon: <Smartphone size={32} className="text-[#1EAEDB] mb-4" />,
      title: "React Native", category: "Mobile",
      tech: "Expo, Mobile UI"
    },
    {
      colSpan: "col-span-1", rowSpan: "row-span-1",
      icon: <Server size={32} className="text-[#1EAEDB] mb-4" />,
      title: "Node.js", category: "Backend",
      tech: "Express, APIs"
    },
    {
      colSpan: "col-span-1", rowSpan: "row-span-1",
      icon: <Database size={32} className="text-[#1EAEDB] mb-4" />,
      title: "WordPress", category: "CMS",
      tech: "Themes, Plugins"
    },
    {
      colSpan: "col-span-1", rowSpan: "row-span-1",
      icon: <PenTool size={32} className="text-[#1EAEDB] mb-4" />,
      title: "Design & Media", category: "Tooling",
      tech: "Figma, Premiere, After Effects"
    },
    {
      colSpan: "col-span-1 md:col-span-2", rowSpan: "row-span-1",
      icon: <Globe size={32} className="text-[#1EAEDB] mb-4" />,
      title: "Bilingual Developer", category: "Languages",
      tech: "Arabic (Native) · English (Professional)"
    }
  ];

  return (
    <section id="skills" ref={sectionRef} className="py-24 bg-[#080810] overflow-hidden md:overflow-visible">
      <div className="container mx-auto px-6">
        <h2 className="font-display font-black text-5xl md:text-7xl mb-16 text-center transition-colors cursor-default text-transparent [-webkit-text-stroke:2px_#f0f0f5] hover:[-webkit-text-stroke:2px_#1EAEDB]">
          SKILLS
        </h2>

        <div className="md:hidden flex items-center justify-center gap-2 mb-6 text-[#8a8a9e] font-mono text-[10px] tracking-widest uppercase animate-pulse">
          <span>Swipe</span>
          <span>→</span>
        </div>

        <div 
          ref={cardsRef} 
          className="flex flex-nowrap md:grid md:grid-cols-4 md:auto-rows-[minmax(180px,auto)] gap-4 md:gap-6 w-max md:w-auto"
        >
          {bentoItems.map((item, i) => (
            <div 
              key={i} 
              className={`group relative w-[80vw] md:w-auto flex-shrink-0 snap-start bg-[#10101c] border border-[#1e1e35] rounded-xl p-6 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-[#1EAEDB] ${item.colSpan} ${item.rowSpan}`}
              style={{ boxShadow: "0 4px 32px rgba(0,0,0,0.5)" }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 16px 64px rgba(30,174,219,0.2), 0 0 0 1px #1EAEDB")}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 4px 32px rgba(0,0,0,0.5)")}
            >
              {item.featured && (
                <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity">
                  <svg width="200" height="200" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" stroke="#1EAEDB" strokeWidth="2" fill="none" strokeDasharray="4 4" className="animate-[spin_10s_linear_infinite]" />
                    <circle cx="50" cy="50" r="20" stroke="#1EAEDB" strokeWidth="2" fill="none" />
                  </svg>
                </div>
              )}

              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs text-[#8a8a9e] tracking-widest uppercase mb-4 block">
                    {item.category}
                  </span>
                  {item.icon}
                  <h3 className="font-display font-bold text-2xl text-[#f0f0f5] mb-2">{item.title}</h3>
                </div>
                <p className="font-body text-sm text-[#8a8a9e]">{item.tech}</p>
              </div>

              <div className="absolute bottom-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <svg viewBox="0 0 100 100" fill="none">
                  <path d="M100 100 L0 100 M100 100 L100 0" stroke="#1EAEDB" strokeWidth="2" />
                  <path d="M100 50 Q50 50 50 100" stroke="#1EAEDB" strokeWidth="2" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
