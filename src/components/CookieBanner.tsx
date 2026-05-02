'use client';
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';

export default function CookieBanner() {
  const [show, setShow] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const consent = localStorage.getItem('smic360_cookie_consent');
    if (!consent) {
      // Delay slightly so it doesn't flash on first paint
      const t = setTimeout(() => setShow(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('smic360_cookie_consent', 'accepted');
    setShow(false);
  };

  const decline = () => {
    localStorage.setItem('smic360_cookie_consent', 'declined');
    setShow(false);
  };

  if (!mounted || !show) return null;

  return createPortal(
    <>
      <style>{`
        @keyframes cookieUp {
          from { opacity:0; transform:translateY(24px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .cookie-banner {
          position: fixed;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 999997;
          width: min(680px, calc(100vw - 32px));
          background: rgba(7,22,40,0.97);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255,193,7,0.22);
          border-radius: 18px;
          padding: 22px 26px;
          display: flex;
          align-items: center;
          gap: 20px;
          box-shadow: 0 16px 60px rgba(4,14,29,0.55), 0 0 0 1px rgba(255,255,255,0.04);
          animation: cookieUp 0.45s cubic-bezier(0.16,1,0.3,1) both;
          flex-wrap: wrap;
        }
        .cookie-icon {
          font-size: 28px;
          flex-shrink: 0;
        }
        .cookie-text {
          flex: 1;
          min-width: 200px;
        }
        .cookie-text p {
          font-size: 13.5px;
          color: rgba(255,255,255,0.65);
          line-height: 1.65;
          margin: 0;
        }
        .cookie-text a {
          color: #FFC107;
          font-weight: 600;
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .cookie-text a:hover { color: #FFD54F; }
        .cookie-actions {
          display: flex;
          gap: 10px;
          flex-shrink: 0;
          align-items: center;
        }
        .cookie-accept {
          background: linear-gradient(135deg, #FFC107, #D4A017);
          color: #071628;
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          font-size: 13px;
          padding: 10px 22px;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.22s;
          box-shadow: 0 4px 14px rgba(255,193,7,0.3);
        }
        .cookie-accept:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(255,193,7,0.45); }
        .cookie-decline {
          background: transparent;
          color: rgba(255,255,255,0.45);
          font-family: 'Outfit', sans-serif;
          font-weight: 600;
          font-size: 12px;
          padding: 10px 14px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.12);
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.2s;
        }
        .cookie-decline:hover { color: rgba(255,255,255,0.75); border-color: rgba(255,255,255,0.28); }
        @media (max-width: 520px) {
          .cookie-banner { bottom: 16px; padding: 18px 18px; gap: 14px; border-radius: 14px; }
          .cookie-actions { width: 100%; }
          .cookie-accept { flex: 1; text-align: center; }
        }
      `}</style>

      <div className="cookie-banner" role="dialog" aria-label="Cookie consent">
        <span className="cookie-icon">🍪</span>
        <div className="cookie-text">
          <p>
            We use cookies to improve your experience, analyse site traffic, and personalise content.
            By clicking <strong style={{ color: '#fff' }}>Accept</strong>, you agree to our{' '}
            <Link href="/privacy">Privacy Policy</Link>.
          </p>
        </div>
        <div className="cookie-actions">
          <button className="cookie-accept" onClick={accept}>
            Accept All
          </button>
          <button className="cookie-decline" onClick={decline}>
            Decline
          </button>
        </div>
      </div>
    </>,
    document.body
  );
}
