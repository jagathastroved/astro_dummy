import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus } from 'lucide-react';

const FAQ_DATA = [
  {
    id: 1,
    q: "How accurate are the new AI Kundali and Numerology reports?",
    a: "Our advanced AI engines are trained on centuries of authentic Vedic astrological data and numerology principles, ensuring highly accurate, personalized, and insightful readings tailored specifically to your birth details."
  },
  {
    id: 2,
    q: "Can I participate in temple rituals if I live outside of India?",
    a: "Absolutely. We specialize in performing remote rituals on your behalf. Our certified priests conduct the ceremonies physically in sacred temples, and we share the spiritual benefits, photos, and blessed prasad with you directly."
  },
  {
    id: 3,
    q: "What is included in the Premium Alliance membership?",
    a: "The Premium Alliance gives you maximum spiritual support, including custom AI chart readings, 1 monthly temple ritual performed on your behalf, priority event seating, and the ability to talk to an expert priest anytime."
  },
  {
    id: 4,
    q: "Why is Vedic astrology considered more precise than Western astrology?",
    a: "Vedic astrology relies on the sidereal zodiac, which tracks the actual, current positions of the constellations in the sky. This accounts for the Earth's tilt (Ayanamsa), offering a much more precise and karma-focused reading."
  },
  {
    id: 5,
    q: "How do I know which astrological remedy or product is right for me?",
    a: "You can start by generating a free AI Kundali report, or consult with our expert astrologers. We provide personalized recommendations for energized products and specific rituals based on your unique planetary doshas (afflictions)."
  },
  {
    id: 6,
    q: "Is my personal birth data kept private?",
    a: "Yes, your privacy is our top priority. We use strict encryption protocols to secure your exact birth time, date, and location. Your data is only used to generate your personalized astrological charts and is never shared."
  }
];

/**
 * Resolves the dynamic Tailwind CSS classes for the main FAQ card container.
 * 
 * @param isOpen - Whether the FAQ item is currently expanded
 */
const getFaqCardStyles = (isOpen: boolean): string => {
  const baseClasses = "rounded-2xl border transition-colors duration-300 overflow-hidden transform-gpu translate-z-0";
  const activeClasses = "border-amber-500/30 bg-white dark:bg-[#1a1f3c] shadow-lg shadow-amber-500/5";
  const inactiveClasses = "border-black/5 dark:border-amber-500/40 dark:shadow-[0_0_15px_rgba(245,158,11,0.2)] bg-white dark:bg-[#110c1c] hover:border-amber-500/20 hover:bg-gray-50 dark:hover:bg-[#1a1f3c]";
  return `${baseClasses} ${isOpen ? activeClasses : inactiveClasses}`;
};

/**
 * Resolves the dynamic Tailwind CSS classes for the FAQ question text.
 * 
 * @param isOpen - Whether the FAQ item is currently expanded
 */
const getFaqQuestionStyles = (isOpen: boolean): string => {
  const baseClasses = "font-sans text-sm sm:text-base tracking-wide font-medium transition-colors";
  const activeClasses = "text-amber-700 dark:text-amber-400";
  const inactiveClasses = "text-midnight dark:text-cream";
  return `${baseClasses} ${isOpen ? activeClasses : inactiveClasses}`;
};

/**
 * Resolves the dynamic Tailwind CSS classes for the Plus/Minus toggle icon.
 * 
 * @param isOpen - Whether the FAQ item is currently expanded
 */
const getFaqIconStyles = (isOpen: boolean): string => {
  const baseClasses = "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-transform transition-colors duration-300 transform-gpu";
  const activeClasses = "bg-amber-500/10 text-amber-600 dark:text-amber-400 rotate-45";
  const inactiveClasses = "bg-black/5 dark:bg-white/5 text-gray-400 group-hover:bg-amber-500/10 group-hover:text-amber-500";
  return `${baseClasses} ${isOpen ? activeClasses : inactiveClasses}`;
};

interface FAQItemData {
  id: number;
  q: string;
  a: string;
}

/**
 * Pure function to render a single FAQ accordion card.
 * This abstracts the heavy HTML markup away from the main component layout.
 * 
 * @param faqItem - The data object containing the question and answer
 * @param isOpen - Whether this specific card is currently expanded
 * @param onToggle - Callback to toggle the expansion state
 */
const renderFaqItem = (
  faqItem: FAQItemData,
  isOpen: boolean,
  onToggle: (id: number) => void
) => (
  <div key={faqItem.id} className={getFaqCardStyles(isOpen)}>
    <button
      onClick={() => onToggle(faqItem.id)}
      className="w-full px-6 py-6 text-left flex items-center justify-between gap-6 group"
    >
      <span className={getFaqQuestionStyles(isOpen)}>
        {faqItem.q}
      </span>
      <span className={getFaqIconStyles(isOpen)}>
        <Plus className="w-4 h-4" />
      </span>
    </button>

    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="overflow-hidden transform-gpu will-change-[height,opacity]"
        >
          <div className="px-6 pb-6 pt-2 border-t border-black/5 dark:border-amber-500/40 dark:shadow-[0_0_15px_rgba(245,158,11,0.2)]">
            <p className="font-body text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed font-light">
              {faqItem.a}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export function FAQ() {
  const [openFaqId, setOpenFaqId] = useState<number | null>(null);

  return (
    <section className="py-4 md:py-6 px-6 max-w-7xl mx-auto z-10 relative" id="faq-section">

      {/* --- Background Ambient Glow Section --- */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[300px] bg-purple-500/5 dark:bg-purple-500/10 blur-[100px] rounded-full pointer-events-none transform-gpu translate-z-0" />

      {/* --- Header Section --- */}
      <div className="text-center max-w-3xl mx-auto mb-8 relative z-10">
        <h2 className="font-sans text-4xl sm:text-5xl text-midnight dark:text-cream leading-tight">
          Frequently Asked <em className="text-amber-600 dark:text-amber-400 italic">Questions.</em>
        </h2>
      </div>

      {/* --- FAQ List Section --- */}
      <div className="max-w-3xl mx-auto space-y-4 relative z-10">
        {FAQ_DATA.map((faqItem) =>
          renderFaqItem(faqItem, openFaqId === faqItem.id, (id) => setOpenFaqId(openFaqId === id ? null : id))
        )}
      </div>

    </section>
  );
}
