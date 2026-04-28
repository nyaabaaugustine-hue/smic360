import MarketingSubPage from '@/components/MarketingSubPage';

export const metadata = { title: 'Digital Work | SMIC360 Marketing Solutions' };

export default function DigitalWorkPage() {
  return (
    <MarketingSubPage
      badge="Marketing Solutions"
      heroTitle="Digital"
      heroEm="Work"
      heroDesc="Creative digital executions — from motion graphics and video production to interactive content — that bring your brand to life online."
      heroImg="https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777223498/medb_kngcnc.jpg"
      overview="Digital Work is the creative execution arm of SMIC360's marketing capability. Our production team delivers high-quality digital content — video, motion graphics, photography, and interactive assets — that make your brand impossible to ignore. Whether you need a product launch video, a social media content series, or a full digital campaign suite, our creatives bring your brief to life with quality that matches international standards."
      services={[
        { icon: '🎬', title: 'Video Production', desc: 'Corporate videos, TVCs, product demos, testimonials, and brand films produced to broadcast quality.' },
        { icon: '✨', title: 'Motion Graphics & Animation', desc: '2D motion graphics, explainer animations, kinetic typography, and animated social media content.' },
        { icon: '📸', title: 'Commercial Photography', desc: 'Product photography, corporate headshots, event coverage, and lifestyle images for campaigns.' },
        { icon: '🖥️', title: 'Interactive Digital Content', desc: 'Interactive infographics, digital lookbooks, HTML5 banners, and engaging web content formats.' },
        { icon: '🎞️', title: 'Social Media Content Production', desc: 'Reels, stories, short-form video series, and static posts produced at scale for all platforms.' },
        { icon: '🔊', title: 'Audio Production', desc: 'Jingles, podcast production, voiceovers, and branded audio assets for radio and digital.' },
      ]}
      process={[
        { num: '01', title: 'Creative Brief', desc: 'We workshop your objectives, audience, message, and vision to create a precise creative brief.' },
        { num: '02', title: 'Pre-production', desc: 'Scripting, storyboarding, casting, location scouting, and shoot planning.' },
        { num: '03', title: 'Production', desc: 'Professional shoot or animation production with our in-house and partner creative team.' },
        { num: '04', title: 'Post & Delivery', desc: 'Editing, colour grading, sound design, and delivery in all required formats and specifications.' },
      ]}
      ctaTitle="Let's Create Something Unforgettable"
      ctaDesc="Great digital content doesn't just inform — it moves people. Talk to our creative team about your next production project."
      relatedLinks={[
        { href: '/solutions/marketing/digital-marketing', label: 'Digital Marketing' },
        { href: '/solutions/marketing/branding-works', label: 'Branding Works' },
        { href: '/solutions/marketing/media-buying', label: 'Media Buying' },
      ]}
    />
  );
}
