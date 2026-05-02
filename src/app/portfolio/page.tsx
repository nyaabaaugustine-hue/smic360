'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Topbar from '@/components/Topbar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';
import ChatPanel from '@/components/ChatPanel';
import ScrollReveal from '@/components/ScrollReveal';

const PAGE_TITLE = 'Portfolio | SMIC360 Limited';
const PAGE_DESC = 'Explore SMIC360’s portfolio of completed projects across marketing, real estate development, and procurement in Ghana.';

const allProjects = [
  {
    img: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777199309/VCC_dl6ehf.jpg',
    alt: 'Rebranding',
    category: 'Marketing',
    title: 'National Brand Relaunch',
    desc: 'Full 360° rebranding for a leading consumer goods company involving identity, packaging, and digital launch.',
    meta: [
      { label: 'Industry', val: 'Consumer Goods' },
      { label: 'Result', val: '+38% Recall' },
    ],
  },
  {
    img: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777196963/1_j6fe4u.jpg',
    alt: 'Phoenix Enclave',
    category: 'Real Estate',
    title: 'Phoenix Enclave Phase 1',
    desc: 'Successful delivery of our flagship gated community featuring 24 premium residential units and full infrastructure.',
    meta: [
      { label: 'Units', val: '24 Homes' },
      { label: 'Status', val: 'Completed' },
    ],
  },
  {
    img: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1776422246/abz_3_hp78qi.jpg',
    alt: 'GNPC',
    category: 'Procurement',
    title: 'GNPC Industrial Supply',
    desc: 'End-to-end procurement of technical equipment and consumables for a major state enterprise — on time, on spec.',
    meta: [
      { label: 'Value', val: '$2.4M GHS' },
      { label: 'Timeline', val: '6 Weeks' },
    ],
  },
  {
    img: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777114247/kkkl_nhdczf.avif',
    alt: 'Media Campaign',
    category: 'Marketing',
    title: 'Media Buying Campaign',
    desc: 'Multi-channel media buying and placement across TV, digital, and outdoor for a major financial institution.',
    meta: [
      { label: 'Reach', val: '2.1M Impressions' },
      { label: 'Duration', val: '3 Months' },
    ],
  },
  {
    img: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777111208/WhatsApp-Image-2025-08-18-at-14.16.35_e93040d9l_gwfnmu.jpg',
    alt: 'Commercial Development',
    category: 'Real Estate',
    title: 'Commercial Office Fit-Out',
    desc: 'Design coordination and procurement for a 3-storey commercial office development in the Spintex corridor.',
    meta: [
      { label: 'Floors', val: '3 Levels' },
      { label: 'Status', val: 'Delivered' },
    ],
  },
  {
    img: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777106950/ec234641a21a9e03c50b708351c53603_vl5piv.jpg',
    alt: 'Moonlight Shipping',
    category: 'Procurement',
    title: 'Moonlight Shipping Supply',
    desc: "Strategic procurement of equipment and office infrastructure for Moonlight Shipping's Accra expansion.",
    meta: [
      { label: 'Service', val: 'Integrated' },
      { label: 'Status', val: 'Delivered' },
    ],
  },
];

const categories = ['All Projects', 'Marketing', 'Real Estate', 'Procurement'];

export default function PortfolioPage() {
  const [bookOpen, setBookOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All Projects');

  useEffect(() => {
    document.title = PAGE_TITLE;
    document.querySelector('meta[name="description"]')?.setAttribute('content', PAGE_DESC);
  }, []);

  const filtered =
    activeFilter === 'All Projects'
      ? allProjects
      : allProjects?.filter((p) => p?.category === activeFilter);

  return (
    <>
      <ScrollReveal />
      <Topbar />
      <Navbar onBookClick={() => setBookOpen(true)} />
      <BookingModal isOpen={bookOpen} onClose={() => setBookOpen(false)} />
      {/* Page Hero */}
      <div className="page-hero">
        <div className="page-hero-inner">
          <div className="page-hero-tag">Our Work</div>
          <h1>
            Proven <em>Excellence</em>
          </h1>
          <p>
            A showcase of our integrated solutions across marketing, real estate, and procurement.
          </p>
        </div>
      </div>
      {/* Portfolio Grid */}
      <section style={{ padding: '90px 0', background: 'var(--white)' }}>
        <div className="wrap">
          {/* Filter Buttons */}
          <div
            style={{
              display: 'flex',
              gap: '12px',
              flexWrap: 'wrap',
              marginBottom: '44px',
              justifyContent: 'center',
            }}
            className="reveal"
          >
            {categories?.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={activeFilter === cat ? 'btn btn-primary' : 'btn btn-outline'}
                style={{ fontSize: '13px', padding: '10px 20px' }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="proj-grid stagger">
            {filtered?.map((proj, i) => (
              <div key={i} className="proj-card">
                <div className="proj-img">
                  <img src={proj?.img} alt={proj?.alt} />
                  <div className="proj-badge">{proj?.category}</div>
                </div>
                <div className="proj-body">
                  <h3>{proj?.title}</h3>
                  <p>{proj?.desc}</p>
                  <div className="proj-meta">
                    {proj?.meta?.map((m, j) => (
                      <div key={j} className="proj-meta-item">
                        <strong>{m?.label}</strong>
                        {m?.val}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
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
            Have a Project in <em style={{ fontStyle: 'normal', color: 'var(--cyan)' }}>Mind?</em>
          </h2>
          <p
            style={{
              color: 'rgba(255,255,255,.62)',
              fontSize: '16px',
              marginBottom: '32px',
              lineHeight: 1.7,
            }}
          >
            Let&apos;s turn your vision into results. Our team is ready to build, brand, and deliver
            for you.
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
