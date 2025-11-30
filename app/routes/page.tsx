'use client'
import React, { useState } from 'react';
import { Route } from '../types';
import { Clock, TrendingUp, MapPin, Sparkles, Loader2, Filter, ChevronRight } from 'lucide-react';
import { generateItinerary } from '../services/geminiService';
import { useLanguage } from '../contexts/LanguageContext';

const MOCK_ROUTES: Route[] = [
  {
    id: '1',
    title: 'Tbilisi Old Town Walk',
    description: 'Explore the narrow streets, sulfur baths, and Narikala fortress. A perfect introduction to the capital.',
    image: 'https://loremflickr.com/800/600/tbilisi,architecture/all', 
    duration: '4 Hours',
    difficulty: 'Easy',
    region: 'Tbilisi'
  },
  {
    id: '2',
    title: 'Kazbegi & Gergeti Trinity',
    description: 'A breathtaking drive along the Georgian Military Highway to Mount Kazbek. See the iconic church above the clouds.',
    image: 'https://loremflickr.com/800/600/kazbegi,mountain/all',
    duration: '1 Day',
    difficulty: 'Moderate',
    region: 'Mtskheta-Mtianeti'
  },
  {
    id: '3',
    title: 'Mestia to Ushguli Trek',
    description: 'The classic 4-day hike connecting Svaneti villages to the highest settlement in Europe. Medieval towers everywhere.',
    image: 'https://loremflickr.com/800/600/ushguli,svaneti/all',
    duration: '4 Days',
    difficulty: 'Hard',
    region: 'Svaneti'
  },
  {
    id: '4',
    title: 'Kakheti Wine Tour',
    description: 'Visit ancient cellars and taste traditional Qvevri wine in Signagi and Telavi. Experience the supra culture.',
    image: 'https://loremflickr.com/800/600/vineyard,georgia/all', 
    duration: '2 Days',
    difficulty: 'Easy',
    region: 'Kakheti'
  },
  {
    id: '5',
    title: 'Vardzia Cave City',
    description: 'Explore the massive 12th-century cave monastery complex carved into the slopes of Erusheti Mountain.',
    image: 'https://loremflickr.com/800/600/vardzia,caves/all', 
    duration: '1 Day',
    difficulty: 'Moderate',
    region: 'Samtskhe-Javakheti'
  },
  {
    id: '6',
    title: 'Tusheti National Park',
    description: 'For the adventurous. Accessible only by 4x4 in summer. untouched nature and ancient traditions.',
    image: 'https://loremflickr.com/800/600/tusheti,landscape/all', 
    duration: '3 Days',
    difficulty: 'Extreme',
    region: 'Tusheti'
  }
];

export default function RoutesPage() {
  const { t, language } = useLanguage();
  
  // State for AI Planner
  const [plannerDestination, setPlannerDestination] = useState('');
  const [plannerDuration, setPlannerDuration] = useState('3 days');
  const [plannerInterests, setPlannerInterests] = useState('');
  const [aiResult, setAiResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // State for Filters
  const [difficultyFilter, setDifficultyFilter] = useState<'All' | 'Easy' | 'Moderate' | 'Hard'>('All');

  const handleAIPlan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!plannerDestination) return;
    
    setIsLoading(true);
    setAiResult(null);
    
    const result = await generateItinerary(
      plannerDestination, 
      plannerDuration, 
      plannerInterests || "general sightseeing",
      language
    );
    
    setAiResult(result);
    setIsLoading(false);
  };

  const filteredRoutes = MOCK_ROUTES.filter(route => {
    if (difficultyFilter === 'All') return true;
    if (difficultyFilter === 'Hard') return route.difficulty === 'Hard' || route.difficulty === 'Extreme';
    return route.difficulty === difficultyFilter;
  });

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pb-12 transition-colors duration-300 pt-20">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 pb-12 pt-8 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-4">{t.routes.title}</h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            {t.routes.subtitle}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8">
        
        {/* AI Planner Section */}
        <section className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl shadow-xl p-8 mb-16 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <Sparkles className="text-yellow-300" size={24} />
              </div>
              <h2 className="text-2xl font-bold">{t.routes.aiTitle}</h2>
            </div>
            <p className="text-indigo-100 mb-8 max-w-2xl">{t.routes.aiDesc}</p>
            
            <form onSubmit={handleAIPlan} className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-4">
                <input 
                  type="text" 
                  placeholder={t.routes.destPlaceholder}
                  className="w-full p-4 rounded-xl border-none focus:ring-2 focus:ring-yellow-300 bg-white/10 backdrop-blur-md text-white placeholder-indigo-200 outline-none transition-all"
                  value={plannerDestination}
                  onChange={(e) => setPlannerDestination(e.target.value)}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <select 
                  className="w-full p-4 rounded-xl border-none focus:ring-2 focus:ring-yellow-300 bg-white/10 backdrop-blur-md text-white outline-none cursor-pointer [&>option]:text-gray-900"
                  value={plannerDuration}
                  onChange={(e) => setPlannerDuration(e.target.value)}
                >
                  <option value="1 day">1 Day</option>
                  <option value="3 days">3 Days</option>
                  <option value="1 week">1 Week</option>
                  <option value="2 weeks">2 Weeks</option>
                </select>
              </div>
              <div className="md:col-span-4">
                <input 
                  type="text" 
                  placeholder={t.routes.interestsPlaceholder}
                  className="w-full p-4 rounded-xl border-none focus:ring-2 focus:ring-yellow-300 bg-white/10 backdrop-blur-md text-white placeholder-indigo-200 outline-none"
                  value={plannerInterests}
                  onChange={(e) => setPlannerInterests(e.target.value)}
                />
              </div>
              <div className="md:col-span-2">
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full h-full bg-yellow-400 text-indigo-900 font-bold rounded-xl hover:bg-yellow-300 transition-colors flex justify-center items-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg"
                >
                  {isLoading ? <Loader2 className="animate-spin" size={20} /> : t.routes.generate}
                </button>
              </div>
            </form>

            {aiResult && (
              <div className="mt-8 p-8 bg-white/95 text-gray-900 rounded-2xl shadow-lg animate-in slide-in-from-bottom-4">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                   <Sparkles className="text-purple-600" size={20} /> {t.routes.yourItinerary}
                </h3>
                <div className="prose prose-sm md:prose-base max-w-none text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {aiResult}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Routes Grid with Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
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
            <div key={route.id} className="group bg-white dark:bg-gray-800 rounded-3xl shadow-sm hover:shadow-2xl dark:shadow-gray-900 transition-all duration-300 overflow-hidden flex flex-col h-full border border-gray-100 dark:border-gray-700 hover:-translate-y-1">
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
                  
                  <button className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-900 dark:text-white group-hover:bg-georgianRed group-hover:text-white transition-all">
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}