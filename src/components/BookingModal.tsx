'use client';
import React, { useState, useEffect } from 'react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  // Forcefully reset state whenever the modal opens
  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      setSelectedService('');
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    try {
      const response = await fetch('https://formspree.io/f/xdayrral', {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });
      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => { onClose(); setTimeout(() => setSubmitted(false), 300); }, 5000);
      }
    } catch (error) {
      console.error('Formspree error:', error);
    }
    setLoading(false);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => { setSubmitted(false); setSelectedService(''); }, 300);
  };

  if (!isOpen) return null;

  const services = [
    { icon: '📣', label: 'Marketing',   value: 'Advertising & Marketing' },
    { icon: '🏡', label: 'Real Estate', value: 'Real Estate Development' },
    { icon: '📦', label: 'Procurement', value: 'Procurement & Supply' },
  ];

  return (
    <div
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(4,14,29,0.88)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 100001,
        padding: '24px 20px',
        backdropFilter: 'blur(10px)',
        overflowY: 'auto',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <style>{`
        .bm-wrap {
          background: #fff;
          width: 100%;
          max-width: 580px;
          border-radius: 20px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 32px 80px rgba(4,14,29,0.35);
          animation: bmIn 0.38s cubic-bezier(0.16,1,0.3,1);
          border-top: 4px solid #FFC107;
          margin: auto;
        }
        @keyframes bmIn { from{opacity:0;transform:translateY(30px) scale(0.94);} to{opacity:1;transform:none;} }

        .bm-header {
          background: linear-gradient(135deg, #040e1d 0%, #0b2d56 55%, #1261c0 100%);
          padding: 28px 36px 24px;
          position: relative;
          overflow: hidden;
        }
        .bm-header::before {
          content: '';
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(0,180,216,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,180,216,0.06) 1px, transparent 1px);
          background-size: 28px 28px;
          pointer-events: none;
        }
        .bm-header::after {
          content: '';
          position: absolute; bottom: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, #FFC107, #00b4d8, #FFC107);
        }
        .bm-title {
          font-family: 'Oswald', sans-serif;
          font-size: 26px; font-weight: 700; color: #fff;
          position: relative; z-index: 1;
        }
        .bm-sub {
          color: rgba(255,255,255,0.52);
          font-size: 13px; margin-top: 4px;
          position: relative; z-index: 1;
        }
        .bm-close {
          position: absolute; top: 14px; right: 14px;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.2);
          color: #fff;
          width: 32px; height: 32px;
          border-radius: 50%; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          font-size: 14px; z-index: 2;
          transition: all 0.25s;
        }
        .bm-close:hover { background: rgba(220,38,38,0.7); transform: rotate(90deg); }

        .bm-body { padding: 28px 36px; }

        /* Service selector */
        .bm-services {
          display: grid; grid-template-columns: repeat(3,1fr);
          gap: 10px; margin-bottom: 22px;
        }
        .bm-svc {
          border: 2px solid #dce8f7;
          border-radius: 12px;
          padding: 12px 8px;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s;
          background: #f6f8fd;
          user-select: none;
        }
        .bm-svc:hover { border-color: #D4A017; background: #FFF9E6; }
        .bm-svc.selected { border-color: #FFC107; background: #FFF9E6; box-shadow: 0 0 0 3px rgba(255,193,7,0.2); }
        .bm-svc-icon { font-size: 22px; display: block; margin-bottom: 5px; }
        .bm-svc-label { font-size: 12px; font-weight: 700; color: #5a7186; }
        .bm-svc.selected .bm-svc-label { color: #D4A017; }

        /* Form fields */
        .bm-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 14px; }
        .bm-group { display: flex; flex-direction: column; gap: 5px; margin-bottom: 14px; }
        .bm-group label {
          font-size: 12px; font-weight: 700;
          color: #071628; letter-spacing: 0.5px;
          text-transform: uppercase;
        }
        .bm-group input,
        .bm-group select,
        .bm-group textarea {
          padding: 11px 15px;
          border-radius: 10px;
          border: 1.5px solid #dce8f7;
          font-family: 'Outfit', sans-serif;
          font-size: 14px; color: #0f1e30;
          background: #fcfdff;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          width: 100%;
          box-sizing: border-box;
        }
        .bm-group input:focus,
        .bm-group select:focus,
        .bm-group textarea:focus {
          border-color: #FFC107;
          box-shadow: 0 0 0 3px rgba(255,193,7,0.15);
          background: #fff;
        }
        .bm-group textarea { resize: none; height: 88px; }

        .bm-submit {
          width: 100%; padding: 14px;
          background: linear-gradient(135deg, #FFC107, #D4A017);
          color: #071628; font-family: 'Outfit', sans-serif;
          font-size: 15px; font-weight: 700;
          border: none; border-radius: 12px;
          cursor: pointer; display: flex; align-items: center;
          justify-content: center; gap: 8px;
          transition: all 0.24s;
          box-shadow: 0 4px 18px rgba(255,193,7,0.35);
          margin-top: 6px;
        }
        .bm-submit:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(255,193,7,0.5); }
        .bm-submit:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }

        .bm-secure {
          text-align: center; margin-top: 12px;
          font-size: 12px; color: #5a7186;
        }

        /* Success state */
        .bm-success { text-align: center; padding: 52px 36px; }
        .bm-success-icon {
          width: 72px; height: 72px;
          background: linear-gradient(135deg, #16a34a, #15803d);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 20px;
          box-shadow: 0 8px 28px rgba(22,163,74,0.3);
          font-size: 30px; color: #fff;
        }
        .bm-success h3 {
          font-family: 'Oswald', sans-serif;
          font-size: 28px; color: #071628; margin-bottom: 10px;
        }
        .bm-success p { color: #5a7186; font-size: 14.5px; line-height: 1.7; max-width: 320px; margin: 0 auto; }
        .bm-success-btns { display: flex; gap: 10px; justify-content: center; margin-top: 24px; }

        @media (max-width: 540px) {
          .bm-header, .bm-body { padding-left: 22px; padding-right: 22px; }
          .bm-row { grid-template-columns: 1fr; }
          .bm-services { grid-template-columns: 1fr 1fr; }
        }

        @keyframes spin { from{transform:rotate(0deg);} to{transform:rotate(360deg);} }
      `}</style>

      <div className="bm-wrap">
        {!submitted ? (
          <>
            <div className="bm-header">
              <button className="bm-close" onClick={handleClose}>✕</button>
              <div className="bm-title">Book A Consultation</div>
              <div className="bm-sub">Our team responds within 2 business hours — no obligation.</div>
            </div>

            <div className="bm-body">
              <form onSubmit={handleSubmit}>
                {/* Hidden service field */}
                <input type="hidden" name="service" value={selectedService} />

                {/* Service selector */}
                <div style={{ marginBottom: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: '#071628', letterSpacing: '0.5px', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>
                    What can we help you with? *
                  </label>
                  <div className="bm-services">
                    {services.map((s) => (
                      <div
                        key={s.value}
                        className={`bm-svc${selectedService === s.value ? ' selected' : ''}`}
                        onClick={() => setSelectedService(s.value)}
                      >
                        <span className="bm-svc-icon">{s.icon}</span>
                        <span className="bm-svc-label">{s.label}</span>
                      </div>
                    ))}
                  </div>
                  {!selectedService && (
                    <p style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '8px' }}>
                      Please select a service above
                    </p>
                  )}
                </div>

                <div className="bm-row">
                  <div className="bm-group">
                    <label>Full Name *</label>
                    <input type="text" name="name" placeholder="Your full name" required />
                  </div>
                  <div className="bm-group">
                    <label>Email Address *</label>
                    <input type="email" name="email" placeholder="your@email.com" required />
                  </div>
                </div>

                <div className="bm-row">
                  <div className="bm-group">
                    <label>Phone Number</label>
                    <input type="tel" name="phone" placeholder="024 XXX XXXX" />
                  </div>
                  <div className="bm-group">
                    <label>Company / Organisation</label>
                    <input type="text" name="company" placeholder="Your company name" />
                  </div>
                </div>

                <div className="bm-group">
                  <label>Message</label>
                  <textarea name="message" placeholder="Tell us briefly about your project or need..." />
                </div>

                <button
                  type="submit"
                  className="bm-submit"
                  disabled={loading || !selectedService}
                >
                  {loading ? (
                    <>
                      <span style={{ display: 'inline-block', width: 16, height: 16, border: '2px solid rgba(7,22,40,0.3)', borderTopColor: '#071628', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                      Sending…
                    </>
                  ) : 'Submit Request →'}
                </button>

                <p className="bm-secure">🔒 Your details are secure and will never be shared.</p>
              </form>
            </div>
          </>
        ) : (
          <div className="bm-success">
            <div className="bm-success-icon">✓</div>
            <h3>Request Received!</h3>
            <p>Thank you for reaching out to SMIC360. A member of our team will contact you within 2 business hours.</p>
            <div className="bm-success-btns">
              <button
                onClick={handleClose}
                style={{ padding: '11px 24px', background: 'linear-gradient(135deg,#FFC107,#D4A017)', color: '#071628', fontWeight: 700, border: 'none', borderRadius: 10, cursor: 'pointer', fontFamily: 'Outfit,sans-serif' }}
              >
                Close
              </button>
              <a
                href="tel:0244783099"
                style={{ padding: '11px 24px', border: '1.5px solid #D4A017', color: '#D4A017', fontWeight: 700, borderRadius: 10, fontFamily: 'Outfit,sans-serif', display: 'inline-flex', alignItems: 'center' }}
              >
                Call Us Now
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
