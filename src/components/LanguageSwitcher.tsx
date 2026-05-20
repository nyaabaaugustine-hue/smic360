'use client';
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

const languages = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'fr', label: 'FR', name: 'Français' },
  { code: 'es', label: 'ES', name: 'Español' },
  { code: 'de', label: 'DE', name: 'Deutsch' },
];

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="language-switcher" style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code as 'en' | 'fr' | 'es' | 'de')}
          style={{
            background: language === lang.code ? 'var(--gold)' : 'transparent',
            color: language === lang.code ? '#071628' : 'rgba(255,255,255,0.7)',
            border: '1px solid',
            borderColor: language === lang.code ? 'var(--gold)' : 'rgba(255,255,255,0.2)',
            borderRadius: '4px',
            padding: '2px 6px',
            fontSize: '10px',
            fontWeight: 700,
            cursor: 'pointer',
            fontFamily: 'Oswald, sans-serif',
            transition: 'all 0.2s',
          }}
          aria-label={`Switch to ${lang.name}`}
        >
          {lang.label}
        </button>
      ))}
      <style jsx>{`
        .language-switcher button:hover {
          border-color: var(--gold) !important;
          color: #fff !important;
        }
      `}</style>
    </div>
  );
}