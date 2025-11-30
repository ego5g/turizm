'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { Route } from '@/app/types';
import { Clock, MapPin, ArrowLeft, Wind, Mountain, Utensils, GlassWater, User, Sun, Sunset, Moon } from 'lucide-react';
import Link from 'next/link';

const ROUTES_DATA = [
  {
    id: '1',
    slug: 'tbilisi-old-town-walk',
    titleKey: 'tbilisiTitle',
    descKey: 'tbilisiDesc',
    region: 'Tbilisi',
    duration: '4 Hours',
    difficulty: 'Easy',
    image: 'https://loremflickr.com/1200/800/tbilisi,architecture/all?lock=1',
    itinerary: {
        morning: { key: 'tbilisiMorning', descKey: 'tbilisiMorningDesc' },
        afternoon: { key: 'tbilisiAfternoon', descKey: 'tbilisiAfternoonDesc' },
        evening: { key: 'tbilisiEvening', descKey: 'tbilisiEveningDesc' },
    },
    included: ['guide', 'water', 'cableCar'],
  },
  {
    id: '2',
    slug: 'kazbegi-gergeti-trinity',
    titleKey: 'kazbegiTitle',
    descKey: 'kazbegiDesc',
    region: 'Mtskheta-Mtianeti',
    duration: '1 Day',
    difficulty: 'Moderate',
    image: 'https://loremflickr.com/1200/800/kazbegi,mountain/all?lock=2',
    itinerary: {
        morning: { key: 'kazbegiMorning', descKey: 'kazbegiMorningDesc' },
        afternoon: { key: 'kazbegiAfternoon', descKey: 'kazbegiAfternoonDesc' },
        evening: { key: 'kazbegiEvening', descKey: 'kazbegiEveningDesc' },
    },
    included: ['transport', 'guide'],
  },
  {
      id: '3',
      slug: 'mestia-to-ushguli-trek',
      titleKey: 'svanetiTitle',
      descKey: 'svanetiDesc',
      region: 'Svaneti',
      duration: '4 Days',
      difficulty: 'Hard',
      image: 'https://loremflickr.com/1200/800/ushguli,svaneti/all?lock=3',
      itinerary: {
          morning: { key: 'svanetiMorning', descKey: 'svanetiMorningDesc' },
          afternoon: { key: 'svanetiAfternoon', descKey: 'svanetiAfternoonDesc' },
          evening: { key: 'svanetiEvening', descKey: 'svanetiEveningDesc' },
      },
      included: ['guide', 'transport'],
  },
   {
    id: '4',
    slug: 'kakheti-wine-tour',
    titleKey: 'kakhetiTitle',
    descKey: 'kakhetiDesc',
    region: 'Kakheti',
    duration: '2 Days',
    difficulty: 'Easy',
    image: 'https://loremflickr.com/1200/800/vineyard,georgia/all?lock=4',
    itinerary: {
        morning: { key: 'kakhetiMorning', descKey: 'kakhetiMorningDesc' },
        afternoon: { key: 'kakhetiAfternoon', descKey: 'kakhetiAfternoonDesc' },
        evening: { key: 'kakhetiEvening', descKey: 'kakhetiEveningDesc' },
    },
    included: ['transport', 'guide', 'wineTasting'],
  },
  {
      id: '5',
      slug: 'vardzia-cave-city',
      titleKey: 'vardziaTitle',
      descKey: 'vardziaDesc',
      region: 'Samtskhe-Javakheti',
      duration: '1 Day',
      difficulty: 'Moderate',
      image: 'https://loremflickr.com/1200/800/vardzia,caves/all?lock=5',
      itinerary: {
          morning: { key: 'vardziaMorning', descKey: 'vardziaMorningDesc' },
          afternoon: { key: 'vardziaAfternoon', descKey: 'vardziaAfternoonDesc' },
          evening: { key: 'vardziaEvening', descKey: 'vardziaEveningDesc' },
      },
      included: ['guide', 'transport'],
  },
  {
      id: '6',
      slug: 'tusheti-national-park',
      titleKey: 'tushetiTitle',
      descKey: 'tushetiDesc',
      region: 'Tusheti',
      duration: '3 Days',
      difficulty: 'Extreme',
      image: 'https://loremflickr.com/1200/800/tusheti,landscape/all?lock=6',
      itinerary: {
          morning: { key: 'tushetiMorning', descKey: 'tushetiMorningDesc' },
          afternoon: { key: 'tushetiAfternoon', descKey: 'tushetiAfternoonDesc' },
          evening: { key: 'tushetiEvening', descKey: 'tushetiEveningDesc' },
      },
      included: ['guide', 'transport'],
  }
];

const getRouteData = (slug: string) => {
  return ROUTES_DATA.find(r => r.slug === slug);
};

const IncludedItem = ({ icon, text }: { icon: React.ReactNode, text: string }) => (
    <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-800/50 p-3 rounded-lg">
        <div className="w-8 h-8 flex-shrink-0 bg-white dark:bg-gray-700 text-georgianRed rounded-full flex items-center justify-center shadow-sm">{icon}</div>
        <span className="font-medium text-gray-700 dark:text-gray-200 text-sm">{text}</span>
    </div>
);

export default function RouteDetailsPage() {
  const { t } = useLanguage();
  const params = useParams();
  const slug = params.slug as string;

  const routeData = getRouteData(slug);

  if (!routeData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 text-center px-4 pt-20">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{t.route.notFound}</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-4">{t.route.notFoundDesc}</p>
        <Link href="/routes" className="mt-8 px-6 py-3 bg-georgianRed text-white font-bold rounded-lg hover:bg-red-700 transition-colors">
          {t.route.backToRoutes}
        </Link>
      </div>
    );
  }
  
  const route = {
      ...routeData,
      title: t.routes[routeData.titleKey as keyof typeof t.routes],
      description: t.routes[routeData.descKey as keyof typeof t.routes],
  }

  const INCLUDED_MAP = {
      guide: { text: t.route.guide, icon: <User size={16}/> },
      transport: { text: t.route.transport, icon: <Wind size={16}/> },
      water: { text: t.route.water, icon: <GlassWater size={16}/> },
      wineTasting: { text: t.route.wineTasting, icon: <Utensils size={16}/> },
      cableCar: { text: t.route.cableCar, icon: <Mountain size={16}/> },
  }

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300 pt-16">
      <div className="relative h-[50vh] w-full">
        <img src={route.image} alt={route.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent"></div>
        <div className="absolute top-24 left-4 md:left-8">
            <Link href="/routes" className="flex items-center gap-2 text-white bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-black/50 transition-colors">
                <ArrowLeft size={16} />
                {t.route.allRoutes}
            </Link>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
          <div className="container mx-auto">
            <span className={`px-3 py-1 rounded-full text-sm font-bold text-white shadow-lg backdrop-blur-md mb-3 inline-block ${route.difficulty === 'Easy' ? 'bg-green-500/90' : route.difficulty === 'Moderate' ? 'bg-yellow-500/90' : route.difficulty === 'Hard' ? 'bg-orange-500/90' : 'bg-red-600/90'}`}>
              {route.difficulty}
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight shadow-2xl">{route.title}</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{t.route.about}</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              {route.description}
            </p>
            
            {route.itinerary && (
                <div className="mt-12">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t.route.plan}</h3>
                    <div className="space-y-8 border-l-2 border-gray-200 dark:border-gray-700 ml-3">
                        {Object.entries(route.itinerary).map(([key, value]) => (
                             <div key={key} className="pl-8 relative">
                                <div className={`absolute -left-3.5 top-1 w-6 h-6 rounded-full border-4 border-white dark:border-gray-900 flex items-center justify-center`}>
                                  {key === 'morning' && <Sun size={14} className="text-white"/>}
                                  {key === 'afternoon' && <Sunset size={14} className="text-white"/>}
                                  {key === 'evening' && <Moon size={14} className="text-white"/>}
                                </div>
                                <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{t.route[value.key as keyof typeof t.route]}</h4>
                                <p className="text-gray-500 dark:text-gray-400 mt-1">{t.route[value.descKey as keyof typeof t.route]}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

          </div>

          <aside className="lg:col-span-1">
            <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 sticky top-24">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Details</h3>
                <ul className="space-y-4 text-gray-600 dark:text-gray-300">
                    <li className="flex items-center gap-3"><MapPin className="text-georgianRed" size={20} /> <strong>Region:</strong> {route.region}</li>
                    <li className="flex items-center gap-3"><Clock className="text-georgianRed" size={20} /> <strong>Duration:</strong> {route.duration}</li>
                </ul>
                
                {route.included && route.included.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">{t.route.included}</h3>
                      <div className="grid grid-cols-2 gap-4">
                          {route.included.map(itemKey => {
                              const item = INCLUDED_MAP[itemKey as keyof typeof INCLUDED_MAP];
                              return item ? <IncludedItem key={itemKey} icon={item.icon} text={item.text} /> : null;
                          })}
                      </div>
                  </div>
                )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}