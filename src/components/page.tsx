'use client';
import React, { useState } from 'react';
import Topbar from '@/components/Topbar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';
import ChatPanel from '@/components/ChatPanel';
import ScrollReveal from '@/components/ScrollReveal';

export default function WebsiteDevelopmentPage() {
  const [bookOpen, setBookOpen] = useState(false);

  return (
    <>
      <ScrollReveal />
      <Topbar />
      <Navbar onBookClick={() => setBookOpen(true)} />
      <BookingModal isOpen={bookOpen} onClose={() => setBookOpen(false)} />
      
      <div className="page-hero" style={{ background: 'linear-gradient(135deg, #0b1f3a 0%, #00b4d8 100%)' }}>
        <div className="page-hero-inner">
          <div className="page-hero-tag">Modern Web Architecture</div>
          <h1>Website <em>Development</em></h1>
          <p>We build high-performance, SEO-optimized websites that convert visitors into loyal customers. Faster, smarter, and beautiful.</p>
        </div>
      </div>

      <section style={{ padding: '90px 0', background: 'var(--white)' }}>
        <div className="wrap">
          <div className="solutions-section-grid reveal">
            <div>
              <span className="tag">Web Engineering</span>
              <h2 className="section-title">Your 24/7 <em>Salesperson</em></h2>
              <p className="section-sub">
                A website is more than a brochure; it’s an engine for growth. Our development 
                process focuses on speed, accessibility, and conversion-centered design 
                using modern stacks like Next.js and React.
              </p>
              
              <div className="about-points" style={{ marginTop: '32px' }}>
                {[
                  { icon: '⚡', title: 'Performance First', desc: 'Blazing fast load times that boost SEO rankings and keep users engaged.' },
                  { icon: '🛒', title: 'E-commerce Solutions', desc: 'Secure, scalable online stores integrated with local Ghanaian payment gateways.' },
                  { icon: '📱', title: 'Responsive Design', desc: 'Perfect experiences across all devices, from mobile phones to 4K displays.' }
                ].map((pt, i) => (
                  <div key={i} className="apoint">
                    <div className="apoint-icon">{pt.icon}</div>
                    <div><h4>{pt.title}</h4><p>{pt.desc}</p></div>
                  </div>
                ))}
              </div>
              
              <button onClick={() => setBookOpen(true)} className="btn btn-primary" style={{ marginTop: '32px' }}>Build Your Digital HQ →</button>
            </div>
            
            <div style={{ position: 'relative' }}>
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80" 
                alt="Web Development" 
                style={{ width: '100%', height: '500px', objectFit: 'cover', borderRadius: 'var(--r-lg)', boxShadow: 'var(--sh-md)' }} 
              />
              <div style={{ position: 'absolute', top: '20px', left: '-20px', background: 'var(--cyan)', color: 'var(--navy)', padding: '15px 25px', borderRadius: '12px', fontWeight: 700, boxShadow: 'var(--sh)' }}>
                SEO Ready
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '90px 0', background: 'var(--off)' }}>
        <div className="wrap">
          <div style={{ textAlign: 'center', marginBottom: '50px' }} className="reveal">
            <h2 className="section-title">Technical <em>Excellence</em></h2>
            <p className="section-sub" style={{ margin: '15px auto' }}>Future-proofed code for high-performing brands.</p>
          </div>
          <div className="values-grid stagger">
            {[
              { title: 'CMS Integration', desc: 'Easy-to-use backends like Sanity or Headless WordPress for effortless content updates.' },
              { title: 'Global Hosting', desc: 'Deployment on Vercel or Netlify for edge-optimized performance worldwide.' },
              { title: 'Advanced Analytics', desc: 'Full setup of GA4 and Search Console to track every click and conversion.' }
            ].map((v, i) => (
              <div key={i} style={{ background: '#fff', padding: '30px', borderRadius: '15px', border: '1px solid var(--border)' }}>
                <h4 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '20px', marginBottom: '10px', color: 'var(--navy)' }}>{v.title}</h4>
                <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.6 }}>{v.desc}</p>
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