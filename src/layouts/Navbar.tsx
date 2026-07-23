import { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, Sparkles, ShoppingBag, Map, Hand, Crown, Clock, Star, Coins, ShieldCheck, Gift, BookOpen, ChevronRight, Zap, Compass, Gem, Leaf, Flame, Eye, Heart, Users, TrendingUp, Calendar, Award, Settings, User, Mail, Phone, Building, FileText, ShoppingCart, Video, ChevronDown, CircleDot, Hexagon, Target, Medal } from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'motion/react';
import { useTheme } from '../context/ThemeProvider';
import { scrollToSection } from '../utils/scroll';

/** --- Custom Hoisted SVG Icon Components to prevent TDZ errors --- */

// MessageCircle component for chat icon
function MessageCircle({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

// GalleryIcon component for gallery items
function GalleryIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  );
}

/** --- Data Definitions --- */

const ASTROLOGY_SERVICES_ITEMS = [
  "Live Astrology Consultation",
  "Instant Insight",
  "Consult & Counsel With Vijayalakshmi",
  "Nadi Astrology",
  "Talk To Astrologer",
  "Chat With Astrologer",
  "Palm Reading",
  "Agastya Live Channel Reading",
  "Goddess Angali Channel Reading",
  "Karuppasamy Channel Reading",
  "Personalized Astrology Reports",
  "Planetary Transit Reports",
  "2026 Prediction Report"
];

const WEALTH_REMEDIES_ITEMS = [
  "Coconut Smashing",
  "Pradosham",
  "Rameshwaram Remedies",
  "Planetary Remedies",
  "Ancestral Remedies",
  "Cow Feeding & Donation",
  "Dosha Remedies",
  "Kerala Remedies",
  "Proxy Mantra Writing"
];

const SUCCESS_HOMAS_ITEMS = [
  "Homas",
  "Grand Homas",
  "AstroVed Temple Services",
  "Instant Pooja And Homa",
  "Special Poojas",
  "Special Abishekams",
  "Online Priest Service"
];

const STORE_ITEMS = [
  "Energized Products",
  "Rudraksha",
  "Yantras",
  "Copper Amulets",
  "Statues",
  "Malas",
  "Bracelets",
  "Pendants",
  "Incense Sticks"
];

const FREE_ASTROLOGY_ITEMS = [
  "Free Horoscope - Daily, Weekly & Monthly",
  "Free Birth Chart Astrology Report",
  "Free Birth Star Astrology Report",
  "Free Moon Sign Report",
  "Free Numerology Report",
  "Free Planetary Influence Report",
  "Free Hora Astrology Report",
  "Check Zodiac Compatibility",
  "Panchang & Nakshatra",
  "More Astrology Services",
  "Full 30 2026"
];

const RESOURCES_ITEMS = [
  "Astropedia",
  "Article",
  "Blog",
  "Free 2026 Calendar",
  "Newsletter",
  "Contact Us",
  "AstroVed Apps",
  "Astrology Podcast",
  "Events Calendar",
  "Gallery",
  "Store Reviews",
  "Testimonials",
  "Live TV"
];

// Icon mapping for dropdown items using strictly safe and guaranteed exports
const ITEM_ICONS: Record<string, any> = {
  "Live Astrology Consultation": Users,
  "Instant Insight": Zap,
  "Consult & Counsel With Vijayalakshmi": User,
  "Nadi Astrology": Compass,
  "Talk To Astrologer": Mail,
  "Chat With Astrologer": MessageCircle,
  "Palm Reading": Hand,
  "Agastya Live Channel Reading": Eye,
  "Goddess Angali Channel Reading": Heart,
  "Karuppasamy Channel Reading": ShieldCheck,
  "Personalized Astrology Reports": TrendingUp,
  "Planetary Transit Reports": Calendar,
  "2026 Prediction Report": Award,
  "Coconut Smashing": Flame,
  "Pradosham": Clock,
  "Rameshwaram Remedies": Map,
  "Planetary Remedies": Star,
  "Ancestral Remedies": Users,
  "Cow Feeding & Donation": Gift,
  "Dosha Remedies": ShieldCheck,
  "Kerala Remedies": Compass,
  "Proxy Mantra Writing": BookOpen,
  "Homas": Flame,
  "Grand Homas": Crown,
  "AstroVed Temple Services": Building,
  "Instant Pooja And Homa": Sparkles,
  "Special Poojas": Star,
  "Special Abishekams": DropletIcon,
  "Online Priest Service": Users,
  "Energized Products": Zap,
  "Rudraksha": Compass,
  "Yantras": Hexagon,
  "Copper Amulets": ShieldCheck,
  "Statues": Crown,
  "Malas": Gem,
  "Bracelets": Target,
  "Pendants": Medal,
  "Incense Sticks": Flame,
  "Free Horoscope - Daily, Weekly & Monthly": Calendar,
  "Free Birth Chart Astrology Report": Map,
  "Free Birth Star Astrology Report": Star,
  "Free Moon Sign Report": Moon,
  "Free Numerology Report": TrendingUp,
  "Free Planetary Influence Report": ShieldCheck,
  "Free Hora Astrology Report": Clock,
  "Check Zodiac Compatibility": Users,
  "Panchang & Nakshatra": Compass,
  "More Astrology Services": Sparkles,
  "Full 30 2026": Calendar,
  "Astropedia": BookOpen,
  "Article": FileText,
  "Blog": BookOpen,
  "Free 2026 Calendar": Calendar,
  "Newsletter": Mail,
  "Contact Us": Mail,
  "AstroVed Apps": ShoppingBag,
  "Astrology Podcast": Users,
  "Events Calendar": Calendar,
  "Gallery": GalleryIcon,
  "Store Reviews": Star,
  "Testimonials": Users,
  "Live TV": Eye
};

// Droplet icon fallback SVG
function DropletIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22a7 7 0 0 0 7-7c0-4.3-7-11-7-11S5 10.7 5 15a7 7 0 0 0 7 7z" />
    </svg>
  );
}

const NAV_LINKS = [
  { label: 'Special Events', id: 'special-events', icon: Sparkles, color: 'text-amber-500 dark:text-amber-400', borderColor: 'border-amber-400/40', bgIcon: 'bg-amber-400/5', isWide: false },
  { label: 'Services', id: 'astrology-services', icon: Star, color: 'text-purple-600 dark:text-purple-400', borderColor: 'border-purple-400/40', bgIcon: 'bg-purple-400/5', items: ASTROLOGY_SERVICES_ITEMS, isWide: true },
  { label: 'Remedies', id: 'wealth-remedies', icon: Coins, color: 'text-purple-600 dark:text-purple-400', borderColor: 'border-purple-400/40', bgIcon: 'bg-purple-400/5', items: WEALTH_REMEDIES_ITEMS, isWide: true },
  { label: 'Homas', id: 'success-homas', icon: ShieldCheck, color: 'text-purple-600 dark:text-purple-400', borderColor: 'border-purple-400/40', bgIcon: 'bg-purple-400/5', items: SUCCESS_HOMAS_ITEMS, isWide: true },
  { label: 'Store', id: 'store', icon: ShoppingBag, color: 'text-purple-600 dark:text-purple-400', borderColor: 'border-purple-400/40', bgIcon: 'bg-purple-400/5', items: STORE_ITEMS, isWide: true },
  { label: 'Free Astrology', id: 'free-astrology', icon: Gift, color: 'text-purple-600 dark:text-purple-400', borderColor: 'border-purple-400/40', bgIcon: 'bg-purple-400/5', items: FREE_ASTROLOGY_ITEMS, isWide: true },
  { label: 'Resources', id: 'resources', icon: BookOpen, color: 'text-purple-600 dark:text-purple-400', borderColor: 'border-purple-400/40', bgIcon: 'bg-purple-400/5', items: RESOURCES_ITEMS, isWide: true },
];

/** --- Shared Tailwind CSS Classes --- */

const HEADER_STYLES = "sticky top-0 z-50 bg-gradient-to-r from-purple-100/95 via-fuchsia-100/95 to-pink-100/95 dark:bg-gradient-to-r dark:from-indigo-950/95 dark:via-purple-950/95 dark:to-[#0a0e17]/95 backdrop-blur-md transition-colors duration-500 shadow-sm";
const MOBILE_TOGGLE_STYLES = "max-[1070px]:flex min-[1071px]:hidden p-2 -ml-2 rounded-full border border-amber-400/25 text-purple-700 dark:text-amber-400 hover:bg-amber-400/10 transition-colors";

const DESKTOP_NAV_LINK_STYLES = "relative flex items-center gap-0.5 px-0.5 lg:px-0.5 xl:px-0.5 2xl:px-2 py-1.5 text-midnight/80 dark:text-cream/90 hover:text-amber-600 dark:hover:text-amber-400 transition-all duration-300 ease-out font-sans tracking-normal 2xl:tracking-[0.05em] text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[22px] font-normal group whitespace-nowrap";
const THEME_TOGGLE_STYLES = "hidden relative p-1.5 lg:p-1.5 xl:p-2.5 rounded-full border border-amber-400/25 text-purple-700 dark:text-amber-400 hover:bg-amber-400/10 transition-all duration-300 shadow-sm";
const MOBILE_DRAWER_STYLES = "max-[1070px]:flex min-[1071px]:hidden fixed top-0 left-0 z-40 w-[85%] sm:w-80 h-[100dvh] overflow-hidden bg-white/90 dark:bg-[#0a0514]/90 backdrop-blur-2xl border-r border-white/20 dark:border-white/5 shadow-2xl flex-col";
const MOBILE_NAV_LINK_WRAPPER_STYLES = "group flex items-center w-full p-3 rounded-xl hover:bg-midnight/5 dark:hover:bg-white/5 transition-all duration-300 relative z-10";

/* Buttons */
const DESKTOP_KUNDALI_BTN = "hidden min-[1071px]:block px-3 lg:px-2.5 xl:px-4 2xl:px-6 py-1.5 lg:py-1.5 xl:py-2.5 2xl:py-3 rounded-full bg-gradient-to-r from-purple-600 to-orange-500 text-white text-[14px] lg:text-[16px] xl:text-[17px] 2xl:text-[20px] font-sans tracking-wide 2xl:tracking-widest font-normal hover:shadow-lg hover:shadow-orange-500/30 hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap text-center border border-orange-400/30";
const DESKTOP_SIGNIN_BTN = "hidden min-[1071px]:block px-3 lg:px-2.5 xl:px-4 2xl:px-6 py-1.5 lg:py-1.5 xl:py-2.5 2xl:py-3 rounded-full backdrop-blur-sm bg-white/40 dark:bg-black/20 border border-midnight/20 dark:border-cream/20 text-midnight/90 dark:text-cream text-[14px] lg:text-[16px] xl:text-[17px] 2xl:text-[20px] font-sans tracking-wide 2xl:tracking-widest font-normal hover:bg-white/80 dark:hover:bg-white/10 hover:border-purple-500/50 hover:text-purple-700 transition-all duration-300 whitespace-nowrap text-center";
const MOBILE_KUNDALI_BTN = "relative w-full py-3.5 rounded-xl overflow-hidden group shadow-lg shadow-amber-500/25 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-orange-500 transition-colors inline-block text-center";
const MOBILE_SIGNIN_BTN = "relative w-full py-3.5 rounded-xl overflow-hidden group border-2 border-midnight/60 dark:border-cream/60 hover:bg-midnight/5 dark:hover:bg-cream/10 transition-colors";

/** Stagger Animation Variants for Menu Items */
const dropdownVariants: Variants = {
  hidden: { opacity: 0, y: 10, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    y: 8,
    scale: 0.98,
    transition: { duration: 0.12, ease: 'easeInOut' }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 5 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 350, damping: 25 }
  }
};

/**
 * Navbar Component
 * Top-level global navigation component for the application.
 */
export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [activeMobileSubMenu, setActiveMobileSubMenu] = useState<string | null>(null);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (targetId: string) => {
    setIsMobileMenuOpen(false);
    setTimeout(() => scrollToSection(targetId), 300);
  };

  const handleMobileLinkClick = (navItem: typeof NAV_LINKS[0]) => {
    if (navItem.items) {
      // Toggle accordion submenu in mobile drawer
      setActiveMobileSubMenu(activeMobileSubMenu === navItem.label ? null : navItem.label);
    } else {
      handleNavClick(navItem.id);
    }
  };

  return (
    <header className={HEADER_STYLES}>
      <div className="w-full max-w-[1600px] mx-auto flex items-center justify-between px-4 lg:px-6 py-3">

        {/* --- Logo & Mobile Toggle --- */}
        <div className="flex items-center gap-1.5 lg:gap-3 shrink-0">
          <button className={MOBILE_TOGGLE_STYLES} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="cursor-pointer hover:opacity-80 transition-opacity">
            <img src="https://cdn.astroved.com/images/images-av/AstroVed-Logo.svg" alt="AstroVed Logo" className="h-6 lg:h-8 xl:h-10 w-[90px] lg:w-[110px] xl:w-[150px] object-contain brightness-100 dark:brightness-110" />
          </button>
        </div>

        {/* --- Desktop Navigation --- */}
        <nav className="hidden min-[1071px]:flex flex-1 justify-end items-center gap-3 pr-2 lg:pr-3 xl:pr-4 font-medium">
          {NAV_LINKS.map((navItem) => (
            <div
              key={navItem.label}
              className="relative py-2"
              onMouseEnter={() => navItem.items && setHoveredLink(navItem.label)}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <button onClick={() => handleNavClick(navItem.id)} className={DESKTOP_NAV_LINK_STYLES}>
                {navItem.label}
                {navItem.items && <ChevronDown className="w-2.5 h-2.5 xl:w-3 xl:h-3 opacity-50 group-hover:opacity-100 transition-opacity" />}
                <span className="absolute -bottom-1 left-0 w-full h-[2.5px] bg-gradient-to-r from-purple-600 to-orange-500 rounded-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out shadow-[0_0_8px_rgba(249,115,22,0.4)]" />
              </button>

              {/* Professional Divided List Dropdown with Mapped Symbols */}
              <AnimatePresence>
                {navItem.items && hoveredLink === navItem.label && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 backdrop-blur-2xl rounded-2xl p-2 z-50 border
                      bg-white/95 border-purple-200/50 shadow-[0_15px_45px_rgba(93,95,239,0.08)]
                      dark:bg-[#080512]/98 dark:border-purple-900/30 dark:shadow-[0_20px_50px_rgba(0,0,0,0.75)]
                      w-max min-w-[280px] flex flex-col gap-0 max-h-[calc(100vh-100px)] overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-purple-200/50 dark:[&::-webkit-scrollbar-thumb]:bg-purple-900/50 [&::-webkit-scrollbar-thumb]:rounded-full"
                  >
                    {/* Glowing Top Slim Divider */}
                    <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-purple-500 dark:via-amber-400 to-transparent pointer-events-none" />

                    {navItem.items.map((item, idx) => {
                      const Icon = ITEM_ICONS[item] || Sparkles;
                      return (
                        <div key={idx} className="flex flex-col">
                          {idx > 0 && (
                            <div className="h-[1px] bg-purple-200/10 dark:bg-purple-900/15 w-[90%] mx-auto" />
                          )}
                          <motion.a
                            href="#"
                            variants={itemVariants}
                            className="group relative flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-150 cursor-pointer min-w-0
                              hover:bg-purple-500/5 dark:hover:bg-amber-400/5"
                          >
                            {/* Celestial Mapped Symbol Icon */}
                            <Icon className="w-4 h-4 lg:w-4 lg:h-4 2xl:w-5 2xl:h-5 text-purple-600/70 dark:text-amber-400/80 group-hover:scale-110 transition-transform duration-200 flex-shrink-0" />

                            <span className="font-sans text-[15px] lg:text-[16px] 2xl:text-[18px] font-normal text-slate-700 dark:text-cream/90 group-hover:text-purple-700 dark:group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all duration-200 text-left whitespace-nowrap flex-1 pr-4">
                              {item}
                            </span>

                            <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-60 transition-opacity duration-200 text-purple-600 dark:text-amber-400 flex-shrink-0" />
                          </motion.a>
                        </div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* --- Desktop Actions & Theme Toggle --- */}
        <div className="flex items-center justify-end gap-1.5 lg:gap-1.5 xl:gap-2 shrink-0">
          <a href="https://kundali-report.vercel.app/" target="_blank" rel="noopener noreferrer" className={DESKTOP_KUNDALI_BTN}>Free Kundali</a>
          <button className={DESKTOP_SIGNIN_BTN}>Sign In</button>
          <button onClick={toggleTheme} className={THEME_TOGGLE_STYLES} aria-label="Toggle Theme">
            <AnimatePresence mode="wait">
              {theme === 'light' ? (
                <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.35 }}>
                  <Sun className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.div>
              ) : (
                <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.35 }}>
                  <Moon className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* --- Mobile Drawer --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} onClick={() => setIsMobileMenuOpen(false)} className="max-[1070px]:block min-[1071px]:hidden fixed inset-0 z-30 bg-black/40 backdrop-blur-sm" />
            <motion.div initial={{ x: '-100%', borderTopRightRadius: '2rem', borderBottomRightRadius: '2rem' }} animate={{ x: 0, borderTopRightRadius: '0rem', borderBottomRightRadius: '0rem' }} exit={{ x: '-100%', borderTopRightRadius: '2rem', borderBottomRightRadius: '2rem' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className={MOBILE_DRAWER_STYLES}>

              <div className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none">
                <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-fuchsia-400/20 dark:from-fuchsia-600/20 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-amber-400/20 dark:from-amber-600/20 via-transparent to-transparent" />
              </div>

              <div className="flex-1 px-6 pt-20 pb-12 flex flex-col relative z-10 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-purple-200/50 dark:[&::-webkit-scrollbar-thumb]:bg-purple-900/50 [&::-webkit-scrollbar-thumb]:rounded-full">
                <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-6 right-6 p-2 rounded-full bg-midnight/5 dark:bg-white/10 text-midnight dark:text-cream hover:bg-midnight/10 dark:hover:bg-white/20 transition-colors">
                  <X className="w-5 h-5" />
                </button>

                <nav className="flex flex-col gap-1.5 mt-4 relative">
                  {NAV_LINKS.map((navItem, itemIndex) => {
                    const isSubMenuOpen = activeMobileSubMenu === navItem.label;
                    return (
                      <div key={navItem.id} className="flex flex-col">
                        <motion.button
                          onClick={() => handleMobileLinkClick(navItem)}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: itemIndex * 0.05 + 0.1, duration: 0.4, type: 'spring' }}
                          className={`group flex items-center justify-between w-full p-3.5 sm:p-4 rounded-2xl hover:bg-white/60 dark:hover:bg-white/5 transition-all duration-300 relative z-10 ${isSubMenuOpen ? 'bg-white/80 dark:bg-white/10 shadow-sm border border-purple-100/30 dark:border-purple-800/30' : 'border border-transparent'}`}
                        >
                          <div className="flex items-center gap-4 sm:gap-5">
                            <div className={`flex items-center justify-center w-9 h-9 shrink-0 transition-transform duration-300 group-hover:scale-110 ${navItem.color} ${isSubMenuOpen ? 'text-purple-600 dark:text-purple-400 scale-110' : ''}`}>
                              <navItem.icon className="w-[22px] h-[22px] drop-shadow-sm" />
                            </div>
                            <span className={`font-sans text-[17px] sm:text-[18px] font-normal tracking-wide transition-colors text-left whitespace-nowrap ${isSubMenuOpen ? 'text-purple-700 dark:text-purple-300' : 'text-slate-800 dark:text-cream/90 group-hover:text-purple-600 dark:group-hover:text-purple-400'}`}>
                              {navItem.label}
                            </span>
                          </div>

                          {/* Arrow indicators matching astroved.com */}
                          {navItem.items ? (
                            <ChevronDown className={`w-5 h-5 text-midnight/40 dark:text-cream/40 transition-transform duration-300 ${isSubMenuOpen ? 'rotate-180 text-amber-500' : ''}`} />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-midnight/40 dark:text-cream/40" />
                          )}
                        </motion.button>

                        {/* Collapsible Mobile/Tablet Submenu Accordion */}
                        <AnimatePresence initial={false}>
                          {navItem.items && isSubMenuOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: 'easeInOut' }}
                              className="overflow-x-auto no-scrollbar bg-purple-50/40 dark:bg-[#0d091e]/50 rounded-2xl ml-2 sm:ml-10 mt-1 mb-2 border border-purple-100/40 dark:border-purple-900/10 flex flex-col gap-0"
                            >
                              {navItem.items.map((subItem, subIdx) => {
                                const SubIcon = ITEM_ICONS[subItem] || Sparkles;
                                return (
                                  <div key={subIdx} className="flex flex-col">
                                    {subIdx > 0 && <div className="h-[1px] bg-purple-200/10 dark:bg-purple-900/10 w-[90%] mx-auto" />}
                                    <a
                                      href="#"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        setIsMobileMenuOpen(false);
                                      }}
                                      className="flex items-center gap-3.5 px-4 py-3 text-left hover:bg-purple-500/5 dark:hover:bg-amber-400/5 transition-colors duration-150"
                                    >
                                      <SubIcon className="w-5 h-5 text-purple-600/70 dark:text-amber-400/80 flex-shrink-0" />
                                      <span className="font-sans text-[16px] sm:text-[17px] font-normal text-slate-700 dark:text-cream/80 whitespace-normal leading-snug">
                                        {subItem}
                                      </span>
                                    </a>
                                  </div>
                                );
                              })}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </nav>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: NAV_LINKS.length * 0.05 + 0.2, duration: 0.4 }} className="mt-auto pt-8 flex flex-col gap-3">
                  <a href="https://kundali-report.vercel.app/" target="_blank" rel="noopener noreferrer" className={MOBILE_KUNDALI_BTN}>
                    <span className="relative z-10 text-[11px] sm:text-xs tracking-[0.2em] font-sans uppercase font-normal text-midnight">Free Kundali</span>
                  </a>
                  <button className={MOBILE_SIGNIN_BTN}>
                    <span className="relative z-10 text-[11px] sm:text-xs tracking-[0.2em] font-sans uppercase font-normal text-midnight dark:text-cream">Sign In</span>
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}