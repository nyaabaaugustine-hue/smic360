'use client';
import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface Message { text: string; type: 'bot' | 'user'; time: string; }

const WELCOME: Message = {
  text: "👋 Akwaaba! I'm Ama, your SMIC360 virtual receptionist.\n\nI can tell you about our **Marketing**, **Real Estate** (Phoenix Enclave), and **Procurement** services — or help you book a free consultation.\n\nHow can I help you today?",
  type: 'bot',
  time: 'Just now',
};

const QUICK_REPLIES = [
  { label: '📢 Marketing', msg: 'Tell me about your marketing and advertising services' },
  { label: '🏗️ Phoenix Enclave', msg: 'Tell me about Phoenix Enclave real estate project' },
  { label: '📦 Procurement', msg: 'Tell me about your procurement and supply services' },
  { label: '📅 Book a Call', msg: 'I would like to book a free consultation' },
];

export default function ChatPanel() {
  const [mounted, setMounted]         = useState(false);
  const [chatOpen, setChatOpen]       = useState(false);
  const [scrollShow, setScrollShow]   = useState(false);
  const [unread, setUnread]           = useState(0);
  const [messages, setMessages]       = useState<Message[]>([WELCOME]);
  const [inputVal, setInputVal]       = useState('');
  const [isTyping, setIsTyping]       = useState(false);
  const [waModal, setWaModal]         = useState(false);
  const [waPhone, setWaPhone]         = useState('');
  const [waName, setWaName]           = useState('');
  const [waStep, setWaStep]           = useState<'form'|'submitting'|'done'>('form');
  const [waError, setWaError]         = useState('');
  const endRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrollShow(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    // Tease the chat after 8s if not opened
    const tease = setTimeout(() => { if (!chatOpen) setUnread(1); }, 8000);
    return () => { window.removeEventListener('scroll', onScroll); clearTimeout(tease); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Lock body scroll on mobile when chat is open
  useEffect(() => {
    if (chatOpen) {
      setUnread(0);
      if (window.innerWidth < 640) document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [chatOpen]);

  const getTime = () => {
    const d = new Date();
    return `${d.getHours()}:${String(d.getMinutes()).padStart(2,'0')}`;
  };

  const addMsg = (text: string, type: 'bot'|'user') =>
    setMessages(p => [...p, { text, type, time: getTime() }]);

  const clearChat = () => setMessages([WELCOME]);

  const sendMsg = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setInputVal('');
    addMsg(trimmed, 'user');
    setIsTyping(true);
    try {
      const history = messages.map(m => ({
        role: m.type === 'bot' ? 'assistant' : 'user',
        content: m.text,
      }));
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...history, { role: 'user', content: trimmed }] }),
      });
      const data = await res.json();
      setIsTyping(false);
      addMsg(
        data.text || "I'm having trouble right now. Please call us at 📞 024 478 3099 or WhatsApp us!",
        'bot'
      );
    } catch {
      setIsTyping(false);
      addMsg("I'm having trouble connecting. Please call 📞 024 478 3099 or tap WhatsApp below!", 'bot');
    }
  };

  /* ── WhatsApp lead capture ── */
  const handleWaClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // If already captured this session, go straight through
    const saved = sessionStorage.getItem('smic_wa_phone');
    if (saved) {
      window.open(`https://wa.me/233244783099?text=Hi%20SMIC360!%20My%20number%20is%20${encodeURIComponent(saved)}`, '_blank');
      return;
    }
    setWaStep('form');
    setWaError('');
    setWaModal(true);
    setTimeout(() => phoneRef.current?.focus(), 120);
  };

  const handleWaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const phone = waPhone.trim();
    const name  = waName.trim();
    // Basic Ghana phone validation (starts with 0 or +233, 10 digits local)
    const cleaned = phone.replace(/\s|-/g, '');
    const valid = /^(\+233|0)[0-9]{9}$/.test(cleaned);
    if (!valid) {
      setWaError('Please enter a valid Ghana phone number (e.g. 024 478 3099)');
      return;
    }
    setWaStep('submitting');
    // Save to session so repeat clicks skip the modal
    sessionStorage.setItem('smic_wa_phone', cleaned);
    // Send lead to Formspree silently
    try {
      await fetch('https://formspree.io/f/xdayrral', {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ _subject: 'WhatsApp Lead', name: name || 'Not provided', phone: cleaned, source: 'WhatsApp Button' }),
      });
    } catch { /* silent — don't block user */ }
    setWaStep('done');
    // After 1.2s show success then open WhatsApp
    setTimeout(() => {
      setWaModal(false);
      setWaStep('form');
      const msg = name
        ? `Hi SMIC360! I'm ${encodeURIComponent(name)}. Please reach me on ${encodeURIComponent(cleaned)}.`
        : `Hi SMIC360! Please reach me on ${encodeURIComponent(cleaned)}.`;
      window.open(`https://wa.me/233244783099?text=${msg}`, '_blank');
    }, 1200);
  };

  const toggleTheme = () => {
    const curr = document.documentElement.getAttribute('data-theme');
    const next = curr === 'midnight' ? 'default' : 'midnight';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  };

  // Render bold-like markdown (**text**) as <strong>
  const renderText = (text: string) => {
    return text.split('\n').map((line, i, arr) => {
      const parts = line.split(/\*\*(.*?)\*\*/g).map((part, j) =>
        j % 2 === 1 ? <strong key={j}>{part}</strong> : part
      );
      return <React.Fragment key={i}>{parts}{i < arr.length - 1 && <br />}</React.Fragment>;
    });
  };

  if (!mounted) return null;

  return createPortal(
    <>
      <style>{`
        /* ────────────────────────────────────────────────────────
           SCROLL TO TOP
        ──────────────────────────────────────────────────────── */
        #s360-top {
          position: fixed; bottom: 28px; left: 22px; z-index: 9990;
          width: 44px; height: 44px; border-radius: 50%;
          background: linear-gradient(135deg, #071628, #0b2240);
          color: #FFC107; border: 1.5px solid rgba(255,193,7,0.35);
          box-shadow: 0 6px 20px rgba(7,22,40,0.4);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: opacity .3s, visibility .3s, transform .25s, background .25s;
        }
        #s360-top:hover { background: #FFC107; color: #071628; transform: translateY(-4px); }

        /* ────────────────────────────────────────────────────────
           WHATSAPP — standalone, always visible, prominent
        ──────────────────────────────────────────────────────── */
        #s360-wa {
          position: fixed; bottom: 24px; right: 22px; z-index: 9999;
          width: 62px; height: 62px; border-radius: 50%;
          background: #25D366;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 8px 32px rgba(37,211,102,0.55);
          cursor: pointer; text-decoration: none;
          border: 3px solid #fff;
          animation: wa-bob 4s ease-in-out infinite;
          transition: transform .25s, box-shadow .25s;
        }
        #s360-wa:hover {
          transform: scale(1.12) translateY(-5px);
          box-shadow: 0 16px 48px rgba(37,211,102,0.7);
          animation-play-state: paused;
        }
        #s360-wa svg { width: 32px; height: 32px; fill: #fff; flex-shrink: 0; }
        @keyframes wa-bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-7px); }
        }
        /* pulse ring */
        #s360-wa::before {
          content: ''; position: absolute; inset: -5px;
          border-radius: 50%; border: 3px solid rgba(37,211,102,0.35);
          animation: wa-ring 2.4s ease-out infinite;
        }
        @keyframes wa-ring {
          0% { transform: scale(1); opacity: .8; }
          100% { transform: scale(1.55); opacity: 0; }
        }
        /* tooltip */
        #s360-wa .wa-tip {
          position: absolute; right: calc(100% + 12px); top: 50%;
          transform: translateY(-50%) translateX(6px);
          background: rgba(5,20,40,0.95); color: #fff;
          font-size: 12px; font-weight: 700;
          white-space: nowrap; padding: 7px 14px;
          border-radius: 10px; pointer-events: none;
          opacity: 0; transition: all .22s;
          border: 1px solid rgba(255,255,255,0.08);
          font-family: 'Outfit', sans-serif;
          box-shadow: 0 8px 24px rgba(0,0,0,0.2);
        }
        #s360-wa .wa-tip::after {
          content: ''; position: absolute; left: 100%; top: 50%;
          transform: translateY(-50%);
          border: 6px solid transparent;
          border-left-color: rgba(5,20,40,0.95);
        }
        #s360-wa:hover .wa-tip { opacity: 1; transform: translateY(-50%) translateX(0); }

        /* ────────────────────────────────────────────────────────
           SECONDARY FABS — stacked above WhatsApp
        ──────────────────────────────────────────────────────── */
        #s360-fabs {
          position: fixed; bottom: 100px; right: 22px; z-index: 9998;
          display: flex; flex-direction: column; gap: 10px; align-items: flex-end;
        }
        @media (max-width:640px) {
          #s360-fabs { bottom: 80px; right: 16px; gap: 8px; }
          #s360-wa { bottom: 16px; right: 16px; width: 52px; height: 52px; }
          #s360-top { bottom: 16px; left: 16px; }
        }
        .s360-fab {
          width: 48px; height: 48px; border-radius: 50%;
          background: #071628; border: 2px solid rgba(255,193,7,0.4);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          box-shadow: 0 6px 20px rgba(7,22,40,0.45);
          transition: transform .25s, box-shadow .25s;
          position: relative;
        }
        .s360-fab:hover { transform: scale(1.1) translateY(-3px); box-shadow: 0 12px 30px rgba(7,22,40,0.55); }
        .s360-fab-img { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; }
        .s360-tip {
          position: absolute; right: calc(100% + 10px); top: 50%;
          transform: translateY(-50%) translateX(5px);
          background: rgba(5,20,40,0.95); color: #fff;
          font-size: 11.5px; font-weight: 700;
          white-space: nowrap; padding: 6px 12px;
          border-radius: 8px; pointer-events: none;
          opacity: 0; transition: all .2s;
          font-family: 'Outfit', sans-serif;
          border: 1px solid rgba(255,255,255,0.07);
          box-shadow: 0 4px 16px rgba(0,0,0,0.2);
        }
        .s360-tip::after {
          content: ''; position: absolute; left: 100%; top: 50%;
          transform: translateY(-50%);
          border: 5px solid transparent;
          border-left-color: rgba(5,20,40,0.95);
        }
        .s360-fab:hover .s360-tip { opacity: 1; transform: translateY(-50%) translateX(0); }

        /* AI fab pulse */
        .s360-fab-ai { animation: ai-glow 3s ease-in-out infinite; }
        @keyframes ai-glow {
          0%, 100% { box-shadow: 0 6px 20px rgba(7,22,40,0.45), 0 0 0 0 rgba(255,193,7,0.4); }
          50% { box-shadow: 0 6px 20px rgba(7,22,40,0.45), 0 0 0 10px rgba(255,193,7,0); }
        }
        /* unread badge */
        .s360-badge {
          position: absolute; top: -4px; right: -4px;
          width: 18px; height: 18px; border-radius: 50%;
          background: #ef4444; color: #fff;
          font-size: 10px; font-weight: 700;
          display: flex; align-items: center; justify-content: center;
          border: 2px solid #071628;
          animation: badge-pop .3s cubic-bezier(0.16,1,0.3,1) both;
        }
        @keyframes badge-pop { from { transform: scale(0); } to { transform: scale(1); } }

        /* ────────────────────────────────────────────────────────
           CHAT PANEL
        ──────────────────────────────────────────────────────── */
        #s360-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.45);
          backdrop-filter: blur(3px);
          z-index: 9996;
        }
        #s360-chat {
          position: fixed; right: 22px; bottom: 100px; z-index: 9997;
          width: min(370px, calc(100vw - 44px));
          max-height: calc(100dvh - 140px);
          background: #fff; border-radius: 22px;
          box-shadow: 0 28px 80px rgba(0,0,0,0.28), 0 0 0 1px rgba(255,193,7,0.1);
          display: flex; flex-direction: column; overflow: hidden;
          animation: chatIn .32s cubic-bezier(0.16,1,0.3,1) both;
        }
        @keyframes chatIn {
          from { opacity: 0; transform: translateY(18px) scale(0.95); }
          to   { opacity: 1; transform: none; }
        }

        /* chat header */
        .cp-head {
          flex-shrink: 0;
          background: linear-gradient(135deg, #040e1d, #0b2d56 55%, #1261c0);
          padding: 14px 16px;
          display: flex; align-items: center; gap: 11px;
          border-radius: 22px 22px 0 0;
          position: relative;
        }
        .cp-head::after {
          content: ''; position: absolute; bottom: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, #FFC107, #00b4d8, #FFC107);
        }
        .cp-avatar {
          width: 38px; height: 38px; border-radius: 50%;
          overflow: hidden; border: 2px solid rgba(255,255,255,0.2);
          flex-shrink: 0;
        }
        .cp-avatar img { width: 100%; height: 100%; object-fit: contain; }
        .cp-info { flex: 1; min-width: 0; }
        .cp-info h4 {
          font-family: 'Oswald', sans-serif; font-size: 14px;
          font-weight: 700; color: #fff; white-space: nowrap;
          overflow: hidden; text-overflow: ellipsis;
        }
        .cp-info p { font-size: 10.5px; color: rgba(255,255,255,0.45); margin-top: 1px; }
        .cp-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: #25d366; flex-shrink: 0;
          animation: dot-pulse 2s infinite;
        }
        @keyframes dot-pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
        .cp-ctrl {
          background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.14);
          color: #fff; width: 27px; height: 27px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: background .2s; flex-shrink: 0;
          font-size: 12px;
        }
        .cp-ctrl:hover { background: rgba(220,38,38,0.55); }

        /* messages */
        .cp-msgs {
          flex: 1; overflow-y: auto; padding: 14px;
          display: flex; flex-direction: column; gap: 10px;
          scroll-behavior: smooth;
        }
        .cp-msgs::-webkit-scrollbar { width: 3px; }
        .cp-msgs::-webkit-scrollbar-thumb { background: rgba(212,160,23,0.25); border-radius: 2px; }
        .cp-msg {
          max-width: 88%; border-radius: 16px;
          padding: 10px 13px; font-size: 13.5px; line-height: 1.6;
          word-break: break-word;
        }
        .cp-msg.bot {
          background: #f4f7fd; color: #0f1e30;
          border-bottom-left-radius: 4px; align-self: flex-start;
          border: 1px solid rgba(220,232,248,0.8);
        }
        .cp-msg.user {
          background: linear-gradient(135deg, #FFC107, #D4A017);
          color: #071628; font-weight: 600;
          border-bottom-right-radius: 4px; align-self: flex-end;
        }
        .cp-time { font-size: 10px; opacity: .4; margin-top: 4px; }
        .cp-typing {
          display: flex; gap: 4px; align-items: center;
          padding: 10px 14px; background: #f4f7fd;
          border-radius: 16px; border-bottom-left-radius: 4px;
          width: fit-content; align-self: flex-start;
          border: 1px solid rgba(220,232,248,0.8);
        }
        .cp-typing span {
          width: 6px; height: 6px; border-radius: 50%;
          background: #7a90a8;
          animation: typing .9s ease-in-out infinite;
        }
        .cp-typing span:nth-child(2) { animation-delay: .15s; }
        .cp-typing span:nth-child(3) { animation-delay: .30s; }
        @keyframes typing {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-7px); }
        }

        /* quick replies */
        .cp-quick {
          flex-shrink: 0; padding: 0 12px 10px;
          display: flex; flex-wrap: wrap; gap: 6px;
        }
        .cp-qbtn {
          font-size: 11.5px; font-weight: 700;
          padding: 5px 11px; border-radius: 20px;
          background: #fffbe6; color: #c49010;
          border: 1.5px solid rgba(212,160,23,0.25);
          cursor: pointer; transition: all .2s;
          font-family: 'Outfit', sans-serif;
        }
        .cp-qbtn:hover { background: #D4A017; color: #fff; border-color: transparent; }

        /* input row */
        .cp-input-row {
          flex-shrink: 0; padding: 10px 12px;
          border-top: 1px solid #e8eef7;
          display: flex; gap: 8px; align-items: center;
          background: #fff;
        }
        .cp-input-row input {
          flex: 1; border: 1.5px solid #dce8f7; border-radius: 22px;
          padding: 9px 15px; font-family: 'Outfit', sans-serif;
          font-size: 13.5px; outline: none; transition: border-color .2s;
          background: #f9fbff; color: #0f1e30;
          min-width: 0;
        }
        .cp-input-row input:focus { border-color: #FFC107; background: #fff; }
        .cp-send {
          width: 36px; height: 36px; border-radius: 50%;
          background: linear-gradient(135deg, #FFC107, #D4A017);
          color: #071628; border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all .22s; flex-shrink: 0;
        }
        .cp-send:hover { transform: scale(1.1) rotate(15deg); }

/* ────────────────────────────────────────────────────────
            MOBILE OVERRIDES
         ──────────────────────────────────────────────────────── */
        /* ── MOBILE: keep everything inside the viewport ── */
        @media (max-width: 480px) {
          /* WhatsApp — bottom-right, small, no overflow */
          #s360-wa {
            width: 50px !important;
            height: 50px !important;
            bottom: 16px !important;
            right: 14px !important;
            border-width: 2px !important;
          }
          #s360-wa svg { width: 26px !important; height: 26px !important; }
          #s360-wa .wa-tip { display: none !important; }
          #s360-wa::before { display: none !important; }

          /* FABs — sit directly above WhatsApp */
          #s360-fabs {
            bottom: 74px !important;
            right: 14px !important;
            gap: 8px !important;
          }
          .s360-fab {
            width: 40px !important;
            height: 40px !important;
          }
          .s360-tip { display: none !important; }

          /* Scroll-to-top — bottom-left */
          #s360-top {
            bottom: 16px !important;
            left: 14px !important;
            right: auto !important;
            width: 40px !important;
            height: 40px !important;
          }

          /* Chat panel — full-width sheet from bottom */
          #s360-chat {
            left: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
            border-radius: 20px 20px 0 0 !important;
            max-height: 82dvh !important;
            animation: chatInMob .3s cubic-bezier(0.16,1,0.3,1) both !important;
          }
          @keyframes chatInMob {
            from { opacity: 0; transform: translateY(60px); }
            to   { opacity: 1; transform: none; }
          }
        }
      `}</style>

      {/* ── Scroll to top ── */}
      <button
        id="s360-top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        style={{ opacity: scrollShow ? 1 : 0, visibility: scrollShow ? 'visible' : 'hidden', border: 'none' }}
      >
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </button>

      {/* ── WhatsApp ── */}
      <a
        id="s360-wa"
        href="https://wa.me/233244783099"
        onClick={handleWaClick}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <span className="wa-tip">💬 Chat on WhatsApp</span>
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      {/* ── Secondary FABs (theme + AI receptionist) ── */}
      <div id="s360-fabs">
        {/* AI Receptionist */}
        <button
          className="s360-fab s360-fab-ai"
          onClick={() => setChatOpen(o => !o)}
          aria-label="Chat with Ama, SMIC360 AI Receptionist"
          aria-expanded={chatOpen}
          style={{ border: 'none', padding: 0, overflow: 'hidden' }}
        >
          <span className="s360-tip">Chat with Ama 🤖</span>
          {unread > 0 && !chatOpen && (
            <span className="s360-badge">{unread}</span>
          )}
          <img
            className="s360-fab-img"
            src="https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777107241/cropped-SMIC-01-180x180_pffxe7.jpg"
            alt="Ama — SMIC360 AI Receptionist"
          />
        </button>
      </div>

      {/* ── Chat overlay ── */}
      {chatOpen && (
        <div id="s360-overlay" onClick={() => setChatOpen(false)} aria-hidden="true" />
      )}

      {/* ── Chat Panel ── */}
      {chatOpen && (
        <div id="s360-chat" role="dialog" aria-modal="true" aria-label="Chat with Ama, SMIC360 AI Receptionist">

          {/* Header */}
          <div className="cp-head">
            <div className="cp-avatar">
              <img
                src="https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777107241/cropped-SMIC-01-180x180_pffxe7.jpg"
                alt="Ama AI"
              />
            </div>
            <div className="cp-info">
              <h4>Ama · SMIC360 Receptionist</h4>
              <p>AI-powered · Replies instantly</p>
            </div>
            <span className="cp-dot" />
            <button
              className="cp-ctrl"
              onClick={clearChat}
              title="Clear chat"
              type="button"
              aria-label="Clear chat"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="12" height="12">
                <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
              </svg>
            </button>
            <button
              className="cp-ctrl"
              onClick={() => setChatOpen(false)}
              title="Close"
              type="button"
              aria-label="Close chat"
              style={{ marginLeft: '4px' }}
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="cp-msgs" role="log" aria-live="polite">
            {messages.map((msg, i) => (
              <div key={i} className={`cp-msg ${msg.type}`}>
                {renderText(msg.text)}
                <div className="cp-time">{msg.time}</div>
              </div>
            ))}
            {isTyping && (
              <div className="cp-typing" aria-label="Ama is typing">
                <span/><span/><span/>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Quick replies */}
          <div className="cp-quick" role="group" aria-label="Quick questions">
            {QUICK_REPLIES.map(({ label, msg }) => (
              <button
                key={label}
                type="button"
                className="cp-qbtn"
                onClick={() => sendMsg(msg)}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="cp-input-row">
            <input
              type="text"
              placeholder="Ask Ama anything…"
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') sendMsg(inputVal); }}
              aria-label="Type your message"
              autoComplete="off"
            />
            <button
              type="button"
              className="cp-send"
              onClick={() => sendMsg(inputVal)}
              aria-label="Send message"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </div>

        </div>
      )}

      {/* ── WhatsApp Lead Capture Modal ── */}
      {waModal && (
        <>
          <style>{`
            @keyframes waModalIn {
              from { opacity:0; transform:translateY(20px) scale(0.96); }
              to   { opacity:1; transform:none; }
            }
            #wa-modal-overlay {
              position:fixed; inset:0; z-index:2147483647;
              background:rgba(4,14,29,0.82);
              backdrop-filter:blur(10px);
              display:flex; align-items:center; justify-content:center;
              padding:20px;
            }
            #wa-modal {
              background:#fff; width:100%; max-width:420px;
              border-radius:22px; overflow:hidden;
              box-shadow:0 40px 100px rgba(4,14,29,0.55);
              animation:waModalIn 0.36s cubic-bezier(0.16,1,0.3,1) both;
            }
            #wa-modal-head {
              background:linear-gradient(135deg,#075E54 0%,#128C7E 55%,#25D366 100%);
              padding:28px 28px 24px;
              position:relative; overflow:hidden;
            }
            #wa-modal-head::before {
              content:''; position:absolute; inset:0;
              background-image:linear-gradient(rgba(255,255,255,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.06) 1px,transparent 1px);
              background-size:20px 20px; pointer-events:none;
            }
            #wa-modal-head::after {
              content:''; position:absolute; bottom:0; left:0; right:0;
              height:2px; background:rgba(255,255,255,0.25);
            }
            .wam-close {
              position:absolute; top:14px; right:14px;
              background:rgba(255,255,255,0.18); border:1px solid rgba(255,255,255,0.28);
              color:#fff; width:32px; height:32px; border-radius:50%;
              display:flex; align-items:center; justify-content:center;
              cursor:pointer; font-size:14px; transition:background 0.2s;
              font-family:inherit; z-index:2;
            }
            .wam-close:hover { background:rgba(220,38,38,0.7); }
            .wam-icon {
              width:54px; height:54px; border-radius:50%;
              background:rgba(255,255,255,0.18);
              display:flex; align-items:center; justify-content:center;
              margin-bottom:14px; position:relative; z-index:1;
              border:2px solid rgba(255,255,255,0.3);
            }
            .wam-icon svg { width:30px; height:30px; fill:#fff; }
            #wa-modal-head h3 {
              font-family:'Oswald',sans-serif; font-size:20px; font-weight:700;
              color:#fff; margin:0 0 4px; position:relative; z-index:1;
            }
            #wa-modal-head p {
              font-size:13px; color:rgba(255,255,255,0.78);
              line-height:1.5; position:relative; z-index:1;
            }
            #wa-modal-body { padding:24px 28px 28px; }
            .wam-notice {
              background:#f0fdf4; border:1px solid #bbf7d0;
              border-radius:10px; padding:10px 14px;
              font-size:12px; color:#166534; line-height:1.6;
              margin-bottom:20px; display:flex; gap:8px; align-items:flex-start;
            }
            .wam-notice-icon { font-size:15px; flex-shrink:0; margin-top:1px; }
            .wam-field { margin-bottom:14px; }
            .wam-label {
              display:block; font-size:11.5px; font-weight:700;
              color:#0f1e30; margin-bottom:6px;
              text-transform:uppercase; letter-spacing:0.8px;
            }
            .wam-label span { color:#ef4444; margin-left:2px; }
            .wam-input {
              width:100%; padding:11px 14px;
              border:1.5px solid #dce8f7; border-radius:10px;
              font-family:'Outfit',sans-serif; font-size:14px;
              outline:none; transition:border-color 0.2s, box-shadow 0.2s;
              color:#0f1e30; background:#f9fbff;
            }
            .wam-input:focus {
              border-color:#25D366;
              box-shadow:0 0 0 3px rgba(37,211,102,0.12);
              background:#fff;
            }
            .wam-input::placeholder { color:#9bb4cc; }
            .wam-error {
              font-size:12px; color:#dc2626;
              margin-top:6px; display:flex; gap:5px; align-items:center;
            }
            .wam-submit {
              width:100%; padding:13px;
              background:linear-gradient(135deg,#25D366,#128C7E);
              color:#fff; border:none; border-radius:12px;
              font-family:'Outfit',sans-serif; font-weight:700; font-size:15px;
              cursor:pointer; display:flex; align-items:center;
              justify-content:center; gap:9px;
              transition:all 0.25s; margin-top:4px;
              box-shadow:0 4px 18px rgba(37,211,102,0.38);
            }
            .wam-submit:hover:not(:disabled) {
              transform:translateY(-2px);
              box-shadow:0 10px 32px rgba(37,211,102,0.55);
            }
            .wam-submit:disabled { opacity:0.7; cursor:not-allowed; }
            .wam-submit.done { background:linear-gradient(135deg,#16a34a,#15803d); }
            .wam-spinner {
              width:18px; height:18px; border-radius:50%;
              border:2.5px solid rgba(255,255,255,0.35);
              border-top-color:#fff;
              animation:wam-spin 0.7s linear infinite;
            }
            @keyframes wam-spin { to { transform:rotate(360deg); } }
            .wam-skip {
              display:block; text-align:center;
              font-size:12px; color:#7a9ab8;
              margin-top:14px; cursor:pointer;
              transition:color 0.2s; background:none; border:none;
              font-family:'Outfit',sans-serif; width:100%;
            }
            .wam-skip:hover { color:#25D366; }
            .wam-privacy {
              font-size:11px; color:#9bb4cc; text-align:center;
              margin-top:12px; line-height:1.5;
            }
          `}</style>

          <div
            id="wa-modal-overlay"
            onClick={(e) => { if (e.target === e.currentTarget) setWaModal(false); }}
            role="dialog"
            aria-modal="true"
            aria-label="WhatsApp contact"
          >
            <div id="wa-modal">

              {/* Header */}
              <div id="wa-modal-head">
                <button type="button" className="wam-close" onClick={() => setWaModal(false)} aria-label="Close">✕</button>
                <div className="wam-icon">
                  <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </div>
                <h3>Connect on WhatsApp</h3>
                <p>Drop your number and we&apos;ll reach out — or chat with us right now.</p>
              </div>

              {/* Body */}
              <div id="wa-modal-body">

                {waStep === 'done' ? (
                  <div style={{ textAlign:'center', padding:'20px 0 8px' }}>
                    <div style={{ fontSize:52, marginBottom:12 }}>✅</div>
                    <p style={{ fontFamily:"'Oswald',sans-serif", fontSize:18, fontWeight:700, color:'#15803d' }}>Opening WhatsApp…</p>
                    <p style={{ fontSize:13, color:'#5a7186', marginTop:6 }}>We&apos;ve saved your number. We&apos;ll be in touch soon!</p>
                  </div>
                ) : (
                  <form onSubmit={handleWaSubmit} noValidate>

                    {/* Privacy notice */}
                    <div className="wam-notice">
                      <span className="wam-notice-icon">🔒</span>
                      <span>Your number is used <strong>only</strong> to open WhatsApp and so our team can follow up. We never share it.</span>
                    </div>

                    {/* Name field */}
                    <div className="wam-field">
                      <label className="wam-label" htmlFor="wam-name">Your Name</label>
                      <input
                        id="wam-name"
                        type="text"
                        className="wam-input"
                        placeholder="e.g. Kofi Mensah"
                        value={waName}
                        onChange={e => setWaName(e.target.value)}
                        autoComplete="name"
                        disabled={waStep === 'submitting'}
                      />
                    </div>

                    {/* Phone field */}
                    <div className="wam-field">
                      <label className="wam-label" htmlFor="wam-phone">WhatsApp Number <span>*</span></label>
                      <input
                        id="wam-phone"
                        ref={phoneRef}
                        type="tel"
                        className="wam-input"
                        placeholder="e.g. 024 478 3099"
                        value={waPhone}
                        onChange={e => { setWaPhone(e.target.value); setWaError(''); }}
                        autoComplete="tel"
                        inputMode="tel"
                        required
                        disabled={waStep === 'submitting'}
                      />
                      {waError && (
                        <div className="wam-error">
                          <span>⚠️</span> {waError}
                        </div>
                      )}
                    </div>

                    <button
                      type="submit"
                      className={`wam-submit${waStep === 'done' ? ' done' : ''}`}
                      disabled={waStep === 'submitting'}
                    >
                      {waStep === 'submitting' ? (
                        <><span className="wam-spinner" /> Saving &amp; Opening…</>
                      ) : (
                        <><svg viewBox="0 0 24 24" width="18" height="18" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg> Chat on WhatsApp Now</>
                      )}
                    </button>

                    <button
                      type="button"
                      className="wam-skip"
                      onClick={() => {
                        setWaModal(false);
                        window.open('https://wa.me/233244783099', '_blank');
                      }}
                    >
                      Skip &amp; open WhatsApp directly →
                    </button>

                    <p className="wam-privacy">🔐 Your number is kept private and never shared with third parties.</p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>,
    document.body
  );
}
