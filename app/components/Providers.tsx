'use client'

import { ThemeProvider } from '@/app/contexts/ThemeContext';
import { LanguageProvider } from '@/app/contexts/LanguageContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        {children}
      </LanguageProvider>
    </ThemeProvider>
  );
}
