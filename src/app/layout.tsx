import React from 'react';
import type { Metadata, Viewport } from 'next';
import '../styles/index.css';
import '../styles/tailwind.css';
import CookieBanner from '@/components/CookieBanner';
import LoaderWrapper from '@/components/LoaderWrapper';
import { LanguageProvider } from '@/context/LanguageContext';

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
    'SMIC360 Limited: A world-class multi-sector company delivering Strategic Marketing & Advertising, Real Estate Development (Phoenix Enclave), and Precision Procurement. Headquartered in Accra, Ghana — serving businesses globally.',
  keywords: [
    'SMIC360',
    'marketing agency',
    'real estate development',
    'procurement services',
    'Phoenix Enclave Accra',
    'branding agency',
    'corporate branding',
    'media buying',
    'advertising agency Ghana',
    'global business solutions',
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
        url: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777107241/cropped-SMIC-01-180x180_pffxe7.jpg',
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
    images: ['https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777107241/cropped-SMIC-01-180x180_pffxe7.jpg'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'SMIC360 Limited',
  url: 'https://www.smic360.com',
  logo: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777107241/cropped-SMIC-01-180x180_pffxe7.jpg',
  description:
    'A world-class multi-sector company delivering Strategic Marketing, Real Estate, and Procurement solutions globally.',
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
        <script dangerouslySetInnerHTML={{__html: `
          (function() {
            var theme = localStorage.getItem('smic-theme');
            if (theme === 'light') {
              document.documentElement.setAttribute('data-theme', 'light');
            }
          })();
        `}} />
      </head>
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
        {/* Google Analytics - Replace G-XXXXXXX with your Measurement ID */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" />
        <script dangerouslySetInnerHTML={{__html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XXXXXXXXXX');
        `}} />
      </head>
      <body>
        <style dangerouslySetInnerHTML={{__html: `
          body { background: #040e1d; }
          .page-root { opacity: 0; transition: opacity 0.3s; }
          body.smic-loaded .page-root { opacity: 1; }
          [data-theme="light"] { --bg-primary: #f5f7fa; --bg-secondary: #ffffff; --text-primary: #1a1a2e; --text-secondary: #4a4a6a; }
        `}} />
        <LanguageProvider>
          <LoaderWrapper />
          <div className="page-root">{children}</div>
          <CookieBanner />
        </LanguageProvider>
        <script dangerouslySetInnerHTML={{__html: `
          window.addEventListener('load', function() {
            setTimeout(function() { document.body.classList.add('smic-loaded'); }, 800);
          });
        `}} />
      </body>
    </html>
  );
}
