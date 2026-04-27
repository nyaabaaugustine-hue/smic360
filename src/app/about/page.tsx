'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Topbar from '@/components/Topbar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';
import ChatPanel from '@/components/ChatPanel';
import ScrollReveal from '@/components/ScrollReveal';

const teamMembers = [
{
  img: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777112403/CHRISTIANA_pmwgsx.jpg',
  name: 'Christiana',
  role: 'Founder & CEO',
  bio: 'Over 20 years of experience excelling in Advertising, Marketing, and Business Management across Ghana and beyond.'
},
{
  img: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777112403/ALBERTA_jbrc1f.jpg',
  name: 'Alberta',
  role: 'Finance Manager',
  bio: 'Strategic insight and financial acumen with an MBA in Finance from UGBS and 9+ years of administration experience.'
},
{
  img: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777112169/NII-BOYE_mixzve.jpg',
  name: 'Samuel',
  role: 'Creative & Production Manager',
  bio: 'Creative lead with 15+ years crafting visually captivating and impactful marketing campaigns for leading brands.'
}];


export default function AboutPage() {
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
          <div className="page-hero-tag">About Us</div>
          <h1>Building <em>Legacies</em></h1>
          <p>Our story is one of innovation, integrity, and transformative impact across Ghana&apos;s business landscape.</p>
        </div>
      </div>
      {/* About Section */}
      <section style={{ padding: '90px 0', background: 'var(--white)' }}>
        <div className="wrap">
          <div className="about-hero-grid">
            <div className="reveal-left" style={{ position: 'relative' }}>
              <img src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80" alt="Our Team" style={{ width: '100%', height: '420px', objectFit: 'cover', borderRadius: 'var(--r-lg)', boxShadow: 'var(--sh-md)' }} />
              <div style={{ position: 'absolute', bottom: '-18px', right: '-18px', background: 'var(--blue)', color: '#fff', borderRadius: 'var(--r)', padding: '20px 24px', textAlign: 'center', boxShadow: '0 8px 28px rgba(19,97,196,.38)' }}>
                <span style={{ fontFamily: 'Oswald,sans-serif', fontSize: '38px', fontWeight: 700, lineHeight: 1, display: 'block' }}>10+</span>
                <span style={{ fontSize: '12px', fontWeight: 500, opacity: .85, marginTop: '2px', display: 'block', textTransform: 'uppercase', letterSpacing: '1px' }}>Years Excellence</span>
              </div>
            </div>
            <div className="reveal-right">
              <span className="tag">Who We Are</span>
              <h2 className="section-title">360° <em>Business Solutions</em></h2>
              <p className="section-sub">
                SMIC360 Limited stands at the forefront of integrated business solutions in Ghana.
                We specialize in three core domains: <strong>Advertising &amp; Marketing</strong>,{' '}
                <strong>Real Estate Development</strong>, and{' '}
                <strong>Procurement &amp; Supply Chain Management</strong>.
              </p>
              <p className="section-sub" style={{ marginTop: '10px' }}>
                Our mission is to engineer growth and deliver measurable results for our clients
                through strategic excellence and operational precision — all under one roof.
              </p>
              <div className="about-points" style={{ marginTop: '28px' }}>
                {[
                { icon: '🚀', title: 'Innovative Strategies', desc: 'Data-driven campaigns and forward-thinking solutions tailored to your market.' },
                { icon: '🏗️', title: 'Premium Developments', desc: 'Quality-built spaces designed for modern Ghanaian living and investment.' },
                { icon: '📦', title: 'End-to-End Procurement', desc: 'Efficient sourcing and supply chain management for every business need.' },
                { icon: '🤝', title: 'Client-Centric', desc: 'Partnerships built on trust, transparency, and measurable results.' }]?.
                map((pt, i) =>
                <div key={i} className="apoint">
                    <div className="apoint-icon">{pt?.icon}</div>
                    <div><h4>{pt?.title}</h4><p>{pt?.desc}</p></div>
                  </div>
                )}
              </div>
              <div style={{ marginTop: '28px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link href="/contact" className="btn btn-primary">Let&apos;s Discuss Your Project</Link>
                <Link href="/portfolio" className="btn btn-outline">View Our Work</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Stats */}
      <div style={{ background: 'var(--navy)', padding: '60px 0' }}>
        <div className="wrap">
          <div className="stats-grid">
            {[
            { num: '150', suffix: '+', label: 'Projects Delivered' },
            { num: '80', suffix: '+', label: 'Happy Clients' },
            { num: '10', suffix: '+', label: 'Years of Excellence' },
            { num: '3', suffix: '', label: 'Core Divisions' }]?.
            map((stat, i) =>
            <div key={i}>
                <div style={{ fontFamily: 'Oswald,sans-serif', fontSize: 'clamp(32px,4vw,52px)', fontWeight: 700, color: '#fff', lineHeight: 1 }}>
                  {stat?.num}<span style={{ color: 'var(--gold)' }}>{stat?.suffix}</span>
                </div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,.5)', textTransform: 'uppercase', letterSpacing: '.8px', marginTop: '8px' }}>{stat?.label}</div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Values */}
      <section style={{ padding: '90px 0', background: 'var(--off)' }}>
        <div className="wrap">
          <div style={{ textAlign: 'center', marginBottom: '48px' }} className="reveal">
            <span className="tag" style={{ justifyContent: 'center' }}>Our Values</span>
            <h2 className="section-title">What Drives <em>Everything We Do</em></h2>
          </div>
          <div className="values-grid stagger">
            {[
            { icon: '🎯', title: 'Strategy First', desc: 'Every solution starts with a tailored strategy built around your unique goals, market context, and growth ambitions.' },
            { icon: '🏆', title: 'Excellence in Delivery', desc: 'We hold ourselves to the highest standards of quality, precision, and professionalism in every project we undertake.' },
            { icon: '🌍', title: 'Ghana-Rooted Vision', desc: 'Built in Accra with deep local expertise and a pan-African perspective for everything we build and create.' }]?.
            map((val, i) =>
            <div key={i} style={{ background: '#fff', borderRadius: 'var(--r-lg)', padding: '36px 28px', textAlign: 'center', boxShadow: 'var(--sh)', border: '1px solid var(--border)', transition: 'all .3s' }}>
                <div style={{ fontSize: '40px', marginBottom: '16px' }}>{val?.icon}</div>
                <h3 style={{ fontFamily: 'Oswald,sans-serif', fontSize: '22px', fontWeight: 700, color: 'var(--navy)', marginBottom: '12px' }}>{val?.title}</h3>
                <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.7 }}>{val?.desc}</p>
              </div>
            )}
          </div>
        </div>
      </section>
      {/* Team */}
      <section style={{ padding: '90px 0', background: 'var(--white)' }}>
        <div className="wrap">
          <div style={{ textAlign: 'center', marginBottom: '48px' }} className="reveal">
            <span className="tag" style={{ justifyContent: 'center' }}>The People</span>
            <h2 className="section-title">Meet <em>The Experts</em></h2>
            <p className="section-sub" style={{ margin: '12px auto 0', textAlign: 'center' }}>A dedicated team of strategists, creatives, and specialists united by one goal — your success.</p>
          </div>
          <div className="team-grid stagger">
            {teamMembers?.map((member, i) =>
            <div key={i} className="team-card">
                <div className="team-img">
                  <img src={member?.img} alt={member?.name} />
                </div>
                <div className="team-body">
                  <h3>{member?.name}</h3>
                  <div className="team-role">{member?.role}</div>
                  <p>{member?.bio}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer onBookClick={() => setBookOpen(true)} />
      <ChatPanel />
    </>);

}