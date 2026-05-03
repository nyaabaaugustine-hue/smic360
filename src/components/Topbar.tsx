'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Topbar() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY < 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="topbar">
      <div className="topbar-inner">
        <div className="topbar-left">
          <a href="tel:+233203361155" className="topbar-item">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.09 10.82a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14v2.92z" />
            </svg>
            <span style={{ color: 'var(--gold)', fontWeight: 600 }}>+233 20 336 1155</span>
          </a>
        </div>
        <div className="topbar-right">
          <Link href="/about" className="topbar-item">About</Link>
          <Link href="/portfolio" className="topbar-item">Portfolio</Link>
          <div className="topbar-socials">
            <a href="https://web.facebook.com/smic360limited" target="_blank" rel="noopener noreferrer" aria-label="Facebook">fb</a>
            <a href="https://www.instagram.com/explore/locations/1015916517/smic360-limited/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">ig</a>
            <a href="https://web.facebook.com/smic360limited" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">in</a>
          </div>
        </div>
      </div>
    </div>
  );
}
