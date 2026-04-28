'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Topbar from '@/components/Topbar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';
import ChatPanel from '@/components/ChatPanel';
import ScrollReveal from '@/components/ScrollReveal';

interface ServiceItem {
  icon: string;
  title: string;
  desc: string;
}

interface ProcessStep {
  num: string;
  title: string;
  desc: string;
}

export interface MarketingPageProps {
  badge: string;
  heroTitle: string;
  heroEm: string;
  heroDesc: string;
  heroImg: string;
  overview: string;
  services: ServiceItem[];
  process: ProcessStep[];
  ctaTitle: string;
  ctaDesc: string;
  relatedLinks: { href: string; label: string }[];
}

export default function MarketingSubPage({
  badge,
  heroTitle,
  heroEm,
  heroDesc,
  heroImg,
  overview,
  services,
  process,
  ctaTitle,
  ctaDesc,
  relatedLinks,
}: MarketingPageProps) {
  const [bookOpen, setBookOpen] = useState(false);

  return (
    <>
      <ScrollReveal />
      <Topbar />
      <Navbar onBookClick={() => setBookOpen(true)} />
      <BookingModal isOpen={bookOpen} onClose={() => setBookOpen(false)} />

      {/* Hero */}
      <div className="page-hero">
        <div className="page-hero-inner">
          <div className="page-hero-tag">{badge}</div>
          <h1>{heroTitle} <em>{heroEm}</em></h1>
          <p>{heroDesc}</p>
        </div>
      </div>

      {/* Overview */}
      <section style={{ padding: '90px 0', background: 'var(--white)' }}>
        <div className="wrap">
          <div className="solutions-section-grid reveal">
            <div>
              <span className="tag">What We Do</span>
              <h2 className="section-title">{heroTitle} <em>{heroEm}</em></h2>
              <p className="section-sub" style={{ maxWidth: 'none' }}>{overview}</p>
              <div style={{ marginTop: '28px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button onClick={() => setBookOpen(true)} className="btn btn-primary">Start A Project →</button>
                <Link href="/contact" className="btn btn-outline">Get A Quote</Link>
              </div>
            </div>
            <div style={{ borderRadius: 'var(--r-lg)', overflow: 'hidden', boxShadow: 'var(--sh-md)' }}>
              <img src={heroImg} alt={heroTitle} style={{ width: '100%', height: '400px', objectFit: 'cover', display: 'block' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Services Breakdown */}
      <section style={{ padding: '80px 0', background: 'var(--off)' }}>
        <div className="wrap">
          <div style={{ textAlign: 'center', marginBottom: '48px' }} className="reveal">
            <span className="tag" style={{ justifyContent: 'center' }}>What&apos;s Included</span>
            <h2 className="section-title">Our <em>{heroEm} Services</em></h2>
          </div>
          <div className="mkt-services-grid stagger">
            {services.map((svc, i) => (
              <div key={i} className="mkt-service-card">
                <div className="mkt-service-icon">{svc.icon}</div>
                <h3>{svc.title}</h3>
                <p>{svc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section style={{ padding: '80px 0', background: 'var(--white)' }}>
        <div className="wrap">
          <div style={{ textAlign: 'center', marginBottom: '48px' }} className="reveal">
            <span className="tag" style={{ justifyContent: 'center' }}>How We Work</span>
            <h2 className="section-title">Our <em>Process</em></h2>
          </div>
          <div className="mkt-process stagger">
            {process.map((step, i) => (
              <div key={i} className="mkt-step">
                <div className="mkt-step-num">{step.num}</div>
                <div className="mkt-step-body">
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
                </div>
                {i < process.length - 1 && <div className="mkt-step-arrow">→</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      {relatedLinks.length > 0 && (
        <section style={{ padding: '60px 0', background: 'var(--off)', borderTop: '1px solid var(--border)' }}>
          <div className="wrap">
            <div style={{ textAlign: 'center', marginBottom: '28px' }} className="reveal">
              <span className="tag" style={{ justifyContent: 'center' }}>Explore More</span>
              <h3 style={{ fontFamily: 'Oswald,sans-serif', fontSize: '24px', color: 'var(--navy)' }}>Related <em style={{ fontStyle: 'normal', color: 'var(--blue)' }}>Services</em></h3>
            </div>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }} className="reveal">
              {relatedLinks.map((link, i) => (
                <Link key={i} href={link.href} className="btn btn-outline" style={{ fontSize: '13px' }}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <div style={{ background: 'linear-gradient(135deg,#071628 0%,#0b2d56 60%,#1361c4 100%)', padding: '80px 0' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 28px', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Oswald,sans-serif', fontSize: 'clamp(28px,4vw,46px)', fontWeight: 700, color: '#fff', lineHeight: 1.08, marginBottom: '16px' }}>
            {ctaTitle}
          </h2>
          <p style={{ color: 'rgba(255,255,255,.62)', fontSize: '16px', marginBottom: '32px', lineHeight: 1.7 }}>{ctaDesc}</p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => setBookOpen(true)} className="btn btn-primary">Book A Free Consultation</button>
            <Link href="/solutions" className="btn btn-outline-white">View All Solutions</Link>
          </div>
        </div>
      </div>

      <Footer onBookClick={() => setBookOpen(true)} />
      <ChatPanel />
    </>
  );
}
