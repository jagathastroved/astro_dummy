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
          sources: [],
          link: '',
        }
      ],
      originalData: item // Keep reference to original for text overlays if needed
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
                    sources: [],
                    link,
                  };
                });

                return {
                  id: index + 1,
                  isThreeBan: true,
                  banners,
                  originalData: null
                };
              } else {
                const img = item.querySelector('img');
                const anchor = item.querySelector('a');
                const picture = item.querySelector('picture');

                let sources = [];
                if (picture) {
                  const sourceElements = picture.querySelectorAll('source');
                  sourceElements.forEach(src => {
                    sources.push({
                      media: src.getAttribute('media') || '',
                      srcSet: src.getAttribute('srcset') || ''
                    });
                  });
                } else {
                  // Fallback if no picture tag but we have the querySelector from original prompt
                  const source = item.querySelector('picture source');
                  if (source && source.getAttribute('srcset')) {
                    sources.push({
                      media: '(max-width: 767px)',
                      srcSet: source.getAttribute('srcset') || ''
                    });
                  }
                }

                const title = img ? (img.getAttribute('alt') || img.getAttribute('title') || 'Special Event') : 'Special Event';
                const image = img ? img.getAttribute('src') || '' : '';
                const mobileImage = sources.length > 0 ? sources[0].srcSet : image;
                const link = anchor ? anchor.getAttribute('href') || '' : '';

                return {
                  id: index + 1,
                  isThreeBan: false,
                  banners: [
                    {
                      title,
                      image,
                      mobileImage,
                      sources,
                      link,
                    }
                  ],
                  originalData: null
                };
              }
            });

            setDisplayEvents(parsedEvents);
            setCurrentIndex(0);
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
    <section id="special-events" className="pt-4 pb-12 md:pt-6 md:pb-16 relative overflow-hidden transition-colors duration-500 z-10">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 relative z-10">

        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-6 md:mb-5 lg:mb-4">
          <p className="text-amber-600 dark:text-amber-400 font-sans text-xs md:text-sm uppercase tracking-widest font-bold mb-3">
            LIVE THIS WEEK
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[3rem] text-midnight dark:text-cream leading-[1.1] font-black mb-4 md:mb-5 lg:mb-4 drop-shadow-sm tracking-tight">
            This Week's <em className="text-amber-600 dark:text-amber-400 italic font-bold">Special Rituals.</em>
          </h2>
          <p className="block font-sans text-gray-500 dark:text-gray-400 text-sm sm:text-base md:text-sm lg:text-base leading-relaxed max-w-2xl mx-auto font-medium px-4 md:px-2 md:mt-1">
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
          <div className="overflow-hidden rounded-[2.5rem] bg-[#FFF5E1] transition-all duration-500 relative grid">
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
                    <div className="w-full flex gap-3 md:gap-4 justify-between items-center bg-[#FFF5E1] rounded-[1.5rem] md:rounded-[2.5rem] border border-black/5 p-3 md:p-4 hover:border-[#facc15]/50 hover:shadow-[0_0_40px_rgba(250,204,21,0.2)] transition-all duration-500 group-hover/card:scale-[1.02]">
                      {displayEvents[currentIndex].banners.map((banner, idx) => (
                        <a
                          key={idx}
                          href={banner.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex-1 ${idx === 1 ? 'hidden md:block' : idx === 2 ? 'hidden lg:block' : 'block'}`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <img
                            src={banner.image}
                            alt={banner.title}
                            className="w-full h-auto object-contain rounded-[1rem] md:rounded-[1.5rem] transition-all duration-500 hover:scale-[1.03] shadow-sm hover:shadow-md"
                          />
                        </a>
                      ))}
                    </div>
                  ) : (
                    <div className="w-full relative">
                      {/* Responsive Picture tag handling both Mobile, Tab and Desktop */}
                      <picture>
                        {displayEvents[currentIndex].banners[0].sources.map((src, i) => (
                          <source key={i} media={src.media} srcSet={src.srcSet} />
                        ))}
                        {/* Fallback & Desktop Image */}
                        <img
                          src={displayEvents[currentIndex].banners[0].image}
                          alt={displayEvents[currentIndex].banners[0].title}
                          className="w-full h-auto object-contain rounded-[1.5rem] md:rounded-[2.5rem] bg-[#FFF5E1] border border-black/5 hover:border-[#facc15]/50 hover:shadow-[0_0_40px_rgba(250,204,21,0.2)] transition-all duration-500 group-hover/card:scale-[1.02]"
                        />
                      </picture>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-black/50 border border-white/20 p-2 md:p-3 rounded-full text-white hover:bg-black/80 hover:scale-110 transition-all z-20 backdrop-blur-sm"
          >
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-black/50 border border-white/20 p-2 md:p-3 rounded-full text-white hover:bg-black/80 hover:scale-110 transition-all z-20 backdrop-blur-sm"
          >
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 md:bottom-8 left-0 right-0 flex justify-center gap-2 z-20 pointer-events-none">
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

        {/* Premium Static Theme CTA Bar */}
        <div className="w-full flex flex-col md:flex-row justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 mt-4 sm:mt-6 lg:mt-4 mb-4 lg:mb-2 px-2 sm:px-6 md:px-10 lg:px-8">
          {/* Talk to Astrology Button */}
          <button className="relative flex items-center justify-between pl-12 sm:pl-14 pr-3 py-2.5 rounded-full bg-gradient-to-r from-[#20033b] via-[#3a0c6a] to-[#510e8d] hover:to-[#5c0fa0] transition-all duration-300 shadow-[0_10px_30px_rgba(58,12,106,0.3)] hover:shadow-[0_10px_35px_rgba(176,82,255,0.5)] border-[2px] border-amber-400 hover:scale-[1.03] w-full max-w-[260px] sm:max-w-[280px] md:max-w-[270px] lg:max-w-[290px] h-[56px] sm:h-[60px] lg:h-[64px] group ml-4 sm:ml-2 md:ml-4 lg:ml-0">
            <div className="absolute left-[-16px] sm:left-[-18px] top-1/2 -translate-y-1/2 w-[56px] h-[56px] lg:w-[60px] lg:h-[60px] rounded-full border-[2.5px] border-amber-400 bg-gradient-to-b from-[#2a0854] to-[#120224] flex items-center justify-center shadow-lg z-20 group-hover:scale-105 transition-transform duration-300">
              <PhoneCall className="w-7 h-7 lg:w-8 lg:h-8 text-purple-300 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)] fill-purple-300/20" strokeWidth={1.5} />
            </div>
            <div className="flex flex-col items-start justify-center flex-grow pl-2 text-left">
              <span className="font-serif text-white text-[13px] sm:text-[14px] lg:text-[15px] font-bold tracking-wide drop-shadow-md leading-tight whitespace-nowrap">
                Talk to Astrologer
              </span>
              <span className="font-sans text-[9px] sm:text-[10px] lg:text-[11px] text-amber-200/95 font-semibold tracking-wide mt-0.5">
                Get Answers. Gain Clarity.
              </span>
            </div>
            <div className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 rounded-full bg-white flex items-center justify-center shadow-md z-10 group-hover:translate-x-1 transition-transform duration-300 shrink-0">
              <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-4 lg:h-4 text-purple-800 stroke-[2.5]" />
            </div>
          </button>

          {/* Homa & Remedies Button */}
          <button className="relative flex items-center justify-between pl-12 sm:pl-14 pr-3 py-2.5 rounded-full bg-gradient-to-r from-[#983800] via-[#c65104] to-[#ea6b06] hover:to-[#f2740d] transition-all duration-300 shadow-[0_10px_30px_rgba(198,81,4,0.3)] hover:shadow-[0_10px_35px_rgba(245,158,11,0.5)] border-[2px] border-amber-400 hover:scale-[1.03] w-full max-w-[260px] sm:max-w-[280px] md:max-w-[270px] lg:max-w-[290px] h-[56px] sm:h-[60px] lg:h-[64px] group ml-4 sm:ml-2 md:ml-0">
            <div className="absolute left-[-16px] sm:left-[-18px] top-1/2 -translate-y-1/2 w-[56px] h-[56px] lg:w-[60px] lg:h-[60px] rounded-full border-[2.5px] border-amber-400 bg-gradient-to-b from-[#8f3a00] to-[#3a1500] flex items-center justify-center shadow-lg z-20 group-hover:scale-105 transition-transform duration-300">
              <Flame className="w-7 h-7 lg:w-8 lg:h-8 text-orange-200 drop-shadow-[0_0_8px_rgba(245,158,11,0.8)] fill-orange-500/30" strokeWidth={1.5} />
            </div>
            <div className="flex flex-col items-start justify-center flex-grow pl-2 text-left">
              <span className="font-serif text-white text-[13px] sm:text-[14px] lg:text-[15px] font-bold tracking-wide drop-shadow-md leading-tight whitespace-nowrap">
                Homa & Remedies
              </span>
              <span className="font-sans text-[9px] sm:text-[10px] lg:text-[11px] text-amber-200/95 font-semibold tracking-wide mt-0.5">
                Balance. Heal. Harmonize.
              </span>
            </div>
            <div className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 rounded-full bg-white flex items-center justify-center shadow-md z-10 group-hover:translate-x-1 transition-transform duration-300 shrink-0">
              <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-4 lg:h-4 text-orange-700 stroke-[2.5]" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
