import MarketingSubPage from '@/components/MarketingSubPage';

export const metadata = { title: 'Print Management | SMIC360 Marketing Solutions' };

export default function PrintManagementPage() {
  return (
    <MarketingSubPage
      badge="Marketing Solutions"
      heroTitle="Print"
      heroEm="Management"
      heroDesc="End-to-end print procurement and management — from design and artwork to production and delivery — with quality assurance at every stage."
      heroImg="https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777106950/ec234641a21a9e03c50b708351c53603_vl5piv.jpg"
      overview="Great print materials still command attention and build credibility in ways digital cannot fully replicate. SMIC360's print management service handles the entire print supply chain — from creative design and press-ready artwork preparation to supplier sourcing, quality management, logistics, and on-time delivery. We work with Ghana's best print vendors and manage all print procurement so you get outstanding quality at the most competitive prices, every time."
      services={[
        { icon: '🖨️', title: 'Large Format Printing', desc: 'Banners, posters, backdrops, vehicle wraps, and large-scale signage for events, retail, and outdoor advertising.' },
        { icon: '📋', title: 'Corporate Stationery', desc: 'Business cards, letterheads, compliment slips, envelopes, and all branded office stationery.' },
        { icon: '📚', title: 'Brochures & Catalogues', desc: 'Product brochures, company profiles, sales catalogues, and annual reports printed to the highest standard.' },
        { icon: '🎁', title: 'Promotional & POS Materials', desc: 'Point-of-sale displays, promotional merchandise, branded gifts, and retail marketing materials.' },
        { icon: '📦', title: 'Packaging & Labels', desc: 'Product packaging, retail boxes, labels, and custom packaging solutions for FMCG and retail brands.' },
        { icon: '🔍', title: 'Print Procurement & Quality Control', desc: 'Supplier management, price negotiation, print specification, proofing, and quality inspection.' },
      ]}
      process={[
        { num: '01', title: 'Brief & Specification', desc: 'We capture your print requirements, quantities, formats, and delivery timelines.' },
        { num: '02', title: 'Artwork Preparation', desc: 'Our designers prepare press-ready artwork, check colour profiles, and produce proofs for your approval.' },
        { num: '03', title: 'Production Management', desc: 'We manage the print run, QC at press, and ensure output meets your agreed specification.' },
        { num: '04', title: 'Delivery & Distribution', desc: 'We coordinate logistics and deliver your print materials on time to your required locations.' },
      ]}
      ctaTitle="Premium Print. On Time. Every Time."
      ctaDesc="From business cards to building wraps — SMIC360 manages your entire print supply chain so you never have to chase a vendor again."
      relatedLinks={[
        { href: '/solutions/marketing/branding-works', label: 'Branding Works' },
        { href: '/solutions/marketing/corporate-branding', label: 'Corporate Branding' },
        { href: '/solutions/marketing/media-buying', label: 'Media Buying' },
      ]}
    />
  );
}
