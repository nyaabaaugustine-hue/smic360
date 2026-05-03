import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our SDGs — Sustainability & Global Impact | SMIC360 Limited',
  description: 'SMIC360 Limited aligns its business with the United Nations Sustainable Development Goals — Gender Equality (SDG 5), Decent Work & Economic Growth (SDG 8), and Industry, Innovation & Infrastructure (SDG 9).',
  keywords: ['SDGs Ghana', 'sustainable development goals', 'SMIC360 sustainability', 'gender equality business Ghana', 'UN SDGs Africa', 'responsible business Ghana'],
  openGraph: {
    title: 'Our SDGs — SMIC360 Commitment to Global Goals',
    description: 'As a woman-owned company in Ghana, SMIC360 is committed to Gender Equality, Decent Work, and Industry Innovation — aligned with the United Nations SDGs.',
    url: 'https://www.smic360.com/sdgs',
    images: [{ url: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777800989/Sustainable_Development_Goal_05GenderEquality.svg_wn3i55.png', width: 1200, height: 630, alt: 'SMIC360 SDGs' }],
  },
};

export default function SDGsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
