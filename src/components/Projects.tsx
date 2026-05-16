"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import MarqueeText from "./MarqueeText";

const projectsData = [
  {
    id: "01",
    name: "Aleef",
    desc: "Pet Care App Landing Page with premium 3D interactions.",
    tech: ["Next.js", "TypeScript", "Tailwind", "GSAP"],
    link: "https://aleef.example.com",
    github: "https://github.com/BelalAboseada/aleef"
  },
  {
    id: "02",
    name: "E-Commerce Dashboard",
    desc: "Full-stack dashboard for managing products, orders, and analytics.",
    tech: ["React", "Node.js", "ShadCN UI", "MongoDB"],
    link: "https://dashboard.example.com",
    github: "https://github.com/BelalAboseada/dashboard"
  },
  {
    id: "03",
    name: "Business Directory",
    desc: "Scraping and listing platform for local businesses.",
    tech: ["Python", "Next.js", "PostgreSQL"],
    link: "#",
    github: "#"
  },
  {
    id: "04",
    name: "Portfolio v1",
    desc: "The previous iteration of my personal portfolio.",
    tech: ["Vite", "React", "Framer Motion"],
    link: "#",
    github: "#"
  }
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);

      if (!sectionRef.current || !trackRef.current) return;
      
      const track = trackRef.current;
      
      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth + (window.innerWidth < 768 ? 40 : 100)),
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="relative w-full bg-[#080810] py-16 md:py-0 md:h-[100vh] overflow-hidden">
      
      <div className="absolute top-0 left-0 w-full z-10 border-y border-[#1e1e35] bg-[#080810]/80 backdrop-blur-md py-4">
        <MarqueeText className="font-display font-bold text-4xl text-[#1EAEDB] tracking-wider">
          PROJECTS · PROJECTS · PROJECTS · PROJECTS · PROJECTS · PROJECTS · PROJECTS · PROJECTS · 
        </MarqueeText>
      </div>

      <div className="md:hidden flex items-center justify-center gap-2 mt-28 mb-[-60px] text-[#8a8a9e] font-mono text-[10px] tracking-widest uppercase animate-pulse">
        <span>Scroll</span>
        <span>↓</span>
      </div>

      <div 
        ref={trackRef} 
        className="mt-24 md:mt-0 flex flex-nowrap h-[70vh] md:h-[100vh] w-max px-6 md:px-[10vw] gap-6 md:gap-[10vw] items-center pt-8 md:pt-0"
      >
        {projectsData.map((project) => (
          <div 
            key={project.id}
            className="group relative w-[85vw] md:w-[70vw] h-[60vh] md:h-[70vh] bg-[#10101c] border border-[#1e1e35] rounded-2xl p-6 md:p-10 flex flex-col justify-between overflow-hidden flex-shrink-0 transition-all duration-500 hover:-translate-y-3 hover:border-[#1EAEDB]"
            style={{ boxShadow: "0 4px 32px rgba(0,0,0,0.5)" }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 16px 64px rgba(30,174,219, 0.2), 0 0 0 1px #1EAEDB")}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 4px 32px rgba(0,0,0,0.5)")}
          >
            <span className="absolute top-6 left-6 font-mono text-6xl md:text-8xl text-[#1e1e35] font-bold opacity-30 select-none">
              {project.id}
            </span>

            <div className="relative z-10 mt-16 md:mt-10">
              <h3 className="font-display font-black text-3xl md:text-[4vw] leading-none mb-4 md:mb-6 text-[#f0f0f5] group-hover:text-[#1EAEDB] transition-colors">
                {project.name}
              </h3>
              <p className="font-body text-base md:text-lg text-[#8a8a9e] max-w-xl mb-6 md:mb-8">
                {project.desc}
              </p>
              
              <div className="flex flex-wrap gap-2 md:gap-3">
                {project.tech.map(tech => (
                  <span key={tech} className="font-mono text-[10px] md:text-xs text-[#1EAEDB] border border-[#1EAEDB] px-3 py-1 rounded-full tracking-wider">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative z-10 flex gap-4 md:gap-6 mt-6 md:mt-8">
              <a href={project.link} target="_blank" rel="noreferrer" className="font-mono text-xs md:text-base text-[#1EAEDB] hover:text-white transition-colors">
                [ View Live ↗ ]
              </a>
              <a href={project.github} target="_blank" rel="noreferrer" className="font-mono text-xs md:text-base text-[#8a8a9e] hover:text-white transition-colors">
                [ GitHub ↗ ]
              </a>
            </div>

            {/* Mockup decoration */}
            <div className="absolute bottom-[-10%] right-[-5%] w-[60%] h-[70%] bg-[#181828] border border-[#1e1e35] rounded-tl-2xl shadow-[0_4px_32px_rgba(0,0,0,0.5)] transform group-hover:-translate-y-4 transition-transform duration-500 overflow-hidden hidden md:block">
              <div className="w-full h-8 bg-[#1e1e35] flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-[#1EAEDB]/50" />
                <div className="w-3 h-3 rounded-full bg-[#8a8a9e]/50" />
                <div className="w-3 h-3 rounded-full bg-[#8a8a9e]/50" />
              </div>
              <div className="w-full h-full p-4 flex flex-col gap-4 opacity-20">
                <div className="w-3/4 h-8 bg-[#1e1e35] rounded" />
                <div className="w-1/2 h-4 bg-[#1e1e35] rounded" />
                <div className="w-full h-32 bg-[#1e1e35] rounded mt-4" />
              </div>
            </div>

            <svg className="absolute bottom-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" viewBox="0 0 100 100" fill="none">
              <path d="M100 100 L0 100 M100 100 L100 0" stroke="#1EAEDB" strokeWidth="1" />
              <path d="M100 50 Q50 50 50 100" stroke="#1EAEDB" strokeWidth="1" strokeDasharray="4 4" />
              <path d="M100 20 Q20 20 20 100" stroke="#1EAEDB" strokeWidth="1" opacity="0.5" />
            </svg>
          </div>
        ))}
      </div>
    </section>
  );
}
