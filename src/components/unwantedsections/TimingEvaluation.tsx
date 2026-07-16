import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, ArrowRight, Calendar, User, Clock, MapPin, Sparkles, Send, X, Target, Activity } from 'lucide-react';
import { SpotlightCard } from '../ui/SpotlightCard';
import { scrollToSection } from '../../utils/scroll';
import { ZODIAC_SIGNS } from '../../utils/data';
import { CosmicReading } from '../../types';

const LOADING_STEPS = [
  "Establishing high-contrast connection to cosmic transits...",
  "Retrieving planetary positions from Vedic Ephemeris...",
  "Analyzing solar, lunar, and ascendant sectors...",
  "Querying Gemini 3.5 AI Core for customized Jyotish guidance...",
  "Formulating actionable guidelines and auspicious timings..."
];

export function TimingEvaluation() {
  const [nameInput, setNameInput] = useState('');
  const [dobInput, setDobInput] = useState('');
  const [tobInput, setTobInput] = useState('');
  const [pobInput, setPobInput] = useState('');
  const [queryInput, setQueryInput] = useState('');
  const [zodiacFormSelect, setZodiacFormSelect] = useState('Aries');

  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [generatedReading, setGeneratedReading] = useState<CosmicReading | null>(null);
  const [apiSource, setApiSource] = useState('');
  const [isReadingModalOpen, setIsReadingModalOpen] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev < LOADING_STEPS.length - 1 ? prev + 1 : prev));
      }, 1500);
    } else {
      setLoadingStep(0);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleGenerateReading = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim()) return;

    setIsLoading(true);
    setGeneratedReading(null);

    try {
      // Provide mock data since backend/engine is removed
      const data = {
        reading: {
          phase: 'Building',
          phaseTitle: 'Jupiter Transit Expansion & Solar Vitality',
          phaseVibe: 'A radiant wind is behind you. Propel forward with integrity and steady action.',
          vibeScore: 88,
          alignment: {
            sun: { house: '10th', sign: zodiacFormSelect || 'Aries', status: 'Exalted' },
            moon: { house: '4th', sign: 'Leo', status: 'Nurturing' },
            ascendant: `${zodiacFormSelect || 'Aries'} Rising`
          },
          favorableHours: ['08:15 AM - 10:30 AM', '05:00 PM - 06:45 PM'],
          detailedReport: `Dear ${nameInput || 'Seeker'}, your current stars indicate a highly constructive cycle of active creation. This is a crucial time to launch initiatives, initiate difficult conversations, and build foundations.\n\nAs you push forward with your request about "${queryInput || 'general cosmic timing'}", avoid forced timelines. Dedicate your morning hours to structured planning and physical execution.\n\nTrust the timing of your life; you are exactly where your soul needs to learn.`,
          actionableSteps: [
            'Initiate the primary project you have been putting off immediately.',
            'Perform a morning solar physical alignment or gentle stretch.',
            'Speak with clarity and make structured commitments.'
          ],
          luckyColor: 'Saffron Gold',
          luckyNumber: 3,
          nakshatra: 'Ashwini'
        },
        source: 'Local Demo'
      };

      setGeneratedReading(data.reading);
      setApiSource(data.source);
      setIsReadingModalOpen(true);
    } catch (error) {
      console.error('Error fetching reading:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className="py-6 md:py-8 md:py-10 px-6 max-w-7xl mx-auto relative z-10" id="timing-check">


        {/* Dynamic Birth Chart Input Form Section */}
        <div id="birth-form" className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 relative">

          {/* Left Side: Related Content */}
          <div className="lg:col-span-2 space-y-8 flex flex-col justify-center">
            <div>
              <span className="font-2xl uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400 font-bold block mb-4 mb-3">Free Evaluation</span>
              <h1 className="font-sans text-4xl text-midnight dark:text-cream tracking-wide leading-tight">
                Get your personalized cosmic reading.
              </h1>
            </div>

            <p className="font-body text-gray-600 dark:text-gray-400 leading-relaxed text-base">
              Find out exactly what planetary energies are influencing you right now.
              Our system uses your exact birth details to provide accurate, actionable guidance for your career, relationships, and major decisions.
            </p>

            <div className="space-y-5 pt-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-sans text-midnight dark:text-white font-medium">Instant Insights</h5>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-body">Immediate actionable guidance</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-sans text-midnight dark:text-white font-medium">100% Private</h5>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-body">Your birth data is encrypted</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Attractive Form */}
          <div className="lg:col-span-3 rounded-[2.5rem] bg-white dark:bg-[#110c1c] backdrop-blur-xl border border-black/5 dark:border-amber-500/40 dark:shadow-[0_0_15px_rgba(245,158,11,0.2)] shadow-2xl p-8 sm:p-12 relative overflow-hidden group">

            {/* Subtle glow effect in the background of the form */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-700" />

            <div className="flex items-center gap-4 mb-10 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-black/5 dark:bg-black/40 border border-black/5 dark:border-amber-500/40 dark:shadow-[0_0_15px_rgba(245,158,11,0.2)] flex items-center justify-center text-amber-600 dark:text-amber-400">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-sans text-xl text-midnight dark:text-cream tracking-wide font-medium">Birth Chart Details</h3>
                <p className="font-body text-xs text-gray-500 dark:text-gray-400 mt-1">Enter your details to generate your reading</p>
              </div>
            </div>

            <form onSubmit={handleGenerateReading} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                <div className="space-y-2">
                  <label className="text-[10px] font-mono uppercase tracking-[0.1em] text-gray-500 dark:text-gray-400 flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-amber-500" />
                    Full Name <span className="text-amber-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="w-full bg-black/5 dark:bg-black/40 border border-black/5 dark:border-amber-500/40 dark:shadow-[0_0_15px_rgba(245,158,11,0.2)] rounded-xl px-4 py-3 text-sm text-midnight dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all"
                  />
                </div>

                <div className="grid grid-cols-5 gap-4">
                  <div className="col-span-2 space-y-2">
                    <label className="text-[10px] font-mono uppercase tracking-[0.1em] text-gray-500 dark:text-gray-400 block">
                      Zodiac Sign
                    </label>
                    <select
                      value={zodiacFormSelect}
                      onChange={(e) => setZodiacFormSelect(e.target.value)}
                      className="w-full bg-black/5 dark:bg-black/40 border border-black/5 dark:border-amber-500/40 dark:shadow-[0_0_15px_rgba(245,158,11,0.2)] rounded-xl px-4 py-3 text-sm text-midnight dark:text-white focus:outline-none focus:border-amber-500/50 transition-all appearance-none cursor-pointer"
                    >
                      {ZODIAC_SIGNS.map((sign) => (
                        <option key={sign.name} value={sign.name}>
                          {sign.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-span-3 space-y-2">
                    <label className="text-[10px] font-mono uppercase tracking-[0.1em] text-gray-500 dark:text-gray-400 block">
                      Birth Date <span className="text-amber-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={dobInput}
                      onChange={(e) => setDobInput(e.target.value)}
                      className="w-full bg-black/5 dark:bg-black/40 border border-black/5 dark:border-amber-500/40 dark:shadow-[0_0_15px_rgba(245,158,11,0.2)] rounded-xl px-4 py-3 text-sm text-midnight dark:text-white focus:outline-none focus:border-amber-500/50 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-mono uppercase tracking-[0.1em] text-gray-500 dark:text-gray-400 flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    Time of Birth (Optional)
                  </label>
                  <input
                    type="time"
                    value={tobInput}
                    onChange={(e) => setTobInput(e.target.value)}
                    className="w-full bg-black/5 dark:bg-black/40 border border-black/5 dark:border-amber-500/40 dark:shadow-[0_0_15px_rgba(245,158,11,0.2)] rounded-xl px-4 py-3 text-sm text-midnight dark:text-white focus:outline-none focus:border-amber-500/50 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-mono uppercase tracking-[0.1em] text-gray-500 dark:text-gray-400 flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-amber-500" />
                    Place of Birth (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="City, Country"
                    value={pobInput}
                    onChange={(e) => setPobInput(e.target.value)}
                    className="w-full bg-black/5 dark:bg-black/40 border border-black/5 dark:border-amber-500/40 dark:shadow-[0_0_15px_rgba(245,158,11,0.2)] rounded-xl px-4 py-3 text-sm text-midnight dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-amber-500/50 transition-all"
                  />
                </div>

              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase tracking-[0.1em] text-gray-500 dark:text-gray-400 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  What is your main question or focus?
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. I am planning a major career switch next month. Is this a good time?"
                  value={queryInput}
                  onChange={(e) => setQueryInput(e.target.value)}
                  className="w-full bg-black/5 dark:bg-black/40 border border-black/5 dark:border-amber-500/40 dark:shadow-[0_0_15px_rgba(245,158,11,0.2)] rounded-xl px-4 py-3 text-sm text-midnight dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all resize-none"
                />
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-midnight dark:bg-white text-white dark:text-midnight hover:bg-amber-600 dark:hover:bg-amber-400 hover:text-white font-sans text-sm tracking-widest uppercase font-bold transition-all shadow-md flex items-center justify-center gap-3 disabled:opacity-75 disabled:pointer-events-none group/submit"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Loading...
                    </>
                  ) : (
                    <>
                      Get Reading
                      <Send className="w-4 h-4 group-hover/submit:translate-x-1 group-hover/submit:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Detailed Loading Overlay with Micro-steps */}
            <AnimatePresence>
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-midnight/90 backdrop-blur-sm z-30 flex flex-col items-center justify-center p-6 text-center"
                >
                  <div className="w-24 h-24 rounded-full border border-gold/20 flex items-center justify-center relative mb-6">
                    <div className="absolute inset-0 rounded-full border-2 border-gold/40 border-t-transparent animate-spin" />
                    <Compass className="w-10 h-10 text-purple dark:text-gold animate-pulse" />
                  </div>

                  <h4 className="font-sans text-xl text-xl md:text-2xl tracking-widest uppercase">Calculating Chart</h4>

                  {/* Dynamic staggered loading messages */}
                  <div className="h-10 mt-2 max-w-md">
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={loadingStep}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="font-mono text-xs text-saffron"
                      >
                        {LOADING_STEPS[loadingStep]}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>
      </section>

      {/* Reading Result Modal Overlay */}
      <AnimatePresence>
        {isReadingModalOpen && generatedReading && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsReadingModalOpen(false)}
              className="absolute inset-0 bg-midnight/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-ivory dark:bg-midnight rounded-4xl border border-gold/20 shadow-2xl overflow-y-auto custom-scrollbar flex flex-col"
            >
              {/* Modal Header */}
              <div className="sticky top-0 z-10 bg-ivory/90 dark:bg-midnight/90 backdrop-blur-xl border-b border-gold/10 px-6 py-4 flex items-center justify-between">
                <div>
                  <h3 className="font-sans text-lg text-midnight dark:text-cream tracking-wider font-semibold">Your Cosmic Assessment</h3>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-gray-500">For {nameInput} • {zodiacFormSelect}</p>
                </div>
                <button
                  onClick={() => setIsReadingModalOpen(false)}
                  className="p-2 rounded-full hover:bg-gold/10 text-midnight dark:text-cream transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 md:p-8 space-y-8">

                {/* Header Banner */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gold/10">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-purple dark:text-gold block">Current Transit Era</span>
                    <h2 className="font-display text-3xl md:text-4xl text-midnight dark:text-cream font-semibold mt-1">
                      {generatedReading.phaseTitle}
                    </h2>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-gray-500">Calculated via: {apiSource}</span>
                    <div className={`px-4 py-1.5 rounded-full font-sans text-xs tracking-wider uppercase font-semibold ${generatedReading.phase === 'Building'
                      ? 'bg-gold/10 border border-gold/30 text-purple dark:text-gold'
                      : 'bg-saffron/10 border border-saffron/30 text-saffron'
                      }`}>
                      {generatedReading.phase} Phase
                    </div>
                  </div>
                </div>

                {/* Main Vibe & Score panel */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-cream/40 dark:bg-midnight/30 p-6 rounded-3xl border border-gold/10">

                  {/* Score circle */}
                  <div className="md:col-span-4 flex flex-col items-center justify-center text-center">
                    <div className="w-28 h-28 rounded-full border-4 border-gold/30 border-t-gold flex items-center justify-center relative shadow-inner">
                      <div className="text-center">
                        <span className="text-3xl font-sans font-bold text-midnight dark:text-cream">{generatedReading.vibeScore}</span>
                        <span className="text-[10px] text-gray-500 block uppercase font-mono tracking-widest leading-none mt-0.5">Vibe Score</span>
                      </div>
                    </div>
                  </div>

                  {/* Vibe headline description */}
                  <div className="md:col-span-8 space-y-2">
                    <h4 className="font-sans text-xl text-midnight dark:text-cream font-medium">
                      {generatedReading.phaseTitle}
                    </h4>
                    <p className="font-body text-xs text-gray-600 dark:text-gray-400 italic">
                      "{generatedReading.phaseVibe}"
                    </p>
                  </div>

                </div>

                {/* Standard Planetary Alignments */}
                <div>
                  <h4 className="font-sans text-xs uppercase tracking-widest text-purple dark:text-gold mb-3">Planetary Positions</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                    <div className="p-4 rounded-2xl bg-cream/20 dark:bg-midnight/20 border border-gold/10 text-center">
                      <span className="text-[10px] font-mono text-gray-500 uppercase block">Sun Coordinates</span>
                      <span className="text-sm font-sans text-midnight dark:text-cream font-bold mt-1 block">
                        {generatedReading.alignment.sun.sign} ({generatedReading.alignment.sun.house} House)
                      </span>
                      <span className="text-[10px] font-mono text-purple dark:text-gold uppercase mt-0.5 block">
                        {generatedReading.alignment.sun.status}
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-cream/20 dark:bg-midnight/20 border border-gold/10 text-center">
                      <span className="text-[10px] font-mono text-gray-500 uppercase block">Moon Coordinates</span>
                      <span className="text-sm font-sans text-midnight dark:text-cream font-bold mt-1 block">
                        {generatedReading.alignment.moon.sign} ({generatedReading.alignment.moon.house} House)
                      </span>
                      <span className="text-[10px] font-mono text-purple dark:text-gold uppercase mt-0.5 block">
                        {generatedReading.alignment.moon.status}
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-cream/20 dark:bg-midnight/20 border border-gold/10 text-center flex flex-col justify-center">
                      <span className="text-[10px] font-mono text-gray-500 uppercase block">Lagna Rising</span>
                      <span className="text-sm font-sans text-midnight dark:text-cream font-bold mt-1 block">
                        {generatedReading.alignment.ascendant}
                      </span>
                    </div>

                  </div>
                </div>

                {/* Favorable Hours Today */}
                <div className="bg-gold/5 p-4 rounded-2xl border border-gold/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-purple dark:text-gold" />
                    <div>
                      <span className="text-[10px] font-mono text-gray-500 uppercase">Your Best Hours Today</span>
                      <span className="text-xs text-midnight dark:text-cream font-bold block mt-0.5">
                        Perform important calls or actions during these customized intervals
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {generatedReading.favorableHours.map((hour, i) => (
                      <span key={i} className="px-3 py-1 bg-gold/10 border border-gold/20 rounded font-mono text-xs text-purple dark:text-saffron font-bold">
                        {hour}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Full Personal Report Text */}
                <div className="space-y-4">
                  <h4 className="font-sans text-xs uppercase tracking-widest text-purple dark:text-gold">Your Daily Analysis</h4>
                  <div className="font-body text-sm text-gray-700 dark:text-gray-300 leading-relaxed space-y-4 font-light whitespace-pre-line">
                    {generatedReading.detailedReport}
                  </div>
                </div>

                {/* Practical Actionable Remedies */}
                <div className="border-t border-gold/15 pt-6 space-y-4">
                  <h4 className="font-sans text-xs uppercase tracking-widest text-purple dark:text-gold">3 Simple Action Steps</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {generatedReading.actionableSteps.map((step, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-cream/35 dark:bg-midnight/25 border border-gold/10 flex gap-2">
                        <span className="font-mono text-xs text-purple dark:text-gold font-bold">{idx + 1}.</span>
                        <p className="font-body text-xs text-gray-600 dark:text-gray-400 font-light leading-relaxed">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Astro Details Summary */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gold/10">
                  <div className="text-center p-3 rounded-xl bg-gold/5 border border-gold/10">
                    <span className="text-[10px] font-mono text-gray-500 uppercase block">Lucky Color</span>
                    <span className="text-xs font-sans font-medium text-midnight dark:text-cream block mt-0.5">{generatedReading.luckyColor}</span>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-gold/5 border border-gold/10">
                    <span className="text-[10px] font-mono text-gray-500 uppercase block">Lucky Number</span>
                    <span className="text-xs font-sans font-medium text-midnight dark:text-cream block mt-0.5">{generatedReading.luckyNumber}</span>
                  </div>
                </div>

                {/* Disclaimer disclaimer */}
                <p className="text-[9px] text-gray-500 text-center pt-4 uppercase tracking-widest">
                  This custom timing evaluation does not replace standard medical, legal, or physical financial consultations.
                </p>

              </div>
            </motion.div>

          </div>
        )}
      </AnimatePresence>
    </>
  );
}
