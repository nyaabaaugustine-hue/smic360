'use client';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { createPortal } from 'react-dom';
import Topbar from '@/components/Topbar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';
import ChatPanel from '@/components/ChatPanel';
import ScrollReveal from '@/components/ScrollReveal';

/* ─────────────────────────────────────────────────────────────────
   GALLERY DATA — 30 images (all live)
   ───────────────────────────────────────────────────────────────── */
const galleryImages = [
  /* ── Batch 1: Original 19 images ──────────────────────────── */
  { src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777740050/IMG_9282_wurlft.jpg',  caption: 'Main Entrance Gate',      tag: 'Exterior', featured: true  },
  { src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777740050/IMG_9269_dwamrt.jpg',  caption: 'Estate Overview',         tag: 'Aerial',   featured: true  },
  { src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777740051/IMG_9274_ycespr.jpg',  caption: 'Residential Units',       tag: 'Exterior', featured: false },
  { src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777740054/IMG_9272_mq8wja.jpg',  caption: 'Landscaped Gardens',      tag: 'Grounds',  featured: false },
  { src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777740059/IMG_9276_yv0mxx.jpg',  caption: 'Interior Living Room',    tag: 'Interior', featured: true  },
  { src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777740085/IMG_9270_gd8psk.jpg',  caption: 'Master Bedroom',          tag: 'Interior', featured: false },
  { src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777740094/IMG_9280_idqvkd.jpg',  caption: 'Modern Kitchen',          tag: 'Interior', featured: false },
  { src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777740095/IMG_9283_pzuadx.jpg',  caption: 'Dining Area',             tag: 'Interior', featured: false },
  { src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777740100/IMG_9286_c23rad.jpg',  caption: 'Bathroom & Finishes',     tag: 'Interior', featured: false },
  { src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777740108/IMG_9277_xtj3z6.jpg',  caption: 'Front Façade',            tag: 'Exterior', featured: true  },
  { src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777740116/IMG_9287_wfqkka.jpg',  caption: 'Private Parking',         tag: 'Grounds',  featured: false },
  { src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777740121/IMG_9296_fudrfg.jpg',  caption: 'Street View',             tag: 'Exterior', featured: false },
  { src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777740127/IMG_9290_sukybv.jpg',  caption: 'Community Area',          tag: 'Grounds',  featured: false },
  { src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777740131/IMG_9292_wfk4t7.jpg',  caption: 'Side Garden',             tag: 'Grounds',  featured: false },
  { src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777740132/IMG_9291_rmaxrk.jpg',  caption: 'Rear Exterior View',      tag: 'Exterior', featured: false },
  { src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777740133/IMG_9289_ppuvp4.jpg',  caption: 'Building Details',        tag: 'Exterior', featured: false },
  { src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777740134/IMG_9300_usbzke.jpg',  caption: 'Utility Infrastructure',  tag: 'Grounds',  featured: false },
  { src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777740134/IMG_9278_xnlknf.jpg',  caption: 'Evening Ambience',        tag: 'Exterior', featured: true  },
  { src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777740139/IMG_9304_orvwtw.jpg',  caption: 'Construction Quality',    tag: 'Exterior', featured: false },

  /* ── Batch 2: New 11 images (uploaded 2 May 2026) ─────────── */
  { src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777742699/1_1_csmex3.jpg',       caption: 'Estate Road & Pathway',   tag: 'Exterior', featured: false },
  { src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777742700/1_2_nciwfs.jpg',       caption: 'Property Frontage',       tag: 'Exterior', featured: false },
  { src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777742700/1_3_joxw7a.jpg',       caption: 'Block Layout & Access',   tag: 'Exterior', featured: false },
  { src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777742700/1_4_qkl1ss.jpg',       caption: 'Exterior Elevation',      tag: 'Exterior', featured: false },
  { src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777742701/1_5_ckfuae.jpg',       caption: 'Perimeter Wall & Gate',   tag: 'Exterior', featured: true  },
  { src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777742700/1_6_wrnqmu.jpg',       caption: 'Compound Overview',       tag: 'Grounds',  featured: false },
  { src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777742702/1_7_bncntq.jpg',       caption: 'Unit Interior Detail',    tag: 'Interior', featured: false },
  { src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777742701/1_8_snv3sb.jpg',       caption: 'Interior Finish Detail',  tag: 'Interior', featured: false },
  { src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777742702/1_9_dipy6a.jpg',       caption: 'Site Landscape',          tag: 'Grounds',  featured: false },
  { src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777742702/1_10_a6l5s3.jpg',      caption: 'Living Space Interior',   tag: 'Interior', featured: false },
  { src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777773928/backkk_mbfzyh.jpg',    caption: 'Full Estate Panorama',    tag: 'Aerial',   featured: true  },
];

const TAGS = [
  { label: 'All',      icon: '🏠' },
  { label: 'Exterior', icon: '🏗️' },
  { label: 'Interior', icon: '🛋️' },
  { label: 'Grounds',  icon: '🌿' },
  { label: 'Aerial',   icon: '🚁' },
];

/* ─────────────────────────────────────────────────────────────────
   LIGHTBOX
   ───────────────────────────────────────────────────────────────── */
function Lightbox({ images, index, onClose, onPrev, onNext, onJump }: {
  images: typeof galleryImages;
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onJump: (i: number) => void;
}) {
  const [mounted, setMounted] = useState(false);
  const [loaded, setLoaded]   = useState(false);
  const thumbRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    setLoaded(false);
    setTimeout(() => {
      const el = thumbRef.current?.querySelector<HTMLElement>('.lb-ta');
      el?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }, 80);
  }, [index]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'Escape')     onClose();
      if (e.key === 'ArrowLeft')  onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';
    return () => { document.documentElement.style.overflow = ''; };
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div style={{ position:'fixed', inset:0, zIndex:999999, background:'rgba(2,6,18,0.98)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }} onClick={onClose}>
      <style>{`
        @keyframes lbIn{from{opacity:0;transform:scale(.94)}to{opacity:1;transform:none}}
        @keyframes lbSpin{to{transform:rotate(360deg)}}
        .lb-img-anim{animation:lbIn .28s cubic-bezier(.16,1,.3,1)}
        .lb-nav{position:fixed;top:50%;transform:translateY(-50%);width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,.08);border:1.5px solid rgba(255,255,255,.18);color:#fff;font-size:24px;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .22s;backdrop-filter:blur(10px);z-index:2}
        .lb-nav:hover{background:rgba(255,193,7,.9);border-color:transparent;color:#071628;transform:translateY(-50%) scale(1.1)}
        .lb-prev{left:20px}.lb-next{right:20px}
        .lb-thumbs{display:flex;gap:8px;overflow-x:auto;padding:0 20px;scrollbar-width:none;max-width:100vw}
        .lb-thumbs::-webkit-scrollbar{display:none}
        .lb-th{width:58px;height:42px;border-radius:6px;overflow:hidden;cursor:pointer;flex-shrink:0;border:2.5px solid transparent;transition:all .2s;opacity:.5}
        .lb-th:hover{opacity:.85;transform:scale(1.07)}
        .lb-ta{border-color:#FFC107!important;opacity:1!important}
        .lb-th img{width:100%;height:100%;object-fit:cover;display:block}
        @media(max-width:600px){.lb-nav{width:38px;height:38px;font-size:18px}.lb-prev{left:6px}.lb-next{right:6px}.lb-th{width:44px;height:32px}}
      `}</style>

      {/* Top bar */}
      <div style={{position:'fixed',top:0,left:0,right:0,zIndex:3,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'14px 20px',background:'linear-gradient(to bottom,rgba(2,6,18,.9),transparent)'}} onClick={e=>e.stopPropagation()}>
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <div style={{width:34,height:34,borderRadius:'50%',background:'rgba(255,193,7,.15)',border:'1.5px solid rgba(255,193,7,.35)',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <span style={{fontSize:14}}>🏠</span>
          </div>
          <div>
            <div style={{fontFamily:"'Oswald',sans-serif",fontSize:13,fontWeight:700,color:'#fff',lineHeight:1.1}}>The Phoenix Enclave</div>
            <div style={{fontSize:11,color:'rgba(255,255,255,.45)',marginTop:1}}>Photo {index+1} of {images.length}</div>
          </div>
        </div>
        <button type="button" onClick={onClose} style={{width:38,height:38,borderRadius:'50%',background:'rgba(255,255,255,.08)',border:'1.5px solid rgba(255,255,255,.15)',color:'#fff',fontSize:16,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',transition:'background .2s'}} onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.background='rgba(220,38,38,.65)'}} onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.background='rgba(255,255,255,.08)'}}>✕</button>
      </div>

      {/* Nav */}
      <button type="button" className="lb-nav lb-prev" onClick={e=>{e.stopPropagation();onPrev()}} aria-label="Previous">‹</button>
      <button type="button" className="lb-nav lb-next" onClick={e=>{e.stopPropagation();onNext()}} aria-label="Next">›</button>

      {/* Image */}
      <div className="lb-img-anim" key={index} onClick={e=>e.stopPropagation()} style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',width:'100%',padding:'60px 70px 0',boxSizing:'border-box',overflow:'hidden'}}>
        {!loaded && (
          <div style={{display:'flex',alignItems:'center',justifyContent:'center',width:'100%',minHeight:'40vh'}}>
            <div style={{width:42,height:42,borderRadius:'50%',border:'3px solid rgba(255,193,7,.2)',borderTopColor:'#FFC107',animation:'lbSpin .7s linear infinite'}}/>
          </div>
        )}
        <img src={images[index].src} alt={images[index].caption} onLoad={()=>setLoaded(true)}
          style={{maxWidth:'100%',maxHeight:'72vh',objectFit:'contain',borderRadius:10,display:loaded?'block':'none',boxShadow:'0 40px 120px rgba(0,0,0,.85)'}}
        />
      </div>

      {/* Caption */}
      {loaded && (
        <div onClick={e=>e.stopPropagation()} style={{padding:'14px 20px 8px',textAlign:'center',flexShrink:0}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:8,background:'rgba(255,193,7,.1)',border:'1px solid rgba(255,193,7,.25)',borderRadius:100,padding:'4px 14px',marginBottom:6}}>
            <span style={{fontSize:9,fontWeight:700,letterSpacing:'1.8px',textTransform:'uppercase',color:'#FFC107'}}>{images[index].tag}</span>
          </div>
          <div style={{fontFamily:"'Oswald',sans-serif",fontSize:17,fontWeight:700,color:'#fff'}}>{images[index].caption}</div>
        </div>
      )}

      {/* Thumbnail strip */}
      <div ref={thumbRef} className="lb-thumbs" onClick={e=>e.stopPropagation()} style={{paddingBottom:16,paddingTop:8,flexShrink:0}}>
        {images.map((img, i) => (
          <div key={i} className={`lb-th${i===index?' lb-ta':''}`} onClick={()=>onJump(i)}>
            <img src={img.src} alt={img.caption} />
          </div>
        ))}
      </div>
    </div>,
    document.body
  );
}

/* ─────────────────────────────────────────────────────────────────
   PAGE
   ───────────────────────────────────────────────────────────────── */
export default function PhoenixEnclavePage() {
  const [bookOpen, setBookOpen]   = useState(false);
  const [activeTag, setActiveTag] = useState('All');
  const [lightbox, setLightbox]   = useState<number | null>(null);

  const filtered = activeTag === 'All'
    ? galleryImages
    : galleryImages.filter(i => i.tag === activeTag);

  const closeLb  = useCallback(() => setLightbox(null), []);
  const prevImg  = useCallback(() => setLightbox(i => i !== null ? (i-1+filtered.length)%filtered.length : null), [filtered.length]);
  const nextImg  = useCallback(() => setLightbox(i => i !== null ? (i+1)%filtered.length : null), [filtered.length]);
  const jumpImg  = useCallback((i: number) => setLightbox(i), []);

  return (
    <>
      <style>{`
        .enc-filters{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin-bottom:48px}
        .enc-fb{display:inline-flex;align-items:center;gap:7px;padding:10px 22px;border-radius:100px;font-size:13px;font-weight:700;cursor:pointer;transition:all .22s;border:1.5px solid rgba(7,22,40,.1);background:#fff;color:#5a7186;font-family:'Outfit',sans-serif;box-shadow:0 2px 8px rgba(7,22,40,.06)}
        .enc-fb:hover{border-color:var(--gold);color:var(--gold-d);box-shadow:0 4px 16px rgba(212,160,23,.15)}
        .enc-fb.active{background:var(--navy);color:#FFC107;border-color:var(--navy);box-shadow:0 6px 22px rgba(7,22,40,.28)}
        .enc-fc{font-size:10px;font-weight:400;opacity:.6}

        /* Masonry */
        .enc-grid{columns:4;column-gap:14px}
        .enc-item{break-inside:avoid;margin-bottom:14px;border-radius:14px;overflow:hidden;position:relative;cursor:pointer;display:block;box-shadow:0 4px 18px rgba(7,22,40,.1);transition:box-shadow .32s,transform .32s}
        .enc-item:hover{box-shadow:0 22px 55px rgba(7,22,40,.22);transform:translateY(-3px);z-index:2}
        .enc-item img{width:100%;height:auto;display:block;transition:transform .6s cubic-bezier(.16,1,.3,1)}
        .enc-item:hover img{transform:scale(1.06)}
        .enc-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(7,22,40,.92) 0%,rgba(7,22,40,.18) 50%,rgba(0,0,0,.04) 100%);border-radius:14px;opacity:0;transition:opacity .28s;display:flex;flex-direction:column;justify-content:flex-end;padding:16px 14px}
        .enc-item:hover .enc-overlay{opacity:1}
        .enc-tag-b{font-size:9px;font-weight:800;letter-spacing:1.8px;text-transform:uppercase;color:#FFC107;margin-bottom:5px}
        .enc-cap{font-family:'Oswald',sans-serif;font-size:14px;font-weight:700;color:#fff;line-height:1.2}
        .enc-zoom{position:absolute;top:10px;right:10px;width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,.14);border:1.5px solid rgba(255,255,255,.28);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;color:#fff;font-size:15px;opacity:0;transition:opacity .22s,transform .22s;transform:scale(.8)}
        .enc-item:hover .enc-zoom{opacity:1;transform:scale(1)}
        .enc-feat{position:absolute;top:10px;left:10px;background:linear-gradient(135deg,#FFC107,#D4A017);color:#071628;font-size:9px;font-weight:800;letter-spacing:1.2px;text-transform:uppercase;padding:3px 10px;border-radius:100px;box-shadow:0 2px 10px rgba(255,193,7,.4)}

        /* Hero row */
        .enc-hero-row{display:grid;grid-template-columns:1.6fr 1fr;gap:14px;margin-bottom:14px}
        .enc-hi{border-radius:18px;overflow:hidden;position:relative;cursor:pointer;box-shadow:0 8px 32px rgba(7,22,40,.14);transition:box-shadow .32s,transform .32s}
        .enc-hi:hover{box-shadow:0 24px 60px rgba(7,22,40,.22);transform:translateY(-4px)}
        .enc-hi img{width:100%;height:340px;object-fit:cover;display:block;transition:transform .6s cubic-bezier(.16,1,.3,1)}
        .enc-hi:hover img{transform:scale(1.05)}
        .enc-ho{position:absolute;inset:0;background:linear-gradient(to top,rgba(7,22,40,.88) 0%,transparent 55%);border-radius:18px;display:flex;flex-direction:column;justify-content:flex-end;padding:22px 20px}
        .enc-ht{font-size:9px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:#FFC107;margin-bottom:6px}
        .enc-hc{font-family:'Oswald',sans-serif;font-size:20px;font-weight:700;color:#fff;line-height:1.2}
        .enc-hz{position:absolute;top:14px;right:14px;width:40px;height:40px;border-radius:50%;background:rgba(255,255,255,.15);border:1.5px solid rgba(255,255,255,.3);backdrop-filter:blur(10px);display:flex;align-items:center;justify-content:center;color:#fff;font-size:17px;opacity:0;transition:opacity .22s,transform .22s;transform:scale(.8)}
        .enc-hi:hover .enc-hz{opacity:1;transform:scale(1)}

        .enc-cs{display:flex;align-items:center;justify-content:space-between;margin-bottom:32px;flex-wrap:wrap;gap:12px}
        .enc-ct{font-size:13px;color:var(--muted);font-weight:600}
        .enc-ct strong{color:var(--navy)}

        @media(max-width:1100px){.enc-grid{columns:3}.enc-hi img{height:260px}}
        @media(max-width:768px){.enc-grid{columns:2}.enc-hero-row{grid-template-columns:1fr}.enc-hi img{height:220px}}
        @media(max-width:420px){.enc-grid{columns:1}}
      `}</style>

      <ScrollReveal />
      <Topbar />
      <Navbar onBookClick={() => setBookOpen(true)} />
      <BookingModal isOpen={bookOpen} onClose={() => setBookOpen(false)} />
      {lightbox !== null && (
        <Lightbox images={filtered} index={lightbox} onClose={closeLb} onPrev={prevImg} onNext={nextImg} onJump={jumpImg} />
      )}

      {/* ── Hero ── */}
      <div className="page-hero">
        <div className="page-hero-inner">
          <div className="page-hero-tag">Flagship Real Estate Development</div>
          <h1>The Phoenix <em>Enclave</em></h1>
          <p>A modern gated community designed for comfort, security, and long-term value — right in the heart of Greater Accra.</p>
        </div>
      </div>

      {/* ── Overview ── */}
      <section style={{ padding: '90px 0', background: 'var(--white)' }}>
        <div className="wrap">
          <div className="solutions-section-grid reveal">
            <div>
              <span className="tag">About The Development</span>
              <h2 className="section-title">Built for <em>Modern Living</em></h2>
              <p className="section-sub">
                The Phoenix Enclave is SMIC360&apos;s premier real estate offering — a thoughtfully designed
                mini gated community offering residential and commercial spaces built with modern
                architecture, premium finishes, and a focus on long-term value for homeowners and investors.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '24px' }}>
                {['Gated & Secured 24/7','Modern Architecture','Prime Accra Location','Premium Finishes','Investment-Grade ROI','Smart Home Ready'].map((item, i) => (
                  <div key={i} style={{ display:'flex', alignItems:'center', gap:'8px', fontSize:'14px', fontWeight:500, color:'var(--text)' }}>
                    <span style={{ color:'#16a34a', fontWeight:700 }}>✔</span> {item}
                  </div>
                ))}
              </div>
              <div style={{ marginTop:'28px', display:'flex', gap:'12px', flexWrap:'wrap' }}>
                <button onClick={() => setBookOpen(true)} className="btn btn-primary">Book a Site Visit →</button>
                <a href="tel:+233203361155" className="btn btn-outline">📞 +233 20 336 1155</a>
              </div>
            </div>
            <div style={{ borderRadius: 'var(--r-lg)', overflow: 'hidden', boxShadow: 'var(--sh-md)' }}>
              <img src="https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777111208/WhatsApp-Image-2025-08-18-at-14.16.35_e93040d9l_gwfnmu.jpg" alt="The Phoenix Enclave" style={{ width:'100%', height:'420px', objectFit:'cover', display:'block' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <div style={{ background: 'var(--navy)', borderTop: '1px solid rgba(255,193,7,.12)', borderBottom: '1px solid rgba(255,193,7,.12)' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 28px', display:'grid', gridTemplateColumns:'repeat(4,1fr)' }}>
          {[
            { num: '30', lbl: 'Gallery Photos' },
            { num: 'Phase 1', lbl: 'Now Complete' },
            { num: '24/7', lbl: 'Gated Security' },
            { num: 'Accra', lbl: 'Prime Location' },
          ].map((s, i, arr) => (
            <div key={i} style={{ padding:'28px 20px', textAlign:'center', borderRight: i < arr.length-1 ? '1px solid rgba(255,255,255,.06)' : 'none' }}>
              <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:28, color:'#FFC107', fontWeight:700 }}>{s.num}</div>
              <div style={{ fontSize:11, color:'rgba(255,255,255,.45)', textTransform:'uppercase', letterSpacing:'1px', marginTop:4 }}>{s.lbl}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Features ── */}
      <section style={{ padding: '90px 0', background: 'var(--off)' }}>
        <div className="wrap">
          <div className="solutions-section-grid reveal">
            <div style={{ borderRadius:'var(--r-lg)', overflow:'hidden', boxShadow:'var(--sh-md)' }} className="img-order-first">
              <img src="https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777196963/1_j6fe4u.jpg" alt="Phoenix Enclave interior" style={{ width:'100%', height:'420px', objectFit:'cover', display:'block' }} />
            </div>
            <div>
              <span className="tag">Why Invest</span>
              <h2 className="section-title">The <em>SMIC360 Difference</em></h2>
              <div style={{ display:'flex', flexDirection:'column', gap:'20px', marginTop:'8px' }}>
                {[
                  { icon:'🏡', title:'Gated & Secured Community', desc:'24/7 security with controlled access — giving residents total peace of mind.' },
                  { icon:'🏛️', title:'Modern Architecture',       desc:'Contemporary designs blending aesthetics with functionality, built to stand the test of time.' },
                  { icon:'📍', title:'Strategic Location',         desc:"Positioned in a serene locality with easy access to Accra's commercial and social hubs." },
                  { icon:'💼', title:'Strong Investment Returns',  desc:"High ROI potential in one of Ghana's fastest-growing real estate corridors." },
                ].map((item, i) => (
                  <div key={i} style={{ display:'flex', gap:'14px', alignItems:'flex-start' }}>
                    <div style={{ width:44, height:44, background:'var(--blue-l)', border:'1px solid rgba(13,61,154,.15)', borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, flexShrink:0 }}>{item.icon}</div>
                    <div>
                      <h4 style={{ fontFamily:"'Oswald',sans-serif", fontSize:16, fontWeight:700, color:'var(--navy)', marginBottom:4 }}>{item.title}</h4>
                      <p style={{ fontSize:13.5, color:'var(--muted)', lineHeight:1.65 }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop:'28px', display:'flex', gap:'12px', flexWrap:'wrap' }}>
                <button onClick={() => setBookOpen(true)} className="btn btn-primary">Enquire Now →</button>
                <Link href="/contact" className="btn btn-outline">Contact Us</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          PREMIUM PHOTO GALLERY — 30 IMAGES
          ═══════════════════════════════════════════════ */}
      <section style={{ padding:'100px 0 110px', background:'linear-gradient(180deg,var(--off) 0%,#fff 100%)' }}>
        <div className="wrap">

          {/* Header */}
          <div style={{ textAlign:'center', marginBottom:52 }} className="reveal">
            <span className="tag" style={{ justifyContent:'center' }}>Photo Gallery</span>
            <h2 className="section-title">Explore Every <em>Corner</em></h2>
            <p className="section-sub" style={{ textAlign:'center', margin:'12px auto 0', maxWidth:520 }}>
              {galleryImages.length} curated photographs from inside The Phoenix Enclave.
              Click any image to view full screen — use arrow keys or thumbnails to navigate.
            </p>
            {/* Progress bar */}
            <div style={{ marginTop:24, display:'inline-flex', flexDirection:'column', alignItems:'center', gap:6 }}>
              <div style={{ width:260, height:6, borderRadius:100, background:'rgba(7,22,40,.1)', overflow:'hidden' }}>
                <div style={{ height:'100%', width:'100%', background:'linear-gradient(90deg,#FFC107,#00b4d8)', borderRadius:100 }} />
              </div>
              <span style={{ fontSize:11.5, color:'var(--muted)', fontWeight:600 }}>All {galleryImages.length} photos loaded</span>
            </div>
          </div>

          {/* Filters */}
          <div className="enc-filters">
            {TAGS.map(({ label, icon }) => {
              const count = label === 'All' ? galleryImages.length : galleryImages.filter(i => i.tag === label).length;
              return (
                <button key={label} type="button" className={`enc-fb${activeTag===label?' active':''}`} onClick={() => { setActiveTag(label); setLightbox(null); }}>
                  <span>{icon}</span>{label}<span className="enc-fc">({count})</span>
                </button>
              );
            })}
          </div>

          {/* Count strip */}
          <div className="enc-cs reveal">
            <p className="enc-ct">Showing <strong>{filtered.length}</strong> {activeTag==='All' ? 'photos' : `${activeTag.toLowerCase()} photos`}</p>
            <button onClick={() => setBookOpen(true)} style={{ display:'inline-flex', alignItems:'center', gap:7, background:'linear-gradient(135deg,var(--navy),#0b2d56)', color:'#FFC107', fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:12.5, padding:'8px 18px', borderRadius:100, border:'none', cursor:'pointer', boxShadow:'0 4px 14px rgba(7,22,40,.18)' }}>
              <span>📅</span> Book a Site Visit
            </button>
          </div>

          {/* ── Featured hero row (top 2 featured from current filter) ── */}
          {activeTag === 'All' && (() => {
            const feat = galleryImages.filter(img => img.featured).slice(0,2);
            if (feat.length < 2) return null;
            return (
              <div className="enc-hero-row">
                {feat.map((img, i) => {
                  const idx = filtered.indexOf(img);
                  return (
                    <div key={i} className="enc-hi" onClick={() => setLightbox(idx)}>
                      <img src={img.src} alt={img.caption} loading={i===0?'eager':'lazy'} />
                      <div className="enc-ho">
                        <div className="enc-ht">{img.tag} · Featured</div>
                        <div className="enc-hc">{img.caption}</div>
                      </div>
                      <div className="enc-hz">⤢</div>
                      <div className="enc-feat">⭐ Featured</div>
                    </div>
                  );
                })}
              </div>
            );
          })()}

          {/* ── Masonry grid ── */}
          <div className="enc-grid">
            {filtered
              .filter(img => activeTag !== 'All' || !img.featured || galleryImages.filter(i=>i.featured).indexOf(img) >= 2)
              .map((img, i) => {
                const idx = filtered.indexOf(img);
                return (
                  <div key={img.src+i} className="enc-item" onClick={() => setLightbox(idx)}>
                    <img src={img.src} alt={img.caption} loading="lazy" />
                    <div className="enc-overlay">
                      <div className="enc-tag-b">{img.tag}</div>
                      <div className="enc-cap">{img.caption}</div>
                    </div>
                    <div className="enc-zoom">⤢</div>
                    {img.featured && <div className="enc-feat">⭐</div>}
                  </div>
                );
              })}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign:'center', padding:'60px 20px', color:'var(--muted)' }}>
              <div style={{ fontSize:48, marginBottom:12 }}>📷</div>
              <p style={{ fontFamily:"'Oswald',sans-serif", fontSize:20, fontWeight:700, color:'var(--navy)', marginBottom:8 }}>No photos in this category yet</p>
            </div>
          )}

          {/* Inline CTA */}
          {filtered.length > 0 && (
            <div style={{ marginTop:60, textAlign:'center' }}>
              <div style={{ display:'inline-flex', flexDirection:'column', alignItems:'center', gap:14, background:'linear-gradient(135deg,rgba(7,22,40,.04),rgba(19,97,196,.06))', border:'1.5px solid rgba(7,22,40,.08)', borderRadius:20, padding:'32px 40px' }}>
                <div style={{ fontSize:36 }}>🏠</div>
                <h3 style={{ fontFamily:"'Oswald',sans-serif", fontSize:22, fontWeight:700, color:'var(--navy)' }}>Seen enough? Let&apos;s get you a unit.</h3>
                <p style={{ fontSize:14, color:'var(--muted)', maxWidth:340, textAlign:'center', lineHeight:1.65 }}>Limited units available in Phase 2. Book a private site visit or call our team today.</p>
                <div style={{ display:'flex', gap:10, flexWrap:'wrap', justifyContent:'center' }}>
                  <button onClick={() => setBookOpen(true)} className="btn btn-primary">Book A Site Visit</button>
                  <a href="tel:+233203361155" className="btn btn-outline">📞 +233 20 336 1155</a>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* ── Final CTA ── */}
      <div style={{ background:'linear-gradient(135deg,#071628 0%,#0b2d56 60%,#1361c4 100%)', padding:'80px 0' }}>
        <div style={{ maxWidth:800, margin:'0 auto', padding:'0 28px', textAlign:'center' }}>
          <h2 style={{ fontFamily:"'Oswald',sans-serif", fontSize:'clamp(28px,4vw,48px)', fontWeight:700, color:'#fff', lineHeight:1.08, marginBottom:16 }}>
            Ready to <em style={{ fontStyle:'normal', color:'var(--cyan)' }}>Secure Your Unit?</em>
          </h2>
          <p style={{ color:'rgba(255,255,255,.62)', fontSize:16, marginBottom:32, lineHeight:1.7 }}>
            Limited units available. Contact our team today for pricing, floor plans, and to schedule your private site visit.
          </p>
          <div style={{ display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap' }}>
            <button onClick={() => setBookOpen(true)} className="btn btn-primary">Book A Site Visit</button>
            <a href="tel:+233203361155" className="btn btn-outline-white">📞 +233 20 336 1155</a>
          </div>
        </div>
      </div>

      <Footer onBookClick={() => setBookOpen(true)} />
      <ChatPanel />
    </>
  );
}
