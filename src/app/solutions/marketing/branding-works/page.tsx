import MarketingSubPage from '@/components/MarketingSubPage';

export const metadata = { title: 'Branding Works | SMIC360 Marketing Solutions' };

export default function BrandingWorksPage() {
  return (
    <MarketingSubPage
      badge="Marketing Solutions"
      heroTitle="Branding"
      heroEm="Works"
      heroDesc="From concept to execution — we craft brand identities that are bold, memorable, and built to win in the Ghanaian market."
      heroImg="https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777199309/VCC_dl6ehf.jpg"
      overview="Great branding is not just a logo — it is the total experience your customers have with your business. At SMIC360, our branding team digs deep into your business goals, target audience, and competitive landscape to craft identities that are authentic, distinctive, and commercially powerful. Whether you are launching a new brand or refreshing a legacy one, we deliver creative work that commands attention and builds lasting equity."
      services={[
        { icon: '🎨', title: 'Logo & Visual Identity', desc: 'Distinctive logos and complete visual identity systems — colours, typography, iconography, and usage guidelines.' },
        { icon: '📋', title: 'Brand Strategy', desc: 'Positioning, brand voice, messaging architecture, and a strategic framework that differentiates you in your market.' },
        { icon: '📦', title: 'Packaging Design', desc: 'Eye-catching product and retail packaging that communicates quality and drives purchase at the point of sale.' },
        { icon: '🖨️', title: 'Brand Collateral', desc: 'Business cards, letterheads, brochures, signage, and all branded touchpoints that reinforce your identity.' },
        { icon: '📱', title: 'Digital Brand Assets', desc: 'Social media templates, email headers, web graphics, and all digital assets aligned to your brand system.' },
        { icon: '📖', title: 'Brand Guidelines', desc: 'Comprehensive brand style guides that ensure consistency across every channel, vendor, and team.' },
      ]}
      process={[
        { num: '01', title: 'Discovery & Audit', desc: 'We assess your current brand equity, competitor landscape, and audience perceptions.' },
        { num: '02', title: 'Strategy & Concept', desc: 'We develop positioning, messaging, and 2–3 creative directions for your review.' },
        { num: '03', title: 'Design & Refinement', desc: 'We craft the chosen direction into a full identity system with your feedback at each stage.' },
        { num: '04', title: 'Delivery & Rollout', desc: 'We deliver final files, guidelines, and support your brand launch across all channels.' },
      ]}
      ctaTitle="Ready to Build a Brand That Lasts?"
      ctaDesc="Talk to our branding team and find out how a strong identity can transform your market position, customer loyalty, and business value."
      relatedLinks={[
        { href: '/solutions/marketing/corporate-branding', label: 'Corporate Branding' },
        { href: '/solutions/marketing/digital-marketing', label: 'Digital Marketing' },
        { href: '/solutions/marketing/print-management', label: 'Print Management' },
      ]}
    />
  );
}
