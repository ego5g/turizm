'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { useLanguage } from '../../contexts/LanguageContext';
import Link from 'next/link';
import { ArrowLeft, User, Calendar, Send, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { getTopic, createReply } from '../../lib/firebase';
import { ForumTopic, ForumReply } from '../../types';

export default function TopicPage() {
  const { t } = useLanguage();
  const params = useParams();
  const topicId = params.topicId as string;

  const [topic, setTopic] = useState<ForumTopic | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [newReplyText, setNewReplyText] = useState('');
  const [newReplyAuthor, setNewReplyAuthor] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const fetchTopic = useCallback(async () => {
    if (!topicId) return;
    setIsLoading(true);
    setError(null);
    try {
      const topicData = await getTopic(topicId);
      setTopic(topicData);
    } catch (err) {
      console.error(err);
      setError('Не удалось загрузить обсуждение. Пожалуйста, попробуйте еще раз.');
    } finally {
      setIsLoading(false);
    }
  }, [topicId]);

  useEffect(() => {
    fetchTopic();
  }, [fetchTopic]);

  const handleAddReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReplyText.trim() || !newReplyAuthor.trim()) {
      setSubmitStatus({ type: 'error', message: 'Пожалуйста, укажите ваше имя и комментарий.' });
      return;
    }
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      const newReply = await createReply(topicId, {
        author: newReplyAuthor,
        content: newReplyText,
      });
      // Optimistically update the UI
      setTopic(prevTopic => {
        if (!prevTopic) return null;
        const newReplies = { 
            ...(prevTopic.replies || {}), 
            [newReply.id]: { author: newReply.author, content: newReply.content, timestamp: newReply.timestamp }
        };
        return {
            ...prevTopic,
            replies: newReplies,
            repliesCount: (prevTopic.repliesCount || 0) + 1,
            lastActivity: newReply.timestamp,
        };
      });

      setNewReplyText('');
      setSubmitStatus({ type: 'success', message: 'Ваш ответ успешно добавлен!' });
    } catch (error) {
      console.error("Ошибка при добавлении ответа: ", error);
      setSubmitStatus({ type: 'error', message: 'Не удалось добавить ответ. Пожалуйста, попробуйте еще раз.' });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const repliesList: ForumReply[] = topic?.replies 
    ? Object.entries(topic.replies).map(([id, reply]) => ({ id, ...reply })).sort((a,b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()) 
    : [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin text-georgianRed" size={48} />
      </div>
    );
  }

  if (error) {
      return (
       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 text-center px-4 pt-20">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{error}</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-4">Эта тема может не существовать или возникла проблема с сетью.</p>
        <Link href="/forum" className="mt-8 px-6 py-3 bg-georgianRed text-white font-bold rounded-lg hover:bg-red-700 transition-colors">
          Назад на форум
        </Link>
      </div>
    );
  }

  if (!topic) {
    return (
       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 text-center px-4 pt-20">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Тема не найдена</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-4">Мы не смогли найти обсуждение, которое вы ищете.</p>
        <Link href="/forum" className="mt-8 px-6 py-3 bg-georgianRed text-white font-bold rounded-lg hover:bg-red-700 transition-colors">
          Назад на форум
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen pb-20 transition-colors duration-300 pt-20">
      <div className="container mx-auto px-4">
        
        <div className="mb-8">
          <Link href="/forum" className="flex items-center gap-2 text-georgianRed hover:underline font-bold mb-4">
            <ArrowLeft size={18} />
            Назад ко всем темам
          </Link>
          <h1 className="text-3xl lg:text-4xl font-black text-gray-900 dark:text-white">{topic.title}</h1>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-2 gap-4">
              <span className="flex items-center gap-2"><User size={14}/> Автор: {topic.author}</span>
              <span className="flex items-center gap-2"><Calendar size={14}/> {new Date(topic.lastActivity).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Original Post */}
        <div className="p-5 rounded-lg bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 mb-6">
            <div className="flex items-center justify-between mb-2">
                <p className="font-bold text-gray-800 dark:text-white flex items-center gap-2"><User size={16}/> {topic.author}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400"><Calendar size={12} className="inline mr-1"/>{topic.lastActivity ? new Date(topic.lastActivity).toLocaleString() : 'N/A'}</p>
            </div>
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{topic.content}</p>
        </div>


        {/* Replies Section */}
        <div className="space-y-6">
          {repliesList.map((reply) => (
            <div key={reply.id} className="p-5 rounded-lg bg-white dark:bg-gray-800">
              <div className="flex items-center justify-between mb-2">
                <p className="font-bold text-gray-800 dark:text-white flex items-center gap-2"><User size={16}/> {reply.author}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400"><Calendar size={12} className="inline mr-1"/>{new Date(reply.timestamp).toLocaleString()}</p>
              </div>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{reply.content}</p>
            </div>
          ))}
          {repliesList.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                Будьте первым, кто ответит!
            </div>
          )}
        </div>

        {/* Add Reply Form */}
        <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Присоединяйтесь к обсуждению</h3>
            <form onSubmit={handleAddReply} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                {submitStatus && (
                    <div 
                        className={`flex items-center gap-3 p-4 mb-4 rounded-lg ${submitStatus.type === 'success' ? 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200' : 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200'}`}
                    >
                        {submitStatus.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                        {submitStatus.message}
                    </div>
                )}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                 <div className="md:col-span-1">
                    <label htmlFor="replyAuthor" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Ваше имя</label>
                    <input 
                      type="text"
                      id="replyAuthor"
                      value={newReplyAuthor}
                      onChange={e => setNewReplyAuthor(e.target.value)}
                      placeholder="например, Георгий"
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-georgianRed dark:text-white"
                      required
                    />
                 </div>
              </div>
              <label htmlFor="replyText" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Ваш комментарий</label>
              <textarea
                id="replyText"
                value={newReplyText}
                onChange={e => setNewReplyText(e.target.value)}
                placeholder="Поделитесь своими мыслями..."
                rows={5}
                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-georgianRed dark:text-white"
                required
              ></textarea>
              <div className="text-right mt-4">
                 <button type="submit" disabled={isSubmitting} className="inline-flex items-center justify-center gap-2 bg-georgianRed text-white font-bold py-2 px-6 rounded-md hover:bg-red-700 transition-colors disabled:bg-gray-400">
                    {isSubmitting ? <><Loader2 className="animate-spin"/> Публикация...</> : <><Send size={16}/> Отправить ответ</>}
                </button>
              </div>
            </form>
        </div>

      </div>
    </div>
  );
}
