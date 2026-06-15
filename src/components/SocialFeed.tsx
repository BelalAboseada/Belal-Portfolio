"use client";

import MarqueeText from "./MarqueeText";

export default function SocialFeed() {
  const posts = [
    { height: "h-[300px]", platform: "Instagram", color: "bg-[#1d3557]" },
    { height: "h-[240px]", platform: "YouTube", color: "bg-[#1EAEDB]" },
    { height: "h-[320px]", platform: "Instagram", color: "bg-[#1d3557]" },
    { height: "h-[200px]", platform: "YouTube", color: "bg-[#1EAEDB]" },
    { height: "h-[280px]", platform: "Instagram", color: "bg-[#1d3557]" },
    { height: "h-[260px]", platform: "YouTube", color: "bg-[#1EAEDB]" },
  ];

  return (
    <section className="bg-[#10101c] py-16 overflow-hidden">
      <div className="w-full border-y border-[#1e1e35] bg-[#080810]/50 py-3 mb-16">
        <MarqueeText speed={25} className="font-display font-bold text-2xl text-[#8a8a9e] tracking-wider">
          SOCIAL · SOCIAL · SOCIAL · SOCIAL · 
        </MarqueeText>
      </div>

      <div className="container mx-auto px-6">
        <div className="columns-2 md:columns-3 gap-6 space-y-6">
          {posts.map((post, i) => (
            <div 
              key={i} 
              className={`group relative w-full ${post.height} bg-[#181828] border border-[#1e1e35] rounded-xl p-4 break-inside-avoid overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-[#1EAEDB] hover:shadow-[0_16px_64px_rgba(230,57,70,0.2),0_0_0_1px_#1EAEDB]`}
            >
              <div className={`absolute top-4 left-4 z-10 px-3 py-1 rounded-full ${post.color} text-white font-mono text-[10px] uppercase tracking-wider`}>
                {post.platform}
              </div>
              <div className="w-full h-full bg-[#080810] rounded-lg border border-[#1e1e35] flex items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity">
                <svg className="w-8 h-8 text-[#1e1e35]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="font-display text-2xl font-bold mb-4">Follow Belal</p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 font-mono text-sm">
            <a href="#" className="text-[#1EAEDB] hover:text-white transition-colors">@belal_aboseada (IG)</a>
            <a href="#" className="text-[#1EAEDB] hover:text-white transition-colors">@belal_aboseada (YT)</a>
            <a href="#" className="text-[#1EAEDB] hover:text-white transition-colors">@belal_aboseada (TT)</a>
          </div>
        </div>
      </div>
    </section>
  );
}
