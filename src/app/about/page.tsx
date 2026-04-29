'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Topbar from '@/components/Topbar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';
import ChatPanel from '@/components/ChatPanel';
import ScrollReveal from '@/components/ScrollReveal';

const teamMembers = [
{
  id: 'christiana',
  img: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777112403/CHRISTIANA_pmwgsx.jpg',
  name: 'Christiana',
  role: 'Founder & CEO',
  bio: 'Over 20 years of industry experience excelling in Advertising, Marketing, and Business Management.',
  fullBio: 'Christiana is the Founder and CEO of SMIC360 Limited. With over 20 years of industry experience, she has excelled in Advertising, Marketing, Business Management, and Hospitality. She also serves as the Managing Director of Moonlight Shipping, Facility Manager of Christie\'s Homestay, Project Manager of The Phoenix Enclave, and Business Manager for Eagle EL Salt Ghana Limited and Osabusquare.'
},
{
  id: 'alberta',
  img: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777112403/ALBERTA_jbrc1f.jpg',
  name: 'Alberta',
  role: 'Finance Manager',
  bio: 'Strategic insight and financial acumen with an MBA in Finance from UGBS and 9+ years of experience.',
  fullBio: 'Alberta holds a background in Sociology & Linguistics and an MBA in Finance from UGBS. She brings a unique blend of strategic insight and financial acumen to SMIC360. With over nine years of experience in administration and finance, she ensures the seamless execution of all projects, oversees financial operations, and manages budgeting to guarantee the company\'s financial health.'
},
{
  id: 'samuel',
  img: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777112169/NII-BOYE_mixzve.jpg',
  name: 'Samuel',
  role: 'Creative & Production Manager',
  bio: 'Creative lead with 15+ years of experience crafting visually captivating and impactful marketing campaigns.',
  fullBio: 'Samuel is a dynamic Creative & Production Manager with over 15 years of experience and a BFA in Publishing. He leads the creative team in delivering innovative and impactful marketing solutions. Leveraging his deep expertise in design and creative direction, Samuel crafts visually captivating campaigns that resonate with target audiences and effectively drive client success.'
}];


export default function AboutPage() {
  const [bookOpen, setBookOpen] = useState(false);
  const [teamModal, setTeamModal] = useState<typeof teamMembers[0] | null>(null);

  // Lock body scroll while team modal open
  React.useEffect(() => {
    if (!teamModal) return;
    const y = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${y}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.overflowY = 'scroll';
    return () => {
      const top = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflowY = '';
      if (top) window.scrollTo(0, -parseInt(top, 10));
    };
  }, [teamModal]);

  return (
    <>
      <ScrollReveal />
      <Topbar />
      <Navbar onBookClick={() => setBookOpen(true)} />
      <BookingModal isOpen={bookOpen} onClose={() => setBookOpen(false)} />
      {/* Team Modal — self-contained inline styles, no CSS class conflicts */}
      {teamModal &&
        <div
          onClick={(e) => { if (e?.target === e?.currentTarget) setTeamModal(null); }}
          ref={(el) => { if (el) el.scrollTop = 0; }}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(4,14,29,0.88)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            zIndex: 100000,
            padding: '20px 16px 40px',
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <div style={{
            background: '#fff',
            width: '100%', maxWidth: '650px',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 32px 80px rgba(4,14,29,0.35)',
            borderTop: '4px solid #FFC107',
            animation: 'bmIn 0.38s cubic-bezier(0.16,1,0.3,1)',
            margin: '0 auto',
            alignSelf: 'flex-start',
            position: 'relative',
          }}>
            {/* Header */}
            <div style={{
              background: 'linear-gradient(135deg,#071628 0%,#0b2d56 55%,#1261c0 100%)',
              padding: '32px 28px',
              display: 'flex', gap: '22px', alignItems: 'center',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ position:'absolute',inset:0, backgroundImage:'linear-gradient(rgba(0,180,216,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(0,180,216,0.06) 1px,transparent 1px)', backgroundSize:'24px 24px', pointerEvents:'none' }} />
              <div style={{ position:'absolute',bottom:0,left:0,right:0,height:2, background:'linear-gradient(90deg,#FFC107,#00b4d8,#FFC107)' }} />
              <button
                onClick={() => setTeamModal(null)}
                style={{ position:'absolute',top:12,right:12, background:'rgba(255,255,255,0.12)', border:'1px solid rgba(255,255,255,0.2)', color:'#fff', width:32,height:32, borderRadius:'50%', cursor:'pointer', display:'flex',alignItems:'center',justifyContent:'center', fontSize:14, zIndex:10 }}
              >✕</button>
              <img src={teamModal.img} alt={teamModal.name} style={{ width:110,height:110, borderRadius:14, objectFit:'cover', border:'3px solid rgba(255,255,255,0.2)', flexShrink:0, boxShadow:'0 8px 28px rgba(0,0,0,0.3)', position:'relative', zIndex:1 }} />
              <div style={{ position:'relative', zIndex:1 }}>
                <h3 style={{ fontFamily:"'Oswald',sans-serif", fontSize:26, fontWeight:700, color:'#FFC107', margin:0 }}>{teamModal.name}</h3>
                <div style={{ color:'#00b4d8', fontWeight:700, fontSize:12, letterSpacing:'1.2px', textTransform:'uppercase', marginTop:5 }}>{teamModal.role}</div>
                <div style={{ display:'flex', gap:8, marginTop:12 }}>
                  {['in','ig','tw'].map(s=>(
                    <span key={s} style={{ width:28,height:28, background:'rgba(255,255,255,0.15)', border:'1px solid rgba(255,255,255,0.2)', borderRadius:6, display:'flex',alignItems:'center',justifyContent:'center', color:'#fff', fontSize:11, fontWeight:700 }}>{s}</span>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ padding:'28px 32px', color:'#5a7186', lineHeight:1.82, fontSize:15 }}>
              {teamModal.fullBio}
            </div>
          </div>
        </div>
      }
      {/* Page Hero */}
      <div className="page-hero">
        <div className="page-hero-inner">
          <div className="page-hero-tag">About Us</div>
          <h1>Building <em>Legacies</em></h1>
          <p>Our story is one of innovation, integrity, and transformative impact across Ghana&apos;s business landscape.</p>
        </div>
      </div>
      {/* About Section */}
      <section style={{ padding: '90px 0', background: 'var(--white)' }}>
        <div className="wrap">
          <div className="about-hero-grid">
            <div className="reveal-left" style={{ position: 'relative' }}>
              <img src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80" alt="Our Team" style={{ width: '100%', height: '420px', objectFit: 'cover', borderRadius: 'var(--r-lg)', boxShadow: 'var(--sh-md)' }} />
              <div style={{ position: 'absolute', bottom: '-18px', right: '-18px', background: 'var(--blue)', color: '#fff', borderRadius: 'var(--r)', padding: '20px 24px', textAlign: 'center', boxShadow: '0 8px 28px rgba(19,97,196,.38)' }}>
                <span style={{ fontFamily: 'Oswald,sans-serif', fontSize: '38px', fontWeight: 700, lineHeight: 1, display: 'block' }}>10+</span>
                <span style={{ fontSize: '12px', fontWeight: 500, opacity: .85, marginTop: '2px', display: 'block', textTransform: 'uppercase', letterSpacing: '1px' }}>Years Excellence</span>
              </div>
            </div>
            <div className="reveal-right">
              <span className="tag">Who We Are</span>
              <h2 className="section-title">360° <em>Business Solutions</em></h2>
              <p className="section-sub">
                SMIC360 Limited stands at the forefront of integrated business solutions in Ghana.
                We specialize in three core domains: <strong>Advertising &amp; Marketing</strong>,{' '}
                <strong>Real Estate Development</strong>, and{' '}
                <strong>Procurement &amp; Supply Chain Management</strong>.
              </p>
              <p className="section-sub" style={{ marginTop: '10px' }}>
                Our mission is to engineer growth and deliver measurable results for our clients
                through strategic excellence and operational precision — all under one roof.
              </p>
              <div className="about-points" style={{ marginTop: '28px' }}>
                {[
                { icon: '🚀', title: 'Innovative Strategies', desc: 'Data-driven campaigns and forward-thinking solutions tailored to your market.' },
                { icon: '🏗️', title: 'Premium Developments', desc: 'Quality-built spaces designed for modern Ghanaian living and investment.' },
                { icon: '📦', title: 'End-to-End Procurement', desc: 'Efficient sourcing and supply chain management for every business need.' },
                { icon: '🤝', title: 'Client-Centric', desc: 'Partnerships built on trust, transparency, and measurable results.' }
                ].map((pt, i) => (
                  <div key={i} className="apoint">
                    <div className="apoint-icon">{pt.icon}</div>
                    <div><h4>{pt.title}</h4><p>{pt.desc}</p></div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '28px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link href="/contact" className="btn btn-primary">Let&apos;s Discuss Your Project</Link>
                <Link href="/portfolio" className="btn btn-outline">View Our Work</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Stats */}
      <div style={{ background: 'var(--navy)', padding: '60px 0' }}>
        <div className="wrap">
          <div className="stats-grid">
            {[
            { num: '150', suffix: '+', label: 'Projects Delivered' },
            { num: '80', suffix: '+', label: 'Happy Clients' },
            { num: '10', suffix: '+', label: 'Years of Excellence' },
            { num: '3', suffix: '', label: 'Core Divisions' }
            ].map((stat, i) => (
              <div key={i}>
                <div style={{ fontFamily: 'Oswald,sans-serif', fontSize: 'clamp(32px,4vw,52px)', fontWeight: 700, color: '#fff', lineHeight: 1 }}>
                  {stat.num}<span style={{ color: 'var(--gold)' }}>{stat.suffix}</span>
                </div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,.5)', textTransform: 'uppercase', letterSpacing: '.8px', marginTop: '8px' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Values */}
      <section style={{ padding: '90px 0', background: 'var(--off)' }}>
        <div className="wrap">
          <div style={{ textAlign: 'center', marginBottom: '48px' }} className="reveal">
            <span className="tag" style={{ justifyContent: 'center' }}>Our Values</span>
            <h2 className="section-title">What Drives <em>Everything We Do</em></h2>
          </div>
          <div className="values-grid stagger">
            {[
            { icon: '🎯', title: 'Strategy First', desc: 'Every solution starts with a tailored strategy built around your unique goals, market context, and growth ambitions.' },
            { icon: '🏆', title: 'Excellence in Delivery', desc: 'We hold ourselves to the highest standards of quality, precision, and professionalism in every project we undertake.' },
            { icon: '🌍', title: 'Ghana-Rooted Vision', desc: 'Built in Accra with deep local expertise and a pan-African perspective for everything we build and create.' }
            ].map((val, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 'var(--r-lg)', padding: '36px 28px', textAlign: 'center', boxShadow: 'var(--sh)', border: '1px solid var(--border)', transition: 'all .3s' }}>
                <div style={{ fontSize: '40px', marginBottom: '16px' }}>{val.icon}</div>
                <h3 style={{ fontFamily: 'Oswald,sans-serif', fontSize: '22px', fontWeight: 700, color: 'var(--navy)', marginBottom: '12px' }}>{val.title}</h3>
                <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.7 }}>{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SDGs Section */}
      <section id="sdgs" style={{ padding: '90px 0', background: 'var(--white)' }}>
        <div className="wrap">
          <div style={{ textAlign: 'center', marginBottom: '48px' }} className="reveal">
            <span className="tag" style={{ justifyContent: 'center' }}>Our Impact</span>
            <h2 className="section-title">Committed to <em>Sustainable Development</em></h2>
            <p className="section-sub" style={{ margin: '12px auto 0', textAlign: 'center' }}>At SMIC360, we align our operations with the UN Sustainable Development Goals to create lasting impact in Ghana.</p>
          </div>
          <div className="values-grid stagger">
            {[
              { icon: '🏗️', title: 'Goal 9: Industry & Innovation', desc: 'Developing resilient infrastructure through The Phoenix Enclave and fostering innovation in marketing.' },
              { icon: '💼', title: 'Goal 8: Decent Work', desc: 'Providing professional growth opportunities and contributing to Ghanaian economic growth.' },
              { icon: '🤝', title: 'Goal 17: Partnerships', desc: 'Collaborating across sectors—from banking to state enterprises—to achieve integrated success.' }
            ].map((sdg, i) => (
              <div key={i} style={{ background: 'var(--off)', borderRadius: 'var(--r-lg)', padding: '36px 28px', textAlign: 'center', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '40px', marginBottom: '16px' }}>{sdg.icon}</div>
                <h3 style={{ fontFamily: 'Oswald,sans-serif', fontSize: '20px', fontWeight: 700, color: 'var(--navy)', marginBottom: '12px' }}>{sdg.title}</h3>
                <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.7 }}>{sdg.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Team */}
      <section style={{ padding: '90px 0', background: 'var(--white)' }}>
        <div className="wrap">
          <style>{`
            .team-card {
              opacity: 0;
              transform: translateY(40px);
              transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
            }
            .stagger.visible .team-card {
              opacity: 1;
              transform: translateY(0);
            }
          `}</style>
          <div style={{ textAlign: 'center', marginBottom: '48px' }} className="reveal">
            <span className="tag" style={{ justifyContent: 'center' }}>The People</span>
            <h2 className="section-title">Meet <em>The Experts</em></h2>
            <p className="section-sub" style={{ margin: '12px auto 0', textAlign: 'center' }}>A dedicated team of strategists, creatives, and specialists united by one goal — your success.</p>
          </div>
          <div className="team-grid stagger">
            {teamMembers.map((member, i) => (
              <div 
                key={i} 
                className="team-card" 
                onClick={() => setTeamModal(member)} 
                style={{ cursor: 'pointer', transitionDelay: `${i * 0.15}s` }}
              >
                <div className="team-img">
                  <img src={member.img} alt={member.name} />
                </div>
                <div className="team-body">
                  <h3>{member.name}</h3>
                  <div className="team-role">{member.role}</div>
                  <p>{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer onBookClick={() => setBookOpen(true)} />
      <ChatPanel />
    </>);

}