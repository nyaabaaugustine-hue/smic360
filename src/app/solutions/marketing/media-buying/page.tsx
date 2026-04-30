import MarketingSubPage from '@/components/MarketingSubPage';

export const metadata = { title: 'Media Buying | SMIC360 Marketing Solutions' };

export default function MediaBuyingPage() {
  return (
    <MarketingSubPage
      badge="Marketing Solutions"
      heroTitle="Media"
      heroEm="Buying"
      heroDesc="Strategic media placement that puts your brand in front of the right audience — at the right time, on the right channels — for maximum impact and ROI."
      heroImg="https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777110562/A-Guide-to-Media-Buying-Definition-Importance-Impact-and-Benefits-scaled-copy_uidwzc.jpg"
      overview="Media buying is one of the most powerful levers in your marketing mix — and one of the most easily wasted without the right expertise. SMIC360's media buying team combines deep knowledge of Ghana's media landscape (TV, radio, print, outdoor, and digital) with hard-won vendor relationships to negotiate the best rates, optimal placements, and maximum reach for your budget. We plan, buy, manage, and report on all media spend so every cedi works harder."
      services={[
        {
          icon: '📺',
          title: 'TV Advertising',
          desc: 'Strategic placement on GTV, TV3, Joy Prime, UTV, and other leading channels — with audience data to back every decision.',
        },
        {
          icon: '📻',
          title: 'Radio Advertising',
          desc: 'National and regional radio campaigns across Joy FM, Citi FM, Peace FM, and targeted community stations.',
        },
        {
          icon: '🏙️',
          title: 'Outdoor & OOH',
          desc: 'Billboards, airport displays, transit ads, and experiential placements in high-traffic locations across Ghana.',
        },
        {
          icon: '📰',
          title: 'Print Media',
          desc: 'Display and classified advertising in major newspapers, trade publications, and magazines.',
        },
        {
          icon: '💻',
          title: 'Digital Media Buying',
          desc: 'Programmatic display, video pre-roll, social media paid placement, and mobile advertising.',
        },
        {
          icon: '📊',
          title: 'Media Planning & Analytics',
          desc: 'Audience research, media mix optimisation, campaign tracking, and post-campaign performance reporting.',
        },
      ]}
      process={[
        {
          num: '01',
          title: 'Audience Research',
          desc: 'We identify your target audience segments and map their media consumption habits in Ghana.',
        },
        {
          num: '02',
          title: 'Media Plan',
          desc: 'We develop a channel mix, flight schedule, and budget allocation plan to maximise your reach and frequency.',
        },
        {
          num: '03',
          title: 'Negotiation & Booking',
          desc: 'We leverage our media relationships to negotiate the best rates and secure premium placements.',
        },
        {
          num: '04',
          title: 'Monitor & Report',
          desc: 'We track campaign delivery in real time and provide post-campaign analysis with insights and recommendations.',
        },
      ]}
      ctaTitle="Make Every Media Cedi Count"
      ctaDesc="Our media buying team will ensure your advertising budget is invested where it delivers the strongest reach, relevance, and results."
      relatedLinks={[
        { href: '/solutions/marketing/digital-marketing', label: 'Digital Marketing' },
        { href: '/solutions/marketing/print-management', label: 'Print Management' },
        { href: '/solutions/marketing/digital-work', label: 'Digital Work' },
      ]}
    />
  );
}
