"use client";

import MarqueeText from "./MarqueeText";

export default function Clients() {
  const brands = [
    "ACME CORP", "TECHFLOW", "NEXUS", "GLOBAL SYS", 
    "STRATOS", "LUMINA", "SYNTAX", "VORTEX"
  ];

  return (
    <section className="py-24 bg-[#080810] border-y border-[#1e1e35] overflow-hidden">
      <div className="container mx-auto px-6 mb-16 text-center">
        <h2 className="font-mono text-[#1EAEDB] tracking-[0.2em] mb-4 uppercase">
          Clients & Collaborations
        </h2>
        <p className="font-body text-[#8a8a9e] text-lg max-w-xl mx-auto">
          Brands and businesses that trusted Belal with their web.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        <MarqueeText direction="left" speed={40}>
          <div className="flex items-center gap-8 px-4">
            {brands.map((brand, i) => (
              <div 
                key={`r1-${i}`}
                className="px-8 py-4 bg-[#181828] border border-[#1e1e35] rounded-full font-display font-bold text-xl text-[#8a8a9e] hover:text-white hover:border-[#1EAEDB] transition-all cursor-default grayscale hover:grayscale-0 select-none"
              >
                {brand}
              </div>
            ))}
          </div>
        </MarqueeText>

        <MarqueeText direction="right" speed={35}>
          <div className="flex items-center gap-8 px-4">
            {[...brands].reverse().map((brand, i) => (
              <div 
                key={`r2-${i}`}
                className="px-8 py-4 bg-[#181828] border border-[#1e1e35] rounded-full font-display font-bold text-xl text-[#8a8a9e] hover:text-white hover:border-[#1EAEDB] transition-all cursor-default grayscale hover:grayscale-0 select-none"
              >
                {brand}
              </div>
            ))}
          </div>
        </MarqueeText>
      </div>
    </section>
  );
}
