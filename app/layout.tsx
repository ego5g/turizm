import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Providers from './components/Providers';
import { Inter } from "next/font/google";
import "./globals.css";
// Импорт для использования компонента Image, если он нужен в Header/Footer
// import Image from 'next/image'; 

const inter = Inter({ subsets: ["latin", "cyrillic"] });

// 1. МАКСИМАЛЬНО РАСШИРЕННЫЕ МЕТАДАННЫЕ (DEFAULT: EN)
export const metadata = {
  // Title с сильными ключевыми словами и призывом к действию
  title: 'Turizm.ge | Your Ultimate Guide to Georgia: Tours, Culture & Caucasus Mountains',
  
  // Description, богатый ключевыми словами и подробно описывающий услуги
  description: 'Explore the majestic Caucasus mountains, ancient culture, wine regions, and hidden gems of Georgia. Book personalized tours and travel packages to Tbilisi, Batumi, Svaneti, and more. Your best travel partner in Georgia.',
  
  // 2. МНОГОЯЗЫЧНЫЕ КЛЮЧЕВЫЕ СЛОВА
  keywords: [
    // English
    'Georgia tours', 'travel to Georgia', 'Caucasus mountains', 'Tbilisi', 'Batumi', 'Svaneti', 'Georgian culture', 'wine tours', 'tourism agency Georgia', 'private tours', 'travel packages', 'adventure tourism', 'Gudauri', 'Kazbegi', 'Mtskheta',
    // Russian
    'туры в Грузию', 'отдых в Грузии', 'путешествие в Грузию', 'горы Кавказа', 'Тбилиси туры', 'Батуми отдых', 'Сванетия', 'грузинская кухня', 'винные туры', 'экскурсии в Грузии', 'частные туры', 'Гудаури', 'Казбеги',
    // Georgian (Картография)
    'საქართველოს ტურები', 'მოგზაურობა საქართველოში', 'კავკასიონის მთები', 'თბილისი', 'ბათუმი', 'სვანეთი', 'ქართული კულტურა', 'ღვინის ტურები', 'ტურისტული სააგენტო საქართველო',
  ],

  // Canonical URL (ОЧЕНЬ ВАЖНО)
  alternates: {
    canonical: 'https://www.turizm.ge', // Замените на реальный домен
  },

  // Иконки (для PWA и браузера)
  icons: {
    icon: '/favicon.ico', 
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },

  // Open Graph (OG)
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

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'Turizm.ge | Your Ultimate Guide to Georgia',
    description: 'Book your unforgettable journey to Tbilisi, Batumi, and Svaneti with Turizm.ge.',
    image: 'https://i.ibb.co/MD9TXLQF/turizm.webp',
  },
};

// 3. Схема LD+JSON для LocalBusiness/Organization
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
    // Добавьте другие социальные сети
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Устанавливаем язык на АНГЛИЙСКИЙ
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* LD+JSON СХЕМА */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJsonSchema) }}
        />
        
        {/* МАНИФЕСТ ДЛЯ PWA */}
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      
      <body className={`${inter.className} bg-white dark:bg-gray-900 transition-colors duration-300`}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Header /> 
            
            {/* Семантический тег MAIN */}
            <main className="flex-grow pt-16" role="main">
              {children}
            </main>
            
            {/* Footer теперь чист от прямого размещения контактов в RootLayout */}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}