import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Flame, Clock, CalendarDays, ArrowRight, PhoneCall } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Vastu_Homa, Ashada_Navratri, Sudarshana_Jayanthi, Solar_Eclipse_2026, Karuppasamy, Hyderabad_Nadi_Camp, Guru_purnima, Aadi_Goddess, Aadi_Amavasya } from '../../assets/Banners';
import { AadiAmavasyaMob, AadiGoddessMob, AshadaNavratriMob, GuruPurnimaMob, HyderabadNadiCampMob, KaruppasamyMob, SolarEclipseMob, SudarshanaJayanthiMob, VastuHomaMob } from '../../assets/Banners/mobile_banners';

const events = [
  {
    id: 1,
    title: "Seek Karuppasamy's Swift Protection",
    titleColor: "text-white",
    tagline: "Divine Guidance & Sacred Remedies",
    taglineColor: "text-amber-400 italic",
    deadline: "LIVE on Jul. 14, 2026 | 6:00 AM IST",
    deadlineColor: "text-gray-100",
    cta: "Book Your Reading Now",
    buttonBg: "bg-amber-400 hover:bg-amber-500",
    buttonText: "text-black",
    image: Karuppasamy,
    mobileImage: KaruppasamyMob,
  },
  {
    id: 2,
    title: "Ashada Navaratri Celebrations",
    titleColor: "text-white",
    tagline: "Invoke 9 Forms of Varahi",
    taglineColor: "text-amber-400 italic",
    deadline: "Jul. 15 - 23, 2026 | Daily 4:00 PM IST",
    deadlineColor: "text-gray-100",
    cta: "Receive Varahi's Blessing",
    buttonBg: "bg-amber-400 hover:bg-amber-500",
    buttonText: "text-black",
    image: Ashada_Navratri,
    mobileImage: AshadaNavratriMob,
  },
  {
    id: 3,
    title: "Sudarshana Jayanthi Celebrations",
    titleColor: "text-white",
    tagline: "Receive 9 Divine Blessings",
    taglineColor: "text-amber-400 italic",
    deadline: "LIVE on Jul. 24, 2026 | 5:30 AM IST",
    deadlineColor: "text-gray-100",
    cta: "Participate Now",
    buttonBg: "bg-amber-400 hover:bg-amber-500",
    buttonText: "text-black",
    image: Sudarshana_Jayanthi,
    mobileImage: SudarshanaJayanthiMob,
  },
  {
    id: 4,
    title: "Vastu Homa & Ashta Dikpalaka Rituals",
    titleColor: "text-white",
    tagline: "Purify & Protect Your Home",
    taglineColor: "text-amber-400 italic",
    deadline: "LIVE on Jul. 27, 2026 | 7:30 AM IST",
    deadlineColor: "text-gray-100",
    cta: "Participate Now",
    buttonBg: "bg-amber-400 hover:bg-amber-500",
    buttonText: "text-black",
    image: Vastu_Homa,
    mobileImage: VastuHomaMob,
  },
  {
    id: 5,
    title: "Guru Purnima Pancha Siddhar Maha Homa",
    titleColor: "text-white",
    tagline: "Receive Wisdom, Healing & Karmic Release",
    taglineColor: "text-amber-400 italic",
    deadline: "LIVE on Jul. 28, 2026 | 6:00 PM IST",
    deadlineColor: "text-gray-100",
    cta: "Participate",
    buttonBg: "bg-amber-400 hover:bg-amber-500",
    buttonText: "text-black",
    image: Guru_purnima,
    mobileImage: GuruPurnimaMob,
  },
  {
    id: 6,
    title: "CANCER - ASHLESHA SOLAR ECLIPSE 2026",
    titleColor: "text-amber-300",
    tagline: "Release Ancestral Patterns & Restore Emotional Balance",
    taglineColor: "text-white",
    deadline: "AUG. 12-13, 2026 | SAVE UP TO 15% BEFORE JUL. 30",
    deadlineColor: "text-amber-300",
    cta: "SEEK ECLIPSE BLESSINGS",
    buttonBg: "bg-amber-200 hover:bg-amber-300",
    buttonText: "text-[#1E1B4B]",
    image: Solar_Eclipse_2026,
    mobileImage: SolarEclipseMob,
  },
  {
    id: 7,
    title: "NADI ASTROLOGY CAMP IN HYDERABAD",
    titleColor: "text-red-700",
    tagline: "Every Time You Obtain a Nadi Reading, Your Destiny can Change",
    taglineColor: "text-black italic",
    deadline: "Date: 17 to 20 July, 2026",
    deadlineColor: "text-black font-bold",
    cta: "Reserve Your Nadi Reading Today",
    buttonBg: "bg-red-700 hover:bg-red-800",
    buttonText: "text-white",
    image: Hyderabad_Nadi_Camp,
    mobileImage: HyderabadNadiCampMob,
  },
  {
    id: 8,
    title: "AADI AMAVASYA ANCESTOR BLESSINGS",
    titleColor: "text-[#FCD34D]",
    tagline: "Honor Your Ancestors & Support Family Harmony and Progress",
    taglineColor: "text-white",
    deadline: "SAVE UP TO 15% BEFORE JUL. 30, 2026",
    deadlineColor: "text-[#FCD34D]",
    cta: "PARTICIPATE NOW",
    buttonBg: "bg-[#FCD34D] hover:bg-yellow-400",
    buttonText: "text-[#1E3A8A]",
    image: Aadi_Amavasya,
    mobileImage: AadiAmavasyaMob,
  },
  {
    id: 9,
    title: "SUPREME GODDESS CEREMONIES IN AADI MONTH",
    titleColor: "text-yellow-400",
    tagline: "Experience Powerful Goddess Ceremonies for Protection, Prosperity & Blessings",
    taglineColor: "text-white italic",
    deadline: "LIVE ON JUL.17, 2026 | 4:30 AM IST",
    deadlineColor: "text-yellow-400",
    cta: "JOIN THE SACRED CEREMONY",
    buttonBg: "bg-yellow-400 hover:bg-yellow-500",
    buttonText: "text-[#7f1d1d]",
    image: Aadi_Goddess,
    mobileImage: AadiGoddessMob,
  }
];

export function SpecialEvents() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
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
    setDirection(1);
    setCurrentIndex((prev) => (prev === events.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? events.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Preload images to prevent visual flicker on first cycle
  useEffect(() => {
    events.forEach((event) => {
      const imgDesktop = new Image();
      imgDesktop.src = event.image;
      const imgMobile = new Image();
      imgMobile.src = event.mobileImage;
    });
  }, []);

  return (
    <section id="special-events" className="pt-4 pb-6 md:pt-6 md:pb-8 lg:pt-2 lg:pb-2 relative overflow-hidden transition-colors duration-500 z-10 flex flex-col lg:justify-center lg:min-h-[calc(100vh-80px)]">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 relative z-10">

        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-6 md:mb-5 lg:mb-4">
          <p className="text-amber-600 dark:text-amber-400 font-sans text-xs md:text-sm uppercase tracking-widest font-bold mb-3">
            LIVE THIS WEEK
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[3rem] text-midnight dark:text-cream leading-[1.1] font-black mb-4 md:mb-5 lg:mb-4 drop-shadow-sm tracking-tight">
            This Week's <em className="text-amber-600 dark:text-amber-400 italic font-bold">Special Rituals.</em>
          </h2>
          <p className="hidden sm:block font-sans text-gray-500 dark:text-gray-400 text-sm sm:text-base md:text-sm lg:text-base leading-relaxed max-w-2xl mx-auto font-medium px-4 md:px-2 md:mt-1">
            Performed live on the auspicious tithi — in your name, wherever you are.
          </p>
        </div>

        {/* Carousel Container */}
        <div
          className="relative group px-0 touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="overflow-hidden rounded-[2.5rem] bg-transparent transition-all duration-500 relative grid">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="w-full cursor-pointer flex flex-col items-center col-start-1 row-start-1"
              >
                {/* Responsive Background Images */}
                <div className="w-full relative">
                  {/* Mobile Image (Hidden on Desktop) */}
                  <img
                    src={events[currentIndex].mobileImage}
                    alt={events[currentIndex].title}
                    className="block md:hidden w-full h-auto object-contain rounded-[1.5rem] border border-white/5"
                  />

                  {/* Desktop Image (Hidden on Mobile) */}
                  <img
                    src={events[currentIndex].image}
                    alt={events[currentIndex].title}
                    className="hidden md:block w-full h-auto max-h-[45vh] lg:max-h-[45vh] object-contain rounded-[2.5rem] border border-white/5 hover:border-[#facc15]/50 hover:shadow-[0_0_40px_rgba(250,204,21,0.2)] transition-all duration-500 group-hover/card:scale-[1.02]"
                  />

                  <div className="flex absolute bottom-0 inset-x-0 pb-8 sm:pb-12 md:pb-0 md:inset-y-0 md:inset-x-auto md:right-0 w-full md:w-[55%] flex-col justify-end md:justify-center items-center text-center px-4 md:px-6 lg:px-12 z-10 group/text bg-gradient-to-t from-black/80 via-black/40 to-transparent md:bg-none rounded-b-[1.5rem] md:rounded-none pt-20 md:pt-0">
                    <motion.span
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      className={`font-serif text-xs md:text-xs lg:text-sm xl:text-base mb-1.5 md:mb-1 lg:mb-1.5 ${events[currentIndex].taglineColor} drop-shadow-md`}
                    >
                      {events[currentIndex].tagline}
                    </motion.span>
                    <motion.h3
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3, duration: 0.5, type: 'spring' }}
                      className={`font-serif text-lg sm:text-xl md:text-lg lg:text-2xl xl:text-3xl font-extrabold tracking-wider mb-2 md:mb-1.5 lg:mb-2 leading-tight uppercase ${events[currentIndex].titleColor} drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]`}
                    >
                      {events[currentIndex].title}
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                      className={`font-sans text-xs sm:text-sm md:text-[10px] lg:text-xs xl:text-sm mb-4 md:mb-2 lg:mb-3 font-semibold tracking-wide ${events[currentIndex].deadlineColor} drop-shadow-md`}
                    >
                      {events[currentIndex].deadline}
                    </motion.p>
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.05, boxShadow: "0px 0px 25px rgba(255, 255, 255, 0.4)" }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ delay: 0.5, duration: 0.5, type: 'spring', stiffness: 400, damping: 10 }}
                      className={`relative overflow-hidden inline-flex items-center justify-center px-6 py-2.5 md:px-4 md:py-1.5 lg:px-5 lg:py-2 rounded-full font-sans text-xs lg:text-xs font-extrabold transition-all shadow-[0_0_15px_rgba(0,0,0,0.3)] ${events[currentIndex].buttonBg} ${events[currentIndex].buttonText} border border-white/20`}
                    >
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-[150%] animate-[shimmer_3s_infinite]"></span>
                      <span className="z-10 flex items-center relative">
                        {events[currentIndex].cta}
                        <ArrowRight className="w-3 h-3 lg:w-4 lg:h-4 ml-1.5 opacity-90 group-hover/text:translate-x-1.5 transition-transform duration-300" />
                      </span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons (Placed inside the card bounds) */}
          <button
            onClick={prevSlide}
            className="absolute left-2 md:left-4 top-[40%] md:top-1/2 -translate-y-1/2 bg-black/50 border border-white/20 p-2 md:p-3 rounded-full text-white hover:bg-black/80 hover:scale-110 transition-all z-20 backdrop-blur-sm"
          >
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 md:right-4 top-[40%] md:top-1/2 -translate-y-1/2 bg-black/50 border border-white/20 p-2 md:p-3 rounded-full text-white hover:bg-black/80 hover:scale-110 transition-all z-20 backdrop-blur-sm"
          >
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 md:bottom-8 left-0 right-0 flex justify-center gap-2 z-20 pointer-events-none">
            {events.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 pointer-events-auto ${currentIndex === idx
                  ? 'bg-amber-400 w-6'
                  : 'bg-white/30 hover:bg-white/50 w-1.5'
                  }`}
              />
            ))}
          </div>
        </div>

        {/* Premium Static Theme CTA Bar - Placed BELOW the banner */}
        {/* Unique Two Action Buttons Layout (Custom Badge Portal Buttons - No Banner) */}
        <div className="w-full flex flex-col md:flex-row justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 mt-4 sm:mt-6 lg:mt-4 mb-4 lg:mb-2 px-2 sm:px-6 md:px-10 lg:px-8">
          
          {/* Talk to Astrology Button */}
          <button className="relative flex items-center justify-between pl-14 sm:pl-16 pr-3 sm:pr-4 py-3 rounded-full bg-gradient-to-r from-[#20033b] via-[#3a0c6a] to-[#510e8d] hover:to-[#5c0fa0] transition-all duration-300 shadow-[0_10px_30px_rgba(58,12,106,0.3)] hover:shadow-[0_10px_35px_rgba(176,82,255,0.5)] border-[2.5px] border-amber-400 hover:scale-[1.03] w-full max-w-[280px] sm:max-w-[320px] md:max-w-[290px] lg:max-w-[360px] h-[64px] sm:h-[70px] md:h-[76px] group ml-4 sm:ml-2 md:ml-4 lg:ml-0">
            {/* Circular badge sticking out on the left */}
            <div className="absolute left-[-20px] sm:left-[-20px] top-1/2 -translate-y-1/2 w-[64px] h-[64px] sm:w-[72px] sm:h-[72px] rounded-full border-[3px] border-amber-400 bg-gradient-to-b from-[#2a0854] to-[#120224] flex items-center justify-center shadow-lg z-20 group-hover:scale-105 transition-transform duration-300">
              <PhoneCall className="w-8 h-8 sm:w-10 sm:h-10 text-purple-300 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)] fill-purple-300/20" strokeWidth={1.5} />
            </div>
            
            {/* Texts */}
            <div className="flex flex-col items-start justify-center flex-grow pl-2 sm:pl-3 text-left">
              <span className="font-serif text-white text-[14px] sm:text-base md:text-[14px] lg:text-lg font-bold tracking-wide drop-shadow-md leading-tight whitespace-nowrap">
                Talk to Astrologer
              </span>
              <span className="font-sans text-[7px] sm:text-[8px] md:text-[8px] lg:text-[9px] text-amber-300/90 font-medium tracking-wide mt-0.5">
                Get Answers. Gain Clarity. Find Guidance.
              </span>
            </div>

            {/* Right Chevron Button */}
            <div className="w-7 h-7 sm:w-9 sm:h-9 md:w-8 md:h-8 lg:w-9 lg:h-9 rounded-full bg-white flex items-center justify-center shadow-md z-10 group-hover:translate-x-1 transition-transform duration-300 shrink-0">
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-4 md:h-4 lg:w-5 lg:h-5 text-purple-800 stroke-[2.5]" />
            </div>
          </button>

          {/* Homa & Remedies Button */}
          <button className="relative flex items-center justify-between pl-14 sm:pl-16 pr-3 sm:pr-4 py-3 rounded-full bg-gradient-to-r from-[#983800] via-[#c65104] to-[#ea6b06] hover:to-[#f2740d] transition-all duration-300 shadow-[0_10px_30px_rgba(198,81,4,0.3)] hover:shadow-[0_10px_35px_rgba(245,158,11,0.5)] border-[2.5px] border-amber-400 hover:scale-[1.03] w-full max-w-[280px] sm:max-w-[320px] md:max-w-[290px] lg:max-w-[360px] h-[64px] sm:h-[70px] md:h-[76px] group ml-4 sm:ml-2 md:ml-0">
            {/* Circular badge sticking out on the left */}
            <div className="absolute left-[-20px] sm:left-[-20px] top-1/2 -translate-y-1/2 w-[64px] h-[64px] sm:w-[72px] sm:h-[72px] rounded-full border-[3px] border-amber-400 bg-gradient-to-b from-[#8f3a00] to-[#3a1500] flex items-center justify-center shadow-lg z-20 group-hover:scale-105 transition-transform duration-300">
              <Flame className="w-8 h-8 sm:w-10 sm:h-10 text-orange-200 drop-shadow-[0_0_8px_rgba(245,158,11,0.8)] fill-orange-500/30" strokeWidth={1.5} />
            </div>
            
            {/* Texts */}
            <div className="flex flex-col items-start justify-center flex-grow pl-2 sm:pl-3 text-left">
              <span className="font-serif text-white text-[14px] sm:text-base md:text-[14px] lg:text-lg font-bold tracking-wide drop-shadow-md leading-tight whitespace-nowrap">
                Homa & Remedies
              </span>
              <span className="font-sans text-[7px] sm:text-[8px] md:text-[8px] lg:text-[9px] text-amber-300/90 font-medium tracking-wide mt-0.5">
                Balance. Heal. Harmonize.
              </span>
            </div>

            {/* Right Chevron Button */}
            <div className="w-7 h-7 sm:w-9 sm:h-9 md:w-8 md:h-8 lg:w-9 lg:h-9 rounded-full bg-white flex items-center justify-center shadow-md z-10 group-hover:translate-x-1 transition-transform duration-300 shrink-0">
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-4 md:h-4 lg:w-5 lg:h-5 text-orange-700 stroke-[2.5]" />
            </div>
          </button>

        </div>

        {/* <div className="text-center mt-6">
          <a href="#" className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 font-sans text-sm uppercase tracking-widest font-semibold hover:gap-3 transition-all">
            View all special events <ArrowRight className="w-4 h-4" />
          </a>
        </div> */}
      </div>
    </section>
  );
}
