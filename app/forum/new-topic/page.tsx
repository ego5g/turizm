'use client'
import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Send, MessageSquare, Tag, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewTopicPage() {
  const { t } = useLanguage();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('general');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Here you would typically send the data to your backend API
    // For this example, we'll just simulate a delay.
    console.log('Submitting new topic:', { title, content, category });
    await new Promise(resolve => setTimeout(resolve, 1500)); 
    setIsSubmitting(false);
    // Ideally, you would redirect the user to the new topic page
    // or back to the forum index after successful submission.
    alert('Topic submitted successfully! (Simulation)');
    setTitle('');
    setContent('');
  };

  const categories = [
    { id: 'general', name: t.categories.general },
    { id: 'destinations', name: t.categories.destinations },
    { id: 'tips', name: t.categories.tips },
    { id: 'planning', name: t.categories.planning },
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pt-24 pb-12">
        <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
                 <div className="mb-8">
                    <Link href="/forum" className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-georgianRed transition-colors">
                        <ArrowLeft size={18} />
                        {t.forum.backToForum}
                    </Link>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 p-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
                        <MessageSquare className="text-georgianRed" />
                        {t.forum.newTopic}
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mb-8">{t.forum.shareYourThoughts}</p>

                    <form onSubmit={handleFormSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t.forum.topicTitle}</label>
                            <input 
                                type="text" 
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder={t.forum.titlePlaceholder}
                                className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border-transparent rounded-lg focus:ring-georgianRed focus:border-georgianRed transition"
                                required 
                            />
                        </div>
                        
                        <div>
                             <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t.forum.category}</label>
                            <div className="relative">
                                <select 
                                    id="category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full appearance-none px-4 py-3 bg-gray-100 dark:bg-gray-700 border-transparent rounded-lg focus:ring-georgianRed focus:border-georgianRed transition pr-10"
                                >
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                                <Tag className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                            </div>
                        </div>

                        <div>
                             <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t.forum.yourMessage}</label>
                            <textarea 
                                id="content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder={t.forum.messagePlaceholder}
                                rows={8}
                                className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border-transparent rounded-lg focus:ring-georgianRed focus:border-georgianRed transition"
                                required
                            ></textarea>
                        </div>
                        
                        <div className="text-right">
                            <button 
                                type="submit"
                                disabled={isSubmitting}
                                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-georgianRed text-white font-bold rounded-lg hover:bg-red-700 transition-all shadow-lg shadow-red-500/30 disabled:bg-gray-400 disabled:shadow-none"
                            >
                                {isSubmitting ? <Loader2 className="animate-spin" /> : <Send size={18} />}
                                {isSubmitting ? t.forum.submitting : t.forum.submitTopic}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}
