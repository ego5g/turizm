import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Providers from './components/Providers';
import { Inter } from "next/font/google";
import { Toaster } from 'react-hot-toast'; // 1. Импорт Toaster
import { AiPlannerProvider } from './contexts/AiPlannerContext'; // 2. Импорт провайдера
import "./globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata = {
  title: 'Turizm.ge | Your Ultimate Guide to Georgia: Tours, Culture & Caucasus Mountains',
  description: 'Explore the majestic Caucasus mountains, ancient culture, wine regions, and hidden gems of Georgia. Book personalized tours and travel packages to Tbilisi, Batumi, Svaneti, and more. Your best travel partner in Georgia.',
  keywords: [
    // Main Keys
    'Georgia tours', 'travel to Georgia', 'Caucasus mountains', 'Tbilisi', 'Batumi', 'Svaneti', 'Georgian culture', 'wine tours', 'tourism agency Georgia', 'private tours', 'travel packages', 'adventure tourism', 'Gudauri', 'Kazbegi', 'Mtskheta',
    // RU Main Keys
    'туры в Грузию', 'отдых в Грузии', 'путешествие в Грузию', 'горы Кавказа', 'Тбилиси туры', 'Батуми отдых', 'Сванетия', 'грузинская кухня', 'винные туры', 'экскурсии в Грузии', 'частные туры', 'Гудаури', 'Казбеги',
    // GE Main Keys
    'საქართველოს ტურები', 'მოგზაურობა საქართველოში', 'კავკასიონის მთები', 'თბილისი', 'ბათუმი', 'სვანეთი', 'ქართული კულტურა', 'ღვინის ტურები', 'ტურისტული სააგენტო საქართველო',
    // --- NEW FAQ / REAL USER QUERIES (From CSV) ---
    // Banking & Finance
    'opening bank account Georgia', 'TBC bank tariffs', 'Credo bank card', 'money transfer Russia Georgia', 'KoronaPay Georgia', 'exchange rate lari ruble', 'открытие счета в Грузии', 'карта Credo', 'переводы Золотая Корона', 'обмен валюты Тбилиси',
    // Living & Moving
    'visa run Georgia', 'living in Tbilisi', 'renting apartment Batumi', 'Didi Digomi district', 'buying property Georgia', 'визаран Грузия', 'аренда жилья Батуми', 'районы Тбилиси', 'ВНЖ Грузии',
    // Transport & Logistics
    'Tbilisi Batumi train', 'train tickets Georgia', 'Ozon delivery Georgia', 'driving in Georgia', 'traffic fines Georgia', 'поезд Тбилиси Батуми', 'доставка Озон Грузия', 'штрафы ГИБДД Грузия',
    // Connectivity
    'Magti sim card', 'mobile internet Georgia', 'roaming in Georgia', 'мобильная связь Грузия', 'сим карта для туриста'
  ],
  alternates: {
    canonical: 'https://www.turizm.ge',
  },
  icons: {
    icon: '/favicon.ico', 
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Turizm.ge | Your Ultimate Guide to Georgia: Tours, Culture & Caucasus Mountains',
    description: 'Explore the majestic Caucasus mountains, ancient culture, wine regions, and hidden gems of Georgia.',
    url: 'https://www.turizm.ge', 
    siteName: 'Turizm.ge',
    images: [
      {
        url: 'https://i.ibb.co/MD9TXLQF/turizm.webp', 
        width: 1200,
        height: 630,
        alt: 'Turizm.ge - Discover Georgia Travel',
      },
    ],
    locale: 'en_US', 
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Turizm.ge | Your Ultimate Guide to Georgia',
    description: 'Book your unforgettable journey to Tbilisi, Batumi, and Svaneti with Turizm.ge.',
    image: 'https://i.ibb.co/MD9TXLQF/turizm.webp',
  },
};

const ldJsonSchema = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "name": "Turizm.ge - Travel to Georgia",
  "legalName": "Turizm.ge",
  "url": "https://www.turizm.ge",
  "logo": "https://www.turizm.ge/logo.png",
  "image": "https://i.ibb.co/MD9TXLQF/turizm.webp",
  "description": "Premium travel agency offering bespoke tours and packages across Georgia, focusing on culture, nature, and adventure.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Chavchavadze Ave. 37", 
    "addressLocality": "Tbilisi",
    "addressRegion": "Tbilisi",
    "postalCode": "0179",
    "addressCountry": "GE"
  },
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+995-591-017-495",
      "contactType": "customer service"
    }
  ],
  "sameAs": [
    "https://t.me/tosendme",
    "https://wa.me/995591017945",
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJsonSchema) }}
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      
      <body className={`${inter.className} bg-white dark:bg-gray-900 transition-colors duration-300`}>
        <Providers>
          {/* 3. Оборачиваем все в AiPlannerProvider */}
          <AiPlannerProvider>
            <div className="flex flex-col min-h-screen">
              {/* 4. Toaster для уведомлений */}
              <Toaster position="bottom-right" toastOptions={{ duration: 5000 }} />
              
              <Header /> 
              
              <main className="flex-grow pt-16" role="main">
                {children}
              </main>
              
              <Footer />
            </div>
          </AiPlannerProvider>
        </Providers>
      </body>
    </html>
  );
}
