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
            Tailored Solutions for <em>Modern Businesses</em>
          </h1>
          <p>
            We combine strategic marketing brilliance, real estate excellence, and precision
            procurement to engineer your growth in the Ghanaian market.
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
                Our creative team crafts 360° branding strategies that don&apos;t just look good —
                they perform. We bridge the gap between your brand and your audience through
                data-driven campaigns and unforgettable creative execution.
              </p>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '10px',
                  marginTop: '24px',
                }}
              >
                {[
                  'Brand Identity Design',
                  'Digital Marketing & SEO',
                  'Media Buying & Planning',
                  'Content Production',
                  'Social Media Management',
                  'Market Entry Strategy',
                ]?.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '14px',
                      fontWeight: 500,
                      color: 'var(--text)',
                    }}
                  >
                    <span style={{ color: '#16a34a', fontWeight: 700 }}>✔</span> {item}
                  </div>
                ))}
              </div>
              <button
                onClick={() => setBookOpen(true)}
                className="btn btn-primary"
                style={{ marginTop: '28px' }}
              >
                Start a Campaign →
              </button>
            </div>
            <div
              style={{ borderRadius: 'var(--r-lg)', overflow: 'hidden', boxShadow: 'var(--sh-md)' }}
            >
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
            <div
              className="img-order-first"
              style={{ borderRadius: 'var(--r-lg)', overflow: 'hidden', boxShadow: 'var(--sh-md)' }}
            >
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
                and serene gated communities. Our focus is on contemporary architecture and premium
                finishes that offer high ROI for investors and comfort for homeowners.
              </p>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '10px',
                  marginTop: '24px',
                }}
              >
                {[
                  'Gated Community Development',
                  'Property Management',
                  'Architectural Design',
                  'Construction Oversight',
                  'Investment Advisory',
                  'Land Acquisition',
                ]?.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '14px',
                      fontWeight: 500,
                      color: 'var(--text)',
                    }}
                  >
                    <span style={{ color: '#16a34a', fontWeight: 700 }}>✔</span> {item}
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '28px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link href="/the-phoenix-enclave" className="btn btn-primary">
                  🏡 The Phoenix Enclave →
                </Link>
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
                Procurement &amp; <em>Supply Chain</em>
              </h2>
              <p className="section-sub">
                We specialize in tailor-made procurement services designed to maximize value for
                money. From industrial equipment to office supplies, we ensure every item is sourced
                ethically, delivered on time, and meets the highest specifications.
              </p>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '10px',
                  marginTop: '24px',
                }}
              >
                {[
                  'Vendor Management',
                  'Cost Optimization',
                  'Quality Assurance',
                  'Logistics Coordination',
                  'Industrial Sourcing',
                  'Contract Negotiation',
                ]?.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '14px',
                      fontWeight: 500,
                      color: 'var(--text)',
                    }}
                  >
                    <span style={{ color: '#16a34a', fontWeight: 700 }}>✔</span> {item}
                  </div>
                ))}
              </div>
              <button
                onClick={() => setBookOpen(true)}
                className="btn btn-primary"
                style={{ marginTop: '28px' }}
              >
                Request a Quote →
              </button>
            </div>
            <div
              style={{ borderRadius: 'var(--r-lg)', overflow: 'hidden', boxShadow: 'var(--sh-md)' }}
            >
              <img
                src="https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777106950/ec234641a21a9e03c50b708351c53603_vl5piv.jpg"
                alt="Procurement Solutions"
                style={{ width: '100%', height: '420px', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </div>
        </div>
      </section>
      {/* CTA */}
      <div
        style={{
          background: 'linear-gradient(135deg,#071628 0%,#0b2d56 60%,#1361c4 100%)',
          padding: '80px 0',
        }}
      >
        <div
          style={{ maxWidth: '800px', margin: '0 auto', padding: '0 28px', textAlign: 'center' }}
        >
          <h2
            style={{
              fontFamily: 'Oswald,sans-serif',
              fontSize: 'clamp(28px,4vw,48px)',
              fontWeight: 700,
              color: '#fff',
              lineHeight: 1.08,
              marginBottom: '16px',
            }}
          >
            Ready to{' '}
            <em style={{ fontStyle: 'normal', color: 'var(--cyan)' }}>Scale Your Business?</em>
          </h2>
          <p
            style={{
              color: 'rgba(255,255,255,.62)',
              fontSize: '16px',
              marginBottom: '32px',
              lineHeight: 1.7,
            }}
          >
            Whether you need a national marketing campaign, a secure home, or precision procurement
            — our team is ready to deliver results.
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => setBookOpen(true)} className="btn btn-primary">
              Book A Consultation
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
