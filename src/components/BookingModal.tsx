'use client';
import React, { useState } from 'react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      if (isOpen) {
        onClose();
        setTimeout(() => setSubmitted(false), 300);
      }
    }, 5000);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => setSubmitted(false), 300);
  };

  if (!isOpen) return null;

  return (
    <div className="modal open" onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}>
      <div className="modal-content">
        <button className="modal-close" onClick={handleClose}>✕</button>
        {!submitted ? (
          <div>
            <div className="modal-head">
              <h3 className="oswald">Book A Consultation</h3>
              <p>Fill in the form below and our team will get back to you within 2 business hours.</p>
            </div>
            <div className="book-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" placeholder="Your full name" />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" placeholder="your@email.com" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="tel" placeholder="024 XXX XXXX" />
                </div>
                <div className="form-group">
                  <label>Service of Interest</label>
                  <select>
                    <option value="">Select a service...</option>
                    <option>Advertising &amp; Marketing</option>
                    <option>Real Estate Development</option>
                    <option>Procurement &amp; Supply</option>
                    <option>Other / General Inquiry</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea placeholder="Tell us briefly about your project or need..."></textarea>
              </div>
              <button className="btn btn-primary" style={{width:'100%',justifyContent:'center',padding:'14px'}} onClick={handleSubmit}>
                Submit Request →
              </button>
            </div>
          </div>
        ) : (
          <div style={{textAlign:'center',padding:'20px 0'}}>
            <div style={{fontSize:'60px',color:'#16a34a',marginBottom:'20px'}}>✔</div>
            <h3 className="oswald" style={{fontSize:'32px',color:'var(--navy)'}}>Request Received!</h3>
            <p style={{color:'var(--muted)',marginTop:'10px',fontSize:'16px'}}>Thank you for reaching out. One of our experts will contact you within 2 business hours.</p>
            <button className="btn btn-outline" style={{marginTop:'30px',width:'140px',justifyContent:'center'}} onClick={handleClose}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
}
