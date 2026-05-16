"use client";

import { useEffect, useRef, useState, FormEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import WebLines from "./WebLines";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);
      if (!sectionRef.current || !textRef.current) return;

      gsap.from(Array.from(textRef.current.children), {
        y: 100, opacity: 0, duration: 0.8, stagger: 0.2, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 60%" }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    setTimeout(() => {
      setFormStatus("success");
      setTimeout(() => setFormStatus("idle"), 3000);
    }, 1500);
  };

  return (
    <section id="contact" ref={sectionRef} className="relative py-32 bg-[#080810] border-t border-[#1e1e35] overflow-hidden">
      <WebLines position="top-left" opacity={0.5} />
      
      <div className="container mx-auto px-6 relative z-10">

        <div className="flex flex-col md:flex-row gap-16 md:gap-8 justify-between">
        <div ref={textRef} className="flex flex-col mb-20 items-start">
          <h2 className="font-display font-black leading-none uppercase" style={{ fontSize: "clamp(2.5rem, 15vw, 6rem)", wordBreak: "break-word", WebkitTextStroke: "1px #1EAEDB", color: "transparent" }}>
            LET&apos;S
          </h2>
          <h2 className="font-display font-black leading-none uppercase text-white" style={{ fontSize: "clamp(2.5rem, 15vw, 6rem)", wordBreak: "break-word" }}>
            BUILD.
          </h2>
          <div className="w-full md:w-1/2 flex flex-col items-start text-left">
            <a href="mailto:contact@belalaboseada.online" className="group relative inline-block mb-6">
              <span className="font-display font-bold text-2xl md:text-4xl text-[#f0f0f5] group-hover:text-white transition-colors">
                contact@belalaboseada.online
              </span>
              <div className="absolute -bottom-2 left-0 w-full h-[3px] bg-[#1EAEDB] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </a>
            <p className="font-mono text-[#8a8a9e] text-sm md:text-base">
              [ Available for freelance & full-time ]
            </p>
          </div>
        </div>

          <div className="w-full md:w-1/2 max-w-md">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="font-mono text-sm text-[#8a8a9e]">Name</label>
                <input type="text" id="name" required className="w-full bg-[#10101c] border border-[#1e1e35] rounded px-4 py-3 min-h-[48px] text-white focus:outline-none focus:border-[#1EAEDB] transition-colors" />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-mono text-sm text-[#8a8a9e]">Email</label>
                <input type="email" id="email" required className="w-full bg-[#10101c] border border-[#1e1e35] rounded px-4 py-3 min-h-[48px] text-white focus:outline-none focus:border-[#1EAEDB] transition-colors" />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="font-mono text-sm text-[#8a8a9e]">Message</label>
                <textarea id="message" required rows={4} className="w-full bg-[#10101c] border border-[#1e1e35] rounded px-4 py-3 min-h-[48px] text-white focus:outline-none focus:border-[#1EAEDB] transition-colors resize-none" />
              </div>

              <button type="submit" disabled={formStatus !== "idle"} className="group relative w-full overflow-hidden bg-[#1EAEDB] text-[#080810] font-display font-bold text-xl py-4 px-8 mt-4 min-h-[52px] disabled:opacity-70 transition-all hover:shadow-[0_0_30px_rgba(230,57,70,0.5)]">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {formStatus === "submitting" ? "..." : "Send it. ←"}
                </span>
                <div className="absolute inset-0 bg-white transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 mix-blend-overlay" />
              </button>

              <div aria-live="polite" className="mt-2 h-6">
                {formStatus === "success" && <span className="font-mono text-sm text-green-500">Message sent successfully!</span>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
