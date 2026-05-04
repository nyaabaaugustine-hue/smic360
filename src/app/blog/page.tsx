'use client';
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Topbar from '@/components/Topbar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';
import ChatPanel from '@/components/ChatPanel';
import ScrollReveal from '@/components/ScrollReveal';

// Page-level SEO — injected via useEffect for client pages
const PAGE_TITLE = 'Blog & Insights | SMIC360 Limited';
const PAGE_DESC = 'Expert insights on marketing, real estate investment, and procurement in Ghana. Actionable strategies from the SMIC360 team.';

const posts = [
  {
    img: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777114247/kkkl_nhdczf.avif',
    category: 'Marketing',
    date: 'March 2025',
    title: '5 Brand Strategy Mistakes Ghanaian Businesses Make (And How to Fix Them)',
    excerpt:
      "Brand-building in Ghana's fast-moving market demands more than a logo and a tagline. Here are the five most common pitfalls we see — and the strategic fixes that move the needle.",
    readTime: '6 min read',
    full: `Branding is one of the most misunderstood investments a Ghanaian business can make. Many companies pour money into design without first anchoring their identity in a clear strategic positioning. Here are the five mistakes we encounter most often:\n\n1. Copying competitors instead of differentiating. Your brand should make clear why you are the only logical choice for your ideal customer — not echo what the market leader already does.\n\n2. Inconsistent application. A logo alone is not a brand. Colour, typography, tone of voice, and visual language must be applied consistently across every touchpoint — from your business card to your Instagram page.\n\n3. Ignoring the local cultural context. Global aesthetics can work, but the brands that truly resonate in Ghana are those that speak authentically to the culture, values, and aspirations of their audience.\n\n4. Treating branding as a one-time exercise. Markets evolve. Brands must too. Conduct brand audits every 18–24 months to ensure your identity still serves your business goals.\n\n5. No brand guidelines document. Without documented guidelines, brand consistency breaks down the moment a new designer, vendor, or employee gets involved.\n\nThe fix? Start with a brand strategy workshop, define your positioning and personality first, then build visual identity from there. SMIC360 offers full brand strategy and identity packages tailored to the Ghanaian market.`,
  },
  {
    img: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777111208/WhatsApp-Image-2025-08-18-at-14.16.35_e93040d9l_gwfnmu.jpg',
    category: 'Real Estate',
    date: 'February 2025',
    title: "Why The Phoenix Enclave Is Accra's Most Compelling Investment for 2025",
    excerpt:
      'With Greater Accra real estate demand outpacing supply, strategic gated communities represent the highest-yield opportunity for both homebuyers and investors.',
    readTime: '5 min read',
    full: `Greater Accra's housing deficit is not a new story — but the pace at which demand is now outstripping supply is creating a genuine window for investors who move early.\n\nThe Phoenix Enclave sits at the intersection of three powerful trends: rising demand for secured housing, a shortage of quality gated developments, and a growing Ghanaian middle class that prioritises lifestyle and safety above all.\n\nHere's why the numbers make sense for 2025:\n\nCapital appreciation. Properties in the Spintex corridor have appreciated at 12–18% annually over the past five years, driven by proximity to commercial hubs, the port, and Kotoka International Airport.\n\nRental yield. A 3-bedroom unit in a gated community in this corridor commands GH₵4,500–6,500/month in rental income — representing a gross yield of 8–11% at current pricing.\n\nLimited supply. There are fewer than 300 new gated community units planned for delivery in this corridor over the next 24 months. Demand from multinationals, returnees, and professionals far exceeds this pipeline.\n\nPhase II units at The Phoenix Enclave start from GH₵850,000. Contact our real estate team to request an investment brief and site visit.`,
  },
  {
    img: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777106950/ec234641a21a9e03c50b708351c53603_vl5piv.jpg',
    category: 'Procurement',
    date: 'January 2025',
    title: 'How to Cut Procurement Costs by 20% Without Compromising Quality',
    excerpt:
      'Precision sourcing, vendor diversification, and contract negotiation are the three levers that saved our clients an average of 18–22% on annual supply budgets.',
    readTime: '7 min read',
    full: `Procurement inefficiency is one of the most overlooked drains on a Ghanaian business's bottom line. Most organisations either rely on a single supplier (creating dependency and paying above-market rates) or make ad hoc purchases without any strategic framework.\n\nHere are the three levers that consistently produce 18–22% savings for our clients:\n\n1. Vendor diversification. Maintaining relationships with at least three pre-qualified vendors per category creates competitive pressure. In our GNPC engagement, simply introducing a second technical consumables vendor reduced unit prices by 14% in the first quarter.\n\n2. Consolidated purchasing. Bundling orders across departments or subsidiaries increases volume — and volume drives price. We helped one client consolidate 11 separate office supply requisitions into a single quarterly contract, saving 19%.\n\n3. Contract terms negotiation. Price is only one dimension. Payment terms, warranty periods, delivery timelines, and penalty clauses all have monetary value. Our procurement team regularly negotiates extended payment terms that improve cash flow by 30–45 days.\n\nThe key insight: procurement savings are not a one-time event. They require an ongoing framework of vendor management, market benchmarking, and strategic buying. SMIC360's procurement division is available for both project-based and retainer engagements.`,
  },
  {
    img: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777110562/A-Guide-to-Media-Buying-Definition-Importance-Impact-and-Benefits-scaled-copy_uidwzc.jpg',
    category: 'Marketing',
    date: 'December 2024',
    title: "The Definitive Guide to Media Buying in Ghana's Evolving Market",
    excerpt:
      'From TV and radio to programmatic digital — understanding where your target audience consumes media is the first step to an effective placement strategy.',
    readTime: '8 min read',
    full: `Ghana's media landscape has shifted dramatically in the last three years. The rise of mobile internet penetration (now above 62%), the proliferation of digital audio and video platforms, and the continued strength of radio in regional markets mean that media planning is more complex — and more powerful — than ever before.\n\nHere's how to navigate it:\n\nTV still converts for mass brands. Free-to-air channels like GTV, TV3, and UTV reach millions of Ghanaian households, particularly in Greater Accra and Ashanti. For FMCG and financial services brands, TV remains a high-reach, trust-building medium.\n\nRadio is still king outside Accra. If your audience is regional, radio is non-negotiable. Station loyalty is extremely high in Ghanaian markets, and presenter endorsements carry significant influence.\n\nDigital is now essential, not optional. Facebook and Instagram reach over 5 million Ghanaians monthly. YouTube penetration is accelerating. Google Search advertising delivers accountable, measurable ROI for lead generation.\n\nProgrammatic is the frontier. Real-time bidding platforms now enable Ghanaian advertisers to target specific audience segments across thousands of websites and apps simultaneously — at a fraction of traditional display costs.\n\nSMIC360's media buying team has access to negotiated rate cards across major Ghanaian TV, radio, print, and digital platforms. Contact us for a media audit and channel strategy.`,
  },
  {
    img: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1776533939/ab942b64_f6uozz.jpg',
    category: 'Business',
    date: 'November 2024',
    title: 'Integrated Solutions: Why One Partner Is Better Than Five Vendors',
    excerpt:
      "When marketing, real estate, and procurement are managed by one strategic partner, alignment improves, costs drop, and delivery accelerates — here's the data.",
    readTime: '5 min read',
    full: `The typical Ghanaian business manages its marketing through one agency, its office supplies through three vendors, and its real estate needs through a broker — with zero coordination between them. The result? Duplicated costs, brand inconsistency, and a enormous drain on management time.\n\nThe integrated model solves this. Here's what our clients consistently report after 12 months with SMIC360:\n\nTime savings. Dealing with one account manager instead of five vendors saves an average of 6–8 hours of management time per week. That's 300+ hours per year redirected to growth activities.\n\nCost savings. Integrated engagements allow us to bundle services and allocate shared resources more efficiently. Clients on integrated retainers save 12–18% versus managing the same services separately.\n\nBrand consistency. When the same team manages your marketing communications, your office environment, and your external vendor relationships, the result is a coherent brand experience that builds trust with every stakeholder.\n\nFaster execution. No hand-offs. No briefing a new supplier from scratch. No waiting for a third party to confirm availability. Our teams move in coordination, not in sequence.\n\nIf you are currently managing more than three separate service providers for what are essentially business operations functions, it may be time to consolidate. Book a consultation with SMIC360 to explore what an integrated engagement could look like for your business.`,
  },
  {
    img: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777199309/VCC_dl6ehf.jpg',
    category: 'Marketing',
    date: 'October 2024',
    title: 'Corporate Branding vs. Product Branding: What Every Ghanaian CEO Needs to Know',
    excerpt:
      'Misunderstanding the difference between your corporate identity and product brands can dilute both. We break down when to invest in each, and how.',
    readTime: '6 min read',
    full: `Many Ghanaian CEOs use 'brand' and 'logo' interchangeably — and confuse corporate identity with product branding. This misunderstanding leads to misallocated budgets and diluted brand equity across the business.\n\nHere's the distinction that matters:\n\nCorporate branding is the identity of the organisation as a whole — its name, visual identity, tone of voice, values, and reputation. It speaks to employees, investors, regulators, and the public. It builds institutional trust over time.\n\nProduct branding is the identity of a specific product or product line. It speaks directly to the consumer at the moment of purchase. It drives trial, preference, and loyalty.\n\nThe two can — and often should — coexist. MTN's corporate brand is the parent. MoMo is a product brand. Both are strong. But they serve different audiences and different purposes.\n\nWhen should you invest in corporate branding? When raising capital, attracting talent, entering new markets, or managing a reputation challenge.\n\nWhen should you invest in product branding? When launching a new product, competing in a crowded consumer market, or repositioning an existing offer.\n\nMost Ghanaian SMEs need corporate branding first — to establish credibility and trust — before investing heavily in product-level campaigns. SMIC360's brand strategy team can help you sequence and prioritise your brand investments correctly.`,
  },
];

const categories = ['All', 'Marketing', 'Real Estate', 'Procurement', 'Business'];

export default function BlogPage() {
  const [bookOpen, setBookOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [readPost, setReadPost] = useState<(typeof posts)[0] | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterDone, setNewsletterDone] = useState(false);
  const [newsletterLoading, setNewsletterLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.title = PAGE_TITLE;
    document.querySelector('meta[name="description"]')?.setAttribute('content', PAGE_DESC);
  }, []);

  // Scroll lock for article modal
  React.useEffect(() => {
    if (!readPost) return;
    const y = window.scrollY;
    document.documentElement.dataset.blogY = String(y);
    const sw = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.overflow = 'hidden';
    document.documentElement.style.paddingRight = `${sw}px`;
    return () => {
      document.documentElement.style.overflow = '';
      document.documentElement.style.paddingRight = '';
      delete document.documentElement.dataset.blogY;
      window.scrollTo(0, y);
    };
  }, [readPost]);

  const filtered =
    activeFilter === 'All' ? posts : posts.filter((p) => p.category === activeFilter);

  return (
    <>
      <ScrollReveal />
      <Topbar />
      <Navbar onBookClick={() => setBookOpen(true)} />
      <BookingModal isOpen={bookOpen} onClose={() => setBookOpen(false)} />

      <div className="page-hero">
        <div className="page-hero-inner">
          <div className="page-hero-tag">Insights &amp; News</div>
          <h1>
            The SMIC360 <em>Knowledge Hub</em>
          </h1>
          <p>
            Expert insights on marketing, real estate, procurement, and business growth in Ghana.
          </p>
        </div>
      </div>

      <section style={{ padding: '90px 0', background: 'var(--white)' }}>
        <div className="wrap">
          <div
            style={{
              display: 'flex',
              gap: '10px',
              flexWrap: 'wrap',
              marginBottom: '44px',
              justifyContent: 'center',
            }}
            className="reveal"
          >
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
                  <button
                    onClick={() => setReadPost(post)}
                    className="blog-read-more"
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                      fontFamily: 'inherit',
                    }}
                  >
                    Read Article →
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div style={{ background: '#1a1a1a', padding: '80px 0' }}>
        <div
          style={{ maxWidth: '640px', margin: '0 auto', padding: '0 28px', textAlign: 'center' }}
        >
          <span className="tag" style={{ justifyContent: 'center', color: 'var(--gold)' }}>
            Stay Informed
          </span>
          <h2
            style={{
              fontFamily: 'Oswald,sans-serif',
              fontSize: 'clamp(28px,4vw,42px)',
              fontWeight: 700,
              color: '#fff',
              lineHeight: 1.1,
              margin: '12px 0 16px',
            }}
          >
            Get Insights Delivered to Your{' '}
            <em style={{ fontStyle: 'normal', color: 'var(--cyan)' }}>Inbox</em>
          </h2>
          <p style={{ color: 'rgba(255,255,255,.55)', fontSize: '15px', marginBottom: '28px' }}>
            Join 500+ business leaders receiving our monthly digest on marketing, real estate
            trends, and procurement intelligence.
          </p>
          {!newsletterDone ? (
            <form
              style={{
                display: 'flex',
                gap: '12px',
                maxWidth: '480px',
                margin: '0 auto',
                flexWrap: 'wrap',
              }}
              onSubmit={async (e) => {
                e.preventDefault();
                setNewsletterLoading(true);
                const formData = new FormData(e.currentTarget);
                try {
                  await fetch('https://formspree.io/f/xdayrral', {
                    method: 'POST',
                    body: formData,
                    headers: { Accept: 'application/json' },
                  });
                  setNewsletterDone(true);
                  setNewsletterEmail('');
                } catch (_err) {
                  // submission error suppressed
                }
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
                style={{
                  flex: 1,
                  padding: '13px 16px',
                  borderRadius: 'var(--r)',
                  border: '1px solid rgba(255,255,255,.15)',
                  background: 'rgba(255,255,255,.07)',
                  color: '#fff',
                  fontSize: '14px',
                  outline: 'none',
                  minWidth: '200px',
                }}
              />
              <button
                type="submit"
                className="btn btn-primary"
                style={{ padding: '13px 24px', whiteSpace: 'nowrap' }}
                disabled={newsletterLoading}
              >
                {newsletterLoading ? 'Processing...' : 'Subscribe →'}
              </button>
            </form>
          ) : (
            <p style={{ color: 'var(--cyan)', fontWeight: 600, fontSize: '16px' }}>
              ✔ You&apos;re subscribed! Welcome to the SMIC360 community.
            </p>
          )}
          <p style={{ marginTop: '12px', fontSize: '12px', color: 'rgba(255,255,255,.25)' }}>
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>

      <Footer onBookClick={() => setBookOpen(true)} />
      <ChatPanel />

      {/* Article Reader Modal */}
      {mounted && readPost &&
        createPortal(
          <div
            onClick={(e) => { if (e.target === e.currentTarget) setReadPost(null); }}
            ref={(el) => { if (el) el.scrollTop = 0; }}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(4,14,29,0.9)',
              backdropFilter: 'blur(12px)',
              zIndex: 999998,
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
              padding: '20px 16px 40px',
              overflowY: 'auto',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            <style>{`@keyframes artIn{from{opacity:0;transform:translateY(28px) scale(0.96);}to{opacity:1;transform:none;}}`}</style>
            <div
              style={{
                background: '#fff',
                width: '100%',
                maxWidth: '700px',
                borderRadius: 20,
                overflow: 'hidden',
                boxShadow: '0 40px 100px rgba(4,14,29,0.5)',
                borderTop: '4px solid #FFC107',
                animation: 'artIn 0.35s cubic-bezier(0.16,1,0.3,1) both',
                alignSelf: 'flex-start',
                margin: '0 auto',
              }}
            >
              {/* Header image */}
              <div style={{ position: 'relative', height: 220, overflow: 'hidden' }}>
                <img
                  src={readPost.img}
                  alt={readPost.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(transparent 40%, rgba(7,22,40,0.8))',
                  }}
                />
                <button
                  onClick={() => setReadPost(null)}
                  style={{
                    position: 'absolute',
                    top: 14,
                    right: 14,
                    background: 'rgba(255,255,255,0.15)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    color: '#fff',
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    cursor: 'pointer',
                    fontSize: 16,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background 0.2s',
                  }}
                >
                  ✕
                </button>
                <div style={{ position: 'absolute', bottom: 16, left: 24 }}>
                  <span
                    style={{
                      background: '#FFC107',
                      color: '#071628',
                      fontSize: 10,
                      fontWeight: 700,
                      padding: '4px 10px',
                      borderRadius: 20,
                      textTransform: 'uppercase',
                      letterSpacing: 1,
                    }}
                  >
                    {readPost.category}
                  </span>
                </div>
              </div>
              {/* Body */}
              <div style={{ padding: '28px 32px 36px' }}>
                <div
                  style={{
                    display: 'flex',
                    gap: 12,
                    fontSize: 12,
                    color: '#5a7186',
                    marginBottom: 14,
                    alignItems: 'center',
                  }}
                >
                  <span>{readPost.date}</span>
                  <span>·</span>
                  <span>{readPost.readTime}</span>
                </div>
                <h2
                  style={{
                    fontFamily: 'Oswald,sans-serif',
                    fontSize: 'clamp(20px,3vw,28px)',
                    fontWeight: 700,
                    color: '#071628',
                    lineHeight: 1.2,
                    marginBottom: 20,
                  }}
                >
                  {readPost.title}
                </h2>
                <div
                  style={{
                    fontSize: 15.5,
                    color: '#5a7186',
                    lineHeight: 1.82,
                    whiteSpace: 'pre-line',
                  }}
                >
                  {readPost.full}
                </div>
              </div>
              {/* Footer */}
              <div
                style={{
                  padding: '16px 32px 24px',
                  borderTop: '1px solid #dce8f7',
                  display: 'flex',
                  gap: 10,
                  flexWrap: 'wrap',
                }}
              >
                <button
                  onClick={() => {
                    setReadPost(null);
                    setBookOpen(true);
                  }}
                  className="btn btn-primary"
                  style={{ fontSize: 13 }}
                >
                  Book A Consultation
                </button>
                <button
                  onClick={() => setReadPost(null)}
                  className="btn btn-outline"
                  style={{ fontSize: 13 }}
                >
                  Close Article
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
