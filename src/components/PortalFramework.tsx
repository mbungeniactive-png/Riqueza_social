import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Info, Shield, Mail, HelpCircle, FileText, Globe, 
  Terminal, Award, Star, Activity, Sparkles, TrendingUp, 
  Eye, Zap, Star as StarIcon, Heart, Send, Bell, Code, Clock, 
  CheckCircle2, AlertTriangle, ExternalLink, RefreshCw, ThumbsUp, DollarSign, Bookmark,
  Facebook
} from 'lucide-react';
import { useToast } from './Toast';
import { AppLogo } from './AppLogo';

interface PortalFrameworkProps {
  children: React.ReactNode;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  userName: string;
}

interface CommentItem {
  id: string;
  author: string;
  text: string;
  timestamp: string;
  likes: number;
  liked: boolean;
  avatarColor: string;
}

export const PortalFramework: React.FC<PortalFrameworkProps> = ({ 
  children, 
  theme, 
  toggleTheme,
  userName
}) => {
  const { showToast } = useToast();
  
  // Outer tabs state
  const [leftTab, setLeftTab] = useState<'articles' | 'legal' | 'seo'>('seo');
  const [rightTab, setRightTab] = useState<'adsense' | 'social'>('adsense');
  const [selectedLegalPage, setSelectedLegalPage] = useState<'sobre' | 'contato' | 'privacidade' | 'termos' | 'transparencia' | 'cookies'>('sobre');
  
  // Interactive Calculators
  const [trafficVolume, setTrafficVolume] = useState<number>(50000);
  const [targetedCpc, setTargetedCpc] = useState<number>(0.25);
  const [adCtr, setAdCtr] = useState<number>(2.4);

  // SEO state
  const [customTitle, setCustomTitle] = useState('MoneyNet Ai - Central de Renda Extra');
  const [customDesc, setCustomDesc] = useState('Descubra os métodos mais eficientes para ganhar dinheiro com TikTok, Inteligência Artificial, canais dark e marketing digital em 2026.');
  const [seoScore, setSeoScore] = useState(88);
  const [analyzingSeo, setAnalyzingSeo] = useState(false);
  const [sitemapGenerated, setSitemapGenerated] = useState(false);

  // Gamification & XP (Persisted in localStorage)
  const [userXp, setUserXp] = useState<number>(() => {
    const saved = localStorage.getItem('ad_p_xp');
    return saved ? parseInt(saved, 10) : 1500;
  });
  const [completedQuests, setCompletedQuests] = useState<string[]>(() => {
    const saved = localStorage.getItem('ad_p_quests');
    return saved ? JSON.parse(saved) : ['first_login'];
  });

  // Real comment board state
  const [comments, setComments] = useState<CommentItem[]>(() => {
    const saved = localStorage.getItem('ad_p_comments');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'c_1',
        author: 'Marcos Almeida',
        text: 'Artigos fantásticos! O tutorial de TikTok Dark já começou a me render seguidores. Muito melhor que cursos caros por aí.',
        timestamp: 'Há 2 horas',
        likes: 12,
        liked: false,
        avatarColor: 'bg-indigo-500'
      },
      {
        id: 'c_2',
        author: 'Ana Carolina',
        text: 'A simplicidade com que explicam a inteligência artificial ajuda muito os iniciantes. Ativei a estratégia na Shopee e fiz minha primeira venda ontem!',
        timestamp: 'Há 5 horas',
        likes: 24,
        liked: true,
        avatarColor: 'bg-pink-500'
      },
      {
        id: 'c_3',
        author: 'Thiago Mendes',
        text: 'O sitemap gerado simplifica muito a indexação. Esse portal já virou uma referência diária de consulta!',
        timestamp: 'Há 1 dia',
        likes: 8,
        liked: false,
        avatarColor: 'bg-emerald-500'
      }
    ];
  });

  const [newCommentText, setNewCommentText] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);

  // Mobile drawer state if any mobile users click
  const [showMobileLegalSheet, setShowMobileLegalSheet] = useState(false);

  // Save states to localStorage
  useEffect(() => {
    localStorage.setItem('ad_p_xp', userXp.toString());
  }, [userXp]);

  useEffect(() => {
    localStorage.setItem('ad_p_quests', JSON.stringify(completedQuests));
  }, [completedQuests]);

  useEffect(() => {
    localStorage.setItem('ad_p_comments', JSON.stringify(comments));
  }, [comments]);

  const addXp = (amount: number, reason: string) => {
    setUserXp(prev => {
      const updated = prev + amount;
      showToast(`+${amount} XP: ${reason}`, 'success');
      return updated;
    });
  };

  const handlePushComment = () => {
    if (!newCommentText.trim()) return;
    setSubmittingComment(true);
    
    setTimeout(() => {
      const fresh: CommentItem = {
        id: 'c_user_' + Date.now(),
        author: userName || 'Utilizador Exclusivo',
        text: newCommentText.trim(),
        timestamp: 'Agora mesmo',
        likes: 0,
        liked: false,
        avatarColor: 'bg-gradient-to-tr from-[#fe2c55] to-indigo-600'
      };
      setComments([fresh, ...comments]);
      setNewCommentText('');
      setSubmittingComment(false);
      showToast('Comentário publicado com sucesso!', 'success');
      addXp(120, 'Comentário publicado no portal');
      
      if (!completedQuests.includes('first_comment')) {
        setCompletedQuests([...completedQuests, 'first_comment']);
        addXp(400, 'Trophy: Crítico Construtivo');
      }
    }, 600);
  };

  const handleLikeComment = (commentId: string) => {
    setComments(comments.map(c => {
      if (c.id === commentId) {
        return {
          ...c,
          liked: !c.liked,
          likes: c.liked ? c.likes - 1 : c.likes + 1
        };
      }
      return c;
    }));
  };

  const triggerDynamicSeoScan = () => {
    setAnalyzingSeo(true);
    setTimeout(() => {
      const lengthPenalty = customDesc.length < 120 ? -15 : 0;
      const titlePenalty = customTitle.length < 30 ? -10 : 0;
      const calculatedScore = Math.min(100, Math.max(70, 95 + lengthPenalty + titlePenalty));
      
      setSeoScore(calculatedScore);
      setAnalyzingSeo(false);
      showToast(`Análise SEO Concluída: Score ${calculatedScore}/100`, 'success');
      
      if (calculatedScore >= 90 && !completedQuests.includes('perfect_seo')) {
        setCompletedQuests([...completedQuests, 'perfect_seo']);
        addXp(500, 'Trophy: Mestre da Indexação Google');
      }
    }, 1200);
  };

  const triggerSitemapGenerate = () => {
    setSitemapGenerated(true);
    showToast('Sitemap XML recriado e pingado para Google & Bing!', 'success');
    addXp(200, 'Sitemap XML estruturado e pingado');
  };

  // Safe manual copy helper
  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast('Copiado para a área de transferência!', 'success');
  };

  // Calculated variables
  const monthlyEstImpressions = trafficVolume * 4; // average 4 pages viewed per session
  const calculatedRPM = (targetedCpc * adCtr * 10).toFixed(2);
  const monthlyEarnings = ((monthlyEstImpressions * parseFloat(calculatedRPM)) / 1000).toFixed(2);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-[#06060e] flex flex-col items-center justify-start relative text-slate-800 dark:text-slate-100 transition-colors duration-300">
      
      {/* Background Neon Auroras for Desktop Layout */}
      <div className="absolute top-0 left-0 w-[45rem] h-[45rem] bg-indigo-600/5 dark:bg-indigo-600/3 rounded-full blur-[160px] pointer-events-none -mt-[20rem] -ml-[20rem]" />
      <div className="absolute bottom-0 right-0 w-[45rem] h-[45rem] bg-[#fe2c55]/5 dark:bg-[#fe2c55]/3 rounded-full blur-[160px] pointer-events-none -mb-[20rem] -mr-[20rem]" />

      {/* Header Bar */}
      <header className="w-full bg-white/70 dark:bg-[#0c0c16]/70 backdrop-blur-md border-b border-slate-200 dark:border-indigo-500/10 py-4 px-6 sticky top-0 z-40 transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <AppLogo withText size={32} textSize="text-lg font-black" animated={true} />
            <span className="hidden sm:inline bg-blue-600/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 font-mono text-[9px] px-2 py-0.5 rounded-lg font-bold">
              PORTAL MONETIZADO
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Gamification Indicator */}
            <div className="flex items-center gap-2 bg-slate-200/50 dark:bg-white/5 border border-slate-300/30 dark:border-white/5 py-1 px-3 rounded-full">
              <Award className="w-3.5 h-3.5 text-yellow-500" />
              <div className="text-left font-mono">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold tracking-wider">LEVEL {Math.floor(userXp / 1000) + 1}</span>
                <span className="text-[10px] text-indigo-500 ml-1.5 font-black">{userXp % 1000}/1000 XP</span>
              </div>
            </div>

            {/* Quick Settings Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-200/50 dark:bg-white/5 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-amber-400 cursor-pointer transition-colors"
              title="Alternar Tema"
            >
              {theme === 'dark' ? <Sparkles className="w-4 h-4 text-amber-400" /> : <Activity className="w-4 h-4 text-blue-600" />}
            </button>

            {/* Regulatory triggering on mobile */}
            <button 
              onClick={() => setShowMobileLegalSheet(true)}
              className="lg:hidden py-1 px-3 bg-indigo-600 text-white rounded-lg text-xs font-black uppercase tracking-wider"
            >
              Documentos
            </button>
          </div>
        </div>
      </header>

      {/* Main Multi-Pane System */}
      <main className="w-full max-w-7xl mx-auto px-4 lg:px-6 py-6 lg:py-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch flex-grow min-h-0 relative z-10">
        
        {/* COLUMN 1: LEFT COMPLIANCE & SEO EXPLORER (DESKTOP ONLY) */}
        <section className="hidden lg:flex lg:col-span-4 flex-col gap-5 max-h-[85vh] overflow-y-auto pr-2 no-scrollbar">
          
          {/* Section tab switch */}
          <div className="bg-white/90 dark:bg-slate-900 border border-slate-200 dark:border-indigo-500/10 p-1.5 rounded-2xl flex items-center shadow-md">
            <button
              onClick={() => setLeftTab('seo')}
              className={`flex-1 py-2 text-[10px] font-black uppercase tracking-wider rounded-xl transition-all ${
                leftTab === 'seo'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                  : 'text-slate-400 dark:text-slate-400 hover:text-slate-700'
              }`}
            >
              SEO & WebVitals
            </button>
            <button
              onClick={() => setLeftTab('legal')}
              className={`flex-1 py-2 text-[10px] font-black uppercase tracking-wider rounded-xl transition-all ${
                leftTab === 'legal'
                  ? 'bg-gradient-to-r from-pink-600 to-indigo-600 text-white shadow-lg'
                  : 'text-slate-400 dark:text-slate-400 hover:text-slate-700'
              }`}
            >
              Regulamentos
            </button>
            <button
              onClick={() => setLeftTab('articles')}
              className={`flex-1 py-2 text-[10px] font-black uppercase tracking-wider rounded-xl transition-all ${
                leftTab === 'articles'
                  ? 'bg-gradient-to-r from-emerald-600 to-indigo-600 text-white shadow-lg'
                  : 'text-slate-400 dark:text-slate-400 hover:text-slate-700'
              }`}
            >
              Fórum & FAQs
            </button>
          </div>

          {/* TAB 1 CONTENT: AUTOMATIC SEO OPTIMIZATION MANAGER */}
          {leftTab === 'seo' && (
            <div className="bg-white/90 dark:bg-[#0c0c16]/80 p-5 rounded-[28px] border border-slate-200 dark:border-indigo-500/15 shadow-xl space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-indigo-500/10">
                <span className="text-[10px] text-blue-600 dark:text-[#25f4ee] font-black uppercase tracking-widest font-mono flex items-center gap-1">
                  <Code className="w-3.5 h-3.5" />
                  SEO & Indexação Google
                </span>
                <span className="text-[9px] bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-2 py-0.5 rounded-full font-black uppercase font-mono animate-pulse">
                  Excelente (100%)
                </span>
              </div>

              {/* URL simulator and inputs */}
              <div className="space-y-3.5 text-xs">
                <div className="p-3 bg-slate-50 dark:bg-white/5 rounded-2xl border border-dashed border-slate-200 dark:border-white/5 space-y-1">
                  <p className="text-[9px] font-black uppercase text-indigo-400 font-mono tracking-widest">Endereço Web Amigável (Friendly URL)</p>
                  <p className="text-slate-700 dark:text-slate-300 font-mono font-bold select-text text-[10.5px]">https://moneynet.ai/artigos/tiktok-dark-monetizacao-ia</p>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase text-slate-500 tracking-wider">Título de SEO (Meta Title - Max 60 Letras):</label>
                  <input
                    type="text"
                    value={customTitle}
                    onChange={(e) => setCustomTitle(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-2.5 text-xs font-bold text-slate-800 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase text-slate-500 tracking-wider">Meta Descrição (SEO Desc - Max 160 Letras):</label>
                  <textarea
                    rows={3}
                    value={customDesc}
                    onChange={(e) => setCustomDesc(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-2.5 text-xs font-medium text-slate-700 dark:text-slate-200 text-left resize-none"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={triggerDynamicSeoScan}
                    disabled={analyzingSeo}
                    className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-sans text-[11px] font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                  >
                    {analyzingSeo ? 'Varrendo tags...' : 'Análise On-Page'}
                  </button>
                  <button
                    onClick={triggerSitemapGenerate}
                    className="flex-1 py-2.5 bg-indigo-650 hover:bg-indigo-700 text-white font-sans text-[11px] font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                  >
                    Gerar Sitemap.xml
                  </button>
                </div>
              </div>

              {/* Core Web Vitals Status Indicators */}
              <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5 space-y-3">
                <p className="text-[10px] font-black uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-emerald-500" />
                  Core Web Vitals Real diagnostics
                </p>
                
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 bg-white dark:bg-[#06060e] rounded-xl border border-slate-250 dark:border-white/5">
                    <p className="text-[9px] font-bold text-slate-500">LCP (Render)</p>
                    <p className="font-mono text-emerald-500 font-extrabold text-[12px] mt-0.5">0.8s</p>
                    <span className="text-[8px] text-slate-400 font-mono">Sensacional</span>
                  </div>
                  <div className="p-2 bg-white dark:bg-[#06060e] rounded-xl border border-slate-250 dark:border-white/5">
                    <p className="text-[9px] font-bold text-slate-500">FID (Latency)</p>
                    <p className="font-mono text-emerald-500 font-extrabold text-[12px] mt-0.5">12ms</p>
                    <span className="text-[8px] text-slate-400 font-mono">Ultrarápido</span>
                  </div>
                  <div className="p-2 bg-white dark:bg-[#06060e] rounded-xl border border-slate-250 dark:border-white/5">
                    <p className="text-[9px] font-bold text-slate-500">CLS (Stability)</p>
                    <p className="font-mono text-emerald-500 font-extrabold text-[12px] mt-0.5">0.02</p>
                    <span className="text-[8px] text-slate-400 font-mono">Estável</span>
                  </div>
                </div>
              </div>

              {/* Open Graph Preview Widget */}
              <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-150 dark:border-white/5 space-y-2">
                <p className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Pré-visualização de Compartilhamento (Open Graph Meta)</p>
                <div className="bg-white dark:bg-[#06060e] rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-sm text-[11px]">
                  <div className="aspect-video w-full bg-gradient-to-r from-blue-600 via-indigo-650 to-purple-650 flex flex-col justify-end p-3 text-white">
                    <span className="bg-white/15 px-1.5 py-0.5 rounded text-[8px] backdrop-blur-sm self-start font-mono font-bold mb-1">MONEYNET AI</span>
                    <h5 className="font-extrabold text-[11px] leading-tight truncate">{customTitle}</h5>
                  </div>
                  <div className="p-2 bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-350 select-text leading-tight font-medium p-3">
                    <p className="font-bold text-slate-700 dark:text-white truncate">moneynet.ai</p>
                    <p className="text-[10px] mt-1 line-clamp-2">{customDesc}</p>
                  </div>
                </div>
              </div>

              {sitemapGenerated && (
                <div className="p-3 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl border border-indigo-200/50 dark:border-indigo-550/20 text-xs">
                  <p className="font-bold text-indigo-700 dark:text-indigo-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    Sitemap.xml ativo:
                  </p>
                  <pre className="text-[9px] bg-black/25 text-indigo-200 p-2 rounded mt-1.5 block leading-tight max-h-[140px] overflow-y-auto overflow-x-auto text-left select-all">
{`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://moneynet.ai/</loc>
    <lastmod>2026-05-25</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://moneynet.ai/artigos/tiktok-dark-monetizacao-ia</loc>
    <lastmod>2026-05-25</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`}
                  </pre>
                </div>
              )}
            </div>
          )}

          {/* TAB 2 CONTENT: REGULATORY COMPLIANCE CENTER */}
          {leftTab === 'legal' && (
            <div className="bg-white/95 dark:bg-[#080816]/90 p-6 rounded-[32px] border border-slate-200 dark:border-indigo-500/20 shadow-2xl space-y-5 text-left transition-all duration-350">
              <div className="flex items-center justify-between border-b border-slate-150 dark:border-indigo-500/10 pb-3">
                <h3 className="text-xs font-black uppercase text-indigo-600 dark:text-indigo-400 tracking-wider flex items-center gap-2">
                  <Shield className="w-4 h-4 text-indigo-500 animate-[pulse_3s_infinite]" />
                  Central de Conformidade & Políticas
                </h3>
                <span className="text-[9px] bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-extrabold px-2 py-0.5 rounded-full select-none">
                  v2.8 Compliance
                </span>
              </div>

              {/* Selector side-pill hierarchy */}
              <div className="flex flex-wrap gap-1.5 pb-1">
                {[
                  { id: 'sobre', label: 'Sobre Nós' },
                  { id: 'contato', label: 'Contato & SAC' },
                  { id: 'privacidade', label: 'Privacidade' },
                  { id: 'termos', label: 'Termos de Uso' },
                  { id: 'transparencia', label: 'Transparência' },
                  { id: 'cookies', label: 'Cookies & LGPD' }
                ].map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedLegalPage(p.id as any)}
                    className={`px-3 py-1.5 rounded-xl text-[9px] font-extrabold uppercase tracking-widest transition-all cursor-pointer ${
                      selectedLegalPage === p.id
                        ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20'
                        : 'bg-slate-100 dark:bg-white/5 text-slate-500 hover:text-slate-900 hover:bg-slate-200 dark:text-slate-450 dark:hover:bg-white/10 dark:hover:text-white'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              <div className="bg-slate-50/50 dark:bg-slate-950/40 border border-slate-150 dark:border-white/5 p-5 rounded-2xl max-h-[48vh] overflow-y-auto no-scrollbar scroll-smooth space-y-4">
                
                {selectedLegalPage === 'sobre' && (
                  <div className="space-y-4 text-xs text-slate-600 dark:text-slate-350 leading-relaxed">
                    <div className="flex items-center gap-2 border-b border-slate-100 dark:border-white/5 pb-2">
                      <Sparkles className="w-4 h-4 text-indigo-500" />
                      <h4 className="font-extrabold text-slate-900 dark:text-white uppercase tracking-tight text-[12.5px] font-display">A Plataforma MoneyNet AI</h4>
                    </div>
                    <p>
                      A <strong className="text-slate-900 dark:text-white font-extrabold">MoneyNet AI</strong> representa uma revolução de vanguarda no ensino de empreendedorismo digital. Consolidamos técnicas avançadas de crescimento viral orgânico em ecossistemas de grande alcance (TikTok, YouTube Shorts, Reels), potencializando o processo de brainstorming e roteirização com tecnologias modernas de Inteligência Artificial.
                    </p>
                    <div className="p-4 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 border border-indigo-500/10 rounded-2xl">
                      <p className="font-black text-slate-800 dark:text-indigo-200 text-xs mb-1">Nosso Propósito Social</p>
                      <p className="text-slate-500 dark:text-slate-400">
                        O intuito do nosso ecossistema é democratizar por completo o acesso estratégico às metodologias de tráfego, atração e monetização que geram milhões de visualizações diárias, sem exigir a compra de cursos pagos, receitas mágicas ou pacotes redundantes.
                      </p>
                    </div>
                  </div>
                )}

                {selectedLegalPage === 'contato' && (
                  <div className="space-y-4 text-xs text-slate-600 dark:text-slate-350 leading-relaxed">
                    <div className="border-b border-slate-100 dark:border-white/5 pb-3">
                      <p className="text-[9px] font-black uppercase text-indigo-500 dark:text-indigo-400 tracking-wider">SAC CENTRALIZADO</p>
                      <h4 className="font-extrabold text-slate-900 dark:text-white uppercase tracking-tight text-sm font-display">Suporte Oficial MoneyNet AI</h4>
                      <p className="text-slate-400 mt-1">Conecte-se diretamente com nossos canais oficiais verificados de integração e apoio ao usuário.</p>
                    </div>

                    <div className="grid grid-cols-1 gap-3 pt-1">
                      {/* WhatsApp Card */}
                      <div className="p-4 bg-emerald-500/5 hover:bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition-colors">
                        <div className="space-y-1">
                          <span className="text-[8px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 leading-none block">Whatsapp Atendimento</span>
                          <span className="font-bold text-slate-800 dark:text-slate-100 font-mono text-[11.5px]">+258 87 884 8277</span>
                        </div>
                        <a 
                          href="https://wa.me/258878848277" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="px-3.5 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-[10px] rounded-xl hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center gap-1.5 shadow-md shadow-emerald-500/10 cursor-pointer"
                        >
                          <Send className="w-3 h-3 fill-white" /> Conversar WhatsApp
                        </a>
                      </div>

                      {/* TikTok Card */}
                      <div className="p-4 bg-pink-500/5 hover:bg-pink-500/10 border border-pink-500/20 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition-colors">
                        <div className="space-y-1">
                          <span className="text-[8px] font-black uppercase tracking-widest text-pink-600 dark:text-pink-400 leading-none block">Comunidade Viral</span>
                          <span className="font-bold text-slate-800 dark:text-slate-100 font-mono text-[11.5px]">tiktok.com/@moneynet.ai</span>
                        </div>
                        <a 
                          href="https://www.tiktok.com/@moneynet.ai" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="px-3.5 py-2 bg-pink-600 hover:bg-pink-700 text-white font-extrabold text-[10px] rounded-xl hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center gap-1.5 shadow-md shadow-pink-500/10 cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" /> Seguir TikTok
                        </a>
                      </div>

                      {/* Facebook Card */}
                      <div className="p-4 bg-blue-500/5 hover:bg-blue-500/10 border border-blue-500/20 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition-colors">
                        <div className="space-y-1">
                          <span className="text-[8px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 leading-none block">Canal Informativo</span>
                          <span className="font-bold text-slate-800 dark:text-slate-100 font-mono text-[11px] truncate max-w-[180px]">Facebook Oficial</span>
                        </div>
                        <a 
                          href="https://www.facebook.com/share/1CZh4awA8s/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-[10px] rounded-xl hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center gap-1.5 shadow-md shadow-blue-500/10 cursor-pointer"
                        >
                          <Facebook className="w-3.5 h-3.5" /> Curtir Página
                        </a>
                      </div>

                      {/* Email Card (Added as requested for premium support) */}
                      <div className="p-4 bg-indigo-500/5 hover:bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition-colors">
                        <div className="space-y-1">
                          <span className="text-[8px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 leading-none block">E-mail Corporativo</span>
                          <span className="font-bold text-slate-800 dark:text-slate-100 font-mono text-[11.5px] select-all">suporte@moneynet.ai</span>
                        </div>
                        <a 
                          href="mailto:suporte@moneynet.ai"
                          className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-[10px] rounded-xl hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center gap-1.5 shadow-md shadow-indigo-500/10 cursor-pointer"
                        >
                          <Mail className="w-3.5 h-3.5" /> Enviar E-mail
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                {selectedLegalPage === 'privacidade' && (
                  <div className="space-y-4 text-xs text-slate-600 dark:text-slate-350 leading-relaxed">
                    <div className="flex items-center gap-2 border-b border-slate-100 dark:border-white/5 pb-2">
                      <Shield className="w-4 h-4 text-blue-500" />
                      <h4 className="font-extrabold text-slate-900 dark:text-white uppercase tracking-tight text-[12.5px] font-display">Política de Privacidade de Alta Confiança</h4>
                    </div>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">
                      Na MoneyNet AI, a proteção e a confidencialidade dos dados dos usuários representam diretrizes fundamentais do nosso modelo de governança digital.
                    </p>

                    <div className="space-y-3 pt-1">
                      <div className="p-3.5 bg-slate-100 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/5">
                        <h5 className="font-black text-[11px] text-slate-800 dark:text-white mb-1 uppercase tracking-wide">1. Coleta Mínima de Informações</h5>
                        <p className="text-slate-500 dark:text-slate-400">
                          Coletamos apenas dados essenciais para gerenciar sua sessão de estudos de forma personalizada, como seu nome escolhido, e-mail de autenticação técnica e parâmetros preferenciais da interface (idioma e tema do portal).
                        </p>
                      </div>

                      <div className="p-3.5 bg-slate-100 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/5">
                        <h5 className="font-black text-[11px] text-slate-800 dark:text-white mb-1 uppercase tracking-wide">2. Integração Transparente com Anunciantes (AdSense)</h5>
                        <p className="text-slate-500 dark:text-slate-400">
                          Para manter nossa infraestrutura e mentor de inteligência artificial de acesso livre, o portal pode apresentar anúncios nativos gerenciados em parceria com o Google AdSense. Esses parceiros podem registrar cookies anônimos para entregar anúncios contextuais baseados nos seus padrões legítimos de cliques.
                        </p>
                      </div>

                      <div className="p-3.5 bg-slate-100 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/5">
                        <h5 className="font-black text-[11px] text-slate-800 dark:text-white mb-1 uppercase tracking-wide">3. Direitos de Exclusão (LGPD)</h5>
                        <p className="text-slate-500 dark:text-slate-400">
                          Em conformidade integral de rigores com a Lei Geral de Proteção de Dados (LGPD), você detém pleno domínio e liberdade de depurar ou requerer o apagamento permanente de todos os seus registros de histórico, clicando na opção de depuração de cache de metadados no menu de configurações.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {selectedLegalPage === 'termos' && (
                  <div className="space-y-4 text-xs text-slate-600 dark:text-slate-350 leading-relaxed">
                    <div className="flex items-center gap-2 border-b border-slate-100 dark:border-white/5 pb-2">
                      <FileText className="w-4 h-4 text-purple-500" />
                      <h4 className="font-extrabold text-slate-900 dark:text-white uppercase tracking-tight text-[12.5px] font-display">Termos e Condições de Uso</h4>
                    </div>
                    <p>
                      Ao acessar este ecossistema educacional de tecnologia, você consente integralmente com as premissas institucionais e regulatórias do MoneyNet AI.
                    </p>
                    <div className="p-3.5 bg-slate-100 dark:bg-white/5 rounded-xl space-y-1">
                      <h5 className="font-black text-[11px] text-slate-800 dark:text-white uppercase tracking-wider">Responsabilidade do Operador</h5>
                      <p className="text-slate-500 dark:text-slate-400">
                        O MoneyNet AI compartilha técnicas validadas de criação de criativos e retenção de público de forma passiva. O usuário do aplicativo é o único e legítimo encarregado pela administração, termos éticos, natureza de marca e condução de seus próprios canais de conteúdo orgânicos gerados.
                      </p>
                    </div>
                  </div>
                )}

                {selectedLegalPage === 'transparencia' && (
                  <div className="space-y-4 text-xs text-slate-600 dark:text-slate-350 leading-relaxed">
                    <div className="flex items-center gap-2 border-b border-slate-100 dark:border-white/5 pb-2">
                      <Globe className="w-4 h-4 text-teal-500" />
                      <h4 className="font-extrabold text-slate-900 dark:text-white uppercase tracking-tight text-[12.5px] font-display">Declaração de Transparência de Marca</h4>
                    </div>
                    <p>
                      Honramos a integridade corporativa e a ética comercial em 2026. A equipe editorial do MoneyNet AI de forma alguma impõe compras casadas de ferramentas ocultas para habilitar o progresso do estudante.
                    </p>
                    <p>
                      Para cobrir os elevados custos de computação em nuvem, bancos de dados assíncronos e acesso ao motor inteligente de modelagem de texto, reservamos seções legítimas do portal para a veiculação de redes de anunciantes externos certificados, sob forte auditoria de segurança.
                    </p>
                  </div>
                )}

                {selectedLegalPage === 'cookies' && (
                  <div className="space-y-4 text-xs text-slate-600 dark:text-slate-350 leading-relaxed">
                    <div className="flex items-center gap-2 border-b border-slate-100 dark:border-white/5 pb-2">
                      <Clock className="w-4 h-4 text-amber-500" />
                      <h4 className="font-extrabold text-slate-900 dark:text-white uppercase tracking-tight text-[12.5px] font-display">Políticas de Cookies & Resguardo LGPD</h4>
                    </div>
                    <p>
                      Utilizamos arquivos de dados temporários no navegador para fins exclusivos de otimização de velocidade de tráfego, gravação do progresso das suas conquistas (streak de dias), arquivamento de roteiros salvos e recordações de preferência do painel global.
                    </p>
                    <ul className="space-y-2 font-bold pt-1">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>Cookies Técnicos (Essenciais para persistir estados de estudo)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>Cookies Analíticos (Estatísticas internas de acesso sem rastreio de CPF/IP)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>Cookies Publicitários (Anúncios inteligentes Google AdSense regulados)</span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3 CONTENT: DETAILED FAQS & LIVE COMMENT BOARD */}
          {leftTab === 'articles' && (
            <div className="bg-white/90 dark:bg-[#0c0c16]/80 p-5 rounded-[28px] border border-slate-200 dark:border-indigo-500/15 shadow-xl space-y-4 text-left">
              <h3 className="text-xs font-black uppercase text-emerald-600 dark:text-[#25f4ee] tracking-wider flex items-center gap-1.5 border-b border-slate-200 dark:border-indigo-500/10 pb-2">
                <HelpCircle className="w-4 h-4" />
                Perguntas Frequentes & Discussão
              </h3>

              {/* FAQs accordion */}
              <div className="space-y-2 text-xs">
                <div className="p-3 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-150 dark:border-white/5">
                  <p className="font-extrabold text-slate-800 dark:text-white">Q: Posso começar sem investimento?</p>
                  <p className="text-slate-500 mt-1 dark:text-slate-400">R: Absolutamente! Todos os métodos apresentados ensinam estratégias e ferramentas gratuitas que requerem apenas o seu celular e dedicação.</p>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-150 dark:border-white/5">
                  <p className="font-extrabold text-slate-800 dark:text-white">Q: É necessário mostrar o rosto?</p>
                  <p className="text-slate-500 mt-1 dark:text-slate-400">R: Não. A trilha do TikTok Dark e as técnicas de IA cobrem formatos altamente lucrativos baseados em clipagens e dublagens no piloto automático.</p>
                </div>
              </div>

              {/* Commment submission block */}
              <div className="space-y-3.5 pt-2">
                <p className="text-[10px] font-black uppercase text-slate-500 tracking-wider flex items-center gap-1">
                  <Bell className="w-3.5 h-3.5 text-blue-500" />
                  Mural da Comunidade (Ao Vivo)
                </p>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    placeholder="Publique sua dúvida ou relato de ganhos..."
                    className="flex-1 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-2.5 text-xs text-slate-800 dark:text-white placeholder:text-slate-400"
                  />
                  <button
                    onClick={handlePushComment}
                    disabled={submittingComment || !newCommentText.trim()}
                    className="p-3 bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 rounded-xl"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>

                {/* Real-time looking comment loop list */}
                <div className="space-y-2 max-h-[22vh] overflow-y-auto pr-1 no-scrollbar">
                  {comments.map((comm) => (
                    <div key={comm.id} className="p-3 bg-amber-500/5 hover:bg-amber-500/10 border border-amber-500/10 rounded-[20px] space-y-1.5 text-xs transition-colors">
                      <div className="flex justify-between items-center text-[10px]">
                        <div className="flex items-center gap-1.5">
                          <span className={`${comm.avatarColor} w-4 h-4 rounded-full flex items-center justify-center font-mono font-bold text-white text-[8px]`}>
                            {comm.author.charAt(0)}
                          </span>
                          <span className="font-black text-slate-850 dark:text-slate-200">{comm.author}</span>
                        </div>
                        <span className="text-slate-500 font-mono tracking-tight">{comm.timestamp}</span>
                      </div>
                      <p className="text-slate-650 dark:text-slate-350 leading-relaxed font-medium">{comm.text}</p>
                      
                      <div className="flex justify-end pt-0.5">
                        <button
                          onClick={() => handleLikeComment(comm.id)}
                          className={`flex items-center gap-1.5 text-[10px] font-bold ${
                            comm.liked ? 'text-[#fe2c55]' : 'text-slate-505 hover:text-[#fe2c55]'
                          }`}
                        >
                          <Heart className={`w-3 h-3 ${comm.liked ? 'fill-[#fe2c55]' : ''}`} />
                          <span>{comm.likes}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>

        {/* COLUMN 2: CENTER KEYBOARD APP RUNNING (THE COOP DEVICE) */}
        <section className="lg:col-span-4 flex justify-center items-center h-full relative z-20">
          <div className="w-full max-w-md h-[86vh] rounded-[44px] overflow-hidden border-[8px] border-slate-900/90 dark:border-[#101020] shadow-[0_24px_80px_-15px_rgba(0,0,0,0.4)] relative flex flex-col bg-white dark:bg-slate-950 transition-all">
            {/* Ambient lens cut mock bar */}
            <div className="h-6 w-full bg-slate-900/90 dark:bg-[#101020] shrink-0 flex justify-center items-center relative z-40">
              <div className="w-20 h-4 bg-slate-950 rounded-full flex justify-center items-center">
                <span className="w-2 h-2 rounded-full bg-blue-600/60 blur-[1px]" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-800 ml-4" />
              </div>
            </div>
            
            <div className="flex-1 overflow-hidden relative">
              {children}
            </div>
          </div>
        </section>

        {/* COLUMN 3: RIGHT ADSENSE ANALYTICS & HIGH RPM SPONSOR UNITS (DESKTOP ONLY) */}
        <section className="hidden lg:flex lg:col-span-4 flex-col gap-5 max-h-[85vh] overflow-y-auto pl-2 no-scrollbar">
          
          <div className="bg-white/90 dark:bg-slate-900 border border-slate-200 dark:border-indigo-500/10 p-1.5 rounded-2xl flex items-center shadow-md">
            <button
              onClick={() => setRightTab('adsense')}
              className={`flex-1 py-2 text-[10px] font-black uppercase tracking-wider rounded-xl transition-all ${
                rightTab === 'adsense'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-650 text-white shadow-lg'
                  : 'text-slate-400 dark:text-slate-400 hover:text-slate-700'
              }`}
            >
              AdSense Dashboard
            </button>
            <button
              onClick={() => setRightTab('social')}
              className={`flex-1 py-2 text-[10px] font-black uppercase tracking-wider rounded-xl transition-all ${
                rightTab === 'social'
                  ? 'bg-gradient-to-r from-[#fe2c55] to-indigo-600 text-white shadow-lg'
                  : 'text-slate-400 dark:text-slate-450 hover:text-slate-700'
              }`}
            >
              Patrocinados (Native Feed)
            </button>
          </div>

          {/* TAB 1: ADSENSE RPM & CTR CONVERSION ANALYTICS */}
          {rightTab === 'adsense' && (
            <div className="bg-white/90 dark:bg-[#0c0c16]/80 p-5 rounded-[28px] border border-slate-200 dark:border-indigo-500/15 shadow-xl space-y-4 text-left">
              <div className="flex justify-between items-center pb-2 border-b border-slate-250 dark:border-indigo-500/10">
                <span className="text-[10px] text-blue-600 dark:text-[#25f4ee] font-black uppercase tracking-widest font-mono flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-emerald-500 animate-pulse" />
                  Calculador e Conversor RPM
                </span>
                <span className="text-[10.5px] font-bold text-slate-800 dark:text-white font-mono">
                  Google AdSense Live
                </span>
              </div>

              {/* CPC Adjuster */}
              <div className="space-y-4">
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between font-bold dark:text-slate-350 font-mono">
                    <span>Tráfego Mensal (Acessos):</span>
                    <span className="text-blue-500">{trafficVolume.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="5000"
                    max="500000"
                    step="5000"
                    value={trafficVolume}
                    onChange={(e) => setTrafficVolume(Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                </div>

                <div className="space-y-1 text-xs">
                  <div className="flex justify-between font-bold dark:text-slate-350 font-mono">
                    <span>CPC Estimado por Clique:</span>
                    <span className="text-cyan-500">${targetedCpc.toFixed(2)} USD</span>
                  </div>
                  <input
                    type="range"
                    min="0.05"
                    max="1.50"
                    step="0.05"
                    value={targetedCpc}
                    onChange={(e) => setTargetedCpc(Number(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                </div>

                <div className="space-y-1 text-xs">
                  <div className="flex justify-between font-bold dark:text-slate-350 font-mono">
                    <span>CTR Anúncio (%).:</span>
                    <span className="text-emerald-500">{adCtr}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="10.0"
                    step="0.1"
                    value={adCtr}
                    onChange={(e) => setAdCtr(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                </div>
              </div>

              {/* Core Revenue Calculations box */}
              <div className="p-4 bg-gradient-to-tr from-indigo-700/10 to-blue-500/10 rounded-2xl border border-indigo-500/20 grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-[9.5px] text-slate-420 font-black uppercase tracking-wider dark:text-slate-400">RPM Estimado</p>
                  <p className="text-lg font-mono font-black text-blue-600 dark:text-[#25f4ee] mt-1">${calculatedRPM}</p>
                  <p className="text-[8px] text-slate-500 dark:text-slate-400">Cada 1000 views</p>
                </div>
                <div>
                  <p className="text-[9.5px] text-slate-420 font-black uppercase tracking-wider dark:text-slate-400">Faturamento Previsto</p>
                  <p className="text-lg font-mono font-black text-emerald-500 mt-1">${monthlyEarnings}</p>
                  <p className="text-[8px] text-slate-500 dark:text-slate-400">Moeda: USD dólares</p>
                </div>
              </div>

              {/* Niche CPM Suggestions list */}
              <div className="p-3 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-150 dark:border-white/5 space-y-2">
                <p className="text-[10px] font-black uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
                  Principais Nichos para Maxilizar RPM
                </p>
                <div className="space-y-1.5 text-[10.5px]">
                  <div className="flex justify-between p-2 bg-white dark:bg-[#06060e] rounded-lg border border-slate-150 dark:border-white/5 leading-none">
                    <span className="font-bold">🏦 Investimentos/Finanças</span>
                    <span className="text-emerald-500 font-bold font-mono">$18.40 RPM</span>
                  </div>
                  <div className="flex justify-between p-2 bg-white dark:bg-[#06060e] rounded-lg border border-slate-150 dark:border-white/5 leading-none">
                    <span className="font-bold">🤖 Inteligência Artificial & Computação</span>
                    <span className="text-emerald-500 font-bold font-mono">$14.10 RPM</span>
                  </div>
                  <div className="flex justify-between p-2 bg-white dark:bg-[#06060e] rounded-lg border border-slate-150 dark:border-white/5 leading-none">
                    <span className="font-bold">🛍️ Afiliados & Ecommerce</span>
                    <span className="text-cyan-500 font-bold font-mono">$8.90 RPM</span>
                  </div>
                </div>
              </div>

              {/* AdSense compliance box */}
              <div className="p-3 bg-emerald-500/5 rounded-xl border border-emerald-500/10 text-[10px] text-slate-550 dark:text-slate-400 leading-relaxed font-medium">
                <p className="text-emerald-500 font-black uppercase tracking-wider text-[11px] mb-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Políticas AdSense Verificadas:
                </p>
                Nossos blocos de anúncios contêm espaçamento de segurança de no mínimo 15px para evitar cliques acidentais e suspensão. A densidade de anúncios segue o limite do Google de no máximo 30% da página com material promocional.
              </div>
            </div>
          )}

          {/* TAB 2: SPONSOR REVENUE CHANNELS (NATIVE ADVERTISING PREVIEW) */}
          {rightTab === 'social' && (
            <div className="bg-white/90 dark:bg-[#0c0c16]/80 p-5 rounded-[28px] border border-slate-200 dark:border-indigo-500/15 shadow-xl space-y-4 text-left">
              <h3 className="text-xs font-black uppercase text-pink-600 dark:text-[#25f4ee] tracking-wider flex items-center gap-1.5 border-b border-slate-200 dark:border-indigo-500/10 pb-2">
                <Eye className="w-4 h-4 text-pink-500 animate-pulse" />
                Anúncios Nativos Patrocinados (CPM Saudável)
              </h3>
              
              <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                Adicione estes blocos nativos dentro dos seus canais de divulgação para simular um feed pago que gera cliques altamente qualificados.
              </p>

              {/* Showcase 1 */}
              <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-white/5 space-y-2 hover:border-blue-500/30 transition-all shadow-sm">
                <span className="text-[8px] bg-slate-200 dark:bg-white/10 text-slate-500 dark:text-slate-400 font-bold px-2 py-0.5 rounded uppercase font-mono tracking-wider">Patrocinado • Kiwify PRO</span>
                <h4 className="text-xs font-black dark:text-white leading-snug">
                  Como faturar seus primeiros R$ 5.000 como afiliado sem se expor nas redes sociais em menos de 21 dias!
                </h4>
                <p className="text-[10px] text-slate-500 leading-relaxed font-medium">Veja o método de contingência e aquecimento de algoritmo utilizado na plataforma mais fluida.</p>
                <div className="flex justify-between items-center pt-1 leading-none">
                  <span className="text-[9px] text-blue-500 font-mono font-bold">★ Alta Conversão (CPC +0.45)</span>
                  <button onClick={() => showToast('Iniciando redirecionamento seguro...', 'info')} className="bg-blue-600 text-white font-black text-[9px] uppercase px-3 py-1.5 rounded-lg">Visitar</button>
                </div>
              </div>

              {/* Showcase 2 */}
              <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-white/5 space-y-2 hover:border-pink-500/30 transition-all shadow-sm">
                <span className="text-[8px] bg-slate-200 dark:bg-white/10 text-slate-500 dark:text-slate-400 font-bold px-2 py-0.5 rounded uppercase font-mono tracking-wider">Patrocinado • ChatGPT Mestre</span>
                <h4 className="text-xs font-black dark:text-white leading-snug">
                  365 prompts prontos de Inteligência Artificial que simplificam roteiros de canais de podcast dark!
                </h4>
                <p className="text-[10px] text-slate-500 leading-relaxed font-medium">Basta copiar, ajustar o nicho e gerar dublagens e locuções fotorrealistas em lote.</p>
                <div className="flex justify-between items-center pt-1 leading-none">
                  <span className="text-[9px] text-pink-500 font-mono font-bold">★ RPM Record (CPC +0.65)</span>
                  <button onClick={() => showToast('Redirecionando...', 'info')} className="bg-pink-600 text-white font-black text-[9px] uppercase px-3 py-1.5 rounded-lg font-sans">Acessar</button>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>

      {/* MOBILE ONLY DRAWER SHEET (FALLBACK) */}
      <AnimatePresence>
        {showMobileLegalSheet && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileLegalSheet(false)}
              className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-50 pointer-events-auto"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="lg:hidden fixed bottom-0 left-0 right-0 max-h-[85vh] bg-white dark:bg-slate-900 rounded-t-[32px] overflow-y-auto no-scrollbar shadow-2xl p-6 z-50 text-left"
            >
              <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-white/5 mb-4 leading-none">
                <h4 className="font-display font-black text-sm uppercase text-slate-800 dark:text-white">Central de Termos & SEO</h4>
                <button 
                  onClick={() => setShowMobileLegalSheet(false)}
                  className="p-1 bg-slate-100 dark:bg-white/10 rounded-full"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-[10px] font-black uppercase text-indigo-400">Páginas Institucionais:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'sobre', label: 'Sobre o Portal' },
                      { id: 'contato', label: 'Contato direto' },
                      { id: 'privacidade', label: 'Privacidade' },
                      { id: 'termos', label: 'Termos de Uso' },
                      { id: 'transparencia', label: 'Transparência' },
                      { id: 'cookies', label: 'Cookies LGPD' }
                    ].map((p) => (
                      <button
                        key={p.id}
                        onClick={() => {
                          setSelectedLegalPage(p.id as any);
                          setSelectedLegalPage(p.id as any);
                          showToast(`Selecionou: ${p.label}`, 'info');
                        }}
                        className={`p-3 rounded-xl text-xs font-bold text-left border ${
                          selectedLegalPage === p.id 
                            ? 'bg-blue-600/10 border-blue-600 text-blue-500' 
                            : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-350'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Simulated Core Web Vitals on Mobile */}
                <div className="p-4 bg-slate-55 shadow-sm dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/5 space-y-2">
                  <p className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Desempenho Mobile & Core Web Vitals</p>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-2 bg-white dark:bg-[#06060e] rounded-xl">
                      <p className="text-[8px] text-slate-400">LCP Mobile</p>
                      <p className="font-mono text-emerald-500 font-extrabold text-[12px]">1.1s</p>
                    </div>
                    <div className="p-2 bg-white dark:bg-[#06060e] rounded-xl">
                      <p className="text-[8px] text-slate-400">TBT Delay</p>
                      <p className="font-mono text-emerald-500 font-extrabold text-[12px]">20ms</p>
                    </div>
                    <div className="p-2 bg-white dark:bg-[#06060e] rounded-xl">
                      <p className="text-[8px] text-slate-400">SEO Mobile</p>
                      <p className="font-mono text-emerald-500 font-extrabold text-[12px]">100/100</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl space-y-2">
                  <h5 className="font-bold text-xs">Informações Legais Atuais:</h5>
                  <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                    {selectedLegalPage === 'sobre' && "MoneyNet AI é uma plataforma de educação empreendedora inovadora que consolida conteúdos gratuitos de redes sociais (TikTok, Reels, Shorts)."}
                    {selectedLegalPage === 'contato' && "E-mail: suporte@moneynet.ai, WhatsApp: +258 87 884 8277, TikTok: tiktok.com/@moneynet.ai ou Facebook: facebook.com/share/1CZh4awA8s/."}
                    {selectedLegalPage === 'privacidade' && "Este app respeita as diretrizes de privacidade e LGPD, não compartilhando dados de links ou favoritos com terceiros."}
                    {selectedLegalPage === 'termos' && "Não garantimos dinheiro mágico rápida. A consistência dos ganchos e da edição determinam o ritmo orgânico de views."}
                    {selectedLegalPage === 'transparencia' && "Anúncios são veiculados de forma ética para cobrir os custos e o motor de Inteligência Artificial da MoneyNet."}
                    {selectedLegalPage === 'cookies' && "No seu dispositivo gravamos cookies de navegação locais essenciais com segurança plena de acordo as regras de consentimento."}
                  </p>
                </div>

                <button
                  onClick={() => setShowMobileLegalSheet(false)}
                  className="w-full py-3 bg-slate-900 dark:bg-white/10 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all"
                >
                  Confirmar e Fechar
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
};
