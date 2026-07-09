import React from 'react';
import { ShieldCheck, Star, Users, Award, Lock, Sparkles } from 'lucide-react';

const TRUST_STATS = [
  { text: "Legacy of 25 Years", icon: Award },
  { text: "Trusted by Millions", icon: Users },
  { text: "Expert Vedic Priests", icon: Sparkles },
  { text: "4.8/5 Global Rating", icon: Star },
  { text: "100% Data Privacy", icon: Lock },
  { text: "Verified Remedies", icon: ShieldCheck }
];

export function TrustTicker() {
  return (
    <div className="w-full bg-[#f8f9fa] dark:bg-[#06020a] border-b border-black/5 dark:border-amber-500/20 py-4 md:py-5 overflow-hidden flex items-center relative z-20 shadow-sm dark:shadow-[0_4px_30px_rgba(245,158,11,0.05)]">
      
      {/* Decorative gradient edges */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
      
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-40 bg-gradient-to-r from-[#f8f9fa] dark:from-[#06020a] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-40 bg-gradient-to-l from-[#f8f9fa] dark:from-[#06020a] to-transparent z-10 pointer-events-none" />

      <div className="flex w-fit animate-[marquee_45s_linear_infinite] whitespace-nowrap items-center">
        {[...Array(4)].map((_, groupIdx) => (
          <React.Fragment key={groupIdx}>
            {TRUST_STATS.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={`${groupIdx}-${idx}`} 
                  className="flex items-center mx-3 md:mx-4 group cursor-default bg-white/60 dark:bg-[#1a0b2e]/40 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-full px-4 py-2 md:px-6 md:py-2.5 hover:bg-white dark:hover:bg-[#1a0b2e]/80 hover:border-amber-500/40 transition-all duration-500 hover:-translate-y-1 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(245,158,11,0.1)]"
                >
                  <div className="w-7 h-7 md:w-9 md:h-9 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-500/20 dark:to-orange-500/20 flex items-center justify-center mr-3 group-hover:scale-110 group-hover:rotate-12 group-hover:shadow-[0_0_15px_rgba(245,158,11,0.4)] transition-all duration-300">
                    <Icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-amber-700 dark:text-amber-400" />
                  </div>
                  <span className="font-sans font-bold text-[10px] md:text-[11px] tracking-[0.15em] text-midnight/80 dark:text-cream/90 uppercase group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-300">
                    {stat.text}
                  </span>
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>
  );
}
