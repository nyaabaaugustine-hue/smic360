'use client';
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';

/* ─── Types ────────────────────────────────────── */
interface ProjectMeta {
  label: string;
  val: string;
}

interface Project {
  img: string;
  alt: string;
  badge: string;
  title: string;
  desc: string;
  meta: ProjectMeta[];
}

interface ProjectSpotlightProps {
  projects: Project[];
  onBook: () => void;
}

/* ─── Badge colour map ─── */
const BADGE_COLORS: Record<string, { bg: string; color: string; dot: string }> = {
  Marketing:   { bg: 'rgba(0,180,216,0.12)',  color: '#00b4d8', dot: '#00b4d8' },
  'Real Estate':{ bg: 'rgba(255,193,7,0.12)', color: '#D4A017', dot: '#FFC107' },
  Procurement: { bg: 'rgba(22,163,74,0.12)',  color: '#16a34a', dot: '#22c55e' },
  Integrated:  { bg: 'rgba(124,58,237,0.12)', color: '#7c3aed', dot: '#a78bfa' },
};

const ALL_TABS = ['All', 'Marketing', 'Real Estate', 'Procurement'];

/* ─── ProjectDetailModal ──────────────────────── */
function ProjectDetailModal({
  project,
  onClose,
  onBook,
}: {
  project: Project;
  onClose: () => void;
  onBook: () => void;
}) {
  const bc = BADGE_COLORS[project.badge] ?? BADGE_COLORS['Marketing'];

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(4,14,29,0.9)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        zIndex: 999999,
        padding: '20px 16px 40px',
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch' as React.CSSProperties['WebkitOverflowScrolling'],
      }}
    >
      <div style={{
        background: '#fff',
        width: '100%', maxWidth: '700px',
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: '0 40px 100px rgba(4,14,29,0.45)',
        borderTop: `4px solid ${bc.dot}`,
        animation: 'psIn 0.38s cubic-bezier(0.16,1,0.3,1)',
        position: 'relative',
        margin: '0 auto',
        alignSelf: 'flex-start',
      }}>
        <style>{`
          @keyframes psIn {
            from { opacity:0; transform:translateY(28px) scale(0.95); }
            to   { opacity:1; transform:none; }
          }
        `}</style>

        {/* Hero image */}
        <div style={{ position: 'relative', height: 280, overflow: 'hidden', background: '#0b2d56' }}>
          <img
            src={project.img}
            alt={project.alt}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          {/* Gradient overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, transparent 40%, rgba(4,14,29,0.85) 100%)',
          }} />
          {/* Badge */}
          <div style={{
            position: 'absolute', top: 18, left: 20,
            background: bc.bg,
            border: `1px solid ${bc.dot}40`,
            color: bc.color,
            fontSize: 11, fontWeight: 800,
            letterSpacing: '1.5px', textTransform: 'uppercase',
            padding: '5px 14px', borderRadius: 20,
            backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: bc.dot, display: 'inline-block' }} />
            {project.badge}
          </div>
          {/* Close */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: 16, right: 16,
              background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.25)', color: '#fff',
              width: 36, height: 36, borderRadius: '50%',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16, transition: 'all 0.22s', zIndex: 2,
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(220,38,38,0.7)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}
          >✕</button>
          {/* Title over image */}
          <div style={{ position: 'absolute', bottom: 20, left: 24, right: 24, zIndex: 2 }}>
            <h2 style={{
              fontFamily: "'Oswald', sans-serif",
              fontSize: 26, fontWeight: 700, color: '#fff',
              lineHeight: 1.15, margin: 0,
              textShadow: '0 2px 12px rgba(0,0,0,0.5)',
            }}>{project.title}</h2>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: '28px 32px 32px' }}>
          <p style={{ color: '#5a7186', fontSize: 15, lineHeight: 1.8, margin: 0 }}>
            {project.desc}
          </p>

          {/* Meta chips */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${project.meta.length}, 1fr)`,
            gap: 12, marginTop: 24,
          }}>
            {project.meta.map((m, i) => (
              <div key={i} style={{
                background: '#f6f8fd',
                border: '1px solid #dce8f7',
                borderRadius: 14, padding: '14px 16px', textAlign: 'center',
              }}>
                <div style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: 17, fontWeight: 700,
                  color: '#071628', lineHeight: 1,
                }}>{m.val}</div>
                <div style={{ fontSize: 11, color: '#5a7186', marginTop: 5, textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: 600 }}>
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 12, marginTop: 26, flexWrap: 'wrap' }}>
            <button
              onClick={() => { onClose(); onBook(); }}
              style={{
                flex: 1, minWidth: 140,
                padding: '13px 20px',
                background: 'linear-gradient(135deg, #FFC107, #D4A017)',
                color: '#071628', border: 'none', borderRadius: 12,
                fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 14,
                cursor: 'pointer', transition: 'all 0.22s',
                boxShadow: '0 4px 18px rgba(255,193,7,0.35)',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(255,193,7,0.5)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 18px rgba(255,193,7,0.35)'; }}
            >
              Start a Similar Project →
            </button>
            <Link
              href="/portfolio"
              style={{
                flex: 1, minWidth: 140, textAlign: 'center',
                padding: '13px 20px',
                background: 'transparent',
                color: '#D4A017', border: '1.5px solid #D4A017', borderRadius: 12,
                fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 14,
                cursor: 'pointer', transition: 'all 0.22s', display: 'inline-flex',
                alignItems: 'center', justifyContent: 'center',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#D4A017'; (e.currentTarget as HTMLElement).style.color = '#071628'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#D4A017'; }}
            >
              View Full Portfolio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Component ─────────────────────────── */
export default function ProjectSpotlight({ projects, onBook }: ProjectSpotlightProps) {
  const [activeTab, setActiveTab] = useState('All');
  const [detailProject, setDetailProject] = useState<Project | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // Scroll lock for project detail modal — html overflow, keeps floats fixed
  useEffect(() => {
    if (!mounted) return;
    if (detailProject) {
      const y = window.scrollY;
      document.documentElement.dataset.psY = String(y);
      const sw = window.innerWidth - document.documentElement.clientWidth;
      document.documentElement.style.overflow = 'hidden';
      document.documentElement.style.paddingRight = `${sw}px`;
    } else {
      if (document.documentElement.style.overflow === 'hidden') {
        const savedY = parseInt(document.documentElement.dataset.psY || '0', 10);
        document.documentElement.style.overflow = '';
        document.documentElement.style.paddingRight = '';
        delete document.documentElement.dataset.psY;
        window.scrollTo(0, savedY);
      }
    }
  }, [detailProject, mounted]);

  const filtered = activeTab === 'All'
    ? projects
    : projects.filter(p => p.badge === activeTab);

  return (
    <>
      {/* ─── Project Detail Modal – portal ─── */}
      {mounted && detailProject && createPortal(
        <ProjectDetailModal
          project={detailProject}
          onClose={() => setDetailProject(null)}
          onBook={onBook}
        />,
        document.body
      )}

      <section style={{ padding: '100px 0', background: '#f6f8fd', position: 'relative', overflow: 'hidden' }}>
        {/* Background decoration */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle at 15% 80%, rgba(255,193,7,0.05) 0%, transparent 50%), radial-gradient(circle at 85% 20%, rgba(0,180,216,0.05) 0%, transparent 50%)',
        }} />

        <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>

          {/* ─── Header ─── */}
          <div className="reveal" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20, marginBottom: 44 }}>
            <div>
              <span className="tag">Our Work</span>
              <h2 className="section-title">Project <em>Spotlight</em></h2>
              <p className="section-sub" style={{ marginTop: 8 }}>
                Real results for real clients — across marketing, real estate, and procurement.
              </p>
            </div>
            <Link
              href="/portfolio"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                padding: '11px 22px',
                background: 'transparent', color: '#D4A017',
                border: '1.5px solid #D4A017', borderRadius: 10,
                fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 13,
                transition: 'all 0.22s', alignSelf: 'flex-end',
                textDecoration: 'none',
              }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#D4A017'; el.style.color = '#071628'; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'transparent'; el.style.color = '#D4A017'; }}
            >
              Full Portfolio →
            </Link>
          </div>

          {/* ─── Filter Tabs ─── */}
          <div className="reveal" style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 40 }}>
            {ALL_TABS.map(tab => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: '9px 20px',
                    borderRadius: 24,
                    border: isActive ? '1.5px solid #FFC107' : '1.5px solid #dce8f7',
                    background: isActive
                      ? 'linear-gradient(135deg, #FFC107, #D4A017)'
                      : '#fff',
                    color: isActive ? '#071628' : '#5a7186',
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: 13, fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.22s cubic-bezier(0.16,1,0.3,1)',
                    boxShadow: isActive ? '0 4px 14px rgba(255,193,7,0.35)' : 'none',
                    transform: isActive ? 'translateY(-1px)' : 'none',
                    letterSpacing: '0.2px',
                  }}
                >
                  {tab === 'All' ? `All Projects (${projects.length})` : tab}
                </button>
              );
            })}
          </div>

          {/* ─── Projects Grid ─── */}
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#5a7186' }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
              <p style={{ fontSize: 16 }}>No projects in this category yet. Check back soon!</p>
            </div>
          ) : (
            <div
              className="stagger visible ps-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 26,
              }}
            >
              {filtered.map((proj, i) => {
                const bc = BADGE_COLORS[proj.badge] ?? BADGE_COLORS['Marketing'];
                const isHovered = hoveredCard === i;
                return (
                  <div
                    key={i}
                    onClick={() => setDetailProject(proj)}
                    onMouseEnter={() => setHoveredCard(i)}
                    onMouseLeave={() => setHoveredCard(null)}
                    style={{
                      borderRadius: 22,
                      overflow: 'hidden',
                      border: isHovered ? `1.5px solid ${bc.dot}` : '1.5px solid #dce8f7',
                      background: '#fff',
                      boxShadow: isHovered
                        ? `0 24px 64px rgba(4,14,29,0.16), 0 0 0 1px ${bc.dot}30`
                        : '0 4px 24px rgba(7,22,40,0.08)',
                      transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
                      transform: isHovered ? 'translateY(-10px)' : 'none',
                      cursor: 'pointer',
                      display: 'flex', flexDirection: 'column',
                    }}
                  >
                    {/* Image */}
                    <div style={{ position: 'relative', height: 220, overflow: 'hidden', background: '#0b2d56', flexShrink: 0 }}>
                      <img
                        src={proj.img}
                        alt={proj.alt}
                        style={{
                          width: '100%', height: '100%', objectFit: 'cover',
                          display: 'block',
                          transition: 'transform 0.55s ease',
                          transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                        }}
                      />
                      {/* Gradient */}
                      <div style={{
                        position: 'absolute', inset: 0,
                        background: isHovered
                          ? 'linear-gradient(to bottom, rgba(4,14,29,0.15) 0%, rgba(4,14,29,0.65) 100%)'
                          : 'linear-gradient(to bottom, transparent 50%, rgba(4,14,29,0.5) 100%)',
                        transition: 'all 0.35s',
                      }} />
                      {/* Badge */}
                      <div style={{
                        position: 'absolute', top: 14, left: 14,
                        background: bc.bg,
                        border: `1px solid ${bc.dot}40`,
                        color: bc.color,
                        fontSize: 10, fontWeight: 800,
                        letterSpacing: '1.2px', textTransform: 'uppercase',
                        padding: '4px 12px', borderRadius: 18,
                        backdropFilter: 'blur(8px)',
                        display: 'flex', alignItems: 'center', gap: 5,
                      }}>
                        <span style={{ width: 5, height: 5, borderRadius: '50%', background: bc.dot, display: 'inline-block' }} />
                        {proj.badge}
                      </div>
                      {/* Hover CTA overlay */}
                      <div style={{
                        position: 'absolute', inset: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        opacity: isHovered ? 1 : 0,
                        transition: 'opacity 0.3s',
                        zIndex: 2,
                      }}>
                        <div style={{
                          background: 'rgba(255,255,255,0.15)',
                          backdropFilter: 'blur(8px)',
                          border: '1.5px solid rgba(255,255,255,0.3)',
                          color: '#fff',
                          padding: '10px 22px',
                          borderRadius: 24,
                          fontWeight: 700, fontSize: 13,
                          letterSpacing: '0.5px',
                          textTransform: 'uppercase',
                        }}>
                          View Case Study ↗
                        </div>
                      </div>
                    </div>

                    {/* Body */}
                    <div style={{ padding: '22px 22px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <h3 style={{
                        fontFamily: "'Oswald', sans-serif",
                        fontSize: 18, fontWeight: 700,
                        color: '#071628', lineHeight: 1.2,
                        margin: '0 0 8px',
                        transition: 'color 0.22s',
                        ...(isHovered ? { color: '#0b2d56' } : {}),
                      }}>{proj.title}</h3>
                      <p style={{ fontSize: 13, color: '#5a7186', lineHeight: 1.68, margin: 0, flex: 1 }}>
                        {proj.desc}
                      </p>

                      {/* Meta row */}
                      <div style={{
                        display: 'flex', gap: 6, marginTop: 16, paddingTop: 16,
                        borderTop: '1px solid #dce8f7', flexWrap: 'wrap',
                      }}>
                        {proj.meta.map((m, j) => (
                          <div key={j} style={{
                            background: isHovered ? '#f6f8fd' : '#fff',
                            border: '1px solid #dce8f7',
                            borderRadius: 8, padding: '6px 10px',
                            transition: 'all 0.22s',
                          }}>
                            <div style={{ fontSize: 10, color: '#5a7186', textTransform: 'uppercase', letterSpacing: '0.7px', fontWeight: 600 }}>
                              {m.label}
                            </div>
                            <div style={{ fontSize: 12, color: '#071628', fontWeight: 700, marginTop: 2 }}>
                              {m.val}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* CTA row */}
                      <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                        <button
                          onClick={(e) => { e.stopPropagation(); setDetailProject(proj); }}
                          style={{
                            flex: 1, padding: '10px 12px',
                            background: isHovered ? 'linear-gradient(135deg, #FFC107, #D4A017)' : 'transparent',
                            color: isHovered ? '#071628' : '#D4A017',
                            border: `1.5px solid ${isHovered ? '#FFC107' : '#D4A017'}`,
                            borderRadius: 10,
                            fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 12.5,
                            cursor: 'pointer', transition: 'all 0.25s',
                            boxShadow: isHovered ? '0 4px 14px rgba(255,193,7,0.3)' : 'none',
                          }}
                        >
                          View Details
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); onBook(); }}
                          style={{
                            flex: 1, padding: '10px 12px',
                            background: '#071628',
                            color: '#fff',
                            border: '1.5px solid #071628',
                            borderRadius: 10,
                            fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 12.5,
                            cursor: 'pointer', transition: 'all 0.25s',
                          }}
                          onMouseEnter={e => { e.currentTarget.style.background = '#0b2d56'; }}
                          onMouseLeave={e => { e.currentTarget.style.background = '#071628'; }}
                        >
                          Start Similar
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ─── Bottom CTA Banner ─── */}
          <div className="reveal" style={{
            marginTop: 60,
            background: 'linear-gradient(135deg, #040e1d 0%, #0b2d56 55%, #1261c0 100%)',
            borderRadius: 24, padding: '40px 44px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            gap: 24, flexWrap: 'wrap',
            position: 'relative', overflow: 'hidden',
            boxShadow: '0 24px 64px rgba(4,14,29,0.25)',
          }}>
            {/* Grid overlay */}
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              backgroundImage: 'linear-gradient(rgba(0,180,216,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,180,216,0.05) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }} />
            {/* Gold accent line */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #FFC107, #00b4d8, #FFC107)' }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#00b4d8', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ display: 'block', width: 22, height: 2, background: '#00b4d8', borderRadius: 2 }} />
                Ready to Start?
              </div>
              <h3 style={{
                fontFamily: "'Oswald', sans-serif",
                fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 700,
                color: '#fff', margin: 0, lineHeight: 1.1,
              }}>
                Let&apos;s Build Your <em style={{ fontStyle: 'normal', color: '#FFC107' }}>Success Story</em>
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14, marginTop: 8, maxWidth: 440, lineHeight: 1.7 }}>
                Join 80+ businesses across Ghana who have trusted SMIC360 to deliver exceptional results.
              </p>
            </div>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
              <button
                onClick={onBook}
                style={{
                  padding: '13px 28px',
                  background: 'linear-gradient(135deg, #FFC107, #D4A017)',
                  color: '#071628', border: 'none', borderRadius: 11,
                  fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 14,
                  cursor: 'pointer', transition: 'all 0.22s',
                  boxShadow: '0 4px 18px rgba(255,193,7,0.4)',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(255,193,7,0.55)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 18px rgba(255,193,7,0.4)'; }}
              >
                Book Free Consultation →
              </button>
              <Link
                href="/portfolio"
                style={{
                  padding: '13px 28px',
                  background: 'transparent', color: '#fff',
                  border: '1.5px solid rgba(255,255,255,0.35)', borderRadius: 11,
                  fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 14,
                  transition: 'all 0.22s', display: 'inline-flex', alignItems: 'center',
                  textDecoration: 'none', whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#fff'; el.style.background = 'rgba(255,255,255,0.1)'; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(255,255,255,0.35)'; el.style.background = 'transparent'; }}
              >
                See All Work
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Responsive grid styles */}
      <style>{`
        .ps-grid {
          display: grid !important;
          grid-template-columns: repeat(3, 1fr) !important;
          gap: 26px !important;
        }
        @media (max-width: 1024px) {
          .ps-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .ps-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
