'use client';
import React, { useState } from 'react';
import Topbar from '@/components/Topbar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';
import ChatPanel from '@/components/ChatPanel';
import ScrollReveal from '@/components/ScrollReveal';

const posts = [
  {
    img: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777114247/kkkl_nhdczf.avif',
    category: 'Marketing',
    date: 'March 2025',
    title: '5 Brand Strategy Mistakes Ghanaian Businesses Make (And How to Fix Them)',
    excerpt: 'Brand-building in Ghana\'s fast-moving market demands more than a logo and a tagline. Here are the five most common pitfalls we see — and the strategic fixes that move the needle.',
    readTime: '6 min read',
  },
  {
    img: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777111208/WhatsApp-Image-2025-08-18-at-14.16.35_e93040d9l_gwfnmu.jpg',
    category: 'Real Estate',
    date: 'February 2025',
    title: "Why The Phoenix Enclave Is Accra's Most Compelling Investment for 2025",
    excerpt: 'With Greater Accra real estate demand outpacing supply, strategic gated communities represent the highest-yield opportunity for both homebuyers and investors.',
    readTime: '5 min read',
  },
  {
    img: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777106950/ec234641a21a9e03c50b708351c53603_vl5piv.jpg',
    category: 'Procurement',
    date: 'January 2025',
    title: 'How to Cut Procurement Costs by 20% Without Compromising Quality',
    excerpt: 'Precision sourcing, vendor diversification, and contract negotiation are the three levers that saved our clients an average of 18–22% on annual supply budgets.',
    readTime: '7 min read',
  },
  {
    img: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777110562/A-Guide-to-Media-Buying-Definition-Importance-Impact-and-Benefits-scaled-copy_uidwzc.jpg',
    category: 'Marketing',
    date: 'December 2024',
    title: "The Definitive Guide to Media Buying in Ghana's Evolving Market",
    excerpt: 'From TV and radio to programmatic digital — understanding where your target audience consumes media is the first step to an effective placement strategy.',
    readTime: '8 min read',
  },
  {
    img: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1776533939/ab942b64_f6uozz.jpg',
    category: 'Business',
    date: 'November 2024',
    title: 'Integrated Solutions: Why One Partner Is Better Than Five Vendors',
    excerpt: "When marketing, real estate, and procurement are managed by one strategic partner, alignment improves, costs drop, and delivery accelerates — here's the data.",
    readTime: '5 min read',
  },
  {
    img: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777199309/VCC_dl6ehf.jpg',
    category: 'Marketing',
    date: 'October 2024',
    title: 'Corporate Branding vs. Product Branding: What Every Ghanaian CEO Needs to Know',
    excerpt: 'Misunderstanding the difference between your corporate identity and product brands can dilute both. We break down when to invest in each, and how.',
    readTime: '6 min read',
  },
];

const categories = ['All', 'Marketing', 'Real Estate', 'Procurement', 'Business'];

export default function BlogPage() {
  const [bookOpen, setBookOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterDone, setNewsletterDone] = useState(false);
  const [newsletterLoading, setNewsletterLoading] = useState(false);

  const filtered = activeFilter === 'All' ? posts : posts.filter((p) => p.category === activeFilter);

  return (
    <>
      <ScrollReveal />
      <Topbar />
      <Navbar onBookClick={() => setBookOpen(true)} />
      <BookingModal isOpen={bookOpen} onClose={() => setBookOpen(false)} />

      <div className="page-hero">
        <div className="page-hero-inner">
          <div className="page-hero-tag">Insights &amp; News</div>
          <h1>The SMIC360 <em>Knowledge Hub</em></h1>
          <p>Expert insights on marketing, real estate, procurement, and business growth in Ghana.</p>
        </div>
      </div>

      <section style={{ padding: '90px 0', background: 'var(--white)' }}>
        <div className="wrap">
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '44px', justifyContent: 'center' }} className="reveal">
            {categories.map((cat) => (
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
          <div className="blog-grid stagger">
            {filtered.map((post, i) => (
              <article key={i} className="blog-card">
                <div className="blog-img">
                  <img src={post.img} alt={post.title} />
                  <span className="blog-cat">{post.category}</span>
                </div>
                <div className="blog-body">
                  <div className="blog-meta">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <a href="#" className="blog-read-more" onClick={(e) => e.preventDefault()}>
                    Read Article →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div style={{ background: 'var(--navy)', padding: '80px 0' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', padding: '0 28px', textAlign: 'center' }}>
          <span className="tag" style={{ justifyContent: 'center', color: 'var(--gold)' }}>Stay Informed</span>
          <h2 style={{ fontFamily: 'Oswald,sans-serif', fontSize: 'clamp(28px,4vw,42px)', fontWeight: 700, color: '#fff', lineHeight: 1.1, margin: '12px 0 16px' }}>
            Get Insights Delivered to Your <em style={{ fontStyle: 'normal', color: 'var(--cyan)' }}>Inbox</em>
          </h2>
          <p style={{ color: 'rgba(255,255,255,.55)', fontSize: '15px', marginBottom: '28px' }}>
            Join 500+ business leaders receiving our monthly digest on marketing, real estate trends, and procurement intelligence.
          </p>
          {!newsletterDone ? (
            <form
              style={{ display: 'flex', gap: '12px', maxWidth: '480px', margin: '0 auto', flexWrap: 'wrap' }}
              onSubmit={async (e) => { 
                e.preventDefault();
                setNewsletterLoading(true);
                const formData = new FormData(e.currentTarget);
                try {
                  await fetch('https://formspree.io/f/xdayrral', {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                  });
                  setNewsletterDone(true);
                  setNewsletterEmail('');
                } catch (err) {}
                setNewsletterLoading(false);
              }}
            >
              <input
                type="email"
                name="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                style={{ flex: 1, padding: '13px 16px', borderRadius: 'var(--r)', border: '1px solid rgba(255,255,255,.15)', background: 'rgba(255,255,255,.07)', color: '#fff', fontSize: '14px', outline: 'none', minWidth: '200px' }}
              />
              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ padding: '13px 24px', whiteSpace: 'nowrap' }}
                disabled={newsletterLoading}
              >{newsletterLoading ? 'Processing...' : 'Subscribe →'}</button>
            </form>
          ) : (
            <p style={{ color: 'var(--cyan)', fontWeight: 600, fontSize: '16px' }}>✔ You&apos;re subscribed! Welcome to the SMIC360 community.</p>
          )}
          <p style={{ marginTop: '12px', fontSize: '12px', color: 'rgba(255,255,255,.25)' }}>No spam. Unsubscribe anytime.</p>
        </div>
      </div>

      <Footer onBookClick={() => setBookOpen(true)} />
      <ChatPanel />
    </>
  );
}
