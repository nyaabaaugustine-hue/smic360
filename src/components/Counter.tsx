'use client';
import React, { useEffect, useRef } from 'react';

interface CounterProps {
  target: number;
  suffix?: string;
}

export function Counter({ target, suffix = '' }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animated.current) {
            animated.current = true;
            let start: number | null = null;
            const duration = 1600;
            const step = (ts: number) => {
              if (!start) start = ts;
              const progress = Math.min((ts - start) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              if (el) el.textContent = Math.floor(eased * target).toString();
              if (progress < 1) requestAnimationFrame(step);
              else if (el) el.textContent = target.toString();
            };
            requestAnimationFrame(step);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>0</span>;
}
