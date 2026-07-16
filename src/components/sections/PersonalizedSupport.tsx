import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import shreemBrzeeImg from '../../assets/shreem_brzee_new.png';
import tarpanamNewImg from '../../assets/tarpanam_new.png';

/**
 * Interface defining the structure for continuous support solutions.
 */
interface SupportItem {
  id: number;
  title: string;
  tagline: string;
  description: string;
  cta: string;
  image: string;
  mobileImage?: string;
  imageFit?: string;
  imagePosition?: string;
  bgGradient: string;
  iconColor: string;
  buttonColor: string;
}

/**
 * Static configuration for the continuous support cards.
 */
const SUPPORT_SOLUTIONS: SupportItem[] = [
  {
    id: 1,
    title: "Shreem Brzee Membership",
    tagline: "Abundance & Prosperity",
    description: "Receive ongoing abundance-focused guidance, exclusive rituals, personalized recommendations, and premium spiritual resources.",
    cta: "Join Membership",
    image: shreemBrzeeImg,
    imagePosition: "object-center",
    bgGradient: "from-purple-100 via-fuchsia-50 to-pink-100 dark:from-purple-900/60 dark:via-fuchsia-900/60 dark:to-pink-900/60",
    iconColor: "text-purple-500 dark:text-purple-400",
    buttonColor: "bg-[#a855f7] hover:bg-[#9333ea]"
  },
  {
    id: 2,
    title: "Yearlong Tarpanam",
    tagline: "Ancestral Blessings",
    description: "Honor your ancestors throughout the year with scheduled sacred rituals performed by experienced temple priests.",
    cta: "Learn More",
    image: tarpanamNewImg,
    imageFit: "object-cover",
    imagePosition: "object-center",
    bgGradient: "from-orange-100 via-rose-50 to-red-100 dark:from-orange-900/60 dark:via-red-900/60 dark:to-rose-900/60",
    iconColor: "text-orange-500 dark:text-orange-400",
    buttonColor: "bg-orange-500 hover:bg-orange-600"
  }
];

/** --- Shared Tailwind CSS Classes --- */

/* Base Section & Headers */
const SECTION_WRAPPER_STYLES = "py-4 md:py-6 relative overflow-hidden transition-colors duration-500 z-10";
const PARTICLES_CONTAINER_STYLES = "absolute inset-0 pointer-events-none overflow-hidden z-0";
const CONTENT_WRAPPER_STYLES = "max-w-7xl mx-auto px-6 relative z-10";
const HEADER_CONTAINER_STYLES = "text-center max-w-3xl mx-auto mb-10 relative z-10";
const HEADER_SUBTITLE_STYLES = "text-amber-600 dark:text-amber-400 font-sans text-xs md:text-sm uppercase tracking-widest font-bold mb-3";
const HEADER_TITLE_STYLES = "font-serif text-3xl sm:text-4xl md:text-5xl text-midnight dark:text-cream leading-tight font-bold mb-4";
const HEADER_DESC_STYLES = "font-sans text-gray-500 dark:text-gray-400 text-sm md:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto font-medium";

/* Desktop Grid Layout (Cards) */
const DESKTOP_GRID_STYLES = "hidden md:grid md:grid-cols-2 gap-6 lg:gap-8";
const DESKTOP_CARD_STYLES = "group overflow-hidden rounded-[2.5rem] bg-[#0b0e14] border border-white/5 hover:border-[#facc15]/50 hover:shadow-[0_0_30px_rgba(250,204,21,0.15)] transition-all duration-500 flex flex-col h-[500px] lg:h-[550px] relative";
const DESKTOP_IMG_WRAPPER_STYLES = "absolute inset-0 w-full h-full overflow-hidden pointer-events-none rounded-[2.5rem] z-0";
const DESKTOP_GRADIENT_OVERLAY = "absolute inset-0 bg-gradient-to-t from-[#0b0e14]/95 via-[#0b0e14]/60 to-transparent";
const DESKTOP_CONTENT_WRAPPER_STYLES = "px-6 lg:px-8 pb-8 pt-8 flex flex-col justify-end flex-grow z-10 relative h-full";
const DESKTOP_CONTENT_STYLES = "mt-auto";
const TAGLINE_WRAPPER_STYLES = "flex items-start mb-2";
const TAGLINE_STYLES = "font-serif italic text-lg lg:text-xl text-amber-400 dark:text-amber-500";
const TITLE_STYLES = "font-serif text-2xl lg:text-3xl text-white font-bold tracking-wider mb-3 leading-tight uppercase";
const DESC_STYLES = "font-body text-gray-200 dark:text-gray-300 text-sm md:text-base leading-relaxed mb-8 max-w-sm";

/* Mobile Carousel Layout */
const MOBILE_CONTAINER_STYLES = "md:hidden relative group px-0 touch-pan-y";
const MOBILE_CAROUSEL_BOX_STYLES = "overflow-hidden rounded-[2.5rem] bg-[#0b0e14] border border-white/5 hover:border-[#facc15]/50 hover:shadow-[0_0_40px_rgba(250,204,21,0.2)] transition-all duration-500 relative h-[550px] lg:h-[450px]";
const MOBILE_CARD_INNER_STYLES = "group/card flex flex-col lg:flex-row h-full relative";
const MOBILE_DESKTOP_IMG_OVERLAY_STYLES = "hidden lg:block absolute top-0 bottom-0 left-0 w-[65%] overflow-hidden pointer-events-none";
const MOBILE_IMG_WRAPPER_STYLES = "lg:hidden absolute inset-0 w-full h-full overflow-hidden pointer-events-none rounded-[2.5rem] bg-[#0b0e14]";
const MOBILE_GRADIENT_OVERLAY_STYLES = "absolute inset-0 bg-gradient-to-t from-[#0b0e14]/95 via-[#0b0e14]/60 to-transparent";
const MOBILE_CONTENT_CONTAINER_STYLES = "w-full lg:w-[45%] ml-auto px-8 pb-20 pt-8 sm:p-12 lg:p-16 flex flex-col justify-end lg:justify-center items-center lg:items-end text-center lg:text-right z-10 relative h-full lg:mt-0 lg:pt-16";
const MOBILE_TAGLINE_WRAPPER_STYLES = "flex items-center justify-center lg:justify-end mb-4";
const MOBILE_TAGLINE_STYLES = "font-serif italic text-xl lg:text-2xl text-amber-400 dark:text-amber-500";
const MOBILE_TITLE_STYLES = "font-serif text-2xl lg:text-3xl xl:text-4xl text-white font-bold tracking-wider mb-4 leading-tight uppercase";
const MOBILE_DESC_STYLES = "font-body text-gray-200 dark:text-gray-300 text-sm md:text-base leading-relaxed mb-8 drop-shadow-md lg:ml-auto max-w-sm";

/* Navigation */
const NAV_BUTTONS_CONTAINER_STYLES = "absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-2 sm:px-4 md:-mx-6 pointer-events-none z-20";
const NAV_BUTTON_STYLES = "w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white transition-all hover:scale-110 pointer-events-auto shadow-lg";
const PAGINATION_CONTAINER_STYLES = "absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20 lg:bottom-8 lg:right-12 lg:left-auto lg:translate-x-0";

/**
 * Returns dynamic desktop image styles merging positioning and layout.
 * @param imageFit - Optional object-fit CSS property
 * @param imagePosition - Optional object-position CSS property
 */
const getDesktopImageStyles = (imageFit?: string, imagePosition?: string): string => {
  return `w-full h-full ${imageFit || 'object-cover'} group-hover:scale-105 transition-transform duration-[1500ms] ease-out ${imagePosition || 'object-center'}`;
};

/**
 * Returns dynamic mobile image styles merging positioning and layout.
 * @param isDesktopView - True if rendering the desktop carousel variant
 * @param imageFit - Optional object-fit CSS property
 * @param imagePosition - Optional object-position CSS property
 */
const getCarouselImageStyles = (isDesktopView: boolean, imageFit?: string, imagePosition?: string): string => {
  if (isDesktopView) {
    return `w-full h-full ${imageFit || 'object-cover'} group-hover/card:scale-105 transition-transform duration-[1500ms] ease-out ${imagePosition || 'object-center'}`;
  }
  return `w-full h-full ${imageFit || 'object-cover'} ${imagePosition || 'object-center'}`;
};

/**
 * Returns dynamic button styling string by combining base styles with the custom button color.
 * @param buttonColor - Specific background color class for the button.
 * @param isMobile - True if this is for the mobile carousel context.
 */
const getCTAButtonStyles = (buttonColor: string, isMobile: boolean): string => {
  if (isMobile) {
    return `inline-flex items-center gap-2 px-8 py-3.5 rounded-full ${buttonColor} text-white font-semibold tracking-wide text-sm hover:scale-105 transition-transform shadow-lg`;
  }
  return `px-6 py-3 rounded-full text-white font-medium text-sm flex items-center gap-2 group/btn transition-all duration-300 ${buttonColor}`;
};

/**
 * Returns dynamic pagination dot styles based on active state.
 * @param isActive - Whether the current dot matches the active slide index.
 */
const getPaginationDotStyles = (isActive: boolean): string => {
  return `transition-all duration-500 rounded-full ${isActive
    ? 'w-6 h-1.5 bg-amber-400'
    : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/60'
    }`;
};

/**
 * PersonalizedSupport Component
 * 
 * Renders continuous support programs via standard grid (Desktop) 
 * or interactive carousel (Mobile).
 */
export function PersonalizedSupport() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  /**
   * Captures initial X position for mobile swipe gestures.
   */
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  /**
   * Tracks X position updates during a mobile swipe gesture.
   */
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  /**
   * Completes the swipe gesture and checks distance to see if slide should change.
   */
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) nextSlide();
    if (distance < -50) prevSlide();
  };

  /**
   * Advances the carousel to the next slide, wrapping around if at the end.
   */
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === SUPPORT_SOLUTIONS.length - 1 ? 0 : prev + 1));
  };

  /**
   * Reverses the carousel to the previous slide, wrapping around if at the beginning.
   */
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? SUPPORT_SOLUTIONS.length - 1 : prev - 1));
  };

  /**
   * Auto-scroll functionality for the mobile carousel.
   */
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="personalized-support" className={SECTION_WRAPPER_STYLES}>

      {/* --- Decorative Particle Background --- */}
      <div className={PARTICLES_CONTAINER_STYLES}>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            initial={{ opacity: 0, y: 0, x: 0 }}
            animate={{
              opacity: [0, 0.6, 0],
              y: [-20, -150 - Math.random() * 150],
              x: [0, (Math.random() - 0.5) * 150]
            }}
            transition={{
              duration: 3 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeOut"
            }}
            className="absolute rounded-full bg-amber-400 blur-[1px]"
            style={{
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className={CONTENT_WRAPPER_STYLES}>

        {/* --- Header Section --- */}
        <div className={HEADER_CONTAINER_STYLES}>
          <p className={HEADER_SUBTITLE_STYLES}>
            CONTINUOUS SUPPORT
          </p>
          <h2 className={HEADER_TITLE_STYLES}>
            Ongoing Blessings <em className="text-amber-600 dark:text-amber-400 italic">for Your Family.</em>
          </h2>
          <p className={HEADER_DESC_STYLES}>
            For devotees who want continuous support — not one-time remedies.
          </p>
        </div>

        {/* --- Desktop/Tablet Grid View (No Carousel) --- */}
        <div className={DESKTOP_GRID_STYLES}>
          {SUPPORT_SOLUTIONS.map((support, itemIndex) => (
            <div key={itemIndex} className={DESKTOP_CARD_STYLES}>

              {/* Full Background Image */}
              <div className={DESKTOP_IMG_WRAPPER_STYLES}>
                <img
                  src={support.image}
                  alt={support.title}
                  className={getDesktopImageStyles(support.imageFit, support.imagePosition)}
                />
                <div className={DESKTOP_GRADIENT_OVERLAY}></div>
              </div>

              {/* Content overlaid on image */}
              <div className={DESKTOP_CONTENT_WRAPPER_STYLES}>
                <div className={DESKTOP_CONTENT_STYLES}>

                  {/* Tagline */}
                  <div className={TAGLINE_WRAPPER_STYLES}>
                    <span className={TAGLINE_STYLES}>
                      {support.tagline}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className={TITLE_STYLES}>
                    {support.title}
                  </h3>

                  {/* Description */}
                  <p className={DESC_STYLES}>
                    {support.description}
                  </p>

                  {/* CTA Button */}
                  <div>
                    <button className={getCTAButtonStyles(support.buttonColor, false)}>
                      {support.cta}
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>

                </div>
              </div>

            </div>
          ))}
        </div>

        {/* --- Mobile Carousel View --- */}
        <div
          className={MOBILE_CONTAINER_STYLES}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Main Card Wrapper */}
          <div className={MOBILE_CAROUSEL_BOX_STYLES}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full h-full absolute inset-0"
              >
                {(() => {
                  const currentSupport = SUPPORT_SOLUTIONS[currentIndex];
                  return (
                    <div className={MOBILE_CARD_INNER_STYLES}>

                      {/* Background Image (Desktop override) */}
                      <div className={MOBILE_DESKTOP_IMG_OVERLAY_STYLES}>
                        <img
                          src={currentSupport.image}
                          alt={currentSupport.title}
                          className={getCarouselImageStyles(true, currentSupport.imageFit, currentSupport.imagePosition)}
                          style={{
                            WebkitMaskImage: currentSupport.imageFit?.includes('contain') ? 'none' : 'linear-gradient(to right, black 50%, transparent 100%)',
                            maskImage: currentSupport.imageFit?.includes('contain') ? 'none' : 'linear-gradient(to right, black 50%, transparent 100%)'
                          }}
                        />
                      </div>

                      {/* Background Image (Mobile & Tablet) */}
                      <div className={MOBILE_IMG_WRAPPER_STYLES}>
                        <picture>
                          <source media="(min-width: 768px)" srcSet={currentSupport.image} />
                          <img
                            src={currentSupport.mobileImage || currentSupport.image}
                            alt={currentSupport.title}
                            className={getCarouselImageStyles(false, currentSupport.imageFit, currentSupport.imagePosition)}
                          />
                        </picture>
                        <div className={MOBILE_GRADIENT_OVERLAY_STYLES}></div>
                      </div>

                      {/* Content Section */}
                      <div className={MOBILE_CONTENT_CONTAINER_STYLES}>
                        <div className="w-full">

                          {/* Tagline */}
                          <div className={MOBILE_TAGLINE_WRAPPER_STYLES}>
                            <span className={MOBILE_TAGLINE_STYLES}>
                              {currentSupport.tagline}
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className={MOBILE_TITLE_STYLES}>
                            {currentSupport.title}
                          </h3>

                          {/* Description */}
                          <p className={MOBILE_DESC_STYLES}>
                            {currentSupport.description}
                          </p>

                          {/* CTA Button */}
                          <button className={getCTAButtonStyles(currentSupport.buttonColor, true)}>
                            {currentSupport.cta} <ArrowRight className="w-4 h-4" />
                          </button>

                        </div>
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* --- Carousel Navigation Controls --- */}
          <div className={NAV_BUTTONS_CONTAINER_STYLES}>
            <button
              onClick={prevSlide}
              className={NAV_BUTTON_STYLES}
              aria-label="Previous event"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button
              onClick={nextSlide}
              className={NAV_BUTTON_STYLES}
              aria-label="Next event"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* --- Carousel Pagination Indicators --- */}
          <div className={PAGINATION_CONTAINER_STYLES}>
            {SUPPORT_SOLUTIONS.map((_, itemIndex) => (
              <button
                key={itemIndex}
                onClick={() => setCurrentIndex(itemIndex)}
                className={getPaginationDotStyles(itemIndex === currentIndex)}
                aria-label={`Go to slide ${itemIndex + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
