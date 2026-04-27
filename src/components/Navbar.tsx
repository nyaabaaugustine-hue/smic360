'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface NavbarProps {
  onBookClick: () => void;
}

export default function Navbar({ onBookClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`} id="navbar">
        <div className="nav-inner">
          <Link href="/" className="logo">
            <img src="https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777107241/cropped-SMIC-01-180x180_pffxe7.jpg" alt="SMIC360" />
          </Link>
          <ul className="nav-links">
            <li><Link href="/">Home</Link></li>
            <li className="has-drop">
              <Link href="/solutions">Solutions ▾</Link>
              <div className="dropdown">
                <Link href="/solutions" className="drop-item">
                  <div className="drop-icon">📣</div>
                  <div className="drop-text">
                    <h4>Marketing</h4>
                    <p>360° branding and creative strategy</p>
                  </div>
                </Link>
                <Link href="/solutions" className="drop-item">
                  <div className="drop-icon">🏗️</div>
                  <div className="drop-text">
                    <h4>Real Estate</h4>
                    <p>Phoenix Enclave gated community</p>
                  </div>
                </Link>
                <Link href="/solutions" className="drop-item">
                  <div className="drop-icon">📦</div>
                  <div className="drop-text">
                    <h4>Procurement</h4>
                    <p>Tailor-made procurement services</p>
                  </div>
                </Link>
              </div>
            </li>
            <li className="has-drop">
              <Link href="/about">About Us ▾</Link>
              <div className="dropdown">
                <Link href="/about" className="drop-item">
                  <div className="drop-icon">🏢</div>
                  <div className="drop-text">
                    <h4>Our Story</h4>
                    <p>Who we are and our mission</p>
                  </div>
                </Link>
                <Link href="/about" className="drop-item">
                  <div className="drop-icon">🌱</div>
                  <div className="drop-text">
                    <h4>Our SDGs</h4>
                    <p>Sustainability &amp; Impact</p>
                  </div>
                </Link>
              </div>
            </li>
            <li><Link href="/portfolio">Portfolio</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>
          </ul>
          <button onClick={onBookClick} className="nav-book btn">Book Us</button>
          <div className="hamburger" onClick={() => setMobileOpen(true)}>
            <span></span><span></span><span></span>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu${mobileOpen ? ' open' : ''}`}>
        <div className="mobile-menu-head">
          <div className="logo">
            <img src="https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777107241/cropped-SMIC-01-180x180_pffxe7.jpg" alt="SMIC360" />
          </div>
          <button className="mobile-close" onClick={() => setMobileOpen(false)}>✕</button>
        </div>
        <div className="mobile-links">
          <Link href="/" onClick={() => setMobileOpen(false)}>Home</Link>
          <Link href="/solutions" onClick={() => setMobileOpen(false)}>Solutions</Link>
          <Link href="/about" onClick={() => setMobileOpen(false)}>About Us</Link>
          <Link href="/contact" onClick={() => setMobileOpen(false)}>Contact Us</Link>
          <Link href="/portfolio" onClick={() => setMobileOpen(false)}>Portfolio</Link>
          <button className="mobile-book" onClick={() => { onBookClick(); setMobileOpen(false); }}>Book Us Today</button>
        </div>
      </div>
    </>
  );
}
