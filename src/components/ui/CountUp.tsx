import React, { useEffect, useState } from 'react';

interface CountUpProps {
  end: number;
  suffix?: string;
  decimals?: number;
  duration?: number;
}

export default function CountUp({ end, suffix = '', decimals = 0, duration = 2000 }: CountUpProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    let animationId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setCount(easeProgress * end);
      
      if (progress < 1) {
        animationId = window.requestAnimationFrame(step);
      }
    };
    
    animationId = window.requestAnimationFrame(step);

    return () => {
      window.cancelAnimationFrame(animationId);
    };
  }, [end, duration]);

  return <span>{count.toFixed(decimals)}{suffix}</span>;
}
