import React from 'react';
import type { Metadata, Viewport } from 'next';
import '../styles/index.css';
import '../styles/tailwind.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1
};

export const metadata: Metadata = {
  title: 'SMIC360 — Building Foundations. Branding Futures. Connecting Markets.',
  description: 'SMIC360 Limited: Ghana\'s leading multi-sector partner for Strategic Marketing, Real Estate Development (Phoenix Enclave), and Precision Procurement.',
  icons: {
    icon: [
    { url: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777107241/cropped-SMIC-01-180x180_pffxe7.jpg', type: 'image/jpeg' }]

  }
};

export default function RootLayout({
  children

}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

        <script type="module" async src="https://static.rocket.new/rocket-web.js?_cfg=https%3A%2F%2Fsmic3609178back.builtwithrocket.new&_be=https%3A%2F%2Fappanalytics.rocket.new&_v=0.1.18" />
        <script type="module" defer src="https://static.rocket.new/rocket-shot.js?v=0.0.2" /></head>
      <body>{children}</body>
    </html>);

}