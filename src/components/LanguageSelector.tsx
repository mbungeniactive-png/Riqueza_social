import React from 'react';
import { motion } from 'motion/react';
import { Check, Languages, ChevronRight } from 'lucide-react';
import { LANGUAGES } from '../constants/config';
import { useLanguage } from '../hooks/useLanguage';
import { Language } from '../constants/translations';

interface LanguageSelectorProps {
  onSelect: (langId: string) => void;
  selected?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ onSelect, selected }) => {
  const { setLanguage, t } = useLanguage();
  
  const handleSelect = (id: string) => {
    setLanguage(id as Language);
    onSelect(id);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="p-8 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-white/5 transition-colors">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{t('selectors.lang_title')}</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-6 font-medium">{t('selectors.lang_subtitle')}</p>
        
        <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-500/10 rounded-2xl border border-blue-100 dark:border-blue-500/20">
          <Languages className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <p className="text-sm font-semibold text-blue-800 dark:text-blue-300">{t('selectors.lang_soon')}</p>
        </div>
      </div>

      <div className="flex-1 p-4 space-y-3">
        {LANGUAGES.map((lang, index) => (
          <motion.button
            key={lang.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => handleSelect(lang.id)}
            className={`w-full flex items-center justify-between p-6 rounded-3xl transition-all border-2 active:scale-95 ${
              selected === lang.id 
                ? 'bg-blue-600 dark:bg-blue-500 border-blue-600 dark:border-blue-400 text-white shadow-xl shadow-blue-200 dark:shadow-none' 
                : 'bg-white dark:bg-white/5 border-slate-100 dark:border-white/5 text-slate-900 dark:text-white shadow-sm'
            }`}
          >
            <div>
              <p className="text-xl font-bold">{lang.nativeName}</p>
              <p className={`text-sm ${selected === lang.id ? 'text-blue-100' : 'text-slate-400 dark:text-slate-500'}`}>
                {lang.name}
              </p>
            </div>
            {selected === lang.id ? (
              <div className="bg-white/20 p-2 rounded-full">
                <Check className="w-6 h-6" />
              </div>
            ) : (
              <ChevronRight className="w-5 h-5 text-slate-300 dark:text-slate-700" />
            )}
          </motion.button>
        ))}
      </div>

      <div className="p-8">
        <button
          onClick={() => handleSelect(selected || 'pt')}
          className="w-full bg-slate-900 dark:bg-white dark:text-slate-900 text-white py-5 rounded-2xl font-bold shadow-2xl dark:shadow-none active:scale-95 transition-all disabled:opacity-50"
        >
          {t('selectors.lang_confirm')}
        </button>
      </div>
    </div>
  );
};
