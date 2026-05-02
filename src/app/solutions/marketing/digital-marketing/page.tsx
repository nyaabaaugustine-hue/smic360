import MarketingSubPage from '@/components/MarketingSubPage';

export const metadata = { title: 'Digital Marketing | SMIC360 Marketing Solutions' };

export default function DigitalMarketingPage() {
  return (
    <MarketingSubPage
      badge="Marketing Solutions"
      heroTitle="Digital"
      heroEm="Marketing"
      heroDesc="Data-driven digital campaigns that reach your audience where they are — on search, social, and across the web — with measurable results."
      heroImg="https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777716368/digiatmarket_nvyszh.avif"
      overview="In Ghana's rapidly evolving digital landscape, businesses that master online marketing gain a decisive competitive edge. SMIC360's digital marketing team combines creative strategy with data analytics to build campaigns that drive traffic, generate quality leads, and convert audiences into loyal customers. We manage every layer of your digital presence — from SEO and paid ads to content marketing and social media — so you can focus on running your business."
      services={[
        {
          icon: '🔍',
          title: 'Search Engine Optimisation (SEO)',
          desc: 'On-page and technical SEO, keyword strategy, and content optimisation that drive organic traffic and visibility.',
        },
        {
          icon: '💰',
          title: 'Paid Advertising (PPC)',
          desc: 'Google Ads, Facebook/Instagram Ads, and LinkedIn campaigns that deliver qualified leads and measurable ROI.',
        },
        {
          icon: '📱',
          title: 'Social Media Management',
          desc: 'Strategy, content creation, community management, and paid amplification across all major platforms.',
        },
        {
          icon: '✉️',
          title: 'Email Marketing',
          desc: 'Automated email flows, newsletters, and segmented campaigns that nurture leads and drive repeat business.',
        },
        {
          icon: '📝',
          title: 'Content Marketing',
          desc: 'Blog posts, video content, infographics, and case studies that build authority and attract your ideal audience.',
        },
        {
          icon: '📈',
          title: 'Analytics & Reporting',
          desc: 'Monthly performance dashboards with clear KPIs, insights, and recommendations to continuously improve results.',
        },
      ]}
      process={[
        {
          num: '01',
          title: 'Audit & Strategy',
          desc: 'We audit your current digital presence, set clear KPIs, and build a data-driven strategy.',
        },
        {
          num: '02',
          title: 'Campaign Setup',
          desc: 'We build your campaigns, create assets, configure tracking, and set up reporting dashboards.',
        },
        {
          num: '03',
          title: 'Launch & Optimise',
          desc: 'We run and continuously optimise campaigns based on performance data and audience behaviour.',
        },
        {
          num: '04',
          title: 'Report & Scale',
          desc: 'Monthly reports with insights and recommendations — plus a roadmap to scale what is working.',
        },
      ]}
      ctaTitle="Grow Your Business Online"
      ctaDesc="Whether you need more website traffic, leads, or online sales — our digital marketing team will build and run campaigns that deliver."
      relatedLinks={[
        { href: '/solutions/marketing/media-buying', label: 'Media Buying' },
        { href: '/solutions/marketing/digital-work', label: 'Digital Work' },
        { href: '/solutions/marketing/website-development', label: 'Website Development' },
      ]}
    />
  );
}
