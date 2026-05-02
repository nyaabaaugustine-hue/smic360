import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Phoenix Enclave — Premium Gated Homes in Accra | SMIC360',
  description: 'The Phoenix Enclave: 3-unit luxury 4.5-bedroom gated townhomes at Community 20, Lashibi, Spintex Road, Accra. From $250,000. Flexible payment plans available.',
  keywords: ['Phoenix Enclave Accra', 'houses for sale Ghana', 'real estate Accra', 'gated community Spintex', 'SMIC360 real estate', 'buy house Accra', 'property Ghana'],
  openGraph: {
    title: 'The Phoenix Enclave — Premium Gated Townhomes in Accra',
    description: 'Luxury 4.5-bedroom townhomes at Lashibi, off Spintex Road. Secure, serene, and competitively priced. Flexible 3–12 month payment plans.',
    url: 'https://www.smic360.com/the-phoenix-enclave',
    images: [{ url: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777111208/WhatsApp-Image-2025-08-18-at-14.16.35_e93040d9l_gwfnmu.jpg', width: 1200, height: 630, alt: 'The Phoenix Enclave Accra' }],
  },
};

export default function PhoenixEnclaveLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
