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

export default function AboutPage() {
  const [bookOpen, setBookOpen] = useState(false);
  const [teamModal, setTeamModal] = useState<(typeof teamMembers)[0] | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  React.useEffect(() => {
    if (!mounted) return;
    if (teamModal) {
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
  }, [teamModal, mounted]);

  return (
    <>
      <ScrollReveal />
      <Topbar />
      <Navbar onBookClick={() => setBookOpen(true)} />
      <BookingModal isOpen={bookOpen} onClose={() => setBookOpen(false)} />

      {/* Team Modal */}
      {mounted && teamModal && createPortal(
        <>
          <style>{`@keyframes bmIn { from{opacity:0;transform:translateY(28px) scale(0.95);} to{opacity:1;transform:none;} }`}</style>
          <div
            onClick={(e) => { if (e?.target === e?.currentTarget) setTeamModal(null); }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(4,14,29,0.88)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999999, padding: '20px 16px', overflowY: 'auto' }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{ background: '#fff', width: '100%', maxWidth: '650px', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 32px 80px rgba(4,14,29,0.35)', borderTop: '4px solid #FFC107', animation: 'bmIn 0.38s cubic-bezier(0.16,1,0.3,1)', position: 'relative' }}
            >
              <div style={{ background: 'linear-gradient(135deg,#071628 0%,#0b2d56 55%,#1261c0 100%)', padding: '32px 28px', display: 'flex', gap: '22px', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,180,216,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(0,180,216,0.06) 1px,transparent 1px)', backgroundSize: '24px 24px', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,#FFC107,#00b4d8,#FFC107)' }} />
                <button onClick={() => setTeamModal(null)} style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', width: 32, height: 32, borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, zIndex: 10 }}>✕</button>
                <img src={teamModal.img} alt={teamModal.name} style={{ width: 110, height: 110, borderRadius: 14, objectFit: 'cover', border: '3px solid rgba(255,255,255,0.2)', flexShrink: 0, boxShadow: '0 8px 28px rgba(0,0,0,0.3)', position: 'relative', zIndex: 1 }} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <h3 style={{ fontFamily: "'Oswald',sans-serif", fontSize: 26, fontWeight: 700, color: '#FFC107', margin: 0 }}>{teamModal.name}</h3>
                  <div style={{ color: '#00b4d8', fontWeight: 700, fontSize: 12, letterSpacing: '1.2px', textTransform: 'uppercase', marginTop: 5 }}>{teamModal.role}</div>
                  <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                    {['in', 'ig', 'tw'].map((s) => (
                      <span key={s} style={{ width: 28, height: 28, background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 11, fontWeight: 700 }}>{s}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ padding: '28px 32px', color: '#5a7186', lineHeight: 1.82, fontSize: 15 }}>{teamModal.fullBio}</div>
            </div>
          </div>
        </>,
        document.body
      )}

      {/* Page Hero */}
      <div className="page-hero">
        <div className="page-hero-inner">
          <div className="page-hero-tag">About Us</div>
          <h1>Building <em>Legacies</em></h1>
          <p>
            SMIC360 Limited — the Preferred Advertising Agency in Ghana &amp; Beyond. Our story is one
            of creativity, professionalism, and transformative impact across Ghana&apos;s business landscape.
          </p>
        </div>
      </div>

      {/* About / Core Solutions Section */}
      <section style={{ padding: '90px 0', background: 'var(--white)' }}>
        <div className="wrap">

          {/* ── Top row: image + intro ── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center', marginBottom: 64 }} className="about-hero-grid">

            {/* Left — image */}
            <div className="reveal-left" style={{ position: 'relative' }}>
              <div style={{ borderRadius: 20, overflow: 'hidden', boxShadow: '0 24px 64px rgba(7,22,40,0.14)', position: 'relative' }}>
                <img
                  src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80"
                  alt="Our Team"
                  style={{ width: '100%', height: 480, objectFit: 'cover', display: 'block' }}
                />
                {/* Dark gradient overlay at bottom */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(7,22,40,0.72) 0%, transparent 55%)' }} />
                {/* Tagline on image */}
                <div style={{ position: 'absolute', bottom: 28, left: 28, right: 28 }}>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 6 }}>Our Promise</p>
                  <p style={{ color: '#FFC107', fontSize: 16, fontWeight: 700, fontStyle: 'italic', lineHeight: 1.5, margin: 0 }}>
                    Building Foundations. Branding Futures. Connecting Markets.
                  </p>
                </div>
              </div>
              {/* 20+ badge */}
              <div style={{ position: 'absolute', top: 24, right: -18, background: 'var(--blue)', color: '#fff', borderRadius: 14, padding: '18px 22px', textAlign: 'center', boxShadow: '0 8px 28px rgba(19,97,196,.38)', zIndex: 2 }}>
                <span style={{ fontFamily: 'Oswald,sans-serif', fontSize: 36, fontWeight: 700, lineHeight: 1, display: 'block' }}>20+</span>
                <span style={{ fontSize: 11, fontWeight: 600, opacity: 0.85, marginTop: 2, display: 'block', textTransform: 'uppercase', letterSpacing: '1px' }}>Years</span>
              </div>
            </div>

            {/* Right — intro text */}
            <div className="reveal-right">
              <span className="tag">Who We Are</span>
              <h2 className="section-title">A Fully Integrated <em>360° Approach</em></h2>
              <p className="section-sub" style={{ marginBottom: 24 }}>
                At SMIC360, we drive growth by aligning strategy with execution across three critical business pillars.
                We eliminate fragmentation by providing seamless, results-driven experiences across the entire value chain.
              </p>
              {/* Three pillar badges */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { num: 'I.',   color: '#D4A017', title: 'Advertising & Marketing',      sub: 'Laying the Foundation for Brand Power' },
                  { num: 'II.',  color: '#1261c0', title: 'Real Estate Development',       sub: 'Transforming Potential into Premium Assets' },
                  { num: 'III.', color: '#16a34a', title: 'Procurement & Supply Solutions', sub: 'Streamlining Global Sourcing' },
                ].map((p, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', borderLeft: `4px solid ${p.color}`, padding: '8px 18px', background: 'rgba(0,0,0,0.02)', borderRadius: 4 }}>
                    <div>
                      <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 15, fontWeight: 700, color: 'var(--navy)', lineHeight: 1.2 }}>{p.num} {p.title}</div>
                      <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2, fontStyle: 'italic' }}>{p.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 28, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link href="/contact" className="btn btn-primary">Let&apos;s Discuss Your Project</Link>
                <Link href="/portfolio" className="btn btn-outline">View Our Work</Link>
              </div>
            </div>
          </div>

          {/* ── Bottom: three pillar detail cards ── */}
          <div className="values-grid stagger" style={{ marginTop: 40 }}>
            {[
              {
                num: 'I', color: '#D4A017', lightBg: '#fffbeb', borderCol: 'rgba(212,160,23,0.2)',
                title: 'Advertising & Marketing',
                sub: 'Laying the Foundation for Brand Power & Market Dominance. We provide a comprehensive ecosystem of creative and strategic services designed to build powerful, memorable brands that achieve sustainable growth.',
                items: [
                  { title: 'Strategy & Advisory',   desc: 'We define your path to success through brand positioning, market entry strategies, and data-informed business advisory.' },
                  { title: 'Branding & Creative',   desc: 'Our team crafts compelling corporate identities and visual communication designs that resonate across digital and traditional platforms.' },
                  { title: 'Campaign Execution',    desc: 'We bring ideas to life through integrated marketing, leveraging social media, search, and high-impact experiential activations.' },
                  { title: 'Media & Production',    desc: 'We maximize your reach through expert media buying, out-of-home (OOH) execution, and high-quality print management.' },
                ],
              },
              {
                num: 'II', color: '#1261c0', lightBg: '#eff6ff', borderCol: 'rgba(18,97,192,0.2)',
                title: 'Real Estate Development',
                sub: 'Transforming Potential into Premium Assets. Our real estate division focuses on the full lifecycle of property development and asset management, ensuring architectural excellence and maximum investment value.',
                items: [
                  { title: 'Property Development & Strategic Sales',      desc: 'We manage everything from land acquisition and project feasibility to the construction of modern residential and commercial complexes.' },
                  { title: 'Property Leasing & Asset Management',      desc: 'We specialize in the curation of premium rental portfolios, including furnished apartments and executive stays.' },
                  { title: 'Operational Excellence',    desc: 'Our services include rigorous tenant screening, lease administration, and proactive maintenance to preserve long-term asset value.' },
                  { title: 'Hospitality Services',      desc: 'We provide concierge-level support for short-term rentals and guest services.' },
                ],
              },
              {
                num: 'III', color: '#16a34a', lightBg: '#f0fdf4', borderCol: 'rgba(22,163,74,0.2)',
                title: 'Procurement & Supply Solutions',
                sub: 'Streamlining Global Sourcing with Precision and Reliability. We act as your dedicated sourcing partner, simplifying complex supply chains to deliver high-quality materials and equipment at competitive prices.',
                items: [
                  { title: 'Strategic Sourcing & Cost Efficiency',        desc: 'Leverage our extensive network to secure the best suppliers and negotiate competitive pricing, reducing your operational costs.' },
                  { title: 'Quality & Reliability',     desc: 'We prioritize stringent quality assurance and coordinate complex logistics to ensure every item is delivered on time and to specification.' },
                  { title: 'Industrial & Commercial', desc: 'Machinery, specialized tools, and safety equipment (PPE).' },
                  { title: 'Construction Materials', desc: 'High-grade cement, steel, roofing, and electrical fittings.' },
                  { title: 'Bulk Commodities',   desc: 'Industrial and edible salt, and diverse raw materials for manufacturing.' },
                  { title: 'Household & Specialized Items',   desc: 'Premium appliances, hard-to-find components, and custom-order products.' },
                ],
              },
            ].map((pillar, pi) => (
              <div key={pi} style={{ background: '#fff', borderRadius: 20, border: `1px solid ${pillar.borderCol}`, overflow: 'hidden', boxShadow: '0 4px 24px rgba(7,22,40,0.07)', display: 'flex', flexDirection: 'column', transition: 'transform 0.3s' }}>
                {/* Pillar header */}
                <div style={{ background: pillar.lightBg, borderBottom: `1px solid ${pillar.borderCol}`, padding: '20px 22px', display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 800, color: pillar.color, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>Division {pillar.num}</div>
                    <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 16, fontWeight: 700, color: 'var(--navy)', lineHeight: 1.2 }}>{pillar.title}</div>
                  </div>
                </div>
                {/* Service items */}
                <div style={{ padding: '22px', display: 'flex', flexDirection: 'column', gap: 16, flex: 1 }}>
                  <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6, fontStyle: 'italic', marginBottom: 4 }}>{pillar.sub}</div>
                  {pillar.items.map((item, ii) => (
                    <div key={ii} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      <img 
                        src="https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777107241/cropped-SMIC-01-180x180_pffxe7.jpg" 
                        alt="" 
                        style={{ width: 14, height: 14, marginTop: 4, flexShrink: 0, borderRadius: 3 }} 
                      />
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--navy)', marginBottom: 2 }}>{item.title}</div>
                        <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Stats */}
      <div style={{ background: '#1a1a1a', padding: '64px 0' }}>
        <div className="wrap">
          <div className="stats-grid">
            {[
              { num: '150', suffix: '+', label: 'Projects Delivered' },
              { num: '80',  suffix: '+', label: 'Happy Clients' },
              { num: '20',  suffix: '+', label: 'Years of Excellence' },
              { num: '3',   suffix: '',  label: 'Core Services' },
            ].map((stat, i) => (
              <div key={i} style={{ textAlign: 'center', padding: '8px' }}>
                <div style={{ fontFamily: 'Oswald,sans-serif', fontSize: 'clamp(36px,4vw,56px)', fontWeight: 700, color: '#FFFFFF', lineHeight: 1 }}>
                  {stat.num}<span style={{ color: '#FFC107' }}>{stat.suffix}</span>
                </div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '10px' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Vision, Mission & Core Values */}
      <section style={{ padding: '90px 0', background: 'var(--off)' }}>
        <div className="wrap">
          <div style={{ textAlign: 'center', marginBottom: '48px' }} className="reveal">
            <span className="tag" style={{ justifyContent: 'center' }}>Our Foundation</span>
            <h2 className="section-title">Vision, Mission &amp; <em>Core Values</em></h2>
          </div>

          {/* Vision & Mission */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '48px' }} className="stagger">
            <div style={{ background: '#fff', borderRadius: 'var(--r-lg)', padding: '36px 28px', boxShadow: 'var(--sh)', border: '1px solid var(--border)' }}>
              <h3 style={{ fontFamily: 'Oswald,sans-serif', fontSize: '22px', fontWeight: 700, color: 'var(--navy)', marginBottom: '12px' }}>Our Vision</h3>
              <p style={{ fontSize: '15px', color: 'var(--text)', lineHeight: 1.8, fontStyle: 'italic' }}>
                &ldquo;To become the Preferred Advertising Agency in Ghana &amp; Beyond.&rdquo;
              </p>
            </div>
            <div style={{ background: '#fff', borderRadius: 'var(--r-lg)', padding: '36px 28px', boxShadow: 'var(--sh)', border: '1px solid var(--border)' }}>
              <h3 style={{ fontFamily: 'Oswald,sans-serif', fontSize: '22px', fontWeight: 700, color: 'var(--navy)', marginBottom: '12px' }}>Our Mission</h3>
              <p style={{ fontSize: '15px', color: 'var(--text)', lineHeight: 1.8, fontStyle: 'italic' }}>
                &ldquo;To provide quality and effective Advertising, Media and PR service while investing in the intellect of our professionals and using up to date technology to maximize the value of our clients.&rdquo;
              </p>
            </div>
          </div>

          {/* Core Values */}
          <div className="values-grid stagger">
            {[
              'Professionalism',
              'Creativity & Innovation',
              'Quality',
              'Team Spirit',
              'Diversity',
              'Entrepreneurial Spirit',
            ].map((title, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 'var(--r-lg)', padding: '32px 24px', textAlign: 'center', boxShadow: 'var(--sh)', border: '1px solid var(--border)', transition: 'all .3s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <h3 style={{ fontFamily: 'Oswald,sans-serif', fontSize: '18px', fontWeight: 700, color: 'var(--navy)', margin: 0 }}>{title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SDGs Section */}
      <section id="sdgs" style={{ padding: '90px 0', background: 'var(--off)', overflow: 'hidden', position: 'relative' }}>
        {/* Subtle background pattern */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(212,160,23,0.05) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(18,97,192,0.05) 0%, transparent 60%)', pointerEvents: 'none' }} />

        <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '60px' }} className="reveal">
            <span className="tag" style={{ justifyContent: 'center' }}>Our Impact</span>
            <h2 className="section-title">Our Commitment to <em>Global Goals</em></h2>
            <p className="section-sub" style={{ margin: '16px auto 0', textAlign: 'center', maxWidth: '680px' }}>
              At SMIC360 Limited, our work is guided by a commitment to creating lasting positive change.
              We align our business practices with key United Nations Sustainable Development Goals (SDGs),
              ensuring that our success contributes to a better world.
            </p>
          </div>

          {/* Three SDG icons — large, prominent */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '32px', flexWrap: 'wrap', marginBottom: '72px' }} className="reveal">
            {[
              { img: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777800989/Sustainable_Development_Goal_05GenderEquality.svg_wn3i55.png', label: 'SDG 5', sub: 'Gender Equality' },
              { img: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777800989/Sustainable_Development_Goal_08DecentWork.svg_kyh8nd.png', label: 'SDG 8', sub: 'Decent Work & Economic Growth' },
              { img: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777800989/Sustainable_Development_Goal_09Indust_qzjpbr.png', label: 'SDG 9', sub: 'Industry, Innovation & Infrastructure' },
            ].map((sdg, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: 140, height: 140, borderRadius: 20, overflow: 'hidden', boxShadow: '0 12px 40px rgba(7,22,40,0.15)', transition: 'transform 0.3s, box-shadow 0.3s', cursor: 'default' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-6px) scale(1.04)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 24px 60px rgba(7,22,40,0.22)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = ''; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 40px rgba(7,22,40,0.15)'; }}
                >
                  <img src={sdg.img} alt={sdg.sub} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 13, fontWeight: 700, color: 'var(--gold-d)', letterSpacing: '1px', textTransform: 'uppercase' }}>{sdg.label}</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 3, maxWidth: 120, lineHeight: 1.4 }}>{sdg.sub}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Three pillar content cards */}
          <div className="values-grid stagger" style={{ marginBottom: '64px' }}>

            {/* Card 1 — Gender Equality */}
            <div style={{ background: '#fff', borderRadius: 'var(--r-lg)', overflow: 'hidden', boxShadow: 'var(--sh)', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: 6, background: '#E5243B' }} />
              <div style={{ padding: '32px 28px', flex: 1 }}>
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#E5243B', marginBottom: 2 }}>SDG 5</div>
                  <h3 style={{ fontFamily: "'Oswald',sans-serif", fontSize: 18, fontWeight: 700, color: 'var(--navy)', lineHeight: 1.2 }}>Gender Equality</h3>
                </div>
                <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.78 }}>
                  As a <strong style={{ color: 'var(--text)' }}>woman-owned and funded company</strong>, our foundation is built on the principles
                  of gender equality. We are dedicated to ensuring equal opportunities and fair representation
                  within our team, and we advocate for diversity and inclusion across the industries we serve.
                  We believe that empowering all individuals is essential for sustainable growth.
                </p>
              </div>
            </div>

            {/* Card 2 — Decent Work */}
            <div style={{ background: '#fff', borderRadius: 'var(--r-lg)', overflow: 'hidden', boxShadow: 'var(--sh)', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: 6, background: '#A21942' }} />
              <div style={{ padding: '32px 28px', flex: 1 }}>
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#A21942', marginBottom: 2 }}>SDG 8</div>
                  <h3 style={{ fontFamily: "'Oswald',sans-serif", fontSize: 18, fontWeight: 700, color: 'var(--navy)', lineHeight: 1.2 }}>Decent Work &amp; Economic Growth</h3>
                </div>
                <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.78 }}>
                  We contribute to economic prosperity by creating <strong style={{ color: 'var(--text)' }}>meaningful employment opportunities</strong> and
                  fostering a positive and inclusive work environment. Through our core business — delivering
                  efficient advertising, innovative real estate solutions, and reliable procurement services —
                  we drive business success for our clients, thereby fueling broader economic growth.
                </p>
              </div>
            </div>

            {/* Card 3 — Industry & Innovation */}
            <div style={{ background: '#fff', borderRadius: 'var(--r-lg)', overflow: 'hidden', boxShadow: 'var(--sh)', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: 6, background: '#FD6925' }} />
              <div style={{ padding: '32px 28px', flex: 1 }}>
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#FD6925', marginBottom: 2 }}>SDG 9</div>
                  <h3 style={{ fontFamily: "'Oswald',sans-serif", fontSize: 18, fontWeight: 700, color: 'var(--navy)', lineHeight: 1.2 }}>Industry, Innovation &amp; Infrastructure</h3>
                </div>
                <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.78 }}>
                  Our work directly supports the development of <strong style={{ color: 'var(--text)' }}>sustainable industries and resilient infrastructure</strong>.
                  We continuously innovate to improve our processes and provide cutting-edge solutions.
                  Our real estate and procurement projects contribute to building the infrastructure
                  that supports a thriving and modern economy.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom CTA strip */}
          <div style={{ background: 'linear-gradient(135deg, #071628 0%, #0b2d56 55%, #1261c0 100%)', borderRadius: 'var(--r-xl)', padding: '52px 44px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '28px', position: 'relative', overflow: 'hidden' }} className="reveal">
            {/* Grid pattern */}
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none', borderRadius: 'var(--r-xl)' }} />
            {/* Gold top line */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg,#FFC107,#00b4d8,#FFC107)', borderRadius: 'var(--r-xl) var(--r-xl) 0 0' }} />

            <div style={{ position: 'relative', zIndex: 1, flex: 1, minWidth: 280 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,193,7,0.7)', marginBottom: 10 }}>We Are Leaving No One Behind</div>
              <h3 style={{ fontFamily: "'Oswald',sans-serif", fontSize: 'clamp(22px,3vw,34px)', fontWeight: 700, color: '#fff', lineHeight: 1.15, marginBottom: 10 }}>
                Connect with us on our mission to<br />
                <em style={{ fontStyle: 'normal', color: '#FFC107' }}>bring change to the world</em>, one business at a time.
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14, lineHeight: 1.7, maxWidth: 480 }}>
                Building Foundations. Branding Futures. Connecting Markets.
              </p>
            </div>

            <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 12, flexShrink: 0 }}>
              <Link href="/contact" className="btn btn-primary" style={{ fontSize: 14, padding: '14px 28px', whiteSpace: 'nowrap' }}>
                Contact Us →
              </Link>
              <Link href="/about" className="btn btn-outline-white" style={{ fontSize: 13, padding: '12px 28px', textAlign: 'center', whiteSpace: 'nowrap' }}>
                Our Full Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: '90px 0', background: 'var(--white)' }}>
        <div className="wrap">
          <style>{`
            .team-card { opacity: 0; transform: translateY(40px); transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
            .stagger.visible .team-card { opacity: 1; transform: translateY(0); }
          `}</style>
          <div style={{ textAlign: 'center', marginBottom: '48px' }} className="reveal">
            <span className="tag" style={{ justifyContent: 'center' }}>The People</span>
            <h2 className="section-title">Meet <em>The Experts</em></h2>
            <p className="section-sub" style={{ margin: '12px auto 0', textAlign: 'center' }}>
              A dedicated team of strategists, creatives, and specialists united by one goal — your success.
            </p>
          </div>
          <div className="team-grid stagger">
            {teamMembers.map((member, i) => (
              <div key={i} className="team-card" onClick={() => setTeamModal(member)} style={{ cursor: 'pointer', transitionDelay: `${i * 0.15}s` }}>
                <div className="team-img"><img src={member.img} alt={member.name} /></div>
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

      <Footer onBookClick={() => setBookOpen(true)} />
      <ChatPanel />
    </>
  );
}
