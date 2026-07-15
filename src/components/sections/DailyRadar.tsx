import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, Compass, ArrowRight } from 'lucide-react';
import { ZODIAC_SIGNS, HOROSCOPES } from '../../utils/data';
import TargetCursor from '../ui/TargetCursor';

interface DailyRadarProps {
  onCalculateChart: (zodiac: string) => void;
}

export function DailyRadar({ onCalculateChart }: DailyRadarProps) {
  const [selectedZodiac, setSelectedZodiac] = useState('Aries');
  const [horoscopeTab, setHoroscopeTab] = useState<'Today' | 'Week' | 'Month'>('Today');
  const [horoscopeData, setHoroscopeData] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const contentRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    let isMounted = true;
    const fetchHoroscope = async () => {
      setLoading(true);
      try {
        const moonsign = selectedZodiac.toLowerCase();
        let period = horoscopeTab.toLowerCase();
        if (period === 'today') period = 'daily';
        else if (period === 'week') period = 'weekly';
        else if (period === 'month') period = 'monthly';
        const tz = encodeURIComponent(Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Kolkata');

        const response = await fetch(`https://api.astroved.com/python/horoscope/${moonsign}/${period}/summary?timezone=${tz}`);
        const data = await response.json();

        console.log('Horoscope API Success:', data);

        if (isMounted) {
          setHoroscopeData(data.summary || 'Horoscope data is currently unavailable. Please try again later.');
          setLoading(false);
        }
      } catch (error) {
        console.error("Failed to fetch horoscope:", error);
        console.log('Horoscope API Failed:', error);
        if (isMounted) {
          setHoroscopeData('Horoscope data is currently unavailable. Please try again later.');
          setLoading(false);
        }
      }
    };

    fetchHoroscope();
    return () => { isMounted = false; };
  }, [selectedZodiac, horoscopeTab]);

  return (
    <section className="py-4 md:py-6 relative overflow-hidden" id="daily-widget">
      <TargetCursor
        targetSelector=".cursor-target"
        spinDuration={2}
        hideDefaultCursor={false}
        parallaxOn={true}
        cursorColor="#f59e0b" // amber-500
        cursorColorOnTarget="#f59e0b"
      />

      {/* Soft background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[300px] bg-amber-500/5 dark:bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        <div className="text-center max-w-3xl mx-auto mb-4">
          <h2 className="font-sans text-4xl sm:text-5xl text-midnight dark:text-cream leading-tight mb-4">
            Daily <em className="text-amber-600 dark:text-amber-400 italic">Horoscope.</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 w-full max-w-6xl mx-auto">

          {/* Left Column: 12 Sign Grid Selector (No Swiping) */}
          <div className="lg:col-span-4 flex flex-col space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 font-semibold mb-2">
              Select Sign
            </span>

            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 gap-3">
              {ZODIAC_SIGNS.map((sign) => {
                const isActive = selectedZodiac === sign.name;
                return (
                  <button
                    key={sign.name}
                    onClick={() => {
                      setSelectedZodiac(sign.name);
                      if (window.innerWidth < 1024) {
                        setTimeout(() => {
                          contentRef.current?.scrollIntoView({ behavior: 'smooth' });
                        }, 50);
                      }
                    }}
                    className={`cursor-target relative p-4 rounded-[1.5rem] text-center flex flex-col items-center justify-center gap-3 transition-all duration-300 group ${isActive
                      ? 'bg-white dark:bg-[#110c1c] shadow-xl scale-[1.02] border border-amber-500/30'
                      : 'bg-white dark:bg-[#110c1c] border border-black/5 dark:border-amber-500/40 dark:shadow-[0_0_15px_rgba(245,158,11,0.2)] hover:border-amber-500/20 hover:shadow-lg hover:scale-[1.02]'
                      }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeZodiacGlow"
                        className="absolute inset-0 rounded-[1.5rem] bg-amber-500/5 dark:bg-amber-500/10 z-0 pointer-events-none"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}

                    <div className="relative z-10 w-12 h-12 rounded-full p-0.5 bg-white dark:bg-midnight shadow-sm">
                      <div className={`absolute inset-0 rounded-full border-2 transition-colors duration-300 ${isActive ? 'border-amber-400 dark:border-amber-500' : 'border-transparent group-hover:border-amber-400/50'}`} />
                      <img src={sign.imageUrl} alt={sign.name} className="w-full h-full rounded-full object-cover" />
                    </div>

                    <div className="z-10">
                      <span className={`block text-[10px] font-sans tracking-wider uppercase font-semibold leading-none transition-colors ${isActive ? 'text-amber-700 dark:text-amber-400' : 'text-midnight/70 dark:text-cream/70 group-hover:text-amber-600 dark:group-hover:text-amber-400'}`}>
                        {sign.name}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Tabbed glass panel for reading details */}
          <div ref={contentRef} className="lg:col-span-8 relative group h-full scroll-mt-24">
            {/* Ambient glow behind card */}
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 to-purple-500/20 rounded-[3rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

            <div className="h-full rounded-[2.5rem] bg-white dark:bg-[#110c1c] p-8 sm:p-12 border border-black/5 dark:border-amber-500/40 dark:shadow-[0_0_15px_rgba(245,158,11,0.2)] relative overflow-hidden shadow-2xl transition-all duration-500 flex flex-col">

              {/* Visual sign banner */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between flex-wrap gap-6">
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shadow-lg border border-black/5 dark:border-amber-500/40 dark:shadow-[0_0_15px_rgba(245,158,11,0.2)] flex-shrink-0">
                    <img
                      src={ZODIAC_SIGNS.find(s => s.name === selectedZodiac)?.imageUrl}
                      alt={selectedZodiac}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-sans text-2xl sm:text-3xl text-midnight dark:text-cream tracking-wide font-medium flex items-center gap-3">
                      {selectedZodiac} <span className="text-amber-500/40 text-xl font-light hidden sm:inline">·</span> <span className="text-gray-400 dark:text-gray-500 text-xl hidden sm:inline">{ZODIAC_SIGNS.find(s => s.name === selectedZodiac)?.sanskrit}</span>
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 mt-3">
                      <span className="px-2 py-1 rounded-md bg-black/5 dark:bg-white/5 text-[9px] sm:text-[10px] font-mono text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                        Ruler: {ZODIAC_SIGNS.find(s => s.name === selectedZodiac)?.ruler}
                      </span>
                      <span className="px-2 py-1 rounded-md bg-black/5 dark:bg-white/5 text-[9px] sm:text-[10px] font-mono text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                        Element: {ZODIAC_SIGNS.find(s => s.name === selectedZodiac)?.element}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tabs today/week/month */}
                <div className="flex bg-black/5 dark:bg-white/5 p-1 rounded-xl border border-black/5 dark:border-amber-500/40 dark:shadow-[0_0_15px_rgba(245,158,11,0.2)] w-full sm:w-fit self-start lg:self-auto flex-shrink-0">
                  {(['Today', 'Week', 'Month'] as const).map((tab) => {
                    const isActive = horoscopeTab === tab;
                    return (
                      <button
                        key={tab}
                        onClick={() => setHoroscopeTab(tab)}
                        className={`flex-1 sm:flex-none px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg text-[10px] sm:text-xs font-mono uppercase tracking-[0.15em] font-bold transition-all duration-300 ${isActive
                          ? 'bg-white dark:bg-midnight text-amber-600 dark:text-amber-400 shadow-sm'
                          : 'text-gray-500 hover:text-midnight dark:hover:text-cream'
                          }`}
                      >
                        {tab}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Horoscope detailed body text with crossfade animation */}
              <div className="flex-1 mt-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${selectedZodiac}-${horoscopeTab}`}
                    initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="space-y-4"
                  >
                    {loading ? (
                      <div className="animate-pulse space-y-3">
                        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-4/6"></div>
                      </div>
                    ) : (
                      <p className="font-body text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed font-light">
                        {horoscopeData}
                      </p>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Bottom interactive action */}
              <div className="mt-4 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <button
                  onClick={() => onCalculateChart(selectedZodiac)}
                  className="w-full sm:w-auto px-6 py-4 rounded-xl bg-midnight dark:bg-white text-white dark:text-midnight hover:bg-amber-600 dark:hover:bg-amber-400 hover:text-white font-sans text-[10px] sm:text-xs tracking-widest uppercase font-bold transition-all shadow-md flex items-center justify-center gap-3 group/btn flex-shrink-0"
                >
                  View full details
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
