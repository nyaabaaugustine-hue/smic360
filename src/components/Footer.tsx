'use client';
import React from 'react';
import Link from 'next/link';

interface FooterProps {
  onBookClick?: () => void;
}

export default function Footer({ onBookClick }: FooterProps) {
  return (
    <footer>
      <div className="footer-top">
        <div className="footer-brand">
          <Link href="/" className="logo">
            <img src="https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777107241/cropped-SMIC-01-180x180_pffxe7.jpg" alt="SMIC360" />
          </Link>
          <p>Building Foundations. Branding Futures. Connecting Markets. — Ghana&apos;s most complete business solutions partner.</p>
          <div className="footer-social">
            <div className="social-btn">in</div>
            <div className="social-btn">ig</div>
            <div className="social-btn">tw</div>
            <div className="social-btn">fb</div>
          </div>
        </div>

        <div className="footer-col">
          <h4>Other Pages</h4>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/solutions">Solutions</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>
            <li><Link href="/portfolio">Portfolio</Link></li>
            <li><Link href="/about">The Phoenix Enclave</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Disclaimer</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Christie&apos;s Homestay</a></li>
            {onBookClick && <li><button onClick={onBookClick} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,.55)', cursor: 'pointer', fontSize: '13.5px', padding: 0, textAlign: 'left' }}>Book Us</button></li>}
          </ul>
        </div>

        <div className="footer-col">
          <h4>Our Services</h4>
          <ul>
            <li><Link href="/solutions">All Services</Link></li>
            <li><Link href="/solutions">Branding Works</Link></li>
            <li><Link href="/solutions">Corporate Branding</Link></li>
            <li><Link href="/solutions">Digital Marketing</Link></li>
            <li><Link href="/solutions">Media Buying</Link></li>
            <li><Link href="/solutions">Print Management</Link></li>
            <li><Link href="/solutions">Web Development</Link></li>
            <li><Link href="/solutions">Procurement</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Newsletter</h4>
          <p>Signup to join our newsletter and receive the latest updates on our activities and promotions.</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Your email address" />
            <button className="btn btn-primary" style={{ padding: '11px 14px', fontSize: '12px' }}>Go</button>
          </div>
        </div>
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,.08)' }}>
        <div className="footer-bottom">
          <span style={{ color: 'var(--gold)' }}>Copyright &copy; 2026 &nbsp;|&nbsp; All Rights Reserved &nbsp;|&nbsp; SMIC360 Limited</span>
          <div className="footer-bottom-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>);

}