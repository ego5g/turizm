'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { useMounted } from '../hooks/useMounted'; // Import useMounted

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations['en'];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');
  const mounted = useMounted();

  useEffect(() => {
    if (mounted) {
      const storedLang = localStorage.getItem('language') as Language | null;
      if (storedLang) {
        setLanguage(storedLang);
      }
    }
  }, [mounted]);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('language', language);
    }
  }, [language, mounted]);

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
