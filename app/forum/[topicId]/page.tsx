'use client';
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { database } from '../../lib/firebase';
import { ref, onValue, push, set } from 'firebase/database';
import { useLanguage } from '../../contexts/LanguageContext';
import Link from 'next/link';
import { ArrowLeft, User, Calendar, Send, Loader2 } from 'lucide-react';

interface Comment {
  id: string;
  author: string;
  text: string;
  createdAt: string;
}

interface Topic {
  id: string;
  title: string;
  author: string;
  createdAt: string;
  comments: Comment[];
}

export default function TopicPage() {
  const { t } = useLanguage();
  const params = useParams();
  const router = useRouter();
  const topicId = params.topicId as string;

  const [topic, setTopic] = useState<Topic | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [newCommentText, setNewCommentText] = useState('');
  const [newCommentAuthor, setNewCommentAuthor] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!topicId) return;

    const topicRef = ref(database, `topics/${topicId}`);
    const unsubscribe = onValue(topicRef, (snapshot) => {
      const topicData = snapshot.val();
      if (topicData) {
        const commentsData = topicData.comments || {};
        const commentsList: Comment[] = Object.keys(commentsData).map(key => ({
          id: key,
          ...commentsData[key],
        })).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()); // oldest first

        setTopic({ ...topicData, id: topicId, comments: commentsList });
      } else {
        setTopic(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [topicId]);

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim() || !newCommentAuthor.trim()) {
      alert('Please provide your name and a comment.');
      return;
    }
    setIsSubmitting(true);
    try {
      const commentsRef = ref(database, `topics/${topicId}/comments`);
      await push(commentsRef, {
        author: newCommentAuthor,
        text: newCommentText,
        createdAt: new Date().toISOString(),
      });
      setNewCommentText('');
      // Keep the author's name for convenience
    } catch (error) {
      console.error("Error adding comment: ", error);
      alert('Failed to add comment.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin text-georgianRed" size={48} />
      </div>
    );
  }

  if (!topic) {
    return (
       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 text-center px-4 pt-20">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Topic not found</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-4">We couldn't find the discussion you're looking for.</p>
        <Link href="/forum" className="mt-8 px-6 py-3 bg-georgianRed text-white font-bold rounded-lg hover:bg-red-700 transition-colors">
          Back to Forum
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen pb-20 transition-colors duration-300 pt-20">
      <div className="container mx-auto px-4">
        
        {/* Back Link and Header */}
        <div className="mb-8">
          <Link href="/forum" className="flex items-center gap-2 text-georgianRed hover:underline font-bold mb-4">
            <ArrowLeft size={18} />
            Back to All Topics
          </Link>
          <h1 className="text-3xl lg:text-4xl font-black text-gray-900 dark:text-white">{topic.title}</h1>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-2 gap-4">
              <span className="flex items-center gap-2"><User size={14}/> Started by {topic.author}</span>
              <span className="flex items-center gap-2"><Calendar size={14}/> {new Date(topic.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Comments Section */}
        <div className="space-y-6">
          {topic.comments.map((comment, index) => (
            <div key={comment.id} className={`p-5 rounded-lg ${index === 0 ? 'bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400' : 'bg-white dark:bg-gray-800'}`}>
              <div className="flex items-center justify-between mb-2">
                <p className="font-bold text-gray-800 dark:text-white flex items-center gap-2"><User size={16}/> {comment.author}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400"><Calendar size={12} className="inline mr-1"/>{new Date(comment.createdAt).toLocaleString()}</p>
              </div>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{comment.text}</p>
            </div>
          ))}
        </div>

        {/* Add Comment Form */}
        <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Join the Conversation</h3>
            <form onSubmit={handleAddComment} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                 <div className="md:col-span-1">
                    <label htmlFor="commentAuthor" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Name</label>
                    <input 
                      type="text"
                      id="commentAuthor"
                      value={newCommentAuthor}
                      onChange={e => setNewCommentAuthor(e.target.value)}
                      placeholder="e.g. Giorgi"
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-georgianRed dark:text-white"
                      required
                    />
                 </div>
              </div>
              <label htmlFor="commentText" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Comment</label>
              <textarea
                id="commentText"
                value={newCommentText}
                onChange={e => setNewCommentText(e.target.value)}
                placeholder="Share your thoughts..."
                rows={5}
                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-georgianRed dark:text-white"
                required
              ></textarea>
              <div className="text-right mt-4">
                 <button type="submit" disabled={isSubmitting} className="inline-flex items-center justify-center gap-2 bg-georgianRed text-white font-bold py-2 px-6 rounded-md hover:bg-red-700 transition-colors disabled:bg-gray-400">
                    {isSubmitting ? <><Loader2 className="animate-spin"/> Posting...</> : <><Send size={16}/> Post Comment</>}
                </button>
              </div>
            </form>
        </div>

      </div>
    </div>
  );
}