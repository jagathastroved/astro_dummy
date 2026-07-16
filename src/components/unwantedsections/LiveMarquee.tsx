import React from 'react';
import { LIVE_MOMENTS } from '../../utils/data';

export function LiveMarquee() {
  return (
    <section className="py-6 md:py-8 border-y border-gold/10 bg-cream/30 dark:bg-midnight/20 overflow-hidden" id="live-moments">
      <div className="max-w-7xl mx-auto px-6 mb-8 flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-purple dark:text-saffron block">LIVE HOROLOGICAL STREAM</span>
          <h2 className="font-sans text-3xl text-midnight dark:text-cream mt-1 tracking-wider">Auspicious Portals & Transits</h2>
        </div>
        <p className="font-body text-xs text-gray-500 dark:text-gray-400 max-w-xs">
          These celestial shifts are occurring in real-time. Hover/touch to pause the stream and inspect the timings.
        </p>
      </div>

      {/* Marquee dual-row stream */}
      <div className="marquee-container space-y-4 relative w-full overflow-hidden">
        {/* Row 1 - Left to Right */}
        <div className="animate-marquee gap-4 flex py-1">
          {[...LIVE_MOMENTS, ...LIVE_MOMENTS].map((item, idx) => (
            <div
              key={`${item.id}-r1-${idx}`}
              className="w-64 h-44 rounded-3xl relative overflow-hidden flex-shrink-0 group border border-gold/10 shadow-sm"
            >
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/40 to-transparent z-10" />

              <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-gold text-midnight font-mono text-[9px] font-bold tracking-wider z-20 shadow-md">
                {item.urgency}
              </span>

              <div className="absolute bottom-4 left-4 right-4 z-20">
                <span className="inline-block px-2 py-0.5 mb-1.5 rounded bg-black/50 backdrop-blur-sm border border-white/10 text-[10px] font-mono text-saffron font-bold uppercase tracking-widest shadow-sm">{item.tag}</span>
                <h4 className="font-sans text-sm md:text-base text-white mt-0.5 font-medium tracking-wide line-clamp-1">{item.title}</h4>
              </div>
            </div>
          ))}
        </div>

        {/* Row 2 - Right to Left */}
        <div className="animate-marquee-reverse gap-4 flex py-1">
          {[...LIVE_MOMENTS, ...LIVE_MOMENTS].reverse().map((item, idx) => (
            <div
              key={`${item.id}-r2-${idx}`}
              className="w-64 h-44 rounded-3xl relative overflow-hidden flex-shrink-0 group border border-gold/10 shadow-sm"
            >
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/40 to-transparent z-10" />

              <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-saffron text-midnight font-mono text-[9px] font-bold tracking-wider z-20 shadow-md">
                {item.urgency}
              </span>

              <div className="absolute bottom-4 left-4 right-4 z-20">
                <span className="inline-block px-2 py-0.5 mb-1.5 rounded bg-black/50 backdrop-blur-sm border border-white/10 text-[10px] font-mono text-purple-300 dark:text-gold font-bold uppercase tracking-widest shadow-sm">{item.tag}</span>
                <h4 className="font-sans text-sm md:text-base text-white mt-0.5 font-medium tracking-wide line-clamp-1">{item.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
