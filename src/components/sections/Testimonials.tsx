import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';
import { TESTIMONIALS } from '../../utils/data';
import { astro_service, astro_promotion } from '../../assets/astroved_service/index';

const BRAND_IMAGES = [astro_service, astro_promotion];

export function Testimonials() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev < TESTIMONIALS.length - 1 ? prev + 1 : 0));
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-4 md:py-6 max-w-7xl mx-auto px-6 relative z-10" id="trust-platform">

      {/* Main Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-6">
        <h2 className="font-sans text-4xl sm:text-5xl text-midnight dark:text-cream leading-tight mb-4">
          Client <em className="text-amber-600 dark:text-amber-400 italic">Testimonials.</em>
        </h2>
        {/* <h2 className="font-sans text-4xl md:text-5xl text-midnight dark:text-cream mb-6 tracking-wide leading-tight font-medium">
          Trusted by Our Global Community
        </h2>
        <p className="font-body text-gray-600 dark:text-gray-400 text-base leading-relaxed max-w-2xl mx-auto">
          Discover how our spiritual services and guidance have transformed lives. Read authentic stories of healing, prosperity, and cosmic alignment.
        </p> */}
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch max-w-6xl mx-auto">

        {/* Left Section - Full Graphic */}
        <div className="w-full lg:w-1/2 relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-black/5 dark:border-amber-500/30 dark:shadow-[0_0_20px_rgba(245,158,11,0.15)] group flex-shrink-0">
          <img
            src={BRAND_IMAGES[1]}
            alt="Vedic Service"
            className="w-full h-auto block transform group-hover:scale-[1.03] transition-transform duration-[2s] ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60 mix-blend-multiply pointer-events-none" />
          <div className="absolute inset-0 pointer-events-none rounded-[2.5rem] ring-1 ring-inset ring-white/10" />
        </div>

        {/* Right Section - Premium Testimonials Feedback Card */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <div className="rounded-[2.5rem] bg-gradient-to-br from-amber-50/50 to-white dark:from-[#110c1c] dark:to-[#1a1225] border border-amber-100 dark:border-amber-500/30 dark:shadow-[0_0_25px_rgba(245,158,11,0.15)] p-6 lg:p-8 relative overflow-hidden shadow-2xl h-full flex flex-col justify-between">

            {/* Decorative Quote Icon */}
            <div className="absolute top-8 right-10 text-amber-500/10 dark:text-amber-500/5 rotate-12">
              <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.017 21L16.41 14.9096H10.605L10.605 3H21L21 14.9096L17.757 21H14.017ZM3.412 21L5.805 14.9096H0L0 3H10.395L10.395 14.9096L7.152 21H3.412Z" />
              </svg>
            </div>

            {/* Soft background glow */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-amber-500/10 dark:bg-amber-500/5 rounded-full blur-[60px] pointer-events-none" />

            <div className="min-h-[160px] relative z-10 flex-grow flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="space-y-3"
                >
                  <div className="flex gap-1 text-amber-500">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 md:w-5 md:h-5 fill-current" />
                    ))}
                  </div>

                  <blockquote className="font-body text-lg md:text-xl text-midnight dark:text-cream leading-relaxed italic">
                    "{TESTIMONIALS[activeTestimonial].quote}"
                  </blockquote>

                  <div>
                    <h4 className="font-sans text-base text-midnight dark:text-cream uppercase tracking-widest font-bold">
                      {TESTIMONIALS[activeTestimonial].name}
                    </h4>
                    <p className="font-mono text-xs text-amber-600 dark:text-amber-400 uppercase tracking-widest mt-1.5">
                      {TESTIMONIALS[activeTestimonial].role} · {TESTIMONIALS[activeTestimonial].stats}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between pt-3 mt-3 border-t border-amber-200/50 dark:border-amber-500/20 relative z-10">

              <div className="flex items-center gap-2">
                {TESTIMONIALS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTestimonial(idx)}
                    className="p-2"
                  >
                    <span className={`block h-[4px] rounded-full transition-all duration-500 ${activeTestimonial === idx ? 'bg-amber-500 w-8' : 'bg-black/10 dark:bg-white/10 w-3 hover:bg-amber-500/50'}`} />
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setActiveTestimonial((prev) => (prev > 0 ? prev - 1 : TESTIMONIALS.length - 1))}
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-white dark:bg-[#1a1225] border border-amber-200 dark:border-amber-500/40 shadow-sm text-midnight dark:text-cream hover:bg-amber-500 hover:text-white hover:border-amber-500 dark:hover:bg-amber-500 dark:hover:text-white active:scale-95 transition-all"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setActiveTestimonial((prev) => (prev < TESTIMONIALS.length - 1 ? prev + 1 : 0))}
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-white dark:bg-[#1a1225] border border-amber-200 dark:border-amber-500/40 shadow-sm text-midnight dark:text-cream hover:bg-amber-500 hover:text-white hover:border-amber-500 dark:hover:bg-amber-500 dark:hover:text-white active:scale-95 transition-all"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
