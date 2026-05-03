'use client';
import React, { useState, useEffect } from 'react';
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

  // Lock body scroll when mobile menu open — use class to avoid conflicting with modal scroll-lock
  useEffect(() => {
    if (mobileOpen) {
      document.documentElement.classList.add('mobile-menu-open');
    } else {
      document.documentElement.classList.remove('mobile-menu-open');
    }
    return () => {
      document.documentElement.classList.remove('mobile-menu-open');
    };
  }, [mobileOpen]);

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`} id="navbar">
        <div className="nav-inner">
          <Link href="/" className="logo">
            <img
              src="https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777107241/cropped-SMIC-01-180x180_pffxe7.jpg"
              alt="SMIC360 Limited"
            />
          </Link>

          <ul className="nav-links">
            <li><Link href="/">Home</Link></li>

            {/* Solutions mega-menu */}
            <li className="has-drop">
              <Link href="/solutions">Solutions</Link>
              <div className="dropdown" style={{ minWidth: '520px' }}>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'0' }}>

                  {/* Col 1 — Christie's Homestay */}
                  <div style={{ borderRight:'1px solid var(--border)', paddingRight:'12px' }}>
                    <div className="drop-group-label">Hospitality</div>
                    <Link href="/christies-homestay" className="drop-item">
                      <div className="drop-text">
                        <h4 style={{color:'var(--cyan)'}}>Christie&apos;s Homestay</h4>
                        <p>Airbnb Short-Stay Rentals</p>
                      </div>
                    </Link>
                  </div>

                  {/* Col 2 — Real Estate */}
                  <div style={{ borderRight:'1px solid var(--border)', padding:'0 12px' }}>
                    <div className="drop-group-label">Real Estate</div>
                    <Link href="/the-phoenix-enclave" className="drop-item">
                      <div className="drop-text">
                        <h4 style={{color:'var(--gold)'}}>Phoenix Enclave</h4>
                        <p>View Property Gallery</p>
                      </div>
                    </Link>
                  </div>

                  {/* Col 3 — Advertising & Marketing */}
                  <div style={{ paddingLeft:'12px' }}>
                    <div className="drop-group-label">Advertising &amp; Marketing</div>
                    <Link href="/solutions/marketing/branding-works" className="drop-link-sm">Branding Works</Link>
                    <Link href="/solutions/marketing/corporate-branding" className="drop-link-sm">Corporate Branding</Link>
                    <Link href="/solutions/marketing/digital-marketing" className="drop-link-sm">Digital Marketing</Link>
                    <Link href="/solutions/marketing/digital-work" className="drop-link-sm">Digital Works</Link>
                    <Link href="/solutions/marketing/media-buying" className="drop-link-sm">Media Buying</Link>
                    <Link href="/solutions/marketing/print-management" className="drop-link-sm">Print Management</Link>
                    <Link href="/solutions/marketing/website-development" className="drop-link-sm">Website Development</Link>
                    <div className="drop-group-label" style={{marginTop:'12px'}}>Procurement</div>
                    <Link href="/solutions#procurement" className="drop-link-sm">Procurement &amp; Supply</Link>
                  </div>
                </div>
              </div>
            </li>

            {/* About Us */}
            <li className="has-drop">
              <Link href="/about">About Us</Link>
              <div className="dropdown">
                <Link href="/about" className="drop-item">
                  <div className="drop-text"><h4>Our Story</h4><p>Who we are and our mission</p></div>
                </Link>
                <Link href="/about#team" className="drop-item">
                  <div className="drop-text"><h4>Our Team</h4><p>Meet the experts behind SMIC360</p></div>
                </Link>
                <Link href="/sdgs" className="drop-item">
                  <div className="drop-text"><h4>Our SDGs</h4><p>Sustainability &amp; Impact</p></div>
                </Link>
              </div>
            </li>

            <li><Link href="/portfolio">Portfolio</Link></li>
            <li><Link href="/contact">Contact</Link></li>

            <li>
              <Link href="/business-login"
                style={{ display:'inline-flex', alignItems:'center', gap:'5px', background:'rgba(255,193,7,0.12)', border:'1.5px solid rgba(255,193,7,0.35)', borderRadius:'8px', padding:'6px 14px', color:'var(--gold)', fontFamily:'Oswald, sans-serif', fontWeight:700, fontSize:'13px', letterSpacing:'0.4px', textTransform:'uppercase', transition:'all 0.22s', whiteSpace:'nowrap' }}
                onMouseEnter={e=>{ (e.currentTarget as HTMLElement).style.background='var(--gold)'; (e.currentTarget as HTMLElement).style.color='var(--navy)'; }}
                onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.background='rgba(255,193,7,0.12)'; (e.currentTarget as HTMLElement).style.color='var(--gold)'; }}
              >🔐 Client Login</Link>
            </li>
          </ul>

          <button onClick={onBookClick} className="nav-book btn">
            Book Us
          </button>

          <div
            className={`hamburger${mobileOpen ? ' open' : ''}`}
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(4,14,29,0.6)',
            zIndex: 490,
            backdropFilter: 'blur(4px)',
          }}
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div className={`mobile-menu${mobileOpen ? ' open' : ''}`}>
        <div className="mobile-menu-head">
          <Link href="/" className="logo" onClick={() => setMobileOpen(false)}>
            <img
              src="https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777107241/cropped-SMIC-01-180x180_pffxe7.jpg"
              alt="SMIC360"
            />
          </Link>
          <button
            className="mobile-close"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <div className="mobile-links">
          <Link href="/" onClick={() => setMobileOpen(false)}>Home</Link>

          {/* Solutions group */}
          <Link href="/solutions" onClick={() => setMobileOpen(false)}>Solutions</Link>
          <div className="mobile-sublinks">
            <Link href="/christies-homestay" onClick={() => setMobileOpen(false)} style={{color:'var(--cyan)',fontWeight:700}}>Christie&apos;s Homestay — Airbnb Short-Stay</Link>
            <Link href="/the-phoenix-enclave" onClick={() => setMobileOpen(false)} style={{color:'var(--gold)',fontWeight:700}}>Phoenix Enclave — Real Estate</Link>
          </div>

          {/* Advertising & Marketing sub-items */}
          <div style={{fontSize:11,fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:'rgba(255,193,7,0.55)',padding:'10px 20px 2px'}}>Advertising &amp; Marketing</div>
          <div className="mobile-sublinks">
            <Link href="/solutions/marketing/branding-works" onClick={() => setMobileOpen(false)}>Branding Works</Link>
            <Link href="/solutions/marketing/corporate-branding" onClick={() => setMobileOpen(false)}>Corporate Branding</Link>
            <Link href="/solutions/marketing/digital-marketing" onClick={() => setMobileOpen(false)}>Digital Marketing</Link>
            <Link href="/solutions/marketing/digital-work" onClick={() => setMobileOpen(false)}>Digital Works</Link>
            <Link href="/solutions/marketing/media-buying" onClick={() => setMobileOpen(false)}>Media Buying</Link>
            <Link href="/solutions/marketing/print-management" onClick={() => setMobileOpen(false)}>Print Management</Link>
            <Link href="/solutions/marketing/website-development" onClick={() => setMobileOpen(false)}>Website Development</Link>
          </div>

          {/* About Us */}
          <Link href="/about" onClick={() => setMobileOpen(false)}>About Us</Link>
          <div className="mobile-sublinks">
            <Link href="/about" onClick={() => setMobileOpen(false)}>Our Story — Who we are and our mission</Link>
            <Link href="/about#team" onClick={() => setMobileOpen(false)}>Our Team — Meet the experts</Link>
            <Link href="/sdgs" onClick={() => setMobileOpen(false)}>Our SDGs — Sustainability &amp; Impact</Link>
          </div>

          <Link href="/portfolio" onClick={() => setMobileOpen(false)}>Portfolio</Link>
          <Link href="/contact" onClick={() => setMobileOpen(false)}>Contact</Link>

          <Link href="/business-login" onClick={() => setMobileOpen(false)}
            style={{ display:'flex', alignItems:'center', gap:'8px', padding:'13px 16px', borderRadius:'10px', background:'rgba(255,193,7,0.1)', border:'1.5px solid rgba(255,193,7,0.3)', color:'var(--gold)', fontWeight:700, fontSize:'15px', marginTop:'4px' }}
          >🔐 Business Portal Login</Link>

          <button className="mobile-book" onClick={() => { onBookClick(); setMobileOpen(false); }}>📅 Book Us Today</button>

          <div style={{ marginTop:'28px', padding:'20px', background:'rgba(255,255,255,0.05)', borderRadius:'14px', border:'1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ fontSize:'11px', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:'rgba(255,193,7,0.7)', marginBottom:'12px' }}>Get In Touch</div>
            <a href="tel:+233203361155" style={{ display:'flex', alignItems:'center', gap:'8px', color:'rgba(255,255,255,0.7)', fontSize:'14px', marginBottom:'8px' }}>📞 +233 20 336 1155</a>
            <a href="mailto:info@smic360.com" style={{ display:'flex', alignItems:'center', gap:'8px', color:'rgba(255,255,255,0.7)', fontSize:'14px' }}>✉️ info@smic360.com</a>
          </div>
        </div>
      </div>
    </>
  );
}
