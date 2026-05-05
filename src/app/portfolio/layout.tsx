import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Portfolio — Proven Results Across Marketing, Real Estate & Procurement | SMIC360',
  description: 'Explore 150+ completed projects by SMIC360 Limited — national brand relaunches, real estate developments, industrial procurement, and integrated campaigns delivering measurable results.',
  openGraph: {
    title: 'SMIC360 Portfolio — 150+ Projects Delivered',
    description: 'Case studies across Marketing, Real Estate, and Procurement — real results for real clients.',
    url: 'https://www.smic360.com/portfolio',
    images: [{ url: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777199309/VCC_dl6ehf.jpg', width: 1200, height: 630, alt: 'SMIC360 Portfolio' }],
  },
};
export default function PortfolioLayout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
