import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import aiKundali from '../../assets/ai_reports/Kundali_Report_book.png'
import aiNumerology from '../../assets/ai_reports/Numerology_Book.png'

const reports = [
  {
    id: 1,
    title: "AI Kundali Report",
    description: "Get an instant, comprehensive analysis of your birth chart. Discover your planetary positions, doshas, and predictions powered by cutting-edge AI.",
    cta: "Generate Report",
    image: aiKundali,
    imageFit: "object-contain p-4 lg:p-8 drop-shadow-2xl scale-125 lg:scale-110",
    imagePosition: "object-center",
    bgGradient: "bg-[#f8f9fa] dark:bg-[#0b0e14]",
    buttonColor: "bg-[#a855f7] hover:bg-[#9333ea]",
    taglineColor: "text-[#a855f7]",
    link: "https://kundali-report.vercel.app/"
  },
  {
    id: 2,
    title: "AI Numerology Report",
    description: "Uncover the hidden meanings behind your numbers. Get an AI-driven report on your life path, expression, and soul urge numbers.",
    cta: "Generate Report",
    image: aiNumerology,
    imageFit: "object-contain p-4 lg:p-8 drop-shadow-2xl scale-125 lg:scale-110",
    imagePosition: "object-center",
    bgGradient: "bg-[#f8f9fa] dark:bg-[#0b0e14]",
    buttonColor: "bg-[#f59e0b] hover:bg-[#d97706]",
    taglineColor: "text-[#f59e0b]",
    link: "https://numerologyreport-umber.vercel.app/"
  }
];

export function AIReports() {
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
    setCurrentIndex((prev) => (prev === reports.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? reports.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-4 md:py-6 px-6 max-w-4xl mx-auto z-10 relative" id="ai-reports">
      <div className="max-w-3xl mx-auto text-center mb-6">
        <h2 className="font-sans text-3xl sm:text-4xl text-midnight dark:text-cream leading-tight mb-4">
          Advanced AI <em className="text-amber-600 dark:text-amber-400 italic">Insights.</em>
        </h2>
      </div>

      {/* Desktop/Tablet Grid View (No Carousel) */}
      <div className="hidden md:grid md:grid-cols-2 gap-6 lg:gap-8 max-w-3xl mx-auto">
        {reports.map((ev, idx) => (
          <div key={idx} className="group overflow-hidden rounded-[2.5rem] bg-[#f8f9fa] dark:bg-[#0b0e14] border border-gray-100 dark:border-white/5 hover:border-[#b052ff]/30 hover:shadow-[0_0_30px_rgba(176,82,255,0.15)] transition-all duration-500 flex flex-col h-full relative">
            <div className="w-full h-48 lg:h-52 relative overflow-hidden rounded-t-[2.5rem] flex items-center justify-center p-2 bg-gradient-to-b from-gray-100/50 to-transparent dark:from-black/30 dark:to-transparent">
              <img
                src={ev.image}
                alt={ev.title}
                className={`w-full h-full object-contain group-hover:scale-105 transition-transform duration-[1500ms] ease-out`}
              />
            </div>

            <div className="px-6 pb-6 pt-4 flex flex-col flex-grow z-10 relative">
              <h3 className="font-serif text-xl lg:text-2xl text-midnight dark:text-white font-bold tracking-tight mb-2 leading-tight text-center">
                {ev.title}
              </h3>
              <p className="font-body text-gray-600 dark:text-gray-300 text-xs sm:text-sm leading-relaxed mb-5 flex-grow text-justify">
                {ev.description}
              </p>

              <div className="mt-auto flex justify-center">
                <a
                  href={ev.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full ${ev.buttonColor} text-white font-semibold tracking-wide text-xs hover:scale-105 transition-transform shadow-md`}
                >
                  {ev.cta} <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
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
        <div className="overflow-hidden rounded-[2.5rem] bg-[#f8f9fa] dark:bg-[#0b0e14] border border-gray-100 dark:border-white/5 hover:border-[#b052ff]/30 hover:shadow-[0_0_40px_rgba(176,82,255,0.15)] transition-all duration-500 relative h-[430px] lg:h-[350px]">
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
                const ev = reports[currentIndex];
                return (
                  <div className="group/card flex flex-col lg:flex-row h-full relative">
                    {/* Image Area (Desktop) */}
                    <div className="hidden lg:flex absolute top-0 bottom-0 left-0 w-[45%] pointer-events-none items-center justify-center relative z-10">
                      <div className="absolute inset-0 bg-gradient-to-r from-gray-100/50 to-transparent dark:from-black/30 dark:to-transparent z-0"></div>
                      <img
                        src={ev.image}
                        alt={ev.title}
                        className={`w-full h-full ${ev.imageFit} group-hover/card:scale-105 transition-transform duration-[1500ms] ease-out ${ev.imagePosition} relative z-10`}
                      />
                    </div>

                    {/* Image Area (Mobile & Tablet) */}
                    <div className="lg:hidden absolute inset-0 w-full h-[160px] pointer-events-none flex items-center justify-center z-10">
                      <img
                        src={ev.image}
                        alt={ev.title}
                        className={`w-full h-full object-contain p-3 group-hover/card:scale-105 transition-transform duration-[1500ms] ease-out ${ev.imagePosition}`}
                      />
                    </div>

                    {/* Mobile Gradient Fade */}
                    <div className="lg:hidden absolute inset-0 w-full h-full pointer-events-none rounded-[2.5rem] z-0">
                      <div className="absolute inset-0 bg-gradient-to-t from-[#f8f9fa] dark:from-[#0b0e14] via-[#f8f9fa]/90 dark:via-[#0b0e14]/90 to-transparent bottom-0 h-3/4"></div>
                    </div>

                    {/* Content */}
                    <div className="w-full lg:w-[55%] ml-auto px-6 pb-10 pt-[170px] sm:p-12 lg:p-16 flex flex-col justify-start lg:justify-center items-center lg:items-start text-center lg:text-left z-20 relative h-full lg:mt-0 lg:pt-0">
                      <div className="w-full h-full flex flex-col">
                        <div className="flex items-center justify-center lg:justify-start mb-2">
                          <span className={`font-serif font-bold tracking-[0.2em] text-sm lg:text-base ${ev.taglineColor} uppercase`}>
                            {/* {ev.tagline} */}
                          </span>
                        </div>

                        <h3 className="font-serif text-[20px] xs:text-xl lg:text-2xl xl:text-3xl text-midnight dark:text-white font-bold tracking-tight mb-2 leading-tight">
                          {ev.title}
                        </h3>

                        <p className="font-body text-gray-600 dark:text-gray-300 text-xs sm:text-sm leading-relaxed mb-3 max-w-sm mx-auto lg:mx-0">
                          {ev.description}
                        </p>

                        <div className="w-full flex justify-center lg:justify-start mt-auto pt-2">
                          <a
                            href={ev.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex w-full max-w-[240px] justify-center items-center gap-1.5 px-4 py-2.5 rounded-full ${ev.buttonColor} text-white font-semibold tracking-wide text-xs hover:scale-105 transition-transform shadow-lg pointer-events-auto`}
                          >
                            {ev.cta} <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="absolute top-[85px] -translate-y-1/2 left-0 right-0 flex justify-between px-2 sm:px-4 md:-mx-6 pointer-events-none z-30">
          <button
            onClick={prevSlide}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/80 hover:bg-white dark:bg-black/30 dark:hover:bg-black/50 backdrop-blur-md border border-gray-200 dark:border-white/10 flex items-center justify-center text-[#b052ff] dark:text-white transition-all hover:scale-110 focus:outline-none pointer-events-auto shadow-lg"
            aria-label="Previous report"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/80 hover:bg-white dark:bg-black/30 dark:hover:bg-black/50 backdrop-blur-md border border-gray-200 dark:border-white/10 flex items-center justify-center text-[#b052ff] dark:text-white transition-all hover:scale-110 focus:outline-none pointer-events-auto shadow-lg"
            aria-label="Next report"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Pagination Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-50 lg:bottom-8 lg:right-12 lg:left-auto lg:translate-x-0">
          {reports.map((_, idx) => (
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