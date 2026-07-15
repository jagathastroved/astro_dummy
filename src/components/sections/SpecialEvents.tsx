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
  const [displayEvents, setDisplayEvents] = useState(() =>
    events.map((item) => ({
      id: item.id,
      isThreeBan: false,
      banners: [
        {
          title: item.title,
          image: item.image,
          mobileImage: item.mobileImage,
          link: '',
        }
      ]
    }))
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://phplexus.astroved.com/wp-json/api/v1/new-home-slider/USD');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0 && data[0].desktop_content) {
          const parser = new DOMParser();
          const doc = parser.parseFromString(data[0].desktop_content, 'text/html');
          const carouselItems = doc.querySelectorAll('.carousel-item');

          if (carouselItems.length > 0) {
            const parsedEvents = Array.from(carouselItems).map((item, index) => {
              const threeBanContainer = item.querySelector('.three-ban');

              if (threeBanContainer) {
                const anchors = threeBanContainer.querySelectorAll('a');
                const banners = Array.from(anchors).map((anchor) => {
                  const img = anchor.querySelector('img');
                  const title = img ? (img.getAttribute('alt') || img.getAttribute('title') || 'Special Event') : 'Special Event';
                  const image = img ? img.getAttribute('src') || '' : '';
                  const link = anchor.getAttribute('href') || '';

                  return {
                    title,
                    image,
                    mobileImage: image,
                    link,
                  };
                });

                return {
                  id: index + 1,
                  isThreeBan: true,
                  banners,
                };
              } else {
                const img = item.querySelector('img');
                const anchor = item.querySelector('a');
                const source = item.querySelector('picture source');

                const title = img ? (img.getAttribute('alt') || img.getAttribute('title') || 'Special Event') : 'Special Event';
                const image = img ? img.getAttribute('src') || '' : '';
                const mobileImage = source ? source.getAttribute('srcset') || image : image;
                const link = anchor ? anchor.getAttribute('href') || '' : '';

                return {
                  id: index + 1,
                  isThreeBan: false,
                  banners: [
                    {
                      title,
                      image,
                      mobileImage,
                      link,
                    }
                  ],
                };
              }
            });

            setDisplayEvents(parsedEvents);
            setCurrentIndex(0); // Reset to first item
          }
        }
      } catch (err: any) {
        console.error('Error fetching special events:', err);
        setError(err.message || 'Failed to fetch');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

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
    setCurrentIndex((prev) => (prev === displayEvents.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? displayEvents.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [displayEvents]);

  // Preload images to prevent visual flicker on first cycle
  useEffect(() => {
    displayEvents.forEach((event) => {
      event.banners.forEach((banner) => {
        const imgDesktop = new Image();
        imgDesktop.src = banner.image;
        if (banner.mobileImage) {
          const imgMobile = new Image();
          imgMobile.src = banner.mobileImage;
        }
      });
    });
  }, [displayEvents]);

  return (
    <section id="special-events" className="py-4 md:py-6 relative overflow-hidden transition-colors duration-500 z-10">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 relative z-10">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <p className="text-amber-600 dark:text-amber-400 font-sans text-xs md:text-sm uppercase tracking-widest font-bold mb-3">
            LIVE THIS WEEK
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-midnight dark:text-cream leading-tight font-bold mb-4">
            This Week's <em className="text-amber-600 dark:text-amber-400 italic">Special Rituals.</em>
          </h2>
          <p className="font-sans text-gray-500 dark:text-gray-400 text-sm md:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto font-medium">
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
              {displayEvents.length > 0 && (
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="w-full cursor-pointer flex flex-col items-center col-start-1 row-start-1"
                  onClick={() => {
                    if (!displayEvents[currentIndex].isThreeBan) {
                      const link = displayEvents[currentIndex].banners[0]?.link;
                      if (link) {
                        window.open(link, '_blank', 'noopener,noreferrer');
                      }
                    }
                  }}
                >
                  {displayEvents[currentIndex].isThreeBan ? (
                    <div className="w-full flex gap-3 md:gap-4 justify-between items-center bg-[#faecd1] dark:bg-[#1a0b2e] p-3 md:p-4 rounded-[2.5rem] border border-amber-900/10 dark:border-white/10 shadow-sm dark:shadow-xl">
                      {displayEvents[currentIndex].banners.map((banner, idx) => (
                        <a
                          key={idx}
                          href={banner.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex-1 ${idx === 1 ? 'hidden md:block' : idx === 2 ? 'hidden lg:block' : 'block'
                            }`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <img
                            src={banner.image}
                            alt={banner.title}
                            className="w-full h-auto object-contain rounded-[1.5rem] md:rounded-[2rem] border border-white/5 hover:border-[#facc15]/50 hover:shadow-[0_0_40px_rgba(250,204,21,0.2)] transition-all duration-500 hover:scale-[1.02]"
                          />
                        </a>
                      ))}
                    </div>
                  ) : (
                    <div className="w-full relative">
                      {/* Mobile Image (Hidden on Desktop) */}
                      <img
                        src={displayEvents[currentIndex].banners[0].mobileImage}
                        alt={displayEvents[currentIndex].banners[0].title}
                        className="block md:hidden w-full h-auto object-contain rounded-[1.5rem] border border-white/5"
                      />

                      {/* Desktop Image (Hidden on Mobile) */}
                      <img
                        src={displayEvents[currentIndex].banners[0].image}
                        alt={displayEvents[currentIndex].banners[0].title}
                        className="hidden md:block w-full h-auto object-contain rounded-[2.5rem] border border-white/5 hover:border-[#facc15]/50 hover:shadow-[0_0_40px_rgba(250,204,21,0.2)] transition-all duration-500 group-hover/card:scale-[1.02]"
                      />
                    </div>
                  )}
                </motion.div>
              )}
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
          <div className="absolute bottom-1.5 md:bottom-8 left-0 right-0 flex justify-center gap-2 z-20 pointer-events-none">
            {displayEvents.map((_, idx) => (
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
        <div className="w-full bg-transparent pb-6 pt-4 mt-4 md:mt-8">
          <div className="w-11/12 max-w-4xl mx-auto relative group">
            {/* Ambient Background Glow Effect (Adaptive Glow) */}
            <div
              className="absolute -inset-0.5 rounded-[1.25rem] blur opacity-55 group-hover:opacity-75 transition-all duration-700 bg-gradient-to-r from-[#7c3aed] via-[#ec4899] to-[#7c3aed] dark:from-[#a855f7] dark:via-[#facc15] dark:to-[#a855f7]"
            ></div>

            <div
              className="relative rounded-2xl p-4 lg:p-5 flex flex-col lg:flex-row items-center justify-between gap-4 border border-white/10 dark:border-purple-500/30 overflow-hidden bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#ec4899] dark:from-[#2e1065] dark:via-[#581c87] dark:to-[#2e1065] premium-animated-banner"
            >
              {/* Subtle top shimmer line */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>

              <div className="text-center lg:text-left z-10 px-2">
                <h3 className="font-extrabold text-base md:text-lg lg:text-xl uppercase tracking-wider text-white dark:text-[#facc15] drop-shadow-sm font-sans">
                  Divine Guidance & Remedies
                </h3>
                <p className="text-xs md:text-sm font-semibold text-purple-100 dark:text-purple-200/90 mt-1 tracking-wide">
                  Talk to astrologers or book homas instantly
                </p>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-3 w-full lg:w-auto z-10">
                {/* Talk to Astrologer Button */}
                <button className="animated-btn flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-white text-[#7c3aed] dark:text-[#2e1065] px-5 py-2.5 rounded-full font-bold text-xs md:text-sm hover:bg-gray-50 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 border border-transparent">
                  <span className="relative flex h-2 w-2 z-30">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <PhoneCall className="w-4 h-4 z-30" />
                  <span className="z-30">Talk to Astrologer</span>
                </button>

                {/* Homa & Remedies Button */}
                <button className="animated-btn flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-amber-400 dark:bg-amber-500 text-slate-900 dark:text-white px-5 py-2.5 rounded-full font-bold text-xs md:text-sm hover:bg-amber-300 dark:hover:bg-amber-600 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 border border-amber-300/30">
                  <Flame className="w-4 h-4 z-30" />
                  <span className="z-30">Homa & Remedies</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <a href="#" className="inline-flex items-center gap-2 text-amber-600 font-sans text-sm uppercase tracking-widest font-semibold hover:gap-3 transition-all">
            View all special events <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}