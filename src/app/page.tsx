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
import HeroSlider from '@/components/HeroSlider';
import ProjectSpotlight from '@/components/ProjectSpotlight';
import { clImg } from '@/components/ui/cloudinary';

const clientLogos = [
  { src: clImg('https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777112814/a2_az567s.jpg', 200), alt: 'GCB Bank' },
  { src: clImg('https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777112816/a3_y1xfq2.jpg', 200), alt: 'MTN Ghana' },
  { src: clImg('https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777112818/a5_kpnhnw.jpg', 200), alt: 'Cocobod' },
  { src: clImg('https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777112820/a6_gelulp.jpg', 200), alt: 'GNPC' },
  { src: clImg('https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777112823/a7_bta0e1.jpg', 200), alt: 'Stanbic' },
  { src: clImg('https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777112830/a8_uhzxz6.jpg', 200), alt: 'ECG' },
  { src: clImg('https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777112843/a17_l3mpki.jpg', 200), alt: 'Ashfoam' },
];

const projects = [
  { img: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777199309/VCC_dl6ehf.jpg', alt: 'Rebranding Campaign', badge: 'Marketing', title: 'National Brand Relaunch Campaign', desc: 'Full 360 rebranding for a leading Ghanaian consumer goods company.', meta: [{ label: 'Industry', val: 'Consumer Goods' }, { label: 'Duration', val: '4 months' }, { label: 'Result', val: '+38% awareness' }] },
  { img: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777196963/1_j6fe4u.jpg', alt: 'Phoenix Enclave', badge: 'Real Estate', title: 'The Phoenix Enclave — Phase 1', desc: 'Delivery of Phase 1 of our flagship gated community — 24 residential units.', meta: [{ label: 'Units', val: '24 Homes' }, { label: 'Location', val: 'Greater Accra' }, { label: 'Status', val: 'Completed' }] },
  { img: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1776422246/abz_3_hp78qi.jpg', alt: 'Procurement Project', badge: 'Procurement', title: 'Industrial Procurement — GNPC Supply', desc: 'End-to-end procurement of technical equipment for a major state-owned enterprise.', meta: [{ label: 'Value', val: '$2.4M GHS' }, { label: 'Timeline', val: '6 weeks' }, { label: 'Saving', val: '18% cost saving' }] },
  { img: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777196963/1_j6fe4u.jpg', alt: 'Residential Apartments', badge: 'Real Estate', title: 'Modern Residential Apartments — Phase 2', desc: 'Successfully delivered the second phase adding 30 new luxury apartment units.', meta: [{ label: 'Units', val: '30 Apartments' }, { label: 'Location', val: 'Urban Accra' }, { label: 'Features', val: 'Smart Home Ready' }] },
  { img: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1776422246/abz_3_hp78qi.jpg', alt: 'Office Supply', badge: 'Procurement', title: 'Office Furniture & IT Equipment Supply', desc: 'Managed complete procurement and installation of office furniture and IT infrastructure.', meta: [{ label: 'Type', val: 'Office Fit-out' }, { label: 'Items', val: 'Furniture & IT' }, { label: 'Cost', val: 'Optimised by 12%' }] },
  { img: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777223498/medb_kngcnc.jpg', alt: 'Integrated Campaign', badge: 'Marketing', title: 'Integrated Campaign for Local Retailer', desc: 'Multi-channel campaign combining social media, ATL, and local media outreach.', meta: [{ label: 'Sector', val: 'Retail' }, { label: 'Channels', val: 'Digital & OOH' }, { label: 'Sales', val: '+25% increase' }] },
];

const teamMembers = [
  { id: 'christiana', img: clImg('https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777112403/CHRISTIANA_pmwgsx.jpg', 400), name: 'Christiana', role: 'Founder & CEO', bio: 'Over 20 years of industry experience excelling in Advertising, Marketing, and Business Management.', fullBio: "Christiana is the Founder and CEO of SMIC360 Limited. With over 20 years of industry experience, she has excelled in Advertising, Marketing, Business Management, and Hospitality. She also serves as Managing Director of Moonlight Shipping, Facility Manager of Christie's Homestay, Project Manager of The Phoenix Enclave, and Business Manager for Eagle EL Salt Ghana Limited and Osabusquare." },
  { id: 'alberta', img: clImg('https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777112403/ALBERTA_jbrc1f.jpg', 400), name: 'Alberta', role: 'Finance Manager', bio: 'Strategic insight and financial acumen with an MBA in Finance from UGBS and 9+ years of experience.', fullBio: "Alberta holds a background in Sociology & Linguistics and an MBA in Finance from UGBS. She brings a unique blend of strategic insight and financial acumen to SMIC360. With over nine years of experience in administration and finance, she ensures the seamless execution of all projects and manages budgeting to guarantee the company's financial health." },
  { id: 'samuel', img: clImg('https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777112169/NII-BOYE_mixzve.jpg', 400), name: 'Samuel', role: 'Creative & Production Manager', bio: 'Creative lead with 15+ years of experience crafting visually captivating and impactful marketing campaigns.', fullBio: 'Samuel is a dynamic Creative & Production Manager with over 15 years of experience and a BFA in Publishing. He leads the creative team in delivering innovative and impactful marketing solutions, crafting visually captivating campaigns that drive client success.' },
];

const testimonials = [
  { text: '"SMIC360 transformed our brand from a regional player to a nationally recognised name. Their strategic approach and creative execution were exceptional — we saw a 40% increase in brand recall within three months."', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80', name: 'Kofi Agyemang', company: 'CEO, Agyemang Foods Ltd' },
  { text: '"The procurement team at SMIC360 saved us 22% on our annual supply budget without compromising quality. Their vendor network and negotiation skills are truly world-class for a Ghanaian firm."', avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&q=80', name: 'Ama Darkwa', company: 'Operations Director, BuildRight Ghana' },
  { text: '"Investing in a unit at the Phoenix Enclave was one of the best decisions we made. The quality of construction and the SMIC360 team support throughout were all outstanding."', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80', name: 'Emmanuel Osei-Bonsu', company: 'Property Investor, Accra' },
  { text: '"Their digital marketing team completely transformed our online presence. In just 60 days, our social media engagement tripled and we started getting qualified leads from across Ghana."', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80', name: 'Abena Mensah', company: 'Managing Director, Zenith Services' },
];

/* ── Animated counter ── */
function AnimCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = target / (1800 / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target]);
  return <>{count}{suffix}</>;
}

/* ── TEAM MODAL — standalone portal, zero coupling to page scroll state ── */
function TeamModal({
  member,
  onClose,
}: {
  member: typeof teamMembers[0] | null;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  /* Lock html overflow (not body) so fixed portals stay stable */
  useEffect(() => {
    if (!mounted) return;
    if (member) {
      const w = window.innerWidth - document.documentElement.clientWidth;
      document.documentElement.style.overflow = 'hidden';
      document.documentElement.style.paddingRight = w + 'px';
    } else {
      document.documentElement.style.overflow = '';
      document.documentElement.style.paddingRight = '';
    }
    return () => {
      document.documentElement.style.overflow = '';
      document.documentElement.style.paddingRight = '';
    };
  }, [member, mounted]);

  if (!mounted || !member) return null;

  return createPortal(
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(4,14,29,0.92)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 999999,
        padding: '20px 16px',
        overflowY: 'auto',
      }}
    >
      <style>{`@keyframes tmIn{from{opacity:0;transform:translateY(28px) scale(0.95)}to{opacity:1;transform:none}}`}</style>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#fff', width: '100%', maxWidth: 620,
          borderRadius: 20, overflow: 'hidden',
          boxShadow: '0 40px 100px rgba(4,14,29,0.55)',
          borderTop: '4px solid #FFC107',
          animation: 'tmIn 0.38s cubic-bezier(0.16,1,0.3,1) both',
          flexShrink: 0,
        }}
      >
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg,#040e1d 0%,#0b2d56 55%,#1261c0 100%)',
          padding: '32px 28px', display: 'flex', gap: 22, alignItems: 'center',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,180,216,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(0,180,216,0.06) 1px,transparent 1px)', backgroundSize: '24px 24px', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,#FFC107,#00b4d8,#FFC107)' }} />
          <button
            type="button" onClick={onClose}
            style={{ position: 'absolute', top: 14, right: 14, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.22)', color: '#fff', width: 36, height: 36, borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, zIndex: 10, transition: 'background 0.2s', fontFamily: 'inherit' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(220,38,38,0.75)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.12)'; }}
          >✕</button>
          <img src={clImg(member.img, 400)} alt={member.name} style={{ width: 110, height: 110, borderRadius: 14, objectFit: 'cover', border: '3px solid rgba(255,255,255,0.25)', flexShrink: 0, boxShadow: '0 8px 28px rgba(0,0,0,0.35)', position: 'relative', zIndex: 1 }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h3 style={{ fontFamily: "'Oswald',sans-serif", fontSize: 26, fontWeight: 700, color: '#FFC107', margin: 0, lineHeight: 1.1 }}>{member.name}</h3>
            <div style={{ color: '#00b4d8', fontWeight: 700, fontSize: 12.5, letterSpacing: '1.2px', textTransform: 'uppercase', marginTop: 6 }}>{member.role}</div>
            <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
              {['in', 'ig', 'tw'].map(s => (
                <span key={s} style={{ width: 30, height: 30, background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.22)', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 11, fontWeight: 700 }}>{s}</span>
              ))}
            </div>
          </div>
        </div>
        {/* Bio */}
        <div style={{ padding: '28px 32px 36px', color: '#5a7186', lineHeight: 1.85, fontSize: 15.5 }}>{member.fullBio}</div>
      </div>
    </div>,
    document.body
  );
}

/* ── CTA Banner with background image + download animation ── */
function CtaBanner({ onBook }: { onBook: () => void }) {
  const [dlState, setDlState] = useState<'idle'|'loading'|'done'>('idle');

  const handleDownload = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setDlState('loading');
    setTimeout(() => {
      setDlState('done');
      window.open('https://drive.google.com/file/d/1wrGYrHFkH5t9H4DT0B_rnDYkdFifEqvn/view?usp=sharing', '_blank');
      setTimeout(() => setDlState('idle'), 3000);
    }, 1400);
  };

  return (
    <div style={{
      position: 'relative',
      overflow: 'hidden',
      backgroundImage: [
        'linear-gradient(135deg, rgba(4,14,50,0.93) 0%, rgba(10,40,110,0.88) 50%, rgba(18,97,192,0.82) 100%)',
        `url('https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777694366/hp_nukt5i.jpg')`,
      ].join(', '),
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundBlendMode: 'luminosity',
    }}>
      <style>{`
        @keyframes cta-spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes cta-pop  { 0%{transform:scale(1)} 40%{transform:scale(1.08)} 100%{transform:scale(1)} }
        .cta-dl-btn {
          display:inline-flex; align-items:center; gap:9px;
          background:#fff; color:#071628;
          font-family:'Outfit',sans-serif; font-weight:700; font-size:14.5px;
          padding:13px 26px; border-radius:12px; border:none; cursor:pointer;
          text-decoration:none;
          transition:all 0.25s;
          box-shadow:0 4px 18px rgba(255,255,255,0.15);
          white-space:nowrap;
        }
        .cta-dl-btn:hover { transform:translateY(-2px); box-shadow:0 10px 32px rgba(255,255,255,0.2); }
        .cta-dl-btn.loading { background:rgba(255,255,255,0.85); cursor:wait; }
        .cta-dl-btn.done { background:#16a34a; color:#fff; animation:cta-pop 0.4s ease; }
        .cta-spinner {
          width:18px; height:18px;
          border:2.5px solid rgba(7,22,40,0.2);
          border-top-color:#071628;
          border-radius:50%;
          animation:cta-spin 0.7s linear infinite;
          flex-shrink:0;
        }
        .cta-spinner.white {
          border-color:rgba(255,255,255,0.2);
          border-top-color:#fff;
        }
      `}</style>

      {/* Overlay grid pattern */}
      <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)', backgroundSize:'32px 32px', pointerEvents:'none' }} />
      {/* Top accent line */}
      <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:'linear-gradient(90deg,#FFC107,#00b4d8,#FFC107)' }} />

      <div style={{ maxWidth:1200, margin:'0 auto', padding:'72px 28px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:40, flexWrap:'wrap', position:'relative', zIndex:1 }}>
        <div style={{ flex:'1 1 400px' }}>
          <span style={{ display:'inline-flex', alignItems:'center', gap:8, fontSize:11, fontWeight:700, letterSpacing:'1.8px', textTransform:'uppercase', color:'#00b4d8', marginBottom:14 }}>
            <span style={{ display:'block', width:20, height:2, background:'#00b4d8', borderRadius:2 }} />
            2025 Service Catalogue
          </span>
          <h2 style={{ fontFamily:"'Oswald',sans-serif", fontSize:'clamp(26px,3.5vw,40px)', fontWeight:700, color:'#fff', lineHeight:1.15, marginBottom:14 }}>
            Scale Your Business<br />with Our <em style={{ fontStyle:'normal', color:'#FFC107' }}>2025 Catalogue</em>
          </h2>
          <p style={{ color:'rgba(255,255,255,0.6)', fontSize:15, lineHeight:1.75, maxWidth:480 }}>
            Download the full SMIC360 solutions catalogue — complete service listings, pricing tiers, real estate specs, and procurement frameworks all in one place.
          </p>
        </div>

        <div style={{ display:'flex', flexDirection:'column', gap:12, alignItems:'flex-start', flexShrink:0 }}>
          <a
            href="https://drive.google.com/file/d/1wrGYrHFkH5t9H4DT0B_rnDYkdFifEqvn/view?usp=sharing"
            onClick={handleDownload}
            className={`cta-dl-btn${dlState === 'loading' ? ' loading' : dlState === 'done' ? ' done' : ''}`}
          >
            {dlState === 'idle' && (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 16l-4-4h3V4h2v8h3l-4 4z"/><path d="M4 20h16"/>
              </svg>
            )}
            {dlState === 'loading' && <span className="cta-spinner" />}
            {dlState === 'done' && <span>✓</span>}
            {dlState === 'idle'   && 'Download Catalogue'}
            {dlState === 'loading'&& 'Opening...'}
            {dlState === 'done'   && 'Opened! Check new tab'}
          </a>
          <button
            onClick={onBook}
            style={{ display:'inline-flex', alignItems:'center', gap:8, background:'transparent', color:'rgba(255,255,255,0.8)', fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:14, padding:'12px 24px', borderRadius:12, border:'1.5px solid rgba(255,255,255,0.25)', cursor:'pointer', transition:'all 0.25s', whiteSpace:'nowrap' }}
            onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.background='rgba(255,255,255,0.08)'; (e.currentTarget as HTMLButtonElement).style.borderColor='rgba(255,255,255,0.5)';}}
            onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.background='transparent'; (e.currentTarget as HTMLButtonElement).style.borderColor='rgba(255,255,255,0.25)';}}
          >
            Book A Call
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── PAGE ── */
export default function HomePage() {
  const [bookOpen, setBookOpen]     = useState(false);
  const [teamModal, setTeamModal]   = useState<typeof teamMembers[0] | null>(null);
  const [consultEmail, setConsultEmail]     = useState('');
  const [consultDone, setConsultDone]       = useState(false);
  const [consultLoading, setConsultLoading] = useState(false);
  const [activeProcess, setActiveProcess]   = useState(0);

  const openBook = () => setBookOpen(true);

  const handleConsult = async (e: React.FormEvent) => {
    e.preventDefault();
    setConsultLoading(true);
    try {
      const response = await fetch('https://formspree.io/f/xdayrral', {
        method: 'POST',
        body: new FormData(e.currentTarget as HTMLFormElement),
        headers: { Accept: 'application/json' },
      });
      if (response.ok) { setConsultDone(true); setConsultEmail(''); }
    } catch { /* silent */ }
    setConsultLoading(false);
  };

  const processSteps = [
    { icon: '🔍', title: 'Discovery',  subtitle: 'We Listen First',     desc: 'Every engagement starts with a deep-dive session to understand your goals, challenges, market position, and success metrics.' },
    { icon: '🧠', title: 'Strategy',   subtitle: 'Blueprint for Growth', desc: 'Our multi-discipline team builds a bespoke strategy — marketing plan, property brief, or procurement framework tailored to you.' },
    { icon: '⚡', title: 'Execution',  subtitle: 'Precision Delivery',   desc: 'We execute with speed and precision across all three service lines, with dedicated project managers ensuring quality at every step.' },
    { icon: '📈', title: 'Results',    subtitle: 'Measurable Impact',    desc: 'We track and report against agreed KPIs — giving you full visibility into ROI, project milestones, and growth metrics.' },
  ];

  const properties = [
    { img: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777111208/WhatsApp-Image-2025-08-18-at-14.16.35_e93040d9l_gwfnmu.jpg', title: 'Phoenix Enclave — Phase II',    type: 'Residential',  beds: 3, baths: 2, area: '180 m²', price: 'From GH₵ 850,000',   status: 'Available', location: 'Spintex, Accra' },
    { img: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777196963/1_j6fe4u.jpg',                                              title: 'Executive Villa — Cantonments', type: 'Luxury Villa',  beds: 5, baths: 4, area: '380 m²', price: 'From GH₵ 2,200,000', status: 'Limited',   location: 'Cantonments, Accra' },
    { img: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777106950/Foxcooling-website-cover_p5grjz.jpg',                       title: 'Commercial Space — East Legon', type: 'Commercial',   beds: 0, baths: 2, area: '260 m²', price: 'From GH₵ 1,100,000', status: 'New',       location: 'East Legon, Accra' },
  ];

  return (
    <>
      <style>{`
        .stats-ribbon{background:linear-gradient(135deg,#040e1d 0%,#0b2d56 50%,#1261c0 100%);padding:40px 0;position:relative;overflow:hidden}
        .stats-ribbon-inner{max-width:1200px;margin:0 auto;padding:0 28px;display:grid;grid-template-columns:repeat(4,1fr);gap:20px;position:relative;z-index:1}
        .stats-item{text-align:center;padding:20px 16px;border-radius:16px;border:1px solid rgba(255,255,255,0.07);background:rgba(255,255,255,0.04);transition:all 0.3s}
        .stats-item:hover{background:rgba(255,255,255,0.08);border-color:rgba(255,193,7,0.2);transform:translateY(-3px)}
        .stats-num{font-family:'Oswald',sans-serif;font-size:46px;font-weight:700;color:var(--gold);line-height:1}
        .stats-label{font-size:12px;font-weight:600;color:rgba(255,255,255,0.55);margin-top:8px;text-transform:uppercase;letter-spacing:1px}
        .stats-desc{font-size:11.5px;color:rgba(255,255,255,0.32);margin-top:4px;line-height:1.4}
        .process-section{padding:100px 0;background:var(--navy);position:relative;overflow:hidden}
        .process-grid{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center;position:relative;z-index:1}
        .process-steps{display:flex;flex-direction:column;gap:4px}
        .process-step{padding:20px 24px;border-radius:16px;border:1px solid rgba(255,255,255,0.06);cursor:pointer;transition:all 0.3s;display:flex;gap:18px;align-items:center}
        .process-step.active{background:rgba(255,193,7,0.08);border-color:rgba(255,193,7,0.25)}
        .process-step:hover{background:rgba(255,255,255,0.04)}
        .process-step-num{width:44px;height:44px;border-radius:12px;background:rgba(255,255,255,0.06);color:rgba(255,255,255,0.4);font-family:'Oswald',sans-serif;font-size:18px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all 0.3s}
        .process-step.active .process-step-num{background:var(--gold);color:var(--navy)}
        .process-step-text h4{font-family:'Oswald',sans-serif;font-size:17px;font-weight:700;color:rgba(255,255,255,0.6);transition:color 0.3s}
        .process-step.active .process-step-text h4{color:#fff}
        .process-step-text p{font-size:12.5px;color:rgba(255,255,255,0.35);margin-top:2px}
        .process-detail{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);border-radius:24px;padding:44px;position:relative;overflow:hidden}
        .process-detail::before{content:'';position:absolute;top:-1px;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--gold),var(--cyan))}
        .process-detail-icon{font-size:52px;margin-bottom:20px;display:block;line-height:1}
        .process-detail h3{font-family:'Oswald',sans-serif;font-size:32px;font-weight:700;color:#fff;margin-bottom:8px}
        .process-detail-sub{font-size:13px;font-weight:700;color:var(--gold);text-transform:uppercase;letter-spacing:1.5px;margin-bottom:16px}
        .process-detail p{color:rgba(255,255,255,0.6);font-size:15.5px;line-height:1.8}
        .properties-section{padding:100px 0;background:var(--off)}
        .prop-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:26px;margin-top:48px}
        .prop-card{background:#fff;border-radius:20px;overflow:hidden;box-shadow:var(--sh);transition:all 0.32s cubic-bezier(0.16,1,0.3,1);border:1px solid var(--border)}
        .prop-card:hover{transform:translateY(-8px);box-shadow:var(--sh-lg);border-color:var(--gold)}
        .prop-img{position:relative;height:220px;overflow:hidden}
        .prop-img img{width:100%;height:100%;object-fit:cover;transition:transform 0.5s ease}
        .prop-card:hover .prop-img img{transform:scale(1.07)}
        .prop-status{position:absolute;top:14px;left:14px;padding:4px 12px;border-radius:20px;font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px}
        .prop-status.available{background:rgba(22,163,74,0.9);color:#fff}
        .prop-status.limited{background:rgba(234,88,12,0.9);color:#fff}
        .prop-status.new{background:rgba(7,22,40,0.9);color:var(--gold);border:1px solid rgba(255,193,7,0.3)}
        .prop-type{position:absolute;top:14px;right:14px;background:rgba(7,22,40,0.85);backdrop-filter:blur(8px);color:rgba(255,255,255,0.85);padding:4px 10px;border-radius:8px;font-size:10.5px;font-weight:600}
        .prop-body{padding:22px}
        .prop-location{font-size:11.5px;color:var(--muted);margin-bottom:8px}
        .prop-body h3{font-family:'Oswald',sans-serif;font-size:19px;font-weight:700;color:var(--navy);line-height:1.2;margin-bottom:12px}
        .prop-specs{display:flex;gap:16px;margin-bottom:14px;padding-bottom:14px;border-bottom:1px solid var(--border)}
        .prop-spec{font-size:12.5px;color:var(--muted)}
        .prop-price{font-family:'Oswald',sans-serif;font-size:20px;font-weight:700;color:var(--gold-d)}
        .prop-cta{display:flex;gap:8px;margin-top:14px}
        .ghana-strip{background:linear-gradient(135deg,#006B3F 0%,#007a47 40%,#FCD116 70%,#CE1126 100%);padding:32px 0;position:relative;overflow:hidden}
        .ghana-strip::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(0,0,0,0.55),rgba(0,0,0,0.25))}
        .ghana-strip-inner{max-width:1200px;margin:0 auto;padding:0 28px;display:flex;align-items:center;justify-content:space-between;gap:20px;flex-wrap:wrap;position:relative;z-index:1}
        .ghana-strip-text h3{font-family:'Oswald',sans-serif;font-size:clamp(20px,3vw,30px);font-weight:700;color:#fff}
        .ghana-strip-text p{color:rgba(255,255,255,0.75);font-size:14px;margin-top:4px}
        @media(max-width:768px){
          .stats-ribbon-inner{grid-template-columns:repeat(2,1fr)}
          .process-grid{grid-template-columns:1fr}
          .prop-grid{grid-template-columns:1fr}
          .ghana-strip-inner{flex-direction:column;text-align:center}
        }
      `}</style>

      <ScrollReveal />
      <Topbar />
      <Navbar onBookClick={openBook} />

      {/* ── MODALS — portal-rendered, always above everything ── */}
      <BookingModal isOpen={bookOpen} onClose={() => setBookOpen(false)} />
      <TeamModal member={teamModal} onClose={() => setTeamModal(null)} />

      {/* ── HERO ── */}
      <HeroSlider onBookClick={openBook} />

      {/* ── Stats Ribbon ── */}
      <div className="stats-ribbon">
        <div className="stats-ribbon-inner stagger">
          {[
            { num: 150, suffix: '+', label: 'Projects Delivered', desc: 'Across all three divisions' },
            { num: 80,  suffix: '+', label: 'Happy Clients',      desc: 'Across Ghana & West Africa' },
            { num: 8,   suffix: '',  label: 'Years of Excellence', desc: 'Established in Accra' },
            { num: 3,   suffix: '',  label: 'Core Divisions',      desc: 'Marketing · Real Estate · Procurement' },
          ].map((s, i) => (
            <div key={i} className="stats-item">
              <div className="stats-num"><AnimCounter target={s.num} suffix={s.suffix} /></div>
              <div className="stats-label">{s.label}</div>
              <div className="stats-desc">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Service Ribbon ── */}
      <div className="ribbon">
        <div className="wrap">
          <div className="ribbon-head">
            <span className="ribbon-head-label">Our Three Main Services</span>
            <Link href="/solutions" className="btn btn-outline" style={{ fontSize: '12px', padding: '8px 16px' }}>View All Solutions →</Link>
          </div>
          <div className="ribbon-grid stagger">
            {[
              { icon: '📣', title: 'Advertising & Marketing Solutions', desc: '360 Marketing & Branding Solutions for your brand and business.' },
              { icon: '🏗️', title: 'Real Estate Development',           desc: 'A mini gated community strategically developed in a serene and secured locality.' },
              { icon: '📦', title: 'Procurement & Supply Services',      desc: 'Tailormade Procurement and supply services designed to give you value for money.' },
            ].map((s, i) => (
              <Link key={i} href="/solutions" className="ribbon-card">
                <div className="ribbon-card-icon">{s.icon}</div>
                <div className="ribbon-card-text">
                  <h4>{s.title}</h4><p>{s.desc}</p>
                  <span className="ribbon-card-link">Learn More →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── About ── */}
      <section className="about">
        <div className="wrap">
          <div className="about-grid">
            <div className="about-img-wrap reveal-left">
              <img className="about-img-main" src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80" alt="SMIC360 team meeting" />
              <div className="about-badge">
                <span className="about-badge-num">8+</span>
                <span className="about-badge-sub">Years of Excellence</span>
              </div>
            </div>
            <div className="about-text reveal-right">
              <span className="tag">Who We Are</span>
              <h2 className="section-title">Dedicated to <em>360° Excellence</em></h2>
              <p className="section-sub">SMIC360 Limited is a Ghanaian multi-sector company built on one conviction: great businesses deserve great partners. We integrate marketing brilliance, real estate development, and smart procurement into one seamless ecosystem.</p>
              <div className="about-points">
                {[
                  { icon: '🎯', title: 'Strategy First',             desc: 'Every solution starts with a tailored strategy built around your goals.' },
                  { icon: '🤝', title: 'Client-Centric',            desc: 'We are always available — your success is our benchmark.' },
                  { icon: '🏆', title: 'Proven Track Record',       desc: '150+ projects across marketing, real estate and supply chains.' },
                  { icon: '🌍', title: 'Ghana-Rooted, Pan-African', desc: 'Built in Accra with a vision that extends across the continent.' },
                ].map((pt, i) => (
                  <div key={i} className="apoint">
                    <div className="apoint-icon">{pt.icon}</div>
                    <div><h4>{pt.title}</h4><p>{pt.desc}</p></div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '28px', display: 'flex', gap: '12px' }}>
                <Link href="/about" className="btn btn-primary">Our Story</Link>
                <Link href="/about" className="btn btn-outline">Meet The Team</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Ghana Pride Strip ── */}
      <div className="ghana-strip">
        <div className="ghana-strip-inner">
          <div className="ghana-strip-text">
            <h3>Proudly Ghanaian. Built to Pan-African Standards.</h3>
            <p>SMIC360 is headquartered in Accra — deeply rooted in Ghana&apos;s business culture with a vision across Africa.</p>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
            <Link href="/about" className="btn btn-white">Our Story →</Link>
            <button onClick={openBook} className="btn btn-outline-white">Partner With Us</button>
          </div>
        </div>
      </div>

      {/* ── Video Tour ── */}
      <section style={{ padding: '100px 0', background: 'var(--navy)', position: 'relative', overflow: 'hidden' }}>
        <div className="wrap">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap', marginBottom: 52 }} className="reveal">
            <div>
              <span className="tag" style={{ color: 'var(--cyan)' }}>Property Tour</span>
              <h2 className="section-title" style={{ color: '#fff' }}>The <em>Phoenix Enclave</em></h2>
              <p className="section-sub" style={{ color: 'rgba(255,255,255,0.5)', marginTop: 8 }}>Walk through Ghana&apos;s most anticipated gated community — filmed on-site.</p>
            </div>
            <a href="https://www.youtube.com/watch?v=56ZbiZGh0SM" target="_blank" rel="noopener noreferrer" className="btn btn-outline-white" style={{ fontSize: '12px', padding: '9px 18px' }}>Watch on YouTube →</a>
          </div>
          <div className="reveal" style={{ borderRadius: 24, overflow: 'hidden', border: '2px solid rgba(255,193,7,0.3)', boxShadow: '0 32px 80px rgba(0,0,0,0.5)' }}>
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
              <iframe
                src="https://www.youtube.com/embed/56ZbiZGh0SM?si=EjwaDtu3YTE4AUGU&autoplay=1&mute=1"
                title="The Phoenix Enclave Tour"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0, display: 'block' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Clients ── */}
      <div className="clients">
        <div className="wrap">
          <div className="clients-label">Trusted By Leading Organisations Across Ghana</div>
          <div className="clients-marquee">
            <div className="clients-track">
              {[...clientLogos, ...clientLogos].map((logo, i) => (
                <div key={i} className="client-logo"><img src={logo.src} alt={logo.alt} loading="lazy" /></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Capabilities ── */}
      <section className="capabilities">
        <div className="wrap">
          <div style={{ textAlign: 'center' }} className="reveal">
            <span className="tag" style={{ justifyContent: 'center' }}>What We Do Best</span>
            <h2 className="section-title">Our Three Core <em>Services</em></h2>
          </div>
          <div className="cap-grid stagger">
            {[
              { img: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777114247/kkkl_nhdczf.avif',                                                                                                  alt: 'Brand Strategy', title: 'Advertising & Marketing Solutions', desc: '360 Marketing & Branding Solutions for your brand and business.', href: '/solutions' },
              { img: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777111208/WhatsApp-Image-2025-08-18-at-14.16.35_e93040d9l_gwfnmu.jpg',                                                    alt: 'Real Estate',    title: 'Real Estate Development',           desc: 'A mini gated community strategically developed in a serene and secured locality.', href: '/solutions' },
              { img: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777655037/360sm_mqzf0p.png', alt: 'Procurement',    title: 'Procurement & Supply Services',      desc: 'Tailormade Procurement and supply services designed to give you value for money.', href: '/solutions' },
            ].map((cap, i) => (
              <div key={i} className="cap-card">
                <div className="cap-img"><img src={cap.img} alt={cap.alt} /></div>
                <div className="cap-body">
                  <h3>{cap.title}</h3><p>{cap.desc}</p>
                  <Link href={cap.href} className="btn btn-outline" style={{ marginTop: '20px', width: '100%', justifyContent: 'center' }}>Learn More</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
{/* ── Process ── */}
<section
  className="process-section"
  style={{
    position: 'relative',
    padding: '100px 0',
    backgroundImage: `
      linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.85)),
      url('https://res.cloudinary.com/dwsl2ktt2/image/upload/v1776533938/e21881a3_vb8pcu.jpg')
    `,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }}
>
  <div className="wrap">
    <div
      style={{ textAlign: 'center', marginBottom: '52px' }}
      className="reveal"
    >
      <span
        className="tag"
        style={{ justifyContent: 'center', color: 'var(--cyan)' }}
      >
        How We Work
      </span>

      <h2 className="section-title" style={{ color: '#fff' }}>
        Our <em>4-Step</em> Process
      </h2>

      <p
        className="section-sub"
        style={{
          margin: '12px auto 0',
          textAlign: 'center',
          color: 'rgba(255,255,255,0.52)'
        }}
      >
        From first conversation to final delivery — a seamless, transparent
        process that puts your goals first.
      </p>
    </div>

    <div className="process-grid reveal">
      <div className="process-steps">
        {processSteps.map((step, i) => (
          <div
            key={i}
            className={`process-step${
              activeProcess === i ? ' active' : ''
            }`}
            onClick={() => setActiveProcess(i)}
          >
            <div className="process-step-num">
              {String(i + 1).padStart(2, '0')}
            </div>

            <div className="process-step-text">
              <h4>
                {step.icon} {step.title}
              </h4>
              <p>{step.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="process-detail">
        <span className="process-detail-icon">
          {processSteps[activeProcess].icon}
        </span>

        <div className="process-detail-sub">
          Step {activeProcess + 1} of 4
        </div>

        <h3>{processSteps[activeProcess].title}</h3>
        <p>{processSteps[activeProcess].desc}</p>

        <div style={{ marginTop: '28px' }}>
          <button onClick={openBook} className="btn btn-primary">
            Start Your Journey →
          </button>
        </div>
      </div>
    </div>
  </div>
</section>



      {/* ── Property Listings ── */}
      <section className="properties-section">
        <div className="wrap">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }} className="reveal">
            <div>
              <span className="tag">Real Estate</span>
              <h2 className="section-title">Featured <em>Properties</em></h2>
              <p className="section-sub">Explore our current residential and commercial listings in prime Accra locations.</p>
            </div>
            <Link href="/solutions" className="btn btn-outline" style={{ alignSelf: 'flex-end' }}>View All Properties →</Link>
          </div>
          <div className="prop-grid stagger">
            {properties.map((prop, i) => (
              <div key={i} className="prop-card">
                <div className="prop-img">
                  <img src={prop.img} alt={prop.title} />
                  <span className={`prop-status ${prop.status.toLowerCase()}`}>{prop.status}</span>
                  <span className="prop-type">{prop.type}</span>
                </div>
                <div className="prop-body">
                  <div className="prop-location">📍 {prop.location}</div>
                  <h3>{prop.title}</h3>
                  <div className="prop-specs">
                    {prop.beds > 0 && <span className="prop-spec">🛏 {prop.beds} Beds</span>}
                    <span className="prop-spec">🚿 {prop.baths} Baths</span>
                    <span className="prop-spec">📐 {prop.area}</span>
                  </div>
                  <div className="prop-price">{prop.price}</div>
                  <div className="prop-cta">
                    <button onClick={openBook} className="btn btn-primary" style={{ flex: 1, justifyContent: 'center', fontSize: '13px', padding: '10px' }}>Enquire Now</button>
                    <Link href="/solutions" className="btn btn-outline" style={{ flex: 1, justifyContent: 'center', fontSize: '13px', padding: '10px' }}>Details</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Phoenix Enclave ── */}
      <section className="featured">
        <div className="wrap">
          <div className="feat-grid">
            <div className="feat-img reveal-left">
              <img src="https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777111208/WhatsApp-Image-2025-08-18-at-14.16.35_e93040d9l_gwfnmu.jpg" alt="Phoenix Enclave" />
              <div className="feat-img-caption"><h3>The Phoenix Enclave</h3><p>A modern mini gated community — serene, secured, and strategically located.</p></div>
            </div>
            <div className="reveal-right">
              <span className="tag">Flagship Development</span>
              <h2 className="section-title">Built for <em>Ghana</em></h2>
              <p className="section-sub">The Phoenix Enclave is SMIC360&apos;s premier real estate offering — thoughtfully designed residential and commercial spaces built with modern architecture and premium finishes.</p>
              <div className="feat-items">
                {[
                  { icon: '🏡', title: 'Gated & Secured Community', desc: '24/7 security, controlled access, and a peaceful neighbourhood environment.' },
                  { icon: '🏛️', title: 'Modern Architecture',       desc: 'Contemporary designs that blend aesthetics with functionality — built to last.' },
                  { icon: '📍', title: 'Strategic Location',         desc: "Positioned in a serene locality with convenient access to Accra's key commercial hubs." },
                  { icon: '💼', title: 'Investment Opportunity',     desc: "High ROI potential in one of Ghana's fastest-growing real estate corridors." },
                ].map((item, i) => (
                  <div key={i} className="feat-item">
                    <div className="feat-item-icon">{item.icon}</div>
                    <div><h4>{item.title}</h4><p>{item.desc}</p></div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '28px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link href="/solutions" className="btn btn-primary">Explore The Enclave</Link>
                <button onClick={openBook} className="btn btn-outline">Book a Site Visit</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <CtaBanner onBook={openBook} />

      {/* ── Project Spotlight ── */}
      <ProjectSpotlight projects={projects} onBook={openBook} />

      {/* ── Team ── */}
      <section className="team">
        <div className="wrap">
          <div style={{ textAlign: 'center' }} className="reveal">
            <span className="tag" style={{ justifyContent: 'center' }}>The People</span>
            <h2 className="section-title">Meet <em>The Experts</em></h2>
            <p className="section-sub" style={{ margin: '12px auto 0', textAlign: 'center' }}>A dedicated team of strategists, creatives, engineers, and specialists — united by one goal: your success.</p>
          </div>
          <div className="team-grid stagger">
            {teamMembers.map((member, i) => (
              <div
                key={i}
                className="team-card"
                onClick={() => setTeamModal(member)}
                style={{ cursor: 'pointer', transitionDelay: `${i * 0.15}s` }}
              >
                <div className="team-card-socials">
                  {['in', 'ig', 'tw'].map(s => (
                    <a key={s} href="#" className="team-social-icon" onClick={e => e.stopPropagation()}>{s}</a>
                  ))}
                </div>
                <div className="team-img"><img src={member.img} alt={`${member.name} — ${member.role}`} /></div>
                <div className="team-body">
                  <h3>{member.name}</h3>
                  <div className="team-role">{member.role}</div>
                  <p>{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="testimonials">
        <div className="wrap">
          <div className="testi-head reveal">
            <div>
              <span className="tag">Client Feedback</span>
              <h2 className="section-title">Trusted <em>Across Ghana</em></h2>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '14px', color: 'var(--muted)', maxWidth: '280px', lineHeight: '1.6', marginBottom: '12px' }}>Real results. Real clients. Real growth stories.</p>
              <a href="https://www.google.com/search?q=SMIC360+LIMITED#lrd=0xfdf8402e54ac0bd:0x37c47d7434f4203c,3" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ fontSize: '12px', padding: '8px 16px' }}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" style={{ width: '14px', display: 'inline-block', verticalAlign: 'middle' }} alt="Google" />&nbsp;Write a Review
              </a>
            </div>
          </div>
          <div className="testi-marquee">
            <div className="testi-track">
              {[...testimonials, ...testimonials].map((t, i) => (
                <div key={i} className="testi-card">
                  <div className="testi-stars">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" className="google-icon" alt="Google" />
                    ★★★★★
                  </div>
                  <p className="testi-text">{t.text}</p>
                  <div className="testi-author">
                    <img className="testi-avatar" src={t.avatar} alt={t.name} />
                    <div><div className="testi-author-name">{t.name}</div><div className="testi-author-co">{t.company}</div></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HQ Map ── */}
      <section className="hq">
        <div className="wrap">
          <div className="hq-grid">
            <div className="reveal-left">
              <span className="tag">Where To Find Us</span>
              <h2 className="section-title">Our <em>Headquarters</em></h2>
              <p className="section-sub">We are based in the heart of Accra and always available to serve you.</p>
              <div className="hq-details">
                {[
                  { icon: '📍', title: 'Office Address', desc: '1st Floor, Verostina House, Opp. DSTV Office, Community 18, Off Spintex Road, Accra' },
                  { icon: '📞', title: 'Phone',          desc: '024 478 3099 — We are always available to serve you' },
                  { icon: '✉️', title: 'Email',          desc: 'info@smic360.com — Expect a reply within 2 business hours' },
                  { icon: '🕐', title: 'Office Hours',   desc: 'Monday – Friday: 8:00 AM – 6:00 PM | Saturday: 9:00 AM – 2:00 PM' },
                ].map((item, i) => (
                  <div key={i} className="hq-detail-item">
                    <div className="hq-detail-icon">{item.icon}</div>
                    <div className="hq-detail-text"><h4>{item.title}</h4><p>{item.desc}</p></div>
                  </div>
                ))}
              </div>
              <a href="https://maps.google.com/?q=SMIC360+LIMITED" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ marginTop: '24px' }}>Get Directions →</a>
            </div>
            <div className="reveal-right">
              <div className="hq-map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d63528.36050131504!2d-0.076514!3d5.637253!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf8402e54ac0bd%3A0x37c47d7434f4203c!2sSMIC360%20LIMITED!5e0!3m2!1sen!2sus!4v1777199771968!5m2!1sen!2sus"
                  width="600" height="450" style={{ border: 0 }} allowFullScreen loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade" title="SMIC360 Location"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Consultation CTA ── */}
      <section className="consult">
        <div className="consult-inner reveal">
          <span className="tag">Let&apos;s Work Together</span>
          <h2 className="consult-title">Get A <em>Free Consultation</em></h2>
          <p className="consult-sub">Tell us about your business challenge. Whether it&apos;s a brand refresh, a property investment, or a procurement need — our team will put together a bespoke solution within 24 hours.</p>
          {!consultDone ? (
            <form className="consult-form" onSubmit={handleConsult}>
              <input type="email" name="email" placeholder="Enter your email address" value={consultEmail} onChange={e => setConsultEmail(e.target.value)} required />
              <button type="submit" className="btn btn-primary" disabled={consultLoading}>{consultLoading ? 'Sending...' : 'Get Started →'}</button>
            </form>
          ) : (
            <p style={{ color: 'var(--cyan)', fontWeight: 700, fontSize: '16px', marginTop: '8px' }}>✔ Thank you! We&apos;ll be in touch within 2 business hours.</p>
          )}
          <p style={{ marginTop: '14px', fontSize: '12px', color: 'rgba(255,255,255,.32)' }}>
            Or call us: <a href="tel:0244783099" style={{ color: 'var(--cyan)', fontWeight: 700 }}>024 478 3099</a> — No obligation, no spam.
          </p>
        </div>
      </section>

      <Footer onBookClick={openBook} />
      <ChatPanel />
    </>
  );
}
