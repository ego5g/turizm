'use client'
import React, { useState, useEffect } from 'react';
import { ForumTopic } from '@/app/types';
import { MessageSquare, Search, PlusCircle, Pin, Loader2 } from 'lucide-react';
import { useLanguage } from '@/app/contexts/LanguageContext';
import Link from 'next/link';
import { getTopics } from '../lib/firebase';

export default function ForumPage() {
  const { t } = useLanguage();
  const [topics, setTopics] = useState<ForumTopic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        setLoading(true);
        const topicsFromDb = await getTopics();
        // Sort topics: pinned first, then by last activity
        const sortedTopics = topicsFromDb.sort((a, b) => {
            if (a.isPinned && !b.isPinned) return -1;
            if (!a.isPinned && b.isPinned) return 1;
            return new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime();
        });
        setTopics(sortedTopics);
        setError(null);
      } catch (err) {
        setError('Не удалось загрузить темы. Пожалуйста, попробуйте еще раз позже.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, []);

  const filteredTopics = topics.filter(topic => {
    const matchesCategory = selectedCategory === 'All' || topic.category === selectedCategory;
    const matchesSearch = topic.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = [
    { key: 'general', name: t.categories.general },
    { key: 'destinations', name: t.categories.destinations },
    { key: 'tips', name: t.categories.tips },
    { key: 'planning', name: t.categories.planning },
    { key: 'finance', name: t.categories.finance },
    { key: 'accommodation', name: t.categories.accommodation },
    { key: 'transport', name: t.categories.transport },
    { key: 'mobile', name: t.categories.mobile },
    { key: 'legal', name: t.categories.legal },
    { key: 'food', name: t.categories.food },
    { key: 'events', name: t.categories.events },
    { key: 'marketplace', name: t.categories.marketplace },
];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString(undefined, { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen pb-12 relative transition-colors duration-300 pt-20">
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-2">{t.forum.title}</h1>
              <p className="text-gray-500 dark:text-gray-400 text-lg">{t.forum.subtitle}</p>
            </div>
            <Link 
              href="/forum/new-topic"
              className="bg-georgianRed text-white px-8 py-3 rounded-xl font-bold hover:bg-red-700 transition-colors flex items-center gap-2 shadow-lg shadow-red-500/30"
            >
              <PlusCircle size={20} /> {t.forum.newTopic}
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 transition-colors border border-gray-100 dark:border-gray-700">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-sm uppercase tracking-wider">{t.forum.category}</h3>
            <div className="space-y-2">
              <button 
                onClick={() => setSelectedCategory('All')}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all font-medium ${selectedCategory === 'All' ? 'bg-georgianRed text-white shadow-md' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
              >
                {t.forum.topics}
              </button>
              {categories.map(cat => (
                <button 
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all font-medium ${selectedCategory === cat.key ? 'bg-georgianRed text-white shadow-md' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="relative mb-8">
            <input 
              type="text"
              placeholder={t.forum.searchPlaceholder}
              className="w-full pl-12 pr-4 py-4 border-none rounded-2xl focus:outline-none focus:ring-2 focus:ring-georgianRed bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm transition-colors placeholder-gray-400 text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
          </div>

          {
            loading ? (
              <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 flex justify-center items-center">
                  <Loader2 className="animate-spin text-georgianRed mr-4" size={24}/>
                  <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">Загрузка тем...</p>
              </div>
            ) : error ? (
              <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl border border-dashed border-red-500 dark:border-red-700">
                <p className="text-red-500 dark:text-red-400 text-lg font-medium">{error}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredTopics.length > 0 ? (
                  filteredTopics.map(topic => (
                    <Link 
                      key={topic.id} 
                      href={`/forum/${topic.id}`}
                      className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 hover:shadow-xl dark:shadow-gray-900 transition-all border border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row justify-between gap-4 cursor-pointer hover:-translate-y-1 group"
                    >
                      <div className="flex-grow">
                        <div className="flex items-center gap-3 mb-2">
                          {topic.isPinned && <span className="bg-red-50 text-georgianRed p-1 rounded"><Pin size={14} className="fill-current" /></span>}
                          <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            {categories.find(c => c.key === topic.category)?.name || topic.category}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 group-hover:text-georgianRed transition-colors mb-2">
                          {topic.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 inline-block"></span>
                          <span className="font-medium text-gray-700 dark:text-gray-300">{topic.author}</span>
                        </p>
                      </div>
                      <div className="flex sm:flex-col items-center sm:items-end gap-4 sm:gap-2 text-gray-400 dark:text-gray-500 text-sm whitespace-nowrap min-w-[100px]">
                        <div className="flex items-center gap-1 bg-gray-50 dark:bg-gray-700/50 px-3 py-1 rounded-full">
                          <MessageSquare size={14} /> <span className="font-bold">{topic.repliesCount || 0}</span>
                        </div>
                        <div className="text-xs">
                           <span>{formatDate(topic.lastActivity)}</span>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
                    <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">{t.forum.noTopics}</p>
                  </div>
                )}
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
}