import React, { useState } from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'motion/react';

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({ children, className = '', id, ...props }) => {
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
      id={id}
      className={`relative overflow-hidden rounded-3xl border border-gold/15 bg-white/60 dark:bg-midnight/30 backdrop-blur-md p-6 transition-colors duration-300 shadow-sm hover:shadow-md ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {/* Light glow overlay following cursor */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: useMotionTemplate`
            radial-gradient(
              350px circle at ${mouseX}px ${mouseY}px,
              rgba(212, 175, 55, 0.12),
              transparent 80%
            )
          `,
        }}
      />
      
      {/* Inner border glow following cursor */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: useMotionTemplate`
            radial-gradient(
              150px circle at ${mouseX}px ${mouseY}px,
              rgba(244, 163, 64, 0.35),
              transparent 80%
            )
          `,
        }}
      />

      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </div>
  );
};
