import { useRef, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { AnimatedGrid } from '../ui/AnimatedGrid';
import { AnimatedCard } from '../ui/AnimatedCard';
import { palm_leaf, personal_report } from '../../assets/vedic_master/index';
import liveConsultationsImg from '../../assets/Services/live_consultations.png';

/**
 * Interface defining the structure for Personal Guidance cards.
 */
interface ExpertItem {
  badgeText: string;
  title: string;
  desc: string;
  cta: string;
  footerText?: string;
  image: string;
  titleColor: string;
}

/**
 * Static configuration for the Personal Guidance cards.
 */
const EXPERTS: ExpertItem[] = [
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

/** --- Shared Tailwind CSS Classes --- */

const SECTION_STYLES = "py-6 md:py-8 transition-colors duration-500 relative overflow-hidden z-10 mt-4 md:mt-6";
const DIVIDER_TOP_STYLES = "absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/10 to-transparent";
const DIVIDER_GLOW_STYLES = "absolute top-0 left-1/2 -translate-x-1/2 w-[40%] max-w-md h-[1px] bg-gradient-to-r from-transparent via-amber-500/30 dark:via-amber-400/50 to-transparent shadow-[0_0_15px_rgba(245,158,11,0.5)]";
const CONTENT_WRAPPER_STYLES = "max-w-7xl mx-auto px-6 relative z-10 mt-2";
const HEADER_SUBTITLE_STYLES = "text-amber-600 dark:text-amber-400 font-sans text-xs md:text-sm uppercase tracking-widest font-bold mb-3";
const HEADER_TITLE_STYLES = "font-serif text-3xl sm:text-4xl md:text-5xl text-midnight dark:text-cream leading-tight font-bold mb-4";
const GRID_CONTAINER_STYLES = "flex items-stretch overflow-x-auto snap-x snap-mandatory lg:grid lg:grid-cols-3 gap-6 lg:gap-8 mt-8 relative z-10 pb-8 pt-4 px-6 -mx-6 lg:mx-0 lg:px-0 lg:pb-0 no-scrollbar";
const CARD_STYLES = "snap-center shrink-0 w-[85%] sm:w-[50%] lg:w-full rounded-[2.5rem] flex flex-col group cursor-pointer overflow-hidden relative h-auto lg:h-[480px] border border-black/5 dark:border-amber-500/40 dark:shadow-[0_0_15px_rgba(245,158,11,0.2)] shadow-xl hover:border-[#facc15]/50 hover:shadow-[0_0_40px_rgba(250,204,21,0.2)] transition-all duration-500 bg-white dark:bg-[#0a0e17]";
const IMAGE_CONTAINER_STYLES = "relative lg:absolute inset-0 z-0 h-[160px] sm:h-[180px] lg:h-full shrink-0";
const IMAGE_STYLES = "w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1500ms] ease-out";
const IMAGE_GRADIENT_STYLES = "hidden lg:block absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10 group-hover:from-black/90 group-hover:via-black/60 group-hover:to-black/40 transition-all duration-500";
const CARD_CONTENT_STYLES = "relative z-10 p-6 sm:p-8 flex flex-col justify-start lg:justify-end flex-1 lg:h-full bg-white dark:bg-[#0a0e17] lg:bg-transparent lg:dark:bg-transparent";
const CARD_ANIMATION_WRAPPER_STYLES = "lg:translate-y-8 lg:group-hover:translate-y-0 transition-transform duration-500 ease-out flex flex-col h-full lg:h-auto";
const BADGE_STYLES = "inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-white/50 dark:bg-black/50 lg:bg-white/60 lg:dark:bg-black/50 group-hover:bg-white/20 lg:group-hover:bg-white/20 border border-black/10 dark:border-white/20 lg:border-white/30 lg:dark:border-white/20 text-gray-900 dark:text-white lg:text-gray-900 lg:dark:text-white dark:group-hover:text-white lg:group-hover:text-white font-mono text-[10px] uppercase tracking-widest backdrop-blur-md mb-3 w-fit font-bold transition-all duration-500";
const DESC_GRID_STYLES = "grid grid-rows-[1fr] lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out";
const DESC_TEXT_STYLES = "font-body text-gray-700 dark:text-white/90 lg:text-white dark:group-hover:text-white lg:group-hover:text-white text-xs sm:text-sm lg:text-base leading-relaxed mb-4 mt-2 lg:mt-0 transition-colors duration-500 lg:drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] whitespace-pre-line";
const CTA_WRAPPER_STYLES = "inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 font-sans text-[10px] uppercase tracking-widest font-bold group-hover:text-amber-400 dark:group-hover:text-amber-300 transition-colors mt-auto pt-2 lg:pt-0";
const FOOTER_TEXT_STYLES = "mt-1 text-[9px] sm:text-[10px] text-gray-500 dark:text-gray-300/80 font-sans font-medium lg:text-white/80 lg:group-hover:text-white/90";

/**
 * Helper function to retrieve dynamic title styling combined with custom card colors.
 * @param titleColor - The specific color tailwind class for this expert's title.
 */
const getCardTitleStyles = (titleColor: string): string => {
  return `font-sans text-xl sm:text-2xl lg:text-3xl ${titleColor} lg:text-white lg:dark:text-white group-hover:text-amber-400 lg:group-hover:text-amber-400 dark:group-hover:text-amber-400 font-medium leading-tight mb-2 lg:mb-4 lg:drop-shadow-md transition-colors`;
};

/**
 * PersonalGuidance Component
 * Displays a responsive, horizontal-scrolling / grid layout of consultation services.
 */
export function PersonalGuidance() {
  const scrollRef = useRef<HTMLDivElement>(null);

  /**
   * Auto-scroll functionality for mobile views.
   */
  useEffect(() => {
    const autoScrollInterval = setInterval(() => {
      if (scrollRef.current && window.innerWidth < 1024) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 20) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: clientWidth * 0.85, behavior: 'smooth' });
        }
      }
    }, 4000);

    return () => clearInterval(autoScrollInterval);
  }, []);

  return (
    <section className={SECTION_STYLES}>

      {/* --- Section Top Dividers --- */}
      <div className={DIVIDER_TOP_STYLES} />
      <div className={DIVIDER_GLOW_STYLES} />

      <div className={CONTENT_WRAPPER_STYLES}>

        {/* --- Header Section --- */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <p className={HEADER_SUBTITLE_STYLES}>
            PERSONAL GUIDANCE
          </p>
          <h2 className={HEADER_TITLE_STYLES}>
            Get Clear Answers on <em className="text-amber-600 dark:text-amber-400 italic">Career, Marriage, Money & Health.</em>
          </h2>
        </div>

        {/* --- Premium Cards Grid Section --- */}
        <AnimatedGrid
          ref={scrollRef}
          className={GRID_CONTAINER_STYLES}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {EXPERTS.map((expert, expertIndex) => (
            <AnimatedCard
              key={expertIndex}
              className={CARD_STYLES}
            >

              {/* --- Card Background Image (Stacked mobile, Overlay desktop) --- */}
              <div className={IMAGE_CONTAINER_STYLES}>
                <img
                  src={expert.image}
                  alt={expert.title}
                  className={IMAGE_STYLES}
                />
                <div className={IMAGE_GRADIENT_STYLES} />
              </div>

              {/* --- Card Foreground Content --- */}
              <div className={CARD_CONTENT_STYLES}>
                <div className={CARD_ANIMATION_WRAPPER_STYLES}>

                  {/* Badge */}
                  <span className={BADGE_STYLES}>
                    {expert.badgeText}
                  </span>

                  {/* Title */}
                  <h3 className={getCardTitleStyles(expert.titleColor)}>
                    {expert.title}
                  </h3>

                  {/* Description (Visible on mobile, Hover-reveal on desktop) */}
                  <div className={DESC_GRID_STYLES}>
                    <div className="overflow-hidden">
                      <p className={DESC_TEXT_STYLES}>
                        {expert.desc}
                      </p>
                    </div>
                  </div>

                  {/* CTA Link */}
                  <div className={CTA_WRAPPER_STYLES}>
                    {expert.cta} <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>

                  {/* Footer Context Text */}
                  {expert.footerText && (
                    <div className={FOOTER_TEXT_STYLES}>
                      {expert.footerText}
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
