import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, ArrowRight, ArrowUpRight } from 'lucide-react';
import { scrollToSection } from '../../utils/scroll';
import { astroved_store, Community_Fire, Pilgrimage_Tours } from '../../assets/Auspicious_Involvements/index';

const actions = [
  {
    id: 1,
    title: "Authentic Fire Rituals for Prosperity, Health, Love & Protection",
    tagline: "PRIEST SERVICES",
    description: "Book a homa performed by experienced temple priests. Your name and birth star are spoken in the sankalpam, and you receive the ritual video and prasad at home — wherever in the world you are.",
    cta: "START WITH A FREE CONSULTATION",
    footerText: "A free 1-on-1 call to choose the right ritual for you— no payment needed.",
    image: Community_Fire,
    imagePosition: "object-[center_15%]",
    link: () => scrollToSection('birth-form'),
    isExternal: false
  },
  {
    id: 2,
    title: "Rudraksha, Yantras, Divine Statues & Malas — Energized Per Vedic Rules Before They Reach You",
    tagline: "ASTROVED SHOP",
    description: "Every product is blessed through traditional rituals before dispatch to bring positive energies into your home and workplace.",
    cta: "SHOP ENERGIZED PRODUCTS",
    footerText: "Ships across India & worldwide",
    image: astroved_store,
    imagePosition: "object-[center_30%]",
    link: "https://www.astroved.com",
    isExternal: true
  },
  {
    id: 3,
    title: "Powerful Temple Yatras, Planned for You",
    tagline: "GUIDED PILGRIMAGE TOURS",
    description: "Guided pilgrimages to sacred temples — travel, priest access, and special darshan arranged, so you can focus on the prayer, not the planning.",
    cta: "VIEW UPCOMING TOURS",
    footerText: "Serving seekers across the globe",
    image: Pilgrimage_Tours,
    imagePosition: "object-[center_10%]",
    link: "https://www.astroved.com",
    isExternal: true
  }
];

export function PersonalizedSolutions() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) nextSlide();
    if (distance < -50) prevSlide();
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === actions.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? actions.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-4 md:py-6 px-6 max-w-7xl mx-auto z-10" id="auspicious-actions">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <p className="text-amber-600 dark:text-amber-400 font-sans text-xs md:text-sm uppercase tracking-widest font-bold mb-3">
          REMEDIES THAT REACH YOU AT HOME
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-midnight dark:text-cream leading-tight font-bold mb-4">
          Book Rituals & Remedies in Your <em className="text-amber-600 dark:text-amber-400 italic">Name.</em>
        </h2>
        <p className="font-sans text-gray-500 dark:text-gray-400 text-sm md:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto font-medium">
          Performed by temple-trained priests — you watch from home, the blessings reach your family
        </p>
      </div>

      {/* Desktop/Tablet Grid View (No Carousel) */}
      <div className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
        {actions.map((ev, idx) => (
          <div key={idx} className="group overflow-hidden rounded-[2.5rem] bg-[#f8f9fa] dark:bg-[#0b0e14] border border-gray-100 dark:border-white/5 hover:border-[#b052ff]/30 hover:shadow-[0_0_30px_rgba(176,82,255,0.15)] transition-all duration-500 flex flex-col h-full relative">
            <div className="w-full h-44 lg:h-48 relative overflow-hidden rounded-t-[2.5rem]">
              <img
                src={ev.image}
                alt={ev.title}
                className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1500ms] ease-out ${ev.imagePosition}`}
              />
            </div>

            <div className="px-5 lg:px-8 pb-8 pt-4 flex flex-col flex-grow z-10 relative">
              {/* Fixed height container for Badge and Title to align descriptions */}
              <div className="min-h-[110px] lg:min-h-[125px] flex flex-col justify-start">
                <div className="flex items-start mb-3 lg:mb-4">
                  <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-[#b052ff]/10 dark:bg-[#b052ff]/20 text-[#b052ff] dark:text-[#d08bff] font-sans text-[9px] lg:text-[11px] uppercase tracking-widest font-bold">
                    {ev.tagline}
                  </span>
                </div>
                <h3 className="font-sans text-base lg:text-xl xl:text-2xl text-gray-900 dark:text-white font-bold tracking-tight mb-2 lg:mb-3 leading-snug">
                  {ev.title}
                </h3>
              </div>

              {/* Description with flex-grow to push buttons down */}
              <p className="font-sans text-gray-600 dark:text-gray-300 text-xs lg:text-sm leading-relaxed mb-6 flex-grow">
                {ev.description}
              </p>

              {/* Button and footer container pinned to bottom */}
              <div className="mt-auto flex flex-col justify-start w-full">
                <div className="flex justify-center w-full min-h-[44px]">
                  {ev.isExternal ? (
                    <a
                      href={ev.link as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full justify-center items-center gap-1.5 px-3 lg:px-6 py-2.5 lg:py-3 rounded-full bg-[#b052ff] hover:bg-[#9333ea] text-white font-semibold tracking-wide text-[9px] lg:text-xs hover:scale-105 transition-transform shadow-md text-center leading-tight"
                    >
                      {ev.cta} <ArrowUpRight className="w-3.5 h-3.5 flex-shrink-0" />
                    </a>
                  ) : (
                    <button
                      onClick={ev.link as () => void}
                      className="flex w-full justify-center items-center gap-1.5 px-3 lg:px-6 py-2.5 lg:py-3 rounded-full bg-[#b052ff] hover:bg-[#9333ea] text-white font-semibold tracking-wide text-[9px] lg:text-xs hover:scale-105 transition-transform shadow-md text-center leading-tight"
                    >
                      {ev.cta} <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" />
                    </button>
                  )}
                </div>
                {/* Fixed height footer to ensure buttons align horizontally */}
                <div className="mt-2 text-[10px] lg:text-[11px] text-gray-500 dark:text-gray-400 font-medium font-sans min-h-[32px] text-center lg:text-left">
                  {(ev as any).footerText || ""}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Carousel View */}
      <div
        className="md:hidden relative group px-0 touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Main Card */}
        <div className="overflow-hidden rounded-[2.5rem] bg-[#f8f9fa] dark:bg-[#0b0e14] border border-gray-100 dark:border-white/5 hover:border-[#b052ff]/30 hover:shadow-[0_0_40px_rgba(176,82,255,0.15)] transition-all duration-500 relative h-[670px] lg:h-[450px]">
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
                const ev = actions[currentIndex];
                return (
                  <div className="group/card flex flex-col lg:flex-row h-full relative">
                    {/* Background Image (Desktop) */}
                    <div className="hidden lg:block absolute top-0 bottom-0 left-0 w-[55%] overflow-hidden pointer-events-none">
                      <img
                        src={ev.image}
                        alt={ev.title}
                        className={`w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-[1500ms] ease-out ${ev.imagePosition}`}
                        style={{
                          WebkitMaskImage: 'linear-gradient(to right, black 85%, transparent 100%)',
                          maskImage: 'linear-gradient(to right, black 85%, transparent 100%)'
                        }}
                      />
                    </div>

                    {/* Background Image (Mobile & Tablet) */}
                    <div className="lg:hidden absolute top-0 inset-x-0 h-[220px] overflow-hidden pointer-events-none rounded-t-[2.5rem]">
                      <picture>
                        <source media="(min-width: 768px)" srcSet={ev.image} />
                        <img
                          src={(ev as any).mobileImage || ev.image}
                          alt={ev.title}
                          className={`w-full h-full object-cover ${ev.imagePosition}`}
                        />
                      </picture>
                      {/* Smooth solid transition instead of blur */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#f8f9fa] dark:from-[#0b0e14] to-transparent h-24 top-auto bottom-0"></div>
                    </div>

                    {/* Content */}
                    <div className="w-full lg:w-[45%] ml-auto px-6 pb-20 pt-[180px] sm:px-12 lg:p-16 flex flex-col justify-center items-center lg:items-start text-center lg:text-left z-10 relative h-full lg:mt-0 lg:pt-0">
                      <div className="w-full">
                        <div className="flex items-center justify-center lg:justify-start mb-4 relative z-20">
                          <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-white dark:bg-[#1a1525] shadow-[0_4px_15px_rgba(0,0,0,0.1)] border border-gray-100 dark:border-gray-800 text-[#b052ff] dark:text-[#d08bff] font-sans text-[10px] sm:text-xs uppercase tracking-widest font-bold">
                            {ev.tagline}
                          </span>
                        </div>

                        <h3 className="font-sans text-2xl lg:text-3xl text-gray-900 dark:text-white font-bold tracking-tight mb-4 leading-snug">
                          {ev.title}
                        </h3>

                        <p className="font-sans text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed mb-6 max-w-sm mx-auto lg:mx-0">
                          {ev.description}
                        </p>

                        <div className="flex justify-center w-full mb-3">
                          {ev.isExternal ? (
                            <a
                              href={ev.link as string}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex w-full max-w-[280px] justify-center items-center gap-1.5 px-4 py-3 rounded-full bg-[#b052ff] hover:bg-[#9333ea] text-white font-semibold tracking-wide text-xs sm:text-sm hover:scale-105 transition-transform shadow-lg text-center"
                            >
                              {ev.cta} <ArrowUpRight className="w-3.5 h-3.5" />
                            </a>
                          ) : (
                            <button
                              onClick={ev.link as () => void}
                              className="inline-flex w-full max-w-[280px] justify-center items-center gap-1.5 px-4 py-3 rounded-full bg-[#b052ff] hover:bg-[#9333ea] text-white font-semibold tracking-wide text-xs sm:text-sm hover:scale-105 transition-transform shadow-lg text-center"
                            >
                              {ev.cta} <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                        {(ev as any).footerText && (
                          <div className="text-xs text-gray-500 dark:text-gray-400 font-medium font-sans">
                            {(ev as any).footerText}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="absolute top-[17%] -translate-y-1/2 left-0 right-0 flex justify-between px-2 sm:px-4 md:-mx-6 pointer-events-none z-20">
          <button
            onClick={prevSlide}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/80 hover:bg-white dark:bg-black/30 dark:hover:bg-black/50 backdrop-blur-md border border-gray-200 dark:border-white/10 flex items-center justify-center text-[#b052ff] dark:text-white transition-all hover:scale-110 pointer-events-auto shadow-lg"
            aria-label="Previous event"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/80 hover:bg-white dark:bg-black/30 dark:hover:bg-black/50 backdrop-blur-md border border-gray-200 dark:border-white/10 flex items-center justify-center text-[#b052ff] dark:text-white transition-all hover:scale-110 pointer-events-auto shadow-lg"
            aria-label="Next event"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Pagination Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-50 lg:bottom-8 lg:right-12 lg:left-auto lg:translate-x-0">
          {actions.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`transition-all duration-500 rounded-full ${idx === currentIndex
                ? 'w-6 h-1.5 bg-[#b052ff] dark:bg-[#b052ff] shadow-sm'
                : 'w-1.5 h-1.5 bg-gray-400 hover:bg-gray-500 dark:bg-white/40 dark:hover:bg-white/60 shadow-sm'
                }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
