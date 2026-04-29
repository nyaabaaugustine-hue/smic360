'use client';
import React, { useState, useRef, useEffect } from 'react';

interface Message {
  text: string;
  type: 'bot' | 'user';
  time: string;
}

export default function ChatPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
  { text: '👋 Hi! I\'m the SMIC360 virtual assistant. How can I help you today?', type: 'bot', time: 'Just now' }]
  );
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const getTime = () => {
    const now = new Date();
    return `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
  };

  const clearChat = () => {
    setMessages([{ text: '👋 Hi! I\'m the SMIC360 virtual assistant. How can I help you today?', type: 'bot', time: 'Just now' }]);
  };

  const addMessage = (text: string, type: 'bot' | 'user') => {
    setMessages((prev) => [...prev, { text, type, time: getTime() }]);
  };

  const processChat = async (text: string) => {
    addMessage(text, 'user');
    setIsTyping(true);

    try {
      const chatHistory = messages.map(m => ({
        role: m.type === 'bot' ? 'assistant' : 'user',
        content: m.text
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...chatHistory, { role: 'user', content: text }]
        })
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
    } catch (error) {
      setIsTyping(false);
      addMessage("I'm currently having a bit of trouble connecting to the network. Please call us at 📞 024 478 3099 and I'll be happy to help you directly!", 'bot');
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

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const curr = document.documentElement.getAttribute('data-theme');
    const next = curr === 'midnight' ? 'default' : 'midnight';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  };

  return (
    <>
      <style>{`
        .chat-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(2px);
          z-index: 9999;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
        }
        .chat-overlay.visible {
          opacity: 1;
          visibility: visible;
        }
        .chat-panel {
          position: fixed;
          bottom: 100px;
          right: 30px;
          width: 360px;
          height: 500px;
          background: var(--white);
          border-radius: 20px;
          box-shadow: var(--sh-lg);
          display: flex;
          flex-direction: column;
          z-index: 10000;
          transform: translateY(20px);
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          overflow: hidden;
          border: 1px solid var(--border);
        }
        .chat-panel.open {
          transform: translateY(0);
          opacity: 1;
          visibility: visible;
        }
        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .chat-close {
          background: rgba(255,255,255,0.12) !important;
          color: white !important;
          width: 30px !important;
          height: 30px !important;
          border-radius: 50% !important;
          display: flex !important;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border: 1px solid rgba(255,255,255,0.2);
          transition: background 0.2s;
          font-size: 13px;
        }
        .chat-close:hover { background: rgba(255,0,0,0.6) !important; }
        .chat-clear {
          background: rgba(255, 255, 255, 0.1);
          border: none;
          color: white;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          margin-right: 6px;
          transition: background 0.2s;
        }
        .chat-clear:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
      {/* Floating Buttons */}
      <div className={`chat-overlay${isOpen ? ' visible' : ''}`} onClick={() => setIsOpen(false)} />

      <div className="floats">
        <div 
          className="float-ai" 
          onClick={toggleTheme}
          style={{ background: 'var(--navy)', borderColor: 'var(--gold)', marginBottom: '10px' }}
          aria-label="Switch Theme"
          role="button"
        >
          <span className="float-label">Switch Theme</span>
          <span style={{ fontSize: '22px', position: 'relative', zIndex: 1 }}>🎨</span>
        </div>
        <a href="https://wa.me/233244783099" target="_blank" rel="noopener noreferrer" className="float-wa" aria-label="Chat on WhatsApp">
          <span className="float-label">Chat on WhatsApp</span>
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </a>
        <div 
          className="float-ai" 
          onClick={() => setIsOpen(!isOpen)} 
          style={{ position: 'relative' }}
          role="button"
          aria-expanded={isOpen}
          aria-label="Toggle Chat Assistant"
        >
          <span className="float-label">Chat with SMIC AI</span>
          <img src="https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777107241/cropped-SMIC-01-180x180_pffxe7.jpg" alt="SMIC AI" />
        </div>
      </div>

      {/* Chat Panel */}
      <div className={`chat-panel${isOpen ? ' open' : ''}`} role="dialog" aria-label="Chat Assistant">
        <div className="chat-head">
          <div className="chat-head-avatar">
            <img src="https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777107241/cropped-SMIC-01-180x180_pffxe7.jpg" alt="SMIC AI" />
          </div>
          <div className="chat-head-info">
            <h4>SMIC360 Assistant</h4>
            <p>Typically replies instantly</p>
          </div>
          <div className="chat-status"></div>
          <button className="chat-clear" onClick={clearChat} title="Clear Chat">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16" aria-hidden="true">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
          <button className="chat-close" onClick={() => setIsOpen(false)} aria-label="Close Chat">✕</button>
        </div>
        <div className="chat-messages" role="log" aria-live="polite">
          {messages.map((msg, i) =>
          <div key={i} className={`chat-msg ${msg.type}`}>
              {msg.text.split('\n').map((line, j) =>
            <React.Fragment key={j}>{line}{j < msg.text.split('\n').length - 1 && <br />}</React.Fragment>
            )}
              <div className="chat-msg-time">{msg.time}</div>
            </div>
          )}
          {isTyping &&
          <div className="chat-typing">
              <span></span><span></span><span></span>
            </div>
          }
          <div ref={messagesEndRef} />
        </div>
        <div className="chat-quick">
          <button className="chat-quick-btn" onClick={() => quickMsg('Tell me about your services')}>Our Services</button>
          <button className="chat-quick-btn" onClick={() => quickMsg('Tell me about the Phoenix Enclave')}>Phoenix Enclave</button>
          <button className="chat-quick-btn" onClick={() => quickMsg('How do I book a consultation?')}>Book a Call</button>
          <button className="chat-quick-btn" onClick={() => quickMsg('I need a quote')}>Get a Quote</button>
        </div>
        <div className="chat-input-area">
          <input
            type="text"
            placeholder="Type a message..."
            value={inputVal}
            aria-label="Type your message"
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => {if (e.key === 'Enter') sendMsg();}} />

          <button className="chat-send" onClick={sendMsg} aria-label="Send Message">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </div>
    </>);

}