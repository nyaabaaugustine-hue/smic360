'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Topbar from '@/components/Topbar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';
import ScrollReveal from '@/components/ScrollReveal';

const sections = [
  {
    title: '1. Acceptance of Terms',
    body: `By accessing or using the SMIC360 Limited website and services, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not use our services.`,
  },
  {
    title: '2. Services',
    body: `SMIC360 Limited provides Advertising & Marketing, Real Estate Development, and Procurement & Supply Chain services. The specific scope, deliverables, timeline, and fees for each engagement are defined in a separate Service Agreement or Proposal agreed upon by both parties.`,
  },
  {
    title: '3. Intellectual Property',
    body: `All content on this website — including text, graphics, logos, and images — is the property of SMIC360 Limited and is protected by Ghanaian and international copyright laws. Creative work produced for clients becomes the property of the client upon full payment unless otherwise agreed in writing.`,
  },
  {
    title: '4. Client Obligations',
    body: `Clients agree to provide accurate information, timely feedback, and any materials needed to deliver the agreed services. Delays caused by client actions may affect project timelines and may be subject to additional charges as outlined in the Service Agreement.`,
  },
  {
    title: '5. Payment Terms',
    body: `Payment terms are as outlined in each project proposal or Service Agreement. SMIC360 reserves the right to pause or discontinue services where payments are overdue by more than 14 days after the agreed due date, without prejudice to any amounts owed.`,
  },
  {
    title: '6. Limitation of Liability',
    body: `To the maximum extent permitted by law, SMIC360 Limited shall not be liable for any indirect, incidental, or consequential damages arising out of the use of our services. Our total liability in any matter relating to a specific service engagement shall not exceed the total fees paid for that engagement.`,
  },
  {
    title: '7. Confidentiality',
    body: `Both parties agree to treat all proprietary business information shared during an engagement as confidential and not to disclose it to third parties without prior written consent, except as required by law.`,
  },
  {
    title: '8. Termination',
    body: `Either party may terminate a service agreement by giving 14 days written notice. In such cases, the client is liable for all work completed up to the termination date. SMIC360 may terminate immediately in cases of material breach or non-payment.`,
  },
  {
    title: '9. Governing Law',
    body: `These Terms of Service are governed by the laws of the Republic of Ghana. Any disputes arising from these terms or our services shall be subject to the exclusive jurisdiction of the courts of Ghana.`,
  },
  {
    title: '10. Changes to These Terms',
    body: `We reserve the right to modify these Terms at any time. Updated terms will be posted on this page with a new effective date. Continued use of our services following any changes constitutes your acceptance of the new terms.`,
  },
];

export default function TermsPage() {
  const [bookOpen, setBookOpen] = useState(false);

  return (
    <>
      <ScrollReveal />
      <Topbar />
      <Navbar onBookClick={() => setBookOpen(true)} />
      <BookingModal isOpen={bookOpen} onClose={() => setBookOpen(false)} />

      <div className="page-hero">
        <div className="page-hero-inner">
          <div className="page-hero-tag">Legal</div>
          <h1>Terms of <em>Service</em></h1>
          <p>Effective Date: January 1, 2025 &nbsp;|&nbsp; Last Updated: April 2025</p>
        </div>
      </div>

      <section style={{ padding: '80px 0', background: 'var(--white)' }}>
        <div className="wrap" style={{ maxWidth: '820px' }}>
          <p style={{ fontSize: '16px', color: 'var(--muted)', lineHeight: 1.8, marginBottom: '44px', padding: '20px 24px', background: 'var(--off)', borderLeft: '4px solid var(--gold)', borderRadius: '0 var(--r) var(--r) 0' }}>
            Please read these Terms of Service carefully before engaging SMIC360 Limited for any services. These terms form a binding legal agreement between you and SMIC360 Limited, a company registered under the laws of Ghana.
          </p>
          {sections.map((sec, i) => (
            <div key={i} style={{ marginBottom: '36px' }}>
              <h2 style={{ fontFamily: 'Oswald,sans-serif', fontSize: '20px', fontWeight: 700, color: 'var(--navy)', marginBottom: '10px' }}>
                {sec.title}
              </h2>
              <p style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: 1.8 }}>
                {sec.body}
              </p>
            </div>
          ))}
          <div style={{ marginTop: '48px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/privacy" className="btn btn-outline">Privacy Policy</Link>
            <Link href="/contact" className="btn btn-primary">Contact Us</Link>
          </div>
        </div>
      </section>

      <Footer onBookClick={() => setBookOpen(true)} />
    </>
  );
}
