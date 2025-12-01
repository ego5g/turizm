'use client';
import React, { useState, useMemo } from 'react';
import { Sparkles, Loader2, BookOpen, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useSharedAiPlanner } from '../contexts/AiPlannerContext';

interface AIPlannerProps {
  onClose?: () => void;
  onOpenHistory: () => void;
}

export default function AIPlanner({ onClose, onOpenHistory }: AIPlannerProps) {
  const { t } = useLanguage();
  const { plans, generatePlan } = useSharedAiPlanner();
  
  const [destination, setDestination] = useState('');
  const [duration, setDuration] = useState('3 days');
  const [interests, setInterests] = useState('');

  const isLoading = useMemo(() => plans.some(p => p.status === 'generating'), [plans]);

  const handleAIPlan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    await generatePlan({ destination, duration, interests });
    onOpenHistory();
  };

  return (
    <section className="container mx-auto px-4 mt-12" id="ai-planner">
        <div 
            className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl shadow-xl p-8 md:p-10 text-white overflow-hidden relative"
        >
        {onClose && (
            <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-20">
                <X size={24} />
            </button>
        )}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <Sparkles className="text-yellow-300" size={28} />
            </div>
            <h2 className="text-3xl font-bold tracking-tight">{t.planner.aiGuideTitle}</h2>
          </div>
          <p className="text-indigo-100 mb-8 max-w-2xl">{t.planner.aiGuideDesc}</p>

          <form onSubmit={handleAIPlan} className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-4">
              <input
                type="text"
                placeholder={t.routes.destPlaceholder}
                className="w-full p-4 rounded-xl border-none focus:ring-2 focus:ring-yellow-300 bg-white/10 backdrop-blur-md text-white placeholder-indigo-200 outline-none transition-all"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                required
              />
            </div>
            <div className="md:col-span-2">
              <select
                className="w-full p-4 rounded-xl border-none focus:ring-2 focus:ring-yellow-300 bg-white/10 backdrop-blur-md text-white outline-none cursor-pointer [&>option]:text-gray-900"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              >
                <option value="1 day">1 {t.planner.day}</option>
                <option value="3 days">3 {t.planner.days}</option>
                <option value="1 week">1 {t.planner.week}</option>
                <option value="2 weeks">2 {t.planner.weeks}</option>
              </select>
            </div>
            <div className="md:col-span-3">
              <input
                type="text"
                placeholder={t.routes.interestsPlaceholder}
                className="w-full p-4 rounded-xl border-none focus:ring-2 focus:ring-yellow-300 bg-white/10 backdrop-blur-md text-white placeholder-indigo-200 outline-none"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
              />
            </div>
            <div className="md:col-span-3 flex gap-2">
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-full min-h-[56px] bg-yellow-400 text-indigo-900 font-bold rounded-xl hover:bg-yellow-300 transition-colors flex justify-center items-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg text-lg"
                >
                    {isLoading ? <Loader2 className="animate-spin" size={24} /> : t.planner.cta}
                </button>
                <button
                    type="button"
                    onClick={onOpenHistory}
                    title={t.planner.myPlans} // Добавил title для всплывающей подсказки
                    className="h-full min-h-[56px] px-6 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors flex justify-center items-center gap-2 shadow-lg text-lg"
                    >
                    <BookOpen size={22}/>
                </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
