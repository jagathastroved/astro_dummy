import React, { useState } from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface HoverGlowCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.ElementType;
  badgeText: string;
  title: string;
  description: string;
  buttonText: string;
  onClick?: () => void;
  className?: string;
  glowColor?: string; // e.g., 'rgba(212, 175, 55, 0.4)'
}

export const HoverGlowCard: React.FC<HoverGlowCardProps> = ({
  icon: Icon,
  badgeText,
  title,
  description,
  buttonText,
  onClick,
  className = '',
  glowColor = 'rgba(245, 158, 11, 0.3)', // Default amber/gold glow
  ...props
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={`group relative overflow-hidden rounded-[2rem] border border-black/5 dark:border-white/5 bg-white/60 dark:bg-[#0c0f1a] p-8 md:p-10 transition-colors duration-500 shadow-sm hover:shadow-xl dark:shadow-none flex flex-col h-full ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {/* Light glow overlay following cursor (Visible on Hover) */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition-opacity duration-500 z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              ${glowColor},
              transparent 80%
            )
          `,
        }}
      />
      
      {/* Subtle ambient central glow (Always slightly visible, amplifies on hover) */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-20 dark:opacity-30 transition-opacity duration-700 z-0 group-hover:opacity-60 mix-blend-screen dark:mix-blend-lighten"
        style={{
          background: `radial-gradient(circle at center, ${glowColor} 0%, transparent 70%)`
        }}
      />

      {/* Content Container (z-10 to stay above glows) */}
      <div className="relative z-10 flex-1 flex flex-col">
        {/* Header: Icon & Badge */}
        <div className="flex justify-between items-start mb-8">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 dark:bg-[#4b3515] flex items-center justify-center border border-amber-500/20 dark:border-[#b48025]/30 group-hover:scale-110 transition-transform duration-500">
            <Icon className="w-6 h-6 text-amber-600 dark:text-amber-400" />
          </div>
          <span className="px-4 py-1.5 rounded-full border border-black/10 dark:border-white/20 bg-white/50 dark:bg-black/50 backdrop-blur-md text-[10px] uppercase font-mono font-bold tracking-[0.2em] text-gray-600 dark:text-gray-300">
            {badgeText}
          </span>
        </div>

        {/* Text Content */}
        <div className="mt-auto">
          <h3 className="font-ui text-3xl text-midnight dark:text-white font-medium mb-4 leading-tight">
            {title}
          </h3>
          <p className="font-body text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
            {description}
          </p>
        </div>

        {/* Button */}
        <button 
          onClick={onClick}
          className="mt-auto w-full sm:w-auto self-start px-8 py-4 rounded-xl bg-midnight dark:bg-white text-white dark:text-midnight font-ui text-xs font-bold uppercase tracking-[0.15em] flex items-center justify-center gap-3 group/btn hover:bg-amber-600 dark:hover:bg-amber-100 transition-colors duration-300"
        >
          {buttonText}
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
