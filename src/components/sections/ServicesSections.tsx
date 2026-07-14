import React from 'react';
import { HoverGlowCard } from '../HoverGlowCard';
import { Star, ScrollText, Sparkles, Zap, Map, Heart, Users } from 'lucide-react';
import shreemBrzeeImg from '../../assets/shreem_brzee_new.png';
import tarpanamImg from '../../assets/tarpanam_new.png';

export function ServicesSections() {
  return (
    <div className="relative py-10 z-10 space-y-32" id="guidance-services">
      {/* Background decorations */}
      <div className="absolute top-[20%] left-0 w-1/3 h-1/3 bg-purple-500/5 dark:bg-purple-900/10 blur-[150px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-[60%] right-0 w-1/4 h-1/4 bg-amber-500/5 dark:bg-amber-900/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6">

        {/* SECTION 2: Personalized Guidance */}
        <section className="mb-5">
          <div className="text-center mb-5">
            <h2 className="font-sans text-4xl sm:text-5xl text-midnight dark:text-cream leading-tight mb-4">
              Personalized <em className="text-amber-600 dark:text-amber-400 italic">Guidance.</em>
            </h2>
            <p className="mt-4 font-body text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Unlock the secrets of your past, present, and future with our expert astrological readings and ancient Nadi wisdom.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <HoverGlowCard
              icon={Star}
              badgeText="EXPERT READING"
              title="Astrology Consultation"
              description="Connect with our master astrologers for an in-depth analysis of your birth chart, planetary periods (Dasha), and transits to make informed life decisions."
              buttonText="Book Consultation"
              glowColor="rgba(245, 158, 11, 0.3)" // Amber glow
            />
            <HoverGlowCard
              icon={ScrollText}
              badgeText="ANCIENT SECRETS"
              title="Nadi Astrology"
              description="Discover your destiny written on ancient palm leaves centuries ago by enlightened sages, revealing past karma and remedies for a better future."
              buttonText="Discover Nadi"
              glowColor="rgba(139, 92, 246, 0.3)" // Purple glow
            />
          </div>
        </section>

        {/* SECTION 3: Personalized Solutions */}
        {/* <div className="mb-10">
          <PersonalizedSolutions />
        </div> */}

        {/* SECTION 4: Personalized Support */}
        <section>
          <div className="text-center mb-6">
            <h2 className="font-sans text-4xl sm:text-5xl text-midnight dark:text-cream leading-tight mb-4">
              Personalized <em className="text-amber-600 dark:text-amber-400 italic">Support.</em>
            </h2>
            <p className="mt-4 font-body text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Ongoing spiritual support programs designed to continuously uplift your consciousness and clear ancestral blocks.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <HoverGlowCard
              icon={Heart}
              badgeText="WEALTH CONSCIOUSNESS"
              title="Shreem Brzee Memberships"
              description="Immerse yourself in the ultimate wealth mantra through daily group chanting, exclusive teachings, and monthly interactive sessions to manifest abundance."
              buttonText="Join Membership"
              glowColor="rgba(217, 70, 239, 0.25)" // Fuchsia glow
              image={shreemBrzeeImg}
            />
            <HoverGlowCard
              icon={Users}
              badgeText="ANCESTRAL BLESSINGS"
              title="Yearlong Tarpanam"
              description="Honor your ancestors throughout the year with scheduled sacred rituals performed by experienced temple priests."
              buttonText="Learn More"
              glowColor="rgba(245, 158, 11, 0.3)" // Amber glow
              image={tarpanamImg}
            />
          </div>
        </section>

      </div>
    </div>
  );
}
