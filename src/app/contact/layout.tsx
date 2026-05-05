import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Contact Us — Get In Touch With SMIC360 Limited',
  description: 'Contact SMIC360 Limited — call, email, or visit our Accra office. We respond within 2 business hours. Book a free consultation for Marketing, Real Estate, or Procurement.',
  openGraph: {
    title: 'Contact SMIC360 — We\'d Love to Hear From You',
    description: 'Reach SMIC360 at our Spintex Road office in Accra. Call 024 478 3099 or email info@smic360.com.',
    url: 'https://www.smic360.com/contact',
  },
};
export default function ContactLayout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
