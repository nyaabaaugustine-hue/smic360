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
    title: '1. Information We Collect',
    body: `We collect information you provide directly to us, including your name, email address, phone number, and any messages you send through our contact or booking forms. We may also collect technical information such as your IP address, browser type, and pages visited through standard web analytics.`,
  },
  {
    title: '2. How We Use Your Information',
    body: `We use the information we collect to respond to your enquiries, process consultation bookings, send you relevant updates about our services (with your consent), improve our website experience, and comply with our legal obligations. We do not sell your personal data to third parties.`,
  },
  {
    title: '3. Sharing of Information',
    body: `We may share your information with trusted service providers who assist us in operating our website or delivering our services (such as email platforms or CRM tools), provided they agree to keep your information confidential. We may disclose information if required by law or to protect our rights.`,
  },
  {
    title: '4. Data Retention',
    body: `We retain personal data only for as long as necessary to fulfil the purposes for which it was collected, or as required by applicable law. Consultation and contact form submissions are retained for up to 24 months, after which they are securely deleted.`,
  },
  {
    title: '5. Cookies',
    body: `Our website uses cookies to enhance your browsing experience and gather analytics data. You can disable cookies in your browser settings at any time. Note that some features of our website may not function correctly without cookies.`,
  },
  {
    title: '6. Your Rights',
    body: `You have the right to access, correct, or delete any personal information we hold about you. To exercise these rights, please contact us at info@smic360.com. We will respond to your request within 14 business days.`,
  },
  {
    title: '7. Security',
    body: `We implement industry-standard security measures to protect your personal data from unauthorised access, disclosure, or alteration. However, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.`,
  },
  {
    title: '8. Changes to This Policy',
    body: `We may update this Privacy Policy from time to time. When we do, we will update the effective date at the top of this page. We encourage you to review this policy periodically to stay informed about how we protect your information.`,
  },
  {
    title: '9. Contact Us',
    body: `If you have questions about this Privacy Policy or our data practices, please contact:\n\nSMIC360 Limited\n1st Floor, Verostina House, Opp. DSTV Office, Comm. 18, Off Spintex Road, Accra\nEmail: info@smic360.com\nPhone: 024 478 3099`,
  },
];

export default function PrivacyPage() {
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
          <h1>Privacy <em>Policy</em></h1>
          <p>Effective Date: January 1, 2025 &nbsp;|&nbsp; Last Updated: April 2025</p>
        </div>
      </div>

      <section style={{ padding: '80px 0', background: 'var(--white)' }}>
        <div className="wrap" style={{ maxWidth: '820px' }}>
          <p style={{ fontSize: '16px', color: 'var(--muted)', lineHeight: 1.8, marginBottom: '44px', padding: '20px 24px', background: 'var(--off)', borderLeft: '4px solid var(--gold)', borderRadius: '0 var(--r) var(--r) 0' }}>
            SMIC360 Limited (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your personal information and your right to privacy. This policy explains how we collect, use, and protect data when you visit our website or engage with our services.
          </p>
          {sections.map((sec, i) => (
            <div key={i} style={{ marginBottom: '36px' }}>
              <h2 style={{ fontFamily: 'Oswald,sans-serif', fontSize: '20px', fontWeight: 700, color: 'var(--navy)', marginBottom: '10px' }}>
                {sec.title}
              </h2>
              <p style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: 1.8, whiteSpace: 'pre-line' }}>
                {sec.body}
              </p>
            </div>
          ))}
          <div style={{ marginTop: '48px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/terms" className="btn btn-outline">Terms of Service</Link>
            <Link href="/contact" className="btn btn-primary">Contact Us</Link>
          </div>
        </div>
      </section>

      <Footer onBookClick={() => setBookOpen(true)} />
    </>
  );
}
