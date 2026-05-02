'use client';
import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatPanel from '@/components/ChatPanel';

export default function NotFound() {
  return (
    <>
      <style>{`
        .nf-page { min-height:100vh; display:flex; flex-direction:column; background:var(--white,#fff); }
        .nf-body {
          flex:1; display:flex; align-items:center; justify-content:center;
          padding:80px 28px;
          background:
            radial-gradient(ellipse 70% 60% at 50% -10%, rgba(255,193,7,0.07) 0%, transparent 70%),
            radial-gradient(ellipse 50% 40% at 80% 110%, rgba(0,180,216,0.05) 0%, transparent 70%);
        }
        .nf-inner { text-align:center; max-width:580px; }
        .nf-code {
          font-family:'Oswald',sans-serif;
          font-size:clamp(90px,18vw,160px);
          font-weight:700;
          line-height:1;
          background:linear-gradient(135deg,#FFC107 0%,#D4A017 40%,#00b4d8 100%);
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          background-clip:text;
          margin-bottom:8px;
          letter-spacing:-4px;
        }
        .nf-icon { font-size:48px; margin-bottom:16px; }
        .nf-title {
          font-family:'Oswald',sans-serif;
          font-size:clamp(22px,4vw,32px);
          font-weight:700;
          color:#071628;
          margin-bottom:12px;
        }
        .nf-sub {
          font-size:15.5px;
          color:#5a7186;
          line-height:1.75;
          max-width:420px;
          margin:0 auto 36px;
        }
        .nf-links {
          display:flex; gap:12px; justify-content:center;
          flex-wrap:wrap; margin-bottom:48px;
        }
        .nf-divider {
          border:none; border-top:1px solid #dce8f7;
          margin:0 auto 28px; max-width:300px;
        }
        .nf-pages-label {
          font-size:11px; font-weight:700; letter-spacing:2px;
          text-transform:uppercase; color:#9bb4cc;
          margin-bottom:16px;
        }
        .nf-pages {
          display:flex; gap:10px; justify-content:center;
          flex-wrap:wrap;
        }
        .nf-page-link {
          font-size:13px; font-weight:600;
          color:#5a7186;
          padding:6px 14px;
          border-radius:8px;
          border:1px solid #dce8f7;
          transition:all 0.2s;
          background:#f9fbff;
        }
        .nf-page-link:hover {
          color:#071628;
          border-color:#FFC107;
          background:#fffbe6;
        }
      `}</style>

      <div className="nf-page">
        <Navbar onBookClick={() => {}} />

        <div className="nf-body">
          <div className="nf-inner">
            <div className="nf-icon">🗂️</div>
            <div className="nf-code">404</div>
            <h1 className="nf-title">Page Not Found</h1>
            <p className="nf-sub">
              The page you&apos;re looking for doesn&apos;t exist or may have moved.
              Let&apos;s get you back on track.
            </p>

            <div className="nf-links">
              <Link href="/" className="btn btn-primary" style={{ textDecoration:'none' }}>
                ← Back to Home
              </Link>
              <Link href="/contact" className="btn btn-outline" style={{ textDecoration:'none' }}>
                Contact Us
              </Link>
            </div>

            <hr className="nf-divider" />
            <p className="nf-pages-label">Or visit a page</p>
            <div className="nf-pages">
              {[
                { href:'/about',     label:'About Us' },
                { href:'/solutions', label:'Solutions' },
                { href:'/portfolio', label:'Portfolio' },
                { href:'/blog',      label:'Blog' },
                { href:'/faq',       label:'FAQ' },
              ].map(({ href, label }) => (
                <Link key={href} href={href} className="nf-page-link">{label}</Link>
              ))}
            </div>
          </div>
        </div>

        <Footer onBookClick={() => {}} />
        <ChatPanel />
      </div>
    </>
  );
}
