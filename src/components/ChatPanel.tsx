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

  const getBotResponse = (msg: string): string => {
    const m = msg.toLowerCase();
    if (m.includes('service') || m.includes('what do you') || m.includes('offer'))
    return 'SMIC360 offers three main services:\n\n📣 Advertising & Marketing — 360° brand strategy and media buying\n\n🏗️ Real Estate Development — The Phoenix Enclave gated community\n\n📦 Procurement & Supply — Tailormade supply chain solutions\n\nWhich service would you like to know more about?';
    if (m.includes('phoenix') || m.includes('enclave') || m.includes('real estate') || m.includes('property'))
    return 'The Phoenix Enclave is our flagship real estate development — a modern mini gated community featuring:\n\n🏡 24/7 security & controlled access\n🏛️ Contemporary architecture\n📍 Prime location in Greater Accra\n💼 High investment ROI\n\nWould you like to book a site visit?';
    if (m.includes('quote') || m.includes('price') || m.includes('cost') || m.includes('how much'))
    return 'Great! To prepare a quote for you, please fill out our quick consultation form and our team will reach back to you within 2 hours! 📋 You can also call us directly at 📞 024 478 3099 for immediate assistance.';
    if (m.includes('book') || m.includes('consult') || m.includes('appointment'))
    return 'You can book a free consultation by:\n\n1. Clicking the "Book Us" button in the top menu\n2. Calling us at 📞 024 478 3099\n3. Emailing ✉️ info@smic360.com\n\nOur team responds within 2 business hours!';
    return 'Thanks for reaching out! 😊 Our team typically responds within 2 hours. For immediate assistance, please call 📞 024 478 3099 or email info@smic360.com.';
  };

  const addMessage = (text: string, type: 'bot' | 'user') => {
    setMessages((prev) => [...prev, { text, type, time: getTime() }]);
  };

  const sendMsg = () => {
    if (!inputVal.trim()) return;
    const text = inputVal.trim();
    addMessage(text, 'user');
    setInputVal('');
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addMessage(getBotResponse(text), 'bot');
    }, 900 + Math.random() * 600);
  };

  const quickMsg = (text: string) => {
    addMessage(text, 'user');
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addMessage(getBotResponse(text), 'bot');
    }, 900 + Math.random() * 500);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <>
      {/* Floating Buttons */}
      <div className="floats">
        <div className="float-ai" onClick={() => {}} style={{ background: 'var(--navy)', borderColor: 'var(--gold)', marginBottom: '10px' }}>
          <span className="float-label">Switch Theme</span>
          <span style={{ fontSize: '22px', position: 'relative', zIndex: 1 }}>🎨</span>
        </div>
        <a href="https://wa.me/233244783099" target="_blank" rel="noopener noreferrer" className="float-wa">
          <span className="float-label">Chat on WhatsApp</span>
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </a>
        <div className="float-ai" onClick={() => setIsOpen(!isOpen)} style={{ position: 'relative' }}>
          <span className="float-label">Chat with SMIC AI</span>
          <img src="https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777107241/cropped-SMIC-01-180x180_pffxe7.jpg" alt="SMIC AI" />
        </div>
      </div>

      {/* Chat Panel */}
      <div className={`chat-panel${isOpen ? ' open' : ''}`}>
        <div className="chat-head">
          <div className="chat-head-avatar">
            <img src="https://res.cloudinary.com/dwsl2ktt2/image/upload/v1777107241/cropped-SMIC-01-180x180_pffxe7.jpg" alt="SMIC AI" />
          </div>
          <div className="chat-head-info">
            <h4>SMIC360 Assistant</h4>
            <p>Typically replies instantly</p>
          </div>
          <div className="chat-status"></div>
          <button className="chat-close" onClick={() => setIsOpen(false)}>✕</button>
        </div>
        <div className="chat-messages">
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
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => {if (e.key === 'Enter') sendMsg();}} />

          <button className="chat-send" onClick={sendMsg}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </div>
    </>);

}