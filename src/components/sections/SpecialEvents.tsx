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
          <p className="text-amber-600 dark:text-amber-400 font-sans text-sm md:text-base uppercase tracking-[0.2em] font-extrabold mb-3 md:mb-4 drop-shadow-sm">
            LIVE THIS WEEK
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[3rem] text-midnight dark:text-cream leading-[1.1] font-black mb-4 md:mb-5 lg:mb-4 drop-shadow-sm tracking-tight">
            This Week's <em className="text-amber-600 dark:text-amber-400 italic font-bold">Special Rituals.</em>
          </h2>
          <p className="font-sans text-gray-500 dark:text-gray-400 text-sm sm:text-base md:text-sm lg:text-base leading-relaxed max-w-2xl mx-auto font-medium px-4 md:px-2 md:mt-1">
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
        <div className="w-full bg-transparent pb-6 pt-6 md:pb-3 md:pt-2 mt-4 md:mt-4">
          <div className="w-11/12 max-w-4xl mx-auto relative group">
            {/* Ambient Background Glow Effect (Crimson for Light Mode, Indigo for Dark Mode) */}
            <div
              className="absolute -inset-0.5 rounded-[1.25rem] blur opacity-50 group-hover:opacity-70 transition-all duration-700 bg-gradient-to-r from-amber-500 via-red-600 to-amber-500 dark:from-blue-600 dark:via-indigo-500 dark:to-blue-600"
            ></div>

            <div
              className="relative rounded-2xl md:rounded-2xl p-4 md:p-3 flex flex-col lg:flex-row items-center justify-between gap-4 md:gap-3 border border-white/10 dark:border-white/5 overflow-hidden bg-gradient-to-r from-[#2a0404] via-[#5c0a0a] to-[#2a0404] dark:from-[#04091a] dark:via-[#111836] dark:to-[#04091a] premium-animated-banner"
            >
              {/* Subtle top shimmer line */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-400/40 dark:via-blue-400/30 to-transparent"></div>

              <div className="text-center lg:text-left z-10 px-2 mb-3 md:mb-0">
                <h3 className="font-extrabold text-base md:text-base uppercase tracking-wider text-amber-400 dark:text-amber-300 drop-shadow-md">
                  Elevate Your Spiritual Journey
                </h3>
                <p className="text-xs md:text-xs font-medium text-amber-100/90 dark:text-white/90 mt-1 md:mt-0.5 tracking-wide">
                  Connect with our top experts instantly
                </p>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-3 w-full lg:w-auto z-10">
                {/* White Button */}
                <button className="animated-btn w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-red-900 px-6 py-3 md:px-4 md:py-1.5 rounded-full font-bold text-xs md:text-xs hover:bg-gray-50 transition-all shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] transform hover:-translate-y-0.5">
                  <span className="relative flex h-2 w-2 z-30">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <PhoneCall className="w-4 h-4 md:w-3.5 md:h-3.5 z-30" />
                  <span className="z-30 whitespace-nowrap">Talk to Astrologer</span>
                </button>

                {/* Amber Button */}
                <button className="animated-btn w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-red-950 px-6 py-3 md:px-4 md:py-1.5 rounded-full font-bold text-xs md:text-xs hover:from-amber-400 hover:to-orange-400 transition-all shadow-[0_0_15px_rgba(245,158,11,0.3)] hover:shadow-[0_0_25px_rgba(245,158,11,0.5)] transform hover:-translate-y-0.5 border border-amber-300/50">
                  <Flame className="w-4 h-4 md:w-3.5 md:h-3.5 z-30" />
                  <span className="z-30 whitespace-nowrap">Homa & Remedies</span>
                </button>
              </div>
            </div>
          </div>
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
