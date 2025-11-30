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
  content?: string; // Added content for detailed view
  replies: number;
  views: number;
  lastActivity: string;
  isPinned?: boolean;
}

export interface ForumCategory {
  id: string;
  name: string;
  key: string; // Key for translation
  description: string;
  icon: any;
}
