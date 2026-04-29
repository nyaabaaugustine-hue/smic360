'use client';
import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface Message {
  text: string;
  type: 'bot' | 'user';
  time: string;
}

export default function ChatPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: "👋 Hi! I'm the SMIC360 virtual assistant. How can I help you today?", type: 'bot', time: 'Just now' },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Must be mounted before portal works
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('theme');
    if (saved) document.documentElement.setAttribute('data-theme', saved);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const getTime = () => {
    const now = new Date();
    return `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
  };

  const clearChat = () =>
    setMessages([{ text: "👋 Hi! I'm the SMIC360 virtual assistant. How can I help you today?", type: 'bot', time: 'Just now' }]);

  const addMessage = (text: string, type: 'bot' | 'user') =>
    setMessages((prev) => [...prev, { text, type, time: getTime() }]);

  const processChat = async (text: string) => {
    addMessage(text, 'user');
    setIsTyping(true);
    try {
      const chatHistory = messages.map((m) => ({
        role: m.type === 'bot' ? 'assistant' : 'user',
        content: m.text,
      }));
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...chatHistory, { role: 'user', content: text }] }),
      });
      const data = await response.json();
      setIsTyping(false);
      if (data.text) addMessage(data.text, 'bot');
      else if (data.error) addMessage(`Error: ${data.error}`, 'bot');
      else throw new Error('No response');
    } catch {
      setIsTyping(false);
      addMessage("I'm having trouble connecting. Please call us at 📞 024 478 3099!", 'bot');
    }
  };

  const sendMsg = () => {
    if (!inputVal.trim()) return;
    const t = inputVal.trim();
    setInputVal('');
    processChat(t);
  };

  const toggleTheme = () => {
    const curr = document.documentElement.getAttribute('data-theme');
    const next = curr === 'midnight' ? 'default' : 'midnight';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  };

  // ── Everything that must float is rendered into document.body via portal ──
  const floatingUI = (
    <>
      <style>{`
        /* ── PORTAL FLOATS — rendered directly in body, no stacking context issues ── */
        #smic-floats {
          position: fixed;
          bottom: 28px;
          right: 22px;
          z-index: 99999;
          display: flex;
          flex-direction: column;
          gap: 12px;
          align-items: flex-end;
          pointer-events: none;
        }
        #smic-floats > * {
          pointer-events: all;
        }

        /* WhatsApp button */
        .sf-wa {
          width: 56px; height: 56px;
          border-radius: 50%;
          background: #25D366;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 8px 28px rgba(37,211,102,0.45);
          cursor: pointer;
          border: 2.5px solid #fff;
          text-decoration: none;
          animation: sf-bob 4s ease-in-out infinite;
          position: relative;
          transition: transform 0.25s, box-shadow 0.25s;
        }
        .sf-wa:hover { transform: scale(1.1) translateY(-3px); box-shadow: 0 14px 40px rgba(37,211,102,0.6); }
        .sf-wa svg { width: 28px; height: 28px; fill: #fff; }
        @keyframes sf-bob { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-6px);} }

        /* Theme + AI buttons */
        .sf-btn {
          width: 58px; height: 58px;
          border-radius: 50%;
          background: #071628;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 0 0 0 rgba(255,193,7,0.4), 0 8px 28px rgba(7,22,40,0.5);
          cursor: pointer;
          border: 2.5px solid #FFC107;
          animation: sf-pulse 3.5s ease-in-out infinite;
          position: relative;
          overflow: hidden;
          transition: transform 0.25s;
        }
        .sf-btn:hover { transform: scale(1.1) translateY(-3px); }
        .sf-btn img { width: 42px; height: 42px; object-fit: contain; border-radius: 50%; }
        .sf-btn .sf-emoji { font-size: 22px; }
        @keyframes sf-pulse {
          0%  { box-shadow: 0 0 0 0   rgba(255,193,7,0.45), 0 8px 28px rgba(7,22,40,0.5); }
          50% { box-shadow: 0 0 0 12px rgba(255,193,7,0),   0 8px 28px rgba(7,22,40,0.5); }
          100%{ box-shadow: 0 0 0 0   rgba(255,193,7,0.45), 0 8px 28px rgba(7,22,40,0.5); }
        }

        /* Tooltip labels */
        .sf-label {
          position: absolute;
          right: calc(100% + 10px);
          top: 50%; transform: translateY(-50%) translateX(6px);
          background: #071628;
          color: #fff;
          font-size: 11px; font-weight: 600;
          white-space: nowrap;
          padding: 5px 11px;
          border-radius: 7px;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.2s, transform 0.2s;
          border: 1px solid rgba(255,255,255,0.08);
          font-family: 'Outfit', sans-serif;
        }
        .sf-wa:hover .sf-label,
        .sf-btn:hover .sf-label { opacity: 1; transform: translateY(-50%) translateX(0); }

        /* ── SCROLL TOP — portal, fixed bottom-left ── */
        #smic-scroll-top {
          position: fixed;
          bottom: 28px;
          left: 22px;
          z-index: 99999;
          width: 48px; height: 48px;
          border-radius: 50%;
          background: linear-gradient(135deg, #071628, #0b2240);
          color: #FFC107;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          border: 1.5px solid rgba(255,193,7,0.35);
          box-shadow: 0 8px 24px rgba(7,22,40,0.3);
          transition: opacity 0.3s, visibility 0.3s, transform 0.25s;
          pointer-events: all;
        }
        #smic-scroll-top:hover { background: #FFC107; color: #071628; transform: translateY(-4px); }

        /* ── CHAT PANEL — portal, fixed ── */
        #smic-chat-panel {
          position: fixed;
          bottom: 110px;
          right: 22px;
          z-index: 99998;
          width: min(350px, calc(100vw - 44px));
          background: #fff;
          border-radius: 20px;
          box-shadow: 0 24px 72px rgba(0,0,0,0.22), 0 0 0 1px rgba(255,193,7,0.12);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          max-height: 520px;
          border: 1px solid rgba(255,193,7,0.15);
          animation: chatSlide 0.32s cubic-bezier(0.16,1,0.3,1) both;
        }
        @keyframes chatSlide { from{opacity:0;transform:translateY(20px) scale(0.96);} to{opacity:1;transform:none;} }

        /* Chat overlay */
        #smic-chat-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.45);
          backdrop-filter: blur(2px);
          z-index: 99997;
        }

        @media(max-width:640px){
          #smic-chat-panel { right:12px; bottom:100px; width:calc(100vw - 24px); }
          #smic-floats { right:14px; bottom:20px; gap:10px; }
          #smic-scroll-top { left:14px; bottom:20px; width:42px; height:42px; }
        }
      `}</style>

      {/* Scroll-to-top */}
      <ScrollTopPortal />

      {/* Chat overlay */}
      {isOpen && (
        <div id="smic-chat-overlay" onClick={() => setIsOpen(false)} aria-hidden="true" />
      )}

      {/* Chat panel */}
      {isOpen && (
        <div id="smic-chat-panel" role="dialog" aria-label="Chat Assistant" aria-modal="true">
          <div className="chat-head">
            <div className="chat-head-avatar">
              <img src="https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777107241/cropped-SMIC-01-180x180_pffxe7.jpg" alt="SMIC AI" />
            </div>
            <div className="chat-head-info">
              <h4>SMIC360 Assistant</h4>
              <p>Typically replies instantly</p>
            </div>
            <div className="chat-status" aria-hidden="true" />
            <button className="chat-clear" onClick={clearChat} title="Clear chat" type="button">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </button>
            <button className="chat-close" onClick={() => setIsOpen(false)} type="button" aria-label="Close">✕</button>
          </div>

          <div className="chat-messages" role="log" aria-live="polite">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-msg ${msg.type}`}>
                {msg.text.split('\n').map((line, j) => (
                  <React.Fragment key={j}>{line}{j < msg.text.split('\n').length - 1 && <br />}</React.Fragment>
                ))}
                <div className="chat-msg-time">{msg.time}</div>
              </div>
            ))}
            {isTyping && <div className="chat-typing"><span /><span /><span /></div>}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-quick">
            {[
              ['Tell me about your services', 'Our Services'],
              ['Tell me about the Phoenix Enclave', 'Phoenix Enclave'],
              ['How do I book a consultation?', 'Book a Call'],
              ['I need a quote', 'Get a Quote'],
            ].map(([msg, label]) => (
              <button key={label} type="button" className="chat-quick-btn" onClick={() => processChat(msg)}>{label}</button>
            ))}
          </div>

          <div className="chat-input-area">
            <input
              type="text"
              placeholder="Type a message..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') sendMsg(); }}
              aria-label="Type your message"
            />
            <button type="button" className="chat-send" onClick={sendMsg} aria-label="Send">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Floating buttons */}
      <div id="smic-floats">
        {/* Theme */}
        <div className="sf-btn" onClick={toggleTheme} role="button" tabIndex={0} aria-label="Switch Theme">
          <span className="sf-label">Switch Theme</span>
          <span className="sf-emoji">🎨</span>
        </div>

        {/* WhatsApp */}
        <a className="sf-wa" href="https://wa.me/233244783099" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
          <span className="sf-label">Chat on WhatsApp</span>
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </a>

        {/* AI Chat */}
        <div
          className="sf-btn"
          onClick={() => setIsOpen(!isOpen)}
          role="button"
          tabIndex={0}
          aria-label="Toggle AI Chat"
          aria-expanded={isOpen}
        >
          <span className="sf-label">Chat with SMIC AI</span>
          <img src="https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777107241/cropped-SMIC-01-180x180_pffxe7.jpg" alt="SMIC AI" />
        </div>
      </div>
    </>
  );

  if (!mounted) return null;
  return createPortal(floatingUI, document.body);
}

/* Scroll-to-top rendered inside the same portal */
function ScrollTopPortal() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      id="smic-scroll-top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      title="Back to top"
      style={{ opacity: show ? 1 : 0, visibility: show ? 'visible' : 'hidden' }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </div>
  );
}
