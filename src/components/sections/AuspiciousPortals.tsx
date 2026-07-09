import React from 'react';
import { Flame, Star, Zap, Clock } from 'lucide-react';

const portals = [
  {
    title: "Navagraha Alignment",
    time: "Next 48 Hours",
    description: "A rare celestial configuration opening portals for wealth and karma clearing.",
    icon: Star,
    color: "from-purple-500/20 to-purple-800/20",
    borderGlow: "group-hover:border-purple-400/50",
    iconColor: "text-purple-300"
  },
  {
    title: "Solar Power Phase",
    time: "Ends in 3 Days",
    description: "Sun entering an exalted state. Perfect timing for career moves and leadership.",
    icon: Flame,
    color: "from-amber-500/20 to-amber-700/20",
    borderGlow: "group-hover:border-amber-400/50",
    iconColor: "text-amber-300"
  },
  {
    title: "Quantum Transit",
    time: "Active Now",
    description: "Favorable energies for deep meditation and sudden breakthroughs.",
    icon: Zap,
    color: "from-purple-500/20 to-amber-500/20",
    borderGlow: "group-hover:border-purple-400/50",
    iconColor: "text-purple-300"
  }
];

export function AuspiciousPortals() {
  return (
    <section className="relative py-6 md:py-8 bg-[#0c0618] overflow-hidden z-10" id="portals">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-amber-400" />
            <span className="font-mono text-xs uppercase tracking-widest text-amber-400">Live Timing</span>
            <div className="w-8 h-px bg-gradient-to-l from-transparent to-amber-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-4xl md:text-5xl mb-6">
            Auspicious <em className="text-amber-400 not-italic font-medium">Portals & Transits</em>
          </h2>
          <p className="text-white/60 text-lg">
            Align your actions with the cosmos. These active astrological gateways offer accelerated results for specific intentions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {portals.map((portal, idx) => {
            const Icon = portal.icon;
            return (
              <div 
                key={idx} 
                className={`group relative rounded-2xl overflow-hidden backdrop-blur-xl bg-white/5 border border-white/10 ${portal.borderGlow} transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] cursor-pointer`}
              >
                {/* Internal gradient layer */}
                <div className={`absolute inset-0 bg-gradient-to-br ${portal.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
                
                <div className="relative p-8 z-10 h-full flex flex-col pointer-events-none">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/5 group-hover:scale-110 transition-transform duration-500">
                      <Icon className={`w-6 h-6 ${portal.iconColor} drop-shadow-[0_0_8px_currentColor]`} />
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/80">
                      <Clock className="w-3 h-3" />
                      {portal.time}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-serif text-white mb-3 group-hover:text-2xl md:text-3xl transition-colors">
                    {portal.title}
                  </h3>
                  
                  <p className="text-white/60 text-sm leading-relaxed mb-8 flex-grow">
                    {portal.description}
                  </p>
                  
                  <button className="w-full py-3 rounded-xl bg-white/5 group-hover:bg-amber-400/10 group-hover:border-amber-400/30 group-hover:text-amber-300 border border-white/10 text-white text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 group/btn pointer-events-auto">
                    <span>Explore Portal</span>
                    <span className="transform group-hover/btn:translate-x-1 transition-transform">→</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
