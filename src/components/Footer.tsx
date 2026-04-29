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
    } catch (err) {
      console.error(err);
    }
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
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 40px;
          flex-wrap: wrap;
          margin-bottom: 0;
        }
        .footer-award-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: rgba(255,255,255,0.5);
          white-space: nowrap;
        }
        .footer-award-item strong { color: var(--gold); }
        .footer-award-dot {
          width: 4px; height: 4px;
          border-radius: 50%;
          background: rgba(255,193,7,0.3);
        }
        .footer-cta-strip {
          background: linear-gradient(135deg, #040e1d 0%, #0b2d56 100%);
          padding: 44px 28px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .footer-cta-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
        }
        .footer-cta-text h3 {
          font-family: 'Oswald', sans-serif;
          font-size: 26px; font-weight: 700;
          color: #fff;
        }
        .footer-cta-text p {
          color: rgba(255,255,255,0.5);
          font-size: 14px; margin-top: 4px;
        }
        .footer-cta-btns { display: flex; gap: 10px; flex-wrap: wrap; }
        .footer-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,193,7,0.2), rgba(0,180,216,0.15), rgba(255,193,7,0.2), transparent);
          margin: 0;
          border: none;
        }
        .social-btn-label {
          font-size: 11px; letter-spacing: 0.5px;
        }
      `}</style>

      {/* Pre-footer CTA strip */}
      <div className="footer-cta-strip">
        <div className="footer-cta-inner">
          <div className="footer-cta-text">
            <h3>Ready to grow your business?</h3>
            <p>Partner with Ghana&apos;s most complete business solutions company.</p>
          </div>
          <div className="footer-cta-btns">
            <a href="https://wa.me/233244783099" target="_blank" rel="noopener noreferrer" className="btn btn-white">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp Us
            </a>
            {onBookClick && (
              <button onClick={onBookClick} className="btn btn-outline-white">
                Book A Consultation
              </button>
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
            <img
              src="https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777107241/cropped-SMIC-01-180x180_pffxe7.jpg"
              alt="SMIC360"
            />
          </Link>
          <p style={{ marginTop: '14px' }}>
            Building Foundations. Branding Futures. Connecting Markets.
            <br /><br />
            Ghana&apos;s most complete business solutions partner — Marketing, Real Estate &amp; Procurement under one roof.
          </p>
          <div className="footer-social" style={{ marginTop: '20px' }}>
            {[
              { label: 'in', title: 'LinkedIn',  href: 'https://linkedin.com' },
              { label: 'ig', title: 'Instagram', href: 'https://instagram.com' },
              { label: 'tw', title: 'Twitter/X', href: 'https://twitter.com' },
              { label: 'fb', title: 'Facebook',  href: 'https://facebook.com' },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
                title={s.title}
                style={{ fontWeight: 700, textDecoration: 'none' }}
              >
                {s.label}
              </a>
            ))}
          </div>
          {/* Contact quick */}
          <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <a href="tel:0244783099" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.55)', fontSize: '13px', transition: 'color 0.2s' }}>
              <span style={{ color: 'var(--gold)', fontSize: '12px' }}>📞</span> 024 478 3099
            </a>
            <a href="mailto:info@smic360.com" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.55)', fontSize: '13px', transition: 'color 0.2s' }}>
              <span style={{ color: 'var(--gold)', fontSize: '12px' }}>✉️</span> info@smic360.com
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
            <li><a href="#">The Phoenix Enclave</a></li>
            <li><a href="#">Christie&apos;s Homestay</a></li>
            <li><a href="#">Moonlight Shipping</a></li>
            {onBookClick && (
              <li>
                <button
                  onClick={onBookClick}
                  style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.55)', cursor: 'pointer', fontSize: '13.5px', padding: 0, textAlign: 'left', transition: 'color 0.2s' }}
                >
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
            <li><Link href="/solutions#procurement">Procurement</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="footer-col">
          <h4>Newsletter</h4>
          <p>Stay ahead with SMIC360 insights, property launches, and business tips delivered to your inbox.</p>
          {!done ? (
            <form className="newsletter-form" onSubmit={handleNewsletter} style={{ marginTop: '16px' }}>
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="btn btn-primary"
                style={{ padding: '11px 16px', fontSize: '12px', flexShrink: 0 }}
                disabled={loading}
              >
                {loading ? '…' : 'Join →'}
              </button>
            </form>
          ) : (
            <p style={{ color: 'var(--cyan)', fontSize: '13px', marginTop: '14px', fontWeight: 700 }}>
              ✔ You&apos;re subscribed!
            </p>
          )}

          {/* Address */}
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
            <span style={{ color: 'rgba(255,255,255,0.2)', margin: '0 10px' }}>|</span>
            Built in 🇬🇭 Ghana
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
