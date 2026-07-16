import { scrollToSection } from '../../utils/scroll';

/** --- Data Definitions --- */

const QUICK_LINKS = [
  { label: 'Timing Check', targetId: 'timing-check' },
  { label: 'Live Transits', targetId: 'live-moments' },
  { label: 'Our Guidance', targetId: 'guidance-services' },
  { label: 'Daily Horoscope', targetId: 'daily-widget' },
  { label: 'FAQ', targetId: 'faq-section' },
  { label: 'Membership', targetId: 'membership' }
];

const SUPPORT_LINKS = [
  { label: 'support@astroved.com', href: 'mailto:support@astroved.com' },
  { label: 'Offline Payment', href: '#' },
  { label: 'Contact Us', href: '#' },
  { label: 'Feedback', href: '#' },
  { label: 'Site Map', href: '#' }
];

const CONTACT_INFO = [
  { title: 'Customer Care', lines: ['+91 9677391108', '+91 44 43419898'] },
  { title: 'Toll Free', lines: ['1800 102 9098'] },
  { title: 'USA Contact', lines: ['+1 412-927 3625'] },
  { title: 'Whatsapp', lines: ['+91 9677391109'] }
];

/**
 * Returns the base Tailwind CSS classes for the main footer container.
 */
const getFooterBaseStyles = (): string => {
  return "relative z-10 bg-gradient-to-br from-ivory via-cream to-amber-50/30 dark:bg-gradient-to-br dark:from-[#0a0514] dark:via-[#1a0b2e] dark:to-[#0a0e17] backdrop-blur-xl border-t border-purple/10 dark:border-amber-500/40 dark:shadow-[0_0_15px_rgba(245,158,11,0.2)] py-8 md:py-8 px-6 transition-all duration-500 overflow-hidden";
};

/**
 * Returns the shared Tailwind CSS classes for footer section headings.
 */
const getHeadingStyles = (): string => {
  return "font-sans text-[13px] font-bold uppercase tracking-[0.1em] text-midnight dark:text-cream";
};

/**
 * Returns the shared Tailwind CSS classes for standard footer text links.
 */
const getLinkStyles = (): string => {
  return "hover:text-indigo dark:hover:text-gold transition-colors text-left";
};

/**
 * Footer Component
 * 
 * Renders the global footer containing brand information, quick navigation links,
 * support links, contact details, and corporate office address.
 */
export function Footer() {
  return (
    <footer className={getFooterBaseStyles()}>

      {/* --- Ambient Background Glow --- */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-purple/5 dark:bg-gold/5 rounded-[100%] blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-x-4 gap-y-6 md:gap-6 lg:gap-12 mb-6 md:mb-8">

        {/* --- Logo & Brand Column Section --- */}
        <div className="col-span-2 md:col-span-3 lg:col-span-3 space-y-3 md:space-y-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/50 dark:bg-transparent p-2 rounded-xl dark:rounded-none shadow-sm dark:shadow-none border border-purple/5 dark:border-none transition-all">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="cursor-pointer hover:opacity-80 transition-opacity outline-none"
                aria-label="Scroll to top"
              >
                <img
                  src="https://cdn.astroved.com/images/images-av/AstroVed-Logo.svg"
                  alt="AstroVed Logo"
                  className="h-10 w-auto object-contain dark:brightness-110 drop-shadow-sm"
                />
              </button>
            </div>
          </div>
          <p className="font-body text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed">
            Your trusted guide for expert astrological insights, horoscopes, and daily cosmic timings.
          </p>
        </div>

        {/* --- Quick Links Section --- */}
        <div className="col-span-1 lg:col-span-2 space-y-3 md:space-y-4">
          <h4 className={getHeadingStyles()}>Explore</h4>
          <ul className="space-y-2 text-[13px] text-slate-600 dark:text-slate-400 font-medium">
            {QUICK_LINKS.map((linkData, linkIndex) => (
              <li key={linkIndex}>
                <button
                  onClick={() => scrollToSection(linkData.targetId)}
                  className={getLinkStyles()}
                >
                  {linkData.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* --- Support Links Section --- */}
        <div className="col-span-1 lg:col-span-2 space-y-3 md:space-y-4">
          <h4 className={getHeadingStyles()}>Support</h4>
          <ul className="space-y-2 text-[13px] text-slate-600 dark:text-slate-400 font-medium">
            {SUPPORT_LINKS.map((supportItem, supportIndex) => (
              <li key={supportIndex}>
                <a href={supportItem.href} className={getLinkStyles()}>
                  {supportItem.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* --- Contact Details Section --- */}
        <div className="col-span-2 md:col-span-1 lg:col-span-2 space-y-3 md:space-y-4">
          <h4 className={getHeadingStyles()}>Connect</h4>
          <div className="grid grid-cols-2 md:grid-cols-1 gap-4 text-[13px] text-slate-600 dark:text-slate-400 font-medium">
            {CONTACT_INFO.map((contactBlock, blockIndex) => (
              <div key={blockIndex}>
                <p className="text-midnight dark:text-cream font-bold mb-1">
                  {contactBlock.title}
                </p>
                {contactBlock.lines.map((textLine, lineIndex) => (
                  <p key={lineIndex}>{textLine}</p>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* --- Corporate Office Address Section --- */}
        <div className="col-span-2 md:col-span-3 lg:col-span-3 space-y-3 md:space-y-4">
          <h4 className={getHeadingStyles()}>Corporate Office</h4>
          <div className="space-y-1.5 text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            <p className="flex gap-2">
              <span>4th Floor, A-Block, Prince Info Park,<br />Plot No. 81-B, 2nd Main Road,<br />Ambattur Industrial Estate, Chennai 600058.</span>
            </p>
            <p className="flex gap-2">
              <span>Phone: +91-44-43419898</span>
            </p>
            <p className="flex gap-2">
              <span>Hours: Opens daily at 09:30 AM</span>
            </p>
          </div>

          <div className="flex items-center gap-4 pt-4">
            <div className="w-12 h-12 bg-purple-600 rounded-full flex flex-col items-center justify-center text-white p-1">
              <span className="text-[6px] font-bold uppercase text-center leading-tight">25 Years<br />Excellence</span>
            </div>
            <div className="text-xs font-bold text-slate-500">
              ISO 9001:2015<br />CERTIFIED
            </div>
          </div>
        </div>

      </div>

      {/* --- Legal Footer Bar Section --- */}
      <div className="relative max-w-7xl mx-auto pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-slate-500 dark:text-slate-500/80">
          &copy; {new Date().getFullYear()} AstroVed. All traditional rights reserved.
        </span>
        <div className="flex gap-6 text-[10px] font-bold uppercase tracking-[0.2em]">
          <a href="https://www.astroved.com" className="text-slate-400 dark:text-slate-500 hover:text-indigo dark:hover:text-cream transition-colors">Privacy Directives</a>
          <span className="text-purple/20 dark:text-slate-700">&bull;</span>
          <a href="https://www.astroved.com" className="text-slate-400 dark:text-slate-500 hover:text-indigo dark:hover:text-cream transition-colors">Calculations Disclaimer</a>
        </div>
      </div>
    </footer>
  );
}


