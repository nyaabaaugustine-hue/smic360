'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'fr' | 'es' | 'de';

interface Translations {
  [key: string]: string;
}

const translations: Record<Language, Translations> = {
  en: {
    welcome: 'Welcome',
    services: 'Services',
    about: 'About',
    contact: 'Contact',
    portfolio: 'Portfolio',
    solutions: 'Solutions',
    blog: 'Blog',
    getStarted: 'Get Started',
    learnMore: 'Learn More',
    ourServices: 'Our Services',
    whyChooseUs: 'Why Choose Us',
    contactUs: 'Contact Us',
    bookConsultation: 'Book a Consultation',
    marketing: 'Marketing',
    branding: 'Branding',
    advertising: 'Advertising',
    procurement: 'Procurement',
    realEstate: 'Real Estate',
    viewAll: 'View All',
    readMore: 'Read More',
    submit: 'Submit',
    name: 'Name',
    email: 'Email',
    phone: 'Phone',
    message: 'Message',
    send: 'Send Message',
    loading: 'Loading...',
    thankYou: 'Thank You!',
    ourTeam: 'Our Team',
    recentWork: 'Recent Work',
    testimonials: 'Testimonials',
    faq: 'FAQ',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
  },
  fr: {
    welcome: 'Bienvenue',
    services: 'Services',
    about: 'À propos',
    contact: 'Contact',
    portfolio: 'Portfolio',
    solutions: 'Solutions',
    blog: 'Blog',
    getStarted: 'Commencer',
    learnMore: 'En savoir plus',
    ourServices: 'Nos Services',
    whyChooseUs: 'Pourquoi Nous Choisir',
    contactUs: 'Contactez-nous',
    bookConsultation: 'Réserver une Consultation',
    marketing: 'Marketing',
    branding: 'Image de Marque',
    advertising: 'Publicité',
    procurement: 'Approvisionnement',
    realEstate: 'Immobilier',
    viewAll: 'Voir Tout',
    readMore: 'Lire Plus',
    submit: 'Soumettre',
    name: 'Nom',
    email: 'E-mail',
    phone: 'Téléphone',
    message: 'Message',
    send: 'Envoyer',
    loading: 'Chargement...',
    thankYou: 'Merci!',
    ourTeam: 'Notre Équipe',
    recentWork: 'Travail Récent',
    testimonials: 'Témoignages',
    faq: 'FAQ',
    privacy: 'Politique de Confidentialité',
    terms: 'Conditions d\'Utilisation',
  },
  es: {
    welcome: 'Bienvenido',
    services: 'Servicios',
    about: 'Acerca de',
    contact: 'Contacto',
    portfolio: 'Portafolio',
    solutions: 'Soluciones',
    blog: 'Blog',
    getStarted: 'Empezar',
    learnMore: 'Más información',
    ourServices: 'Nuestros Servicios',
    whyChooseUs: 'Por Qué Elegirnos',
    contactUs: 'Contáctenos',
    bookConsultation: 'Reservar una Consulta',
    marketing: 'Marketing',
    branding: 'Marca',
    advertising: 'Publicidad',
    procurement: 'Adquisiciones',
    realEstate: 'Bienes Raíces',
    viewAll: 'Ver Todo',
    readMore: 'Leer Más',
    submit: 'Enviar',
    name: 'Nombre',
    email: 'Correo',
    phone: 'Teléfono',
    message: 'Mensaje',
    send: 'Enviar Mensaje',
    loading: 'Cargando...',
    thankYou: '¡Gracias!',
    ourTeam: 'Nuestro Equipo',
    recentWork: 'Trabajos Recientes',
    testimonials: 'Testimonios',
    faq: 'Preguntas Frecuentes',
    privacy: 'Política de Privacidad',
    terms: 'Términos de Servicio',
  },
  de: {
    welcome: 'Willkommen',
    services: 'Dienstleistungen',
    about: 'Über uns',
    contact: 'Kontakt',
    portfolio: 'Portfolio',
    solutions: 'Lösungen',
    blog: 'Blog',
    getStarted: 'Loslegen',
    learnMore: 'Mehr erfahren',
    ourServices: 'Unsere Dienstleistungen',
    whyChooseUs: 'Warum Uns Wählen',
    contactUs: 'Kontaktieren Sie Uns',
    bookConsultation: 'Beratung Buchen',
    marketing: 'Marketing',
    branding: 'Markenbildung',
    advertising: 'Werbung',
    procurement: 'Beschaffung',
    realEstate: 'Immobilien',
    viewAll: 'Alle Anzeigen',
    readMore: 'Mehr Lesen',
    submit: 'Absenden',
    name: 'Name',
    email: 'E-Mail',
    phone: 'Telefon',
    message: 'Nachricht',
    send: 'Nachricht Senden',
    loading: 'Laden...',
    thankYou: 'Danke!',
    ourTeam: 'Unser Team',
    recentWork: 'Aktuelle Arbeit',
    testimonials: 'Referenzen',
    faq: 'FAQ',
    privacy: 'Datenschutzrichtlinie',
    terms: 'Nutzungsbedingungen',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('smic-language') as Language;
    if (saved && translations[saved]) {
      setLanguage(saved);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('smic-language', lang);
    document.documentElement.lang = lang;
  };

  const t = (key: string): string => {
    return translations[language][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}