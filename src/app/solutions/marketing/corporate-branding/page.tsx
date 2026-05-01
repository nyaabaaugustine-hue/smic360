import MarketingSubPage from '@/components/MarketingSubPage';

export const metadata = { title: 'Corporate Branding | SMIC360 Marketing Solutions' };

export default function CorporateBrandingPage() {
  return (
    <MarketingSubPage
      badge="Marketing Solutions"
      heroTitle="Corporate"
      heroEm="Branding"
      heroDesc="Shape how your organisation is perceived by clients, investors, talent, and the public — with a corporate identity built for credibility and growth."
      heroImg="https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777114247/kkkl_nhdczf.avif"
      overview="Your corporate brand is the face of your organisation in every boardroom, pitch deck, and public forum. SMIC360 helps businesses — from SMEs to large enterprises — build cohesive corporate identities that communicate professionalism, inspire trust, and support long-term business development. We align your internal culture with your external presentation to create brands that attract the right clients, partners, and talent."
      services={[
        {
          icon: '🏢',
          title: 'Corporate Identity Design',
          desc: 'Master logo systems, executive stationery, and complete corporate visual identity aligned with your industry position.',
        },
        {
          icon: '📊',
          title: 'Investor & Pitch Materials',
          desc: 'Compelling pitch decks, investor brochures, annual reports, and board-level presentations.',
        },
        {
          icon: '🌐',
          title: 'Corporate Website Design',
          desc: 'Professional corporate websites that communicate your value proposition and support business development.',
        },
        {
          icon: '👔',
          title: 'Employer Branding',
          desc: 'Recruitment materials, onboarding kits, and internal communications that attract and retain top talent.',
        },
        {
          icon: '🖋️',
          title: 'Corporate Communications',
          desc: 'Press releases, media kits, executive bios, and thought leadership content that elevate your public profile.',
        },
        {
          icon: '🎬',
          title: 'Corporate Video & Photography',
          desc: 'Professional video production and photography for corporate events, launches, and brand storytelling.',
        },
      ]}
      process={[
        {
          num: '01',
          title: 'Stakeholder Workshops',
          desc: 'We interview leadership, staff, and clients to understand your brand from every angle.',
        },
        {
          num: '02',
          title: 'Brand Architecture',
          desc: 'We define your brand hierarchy, values, positioning, and messaging framework.',
        },
        {
          num: '03',
          title: 'Creative Development',
          desc: 'We design and refine your corporate identity system across all key touchpoints.',
        },
        {
          num: '04',
          title: 'Launch & Embed',
          desc: 'We support your rebrand launch and train your team to use and protect the brand consistently.',
        },
      ]}
      ctaTitle="Elevate Your Corporate Presence"
      ctaDesc="From boardroom to billboards — SMIC360 builds corporate brands that project confidence and command respect in every room."
      relatedLinks={[
        { href: '/solutions/marketing/branding-works', label: 'Branding Works' },
        { href: '/solutions/marketing/website-development', label: 'Website Development' },
        { href: '/solutions/marketing/digital-marketing', label: 'Digital Marketing' },
      ]}
    />
  );
}
