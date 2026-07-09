import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';
import { useTheme } from '../ThemeProvider';

export function HoverGlow() {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  // Use motion values for smooth tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Apply spring physics for a fluid, trailing effect
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  // Adjust colors based on theme, using higher opacity for richer color but smaller area
  const glowColors = theme === 'dark'
    ? 'from-purple-500/60 via-indigo-500/50 to-gold/40'
    : 'from-indigo-500/50 via-purple-500/40 to-blue-500/50';

  return (
    <motion.div
      className="hidden md:block fixed inset-0 pointer-events-none z-[99] overflow-hidden mix-blend-normal"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className={`absolute rounded-full blur-[20px] md:blur-[30px] bg-gradient-to-tr ${glowColors}`}
        style={{
          width: 80,
          height: 80,
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </motion.div>
  );
}
