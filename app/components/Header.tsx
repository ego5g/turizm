'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { Globe, Menu, X } from 'lucide-react';

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'ru' : 'en';
    setLanguage(newLang);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="text-2xl font-bold text-georgianRed transition-transform hover:scale-105">
            Georgia
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-georgianRed font-medium transition-colors">{t.nav.home}</Link>
            <Link href="/routes" className="text-gray-600 dark:text-gray-300 hover:text-georgianRed font-medium transition-colors">{t.nav.routes}</Link>
            <Link href="/forum" className="text-gray-600 dark:text-gray-300 hover:text-georgianRed font-medium transition-colors">{t.nav.forum}</Link>
          </div>

          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <button onClick={toggleLanguage} className="hidden md:flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-georgianRed dark:hover:text-white transition-colors">
              <Globe size={18} />
              <span>{language.toUpperCase()}</span>
            </button>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="md:hidden text-gray-700 dark:text-gray-300 hover:text-georgianRed transition-colors p-2 h-14 w-14 flex items-center justify-center"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 shadow-lg absolute top-full left-0 right-0 animate-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col space-y-4 p-6">
            <Link href="/" className="text-gray-700 dark:text-gray-200 hover:text-georgianRed py-2 text-lg font-semibold" onClick={() => setIsMenuOpen(false)}>{t.nav.home}</Link>
            <Link href="/routes" className="text-gray-700 dark:text-gray-200 hover:text-georgianRed py-2 text-lg font-semibold" onClick={() => setIsMenuOpen(false)}>{t.nav.routes}</Link>
            <Link href="/forum" className="text-gray-700 dark:text-gray-200 hover:text-georgianRed py-2 text-lg font-semibold" onClick={() => setIsMenuOpen(false)}>{t.nav.forum}</Link>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <button onClick={toggleLanguage} className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-georgianRed dark:hover:text-white transition-colors w-full text-left">
                <Globe size={18} />
                <span>{language === 'en' ? 'Switch to Russian' : 'Switch to English'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}