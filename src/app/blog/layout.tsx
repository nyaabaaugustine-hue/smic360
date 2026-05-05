import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Blog & Insights — Marketing, Real Estate & Procurement | SMIC360',
  description: 'Expert insights on marketing strategy, real estate investment, procurement optimisation, and business growth from the SMIC360 team. Actionable intelligence for business leaders.',
  openGraph: {
    title: 'SMIC360 Blog — Expert Business Insights',
    description: 'Marketing strategy, real estate trends, procurement intelligence, and growth insights from the SMIC360 team.',
    url: 'https://www.smic360.com/blog',
    images: [{ url: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777114247/kkkl_nhdczf.avif', width: 1200, height: 630, alt: 'SMIC360 Blog' }],
  },
};
export default function BlogLayout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
