'use client';
import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface Message {
  text: string;
  type: 'bot' | 'user';
  time: string;
}

/* ─────────────────────────────────────────────────────────────
   FLOATING BUTTONS — rendered in a SEPARATE portal, zero wrapper.
   All positioning is inline style only. No class, no parent div,
   no stacking-context ancestor. Directly appended to <body>.
───────────────────────────────────────────────────────────── */

// Shared button shape
const BTN: React.CSSProperties = {
  width: 52,
  height: 52,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  border: 'none',
  outline: 'none',
  boxShadow: '0 4px 20px rgba(0,0,0,0.22)',
  flexShrink: 0,
  transition: 'transform 0.2s, box-shadow 0.2s',
  textDecoration: 'none',
  position: 'relative' as const,
  overflow: 'visible' as const,
};

function FloatingButtons({
  onChatToggle,
  chatOpen,
  onThemeToggle,
}: {
  onChatToggle: () => void;
  chatOpen: boolean;
  onThemeToggle: () => void;
}) {
  /* True viewport-fixed container — inline only, no CSS class */
  const containerStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: 24,
    right: 24,
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    zIndex: 999999,
    // Guarantee NO stacking-context-breaking properties:
    transform: 'none',
    filter: 'none',
    perspective: 'none',
    willChange: 'auto',
    contain: 'none' as React.CSSProperties['contain'],
    isolation: 'auto' as React.CSSProperties['isolation'],
  };

  return (
    <div style={containerStyle}>
      {/* Theme toggle */}
      <button
        type="button"
        onClick={onThemeToggle}
        aria-label="Switch Theme"
        title="Switch Theme"
        style={{
          ...BTN,
          background: '#071628',
          border: '1.5px solid #FFC107',
          color: '#FFC107',
        }}
      >
        <span style={{ fontSize: 22, lineHeight: 1, pointerEvents: 'none' }}>🎨</span>
      </button>

      {/* WhatsApp */}
      <a
        href="https://wa.me/233244783099"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
        style={{
          ...BTN,
          background: '#25D366',
          border: '1.5px solid #128C7E',
          color: '#fff',
          animation: 'smic-wa-pulse 2s infinite',
        }}
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="#fff"
          style={{ pointerEvents: 'none' }}
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      {/* AI Chat toggle */}
      <button
        type="button"
        onClick={onChatToggle}
        aria-label="Toggle Chat Assistant"
        title="Chat with SMIC AI"
        aria-expanded={chatOpen}
        style={{
          ...BTN,
          background: '#fff',
          border: '1.5px solid #dce8f7',
          padding: 0,
          overflow: 'hidden',
        }}
      >
        <img
          src="https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777107241/cropped-SMIC-01-180x180_pffxe7.jpg"
          alt="SMIC AI"
          style={{
            width: 52,
            height: 52,
            objectFit: 'cover',
            borderRadius: '50%',
            display: 'block',
            pointerEvents: 'none',
          }}
        />
      </button>
    </div>
  );
}

export default function ChatPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "👋 Hi! I'm the SMIC360 virtual assistant. How can I help you today?",
      type: 'bot',
      time: 'Just now',
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getTime = () => {
    const now = new Date();
    return `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
  };

  const clearChat = () => {
    setMessages([
      {
        text: "👋 Hi! I'm the SMIC360 virtual assistant. How can I help you today?",
        type: 'bot',
        time: 'Just now',
      },
    ]);
  };

  const addMessage = (text: string, type: 'bot' | 'user') => {
    setMessages((prev) => [...prev, { text, type, time: getTime() }]);
  };

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
        body: JSON.stringify({
          messages: [...chatHistory, { role: 'user', content: text }],
        }),
      });

      const data = await response.json();
      setIsTyping(false);

      if (data.text) {
        addMessage(data.text, 'bot');
      } else if (data.error) {
        addMessage(`Assistant Error: ${data.error}`, 'bot');
      } else {
        throw new Error('No response');
      }
    } catch {
      setIsTyping(false);
      addMessage(
        "I'm currently having a bit of trouble connecting to the network. Please call us at 📞 024 478 3099 and I'll be happy to help you directly!",
        'bot'
      );
    }
  };

  const sendMsg = () => {
    if (!inputVal.trim()) return;
    const text = inputVal.trim();
    setInputVal('');
    processChat(text);
  };

  const quickMsg = (text: string) => {
    processChat(text);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Theme toggle — only runs client-side
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    if (typeof window === 'undefined') return;
    const curr = document.documentElement.getAttribute('data-theme');
    const next = curr === 'midnight' ? 'default' : 'midnight';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  };

  if (!mounted) return null;

  return (
    <>
      {/* ── FLOATING BUTTONS: own portal, zero wrapper div, direct body child ── */}
      {createPortal(
        <FloatingButtons
          onChatToggle={() => setIsOpen((o) => !o)}
          chatOpen={isOpen}
          onThemeToggle={toggleTheme}
        />,
        document.body
      )}

      {/* ── CHAT PANEL + overlay: separate portal ── */}
      {createPortal(
        <>
          {/* keyframe for WA pulse — injected once */}
          <style>{`
            @keyframes smic-wa-pulse {
              0%   { box-shadow: 0 0 0 0 rgba(37,211,102,0.7); }
              70%  { box-shadow: 0 0 0 14px rgba(37,211,102,0); }
              100% { box-shadow: 0 0 0 0 rgba(37,211,102,0); }
            }
          `}</style>

          {/* Overlay */}
          {isOpen && (
            <div
              onClick={() => setIsOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0,0,0,0.45)',
                backdropFilter: 'blur(2px)',
                zIndex: 99997,
              }}
              aria-hidden="true"
            />
          )}

          {/* ── Chat Panel ── */}
          {isOpen && (
            <div
              className="chat-panel open"
              role="dialog"
              aria-label="Chat Assistant"
              aria-modal="true"
            >
              {/* Header */}
              <div className="chat-head">
                <div className="chat-head-avatar">
                  <img
                    src="https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777107241/cropped-SMIC-01-180x180_pffxe7.jpg"
                    alt="SMIC AI"
                  />
                </div>
                <div className="chat-head-info">
                  <h4>SMIC360 Assistant</h4>
                  <p>Typically replies instantly</p>
                </div>
                <div className="chat-status" aria-hidden="true" />
                <button
                  className="chat-clear"
                  onClick={clearChat}
                  title="Clear Chat"
                  type="button"
                  aria-label="Clear chat history"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    width="15"
                    height="15"
                    aria-hidden="true"
                  >
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                </button>
                <button
                  className="chat-close"
                  onClick={() => setIsOpen(false)}
                  type="button"
                  aria-label="Close Chat"
                >
                  ✕
                </button>
              </div>

              {/* Messages */}
              <div className="chat-messages" role="log" aria-live="polite">
                {messages.map((msg, i) => (
                  <div key={i} className={`chat-msg ${msg.type}`}>
                    {msg.text.split('\n').map((line, j) => (
                      <React.Fragment key={j}>
                        {line}
                        {j < msg.text.split('\n').length - 1 && <br />}
                      </React.Fragment>
                    ))}
                    <div className="chat-msg-time">{msg.time}</div>
                  </div>
                ))}
                {isTyping && (
                  <div className="chat-typing" aria-label="Assistant is typing">
                    <span />
                    <span />
                    <span />
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick replies */}
              <div className="chat-quick">
                <button
                  type="button"
                  className="chat-quick-btn"
                  onClick={() => quickMsg('Tell me about your services')}
                >
                  Our Services
                </button>
                <button
                  type="button"
                  className="chat-quick-btn"
                  onClick={() => quickMsg('Tell me about the Phoenix Enclave')}
                >
                  Phoenix Enclave
                </button>
                <button
                  type="button"
                  className="chat-quick-btn"
                  onClick={() => quickMsg('How do I book a consultation?')}
                >
                  Book a Call
                </button>
                <button
                  type="button"
                  className="chat-quick-btn"
                  onClick={() => quickMsg('I need a quote')}
                >
                  Get a Quote
                </button>
              </div>

              {/* Input */}
              <div className="chat-input-area">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={inputVal}
                  aria-label="Type your message"
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') sendMsg();
                  }}
                />
                <button
                  type="button"
                  className="chat-send"
                  onClick={sendMsg}
                  aria-label="Send Message"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    width="18"
                    height="18"
                    aria-hidden="true"
                  >
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </>,
        document.body
      )}
    </>
  );
}
