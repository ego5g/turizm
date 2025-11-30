'use client';
import React, { useState, useEffect } from 'react';
import { Menu, X, Map, MessageCircle, Home, Sun, Moon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { Language } from '../types';
import Logo from './Logo';
import { useMounted } from '../hooks/useMounted'; // Import useMounted

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const mounted = useMounted(); // Use the hook

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const isActive = (path: string) => 
    pathname === path 
      ? "text-georgianRed font-bold after:w-full" 
      : "text-gray-600 dark:text-gray-300 hover:text-georgianRed dark:hover:text-georgianRed after:w-0 hover:after:w-full";

  const navItems = [
    { name: t.nav.home, path: '/', icon: <Home size={18} /> },
    { name: t.nav.routes, path: '/routes', icon: <Map size={18} /> },
    { name: t.nav.forum, path: '/forum', icon: <MessageCircle size={18} /> },
  ];

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'ENG', flag: '🇬🇧' },
    { code: 'ka', label: 'GEO', flag: '🇬🇪' },
    { code: 'ru', label: 'RUS', flag: '🇷🇺' },
  ];

  // Render a placeholder until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
        <header 
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b bg-white dark:bg-gray-900 border-transparent py-4'}`}>
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-3 group">
                        <span className="bg-gray-100 dark:bg-gray-800 p-2 rounded-xl">
                        <Logo className="w-8 h-8" />
                        </span>
                        <span className="text-2xl font-black text-gray-900 dark:text-white tracking-tighter">
                        turizm<span className="text-georgianRed">.ge</span>
                        </span>
                    </Link>
                </div>
            </div>
      </header>
    );
  }

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled 
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm border-gray-200 dark:border-gray-800 py-2' 
          : 'bg-white dark:bg-gray-900 border-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <span className="bg-gray-100 dark:bg-gray-800 p-2 rounded-xl group-hover:scale-105 transition-transform duration-300">
              <Logo className="w-8 h-8" />
            </span>
            <span className="text-2xl font-black text-gray-900 dark:text-white tracking-tighter">
              turizm<span className="text-georgianRed">.ge</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`relative px-4 py-2 flex items-center gap-2 transition-all duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-georgianRed after:transition-all after:duration-300 ${isActive(item.path)}`}
              >
                {item.name}
              </Link>
            ))}
            
            <div className="flex items-center gap-3 ml-6 pl-6 border-l border-gray-200 dark:border-gray-700">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-yellow-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle Theme"
              >
                {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
              </button>

              {/* Language Switcher */}
              <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`px-3 py-1 text-xs font-bold rounded-md transition-all duration-200 ${
                      language === lang.code 
                        ? 'bg-white dark:bg-gray-600 text-georgianRed shadow-sm scale-105' 
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 animate-in slide-in-from-top-5 duration-200 shadow-xl">
          <div className="container mx-auto px-4 py-6 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                  pathname === item.path 
                    ? "bg-red-50 dark:bg-red-900/20 text-georgianRed font-bold"
                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
            
            <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Appearance</span>
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-yellow-400"
                >
                  {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setIsOpen(false);
                    }}
                    className={`py-2 text-sm font-medium rounded-lg border ${
                      language === lang.code 
                        ? 'border-georgianRed text-georgianRed bg-red-50 dark:bg-red-900/20' 
                        : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
