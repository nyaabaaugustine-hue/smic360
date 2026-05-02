'use client';
import React, { useState, useEffect } from 'react';
import { Counter } from './Counter';
import { clImg } from './ui/cloudinary';

interface HeroSlide {
  bg: string;
  live: string;
  title: string;
  titleEm: string;
  desc: string;
  btn1: string;
  btn2: string;
  cardImg: string;
  cardTitle: string;
  cardDesc: string;
  cardTags: string[];
}

const slides: HeroSlide[] = [
  {
    bg: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=75',
    live: 'Now Operating Across Ghana',
    title: 'Building Foundations.',
    titleEm: 'Branding Futures.',
    desc: 'SMIC360 delivers end-to-end business solutions — from creative marketing and real estate development to precision procurement — all under one roof, engineered for your growth.',
    btn1: 'Explore Solutions',
    btn2: 'Book A Consultation',
    cardImg:
      'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777110562/A-Guide-to-Media-Buying-Definition-Importance-Impact-and-Benefits-scaled-copy_uidwzc.jpg',
    cardTitle: '360° Business Solutions',
    cardDesc: 'Strategy, execution, and growth — all from one trusted partner in Ghana.',
    cardTags: ['Marketing', 'Real Estate', 'Procurement'],
  },
  {
    bg: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777111208/WhatsApp-Image-2025-08-18-at-14.16.35_e93040d9l_gwfnmu.jpg',
    live: 'The Phoenix Enclave',
    title: 'Building',
    titleEm: 'Foundations.',
    desc: 'Discover modern gated communities and commercial developments designed for the future of Ghana. Quality and excellence in every brick.',
    btn1: 'View Properties',
    btn2: 'Inquire Now',
    cardImg: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=75',
    cardTitle: 'Real Estate Development',
    cardDesc: 'Modern architecture and premium finishes for the Ghanaian market.',
    cardTags: ['Property', 'Investment'],
  },
  {
    bg: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777110562/A-Guide-to-Media-Buying-Definition-Importance-Impact-and-Benefits-scaled-copy_uidwzc.jpg',
    live: 'Strategic Marketing',
    title: 'Branding',
    titleEm: 'Futures.',
    desc: 'Unlock growth with precision media buying and creative strategy. We position your brand exactly where it needs to be to win the market.',
    btn1: 'View Portfolio',
    btn2: 'Start a Campaign',
    cardImg: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    cardTitle: 'Marketing & Media',
    cardDesc: 'Full-funnel advertising and data-driven brand growth.',
    cardTags: ['Media Buying', 'Branding'],
  },
  {
    bg: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777106950/Foxcooling-website-cover_p5grjz.jpg',
    live: 'Precision Supply',
    title: 'Connecting',
    titleEm: 'Markets.',
    desc: 'Tailor-made procurement solutions designed to give you maximum value for money. We source and supply with precision, engineered for your growth.',
    btn1: 'Supply Services',
    btn2: 'Get a Quote',
    cardImg:
      'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777106950/ec234641a21a9e03c50b708351c53603_vl5piv.jpg',
    cardTitle: 'Procurement & Supply',
    cardDesc: 'End-to-end supply chain management and expert vendor negotiation.',
    cardTags: ['Logistics', 'Sourcing'],
  },
];

interface HeroProps {
  onBookClick: () => void;
}

export default function HeroSlider({ onBookClick }: HeroProps) {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const jumpTo = (n: number) => setActiveIdx(n);

  return (
    <section className="hero">
      <div className="hero-slides">
        {slides.map((slide, i) => (
          <div key={i} className={`hero-slide${activeIdx === i ? ' active' : ''}`}>
          <div className="hero-slide-bg" style={{ backgroundImage: `url('${clImg(slide.bg, 1600)}')` }}></div>
            <div className="hero-grid"></div>
            <div className="hero-glow"></div>
            <div className="hero-content">
              <div className="hero-left">
                <div className="hero-live">
                  <div className="hero-live-dot"></div>
                  {slide.live}
                </div>
                <h1 className="hero-title">
                  {slide.title}
                  <br />
                  <em>{slide.titleEm}</em>
                  {i === 0 && (
                    <>
                      <br />
                      Connecting Markets.
                    </>
                  )}
                </h1>
                <p className="hero-p">{slide.desc}</p>
                <div className="hero-btns">
                  <a href="/solutions" className="btn btn-primary">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                    {slide.btn1}
                  </a>
                  <button onClick={onBookClick} className="btn btn-outline-white">
                    {slide.btn2}
                  </button>
                </div>
                {i === 0 && (
                  <div className="hero-stats">
                    <div className="hero-stat">
                      <div className="hero-stat-num">
                        <Counter target={150} />
                        <span>+</span>
                      </div>
                      <div className="hero-stat-label">Projects Delivered</div>
                    </div>
                    <div className="hero-stat">
                      <div className="hero-stat-num">
                        <Counter target={80} />
                        <span>+</span>
                      </div>
                      <div className="hero-stat-label">Happy Clients</div>
                    </div>
                    <div className="hero-stat">
                      <div className="hero-stat-num">
                        <Counter target={8} />
                      </div>
                      <div className="hero-stat-label">Years of Excellence</div>
                    </div>
                    <div className="hero-stat">
                      <div className="hero-stat-num">
                        <Counter target={3} />
                      </div>
                      <div className="hero-stat-label">Core Divisions</div>
                    </div>
                  </div>
                )}
              </div>
              <div className="hero-card">
                <img className="hero-card-img" src={clImg(slide.cardImg, 600)} alt={slide.cardTitle} />
                <div className="hero-card-body">
                  <h3>{slide.cardTitle}</h3>
                  <p>{slide.cardDesc}</p>
                  <div className="hero-card-tags">
                    {slide.cardTags.map((tag, j) => (
                      <span key={j} className="hero-tag-pill">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="hero-dots">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`hero-dot${activeIdx === i ? ' active' : ''}`}
            onClick={() => jumpTo(i)}
          ></div>
        ))}
      </div>
    </section>
  );
}
