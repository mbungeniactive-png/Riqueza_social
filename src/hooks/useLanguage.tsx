import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { TRANSLATIONS, Language } from '../constants/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (path: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('app_language');
    return (saved as Language) || 'pt';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('app_language', lang);
  };

  const t = (path: string): string => {
    const keys = path.split('.');
    let result = TRANSLATIONS[language];
    
    for (const key of keys) {
      if (result && result[key]) {
        result = result[key];
      } else {
        // Fallback to Portuguese if not found
        let fallback = TRANSLATIONS['pt'];
        for (const fKey of keys) {
          if (fallback && fallback[fKey]) {
            fallback = fallback[fKey];
          } else {
            return path; // Return key if not found at all
          }
        }
        return fallback as unknown as string;
      }
    }
    
    return result as unknown as string;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
