import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Christie's Homestay — Luxury Short-Stay Rentals in Accra | SMIC360",
  description: "Christie's Homestay: Fully furnished luxury apartments on Spintex Road, Accra. Perfect for business travellers, families & holiday stays. Book direct — from $120/night.",
  keywords: ["Christie's Homestay", 'Airbnb Accra', 'short stay rental Accra', 'furnished apartment Ghana', 'holiday rental Accra', 'Spintex Road accommodation', 'SMIC360'],
  openGraph: {
    title: "Christie's Homestay — Premium Furnished Apartments, Accra",
    description: 'Luxury short-stay rentals in Accra. 3 bedrooms, pool, Wi-Fi, AC, airport transfers. From $120/night. Book direct with SMIC360.',
    url: "https://www.smic360.com/christies-homestay",
    images: [{ url: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777742699/1_1_csmex3.jpg', width: 1200, height: 630, alt: "Christie's Homestay Accra" }],
  },
};

export default function ChristiesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
