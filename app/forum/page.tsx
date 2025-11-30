'use client'
import React, { useState } from 'react';
import { ForumTopic } from '@/app/types';
import { MessageSquare, Users, Search, PlusCircle, Pin, ArrowLeft, Send, User } from 'lucide-react';
import { useLanguage } from '@/app/contexts/LanguageContext';
import Link from 'next/link';

const INITIAL_TOPICS: ForumTopic[] = [
  { id: '1', title: 'READ FIRST: Georgia Travel Rules & Visa Info 2024', author: 'Admin', category: 'general', content: 'Welcome to the forum! Please read the rules before posting. Visa free regime applies to 98 countries.', replies: 142, views: 5020, lastActivity: '2 hours ago', isPinned: true },
  { id: '2', title: 'Best way to get from Kutaisi Airport to Tbilisi?', author: 'JohnDoe', category: 'destinations', content: 'I am landing at 3 AM. Are there trains or should I take Georgian Bus?', replies: 23, views: 450, lastActivity: '5 mins ago' },
  { id: '3', title: 'Is the Mestia-Ushguli trail open in late May?', author: 'HikerGirl', category: 'tips', content: 'Planning a trip next month. Is there still too much snow on the pass?', replies: 8, views: 120, lastActivity: '1 day ago' },
  { id: '4', title: 'Looking for vegetarian restaurant recommendations in Batumi', author: 'VeggieTraveler', category: 'planning', content: 'I know Adjarian Khachapuri is great, but looking for full meal options.', replies: 12, views: 200, lastActivity: '3 days ago' },
];

interface Comment {
  id: string;
  author: string;
  text: string;
  time: string;
}

export default function ForumPage() {
  const { t } = useLanguage();
  const [topics, setTopics] = useState<ForumTopic[]>(INITIAL_TOPICS);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [activeTopic, setActiveTopic] = useState<ForumTopic | null>(null);
  const [topicComments, setTopicComments] = useState<Comment[]>([
    { id: '1', author: 'Giorgi_Guide', text: 'Yes, Georgian Bus is the most reliable option at night.', time: '10 mins ago' },
    { id: '2', author: 'TravelBug', text: 'You can also book a private transfer via Gotrip.', time: '5 mins ago' }
  ]);
  const [newComment, setNewComment] = useState('');

  const handleCreateTopic = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to be added
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if(!newComment) return;
    
    const comment: Comment = {
      id: Date.now().toString(),
      author: 'You',
      text: newComment,
      time: 'Just now'
    };
    
    setTopicComments([...topicComments, comment]);
    setNewComment('');
  };

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
  ];

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen pb-12 relative transition-colors duration-300 pt-20">
      
      {activeTopic ? (
        <div className="container mx-auto px-4 py-8 animate-in slide-in-from-right duration-300">
          <button 
            onClick={() => setActiveTopic(null)}
            className="flex items-center gap-2 text-gray-500 hover:text-georgianRed mb-6 font-medium transition-colors"
          >
            <ArrowLeft size={20} /> {t.forum.backToForum}
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">
                  <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-georgianRed">
                    <User size={20} />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight">{activeTopic.title}</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {t.forum.postedBy} <span className="font-semibold">{activeTopic.author}</span> • {activeTopic.lastActivity}
                    </p>
                  </div>
                </div>
                <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed">
                  <p>{activeTopic.content}</p>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
                  <MessageSquare size={18} /> {t.forum.replies} ({topicComments.length})
                </h3>
                
                <div className="space-y-6 mb-8">
                  {topicComments.map((comment) => (
                    <div key={comment.id} className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0" />
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-gray-900 dark:text-white text-sm">{comment.author}</span>
                          <span className="text-xs text-gray-500">{comment.time}</span>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">{comment.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <form onSubmit={handlePostComment} className="flex gap-4">
                  <div className="flex-grow relative">
                    <input 
                      type="text" 
                      placeholder={t.forum.messagePlaceholder}
                      className="w-full pl-4 pr-12 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-georgianRed outline-none"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button 
                      type="submit"
                      disabled={!newComment}
                      className="absolute right-2 top-2 p-1.5 text-georgianRed hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors disabled:opacity-50"
                    >
                      <Send size={20} />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
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
                <Search className="absolute left-4 top-4.5 text-gray-400" size={24} />
              </div>

              <div className="space-y-4">
                {filteredTopics.length > 0 ? (
                  filteredTopics.map(topic => (
                    <div 
                      key={topic.id} 
                      onClick={() => setActiveTopic(topic)}
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
                          <MessageSquare size={14} /> <span className="font-bold">{topic.replies}</span>
                        </div>
                        <div className="text-xs">
                           <span>{topic.lastActivity}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
                    <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">{t.forum.noTopics}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}