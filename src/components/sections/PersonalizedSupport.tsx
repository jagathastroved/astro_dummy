import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';
import shreemBrzeeImg from '../../assets/shreem_brzee_new.png';
import tarpanamNewImg from '../../assets/tarpanam_new.png';

const solutions = [
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

export function PersonalizedSupport() {
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
    setCurrentIndex((prev) => (prev === solutions.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? solutions.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="personalized-support" className="py-4 md:py-6 relative overflow-hidden transition-colors duration-500 z-10">

      {/* Decorative Particle Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
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

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 relative z-10">
          <p className="text-amber-600 dark:text-amber-400 font-sans text-xs md:text-sm uppercase tracking-widest font-bold mb-3">
            CONTINUOUS SUPPORT
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-midnight dark:text-cream leading-tight font-bold mb-4">
            Ongoing Blessings <em className="text-amber-600 dark:text-amber-400 italic">for Your Family.</em>
          </h2>
          <p className="font-sans text-gray-500 dark:text-gray-400 text-sm md:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto font-medium">
            For devotees who want continuous support — not one-time remedies.
          </p>
        </div>

        {/* Desktop/Tablet Grid View (No Carousel) */}
        <div className="hidden md:grid md:grid-cols-2 gap-6 lg:gap-8">
          {solutions.map((ev, idx) => (
            <div key={idx} className="group overflow-hidden rounded-[2.5rem] bg-[#0b0e14] border border-white/5 hover:border-[#facc15]/50 hover:shadow-[0_0_30px_rgba(250,204,21,0.15)] transition-all duration-500 flex flex-col h-[500px] lg:h-[550px] relative">
              {/* Full Background Image */}
              <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none rounded-[2.5rem] z-0">
                <img
                  src={ev.image}
                  alt={ev.title}
                  className={`w-full h-full ${ev.imageFit || 'object-cover'} group-hover:scale-105 transition-transform duration-[1500ms] ease-out ${ev.imagePosition || 'object-center'}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e14]/95 via-[#0b0e14]/60 to-transparent"></div>
              </div>

              {/* Content overlaid on image */}
              <div className="px-6 lg:px-8 pb-8 pt-8 flex flex-col justify-end flex-grow z-10 relative h-full">
                <div className="mt-auto">
                  <div className="flex items-start mb-2">
                    <span className={`font-serif italic text-lg lg:text-xl text-amber-400 dark:text-amber-500`}>
                      {ev.tagline}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl lg:text-3xl text-white font-bold tracking-wider mb-3 leading-tight uppercase">
                    {ev.title}
                  </h3>
                  <p className="font-body text-gray-200 dark:text-gray-300 text-sm md:text-base leading-relaxed mb-8 max-w-sm">
                    {ev.description}
                  </p>
                  <div>
                    <button className={`px-6 py-3 rounded-full text-white font-medium text-sm flex items-center gap-2 group/btn transition-all duration-300 ${ev.buttonColor}`}>
                      {ev.cta}
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
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
          <div className="overflow-hidden rounded-[2.5rem] bg-[#0b0e14] border border-white/5 hover:border-[#facc15]/50 hover:shadow-[0_0_40px_rgba(250,204,21,0.2)] transition-all duration-500 relative h-[550px] lg:h-[450px]">
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
                  const ev = solutions[currentIndex];
                  return (
                    <div className="group/card flex flex-col lg:flex-row h-full relative">
                      {/* Background Image (Desktop) */}
                      <div className="hidden lg:block absolute top-0 bottom-0 left-0 w-[65%] overflow-hidden pointer-events-none">
                        <img
                          src={ev.image}
                          alt={ev.title}
                          className={`w-full h-full ${ev.imageFit || 'object-cover'} group-hover/card:scale-105 transition-transform duration-[1500ms] ease-out ${ev.imagePosition || 'object-center'}`}
                          style={{
                            WebkitMaskImage: ev.imageFit?.includes('contain') ? 'none' : 'linear-gradient(to right, black 50%, transparent 100%)',
                            maskImage: ev.imageFit?.includes('contain') ? 'none' : 'linear-gradient(to right, black 50%, transparent 100%)'
                          }}
                        />
                      </div>

                      {/* Background Image (Mobile & Tablet) */}
                      <div className="lg:hidden absolute inset-0 w-full h-full overflow-hidden pointer-events-none rounded-[2.5rem] bg-[#0b0e14]">
                        <picture>
                          <source media="(min-width: 768px)" srcSet={ev.image} />
                          <img
                            src={(ev as any).mobileImage || ev.image}
                            alt={ev.title}
                            className={`w-full h-full ${ev.imageFit || 'object-cover'} ${ev.imagePosition || 'object-center'}`}
                          />
                        </picture>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e14]/95 via-[#0b0e14]/60 to-transparent"></div>
                      </div>

                      {/* Content */}
                      <div className="w-full lg:w-[45%] ml-auto px-8 pb-20 pt-8 sm:p-12 lg:p-16 flex flex-col justify-end lg:justify-center items-center lg:items-end text-center lg:text-right z-10 relative h-full lg:mt-0 lg:pt-16">
                        <div className="w-full">
                          <div className="flex items-center justify-center lg:justify-end mb-4">
                            <span className={`font-serif italic text-xl lg:text-2xl text-amber-400 dark:text-amber-500`}>
                              {ev.tagline}
                            </span>
                          </div>

                          <h3 className="font-serif text-2xl lg:text-3xl xl:text-4xl text-white font-bold tracking-wider mb-4 leading-tight uppercase">
                            {ev.title}
                          </h3>

                          <p className="font-body text-gray-200 dark:text-gray-300 text-sm md:text-base leading-relaxed mb-8 drop-shadow-md lg:ml-auto max-w-sm">
                            {ev.description}
                          </p>

                          <button className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-full ${ev.buttonColor} text-white font-semibold tracking-wide text-sm hover:scale-105 transition-transform shadow-lg`}>
                            {ev.cta} <ArrowRight className="w-4 h-4" />
                          </button>
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
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white transition-all hover:scale-110 pointer-events-auto shadow-lg"
              aria-label="Previous event"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white transition-all hover:scale-110 pointer-events-auto shadow-lg"
              aria-label="Next event"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Pagination Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20 lg:bottom-8 lg:right-12 lg:left-auto lg:translate-x-0">
            {solutions.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all duration-500 rounded-full ${idx === currentIndex
                  ? 'w-6 h-1.5 bg-amber-400'
                  : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/60'
                  }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
