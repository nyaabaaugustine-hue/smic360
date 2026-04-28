'use client';
import React, { useState } from 'react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await fetch('https://formspree.io/f/xdayrral', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => {
          if (isOpen) {
            onClose();
            setTimeout(() => setSubmitted(false), 300);
          }
        }, 5000);
      }
    } catch (error) {
      console.error('Formspree error:', error);
    }
    setLoading(false);
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
            <form
              className="book-form"
              onSubmit={handleSubmit}
            >
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" name="name" placeholder="Your full name" required />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" name="email" placeholder="your@email.com" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="tel" name="phone" placeholder="024 XXX XXXX" />
                </div>
                <div className="form-group">
                  <label>Service of Interest</label>
                  <select name="service" required>
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
                <textarea name="message" placeholder="Tell us briefly about your project or need..."></textarea>
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center', padding: '14px' }}
                disabled={loading}
              >
                {loading ? 'Sending…' : 'Submit Request →'}
              </button>
            </form>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div style={{ fontSize: '60px', color: '#16a34a', marginBottom: '20px' }}>✔</div>
            <h3 className="oswald" style={{ fontSize: '28px', color: 'var(--navy)', marginBottom: '12px' }}>Request Received!</h3>
            <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: 1.7 }}>
              Thank you for reaching out. A member of our team will contact you within 2 business hours.
            </p>
            <button className="btn btn-primary" style={{ marginTop: '24px' }} onClick={handleClose}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
}