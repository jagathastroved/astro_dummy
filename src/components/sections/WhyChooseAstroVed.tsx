import React from 'react';
import { Target, Flame, HeartHandshake, Award, Globe2, LockKeyhole } from 'lucide-react';

const REASONS = [
  {
    title: "Clear first step",
    desc: "Understand your timing before choosing a remedy.",
    shortDesc: "Understand timing first.",
    icon: Target,
    color: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-600 dark:text-cyan-400"
  },
  {
    title: "Priest-led services",
    desc: "Rituals and homas are presented via service pages.",
    shortDesc: "Dedicated service pages.",
    icon: Flame,
    color: "from-orange-500/20 to-amber-500/20",
    iconColor: "text-orange-600 dark:text-amber-400"
  },
  {
    title: "Respectful guidance",
    desc: "No fear-based promises or guaranteed outcomes.",
    shortDesc: "No fear-based promises.",
    icon: HeartHandshake,
    color: "from-pink-500/20 to-rose-500/20",
    iconColor: "text-pink-600 dark:text-rose-400"
  },
  {
    title: "Since 2000",
    desc: "A long-standing AstroVed spiritual ecosystem.",
    shortDesc: "Spiritual ecosystem.",
    icon: Award,
    color: "from-purple-500/20 to-fuchsia-500/20",
    iconColor: "text-purple-600 dark:text-fuchsia-400"
  },
  {
    title: "Global access",
    desc: "Online participation paths for users outside India.",
    shortDesc: "Online participation.",
    icon: Globe2,
    color: "from-emerald-500/20 to-teal-500/20",
    iconColor: "text-emerald-600 dark:text-teal-400"
  },
  {
    title: "Privacy-aware",
    desc: "Birth details handled per strict privacy policy.",
    shortDesc: "Strict privacy policy.",
    icon: LockKeyhole,
    color: "from-slate-500/20 to-gray-500/20",
    iconColor: "text-slate-600 dark:text-gray-400"
  }
];

export function WhyChooseAstroVed() {
  return (
    <section className="py-6 md:py-8 relative overflow-hidden z-10" id="why-choose">
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Compact Header */}
        <div className="text-center max-w-3xl mx-auto mb-6">
          <h2 className="font-sans text-3xl sm:text-4xl text-midnight dark:text-cream leading-tight mb-3">
            Why Choose <em className="text-amber-600 dark:text-amber-400 italic">AstroVed.</em>
          </h2>
        </div>

        {/* Premium Single Panel */}
        <div className="bg-white/60 dark:bg-[#1a0b2e]/40 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-[2rem] p-6 shadow-[0_4px_30px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_30px_-4px_rgba(245,158,11,0.05)] relative overflow-hidden group/panel">

          {/* Subtle glow inside the panel */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none transition-opacity duration-700 group-hover/panel:bg-amber-500/10" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 rounded-full blur-[80px] pointer-events-none transition-opacity duration-700 group-hover/panel:bg-purple-500/10" />

          {/* Dense Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 relative z-10">
            {REASONS.map((reason, idx) => {
              const Icon = reason.icon;
              return (
                <div key={idx} className="flex flex-col items-center text-center gap-3 group p-3 md:p-4 rounded-2xl hover:bg-white dark:hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-black/5 dark:hover:border-white/5 hover:shadow-sm">

                  {/* Premium glowing icon */}
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br ${reason.color} flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 shadow-inner`}>
                    <Icon className={`w-5 h-5 md:w-6 md:h-6 ${reason.iconColor}`} />
                  </div>

                  {/* Text */}
                  <div>
                    <h3 className="font-sans font-bold text-[13px] md:text-base text-midnight dark:text-cream mb-1 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-tight">
                      {reason.title}
                    </h3>
                    <p className="font-body text-gray-600 dark:text-gray-400 text-[11px] md:text-xs leading-relaxed">
                      {reason.desc}
                    </p>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
