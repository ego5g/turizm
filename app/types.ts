export type Language = 'en' | 'ru' | 'ka';

export interface Route {
  id: string;
  slug: string;
  title: string;
  titleKey: string;
  description: string;
  descKey: string;
  image: string;
  duration: string;
  difficulty: 'Easy' | 'Moderate' | 'Hard' | 'Extreme';
  region: string;
}

export interface ForumTopic {
  id: string;
  title: string;
  author: string;
  category: string;
  content?: string; 
  repliesCount: number;
  views: number;
  lastActivity: string;
  isPinned?: boolean;
  replies?: { [key: string]: Omit<ForumReply, 'id'> };
}

export interface ForumReply {
  id: string;
  author: string;
  content: string;
  timestamp: string;
}

export interface ForumCategory {
  id: string;
  name: string;
  key: string; 
  description: string;
  icon: any;
}
