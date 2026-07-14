import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, ChevronRight, PhoneCall, Flame } from 'lucide-react';

export function MobileFloatingMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [showButton, setShowButton] = useState(true);

  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowButton(false);
      } else {
        setShowButton(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div className="md:hidden fixed bottom-6 right-4 sm:right-6 z-[100] flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="flex flex-col gap-4 mb-4 origin-bottom-right items-end pr-2"
          >
            {/* Homa & Remedies Button */}
            <button className="relative flex items-center justify-between pl-14 pr-3 py-3 rounded-full bg-gradient-to-r from-[#983800] via-[#c65104] to-[#ea6b06] hover:to-[#f2740d] transition-all duration-300 shadow-[0_10px_30px_rgba(198,81,4,0.3)] hover:shadow-[0_10px_35px_rgba(245,158,11,0.5)] border-[2.5px] border-amber-400 hover:scale-[1.03] w-[270px] sm:w-[300px] h-[72px] group ml-6">
              {/* Circular badge sticking out on the left */}
              <div className="absolute left-[-20px] top-1/2 -translate-y-1/2 w-[64px] h-[64px] sm:w-[68px] sm:h-[68px] rounded-full border-[3px] border-amber-400 bg-gradient-to-b from-[#8f3a00] to-[#3a1500] flex items-center justify-center shadow-lg z-20 group-hover:scale-105 transition-transform duration-300">
                <Flame className="w-8 h-8 sm:w-9 sm:h-9 text-orange-200 drop-shadow-[0_0_8px_rgba(245,158,11,0.8)] fill-orange-500/30" strokeWidth={1.5} />
              </div>

              {/* Texts */}
              <div className="flex flex-col items-start justify-center flex-grow pl-1 text-left">
                <span className="font-serif text-white text-[14px] sm:text-[15px] font-bold tracking-wide drop-shadow-md leading-tight">
                  Homa & Remedies
                </span>
                <span className="font-sans text-[7.5px] sm:text-[8px] text-amber-300/90 font-medium tracking-wide mt-0.5">
                  Balance. Heal. Harmonize.
                </span>
              </div>

              {/* Right Chevron Button */}
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white flex items-center justify-center shadow-md z-10 group-hover:translate-x-1 transition-transform duration-300 shrink-0">
                <ChevronRight className="w-4 h-4 text-orange-700 stroke-[2.5]" />
              </div>
            </button>

            {/* Talk to Astrology Button */}
            <button className="relative flex items-center justify-between pl-14 pr-3 py-3 rounded-full bg-gradient-to-r from-[#20033b] via-[#3a0c6a] to-[#510e8d] hover:to-[#5c0fa0] transition-all duration-300 shadow-[0_10px_30px_rgba(58,12,106,0.3)] hover:shadow-[0_10px_35px_rgba(176,82,255,0.5)] border-[2.5px] border-amber-400 hover:scale-[1.03] w-[270px] sm:w-[300px] h-[72px] group ml-6">
              {/* Circular badge sticking out on the left */}
              <div className="absolute left-[-20px] top-1/2 -translate-y-1/2 w-[64px] h-[64px] sm:w-[68px] sm:h-[68px] rounded-full border-[3px] border-amber-400 bg-gradient-to-b from-[#2a0854] to-[#120224] flex items-center justify-center shadow-lg z-20 group-hover:scale-105 transition-transform duration-300">
                <PhoneCall className="w-8 h-8 sm:w-9 sm:h-9 text-purple-300 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)] fill-purple-300/20" strokeWidth={1.5} />
              </div>

              {/* Texts */}
              <div className="flex flex-col items-start justify-center flex-grow pl-1 text-left">
                <span className="font-serif text-white text-[14px] sm:text-[15px] font-bold tracking-wide drop-shadow-md leading-tight">
                  Talk to Astrology
                </span>
                <span className="font-sans text-[7.5px] sm:text-[8px] text-amber-300/90 font-medium tracking-wide mt-0.5">
                  Get Answers. Gain Clarity. Find Guidance.
                </span>
              </div>

              {/* Right Chevron Button */}
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white flex items-center justify-center shadow-md z-10 group-hover:translate-x-1 transition-transform duration-300 shrink-0">
                <ChevronRight className="w-4 h-4 text-purple-800 stroke-[2.5]" />
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showButton && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setIsOpen(!isOpen)}
            className={`w-[60px] h-[60px] rounded-full flex items-center justify-center shadow-xl transition-all duration-300 relative z-50 group ${isOpen
                ? 'bg-gradient-to-br from-[#2a0854] to-[#120224] border-[2px] border-purple-500/50 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:scale-105'
                : 'bg-gradient-to-b from-[#3a0c6a] to-[#120224] border-[2.5px] border-amber-400 text-amber-300 shadow-[0_0_25px_rgba(176,82,255,0.4)] hover:shadow-[0_0_35px_rgba(250,204,21,0.5)] hover:scale-[1.05]'
              }`}
          >
            {/* Premium Glow & Ping Effects when closed */}
            {!isOpen && (
              <>
                <span className="absolute inset-0 rounded-full border-[2px] border-amber-400/60 animate-ping opacity-40 duration-1000" />
                <span className="absolute inset-[-12px] rounded-full bg-purple-600/20 blur-xl animate-pulse -z-10" />
                <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-400/0 via-amber-400/0 to-amber-200/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </>
            )}

            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={isOpen ? "text-white" : "drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]"}
            >
              {isOpen ? <X size={28} strokeWidth={2.5} /> : <MessageCircle size={28} strokeWidth={2.5} />}
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
