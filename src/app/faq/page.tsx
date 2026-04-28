'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Topbar from '@/components/Topbar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';
import ChatPanel from '@/components/ChatPanel';
import ScrollReveal from '@/components/ScrollReveal';

const faqs = [
  {
    category: 'General',
    items: [
      {
        q: 'What is SMIC360 Limited?',
        a: 'SMIC360 Limited is a Ghanaian multi-sector business solutions company specialising in three core divisions: Advertising & Marketing, Real Estate Development, and Procurement & Supply Chain Management. We operate as a single integrated partner so clients get seamless, cost-effective solutions under one roof.',
      },
      {
        q: 'Where is SMIC360 based?',
        a: 'Our head office is at 1st Floor, Verostina House, Opposite DSTV Office, Community 18, Off Spintex Road, Accra, Ghana. We serve clients across Greater Accra and beyond.',
      },
      {
        q: 'How long has SMIC360 been operating?',
        a: 'SMIC360 has been delivering integrated business solutions for over 10 years, with a track record of 150+ completed projects across marketing, real estate, and procurement.',
      },
    ],
  },
  {
    category: 'Marketing & Branding',
    items: [
      {
        q: 'What marketing services does SMIC360 offer?',
        a: 'We provide a full suite of marketing services including Brand Identity Design, Corporate Branding, Digital Marketing & SEO, Social Media Management, Media Buying & Planning, Print Management, Content Production, and Website Development.',
      },
      {
        q: 'How long does a typical branding project take?',
        a: 'A standard brand identity project (logo, brand guidelines, collateral) typically takes 4–6 weeks. Full 360° campaign launches including digital, print, and media buying can range from 6–16 weeks depending on scope.',
      },
      {
        q: 'Do you work with both startups and established companies?',
        a: 'Absolutely. We work with startups building from scratch as well as established corporates undertaking rebrands. Our process adapts to your stage, budget, and growth objectives.',
      },
    ],
  },
  {
    category: 'Real Estate',
    items: [
      {
        q: 'What is The Phoenix Enclave?',
        a: 'The Phoenix Enclave is SMIC360\'s flagship real estate development — a modern, gated mini-community offering premium residential units in a serene, secured locality in Greater Accra. Phase 1 delivered 24 homes and further phases are underway.',
      },
      {
        q: 'Can I purchase a unit as an investment?',
        a: 'Yes. The Phoenix Enclave is designed for both homebuyers and investors. Units in our development corridor have demonstrated strong capital appreciation and rental yield. Contact us for a full investment brief.',
      },
      {
        q: 'How do I schedule a site visit?',
        a: 'Simply book a consultation using the "Book Us" button on our website, call us at 024 478 3099, or email info@smic360.com. Our real estate team will arrange a guided site visit at your convenience.',
      },
    ],
  },
  {
    category: 'Procurement',
    items: [
      {
        q: 'What types of procurement does SMIC360 handle?',
        a: 'We handle a broad range of procurement needs including industrial equipment, technical consumables, office furniture & IT infrastructure, construction materials, and specialised corporate supplies. We manage the entire sourcing-to-delivery chain.',
      },
      {
        q: 'How does SMIC360 ensure value for money?',
        a: 'Our vendor network spans over 150 pre-vetted suppliers locally and internationally. We use competitive tendering, price benchmarking, and contract negotiation to consistently deliver 15–22% cost savings over standard market rates.',
      },
      {
        q: 'Can you handle urgent or large-scale procurement requests?',
        a: 'Yes. We have managed large-scale state enterprise supply contracts worth millions of cedis and can mobilise quickly for urgent requirements. We recommend reaching out as early as possible so we can allocate the right team resources.',
      },
    ],
  },
  {
    category: 'Working With Us',
    items: [
      {
        q: 'How do I start working with SMIC360?',
        a: 'The easiest way is to book a free consultation. Fill in the booking form on our website, call 024 478 3099, or email info@smic360.com. A member of our team will reach out within 2 business hours to schedule a discovery call.',
      },
      {
        q: 'Do you offer free consultations?',
        a: 'Yes — we offer a complimentary initial consultation where we learn about your business challenges and outline how SMIC360 can help. There is no obligation and no cost.',
      },
      {
        q: 'What are your payment terms?',
        a: 'Payment terms vary by project type and scope. We typically work on a milestone payment structure for larger engagements. Details will be clearly outlined in your proposal and service agreement.',
      },
    ],
  },
];

export default function FAQPage() {
  const [bookOpen, setBookOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const toggle = (key: string) => setOpenIndex(openIndex === key ? null : key);

  return (
    <>
      <ScrollReveal />
      <Topbar />
      <Navbar onBookClick={() => setBookOpen(true)} />
      <BookingModal isOpen={bookOpen} onClose={() => setBookOpen(false)} />

      <div className="page-hero">
        <div className="page-hero-inner">
          <div className="page-hero-tag">Help Centre</div>
          <h1>Frequently Asked <em>Questions</em></h1>
          <p>Everything you need to know about SMIC360 and our services. Can&apos;t find the answer? Contact us directly.</p>
        </div>
      </div>

      <section style={{ padding: '90px 0', background: 'var(--white)' }}>
        <div className="wrap" style={{ maxWidth: '860px' }}>
          {faqs.map((group, gi) => (
            <div key={gi} style={{ marginBottom: '52px' }}>
              <h2 style={{ fontFamily: 'Oswald,sans-serif', fontSize: '22px', fontWeight: 700, color: 'var(--navy)', marginBottom: '20px', paddingBottom: '10px', borderBottom: '2px solid var(--gold)', display: 'inline-block' }}>
                {group.category}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {group.items.map((item, ii) => {
                  const key = `${gi}-${ii}`;
                  const isOpen = openIndex === key;
                  return (
                    <div
                      key={ii}
                      style={{
                        border: `1px solid ${isOpen ? 'var(--gold)' : 'var(--border)'}`,
                        borderRadius: 'var(--r)',
                        overflow: 'hidden',
                        transition: 'border-color .2s',
                        boxShadow: isOpen ? 'var(--sh)' : 'none',
                      }}
                    >
                      <button
                        onClick={() => toggle(key)}
                        style={{
                          width: '100%',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '18px 22px',
                          background: isOpen ? 'var(--off)' : 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          textAlign: 'left',
                          gap: '16px',
                          transition: 'background .2s',
                        }}
                      >
                        <span style={{ fontFamily: 'Oswald,sans-serif', fontWeight: 600, fontSize: '16px', color: 'var(--navy)', lineHeight: 1.3 }}>
                          {item.q}
                        </span>
                        <span style={{ fontSize: '20px', color: 'var(--gold-d)', flexShrink: 0, transition: 'transform .2s', transform: isOpen ? 'rotate(45deg)' : 'none', fontWeight: 300 }}>+</span>
                      </button>
                      {isOpen && (
                        <div style={{ padding: '0 22px 20px', fontSize: '15px', color: 'var(--muted)', lineHeight: 1.75 }}>
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Still have questions */}
          <div style={{ background: 'var(--navy)', borderRadius: 'var(--r-lg)', padding: '40px 36px', textAlign: 'center', marginTop: '20px' }}>
            <h3 style={{ fontFamily: 'Oswald,sans-serif', fontSize: '26px', color: '#fff', marginBottom: '10px' }}>
              Still have a question?
            </h3>
            <p style={{ color: 'rgba(255,255,255,.55)', fontSize: '15px', marginBottom: '24px' }}>
              Our team is available Monday–Friday, 8AM–6PM. We&apos;ll get back to you within 2 business hours.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => setBookOpen(true)} className="btn btn-primary">Book A Consultation</button>
              <Link href="/contact" className="btn btn-outline-white">Send Us a Message</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer onBookClick={() => setBookOpen(true)} />
      <ChatPanel />
    </>
  );
}
