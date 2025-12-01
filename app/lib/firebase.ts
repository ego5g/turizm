// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase, ref, get, set, push, runTransaction, child } from "firebase/database";
import { ForumTopic, ForumReply } from '../types';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const database = getDatabase(app);

export const getTopics = async (): Promise<ForumTopic[]> => {
  const topicsRef = ref(database, 'topics');
  const snapshot = await get(topicsRef);
  if (snapshot.exists()) {
    const topicsData = snapshot.val();
    return Object.keys(topicsData).map(key => ({
        id: key,
        ...topicsData[key],
        repliesCount: topicsData[key].repliesCount || 0,
    }));
  } else {
    return [];
  }
};

export const getTopic = async (topicId: string): Promise<ForumTopic | null> => {
    const topicRef = ref(database, `topics/${topicId}`);
    const snapshot = await get(topicRef);
    if (snapshot.exists()) {
        const topicData = snapshot.val();
        return { id: snapshot.key, ...topicData };
    } else {
        return null;
    }
};

export const createTopic = async (topic: Omit<ForumTopic, 'id' | 'repliesCount' | 'views' | 'lastActivity' | 'replies'>) => {
    const topicsRef = ref(database, 'topics');
    const newTopicRef = push(topicsRef);
    const newTopicData = {
        ...topic,
        repliesCount: 0,
        views: 0,
        lastActivity: new Date().toISOString(),
    };
    await set(newTopicRef, newTopicData);
    return newTopicRef.key!;
};

export const createReply = async (topicId: string, reply: Omit<ForumReply, 'id' | 'timestamp'>): Promise<ForumReply> => {
    const topicRef = ref(database, `topics/${topicId}`);
    const newReplyRef = push(child(topicRef, 'replies')); // Generate a unique key for the new reply

    const newReply: ForumReply = {
        ...reply,
        id: newReplyRef.key!,
        timestamp: new Date().toISOString(),
    };

    // Use a transaction to atomically update the data
    await runTransaction(topicRef, (currentData) => {
        if (currentData) {
            // Initialize replies object if it doesn't exist
            if (!currentData.replies) {
                currentData.replies = {};
            }
            // Add the new reply
            currentData.replies[newReply.id] = {
                author: newReply.author,
                content: newReply.content,
                timestamp: newReply.timestamp,
            };

            // Increment repliesCount
            currentData.repliesCount = (currentData.repliesCount || 0) + 1;
            
            // Update last activity timestamp
            currentData.lastActivity = newReply.timestamp;
        }
        return currentData;
    });

    return newReply;
};

export { app, database };
