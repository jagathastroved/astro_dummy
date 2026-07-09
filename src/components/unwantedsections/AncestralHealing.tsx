import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Moon, Flame } from 'lucide-react';
import { scrollToSection } from '../../utils/scroll';
import { naga_dosha, Pitru_dosha } from '../../assets/Karma_Resolution/index';

const DOSHAS = [
  {
    id: 'pitru',
    title: 'Pitru Dosha Remedies',
    desc: 'Clear the ancestral afflictions and inherited karmic debts that block your progress. Pacify your forefathers to invite harmony, prosperity, and peace into your family lineage.',
    cta: 'Resolve Pitru Dosha',
    image: Pitru_dosha,
    icon: Moon,
    badge: 'Ancestral Lineage'
  },
  {
    id: 'naga',
    title: 'Naga Dosha Remedies',
    desc: 'Honour the serpent deities, or Naga, to clear blocks to progeny, health and prosperity.',
    cta: 'Clear Naga Dosha',
    image: naga_dosha,
    icon: Flame,
    badge: 'Karmic Cleansing'
  }
];

export function AncestralHealing() {
  return (
    <section className="py-6 md:py-8 md:py-10 px-6 max-w-7xl mx-auto z-10" id="ancestral-healing">
      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto mb-8 relative z-10">
        <span className="font-2xl uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400 font-bold block mb-4">
          Karma Resolution
        </span>
        <h1 className="font-sans text-4xl md:text-5xl font-medium text-midnight dark:text-cream leading-tight tracking-wide mb-6">
          Ancestral & Karmic Healing
        </h1>
        <p className="font-body text-gray-600 dark:text-gray-400 leading-relaxed text-base max-w-2xl mx-auto">
          In Vedic philosophy, sudden delays in your finances, career, or relationships are often not planetary transits, but ancestral energetic loops. Unresolved patterns flow down the lineage until actively cleared.
        </p>
      </div>

      {/* Cards List */}
      <div className="flex flex-col gap-12">
        {DOSHAS.map((dosha, idx) => (
          <motion.div
            key={dosha.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: idx * 0.2 }}
            className="group overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-amber-50/50 to-orange-50/50 dark:from-[#0a0e17] dark:to-[#0f172a] border border-black/5 dark:border-amber-500/40 dark:shadow-[0_0_15px_rgba(245,158,11,0.2)] shadow-2xl hover:border-[#facc15]/50 hover:shadow-[0_0_40px_rgba(250,204,21,0.2)] transition-all duration-500 flex flex-col md:flex-row min-h-[450px] cursor-pointer"
            onClick={() => scrollToSection('birth-form')}
          >
            {/* Background Image (Left side) */}
            <div className="w-full md:w-[45%] h-[300px] md:h-auto relative overflow-hidden shrink-0">
              <img
                src={dosha.image}
                alt={dosha.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1500ms] ease-out"
              />
              {/* Soft inner shadow on image edge */}
              <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-amber-50/50 dark:from-[#0f172a] to-transparent pointer-events-none hidden md:block" />
            </div>

            {/* Content (Right side) */}
            <div className="w-full md:w-[55%] p-10 sm:p-14 md:p-16 flex flex-col justify-center bg-white/40 dark:bg-transparent backdrop-blur-md">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                    <dosha.icon className="w-5 h-5" />
                  </div>
                  <span className="text-amber-600 dark:text-amber-500 font-2xl sm:text-xl uppercase tracking-[0.2em] font-bold">
                    {dosha.badge}
                  </span>
                </div>

                <h3 className="font-sans text-4xl md:text-5xl lg:text-5xl text-midnight dark:text-cream font-medium tracking-tight mb-6">
                  {dosha.title}
                </h3>

                <p className="font-body text-sm md:text-base text-gray-600 dark:text-gray-400 mb-10 max-w-md leading-relaxed">
                  {dosha.desc}
                </p>
              </div>

              <div>
                <button
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-purple-500 text-white font-sans text-xs sm:text-sm uppercase tracking-widest font-bold hover:bg-purple-400 transition-colors shadow-[0_4px_14px_0_rgba(168,85,247,0.39)]"
                >
                  {dosha.cta} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
