import React from 'react';
import { LIVE_MOMENTS } from '../../utils/data';
import { ChandraMoon, guru_pushya_yoga, pradosham, Rahu_Ketu_Node_shift, sun_transit } from '../../assets/Auspicious_portal/index';


export function LiveHorologicalStream() {
  return (
    <section className="py-6 md:py-8 border-y border-black/10 dark:border-amber-500/40 dark:shadow-[0_0_15px_rgba(245,158,11,0.2)] relative overflow-hidden transition-colors duration-500 z-10" id="live-moments">



      <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col items-center justify-center text-center relative z-20">
        <span className="font-2xl uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400 font-bold block mb-4">
          LIVE HOROLOGICAL STREAM
        </span>
        <h2 className="font-sans text-4xl md:text-5xl text-midnight dark:text-cream tracking-wider">
          Auspicious Portals & Transits
        </h2>
      </div>

      {/* Marquee dual-row stream */}
      <div className="space-y-4 relative w-full overflow-hidden">
        {/* Left/Right Fade Overlays */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-ivory dark:from-[#0a0514] to-transparent z-30 pointer-events-none transition-colors duration-500" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-ivory dark:from-[#0a0514] to-transparent z-30 pointer-events-none transition-colors duration-500" />

        {/* Row 1 - Left to Right */}
        <div className="flex w-fit animate-[marquee_40s_linear_infinite] hover:[animation-play-state:paused] gap-4 py-1">
          {[...LIVE_MOMENTS, ...LIVE_MOMENTS, ...LIVE_MOMENTS].map((item, idx) => {
            const cosmicImages = [ChandraMoon, guru_pushya_yoga, pradosham, Rahu_Ketu_Node_shift, sun_transit];
            const imgUrl = cosmicImages[idx % cosmicImages.length];

            return (
              <div
                key={`${item.id}-r1-${idx}`}
                className="w-72 h-48 rounded-2xl relative overflow-hidden flex-shrink-0 group border border-black/5 dark:border-amber-500/40 dark:shadow-[0_0_15px_rgba(245,158,11,0.2)] shadow-lg cursor-pointer"
              >
                <img
                  src={imgUrl}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1500ms] ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e17] via-[#0a0e17]/70 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500 z-10" />

                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white font-mono text-[10px] font-bold tracking-wider z-20 shadow-sm backdrop-blur-sm">
                  {item.urgency}
                </span>

                <div className="absolute bottom-5 left-5 right-5 z-20">
                  <span className="inline-block px-2 py-0.5 mb-1.5 rounded bg-black/50 backdrop-blur-sm border border-white/10 text-[10px] font-mono text-amber-400 font-bold uppercase tracking-widest shadow-sm">{item.tag}</span>
                  <h4 className="font-sans text-xl md:text-2xl text-white font-medium tracking-wide line-clamp-2 leading-snug transition-colors">{item.title}</h4>
                </div>
              </div>
            );
          })}
        </div>

        {/* Row 2 - Right to Left */}
        <div className="flex w-fit animate-[marquee-reverse_40s_linear_infinite] hover:[animation-play-state:paused] gap-4 py-1">
          {[...LIVE_MOMENTS, ...LIVE_MOMENTS, ...LIVE_MOMENTS].reverse().map((item, idx) => {
            const cosmicImages = [
              "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=800",
              "https://images.unsplash.com/photo-1464802686167-b939a6910659?auto=format&fit=crop&q=80&w=800",
              "https://images.unsplash.com/photo-1532767153582-b1a0e5145009?auto=format&fit=crop&q=80&w=800",
              "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&q=80&w=800",
              "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=800"
            ];
            const imgUrl = cosmicImages[idx % cosmicImages.length];

            return (
              <div
                key={`${item.id}-r2-${idx}`}
                className="w-72 h-48 rounded-2xl relative overflow-hidden flex-shrink-0 group border border-black/5 dark:border-amber-500/40 dark:shadow-[0_0_15px_rgba(245,158,11,0.2)] shadow-lg cursor-pointer"
              >
                <img
                  src={imgUrl}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1500ms] ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e17] via-[#0a0e17]/70 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500 z-10" />

                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white font-mono text-[10px] font-bold tracking-wider z-20 shadow-sm backdrop-blur-sm">
                  {item.urgency}
                </span>

                <div className="absolute bottom-5 left-5 right-5 z-20">
                  <span className="inline-block px-2 py-0.5 mb-1.5 rounded bg-black/50 backdrop-blur-sm border border-white/10 text-[10px] font-mono text-purple-300 font-bold uppercase tracking-widest shadow-sm">{item.tag}</span>
                  <h4 className="font-sans text-xl md:text-2xl text-white font-medium tracking-wide line-clamp-2 leading-snug transition-colors">{item.title}</h4>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-33.333%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}
