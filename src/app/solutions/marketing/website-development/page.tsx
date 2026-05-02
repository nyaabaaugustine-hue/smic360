'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Topbar from '@/components/Topbar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';
import ChatPanel from '@/components/ChatPanel';
import ScrollReveal from '@/components/ScrollReveal';

export default function WebsiteDevelopmentPage() {
  const [bookOpen, setBookOpen] = useState(false);

  const features = [
    {
      icon: '⚡',
      title: 'Performance First',
      desc: "Blazing fast load times built on Next.js, optimised for Ghana's network conditions and global SEO rankings.",
    },
    {
      icon: '📱',
      title: 'Fully Responsive',
      desc: 'Perfect experiences across all devices — mobile phones to 4K displays — with pixel-perfect layouts.',
    },
    {
      icon: '🛒',
      title: 'E-Commerce Ready',
      desc: 'Secure, scalable online stores integrated with Ghanaian payment gateways including MTN MoMo and Visa.',
    },
    {
      icon: '🔍',
      title: 'SEO-Optimised',
      desc: 'Built-in SEO best practices, sitemap generation, and meta tagging so you rank higher on Google from day one.',
    },
    {
      icon: '📊',
      title: 'Analytics Integration',
      desc: 'Full setup of Google Analytics 4 and Search Console to track every click, session, and conversion.',
    },
    {
      icon: '🔒',
      title: 'Secure & Reliable',
      desc: 'SSL certificates, best-practice security, and 99.9% uptime hosting on Vercel or Netlify edge networks.',
    },
  ];

  const process = [
    {
      num: '01',
      title: 'Discovery & Strategy',
      desc: 'We begin with a deep-dive session to understand your brand, goals, and target audience to map out the ideal site architecture.',
    },
    {
      num: '02',
      title: 'Design & Prototyping',
      desc: 'Our creative team builds high-fidelity mockups aligned with your brand identity for your review and sign-off before any code is written.',
    },
    {
      num: '03',
      title: 'Development & Testing',
      desc: 'We build your site using modern frameworks, then rigorously test across all devices, browsers, and connection speeds.',
    },
    {
      num: '04',
      title: 'Launch & Support',
      desc: 'We handle deployment, domain setup, and provide post-launch support and training so your team can manage content confidently.',
    },
  ];

  const packages = [
    {
      name: 'Starter',
      price: 'From GH₵ 3,500',
      desc: 'Perfect for small businesses and startups entering the digital space.',
      features: [
        'Up to 5 pages',
        'Mobile responsive',
        'Contact form',
        'SEO basics',
        'Google Analytics',
        '30-day support',
      ],
      highlight: false,
    },
    {
      name: 'Business',
      price: 'From GH₵ 7,500',
      desc: 'Ideal for growing brands that need a powerful online presence.',
      features: [
        'Up to 15 pages',
        'CMS integration',
        'Blog section',
        'Advanced SEO',
        'Social media links',
        'E-commerce ready',
        '60-day support',
      ],
      highlight: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom Quote',
      desc: 'Full-scale digital platforms for large organisations and corporates.',
      features: [
        'Unlimited pages',
        'Custom features',
        'API integrations',
        'Payment gateway',
        'Staff training',
        'Priority support',
        'Ongoing maintenance',
      ],
      highlight: false,
    },
  ];

  return (
    <>
      <style>{`
        .web-features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-top: 48px;
        }
        .web-feature-card {
          background: #fff;
          border-radius: 18px;
          padding: 28px 24px;
          border: 1.5px solid var(--border);
          transition: all 0.3s;
        }
        .web-feature-card:hover {
          border-color: var(--gold);
          box-shadow: var(--sh-gold);
          transform: translateY(-4px);
        }
        .web-feature-icon {
          font-size: 36px;
          margin-bottom: 14px;
        }
        .web-feature-card h4 {
          font-family: 'Oswald', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: var(--navy);
          margin-bottom: 8px;
        }
        .web-feature-card p {
          font-size: 13.5px;
          color: var(--muted);
          line-height: 1.7;
        }
        .web-process-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          margin-top: 48px;
          position: relative;
        }
        .web-process-grid::before {
          content: '';
          position: absolute;
          top: 36px;
          left: calc(12.5% + 20px);
          right: calc(12.5% + 20px);
          height: 2px;
          background: linear-gradient(90deg, var(--gold), var(--cyan));
          z-index: 0;
        }
        .web-process-step {
          text-align: center;
          position: relative;
          z-index: 1;
        }
        .web-process-num {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--gold), var(--gold-d));
          color: var(--navy);
          font-family: 'Oswald', sans-serif;
          font-size: 22px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          border: 4px solid #fff;
          box-shadow: var(--sh);
        }
        .web-process-step h4 {
          font-family: 'Oswald', sans-serif;
          font-size: 16px;
          font-weight: 700;
          color: var(--navy);
          margin-bottom: 8px;
        }
        .web-process-step p {
          font-size: 13px;
          color: var(--muted);
          line-height: 1.65;
        }
        .packages-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
          margin-top: 48px;
        }
        .package-card {
          background: #fff;
          border-radius: 24px;
          padding: 36px 28px;
          border: 2px solid var(--border);
          position: relative;
          transition: all 0.3s;
        }
        .package-card.highlight {
          border-color: var(--gold);
          box-shadow: var(--sh-gold);
          transform: scale(1.03);
        }
        .package-card:hover {
          border-color: var(--gold);
          box-shadow: var(--sh-lg);
          transform: translateY(-6px) scale(1.01);
        }
        .package-card.highlight:hover {
          transform: scale(1.03) translateY(-6px);
        }
        .package-badge {
          position: absolute;
          top: -14px;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(135deg, var(--gold), var(--gold-d));
          color: var(--navy);
          font-size: 11px;
          font-weight: 800;
          padding: 5px 18px;
          border-radius: 20px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }
        .package-name {
          font-family: 'Oswald', sans-serif;
          font-size: 26px;
          font-weight: 700;
          color: var(--navy);
          margin-bottom: 6px;
        }
        .package-price {
          font-family: 'Oswald', sans-serif;
          font-size: 22px;
          font-weight: 700;
          color: var(--gold-d);
          margin-bottom: 12px;
        }
        .package-desc {
          font-size: 13.5px;
          color: var(--muted);
          margin-bottom: 24px;
          line-height: 1.65;
        }
        .package-features {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 28px;
        }
        .package-feature {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13.5px;
          color: var(--text);
        }
        .package-feature::before {
          content: '✔';
          color: #16a34a;
          font-weight: 700;
          flex-shrink: 0;
        }
        @media (max-width: 1024px) {
          .web-features-grid,
          .packages-grid { grid-template-columns: repeat(2, 1fr); }
          .web-process-grid { grid-template-columns: repeat(2, 1fr); }
          .web-process-grid::before { display: none; }
        }
        @media (max-width: 640px) {
          .web-features-grid,
          .packages-grid,
          .web-process-grid { grid-template-columns: 1fr; }
          .package-card.highlight { transform: none; }
        }
      `}</style>

      <ScrollReveal />
      <Topbar />
      <Navbar onBookClick={() => setBookOpen(true)} />
      <BookingModal isOpen={bookOpen} onClose={() => setBookOpen(false)} />

      {/* Page Hero */}
      <div className="page-hero">
        <div className="page-hero-inner">
          <div className="page-hero-tag">Digital Solutions</div>
          <h1>
            Website <em>Development</em>
          </h1>
          <p>
            We build high-performance, SEO-optimised websites that turn visitors into loyal
            customers — fast, beautiful, and built for Ghana.
          </p>
        </div>
      </div>

      {/* Intro Section */}
      <section style={{ padding: '90px 0', background: 'var(--white)' }}>
        <div className="wrap">
          <div className="solutions-section-grid reveal">
            <div>
              <span className="tag">Your Digital HQ</span>
              <h2 className="section-title">
                Your 24/7 <em>Salesperson</em>
              </h2>
              <p className="section-sub">
                A website isn&apos;t just a brochure — it&apos;s your most powerful business asset.
                Our development process blends cutting-edge technology with strategic design to
                create websites that look brilliant, rank on Google, and convert visitors into
                paying customers.
              </p>
              <p className="section-sub" style={{ marginTop: '12px' }}>
                We use modern stacks like Next.js and React to build sites that are blazing fast,
                accessible, and ready to scale with your business — whether you&apos;re a startup or
                a national brand.
              </p>
              <div style={{ display: 'flex', gap: '12px', marginTop: '28px', flexWrap: 'wrap' }}>
                <button onClick={() => setBookOpen(true)} className="btn btn-primary">
                  Build My Website →
                </button>
                <Link href="/contact" className="btn btn-outline">
                  Get A Quote
                </Link>
              </div>
            </div>
            <div style={{ position: 'relative' }}>
              <img
                src="https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777106950/Foxcooling-website-cover_p5grjz.jpg"
                alt="Website Development"
                style={{
                  width: '100%',
                  height: '460px',
                  objectFit: 'cover',
                  borderRadius: 'var(--r-lg)',
                  boxShadow: 'var(--sh-md)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '20px',
                  left: '-20px',
                  background: 'var(--cyan)',
                  color: 'var(--navy)',
                  padding: '14px 20px',
                  borderRadius: '12px',
                  fontFamily: 'Oswald, sans-serif',
                  fontWeight: 700,
                  fontSize: '14px',
                  boxShadow: 'var(--sh)',
                }}
              >
                ⚡ SEO Ready
              </div>
              <div
                style={{
                  position: 'absolute',
                  bottom: '20px',
                  right: '-16px',
                  background: 'var(--gold)',
                  color: 'var(--navy)',
                  padding: '14px 20px',
                  borderRadius: '12px',
                  fontFamily: 'Oswald, sans-serif',
                  fontWeight: 700,
                  fontSize: '14px',
                  boxShadow: 'var(--sh)',
                }}
              >
                📱 Mobile First
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '90px 0', background: 'var(--off)' }}>
        <div className="wrap">
          <div style={{ textAlign: 'center' }} className="reveal">
            <span className="tag" style={{ justifyContent: 'center' }}>
              What We Deliver
            </span>
            <h2 className="section-title">
              Every Site We Build <em>Includes</em>
            </h2>
            <p className="section-sub" style={{ margin: '12px auto 0', textAlign: 'center' }}>
              No corner-cutting. Every project comes fully loaded with the features that matter.
            </p>
          </div>
          <div className="web-features-grid stagger">
            {features.map((f, i) => (
              <div key={i} className="web-feature-card">
                <div className="web-feature-icon">{f.icon}</div>
                <h4>{f.title}</h4>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section style={{ padding: '90px 0', background: 'var(--white)' }}>
        <div className="wrap">
          <div style={{ textAlign: 'center' }} className="reveal">
            <span className="tag" style={{ justifyContent: 'center' }}>
              How We Work
            </span>
            <h2 className="section-title">
              Our 4-Step <em>Build Process</em>
            </h2>
            <p className="section-sub" style={{ margin: '12px auto 0', textAlign: 'center' }}>
              From concept to launch — a transparent, collaborative process you will love.
            </p>
          </div>
          <div className="web-process-grid stagger">
            {process.map((step, i) => (
              <div key={i} className="web-process-step">
                <div className="web-process-num">{step.num}</div>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section style={{ padding: '90px 0', background: 'var(--off)' }}>
        <div className="wrap">
          <div style={{ textAlign: 'center' }} className="reveal">
            <span className="tag" style={{ justifyContent: 'center' }}>
              Pricing
            </span>
            <h2 className="section-title">
              Choose Your <em>Package</em>
            </h2>
            <p className="section-sub" style={{ margin: '12px auto 0', textAlign: 'center' }}>
              Transparent pricing with no hidden fees. All packages include free consultation.
            </p>
          </div>
          <div className="packages-grid stagger">
            {packages.map((pkg, i) => (
              <div key={i} className={`package-card${pkg.highlight ? ' highlight' : ''}`}>
                {pkg.highlight && <div className="package-badge">Most Popular</div>}
                <div className="package-name">{pkg.name}</div>
                <div className="package-price">{pkg.price}</div>
                <div className="package-desc">{pkg.desc}</div>
                <div className="package-features">
                  {pkg.features.map((f, j) => (
                    <div key={j} className="package-feature">
                      {f}
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setBookOpen(true)}
                  className={`btn ${pkg.highlight ? 'btn-primary' : 'btn-outline'}`}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Get Started →
                </button>
              </div>
            ))}
          </div>
          <p
            style={{
              textAlign: 'center',
              marginTop: '28px',
              fontSize: '13.5px',
              color: 'var(--muted)',
            }}
          >
            Need something custom?{' '}
            <button
              onClick={() => setBookOpen(true)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--gold-d)',
                fontWeight: 700,
                cursor: 'pointer',
                fontSize: '13.5px',
              }}
            >
              Let&apos;s Talk →
            </button>
          </p>
        </div>
      </section>

      {/* CTA */}
      <div
        style={{
          background: 'linear-gradient(135deg, #071628 0%, #0b2d56 60%, #1361c4 100%)',
          padding: '80px 0',
        }}
      >
        <div
          style={{ maxWidth: '700px', margin: '0 auto', padding: '0 28px', textAlign: 'center' }}
        >
          <h2
            style={{
              fontFamily: 'Oswald,sans-serif',
              fontSize: 'clamp(28px,4vw,46px)',
              fontWeight: 700,
              color: '#fff',
              marginBottom: '16px',
            }}
          >
            Ready to Go <em style={{ fontStyle: 'normal', color: 'var(--cyan)' }}>Digital?</em>
          </h2>
          <p
            style={{
              color: 'rgba(255,255,255,.6)',
              fontSize: '16px',
              marginBottom: '32px',
              lineHeight: 1.7,
            }}
          >
            Let&apos;s build a website that works as hard as you do. Book a free 30-minute strategy
            call with our web team today.
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => setBookOpen(true)} className="btn btn-primary">
              Book Free Consultation
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
