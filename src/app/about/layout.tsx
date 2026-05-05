import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'About Us — Our Story, Team & Values | SMIC360 Limited',
  description: 'Learn about SMIC360 Limited — a world-class multi-sector company founded in 2006, delivering Marketing, Real Estate, and Procurement excellence globally. Meet our team and discover our values.',
  openGraph: {
    title: 'About SMIC360 — Building Foundations. Branding Futures.',
    description: 'Founded in 2006. Woman-owned. 20+ years of excellence across Marketing, Real Estate, and Procurement. Headquartered in Accra, Ghana.',
    url: 'https://www.smic360.com/about',
    images: [{ url: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777112403/CHRISTIANA_pmwgsx.jpg', width: 1200, height: 630, alt: 'SMIC360 Team' }],
  },
};
export default function AboutLayout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
