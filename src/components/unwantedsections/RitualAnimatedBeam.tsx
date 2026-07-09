import React from 'react';
import { motion } from 'motion/react';
import { Mail, Flame, PackageCheck } from 'lucide-react';

export const RitualAnimatedBeam: React.FC = () => {
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const beamVariants = {
    hidden: { pathLength: 0 },
    show: {
      pathLength: 1,
      transition: { duration: 1.5, ease: 'easeInOut', delay: 0.2 }
    }
  };

  return (
    <section className="py-6 md:py-8 md:py-10 relative overflow-hidden" id="rituals-beam">
      {/* Soft background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[400px] bg-amber-500/5 dark:bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="text-center max-w-3xl mx-auto mb-20 relative z-10 px-6">
        <span className="font-2xl uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400 font-bold block mb-4">
          Consecrated Transmission
        </span>
        <h1 className="font-ui text-4xl text-midnight dark:text-cream tracking-wide leading-tight">
          Rituals Run On Your Behalf.
        </h1>
        <p className="font-body text-gray-600 dark:text-gray-400 mt-4 leading-relaxed">
          The precise path of a remote ritual. See exactly how we route your physical intention directly from our client core to the traditional temples.
        </p>
      </div>

      <div className="max-w-5xl mx-auto relative z-10 px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="relative w-full mx-auto py-10"
          id="ritual-beam-section"
        >
          {/* Horizontal Beam for Desktop */}
          <div className="hidden md:block absolute top-[76px] left-[15%] right-[15%] h-[2px] z-0">
            <svg className="w-full h-[6px] overflow-visible" fill="none">
              {/* Static gray track */}
              <line
                x1="0%"
                y1="3"
                x2="100%"
                y2="3"
                className="stroke-gold/10 dark:stroke-gold/5"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              {/* Glowing Animated path */}
              <motion.path
                d="M 0 3 L 500 3" // Will auto-fit path length
                className="stroke-amber-500"
                strokeWidth="3"
                strokeLinecap="round"
                variants={beamVariants}
                style={{
                  vectorEffect: 'non-scaling-stroke',
                  filter: 'drop-shadow(0px 0px 8px rgba(245, 158, 11, 0.8))'
                }}
              />
            </svg>
          </div>

          {/* Vertical Beam for Mobile */}
          <div className="md:hidden absolute top-20 bottom-20 left-14 w-[2px] z-0">
            <svg className="w-[6px] h-full overflow-visible" fill="none">
              {/* Static track */}
              <line
                x1="3"
                y1="0%"
                x2="3"
                y2="100%"
                className="stroke-gold/15 dark:stroke-gold/10"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              {/* Animated path */}
              <motion.path
                d="M 3 0 L 3 500"
                className="stroke-amber-500"
                strokeWidth="3"
                strokeLinecap="round"
                variants={beamVariants}
                style={{
                  vectorEffect: 'non-scaling-stroke',
                  filter: 'drop-shadow(0px 0px 8px rgba(245, 158, 11, 0.8))'
                }}
              />
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative z-10">
            {/* Step 1 */}
            <motion.div variants={itemVariants} className="flex flex-row md:flex-col items-center md:items-center text-left md:text-center gap-6 md:gap-0 md:px-4">
              <div className="relative group shrink-0">
                <div className="absolute -inset-4 bg-amber-500/10 dark:bg-amber-500/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white dark:bg-[#110c1c] border border-black/5 dark:border-white/5 flex items-center justify-center text-amber-600 dark:text-amber-400 shadow-xl backdrop-blur-xl group-hover:border-amber-500/30 transition-colors duration-500 z-10">
                  <Mail className="w-8 h-8 sm:w-10 sm:h-10 group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute -top-1 -right-1 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-amber-100 dark:bg-amber-900/50 border border-amber-200 dark:border-amber-500/30 text-amber-700 dark:text-amber-400 font-mono text-xs sm:text-sm font-bold flex items-center justify-center shadow-md">
                    1
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-ui text-xl sm:text-2xl font-medium mt-0 md:mt-8 text-midnight dark:text-white">Share Intention</h4>
                <p className="font-body text-sm text-gray-600 dark:text-gray-400 mt-2 md:mt-3 max-w-xs leading-relaxed">
                  Submit your personal details, specific challenges, or upcoming decisions into our sacred vault.
                </p>
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div variants={itemVariants} className="flex flex-row md:flex-col items-center md:items-center text-left md:text-center gap-6 md:gap-0 md:px-4">
              <div className="relative group shrink-0">
                <div className="absolute -inset-4 bg-amber-500/10 dark:bg-amber-500/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white dark:bg-[#110c1c] border border-black/5 dark:border-white/5 flex items-center justify-center text-amber-600 dark:text-amber-400 shadow-xl backdrop-blur-xl group-hover:border-amber-500/30 transition-colors duration-500 z-10">
                  <Flame className="w-8 h-8 sm:w-10 sm:h-10 animate-pulse-slow" />
                  <div className="absolute -top-1 -right-1 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-amber-100 dark:bg-amber-900/50 border border-amber-200 dark:border-amber-500/30 text-amber-700 dark:text-amber-400 font-mono text-xs sm:text-sm font-bold flex items-center justify-center shadow-md">
                    2
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-ui text-xl sm:text-2xl font-medium mt-0 md:mt-8 text-midnight dark:text-white">Ritual at Exact Hour</h4>
                <p className="font-body text-sm text-gray-600 dark:text-gray-400 mt-2 md:mt-3 max-w-xs leading-relaxed">
                  Our traditional resident priests perform consecrated Vedic fire rituals synchronized with your chart's precise opening.
                </p>
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div variants={itemVariants} className="flex flex-row md:flex-col items-center md:items-center text-left md:text-center gap-6 md:gap-0 md:px-4">
              <div className="relative group shrink-0">
                <div className="absolute -inset-4 bg-amber-500/10 dark:bg-amber-500/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white dark:bg-[#110c1c] border border-black/5 dark:border-white/5 flex items-center justify-center text-amber-600 dark:text-amber-400 shadow-xl backdrop-blur-xl group-hover:border-amber-500/30 transition-colors duration-500 z-10">
                  <PackageCheck className="w-8 h-8 sm:w-10 sm:h-10 group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute -top-1 -right-1 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-amber-100 dark:bg-amber-900/50 border border-amber-200 dark:border-amber-500/30 text-amber-700 dark:text-amber-400 font-mono text-xs sm:text-sm font-bold flex items-center justify-center shadow-md">
                    3
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-ui text-xl sm:text-2xl font-medium mt-0 md:mt-8 text-midnight dark:text-white">Blessing Delivered</h4>
                <p className="font-body text-sm text-gray-600 dark:text-gray-400 mt-2 md:mt-3 max-w-xs leading-relaxed">
                  Receive the physical sacred ash, certified energy coordinates, and a digital validation of your completed rite.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
