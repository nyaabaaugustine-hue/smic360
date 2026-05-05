import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'FAQ — Answers About Our Services | SMIC360 Limited',
  description: 'Answers to your questions about SMIC360 — our Marketing, Real Estate, and Procurement services, how to work with us, payment terms, and more.',
  openGraph: {
    title: 'SMIC360 FAQ — Everything You Need to Know',
    description: 'Get answers about SMIC360 services, our process, payment terms, and how to get started.',
    url: 'https://www.smic360.com/faq',
  },
};
export default function FAQLayout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
