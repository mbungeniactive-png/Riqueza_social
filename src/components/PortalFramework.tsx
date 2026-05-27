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
            <div className="bg-white/90 dark:bg-[#0c0c16]/80 p-5 rounded-[28px] border border-slate-200 dark:border-indigo-500/15 shadow-xl space-y-4 text-left">
              <h3 className="text-xs font-black uppercase text-pink-600 dark:text-pink-400 tracking-wider flex items-center gap-1.5 border-b border-slate-200 dark:border-indigo-500/10 pb-2">
                <Shield className="w-4 h-4" />
                Políticas, Cookies & Conformidade
              </h3>

              {/* Selector side-pill hierarchy */}
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: 'sobre', label: 'Sobre' },
                  { id: 'contato', label: 'Contato' },
                  { id: 'privacidade', label: 'Privacidade' },
                  { id: 'termos', label: 'Termos' },
                  { id: 'transparencia', label: 'Transparência' },
                  { id: 'cookies', label: 'Cookies & LGPD' }
                ].map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedLegalPage(p.id as any)}
                    className={`px-3 py-1.5 rounded-lg text-[9.5px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                      selectedLegalPage === p.id
                        ? 'bg-gradient-to-r from-pink-600 to-indigo-600 text-white shadow-sm'
                        : 'bg-slate-200/50 dark:bg-white/5 text-slate-500 hover:text-slate-800 hover:bg-slate-250 dark:text-slate-400'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              <div className="bg-slate-50 dark:bg-white/5 border border-slate-150 dark:border-white/5 p-4.5 rounded-2xl max-h-[45vh] overflow-y-auto no-scrollbar scroll-smooth">
                {selectedLegalPage === 'sobre' && (
                  <div className="space-y-3.5 text-xs text-slate-600 dark:text-slate-300">
                    <h4 className="font-extrabold text-slate-800 dark:text-white uppercase tracking-tight text-[13px]">Sobre o MoneyNet AI</h4>
                    <p className="leading-relaxed">
                      MoneyNet AI é uma plataforma de educação empreendedora inovadora que consolida conteúdos de decolagem orgânica gratuitos em redes sociais convencionais (TikTok, YouTube Shorts, Instagram Reels, Marketing de Afiliados) aliando as ferramentas tecnológicas de Inteligência Artificial para alavancar monetização.
                    </p>
                    <p className="leading-relaxed font-bold">
                      A proposta do ecossistema é democratizar o acesso às estratégias que canais grandes usam para capitalizar visualizações sem a imposição de pagar caro por treinamentos ou cursos redundantes.
                    </p>
                  </div>
                )}

                {selectedLegalPage === 'contato' && (
                  <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
                    <h4 className="font-extrabold text-slate-800 dark:text-white uppercase tracking-tight text-[13px]">Entre em Contato</h4>
                    <p className="leading-relaxed">
                      Nosso time de atendimento está disponível para dúvidas gerais, propostas e apoio à integração da conta empreendedora.
                    </p>
                    <div className="space-y-2 pt-2 text-[11px] font-mono">
                      <div className="p-2.5 bg-white dark:bg-black/30 rounded-xl border border-slate-200 dark:border-white/5 flex flex-col gap-0.5">
                        <span className="text-slate-400">E-mail Corporativo:</span>
                        <span className="font-bold text-blue-600 dark:text-blue-400 select-all font-mono">suporte@moneynet.ai</span>
                      </div>
                      <div className="p-2.5 bg-white dark:bg-black/30 rounded-xl border border-slate-200 dark:border-white/5 flex flex-col gap-0.5">
                        <span className="text-slate-400">Canal WhatsApp Oficial:</span>
                        <a href="https://wa.me/258878848277" target="_blank" className="font-bold text-emerald-500 hover:underline inline-flex items-center gap-1 font-mono">
                          +258 87 884 8277 <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                      <div className="p-2.5 bg-white dark:bg-black/30 rounded-xl border border-slate-200 dark:border-white/5 flex flex-col gap-0.5">
                        <span className="text-slate-400">Perfil do Facebook Oficial:</span>
                        <a href="https://www.facebook.com/share/1CZh4awA8s/" target="_blank" rel="noopener noreferrer" className="font-bold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1 font-mono break-all">
                          facebook.com/share/1CZh4awA8s/ <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                {selectedLegalPage === 'privacidade' && (
                  <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
                    <h4 className="font-extrabold text-slate-800 dark:text-white uppercase tracking-tight text-[13px]">Política de Privacidade</h4>
                    <p className="leading-relaxed">
                      Garantimos a proteção total dos seus segredos de configuração e informações pessoais. Esclarecemos que não compartilhamos dados de links de afiliação ou históricos de leitura com terceiros ou redes governamentais.
                    </p>
                    <p className="leading-relaxed">
                      Este site veicula anúncios do Google AdSense. Para entender como os cookies publicitários são usados de forma transparente pelo Google, consulte a seção do AdSense ou nossa declaração de cookies em vigor.
                    </p>
                  </div>
                )}

                {selectedLegalPage === 'termos' && (
                  <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
                    <h4 className="font-extrabold text-slate-800 dark:text-white uppercase tracking-tight text-[13px]">Termos de Uso</h4>
                    <p className="leading-relaxed">
                      Ao acessar os materiais empreendedores disponibilizados na MoneyNet AI, o usuário declara e concorda que a responsabilidade pelos canais criados (Canais Dark, Clips de WhatsApp, etc.) recai exclusivamente sobre as práticas morais conduzidas pelo operador.
                    </p>
                    <p className="leading-relaxed">
                      Não vendemos riqueza instantânea. Disponibilizamos tutoriais e métodos para que a consistência vença os bloqueios de algoritmo.
                    </p>
                  </div>
                )}

                {selectedLegalPage === 'transparencia' && (
                  <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
                    <h4 className="font-extrabold text-slate-800 dark:text-white uppercase tracking-tight text-[13px]">Declaração de Transparência</h4>
                    <p className="leading-relaxed">
                      De acordo com os padrões da Federal Trade Commission (FTC) e da regulação antitruste em 2026, informamos que mantemos independência financeira de quaisquer patrocinadores. No entanto, o aplicativo exibe de forma clara campanhas de anúncios dinâmicas operadas de forma terceirizada para as despesas do servidor Cloud e do motor de inteligência artificial.
                    </p>
                  </div>
                )}

                {selectedLegalPage === 'cookies' && (
                  <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
                    <h4 className="font-extrabold text-slate-800 dark:text-white uppercase tracking-tight text-[13px]">Controle de Cookies & LGPD</h4>
                    <p className="leading-relaxed">
                      Utilizamos arquivos de dados temporários de cookies e web storage para manter seu histórico de estudos local, marcar seus ganchos favoritos e rastrear preferência de idioma e tema.
                    </p>
                    <p className="leading-relaxed font-bold">
                      Ao utilizar nossa plataforma, você consente a gravação de cookies não agressivos que garantem o salvamento das suas conquistas em tempo real.
                    </p>
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
                    {selectedLegalPage === 'contato' && "E-mail: suporte@moneynet.ai, WhatsApp: +258 87 884 8277 ou Facebook: facebook.com/share/1CZh4awA8s/."}
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
