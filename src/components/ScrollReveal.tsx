'use client';
import React, { useEffect, useRef } from 'react';

export default function ScrollReveal() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger');
    els?.forEach((el) => observerRef?.current?.observe(el));

    return () => observerRef?.current?.disconnect();
  }, []);

  return null;
}
