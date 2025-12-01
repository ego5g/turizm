'use client';
import React, { useState, useEffect } from 'react';
import { Menu, X, Map, MessageCircle, Home, Sun, Moon, BookOpen, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { Language } from '../types';
import Logo from './Logo';
import { useMounted } from '../hooks/useMounted';
import { useSharedAiPlanner } from '../contexts/AiPlannerContext';
import { HistorySidebar } from './HistorySidebar';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const { plans } = useSharedAiPlanner();
  const mounted = useMounted();

  const isGenerating = plans.some(p => p.status === 'generating');

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
      ? "text-georgianRed font-bold" 
      : "text-gray-700 dark:text-gray-300 hover:text-georgianRed dark:hover:text-georgianRed";

  const navItems = [
    { name: t.nav.home, path: '/', icon: <Home size={20} /> },
    { name: t.nav.routes, path: '/routes', icon: <Map size={20} /> },
    { name: t.nav.forum, path: '/forum', icon: <MessageCircle size={20} /> },
  ];

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'ENG', flag: '🇬🇧' },
    { code: 'ka', label: 'GEO', flag: '🇬🇪' },
    { code: 'ru', label: 'RUS', flag: '🇷🇺' },
  ];

  if (!mounted) {
    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b bg-white dark:bg-gray-900 border-transparent py-4'}`}>
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
                <Link href="/" className="flex items-center gap-3 group">
                  <span className="bg-gray-100 dark:bg-gray-800 p-2 rounded-xl"><Logo className="w-8 h-8" /></span>
                  <span className="text-2xl font-black text-gray-900 dark:text-white tracking-tighter">turizm<span className="text-georgianRed">.ge</span></span>
                </Link>
            </div>
          </div>
        </header>
    );
  }

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 border-b ${
          scrolled 
            ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm border-gray-200 dark:border-gray-800 py-2' 
            : 'bg-white dark:bg-gray-900 border-transparent py-4'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-3 group" onClick={() => setIsOpen(false)}>
              <span className="bg-gray-100 dark:bg-gray-800 p-2 rounded-xl group-hover:scale-105 transition-transform duration-300">
                <Logo className="w-8 h-8" />
              </span>
              <span className="text-2xl font-black text-gray-900 dark:text-white tracking-tighter">
                turizm<span className="text-georgianRed">.ge</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center">
                <nav className="flex items-center space-x-1">
                {navItems.map((item) => (
                    <Link
                    key={item.path}
                    href={item.path}
                    className={`relative px-4 py-2 flex items-center gap-2 transition-all duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-georgianRed after:transition-all after:duration-300 ${isActive(item.path).replace('font-bold', '')} ${pathname === item.path ? 'after:w-full font-bold' : 'after:w-0 hover:after:w-full'}`}
                    >
                    {item.name}
                    </Link>
                ))}
                </nav>
              
                <div className="flex items-center gap-3 ml-6 pl-6 border-l border-gray-200 dark:border-gray-700">
                    <button
                    onClick={() => setIsHistoryOpen(true)}
                    className="relative p-2 rounded-full bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-blue-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    aria-label="View Travel Plans"
                    >
                    {isGenerating ? <Loader2 className="animate-spin" size={18} /> : <BookOpen size={18} />}
                    {plans.length > 0 && !isGenerating && (
                        <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-georgianRed ring-2 ring-white dark:ring-gray-900" />
                    )}
                    </button>

                    <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-yellow-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Toggle Theme"
                    >
                    {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                    </button>

                    <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                    {languages.map((lang) => (
                        <button
                        key={lang.code}
                        onClick={() => setLanguage(lang.code)}
                        className={`px-3 py-1 text-xs font-bold rounded-md transition-all duration-200 ${language === lang.code ? 'bg-white dark:bg-gray-600 text-georgianRed shadow-sm' : 'text-gray-500 dark:text-gray-400'}`}>
                        {lang.label}
                        </button>
                    ))}
                    </div>
                </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
                <button
                    onClick={toggleTheme}
                    className="p-2 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    aria-label="Toggle Theme"
                    >
                    {theme === 'light' ? <Moon size={22} /> : <Sun size={22} />}
                </button>
                <button
                    onClick={() => setIsHistoryOpen(true)}
                    className="relative p-2 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    aria-label="View Travel Plans"
                    >
                    {isGenerating ? <Loader2 className="animate-spin" size={22} /> : <BookOpen size={22} />}
                    {plans.length > 0 && !isGenerating && (
                        <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-georgianRed ring-2 ring-white dark:ring-gray-900" />
                    )}
                </button>
                <button
                    className="p-2 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 animate-in slide-in-from-top-5 duration-300 shadow-xl">
            <nav className="flex flex-col p-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${isActive(item.path)} ${pathname === item.path ? 'bg-gray-100 dark:bg-gray-800' : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'}`}>
                  {item.icon}
                  <span className="text-base">{item.name}</span>
                </Link>
              ))}
            </nav>
            <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                <span className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">Language</span>
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
        )}
      </header>

      <HistorySidebar isOpen={isHistoryOpen} onClose={() => setIsHistoryOpen(false)} />
    </>
  );
}
