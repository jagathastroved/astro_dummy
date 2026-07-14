import React, { useRef, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { AnimatedGrid } from '../ui/AnimatedGrid';
import { AnimatedCard } from '../ui/AnimatedCard';
import { palm_leaf, personal_report } from '../../assets/vedic_master/index';
import liveConsultationsImg from '../../assets/Services/live_consultations.png';

const EXPERTS = [
  {
    badgeText: "LIVE 1-ON-1 Consultations",
    title: "Talk with a Senior Vedic Astrologer right now.",
    desc: "Receive immediate clarity on your career, marriage, or family, and get powerful life-changing advice and remedies.\nConsult in English, Hindi, or Tamil.",
    cta: "BOOK CONSULTATION",
    footerText: "Slots available today • 100% private",
    image: liveConsultationsImg,
    titleColor: "text-purple-700 dark:text-purple-400"
  },
  {
    badgeText: "ANCIENT PALM-LEAF READING",
    title: "Your Destiny, Written Centuries Ago on Palm Leaves",
    desc: "Trained Nadi readers in the Vaitheeswaran Koil’s tradition locate your leaf from your thumb impression- revealing your past karma, your present chapter, and your future destiny, along with the specific remedies written for you.",
    cta: "GET MY NADI READING",
    footerText: "Live reading with translation • Recording included",
    image: palm_leaf,
    titleColor: "text-purple-600 dark:text-amber-400"
  },
  {
    badgeText: "WRITTEN FOR YOU",
    title: "Know What the Coming Year Holds For You",
    desc: "Detailed written reports on your career, marriage, and wealth. Understand the upcoming planetary dasha periods shaping the critical years ahead in your life. Know the right remedies recommended for you, included in the report. Prepared from your birth chart by our senior Vedic astrologers.",
    cta: "GET MY REPORT",
    footerText: "See a sample report →",
    image: personal_report,
    titleColor: "text-purple-700 dark:text-purple-400"
  }
];

export function PersonalGuidance() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current && window.innerWidth < 1024) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        // If we reached the end, scroll back to the start
        if (scrollLeft + clientWidth >= scrollWidth - 20) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          // Scroll forward by one card width (approx 85% of screen width)
          scrollRef.current.scrollBy({ left: clientWidth * 0.85, behavior: 'smooth' });
        }
      }
    }, 4000); // Auto-scroll every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-6 md:py-8 transition-colors duration-500 relative overflow-hidden z-10 mt-4 md:mt-6">
      {/* Top Section Differentiator / Divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/10 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] max-w-md h-[1px] bg-gradient-to-r from-transparent via-amber-500/30 dark:via-amber-400/50 to-transparent shadow-[0_0_15px_rgba(245,158,11,0.5)]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 mt-2">

        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <p className="text-amber-600 dark:text-amber-400 font-sans text-xs md:text-sm uppercase tracking-widest font-bold mb-3">
            PERSONAL GUIDANCE
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-midnight dark:text-cream leading-tight font-bold mb-4">
            Get Clear Answers on <em className="text-amber-600 dark:text-amber-400 italic">Career, Marriage, Money & Health.</em>
          </h2>
        </div>

        {/* Premium Image Card 3-Column Layout */}
        <AnimatedGrid
          ref={scrollRef}
          className="flex items-stretch overflow-x-auto snap-x snap-mandatory lg:grid lg:grid-cols-3 gap-6 lg:gap-8 mt-8 relative z-10 pb-8 pt-4 px-6 -mx-6 lg:mx-0 lg:px-0 lg:pb-0 no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {EXPERTS.map((item, idx) => (
            <AnimatedCard
              key={idx}
              className="snap-center shrink-0 w-[85%] sm:w-[50%] lg:w-full rounded-[2.5rem] flex flex-col group cursor-pointer overflow-hidden relative h-auto lg:h-[480px] border border-black/5 dark:border-amber-500/40 dark:shadow-[0_0_15px_rgba(245,158,11,0.2)] shadow-xl hover:border-[#facc15]/50 hover:shadow-[0_0_40px_rgba(250,204,21,0.2)] transition-all duration-500 bg-white dark:bg-[#0a0e17]"
            >
              {/* Image Container: Stacked on mobile, absolute overlay on desktop */}
              <div className="relative lg:absolute inset-0 z-0 h-[160px] sm:h-[180px] lg:h-full shrink-0">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1500ms] ease-out"
                />
                {/* Light black bg to ensure white text is readable */}
                <div className="hidden lg:block absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10 group-hover:from-black/90 group-hover:via-black/60 group-hover:to-black/40 transition-all duration-500" />
              </div>

              {/* Content Container: Below image on mobile, over image on desktop */}
              <div className="relative z-10 p-6 sm:p-8 flex flex-col justify-start lg:justify-end flex-1 lg:h-full bg-white dark:bg-[#0a0e17] lg:bg-transparent lg:dark:bg-transparent">
                <div className="lg:translate-y-8 lg:group-hover:translate-y-0 transition-transform duration-500 ease-out flex flex-col h-full lg:h-auto">
                  {/* Badge */}
                  <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-white/50 dark:bg-black/50 lg:bg-white/60 lg:dark:bg-black/50 group-hover:bg-white/20 lg:group-hover:bg-white/20 border border-black/10 dark:border-white/20 lg:border-white/30 lg:dark:border-white/20 text-gray-900 dark:text-white lg:text-gray-900 lg:dark:text-white dark:group-hover:text-white lg:group-hover:text-white font-mono text-[10px] uppercase tracking-widest backdrop-blur-md mb-3 w-fit font-bold transition-all duration-500">
                    {item.badgeText}
                  </span>

                  {/* Title */}
                  <h3 className={`font-sans text-xl sm:text-2xl lg:text-3xl ${item.titleColor} lg:text-white lg:dark:text-white group-hover:text-amber-400 lg:group-hover:text-amber-400 dark:group-hover:text-amber-400 font-medium leading-tight mb-2 lg:mb-4 lg:drop-shadow-md transition-colors`}>
                    {item.title}
                  </h3>

                  {/* Description - Always visible on mobile, revealed on hover on desktop */}
                  <div className="grid grid-rows-[1fr] lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
                    <div className="overflow-hidden">
                      <p className="font-body text-gray-700 dark:text-white/90 lg:text-white dark:group-hover:text-white lg:group-hover:text-white text-xs sm:text-sm lg:text-base leading-relaxed mb-4 mt-2 lg:mt-0 transition-colors duration-500 lg:drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] whitespace-pre-line">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 font-sans text-[10px] uppercase tracking-widest font-bold group-hover:text-amber-400 dark:group-hover:text-amber-300 transition-colors mt-auto pt-2 lg:pt-0">
                    {item.cta} <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>

                  {/* Footer Text */}
                  {(item as any).footerText && (
                    <div className="mt-1 text-[9px] sm:text-[10px] text-gray-500 dark:text-gray-300/80 font-sans font-medium lg:text-white/80 lg:group-hover:text-white/90">
                      {(item as any).footerText}
                    </div>
                  )}
                </div>
              </div>
            </AnimatedCard>
          ))}
        </AnimatedGrid>

      </div>
    </section>
  );
}
