import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Flame, PhoneCall } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Vastu_Homa from '../../assets/Special_events/Vastu_Homa.jpg';
import Ashada_Navratri from '../../assets/Special_events/Ashada_Navratri.jpg';
import Sudarshana_Jayanthi from '../../assets/Special_events/Sudarshana_Jayanthi.jpg';
import Solar_Eclipse_2026 from '../../assets/Special_events/Solar_Eclipse_2026.jpg';
import Karuppasamy from '../../assets/Special_events/Karuppasamy.jpg';
import Hyderabad_Nadi_Camp from '../../assets/Special_events/Hyderabad_Nadi_Camp.jpg';
import Guru_purnima from '../../assets/Special_events/Guru-purnima.jpg';
import Aadi_Goddess from '../../assets/Special_events/Aadi_Goddess.jpg';
import Aadi_Amavasya from '../../assets/Special_events/Aadi_Amavasya.jpg';
import AadiAmavasyaMob from '../../assets/Special_events/mobile_banners/Aadi-Amavasya-mob.jpg';
import AadiGoddessMob from '../../assets/Special_events/mobile_banners/Aadi-Goddess-mob.jpg';
import AshadaNavratriMob from '../../assets/Special_events/mobile_banners/Ashada-Navratri-mob.jpg';
import GuruPurnimaMob from '../../assets/Special_events/mobile_banners/Guru-Purnima-mob.jpg';
import HyderabadNadiCampMob from '../../assets/Special_events/mobile_banners/Hyderabad-Nadi-Camp-mob.jpg';
import KaruppasamyMob from '../../assets/Special_events/mobile_banners/Karuppasamy’s-Swift-Protection-mob.jpg';
import SolarEclipseMob from '../../assets/Special_events/mobile_banners/Solar-Eclipse-2026-mob.jpg';
import SudarshanaJayanthiMob from '../../assets/Special_events/mobile_banners/Sudarshana-Jayanthi-mob.jpg';
import VastuHomaMob from '../../assets/Special_events/mobile_banners/Vastu-Homa-mob.jpg';

/**
 * Interface for static upcoming events to be used in the future.
 */
interface StaticEventItem {
  id: number;
  title: string;
  titleColor: string;
  tagline: string;
  taglineColor: string;
  deadline: string;
  deadlineColor: string;
  cta: string;
  buttonBg: string;
  buttonText: string;
  image: string;
  mobileImage: string;
}

/**
 * Static events configuration for future usage.
 */
const STATIC_EVENTS: StaticEventItem[] = [
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

/**
 * Interface defining the structure of the fetched event banners.
 */
interface EventBanner {
  title: string;
  image: string;
  mobileImage: string;
  sources: Array<{ media: string; srcSet: string }>;
  link: string;
}

/**
 * Interface defining the structure of the parsed API event items.
 */
interface ApiEventItem {
  id: number;
  isThreeBan: boolean;
  banners: EventBanner[];
  originalData: any;
}

/** --- Shared Tailwind CSS Classes --- */

/* Base Section & Headers */
const SECTION_WRAPPER_STYLES = "pt-2 md:pt-4 pb-3 md:pb-6 relative overflow-hidden transition-colors duration-500 z-10";
const CONTENT_WRAPPER_STYLES = "max-w-[1600px] mx-auto px-4 md:px-8 relative z-10";
const HEADER_CONTAINER_STYLES = "text-center w-full mx-auto mb-6 md:mb-5 lg:mb-3";
const HEADER_SUBTITLE_STYLES = "text-amber-600 dark:text-amber-400 font-sans text-xs md:text-sm uppercase tracking-widest font-bold mb-3";
const HEADER_TITLE_STYLES = "font-serif text-3xl sm:text-4xl md:text-5xl text-midnight dark:text-cream leading-tight font-bold mb-4";
const HEADER_DESC_STYLES = "block font-sans text-gray-500 dark:text-gray-400 text-sm sm:text-base md:text-sm lg:text-base leading-relaxed max-w-2xl mx-auto font-medium px-4 md:px-2 md:mt-1";

/* Carousel Container */
const CAROUSEL_WRAPPER_STYLES = "relative group px-0 touch-pan-y";
const CAROUSEL_BOX_STYLES = "overflow-hidden rounded-[2.5rem] bg-[#FFF5E1] transition-all duration-500 relative grid aspect-[4/5] md:aspect-[21/9] lg:aspect-[4/1]";
const LOADING_CONTAINER_STYLES = "w-full h-full flex items-center justify-center col-start-1 row-start-1 z-20";
const LOADING_CONTENT_STYLES = "flex flex-col items-center gap-3";
const LOADING_TEXT_STYLES = "text-xs font-semibold text-amber-600 dark:text-amber-500 uppercase tracking-widest animate-pulse";

/* Carousel Images */
const MULTI_BANNER_WRAPPER_STYLES = "w-full h-full flex gap-3 md:gap-4 justify-between items-center";
const SINGLE_BANNER_WRAPPER_STYLES = "w-full h-full relative";
const MULTI_BANNER_IMG_STYLES = "w-full h-full object-cover rounded-[1rem] md:rounded-[1.5rem] transition-all duration-500 hover:scale-[1.03] shadow-sm hover:shadow-md";
const SINGLE_BANNER_IMG_STYLES = "w-full h-full object-cover rounded-[1.5rem] md:rounded-[2.5rem] bg-[#FFF5E1] border border-black/5 hover:border-[#facc15]/50 hover:shadow-[0_0_40px_rgba(250,204,21,0.2)] transition-all duration-500 group-hover/card:scale-[1.02]";

/* Navigation & Pagination */
const NAV_BTN_PREV_STYLES = "absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-black/50 border border-white/20 p-2 md:p-3 rounded-full text-white hover:bg-black/80 hover:scale-110 transition-all z-20 backdrop-blur-sm";
const NAV_BTN_NEXT_STYLES = "absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-black/50 border border-white/20 p-2 md:p-3 rounded-full text-white hover:bg-black/80 hover:scale-110 transition-all z-20 backdrop-blur-sm";
const PAGINATION_CONTAINER_STYLES = "absolute bottom-4 md:bottom-8 left-0 right-0 flex justify-center gap-2 z-20 pointer-events-none";

/* Static CTA Buttons */
const CTA_BAR_CONTAINER_STYLES = "w-full flex flex-col md:flex-row justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-8 mt-4 sm:mt-5 lg:mt-3 mb-2 lg:mb-0 px-2 sm:px-6 md:px-10 lg:px-8 relative z-30";
const ASTRO_BTN_STYLES = "relative flex items-center justify-center rounded-full bg-gradient-to-r from-[#20033b] via-[#3a0c6a] to-[#510e8d] hover:to-[#5c0fa0] transition-all duration-300 shadow-[0_10px_30px_rgba(58,12,106,0.3)] hover:shadow-[0_10px_35px_rgba(176,82,255,0.5)] border-[2px] border-amber-400 hover:scale-[1.03] w-full max-w-[300px] sm:max-w-[340px] md:max-w-[360px] lg:max-w-[380px] h-[64px] sm:h-[72px] lg:h-[76px] group ml-5 sm:ml-6 md:ml-8 lg:ml-0";
const ASTRO_ICON_WRAPPER_STYLES = "absolute left-[-20px] sm:left-[-24px] top-1/2 -translate-y-1/2 w-[64px] h-[64px] sm:w-[72px] sm:h-[72px] lg:w-[76px] lg:h-[76px] rounded-full border-[2.5px] border-amber-400 bg-gradient-to-b from-[#2a0854] to-[#120224] flex items-center justify-center shadow-lg z-20 group-hover:scale-105 transition-transform duration-300";
const HOMA_BTN_STYLES = "relative flex items-center justify-center rounded-full bg-gradient-to-r from-[#983800] via-[#c65104] to-[#ea6b06] hover:to-[#f2740d] transition-all duration-300 shadow-[0_10px_30px_rgba(198,81,4,0.3)] hover:shadow-[0_10px_35px_rgba(245,158,11,0.5)] border-[2px] border-amber-400 hover:scale-[1.03] w-full max-w-[300px] sm:max-w-[340px] md:max-w-[360px] lg:max-w-[380px] h-[64px] sm:h-[72px] lg:h-[76px] group ml-5 sm:ml-6 md:ml-8 lg:ml-0";
const HOMA_ICON_WRAPPER_STYLES = "absolute left-[-20px] sm:left-[-24px] top-1/2 -translate-y-1/2 w-[64px] h-[64px] sm:w-[72px] sm:h-[72px] lg:w-[76px] lg:h-[76px] rounded-full border-[2.5px] border-amber-400 bg-gradient-to-b from-[#8f3a00] to-[#3a1500] flex items-center justify-center shadow-lg z-20 group-hover:scale-105 transition-transform duration-300";
const CTA_TEXT_WRAPPER_STYLES = "z-10 text-center w-full px-14 sm:px-16";
const CTA_TITLE_STYLES = "font-serif text-white text-[17px] sm:text-[19px] lg:text-[22px] font-bold tracking-wide drop-shadow-md leading-tight whitespace-nowrap";
const CTA_ARROW_WRAPPER_STYLES = "absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full bg-white flex items-center justify-center shadow-md z-10 group-hover:translate-x-1 transition-transform duration-300 shrink-0";
const CTA_ARROW_ICON_ASTRO_STYLES = "w-4 h-4 sm:w-5 sm:h-5 lg:w-5 lg:h-5 text-purple-800 stroke-[2.5]";
const CTA_ARROW_ICON_HOMA_STYLES = "w-4 h-4 sm:w-5 sm:h-5 lg:w-5 lg:h-5 text-orange-800 stroke-[2.5]";

/**
 * Returns dynamic visibility classes for multi-banner arrays.
 * @param index - Index of the banner in the array.
 */
const getMultiBannerVisibilityStyles = (index: number): string => {
  return `flex-1 ${index === 1 ? 'hidden md:block' : index === 2 ? 'hidden lg:block' : 'block'}`;
};

/**
 * Returns dynamic pagination dot styles based on active state.
 * @param isActive - Whether the dot represents the current slide.
 */
const getPaginationDotStyles = (isActive: boolean): string => {
  return `h-1.5 rounded-full transition-all duration-300 pointer-events-auto ${isActive ? 'bg-amber-400 w-6' : 'bg-white/30 hover:bg-white/50 w-1.5'}`;
};

const preloadImages = async (events: ApiEventItem[]) => {
  const promises = events.flatMap((event) =>
    event.banners.flatMap((banner) => {
      const images = [banner.image];

      if (banner.mobileImage) {
        images.push(banner.mobileImage);
      }

      return images.map(
        (src) =>
          new Promise<void>((resolve) => {
            const img = new Image();

            img.onload = () => resolve();
            img.onerror = () => resolve();

            img.src = src;
          })
      );
    })
  );

  await Promise.all(promises);
};

/**
 * SpecialEvents Component
 * 
 * Fetches dynamic events from an external API and renders them in an interactive carousel,
 * alongside static premium CTA buttons.
 */
export function SpecialEvents() {
  const [displayEvents, setDisplayEvents] = useState<ApiEventItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  /**
   * Fetches event carousel HTML from the WordPress API, parses it using DOMParser,
   * and normalizes the data into state-friendly objects.
   */
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
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

                let sources: Array<{ media: string; srcSet: string }> = [];
                if (picture) {
                  const sourceElements = picture.querySelectorAll('source');
                  sourceElements.forEach(src => {
                    sources.push({
                      media: src.getAttribute('media') || '',
                      srcSet: src.getAttribute('srcset') || ''
                    });
                  });
                } else {
                  // Fallback if no picture tag
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

            await preloadImages(parsedEvents);
            setDisplayEvents(parsedEvents);
            setCurrentIndex(0);
            setIsLoading(false);
          } else {
            setIsLoading(false);
          }
        } else {
          setIsLoading(false);
        }
      } catch (err: any) {
        console.error('Error fetching special events:', err);
        setError(err.message || 'Failed to fetch');
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  /**
   * Swipe gesture start logic.
   */
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  /**
   * Swipe gesture move logic.
   */
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  /**
   * Swipe gesture end logic, determining slide direction.
   */
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) nextSlide();
    if (distance < -50) prevSlide();
  };

  /**
   * Advances the carousel to the next slide.
   */
  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === displayEvents.length - 1 ? 0 : prev + 1));
  };

  /**
   * Reverses the carousel to the previous slide.
   */
  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? displayEvents.length - 1 : prev - 1));
  };

  /**
   * Auto-scroll timer.
   */
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [displayEvents]);

  // Image preloading is now handled in fetchEvents

  const ready = !isLoading && displayEvents.length > 0;

  return (
    <section id="special-events" className={SECTION_WRAPPER_STYLES}>
      <div className={CONTENT_WRAPPER_STYLES} >

        {/* --- Header --- */}
        {/* <div className={HEADER_CONTAINER_STYLES}> */}
        {/* <p className={HEADER_SUBTITLE_STYLES}>
            LIVE THIS WEEK
          </p> */}
        {/* <h2 className={HEADER_TITLE_STYLES}>
            Current Divine Powertimes & <em className="text-amber-600 dark:text-amber-400 italic font-bold">Special Events.</em>
          </h2>
          <p className={HEADER_DESC_STYLES} style={{ maxWidth: '100%' }}>
            Explore current AstroVed programs timed to sacred dates, deity blessings, temple traditions, and remedy windows.
          </p>
        </div> */}

        {/* --- Carousel Container --- */}
        <div
          className={CAROUSEL_WRAPPER_STYLES}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className={CAROUSEL_BOX_STYLES}>
            {!ready ? (
              /* Loading Indicator */
              <div className={LOADING_CONTAINER_STYLES}>
                <div className={LOADING_CONTENT_STYLES}>
                  <svg className="animate-spin h-8 w-8 text-amber-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className={LOADING_TEXT_STYLES}>Loading Events...</span>
                </div>
              </div>
            ) : (
              <>

                {/* Animated Carousel Slides */}
                <AnimatePresence initial={false} custom={direction}>
                  {displayEvents.length > 0 && (
                    <motion.div
                      key={currentIndex}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                      className="w-full h-full cursor-pointer flex flex-col items-center justify-center col-start-1 row-start-1"
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
                        <div className={MULTI_BANNER_WRAPPER_STYLES}>
                          {displayEvents[currentIndex].banners.map((banner, bannerIndex) => (
                            <a
                              key={bannerIndex}
                              href={banner.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={getMultiBannerVisibilityStyles(bannerIndex)}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <img
                                src={banner.image}
                                alt={banner.title}
                                className={MULTI_BANNER_IMG_STYLES}
                              />
                            </a>
                          ))}
                        </div>
                      ) : (
                        <div className={SINGLE_BANNER_WRAPPER_STYLES}>
                          <picture>
                            {displayEvents[currentIndex].banners[0].sources.map((src, srcIndex) => (
                              <source key={srcIndex} media={src.media} srcSet={src.srcSet} />
                            ))}
                            <img
                              src={displayEvents[currentIndex].banners[0].image}
                              alt={displayEvents[currentIndex].banners[0].title}
                              className={SINGLE_BANNER_IMG_STYLES}
                            />
                          </picture>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}
          </div>

          {/* Navigation Controls */}
          <button
            onClick={prevSlide}
            className={NAV_BTN_PREV_STYLES}
          >
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
          </button>
          <button
            onClick={nextSlide}
            className={NAV_BTN_NEXT_STYLES}
          >
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
          </button>

          {/* Pagination Indicators */}
          <div className={PAGINATION_CONTAINER_STYLES}>
            {displayEvents.map((_, itemIndex) => (
              <button
                key={itemIndex}
                onClick={() => setCurrentIndex(itemIndex)}
                className={getPaginationDotStyles(currentIndex === itemIndex)}
              />
            ))}
          </div>
        </div>


        {/* --- Premium Static Theme CTA Bar --- */}
        <div className={CTA_BAR_CONTAINER_STYLES}>

          {/* Talk to Astrologer Button */}
          <button className={ASTRO_BTN_STYLES}>
            <div className={ASTRO_ICON_WRAPPER_STYLES}>
              <PhoneCall className="w-8 h-8 lg:w-9 lg:h-9 text-purple-300 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)] fill-purple-300/20" strokeWidth={1.5} />
            </div>
            <div className={CTA_TEXT_WRAPPER_STYLES}>
              <span className={CTA_TITLE_STYLES}>
                Talk to Astrologer
              </span>
            </div>
            <div className={CTA_ARROW_WRAPPER_STYLES}>
              <ChevronRight className={CTA_ARROW_ICON_ASTRO_STYLES} />
            </div>
          </button>

          {/* Homa & Remedies Button */}
          <button className={HOMA_BTN_STYLES}>
            <div className={HOMA_ICON_WRAPPER_STYLES}>
              <Flame className="w-8 h-8 lg:w-9 lg:h-9 text-orange-200 drop-shadow-[0_0_8px_rgba(245,158,11,0.8)] fill-orange-500/30" strokeWidth={1.5} />
            </div>
            <div className={CTA_TEXT_WRAPPER_STYLES}>
              <span className={CTA_TITLE_STYLES}>
                Homa & Remedies
              </span>
            </div>
            <div className={CTA_ARROW_WRAPPER_STYLES}>
              <ChevronRight className={CTA_ARROW_ICON_HOMA_STYLES} />
            </div>
          </button>
        </div>
      </div>

      {/* --- Infinite Scrolling Banner --- */}
      <div className="w-full bg-[#0b1120] border-t border-b border-white/10 overflow-hidden py-2.5 relative z-20 marquee-container mt-4 md:mt-8">
        <div className="animate-marquee">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-12 px-6 items-center text-gray-300 text-xs sm:text-sm font-medium whitespace-nowrap">
              <span>✦ Since 2000— 25 years of Vedic tradition</span>
              <span>✦ 3 Lakh+ rituals performed in devotees' names</span>
              <span>✦ 200+ Vedic scholars & priests on our team</span>
              <span>✦ 4.8★ from devotees in 50+ countries</span>
              <span>✦ 100% private— your birth details are never shared</span>
              <span>✦ Watch your ritual— video of every ceremony</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
