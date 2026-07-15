import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, MapPin, Calendar, Clock, Sun, Sunset, Moon, MoonStar, Star, Info } from 'lucide-react';

export function PremiumPanchang() {
  return (
    <section className="relative py-4 md:py-6 overflow-hidden" id="daily-panchang">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[600px] bg-indigo/5 dark:bg-gold/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <p className="text-amber-600 dark:text-amber-400 font-sans text-xs md:text-sm uppercase tracking-widest font-bold mb-3">
            DAILY TIMINGS
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-midnight dark:text-cream leading-tight font-bold mb-4">
            Today's Panchang — <em className="text-amber-600 dark:text-amber-400 italic">Your Auspicious Timings.</em>
          </h2>
          <p className="font-sans text-gray-500 dark:text-gray-400 text-sm md:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto font-medium">
            Live for <strong className="font-bold text-gray-700 dark:text-gray-300">New Delhi</strong> (auto-detected). Timings update automatically for your location.
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-[#0c0f24] rounded-[2rem] p-6 lg:p-10 relative overflow-hidden shadow-2xl border border-black/5 dark:border-amber-500/40 dark:shadow-[0_0_15px_rgba(245,158,11,0.2)] hover:border-[#facc15]/50 hover:shadow-[0_0_40px_rgba(250,204,21,0.2)] transition-all duration-500"
        >
          {/* Top Astronomical Header Bar */}
          <div className="flex flex-col xl:flex-row justify-between items-center gap-6 border-b border-black/5 dark:border-amber-500/40 dark:shadow-[0_0_15px_rgba(245,158,11,0.2)] pb-8 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-orange-500 flex items-center justify-center shadow-lg shadow-gold/20 shrink-0">
                <Sun className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-sans text-2xl md:text-3xl text-midnight dark:text-cream font-bold tracking-wide">
                  Panchang
                </h2>
                <div className="flex flex-wrap items-center gap-2 mt-1 text-[13px] font-medium text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-purple dark:text-gold" />
                    {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span className="text-purple/30 dark:text-gold/30">&bull;</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-indigo dark:text-saffron" /> Chennai, Tamil Nadu, India</span>
                </div>
              </div>
            </div>

            {/* Astronomy Ticker */}
            <div className="flex flex-wrap justify-center gap-3 sm:gap-6 bg-white/60 dark:bg-[#0c0f24]/50 backdrop-blur-md px-6 py-3 rounded-2xl border border-purple/10 dark:border-amber-500/40 dark:shadow-[0_0_15px_rgba(245,158,11,0.2)] w-full xl:w-auto shadow-sm dark:shadow-none">
              <div className="flex items-center gap-2">
                <Sun className="w-5 h-5 text-amber-500" />
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-wider font-bold text-slate-500 dark:text-slate-500">Sunrise</span>
                  <span className="text-xs font-mono font-semibold text-midnight dark:text-cream">5:51 AM</span>
                </div>
              </div>
              <div className="w-px h-8 bg-black/10 dark:bg-white/10" />
              <div className="flex items-center gap-2">
                <Sunset className="w-5 h-5 text-amber-500" />
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-wider font-bold text-slate-500 dark:text-slate-500">Sunset</span>
                  <span className="text-xs font-mono font-semibold text-midnight dark:text-cream">6:35 PM</span>
                </div>
              </div>
              <div className="w-px h-8 bg-black/10 dark:bg-white/10 hidden sm:block" />
              <div className="flex items-center gap-2 hidden sm:flex">
                <Moon className="w-5 h-5 text-purple-500 dark:text-purple-300" />
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-wider font-bold text-slate-500 dark:text-slate-500">Moonrise</span>
                  <span className="text-xs font-mono font-semibold text-midnight dark:text-cream">9:54 PM</span>
                </div>
              </div>
              <div className="w-px h-8 bg-black/10 dark:bg-white/10 hidden sm:block" />
              <div className="flex items-center gap-2 hidden sm:flex">
                <MoonStar className="w-5 h-5 text-purple-500 dark:text-purple-300" />
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-wider font-bold text-slate-500 dark:text-slate-500">Moonset</span>
                  <span className="text-xs font-mono font-semibold text-midnight dark:text-cream">10:00 AM</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

            {/* Column 1: Detailed Panchang Data */}
            <div className="lg:col-span-4 space-y-8">

              {/* Tamil Date & Additional Info */}
              <div className="bg-white/70 dark:bg-black/20 p-5 rounded-2xl border border-purple/10 dark:border-amber-500/40 dark:shadow-[0_0_15px_rgba(245,158,11,0.2)] shadow-sm space-y-3 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-[20px] rounded-full pointer-events-none" />
                <div className="relative z-10 flex justify-between items-center">
                  <span className="text-[12px] font-bold text-slate-500 dark:text-slate-400">Tamil Date</span>
                  <span className="text-[14px] font-sans font-semibold text-midnight dark:text-cream">Parabhava, Aani 20</span>
                </div>
                <div className="relative z-10 w-full h-px bg-black/5 dark:bg-white/5" />
                <div className="relative z-10 flex justify-between items-center">
                  <span className="text-[12px] font-bold text-slate-500 dark:text-slate-400">Day Info (Naal)</span>
                  <span className="text-[13px] font-medium text-slate-700 dark:text-slate-300">Mel Nokku Naal</span>
                </div>
                <div className="relative z-10 w-full h-px bg-black/5 dark:bg-white/5" />
                <div className="relative z-10 flex justify-between items-center">
                  <span className="text-[12px] font-bold text-slate-500 dark:text-slate-400">Moon Phase</span>
                  <span className="text-[13px] font-medium text-slate-700 dark:text-slate-300">Theipirai</span>
                </div>
                <div className="relative z-10 w-full h-px bg-black/5 dark:bg-white/5" />
                <div className="relative z-10 flex justify-between items-center">
                  <span className="text-[12px] font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1" title="Solar Transit / Season"><Info className="w-3 h-3" /> Season</span>
                  <span className="text-[13px] font-medium text-slate-700 dark:text-slate-300">Uttarayan / Grishma</span>
                </div>
              </div>

              {/* Tithi Timings */}
              <div>
                <h3 className="text-[14px] font-sans font-bold text-midnight dark:text-cream mb-4 flex items-center gap-2">
                  <Moon className="w-4 h-4 text-purple dark:text-gold" /> Lunar Day (Tithi)
                </h3>
                <div className="space-y-3 pl-2 border-l-2 border-purple/20 dark:border-gold/20">
                  <div className="pl-4 relative">
                    <div className="absolute top-1.5 -left-[5px] w-2 h-2 rounded-full bg-purple dark:bg-gold" />
                    <p className="text-[13px] font-semibold text-midnight dark:text-cream flex items-center gap-2">
                      Krishna Paksha Chathurthi
                      <span className="w-3 h-3 rounded-full border border-midnight dark:border-cream flex items-center justify-center overflow-hidden">
                        <span className="w-1.5 h-3 bg-midnight dark:bg-cream block mr-auto" />
                      </span>
                    </p>
                    <p className="text-[11px] font-mono text-slate-600 dark:text-slate-400 mt-1">Jul 03, 11:20 AM &mdash; Jul 04, 12:40 PM</p>
                  </div>
                  <div className="pl-4 relative opacity-80">
                    <div className="absolute top-1.5 -left-[5px] w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700" />
                    <p className="text-[13px] font-semibold text-midnight dark:text-cream flex items-center gap-2">
                      Krishna Paksha Panchami
                    </p>
                    <p className="text-[11px] font-mono text-slate-600 dark:text-slate-400 mt-1">Jul 04, 12:40 PM &mdash; Jul 05, 01:31 PM</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Column 2: Nakshatram & Yoga/Karana */}
            <div className="lg:col-span-4 space-y-8">

              {/* Additional Elements Box */}
              <div className="bg-white/70 dark:bg-black/20 p-5 rounded-2xl border border-indigo/10 dark:border-amber-500/40 dark:shadow-[0_0_15px_rgba(245,158,11,0.2)] shadow-sm space-y-3 relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo/5 blur-[20px] rounded-full pointer-events-none" />
                <div className="relative z-10 flex justify-between items-center">
                  <span className="text-[12px] font-bold text-slate-500 dark:text-slate-400">Energy (Yoga)</span>
                  <span className="text-[13px] font-medium text-slate-700 dark:text-slate-300">Siddhi</span>
                </div>
                <div className="relative z-10 w-full h-px bg-black/5 dark:bg-white/5" />
                <div className="relative z-10 flex justify-between items-center">
                  <span className="text-[12px] font-bold text-slate-500 dark:text-slate-400">Half-Lunar Day</span>
                  <span className="text-[13px] font-medium text-slate-700 dark:text-slate-300">Gara</span>
                </div>
              </div>

              <div>
                <h3 className="text-[14px] font-sans font-bold text-midnight dark:text-cream mb-4 flex items-center gap-2">
                  <Star className="w-4 h-4 text-indigo dark:text-saffron" /> Star Details (Nakshatra)
                </h3>
                <div className="space-y-3 pl-2 border-l-2 border-indigo/20 dark:border-saffron/20">
                  <div className="pl-4 relative">
                    <div className="absolute top-1.5 -left-[5px] w-2 h-2 rounded-full bg-indigo dark:bg-saffron" />
                    <p className="text-[13px] font-semibold text-purple-700 dark:text-saffron flex justify-between items-center">
                      Avittam
                      <span className="text-[10px] bg-purple-500/10 dark:bg-saffron/10 px-2 py-0.5 rounded text-purple-600 dark:text-saffron/80 uppercase tracking-wider">Active</span>
                    </p>
                    <p className="text-[11px] font-mono text-slate-600 dark:text-slate-400 mt-1">Jul 03, 11:46 AM &mdash; Jul 04, 01:43 PM</p>
                  </div>
                  <div className="pl-4 relative opacity-80">
                    <div className="absolute top-1.5 -left-[5px] w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700" />
                    <p className="text-[13px] font-semibold text-midnight dark:text-cream">Sadhayam</p>
                    <p className="text-[11px] font-mono text-slate-600 dark:text-slate-400 mt-1">Jul 04, 01:43 PM &mdash; Jul 05, 03:12 PM</p>
                  </div>
                </div>
              </div>

              {/* Auspicious Quick Info */}
              <div className="pt-4 space-y-4">
                <div className="flex gap-3 items-start">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 min-w-[50px] pt-[2px]">To Do</span>
                  <span className="text-[12px] text-slate-600 dark:text-slate-400 leading-relaxed font-medium">Monetary transactions, litigation, progressive acts</span>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400 min-w-[50px] pt-[2px]">Avoid</span>
                  <span className="text-[12px] text-slate-600 dark:text-slate-400 leading-relaxed font-medium">Travel, new meetings, important signings</span>
                </div>
              </div>

            </div>

            {/* Column 3: Beautiful Live Chart adapted for both themes */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-end space-y-6">
              <h3 className="text-[11px] font-mono uppercase tracking-[0.2em] text-slate-500 dark:text-cream font-bold mb-6 flex items-center gap-3 w-full justify-center lg:justify-end">
                Chart of Now
                <span className="h-[1px] w-4 bg-purple/20 dark:bg-gold/20" />
              </h3>

              <div className="bg-white/80 dark:bg-[#080b1a] rounded-2xl p-6 w-full max-w-[280px] flex flex-col items-center justify-center relative overflow-hidden border border-purple/10 dark:border-gold/10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] dark:shadow-2xl transition-colors duration-500">
                {/* Chart ambient glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150px] h-[150px] bg-purple/10 dark:bg-gold/10 blur-[50px] rounded-full pointer-events-none transition-colors duration-500" />

                {/* South Indian Chart Grid (4x4) */}
                <div className="grid grid-cols-4 grid-rows-4 gap-[2px] bg-purple/20 dark:bg-gold/30 p-[2px] relative z-10 w-full aspect-square rounded-sm mx-auto shadow-[0_0_20px_rgba(104,105,249,0.05)] dark:shadow-[0_0_30px_rgba(251,191,36,0.05)] transition-colors duration-500">
                  {/* Row 1 */}
                  <div className="bg-white dark:bg-[#0c0f24] flex items-center justify-center relative overflow-hidden group hover:bg-purple/5 dark:hover:bg-indigo/20 transition-colors cursor-default">
                    <div className="absolute top-0 left-0 border-t-2 border-l-2 border-purple/30 dark:border-gold/50 w-2 h-2 opacity-50" />
                  </div>
                  <div className="bg-white dark:bg-[#0c0f24] flex items-center justify-center relative group hover:bg-purple/5 dark:hover:bg-indigo/20 transition-colors cursor-default">
                    <span className="text-[10px] font-mono text-slate-600 dark:text-cream/60 group-hover:text-purple dark:group-hover:text-gold transition-colors font-bold dark:font-semibold">Su</span>
                  </div>
                  <div className="bg-white dark:bg-[#0c0f24] flex items-center justify-center relative group hover:bg-purple/5 dark:hover:bg-indigo/20 transition-colors cursor-default">
                    <span className="text-[10px] font-mono text-slate-600 dark:text-cream/60 group-hover:text-purple dark:group-hover:text-gold transition-colors font-bold dark:font-semibold">Mo</span>
                  </div>
                  <div className="bg-white dark:bg-[#0c0f24] flex items-center justify-center relative group hover:bg-purple/5 dark:hover:bg-indigo/20 transition-colors cursor-default">
                    <span className="text-[10px] font-mono text-slate-600 dark:text-cream/60 group-hover:text-purple dark:group-hover:text-gold transition-colors font-bold dark:font-semibold">Me</span>
                  </div>

                  {/* Row 2 */}
                  <div className="bg-white dark:bg-[#0c0f24] flex items-center justify-center relative group hover:bg-purple/5 dark:hover:bg-indigo/20 transition-colors cursor-default">
                    <span className="text-[10px] font-mono text-slate-600 dark:text-cream/60 group-hover:text-purple dark:group-hover:text-gold transition-colors font-bold dark:font-semibold">Ke</span>
                  </div>
                  <div className="col-span-2 row-span-2 bg-ivory/50 dark:bg-[#080b1a] flex flex-col items-center justify-center relative border border-purple/5 dark:border-gold/10">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple/5 dark:from-indigo/5 to-transparent pointer-events-none" />
                    <Clock className="w-5 h-5 text-purple/40 dark:text-gold/30 mb-1" />
                    <span className="text-[8px] font-mono uppercase tracking-[0.2em] text-slate-500 dark:text-cream/30 text-center">Live Sky<br />over Chennai</span>
                  </div>
                  <div className="bg-white dark:bg-[#0c0f24] flex items-center justify-center relative group hover:bg-purple/5 dark:hover:bg-indigo/20 transition-colors cursor-default">
                    <span className="text-[10px] font-mono text-slate-600 dark:text-cream/60 group-hover:text-purple dark:group-hover:text-gold transition-colors font-bold dark:font-semibold">Ve</span>
                  </div>

                  {/* Row 3 */}
                  <div className="bg-white dark:bg-[#0c0f24] flex items-center justify-center relative group hover:bg-purple/5 dark:hover:bg-indigo/20 transition-colors cursor-default">
                  </div>
                  <div className="bg-white dark:bg-[#0c0f24] flex items-center justify-center relative group hover:bg-purple/5 dark:hover:bg-indigo/20 transition-colors cursor-default">
                    <span className="text-[10px] font-mono text-slate-600 dark:text-cream/60 group-hover:text-purple dark:group-hover:text-gold transition-colors font-bold dark:font-semibold">Ra</span>
                  </div>

                  {/* Row 4 */}
                  <div className="bg-white dark:bg-[#0c0f24] flex items-center justify-center relative group hover:bg-purple/5 dark:hover:bg-indigo/20 transition-colors cursor-default">
                  </div>
                  <div className="bg-white dark:bg-[#0c0f24] flex items-center justify-center relative group hover:bg-purple/5 dark:hover:bg-indigo/20 transition-colors cursor-default">
                    <span className="text-[10px] font-mono text-slate-600 dark:text-cream/60 group-hover:text-purple dark:group-hover:text-gold transition-colors font-bold dark:font-semibold">Sa</span>
                  </div>
                  <div className="bg-white dark:bg-[#0c0f24] flex items-center justify-center relative group hover:bg-purple/5 dark:hover:bg-indigo/20 transition-colors cursor-default">
                    <span className="text-[10px] font-mono text-slate-600 dark:text-cream/60 group-hover:text-purple dark:group-hover:text-gold transition-colors font-bold dark:font-semibold">Ma</span>
                  </div>
                  <div className="bg-white dark:bg-[#0c0f24] flex items-center justify-center relative group hover:bg-purple/5 dark:hover:bg-indigo/20 transition-colors cursor-default">
                    <span className="text-[10px] font-mono text-slate-600 dark:text-cream/60 group-hover:text-purple dark:group-hover:text-gold transition-colors font-bold dark:font-semibold">Ju</span>
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium text-center lg:text-right max-w-[280px]">
                The chart updates in real-time according to Sidereal calculations.
              </p>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
