'use client';
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';

/* ── Tracking scripts we gate behind consent ──
   Add / remove script URLs here as needed.        */
const TRACKING_SCRIPTS: Array<{ src: string; id: string }> = [
  // e.g. Google Analytics
  // { id: 'ga-script', src: 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX' },
];

function loadTracking() {
  TRACKING_SCRIPTS.forEach(({ src, id }) => {
    if (document.getElementById(id)) return;
    const s = document.createElement('script');
    s.id = id; s.src = src; s.async = true;
    document.head.appendChild(s);
  });
}

function removeTracking() {
  TRACKING_SCRIPTS.forEach(({ id }) => {
    document.getElementById(id)?.remove();
  });
  // Clear common tracking cookies
  ['_ga', '_gid', '_gat', '_fbp'].forEach(name => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${location.hostname}`;
  });
}

export default function CookieBanner() {
  const [show, setShow]       = useState(false);
  const [mounted, setMounted] = useState(false);
  const [view, setView]       = useState<'banner'|'settings'>('banner');

  useEffect(() => {
    setMounted(true);
    const consent = localStorage.getItem('smic360_cookie_consent');
    if (!consent) {
      // Block all tracking until explicit consent
      removeTracking();
      const t = setTimeout(() => setShow(true), 1400);
      return () => clearTimeout(t);
    }
    // Restore consent on revisit
    if (consent === 'accepted') loadTracking();
  }, []);

  const accept = () => {
    localStorage.setItem('smic360_cookie_consent', 'accepted');
    loadTracking();
    setShow(false);
  };

  const decline = () => {
    localStorage.setItem('smic360_cookie_consent', 'declined');
    removeTracking();
    setShow(false);
  };

  const acceptEssential = () => {
    localStorage.setItem('smic360_cookie_consent', 'essential');
    removeTracking();
    setShow(false);
  };

  if (!mounted || !show) return null;

  return createPortal(
    <>
      <style>{`
        @keyframes cookieSlideUp   { from{opacity:0;transform:translateX(-50%) translateY(28px)} to{opacity:1;transform:translateX(-50%) translateY(0)} }
        @keyframes cookieSlideDown { from{opacity:0;transform:translateY(-100%)} to{opacity:1;transform:translateY(0)} }
        .ck-banner {
          position:fixed; bottom:28px; left:50%; transform:translateX(-50%);
          z-index:999990; width:min(680px,calc(100vw - 40px));
          background:rgba(5,16,36,0.98); backdrop-filter:blur(24px);
          -webkit-backdrop-filter:blur(24px);
          border:1px solid rgba(255,193,7,0.25); border-radius:20px;
          box-shadow:0 20px 60px rgba(0,0,0,0.5),0 0 0 1px rgba(255,255,255,0.04),inset 0 1px 0 rgba(255,255,255,0.06);
          animation:cookieSlideUp 0.42s cubic-bezier(0.16,1,0.3,1) both;
          font-family:'Outfit',sans-serif;
        }
        .ck-main { display:flex; align-items:center; gap:18px; padding:18px 22px; }
        .ck-icon { font-size:26px; flex-shrink:0; line-height:1; }
        .ck-text { flex:1; min-width:0; }
        .ck-text strong { display:block; font-family:'Oswald',sans-serif; font-size:14px; font-weight:700; color:#fff; margin-bottom:4px; }
        .ck-text p { font-size:12.5px; color:rgba(255,255,255,0.55); line-height:1.6; margin:0; }
        .ck-text a { color:#FFC107; font-weight:600; text-underline-offset:2px; }
        .ck-text a:hover { color:#FFD54F; }
        .ck-btns { display:flex; gap:8px; flex-shrink:0; align-items:center; flex-wrap:wrap; }
        .ck-accept {
          background:linear-gradient(135deg,#FFC107,#D4A017); color:#071628;
          font-weight:700; font-size:13px; padding:9px 20px;
          border-radius:10px; border:none; cursor:pointer; white-space:nowrap;
          transition:all 0.22s; box-shadow:0 4px 14px rgba(255,193,7,0.28);
        }
        .ck-accept:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgba(255,193,7,0.48); }
        .ck-essential {
          background:transparent; color:rgba(255,255,255,0.6);
          font-weight:600; font-size:12px; padding:9px 14px;
          border-radius:10px; border:1px solid rgba(255,255,255,0.15);
          cursor:pointer; white-space:nowrap; transition:all 0.2s;
        }
        .ck-essential:hover { color:#fff; border-color:rgba(255,255,255,0.3); }
        .ck-settings-btn {
          background:none; border:none; color:rgba(255,255,255,0.35);
          font-size:11px; cursor:pointer; text-decoration:underline;
          text-underline-offset:2px; transition:color 0.2s; white-space:nowrap;
          font-family:'Outfit',sans-serif; padding:2px;
        }
        .ck-settings-btn:hover { color:rgba(255,255,255,0.7); }
        /* Settings panel */
        .ck-settings { border-top:1px solid rgba(255,255,255,0.07); padding:16px 22px 18px; }
        .ck-settings-title { font-size:11px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; color:rgba(255,255,255,0.4); margin-bottom:12px; }
        .ck-toggle-row { display:flex; align-items:center; justify-content:space-between; padding:8px 0; border-bottom:1px solid rgba(255,255,255,0.05); }
        .ck-toggle-row:last-child { border:none; }
        .ck-toggle-label { font-size:12.5px; color:rgba(255,255,255,0.75); }
        .ck-toggle-label span { display:block; font-size:11px; color:rgba(255,255,255,0.35); margin-top:1px; }
        .ck-pill {
          font-size:10px; font-weight:700; padding:3px 9px; border-radius:20px;
          background:rgba(255,193,7,0.12); color:#FFC107;
          border:1px solid rgba(255,193,7,0.25); white-space:nowrap;
        }
        .ck-pill.off { background:rgba(255,255,255,0.06); color:rgba(255,255,255,0.3); border-color:rgba(255,255,255,0.1); }
        /* Mobile */
        @media(max-width:600px) {
          .ck-banner { bottom:auto; top:0; left:0; transform:none; width:100%; border-radius:0 0 16px 16px; border-top:none; border-left:none; border-right:none; animation:cookieSlideDown 0.38s cubic-bezier(0.16,1,0.3,1) both; }
          .ck-main { flex-wrap:wrap; padding:14px 16px; gap:12px; }
          .ck-btns { width:100%; gap:8px; }
          .ck-accept,.ck-essential { flex:1; text-align:center; }
        }
      `}</style>

      <div className="ck-banner" role="dialog" aria-label="Cookie consent" aria-live="polite">
        <div className="ck-main">
          <span className="ck-icon">🍪</span>
          <div className="ck-text">
            <strong>We value your privacy</strong>
            <p>We use cookies to improve your experience. Tracking cookies only load with your consent.{' '}
              <Link href="/privacy">Privacy Policy</Link>.
            </p>
          </div>
          <div className="ck-btns">
            <button className="ck-accept" onClick={accept}>Accept All</button>
            <button className="ck-essential" onClick={acceptEssential}>Essential Only</button>
            <button className="ck-settings-btn" onClick={() => setView(v => v === 'banner' ? 'settings' : 'banner')}>
              {view === 'settings' ? 'Hide details ↑' : 'Manage ↓'}
            </button>
          </div>
        </div>

        {view === 'settings' && (
          <div className="ck-settings">
            <div className="ck-settings-title">Cookie Details</div>
            {[
              { label: 'Essential Cookies', desc: 'Session, preferences, security. Required to run the site.', on: true, required: true },
              { label: 'Analytics Cookies', desc: 'Help us understand how visitors use the site (e.g. Google Analytics).', on: false, required: false },
              { label: 'Marketing Cookies', desc: 'Used for targeted advertising and remarketing campaigns.', on: false, required: false },
            ].map((row, i) => (
              <div key={i} className="ck-toggle-row">
                <div className="ck-toggle-label">
                  {row.label}
                  <span>{row.desc}</span>
                </div>
                <span className={`ck-pill${row.on ? '' : ' off'}`}>
                  {row.required ? 'Always On' : row.on ? 'On' : 'Off'}
                </span>
              </div>
            ))}
            <div style={{ display:'flex', gap:8, marginTop:14, flexWrap:'wrap' }}>
              <button className="ck-accept" style={{ flex:1 }} onClick={accept}>Accept All Cookies</button>
              <button className="ck-essential" style={{ flex:1 }} onClick={decline}>Reject Non-Essential</button>
            </div>
          </div>
        )}
      </div>
    </>,
    document.body
  );
}
