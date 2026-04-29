'use client';
import React, { useState } from 'react';
import Link from 'next/link';

type AuthMode = 'login' | 'register' | 'forgot';

export default function BusinessLoginPage() {
  const [mode, setMode] = useState<AuthMode>('login');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  // Lock body scroll only while on this page, clean up on unmount
  React.useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
      document.documentElement.style.overflow = '';
    };
  }, []);

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [regName, setRegName] = useState('');
  const [regCompany, setRegCompany] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirm, setRegConfirm] = useState('');
  const [regService, setRegService] = useState('');

  const [forgotEmail, setForgotEmail] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setError('This portal is being configured. Contact info@smic360.com or call 024 478 3099 for access.');
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (regPassword !== regConfirm) { setError('Passwords do not match.'); return; }
    setLoading(true); setError('');
    const fd = new FormData();
    fd.append('name', regName); fd.append('company', regCompany);
    fd.append('email', regEmail); fd.append('phone', regPhone);
    fd.append('service', regService);
    fd.append('_subject', 'New Business Portal Registration Request');
    try {
      const res = await fetch('https://formspree.io/f/xdayrral', { method: 'POST', body: fd, headers: { Accept: 'application/json' } });
      if (res.ok) setDone(true);
      else setError('Registration failed. Please try again or contact us directly.');
    } catch { setError('Connection error. Please try again.'); }
    setLoading(false);
  };

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError('');
    const fd = new FormData();
    fd.append('email', forgotEmail);
    fd.append('_subject', 'Business Portal Password Reset Request');
    try {
      const res = await fetch('https://formspree.io/f/xdayrral', { method: 'POST', body: fd, headers: { Accept: 'application/json' } });
      if (res.ok) setDone(true);
      else setError('Failed to send reset email. Please contact info@smic360.com.');
    } catch { setError('Connection error. Please try again.'); }
    setLoading(false);
  };

  const switchMode = (m: AuthMode) => { setMode(m); setError(''); setDone(false); };

  return (
    <>
      <style>{`
        /* ── Full-viewport, no-scroll layout ── */
        /* overflow:hidden applied via useEffect to avoid global bleed */

        .blp {
          height: 100dvh;
          display: flex;
          flex-direction: column;
          background: linear-gradient(135deg, #040e1d 0%, #0b2d56 55%, #071628 100%);
          overflow: hidden;
          position: relative;
          font-family: 'Outfit', sans-serif;
        }
        .blp-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(0,180,216,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,180,216,0.05) 1px, transparent 1px);
          background-size: 56px 56px;
          pointer-events: none;
        }

        /* ── Header bar ── */
        .blp-bar {
          flex-shrink: 0;
          padding: 14px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          position: relative;
          z-index: 10;
        }
        .blp-logo {
          display: flex; align-items: center; gap: 10px;
          font-family: 'Oswald', sans-serif;
          font-size: 18px; font-weight: 700; color: #fff;
          text-decoration: none;
        }
        .blp-logo img { height: 34px; width: auto; border-radius: 7px; }
        .blp-back {
          font-size: 12.5px; color: rgba(255,255,255,0.5);
          text-decoration: none; transition: color 0.2s;
        }
        .blp-back:hover { color: #FFC107; }

        /* ── Center stage ── */
        .blp-stage {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 10;
          padding: 12px 20px;
          overflow: hidden;
        }

        /* ── Card ── */
        .blp-card {
          background: rgba(255,255,255,0.97);
          border-radius: 20px;
          width: 100%;
          max-width: 440px;
          overflow: hidden;
          box-shadow: 0 28px 70px rgba(0,0,0,0.45);
          border-top: 3px solid #FFC107;
          display: flex;
          flex-direction: column;
          max-height: calc(100dvh - 100px);
        }

        /* ── Card header ── */
        .blp-ch {
          flex-shrink: 0;
          background: linear-gradient(135deg, #071628 0%, #0b2d56 60%, #1261c0 100%);
          padding: 18px 28px 16px;
          position: relative;
          overflow: hidden;
        }
        .blp-ch::before {
          content: '';
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(0,180,216,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,180,216,0.07) 1px, transparent 1px);
          background-size: 22px 22px;
        }
        .blp-ch::after {
          content: '';
          position: absolute; bottom: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, #FFC107, #00b4d8, #FFC107);
        }
        .blp-ch-row {
          display: flex; align-items: center; gap: 12px;
          position: relative; z-index: 1;
        }
        .blp-ch-icon {
          width: 40px; height: 40px;
          border-radius: 10px;
          background: rgba(255,255,255,0.1);
          border: 1.5px solid rgba(255,255,255,0.18);
          display: flex; align-items: center; justify-content: center;
          font-size: 20px; flex-shrink: 0;
        }
        .blp-ch-title {
          font-family: 'Oswald', sans-serif;
          font-size: 20px; font-weight: 700; color: #fff;
          line-height: 1.1;
        }
        .blp-ch-sub {
          color: rgba(255,255,255,0.5);
          font-size: 11.5px; margin-top: 2px;
        }

        /* ── Card body (scrollable internally if needed) ── */
        .blp-cb {
          flex: 1;
          overflow-y: auto;
          padding: 18px 28px 20px;
          scrollbar-width: thin;
          scrollbar-color: rgba(212,160,23,0.3) transparent;
        }
        .blp-cb::-webkit-scrollbar { width: 4px; }
        .blp-cb::-webkit-scrollbar-thumb { background: rgba(212,160,23,0.3); border-radius: 2px; }

        /* ── Tabs ── */
        .blp-tabs {
          display: flex; gap: 3px;
          background: #f0f4fa;
          border-radius: 9px; padding: 3px;
          margin-bottom: 16px;
        }
        .blp-tab {
          flex: 1; padding: 7px 10px;
          border-radius: 7px; border: none;
          font-family: 'Outfit', sans-serif;
          font-size: 12.5px; font-weight: 600;
          cursor: pointer; transition: all 0.22s;
          color: #5a7186; background: transparent;
        }
        .blp-tab.active {
          background: #fff; color: #071628;
          box-shadow: 0 2px 8px rgba(7,22,40,0.1);
        }

        /* ── Form elements ── */
        .blp-fg {
          display: flex; flex-direction: column; gap: 4px;
          margin-bottom: 11px;
        }
        .blp-fg label {
          font-size: 11px; font-weight: 700;
          color: #071628; letter-spacing: 0.3px;
          text-transform: uppercase;
        }
        .blp-fg input,
        .blp-fg select {
          padding: 9px 13px;
          border-radius: 9px;
          border: 1.5px solid #dce8f7;
          font-family: 'Outfit', sans-serif;
          font-size: 13.5px;
          outline: none; transition: all 0.22s;
          background: #fcfdff; color: #0f1e30;
          width: 100%;
          box-sizing: border-box;
        }
        .blp-fg input:focus,
        .blp-fg select:focus {
          border-color: #FFC107;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(212,160,23,0.12);
        }
        .blp-pw { position: relative; }
        .blp-pw input { padding-right: 42px; }
        .blp-eye {
          position: absolute; right: 12px; top: 50%;
          transform: translateY(-50%);
          background: none; border: none;
          cursor: pointer; color: #5a7186;
          font-size: 14px; padding: 0; line-height: 1;
        }
        .blp-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        .blp-remember {
          display: flex; align-items: center; gap: 7px;
          font-size: 12.5px; color: #5a7186;
          cursor: pointer; margin-bottom: 14px;
        }
        .blp-remember input { width: auto; margin: 0; }

        /* ── Submit button ── */
        .blp-btn {
          width: 100%; padding: 11px;
          border-radius: 10px;
          background: linear-gradient(135deg, #FFC107, #D4A017);
          color: #071628;
          font-family: 'Outfit', sans-serif;
          font-size: 14px; font-weight: 700;
          border: none; cursor: pointer;
          transition: all 0.24s;
          display: flex; align-items: center; justify-content: center; gap: 7px;
          box-shadow: 0 4px 16px rgba(212,160,23,0.32);
        }
        .blp-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(212,160,23,0.48); }
        .blp-btn:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }
        .blp-spin {
          width: 14px; height: 14px;
          border: 2px solid rgba(7,22,40,0.22);
          border-top-color: #071628;
          border-radius: 50%;
          animation: blp-spin 0.7s linear infinite;
        }
        @keyframes blp-spin { to { transform: rotate(360deg); } }

        /* ── Error / success ── */
        .blp-err {
          background: #fef2f2; border: 1px solid #fecaca;
          color: #dc2626; border-radius: 9px;
          padding: 9px 13px; font-size: 12.5px;
          margin-bottom: 12px; line-height: 1.55;
        }
        .blp-ok {
          background: #f0fdf4; border: 1px solid #bbf7d0;
          color: #16a34a; border-radius: 10px;
          padding: 16px; font-size: 13px;
          text-align: center; line-height: 1.65;
        }
        .blp-ok strong { display: block; font-size: 15px; margin-bottom: 6px; }

        /* ── Footer strip ── */
        .blp-foot {
          flex-shrink: 0;
          padding: 10px 32px;
          text-align: center;
          font-size: 11px;
          color: rgba(255,255,255,0.28);
          border-top: 1px solid rgba(255,255,255,0.06);
          position: relative; z-index: 10;
        }
        .blp-foot a { color: rgba(255,255,255,0.35); transition: color 0.2s; }
        .blp-foot a:hover { color: #FFC107; }

        /* ── Forgot / alt links ── */
        .blp-link-btn {
          background: none; border: none;
          color: #D4A017; font-weight: 700;
          cursor: pointer; font-size: 12.5px;
          font-family: 'Outfit', sans-serif;
          padding: 0;
        }
        .blp-divider {
          display: flex; align-items: center; gap: 10px;
          margin: 12px 0; color: #a0b0c0; font-size: 11px;
        }
        .blp-divider::before, .blp-divider::after {
          content: ''; flex: 1; height: 1px; background: #dce8f7;
        }

        /* ── Mobile tweaks ── */
        @media (max-width: 480px) {
          .blp-bar { padding: 12px 18px; }
          .blp-cb { padding: 14px 18px 16px; }
          .blp-row { grid-template-columns: 1fr; gap: 0; }
          .blp-foot { padding: 8px 18px; }
        }
      `}</style>

      <div className="blp">
        <div className="blp-grid" />

        {/* ── Top bar ── */}
        <div className="blp-bar">
          <Link href="/" className="blp-logo">
            <img
              src="https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777107241/cropped-SMIC-01-180x180_pffxe7.jpg"
              alt="SMIC360"
            />
            SMIC360
          </Link>
          <Link href="/" className="blp-back">← Back to Website</Link>
        </div>

        {/* ── Card ── */}
        <div className="blp-stage">
          <div className="blp-card">

            {/* Card header */}
            <div className="blp-ch">
              <div className="blp-ch-row">
                <div className="blp-ch-icon">
                  {mode === 'login' ? '🔐' : mode === 'register' ? '🏢' : '🔑'}
                </div>
                <div>
                  <div className="blp-ch-title">
                    {mode === 'login' && 'Business Portal'}
                    {mode === 'register' && 'Request Access'}
                    {mode === 'forgot' && 'Reset Password'}
                  </div>
                  <div className="blp-ch-sub">
                    {mode === 'login' && 'Sign in to your SMIC360 client dashboard'}
                    {mode === 'register' && 'Apply for access to the client portal'}
                    {mode === 'forgot' && "We'll send a reset link to your registered email"}
                  </div>
                </div>
              </div>
            </div>

            {/* Card body */}
            <div className="blp-cb">

              {/* Tabs */}
              {mode !== 'forgot' && (
                <div className="blp-tabs">
                  <button className={`blp-tab${mode === 'login' ? ' active' : ''}`} onClick={() => switchMode('login')}>Sign In</button>
                  <button className={`blp-tab${mode === 'register' ? ' active' : ''}`} onClick={() => switchMode('register')}>Request Access</button>
                </div>
              )}

              {error && <div className="blp-err">⚠ {error}</div>}

              {/* ── LOGIN ── */}
              {mode === 'login' && !done && (
                <form onSubmit={handleLogin}>
                  <div className="blp-fg">
                    <label>Email Address</label>
                    <input type="email" placeholder="you@company.com" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} required autoComplete="email" />
                  </div>
                  <div className="blp-fg">
                    <label>Password</label>
                    <div className="blp-pw">
                      <input type={showPassword ? 'text' : 'password'} placeholder="Enter your password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} required autoComplete="current-password" />
                      <button type="button" className="blp-eye" onClick={() => setShowPassword(!showPassword)}>{showPassword ? '🙈' : '👁'}</button>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                    <label className="blp-remember" style={{ marginBottom: 0 }}>
                      <input type="checkbox" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} />
                      Remember me
                    </label>
                    <button type="button" className="blp-link-btn" onClick={() => switchMode('forgot')}>Forgot password?</button>
                  </div>
                  <button type="submit" className="blp-btn" disabled={loading}>
                    {loading ? <><span className="blp-spin" /> Signing In…</> : 'Sign In →'}
                  </button>
                  <div className="blp-divider">or</div>
                  <p style={{ textAlign: 'center', fontSize: '12.5px', color: '#5a7186', margin: 0 }}>
                    Need access?{' '}
                    <button type="button" className="blp-link-btn" onClick={() => switchMode('register')}>Request portal access →</button>
                  </p>
                </form>
              )}

              {/* ── REGISTER ── */}
              {mode === 'register' && !done && (
                <form onSubmit={handleRegister}>
                  <div className="blp-row">
                    <div className="blp-fg">
                      <label>Full Name *</label>
                      <input type="text" placeholder="John Doe" value={regName} onChange={e => setRegName(e.target.value)} required />
                    </div>
                    <div className="blp-fg">
                      <label>Company *</label>
                      <input type="text" placeholder="Company Ltd" value={regCompany} onChange={e => setRegCompany(e.target.value)} required />
                    </div>
                  </div>
                  <div className="blp-row">
                    <div className="blp-fg">
                      <label>Email *</label>
                      <input type="email" placeholder="you@company.com" value={regEmail} onChange={e => setRegEmail(e.target.value)} required />
                    </div>
                    <div className="blp-fg">
                      <label>Phone *</label>
                      <input type="tel" placeholder="024 XXX XXXX" value={regPhone} onChange={e => setRegPhone(e.target.value)} required />
                    </div>
                  </div>
                  <div className="blp-fg">
                    <label>Service Interest *</label>
                    <select value={regService} onChange={e => setRegService(e.target.value)} required>
                      <option value="">Select a service…</option>
                      <option>Advertising &amp; Marketing</option>
                      <option>Real Estate Development</option>
                      <option>Procurement &amp; Supply</option>
                      <option>Multiple Services</option>
                    </select>
                  </div>
                  <div className="blp-row">
                    <div className="blp-fg">
                      <label>Password *</label>
                      <div className="blp-pw">
                        <input type={showPassword ? 'text' : 'password'} placeholder="Min 8 chars" value={regPassword} onChange={e => setRegPassword(e.target.value)} required minLength={8} />
                        <button type="button" className="blp-eye" onClick={() => setShowPassword(!showPassword)}>{showPassword ? '🙈' : '👁'}</button>
                      </div>
                    </div>
                    <div className="blp-fg">
                      <label>Confirm *</label>
                      <input type={showPassword ? 'text' : 'password'} placeholder="Repeat" value={regConfirm} onChange={e => setRegConfirm(e.target.value)} required />
                    </div>
                  </div>
                  <button type="submit" className="blp-btn" disabled={loading} style={{ marginTop: '4px' }}>
                    {loading ? <><span className="blp-spin" /> Submitting…</> : 'Request Access →'}
                  </button>
                </form>
              )}

              {/* ── FORGOT ── */}
              {mode === 'forgot' && !done && (
                <form onSubmit={handleForgot}>
                  <div className="blp-fg">
                    <label>Registered Email Address</label>
                    <input type="email" placeholder="you@company.com" value={forgotEmail} onChange={e => setForgotEmail(e.target.value)} required autoComplete="email" />
                  </div>
                  <button type="submit" className="blp-btn" disabled={loading}>
                    {loading ? <><span className="blp-spin" /> Sending…</> : 'Send Reset Link →'}
                  </button>
                  <p style={{ textAlign: 'center', marginTop: '12px', fontSize: '12.5px', color: '#5a7186' }}>
                    <button type="button" className="blp-link-btn" onClick={() => switchMode('login')}>← Back to Sign In</button>
                  </p>
                </form>
              )}

              {/* ── SUCCESS ── */}
              {done && (
                <div className="blp-ok">
                  <div style={{ fontSize: '36px', marginBottom: '8px' }}>{mode === 'register' ? '🎉' : '📧'}</div>
                  {mode === 'register' ? (
                    <><strong>Request received!</strong>Our team will review your application and contact you within 1 business day.</>
                  ) : (
                    <><strong>Reset link sent!</strong>Check your inbox — or contact <a href="mailto:info@smic360.com" style={{ color: '#16a34a', fontWeight: 700 }}>info@smic360.com</a>.</>
                  )}
                  <div style={{ marginTop: '14px' }}>
                    <button onClick={() => { setDone(false); setMode('login'); }} style={{ background: 'none', border: '1.5px solid #16a34a', color: '#16a34a', borderRadius: '8px', padding: '7px 18px', cursor: 'pointer', fontWeight: 700, fontSize: '12.5px', fontFamily: 'Outfit, sans-serif' }}>
                      Back to Sign In
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="blp-foot">
          © 2025 SMIC360 Limited · <a href="/privacy">Privacy</a> · <a href="/terms">Terms</a> · <a href="mailto:info@smic360.com">info@smic360.com</a> · <a href="tel:0244783099">024 478 3099</a>
        </div>
      </div>
    </>
  );
}
