import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, ArrowRight, ArrowUpRight } from 'lucide-react';
import { scrollToSection } from '../../utils/scroll';
import { astroved_store, Community_Fire, Pilgrimage_Tours } from '../../assets/Auspicious_Involvements/index';
import holy_temple from '../../assets/Holy_temples.png'
import astroved_shop from '../../assets/astroved_shop_img_v2.png'
import vedic_fire_img from '../../assets/vedic_fire.png'

const actions = [
  {
    id: 1,
    title: "Vedic Fire Ritual",
    tagline: "PRIEST SERVICES",
    description: "Book authentic Vedic rituals conducted by experienced priests for prosperity, health, relationships, and protection.",
    cta: "ENROLL FREE INTAKE",
    image: vedic_fire_img,
    imagePosition: "object-center",
    link: () => scrollToSection('birth-form'),
    isExternal: false
  },
  {
    id: 2,
    title: "Energized Products",
    tagline: "ASTROVED SHOP",
    description: "Spiritually energized products blessed through traditional rituals to attract positive energies into your life.",
    cta: "BROWSE SHOP",
    image: astroved_shop,
    imagePosition: "object-center",
    link: "https://www.astroved.com",
    isExternal: true
  },
  {
    id: 3,
    title: "Holy Temples",
    tagline: "PILGRIMAGE TOURS",
    description: "Experience spiritually guided pilgrimages to sacred temples with carefully planned devotional journeys.",
    cta: "VIEW TOURS",
    image: holy_temple,
    imagePosition: "object-[center_10%]",
    link: "https://www.astroved.com",
    isExternal: true
  }
];

export function AuspiciousActions() {
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
      <div className="max-w-3xl mx-auto text-center mb-6">
        <h2 className="font-sans text-4xl sm:text-5xl text-midnight dark:text-cream leading-tight mb-4">
          Personalized <em className="text-amber-600 dark:text-amber-400 italic">Solutions.</em>
        </h2>
      </div>

      {/* Desktop/Tablet Grid View (No Carousel) */}
      <div className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8">
        {actions.map((ev, idx) => (
          <div key={idx} className="group overflow-hidden rounded-[2.5rem] bg-white dark:bg-[#0b0e14] border border-gray-200 dark:border-white/5 hover:border-[#b052ff]/50 hover:shadow-[0_0_30px_rgba(176,82,255,0.2)] transition-all duration-500 flex flex-col h-full relative shadow-xl">
            {/* Top Image Container */}
            <div className="w-full h-56 lg:h-64 relative overflow-hidden rounded-t-[2.5rem]">
              <img
                src={ev.image}
                alt={ev.title}
                className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1500ms] ease-out ${ev.imagePosition === 'object-center' ? 'object-[center_10%]' : ev.imagePosition}`}
              />
            </div>

            {/* Content below image */}
            <div className="px-6 lg:px-8 pb-8 pt-6 flex flex-col flex-grow z-10 relative bg-white dark:bg-[#0b0e14]">
              <div className="flex items-start mb-2">
                <span className="font-serif font-bold tracking-[0.15em] text-xs lg:text-sm text-[#b052ff] dark:text-[#d8b4fe] uppercase">
                  {ev.tagline}
                </span>
              </div>
              <h3 className="font-serif text-2xl lg:text-3xl text-gray-900 dark:text-white font-bold tracking-tight mb-3 leading-tight">
                {ev.title}
              </h3>
              <p className="font-body text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-8 flex-grow">
                {ev.description}
              </p>

              <div className="mt-auto flex justify-start">
                {ev.isExternal ? (
                  <a
                    href={ev.link as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#b052ff] hover:bg-[#9333ea] text-white font-semibold tracking-wide text-xs hover:scale-105 transition-transform shadow-md"
                  >
                    {ev.cta} <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <button
                    onClick={ev.link as () => void}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#b052ff] hover:bg-[#9333ea] text-white font-semibold tracking-wide text-xs hover:scale-105 transition-transform shadow-md"
                  >
                    {ev.cta} <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
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
        <div className="overflow-hidden rounded-[2.5rem] bg-[#f8f9fa] dark:bg-[#0b0e14] border border-gray-100 dark:border-white/5 hover:border-[#b052ff]/30 hover:shadow-[0_0_40px_rgba(176,82,255,0.15)] transition-all duration-500 relative h-[680px] sm:h-[650px] lg:h-[450px]">
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
                    <div className="w-full h-[40%] shrink-0 overflow-hidden rounded-t-[2.5rem] relative">
                      <picture>
                        <source media="(min-width: 768px)" srcSet={ev.image} />
                        <img
                          src={(ev as any).mobileImage || ev.image}
                          alt={ev.title}
                          className={`w-full h-full object-cover ${ev.imagePosition}`}
                        />
                      </picture>
                    </div>

                    {/* Content */}
                    <div className="w-full px-6 pb-16 pt-6 sm:pb-20 sm:px-12 flex flex-col justify-start items-center text-center z-10 relative flex-grow">
                      <div className="w-full">
                        <div className="flex items-center justify-center mb-4 mt-2">
                          <span className="font-serif font-bold tracking-[0.15em] text-[10px] sm:text-xs text-[#b052ff] bg-purple-50 dark:bg-[#b052ff]/10 border border-[#b052ff]/20 px-4 py-1.5 rounded-full uppercase shadow-sm">
                            {ev.tagline}
                          </span>
                        </div>

                        <h3 className="font-serif text-3xl lg:text-4xl xl:text-5xl text-midnight dark:text-white font-bold tracking-tight mb-4 leading-tight">
                          {ev.title}
                        </h3>

                        <p className="font-body text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed mb-8 max-w-sm mx-auto lg:mx-0">
                          {ev.description}
                        </p>

                        {ev.isExternal ? (
                          <a
                            href={ev.link as string}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#b052ff] hover:bg-[#9333ea] text-white font-semibold tracking-wide text-sm hover:scale-105 transition-transform shadow-lg"
                          >
                            {ev.cta} <ArrowUpRight className="w-4 h-4" />
                          </a>
                        ) : (
                          <button
                            onClick={ev.link as () => void}
                            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#b052ff] hover:bg-[#9333ea] text-white font-semibold tracking-wide text-sm hover:scale-105 transition-transform shadow-lg"
                          >
                            {ev.cta} <ArrowRight className="w-4 h-4" />
                          </button>
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
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-2 sm:px-4 md:-mx-6 pointer-events-none z-20">
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
