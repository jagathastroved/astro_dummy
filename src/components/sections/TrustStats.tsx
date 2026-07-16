import React from 'react';
import { motion, Variants } from 'motion/react';
import { CountUp } from '../CountUp';
import { ShieldCheck, Award, LockKeyhole } from 'lucide-react';

export function TrustStats() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 15 } }
  };

  return (
    <section className="relative w-full py-4 md:py-6 overflow-hidden transition-colors duration-500 border-y border-black/5 dark:border-amber-500/40 dark:shadow-[0_0_15px_rgba(245,158,11,0.2)] z-10">

      {/* Premium Animated Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.08)_0%,transparent_60%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.05)_0%,transparent_60%)] pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8 lg:gap-12 items-center"
      >

        {/* Title Area */}
        <motion.div variants={itemVariants} className="text-center md:text-left relative z-10">
          <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-12 bg-gradient-to-b from-amber-400 to-amber-600 rounded-full hidden md:block" />
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-amber-600 dark:text-amber-500 font-bold block mb-2">ESTABLISHED DHARMA</span>
          <span className="font-sans text-2xl md:text-3xl text-midnight dark:text-cream font-medium tracking-wide">AstroVed<br className="hidden md:block" /> Verified</span>
        </motion.div>

        {/* Stat 1 */}
        <motion.div variants={itemVariants} className="relative group p-4 md:p-6 lg:p-8 transform-gpu backface-hidden">
          <div className="absolute inset-0 bg-white dark:bg-[#110c1c] rounded-2xl border border-black/5 dark:border-amber-500/40 dark:shadow-[0_0_15px_rgba(245,158,11,0.2)] shadow-lg group-hover:shadow-amber-500/20 group-hover:border-amber-500/30 transition-shadow transition-colors duration-500" />
          <div className="flex flex-col items-center justify-center text-center relative z-10">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3">
              <Award className="w-5 h-5" />
            </div>
            <span className="text-4xl md:text-5xl font-sans text-midnight dark:text-cream font-bold block mb-1">
              <CountUp to={2001} from={1980} duration={2} />
            </span>
            <span className="text-[10px] font-mono text-gray-500 dark:text-gray-400 uppercase tracking-widest">Year of Inception</span>
          </div>
        </motion.div>

        {/* Stat 2 */}
        <motion.div variants={itemVariants} className="relative group p-4 md:p-6 lg:p-8 transform-gpu backface-hidden">
          <div className="absolute inset-0 bg-white dark:bg-[#110c1c] rounded-2xl border border-black/5 dark:border-amber-500/40 dark:shadow-[0_0_15px_rgba(245,158,11,0.2)] shadow-lg group-hover:shadow-amber-500/20 group-hover:border-amber-500/30 transition-shadow transition-colors duration-500" />
          <div className="flex flex-col items-center justify-center text-center relative z-10">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="text-4xl md:text-5xl font-sans text-midnight dark:text-cream font-bold block mb-1">
              <CountUp to={180} duration={1.8} suffix="+" />
            </span>
            <span className="text-[10px] font-mono text-gray-500 dark:text-gray-400 uppercase tracking-widest">Scholars & Astrologers</span>
          </div>
        </motion.div>

        {/* Stat 3 */}
        <motion.div variants={itemVariants} className="relative group p-4 md:p-6 lg:p-8 transform-gpu backface-hidden">
          <div className="absolute inset-0 bg-white dark:bg-[#110c1c] rounded-2xl border border-black/5 dark:border-amber-500/40 dark:shadow-[0_0_15px_rgba(245,158,11,0.2)] shadow-lg group-hover:shadow-amber-500/20 group-hover:border-amber-500/30 transition-shadow transition-colors duration-500" />
          <div className="flex flex-col items-center justify-center text-center relative z-10">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3">
              <LockKeyhole className="w-5 h-5" />
            </div>
            <span className="text-4xl md:text-5xl font-sans text-midnight dark:text-cream font-bold block mb-1">
              <CountUp to={100} from={50} duration={2.2} suffix="%" />
            </span>
            <span className="text-[10px] font-mono text-gray-500 dark:text-gray-400 uppercase tracking-widest">Certified Privacy Score</span>
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
}
