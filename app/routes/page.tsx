'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Route } from '@/app/types';
import { Clock, MapPin, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/app/contexts/LanguageContext';
import AIPlanner from '../components/AIPlanner'; // Исправленный импорт
import { HistorySidebar } from '../components/HistorySidebar'; // Добавлен импорт

const ROUTES_DATA = [
  {
    id: '1',
    slug: 'tbilisi-old-town-walk',
    titleKey: 'tbilisiTitle',
    descKey: 'tbilisiDesc',
    image: 'https://loremflickr.com/1200/800/tbilisi,architecture/all?lock=1',
    duration: '4 Hours',
    difficulty: 'Easy',
    region: 'Tbilisi'
  },
  {
    id: '2',
    slug: 'kazbegi-gergeti-trinity',
    titleKey: 'kazbegiTitle',
    descKey: 'kazbegiDesc',
    image: 'https://loremflickr.com/1200/800/kazbegi,mountain/all?lock=2',
    duration: '1 Day',
    difficulty: 'Moderate',
    region: 'Mtskheta-Mtianeti'
  },
  {
    id: '3',
    slug: 'mestia-to-ushguli-trek',
    titleKey: 'svanetiTitle',
    descKey: 'svanetiDesc',
    image: 'https://loremflickr.com/1200/800/ushguli,svaneti/all?lock=3',
    duration: '4 Days',
    difficulty: 'Hard',
    region: 'Svaneti'
  },
  {
    id: '4',
    slug: 'kakheti-wine-tour',
    titleKey: 'kakhetiTitle',
    descKey: 'kakhetiDesc',
    image: 'https://loremflickr.com/1200/800/vineyard,georgia/all?lock=4',
    duration: '2 Days',
    difficulty: 'Easy',
    region: 'Kakheti'
  },
  {
    id: '5',
    slug: 'vardzia-cave-city',
    titleKey: 'vardziaTitle',
    descKey: 'vardziaDesc',
    image: 'https://loremflickr.com/1200/800/vardzia,caves/all?lock=5',
    duration: '1 Day',
    difficulty: 'Moderate',
    region: 'Samtskhe-Javakheti'
  },
  {
    id: '6',
    slug: 'tusheti-national-park',
    titleKey: 'tushetiTitle',
    descKey: 'tushetiDesc',
    image: 'https://loremflickr.com/1200/800/tusheti,landscape/all?lock=6',
    duration: '3 Days',
    difficulty: 'Extreme',
    region: 'Tusheti'
  }
] as const;

export default function RoutesPage() {
  const { t } = useLanguage();
  const [isHistoryOpen, setIsHistoryOpen] = useState(false); // Состояние для сайдбара
  
  const MOCK_ROUTES: Route[] = ROUTES_DATA.map(route => ({
    ...route,
    title: t.routes[route.titleKey as keyof typeof t.routes],
    description: t.routes[route.descKey as keyof typeof t.routes],
  }));

  const [difficultyFilter, setDifficultyFilter] = useState<'All' | 'Easy' | 'Moderate' | 'Hard'>('All');

  const filteredRoutes = MOCK_ROUTES.filter(route => {
    if (difficultyFilter === 'All') return true;
    if (difficultyFilter === 'Hard') return route.difficulty === 'Hard' || route.difficulty === 'Extreme';
    return route.difficulty === difficultyFilter;
  });

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pb-12 transition-colors duration-300 pt-10">
      <div className="bg-white dark:bg-gray-800 pb-12 pt-8 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-4">{t.routes.title}</h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            {t.routes.subtitle}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8">
        
        {/* Передаем onOpenHistory в AIPlanner */}
        <AIPlanner onOpenHistory={() => setIsHistoryOpen(true)} />
        
        <HistorySidebar isOpen={isHistoryOpen} onClose={() => setIsHistoryOpen(false)} />

        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 mt-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{t.routes.featured}</h2>
          
          <div className="flex gap-2 p-1 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            {[
              { label: t.routes.filterAll, val: 'All' },
              { label: t.routes.filterEasy, val: 'Easy' },
              { label: t.routes.filterModerate, val: 'Moderate' },
              { label: t.routes.filterHard, val: 'Hard' }
            ].map((f) => (
              <button
                key={f.val}
                onClick={() => setDifficultyFilter(f.val as any)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  difficultyFilter === f.val 
                    ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRoutes.map((route) => (
            <Link key={route.id} href={`/routes/${route.slug}`} className="group bg-white dark:bg-gray-800 rounded-3xl shadow-sm hover:shadow-2xl dark:shadow-gray-900 transition-all duration-300 overflow-hidden flex flex-col h-full border border-gray-100 dark:border-gray-700 hover:-translate-y-1">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={route.image} 
                  alt={route.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4">
                   <span className={`px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg backdrop-blur-md
                    ${route.difficulty === 'Easy' ? 'bg-green-500/90' : 
                      route.difficulty === 'Moderate' ? 'bg-yellow-500/90' : 
                      route.difficulty === 'Hard' ? 'bg-orange-500/90' : 'bg-red-600/90'}`}>
                    {route.difficulty}
                  </span>
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                   <MapPin size={14} className="text-georgianRed" /> {route.region}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-georgianRed transition-colors">
                  {route.title}
                </h3>
                
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                  {route.description}
                </p>
                
                <div className="mt-auto pt-6 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                    <Clock size={16} /> {route.duration}
                  </span>
                  
                  <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-900 dark:text-white group-hover:bg-georgianRed group-hover:text-white transition-all">
                    <ChevronRight size={20} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
