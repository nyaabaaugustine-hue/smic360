'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Topbar from '@/components/Topbar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';
import ChatPanel from '@/components/ChatPanel';
import ScrollReveal from '@/components/ScrollReveal';

const SDGS = [
  {
    num: '05',
    color: '#EF402B',
    bg: 'linear-gradient(135deg,#EF402B 0%,#c93520 100%)',
    shadow: 'rgba(239,64,43,0.22)',
    img: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777800989/Sustainable_Development_Goal_05GenderEquality.svg_wn3i55.png',
    title: 'Gender Equality',
    headline: 'Women-Owned.\nWomen-Led.\nImpact-Driven.',
    body: 'As a woman-owned and funded company, our foundation is built on the principles of gender equality. We are dedicated to ensuring equal opportunities and fair representation within our team, and we advocate for diversity and inclusion across the industries we serve. We believe that empowering all individuals is essential for sustainable growth.',
    actions: [
      'Equal pay and equal opportunity employment across all roles',
      'Mentorship and career development programmes for women in business',
      'Advocacy for diversity and inclusion in the industries we serve',
      'Partnering with women-led suppliers and vendors in our procurement chain',
    ],
  },
  {
    num: '08',
    color: '#A21942',
    bg: 'linear-gradient(135deg,#A21942 0%,#7d1233 100%)',
    shadow: 'rgba(162,25,66,0.22)',
    img: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777800989/Sustainable_Development_Goal_08DecentWork.svg_kyh8nd.png',
    title: 'Decent Work & Economic Growth',
    headline: 'Creating Jobs.\nFuelling Growth.\nWorldwide.',
    body: 'We contribute to economic prosperity by creating meaningful employment opportunities and fostering a positive and inclusive work environment. Through our core business — delivering efficient advertising, innovative real estate solutions, and reliable procurement services — we drive business success for our clients, thereby fuelling broader economic growth.',
    actions: [
      'Creating and sustaining quality employment opportunities globally',
      'Fostering safe, inclusive, and rewarding workplaces for all staff',
      'Driving business growth for 80+ client companies worldwide',
      'Supporting local suppliers and contractors in our real estate and procurement projects',
    ],
  },
  {
    num: '09',
    color: '#F36D25',
    bg: 'linear-gradient(135deg,#F36D25 0%,#c95510 100%)',
    shadow: 'rgba(243,109,37,0.22)',
    img: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777800989/Sustainable_Development_Goal_09Indust_qzjpbr.png',
    title: 'Industry, Innovation & Infrastructure',
    headline: 'Building\nInfrastructure.\nDriving Innovation.',
    body: 'Our work directly supports the development of sustainable industries and resilient infrastructure. We continuously innovate to improve our processes and provide cutting-edge solutions. Our real estate and procurement projects contribute to building the infrastructure that supports a thriving and modern economy.',
    actions: [
      'Developing modern, sustainable residential and commercial real estate',
      'Continuously innovating our marketing, procurement, and property processes',
      'Building infrastructure that underpins growing economies worldwide',
      'Bringing cutting-edge digital marketing and technology solutions to businesses globally',
    ],
  },
];

export default function SDGsPage() {
  const [bookOpen, setBookOpen] = useState(false);
  const [active, setActive] = useState(0);

  return (
    <>
      <style>{`
        /* ── PAGE BASE ── */
        .sdg-page { font-family: 'Outfit', sans-serif; }

        /* ── HERO ── */
        .sdg-hero {
          position: relative;
          background: linear-gradient(135deg, #040e1d 0%, #0b2d56 60%, #071628 100%);
          padding: 140px 0 100px;
          overflow: hidden;
        }
        .sdg-hero::before {
          content: '';
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(0,180,216,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,180,216,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }
        .sdg-hero-bar {
          position: absolute; bottom: 0; left: 0; right: 0; height: 4px;
          background: linear-gradient(90deg, #EF402B 33%, #A21942 66%, #F36D25 100%);
        }
        .sdg-hero-inner {
          max-width: 1200px; margin: 0 auto; padding: 0 28px;
          position: relative; z-index: 1;
          display: grid; grid-template-columns: 1fr auto; gap: 60px; align-items: center;
        }
        .sdg-hero-un {
          display: inline-flex; align-items: center; gap: 10px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 24px; padding: 8px 16px;
          margin-bottom: 22px;
        }
        .sdg-hero-un-dot { font-size: 18px; }
        .sdg-hero-un-text { font-size: 10.5px; font-weight: 700; letter-spacing: 1.8px; text-transform: uppercase; color: rgba(255,255,255,0.6); }
        .sdg-hero h1 {
          font-family: 'Oswald', sans-serif;
          font-size: clamp(40px, 6vw, 72px);
          font-weight: 700; color: #fff; line-height: 1.0;
          margin: 0 0 18px; letter-spacing: -0.5px;
        }
        .sdg-hero h1 em { font-style: normal; color: #FFC107; }
        .sdg-hero-sub {
          font-size: 16.5px; color: rgba(255,255,255,0.58);
          line-height: 1.82; max-width: 560px; margin-bottom: 36px;
        }

        /* Three SDG icons in hero */
        .sdg-hero-icons {
          display: flex; gap: 16px; margin-bottom: 36px; align-items: center;
        }
        .sdg-hero-icon {
          width: 80px; height: 80px;
          border-radius: 16px;
          overflow: hidden;
          border: 2px solid rgba(255,255,255,0.12);
          cursor: pointer;
          transition: all 0.28s;
          flex-shrink: 0;
          background: rgba(255,255,255,0.04);
        }
        .sdg-hero-icon:hover {
          transform: translateY(-5px) scale(1.05);
          border-color: rgba(255,255,255,0.4);
          box-shadow: 0 14px 36px rgba(0,0,0,0.4);
        }
        .sdg-hero-icon img { width: 100%; height: 100%; object-fit: cover; display: block; }

        /* Right: stacked large SDG icons */
        .sdg-hero-right {
          display: flex; flex-direction: column; gap: 12px;
        }
        .sdg-hero-right-icon {
          width: 120px; height: 120px;
          border-radius: 20px; overflow: hidden;
          border: 2px solid rgba(255,255,255,0.1);
          box-shadow: 0 12px 40px rgba(0,0,0,0.35);
          transition: all 0.28s; cursor: pointer;
          background: rgba(255,255,255,0.03);
        }
        .sdg-hero-right-icon:hover { transform: scale(1.04); box-shadow: 0 18px 50px rgba(0,0,0,0.5); }
        .sdg-hero-right-icon img { width: 100%; height: 100%; object-fit: cover; display: block; }

        /* ── INTRO ── */
        .sdg-intro { background: #f6f8fd; padding: 72px 0; border-bottom: 1px solid #dce8f7; }
        .sdg-intro-inner { max-width: 840px; margin: 0 auto; padding: 0 28px; text-align: center; }
        .sdg-intro-lead {
          font-family: 'Oswald', sans-serif;
          font-size: clamp(22px, 3.5vw, 32px);
          font-weight: 700; color: #071628; line-height: 1.3;
          margin-bottom: 16px;
        }
        .sdg-intro-lead em { font-style: normal; color: #D4A017; }
        .sdg-intro-body { font-size: 16px; color: #5a7186; line-height: 1.85; }

        /* ── TABS ── */
        .sdg-tabs {
          display: flex;
          border-bottom: 2px solid #dce8f7;
          background: #fff;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }
        .sdg-tabs::-webkit-scrollbar { display: none; }
        .sdg-tab {
          flex: 1; min-width: 200px;
          padding: 22px 28px;
          display: flex; align-items: center; gap: 16px;
          cursor: pointer; border: none; background: transparent;
          border-bottom: 4px solid transparent;
          margin-bottom: -2px;
          transition: all 0.25s;
          font-family: 'Outfit', sans-serif;
        }
        .sdg-tab:hover { background: #f9fbff; }
        .sdg-tab.active { background: #fff; }
        .sdg-tab-img {
          width: 52px; height: 52px;
          border-radius: 12px; overflow: hidden; flex-shrink: 0;
          border: 2px solid rgba(0,0,0,0.06);
        }
        .sdg-tab-img img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .sdg-tab-num { font-size: 10.5px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; }
        .sdg-tab-name { font-size: 14px; font-weight: 700; color: #071628; margin-top: 3px; line-height: 1.25; }

        /* ── DETAIL PANEL ── */
        .sdg-panel { padding: 80px 0; background: #fff; }
        .sdg-panel-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: start;
        }
        .sdg-goal-badge {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 7px 16px; border-radius: 24px;
          font-size: 11px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase;
          margin-bottom: 22px; border: 1.5px solid;
        }
        .sdg-goal-badge img { width: 22px; height: 22px; border-radius: 4px; object-fit: cover; }
        .sdg-headline {
          font-family: 'Oswald', sans-serif;
          font-size: clamp(28px, 4vw, 46px);
          font-weight: 700; color: #071628;
          line-height: 1.05; margin-bottom: 22px;
          white-space: pre-line;
        }
        .sdg-body-text { font-size: 15.5px; color: #5a7186; line-height: 1.88; margin-bottom: 32px; }
        .sdg-actions-title {
          font-family: 'Oswald', sans-serif;
          font-size: 13px; font-weight: 700;
          color: #071628; text-transform: uppercase;
          letter-spacing: 1.5px; margin-bottom: 14px;
        }
        .sdg-action {
          display: flex; gap: 14px; align-items: flex-start;
          background: #f6f8fd; border: 1px solid #dce8f7;
          border-radius: 12px; padding: 14px 16px; margin-bottom: 10px;
          transition: all 0.2s;
        }
        .sdg-action:hover { border-color: #FFC107; background: #FFFBEB; }
        .sdg-action-tick {
          width: 26px; height: 26px; border-radius: 7px;
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; color: #fff; font-weight: 800; flex-shrink: 0; margin-top: 1px;
        }
        .sdg-action-text { font-size: 14px; color: #071628; line-height: 1.65; font-weight: 500; }

        /* Right column */
        .sdg-panel-right { display: flex; flex-direction: column; gap: 22px; }
        .sdg-img-wrap {
          border-radius: 24px; overflow: hidden;
          border: 3px solid; width: 100%;
        }
        .sdg-img-wrap img { width: 100%; height: auto; display: block; }
        .sdg-quote-box {
          border-radius: 16px; padding: 22px 24px;
          background: #f6f8fd; border-left: 4px solid; border-top: 1px solid; border-right: 1px solid; border-bottom: 1px solid;
        }
        .sdg-quote-text { font-size: 14.5px; color: #5a7186; line-height: 1.82; font-style: italic; margin-bottom: 16px; }
        .sdg-quote-author { display: flex; align-items: center; gap: 12px; }
        .sdg-quote-avatar { width: 40px; height: 40px; border-radius: 50%; object-fit: cover; flex-shrink: 0; }
        .sdg-quote-name { font-size: 14px; font-weight: 700; color: #071628; }
        .sdg-quote-role { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; margin-top: 2px; }

        /* ── 3-UP SHOWCASE ── */
        .sdg-three { background: #f6f8fd; padding: 88px 0; border-top: 1px solid #dce8f7; }
        .sdg-three-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; margin-top: 48px; }
        .sdg-card {
          background: #fff; border-radius: 22px; overflow: hidden;
          border: 2px solid #dce8f7;
          box-shadow: 0 4px 20px rgba(7,22,40,0.06);
          transition: all 0.28s cubic-bezier(0.16,1,0.3,1); cursor: pointer;
        }
        .sdg-card:hover { transform: translateY(-10px); box-shadow: 0 24px 60px rgba(7,22,40,0.14); }
        .sdg-card-img-wrap {
          padding: 36px; display: flex; justify-content: center; align-items: center;
          position: relative; overflow: hidden;
        }
        .sdg-card-img-wrap::before {
          content: ''; position: absolute; inset: 0;
          background: rgba(255,255,255,0.07);
          background-image: linear-gradient(rgba(255,255,255,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.06) 1px,transparent 1px);
          background-size: 18px 18px;
        }
        .sdg-card-img { width: 160px; height: 160px; object-fit: cover; display: block; border-radius: 12px; position: relative; z-index: 1; box-shadow: 0 8px 28px rgba(0,0,0,0.2); }
        .sdg-card-body { padding: 26px 24px 28px; }
        .sdg-card-num { font-size: 10.5px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 8px; }
        .sdg-card-title { font-family: 'Oswald',sans-serif; font-size: 20px; font-weight: 700; color: #071628; margin-bottom: 10px; line-height: 1.2; }
        .sdg-card-desc { font-size: 13.5px; color: #5a7186; line-height: 1.75; margin-bottom: 18px; }
        .sdg-card-btn { width: 100%; padding: 10px; border-radius: 10px; border: 1.5px solid; font-family: 'Outfit',sans-serif; font-size: 13px; font-weight: 700; cursor: pointer; transition: all 0.2s; background: transparent; }

        /* ── CTA ── */
        .sdg-cta {
          background: linear-gradient(135deg,#040e1d 0%,#0b2d56 55%,#071628 100%);
          padding: 88px 0; position: relative; overflow: hidden;
        }
        .sdg-cta::before {
          content: ''; position: absolute; inset: 0;
          background-image: linear-gradient(rgba(0,180,216,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,180,216,0.04) 1px,transparent 1px);
          background-size: 52px 52px; pointer-events: none;
        }
        .sdg-cta::after {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px;
          background: linear-gradient(90deg,#EF402B,#A21942,#F36D25);
        }
        .sdg-cta-inner { max-width: 760px; margin: 0 auto; padding: 0 28px; text-align: center; position: relative; z-index: 1; }
        .sdg-cta h2 { font-family: 'Oswald',sans-serif; font-size: clamp(30px,5vw,54px); font-weight: 700; color: #fff; line-height: 1.1; margin-bottom: 16px; }
        .sdg-cta h2 em { font-style: normal; color: #FFC107; }
        .sdg-cta p { font-size: 16px; color: rgba(255,255,255,0.55); line-height: 1.82; margin-bottom: 36px; max-width: 540px; margin-left: auto; margin-right: auto; }
        .sdg-tagline { font-family: 'Oswald',sans-serif; font-size: 13px; letter-spacing: 2.5px; text-transform: uppercase; color: rgba(255,255,255,0.2); margin-top: 40px; line-height: 2; }

        /* ── MOBILE ── */
        @media(max-width:960px) {
          .sdg-hero-inner { grid-template-columns: 1fr; gap: 36px; }
          .sdg-hero-right { flex-direction: row; }
          .sdg-hero-right-icon { width: 80px; height: 80px; border-radius: 12px; }
          .sdg-panel-grid { grid-template-columns: 1fr; gap: 40px; }
          .sdg-three-grid { grid-template-columns: repeat(2,1fr); }
        }
        @media(max-width:640px) {
          .sdg-hero { padding: 100px 0 64px; }
          .sdg-hero-icon { width: 64px; height: 64px; border-radius: 12px; }
          .sdg-tabs { }
          .sdg-tab { min-width: 140px; padding: 16px 18px; }
          .sdg-tab-img { width: 40px; height: 40px; }
          .sdg-tab-name { font-size: 12.5px; }
          .sdg-panel { padding: 52px 0; }
          .sdg-three-grid { grid-template-columns: 1fr; }
          .sdg-card-img { width: 130px; height: 130px; }
          .sdg-cta { padding: 60px 0; }
        }
      `}</style>

      <div className="sdg-page">
        <ScrollReveal />
        <Topbar />
        <Navbar onBookClick={() => setBookOpen(true)} />
        <BookingModal isOpen={bookOpen} onClose={() => setBookOpen(false)} />

        {/* ══ HERO ══ */}
        <section className="sdg-hero">
          <div className="sdg-hero-bar" />
          <div className="sdg-hero-inner">
            {/* Left */}
            <div>
              <div className="sdg-hero-un">
                <span className="sdg-hero-un-dot">🌍</span>
                <span className="sdg-hero-un-text">United Nations Sustainable Development Goals</span>
              </div>
              <h1>Our Commitment<br />to <em>Global Goals</em></h1>
              <p className="sdg-hero-sub">
                At SMIC360 Limited, our work is guided by a commitment to creating lasting positive change. We align our business practices with key United Nations Sustainable Development Goals (SDGs), ensuring that our success contributes to a better world.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link href="/contact" className="btn btn-primary" style={{ fontSize: 14 }}>Contact Us →</Link>
                <button onClick={() => setBookOpen(true)} className="btn btn-outline-white" style={{ fontSize: 14 }}>Partner With Us</button>
              </div>
            </div>
          </div>
        </section>

        {/* ══ INTRO ══ */}
        <div className="sdg-intro">
          <div className="sdg-intro-inner">
            <p className="sdg-intro-lead">
              <em>Building Foundations. Branding Futures. Connecting Markets.</em>
            </p>
            <p className="sdg-intro-body">
              As a woman-owned and funded company, SMIC360 Limited is committed to operating responsibly and creating impact that goes beyond business. We champion three United Nations Sustainable Development Goals that reflect who we are, how we work, and the future we are building — one business at a time.
            </p>
          </div>
        </div>

        {/* ══ TABS + DETAIL ══ */}
        <div>
          {/* Tabs */}
          <div className="sdg-tabs">
            {SDGS.map((g, i) => (
              <button
                key={i}
                className={`sdg-tab${active === i ? ' active' : ''}`}
                onClick={() => setActive(i)}
                style={{ borderBottomColor: active === i ? g.color : 'transparent' }}
              >
                <div className="sdg-tab-img">
                  <img src={g.img} alt={`SDG ${g.num}`} loading="lazy" />
                </div>
                <div>
                  <div className="sdg-tab-num" style={{ color: g.color }}>SDG {g.num}</div>
                  <div className="sdg-tab-name">{g.title}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Detail panels — only active shown */}
          {SDGS.map((g, i) => (
            <div key={i} className="sdg-panel" style={{ display: active === i ? 'block' : 'none' }}>
              <div className="wrap">
                <div className="sdg-panel-grid">
                  {/* Left: text */}
                  <div>
                    <div
                      className="sdg-goal-badge"
                      style={{ background: `${g.color}12`, borderColor: `${g.color}40`, color: g.color }}
                    >
                      <img src={g.img} alt={`SDG ${g.num}`} />
                      SDG {g.num} — {g.title}
                    </div>
                    <h2 className="sdg-headline">{g.headline}</h2>
                    <p className="sdg-body-text">{g.body}</p>
                    <div className="sdg-actions-title">How We Take Action</div>
                    {g.actions.map((a, j) => (
                      <div key={j} className="sdg-action">
                        <div className="sdg-action-tick" style={{ background: g.bg }}>✓</div>
                        <div className="sdg-action-text">{a}</div>
                      </div>
                    ))}
                  </div>

                  {/* Right: image + quote */}
                  <div className="sdg-panel-right">
                    <div className="sdg-img-wrap" style={{ borderColor: `${g.color}35`, boxShadow: `0 20px 60px ${g.shadow}` }}>
                      <img src={g.img} alt={`SDG ${g.num} — ${g.title}`} loading="lazy" />
                    </div>
                    <div className="sdg-quote-box" style={{ borderLeftColor: g.color, borderTopColor: `${g.color}20`, borderRightColor: `${g.color}20`, borderBottomColor: `${g.color}20` }}>
                      <p className="sdg-quote-text">
                        &ldquo;We are leaving no one behind — connect with us on our mission to bring change to the world, one business at a time.&rdquo;
                      </p>
                      <div className="sdg-quote-author">
                        <img
                          src="https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777112403/CHRISTIANA_pmwgsx.jpg"
                          alt="Christiana — Founder & CEO"
                          className="sdg-quote-avatar"
                          style={{ border: `2px solid ${g.color}40` }}
                        />
                        <div>
                          <div className="sdg-quote-name">Christiana</div>
                          <div className="sdg-quote-role" style={{ color: g.color }}>Founder & CEO, SMIC360</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ══ 3-UP SHOWCASE ══ */}
        <section className="sdg-three">
          <div className="wrap">
            <div style={{ textAlign: 'center' }} className="reveal">
              <span className="tag" style={{ justifyContent: 'center' }}>Our Three SDGs</span>
              <h2 className="section-title">The Goals We <em>Champion</em></h2>
              <p className="section-sub" style={{ textAlign: 'center', margin: '10px auto 0', maxWidth: 540 }}>
                Recognised by the United Nations — adopted by SMIC360 as pillars of how we do business worldwide.
              </p>
            </div>
            <div className="sdg-three-grid stagger">
              {SDGS.map((g, i) => (
                <div
                  key={i}
                  className="sdg-card"
                  onClick={() => { setActive(i); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  style={{ borderColor: `${g.color}25` }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = g.color; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = `${g.color}25`; }}
                >
                  {/* Icon with coloured bg */}
                  <div className="sdg-card-img-wrap" style={{ background: g.bg }}>
                    <img src={g.img} alt={`SDG ${g.num}`} className="sdg-card-img" loading="lazy" />
                  </div>
                  {/* Body */}
                  <div className="sdg-card-body">
                    <div className="sdg-card-num" style={{ color: g.color }}>SDG {g.num}</div>
                    <div className="sdg-card-title">{g.title}</div>
                    <p className="sdg-card-desc">{g.body.slice(0, 140)}…</p>
                    <button
                      className="sdg-card-btn"
                      style={{ borderColor: g.color, color: g.color }}
                      onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = g.color; b.style.color = '#fff'; }}
                      onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = 'transparent'; b.style.color = g.color; }}
                    >
                      Learn More ↑
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ CTA ══ */}
        <div className="sdg-cta">
          <div className="sdg-cta-inner">
            {/* SDG icons row */}
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', marginBottom: 32 }}>
              {SDGS.map((g, i) => (
                <div key={i} style={{ width: 60, height: 60, borderRadius: 12, overflow: 'hidden', border: '2px solid rgba(255,255,255,0.15)', boxShadow: `0 6px 22px ${g.shadow}` }}>
                  <img src={g.img} alt={`SDG ${g.num}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} loading="lazy" />
                </div>
              ))}
            </div>
            <h2>We Are Leaving<br /><em>No One Behind</em></h2>
            <p>Connect with us on our mission to bring change to the world, one business at a time. Whether you are a client, partner, or investor — your engagement with SMIC360 contributes to a more equal, prosperous, and innovative world.</p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn btn-primary" style={{ fontSize: 15, padding: '13px 30px' }}>Contact Us →</Link>
              <button onClick={() => setBookOpen(true)} className="btn btn-outline-white" style={{ fontSize: 15, padding: '13px 30px' }}>Book a Consultation</button>
            </div>
            <div className="sdg-tagline">
              Building Foundations. Branding Futures. Connecting Markets.
            </div>
          </div>
        </div>

        <Footer onBookClick={() => setBookOpen(true)} />
        <ChatPanel />
      </div>
    </>
  );
}
