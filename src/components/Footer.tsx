'use client';
import React, { useState } from 'react';
import Link from 'next/link';

interface FooterProps {
  onBookClick?: () => void;
}

export default function Footer({ onBookClick }: FooterProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('https://formspree.io/f/xdayrral', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) { setDone(true); setEmail(''); }
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  return (
    <footer>
      <style>{`
        .footer-award-strip {
          background: linear-gradient(90deg, rgba(255,193,7,0.08), rgba(0,180,216,0.05), rgba(255,193,7,0.08));
          border-top: 1px solid rgba(255,193,7,0.12);
          border-bottom: 1px solid rgba(255,193,7,0.12);
          padding: 18px 28px;
          display: flex; align-items: center; justify-content: center;
          gap: 40px; flex-wrap: wrap; margin-bottom: 0;
        }
        @media (max-width: 768px) { .footer-award-strip { display: none !important; } }
        .footer-award-item { display: flex; align-items: center; gap: 8px; font-size: 12px; color: rgba(255,255,255,0.5); white-space: nowrap; }
        .footer-award-item strong { color: var(--gold); }
        .footer-award-dot { width: 4px; height: 4px; border-radius: 50%; background: rgba(255,193,7,0.3); }
        .footer-cta-strip { background: linear-gradient(135deg, #040e1d 0%, #0b2d56 100%); padding: 44px 28px; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .footer-cta-inner { max-width: 1200px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 24px; flex-wrap: wrap; }
        .footer-cta-text h3 { font-family: 'Oswald', sans-serif; font-size: 26px; font-weight: 700; color: #fff; }
        .footer-cta-text p { color: rgba(255,255,255,0.5); font-size: 14px; margin-top: 4px; }
        .footer-cta-btns { display: flex; gap: 10px; flex-wrap: wrap; }
        .footer-divider { height: 1px; background: linear-gradient(90deg, transparent, rgba(255,193,7,0.2), rgba(0,180,216,0.15), rgba(255,193,7,0.2), transparent); margin: 0; border: none; }
      `}</style>

      {/* Pre-footer CTA strip */}
      <div className="footer-cta-strip">
        <div className="footer-cta-inner">
          <div className="footer-cta-text">
            <h3>Ready to grow your business?</h3>
            <p>Partner with Ghana&apos;s most complete business solutions company.</p>
          </div>
          <div className="footer-cta-btns">
            {onBookClick && (
              <button onClick={onBookClick} className="btn btn-outline-white">Book A Consultation</button>
            )}
          </div>
        </div>
      </div>

      <hr className="footer-divider" />

      {/* Award / trust strip */}
      <div className="footer-award-strip">
        {[
          { icon: '🏆', label: 'Ghana Business Award', year: '2023' },
          { icon: '⭐', label: '5-Star Client Rating' },
          { icon: '📍', label: 'Based in Accra, Ghana' },
          { icon: '🌍', label: 'Pan-African Vision' },
          { icon: '🔒', label: 'ISO-Aligned Procurement' },
        ].map((item, i, arr) => (
          <React.Fragment key={i}>
            <div className="footer-award-item">
              <span>{item.icon}</span>
              <span><strong>{item.label}</strong>{item.year ? ` — ${item.year}` : ''}</span>
            </div>
            {i < arr.length - 1 && <div className="footer-award-dot" />}
          </React.Fragment>
        ))}
      </div>

      {/* Main footer body */}
      <div className="footer-top">
        {/* Brand col */}
        <div className="footer-brand">
          <Link href="/" className="logo">
            <img src="https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777107241/cropped-SMIC-01-180x180_pffxe7.jpg" alt="SMIC360" />
          </Link>
          <p style={{ marginTop: '14px' }}>
            Building Foundations. Branding Futures. Connecting Markets.
            <br /><br />
            Ghana&apos;s most complete business solutions partner — Marketing, Real Estate &amp; Procurement under one roof.
          </p>
          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            {[
              { href: 'https://web.facebook.com/smic360limited', label: 'Facebook', icon: 'fb' },
              { href: 'https://www.instagram.com/explore/locations/1015916517/smic360-limited/', label: 'Instagram', icon: 'ig' },
              { href: 'https://web.facebook.com/smic360limited', label: 'LinkedIn', icon: 'in' },
              { href: 'https://wa.me/233203361155', label: 'WhatsApp', icon: 'wa' },
            ].map((s) => (
              <a key={s.icon} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="social-btn">{s.icon}</a>
            ))}
          </div>
          <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <a href="tel:+233203361155" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.55)', fontSize: '13px', transition: 'color 0.2s' }}>
              <span style={{ color: 'var(--gold)', fontSize: '12px' }}>📞</span> +233 20 336 1155
            </a>
            <a href="mailto:christie@smic360.com" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.55)', fontSize: '13px', transition: 'color 0.2s' }}>
              <span style={{ color: 'var(--gold)', fontSize: '12px' }}>✉️</span> christie@smic360.com
            </a>
          </div>
        </div>

        {/* Pages */}
        <div className="footer-col">
          <h4>Other Pages</h4>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/solutions">Solutions</Link></li>
            <li><Link href="/blog">Blog &amp; News</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>
            <li><Link href="/portfolio">Portfolio</Link></li>
            <li><Link href="/faq">FAQ</Link></li>
          </ul>
        </div>

        {/* Quick links */}
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><Link href="/privacy">Privacy Policy</Link></li>
            <li><Link href="/terms">Terms of Service</Link></li>
            <li><Link href="/faq">FAQ</Link></li>
            <li><Link href="/the-phoenix-enclave">The Phoenix Enclave</Link></li>
            <li><a href="#">Christie&apos;s Homestay</a></li>
            <li><a href="#">Moonlight Shipping</a></li>
            {onBookClick && (
              <li>
                <button onClick={onBookClick} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.55)', cursor: 'pointer', fontSize: '13.5px', padding: 0, textAlign: 'left', transition: 'color 0.2s' }}>
                  Book Us
                </button>
              </li>
            )}
          </ul>
        </div>

        {/* Services */}
        <div className="footer-col">
          <h4>Our Services</h4>
          <ul>
            <li><Link href="/solutions">All Services</Link></li>
            <li><Link href="/solutions/marketing/branding-works">Branding Works</Link></li>
            <li><Link href="/solutions/marketing/corporate-branding">Corporate Branding</Link></li>
            <li><Link href="/solutions/marketing/digital-marketing">Digital Marketing</Link></li>
            <li><Link href="/solutions/marketing/media-buying">Media Buying</Link></li>
            <li><Link href="/solutions/marketing/print-management">Print Management</Link></li>
            <li><Link href="/solutions/marketing/website-development">Web Development</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="footer-col">
          <h4>Newsletter</h4>
          <p>Stay ahead with SMIC360 insights, property launches, and business tips delivered to your inbox.</p>
          {!done ? (
            <form className="newsletter-form" onSubmit={handleNewsletter} style={{ marginTop: '16px' }}>
              <input type="email" name="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <button type="submit" className="btn btn-primary" style={{ padding: '11px 16px', fontSize: '12px', flexShrink: 0 }} disabled={loading}>
                {loading ? '…' : 'Join →'}
              </button>
            </form>
          ) : (
            <p style={{ color: 'var(--cyan)', fontSize: '13px', marginTop: '14px', fontWeight: 700 }}>✔ You&apos;re subscribed!</p>
          )}
          <div style={{ marginTop: '22px', fontSize: '12.5px', color: 'rgba(255,255,255,0.4)', lineHeight: '1.72' }}>
            <div style={{ fontWeight: 700, color: 'rgba(255,255,255,0.6)', marginBottom: '4px', fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase' }}>Office</div>
            1st Floor, Verostina House, Opp. DSTV Office,<br />
            Community 18, Off Spintex Road, Accra, Ghana
          </div>
        </div>
      </div>

      {/* Footer bottom */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="footer-bottom">
          <span>
            <span style={{ color: 'var(--gold)' }}>© 2026 SMIC360 Limited</span>
            <span style={{ color: 'rgba(255,255,255,0.2)', margin: '0 10px' }}>|</span>
            All Rights Reserved
          </span>
          <div className="footer-bottom-links">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/faq">FAQ</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/sitemap.xml">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
