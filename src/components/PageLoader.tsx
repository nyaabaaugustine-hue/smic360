'use client';
import React, { useEffect, useState, useRef } from 'react';

/* ─────────────────────────────────────────────────────────────────
   SMIC360 PAGE LOADER
   Innovative, ultra-lightweight (~1.2KB CSS, zero dependencies).

   Design concept: A cinematic "brand reveal" —
   The logo materialises from a particle scatter, a gold progress
   rail sweeps across the bottom, and the entire screen splits
   vertically (left panel slides left, right panel slides right)
   to reveal the page beneath — like opening a premium box.
   ───────────────────────────────────────────────────────────────── */

export default function PageLoader() {
  const [phase, setPhase] = useState<'loading' | 'done' | 'gone'>('loading');

  useEffect(() => {
    // Never block more than 2.8s even on slow connections
    const maxTimer = setTimeout(() => setPhase('done'), 2800);

    const onLoad = () => {
      clearTimeout(maxTimer);
      // Small grace period so the last animation frame settles
      setTimeout(() => setPhase('done'), 320);
    };

    if (document.readyState === 'complete') {
      onLoad();
    } else {
      window.addEventListener('load', onLoad, { once: true });
    }

    return () => {
      clearTimeout(maxTimer);
      window.removeEventListener('load', onLoad);
    };
  }, []);

  // After exit animation (~700ms), fully unmount from DOM
  useEffect(() => {
    if (phase === 'done') {
      const t = setTimeout(() => setPhase('gone'), 750);
      return () => clearTimeout(t);
    }
  }, [phase]);

  if (phase === 'gone') return null;

  return (
    <>
      <style>{`
        /* ── Base ─────────────────────────────────────────────── */
        #smic-loader {
          position: fixed;
          inset: 0;
          z-index: 2147483647;
          display: flex;
          pointer-events: all;
          overflow: hidden;
        }

        /* ── Left & Right curtain panels ─────────────────────── */
        .sl-panel {
          flex: 1;
          background: #040e1d;
          position: relative;
          transition: transform 0.72s cubic-bezier(0.76, 0, 0.24, 1);
          will-change: transform;
        }
        .sl-panel.left  { transform-origin: left center; }
        .sl-panel.right { transform-origin: right center; }

        /* Exit: panels slide away */
        #smic-loader.done .sl-panel.left  { transform: translateX(-100%); }
        #smic-loader.done .sl-panel.right { transform: translateX(100%); }

        /* ── Decorative grid overlay on left panel ────────────── */
        .sl-panel.left::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,193,7,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,193,7,0.04) 1px, transparent 1px);
          background-size: 48px 48px;
          animation: sl-grid-drift 6s linear infinite;
        }
        @keyframes sl-grid-drift {
          0%   { background-position: 0 0; }
          100% { background-position: 48px 48px; }
        }

        /* ── Radial glow right panel ──────────────────────────── */
        .sl-panel.right::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 80% 60% at 60% 50%,
              rgba(0,180,216,0.08) 0%,
              transparent 70%);
          animation: sl-glow 3s ease-in-out infinite alternate;
        }
        @keyframes sl-glow {
          from { opacity: 0.5; transform: scale(1); }
          to   { opacity: 1;   transform: scale(1.12); }
        }

        /* ── Centre stage (lives on top of both panels) ───────── */
        .sl-centre {
          position: fixed;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 2;
          pointer-events: none;
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        #smic-loader.done .sl-centre {
          opacity: 0;
          transform: scale(0.96);
        }

        /* ── Logo wrapper ─────────────────────────────────────── */
        .sl-logo-wrap {
          position: relative;
          width: 90px;
          height: 90px;
          margin-bottom: 28px;
          animation: sl-logo-in 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s both;
        }
        @keyframes sl-logo-in {
          from { opacity: 0; transform: scale(0.55) rotate(-8deg); }
          to   { opacity: 1; transform: scale(1) rotate(0deg); }
        }

        /* Spinning orbit ring */
        .sl-orbit {
          position: absolute;
          inset: -14px;
          border-radius: 50%;
          border: 1.5px solid transparent;
          border-top-color: #FFC107;
          border-right-color: rgba(255,193,7,0.3);
          animation: sl-spin 1.4s linear infinite;
        }
        .sl-orbit-2 {
          inset: -24px;
          border-top-color: rgba(0,180,216,0.5);
          border-right-color: transparent;
          border-bottom-color: rgba(0,180,216,0.2);
          animation-duration: 2.2s;
          animation-direction: reverse;
        }
        @keyframes sl-spin { to { transform: rotate(360deg); } }

        .sl-logo-img {
          width: 90px;
          height: 90px;
          border-radius: 18px;
          object-fit: contain;
          display: block;
          box-shadow: 0 12px 40px rgba(0,0,0,0.5),
                      0 0 0 2px rgba(255,193,7,0.2);
        }

        /* Gold dot pulse at logo centre */
        .sl-dot {
          position: absolute;
          bottom: -6px;
          right: -6px;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #FFC107;
          border: 2px solid #040e1d;
          animation: sl-dot-pulse 1.6s ease-in-out infinite;
        }
        @keyframes sl-dot-pulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(255,193,7,0.7); }
          50%      { box-shadow: 0 0 0 8px rgba(255,193,7,0); }
        }

        /* ── Brand text ───────────────────────────────────────── */
        .sl-brand {
          font-family: 'Oswald', sans-serif;
          font-size: 32px;
          font-weight: 700;
          color: #fff;
          letter-spacing: 4px;
          text-transform: uppercase;
          animation: sl-text-in 0.65s cubic-bezier(0.16,1,0.3,1) 0.28s both;
          position: relative;
        }
        /* Animated underline sweep */
        .sl-brand::after {
          content: '';
          position: absolute;
          bottom: -6px;
          left: 0;
          height: 2px;
          width: 0;
          background: linear-gradient(90deg, #FFC107, #00b4d8);
          border-radius: 2px;
          animation: sl-underline 0.7s ease 0.7s forwards;
        }
        @keyframes sl-underline { to { width: 100%; } }

        .sl-tagline {
          font-family: 'Outfit', sans-serif;
          font-size: 11px;
          font-weight: 600;
          color: rgba(255,255,255,0.38);
          letter-spacing: 2.8px;
          text-transform: uppercase;
          margin-top: 12px;
          animation: sl-text-in 0.65s cubic-bezier(0.16,1,0.3,1) 0.42s both;
        }
        @keyframes sl-text-in {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Three animated service pills ─────────────────────── */
        .sl-pills {
          display: flex;
          gap: 8px;
          margin-top: 32px;
          animation: sl-text-in 0.6s ease 0.58s both;
        }
        .sl-pill {
          font-family: 'Outfit', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          padding: 5px 13px;
          border-radius: 100px;
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.4);
          background: rgba(255,255,255,0.04);
          animation: sl-pill-cycle 3s ease-in-out infinite;
        }
        .sl-pill:nth-child(1) { animation-delay: 0s; }
        .sl-pill:nth-child(2) { animation-delay: 0.3s; }
        .sl-pill:nth-child(3) { animation-delay: 0.6s; }
        @keyframes sl-pill-cycle {
          0%,80%,100% {
            border-color: rgba(255,255,255,0.1);
            color: rgba(255,255,255,0.4);
            background: rgba(255,255,255,0.04);
          }
          40% {
            border-color: rgba(255,193,7,0.5);
            color: #FFC107;
            background: rgba(255,193,7,0.08);
          }
        }

        /* ── Bottom progress rail ─────────────────────────────── */
        .sl-progress-rail {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: rgba(255,255,255,0.06);
          z-index: 3;
          overflow: hidden;
          transition: opacity 0.35s;
        }
        #smic-loader.done .sl-progress-rail { opacity: 0; }

        .sl-progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #FFC107 0%, #00b4d8 50%, #FFC107 100%);
          background-size: 200% 100%;
          border-radius: 2px;
          animation:
            sl-progress 2.4s cubic-bezier(0.4,0,0.2,1) forwards,
            sl-shimmer  1.2s linear infinite;
        }
        @keyframes sl-progress {
          0%   { width: 0%;    opacity: 1; }
          70%  { width: 85%;   opacity: 1; }
          90%  { width: 95%;   opacity: 1; }
          100% { width: 100%;  opacity: 0; }
        }
        @keyframes sl-shimmer {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }

        /* ── Corner accents ───────────────────────────────────── */
        .sl-corner {
          position: fixed;
          width: 40px;
          height: 40px;
          z-index: 3;
          animation: sl-text-in 0.5s ease 0.2s both;
          transition: opacity 0.35s;
        }
        #smic-loader.done .sl-corner { opacity: 0; }
        .sl-corner.tl { top: 20px;    left: 20px;    border-top: 2px solid rgba(255,193,7,0.5);  border-left: 2px solid rgba(255,193,7,0.5); }
        .sl-corner.tr { top: 20px;    right: 20px;   border-top: 2px solid rgba(0,180,216,0.4);  border-right: 2px solid rgba(0,180,216,0.4); }
        .sl-corner.bl { bottom: 12px; left: 20px;    border-bottom: 2px solid rgba(255,193,7,0.3);border-left: 2px solid rgba(255,193,7,0.3); }
        .sl-corner.br { bottom: 12px; right: 20px;   border-bottom: 2px solid rgba(0,180,216,0.3);border-right: 2px solid rgba(0,180,216,0.3); }

        /* ── Ghana flag colour strip (subtle) ─────────────────── */
        .sl-ghana-strip {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg,
            #006B3F 0%, #006B3F 33.3%,
            #FCD116 33.3%, #FCD116 66.6%,
            #CE1126 66.6%, #CE1126 100%
          );
          z-index: 3;
          opacity: 0.55;
          transition: opacity 0.35s;
        }
        #smic-loader.done .sl-ghana-strip { opacity: 0; }

        /* ── Responsive ───────────────────────────────────────── */
        @media (max-width: 480px) {
          .sl-logo-wrap { width: 72px; height: 72px; margin-bottom: 22px; }
          .sl-logo-img  { width: 72px; height: 72px; border-radius: 14px; }
          .sl-brand     { font-size: 26px; letter-spacing: 3px; }
          .sl-pills     { gap: 6px; }
          .sl-pill      { font-size: 9px; padding: 4px 10px; }
        }
      `}</style>

      {/* ── Ghana strip ── */}
      <div id="smic-loader" className={phase === 'done' ? 'done' : ''}>
        <div className="sl-ghana-strip" />

        {/* Left curtain */}
        <div className="sl-panel left" />

        {/* Right curtain */}
        <div className="sl-panel right" />

        {/* Centre content */}
        <div className="sl-centre">
          {/* Logo */}
          <div className="sl-logo-wrap">
            <div className="sl-orbit" />
            <div className="sl-orbit sl-orbit-2" />
            <img
              className="sl-logo-img"
              src="https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777107241/cropped-SMIC-01-180x180_pffxe7.jpg"
              alt="SMIC360"
              width={90}
              height={90}
            />
            <div className="sl-dot" />
          </div>

          {/* Brand name */}
          <div className="sl-brand">SMIC360</div>
          <div className="sl-tagline">Building Foundations · Branding Futures</div>

          {/* Service pills */}
          <div className="sl-pills">
            <div className="sl-pill">Marketing</div>
            <div className="sl-pill">Real Estate</div>
            <div className="sl-pill">Procurement</div>
          </div>
        </div>

        {/* Progress rail */}
        <div className="sl-progress-rail">
          <div className="sl-progress-bar" />
        </div>

        {/* Corner brackets */}
        <div className="sl-corner tl" />
        <div className="sl-corner tr" />
        <div className="sl-corner bl" />
        <div className="sl-corner br" />
      </div>
    </>
  );
}
