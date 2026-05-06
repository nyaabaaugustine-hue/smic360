'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Topbar from '@/components/Topbar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';
import ChatPanel from '@/components/ChatPanel';
import ScrollReveal from '@/components/ScrollReveal';

export default function SolutionsPage() {
  const [bookOpen, setBookOpen] = useState(false);

  return (
    <>
      <ScrollReveal />
      <Topbar />
      <Navbar onBookClick={() => setBookOpen(true)} />
      <BookingModal isOpen={bookOpen} onClose={() => setBookOpen(false)} />

      {/* Page Hero */}
      <div className="page-hero">
        <div className="page-hero-inner">
          <div className="page-hero-tag">Our Expertise</div>
          <h1>
            Advertising, Branding &amp; <em>Marketing Solutions</em>
          </h1>
          <p>
            SMIC360 is a full service advertising and integrated marketing company offering comprehensive marketing communication support — from Media Buying and Corporate Branding to Multimedia Graphics, Print Management, Corporate Apparel and Procurement.
          </p>
        </div>
      </div>

      {/* Marketing Section */}
      <section id="marketing" style={{ padding: '90px 0', background: 'var(--white)' }}>
        <div className="wrap">
          <div className="solutions-section-grid reveal">
            <div>
              <span className="tag">01. Marketing</span>
              <h2 className="section-title">
                Advertising &amp; <em>Marketing Solutions</em>
              </h2>
              <p className="section-sub">
                We plan advertising that actually gets seen. Most brands are visible online, but not
                truly seen. We take care of the marketing and communication needs of clients —
                branding, strategic planning, budgeting, implementation of sales growth strategies,
                and general marketing advisory. It also includes PR interventions.
              </p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '24px' }}>
                {[
                  'Strategy & Advisory ',
                  'Branding & Creative',
                  'Campaign Execution ',
                  '4.	Media & Production',
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 500, color: 'var(--text)' }}>
                    <span style={{ color: '#16a34a', fontWeight: 700 }}>✔</span> {item}
                  </div>
                ))}
              </div>
              <button onClick={() => setBookOpen(true)} className="btn btn-primary" style={{ marginTop: '28px' }}>
                Book A Consultation →
              </button>
            </div>
            <div style={{ borderRadius: 'var(--r-lg)', overflow: 'hidden', boxShadow: 'var(--sh-md)' }}>
              <img
                src="https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777114247/kkkl_nhdczf.avif"
                alt="Marketing Solutions"
                style={{ width: '100%', height: '420px', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Real Estate Section */}
      <section id="realestate" style={{ padding: '90px 0', background: 'var(--off)' }}>
        <div className="wrap">
          <div className="solutions-section-grid reveal">
            <div className="img-order-first" style={{ borderRadius: 'var(--r-lg)', overflow: 'hidden', boxShadow: 'var(--sh-md)' }}>
              <img
                src="https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777111208/WhatsApp-Image-2025-08-18-at-14.16.35_e93040d9l_gwfnmu.jpg"
                alt="The Phoenix Enclave"
                style={{ width: '100%', height: '420px', objectFit: 'cover', display: 'block' }}
              />
            </div>
            <div>
              <span className="tag">02. Real Estate</span>
              <h2 className="section-title">
                Real Estate <em>Development</em>
              </h2>
              <p className="section-sub">
                Through our flagship development, The Phoenix Enclave, we provide modern, secured,
                and serene gated communities. A mini gated community strategically developed in a
                serene and secured locality — Community 20, Lashibi, off Spintex Road, Accra.
                Our focus is on contemporary architecture and premium finishes that offer high ROI
                for investors and comfort for homeowners.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '24px' }}>
                {[
                  'Gated Community Development',
                  'Property Management',
                  'Furnished Apartments (Christie\'s Homestay)',
                  'Construction Oversight',
                  'Investment Advisory',
                  'Property Sales',
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 500, color: 'var(--text)' }}>
                    <span style={{ color: '#16a34a', fontWeight: 700 }}>✔</span> {item}
                  </div>
                ))}
              </div>

              {/* Hospitality sub-section */}
              <div style={{ marginTop: '28px', background: '#fff', border: '1px solid var(--border)', borderLeft: '4px solid var(--gold)', borderRadius: '12px', padding: '20px 22px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <span style={{ fontSize: '20px' }}>🏨</span>
                  <span style={{ fontFamily: 'Oswald,sans-serif', fontSize: '16px', fontWeight: 700, color: 'var(--navy)', textTransform: 'uppercase', letterSpacing: '1px' }}>Hospitality</span>
                </div>
                <p style={{ fontSize: '13.5px', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '12px' }}>
                  SMIC360&apos;s hospitality arm offers premium short-stay and long-stay furnished accommodations in Accra — ideal for business travellers, diaspora returnees, and vacation guests.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <a
                    href="/christies-homestay"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--blue)', fontWeight: 700, fontSize: '14px', textDecoration: 'none', transition: 'color .2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold-d)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--blue)')}
                  >
                    <span style={{ fontSize: '16px' }}>🏡</span>
                    Christie&apos;s Homestay
                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--muted)' }}>— Furnished Apartment Rentals</span>
                  </a>
                  <a
                    href="/christies-homestay"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--blue)', fontWeight: 700, fontSize: '14px', textDecoration: 'none', transition: 'color .2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold-d)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--blue)')}
                  >
                    <span style={{ fontSize: '16px' }}>🌍</span>
                    Airbnb Short-Stay Rentals
                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--muted)' }}>— via Christie&apos;s Homestay</span>
                  </a>
                </div>
              </div>

              <div style={{ marginTop: '24px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <a href="/christies-homestay" className="btn btn-primary">
                  🏡 The Phoenix Enclave →
                </a>
                <button onClick={() => setBookOpen(true)} className="btn btn-outline">
                  Inquire About Properties
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Procurement Section */}
      <section id="procurement" style={{ padding: '90px 0', background: 'var(--white)' }}>
        <div className="wrap">
          <div className="solutions-section-grid reveal">
            <div>
              <span className="tag">03. Procurement</span>
              <h2 className="section-title">
                Procurement &amp; <em>Supply Services</em>
              </h2>
              <p className="section-sub">
                Tailor-made Procurement and supply services designed to give you value for money.
                We specialize in end-to-end sourcing of technical equipment, industrial consumables,
                office supplies, IT equipment, and corporate furniture. Our global vendor network
                with deep local expertise consistently delivers 15–22% cost savings for clients.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '24px' }}>
                {[
                  'Vendor Management',
                  'Cost Optimization',
                  'Quality Assurance',
                  'Logistics Coordination',
                  'Industrial Sourcing',
                  'Contract Negotiation',
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 500, color: 'var(--text)' }}>
                    <span style={{ color: '#16a34a', fontWeight: 700 }}>✔</span> {item}
                  </div>
                ))}
              </div>
              <button onClick={() => setBookOpen(true)} className="btn btn-primary" style={{ marginTop: '28px' }}>
                Request a Quote →
              </button>
            </div>
            <div style={{ borderRadius: 'var(--r-lg)', overflow: 'hidden', boxShadow: 'var(--sh-md)' }}>
              <img
                src="https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777655037/360sm_mqzf0p.png"
                alt="Procurement Solutions"
                style={{ width: '100%', height: '420px', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div style={{ background: 'linear-gradient(135deg,#071628 0%,#0b2d56 60%,#1361c4 100%)', padding: '80px 0' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 28px', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Oswald,sans-serif', fontSize: 'clamp(28px,4vw,48px)', fontWeight: 700, color: '#fff', lineHeight: 1.08, marginBottom: '16px' }}>
            Ready to Work With <em style={{ fontStyle: 'normal', color: 'var(--cyan)' }}>SMIC360?</em>
          </h2>
          <p style={{ color: 'rgba(255,255,255,.62)', fontSize: '16px', marginBottom: '32px', lineHeight: 1.7 }}>
            Whether you need a national advertising campaign, real estate investment guidance, or a procurement solution — our team is ready to assess your needs and deliver results.
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => setBookOpen(true)} className="btn btn-primary">
              Book A Free Consultation
            </button>
            <Link href="/contact" className="btn btn-outline-white">
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      <Footer onBookClick={() => setBookOpen(true)} />
      <ChatPanel />
    </>
  );
}
