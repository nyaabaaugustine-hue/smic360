'use client';
import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { createPortal } from 'react-dom';
import Topbar from '@/components/Topbar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';
import ChatPanel from '@/components/ChatPanel';
import ScrollReveal from '@/components/ScrollReveal';

/* ── Gallery images ── */
const galleryImages = [
  { src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777740050/IMG_9282_wurlft.jpg',  caption: 'Main Entrance Gate',     tag: 'Exterior' },
  { src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777740050/IMG_9269_dwamrt.jpg',  caption: 'Estate Overview',        tag: 'Aerial'   },
  { src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777740051/IMG_9274_ycespr.jpg',  caption: 'Residential Units',      tag: 'Exterior' },
  { src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777740054/IMG_9272_mq8wja.jpg',  caption: 'Landscaped Gardens',     tag: 'Grounds'  },
  { src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777740059/IMG_9276_yv0mxx.jpg',  caption: 'Interior Living Room',   tag: 'Interior' },
  { src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777740085/IMG_9270_gd8psk.jpg',  caption: 'Master Bedroom',         tag: 'Interior' },
  { src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777740094/IMG_9280_idqvkd.jpg',  caption: 'Modern Kitchen',         tag: 'Interior' },
  { src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777740095/IMG_9283_pzuadx.jpg',  caption: 'Dining Area',            tag: 'Interior' },
  { src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777740100/IMG_9286_c23rad.jpg',  caption: 'Bathroom & Finishes',    tag: 'Interior' },
  { src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777740108/IMG_9277_xtj3z6.jpg',  caption: 'Front Façade',           tag: 'Exterior' },
  { src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777740116/IMG_9287_wfqkka.jpg',  caption: 'Private Parking',        tag: 'Grounds'  },
  { src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777740121/IMG_9296_fudrfg.jpg',  caption: 'Street View',            tag: 'Exterior' },
  { src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777740127/IMG_9290_sukybv.jpg',  caption: 'Community Area',         tag: 'Grounds'  },
  { src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777740131/IMG_9292_wfk4t7.jpg',  caption: 'Side Garden',            tag: 'Grounds'  },
  { src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777740132/IMG_9291_rmaxrk.jpg',  caption: 'Rear View',              tag: 'Exterior' },
  { src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777740133/IMG_9289_ppuvp4.jpg',  caption: 'Building Details',       tag: 'Exterior' },
  { src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777740134/IMG_9300_usbzke.jpg',  caption: 'Utility Infrastructure', tag: 'Grounds'  },
  { src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777740134/IMG_9278_xnlknf.jpg',  caption: 'Evening Ambience',       tag: 'Exterior' },
  { src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777740139/IMG_9304_orvwtw.jpg',  caption: 'Construction Quality',   tag: 'Exterior' },
];

const galleryTags = ['All', 'Exterior', 'Interior', 'Grounds', 'Aerial'];

/* ── Lightbox ── */
function Lightbox({ images, index, onClose, onPrev, onNext }: {
  images: { src: string; caption: string; tag: string }[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  const [loaded, setLoaded]   = useState(false);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => { setLoaded(false); }, [index]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape')     onClose();
      if (e.key === 'ArrowLeft')  onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';
    return () => { document.documentElement.style.overflow = ''; };
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div
      style={{ position:'fixed', inset:0, zIndex:999999, background:'rgba(4,9,20,0.97)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}
      onClick={onClose}
    >
      <style>{`
        @keyframes lbIn{from{opacity:0;transform:scale(0.94)}to{opacity:1;transform:none}}
        @keyframes lbSpin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
        .lb-wrap{animation:lbIn .3s cubic-bezier(.16,1,.3,1)}
        .lb-nav{position:fixed;top:50%;transform:translateY(-50%);width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,.1);border:1.5px solid rgba(255,255,255,.2);color:#fff;font-size:22px;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .22s;backdrop-filter:blur(8px);z-index:2}
        .lb-nav:hover{background:rgba(255,193,7,.85);border-color:transparent;color:#071628;transform:translateY(-50%) scale(1.08)}
        .lb-prev{left:20px} .lb-next{right:20px}
        @media(max-width:600px){.lb-prev{left:8px}.lb-next{right:8px}.lb-nav{width:40px;height:40px;font-size:17px}}
      `}</style>

      {/* Close */}
      <button type="button" onClick={onClose} aria-label="Close"
        style={{ position:'fixed', top:16, right:16, zIndex:3, width:42, height:42, borderRadius:'50%', background:'rgba(255,255,255,.1)', border:'1.5px solid rgba(255,255,255,.2)', color:'#fff', fontSize:18, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', backdropFilter:'blur(8px)' }}
        onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.background='rgba(220,38,38,.7)';}}
        onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.background='rgba(255,255,255,.1)';}}
      >✕</button>

      {/* Counter */}
      <div style={{ position:'fixed', top:20, left:'50%', transform:'translateX(-50%)', zIndex:3, background:'rgba(255,255,255,.08)', border:'1px solid rgba(255,255,255,.15)', backdropFilter:'blur(8px)', borderRadius:100, padding:'5px 16px', color:'rgba(255,255,255,.7)', fontSize:13, fontWeight:600 }}>
        {index + 1} / {images.length}
      </div>

      {/* Nav */}
      <button type="button" className="lb-nav lb-prev" onClick={e=>{e.stopPropagation();onPrev();}} aria-label="Previous">‹</button>
      <button type="button" className="lb-nav lb-next" onClick={e=>{e.stopPropagation();onNext();}} aria-label="Next">›</button>

      {/* Image */}
      <div className="lb-wrap" onClick={e=>e.stopPropagation()} style={{ maxWidth:'min(90vw,1100px)', maxHeight:'80vh', display:'flex', flexDirection:'column', alignItems:'center' }}>
        {!loaded && (
          <div style={{ width:'60vw', height:'40vw', maxHeight:'70vh', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <div style={{ width:44, height:44, borderRadius:'50%', border:'3px solid rgba(255,193,7,.3)', borderTopColor:'#FFC107', animation:'lbSpin .7s linear infinite' }} />
          </div>
        )}
        <img src={images[index].src} alt={images[index].caption} onLoad={()=>setLoaded(true)}
          style={{ maxWidth:'100%', maxHeight:'78vh', objectFit:'contain', borderRadius:12, display:loaded?'block':'none', boxShadow:'0 32px 100px rgba(0,0,0,.8)' }}
        />
        {loaded && (
          <div style={{ marginTop:14, textAlign:'center' }}>
            <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:18, fontWeight:700, color:'#fff' }}>{images[index].caption}</div>
            <div style={{ fontSize:11, color:'#FFC107', fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase', marginTop:4 }}>{images[index].tag}</div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}

/* ── PAGE ── */
export default function PhoenixEnclavePage() {
  const [bookOpen, setBookOpen]     = useState(false);
  const [activeTag, setActiveTag]   = useState('All');
  const [lightbox, setLightbox]     = useState<number | null>(null);

  const filtered   = activeTag === 'All' ? galleryImages : galleryImages.filter(i => i.tag === activeTag);
  const closeLb    = useCallback(() => setLightbox(null), []);
  const prevImg    = useCallback(() => setLightbox(i => i !== null ? (i - 1 + filtered.length) % filtered.length : null), [filtered.length]);
  const nextImg    = useCallback(() => setLightbox(i => i !== null ? (i + 1) % filtered.length : null), [filtered.length]);

  return (
    <>
      <ScrollReveal />
      <Topbar />
      <Navbar onBookClick={() => setBookOpen(true)} />
      <BookingModal isOpen={bookOpen} onClose={() => setBookOpen(false)} />
      {lightbox !== null && <Lightbox images={filtered} index={lightbox} onClose={closeLb} onPrev={prevImg} onNext={nextImg} />}

      <style>{`
        /* Gallery styles scoped to this page */
        .gal-filters{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin-bottom:40px}
        .gal-btn{padding:9px 22px;border-radius:100px;font-size:12.5px;font-weight:700;cursor:pointer;transition:all .22s;border:1.5px solid rgba(7,22,40,.12);background:#fff;color:#5a7186;font-family:'Outfit',sans-serif}
        .gal-btn:hover{border-color:var(--gold);color:var(--gold-d)}
        .gal-btn.active{background:var(--navy);color:#FFC107;border-color:var(--navy);box-shadow:0 4px 16px rgba(7,22,40,.22)}
        .gal-grid{columns:4;column-gap:12px}
        .gal-item{break-inside:avoid;margin-bottom:12px;border-radius:12px;overflow:hidden;position:relative;cursor:pointer;display:block;box-shadow:0 4px 14px rgba(7,22,40,.08);transition:box-shadow .3s}
        .gal-item:hover{box-shadow:0 16px 40px rgba(7,22,40,.18)}
        .gal-item img{width:100%;height:auto;display:block;transition:transform .5s cubic-bezier(.16,1,.3,1)}
        .gal-item:hover img{transform:scale(1.05)}
        .gal-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(7,22,40,.82) 0%,rgba(7,22,40,.15) 55%,transparent 100%);border-radius:12px;opacity:0;transition:opacity .28s;display:flex;flex-direction:column;justify-content:flex-end;padding:16px}
        .gal-item:hover .gal-overlay{opacity:1}
        .gal-tag{font-size:9px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#FFC107;margin-bottom:4px}
        .gal-caption{font-family:'Oswald',sans-serif;font-size:13.5px;font-weight:700;color:#fff;line-height:1.2}
        .gal-zoom{position:absolute;top:10px;right:10px;width:32px;height:32px;border-radius:50%;background:rgba(255,255,255,.15);border:1.5px solid rgba(255,255,255,.3);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;color:#fff;font-size:13px;opacity:0;transition:opacity .22s,transform .22s;transform:scale(.85)}
        .gal-item:hover .gal-zoom{opacity:1;transform:scale(1)}
        @media(max-width:1024px){.gal-grid{columns:3}}
        @media(max-width:640px){.gal-grid{columns:2}}
        @media(max-width:420px){.gal-grid{columns:1}}
      `}</style>

      {/* ── Page Hero (old style) ── */}
      <div className="page-hero">
        <div className="page-hero-inner">
          <div className="page-hero-tag">Flagship Real Estate Development</div>
          <h1>The Phoenix <em>Enclave</em></h1>
          <p>A modern gated community designed for comfort, security, and long-term value — right in the heart of Greater Accra.</p>
        </div>
      </div>

      {/* ── Overview Section ── */}
      <section style={{ padding:'90px 0', background:'var(--white)' }}>
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
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px', marginTop:'24px' }}>
                {['Gated & Secured 24/7','Modern Architecture','Prime Accra Location','Premium Finishes','Investment-Grade ROI','Smart Home Ready'].map((item,i) => (
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
            <div style={{ borderRadius:'var(--r-lg)', overflow:'hidden', boxShadow:'var(--sh-md)' }}>
              <img
                src="https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777111208/WhatsApp-Image-2025-08-18-at-14.16.35_e93040d9l_gwfnmu.jpg"
                alt="The Phoenix Enclave"
                style={{ width:'100%', height:'420px', objectFit:'cover', display:'block' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Key Stats ── */}
      <div style={{ background:'var(--navy)', borderTop:'1px solid rgba(255,193,7,.12)', borderBottom:'1px solid rgba(255,193,7,.12)' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 28px', display:'grid', gridTemplateColumns:'repeat(4,1fr)' }}>
          {[
            { num:'120+', lbl:'Housing Units' },
            { num:'Phase 1', lbl:'Now Complete' },
            { num:'24/7', lbl:'Gated Security' },
            { num:'Accra', lbl:'Prime Location' },
          ].map((s,i,arr) => (
            <div key={i} style={{ padding:'28px 20px', textAlign:'center', borderRight: i < arr.length-1 ? '1px solid rgba(255,255,255,.06)' : 'none' }}>
              <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:28, color:'#FFC107', fontWeight:700 }}>{s.num}</div>
              <div style={{ fontSize:11, color:'rgba(255,255,255,.45)', textTransform:'uppercase', letterSpacing:'1px', marginTop:4 }}>{s.lbl}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Features Section ── */}
      <section style={{ padding:'90px 0', background:'var(--off)' }}>
        <div className="wrap">
          <div className="solutions-section-grid reveal">
            <div style={{ borderRadius:'var(--r-lg)', overflow:'hidden', boxShadow:'var(--sh-md)' }} className="img-order-first">
              <img
                src="https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777196963/1_j6fe4u.jpg"
                alt="Phoenix Enclave interior"
                style={{ width:'100%', height:'420px', objectFit:'cover', display:'block' }}
              />
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
                ].map((item,i) => (
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

      {/* ── PHOTO GALLERY ── */}
      <section style={{ padding:'90px 0', background:'var(--white)' }}>
        <div className="wrap">
          {/* Header */}
          <div style={{ textAlign:'center', marginBottom:44 }} className="reveal">
            <span className="tag" style={{ justifyContent:'center' }}>Photo Gallery</span>
            <h2 className="section-title">Explore Every <em>Corner</em></h2>
            <p className="section-sub" style={{ textAlign:'center', margin:'10px auto 0' }}>
              {galleryImages.length} curated photographs from inside The Phoenix Enclave. Click any image to view full screen.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="gal-filters">
            {galleryTags.map(tag => (
              <button
                key={tag}
                type="button"
                className={`gal-btn${activeTag === tag ? ' active' : ''}`}
                onClick={() => { setActiveTag(tag); setLightbox(null); }}
              >
                {tag}
                {tag !== 'All' && (
                  <span style={{ marginLeft:6, opacity:.5, fontWeight:400, fontSize:11 }}>
                    ({galleryImages.filter(i => i.tag === tag).length})
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Masonry grid */}
          <div className="gal-grid">
            {filtered.map((img, i) => (
              <div
                key={img.src + i}
                className="gal-item"
                onClick={() => setLightbox(i)}
              >
                <img src={img.src} alt={img.caption} loading="lazy" />
                <div className="gal-overlay">
                  <div className="gal-tag">{img.tag}</div>
                  <div className="gal-caption">{img.caption}</div>
                </div>
                <div className="gal-zoom">⤢</div>
              </div>
            ))}
          </div>
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
