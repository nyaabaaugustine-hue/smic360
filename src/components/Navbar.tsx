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
              <div className="dropdown" style={{ minWidth: '420px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '10px' }}>
                  <div style={{ borderRight: '1px solid var(--border)', paddingRight: '10px' }}>
                    <div className="drop-group-label">Marketing Solutions</div>
                    <Link href="/solutions/marketing/branding-works" className="drop-link-sm">Branding Works</Link>
                    <Link href="/solutions/marketing/corporate-branding" className="drop-link-sm">Corporate Branding</Link>
                    <Link href="/solutions/marketing/digital-marketing" className="drop-link-sm">Digital Marketing</Link>
                    <Link href="/solutions/marketing/digital-work" className="drop-link-sm">Digital Work</Link>
                    <Link href="/solutions/marketing/media-buying" className="drop-link-sm">Media Buying</Link>
                    <Link href="/solutions/marketing/print-management" className="drop-link-sm">Print Management</Link>
                    <Link href="/solutions/marketing/website-development" className="drop-link-sm">Website Development</Link>
                  </div>
                  <div>
                    <div className="drop-group-label">Core Divisions</div>
                    <Link href="/solutions#realestate" className="drop-item">
                      <div className="drop-icon">🏗️</div>
                      <div className="drop-text"><h4>Real Estate</h4><p>Phoenix Enclave</p></div>
                    </Link>
                    <Link href="/solutions#procurement" className="drop-item">
                      <div className="drop-icon">📦</div>
                      <div className="drop-text"><h4>Procurement</h4><p>Value Sourcing</p></div>
                    </Link>
                  </div>
                </div>
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
            <li><Link href="/blog">Blog</Link></li>
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
          <div className="mobile-sublinks">
            <Link href="/solutions/marketing/branding-works" onClick={() => setMobileOpen(false)}>Branding Works</Link>
            <Link href="/solutions/marketing/corporate-branding" onClick={() => setMobileOpen(false)}>Corporate Branding</Link>
            <Link href="/solutions/marketing/digital-marketing" onClick={() => setMobileOpen(false)}>Digital Marketing</Link>
            <Link href="/solutions/marketing/digital-work" onClick={() => setMobileOpen(false)}>Digital Work</Link>
            <Link href="/solutions/marketing/media-buying" onClick={() => setMobileOpen(false)}>Media Buying</Link>
            <Link href="/solutions/marketing/print-management" onClick={() => setMobileOpen(false)}>Print Management</Link>
            <Link href="/solutions/marketing/website-development" onClick={() => setMobileOpen(false)}>Website Development</Link>
          </div>
          <Link href="/about" onClick={() => setMobileOpen(false)}>About Us</Link>
          <Link href="/contact" onClick={() => setMobileOpen(false)}>Contact Us</Link>
          <Link href="/portfolio" onClick={() => setMobileOpen(false)}>Portfolio</Link>
          <Link href="/blog" onClick={() => setMobileOpen(false)}>Blog &amp; News</Link>
          <Link href="/faq" onClick={() => setMobileOpen(false)}>FAQ</Link>
          <button className="mobile-book" onClick={() => { onBookClick(); setMobileOpen(false); }}>Book Us Today</button>
        </div>
      </div>
    </>
  );
}
