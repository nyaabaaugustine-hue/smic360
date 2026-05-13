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
            Our Core Solutions: A Fully Integrated 360° <em>Approach</em>
          </h1>
          <p>
            At SMIC360, we drive growth by aligning strategy with execution across three critical
            business pillars. We eliminate fragmentation by providing seamless, results-driven
            experiences across the entire value chain.
          </p>
          <hr style={{ margin: '20px 0', border: 'none', borderTop: '1px solid var(--border)' }} />
        </div>
      </div>

      {/* Marketing Section */}
      <section id="marketing" style={{ padding: '90px 0', background: 'var(--white)' }}>
        <div className="wrap">
          <div className="solutions-section-grid reveal">
            <div>
              <span className="tag">I. Advertising & Marketing</span>
              <h2 className="section-title">
                Advertising &amp; <em>Marketing</em>
              </h2>
              <p style={{ fontSize: '15px', fontWeight: 600, color: 'var(--navy)', marginTop: '10px', lineHeight: 1.4 }}>
                Laying the Foundation for Brand Power &amp; Market Dominance
              </p>
              <p className="section-sub" style={{ marginTop: '8px' }}>
                We provide a comprehensive ecosystem of creative and strategic services designed to
                build powerful, memorable brands that achieve sustainable growth.
              </p>

              <div style={{ marginTop: '24px' }}>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 500, color: 'var(--text)' }}>
                    <strong style={{ color: 'var(--navy)' }}>Strategy &amp; Advisory:</strong> We define your path to success through brand positioning, market entry strategies, and data-informed business advisory.
                  </li>
                  <li style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 500, color: 'var(--text)' }}>
                    <strong style={{ color: 'var(--navy)' }}>Branding &amp; Creative:</strong> Our team crafts compelling corporate identities and visual communication designs that resonate across digital and traditional platforms.
                  </li>
                  <li style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 500, color: 'var(--text)' }}>
                    <strong style={{ color: 'var(--navy)' }}>Campaign Execution:</strong> We bring ideas to life through integrated marketing, leveraging social media, search, and high-impact experiential activations.
                  </li>
                  <li style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 500, color: 'var(--text)' }}>
                    <strong style={{ color: 'var(--navy)' }}>Media &amp; Production:</strong> We maximize your reach through expert media buying, out-of-home (OOH) execution, and high-quality print management.
                  </li>
                </ul>
                <hr
                  style={{ margin: '20px 0', border: 'none', borderTop: '1px solid var(--border)' }}
                />
              </div>
              <button
                onClick={() => setBookOpen(true)}
                className="btn btn-primary"
                style={{ marginTop: '28px' }}
              >
                Book A Consultation →
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
              <span className="tag">II. Real Estate Development</span>
              <h2 className="section-title">
                Real Estate <em>Development</em>
              </h2>
              <p style={{ fontSize: '15px', fontWeight: 600, color: 'var(--navy)', marginTop: '10px', lineHeight: 1.4 }}>
                Transforming Potential into Premium Assets
              </p>
              <p className="section-sub" style={{ marginTop: '8px' }}>
                Our real estate division focuses on the full lifecycle of property development and
                asset management, ensuring architectural excellence and maximum investment value.
              </p>
              <div style={{ marginTop: '24px' }}>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 500, color: 'var(--text)', display: 'flex', gap: '8px' }}>
                    <span style={{ color: '#16a34a', fontWeight: 700, flexShrink: 0 }}>✔</span>
                    <span><strong style={{ color: 'var(--navy)' }}>Property Development &amp; Strategic Sales:</strong> We manage everything from land acquisition and project feasibility to the construction of modern residential and commercial complexes.</span>
                  </li>
                  <li style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 500, color: 'var(--text)', display: 'flex', gap: '8px' }}>
                    <span style={{ color: '#16a34a', fontWeight: 700, flexShrink: 0 }}>✔</span>
                    <span><strong style={{ color: 'var(--navy)' }}>Property Leasing &amp; Asset Management:</strong> We specialize in the curation of premium rental portfolios, including furnished apartments and executive stays.</span>
                  </li>
                  <li style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 500, color: 'var(--text)', display: 'flex', gap: '8px' }}>
                    <span style={{ color: '#16a34a', fontWeight: 700, flexShrink: 0 }}>✔</span>
                    <span><strong style={{ color: 'var(--navy)' }}>Operational Excellence:</strong> Our services include rigorous tenant screening, lease administration, and proactive maintenance to preserve long-term asset value.</span>
                  </li>
                  <li style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 500, color: 'var(--text)', display: 'flex', gap: '8px' }}>
                    <span style={{ color: '#16a34a', fontWeight: 700, flexShrink: 0 }}>✔</span>
                    <span><strong style={{ color: 'var(--navy)' }}>Hospitality Services:</strong> We provide concierge-level support for short-term rentals and guest services.</span>
                  </li>
                </ul>
                <hr style={{ margin: '20px 0', border: 'none', borderTop: '1px solid var(--border)' }} />
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
              <span className="tag">III. Procurement & Supply Solutions</span>
              <h2 className="section-title">
                Procurement &amp; <em>Supply Solutions</em>
              </h2>
              <p style={{ fontSize: '15px', fontWeight: 600, color: 'var(--navy)', marginTop: '10px', lineHeight: 1.4 }}>
                Streamlining Global Sourcing with Precision and Reliability
              </p>
              <p className="section-sub" style={{ marginTop: '8px' }}>
                We act as your dedicated sourcing partner, simplifying complex supply chains to
                deliver high-quality materials and equipment at competitive prices.
              </p>
              <div style={{ marginTop: '24px' }}>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 500, color: 'var(--text)' }}>
                    <strong style={{ color: 'var(--navy)' }}>Strategic Sourcing &amp; Cost Efficiency:</strong> Leverage our extensive network to secure the best suppliers and negotiate competitive pricing, reducing your operational costs.
                  </li>
                  <li style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 500, color: 'var(--text)' }}>
                    <strong style={{ color: 'var(--navy)' }}>Quality &amp; Reliability:</strong> We prioritize stringent quality assurance and coordinate complex logistics to ensure every item is delivered on time and to specification.
                  </li>
                  <li style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 500, color: 'var(--text)' }}>
                    <strong style={{ color: 'var(--navy)' }}>Diverse Sourcing Capabilities:</strong>
                    <ul style={{ listStyle: 'none', paddingLeft: '20px', marginTop: '8px' }}>
                      <li style={{ marginBottom: '6px', fontSize: '13px', color: 'var(--text)', display: 'flex', gap: '8px' }}>
                        <span style={{ color: 'var(--gold-d)', flexShrink: 0 }}>›</span>
                        <span><strong style={{ color: 'var(--navy)' }}>Industrial &amp; Commercial:</strong> Machinery, specialized tools, and safety equipment (PPE).</span>
                      </li>
                      <li style={{ marginBottom: '6px', fontSize: '13px', color: 'var(--text)', display: 'flex', gap: '8px' }}>
                        <span style={{ color: 'var(--gold-d)', flexShrink: 0 }}>›</span>
                        <span><strong style={{ color: 'var(--navy)' }}>Construction Materials:</strong> High-grade cement, steel, roofing, and electrical fittings.</span>
                      </li>
                      <li style={{ marginBottom: '6px', fontSize: '13px', color: 'var(--text)', display: 'flex', gap: '8px' }}>
                        <span style={{ color: 'var(--gold-d)', flexShrink: 0 }}>›</span>
                        <span><strong style={{ color: 'var(--navy)' }}>Bulk Commodities:</strong> Industrial and edible salt, and diverse raw materials for manufacturing.</span>
                      </li>
                      <li style={{ marginBottom: '6px', fontSize: '13px', color: 'var(--text)', display: 'flex', gap: '8px' }}>
                        <span style={{ color: 'var(--gold-d)', flexShrink: 0 }}>›</span>
                        <span><strong style={{ color: 'var(--navy)' }}>Household &amp; Specialized Items:</strong> Premium appliances, hard-to-find components, and custom-order products.</span>
                      </li>
                    </ul>
                  </li>
                </ul>
                <p
                  style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'var(--navy)',
                    marginTop: '20px',
                  }}
                >
                  Building Foundations. Branding Futures. Connecting Markets.
                </p>
                <hr
                  style={{ margin: '20px 0', border: 'none', borderTop: '1px solid var(--border)' }}
                />
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
                src="https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777655037/360sm_mqzf0p.png"
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
            Ready to Work With{' '}
            <em style={{ fontStyle: 'normal', color: 'var(--cyan)' }}>SMIC360?</em>
          </h2>
          <p
            style={{
              color: 'rgba(255,255,255,.62)',
              fontSize: '16px',
              marginBottom: '32px',
              lineHeight: 1.7,
            }}
          >
            Whether you need a national advertising campaign, real estate investment guidance, or a
            procurement solution — our team is ready to assess your needs and deliver results.
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
