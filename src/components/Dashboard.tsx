import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Instagram, 
  Youtube, 
  TrendingUp, 
  ArrowRight,
  LogOut,
  Search,
  BookOpen,
  Sparkles,
  ShoppingBag,
  Ticket,
  CheckCircle2,
  Loader2,
  Zap,
  Moon,
  Sun,
  Share2,
  MoreVertical,
  User,
  Settings,
  Bell,
  Languages as LangIcon,
  Globe,
  Trash2
} from 'lucide-react';
import { CONTENT_BY_LANGUAGE } from '../constants/content';
import { NotificationCenter } from './NotificationCenter';
import { notificationService } from '../services/notificationService';
import { useToast } from './Toast';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../hooks/useLanguage';
import { useSettings, ResponseStyle, ThemeColor } from '../hooks/useSettings';

import { auth } from '../lib/firebase';

interface DashboardProps {
  onSelectSection: (sectionId: string) => void;
  onLogout: () => void;
  userName?: string;
}

const icons: Record<string, React.ReactNode> = {
  tiktok: <Play className="w-6 h-6 text-white" />,
  meta: <Instagram className="w-6 h-6 text-white" />,
  youtube: <Youtube className="w-6 h-6 text-white" />,
  marketing: <TrendingUp className="w-6 h-6 text-white" />,
};

const colors: Record<string, string> = {
  tiktok: 'bg-black',
  meta: 'bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600',
  youtube: 'bg-red-600',
  marketing: 'bg-blue-600',
};

export const Dashboard: React.FC<DashboardProps> = ({ onSelectSection, onLogout, userName }) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchResults, setSearchResults] = React.useState<any[]>([]);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [showMoreMenu, setShowMoreMenu] = React.useState(false);
  const { theme, toggleTheme } = useTheme();
  const { showToast } = useToast();
  const { settings, updateSettings } = useSettings();
  const { t, language } = useLanguage();
  const appContent = CONTENT_BY_LANGUAGE[language] || CONTENT_BY_LANGUAGE['pt'];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      showToast('Conteúdo atualizado!', 'success');
    }, 1000);
  };

  const getSnippet = (text: string, query: string, length = 80) => {
    const index = text.toLowerCase().indexOf(query.toLowerCase());
    if (index === -1) return text.substring(0, length) + (text.length > length ? '...' : '');
    
    const start = Math.max(0, index - length / 2);
    const end = Math.min(text.length, index + length / 2);
    let snippet = text.substring(start, end);
    
    if (start > 0) snippet = '...' + snippet;
    if (end < text.length) snippet = snippet + '...';
    
    return snippet;
  };

  React.useEffect(() => {
    if (searchQuery.length < 2) {
      setSearchResults([]);
      return;
    }

    const results: any[] = [];
    const query = searchQuery.toLowerCase().trim();
    const queryTerms = query.split(/\s+/).filter(t => t.length > 0);

    appContent.forEach(category => {
      // Check category title/description
      const catMatch = category.title.toLowerCase().includes(query) || 
                       category.description.toLowerCase().includes(query);
      
      if (catMatch) {
        results.push({
          type: 'category',
          id: category.id,
          categoryId: category.id,
          title: category.title,
          categoryTitle: 'Categoria',
          snippet: category.description,
          rank: 1 // High rank for category matches
        });
      }

      category.subsections.forEach(sub => {
        let matchFound = false;
        let snippet = '';
        let matchType: 'subsection' | 'topic' = 'subsection';

        // Check subsection title
        if (sub.title.toLowerCase().includes(query) || queryTerms.every(term => sub.title.toLowerCase().includes(term))) {
          matchFound = true;
          snippet = sub.title;
          matchType = 'subsection';
        }

        // Check content items
        sub.content.forEach(item => {
          if (typeof item === 'string') {
            if (item.toLowerCase().includes(query) || queryTerms.every(term => item.toLowerCase().includes(term))) {
              if (!matchFound) {
                matchFound = true;
                snippet = getSnippet(item, query);
                matchType = 'topic';
              }
            }
          } else {
            // It's an object { type, title, items, ... }
            const itemTitle = item.title || '';
            const itemText = (item.items || []).join(' ');
            
            const titleMatch = itemTitle.toLowerCase().includes(query) || (itemTitle && queryTerms.every(term => itemTitle.toLowerCase().includes(term)));
            const textMatch = itemText.toLowerCase().includes(query) || (itemText && queryTerms.every(term => itemText.toLowerCase().includes(term)));

            if (titleMatch || textMatch) {
              if (!matchFound || titleMatch) { // Prefer title matches
                matchFound = true;
                snippet = titleMatch ? itemTitle : getSnippet(itemText, query);
                matchType = 'topic';
              }
            }
          }
        });

        if (matchFound) {
          results.push({
            type: matchType,
            id: sub.id,
            categoryId: category.id,
            title: sub.title,
            categoryTitle: category.title,
            snippet: snippet || sub.title,
            rank: matchType === 'subsection' ? 2 : 3
          });
        }
      });
    });

    // Sort results by rank then title
    const sortedResults = results.sort((a, b) => {
      if (a.rank !== b.rank) return a.rank - b.rank;
      return a.title.localeCompare(b.title);
    });

    // Deduplicate by ID
    const uniqueResults = sortedResults.filter((v, i, a) => a.findIndex(t => t.id === v.id) === i);

    setSearchResults(uniqueResults);
  }, [searchQuery]);

  const highlightText = (text: string, query: string) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) => 
          part.toLowerCase() === query.toLowerCase() ? (
            <mark key={i} className="bg-yellow-200 dark:bg-yellow-400 text-slate-900 rounded-sm px-0.5">{part}</mark>
          ) : part
        )}
      </span>
    );
  };

  React.useEffect(() => {
    // Send a welcome notification after a short delay if it's a "fresh" session
    const hasBeenNotified = sessionStorage.getItem('welcome_notified');
    if (!hasBeenNotified) {
      setTimeout(() => {
        notificationService.sendNotification(
          '🔥 Conteúdo Novo Disponível!',
          'Confira as novas estratégias de Dropshipping que acabamos de adicionar à seção Marketing.',
          'dropshipping_detail'
        );
        sessionStorage.setItem('welcome_notified', 'true');
      }, 3000);
    }
  }, []);

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-transparent">
      {/* Header */}
      <div className="p-8 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-white/5 rounded-b-[40px] shadow-sm transition-colors duration-300">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-slate-400 dark:text-slate-500 font-bold text-xs uppercase tracking-widest mb-1">{t('dashboard.welcome')}</h2>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {userName || 'Investidor'}!
            </h1>
          </div>
          <div className="flex gap-2">
            <NotificationCenter />
            <div className="relative">
              <button 
                onClick={() => setShowMoreMenu(!showMoreMenu)}
                className="p-3 bg-slate-50 dark:bg-white/10 rounded-2xl text-slate-400 dark:text-slate-300 hover:text-blue-500 dark:hover:text-blue-400 transition-all active:scale-90"
              >
                <MoreVertical className="w-6 h-6" />
              </button>

              <AnimatePresence>
                {showMoreMenu && (
                  <>
                    <div 
                      className="fixed inset-0 z-40 bg-transparent" 
                      onClick={() => setShowMoreMenu(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 10 }}
                      className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-100 dark:border-white/10 z-50 overflow-hidden"
                    >
                      <div className="p-3 space-y-1">
                        <button 
                          onClick={() => {
                            handleRefresh();
                            setShowMoreMenu(false);
                          }}
                          className="w-full flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-white/5 rounded-2xl transition-colors text-left group"
                        >
                          <div className={`p-2 rounded-xl transition-colors ${isRefreshing ? 'bg-blue-600 text-white animate-spin' : 'bg-blue-500/10 text-blue-600 group-hover:bg-blue-600 group-hover:text-white'}`}>
                            <Zap className="w-4 h-4" />
                          </div>
                          <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{t('dashboard.more_menu.refresh')}</span>
                        </button>

                        <button 
                          onClick={() => {
                            toggleTheme();
                            setShowMoreMenu(false);
                          }}
                          className="w-full flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-white/5 rounded-2xl transition-colors text-left group"
                        >
                          <div className="p-2 bg-slate-500/10 text-slate-600 rounded-xl group-hover:bg-slate-900 dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-slate-900 transition-colors">
                            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                          </div>
                          <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                            {theme === 'light' ? t('dashboard.more_menu.theme_dark') : t('dashboard.more_menu.theme_light')}
                          </span>
                        </button>

                        <button 
                          onClick={() => {
                            if (navigator.share) {
                              navigator.share({
                                title: 'MoneyNet Ai',
                                text: 'Aprenda a dominar as redes sociais e ganhe dinheiro online!',
                                url: window.location.href
                              });
                            } else {
                              navigator.clipboard.writeText(window.location.href);
                              showToast('Link do app copiado!');
                            }
                            setShowMoreMenu(false);
                          }}
                          className="w-full flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-white/5 rounded-2xl transition-colors text-left group"
                        >
                          <div className="p-2 bg-green-500/10 text-green-600 rounded-xl group-hover:bg-green-600 group-hover:text-white transition-colors">
                            <Share2 className="w-4 h-4" />
                          </div>
                          <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{t('dashboard.more_menu.share')}</span>
                        </button>

                        <div className="h-px bg-slate-100 dark:bg-white/5 my-2" />

                        <button 
                          onClick={() => {
                            onSelectSection('change_country');
                            setShowMoreMenu(false);
                          }}
                          className="w-full flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-white/5 rounded-2xl transition-colors text-left group"
                        >
                          <div className="p-2 bg-orange-500/10 text-orange-600 rounded-xl group-hover:bg-orange-600 group-hover:text-white transition-colors">
                            <Globe className="w-4 h-4" />
                          </div>
                          <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{t('dashboard.more_menu.change_country')}</span>
                        </button>

                        <button 
                          onClick={() => {
                            onSelectSection('change_language');
                            setShowMoreMenu(false);
                          }}
                          className="w-full flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-white/5 rounded-2xl transition-colors text-left group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-indigo-500/10 text-indigo-600 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                              <LangIcon className="w-4 h-4" />
                            </div>
                            <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{t('dashboard.more_menu.change_language')}</span>
                          </div>
                          <span className="text-[10px] font-black uppercase text-slate-400 bg-slate-100 dark:bg-white/5 px-2 py-0.5 rounded-full">{language}</span>
                        </button>

                        <div className="h-px bg-slate-100 dark:bg-white/5 my-2" />
                        
                        {/* Response Style */}
                        <div className="px-3 py-2">
                          <p className="text-[10px] font-black uppercase text-slate-400 mb-2 ml-1">{t('dashboard.more_menu.response_style')}</p>
                          <div className="flex bg-slate-50 dark:bg-white/5 p-1 rounded-xl">
                            {(['detailed', 'concise'] as ResponseStyle[]).map((style) => (
                              <button
                                key={style}
                                onClick={() => updateSettings({ responseStyle: style })}
                                className={`flex-1 py-1.5 text-[10px] font-bold rounded-lg transition-all ${
                                  settings.responseStyle === style 
                                    ? 'bg-white dark:bg-slate-700 text-blue-600 border border-slate-100 dark:border-white/10 shadow-sm' 
                                    : 'text-slate-500'
                                }`}
                              >
                                {style === 'detailed' ? t('dashboard.more_menu.response_detailed') : t('dashboard.more_menu.response_concise')}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Theme Color */}
                        <div className="px-3 py-2">
                          <p className="text-[10px] font-black uppercase text-slate-400 mb-2 ml-1">{t('dashboard.more_menu.theme_color')}</p>
                          <div className="flex justify-between px-1">
                            {(['blue', 'green', 'purple', 'orange', 'rose'] as ThemeColor[]).map((color) => (
                              <button
                                key={color}
                                onClick={() => updateSettings({ themeColor: color })}
                                className={`w-6 h-6 rounded-full transition-all border-2 ${
                                  settings.themeColor === color ? 'border-slate-400 dark:border-white scale-125 shadow-lg' : 'border-transparent'
                                }`}
                                style={{ 
                                  backgroundColor: 
                                    color === 'blue' ? '#2563eb' : 
                                    color === 'green' ? '#16a34a' : 
                                    color === 'purple' ? '#9333ea' : 
                                    color === 'orange' ? '#ea580c' : '#e11d48' 
                                }}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Notifications Toggle */}
                        <button 
                          onClick={() => updateSettings({ notificationsEnabled: !settings.notificationsEnabled })}
                          className="w-full flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-white/5 rounded-2xl transition-colors text-left group"
                        >
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-xl transition-colors ${settings.notificationsEnabled ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                              <Bell className="w-4 h-4" />
                            </div>
                            <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{t('dashboard.more_menu.notifs_enabled')}</span>
                          </div>
                          <div className={`w-8 h-4 rounded-full relative transition-colors ${settings.notificationsEnabled ? 'bg-blue-600' : 'bg-slate-200'}`}>
                            <motion.div 
                              animate={{ x: settings.notificationsEnabled ? 16 : 2 }}
                              className="absolute top-1 w-2 h-2 bg-white rounded-full"
                            />
                          </div>
                        </button>

                        <div className="h-px bg-slate-100 dark:bg-white/5 my-2" />

                        <button 
                          onClick={async () => {
                            if (window.confirm('Deseja realmente limpar todo seu progresso?')) {
                              try {
                                await auth.signOut();
                              } catch (e) {}
                              localStorage.clear();
                              window.location.reload();
                            }
                          }}
                          className="w-full flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-white/5 rounded-2xl transition-colors text-left group"
                        >
                          <div className="p-2 bg-slate-500/10 text-slate-600 rounded-xl group-hover:bg-slate-600 group-hover:text-white transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </div>
                          <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{t('dashboard.more_menu.clear_cache')}</span>
                        </button>

                        <div className="h-px bg-slate-100 dark:bg-white/5 my-2" />

                        <button className="w-full flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-white/5 rounded-2xl transition-colors text-left group">
                          <div className="p-2 bg-blue-500/10 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            <User className="w-4 h-4" />
                          </div>
                          <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{t('dashboard.more_menu.profile')}</span>
                        </button>
                        
                        <button 
                          onClick={onLogout}
                          className="w-full flex items-center gap-3 p-3 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-2xl transition-colors text-left group"
                        >
                          <div className="p-2 bg-red-500/10 text-red-600 rounded-xl group-hover:bg-red-600 group-hover:text-white transition-colors">
                            <LogOut className="w-4 h-4" />
                          </div>
                          <span className="text-sm font-bold text-red-600">{t('dashboard.more_menu.logout')}</span>
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-600 w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('dashboard.search_placeholder')}
            className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-white/5 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all font-medium outline-none text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-600"
          />

          <AnimatePresence>
            {searchQuery.length >= 2 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute left-0 right-0 top-full mt-4 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-white/10 z-50 max-h-[400px] overflow-y-auto no-scrollbar"
              >
                <div className="p-4 border-b border-slate-50 dark:border-white/5 flex justify-between items-center">
                  <p className="text-xs font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest">
                    {searchResults.length} Resultados encontrados
                  </p>
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="text-xs font-bold text-blue-600 dark:text-blue-400"
                  >
                    Limpar
                  </button>
                </div>

                {searchResults.length === 0 ? (
                  <div className="p-10 text-center text-slate-400 dark:text-slate-600">
                    <p className="font-bold">Nenhum resultado para "{searchQuery}"</p>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-50 dark:divide-white/5">
                    {searchResults.map((result, idx) => (
                      <button
                        key={`${result.id}-${idx}`}
                        onClick={() => {
                          onSelectSection(result.id);
                          setSearchQuery('');
                        }}
                        className="w-full p-4 text-left hover:bg-slate-50 dark:hover:bg-white/5 transition-colors flex items-start gap-4 group"
                      >
                        <div className={`p-2 rounded-lg shrink-0 ${result.type === 'category' ? colors[result.id] : colors[result.categoryId]} shadow-sm`}>
                          {result.type === 'category' ? icons[result.id] : (icons[result.categoryId] || <Search className="w-4 h-4 text-white" />)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-0.5">
                            <p className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500">{result.categoryTitle}</p>
                            <span className="w-1 h-1 bg-slate-200 dark:bg-slate-700 rounded-full" />
                            <p className="text-[10px] font-black uppercase text-blue-500 dark:text-blue-400">
                              {result.type === 'category' ? 'Categoria' : 
                               result.type === 'subsection' ? 'Subseção' : 'Tópico'}
                            </p>
                          </div>
                          <h6 className="font-black text-slate-900 dark:text-white text-sm mb-1 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {highlightText(result.title, searchQuery)}
                          </h6>
                          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                            {highlightText(result.snippet, searchQuery)}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Scrollable Content Container */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {/* Featured Banner Section */}
        <div className="px-6 mt-6">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            onClick={() => onSelectSection('challenge')}
            className="w-full text-left bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-[40px] text-white shadow-2xl shadow-blue-500/20 relative overflow-hidden group cursor-pointer active:scale-[0.98] transition-all border border-white/10"
          >
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
                  <Zap className="w-5 h-5 text-yellow-300 fill-yellow-300" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-100">Roteiro Acelerado</span>
              </div>
              
              <h3 className="text-3xl font-black mb-3 leading-tight tracking-tight">
                Desafio <br/> 
                <span className="text-yellow-300">7 Dias</span>
              </h3>
              
              <p className="text-blue-100/80 text-sm mb-6 max-w-[200px] font-medium leading-relaxed">
                Siga nosso roteiro prático e comece a monetizar ainda esta semana.
              </p>
              
              <div className="flex items-center gap-3">
                <span className="bg-white text-blue-600 px-5 py-2.5 rounded-2xl font-black text-sm shadow-lg group-hover:bg-yellow-300 group-hover:text-black transition-all flex items-center gap-2">
                  Começar Roteiro
                  <ArrowRight className="w-4 h-4" />
                </span>
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-blue-600 bg-slate-200 overflow-hidden shadow-sm">
                      <img src={`https://i.pravatar.cc/100?u=${i + 10}`} alt="user" className="w-full h-full object-cover" />
                    </div>
                  ))}
                  <div className="w-8 h-8 rounded-full border-2 border-blue-600 bg-blue-500 flex items-center justify-center text-[10px] font-bold">
                    +1k
                  </div>
                </div>
              </div>
            </div>
            
            {/* Background elements */}
            <div className="absolute -right-12 -top-12 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700" />
            <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-blue-400/20 rounded-full blur-2xl" />
            <div className="absolute right-8 top-12 opacity-20 group-hover:opacity-40 transition-opacity">
              <CheckCircle2 className="w-32 h-32 text-white" />
            </div>
          </motion.button>
        </div>

        <div className="px-6 mt-6 space-y-4">
          {/* TikTok Trend Hunter Card */}
          <motion.button 
            whileHover={{ scale: 1.02 }}
            onClick={() => onSelectSection('tiktok_insights')}
            className="w-full bg-slate-900 dark:bg-white/5 p-6 rounded-[32px] text-white shadow-xl shadow-slate-200 dark:shadow-none relative overflow-hidden group cursor-pointer active:scale-[0.98] transition-all border border-slate-800 dark:border-white/10"
          >
            <div className="relative z-10 flex flex-col gap-4">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <div className="bg-pink-600 p-3 rounded-2xl shadow-lg shadow-pink-500/20 group-hover:rotate-12 transition-transform">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-black tracking-tight leading-none mb-1">TikTok Trend Hunter</h3>
                    <div className="flex items-center gap-2">
                       <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                       <p className="text-pink-400 text-[10px] font-black uppercase tracking-widest italic">Live Insights 2026</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-md">
                   <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">Explorar</p>
                </div>
              </div>

              {/* Trending Tags Preview */}
              <div className="flex gap-2 flex-wrap">
                {['#dropshipping', '#curioso', '#finanças', '#ia'].map(tag => (
                  <span key={tag} className="text-[9px] font-black uppercase tracking-widest bg-white/10 px-2 py-1 rounded-md text-slate-400 group-hover:text-white group-hover:bg-pink-600/30 transition-all">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-pink-600/10 to-blue-600/10 opacity-30 group-hover:opacity-60 transition-opacity" />
            <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl group-hover:bg-pink-500/20 transition-all" />
          </motion.button>

          {/* Em Alta Section */}
          <div className="pt-4 space-y-4">
            <div className="flex items-center justify-between px-2">
              <h4 className="text-slate-900 dark:text-white font-black text-lg">Em Alta</h4>
              <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 px-2 no-scrollbar -mx-2">
              {[
                { id: 'growth', title: 'Viralizar no TikTok', category: 'TikTok', color: 'from-pink-500 to-rose-500' },
                { id: 'youtube_seo', title: 'YouTube SEO Profissional', category: 'YouTube', color: 'from-red-600 to-orange-600' },
                { id: 'ads', title: 'Dominando Face Ads', category: 'Meta', color: 'from-blue-600 to-indigo-600' }
              ].map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ y: -5 }}
                  onClick={() => onSelectSection(item.id)}
                  className={`flex-shrink-0 w-48 bg-gradient-to-br ${item.color} p-5 rounded-[28px] text-white shadow-lg shadow-black/10 relative overflow-hidden group`}
                >
                  <div className="relative z-10">
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-1">{item.category}</p>
                    <h5 className="font-black text-sm leading-tight mb-4">{item.title}</h5>
                    <div className="bg-white/20 p-1.5 rounded-full inline-flex group-hover:translate-x-1 transition-transform">
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                  <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform" />
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Sections */}
        <div className="p-6 space-y-6 pb-40">
        <h4 className="text-slate-900 dark:text-white font-black text-lg px-2">Especialistas</h4>
        
        {/* AI Mentor Card */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          onClick={() => onSelectSection('mentor_ia')}
          className="w-full bg-slate-900 dark:bg-white/10 p-6 rounded-[32px] text-white flex items-center gap-5 shadow-xl shadow-slate-200 dark:shadow-none group active:scale-[0.98] transition-all border border-slate-800 dark:border-white/10"
        >
          <div className="p-4 bg-blue-600 rounded-2xl shadow-lg shadow-blue-500/20 group-hover:rotate-12 transition-transform">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1 text-left">
            <h5 className="font-black text-xl mb-1 flex items-center gap-2">
              Mentor IA
              <span className="bg-blue-600 font-bold text-[10px] px-2 py-0.5 rounded-full uppercase">Beta</span>
            </h5>
            <p className="text-slate-400 dark:text-slate-500 text-sm font-medium">Tire dúvidas, crie roteiros e estratégias com nossa IA.</p>
          </div>
          <div className="bg-white/10 p-2 rounded-full">
            <ArrowRight className="w-5 h-5 text-white" />
          </div>
        </motion.button>

        <h4 className="text-slate-900 dark:text-white font-black text-lg px-2 pt-4">Categorias</h4>
        <div className="grid grid-cols-1 gap-4">
          {appContent.map((section, index) => (
            <motion.button
              key={section.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onSelectSection(section.id)}
              className="w-full bg-white dark:bg-white/5 p-5 rounded-[28px] border border-slate-100 dark:border-white/10 shadow-sm flex items-center gap-5 active:scale-[0.98] transition-all hover:border-blue-200 dark:hover:border-blue-500/50 hover:shadow-md group text-left"
            >
              <div className={`p-4 rounded-2xl ${colors[section.id]} shadow-lg shadow-black/10 group-hover:scale-110 transition-transform`}>
                {icons[section.id]}
              </div>
              <div className="flex-1">
                <h5 className="font-bold text-slate-900 dark:text-white text-lg leading-tight mb-1">{section.title}</h5>
                <p className="text-slate-400 dark:text-slate-500 text-sm font-medium">{section.description}</p>
              </div>
              <div className="bg-slate-50 dark:bg-white/5 p-2 rounded-full text-slate-300 dark:text-white/20 group-hover:text-blue-500 group-hover:bg-blue-50 dark:group-hover:bg-blue-500/20 transition-colors">
                <ArrowRight className="w-5 h-5" />
              </div>
            </motion.button>
          ))}
        </div>

        {/* Ad Placeholder */}
        <div className="bg-white dark:bg-white/5 p-6 rounded-[28px] border-2 border-dashed border-slate-200 dark:border-white/10 text-center">
          <p className="text-xs font-bold text-slate-300 dark:text-slate-700 uppercase tracking-widest mb-2">Anúncio</p>
          <div className="h-24 bg-slate-50/50 dark:bg-white/5 rounded-2xl flex items-center justify-center">
             <p className="text-slate-400 dark:text-slate-600 text-sm">Monetize seu tempo</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};
