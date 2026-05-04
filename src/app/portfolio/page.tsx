'use client';
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Topbar from '@/components/Topbar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';
import ChatPanel from '@/components/ChatPanel';
import ScrollReveal from '@/components/ScrollReveal';

const PAGE_TITLE = 'Portfolio | SMIC360 Limited';
const PAGE_DESC = 'Explore SMIC360 portfolio of completed projects across marketing, real estate development, and procurement in Ghana.';

type Project = {
  img: string; alt: string;
  category: 'Marketing' | 'Real Estate' | 'Procurement';
  badge: string; title: string; desc: string;
  result: string; resultLabel: string;
  tags: string[];
  meta: { label: string; val: string }[];
  fullDesc: string;
};

const allProjects: Project[] = [
  {
    img: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777199309/VCC_dl6ehf.jpg',
    alt: 'National Brand Relaunch', category: 'Marketing', badge: 'Brand Strategy',
    title: 'National Brand Relaunch',
    desc: 'Full 360° rebranding for a leading consumer goods company involving identity, packaging, and digital launch.',
    result: '+38%', resultLabel: 'Brand Recall',
    tags: ['Identity', 'Packaging', 'Digital'],
    meta: [{ label: 'Industry', val: 'Consumer Goods' }, { label: 'Result', val: '+38% Recall' }, { label: 'Duration', val: '4 Months' }],
    fullDesc: 'We led a complete 360 brand transformation starting with a brand audit and repositioning workshop, then rebuilding the visual identity, redesigning all packaging SKUs, and orchestrating a phased digital launch. The result was a 38% improvement in brand recall within 90 days of relaunch.',
  },
  {
    img: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777196963/1_j6fe4u.jpg',
    alt: 'Phoenix Enclave Phase 1', category: 'Real Estate', badge: 'Development',
    title: 'Phoenix Enclave Phase 1',
    desc: 'Delivery of our flagship gated community featuring 24 premium residential units and full infrastructure.',
    result: '24', resultLabel: 'Units Delivered',
    tags: ['Gated Community', 'Accra', 'Residential'],
    meta: [{ label: 'Units', val: '24 Homes' }, { label: 'Status', val: 'Completed' }, { label: 'Location', val: 'Spintex, Accra' }],
    fullDesc: 'The Phoenix Enclave Phase 1 is our flagship residential development in Community 20, Lashibi, off Spintex Road. We delivered 24 premium 3 and 4-bedroom homes with 24/7 security, landscaped gardens, and reliable utilities. All units were sold and occupied within 8 months of completion.',
  },
  {
    img: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1776422246/abz_3_hp78qi.jpg',
    alt: 'GNPC Industrial Supply', category: 'Procurement', badge: 'State Enterprise',
    title: 'GNPC Industrial Supply',
    desc: 'End-to-end procurement of technical equipment and consumables for a major state enterprise on time, on spec.',
    result: '6 Wks', resultLabel: 'Delivery',
    tags: ['Energy', 'Technical', 'State Enterprise'],
    meta: [{ label: 'Value', val: 'GH₵2.4M+' }, { label: 'Timeline', val: '6 Weeks' }, { label: 'Status', val: 'Delivered' }],
    fullDesc: 'GNPC required fast-turnaround procurement of specialised industrial consumables and technical equipment across multiple site locations. We mobilised our supplier network, ran competitive tendering, and coordinated import logistics delivering all items within 6 weeks at 14% below the initial budget estimate.',
  },
  {
    img: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777114247/kkkl_nhdczf.avif',
    alt: 'Media Buying Campaign', category: 'Marketing', badge: 'Media Buying',
    title: 'Multi-Channel Media Campaign',
    desc: 'Multi-channel media buying and placement across TV, digital, and outdoor for a major financial institution.',
    result: '2.1M', resultLabel: 'Impressions',
    tags: ['TV', 'Digital', 'OOH'],
    meta: [{ label: 'Reach', val: '2.1M Impressions' }, { label: 'Duration', val: '3 Months' }, { label: 'Channels', val: 'TV · Digital · OOH' }],
    fullDesc: 'We designed and executed a full media buying strategy for a Tier 1 Ghanaian financial institution covering prime-time TV on GTV and TV3, targeted digital ads across Meta and Google, and OOH sites in Accra and Kumasi. The campaign delivered 2.1M verified impressions and a 22% uplift in branch enquiries.',
  },
  {
    img: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777111208/WhatsApp-Image-2025-08-18-at-14.16.35_e93040d9l_gwfnmu.jpg',
    alt: 'Commercial Office Fit-Out', category: 'Real Estate', badge: 'Commercial',
    title: 'Commercial Office Fit-Out',
    desc: 'Design coordination and procurement for a 3-storey commercial office development in the Spintex corridor.',
    result: '3', resultLabel: 'Floors Delivered',
    tags: ['Commercial', 'Fit-Out', 'Spintex'],
    meta: [{ label: 'Floors', val: '3 Levels' }, { label: 'Status', val: 'Delivered' }, { label: 'Location', val: 'Spintex, Accra' }],
    fullDesc: 'Acting as integrated project manager, we coordinated all design, procurement, and fit-out for a 3-storey commercial office building in Spintex. Scope included interior design, MEP procurement, furniture supply, and final finishing delivered on time within a 5-month programme.',
  },
  {
    img: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777106950/ec234641a21a9e03c50b708351c53603_vl5piv.jpg',
    alt: 'Moonlight Shipping Supply', category: 'Procurement', badge: 'Integrated Supply',
    title: 'Moonlight Shipping Supply',
    desc: "Strategic procurement of equipment and office infrastructure for Moonlight Shipping's Accra expansion.",
    result: '19%', resultLabel: 'Cost Saving',
    tags: ['Logistics', 'Office', 'Accra'],
    meta: [{ label: 'Service', val: 'Integrated Supply' }, { label: 'Saving', val: '19% vs Budget' }, { label: 'Status', val: 'Delivered' }],
    fullDesc: "Moonlight Shipping required a reliable procurement partner for their Accra office expansion covering IT infrastructure, office furniture, branded consumables, and operational equipment. By bundling across our pre-vetted vendor network, we achieved 19% savings against their original budget while cutting lead time by 3 weeks.",
  },
];

const CATS = ['All', 'Marketing', 'Real Estate', 'Procurement'] as const;

export default function PortfolioPage() {
  const [bookOpen, setBookOpen] = useState(false);
  const [active, setActive]     = useState<typeof CATS[number]>('All');
  const [modal, setModal]       = useState<Project | null>(null);
  const [mounted, setMounted]   = useState(false);

  useEffect(() => {
    setMounted(true);
    document.title = PAGE_TITLE;
    document.querySelector('meta[name="description"]')?.setAttribute('content', PAGE_DESC);
  }, []);

  // Body scroll lock while modal open
  useEffect(() => {
    if (!modal) return;
    const y = window.scrollY;
    document.body.style.position  = 'fixed';
    document.body.style.top       = `-${y}px`;
    document.body.style.left      = '0';
    document.body.style.right     = '0';
    document.body.style.overflowY = 'scroll';
    return () => {
      const top = document.body.style.top;
      document.body.style.position  = '';
      document.body.style.top       = '';
      document.body.style.left      = '';
      document.body.style.right     = '';
      document.body.style.overflowY = '';
      if (top) window.scrollTo(0, -parseInt(top, 10));
    };
  }, [modal]);

  const catCount = (c: string) => c === 'All' ? allProjects.length : allProjects.filter(p => p.category === c).length;
  const filtered = active === 'All' ? allProjects : allProjects.filter(p => p.category === active);

  return (
    <>
      <ScrollReveal />
      <Topbar />
      <Navbar onBookClick={() => setBookOpen(true)} />
      <BookingModal isOpen={bookOpen} onClose={() => setBookOpen(false)} />

      <style>{`
        @keyframes pfIn{from{opacity:0;transform:translateY(28px) scale(.95)}to{opacity:1;transform:none}}
        .pf-tabs{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin-bottom:52px}
        .pf-tab{display:inline-flex;align-items:center;gap:8px;padding:10px 20px;border-radius:40px;font-family:'Outfit',sans-serif;font-size:13.5px;font-weight:700;border:2px solid transparent;cursor:pointer;transition:all .22s;background:#f6f8fd;color:#5a7186}
        .pf-tab:hover{border-color:#FFC107;color:#D4A017;background:#fff9e6}
        .pf-tab.on{background:linear-gradient(135deg,#FFC107,#D4A017);color:#071628;border-color:transparent;box-shadow:0 4px 18px rgba(212,160,23,0.32)}
        .pf-tab-n{font-size:11px;background:rgba(0,0,0,0.1);border-radius:20px;padding:2px 7px;font-weight:800}
        .pf-tab.on .pf-tab-n{background:rgba(7,22,40,0.18)}
        .pf-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:26px}
        .pf-card{background:#fff;border-radius:20px;overflow:hidden;border:1px solid #dce8f7;box-shadow:0 4px 24px rgba(7,22,40,0.07);cursor:pointer;transition:all .32s cubic-bezier(.16,1,.3,1);display:flex;flex-direction:column;position:relative}
        .pf-card::after{content:'';position:absolute;inset:0;border-radius:20px;border:2px solid transparent;transition:border-color .25s;pointer-events:none}
        .pf-card:hover{transform:translateY(-10px);box-shadow:0 28px 64px rgba(7,22,40,0.15)}
        .pf-card:hover::after{border-color:#FFC107}
        .pf-img{position:relative;height:220px;overflow:hidden;flex-shrink:0}
        .pf-img img{width:100%;height:100%;object-fit:cover;transition:transform .55s ease;display:block}
        .pf-card:hover .pf-img img{transform:scale(1.07)}
        .pf-img-ov{position:absolute;inset:0;background:linear-gradient(to top,rgba(7,22,40,.6) 0%,transparent 55%)}
        .pf-badge{position:absolute;top:14px;left:14px;font-size:9.5px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;padding:4px 12px;border-radius:20px;background:linear-gradient(135deg,#FFC107,#D4A017);color:#071628}
        .pf-res{position:absolute;bottom:14px;left:16px}
        .pf-res-num{font-family:'Oswald',sans-serif;font-size:28px;font-weight:700;color:#fff;line-height:1;text-shadow:0 2px 8px rgba(0,0,0,.4)}
        .pf-res-lbl{font-size:10px;color:rgba(255,255,255,.65);font-weight:600;letter-spacing:.5px}
        .pf-body{padding:22px;flex:1;display:flex;flex-direction:column;border-top:3px solid #FFC107}
        .pf-cat{font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#D4A017;margin-bottom:8px}
        .pf-body h3{font-family:'Oswald',sans-serif;font-size:18px;font-weight:700;color:#071628;line-height:1.22;margin-bottom:8px;transition:color .22s}
        .pf-card:hover .pf-body h3{color:#D4A017}
        .pf-body p{font-size:13px;color:#5a7186;line-height:1.68;flex:1}
        .pf-tags{display:flex;gap:6px;flex-wrap:wrap;margin-top:14px}
        .pf-tag{font-size:10.5px;font-weight:600;padding:4px 10px;border-radius:20px;background:#f6f8fd;border:1px solid #dce8f7;color:#5a7186}
        .pf-cta{display:flex;align-items:center;justify-content:space-between;margin-top:16px;padding-top:14px;border-top:1px solid #dce8f7}
        .pf-cta-t{font-size:12.5px;font-weight:700;color:#D4A017;display:inline-flex;align-items:center;gap:6px;transition:gap .2s}
        .pf-card:hover .pf-cta-t{gap:11px}
        .pf-cta-arr{width:28px;height:28px;border-radius:50%;background:#fff9e6;border:1px solid rgba(212,160,23,.3);display:flex;align-items:center;justify-content:center;font-size:12px;transition:all .25s}
        .pf-card:hover .pf-cta-arr{background:#D4A017;color:#fff;border-color:transparent}
        @media(max-width:900px){.pf-grid{grid-template-columns:repeat(2,1fr)}}
        @media(max-width:560px){.pf-grid{grid-template-columns:1fr}.pf-tabs{gap:7px}.pf-tab{font-size:12px;padding:8px 14px}}
      `}</style>

      {/* Hero */}
      <div className="page-hero">
        <div className="page-hero-inner">
          <div className="page-hero-tag">Our Work</div>
          <h1>Proven <em>Excellence</em></h1>
          <p>A showcase of integrated results across marketing, real estate, and procurement.</p>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{background:'#1a1a1a',padding:'56px 0'}}>
        <div className="wrap">
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'20px',textAlign:'center'}}>
            {[
              {num:'150',suf:'+',label:'Projects Delivered',sub:'Across all divisions'},
              {num:'80', suf:'+',label:'Happy Clients',     sub:'Ghana & West Africa'},
              {num:'10', suf:'+',label:'Years of Excellence',sub:'Founded 2006'},
              {num:'3',  suf:'', label:'Core Divisions',    sub:'Marketing \u00b7 RE \u00b7 Procurement'},
            ].map((s,i)=>(
              <div key={i} style={{padding:'16px',borderRadius:14,border:'1px solid rgba(255,255,255,0.09)',background:'rgba(255,255,255,0.04)'}}>
                <div style={{fontFamily:'Oswald,sans-serif',fontSize:'clamp(32px,3.5vw,48px)',fontWeight:700,color:'#fff',lineHeight:1}}>
                  {s.num}<span style={{color:'#FFC107'}}>{s.suf}</span>
                </div>
                <div style={{fontSize:12,fontWeight:700,color:'rgba(255,255,255,0.65)',textTransform:'uppercase',letterSpacing:'1px',marginTop:8}}>{s.label}</div>
                <div style={{fontSize:11,color:'rgba(255,255,255,0.32)',marginTop:4}}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Portfolio grid */}
      <section style={{padding:'90px 0',background:'var(--white)'}}>
        <div className="wrap">
          <div style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',flexWrap:'wrap',gap:20,marginBottom:44}} className="reveal">
            <div>
              <span className="tag">Case Studies</span>
              <h2 className="section-title">Selected <em>Projects</em></h2>
            </div>
            <p className="section-sub" style={{margin:0,maxWidth:380}}>Click any project to read the full case study and results.</p>
          </div>

          <div className="pf-tabs reveal">
            {CATS.map(cat=>(
              <button key={cat} className={`pf-tab${active===cat?' on':''}`} onClick={()=>setActive(cat)}>
                {cat==='All'?'\uD83D\uDDC2\uFE0F':cat==='Marketing'?'\uD83D\uDCE3':cat==='Real Estate'?'\uD83C\uDFE1':'\uD83D\uDCE6'} {cat}
                <span className="pf-tab-n">{catCount(cat)}</span>
              </button>
            ))}
          </div>

          <div className="pf-grid stagger">
            {filtered.map((proj,i)=>(
              <div key={i} className="pf-card" onClick={()=>setModal(proj)}>
                <div className="pf-img">
                  <img src={proj.img} alt={proj.alt} loading="lazy"/>
                  <div className="pf-img-ov"/>
                  <div className="pf-badge">{proj.badge}</div>
                  <div className="pf-res">
                    <div className="pf-res-num">{proj.result}</div>
                    <div className="pf-res-lbl">{proj.resultLabel}</div>
                  </div>
                </div>
                <div className="pf-body">
                  <div className="pf-cat">{proj.category}</div>
                  <h3>{proj.title}</h3>
                  <p>{proj.desc}</p>
                  <div className="pf-tags">{proj.tags.map(t=><span key={t} className="pf-tag">{t}</span>)}</div>
                  <div className="pf-cta">
                    <span className="pf-cta-t">Read Case Study <span className="pf-cta-arr">&rarr;</span></span>
                    <span style={{fontSize:11,background:'#f6f8fd',border:'1px solid #dce8f7',borderRadius:6,padding:'3px 9px',color:'#5a7186'}}>
                      <strong style={{color:'#0f1e30'}}>{proj.meta[0].val}</strong>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div style={{background:'#1a1a1a',padding:'80px 0',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',inset:0,backgroundImage:'linear-gradient(rgba(255,193,7,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,193,7,0.03) 1px,transparent 1px)',backgroundSize:'56px 56px',pointerEvents:'none'}}/>
        <div style={{position:'absolute',width:400,height:400,borderRadius:'50%',background:'radial-gradient(circle,rgba(255,193,7,0.07),transparent)',top:'50%',left:'5%',transform:'translateY(-50%)',pointerEvents:'none'}}/>
        <div style={{maxWidth:820,margin:'0 auto',padding:'0 28px',textAlign:'center',position:'relative',zIndex:1}}>
          <span style={{display:'inline-flex',alignItems:'center',gap:8,background:'rgba(255,193,7,0.1)',border:'1px solid rgba(255,193,7,0.25)',color:'#FFC107',fontSize:11,fontWeight:700,letterSpacing:'1.8px',padding:'6px 14px',borderRadius:22,marginBottom:20,textTransform:'uppercase'}}>
            Start Your Project
          </span>
          <h2 style={{fontFamily:'Oswald,sans-serif',fontSize:'clamp(28px,4vw,50px)',fontWeight:700,color:'#fff',lineHeight:1.06,marginBottom:16}}>
            Have a Project in <em style={{fontStyle:'normal',color:'#FFC107'}}>Mind?</em>
          </h2>
          <p style={{color:'rgba(255,255,255,0.55)',fontSize:16,lineHeight:1.74,maxWidth:520,margin:'0 auto 36px'}}>
            Our team is ready to build, brand, and deliver for you. Book a free consultation with no obligation.
          </p>
          <div style={{display:'flex',gap:14,justifyContent:'center',flexWrap:'wrap'}}>
            <button onClick={()=>setBookOpen(true)} className="btn btn-primary" style={{padding:'14px 32px',fontSize:14}}>Book A Free Consultation</button>
            <Link href="/contact" className="btn btn-outline-white" style={{padding:'14px 28px',fontSize:14}}>Send Us A Message</Link>
          </div>
          <p style={{marginTop:20,fontSize:12,color:'rgba(255,255,255,0.25)'}}>
            Or call us: <a href="tel:0244783099" style={{color:'#FFC107',fontWeight:700}}>024 478 3099</a>
          </p>
        </div>
      </div>

      <Footer onBookClick={()=>setBookOpen(true)}/>
      <ChatPanel/>

      {/* Case Study Modal */}
      {mounted && modal && createPortal(
        <div
          onClick={e=>{if(e.target===e.currentTarget)setModal(null);}}
          ref={el=>{if(el)el.scrollTop=0;}}
          style={{position:'fixed',inset:0,background:'rgba(4,14,29,0.92)',backdropFilter:'blur(14px)',zIndex:100002,display:'flex',alignItems:'flex-start',justifyContent:'center',padding:'20px 16px 40px',overflowY:'auto',WebkitOverflowScrolling:'touch'}}
        >
          <div style={{background:'#fff',width:'100%',maxWidth:700,borderRadius:22,overflow:'hidden',boxShadow:'0 40px 100px rgba(4,14,29,0.5)',borderTop:'4px solid #FFC107',animation:'pfIn .36s cubic-bezier(.16,1,.3,1) both',alignSelf:'flex-start',margin:'0 auto'}}>
            {/* Hero image */}
            <div style={{position:'relative',height:260,overflow:'hidden'}}>
              <img src={modal.img} alt={modal.title} style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}}/>
              <div style={{position:'absolute',inset:0,background:'linear-gradient(transparent 30%,rgba(7,22,40,0.85))'}}/>
              <button onClick={()=>setModal(null)} style={{position:'absolute',top:14,right:14,background:'rgba(255,255,255,0.15)',border:'1px solid rgba(255,255,255,0.3)',color:'#fff',width:36,height:36,borderRadius:'50%',cursor:'pointer',fontSize:16,display:'flex',alignItems:'center',justifyContent:'center'}}>&times;</button>
              <div style={{position:'absolute',top:14,left:14,background:'#FFC107',color:'#071628',fontSize:10,fontWeight:800,padding:'4px 12px',borderRadius:20,textTransform:'uppercase',letterSpacing:1}}>{modal.badge}</div>
              <div style={{position:'absolute',bottom:20,left:24,right:24}}>
                <div style={{fontSize:11,fontWeight:700,color:'rgba(255,255,255,0.55)',letterSpacing:'1.5px',textTransform:'uppercase',marginBottom:6}}>{modal.category}</div>
                <h2 style={{fontFamily:'Oswald,sans-serif',fontSize:'clamp(22px,4vw,32px)',fontWeight:700,color:'#fff',lineHeight:1.15}}>{modal.title}</h2>
              </div>
            </div>
            {/* Metrics strip */}
            <div style={{display:'grid',gridTemplateColumns:`repeat(${modal.meta.length},1fr)`,background:'#071628',gap:1}}>
              {modal.meta.map((m,i)=>(
                <div key={i} style={{padding:'14px 16px',textAlign:'center',background:'#0b2240'}}>
                  <div style={{fontFamily:'Oswald,sans-serif',fontSize:18,fontWeight:700,color:'#FFC107',lineHeight:1}}>{m.val}</div>
                  <div style={{fontSize:10,color:'rgba(255,255,255,0.42)',textTransform:'uppercase',letterSpacing:.8,marginTop:4}}>{m.label}</div>
                </div>
              ))}
            </div>
            {/* Body */}
            <div style={{padding:'28px 30px'}}>
              <h3 style={{fontFamily:'Oswald,sans-serif',fontSize:16,fontWeight:700,color:'#071628',textTransform:'uppercase',letterSpacing:'1px',marginBottom:12,display:'flex',alignItems:'center',gap:8}}>
                <span style={{width:3,height:18,background:'#FFC107',borderRadius:2,display:'inline-block'}}/>
                Project Overview
              </h3>
              <p style={{fontSize:15,color:'#5a7186',lineHeight:1.82}}>{modal.fullDesc}</p>
              <div style={{display:'flex',flexWrap:'wrap',gap:7,marginTop:20}}>
                {modal.tags.map(t=><span key={t} style={{fontSize:11,fontWeight:600,padding:'5px 12px',borderRadius:20,background:'#f6f8fd',border:'1px solid #dce8f7',color:'#5a7186'}}>{t}</span>)}
              </div>
            </div>
            {/* Footer */}
            <div style={{padding:'16px 30px 24px',borderTop:'1px solid #dce8f7',display:'flex',gap:10,flexWrap:'wrap'}}>
              <button onClick={()=>{setModal(null);setBookOpen(true);}} className="btn btn-primary" style={{fontSize:13}}>Start a Similar Project</button>
              <button onClick={()=>setModal(null)} className="btn btn-outline" style={{fontSize:13}}>Close</button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
