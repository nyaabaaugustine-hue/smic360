'use client';
import React from 'react';


export default function Topbar() {
  return (
    <div className="topbar">
      <div className="wrap">
        <div className="topbar-left">
          <span>📍 Accra, Ghana</span>
          <a href="mailto:info@smic360.com">info@smic360.com</a>
        </div>
        <div className="topbar-right">
          <a href="#">LinkedIn</a>
          <a href="#">Instagram</a>
          <a href="#">Twitter</a>
          <a href="tel:0244783099" className="topbar-phone">📞 024 478 3099</a>
        </div>
      </div>
    </div>
  );
}
