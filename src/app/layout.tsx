import React from 'react';
import type { Metadata, Viewport } from 'next';
import '../styles/index.css';
import '../styles/tailwind.css';
import CookieBanner from '@/components/CookieBanner';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: 'SMIC360 — Building Foundations. Branding Futures. Connecting Markets.',
    template: '%s | SMIC360 Limited',
  },
  description:
    "SMIC360 Limited: Ghana's leading multi-sector partner for Strategic Marketing, Real Estate Development (Phoenix Enclave), and Precision Procurement. Based in Accra, serving businesses across Ghana.",
  keywords: [
    'SMIC360',
    'Ghana marketing agency',
    'real estate Ghana',
    'procurement Ghana',
    'Phoenix Enclave Accra',
    'branding Ghana',
    'media buying Ghana',
  ],
  authors: [{ name: 'SMIC360 Limited', url: 'https://www.smic360.com' }],
  creator: 'SMIC360 Limited',
  publisher: 'SMIC360 Limited',
  metadataBase: new URL('https://www.smic360.com'),
  robots: { index: true, follow: true },
  icons: {
    icon: [
      {
        url: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777107241/cropped-SMIC-01-180x180_pffxe7.jpg',
        type: 'image/jpeg',
      },
    ],
    apple: [
      {
        url: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777107241/cropped-SMIC-01-180x180_pffxe7.jpg',
      },
    ],
  },
  openGraph: {
    title: 'SMIC360 — Building Foundations. Branding Futures.',
    description: "Ghana's leading partner for Strategic Marketing, Real Estate, and Procurement.",
    url: 'https://www.smic360.com',
    siteName: 'SMIC360 Limited',
    images: [
      {
        url: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777114247/kkkl_nhdczf.avif',
        width: 1200,
        height: 630,
        alt: 'SMIC360 Limited — Ghana Business Solutions',
      },
    ],
    locale: 'en_GH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SMIC360 — Building Foundations. Branding Futures.',
    description: "Ghana's leading partner for Strategic Marketing, Real Estate, and Procurement.",
    images: ['https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777114247/kkkl_nhdczf.avif'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'SMIC360 Limited',
  url: 'https://www.smic360.com',
  logo: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777107241/cropped-SMIC-01-180x180_pffxe7.jpg',
  description: "Ghana's leading multi-sector business solutions company",
  address: {
    '@type': 'PostalAddress',
    streetAddress: '1st Floor, Verostina House, Opp. DSTV Office, Community 18, Off Spintex Road',
    addressLocality: 'Accra',
    addressCountry: 'GH',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+233244783099',
    contactType: 'customer service',
    availableLanguage: 'English',
  },
  sameAs: [
    'https://web.facebook.com/smic360limited',
    'https://www.instagram.com/explore/locations/1015916517/smic360-limited/',
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,700;1,700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="module"
          async
          src="https://static.rocket.new/rocket-web.js?_cfg=https%3A%2F%2Fsmic3609178back.builtwithrocket.new&_be=https%3A%2F%2Fappanalytics.rocket.new&_v=0.1.18"
        />
        <script type="module" defer src="https://static.rocket.new/rocket-shot.js?v=0.0.2" />
      </head>
      <body><div className="page-root">{children}</div><CookieBanner /></body>
    </html>
  );
}
