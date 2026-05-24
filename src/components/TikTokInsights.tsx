import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, 
  Search, 
  ArrowLeft, 
  Loader2, 
  Hash, 
  Sparkles, 
  Zap, 
  ChevronRight,
  TrendingUp as TrendingIcon,
  Clock,
  Trash2,
  Filter,
  Type,
  CheckCircle
} from 'lucide-react';
import { 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  serverTimestamp,
  doc,
  deleteDoc
} from 'firebase/firestore';
import { auth, db, handleFirestoreError, OperationType } from '../lib/firebase';
import { getTikTokInsights } from '../services/geminiService';

declare global {
  interface Window {
    aistudio?: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

interface Insight {
  id: string;
  niche: string;
  hashtags: string[];
  trends: { title: string; description: string }[];
  goldTip: string;
  summary: string;
  createdAt: any;
}

interface TikTokInsightsProps {
  onBack: () => void;
}

export const TikTokInsights: React.FC<TikTokInsightsProps> = ({ onBack }) => {
  const [niche, setNiche] = useState('');
  const [insights, setInsights] = useState<Insight[]>([]);
  const [searching, setSearching] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'date' | 'niche'>('date');
  const [hasApiKey, setHasApiKey] = useState(true);
  const [user, setUser] = useState<any>(() => {
    if (auth.currentUser) return auth.currentUser;
    const mockUserStr = localStorage.getItem('mock_user_session');
    if (mockUserStr) {
      try {
        return JSON.parse(mockUserStr);
      } catch {
        return null;
      }
    }
    return null;
  });

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((u) => {
      if (u) {
        setUser(u);
      } else {
        const mockUserStr = localStorage.getItem('mock_user_session');
        if (mockUserStr) {
          try {
            setUser(JSON.parse(mockUserStr));
          } catch {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      }
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!user) return;

    if (user.uid.startsWith('mock-')) {
      const stored = localStorage.getItem(`mock_tiktok_insights_${user.uid}`);
      if (stored) {
        try {
          setInsights(JSON.parse(stored));
        } catch {
          setInsights([]);
        }
      } else {
        setInsights([]);
      }
      return;
    }

    const q = query(
      collection(db, 'users', user.uid, 'tiktok_insights'),
      orderBy('createdAt', 'desc')
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const ins = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Insight[];
      setInsights(ins);
    }, (err) => handleFirestoreError(err, OperationType.LIST, `users/${user.uid}/tiktok_insights`));

    return () => unsub();
  }, [user]);

  // Persist mock insights to localStorage
  useEffect(() => {
    if (user && user.uid.startsWith('mock-') && insights.length > 0) {
      localStorage.setItem(`mock_tiktok_insights_${user.uid}`, JSON.stringify(insights));
    }
  }, [insights, user]);

  const filteredAndSortedInsights = insights
    .filter(ins => ins.niche.toLowerCase().includes(filterText.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'date') {
        const timeA = a.createdAt?.seconds || 0;
        const timeB = b.createdAt?.seconds || 0;
        return timeB - timeA;
      } else {
        return a.niche.localeCompare(b.niche);
      }
    });

  const handleSearch = async () => {
    if (!niche.trim() || !user || searching) return;

    setSearching(true);
    setError(null);

    try {
      const result = await getTikTokInsights(niche);
      
      if (!user.uid.startsWith('mock-')) {
        await addDoc(collection(db, 'users', user.uid, 'tiktok_insights'), {
          ...result,
          niche,
          createdAt: serverTimestamp()
        });
      } else {
        const newInsight: Insight = {
          id: 'mock-ins-' + Date.now(),
          ...result,
          niche,
          createdAt: { seconds: Date.now() / 1000 } as any
        };
        setInsights(prev => [newInsight, ...prev]);
      }

      setNiche('');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    } catch (err: any) {
      console.error(err);
      let msg = 'Erro ao buscar insights. Tente um nicho diferente.';
      
      const errorString = err.message?.toLowerCase() || '';
      
      if (errorString.includes('permission') || errorString.includes('403') || errorString.includes('not authorized')) {
        msg = 'Permissão negada. Use uma chave de API válida (Paid Billing).';
      } else if (errorString.includes('quota') || errorString.includes('429') || errorString.includes('exhausted')) {
        msg = 'Limite de uso da API atingido. Tente novamente mais tarde.';
      } else if (errorString.includes('invalid') || errorString.includes('401')) {
        msg = 'Chave de API inválida ou expirada.';
      } else if (errorString.includes('safety') || errorString.includes('blocked') || errorString.includes('content')) {
        msg = 'A análise deste nicho foi bloqueada pelos filtros de segurança da IA.';
      }
      
      setError(msg);
    } finally {
      setSearching(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!user) return;
    try {
      if (!user.uid.startsWith('mock-')) {
        await deleteDoc(doc(db, 'users', user.uid, 'tiktok_insights', id));
      } else {
        const updated = insights.filter(ins => ins.id !== id);
        setInsights(updated);
        localStorage.setItem(`mock_tiktok_insights_${user.uid}`, JSON.stringify(updated));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleOpenConfig = async () => {
    if (window.aistudio) {
      await window.aistudio.openSelectKey();
      setHasApiKey(true);
      setError(null);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-950 overflow-hidden transition-colors duration-300">
      {/* Header */}
      <div className="p-4 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-white/5 flex items-center gap-3 shadow-sm relative z-10 transition-colors">
        <button onClick={onBack} className="p-2 bg-slate-50 dark:bg-white/5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
          <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        </button>
        <div>
          <h1 className="font-bold text-slate-900 dark:text-white leading-tight">TikTok Search Insight</h1>
          <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest">IA Trend Tracker</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-32 no-scrollbar">
        {/* Search Input Card */}
        <div className="bg-slate-900 dark:bg-white/10 rounded-[32px] p-6 text-white shadow-2xl shadow-slate-200 dark:shadow-none relative overflow-hidden transition-colors">
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-white/10 p-2.5 rounded-2xl backdrop-blur-md">
                <TrendingUp className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="font-black text-xl">Descubra Trends</h3>
                <p className="text-slate-400 text-xs font-bold uppercase">Pesquise por Nicho</p>
              </div>
            </div>

            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
              <input
                type="text"
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Ex: Emagrecimento, Marketing, Jogos..."
                className="w-full bg-white/10 border border-white/10 rounded-2xl p-4 pl-12 text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-500"
              />
            </div>

            {(!hasApiKey || error?.includes('chave de API')) && (
              <div className="bg-amber-400/10 border border-amber-400/20 rounded-2xl p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-amber-500 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-amber-200">Configuração Necessária</p>
                    <p className="text-xs text-amber-400/80 leading-relaxed">
                      Para usar a análise de IA, você precisa conectar sua chave de API do Google.
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleOpenConfig}
                  className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 hover:scale-[1.02] text-slate-900 rounded-xl text-xs font-black transition-all active:scale-95 shadow-sm hover:shadow-md"
                >
                  Configurar Chave de API
                </button>
              </div>
            )}

            {error && !error.includes('chave de API') && (
              <p className="text-red-400 text-xs font-bold bg-red-400/10 p-3 rounded-xl border border-red-400/20 italic">
                {error}
              </p>
            )}

            <button
              onClick={handleSearch}
              disabled={!niche.trim() || searching}
              className={`w-full py-4 rounded-2xl font-black shadow-xl flex items-center justify-center gap-3 disabled:opacity-50 active:scale-[0.98] transition-all hover:scale-[1.01] ${
                showSuccess 
                  ? 'bg-green-500 hover:bg-green-400 text-white shadow-green-500/20' 
                  : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/20'
              }`}
            >
              {searching ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analisando TikTok...
                </>
              ) : showSuccess ? (
                <>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="bg-white/20 p-1 rounded-full"
                  >
                    <CheckCircle className="w-5 h-5 text-white" />
                  </motion.div>
                  Incrível! Insights Prontos
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5 fill-white" />
                  Buscar Insights
                </>
              )}
            </button>

            {insights.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-6 border-t border-white/10"
              >
                <div className="flex items-center justify-between mb-3 px-1">
                  <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Filtrar Salvos</p>
                  {filterText && (
                    <button 
                      onClick={() => setFilterText('')}
                      className="text-[10px] font-black uppercase text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Limpar
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                    placeholder="Filtrar seu histórico por nicho..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pl-12 text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-600 text-white"
                  />
                </div>
              </motion.div>
            )}
          </div>
          
          {/* Decorative gradients */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl -ml-32 -mb-32" />
        </div>

        {/* History / Results */}
        <div className="space-y-4">
          <div className="space-y-4 px-2">
            <div className="flex items-center justify-between">
              <h4 className="text-slate-900 dark:text-white font-black text-lg">Histórico de Análises</h4>
              {insights.length > 0 && (
                <div className="flex bg-white dark:bg-white/5 p-1 rounded-xl border border-slate-100 dark:border-white/10 shadow-sm transition-colors">
                  <button 
                    onClick={() => setSortBy('date')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${sortBy === 'date' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 dark:text-slate-600 hover:text-slate-600 dark:hover:text-slate-400'}`}
                  >
                    <Clock className={`w-3.5 h-3.5 ${sortBy === 'date' ? 'text-white' : 'text-slate-400 dark:text-slate-600'}`} />
                    <span className="text-[10px] font-black uppercase tracking-wider">Data</span>
                  </button>
                  <button 
                    onClick={() => setSortBy('niche')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${sortBy === 'niche' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 dark:text-slate-600 hover:text-slate-600 dark:hover:text-slate-400'}`}
                  >
                    <Type className={`w-3.5 h-3.5 ${sortBy === 'niche' ? 'text-white' : 'text-slate-400 dark:text-slate-600'}`} />
                    <span className="text-[10px] font-black uppercase tracking-wider">A-Z</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {insights.length === 0 && !searching && (
            <div className="bg-white dark:bg-white/5 border border-dashed border-slate-200 dark:border-white/10 rounded-[32px] p-12 text-center space-y-4 transition-colors">
              <div className="w-16 h-16 bg-slate-50 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto">
                <Search className="w-8 h-8 text-slate-200 dark:text-slate-800" />
              </div>
              <p className="text-slate-400 dark:text-slate-600 text-xs font-bold uppercase tracking-widest">Sua biblioteca está vazia</p>
            </div>
          )}

          <div className="space-y-6">
            <AnimatePresence>
              {filteredAndSortedInsights.map((ins) => (
                <motion.div
                  key={ins.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-100 dark:border-white/5 shadow-sm overflow-hidden transition-colors select-none"
                >
                  <div className="p-6 space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="bg-blue-600 dark:bg-blue-500 w-2 h-2 rounded-full animate-pulse" />
                        <h5 className="font-black text-slate-900 dark:text-white text-lg uppercase tracking-tight">
                          Nicho: {ins.niche}
                        </h5>
                      </div>
                      <button 
                        onClick={() => handleDelete(ins.id)}
                        className="p-2 text-slate-300 dark:text-slate-700 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium italic border-l-4 border-slate-100 dark:border-white/10 pl-4">
                      {ins.summary}
                    </p>

                    {/* Hashtags */}
                    <div className="space-y-2">
                      <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest flex items-center gap-2">
                        <Hash className="w-3 h-3" /> Hashtags em Alta
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {ins.hashtags.map((tag, i) => (
                          <span key={i} className="bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 px-3 py-1.5 rounded-full text-xs font-bold">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Trends */}
                    <div className="space-y-3">
                      <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest flex items-center gap-2">
                        <TrendingIcon className="w-3 h-3" /> Formatos Recomendados
                      </p>
                      <div className="grid grid-cols-1 gap-3">
                        {ins.trends.map((t, i) => (
                          <div key={i} className="bg-slate-50 dark:bg-white/5 p-4 rounded-2xl border border-slate-100 dark:border-white/5">
                            <h6 className="font-bold text-slate-900 dark:text-white text-sm mb-1">{t.title}</h6>
                            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{t.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Gold Tip */}
                    <div className="bg-amber-50 dark:bg-amber-950/20 p-5 rounded-2xl border border-amber-100 dark:border-amber-900/20 relative overflow-hidden group transition-colors">
                      <div className="relative z-10 flex items-start gap-4">
                        <div className="bg-amber-400 p-2 rounded-xl text-white shadow-lg shadow-amber-200 dark:shadow-none">
                          <Sparkles className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-amber-700 dark:text-amber-500 text-[10px] font-black uppercase tracking-widest mb-1">Dica de Ouro</p>
                          <p className="text-amber-900 dark:text-amber-200 text-xs font-bold leading-relaxed">{ins.goldTip}</p>
                        </div>
                      </div>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200/20 rounded-full blur-2xl -mr-16 -mt-16 group-hover:scale-150 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
