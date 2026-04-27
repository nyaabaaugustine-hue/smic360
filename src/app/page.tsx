'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Topbar from '@/components/Topbar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';
import ChatPanel from '@/components/ChatPanel';
import ScrollReveal from '@/components/ScrollReveal';
import HeroSlider from '@/components/HeroSlider';

const caseStudies = [
{
  img: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777114247/kkkl_nhdczf.avif',
  alt: 'Marketing Case',
  tag: 'Marketing',
  title: 'National Brand Relaunch',
  desc: 'The Challenge: A legacy brand losing market share. Our Process: Deep market research followed by a 360° creative pivot and digital expansion.',
  solution: '+38% awareness & record sales growth.'
},
{
  img: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777111208/WhatsApp-Image-2025-08-18-at-14.16.35_e93040d9l_gwfnmu.jpg',
  alt: 'Real Estate Case',
  tag: 'Real Estate',
  title: 'The Phoenix Enclave Phase I',
  desc: 'The Challenge: High demand for secure housing in Accra. Our Process: Strategic land acquisition and precision construction management.',
  solution: '24 premium units delivered on schedule.'
},
{
  img: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777106950/ec234641a21a9e03c50b708351c53603_vl5piv.jpg',
  alt: 'Procurement Case',
  tag: 'Procurement',
  title: 'Industrial Supply for GNPC',
  desc: 'The Challenge: Critical equipment needed with high specs. Our Process: Global vendor negotiation and logistics optimization.',
  solution: '18% cost saving on technical consumables.'
},
{
  img: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1776533939/ab942b64_f6uozz.jpg',
  alt: 'Integrated Solution',
  tag: 'Integrated',
  title: 'Corporate HQ Transformation',
  desc: 'The Challenge: New office needed branding and interior supply. Our Process: Unified brand identity paired with precision procurement.',
  solution: 'Complete move-in and brand launch in 60 days.'
}];


const clientLogos = [
{ src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777112814/a2_az567s.jpg', alt: 'GCB Bank' },
{ src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777112816/a3_y1xfq2.jpg', alt: 'MTN Ghana' },
{ src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777112818/a5_kpnhnw.jpg', alt: 'Cocobod' },
{ src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777112820/a6_gelulp.jpg', alt: 'GNPC' },
{ src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777112823/a7_bta0e1.jpg', alt: 'Stanbic' },
{ src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777112830/a8_uhzxz6.jpg', alt: 'ECG' },
{ src: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777112843/a17_l3mpki.jpg', alt: 'Ashfoam' }];


const projects = [
{
  img: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777199309/VCC_dl6ehf.jpg',
  alt: 'Rebranding Campaign',
  badge: 'Marketing',
  title: 'National Brand Relaunch Campaign',
  desc: 'Full 360° rebranding for a leading Ghanaian consumer goods company — new identity, packaging, and digital campaign launch.',
  meta: [{ label: 'Industry', val: 'Consumer Goods' }, { label: 'Duration', val: '4 months' }, { label: 'Result', val: '+38% awareness' }]
},
{
  img: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777196963/1_j6fe4u.jpg',
  alt: 'Phoenix Enclave',
  badge: 'Real Estate',
  title: 'The Phoenix Enclave — Phase 1',
  desc: 'Delivery of Phase 1 of our flagship gated community — 24 residential units, landscaping, and full utilities infrastructure.',
  meta: [{ label: 'Units', val: '24 Homes' }, { label: 'Location', val: 'Greater Accra' }, { label: 'Status', val: 'Completed' }]
},
{
  img: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1776422246/abz_3_hp78qi.jpg',
  alt: 'Procurement Project',
  badge: 'Procurement',
  title: 'Industrial Procurement — GNPC Supply',
  desc: 'End-to-end procurement of technical equipment and consumables for a major state-owned enterprise — on time, on spec.',
  meta: [{ label: 'Value', val: '$2.4M GHS' }, { label: 'Timeline', val: '6 weeks' }, { label: 'Saving', val: '18% cost saving' }]
},
{
  img: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777196963/1_j6fe4u.jpg',
  alt: 'Residential Apartments',
  badge: 'Real Estate',
  title: 'Modern Residential Apartments - Phase 2',
  desc: 'Successfully delivered the second phase of a modern residential complex, adding 30 new luxury apartment units to meet growing demand.',
  meta: [{ label: 'Units', val: '30 Apartments' }, { label: 'Location', val: 'Urban Accra' }, { label: 'Features', val: 'Smart Home Ready' }]
},
{
  img: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1776422246/abz_3_hp78qi.jpg',
  alt: 'Office Supply',
  badge: 'Procurement',
  title: 'Office Furniture & IT Equipment Supply',
  desc: "Managed the complete procurement and installation of office furniture and IT infrastructure for a new corporate client\'s headquarters.",
  meta: [{ label: 'Type', val: 'Office Fit-out' }, { label: 'Items', val: 'Furniture & IT' }, { label: 'Cost', val: 'Optimized by 12%' }]
},
{
  img: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777223498/medb_kngcnc.jpg',
  alt: 'Integrated Campaign',
  badge: 'Marketing',
  title: 'Integrated Campaign for Local Retailer',
  desc: 'Orchestrated a multi-channel campaign for a local retailer, combining social media advertising, and local media outreach.',
  meta: [{ label: 'Sector', val: 'Retail' }, { label: 'Channels', val: 'Digital & OOH' }, { label: 'Sales', val: '+25% increase' }]
}];


const teamMembers = [
{
  id: 'christiana',
  img: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777112403/CHRISTIANA_pmwgsx.jpg',
  name: 'Christiana',
  role: 'Founder & CEO',
  bio: 'Over 20 years of industry experience excelling in Advertising, Marketing, and Business Management.',
  fullBio: 'Christiana is the Founder and CEO of SMIC360 Limited. With over 20 years of industry experience, she has excelled in Advertising, Marketing, Business Management, and Hospitality. She also serves as the Managing Director of Moonlight Shipping, Facility Manager of Christie\'s Homestay, Project Manager of The Phoenix Enclave, and Business Manager for Eagle EL Salt Ghana Limited and Osabusquare.'
},
{
  id: 'alberta',
  img: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777112403/ALBERTA_jbrc1f.jpg',
  name: 'Alberta',
  role: 'Finance Manager',
  bio: 'Strategic insight and financial acumen with an MBA in Finance from UGBS and 9+ years of experience.',
  fullBio: 'Alberta holds a background in Sociology & Linguistics and an MBA in Finance from UGBS. She brings a unique blend of strategic insight and financial acumen to SMIC360. With over nine years of experience in administration and finance, she ensures the seamless execution of all projects, oversees financial operations, and manages budgeting to guarantee the company\'s financial health.'
},
{
  id: 'samuel',
  img: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777112169/NII-BOYE_mixzve.jpg',
  name: 'Samuel',
  role: 'Creative & Production Manager',
  bio: 'Creative lead with 15+ years of experience crafting visually captivating and impactful marketing campaigns.',
  fullBio: 'Samuel is a dynamic Creative & Production Manager with over 15 years of experience and a BFA in Publishing. He leads the creative team in delivering innovative and impactful marketing solutions. Leveraging his deep expertise in design and creative direction, Samuel crafts visually captivating campaigns that resonate with target audiences and effectively drive client success.'
}];


const testimonials = [
{
  text: '"SMIC360 transformed our brand from a regional player to a nationally recognised name. Their strategic approach and creative execution were exceptional — we saw a 40% increase in brand recall within three months."',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
  name: 'Kofi Agyemang',
  company: 'CEO, Agyemang Foods Ltd'
},
{
  text: '"The procurement team at SMIC360 saved us 22% on our annual supply budget without compromising quality. Their vendor network and negotiation skills are truly world-class for a Ghanaian firm."',
  avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&q=80',
  name: 'Ama Darkwa',
  company: 'Operations Director, BuildRight Ghana'
},
{
  text: '"Investing in a unit at the Phoenix Enclave was one of the best decisions we made. The quality of construction, the location, and the SMIC360 team\'s support throughout the process were all outstanding."',
  avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
  name: 'Emmanuel Osei-Bonsu',
  company: 'Property Investor, Accra'
},
{
  text: '"SMIC360 transformed our brand from a regional player to a nationally recognised name. Their strategic approach and creative execution were exceptional."',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
  name: 'Kofi Agyemang',
  company: 'CEO, Agyemang Foods Ltd'
},
{
  text: '"The procurement team at SMIC360 saved us 22% on our annual supply budget without compromising quality. Truly world-class."',
  avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&q=80',
  name: 'Ama Darkwa',
  company: 'Operations Director, BuildRight Ghana'
},
{
  text: '"Investing in a unit at the Phoenix Enclave was one of the best decisions we made. Outstanding support throughout the process."',
  avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
  name: 'Emmanuel Osei-Bonsu',
  company: 'Property Investor, Accra'
}];


export default function HomePage() {
  const [bookOpen, setBookOpen] = useState(false);
  const [teamModal, setTeamModal] = useState < (typeof teamMembers)?.[0] | null > null;

  return (
    <>
      <ScrollReveal />
      <Topbar />
      <Navbar onBookClick={() => setBookOpen(true)} />
      <BookingModal isOpen={bookOpen} onClose={() => setBookOpen(false)} />
      {/* Team Modal */}
      {teamModal &&
      <div className="modal open" onClick={(e) => {if (e?.target === e?.currentTarget) setTeamModal(null);}}>
          <div className="modal-content" style={{ maxWidth: '650px' }}>
            <button className="modal-close" onClick={() => setTeamModal(null)}>✕</button>
            <div className="modal-team-flex">
              <img src={teamModal?.img} alt={teamModal?.name} />
              <div className="modal-team-info">
                <h3 className="oswald">{teamModal?.name}</h3>
                <div className="modal-team-role">{teamModal?.role}</div>
                <div className="modal-social-flex">
                  <a href="#" className="modal-social-btn">in</a>
                  <a href="#" className="modal-social-btn">ig</a>
                  <a href="#" className="modal-social-btn">tw</a>
                </div>
              </div>
            </div>
            <div className="modal-team-bio">{teamModal?.fullBio}</div>
          </div>
        </div>
      }
      {/* Hero Slider */}
      <HeroSlider onBookClick={() => setBookOpen(true)} />
      {/* Services Ribbon */}
      <div className="ribbon">
        <div className="wrap">
          <div className="ribbon-head">
            <span className="ribbon-head-label">Our Three Main Services</span>
            <Link href="/solutions" className="btn btn-outline" style={{ fontSize: '12px', padding: '8px 16px' }}>View All Solutions →</Link>
          </div>
          <div className="ribbon-grid stagger">
            <Link href="/solutions" className="ribbon-card">
              <div className="ribbon-card-icon">📣</div>
              <div className="ribbon-card-text">
                <h4>Advertising &amp; Marketing Solutions</h4>
                <p>360 Marketing &amp; Branding Solutions for your brand and business.</p>
                <span className="ribbon-card-link">Learn More →</span>
              </div>
            </Link>
            <Link href="/solutions" className="ribbon-card">
              <div className="ribbon-card-icon">🏗️</div>
              <div className="ribbon-card-text">
                <h4>Real Estate Development</h4>
                <p>A mini gated community strategically developed in a serene and secured locality.</p>
                <span className="ribbon-card-link">Learn More →</span>
              </div>
            </Link>
            <Link href="/solutions" className="ribbon-card">
              <div className="ribbon-card-icon">📦</div>
              <div className="ribbon-card-text">
                <h4>Procurement &amp; Supply Services</h4>
                <p>Tailormade Procurement and supply services designed to give you value for money.</p>
                <span className="ribbon-card-link">Learn More →</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
      {/* Clients Logos */}
      <div className="clients">
        <div className="wrap">
          <div className="clients-label">Trusted By Leading Organisations Across Ghana</div>
          <div className="clients-marquee">
            <div className="clients-track">
              {[...clientLogos, ...clientLogos]?.map((logo, i) =>
              <div key={i} className="client-logo">
                  <img src={logo?.src} alt={logo?.alt} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Case Studies */}
      <section className="cases">
        <div className="wrap">
          <div style={{ textAlign: 'center' }} className="reveal">
            <span className="tag" style={{ justifyContent: 'center' }}>Success Stories</span>
            <h2 className="section-title">Our Finished <em>Processes</em></h2>
            <p className="section-sub" style={{ margin: '12px auto 0', textAlign: 'center' }}>Explore how we provide integrated solutions across our diverse service pillars.</p>
          </div>
          <div className="cases-marquee">
            <div className="cases-track">
              {[...caseStudies, ...caseStudies]?.map((c, i) =>
              <div key={i} className="case-card">
                  <div className="case-img"><img src={c?.img} alt={c?.alt} /></div>
                  <span className="tag">{c?.tag}</span>
                  <h3>{c?.title}</h3>
                  <p>{c?.desc}</p>
                  <div className="case-solution"><strong>Solution:</strong> {c?.solution}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      {/* About Section */}
      <section className="about">
        <div className="wrap">
          <div className="about-grid">
            <div className="about-img-wrap reveal-left">
              <img className="about-img-main" src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80" alt="SMIC360 team meeting" />
              <div className="about-badge">
                <span className="about-badge-num">8+</span>
                <span className="about-badge-sub">Years of Excellence</span>
              </div>
            </div>
            <div className="about-text reveal-right">
              <span className="tag">Who We Are</span>
              <h2 className="section-title">Dedicated to <em>360° Excellence</em></h2>
              <p className="section-sub">
                SMIC360 Limited is a Ghanaian multi-sector company built on one conviction:
                great businesses deserve great partners. We integrate marketing brilliance,
                real estate development, and smart procurement into one seamless ecosystem
                — so you spend less time managing vendors and more time scaling.
              </p>
              <p className="section-sub" style={{ marginTop: '10px' }}>
                From crafting bold brand identities to delivering the Phoenix Enclave and
                sourcing mission-critical supplies, every service we offer carries the same
                standard of care: meticulous, transparent, and results-driven.
              </p>
              <div className="about-points">
                {[
                { icon: '🎯', title: 'Strategy First', desc: 'Every solution starts with a tailored strategy built around your goals.' },
                { icon: '🤝', title: 'Client-Centric', desc: 'We are always available — your success is our benchmark.' },
                { icon: '🏆', title: 'Proven Track Record', desc: '150+ projects across marketing, real estate and supply chains.' },
                { icon: '🌍', title: 'Ghana-Rooted, Pan-African', desc: 'Built in Accra with a vision that extends across the continent.' }]?.
                map((pt, i) =>
                <div key={i} className="apoint">
                    <div className="apoint-icon">{pt?.icon}</div>
                    <div>
                      <h4>{pt?.title}</h4>
                      <p>{pt?.desc}</p>
                    </div>
                  </div>
                )}
              </div>
              <div style={{ marginTop: '28px', display: 'flex', gap: '12px' }}>
                <Link href="/about" className="btn btn-primary">Our Story</Link>
                <Link href="/about" className="btn btn-outline">Meet The Team</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Comparison Table */}
      <section className="compare">
        <div className="wrap">
          <div style={{ textAlign: 'center' }} className="reveal">
            <span className="tag" style={{ justifyContent: 'center' }}>Why Choose Us</span>
            <h2 className="section-title" style={{ maxWidth: 'none' }}>The <em>SMIC360</em> Difference</h2>
            <p className="section-sub" style={{ margin: '12px auto 0', textAlign: 'center' }}>See how SMIC360 stands apart from typical single-service agencies and vendors.</p>
          </div>
          <div className="compare-table reveal">
            <div className="ct-head">
              <div className="ct-head-cell">Feature</div>
              <div className="ct-head-cell hl">SMIC360</div>
              <div className="ct-head-cell">Typical Agency</div>
              <div className="ct-head-cell">Independent Vendors</div>
            </div>
            {[
            ['360° Multi-Service Coverage', '✔', '✘', '✘', 'yes', 'no', 'no'],
            ['Dedicated Account Manager', '✔', 'Sometimes', '✘', 'yes', 'hl', 'no'],
            ['Real Estate + Marketing + Procurement', '✔', '✘', '✘', 'yes', 'no', 'no'],
            ['Ghana-Based Local Expertise', '✔', 'Varies', 'Varies', 'yes', 'hl', 'hl'],
            ['Value-For-Money Procurement', '✔', '✘', 'Sometimes', 'yes', 'no', 'hl'],
            ['Transparent Reporting & Delivery', '✔', 'Varies', '✘', 'yes', 'hl', 'no']]?.
            map(([label, c1, c2, c3, cls1, cls2, cls3], i) =>
            <div key={i} className="ct-row">
                <div className="ct-row-label">{label}</div>
                <div className={`ct-cell ${cls1}`}>{c1}</div>
                <div className={`ct-cell ${cls2}`}>{c2}</div>
                <div className={`ct-cell ${cls3}`}>{c3}</div>
              </div>
            )}
          </div>
        </div>
      </section>
      {/* Featured - Phoenix Enclave */}
      <section className="featured">
        <div className="wrap">
          <div className="feat-grid">
            <div className="feat-img reveal-left">
              <img src="https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777111208/WhatsApp-Image-2025-08-18-at-14.16.35_e93040d9l_gwfnmu.jpg" alt="Phoenix Enclave Real Estate" />
              <div className="feat-img-caption">
                <h3>The Phoenix Enclave</h3>
                <p>A modern mini gated community — serene, secured, and strategically located.</p>
              </div>
            </div>
            <div className="reveal-right">
              <span className="tag">Flagship Development</span>
              <h2 className="section-title">Built for <em>Ghana</em></h2>
              <p className="section-sub">
                The Phoenix Enclave is SMIC360’s premier real estate offering —
                thoughtfully designed residential and commercial spaces built with
                modern architecture and premium finishes for the Ghanaian market.
              </p>
              <div className="feat-items">
                {[
                { icon: '🏡', title: 'Gated & Secured Community', desc: '24/7 security, controlled access, and a peaceful neighbourhood environment for families and professionals.' },
                { icon: '🏛️', title: 'Modern Architecture', desc: 'Contemporary designs that blend aesthetics with functionality — built to last and built to impress.' },
                { icon: '📍', title: 'Strategic Location', desc: "Positioned in a serene locality with convenient access to Accra's key commercial and social hubs." },
                { icon: '💼', title: 'Investment Opportunity', desc: "High ROI potential in one of Ghana's fastest-growing real estate corridors — for homebuyers and investors alike." }]?.
                map((item, i) =>
                <div key={i} className="feat-item">
                    <div className="feat-item-icon">{item?.icon}</div>
                    <div>
                      <h4>{item?.title}</h4>
                      <p>{item?.desc}</p>
                    </div>
                  </div>
                )}
              </div>
              <div style={{ marginTop: '28px', display: 'flex', gap: '12px' }}>
                <Link href="/solutions" className="btn btn-primary">Explore The Enclave</Link>
                <Link href="/contact" className="btn btn-outline">Request Details</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Capabilities */}
      <section className="capabilities">
        <div className="wrap">
          <div style={{ textAlign: 'center' }} className="reveal">
            <span className="tag" style={{ justifyContent: 'center' }}>What We Do Best</span>
            <h2 className="section-title">Our three main <em>Services</em></h2>
          </div>
          <div className="cap-grid stagger">
            {[
            { img: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777114247/kkkl_nhdczf.avif', alt: 'Brand Strategy', title: 'Advertising & Marketing Solutions', desc: '360 Marketing & Branding Solutions for your brand and business.', href: '/solutions' },
            { img: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777111208/WhatsApp-Image-2025-08-18-at-14.16.35_e93040d9l_gwfnmu.jpg', alt: 'Real Estate', title: 'Real Estate Development', desc: 'A mini gated community strategically developed in a serene and secured locality.', href: '/solutions' },
            { img: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777110562/A-Guide-to-Media-Buying-Definition-Importance-Impact-and-Benefits-scaled-copy_uidwzc.jpg', alt: 'Procurement', title: 'Procurement & Supply Services', desc: 'Tailormade Procurement and supply services designed to give you value for money.', href: '/solutions' }]?.
            map((cap, i) =>
            <div key={i} className="cap-card">
                <div className="cap-img"><img src={cap?.img} alt={cap?.alt} /></div>
                <div className="cap-body">
                  <h3>{cap?.title}</h3>
                  <p>{cap?.desc}</p>
                  <Link href={cap?.href} className="btn btn-outline" style={{ marginTop: '20px', width: '100%', justifyContent: 'center' }}>Learn More</Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      {/* CTA Banner */}
      <div className="cta-banner">
        <div className="cta-inner">
          <div>
            <span className="tag" style={{ color: 'var(--cyan)' }}>
              <span style={{ display: 'block', width: '22px', height: '2px', background: 'var(--cyan)', borderRadius: '2px' }}></span>
              2025 Service Catalogue
            </span>
            <h2 className="cta-title">Scale Your Business<br />with Our <em>2025 Catalogue</em></h2>
            <p className="cta-sub">
              Download the full SMIC360 solutions catalogue — complete service listings,
              pricing tiers, real estate specs, and procurement frameworks all in one place.
            </p>
          </div>
          <div className="cta-actions">
            <a href="#" className="btn btn-white">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 16l-4-4h3V4h2v8h3l-4 4z"></path>
                <path d="M4 20h16"></path>
              </svg>
              Download Catalogue
            </a>
            <button onClick={() => setBookOpen(true)} className="btn btn-outline-white">Book A Call</button>
          </div>
        </div>
      </div>
      {/* Project Spotlight */}
      <section className="projects">
        <div className="wrap">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }} className="reveal">
            <div>
              <span className="tag">Our Work</span>
              <h2 className="section-title">Project <em>Spotlight</em></h2>
            </div>
            <Link href="/portfolio" className="btn btn-outline" style={{ alignSelf: 'flex-end' }}>View All Projects →</Link>
          </div>
          <div className="proj-grid stagger">
            {projects?.map((proj, i) =>
            <Link key={i} href="/portfolio" className="proj-card">
                <div className="proj-img">
                  <img src={proj?.img} alt={proj?.alt} />
                  <div className="proj-badge">{proj?.badge}</div>
                </div>
                <div className="proj-body">
                  <h3>{proj?.title}</h3>
                  <p>{proj?.desc}</p>
                  <div className="proj-meta">
                    {proj?.meta?.map((m, j) =>
                  <div key={j} className="proj-meta-item">
                        <strong>{m?.label}</strong>
                        {m?.val}
                      </div>
                  )}
                  </div>
                </div>
              </Link>
            )}
          </div>
        </div>
      </section>
      {/* Team */}
      <section className="team">
        <div className="wrap">
          <div style={{ textAlign: 'center' }} className="reveal">
            <span className="tag" style={{ justifyContent: 'center' }}>The People</span>
            <h2 className="section-title">Meet <em>The Experts</em></h2>
            <p className="section-sub" style={{ margin: '12px auto 0', textAlign: 'center' }}>
              A dedicated team of strategists, creatives, engineers, and industry specialists —
              united by one goal: your success.
            </p>
          </div>
          <div className="team-grid stagger">
            {teamMembers?.map((member, i) =>
            <div key={i} className="team-card" onClick={() => setTeamModal(member)}>
                <div className="team-card-socials">
                  <a href="#" className="team-social-icon" onClick={(e) => e?.stopPropagation()}>in</a>
                  <a href="#" className="team-social-icon" onClick={(e) => e?.stopPropagation()}>ig</a>
                </div>
                <div className="team-img">
                  <img src={member?.img} alt={`${member?.name} - ${member?.role}`} />
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
      {/* Testimonials */}
      <section className="testimonials">
        <div className="wrap">
          <div className="testi-head reveal">
            <div>
              <span className="tag">Client Feedback</span>
              <h2 className="section-title">Trusted <em>Across Ghana</em></h2>
            </div>
            <p style={{ fontSize: '14px', color: 'var(--muted)', maxWidth: '280px', textAlign: 'right', lineHeight: '1.6' }}>
              Real results. Real clients. Real growth stories from businesses across Ghana.
            </p>
          </div>
          <div className="testi-marquee">
            <div className="testi-track">
              {testimonials?.map((t, i) =>
              <div key={i} className="testi-card">
                  <div className="testi-stars">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" className="google-icon" alt="Google" />
                    ★★★★★
                  </div>
                  <p className="testi-text">{t?.text}</p>
                  <div className="testi-author">
                    <img className="testi-avatar" src={t?.avatar} alt={t?.name} />
                    <div>
                      <div className="testi-author-name">{t?.name}</div>
                      <div className="testi-author-co">{t?.company}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      {/* Headquarters */}
      <section className="hq">
        <div className="wrap">
          <div className="hq-grid">
            <div className="reveal-left">
              <span className="tag">Where To Find Us</span>
              <h2 className="section-title">Our <em>Headquarters</em></h2>
              <p className="section-sub">
                We are based in the heart of Accra and always available to serve you.
                Walk in, call us, or drop us a message — we respond fast.
              </p>
              <div className="hq-details">
                {[
                { icon: '📍', title: 'Office Address', desc: '123 Independence Avenue, North Ridge, Accra — Greater Accra, Ghana' },
                { icon: '📞', title: 'Phone', desc: '024 478 3099 — We are always available to serve you' },
                { icon: '✉️', title: 'Email', desc: 'info@smic360.com — Expect a reply within 2 business hours' },
                { icon: '🕐', title: 'Office Hours', desc: 'Monday – Friday: 8:00 AM – 6:00 PM | Saturday: 9:00 AM – 2:00 PM' }]?.
                map((item, i) =>
                <div key={i} className="hq-detail-item">
                    <div className="hq-detail-icon">{item?.icon}</div>
                    <div className="hq-detail-text">
                      <h4>{item?.title}</h4>
                      <p>{item?.desc}</p>
                    </div>
                  </div>
                )}
              </div>
              <a href="#" className="btn btn-primary" style={{ marginTop: '24px' }}>Get Directions</a>
            </div>
            <div className="reveal-right">
              <div className="hq-map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d63528.36050131504!2d-0.076514!3d5.637253!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf8402e54ac0bd%3A0x37c47d7434f4203c!2sSMIC360%20LIMITED!5e0!3m2!1sen!2sus!4v1777199771968!5m2!1sen!2sus"
                  width="600" height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="SMIC360 Location">
                </iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Consultation CTA */}
      <section className="consult">
        <div className="consult-inner reveal">
          <span className="tag">Let&apos;s Work Together</span>
          <h2 className="consult-title">Get A <em>Free Consultation</em></h2>
          <p className="consult-sub">
            Tell us about your business challenge. Whether it&apos;s a brand refresh, a property
            investment, or a procurement need — our team will put together a bespoke solution
            for you within 24 hours.
          </p>
          <div className="consult-form">
            <input type="email" placeholder="Enter your email address" />
            <button className="btn btn-primary">Get Started →</button>
          </div>
          <p style={{ marginTop: '14px', fontSize: '12px', color: 'rgba(255,255,255,.35)' }}>
            Or call us directly: <a href="tel:0244783099" style={{ color: 'var(--cyan)', fontWeight: 600 }}>024 478 3099</a> — No obligation, no spam.
          </p>
        </div>
      </section>
      <Footer onBookClick={() => setBookOpen(true)} />
      <ChatPanel />
      {/* Scroll to top */}
      <ScrollTopButton />
    </>);

}

function ScrollTopButton() {
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > document.documentElement?.scrollHeight / 2);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <div
      className={`scroll-top${show ? ' show' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>

      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 15l-6-6-6 6"></path>
      </svg>
    </div>);

}