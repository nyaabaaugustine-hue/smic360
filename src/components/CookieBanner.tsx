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
      const t = setTimeout(() => setShow(true), 1400);
      return () => clearTimeout(t);
    }
  }, []);

  const accept  = () => { localStorage.setItem('smic360_cookie_consent', 'accepted'); setShow(false); };
  const decline = () => { localStorage.setItem('smic360_cookie_consent', 'declined'); setShow(false); };

  if (!mounted || !show) return null;

  return createPortal(
    <>
      <style>{`
        @keyframes cookieSlideDown {
          from { opacity:0; transform:translateX(-50%) translateY(-28px); }
          to   { opacity:1; transform:translateX(-50%) translateY(0); }
        }
        @keyframes cookieSlideUp {
          from { opacity:0; transform:translateX(-50%) translateY(28px); }
          to   { opacity:1; transform:translateX(-50%) translateY(0); }
        }
        @keyframes cookieSlideDownMobile {
          from { opacity:0; transform:translateY(-100%); }
          to   { opacity:1; transform:translateY(0); }
        }

        .ck-banner {
          position: fixed;
          bottom: 28px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 999990;
          width: min(660px, calc(100vw - 40px));
          background: rgba(5, 16, 36, 0.98);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255,193,7,0.25);
          border-radius: 20px;
          padding: 20px 24px;
          display: flex;
          align-items: center;
          gap: 18px;
          box-shadow:
            0 20px 60px rgba(0,0,0,0.5),
            0 0 0 1px rgba(255,255,255,0.04),
            inset 0 1px 0 rgba(255,255,255,0.06);
          animation: cookieSlideUp 0.42s cubic-bezier(0.16,1,0.3,1) both;
        }
        .ck-icon {
          font-size: 26px;
          flex-shrink: 0;
          line-height: 1;
        }
        .ck-text {
          flex: 1;
          min-width: 0;
        }
        .ck-text strong {
          display: block;
          font-family: 'Oswald', sans-serif;
          font-size: 14px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 4px;
          letter-spacing: 0.3px;
        }
        .ck-text p {
          font-size: 12.5px;
          color: rgba(255,255,255,0.55);
          line-height: 1.6;
          margin: 0;
        }
        .ck-text a {
          color: #FFC107;
          font-weight: 600;
          text-underline-offset: 2px;
        }
        .ck-text a:hover { color: #FFD54F; }
        .ck-btns {
          display: flex;
          gap: 9px;
          flex-shrink: 0;
          align-items: center;
        }
        .ck-accept {
          background: linear-gradient(135deg, #FFC107, #D4A017);
          color: #071628;
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          font-size: 13px;
          padding: 9px 20px;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.22s;
          box-shadow: 0 4px 14px rgba(255,193,7,0.28);
          letter-spacing: 0.2px;
        }
        .ck-accept:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(255,193,7,0.48);
        }
        .ck-decline {
          background: transparent;
          color: rgba(255,255,255,0.4);
          font-family: 'Outfit', sans-serif;
          font-weight: 600;
          font-size: 12px;
          padding: 9px 14px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.1);
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.2s;
        }
        .ck-decline:hover { color: rgba(255,255,255,0.7); border-color: rgba(255,255,255,0.25); }

        /* ─── MOBILE: move to TOP so it never blocks floating buttons ─── */
        @media (max-width: 600px) {
          .ck-banner {
            bottom: auto;
            top: 0;
            left: 0;
            transform: none;
            width: 100%;
            border-radius: 0 0 18px 18px;
            padding: 14px 16px;
            gap: 12px;
            border-top: none;
            border-left: none;
            border-right: none;
            border-bottom: 2px solid rgba(255,193,7,0.3);
            animation: cookieSlideDownMobile 0.38s cubic-bezier(0.16,1,0.3,1) both;
            flex-wrap: wrap;
          }
          .ck-icon { font-size: 22px; }
          .ck-text strong { font-size: 13px; }
          .ck-text p { font-size: 12px; line-height: 1.5; }
          .ck-btns { width: 100%; gap: 8px; }
          .ck-accept { flex: 1; text-align: center; padding: 10px; font-size: 13px; }
          .ck-decline { padding: 10px 16px; font-size: 12px; }
        }
      `}</style>

      <div className="ck-banner" role="dialog" aria-label="Cookie consent" aria-live="polite">
        <span className="ck-icon">🍪</span>
        <div className="ck-text">
          <strong>We value your privacy</strong>
          <p>
            We use cookies to improve your experience and analyse traffic.{' '}
            <Link href="/privacy">Privacy Policy</Link>.
          </p>
        </div>
        <div className="ck-btns">
          <button className="ck-accept" onClick={accept}>Accept All</button>
          <button className="ck-decline" onClick={decline}>Decline</button>
        </div>
      </div>
    </>,
    document.body
  );
}
