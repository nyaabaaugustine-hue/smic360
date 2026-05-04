'use client';
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

/* ─── All souvenir / branding media ─────────────────────────── */
const ITEMS = [
  { type: 'image', src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777865846/WhatsApp_Image_2026-05-03_at_7.46.17_PM_1_hqdwyn.jpg',  alt: 'Branded Souvenir — Caps' },
  { type: 'image', src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777865846/WhatsApp_Image_2026-05-03_at_7.46.17_PM_2_sdh2bk.jpg',  alt: 'Branded Souvenir — Mugs' },
  { type: 'image', src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777865846/WhatsApp_Image_2026-05-03_at_7.46.18_PM_iyx0a0.jpg',  alt: 'Branded Souvenir — Bags' },
  { type: 'image', src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777865846/WhatsApp_Image_2026-05-03_at_7.41.12_PM_3_udwvxo.jpg', alt: 'Branded Souvenir — Pens & Stationery' },
  { type: 'image', src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777865846/WhatsApp_Image_2026-05-03_at_7.46.17_PM_kaqdd8.jpg',  alt: 'Branded Souvenir — T-Shirts' },
  { type: 'image', src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777865847/WhatsApp_Image_2026-05-03_at_7.41.12_PM_2_pvcfxj.jpg', alt: 'Branded Souvenir — Notepads' },
  { type: 'image', src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777865847/WhatsApp_Image_2026-05-03_at_7.41.12_PM_1_fztiyx.jpg', alt: 'Branded Souvenir — Umbrella' },
  { type: 'image', src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777865848/WhatsApp_Image_2026-05-03_at_7.35.56_PM_hcyd4u.jpg', alt: 'Branded Souvenir — Corporate Gifts' },
  { type: 'image', src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777865848/WhatsApp_Image_2026-05-03_at_7.37.37_PM_awmm8c.jpg', alt: 'Branded Souvenir — Keyrings' },
  { type: 'image', src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777865848/WhatsApp_Image_2026-05-03_at_7.34.42_PM_wmgzu5.jpg', alt: 'Branded Souvenir — Packaging' },
  { type: 'image', src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777865848/WhatsApp_Image_2026-05-03_at_7.34.08_PM_1_rkkyk2.jpg', alt: 'Branded Souvenir — Collection' },
] as const;

/* ─── Lightbox ─────────────────────────────────────────────── */
function Lightbox({
  index,
  onClose,
}: {
  index: number;
  onClose: () => void;
}) {
  const [cur, setCur] = useState(index);
  const [mounted, setMounted] = useState(false);
  const total = ITEMS.length;

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape')      onClose();
      if (e.key === 'ArrowRight')  setCur(c => (c + 1) % total);
      if (e.key === 'ArrowLeft')   setCur(c => (c - 1 + total) % total);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [total, onClose]);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.style.overflow = 'hidden';
    return () => { document.documentElement.style.overflow = ''; };
  }, [mounted]);

  if (!mounted) return null;

  const item = ITEMS[cur];

  return createPortal(
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(4,14,29,0.97)',
        zIndex: 999999,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px',
      }}
    >
      <style>{`
        @keyframes lbPop { from{opacity:0;transform:scale(0.93)} to{opacity:1;transform:none} }
        .lb-btn {
          position: absolute; top: 50%; transform: translateY(-50%);
          width: 48px; height: 48px; border-radius: 50%;
          background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2);
          color: #fff; font-size: 22px; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s; z-index: 2;
        }
        .lb-btn:hover { background: rgba(255,255,255,0.22); }
        .lb-close {
          position: absolute; top: 18px; right: 18px;
          width: 40px; height: 40px; border-radius: 50%;
          background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2);
          color: #fff; font-size: 18px; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s; z-index: 3;
        }
        .lb-close:hover { background: rgba(220,38,38,0.7); }
      `}</style>

      {/* Close */}
      <button className="lb-close" onClick={onClose} type="button">✕</button>

      {/* Prev */}
      <button className="lb-btn" style={{ left: 16 }} type="button"
        onClick={e => { e.stopPropagation(); setCur(c => (c - 1 + total) % total); }}>‹</button>

      {/* Media */}
      <div onClick={e => e.stopPropagation()} style={{ maxWidth: '88vw', maxHeight: '82vh', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
        <img
          key={cur}
          src={item.src}
          alt={item.alt}
          style={{ maxWidth: '100%', maxHeight: '72vh', objectFit: 'contain', borderRadius: 14, boxShadow: '0 32px 80px rgba(0,0,0,0.7)', animation: 'lbPop 0.26s ease both' }}
        />
        <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, fontWeight: 600 }}>{item.alt}</div>
      </div>

      {/* Next */}
      <button className="lb-btn" style={{ right: 16 }} type="button"
        onClick={e => { e.stopPropagation(); setCur(c => (c + 1) % total); }}>›</button>

      {/* Counter */}
      <div style={{ position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', padding: '5px 16px', borderRadius: 20, fontSize: 12.5, fontWeight: 600 }}>
        {cur + 1} / {total}
      </div>

      {/* Dot strip */}
      <div style={{ position: 'absolute', bottom: 56, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 6 }}>
        {ITEMS.map((_, i) => (
          <button key={i} type="button"
            onClick={e => { e.stopPropagation(); setCur(i); }}
            style={{ width: i === cur ? 20 : 7, height: 7, borderRadius: 4, background: i === cur ? '#FFC107' : 'rgba(255,255,255,0.28)', border: 'none', cursor: 'pointer', transition: 'all 0.22s', padding: 0 }}
          />
        ))}
      </div>
    </div>,
    document.body
  );
}

/* ─── Main Component ────────────────────────────────────────── */
export default function BrandingGallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [hovered, setHovered]   = useState<number | null>(null);

  /* Masonry-style layout: first item is wide (spans 2 cols) */
  const featured = ITEMS[0];
  const rest     = ITEMS.slice(1);

  return (
    <>
      {lightbox !== null && <Lightbox index={lightbox} onClose={() => setLightbox(null)} />}

      <section style={{ padding: '88px 0', background: '#f6f8fd', borderTop: '1px solid #dce8f7' }}>
        <style>{`
          .bg-section-header { text-align: center; margin-bottom: 52px; }
          .bg-grid {
            display: grid;
            grid-template-columns: 2fr 1fr 1fr;
            grid-template-rows: 260px 200px 200px;
            gap: 12px;
          }
          .bg-featured {
            grid-column: 1;
            grid-row: 1 / 3;
          }
          .bg-cell {
            position: relative; overflow: hidden; border-radius: 14px;
            cursor: pointer; background: #e8eff8;
          }
          .bg-cell img {
            width: 100%; height: 100%;
            object-fit: cover; display: block;
            transition: transform 0.48s ease;
          }
          .bg-cell:hover img { transform: scale(1.08); }
          .bg-overlay {
            position: absolute; inset: 0;
            background: rgba(4,14,29,0);
            transition: background 0.3s;
            display: flex; align-items: center; justify-content: center;
          }
          .bg-cell:hover .bg-overlay {
            background: rgba(4,14,29,0.32);
          }
          .bg-zoom-icon {
            width: 44px; height: 44px; border-radius: 50%;
            background: rgba(255,255,255,0.18); backdrop-filter: blur(8px);
            border: 1.5px solid rgba(255,255,255,0.3);
            display: flex; align-items: center; justify-content: center;
            color: #fff; font-size: 18px;
            opacity: 0; transform: scale(0.7);
            transition: opacity 0.25s, transform 0.25s;
          }
          .bg-cell:hover .bg-zoom-icon { opacity: 1; transform: scale(1); }
          .bg-label {
            position: absolute; bottom: 0; left: 0; right: 0;
            padding: 10px 14px;
            background: linear-gradient(to top, rgba(4,14,29,0.72), transparent);
            color: rgba(255,255,255,0.85);
            font-size: 11.5px; font-weight: 600;
            opacity: 0; transition: opacity 0.25s;
          }
          .bg-cell:hover .bg-label { opacity: 1; }

          /* Thumbnail strip below grid */
          .bg-strip {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 10px;
            margin-top: 12px;
          }
          .bg-strip-cell {
            height: 90px; border-radius: 10px;
            overflow: hidden; cursor: pointer; position: relative;
            background: #e8eff8;
          }
          .bg-strip-cell img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.38s; }
          .bg-strip-cell:hover img { transform: scale(1.1); }
          .bg-strip-cell::after {
            content: ''; position: absolute; inset: 0;
            background: rgba(4,14,29,0); transition: background 0.2s; border-radius: 10px;
          }
          .bg-strip-cell:hover::after { background: rgba(4,14,29,0.2); }

          /* Stats row */
          .bg-stats {
            display: grid; grid-template-columns: repeat(4, 1fr);
            gap: 16px; margin-top: 44px;
          }
          .bg-stat {
            background: #fff; border: 1.5px solid #dce8f7;
            border-radius: 16px; padding: 20px 16px; text-align: center;
            transition: all 0.22s;
          }
          .bg-stat:hover { border-color: #FFC107; transform: translateY(-3px); box-shadow: 0 8px 24px rgba(255,193,7,0.12); }
          .bg-stat-val { font-family: 'Oswald', sans-serif; font-size: 30px; font-weight: 700; color: #071628; line-height: 1; }
          .bg-stat-label { font-size: 11px; color: #5a7186; text-transform: uppercase; letter-spacing: 0.8px; font-weight: 600; margin-top: 6px; }

          /* Mobile */
          @media(max-width: 900px) {
            .bg-grid {
              grid-template-columns: 1fr 1fr;
              grid-template-rows: 200px 200px 200px 200px;
            }
            .bg-featured { grid-column: 1 / 3; grid-row: 1; }
            .bg-stats { grid-template-columns: repeat(2,1fr); }
          }
          @media(max-width: 580px) {
            .bg-grid {
              grid-template-columns: 1fr 1fr;
              grid-template-rows: 160px 140px 140px 140px;
            }
            .bg-strip { grid-template-columns: repeat(3,1fr); }
            .bg-strip-cell { height: 72px; }
            .bg-stats { grid-template-columns: repeat(2,1fr); }
          }
        `}</style>

        <div className="wrap">

          {/* Header */}
          <div className="bg-section-header reveal">
            <span className="tag" style={{ justifyContent: 'center' }}>Our Work in Action</span>
            <h2 className="section-title">Branded <em>Souvenirs & Merchandise</em></h2>
            <p className="section-sub" style={{ textAlign: 'center', margin: '10px auto 0', maxWidth: 580 }}>
              From corporate gifts to branded merchandise — we produce high-quality souvenirs that keep your brand front of mind long after the event.
            </p>
          </div>

          {/* Main masonry grid — first 6 items */}
          <div className="bg-grid reveal">
            {/* Featured (large) */}
            <div
              className="bg-cell bg-featured"
              onClick={() => setLightbox(0)}
            >
              <img src={featured.src} alt={featured.alt} loading="lazy" />
              <div className="bg-overlay">
                <div className="bg-zoom-icon">⤢</div>
              </div>
              <div className="bg-label">{featured.alt}</div>
            </div>

            {/* Next 5 cells */}
            {rest.slice(0, 5).map((item, i) => (
              <div
                key={i}
                className="bg-cell"
                onClick={() => setLightbox(i + 1)}
                onMouseEnter={() => setHovered(i + 1)}
                onMouseLeave={() => setHovered(null)}
              >
                <img src={item.src} alt={item.alt} loading="lazy" />
                <div className="bg-overlay">
                  <div className="bg-zoom-icon">⤢</div>
                </div>
                <div className="bg-label">{item.alt}</div>
                {/* "View All" overlay on last visible cell */}
                {i === 4 && ITEMS.length > 6 && (
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'rgba(4,14,29,0.6)',
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    borderRadius: 14,
                  }}>
                    <div style={{ color: '#fff', fontFamily: "'Oswald',sans-serif", fontSize: 26, fontWeight: 700 }}>
                      +{ITEMS.length - 6}
                    </div>
                    <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, fontWeight: 600, marginTop: 4 }}>
                      More Photos
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Thumbnail strip — remaining items */}
          <div className="bg-strip stagger">
            {rest.slice(5).map((item, i) => (
              <div
                key={i}
                className="bg-strip-cell"
                onClick={() => setLightbox(i + 6)}
                title={item.alt}
              >
                <img src={item.src} alt={item.alt} loading="lazy" />
              </div>
            ))}
            {/* "View All" tile */}
            <div
              className="bg-strip-cell"
              onClick={() => setLightbox(0)}
              style={{ background: 'linear-gradient(135deg,#040e1d,#0b2d56)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4 }}
            >
              <span style={{ fontSize: 20 }}>🖼️</span>
              <span style={{ color: '#FFC107', fontSize: 11, fontWeight: 700, textAlign: 'center', lineHeight: 1.3 }}>View All<br />Photos</span>
            </div>
          </div>

          {/* Stats row */}
          <div className="bg-stats reveal">
            {[
              { val: '500+', label: 'Souvenir Types' },
              { val: '100%', label: 'Custom Branded' },
              { val: '48hrs', label: 'Express Delivery' },
              { val: '80+',  label: 'Corporate Clients' },
            ].map((s, i) => (
              <div key={i} className="bg-stat">
                <div className="bg-stat-val">{s.val}</div>
                <div className="bg-stat-label">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="reveal" style={{ marginTop: 44, background: 'linear-gradient(135deg,#040e1d 0%,#0b2d56 55%,#1261c0 100%)', borderRadius: 22, padding: '44px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap', position: 'relative', overflow: 'hidden', boxShadow: '0 20px 60px rgba(4,14,29,0.2)' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg,#FFC107,#00b4d8,#FFC107)' }} />
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,180,216,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,180,216,0.04) 1px,transparent 1px)', backgroundSize: '48px 48px', pointerEvents: 'none' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', color: '#00b4d8', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ display: 'block', width: 20, height: 2, background: '#00b4d8', borderRadius: 2 }} />
                Order Your Branded Merchandise
              </div>
              <h3 style={{ fontFamily: "'Oswald',sans-serif", fontSize: 'clamp(20px,3vw,30px)', fontWeight: 700, color: '#fff', margin: 0, lineHeight: 1.1 }}>
                Make Your Brand <em style={{ fontStyle: 'normal', color: '#FFC107' }}>Unforgettable</em>
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, marginTop: 8, maxWidth: 420, lineHeight: 1.7 }}>
                Caps, T-shirts, mugs, bags, pens, notepads and 500+ more — all custom-branded and delivered fast.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
              <button
                onClick={() => setLightbox(0)}
                style={{ padding: '12px 24px', background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1.5px solid rgba(255,255,255,0.28)', borderRadius: 11, fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: 13.5, cursor: 'pointer', transition: 'all 0.22s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.18)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.1)'; }}
              >
                Browse Gallery ↗
              </button>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
