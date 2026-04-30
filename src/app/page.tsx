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

/* ─── Data ─────────────────────────────────────── */
const caseStudies = [
  {
    img: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777114247/kkkl_nhdczf.avif',
    alt: 'Marketing Case',
    tag: 'Marketing',
    title: 'National Brand Relaunch',
    desc: 'The Challenge: A legacy brand losing market share. Our Process: Deep market research followed by a 360° creative pivot and digital expansion.',
    solution: '+38% awareness & record sales growth.',
  },
  {
    img: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777111208/WhatsApp-Image-2025-08-18-at-14.16.35_e93040d9l_gwfnmu.jpg',
    alt: 'Real Estate Case',
    tag: 'Real Estate',
    title: 'The Phoenix Enclave Phase I',
    desc: 'The Challenge: High demand for secure housing in Accra. Our Process: Strategic land acquisition and precision construction management.',
    solution: '24 premium units delivered on schedule.',
  },
  {
    img: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777106950/ec234641a21a9e03c50b708351c53603_vl5piv.jpg',
    alt: 'Procurement Case',
    tag: 'Procurement',
    title: 'Industrial Supply for GNPC',
    desc: 'The Challenge: Critical equipment needed with high specs. Our Process: Global vendor negotiation and logistics optimization.',
    solution: '18% cost saving on technical consumables.',
  },
  {
    img: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1776533939/ab942b64_f6uozz.jpg',
    alt: 'Integrated Solution',
    tag: 'Integrated',
    title: 'Corporate HQ Transformation',
    desc: 'The Challenge: New office needed branding and interior supply. Our Process: Unified brand identity paired with precision procurement.',
    solution: 'Complete move-in and brand launch in 60 days.',
  },
];

const clientLogos = [
  {
    src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777112814/a2_az567s.jpg',
    alt: 'GCB Bank',
  },
  {
    src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777112816/a3_y1xfq2.jpg',
    alt: 'MTN Ghana',
  },
  {
    src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777112818/a5_kpnhnw.jpg',
    alt: 'Cocobod',
  },
  {
    src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777112820/a6_gelulp.jpg',
    alt: 'GNPC',
  },
  {
    src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777112823/a7_bta0e1.jpg',
    alt: 'Stanbic',
  },
  {
    src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777112830/a8_uhzxz6.jpg',
    alt: 'ECG',
  },
  {
    src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777112843/a17_l3mpki.jpg',
    alt: 'Ashfoam',
  },
];

const projects = [
  {
    img: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777199309/VCC_dl6ehf.jpg',
    alt: 'Rebranding Campaign',
    badge: 'Marketing',
    title: 'National Brand Relaunch Campaign',
    desc: 'Full 360° rebranding for a leading Ghanaian consumer goods company — new identity, packaging, and digital campaign launch.',
    meta: [
      { label: 'Industry', val: 'Consumer Goods' },
      { label: 'Duration', val: '4 months' },
      { label: 'Result', val: '+38% awareness' },
    ],
  },
  {
    img: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777196963/1_j6fe4u.jpg',
    alt: 'Phoenix Enclave',
    badge: 'Real Estate',
    title: 'The Phoenix Enclave — Phase 1',
    desc: 'Delivery of Phase 1 of our flagship gated community — 24 residential units, landscaping, and full utilities infrastructure.',
    meta: [
      { label: 'Units', val: '24 Homes' },
      { label: 'Location', val: 'Greater Accra' },
      { label: 'Status', val: 'Completed' },
    ],
  },
  {
    img: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1776422246/abz_3_hp78qi.jpg',
    alt: 'Procurement Project',
    badge: 'Procurement',
    title: 'Industrial Procurement — GNPC Supply',
    desc: 'End-to-end procurement of technical equipment and consumables for a major state-owned enterprise — on time, on spec.',
    meta: [
      { label: 'Value', val: '$2.4M GHS' },
      { label: 'Timeline', val: '6 weeks' },
      { label: 'Saving', val: '18% cost saving' },
    ],
  },
  {
    img: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777196963/1_j6fe4u.jpg',
    alt: 'Residential Apartments',
    badge: 'Real Estate',
    title: 'Modern Residential Apartments — Phase 2',
    desc: 'Successfully delivered the second phase of a modern residential complex, adding 30 new luxury apartment units.',
    meta: [
      { label: 'Units', val: '30 Apartments' },
      { label: 'Location', val: 'Urban Accra' },
      { label: 'Features', val: 'Smart Home Ready' },
    ],
  },
  {
    img: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1776422246/abz_3_hp78qi.jpg',
    alt: 'Office Supply',
    badge: 'Procurement',
    title: 'Office Furniture & IT Equipment Supply',
    desc: 'Managed the complete procurement and installation of office furniture and IT infrastructure for a new corporate headquarters.',
    meta: [
      { label: 'Type', val: 'Office Fit-out' },
      { label: 'Items', val: 'Furniture & IT' },
      { label: 'Cost', val: 'Optimised by 12%' },
    ],
  },
  {
    img: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777223498/medb_kngcnc.jpg',
    alt: 'Integrated Campaign',
    badge: 'Marketing',
    title: 'Integrated Campaign for Local Retailer',
    desc: 'Orchestrated a multi-channel campaign combining social media advertising, ATL, and local media outreach.',
    meta: [
      { label: 'Sector', val: 'Retail' },
      { label: 'Channels', val: 'Digital & OOH' },
      { label: 'Sales', val: '+25% increase' },
    ],
  },
];

const teamMembers = [
  {
    id: 'christiana',
    img: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777112403/CHRISTIANA_pmwgsx.jpg',
    name: 'Christiana',
    role: 'Founder & CEO',
    bio: 'Over 20 years of industry experience excelling in Advertising, Marketing, and Business Management.',
    fullBio:
      "Christiana is the Founder and CEO of SMIC360 Limited. With over 20 years of industry experience, she has excelled in Advertising, Marketing, Business Management, and Hospitality. She also serves as the Managing Director of Moonlight Shipping, Facility Manager of Christie's Homestay, Project Manager of The Phoenix Enclave, and Business Manager for Eagle EL Salt Ghana Limited and Osabusquare.",
  },
  {
    id: 'alberta',
    img: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777112403/ALBERTA_jbrc1f.jpg',
    name: 'Alberta',
    role: 'Finance Manager',
    bio: 'Strategic insight and financial acumen with an MBA in Finance from UGBS and 9+ years of experience.',
    fullBio:
      "Alberta holds a background in Sociology & Linguistics and an MBA in Finance from UGBS. She brings a unique blend of strategic insight and financial acumen to SMIC360. With over nine years of experience in administration and finance, she ensures the seamless execution of all projects, oversees financial operations, and manages budgeting to guarantee the company's financial health.",
  },
  {
    id: 'samuel',
    img: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777112169/NII-BOYE_mixzve.jpg',
    name: 'Samuel',
    role: 'Creative & Production Manager',
    bio: 'Creative lead with 15+ years of experience crafting visually captivating and impactful marketing campaigns.',
    fullBio:
      'Samuel is a dynamic Creative & Production Manager with over 15 years of experience and a BFA in Publishing. He leads the creative team in delivering innovative and impactful marketing solutions. Leveraging his deep expertise in design and creative direction, Samuel crafts visually captivating campaigns that resonate with target audiences and effectively drive client success.',
  },
];

const testimonials = [
  {
    text: '"SMIC360 transformed our brand from a regional player to a nationally recognised name. Their strategic approach and creative execution were exceptional — we saw a 40% increase in brand recall within three months."',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    name: 'Kofi Agyemang',
    company: 'CEO, Agyemang Foods Ltd',
  },
  {
    text: '"The procurement team at SMIC360 saved us 22% on our annual supply budget without compromising quality. Their vendor network and negotiation skills are truly world-class for a Ghanaian firm."',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&q=80',
    name: 'Ama Darkwa',
    company: 'Operations Director, BuildRight Ghana',
  },
  {
    text: '"Investing in a unit at the Phoenix Enclave was one of the best decisions we made. The quality of construction, the location, and the SMIC360 team\'s support throughout the process were all outstanding."',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
    name: 'Emmanuel Osei-Bonsu',
    company: 'Property Investor, Accra',
  },
  {
    text: '"Their digital marketing team completely transformed our online presence. In just 60 days, our social media engagement tripled and we started getting qualified leads from across Ghana."',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    name: 'Abena Mensah',
    company: 'Managing Director, Zenith Services',
  },
];

/* ─── Inline stat counter ───────────────────────── */
function AnimCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 1800;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target]);
  return (
    <>
      {count}
      {suffix}
    </>
  );
}

/* ─── Page component ────────────────────────────── */
export default function HomePage() {
  const [bookOpen, setBookOpen] = useState(false);
  const [teamModal, setTeamModal] = useState<(typeof teamMembers)[0] | null>(null);
  const [mounted, setMounted] = useState(false);
  const [consultEmail, setConsultEmail] = useState('');
  const [consultDone, setConsultDone] = useState(false);
  const [consultLoading, setConsultLoading] = useState(false);
  const [activeProcess, setActiveProcess] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll whenever team modal is open — reuse same pattern as BookingModal
  useEffect(() => {
    if (!mounted) return;
    if (teamModal) {
      const y = window.scrollY;
      document.documentElement.dataset.scrollY = String(y);
      const scrollbarW = window.innerWidth - document.documentElement.clientWidth;
      document.documentElement.style.overflow = 'hidden';
      document.documentElement.style.paddingRight = `${scrollbarW}px`;
    } else {
      if (document.documentElement.style.overflow === 'hidden') {
        const savedY = parseInt(document.documentElement.dataset.scrollY || '0', 10);
        document.documentElement.style.overflow = '';
        document.documentElement.style.paddingRight = '';
        delete document.documentElement.dataset.scrollY;
        window.scrollTo(0, savedY);
      }
    }
  }, [teamModal, mounted]);

  const handleConsult = async (e: React.FormEvent) => {
    e.preventDefault();
    setConsultLoading(true);
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    try {
      const response = await fetch('https://formspree.io/f/xdayrral', {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });
      if (response.ok) {
        setConsultDone(true);
        setConsultEmail('');
      }
    } catch (error) {
      console.error('Formspree error:', error);
    }
    setConsultLoading(false);
  };

  const processSteps = [
    {
      icon: '🔍',
      title: 'Discovery',
      subtitle: 'We Listen First',
      desc: 'Every engagement starts with a deep-dive session to understand your goals, challenges, market position, and success metrics.',
    },
    {
      icon: '🧠',
      title: 'Strategy',
      subtitle: 'Blueprint for Growth',
      desc: 'Our multi-discipline team builds a bespoke strategy — marketing plan, property brief, or procurement framework tailored to you.',
    },
    {
      icon: '⚡',
      title: 'Execution',
      subtitle: 'Precision Delivery',
      desc: 'We execute with speed and precision across all three service lines, with dedicated project managers ensuring quality at every step.',
    },
    {
      icon: '📈',
      title: 'Results',
      subtitle: 'Measurable Impact',
      desc: 'We track and report against agreed KPIs — giving you full visibility into ROI, project milestones, and growth metrics.',
    },
  ];

  const properties = [
    {
      img: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777111208/WhatsApp-Image-2025-08-18-at-14.16.35_e93040d9l_gwfnmu.jpg',
      title: 'Phoenix Enclave — Phase II',
      type: 'Residential',
      beds: 3,
      baths: 2,
      area: '180 m²',
      price: 'From GH₵ 850,000',
      status: 'Available',
      location: 'Spintex, Accra',
    },
    {
      img: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777196963/1_j6fe4u.jpg',
      title: 'Executive Villa — Cantonments',
      type: 'Luxury Villa',
      beds: 5,
      baths: 4,
      area: '380 m²',
      price: 'From GH₵ 2,200,000',
      status: 'Limited',
      location: 'Cantonments, Accra',
    },
    {
      img: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777106950/Foxcooling-website-cover_p5grjz.jpg',
      title: 'Commercial Space — East Legon',
      type: 'Commercial',
      beds: 0,
      baths: 2,
      area: '260 m²',
      price: 'From GH₵ 1,100,000',
      status: 'New',
      location: 'East Legon, Accra',
    },
  ];

  return (
    <>
      <style>{`
        /* ── Stats ribbon ── */
        .stats-ribbon {
          background: linear-gradient(135deg, #040e1d 0%, #0b2d56 50%, #1261c0 100%);
          padding: 40px 0;
          position: relative;
          overflow: hidden;
        }
        .stats-ribbon::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 60% 100% at 50% 50%, rgba(0,180,216,0.08), transparent);
        }
        .stats-ribbon-inner {
          max-width: 1200px; margin: 0 auto; padding: 0 28px;
          display: grid; grid-template-columns: repeat(4,1fr);
          gap: 20px; position: relative; z-index: 1;
        }
        .stats-item {
          text-align: center;
          padding: 20px 16px;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.04);
          transition: all 0.3s;
        }
        .stats-item:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,193,7,0.2); transform: translateY(-3px); }
        .stats-num {
          font-family: 'Oswald', sans-serif;
          font-size: 46px; font-weight: 700;
          color: var(--gold);
          line-height: 1;
          text-shadow: 0 0 30px rgba(255,193,7,0.25);
        }
        .stats-label {
          font-size: 12px; font-weight: 600;
          color: rgba(255,255,255,0.55);
          margin-top: 8px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .stats-desc {
          font-size: 11.5px;
          color: rgba(255,255,255,0.32);
          margin-top: 4px;
          line-height: 1.4;
        }

        /* ── Process section ── */
        .process-section {
          padding: 100px 0;
          background: var(--navy);
          position: relative;
          overflow: hidden;
        }
        .process-section::before {
          content: '';
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(0,180,216,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,180,216,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }
        .process-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
          position: relative; z-index: 1;
        }
        .process-steps { display: flex; flex-direction: column; gap: 4px; }
        .process-step {
          padding: 20px 24px;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.06);
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          gap: 18px;
          align-items: center;
        }
        .process-step.active {
          background: rgba(255,193,7,0.08);
          border-color: rgba(255,193,7,0.25);
        }
        .process-step:hover { background: rgba(255,255,255,0.04); border-color: rgba(255,255,255,0.12); }
        .process-step.active:hover { background: rgba(255,193,7,0.1); }
        .process-step-num {
          width: 44px; height: 44px;
          border-radius: 12px;
          background: rgba(255,255,255,0.06);
          color: rgba(255,255,255,0.4);
          font-family: 'Oswald', sans-serif;
          font-size: 18px; font-weight: 700;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: all 0.3s;
        }
        .process-step.active .process-step-num {
          background: var(--gold);
          color: var(--navy);
        }
        .process-step-text h4 {
          font-family: 'Oswald', sans-serif;
          font-size: 17px; font-weight: 700;
          color: rgba(255,255,255,0.6);
          transition: color 0.3s;
        }
        .process-step.active .process-step-text h4 { color: #fff; }
        .process-step-text p {
          font-size: 12.5px;
          color: rgba(255,255,255,0.35);
          margin-top: 2px;
        }
        .process-detail {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px;
          padding: 44px;
          position: relative;
          overflow: hidden;
        }
        .process-detail::before {
          content: '';
          position: absolute;
          top: -1px; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--gold), var(--cyan));
        }
        .process-detail-icon {
          font-size: 52px;
          margin-bottom: 20px;
          display: block;
          line-height: 1;
        }
        .process-detail h3 {
          font-family: 'Oswald', sans-serif;
          font-size: 32px; font-weight: 700;
          color: #fff; margin-bottom: 8px;
        }
        .process-detail-sub {
          font-size: 13px; font-weight: 700;
          color: var(--gold);
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin-bottom: 16px;
        }
        .process-detail p {
          color: rgba(255,255,255,0.6);
          font-size: 15.5px;
          line-height: 1.8;
        }

        /* ── Property listings ── */
        .properties-section { padding: 100px 0; background: var(--off); }
        .prop-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 26px; margin-top: 48px; }
        .prop-card {
          background: #fff;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: var(--sh);
          transition: all 0.32s cubic-bezier(0.16,1,0.3,1);
          border: 1px solid var(--border);
        }
        .prop-card:hover { transform: translateY(-8px); box-shadow: var(--sh-lg); border-color: var(--gold); }
        .prop-img { position: relative; height: 220px; overflow: hidden; }
        .prop-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
        .prop-card:hover .prop-img img { transform: scale(1.07); }
        .prop-status {
          position: absolute; top: 14px; left: 14px;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 10.5px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.5px;
        }
        .prop-status.available { background: rgba(22,163,74,0.9); color: #fff; }
        .prop-status.limited   { background: rgba(234,88,12,0.9);  color: #fff; }
        .prop-status.new       { background: rgba(7,22,40,0.9);    color: var(--gold); border: 1px solid rgba(255,193,7,0.3); }
        .prop-type {
          position: absolute; top: 14px; right: 14px;
          background: rgba(7,22,40,0.85);
          backdrop-filter: blur(8px);
          color: rgba(255,255,255,0.85);
          padding: 4px 10px; border-radius: 8px;
          font-size: 10.5px; font-weight: 600;
        }
        .prop-body { padding: 22px; }
        .prop-location {
          font-size: 11.5px; color: var(--muted);
          display: flex; align-items: center; gap: 4px;
          margin-bottom: 8px;
        }
        .prop-body h3 {
          font-family: 'Oswald', sans-serif;
          font-size: 19px; font-weight: 700;
          color: var(--navy); line-height: 1.2;
          margin-bottom: 12px;
        }
        .prop-specs {
          display: flex; gap: 16px;
          margin-bottom: 14px;
          padding-bottom: 14px;
          border-bottom: 1px solid var(--border);
        }
        .prop-spec {
          display: flex; align-items: center; gap: 5px;
          font-size: 12.5px; color: var(--muted);
        }
        .prop-price {
          font-family: 'Oswald', sans-serif;
          font-size: 20px; font-weight: 700;
          color: var(--gold-d);
        }
        .prop-cta {
          display: flex; gap: 8px; margin-top: 14px;
        }

        /* ── Ghana pride strip ── */
        .ghana-strip {
          background: linear-gradient(135deg, #006B3F 0%, #007a47 40%, #FCD116 70%, #CE1126 100%);
          padding: 32px 0;
          position: relative;
          overflow: hidden;
        }
        .ghana-strip::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(0,0,0,0.55), rgba(0,0,0,0.25));
        }
        .ghana-strip-inner {
          max-width: 1200px; margin: 0 auto; padding: 0 28px;
          display: flex; align-items: center; justify-content: space-between;
          gap: 20px; flex-wrap: wrap;
          position: relative; z-index: 1;
        }
        .ghana-strip-text h3 {
          font-family: 'Oswald', sans-serif;
          font-size: clamp(20px, 3vw, 30px);
          font-weight: 700; color: #fff;
        }
        .ghana-strip-text p {
          color: rgba(255,255,255,0.75); font-size: 14px; margin-top: 4px;
        }
        .ghana-flag-icon { font-size: 36px; }

        /* ── Awards section ── */
        .awards-section { padding: 80px 0; background: var(--white); }
        .awards-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 24px; margin-top: 48px; }
        .award-card {
          text-align: center;
          padding: 32px 20px;
          border-radius: 18px;
          border: 1px solid var(--border);
          transition: all 0.3s;
          background: #fff;
        }
        .award-card:hover { border-color: var(--gold); box-shadow: var(--sh-gold); transform: translateY(-4px); }
        .award-icon { font-size: 42px; margin-bottom: 14px; }
        .award-card h4 { font-family: 'Oswald', sans-serif; font-size: 17px; font-weight: 700; color: var(--navy); }
        .award-card p { font-size: 12.5px; color: var(--muted); margin-top: 6px; line-height: 1.55; }
        .award-year { font-size: 11px; font-weight: 700; color: var(--gold-d); margin-top: 10px; text-transform: uppercase; letter-spacing: 1px; }

        /* ── Team modal ── */
        .vibrant-modal {
          background: #fff !important;
          border-radius: 24px !important;
          overflow: hidden;
          box-shadow: 0 32px 80px rgba(4,14,29,0.3) !important;
          border: none !important;
          border-top: 4px solid var(--gold) !important;
          animation: modalIn 0.38s cubic-bezier(0.16,1,0.3,1);
        }
        .vibrant-header {
          background: linear-gradient(135deg, #040e1d 0%, #0b2d56 60%, #1261c0 100%) !important;
          padding: 44px 36px !important;
          display: flex !important; gap: 28px !important; align-items: center !important;
          position: relative !important; overflow: hidden;
        }
        .vibrant-header::before {
          content: '';
          position: absolute; inset: 0;
          background-image: linear-gradient(rgba(0,180,216,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,180,216,0.06) 1px, transparent 1px);
          background-size: 24px 24px; pointer-events: none;
        }
        .vibrant-img-wrapper { position: relative; flex-shrink: 0; width: 130px; height: 130px; }
        .vibrant-img-wrapper img { width: 100%; height: 100%; border-radius: 16px !important; object-fit: cover; border: 3px solid rgba(255,255,255,0.2) !important; position: relative; z-index: 2; box-shadow: 0 8px 28px rgba(0,0,0,0.3); }
        .vibrant-close-btn { position: absolute; top: 14px; right: 14px; background: rgba(255,255,255,0.12) !important; border: 1px solid rgba(255,255,255,0.15) !important; color: #fff !important; width: 32px !important; height: 32px !important; border-radius: 50% !important; cursor: pointer; z-index: 10; transition: all 0.25s; display: flex; align-items: center; justify-content: center; font-size: 14px; }
        .vibrant-close-btn:hover { background: rgba(220,38,38,0.7) !important; transform: rotate(90deg); }
        .vibrant-body { padding: 32px 36px; color: var(--muted); line-height: 1.82; font-size: 15px; }
        .vibrant-name h3 { color: var(--gold) !important; margin: 0; font-size: 26px; font-family: 'Oswald', sans-serif; }
        .vibrant-role { color: var(--cyan) !important; text-transform: uppercase; letter-spacing: 1.2px; font-weight: 700; font-size: 12.5px; margin-top: 5px; position: relative; z-index: 1; }
        .vibrant-info { position: relative; z-index: 1; }

        @media (max-width: 768px) {
          .stats-ribbon-inner { grid-template-columns: repeat(2,1fr); }
          .process-grid { grid-template-columns: 1fr; }
          .prop-grid { grid-template-columns: 1fr; }
          .awards-grid { grid-template-columns: repeat(2,1fr); }
          .ghana-strip-inner { flex-direction: column; text-align: center; }
        }
        @media (max-width: 480px) {
          .awards-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <ScrollReveal />
      <Topbar />
      <Navbar onBookClick={() => setBookOpen(true)} />
      <BookingModal isOpen={bookOpen} onClose={() => setBookOpen(false)} />

      {/* ── Hero ── */}
      <HeroSlider onBookClick={() => setBookOpen(true)} />

      {/* ── Live Stats Ribbon ── */}
      <div className="stats-ribbon">
        <div className="stats-ribbon-inner stagger">
          {[
            {
              num: 150,
              suffix: '+',
              label: 'Projects Delivered',
              desc: 'Across all three divisions',
            },
            { num: 80, suffix: '+', label: 'Happy Clients', desc: 'Across Ghana & West Africa' },
            { num: 8, suffix: '', label: 'Years of Excellence', desc: 'Established in Accra' },
            {
              num: 3,
              suffix: '',
              label: 'Core Divisions',
              desc: 'Marketing · Real Estate · Procurement',
            },
          ].map((s, i) => (
            <div key={i} className="stats-item">
              <div className="stats-num">
                <AnimCounter target={s.num} suffix={s.suffix} />
              </div>
              <div className="stats-label">{s.label}</div>
              <div className="stats-desc">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="ribbon">
        <div className="wrap">
          <div className="ribbon-head">
            <span className="ribbon-head-label">Our Three Main Services</span>
            <Link
              href="/solutions"
              className="btn btn-outline"
              style={{ fontSize: '12px', padding: '8px 16px' }}
            >
              View All Solutions →
            </Link>
          </div>
          <div className="ribbon-grid stagger">
            {[
              {
                icon: '📣',
                title: 'Advertising & Marketing Solutions',
                desc: '360 Marketing & Branding Solutions for your brand and business.',
              },
              {
                icon: '🏗️',
                title: 'Real Estate Development',
                desc: 'A mini gated community strategically developed in a serene and secured locality.',
              },
              {
                icon: '📦',
                title: 'Procurement & Supply Services',
                desc: 'Tailormade Procurement and supply services designed to give you value for money.',
              },
            ].map((s, i) => (
              <Link key={i} href="/solutions" className="ribbon-card">
                <div className="ribbon-card-icon">{s.icon}</div>
                <div className="ribbon-card-text">
                  <h4>{s.title}</h4>
                  <p>{s.desc}</p>
                  <span className="ribbon-card-link">Learn More →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── About Section ── */}
      <section className="about">
        <div className="wrap">
          <div className="about-grid">
            <div className="about-img-wrap reveal-left">
              <img
                className="about-img-main"
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80"
                alt="SMIC360 team meeting"
              />
              <div className="about-badge">
                <span className="about-badge-num">8+</span>
                <span className="about-badge-sub">Years of Excellence</span>
              </div>
            </div>
            <div className="about-text reveal-right">
              <span className="tag">Who We Are</span>
              <h2 className="section-title">
                Dedicated to <em>360° Excellence</em>
              </h2>
              <p className="section-sub">
                SMIC360 Limited is a Ghanaian multi-sector company built on one conviction: great
                businesses deserve great partners. We integrate marketing brilliance, real estate
                development, and smart procurement into one seamless ecosystem — so you spend less
                time managing vendors and more time scaling.
              </p>
              <p className="section-sub" style={{ marginTop: '10px' }}>
                From crafting bold brand identities to delivering the Phoenix Enclave and sourcing
                mission-critical supplies, every service we offer carries the same standard of care:
                meticulous, transparent, and results-driven.
              </p>
              <div className="about-points">
                {[
                  {
                    icon: '🎯',
                    title: 'Strategy First',
                    desc: 'Every solution starts with a tailored strategy built around your goals.',
                  },
                  {
                    icon: '🤝',
                    title: 'Client-Centric',
                    desc: 'We are always available — your success is our benchmark.',
                  },
                  {
                    icon: '🏆',
                    title: 'Proven Track Record',
                    desc: '150+ projects across marketing, real estate and supply chains.',
                  },
                  {
                    icon: '🌍',
                    title: 'Ghana-Rooted, Pan-African',
                    desc: 'Built in Accra with a vision that extends across the continent.',
                  },
                ].map((pt, i) => (
                  <div key={i} className="apoint">
                    <div className="apoint-icon">{pt.icon}</div>
                    <div>
                      <h4>{pt.title}</h4>
                      <p>{pt.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '28px', display: 'flex', gap: '12px' }}>
                <Link href="/about" className="btn btn-primary">
                  Our Story
                </Link>
                <Link href="/about" className="btn btn-outline">
                  Meet The Team
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── NEW: Ghana Pride Strip ── */}
      <div className="ghana-strip">
        <div className="ghana-strip-inner">
          <div className="ghana-strip-text">
            <h3>Proudly Ghanaian. Built to Pan-African Standards.</h3>
            <p>
              SMIC360 is headquartered in Accra — deeply rooted in Ghana&apos;s business culture
              with a vision that extends across Africa.
            </p>
          </div>
          <div
            style={{
              display: 'flex',
              gap: '12px',
              flexWrap: 'wrap',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <Link href="/about" className="btn btn-white">
              Our Story →
            </Link>
            <button onClick={() => setBookOpen(true)} className="btn btn-outline-white">
              Partner With Us
            </button>
          </div>
        </div>
      </div>

      {/* ── Video Tour — Cinematic Premium ── */}
      <section
        style={{
          padding: '100px 0',
          background: 'var(--navy)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <style>{`
          /* Cinematic video section */
          .vt-section {
            position: relative;
          }
          .vt-section::before {
            content: '';
            position: absolute; inset: 0;
            background-image:
              linear-gradient(rgba(0,180,216,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,180,216,0.04) 1px, transparent 1px);
            background-size: 64px 64px;
            pointer-events: none;
          }
          /* Glow blobs */
          .vt-blob-l {
            position: absolute;
            left: -120px; top: 50%; transform: translateY(-50%);
            width: 400px; height: 400px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(255,193,7,0.1) 0%, transparent 70%);
            pointer-events: none;
          }
          .vt-blob-r {
            position: absolute;
            right: -120px; top: 50%; transform: translateY(-50%);
            width: 400px; height: 400px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(0,180,216,0.1) 0%, transparent 70%);
            pointer-events: none;
          }

          /* Header layout */
          .vt-header {
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            gap: 20px;
            flex-wrap: wrap;
            margin-bottom: 52px;
            position: relative; z-index: 1;
          }
          .vt-header-left .tag { color: var(--cyan); }
          .vt-header-left .tag::before { background: var(--cyan); }
          .vt-header-left h2 { color: #fff; }
          .vt-header-right {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: 14px;
          }
          .vt-play-pill {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            background: rgba(255,193,7,0.1);
            border: 1px solid rgba(255,193,7,0.25);
            color: var(--gold);
            font-size: 12px; font-weight: 700;
            letter-spacing: 1.5px; text-transform: uppercase;
            padding: 8px 18px;
            border-radius: 30px;
          }
          .vt-play-dot {
            width: 8px; height: 8px;
            background: var(--gold);
            border-radius: 50%;
            animation: vt-blink 1.8s ease-in-out infinite;
          }
          @keyframes vt-blink { 0%,100%{opacity:1;} 50%{opacity:0.25;} }

          /* Outer frame — gold border gradient */
          .vt-frame-outer {
            position: relative;
            border-radius: 28px;
            padding: 3px;
            background: linear-gradient(135deg, #FFC107 0%, #00b4d8 50%, #FFC107 100%);
            background-size: 200% 200%;
            animation: vt-border 6s linear infinite;
            box-shadow:
              0 0 0 1px rgba(255,193,7,0.15),
              0 32px 80px rgba(0,0,0,0.5),
              0 0 120px rgba(255,193,7,0.08);
            max-width: 980px;
            margin: 0 auto;
            position: relative; z-index: 1;
          }
          @keyframes vt-border {
            0%   { background-position: 0% 50%; }
            50%  { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          /* Inner bezel — mimics a device */
          .vt-frame-inner {
            background: #060e1c;
            border-radius: 26px;
            overflow: hidden;
            position: relative;
          }

          /* Fake browser/device bar */
          .vt-bar {
            background: #0a1628;
            padding: 10px 18px;
            display: flex;
            align-items: center;
            gap: 10px;
            border-bottom: 1px solid rgba(255,255,255,0.06);
          }
          .vt-bar-dots { display: flex; gap: 6px; }
          .vt-bar-dot {
            width: 10px; height: 10px;
            border-radius: 50%;
          }
          .vt-bar-dot:nth-child(1) { background: #ff5f57; }
          .vt-bar-dot:nth-child(2) { background: #ffbd2e; }
          .vt-bar-dot:nth-child(3) { background: #28c840; }
          .vt-bar-url {
            flex: 1;
            background: rgba(255,255,255,0.06);
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 6px;
            padding: 5px 12px;
            font-size: 11px;
            color: rgba(255,255,255,0.35);
            font-family: monospace;
          }
          .vt-bar-badge {
            font-size: 10px; font-weight: 700;
            letter-spacing: 1px; text-transform: uppercase;
            color: var(--gold);
            background: rgba(255,193,7,0.1);
            border: 1px solid rgba(255,193,7,0.2);
            border-radius: 4px;
            padding: 3px 9px;
          }

          /* Responsive embed */
          .vt-embed {
            position: relative;
            padding-bottom: 56.25%;
            height: 0;
            overflow: hidden;
          }
          .vt-embed iframe {
            position: absolute;
            top: 0; left: 0;
            width: 100%; height: 100%;
            border: 0;
            display: block;
          }

          /* Bottom caption bar */
          .vt-caption {
            background: linear-gradient(135deg, #040e1d 0%, #0b2d56 100%);
            padding: 16px 24px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            flex-wrap: wrap;
            border-top: 1px solid rgba(255,193,7,0.12);
          }
          .vt-caption-left {
            display: flex;
            align-items: center;
            gap: 12px;
          }
          .vt-caption-icon {
            width: 36px; height: 36px;
            border-radius: 8px;
            background: linear-gradient(135deg, #FFC107, #D4A017);
            display: flex; align-items: center; justify-content: center;
            font-size: 16px; flex-shrink: 0;
          }
          .vt-caption-text strong {
            display: block;
            font-size: 13px; font-weight: 700; color: #fff;
            font-family: 'Oswald', sans-serif;
          }
          .vt-caption-text span {
            font-size: 11px; color: rgba(255,255,255,0.42);
          }
          .vt-caption-stats {
            display: flex; gap: 20px;
          }
          .vt-stat {
            text-align: right;
          }
          .vt-stat strong {
            display: block;
            font-family: 'Oswald', sans-serif;
            font-size: 16px; font-weight: 700;
            color: var(--gold);
            line-height: 1;
          }
          .vt-stat span {
            font-size: 10px; color: rgba(255,255,255,0.38);
            text-transform: uppercase; letter-spacing: 0.8px;
          }

          /* Tags row below */
          .vt-tags {
            display: flex;
            gap: 10px;
            justify-content: center;
            margin-top: 28px;
            flex-wrap: wrap;
            position: relative; z-index: 1;
          }
          .vt-tag {
            display: inline-flex;
            align-items: center;
            gap: 7px;
            background: rgba(255,255,255,0.05);
            border: 1px solid rgba(255,255,255,0.1);
            color: rgba(255,255,255,0.55);
            font-size: 11.5px; font-weight: 600;
            padding: 7px 16px;
            border-radius: 30px;
            letter-spacing: 0.3px;
            transition: all 0.22s;
          }
          .vt-tag:hover { border-color: rgba(255,193,7,0.4); color: var(--gold); background: rgba(255,193,7,0.07); }
          .vt-tag-icon { font-size: 13px; }

          @media (max-width: 768px) {
            .vt-header { flex-direction: column; align-items: flex-start; }
            .vt-header-right { align-items: flex-start; }
            .vt-caption-stats { display: none; }
          }
        `}</style>

        <div className="vt-blob-l" />
        <div className="vt-blob-r" />

        <div className="wrap vt-section">
          <div className="vt-header reveal">
            <div className="vt-header-left">
              <span className="tag">Property Tour</span>
              <h2 className="section-title">
                The <em>Phoenix Enclave</em>
              </h2>
              <p className="section-sub" style={{ color: 'rgba(255,255,255,0.5)', marginTop: 8 }}>
                Walk through Ghana&apos;s most anticipated gated community — filmed on-site.
              </p>
            </div>
            <div className="vt-header-right">
              <div className="vt-play-pill">
                <span className="vt-play-dot" />
                Now Playing
              </div>
              <a
                href="https://www.youtube.com/watch?v=56ZbiZGh0SM"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-white"
                style={{ fontSize: '12px', padding: '9px 18px' }}
              >
                Watch on YouTube →
              </a>
            </div>
          </div>

          {/* Premium frame */}
          <div className="vt-frame-outer reveal">
            <div className="vt-frame-inner">
              {/* Browser bar */}
              <div className="vt-bar">
                <div className="vt-bar-dots">
                  <div className="vt-bar-dot" />
                  <div className="vt-bar-dot" />
                  <div className="vt-bar-dot" />
                </div>
                <div className="vt-bar-url">
                  youtube.com/watch — The Phoenix Enclave Virtual Tour
                </div>
                <div className="vt-bar-badge">LIVE TOUR</div>
              </div>
              {/* Video */}
              <div className="vt-embed">
                <iframe
                  src="https://www.youtube.com/embed/56ZbiZGh0SM?si=EjwaDtu3YTE4AUGU&autoplay=1&mute=1"
                  title="The Phoenix Enclave Tour"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
              {/* Caption bar */}
              <div className="vt-caption">
                <div className="vt-caption-left">
                  <div className="vt-caption-icon">🏡</div>
                  <div className="vt-caption-text">
                    <strong>The Phoenix Enclave — Phase II</strong>
                    <span>Spintex Road, Accra, Ghana · SMIC360 Real Estate Division</span>
                  </div>
                </div>
                <div className="vt-caption-stats">
                  <div className="vt-stat">
                    <strong>24</strong>
                    <span>Units Phase I</span>
                  </div>
                  <div className="vt-stat">
                    <strong>GH₵850k</strong>
                    <span>From</span>
                  </div>
                  <div className="vt-stat">
                    <strong>Now Open</strong>
                    <span>Phase II</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature tags */}
          <div className="vt-tags">
            {[
              { icon: '🔒', label: 'Gated & Secured' },
              { icon: '🌿', label: 'Landscaped Gardens' },
              { icon: '⚡', label: '24/7 Power' },
              { icon: '💧', label: 'Water Supply' },
              { icon: '📍', label: 'Spintex Road' },
              { icon: '🏊', label: 'Pool Access' },
            ].map((t) => (
              <div key={t.label} className="vt-tag">
                <span className="vt-tag-icon">{t.icon}</span>
                {t.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Clients Logos ── */}
      <div className="clients">
        <div className="wrap">
          <div className="clients-label">Trusted By Leading Organisations Across Ghana</div>
          <div className="clients-marquee">
            <div className="clients-track">
              {[...clientLogos, ...clientLogos].map((logo, i) => (
                <div key={i} className="client-logo">
                  <img src={logo.src} alt={logo.alt} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Capabilities ── */}
      <section className="capabilities">
        <div className="wrap">
          <div style={{ textAlign: 'center' }} className="reveal">
            <span className="tag" style={{ justifyContent: 'center' }}>
              What We Do Best
            </span>
            <h2 className="section-title">
              Our Three Core <em>Services</em>
            </h2>
          </div>
          <div className="cap-grid stagger">
            {[
              {
                img: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777114247/kkkl_nhdczf.avif',
                alt: 'Brand Strategy',
                title: 'Advertising & Marketing Solutions',
                desc: '360 Marketing & Branding Solutions for your brand and business.',
                href: '/solutions',
              },
              {
                img: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777111208/WhatsApp-Image-2025-08-18-at-14.16.35_e93040d9l_gwfnmu.jpg',
                alt: 'Real Estate',
                title: 'Real Estate Development',
                desc: 'A mini gated community strategically developed in a serene and secured locality.',
                href: '/solutions',
              },
              {
                img: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777110562/A-Guide-to-Media-Buying-Definition-Importance-Impact-and-Benefits-scaled-copy_uidwzc.jpg',
                alt: 'Procurement',
                title: 'Procurement & Supply Services',
                desc: 'Tailormade Procurement and supply services designed to give you value for money.',
                href: '/solutions',
              },
            ].map((cap, i) => (
              <div key={i} className="cap-card">
                <div className="cap-img">
                  <img src={cap.img} alt={cap.alt} />
                </div>
                <div className="cap-body">
                  <h3>{cap.title}</h3>
                  <p>{cap.desc}</p>
                  <Link
                    href={cap.href}
                    className="btn btn-outline"
                    style={{ marginTop: '20px', width: '100%', justifyContent: 'center' }}
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEW: Our Process Section ── */}
      <section className="process-section">
        <div className="wrap">
          <div style={{ textAlign: 'center', marginBottom: '52px' }} className="reveal">
            <span className="tag" style={{ justifyContent: 'center', color: 'var(--cyan)' }}>
              <span
                style={{
                  display: 'block',
                  width: '22px',
                  height: '2px',
                  background: 'var(--cyan)',
                  borderRadius: '2px',
                }}
              ></span>
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
                color: 'rgba(255,255,255,0.52)',
              }}
            >
              From first conversation to final delivery — a seamless, transparent process that puts
              your goals first.
            </p>
          </div>
          <div className="process-grid reveal">
            <div className="process-steps">
              {processSteps.map((step, i) => (
                <div
                  key={i}
                  className={`process-step${activeProcess === i ? ' active' : ''}`}
                  onClick={() => setActiveProcess(i)}
                >
                  <div className="process-step-num">{String(i + 1).padStart(2, '0')}</div>
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
              <span className="process-detail-icon">{processSteps[activeProcess].icon}</span>
              <div className="process-detail-sub">Step {activeProcess + 1} of 4</div>
              <h3>{processSteps[activeProcess].title}</h3>
              <p>{processSteps[activeProcess].desc}</p>
              <div style={{ marginTop: '28px' }}>
                <button onClick={() => setBookOpen(true)} className="btn btn-primary">
                  Start Your Journey →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── NEW: Property Listings Preview ── */}
      <section className="properties-section">
        <div className="wrap">
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px',
            }}
            className="reveal"
          >
            <div>
              <span className="tag">Real Estate</span>
              <h2 className="section-title">
                Featured <em>Properties</em>
              </h2>
              <p className="section-sub">
                Explore our current residential and commercial listings in prime Accra locations.
              </p>
            </div>
            <Link href="/solutions" className="btn btn-outline" style={{ alignSelf: 'flex-end' }}>
              View All Properties →
            </Link>
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
                    <button
                      onClick={() => setBookOpen(true)}
                      className="btn btn-primary"
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        fontSize: '13px',
                        padding: '10px',
                      }}
                    >
                      Enquire Now
                    </button>
                    <Link
                      href="/solutions"
                      className="btn btn-outline"
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        fontSize: '13px',
                        padding: '10px',
                      }}
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*      
      <section className="compare">
        <div className="wrap">
          <div style={{ textAlign: 'center' }} className="reveal">
            <span className="tag" style={{ justifyContent: 'center' }}>Why Choose Us</span>
            <h2 className="section-title" style={{ maxWidth: 'none' }}>The <em>SMIC360</em> Difference</h2>
            <p className="section-sub" style={{ margin: '12px auto 0', textAlign: 'center' }}>See how SMIC360 stands apart from typical single-service agencies and vendors.</p>
          </div>
          <div className="compare-table reveal">
            <div className="ct-head">
              <div className="ct-head-cell">Feature</div>
              <div className="ct-head-cell hl">SMIC360</div>
              <div className="ct-head-cell">Typical Agency</div>
              <div className="ct-head-cell">Independent Vendors</div>
            </div>
            {[
              ['360° Multi-Service Coverage',           '✔', '✘', '✘', 'yes', 'no',  'no'],
              ['Dedicated Account Manager',             '✔', 'Sometimes', '✘', 'yes', 'hl', 'no'],
              ['Real Estate + Marketing + Procurement', '✔', '✘', '✘', 'yes', 'no',  'no'],
              ['Ghana-Based Local Expertise',           '✔', 'Varies', 'Varies', 'yes', 'hl', 'hl'],
              ['Value-For-Money Procurement',           '✔', '✘', 'Sometimes', 'yes', 'no', 'hl'],
              ['Transparent Reporting & Delivery',      '✔', 'Varies', '✘', 'yes', 'hl', 'no'],
            ].map(([label, c1, c2, c3, cls1, cls2, cls3], i) => (
              <div key={i} className="ct-row">
                <div className="ct-row-label">{label}</div>
                <div className={`ct-cell ${cls1}`}>{c1}</div>
                <div className={`ct-cell ${cls2}`}>{c2}</div>
                <div className={`ct-cell ${cls3}`}>{c3}</div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* ── Phoenix Enclave Featured ── */}
      <section className="featured">
        <div className="wrap">
          <div className="feat-grid">
            <div className="feat-img reveal-left">
              <img
                src="https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777111208/WhatsApp-Image-2025-08-18-at-14.16.35_e93040d9l_gwfnmu.jpg"
                alt="Phoenix Enclave Real Estate"
              />
              <div className="feat-img-caption">
                <h3>The Phoenix Enclave</h3>
                <p>A modern mini gated community — serene, secured, and strategically located.</p>
              </div>
            </div>
            <div className="reveal-right">
              <span className="tag">Flagship Development</span>
              <h2 className="section-title">
                Built for <em>Ghana</em>
              </h2>
              <p className="section-sub">
                The Phoenix Enclave is SMIC360&apos;s premier real estate offering — thoughtfully
                designed residential and commercial spaces built with modern architecture and
                premium finishes for the Ghanaian market.
              </p>
              <div className="feat-items">
                {[
                  {
                    icon: '🏡',
                    title: 'Gated & Secured Community',
                    desc: '24/7 security, controlled access, and a peaceful neighbourhood environment for families and professionals.',
                  },
                  {
                    icon: '🏛️',
                    title: 'Modern Architecture',
                    desc: 'Contemporary designs that blend aesthetics with functionality — built to last and built to impress.',
                  },
                  {
                    icon: '📍',
                    title: 'Strategic Location',
                    desc: "Positioned in a serene locality with convenient access to Accra's key commercial and social hubs.",
                  },
                  {
                    icon: '💼',
                    title: 'Investment Opportunity',
                    desc: "High ROI potential in one of Ghana's fastest-growing real estate corridors — for homebuyers and investors alike.",
                  },
                ].map((item, i) => (
                  <div key={i} className="feat-item">
                    <div className="feat-item-icon">{item.icon}</div>
                    <div>
                      <h4>{item.title}</h4>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '28px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link href="/solutions" className="btn btn-primary">
                  Explore The Enclave
                </Link>
                <button onClick={() => setBookOpen(true)} className="btn btn-outline">
                  Book a Site Visit
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <div className="cta-banner">
        <div className="cta-inner">
          <div>
            <span className="tag" style={{ color: 'var(--cyan)' }}>
              <span
                style={{
                  display: 'block',
                  width: '22px',
                  height: '2px',
                  background: 'var(--cyan)',
                  borderRadius: '2px',
                }}
              ></span>
              2025 Service Catalogue
            </span>
            <h2 className="cta-title">
              Scale Your Business
              <br />
              with Our <em>2025 Catalogue</em>
            </h2>
            <p className="cta-sub">
              Download the full SMIC360 solutions catalogue — complete service listings, pricing
              tiers, real estate specs, and procurement frameworks all in one place.
            </p>
          </div>
          <div className="cta-actions">
            <a
              href="mailto:info@smic360.com?subject=Catalogue%20Request&body=Hi%20SMIC360%2C%20please%20send%20me%20your%202025%20solutions%20catalogue."
              className="btn btn-white"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 16l-4-4h3V4h2v8h3l-4 4z" />
                <path d="M4 20h16" />
              </svg>
              Download Catalogue
            </a>
            <button onClick={() => setBookOpen(true)} className="btn btn-outline-white">
              Book A Call
            </button>
          </div>
        </div>
      </div>

      {/* ── NEW: Awards & Recognition ── */}
      {/* <section className="awards-section">
        <div className="wrap">
          <div style={{ textAlign: 'center' }} className="reveal">
            <span className="tag" style={{ justifyContent: 'center' }}>Recognition</span>
            <h2 className="section-title">Awards &amp; <em>Achievements</em></h2>
            <p className="section-sub" style={{ margin: '12px auto 0', textAlign: 'center' }}>Our commitment to excellence has been recognised by Ghana&apos;s leading business organisations.</p>
          </div>
          <div className="awards-grid stagger">
            {[
              { icon: '🏆', title: 'Best Marketing Agency', desc: 'Ghana Business Awards — Most innovative advertising and marketing agency in Accra.', year: '2023' },
              { icon: '🏡', title: 'Top Real Estate Developer', desc: 'National Real Estate Awards — Recognised for The Phoenix Enclave development.', year: '2022' },
              { icon: '⭐', title: '5-Star Client Rating', desc: 'Consistent 5-star reviews from over 80 satisfied clients across all service lines.', year: 'Ongoing' },
              { icon: '🌍', title: 'Pan-African Business Vision', desc: 'Recognised for expanding services and impact across West African markets.', year: '2024' },
            ].map((award, i) => (
              <div key={i} className="award-card">
                <div className="award-icon">{award.icon}</div>
                <h4>{award.title}</h4>
                <p>{award.desc}</p>
                <div className="award-year">{award.year}</div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* ── Project Spotlight — Tabbed Grid ── */}
      <ProjectSpotlight projects={projects} onBook={() => setBookOpen(true)} />

      {/* ── Team ── */}
      <section className="team">
        <div className="wrap">
          <div style={{ textAlign: 'center' }} className="reveal">
            <span className="tag" style={{ justifyContent: 'center' }}>
              The People
            </span>
            <h2 className="section-title">
              Meet <em>The Experts</em>
            </h2>
            <p className="section-sub" style={{ margin: '12px auto 0', textAlign: 'center' }}>
              A dedicated team of strategists, creatives, engineers, and industry specialists —
              united by one goal: your success.
            </p>
          </div>
          <div className="team-grid stagger">
            {teamMembers.map((member, i) => (
              <div
                key={i}
                className="team-card"
                onClick={() => setTeamModal(member)}
                style={{ transitionDelay: `${i * 0.15}s` }}
              >
                <div className="team-card-socials">
                  {['in', 'ig', 'tw'].map((s) => (
                    <a
                      key={s}
                      href="#"
                      className="team-social-icon"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {s}
                    </a>
                  ))}
                </div>
                <div className="team-img">
                  <img src={member.img} alt={`${member.name} — ${member.role}`} />
                </div>
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
              <h2 className="section-title">
                Trusted <em>Across Ghana</em>
              </h2>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p
                style={{
                  fontSize: '14px',
                  color: 'var(--muted)',
                  maxWidth: '280px',
                  lineHeight: '1.6',
                  marginBottom: '12px',
                }}
              >
                Real results. Real clients. Real growth stories from businesses across Ghana.
              </p>
              <a
                href="https://www.google.com/search?q=SMIC360+LIMITED#lrd=0xfdf8402e54ac0bd:0x37c47d7434f4203c,3"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
                style={{ fontSize: '12px', padding: '8px 16px' }}
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                  style={{ width: '14px', display: 'inline-block', verticalAlign: 'middle' }}
                  alt="Google"
                />
                &nbsp;Write a Review
              </a>
            </div>
          </div>
          <div className="testi-marquee">
            <div className="testi-track">
              {[...testimonials, ...testimonials].map((t, i) => (
                <div key={i} className="testi-card">
                  <div className="testi-stars">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                      className="google-icon"
                      alt="Google"
                    />
                    ★★★★★
                  </div>
                  <p className="testi-text">{t.text}</p>
                  <div className="testi-author">
                    <img className="testi-avatar" src={t.avatar} alt={t.name} />
                    <div>
                      <div className="testi-author-name">{t.name}</div>
                      <div className="testi-author-co">{t.company}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HQ / Map ── */}
      <section className="hq">
        <div className="wrap">
          <div className="hq-grid">
            <div className="reveal-left">
              <span className="tag">Where To Find Us</span>
              <h2 className="section-title">
                Our <em>Headquarters</em>
              </h2>
              <p className="section-sub">
                We are based in the heart of Accra and always available to serve you. Walk in, call
                us, or drop us a message — we respond fast.
              </p>
              <div className="hq-details">
                {[
                  {
                    icon: '📍',
                    title: 'Office Address',
                    desc: '1st Floor, Verostina House, Opp. DSTV Office, Community 18, Off Spintex Road, Accra',
                  },
                  {
                    icon: '📞',
                    title: 'Phone',
                    desc: '024 478 3099 — We are always available to serve you',
                  },
                  {
                    icon: '✉️',
                    title: 'Email',
                    desc: 'info@smic360.com — Expect a reply within 2 business hours',
                  },
                  {
                    icon: '🕐',
                    title: 'Office Hours',
                    desc: 'Monday – Friday: 8:00 AM – 6:00 PM | Saturday: 9:00 AM – 2:00 PM',
                  },
                ].map((item, i) => (
                  <div key={i} className="hq-detail-item">
                    <div className="hq-detail-icon">{item.icon}</div>
                    <div className="hq-detail-text">
                      <h4>{item.title}</h4>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <a
                href="https://maps.google.com/?q=SMIC360+LIMITED"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ marginTop: '24px' }}
              >
                Get Directions →
              </a>
            </div>
            <div className="reveal-right">
              <div className="hq-map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d63528.36050131504!2d-0.076514!3d5.637253!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf8402e54ac0bd%3A0x37c47d7434f4203c!2sSMIC360%20LIMITED!5e0!3m2!1sen!2sus!4v1777199771968!5m2!1sen!2sus"
                  width="600"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="SMIC360 Location"
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
          <h2 className="consult-title">
            Get A <em>Free Consultation</em>
          </h2>
          <p className="consult-sub">
            Tell us about your business challenge. Whether it&apos;s a brand refresh, a property
            investment, or a procurement need — our team will put together a bespoke solution for
            you within 24 hours.
          </p>
          {!consultDone ? (
            <form className="consult-form" onSubmit={handleConsult}>
              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
                value={consultEmail}
                onChange={(e) => setConsultEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn btn-primary" disabled={consultLoading}>
                {consultLoading ? 'Sending...' : 'Get Started →'}
              </button>
            </form>
          ) : (
            <p
              style={{ color: 'var(--cyan)', fontWeight: 700, fontSize: '16px', marginTop: '8px' }}
            >
              ✔ Thank you! We&apos;ll be in touch within 2 business hours.
            </p>
          )}
          <p style={{ marginTop: '14px', fontSize: '12px', color: 'rgba(255,255,255,.32)' }}>
            Or call us:{' '}
            <a href="tel:0244783099" style={{ color: 'var(--cyan)', fontWeight: 700 }}>
              024 478 3099
            </a>{' '}
            — No obligation, no spam.
          </p>
        </div>
      </section>

      <Footer onBookClick={() => setBookOpen(true)} />
      <ChatPanel />

      {/* ── TEAM MODAL — bulletproof standalone portal ── */}
      <TeamModal member={teamModal} onClose={() => setTeamModal(null)} />
    </>
  );
}

/* ─── TeamModal extracted as standalone so portal always works ── */
function TeamModal({
  member,
  onClose,
}: {
  member: { img: string; name: string; role: string; fullBio: string } | null;
  onClose: () => void;
}) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  /* scroll lock — uses html overflow so fixed floats stay visible */
  React.useEffect(() => {
    if (!mounted) return;
    if (member) {
      const y = window.scrollY;
      document.documentElement.dataset.tmY = String(y);
      const scrollbarW = window.innerWidth - document.documentElement.clientWidth;
      document.documentElement.style.overflow = 'hidden';
      document.documentElement.style.paddingRight = `${scrollbarW}px`;
    } else {
      const savedY = parseInt(document.documentElement.dataset.tmY || '0', 10);
      document.documentElement.style.overflow = '';
      document.documentElement.style.paddingRight = '';
      delete document.documentElement.dataset.tmY;
      window.scrollTo(0, savedY);
    }
  }, [member, mounted]);

  if (!mounted || !member) return null;

  return createPortal(
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(4,14,29,0.92)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2147483647,
        padding: '20px 16px',
        overflowY: 'auto',
      }}
    >
      <style>{`
        @keyframes tmSlideIn {
          from { opacity: 0; transform: translateY(32px) scale(0.95); }
          to   { opacity: 1; transform: none; }
        }
      `}</style>
      <div
        style={{
          background: '#fff',
          width: '100%',
          maxWidth: '640px',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 40px 100px rgba(4,14,29,0.55)',
          borderTop: '4px solid #FFC107',
          animation: 'tmSlideIn 0.38s cubic-bezier(0.16,1,0.3,1) both',
        }}
      >
        {/* Header */}
        <div
          style={{
            background: 'linear-gradient(135deg,#040e1d 0%,#0b2d56 55%,#1261c0 100%)',
            padding: '32px 28px',
            display: 'flex',
            gap: '22px',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage:
                'linear-gradient(rgba(0,180,216,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(0,180,216,0.06) 1px,transparent 1px)',
              backgroundSize: '24px 24px',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 2,
              background: 'linear-gradient(90deg,#FFC107,#00b4d8,#FFC107)',
            }}
          />
          {/* Close btn */}
          <button
            type="button"
            onClick={onClose}
            style={{
              position: 'absolute',
              top: 14,
              right: 14,
              background: 'rgba(255,255,255,0.12)',
              border: '1px solid rgba(255,255,255,0.22)',
              color: '#fff',
              width: 36,
              height: 36,
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 16,
              zIndex: 10,
              transition: 'background 0.2s',
              fontFamily: 'inherit',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = 'rgba(220,38,38,0.75)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.12)';
            }}
          >
            ✕
          </button>
          <img
            src={member.img}
            alt={member.name}
            style={{
              width: 110,
              height: 110,
              borderRadius: 14,
              objectFit: 'cover',
              border: '3px solid rgba(255,255,255,0.25)',
              flexShrink: 0,
              boxShadow: '0 8px 28px rgba(0,0,0,0.35)',
              position: 'relative',
              zIndex: 1,
            }}
          />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h3
              style={{
                fontFamily: "'Oswald',sans-serif",
                fontSize: 26,
                fontWeight: 700,
                color: '#FFC107',
                margin: 0,
                lineHeight: 1.1,
              }}
            >
              {member.name}
            </h3>
            <div
              style={{
                color: '#00b4d8',
                fontWeight: 700,
                fontSize: 12.5,
                letterSpacing: '1.2px',
                textTransform: 'uppercase',
                marginTop: 6,
              }}
            >
              {member.role}
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
              {['in', 'ig', 'tw'].map((s) => (
                <span
                  key={s}
                  style={{
                    width: 30,
                    height: 30,
                    background: 'rgba(255,255,255,0.15)',
                    border: '1px solid rgba(255,255,255,0.22)',
                    borderRadius: 7,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontSize: 11,
                    fontWeight: 700,
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
        {/* Body */}
        <div
          style={{ padding: '28px 32px 36px', color: '#5a7186', lineHeight: 1.85, fontSize: 15.5 }}
        >
          {member.fullBio}
        </div>
      </div>
    </div>,
    document.body
  );
}
