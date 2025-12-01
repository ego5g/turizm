'use client';
import React, { useState } from 'react';
import { ArrowRight, Mountain, Utensils, Building, CheckCircle2, Calendar, Heart, Sparkles, Loader2, MessageSquare, X } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from './contexts/LanguageContext';

export default function Home() {
  const { t, language } = useLanguage();
  const [isPlannerOpen, setIsPlannerOpen] = useState(false);
  
  const [plannerDestination, setPlannerDestination] = useState('');
  const [plannerDuration, setPlannerDuration] = useState('1 day');
  const [plannerInterests, setPlannerInterests] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [aiResult, setAiResult] = useState('');

  const tips = [
    { icon: <CheckCircle2 size={24} />, title: t.home.tip1Title, desc: t.home.tip1Desc, color: "text-green-500", bg: "bg-green-100 dark:bg-green-900/30" },
    { icon: <Calendar size={24} />, title: t.home.tip2Title, desc: t.home.tip2Desc, color: "text-blue-500", bg: "bg-blue-100 dark:bg-blue-900/30" },
    { icon: <Heart size={24} />, title: t.home.tip3Title, desc: t.home.tip3Desc, color: "text-red-500", bg: "bg-red-100 dark:bg-red-900/30" },
  ];

  const destinations = [
    { title: t.home.tbilisi, desc: t.home.ancientDesc, img: 'https://loremflickr.com/800/600/tbilisi,oldtown/all' },
    { title: t.home.batumi, desc: t.home.coastalDesc, img: 'https://loremflickr.com/800/600/batumi,sea/all' },
    { title: t.home.svaneti, desc: t.home.wildDesc, img: 'https://loremflickr.com/800/600/mountains,svaneti/all' },
  ];

  const handleAIPlan = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setAiResult('');
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          destination: plannerDestination,
          duration: plannerDuration,
          interests: plannerInterests,
          language: language, // Pass current language
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }
      
      if(data.error){
        throw new Error(data.error);
      }

      setAiResult(data.plan);

    } catch (err: any) {
      setError(err.message || 'Failed to generate plan. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen pt-16">
      <main className="flex-grow">
        <section
          className="w-full aspect-[1536/1024] md:aspect-[2.2/1] bg-cover bg-top relative group"
          style={{ backgroundImage: "url('https://i.ibb.co/MD9TXLQF/turizm.webp')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/60 dark:to-gray-900"></div>
        </section>

        <section className="bg-white dark:bg-gray-900 py-16 -mt-12 relative z-10 rounded-t-3xl shadow-2xl mx-auto max-w-7xl transition-colors duration-300">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white mb-6 tracking-tight leading-tight">
              {t.home.heroTitle} <span className="text-transparent bg-clip-text bg-gradient-to-r from-georgianRed to-red-600">{t.home.georgia}</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
              {t.home.heroSubtitle}
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
                
              <Link
                href="/routes"
                className="inline-flex items-center justify-center px-8 py-4 bg-georgianRed text-white text-lg font-bold rounded-full hover:bg-red-700 transition-all shadow-lg shadow-red-500/30 hover:-translate-y-1"
              >
                {t.home.cta} <ArrowRight className="ml-2" size={20} />
              </Link>
              <Link
                href="/forum"
                className="inline-flex items-center justify-center px-8 py-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white text-lg font-bold rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
              >
                {t.home.join}
              </Link>
              <button
                    onClick={() => setIsPlannerOpen(true)}
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-lg font-bold rounded-full hover:scale-105 transition-transform shadow-lg shadow-indigo-500/30"
                >
                    <Sparkles size={22} />
                    {t.routes.aiTitle} 
                </button>
            </div>
          </div>
        </section>

        {isPlannerOpen && (
             <section className="container mx-auto px-4 mt-12">
             <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl shadow-xl p-8 text-white overflow-hidden relative">
                 <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                 <button onClick={() => setIsPlannerOpen(false)} className="absolute top-6 right-6 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                     <X size={20} />
                 </button>
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
                                 <option value="1 day">1 {t.planner.day}</option>
                                 <option value="3 days">3 {t.planner.days}</option>
                                 <option value="1 week">1 {t.planner.week}</option>
                                 <option value="2 weeks">2 {t.planner.weeks}</option>
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
                                 className="w-full h-full min-h-[56px] bg-yellow-400 text-indigo-900 font-bold rounded-xl hover:bg-yellow-300 transition-colors flex justify-center items-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg"
                             >
                                 {isLoading ? <Loader2 className="animate-spin" size={20} /> : t.routes.generate}
                             </button>
                         </div>
                     </form>

                     {error && (
                         <div className="mt-8 p-6 bg-red-100 text-red-800 rounded-2xl shadow-lg">
                             <h3 className="font-bold">An Error Occurred</h3>
                             <p>{error}</p>
                         </div>
                     )}

                     {aiResult && !error && (
                         <div className="mt-8 p-8 bg-white/95 text-gray-900 rounded-2xl shadow-lg animate-in slide-in-from-bottom-4">
                             <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                 <Sparkles className="text-purple-600" size={20} /> {t.routes.yourItinerary}
                             </h3>
                             <div className="prose prose-sm md:prose-base max-w-none text-gray-700 whitespace-pre-wrap leading-relaxed">
                                 {aiResult}
                             </div>
                             <div className="mt-8 text-center">
                                 <Link href="/forum/new-topic" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30">
                                     <MessageSquare size={20} />
                                     {t.planner.discuss}
                                 </Link>
                             </div>
                         </div>
                     )}
                 </div>
             </div>
             </section>
        )}

         <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-3xl p-8 md:p-12 border border-gray-100 dark:border-gray-800">
              <h3 className="text-3xl font-bold mb-10 text-center text-gray-900 dark:text-white">{t.home.tipsTitle}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {tips.map((tip, idx) => (
                  <div key={idx} className="flex flex-col items-center text-center">
                    <div className={`w-14 h-14 ${tip.bg} ${tip.color} rounded-2xl flex items-center justify-center mb-4`}>
                      {tip.icon}
                    </div>
                    <h4 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{tip.title}</h4>
                    <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{tip.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group hover:-translate-y-2">
                    <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 text-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform">
                    <Building size={32} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">{t.home.ancientCities}</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{t.home.ancientDesc}</p>
                </div>
                <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group hover:-translate-y-2">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform">
                    <Mountain size={32} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">{t.home.wildNature}</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{t.home.wildDesc}</p>
                </div>
                <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group hover:-translate-y-2">
                    <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform">
                    <Utensils size={32} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">{t.home.gastronomy}</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{t.home.gastronomyDesc}</p>
                </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-end mb-12">
              <h3 className="text-4xl font-bold text-gray-900 dark:text-white">{t.home.popularDest}</h3>
              <Link href="/routes" className="hidden md:flex text-georgianRed font-bold hover:gap-2 gap-1 items-center transition-all">
                 {t.home.seeAll} <ArrowRight size={20} />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {destinations.map((dest, idx) => (
                <div key={idx} className="group relative h-96 rounded-3xl overflow-hidden cursor-pointer shadow-lg">
                  <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800">
                    <img 
                      src={dest.img} 
                      alt={dest.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8 flex flex-col justify-end">
                    <h4 className="text-3xl font-bold text-white mb-2">{dest.title}</h4>
                    <p className="text-white/80 line-clamp-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      {dest.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
