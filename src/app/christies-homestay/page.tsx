'use client';
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Topbar from '@/components/Topbar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';
import ChatPanel from '@/components/ChatPanel';
import ScrollReveal from '@/components/ScrollReveal';

/* ── Images ── */
const images = [
  { src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777742699/1_1_csmex3.jpg',  alt: "Christie's Homestay — Living Area" },
  { src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777742700/1_2_nciwfs.jpg',  alt: "Christie's Homestay — Bedroom" },
  { src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777742700/1_4_qkl1ss.jpg',  alt: "Christie's Homestay — Kitchen" },
  { src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777742700/1_3_joxw7a.jpg',  alt: "Christie's Homestay — Dining Area" },
  { src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777742700/1_6_wrnqmu.jpg',  alt: "Christie's Homestay — Bathroom" },
  { src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777742701/1_8_snv3sb.jpg',  alt: "Christie's Homestay — Balcony" },
  { src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777742701/1_5_ckfuae.jpg',  alt: "Christie's Homestay — Master Bedroom" },
  { src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777742702/1_7_bncntq.jpg',  alt: "Christie's Homestay — Exterior" },
  { src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777742702/1_10_a6l5s3.jpg', alt: "Christie's Homestay — Pool Area" },
  { src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777742702/1_9_dipy6a.jpg',  alt: "Christie's Homestay — Night View" },
];

/* ── Lightbox ── */
function Lightbox({ imgs, index, onClose }: { imgs: typeof images; index: number; onClose: () => void }) {
  const [cur, setCur] = useState(index);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setCur(c => (c + 1) % imgs.length);
      if (e.key === 'ArrowLeft')  setCur(c => (c - 1 + imgs.length) % imgs.length);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [imgs.length, onClose]);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.style.overflow = 'hidden';
    return () => { document.documentElement.style.overflow = ''; };
  }, [mounted]);

  if (!mounted) return null;

  return createPortal(
    <div
      onClick={onClose}
      style={{ position:'fixed', inset:0, background:'rgba(4,14,29,0.97)', zIndex:999999, display:'flex', alignItems:'center', justifyContent:'center', padding:'20px' }}
    >
      <style>{`@keyframes lbIn{from{opacity:0;transform:scale(0.94)}to{opacity:1;transform:none}}`}</style>

      {/* Close */}
      <button onClick={onClose} type="button" style={{ position:'absolute', top:18, right:18, background:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.2)', color:'#fff', width:40, height:40, borderRadius:'50%', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, zIndex:2 }}>✕</button>

      {/* Arrows */}
      <button onClick={(e)=>{e.stopPropagation();setCur(c=>(c-1+imgs.length)%imgs.length);}} type="button" style={{ position:'absolute', left:16, top:'50%', transform:'translateY(-50%)', background:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.2)', color:'#fff', width:44, height:44, borderRadius:'50%', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, zIndex:2 }}>‹</button>
      <button onClick={(e)=>{e.stopPropagation();setCur(c=>(c+1)%imgs.length);}} type="button" style={{ position:'absolute', right:16, top:'50%', transform:'translateY(-50%)', background:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.2)', color:'#fff', width:44, height:44, borderRadius:'50%', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, zIndex:2 }}>›</button>

      {/* Image */}
      <img
        src={imgs[cur].src} alt={imgs[cur].alt}
        onClick={e=>e.stopPropagation()}
        style={{ maxWidth:'90vw', maxHeight:'85vh', objectFit:'contain', borderRadius:14, boxShadow:'0 32px 80px rgba(0,0,0,0.6)', animation:'lbIn 0.28s ease both' }}
      />

      {/* Counter */}
      <div style={{ position:'absolute', bottom:24, left:'50%', transform:'translateX(-50%)', background:'rgba(255,255,255,0.1)', backdropFilter:'blur(8px)', border:'1px solid rgba(255,255,255,0.15)', color:'#fff', padding:'6px 18px', borderRadius:20, fontSize:13, fontWeight:600 }}>
        {cur + 1} / {imgs.length}
      </div>

      {/* Dots */}
      <div style={{ position:'absolute', bottom:60, left:'50%', transform:'translateX(-50%)', display:'flex', gap:7 }}>
        {imgs.map((_,i) => (
          <button key={i} onClick={e=>{e.stopPropagation();setCur(i);}} type="button"
            style={{ width: i===cur?22:8, height:8, borderRadius:4, background: i===cur?'#FFC107':'rgba(255,255,255,0.3)', border:'none', cursor:'pointer', transition:'all 0.22s', padding:0 }}
          />
        ))}
      </div>
    </div>,
    document.body
  );
}

/* ── Inquiry Form Modal ── */
function InquiryModal({ onClose }: { onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkin, setCheckin] = useState('');
  const [checkout, setCheckout] = useState('');

  useEffect(() => {
    setMounted(true);
    const w = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.overflow = 'hidden';
    document.documentElement.style.paddingRight = w + 'px';
    return () => {
      document.documentElement.style.overflow = '';
      document.documentElement.style.paddingRight = '';
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('https://formspree.io/f/xdayrral', {
        method: 'POST',
        body: new FormData(e.currentTarget as HTMLFormElement),
        headers: { Accept: 'application/json' },
      });
      if (res.ok) setDone(true);
    } catch {}
    setLoading(false);
  };

  if (!mounted) return null;

  return createPortal(
    <div onClick={e=>{if(e.target===e.currentTarget)onClose();}}
      style={{ position:'fixed', inset:0, background:'rgba(4,14,29,0.9)', backdropFilter:'blur(12px)', WebkitBackdropFilter:'blur(12px)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:999999, padding:'20px 16px', overflowY:'auto' }}
    >
      <style>{`
        @keyframes iqIn{from{opacity:0;transform:translateY(24px) scale(0.96)}to{opacity:1;transform:none}}
        .iq-wrap{background:#fff;width:100%;max-width:540px;border-radius:20px;overflow:hidden;box-shadow:0 40px 100px rgba(4,14,29,0.5);border-top:4px solid #FFC107;animation:iqIn 0.36s cubic-bezier(0.16,1,0.3,1) both;flex-shrink:0}
        .iq-head{background:linear-gradient(135deg,#040e1d 0%,#0b2d56 55%,#1261c0 100%);padding:28px 32px;position:relative;overflow:hidden}
        .iq-head::after{content:'';position:absolute;bottom:0;left:0;right:0;height:2px;background:linear-gradient(90deg,#FFC107,#00b4d8,#FFC107)}
        .iq-head h2{font-family:'Oswald',sans-serif;font-size:24px;font-weight:700;color:#fff;margin:0}
        .iq-head p{color:rgba(255,255,255,0.5);font-size:13px;margin-top:4px}
        .iq-close{position:absolute;top:14px;right:14px;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);color:#fff;width:34px;height:34px;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:15px;transition:background 0.2s}
        .iq-close:hover{background:rgba(220,38,38,0.7)}
        .iq-body{padding:28px 32px}
        .iq-dates{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px}
        .iq-group{display:flex;flex-direction:column;gap:5px;margin-bottom:14px}
        .iq-group label{font-size:11px;font-weight:700;color:#071628;text-transform:uppercase;letter-spacing:0.5px}
        .iq-group input,.iq-group select,.iq-group textarea{padding:11px 14px;border-radius:10px;border:1.5px solid #dce8f7;font-family:'Outfit',sans-serif;font-size:14px;color:#0f1e30;background:#fcfdff;outline:none;transition:border-color 0.2s,box-shadow 0.2s;width:100%;box-sizing:border-box}
        .iq-group input:focus,.iq-group select:focus,.iq-group textarea:focus{border-color:#FFC107;box-shadow:0 0 0 3px rgba(255,193,7,0.15)}
        .iq-group textarea{resize:none;height:80px}
        .iq-submit{width:100%;padding:13px;background:linear-gradient(135deg,#FFC107,#D4A017);color:#071628;border:none;border-radius:11px;font-family:'Outfit',sans-serif;font-weight:700;font-size:15px;cursor:pointer;transition:all 0.22s;box-shadow:0 4px 16px rgba(255,193,7,0.35);margin-top:4px}
        .iq-submit:hover{transform:translateY(-2px);box-shadow:0 8px 26px rgba(255,193,7,0.5)}
        .iq-submit:disabled{opacity:0.7;cursor:not-allowed;transform:none}
        @media(max-width:520px){.iq-head,.iq-body{padding-left:20px;padding-right:20px}.iq-dates{grid-template-columns:1fr}}
        @keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
      `}</style>

      <div className="iq-wrap" onClick={e=>e.stopPropagation()}>
        {!done ? (
          <>
            <div className="iq-head">
              <button className="iq-close" type="button" onClick={onClose}>✕</button>
              <h2>🏡 Book Your Stay</h2>
              <p>Christie&apos;s Homestay — Accra, Ghana</p>
            </div>
            <div className="iq-body">
              <form onSubmit={handleSubmit}>
                <input type="hidden" name="property" value="Christie's Homestay" />
                <div className="iq-dates">
                  <div className="iq-group">
                    <label>Check-in Date</label>
                    <input type="date" name="checkin" value={checkin} onChange={e=>setCheckin(e.target.value)} required min={new Date().toISOString().split('T')[0]} />
                  </div>
                  <div className="iq-group">
                    <label>Check-out Date</label>
                    <input type="date" name="checkout" value={checkout} onChange={e=>setCheckout(e.target.value)} required min={checkin || new Date().toISOString().split('T')[0]} />
                  </div>
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:14 }}>
                  <div className="iq-group" style={{ marginBottom:0 }}>
                    <label>Full Name *</label>
                    <input type="text" name="name" placeholder="Your full name" required />
                  </div>
                  <div className="iq-group" style={{ marginBottom:0 }}>
                    <label>Guests</label>
                    <select name="guests">
                      {[1,2,3,4,5,6].map(n=><option key={n} value={n}>{n} {n===1?'Guest':'Guests'}</option>)}
                    </select>
                  </div>
                </div>
                <div className="iq-group">
                  <label>Phone / WhatsApp *</label>
                  <input type="tel" name="phone" placeholder="024 XXX XXXX" required />
                </div>
                <div className="iq-group">
                  <label>Email Address</label>
                  <input type="email" name="email" placeholder="your@email.com" />
                </div>
                <div className="iq-group">
                  <label>Special Requests</label>
                  <textarea name="message" placeholder="Airport pickup, specific room type, dietary needs…" />
                </div>
                <button type="submit" className="iq-submit" disabled={loading}>
                  {loading
                    ? <span style={{ display:'inline-flex', alignItems:'center', gap:8 }}><span style={{ width:16, height:16, border:'2px solid rgba(7,22,40,0.3)', borderTopColor:'#071628', borderRadius:'50%', animation:'spin 0.7s linear infinite', display:'inline-block' }} />Sending…</span>
                    : 'Send Booking Request →'}
                </button>
                <p style={{ fontSize:11.5, color:'#9ca3af', textAlign:'center', marginTop:10 }}>🔒 We&apos;ll confirm within 2 hours. No payment required now.</p>
              </form>
            </div>
          </>
        ) : (
          <div style={{ padding:'52px 32px', textAlign:'center' }}>
            <div style={{ width:68, height:68, background:'linear-gradient(135deg,#16a34a,#15803d)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px', fontSize:28, color:'#fff', boxShadow:'0 8px 28px rgba(22,163,74,0.3)' }}>✓</div>
            <h3 style={{ fontFamily:"'Oswald',sans-serif", fontSize:26, color:'#071628', marginBottom:10 }}>Request Received!</h3>
            <p style={{ color:'#5a7186', fontSize:14.5, lineHeight:1.75, maxWidth:320, margin:'0 auto 24px' }}>Thank you! Our team will confirm your booking at Christie&apos;s Homestay within 2 hours.</p>
            <div style={{ display:'flex', gap:10, justifyContent:'center', flexWrap:'wrap' }}>
              <button onClick={onClose} style={{ padding:'11px 24px', background:'linear-gradient(135deg,#FFC107,#D4A017)', color:'#071628', fontWeight:700, border:'none', borderRadius:10, cursor:'pointer', fontFamily:"'Outfit',sans-serif", fontSize:14 }}>Close</button>
              <a href="https://api.whatsapp.com/send?phone=233244783099" target="_blank" rel="noopener noreferrer" style={{ padding:'11px 24px', border:'1.5px solid #D4A017', color:'#D4A017', fontWeight:700, borderRadius:10, fontFamily:"'Outfit',sans-serif", display:'inline-flex', alignItems:'center', gap:6, fontSize:14, textDecoration:'none' }}>💬 WhatsApp Us</a>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}

/* ── Page ── */
export default function ChristiesHomestayPage() {
  const [bookOpen, setBookOpen]       = useState(false);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [lightbox, setLightbox]       = useState<number | null>(null);
  const [activeImg, setActiveImg]     = useState(0);
  const [activeFaq, setActiveFaq]     = useState<number | null>(null);

  const faqs = [
    { q: "What's included in the rental?", a: "Every stay includes fully furnished rooms with air conditioning, high-speed Wi-Fi, full kitchen access, smart TV, fresh bed linen & towels, and 24/7 security. Housekeeping is available on request." },
    { q: 'How do I book a stay?', a: "Fill in the booking form on this page or WhatsApp us directly on 024 478 3099. We'll confirm availability and provide payment details within 2 hours." },
    { q: 'What are the check-in / check-out times?', a: 'Standard check-in is from 2:00 PM and check-out by 11:00 AM. Early check-in and late check-out can be arranged subject to availability — just let us know in advance.' },
    { q: 'Is airport pickup available?', a: 'Yes! We offer airport pickup and drop-off to and from Kotoka International Airport. Please mention this when making your booking and we will arrange it for you.' },
    { q: 'What is your cancellation policy?', a: 'Cancellations made 72 hours or more before check-in receive a full refund. Cancellations within 48 hours may be subject to a one-night charge. Please contact us directly for flexibility on longer stays.' },
    { q: 'Is Christie\'s Homestay suitable for families?', a: "Absolutely. We accommodate families, solo travellers, couples, and corporate guests. The space comfortably fits up to 6 guests. Additional arrangements like extra beds or baby cots can be made on request." },
  ];

  const amenities = [
    { icon: '❄️', label: 'Air Conditioning',     desc: 'All rooms fully air-conditioned' },
    { icon: '📶', label: 'High-Speed Wi-Fi',      desc: 'Fast, reliable fibre connection' },
    { icon: '🍳', label: 'Fully Equipped Kitchen',desc: 'Gas cooker, fridge, microwave & more' },
    { icon: '📺', label: 'Smart TV',              desc: 'Netflix, YouTube & streaming ready' },
    { icon: '🚗', label: 'Free Parking',          desc: 'Secure on-site parking' },
    { icon: '🔒', label: '24/7 Security',         desc: 'Gated & secured compound' },
    { icon: '🛏️', label: 'Premium Bedding',       desc: 'Hotel-quality linen & towels' },
    { icon: '✈️', label: 'Airport Transfers',     desc: 'Available on request' },
    { icon: '🧹', label: 'Housekeeping',          desc: 'Available on request' },
    { icon: '💧', label: 'Swimming Pool',         desc: 'Private pool access' },
    { icon: '🌿', label: 'Outdoor Space',         desc: 'Garden & patio area' },
    { icon: '⚡', label: 'Backup Generator',      desc: 'Uninterrupted power supply' },
  ];

  const highlights = [
    { icon: '📍', label: 'Location', val: 'Spintex Road, Accra, Ghana' },
    { icon: '👥', label: 'Guests',   val: 'Up to 6 Guests' },
    { icon: '🛏️', label: 'Bedrooms', val: '3 Bedrooms' },
    { icon: '🚿', label: 'Bathrooms',val: '3 Bathrooms' },
    { icon: '📐', label: 'Size',     val: 'Spacious Open Plan' },
    { icon: '⭐', label: 'Rating',   val: '5-Star Experience' },
  ];

  return (
    <>
      <style>{`
        /* ── HERO ── */
        .ch-hero{position:relative;min-height:96vh;display:flex;align-items:flex-end;overflow:hidden;background:#040e1d}
        .ch-hero-video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0.55;z-index:0}
        .ch-hero-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(4,14,29,0.98) 0%,rgba(4,14,29,0.5) 55%,rgba(4,14,29,0.15) 100%);z-index:1}
        .ch-hero-content{position:relative;z-index:2;max-width:1200px;margin:0 auto;padding:0 28px 88px;width:100%}
        .ch-pill{display:inline-flex;align-items:center;gap:8px;background:rgba(255,193,7,0.12);border:1px solid rgba(255,193,7,0.3);color:#FFC107;font-size:10.5px;font-weight:800;letter-spacing:2px;text-transform:uppercase;padding:6px 16px;border-radius:20px;margin-bottom:18px}
        .ch-pill-dot{width:7px;height:7px;border-radius:50%;background:#FFC107;animation:ch-blink 1.5s ease-in-out infinite}
        @keyframes ch-blink{0%,100%{opacity:1}50%{opacity:0.25}}
        .ch-hero h1{font-family:'Oswald',sans-serif;font-size:clamp(42px,7vw,90px);font-weight:700;color:#fff;line-height:0.95;margin:0 0 16px;letter-spacing:-1px}
        .ch-hero h1 em{font-style:normal;color:#FFC107}
        .ch-hero h1 span{display:block;font-size:clamp(22px,3.5vw,42px);color:rgba(255,255,255,0.65);font-weight:400;letter-spacing:0;margin-top:6px}
        .ch-hero-sub{font-size:clamp(14px,2vw,17px);color:rgba(255,255,255,0.62);max-width:500px;line-height:1.75;margin-bottom:32px}
        .ch-hero-tags{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:32px}
        .ch-tag{display:inline-flex;align-items:center;gap:5px;background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.12);color:rgba(255,255,255,0.75);font-size:12px;font-weight:600;padding:6px 14px;border-radius:20px;backdrop-filter:blur(8px)}
        .ch-hero-ctas{display:flex;gap:12px;flex-wrap:wrap}

        /* ── GALLERY GRID ── */
        .ch-gallery{display:grid;grid-template-columns:2fr 1fr 1fr;grid-template-rows:260px 260px;gap:10px}
        .ch-gallery-main{grid-row:1/3;position:relative;overflow:hidden;border-radius:16px 0 0 16px;cursor:pointer}
        .ch-gallery-cell{position:relative;overflow:hidden;cursor:pointer}
        .ch-gallery-cell:nth-child(2){border-radius:0 16px 0 0}
        .ch-gallery-cell:nth-child(3){border-radius:0 0 0 0}
        .ch-gallery-cell:nth-child(4){border-radius:0 0 0 0}
        .ch-gallery-cell:last-child{border-radius:0 0 16px 0}
        .ch-gallery-cell img,.ch-gallery-main img{width:100%;height:100%;object-fit:cover;transition:transform 0.45s ease;display:block}
        .ch-gallery-cell:hover img,.ch-gallery-main:hover img{transform:scale(1.07)}
        .ch-gallery-overlay{position:absolute;inset:0;background:rgba(4,14,29,0);transition:background 0.3s}
        .ch-gallery-cell:hover .ch-gallery-overlay,.ch-gallery-main:hover .ch-gallery-overlay{background:rgba(4,14,29,0.25)}
        .ch-see-all{position:absolute;bottom:14px;right:14px;background:rgba(255,255,255,0.9);backdrop-filter:blur(8px);color:#071628;font-size:12px;font-weight:700;padding:7px 16px;border-radius:8px;border:none;cursor:pointer;font-family:'Outfit',sans-serif;transition:all 0.2s;z-index:2}
        .ch-see-all:hover{background:#fff;box-shadow:0 4px 16px rgba(0,0,0,0.2)}

        /* ── INFO CARD (sticky) ── */
        .ch-info-card{background:#fff;border-radius:20px;border:1.5px solid #dce8f7;box-shadow:0 12px 48px rgba(7,22,40,0.1);padding:28px;position:sticky;top:100px}
        .ch-price-row{display:flex;align-items:baseline;gap:6px;margin-bottom:4px}
        .ch-price{font-family:'Oswald',sans-serif;font-size:32px;font-weight:700;color:#071628}
        .ch-price-sub{font-size:13px;color:#5a7186}
        .ch-divider{height:1px;background:#dce8f7;margin:18px 0}
        .ch-highlights{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:18px}
        .ch-hl{background:#f6f8fd;border:1px solid #dce8f7;border-radius:10px;padding:10px 12px;display:flex;align-items:center;gap:8px}
        .ch-hl-icon{font-size:16px;flex-shrink:0}
        .ch-hl-label{font-size:10px;color:#5a7186;text-transform:uppercase;letter-spacing:0.6px;font-weight:600}
        .ch-hl-val{font-size:12.5px;color:#071628;font-weight:700;margin-top:1px}

        /* ── AMENITIES ── */
        .ch-amenities{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
        .ch-amenity{background:#fff;border:1.5px solid #dce8f7;border-radius:14px;padding:18px 16px;transition:all 0.22s;text-align:center}
        .ch-amenity:hover{border-color:#FFC107;box-shadow:0 6px 22px rgba(255,193,7,0.12);transform:translateY(-3px)}
        .ch-amenity-icon{font-size:28px;margin-bottom:8px;display:block}
        .ch-amenity-label{font-weight:700;font-size:13.5px;color:#071628;margin-bottom:3px}
        .ch-amenity-desc{font-size:11.5px;color:#5a7186}

        /* ── FAQ ── */
        .ch-faq{display:flex;flex-direction:column;gap:10px}
        .ch-faq-item{background:#fff;border:1.5px solid #dce8f7;border-radius:14px;overflow:hidden;transition:border-color 0.2s}
        .ch-faq-item.open{border-color:#FFC107}
        .ch-faq-q{padding:18px 20px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;font-weight:700;font-size:15px;color:#071628;user-select:none}
        .ch-faq-icon{font-size:18px;color:#D4A017;flex-shrink:0;margin-left:12px;transition:transform 0.3s}
        .ch-faq-item.open .ch-faq-icon{transform:rotate(45deg)}
        .ch-faq-a{padding:0 20px 18px;font-size:14px;color:#5a7186;line-height:1.8}

        /* ── CTA STRIP ── */
        .ch-cta{background:linear-gradient(135deg,#040e1d 0%,#0b2d56 55%,#1261c0 100%);padding:80px 0;position:relative;overflow:hidden}
        .ch-cta::before{content:'';position:absolute;inset:0;background-image:linear-gradient(rgba(0,180,216,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,180,216,0.04) 1px,transparent 1px);background-size:52px 52px}
        .ch-cta::after{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,#FFC107,#00b4d8,#FFC107)}

        /* ── SECTION UTIL ── */
        .ch-section{padding:88px 0}
        .ch-section.alt{background:#f6f8fd}
        .ch-two-col{display:grid;grid-template-columns:1fr 380px;gap:52px;align-items:start}

        /* ── MOBILE ── */
        @media(max-width:1024px){
          .ch-two-col{grid-template-columns:1fr}
          .ch-info-card{position:static;margin-bottom:36px;order:-1}
        }
        @media(max-width:900px){
          .ch-gallery{grid-template-columns:1fr 1fr;grid-template-rows:200px 200px 200px}
          .ch-gallery-main{grid-row:1/2;grid-column:1/3;border-radius:16px 16px 0 0}
          .ch-gallery-cell:nth-child(2){border-radius:0}
          .ch-gallery-cell:nth-child(3){border-radius:0 0 0 16px}
          .ch-gallery-cell:nth-child(4){border-radius:0 0 16px 0}
          .ch-amenities{grid-template-columns:repeat(2,1fr)}
        }
        @media(max-width:600px){
          .ch-hero{min-height:88vh}
          .ch-hero-content{padding-bottom:56px}
          .ch-gallery{grid-template-columns:1fr 1fr;grid-template-rows:180px 140px 140px}
          .ch-highlights{grid-template-columns:1fr 1fr}
          .ch-amenities{grid-template-columns:1fr 1fr}
          .ch-cta .btn{width:100%;justify-content:center}
          .ch-hero-ctas .btn{flex:1;justify-content:center;min-width:140px}
        }
        @media(max-width:400px){
          .ch-amenities{grid-template-columns:1fr}
          .ch-highlights{grid-template-columns:1fr}
        }
      `}</style>

      <ScrollReveal />
      <Topbar />
      <Navbar onBookClick={() => setBookOpen(true)} />
      <BookingModal isOpen={bookOpen} onClose={() => setBookOpen(false)} />
      {inquiryOpen && <InquiryModal onClose={() => setInquiryOpen(false)} />}
      {lightbox !== null && <Lightbox imgs={images} index={lightbox} onClose={() => setLightbox(null)} />}

      {/* ══ HERO ══ */}
      <section className="ch-hero">
        <video
          className="ch-hero-video"
          src="https://res.cloudinary.com/dwsl2ktt2/video/upload/v1777742710/1_1_c7hlyk.mp4"
          autoPlay muted loop playsInline
        />
        <div className="ch-hero-overlay" />
        <div className="ch-hero-content">
          <div className="ch-pill">
            <span className="ch-pill-dot" />
            Now Available to Book
          </div>
          <h1>
            Christie&apos;s<br />
            <em>Homestay</em>
            <span>Premium Short-Stay Rentals · Accra, Ghana</span>
          </h1>
          <p className="ch-hero-sub">
            A beautifully furnished luxury apartment in the heart of Accra — perfect for business travellers, families, and holidaymakers seeking a home away from home.
          </p>
          <div className="ch-hero-tags">
            {['🛏️ 3 Bedrooms','👥 Up to 6 Guests','📶 Free Wi-Fi','❄️ Air Conditioning','🔒 Secure Gated','✈️ Airport Transfers'].map((t,i) => (
              <span key={i} className="ch-tag">{t}</span>
            ))}
          </div>
          <div className="ch-hero-ctas">
            <button onClick={() => setInquiryOpen(true)} className="btn btn-primary" style={{ fontSize:15, padding:'14px 28px' }}>
              Book Your Stay →
            </button>
            <a href="https://api.whatsapp.com/send?phone=233244783099&text=Hi%2C%20I'm%20interested%20in%20Christie's%20Homestay" target="_blank" rel="noopener noreferrer" className="btn btn-outline-white" style={{ fontSize:15, padding:'14px 28px', display:'inline-flex', alignItems:'center', gap:8 }}>
              💬 WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* ══ GALLERY + INFO CARD ══ */}
      <section className="ch-section">
        <div className="wrap">
          <div className="ch-two-col">

            {/* Left: gallery + description */}
            <div>
              {/* Photo grid */}
              <div className="ch-gallery reveal">
                <div className="ch-gallery-main" onClick={() => setLightbox(0)}>
                  <img src={images[0].src} alt={images[0].alt} />
                  <div className="ch-gallery-overlay" />
                </div>
                {images.slice(1, 5).map((img, i) => (
                  <div key={i} className="ch-gallery-cell" onClick={() => setLightbox(i + 1)}>
                    <img src={img.src} alt={img.alt} />
                    <div className="ch-gallery-overlay" />
                    {i === 3 && (
                      <button className="ch-see-all" onClick={e => { e.stopPropagation(); setLightbox(0); }}>
                        +{images.length - 5} Photos
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Description */}
              <div className="reveal" style={{ marginTop:44 }}>
                <span className="tag">About This Property</span>
                <h2 className="section-title">Luxury Living<br /><em>Made Affordable</em></h2>
                <p className="section-sub" style={{ marginBottom:18 }}>
                  Christie&apos;s Homestay is a premium fully-furnished short-stay rental managed by SMIC360 Limited, located in a serene and secured gated compound on Spintex Road, Accra.
                </p>
                <p style={{ fontSize:14.5, color:'var(--muted)', lineHeight:1.85, marginBottom:18 }}>
                  Designed for the modern traveller — whether you&apos;re in Accra for business, a family holiday, or an extended stay — our apartments combine hotel-level comfort with the warmth and privacy of home. Every detail has been carefully curated to ensure your stay is seamless, comfortable, and memorable.
                </p>
                <p style={{ fontSize:14.5, color:'var(--muted)', lineHeight:1.85, marginBottom:28 }}>
                  All units are fully air-conditioned, equipped with a complete kitchen, high-speed Wi-Fi, and smart TV. Housekeeping is available on request, and our team is available 24/7 to assist with any needs — from grocery stocking to airport transfers.
                </p>

                {/* Highlights strip */}
                <div style={{ display:'flex', gap:12, flexWrap:'wrap', padding:'20px', background:'#f6f8fd', borderRadius:16, border:'1px solid #dce8f7' }}>
                  {[
                    { icon:'📍', val:'Spintex Road, Accra' },
                    { icon:'🛏️', val:'3 Bedrooms' },
                    { icon:'👥', val:'Up to 6 Guests' },
                    { icon:'🚿', val:'3 Bathrooms' },
                    { icon:'⭐', val:'5-Star Rated' },
                    { icon:'✈️', val:'25 min from Airport' },
                  ].map((h,i) => (
                    <div key={i} style={{ display:'flex', alignItems:'center', gap:7, background:'#fff', border:'1px solid #dce8f7', borderRadius:10, padding:'8px 14px', fontSize:13, color:'#071628', fontWeight:600 }}>
                      <span>{h.icon}</span>{h.val}
                    </div>
                  ))}
                </div>
              </div>

              {/* Video tour */}
              <div className="reveal" style={{ marginTop:44 }}>
                <span className="tag" style={{ color:'var(--cyan)' }}>Video Tour</span>
                <h3 style={{ fontFamily:"'Oswald',sans-serif", fontSize:26, fontWeight:700, color:'#071628', margin:'8px 0 16px' }}>
                  See The <em style={{ color:'#D4A017', fontStyle:'normal' }}>Full Space</em>
                </h3>
                <div style={{ borderRadius:18, overflow:'hidden', border:'2px solid #dce8f7', boxShadow:'0 12px 40px rgba(7,22,40,0.1)' }}>
                  <video
                    src="https://res.cloudinary.com/dwsl2ktt2/video/upload/v1777742710/1_1_c7hlyk.mp4"
                    controls playsInline
                    style={{ width:'100%', display:'block', maxHeight:440, objectFit:'cover', background:'#000' }}
                  />
                </div>
              </div>
            </div>

            {/* Right: sticky info card */}
            <div>
              <div className="ch-info-card reveal">
                <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:14 }}>
                  <span style={{ fontSize:28 }}>🏡</span>
                  <div>
                    <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:17, fontWeight:700, color:'#071628', lineHeight:1.1 }}>Christie&apos;s Homestay</div>
                    <div style={{ fontSize:12, color:'#5a7186', marginTop:2 }}>📍 Spintex Road, Accra, Ghana</div>
                  </div>
                </div>

                <div style={{ background:'linear-gradient(135deg,rgba(255,193,7,0.08),rgba(212,160,23,0.05))', border:'1px solid rgba(255,193,7,0.2)', borderRadius:12, padding:'14px 16px', marginBottom:18 }}>
                  <div style={{ fontSize:11, color:'#D4A017', fontWeight:800, textTransform:'uppercase', letterSpacing:'1px', marginBottom:6 }}>Starting From</div>
                  <div style={{ display:'flex', alignItems:'baseline', gap:6 }}>
                    <span style={{ fontFamily:"'Oswald',sans-serif", fontSize:36, fontWeight:700, color:'#071628', lineHeight:1 }}>$120</span>
                    <span style={{ fontSize:14, color:'#5a7186' }}>/ night</span>
                  </div>
                  <div style={{ fontSize:12, color:'#5a7186', marginTop:4 }}>Rates vary by season & duration</div>
                </div>

                <div className="ch-highlights">
                  {highlights.map((h,i) => (
                    <div key={i} className="ch-hl">
                      <span className="ch-hl-icon">{h.icon}</span>
                      <div>
                        <div className="ch-hl-label">{h.label}</div>
                        <div className="ch-hl-val">{h.val}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="ch-divider" />

                {/* Quick amenity tags */}
                <div style={{ display:'flex', flexWrap:'wrap', gap:7, marginBottom:20 }}>
                  {['❄️ AC','📶 Wi-Fi','🍳 Kitchen','📺 Smart TV','🚗 Parking','🔒 Security','💧 Pool','⚡ Generator'].map((a,i) => (
                    <span key={i} style={{ background:'#f6f8fd', border:'1px solid #dce8f7', borderRadius:20, padding:'5px 12px', fontSize:12, color:'#071628', fontWeight:600 }}>{a}</span>
                  ))}
                </div>

                <button onClick={() => setInquiryOpen(true)} className="btn btn-primary" style={{ width:'100%', justifyContent:'center', fontSize:15, padding:'14px', marginBottom:10 }}>
                  Check Availability →
                </button>
                <a href="https://api.whatsapp.com/send?phone=233244783099&text=Hi%2C%20I'd%20like%20to%20book%20Christie's%20Homestay" target="_blank" rel="noopener noreferrer"
                  className="btn btn-outline"
                  style={{ width:'100%', justifyContent:'center', fontSize:14, padding:'12px', display:'flex', alignItems:'center', gap:7, textDecoration:'none' }}
                >
                  💬 WhatsApp for Instant Reply
                </a>

                <div className="ch-divider" />
                <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                  {[
                    { icon:'📞', text:'020 881 2164', href:'tel:0208812164' },
                    { icon:'✉️', text:'info@smic360.com', href:'mailto:info@smic360.com' },
                  ].map((c,i) => (
                    <a key={i} href={c.href} style={{ display:'flex', alignItems:'center', gap:10, color:'#5a7186', fontSize:13, textDecoration:'none', fontWeight:500 }}>
                      <span style={{ width:30, height:30, background:'#f6f8fd', border:'1px solid #dce8f7', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, flexShrink:0 }}>{c.icon}</span>
                      {c.text}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ AMENITIES ══ */}
      <section className="ch-section alt">
        <div className="wrap">
          <div style={{ textAlign:'center', marginBottom:48 }} className="reveal">
            <span className="tag" style={{ justifyContent:'center' }}>Everything Included</span>
            <h2 className="section-title">Premium <em>Amenities</em></h2>
            <p className="section-sub" style={{ textAlign:'center', margin:'10px auto 0' }}>Every comfort you need — all included in your stay.</p>
          </div>
          <div className="ch-amenities stagger">
            {amenities.map((a, i) => (
              <div key={i} className="ch-amenity">
                <span className="ch-amenity-icon">{a.icon}</span>
                <div className="ch-amenity-label">{a.label}</div>
                <div className="ch-amenity-desc">{a.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ ALL PHOTOS GRID ══ */}
      <section className="ch-section">
        <div className="wrap">
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:32, flexWrap:'wrap', gap:14 }} className="reveal">
            <div>
              <span className="tag">Photo Gallery</span>
              <h2 className="section-title">See Every <em>Room</em></h2>
            </div>
            <button onClick={() => setLightbox(0)} className="btn btn-outline" style={{ fontSize:13 }}>View Fullscreen ↗</button>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:10 }} className="stagger">
            {images.map((img, i) => (
              <div key={i} onClick={() => setLightbox(i)} style={{ height:160, borderRadius:12, overflow:'hidden', cursor:'pointer', position:'relative' }}
                onMouseEnter={e => { (e.currentTarget.querySelector('img') as HTMLElement).style.transform = 'scale(1.08)'; }}
                onMouseLeave={e => { (e.currentTarget.querySelector('img') as HTMLElement).style.transform = 'scale(1)'; }}
              >
                <img src={img.src} alt={img.alt} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.4s ease', display:'block' }} />
                <div style={{ position:'absolute', inset:0, background:'rgba(4,14,29,0)', transition:'background 0.3s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(4,14,29,0.2)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(4,14,29,0)'; }}
                />
              </div>
            ))}
          </div>
          <div style={{ textAlign:'center', marginTop:28 }}>
            <button onClick={() => setLightbox(0)} className="btn btn-primary">View Full Gallery →</button>
          </div>
        </div>
      </section>

      {/* ══ REVIEWS / SOCIAL PROOF ══ */}
      <section className="ch-section alt">
        <div className="wrap">
          <div style={{ textAlign:'center', marginBottom:48 }} className="reveal">
            <span className="tag" style={{ justifyContent:'center' }}>Guest Reviews</span>
            <h2 className="section-title">What Guests <em>Say</em></h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:22 }} className="stagger">
            {[
              { name:'Kwame A.', country:'🇬🇭 Ghana', stars:5, text:"Perfect place for my corporate stay in Accra. Clean, spacious, great Wi-Fi, and the team was incredibly helpful. I'll definitely be back!" },
              { name:'Sarah M.', country:'🇬🇧 UK',    stars:5, text:"We stayed for 2 weeks and it felt like home. The kitchen was fully stocked on arrival, the pool was lovely, and the location is so convenient." },
              { name:'David O.', country:'🇳🇬 Nigeria', stars:5, text:"Great value for money compared to hotels. The airport pickup was arranged seamlessly and the apartment was immaculately clean. Highly recommend." },
            ].map((r, i) => (
              <div key={i} style={{ background:'#fff', border:'1.5px solid #dce8f7', borderRadius:18, padding:'24px 22px', boxShadow:'0 4px 20px rgba(7,22,40,0.06)' }}>
                <div style={{ display:'flex', gap:3, marginBottom:12, color:'#FFC107', fontSize:18 }}>{'★'.repeat(r.stars)}</div>
                <p style={{ fontSize:14, color:'#5a7186', lineHeight:1.8, marginBottom:18, fontStyle:'italic' }}>&ldquo;{r.text}&rdquo;</p>
                <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                  <div style={{ width:38, height:38, borderRadius:'50%', background:'linear-gradient(135deg,#040e1d,#0b2d56)', display:'flex', alignItems:'center', justifyContent:'center', color:'#FFC107', fontFamily:"'Oswald',sans-serif", fontWeight:700, fontSize:15 }}>{r.name[0]}</div>
                  <div>
                    <div style={{ fontWeight:700, fontSize:13.5, color:'#071628' }}>{r.name}</div>
                    <div style={{ fontSize:12, color:'#5a7186' }}>{r.country}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section className="ch-section">
        <div className="wrap" style={{ maxWidth:820 }}>
          <div style={{ textAlign:'center', marginBottom:44 }} className="reveal">
            <span className="tag" style={{ justifyContent:'center' }}>Questions?</span>
            <h2 className="section-title">Frequently Asked <em>Questions</em></h2>
          </div>
          <div className="ch-faq reveal">
            {faqs.map((f, i) => (
              <div key={i} className={`ch-faq-item${activeFaq === i ? ' open' : ''}`}>
                <div className="ch-faq-q" onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
                  <span>{f.q}</span>
                  <span className="ch-faq-icon">+</span>
                </div>
                {activeFaq === i && <div className="ch-faq-a">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ MAP ══ */}
      <section className="ch-section alt">
        <div className="wrap">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:52, alignItems:'center' }} className="reveal">
            <div>
              <span className="tag">Find Us</span>
              <h2 className="section-title">Prime <em>Location</em></h2>
              <p className="section-sub" style={{ marginBottom:24 }}>
                Christie&apos;s Homestay sits on the popular Spintex Road corridor — one of Accra&apos;s most accessible, well-developed, and convenient residential areas, just minutes from the city&apos;s key commercial hubs.
              </p>
              {[
                { icon:'📍', label:'Address',         val:'Spintex Road, Accra, Ghana' },
                { icon:'✈️', label:'From Airport',    val:'~25 minutes (Kotoka Int\'l)' },
                { icon:'🏥', label:'Nearby',          val:'Malls, Restaurants, Hospitals, Beach' },
                { icon:'📞', label:'Call / WhatsApp', val:'024 478 3099 · 020 881 2164' },
              ].map((item, i) => (
                <div key={i} style={{ display:'flex', gap:14, alignItems:'flex-start', background:'#fff', border:'1px solid #dce8f7', borderRadius:12, padding:'13px 16px', marginBottom:10 }}>
                  <span style={{ fontSize:20, flexShrink:0 }}>{item.icon}</span>
                  <div>
                    <div style={{ fontSize:11, color:'#5a7186', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.6px' }}>{item.label}</div>
                    <div style={{ fontSize:14, color:'#071628', fontWeight:600, marginTop:2 }}>{item.val}</div>
                  </div>
                </div>
              ))}
              <div style={{ display:'flex', gap:12, marginTop:24, flexWrap:'wrap' }}>
                <button onClick={() => setInquiryOpen(true)} className="btn btn-primary">Book Now →</button>
                <a href="https://maps.google.com/?q=Spintex+Road+Accra+Ghana" target="_blank" rel="noopener noreferrer" className="btn btn-outline">Get Directions</a>
              </div>
            </div>
            <div style={{ borderRadius:20, overflow:'hidden', boxShadow:'0 12px 40px rgba(7,22,40,0.14)', border:'2px solid #dce8f7', height:400 }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.6781060898543!2d-0.1028!3d5.6167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwMzcnMDAuMCJOIDDCsDA2JzEwLjAiVw!5e0!3m2!1sen!2sgh!4v1"
                width="100%" height="100%" style={{ border:0, display:'block' }} allowFullScreen loading="lazy" title="Christie's Homestay Location"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <div className="ch-cta">
        <div style={{ maxWidth:760, margin:'0 auto', padding:'0 28px', textAlign:'center', position:'relative', zIndex:1 }}>
          <div style={{ fontSize:48, marginBottom:16 }}>🏡</div>
          <span className="tag" style={{ color:'var(--cyan)', justifyContent:'center' }}>Book Your Stay</span>
          <h2 style={{ fontFamily:"'Oswald',sans-serif", fontSize:'clamp(28px,5vw,52px)', fontWeight:700, color:'#fff', lineHeight:1.1, margin:'14px 0 16px' }}>
            Your <em style={{ fontStyle:'normal', color:'#FFC107' }}>Home in Accra</em><br />Awaits You
          </h2>
          <p style={{ color:'rgba(255,255,255,0.55)', fontSize:15.5, lineHeight:1.8, maxWidth:500, margin:'0 auto 36px' }}>
            Whether you&apos;re visiting for a weekend or an extended stay — Christie&apos;s Homestay gives you the comfort, privacy, and service you deserve.
          </p>
          <div style={{ display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap' }}>
            <button onClick={() => setInquiryOpen(true)} className="btn btn-primary" style={{ fontSize:15, padding:'14px 32px' }}>
              Book Your Stay →
            </button>
            <a href="https://api.whatsapp.com/send?phone=233244783099" target="_blank" rel="noopener noreferrer" className="btn btn-outline-white" style={{ fontSize:15, padding:'14px 32px', display:'inline-flex', alignItems:'center', gap:8 }}>
              💬 WhatsApp for Availability
            </a>
          </div>
          <p style={{ color:'rgba(255,255,255,0.32)', fontSize:12, marginTop:20 }}>
            Or call: <a href="tel:0244783099" style={{ color:'var(--cyan)', fontWeight:700 }}>024 478 3099</a> · <a href="tel:0208812164" style={{ color:'var(--cyan)', fontWeight:700 }}>020 881 2164</a>
          </p>
        </div>
      </div>

      {/* ══ RELATED LINK ══ */}
      <div style={{ background:'var(--off)', padding:'40px 0', borderTop:'1px solid var(--border)' }}>
        <div className="wrap" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:16 }}>
          <div>
            <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:18, fontWeight:700, color:'#071628' }}>Also Looking to Buy Property in Accra?</div>
            <div style={{ fontSize:14, color:'#5a7186', marginTop:4 }}>Explore The Phoenix Enclave — SMIC360&apos;s premier gated residential development.</div>
          </div>
          <Link href="/the-phoenix-enclave" className="btn btn-primary">🏡 View The Phoenix Enclave →</Link>
        </div>
      </div>

      <Footer onBookClick={() => setBookOpen(true)} />
      <ChatPanel />
    </>
  );
}
