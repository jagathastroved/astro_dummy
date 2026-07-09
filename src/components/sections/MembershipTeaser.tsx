import React from 'react';
import { motion } from 'motion/react';
import { Compass, ArrowRight } from 'lucide-react';
import { scrollToSection } from '../../utils/scroll';

export function MembershipTeaser() {
  return (
    <section className="py-6 md:py-8 md:py-10 relative overflow-hidden z-10" id="membership">

      {/* Slow moving ambient gradient field behind the card */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -30, 20, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut'
          }}
          className="absolute top-[20%] left-[25%] w-80 h-80 rounded-full bg-gold/15 blur-[90px]"
        />
        <motion.div
          animate={{
            x: [0, -30, 40, 0],
            y: [0, 20, -40, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut'
          }}
          className="absolute bottom-[20%] right-[25%] w-96 h-96 rounded-full bg-indigo/20 blur-[100px]"
        />
      </div>

      {/* Floating single centered glass card */}
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="rounded-4xl glass-panel bg-white/5 dark:bg-[#0c0f24]/50 border border-gold/20 p-8 md:p-14 text-center space-y-6 shadow-2xl relative"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/10 border border-gold/25 text-purple dark:text-gold text-xs font-mono uppercase tracking-widest mx-auto">
            <Compass className="w-3.5 h-3.5 animate-spin-slow" />
            AstroVed Consecrated Alliance
          </div>

          <h2 className="font-display text-4xl md:text-5xl font-semibold text-midnight dark:text-cream tracking-wide">
            Align With the Year's <br />
            Most Powerful Portals
          </h2>

          <p className="font-body text-sm text-gray-600 dark:text-gray-300 max-w-xl mx-auto leading-relaxed font-light">
            Become a lifetime legacy timing member. Our residents automatically register your natal chart coordinates in our temple grid, performing standard weekly adjustments to smooth out incoming Sade Sati transits.
          </p>

          <div className="pt-4 max-w-md mx-auto grid grid-cols-2 gap-4 text-left">
            <div className="bg-cream/30 dark:bg-midnight/30 p-4 rounded-2xl border border-gold/10">
              <span className="text-xs font-mono text-purple dark:text-gold block">WEEKLY REMEDIES</span>
              <span className="text-sm font-sans font-medium text-midnight dark:text-cream mt-1 block">Conducted automatically</span>
            </div>
            <div className="bg-cream/30 dark:bg-midnight/30 p-4 rounded-2xl border border-gold/10">
              <span className="text-xs font-mono text-saffron block">DIRECT HELPLINE</span>
              <span className="text-sm font-sans font-medium text-midnight dark:text-cream mt-1 block">24/7 Priest Guidance</span>
            </div>
          </div>

          <div className="pt-6">
            <button
              onClick={() => scrollToSection('birth-form')}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-purple to-indigo text-cream font-sans text-sm tracking-widest uppercase font-semibold border border-gold/30 hover:border-gold/60 transition-all shadow-md active:scale-95 inline-flex items-center gap-2 group"
            >
              Inquire Alliance Intake
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
