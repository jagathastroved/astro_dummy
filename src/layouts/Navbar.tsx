import { useState } from 'react';
import { Sun, Moon, Menu, X, Sparkles, ShoppingBag, Map, Hand, Crown, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../context/ThemeProvider';
import { scrollToSection } from '../utils/scroll';

/** --- Data Definitions --- */

const NAV_LINKS = [
  { label: 'Special Events', id: 'special-events', icon: Sparkles, color: 'text-amber-400', borderColor: 'border-amber-400/40', bgIcon: 'bg-amber-400/5' },
  { label: 'Products', id: 'products', icon: ShoppingBag, color: 'text-purple-400', borderColor: 'border-purple-400/40', bgIcon: 'bg-purple-400/5' },
  { label: 'Pilgrimages', id: 'pilgrimages', icon: Map, color: 'text-purple-400', borderColor: 'border-purple-400/40', bgIcon: 'bg-purple-400/5' },
  { label: 'Services', id: 'auspicious-actions', icon: Hand, color: 'text-purple-400', borderColor: 'border-purple-400/40', bgIcon: 'bg-purple-400/5' },
  { label: 'Membership', id: 'personalized-support', icon: Crown, color: 'text-purple-400', borderColor: 'border-purple-400/40', bgIcon: 'bg-purple-400/5' },
  { label: 'Right Time', id: 'daily-panchang', icon: Clock, color: 'text-amber-400', borderColor: 'border-amber-400/40', bgIcon: 'bg-amber-400/5' },
];

/** --- Shared Tailwind CSS Classes --- */

const HEADER_STYLES = "sticky top-0 z-50 bg-gradient-to-r from-purple-100/95 via-fuchsia-100/95 to-pink-100/95 dark:bg-gradient-to-r dark:from-indigo-950/95 dark:via-purple-950/95 dark:to-[#0a0e17]/95 backdrop-blur-md transition-colors duration-500";
const MOBILE_TOGGLE_STYLES = "lg:hidden p-2 -ml-2 rounded-full border border-gold/25 text-purple dark:text-saffron hover:bg-gold/10 transition-colors";
const DESKTOP_NAV_LINK_STYLES = "relative px-2 py-1.5 text-midnight/80 dark:text-cream/90 hover:text-amber-600 dark:hover:text-amber-400 transition-colors font-sans uppercase tracking-widest text-[9px] lg:text-[10px] font-semibold group whitespace-nowrap";
const THEME_TOGGLE_STYLES = "relative p-2 sm:p-2.5 rounded-full border border-gold/25 text-purple dark:text-saffron hover:bg-gold/10 transition-all duration-300 shadow-sm";
const MOBILE_DRAWER_STYLES = "lg:hidden fixed top-0 right-0 z-40 w-[85%] sm:w-80 h-screen overflow-hidden bg-white/90 dark:bg-[#0a0514]/90 backdrop-blur-2xl border-l border-white/20 dark:border-white/5 shadow-2xl flex flex-col";
const MOBILE_NAV_LINK_WRAPPER_STYLES = "group flex items-center w-full p-3 rounded-xl hover:bg-midnight/5 dark:hover:bg-white/5 transition-all duration-300 relative z-10";

/* Buttons */
const DESKTOP_KUNDALI_BTN = "hidden lg:block px-5 py-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-midnight text-[10px] sm:text-xs font-sans tracking-widest uppercase font-bold hover:from-amber-500 hover:to-orange-500 transition-all shadow-lg shadow-amber-500/25 whitespace-nowrap text-center";
const DESKTOP_SIGNIN_BTN = "hidden lg:block px-5 py-2 rounded-full border border-midnight/60 dark:border-cream/60 text-midnight dark:text-cream text-[10px] sm:text-xs font-sans tracking-widest uppercase font-bold hover:bg-midnight/5 dark:hover:bg-cream/10 transition-all whitespace-nowrap";
const MOBILE_KUNDALI_BTN = "relative w-full py-3.5 rounded-xl overflow-hidden group shadow-lg shadow-amber-500/25 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-orange-500 transition-colors inline-block text-center";
const MOBILE_SIGNIN_BTN = "relative w-full py-3.5 rounded-xl overflow-hidden group border-2 border-midnight/60 dark:border-cream/60 hover:bg-midnight/5 dark:hover:bg-cream/10 transition-colors";

/**
 * Navbar Component
 * Top-level global navigation component for the application.
 */
export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (targetId: string) => {
    setIsMobileMenuOpen(false);
    setTimeout(() => scrollToSection(targetId), 300);
  };

  return (
    <header className={HEADER_STYLES}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">

        {/* --- Logo & Mobile Toggle --- */}
        <div className="flex-1 flex items-center gap-3">
          <button className={MOBILE_TOGGLE_STYLES} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="cursor-pointer hover:opacity-80 transition-opacity">
            <img src="https://cdn.astroved.com/images/images-av/AstroVed-Logo.svg" alt="AstroVed Logo" className="h-8 sm:h-10 w-auto object-contain brightness-100 dark:brightness-110" />
          </button>
        </div>

        {/* --- Desktop Navigation --- */}
        <nav className="hidden lg:flex items-center gap-3 xl:gap-5 text-sm font-medium">
          {NAV_LINKS.map((navItem) => (
            <button key={navItem.id} onClick={() => handleNavClick(navItem.id)} className={DESKTOP_NAV_LINK_STYLES}>
              {navItem.label}
              <span className="absolute top-0 left-0 w-1.5 h-1.5 sm:w-2 sm:h-2 border-t-[2px] border-l-[2px] border-amber-500 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 -translate-y-2 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" />
              <span className="absolute top-0 right-0 w-1.5 h-1.5 sm:w-2 sm:h-2 border-t-[2px] border-r-[2px] border-amber-500 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 -translate-y-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              <span className="absolute bottom-0 left-0 w-1.5 h-1.5 sm:w-2 sm:h-2 border-b-[2px] border-l-[2px] border-amber-500 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 translate-y-2 group-hover:-translate-x-0.5 group-hover:translate-y-0.5" />
              <span className="absolute bottom-0 right-0 w-1.5 h-1.5 sm:w-2 sm:h-2 border-b-[2px] border-r-[2px] border-amber-500 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 translate-y-2 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </button>
          ))}
        </nav>

        {/* --- Desktop Actions & Theme Toggle --- */}
        <div className="flex-1 flex items-center justify-end gap-3 sm:gap-4">
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
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} onClick={() => setIsMobileMenuOpen(false)} className="lg:hidden fixed inset-0 z-30 bg-black/40 backdrop-blur-sm" />
            <motion.div initial={{ x: '100%', borderTopLeftRadius: '2rem', borderBottomLeftRadius: '2rem' }} animate={{ x: 0, borderTopLeftRadius: '0rem', borderBottomLeftRadius: '0rem' }} exit={{ x: '100%', borderTopLeftRadius: '2rem', borderBottomLeftRadius: '2rem' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className={MOBILE_DRAWER_STYLES}>

              <div className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none">
                <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-fuchsia-400/20 dark:from-fuchsia-600/20 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-amber-400/20 dark:from-amber-600/20 via-transparent to-transparent" />
              </div>

              <div className="flex-1 px-6 pt-20 pb-12 flex flex-col relative z-10 overflow-y-auto">
                <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-6 right-6 p-2 rounded-full bg-midnight/5 dark:bg-white/10 text-midnight dark:text-cream hover:bg-midnight/10 dark:hover:bg-white/20 transition-colors">
                  <X className="w-5 h-5" />
                </button>

                <nav className="flex flex-col gap-2 mt-4 relative">
                  <div className="absolute left-[2.45rem] top-8 bottom-8 w-[1px] border-l border-dashed border-gold/40 dark:border-gold/30 pointer-events-none" />
                  {NAV_LINKS.map((navItem, itemIndex) => (
                    <motion.button key={navItem.id} onClick={() => handleNavClick(navItem.id)} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: itemIndex * 0.05 + 0.1, duration: 0.4, type: 'spring' }} className={MOBILE_NAV_LINK_WRAPPER_STYLES}>
                      <div className={`flex items-center justify-center w-12 h-12 rounded-full border shrink-0 bg-white/80 dark:bg-[#0a0514]/80 backdrop-blur-sm shadow-sm ${navItem.borderColor} ${navItem.bgIcon} ${navItem.color}`}>
                        <navItem.icon className="w-5 h-5" />
                      </div>
                      <span className="ml-6 font-serif text-[15px] font-semibold tracking-[0.08em] uppercase text-midnight/90 dark:text-cream group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors text-left flex-1" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                        {navItem.label}
                      </span>
                    </motion.button>
                  ))}
                </nav>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: NAV_LINKS.length * 0.05 + 0.2, duration: 0.4 }} className="mt-auto pt-8 flex flex-col gap-3">
                  <a href="https://kundali-report.vercel.app/" target="_blank" rel="noopener noreferrer" className={MOBILE_KUNDALI_BTN}>
                    <span className="relative z-10 text-[11px] sm:text-xs tracking-[0.2em] font-sans uppercase font-bold text-midnight">Free Kundali</span>
                  </a>
                  <button className={MOBILE_SIGNIN_BTN}>
                    <span className="relative z-10 text-[11px] sm:text-xs tracking-[0.2em] font-sans uppercase font-bold text-midnight dark:text-cream">Sign In</span>
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
