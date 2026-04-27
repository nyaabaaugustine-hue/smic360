'use client';
import React, { useState } from 'react';
import Topbar from '@/components/Topbar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';
import ChatPanel from '@/components/ChatPanel';
import ScrollReveal from '@/components/ScrollReveal';

export default function ContactPage() {
  const [bookOpen, setBookOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <ScrollReveal />
      <Topbar />
      <Navbar onBookClick={() => setBookOpen(true)} />
      <BookingModal isOpen={bookOpen} onClose={() => setBookOpen(false)} />

      {/* Page Hero */}
      <div className="page-hero">
        <div className="page-hero-inner">
          <div className="page-hero-tag">Get In Touch</div>
          <h1>We&apos;d Love To <em>Hear From You</em></h1>
          <p>Do you have a project in mind? We are just a call away and ready to help your business scale.</p>
        </div>
      </div>

      {/* Contact Section */}
      <section style={{padding:'90px 0',background:'var(--white)'}}>
        <div className="wrap">
          <div className="contact-grid">
            {/* Contact Info */}
            <div className="reveal-left">
              <div style={{display:'flex',flexDirection:'column',gap:'0'}}>
                {[
                  {
                    icon: '📍',
                    title: 'Head Office',
                    content: (
                      <p style={{fontSize:'14px',color:'var(--muted)',lineHeight:1.7}}>
                        1st Floor, Verostina House<br />
                        Opp. DSTV Office, Comm. 18<br />
                        Off Spintex Road, Accra
                      </p>
                    ),
                  },
                  {
                    icon: '📞',
                    title: 'Contact Numbers',
                    content: (
                      <div style={{display:'flex',flexDirection:'column',gap:'4px'}}>
                        <a href="tel:0244783099" style={{color:'var(--blue)',fontWeight:600,fontSize:'14px'}}>024 478 3099</a>
                        <a href="tel:0208812164" style={{color:'var(--blue)',fontWeight:600,fontSize:'14px'}}>020 881 2164</a>
                        <a href="tel:0203361155" style={{color:'var(--blue)',fontWeight:600,fontSize:'14px'}}>020 336 1155</a>
                      </div>
                    ),
                  },
                  {
                    icon: '✉️',
                    title: 'Email Us',
                    content: (
                      <div style={{display:'flex',flexDirection:'column',gap:'4px'}}>
                        <a href="mailto:christie@smic360.com" style={{color:'var(--blue)',fontWeight:600,fontSize:'14px'}}>christie@smic360.com</a>
                        <a href="mailto:info@smic360.com" style={{color:'var(--blue)',fontWeight:600,fontSize:'14px'}}>info@smic360.com</a>
                      </div>
                    ),
                  },
                  {
                    icon: '🕐',
                    title: 'Office Hours',
                    content: (
                      <p style={{fontSize:'14px',color:'var(--muted)',lineHeight:1.7}}>
                        Mon – Fri: 8:00 AM – 6:00 PM<br />
                        Saturday: 9:00 AM – 2:00 PM
                      </p>
                    ),
                  },
                ].map((item, i) => (
                  <div key={i} className="hq-detail-item">
                    <div className="hq-detail-icon">{item.icon}</div>
                    <div className="hq-detail-text">
                      <h4>{item.title}</h4>
                      {item.content}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{display:'flex',gap:'10px',marginTop:'28px'}}>
                {['in','ig','tw','fb'].map((s) => (
                  <div key={s} className="social-btn" style={{background:'var(--blue-l)',color:'var(--blue)'}}>{s}</div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="reveal-right" style={{background:'#fff',borderRadius:'var(--r-lg)',padding:'40px',boxShadow:'var(--sh)',border:'1px solid var(--border)'}}>
              {!submitted ? (
                <>
                  <h2 style={{fontFamily:'Oswald,sans-serif',fontSize:'28px',fontWeight:700,color:'var(--navy)',marginBottom:'8px'}}>Send Us A Message</h2>
                  <p style={{fontSize:'14px',color:'var(--muted)',marginBottom:'28px',lineHeight:1.6}}>Fill in the form and our team will get back to you within 2 business hours.</p>
                  <form onSubmit={handleSubmit} style={{display:'grid',gap:'16px'}}>
                    <div className="form-row">
                      <div className="form-group">
                        <label>First Name</label>
                        <input type="text" placeholder="John" required />
                      </div>
                      <div className="form-group">
                        <label>Last Name</label>
                        <input type="text" placeholder="Doe" required />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Email Address</label>
                        <input type="email" placeholder="john@example.com" required />
                      </div>
                      <div className="form-group">
                        <label>Phone Number</label>
                        <input type="tel" placeholder="024 XXX XXXX" />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Service Interested In</label>
                      <select>
                        <option value="">Select a service...</option>
                        <option>Advertising &amp; Marketing</option>
                        <option>Real Estate Development</option>
                        <option>Procurement &amp; Supply</option>
                        <option>Other / General Inquiry</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Your Message</label>
                      <textarea placeholder="Tell us about your project or need..." style={{height:'120px',resize:'none'}}></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{width:'100%',justifyContent:'center',padding:'14px'}}>Send Message →</button>
                  </form>
                </>
              ) : (
                <div style={{textAlign:'center',padding:'40px 0'}}>
                  <div style={{fontSize:'60px',color:'#16a34a',marginBottom:'20px'}}>✔</div>
                  <h3 style={{fontFamily:'Oswald,sans-serif',fontSize:'28px',color:'var(--navy)',marginBottom:'12px'}}>Message Sent!</h3>
                  <p style={{color:'var(--muted)',fontSize:'15px',lineHeight:1.7}}>Thank you for reaching out. Our team will get back to you within 2 business hours.</p>
                  <button className="btn btn-outline" style={{marginTop:'24px'}} onClick={() => setSubmitted(false)}>Send Another</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section style={{padding:'0 0 90px',background:'var(--white)'}}>
        <div className="wrap">
          <div style={{textAlign:'center',marginBottom:'40px'}} className="reveal">
            <span className="tag" style={{justifyContent:'center'}}>Find Us</span>
            <h2 className="section-title">Our <em>Location</em></h2>
          </div>
          <div style={{borderRadius:'var(--r-lg)',overflow:'hidden',height:'400px',boxShadow:'var(--sh-md)',border:'1px solid var(--border)'}} className="reveal">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d63528.36050131504!2d-0.076514!3d5.637253!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf8402e54ac0bd%3A0x37c47d7434f4203c!2sSMIC360%20LIMITED!5e0!3m2!1sen!2sus!4v1777199771968!5m2!1sen!2sus"
              width="100%" height="100%"
              style={{border:0}}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="SMIC360 Location"
            ></iframe>
          </div>
        </div>
      </section>

      <Footer onBookClick={() => setBookOpen(true)} />
      <ChatPanel />
    </>
  );
}
