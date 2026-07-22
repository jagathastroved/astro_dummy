import { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Flame, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import muruganImg from '../../assets/murugan_img.jpeg';

/** --- Promo Carousel Data & Styles --- */
const PROMO_MESSAGES = [
  {
    id: 1,
    icon: <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />,
    text: "Guru Purnima special rituals now open — registrations close 29 July.",
    cta: "Participate",
    link: "#"
  },
  {
    id: 2,
    icon: <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />,
    text: "New: Exclusive Skanda Shashti 6-Day Power Rituals available.",
    cta: "Book Now",
    link: "#"
  },
  {
    id: 3,
    icon: <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500" />,
    text: "Early bird discount: 15% off all Homas booked this week.",
    cta: "Claim Offer",
    link: "#"
  }
];

const PROMO_BAR_WRAPPER = "w-full max-w-5xl mx-auto px-4 sm:px-6 mb-6 md:mb-8 relative z-20";
const PROMO_BAR_CONTAINER = "relative overflow-hidden rounded-2xl sm:rounded-full bg-gradient-to-r from-amber-900 via-rose-950 to-purple-950 dark:from-amber-950 dark:via-rose-950/80 dark:to-indigo-950/80 border border-amber-500/20 shadow-[0_0_20px_rgba(245,158,11,0.15)] flex items-center justify-center p-0.5 group cursor-pointer";
const PROMO_INNER_GLOW = "absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500";
const PROMO_CONTENT_WRAPPER = "w-full flex items-center justify-center py-2.5 sm:py-3 px-4 relative z-10 min-h-[48px] sm:min-h-[52px]";

/** --- Modern Top/Bottom Layout CSS Classes --- */
const SECTION_STYLES = "py-6 md:py-8 relative z-10 w-full transition-colors duration-500 overflow-hidden";
const CONTENT_WRAPPER_STYLES = "max-w-5xl mx-auto px-6 relative z-10 flex flex-col items-center gap-6";

/* --- TOP SECTION (Typography) --- */
const TOP_SECTION_STYLES = "flex flex-col items-center text-center w-full";

// The standard section title typography requested by the user
const HEADER_TITLE_STYLES = "font-serif text-3xl sm:text-4xl md:text-5xl text-midnight mr-2 dark:text-cream leading-tight font-bold";
const HEADER_ITALIC_STYLES = "font-serif text-3xl sm:text-4xl md:text-5xl text-amber-600 dark:text-amber-400 italic leading-tight font-bold";

/* --- BOTTOM SECTION (Content Card & Action) --- */
const BOTTOM_SECTION_STYLES = "w-full relative";

// Background decorative blob for the modern feel
const DECORATIVE_BLOB_STYLES = "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-gradient-to-tr from-amber-200/40 to-rose-200/40 dark:from-amber-900/20 dark:to-rose-900/20 rounded-full blur-[80px] -z-10 pointer-events-none";

// The sleek, modern floating card that spans the bottom
const CONTENT_CARD_STYLES = "w-full rounded-[2rem] md:rounded-[2rem] p-5 md:p-5 lg:p-8 flex flex-col bg-white/90 dark:bg-[#0B1221]/90 backdrop-blur-xl border border-white/50 dark:border-slate-800 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] relative z-10 hover:-translate-y-2 transition-transform duration-500";

const BADGE_STYLES = "text-amber-600 dark:text-amber-500 font-sans text-xs md:text-sm uppercase tracking-[0.25em] font-extrabold mb-4 block text-center md:text-left";
const TITLE_STYLES = "text-xl md:text-base lg:text-xl xl:text-2xl 2xl:text-3xl font-black text-slate-900 dark:text-white font-serif tracking-tight mb-3 md:mb-2 lg:mb-4 leading-tight md:whitespace-nowrap";
const DESC_TEXT_STYLES = "font-sans text-slate-600 dark:text-slate-300 text-sm md:text-sm lg:text-[15px] leading-relaxed mb-5 md:mb-4 lg:mb-6 text-center md:text-left";

// Bullet points
const LIST_CONTAINER_STYLES = "grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-2 lg:gap-4 mb-5 md:mb-4 lg:mb-6 w-full";
const LIST_ITEM_STYLES = "w-full font-sans text-sm md:text-[13px] lg:text-[15px] text-slate-700 dark:text-slate-200 font-medium flex items-center gap-3 md:gap-2 lg:gap-4 bg-slate-50 dark:bg-slate-800/50 p-3 md:p-2.5 lg:p-4 rounded-xl md:rounded-xl";
const ICON_WRAPPER_STYLES = "w-9 h-9 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center shrink-0 text-base md:text-sm lg:text-lg";

// Urgency pill (Updated to handle multiline text gracefully on mobile and tablet)
const URGENCY_WRAPPER_STYLES = "flex items-start lg:items-center gap-3 border border-rose-200 dark:border-rose-900/50 bg-rose-50 dark:bg-rose-900/20 rounded-2xl lg:rounded-full px-4 lg:px-5 py-3 md:py-2 lg:py-2.5 mb-5 md:mb-4 lg:mb-6 w-full sm:w-fit shadow-sm mx-auto md:mx-0 text-left";
const URGENCY_DOT_STYLES = "w-2.5 h-2.5 md:w-2 md:h-2 lg:w-2.5 lg:h-2.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.4)] animate-pulse shrink-0 mt-[3px] lg:mt-0";
const URGENCY_TEXT_STYLES = "text-[10px] sm:text-[10px] lg:text-xs text-rose-700 dark:text-rose-400 font-sans font-bold uppercase tracking-[0.15em] leading-snug";

// Action area
const ACTION_ROW_STYLES = "mt-auto flex flex-col items-center justify-center gap-3 md:gap-2 lg:gap-4 w-full border-t border-slate-100 dark:border-slate-800 pt-5 md:pt-4 lg:pt-6";
const CTA_WRAPPER_STYLES = "inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#e67e22] to-[#d35400] hover:from-[#d35400] hover:to-[#c0392b] text-white font-sans text-xs sm:text-xs lg:text-sm uppercase tracking-widest font-extrabold px-8 py-3.5 rounded-full transition-all duration-300 w-full sm:w-auto shadow-[0_10px_25px_-5px_rgba(230,126,34,0.4)] hover:shadow-[0_15px_35px_-5px_rgba(230,126,34,0.5)] hover:-translate-y-1 mx-auto text-center whitespace-nowrap shrink-0";
const SUB_CTA_TEXT_STYLES = "text-[11px] sm:text-[11px] lg:text-sm text-slate-500 dark:text-slate-400 font-sans font-medium text-center flex flex-wrap items-center justify-center gap-1.5";

/**
 * Rituals Component
 * Displays a stunning, modern top-and-bottom layout focusing on huge typography above a wide content card.
 */
export function Rituals() {
  const [currentPromo, setCurrentPromo] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPromo((prev) => (prev + 1) % PROMO_MESSAGES.length);
    }, 4000); // Rotates every 4 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <section className={SECTION_STYLES}>
      <div className={CONTENT_WRAPPER_STYLES}>
        {/* --- TOP SECTION: Standard Section Title --- */}
        <div className={TOP_SECTION_STYLES}>
          <span className={BADGE_STYLES}>POWERFUL VEDIC RITUALS</span>
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 mt-2 mb-4">
            <h2 className={HEADER_TITLE_STYLES}>
              Clear Obstacles
            </h2>
            <span className={HEADER_ITALIC_STYLES}>
              from Your Path.
            </span>
          </div>
        </div>

        {/* --- BOTTOM SECTION: Wide Content Card --- */}
        <div className={BOTTOM_SECTION_STYLES}>
          <div className={DECORATIVE_BLOB_STYLES} />

          <div className={CONTENT_CARD_STYLES}>
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-10 w-full">

              {/* --- Left Column: Image (Stacks on top for mobile, side-by-side on tablet/desktop) --- */}
              <div className="w-full md:w-[35%] lg:w-[40%] shrink-0 flex flex-col order-first md:mb-0 relative">
                <img
                  src={muruganImg}
                  alt="Muruga Fire Ritual"
                  className="w-full md:absolute md:inset-0 md:h-full object-cover rounded-[2rem] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] border border-slate-100 dark:border-slate-800"
                />
              </div>

              {/* --- Right Column: Content --- */}
              <div className="w-full md:w-[65%] lg:w-[60%] flex flex-col min-w-0">
                <h3 className={TITLE_STYLES}>Muruga Fire Ritual (Skanda Homa)</h3>

                {/* Description */}
                <p className={DESC_TEXT_STYLES}>
                  108 recitations of the Skanda Shashti Kavacham and 1,008 Muruga moola mantra japa, offered into the sacred fire by 7 temple-trained priests — for removal of obstacles, courage in disputes, and success in long-pending efforts.
                </p>

                {/* Bullet Points */}
                <div className={LIST_CONTAINER_STYLES}>
                  <div className={LIST_ITEM_STYLES}>
                    <div className={ICON_WRAPPER_STYLES}>📍</div>
                    <span>AstroVed Fire Lab, Chennai</span>
                  </div>
                  <div className={LIST_ITEM_STYLES}>
                    <div className={ICON_WRAPPER_STYLES}>🗓️</div>
                    <span>Friday, 10 July · Ashadha Krishna Dashami</span>
                  </div>
                  <div className={`${LIST_ITEM_STYLES} md:col-span-2`}>
                    <div className={ICON_WRAPPER_STYLES}>🙏</div>
                    <span>Performed in your name, with your birth star in the sankalpam</span>
                  </div>
                </div>

                {/* Urgency Pill */}
                <div className={URGENCY_WRAPPER_STYLES}>
                  <span className={URGENCY_DOT_STYLES}></span>
                  <span className={URGENCY_TEXT_STYLES}>REGISTRATIONS CLOSE TONIGHT, 11:59 PM IST</span>
                </div>

                {/* Action Row */}
                <div className={ACTION_ROW_STYLES}>
                  <span className={SUB_CTA_TEXT_STYLES}>
                    <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">From ₹1,100</span>
                    <span>Ritual video within 48 hours</span>
                  </span>
                  <button className={CTA_WRAPPER_STYLES}>
                    PARTICIPATE NOW <ArrowRight className="w-5 h-5 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* --- PROMO SLIDER --- */}
        <div className={PROMO_BAR_WRAPPER}>
          <div className={PROMO_BAR_CONTAINER}>
            <div className={PROMO_INNER_GLOW} />
            <div className={PROMO_CONTENT_WRAPPER}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPromo}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3 text-center sm:text-left"
                >
                  <div className="flex items-center gap-2">
                    {PROMO_MESSAGES[currentPromo].icon}
                    <span className="text-white text-xs sm:text-sm md:text-[15px] font-sans font-medium tracking-wide">
                      {PROMO_MESSAGES[currentPromo].text}
                    </span>
                  </div>
                  <a
                    href={PROMO_MESSAGES[currentPromo].link}
                    className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-bold text-xs sm:text-sm tracking-widest uppercase transition-colors shrink-0 mt-1 sm:mt-0"
                  >
                    {PROMO_MESSAGES[currentPromo].cta}
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </a>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
