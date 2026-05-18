import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, ChevronRight, Globe } from 'lucide-react';
import { COUNTRIES } from '../constants/config';
import { useLanguage } from '../hooks/useLanguage';

interface CountrySelectorProps {
  onSelect: (countryCode: string) => void;
}

export const CountrySelector: React.FC<CountrySelectorProps> = ({ onSelect }) => {
  const [search, setSearch] = useState('');
  const { t } = useLanguage();

  const filteredCountries = COUNTRIES.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="p-8 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-white/5 transition-colors">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{t('selectors.country_title')}</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-6 font-medium">{t('selectors.country_subtitle')}</p>
        
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-600 w-5 h-5" />
          <input
            type="text"
            placeholder={t('selectors.country_search')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-slate-100 dark:bg-white/5 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all font-medium outline-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar">
        {filteredCountries.map((country, index) => (
          <motion.button
            key={country.code}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onSelect(country.code)}
            className="w-full flex items-center justify-between p-5 bg-white dark:bg-white/5 rounded-2xl shadow-sm border border-slate-100 dark:border-white/5 active:scale-[0.98] transition-all text-left"
          >
            <div className="flex items-center gap-4">
              <span className="text-3xl leading-none">{country.flag}</span>
              <div>
                <p className="font-bold text-slate-900 dark:text-white">{country.name}</p>
                <p className="text-xs text-slate-400 dark:text-slate-600 font-mono tracking-wider">{country.code}</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-300 dark:text-slate-700" />
          </motion.button>
        ))}
        
        {filteredCountries.length === 0 && (
          <div className="text-center py-20">
            <Globe className="w-12 h-12 text-slate-200 dark:text-slate-800 mx-auto mb-4" />
            <p className="text-slate-400 dark:text-slate-600">Nenhum país encontrado</p>
          </div>
        )}
      </div>
    </div>
  );
};
