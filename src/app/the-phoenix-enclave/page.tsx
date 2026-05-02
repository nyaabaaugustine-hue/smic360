'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Topbar from '@/components/Topbar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';
import ChatPanel from '@/components/ChatPanel';
import ScrollReveal from '@/components/ScrollReveal';

const galleryImages = [
  { src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777111208/WhatsApp-Image-2025-08-18-at-14.16.35_e93040d9l_gwfnmu.jpg', alt: 'Phoenix Enclave Exterior' },
  { src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777196963/1_j6fe4u.jpg', alt: 'Phoenix Enclave Front View' },
  { src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1776533939/ab942b64_f6uozz.jpg', alt: 'Phoenix Enclave Interior' },
  { src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777106950/ec234641a21a9e03c50b708351c53603_vl5piv.jpg', alt: 'Phoenix Enclave Surroundings' },
];

const amenities = [
  { icon: '🛏️', text: '4 Bedrooms ensuite + Maid\'s room (ensuite)' },
  { icon: '❄️', text: 'Fitted Air Conditions throughout' },
  { icon: '🍳', text: 'Fitted Indoor Kitchen' },
  { icon: '🌿', text: 'Fitted Outdoor Kitchen' },
  { icon: '🔒', text: 'Security Fence & Gated Entry' },
  { icon: '👗', text: 'Fitted Wardrobes in all rooms' },
  { icon: '🚗', text: 'Ample Parking for 2 cars' },
  { icon: '💡', text: 'Modern Electrical Fittings' },
];

const paymentPlans = [
  { plan: 'Outright Payment (Off Plan)', detail: 'Special offer — contact us for pricing', stage: 'Pre-construction', color: '#16a34a' },
  { plan: 'Outright Payment (Completed)', detail: 'Full payment at completion stage', stage: 'Completion', color: '#0b2d56' },
  { plan: '3 Months Plan', detail: '70% · 15% · 15%', stage: 'Finishing stage', color: '#D4A017' },
  { plan: '6 Months Plan', detail: '50% · 25% · 25%', stage: 'Super structure level', color: '#D4A017' },
  { plan: '12 Months Plan', detail: '30% · 30% · 30% · 10%', stage: 'Foundation level', color: '#D4A017' },
];

const faqs = [
  {
    q: 'How do I buy a unit?',
    a: 'The process is simple: (1) Fill and submit the application form, (2) Receive your offer letter, (3) Sign the sales agreement. Our sales team will guide you through every step.'
  },
  {
    q: 'What payment options are available?',
    a: 'We offer two main payment pathways: Mortgage financing through our partner banks, or Self-Finance through our flexible instalment plans ranging from outright payment to a 12-month plan.'
  },
  {
    q: 'What are the self-finance terms?',
    a: 'Total payment must be completed within 12 months. A 10% reservation fee is required to secure your unit. Payment plans vary from outright payment (special discount) to 12-month staggered plans depending on the construction stage at the time of purchase.'
  },
  {
    q: 'Where exactly is the Phoenix Enclave located?',
    a: 'The Phoenix Enclave is located at Community 20, Lashibi, off Spintex Road, Accra. It is a well-developed, serene, and secured locality with proximity to good schools, health facilities, shopping centres, and other places of interest.'
  },
  {
    q: 'What is included in the purchase price?',
    a: 'Each unit includes 4 ensuite bedrooms, 1 ensuite maid\'s room, fitted air conditioning, fitted indoor and outdoor kitchen, security fence, fitted wardrobes, and parking for 2 cars on a 230sqm built area.'
  },
];

export default function PhoenixEnclavePage() {
  const [bookOpen, setBookOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeImg, setActiveImg] = useState(0);

  return (
    <>
      <style>{`
        .pe-hero {
          position: relative;
          min-height: 92vh;
          display: flex;
          align-items: flex-end;
          overflow: hidden;
          background: #040e1d;
        }
        .pe-hero-bg {
          position: absolute; inset: 0;
          background-image: url('https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777111208/WhatsApp-Image-2025-08-18-at-14.16.35_e93040d9l_gwfnmu.jpg');
          background-size: cover; background-position: center;
          opacity: 0.55;
        }
        .pe-hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(4,14,29,0.98) 0%, rgba(4,14,29,0.55) 50%, rgba(4,14,29,0.2) 100%);
        }
        .pe-hero-content {
          position: relative; z-index: 2;
          max-width: 1200px; margin: 0 auto;
          padding: 0 28px 80px;
          width: 100%;
        }
        .pe-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(255,193,7,0.12);
          border: 1px solid rgba(255,193,7,0.35);
          color: #FFC107; font-size: 11px; font-weight: 800;
          letter-spacing: 2px; text-transform: uppercase;
          padding: 6px 16px; border-radius: 20px;
          margin-bottom: 18px;
        }
        .pe-badge-dot { width: 7px; height: 7px; border-radius: 50%; background: #FFC107; animation: pe-blink 1.5s ease-in-out infinite; }
        @keyframes pe-blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
        .pe-hero h1 {
          font-family: 'Oswald', sans-serif;
          font-size: clamp(38px, 6vw, 80px);
          font-weight: 700; color: #fff; line-height: 1.0;
          margin: 0 0 12px;
        }
        .pe-hero h1 em { font-style: normal; color: #FFC107; }
        .pe-hero-sub { font-size: clamp(15px,2vw,18px); color: rgba(255,255,255,0.68); max-width: 560px; line-height: 1.7; margin-bottom: 32px; }
        .pe-hero-stats {
          display: flex; gap: 20px; flex-wrap: wrap; margin-bottom: 36px;
        }
        .pe-stat {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          backdrop-filter: blur(10px);
          border-radius: 14px; padding: 16px 20px;
          min-width: 110px; text-align: center;
        }
        .pe-stat-val { font-family:'Oswald',sans-serif; font-size: 22px; font-weight:700; color:#FFC107; line-height:1; }
        .pe-stat-label { font-size: 10px; color: rgba(255,255,255,0.5); text-transform:uppercase; letter-spacing:0.8px; margin-top:5px; }
        .pe-hero-actions { display:flex; gap:12px; flex-wrap:wrap; }

        /* Gallery */
        .pe-gallery { position:relative; }
        .pe-gallery-main { width:100%; height:480px; object-fit:cover; border-radius:20px; display:block; transition:opacity 0.3s; }
        .pe-thumbs { display:grid; grid-template-columns:repeat(4,1fr); gap:10px; margin-top:12px; }
        .pe-thumb { height:90px; object-fit:cover; border-radius:12px; cursor:pointer; transition:all 0.2s; opacity:0.6; border:2px solid transparent; }
        .pe-thumb.active { opacity:1; border-color:#FFC107; }
        .pe-thumb:hover { opacity:0.9; }

        /* Spec grid */
        .pe-specs { display:grid; grid-template-columns:repeat(2,1fr); gap:14px; }
        .pe-spec {
          background: #f6f8fd; border:1px solid #dce8f7;
          border-radius:14px; padding:16px 18px;
          display:flex; align-items:center; gap:12px;
        }
        .pe-spec-icon { font-size:22px; flex-shrink:0; }
        .pe-spec-label { font-size:11px; color:#5a7186; text-transform:uppercase; letter-spacing:0.7px; font-weight:600; }
        .pe-spec-val { font-family:'Oswald',sans-serif; font-size:16px; font-weight:700; color:#071628; margin-top:2px; }

        /* Amenities */
        .pe-amenities { display:grid; grid-template-columns:repeat(2,1fr); gap:12px; }
        .pe-amenity {
          display:flex; align-items:center; gap:12px;
          background:#fff; border:1px solid #dce8f7;
          border-radius:12px; padding:14px 16px;
          transition:all 0.2s;
        }
        .pe-amenity:hover { border-color:#FFC107; background:#FFFBEB; }
        .pe-amenity-icon { font-size:20px; flex-shrink:0; }
        .pe-amenity-text { font-size:13.5px; color:#071628; font-weight:500; }

        /* Payment plans */
        .pe-plans { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; }
        .pe-plan {
          background:#fff; border:1.5px solid #dce8f7;
          border-radius:16px; padding:22px 18px;
          transition:all 0.25s;
        }
        .pe-plan:hover { border-color:#FFC107; box-shadow:0 8px 28px rgba(255,193,7,0.15); transform:translateY(-4px); }
        .pe-plan-name { font-family:'Oswald',sans-serif; font-size:16px; font-weight:700; color:#071628; margin-bottom:6px; }
        .pe-plan-detail { font-size:18px; font-weight:800; color:var(--c); margin-bottom:6px; font-family:'Oswald',sans-serif; }
        .pe-plan-stage { font-size:11px; color:#5a7186; text-transform:uppercase; letter-spacing:0.8px; font-weight:600; }

        /* FAQ */
        .pe-faq { display:flex; flex-direction:column; gap:10px; }
        .pe-faq-item { background:#fff; border:1.5px solid #dce8f7; border-radius:14px; overflow:hidden; transition:border-color 0.2s; }
        .pe-faq-item.open { border-color:#FFC107; }
        .pe-faq-q {
          padding:18px 22px; display:flex; align-items:center; justify-content:space-between;
          cursor:pointer; font-weight:700; font-size:15px; color:#071628;
          user-select:none;
        }
        .pe-faq-icon { font-size:18px; color:#D4A017; flex-shrink:0; margin-left:12px; transition:transform 0.3s; }
        .pe-faq-item.open .pe-faq-icon { transform:rotate(45deg); }
        .pe-faq-a { padding:0 22px 18px; font-size:14px; color:#5a7186; line-height:1.8; }

        /* CTA strip */
        .pe-cta {
          background:linear-gradient(135deg,#040e1d 0%,#0b2d56 55%,#1261c0 100%);
          padding:72px 0; position:relative; overflow:hidden;
        }
        .pe-cta::before { content:''; position:absolute; inset:0; background-image:linear-gradient(rgba(0,180,216,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,180,216,0.04) 1px,transparent 1px); background-size:60px 60px; }
        .pe-cta::after { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:linear-gradient(90deg,#FFC107,#00b4d8,#FFC107); }

        /* Section spacing */
        .pe-section { padding:80px 0; }
        .pe-section.alt { background:#f6f8fd; }
        .pe-section.dark { background:var(--navy); }
        .pe-two-col { display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:start; }
        .pe-sticky { position:sticky; top:100px; }

        /* Mobile */
        @media(max-width:900px) {
          .pe-two-col { grid-template-columns:1fr; gap:36px; }
          .pe-sticky { position:static; }
          .pe-plans { grid-template-columns:1fr 1fr; }
          .pe-gallery-main { height:300px; }
        }
        @media(max-width:600px) {
          .pe-hero { min-height:80vh; }
          .pe-hero-content { padding-bottom:52px; }
          .pe-hero-stats { gap:12px; }
          .pe-stat { padding:12px 14px; min-width:90px; }
          .pe-stat-val { font-size:18px; }
          .pe-specs { grid-template-columns:1fr; }
          .pe-amenities { grid-template-columns:1fr; }
          .pe-plans { grid-template-columns:1fr; }
          .pe-thumbs { grid-template-columns:repeat(2,1fr); }
          .pe-gallery-main { height:240px; }
          .pe-section { padding:52px 0; }
        }
      `}</style>

      <ScrollReveal />
      <Topbar />
      <Navbar onBookClick={() => setBookOpen(true)} />
      <BookingModal isOpen={bookOpen} onClose={() => setBookOpen(false)} />

      {/* ── HERO ── */}
      <section className="pe-hero">
        <div className="pe-hero-bg" />
        <div className="pe-hero-overlay" />
        <div className="pe-hero-content">
          <div className="pe-badge">
            <span className="pe-badge-dot" />
            Now Selling — Phase I
          </div>
          <h1>The <em>Phoenix</em><br />Enclave</h1>
          <p className="pe-hero-sub">
            A mini gated community strategically developed in a serene and secured locality — Community 20, Lashibi, off Spintex Road, Accra.
          </p>
          <div className="pe-hero-stats">
            {[
              { val: '$250K', label: 'From' },
              { val: '230m²', label: 'Built Area' },
              { val: '4.5', label: 'Bedrooms' },
              { val: '3', label: 'Units' },
            ].map((s, i) => (
              <div key={i} className="pe-stat">
                <div className="pe-stat-val">{s.val}</div>
                <div className="pe-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="pe-hero-actions">
            <button onClick={() => setBookOpen(true)} className="btn btn-primary" style={{ fontSize: 15, padding: '14px 28px' }}>
              Book A Site Visit →
            </button>
            <a href="tel:0244783099" className="btn btn-outline-white" style={{ fontSize: 15, padding: '14px 28px' }}>
              Call: 024 478 3099
            </a>
          </div>
        </div>
      </section>

      {/* ── VIDEO TOUR ── */}
      <section className="pe-section" style={{ background: '#040e1d' }}>
        <div className="wrap">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 40 }}>
            <span className="tag" style={{ color: 'var(--cyan)', justifyContent: 'center' }}>Property Tour</span>
            <h2 className="section-title" style={{ color: '#fff' }}>Watch The <em>Site Video</em></h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 15, marginTop: 8 }}>Walk through the Phoenix Enclave — filmed on-site.</p>
          </div>
          <div className="reveal" style={{ borderRadius: 20, overflow: 'hidden', border: '2px solid rgba(255,193,7,0.25)', boxShadow: '0 24px 60px rgba(0,0,0,0.5)' }}>
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
              <iframe
                src="https://www.youtube.com/embed/56ZbiZGh0SM?si=EjwaDtu3YTE4AUGU&autoplay=1&mute=1"
                title="The Phoenix Enclave Tour"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0, display: 'block' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT + GALLERY ── */}
      <section className="pe-section">
        <div className="wrap">
          <div className="pe-two-col">
            {/* Gallery */}
            <div className="pe-gallery reveal-left">
              <img src={galleryImages[activeImg].src} alt={galleryImages[activeImg].alt} className="pe-gallery-main" />
              <div className="pe-thumbs">
                {galleryImages.map((img, i) => (
                  <img key={i} src={img.src} alt={img.alt} className={`pe-thumb${activeImg === i ? ' active' : ''}`} onClick={() => setActiveImg(i)} />
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="reveal-right">
              <span className="tag">About The Development</span>
              <h2 className="section-title">Phoenix <em>Enclave</em></h2>
              <p className="section-sub" style={{ marginBottom: 24 }}>
                The Phoenix Enclave is a mini gated community strategically located at Community 20, Lashibi off Spintex Road. It consists of <strong>3 units of 4.5 bedroom townhomes</strong> uniquely crafted for modern and comfortable lifestyle.
              </p>
              <p style={{ fontSize: 14.5, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 28 }}>
                Community 20 is a well-developed, serene and secured locality with proximity to good schools, health facilities, shopping centres and other places of interest. Each house features a 4-bedroom layout plus 1 maid&apos;s room — all ensuite — with ample car parking for 2 cars.
              </p>

              {/* Spec grid */}
              <div className="pe-specs">
                {[
                  { icon: '📍', label: 'Location', val: 'Comm. 20, Lashibi' },
                  { icon: '🏠', label: 'Type', val: 'Townhome' },
                  { icon: '📐', label: 'Built Area', val: '230 sqm' },
                  { icon: '🛏️', label: 'Bedrooms', val: '4.5' },
                  { icon: '🚿', label: 'Bathrooms', val: '5.5' },
                  { icon: '💰', label: 'Starting Price', val: 'From $250,000' },
                  { icon: '🔨', label: 'Status', val: 'Ongoing' },
                  { icon: '🏘️', label: 'Total Units', val: '3 Units' },
                ].map((s, i) => (
                  <div key={i} className="pe-spec">
                    <span className="pe-spec-icon">{s.icon}</span>
                    <div>
                      <div className="pe-spec-label">{s.label}</div>
                      <div className="pe-spec-val">{s.val}</div>
                    </div>
                  </div>
                ))}
              </div>

              <button onClick={() => setBookOpen(true)} className="btn btn-primary" style={{ marginTop: 28, width: '100%', justifyContent: 'center' }}>
                Enquire Now →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── AMENITIES ── */}
      <section className="pe-section alt">
        <div className="wrap">
          <div style={{ textAlign: 'center', marginBottom: 48 }} className="reveal">
            <span className="tag" style={{ justifyContent: 'center' }}>Inclusions</span>
            <h2 className="section-title">Premium <em>Amenities</em></h2>
            <p className="section-sub" style={{ textAlign: 'center', margin: '12px auto 0' }}>
              Every unit comes fully specified — no hidden extras.
            </p>
          </div>
          <div className="pe-amenities stagger">
            {amenities.map((a, i) => (
              <div key={i} className="pe-amenity">
                <span className="pe-amenity-icon">{a.icon}</span>
                <span className="pe-amenity-text">{a.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT WE OFFER ── */}
      <section className="pe-section">
        <div className="wrap">
          <div style={{ textAlign: 'center', marginBottom: 48 }} className="reveal">
            <span className="tag" style={{ justifyContent: 'center' }}>Real Estate Services</span>
            <h2 className="section-title">What We <em>Offer</em></h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }} className="stagger">
            {[
              { icon: '🏗️', title: 'Property Development', sub: 'Residential & Commercial', desc: 'From gated communities to commercial spaces — we develop premium real estate across Accra.' },
              { icon: '🏢', title: 'Property Management', sub: 'Full-Service Management', desc: 'We handle day-to-day management of residential and commercial properties on your behalf.' },
              { icon: '🏡', title: 'Furnished Apartments', sub: 'Short & Long-Term Rentals', desc: "Christie's Homestay offers premium furnished apartments for visitors and residents on flexible terms." },
              { icon: '🔑', title: 'Property Sales', sub: 'Existing & New Developments', desc: 'Buy or invest in off-plan and completed properties — we guide you through every step of the transaction.' },
            ].map((s, i) => (
              <div key={i} style={{ background: '#fff', border: '1.5px solid #dce8f7', borderRadius: 20, padding: '28px 22px', transition: 'all 0.28s', boxShadow: '0 4px 20px rgba(7,22,40,0.06)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#FFC107'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(255,193,7,0.15)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#dce8f7'; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(7,22,40,0.06)'; (e.currentTarget as HTMLElement).style.transform = ''; }}
              >
                <div style={{ fontSize: 36, marginBottom: 14 }}>{s.icon}</div>
                <h3 style={{ fontFamily: "'Oswald',sans-serif", fontSize: 19, fontWeight: 700, color: '#071628', marginBottom: 4 }}>{s.title}</h3>
                <div style={{ fontSize: 11, color: '#D4A017', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 10 }}>{s.sub}</div>
                <p style={{ fontSize: 13.5, color: '#5a7186', lineHeight: 1.75 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PAYMENT PLANS ── */}
      <section className="pe-section alt">
        <div className="wrap">
          <div style={{ textAlign: 'center', marginBottom: 48 }} className="reveal">
            <span className="tag" style={{ justifyContent: 'center' }}>Flexible Finance</span>
            <h2 className="section-title">Payment <em>Plans</em></h2>
            <p className="section-sub" style={{ textAlign: 'center', margin: '12px auto 0' }}>
              Reservation fee of 10% secures your unit. Total payment within 12 months.
            </p>
          </div>
          <div className="pe-plans stagger">
            {paymentPlans.map((p, i) => (
              <div key={i} className="pe-plan" style={{ '--c': p.color } as React.CSSProperties}>
                <div className="pe-plan-name">{p.plan}</div>
                <div className="pe-plan-detail">{p.detail}</div>
                <div className="pe-plan-stage">{p.stage}</div>
                <button onClick={() => setBookOpen(true)} style={{ marginTop: 16, width: '100%', padding: '10px', background: '#071628', color: '#fff', border: 'none', borderRadius: 10, cursor: 'pointer', fontSize: 13, fontWeight: 700, fontFamily: "'Outfit',sans-serif", transition: 'background 0.2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#0b2d56'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#071628'; }}
                >
                  Choose This Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="pe-section">
        <div className="wrap" style={{ maxWidth: 860 }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }} className="reveal">
            <span className="tag" style={{ justifyContent: 'center' }}>Got Questions?</span>
            <h2 className="section-title">Frequently Asked <em>Questions</em></h2>
          </div>
          <div className="pe-faq reveal">
            {faqs.map((faq, i) => (
              <div key={i} className={`pe-faq-item${activeFaq === i ? ' open' : ''}`}>
                <div className="pe-faq-q" onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
                  <span>{faq.q}</span>
                  <span className="pe-faq-icon">+</span>
                </div>
                {activeFaq === i && <div className="pe-faq-a">{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAP ── */}
      <section className="pe-section alt">
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 52, alignItems: 'center' }} className="reveal">
            <div>
              <span className="tag">Find Us</span>
              <h2 className="section-title">Strategic <em>Location</em></h2>
              <p className="section-sub" style={{ marginBottom: 24 }}>
                The Phoenix Enclave sits in Community 20, Lashibi — one of Accra&apos;s most serene and well-developed residential corridors, just off the main Spintex Road.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  { icon: '📍', label: 'Address', val: 'Community 20, Lashibi, off Spintex Road, Accra' },
                  { icon: '🏥', label: 'Nearby', val: 'Schools, Hospitals, Shopping Centres, Banks' },
                  { icon: '📞', label: 'Enquiries', val: '024 478 3099 / 020 881 2164' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', background: '#fff', border: '1px solid #dce8f7', borderRadius: 12, padding: '14px 18px' }}>
                    <span style={{ fontSize: 20, flexShrink: 0 }}>{item.icon}</span>
                    <div>
                      <div style={{ fontSize: 11, color: '#5a7186', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.7px' }}>{item.label}</div>
                      <div style={{ fontSize: 14, color: '#071628', fontWeight: 600, marginTop: 3 }}>{item.val}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
                <button onClick={() => setBookOpen(true)} className="btn btn-primary">Book Site Visit →</button>
                <a href="https://api.whatsapp.com/send?phone=233244783099" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}>
                  <span>💬</span> WhatsApp Us
                </a>
              </div>
            </div>
            <div style={{ borderRadius: 20, overflow: 'hidden', boxShadow: '0 12px 40px rgba(7,22,40,0.14)', border: '2px solid #dce8f7', height: 380 }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d63528.36050131504!2d-0.076514!3d5.637253!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf8402e54ac0bd%3A0x37c47d7434f4203c!2sSMIC360%20LIMITED!5e0!3m2!1sen!2sus!4v1777199771968!5m2!1sen!2sus"
                width="100%" height="100%" style={{ border: 0, display: 'block' }} allowFullScreen loading="lazy" title="Phoenix Enclave Location"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <div className="pe-cta">
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 28px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <span className="tag" style={{ color: 'var(--cyan)', justifyContent: 'center' }}>Limited Units</span>
          <h2 style={{ fontFamily: "'Oswald',sans-serif", fontSize: 'clamp(28px,5vw,52px)', fontWeight: 700, color: '#fff', lineHeight: 1.1, margin: '14px 0' }}>
            Secure Your Unit <em style={{ fontStyle: 'normal', color: '#FFC107' }}>Today</em>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 16, lineHeight: 1.8, marginBottom: 36, maxWidth: 520, margin: '0 auto 36px' }}>
            Only 3 units available. Reservation secures your place with just 10% down. Our sales team is available 7 days a week.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => setBookOpen(true)} className="btn btn-primary" style={{ fontSize: 15, padding: '14px 32px' }}>
              Book A Consultation →
            </button>
            <a href="https://api.whatsapp.com/send?phone=233244783099" target="_blank" rel="noopener noreferrer" className="btn btn-outline-white" style={{ fontSize: 15, padding: '14px 32px', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              💬 WhatsApp Sales Team
            </a>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12, marginTop: 20 }}>
            Or call: <a href="tel:0244783099" style={{ color: 'var(--cyan)', fontWeight: 700 }}>024 478 3099</a> · <a href="tel:0208812164" style={{ color: 'var(--cyan)', fontWeight: 700 }}>020 881 2164</a>
          </p>
        </div>
      </div>

      <Footer onBookClick={() => setBookOpen(true)} />
      <ChatPanel />
    </>
  );
}
