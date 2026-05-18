import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { ArrowLeft, CheckCircle2, TrendingUp, Lightbulb, Info, Play, Share2, Copy, Send, Plus, Trash2, ExternalLink, Link as LinkIcon, Save, AlertCircle } from 'lucide-react';
import { SectionContent, CONTENT_BY_LANGUAGE } from '../constants/content';
import { useToast } from './Toast';
import { useLanguage } from '../hooks/useLanguage';

const AffiliateLinkManager = () => {
  const { showToast } = useToast();
  const { t } = useLanguage();
  const [links, setLinks] = React.useState<{ name: string; url: string }[]>(() => {
    const saved = localStorage.getItem('affiliate_links');
    return saved ? JSON.parse(saved) : [];
  });
  const [newName, setNewName] = React.useState('');
  const [newUrl, setNewUrl] = React.useState('');
  const [isAdding, setIsAdding] = React.useState(false);
  const [showCorrectionFeedback, setShowCorrectionFeedback] = React.useState(false);

  React.useEffect(() => {
    localStorage.setItem('affiliate_links', JSON.stringify(links));
  }, [links]);

  const addLink = () => {
    if (newName && newUrl) {
      let finalUrl = newUrl.trim();
      let wasCorrected = false;

      if (!/^https?:\/\//i.test(finalUrl)) {
        finalUrl = `https://${finalUrl}`;
        wasCorrected = true;
      }

      setLinks([...links, { name: newName, url: finalUrl }]);
      showToast(t('sections.link_saved'), 'success');
      
      if (wasCorrected) {
        setShowCorrectionFeedback(true);
        setTimeout(() => setShowCorrectionFeedback(false), 3000);
      } else {
        setIsAdding(false);
      }

      setNewName('');
      setNewUrl('');
    }
  };

  const removeLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index));
    showToast(t('sections.link_removed'));
  };

  return (
    <div className="bg-slate-900 rounded-[32px] p-6 text-white space-y-6 shadow-2xl border border-slate-800">
      <div className="flex items-center justify-between px-1">
        <div className="space-y-1">
          <h4 className="text-lg font-black italic">{t('sections.affiliate_manager')}</h4>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-wider">Seus links personalizados</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="p-3 bg-blue-600 rounded-2xl text-white shadow-lg shadow-blue-500/20 active:scale-95 transition-all"
        >
          {isAdding ? <ArrowLeft className="w-5 h-5 rotate-90" /> : <Plus className="w-5 h-5" />}
        </button>
      </div>

      {isAdding && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="space-y-4 bg-white/5 p-6 rounded-3xl border border-white/10"
        >
          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-slate-500 ml-1">{t('sections.product_name')}</label>
            <input 
              type="text" 
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Ex: Curso de TikTok"
              className="w-full bg-slate-800 border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-600"
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-xs font-black uppercase text-slate-500">Link de Afiliado</label>
              {showCorrectionFeedback && (
                <motion.span 
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-bold flex items-center gap-1"
                >
                  <CheckCircle2 className="w-2.5 h-2.5" />
                  URL Corrigida
                </motion.span>
              )}
            </div>
            <div className="flex bg-slate-800 rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 transition-all">
              <div className="flex items-center px-4 border-r border-white/5">
                <LinkIcon className="w-4 h-4 text-slate-500" />
              </div>
              <input 
                type="text" 
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                placeholder="go.hotmart.com/..."
                className="w-full bg-transparent border-none p-4 text-sm font-bold outline-none"
              />
            </div>
          </div>
          <button 
            onClick={addLink}
            disabled={!newName || !newUrl}
            className="w-full py-4 bg-blue-600 rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-blue-500 disabled:opacity-50 transition-all"
          >
            <Save className="w-4 h-4" />
            {t('sections.save_link')}
          </button>
        </motion.div>
      )}

      <div className="space-y-3">
        {links.length === 0 ? (
          <div className="text-center py-10 border-2 border-dashed border-white/5 rounded-3xl">
            <p className="text-slate-500 text-sm font-bold">{t('sections.no_links')}</p>
          </div>
        ) : (
          links.map((link, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/5 border border-white/10 p-5 rounded-3xl flex items-center justify-between group hover:bg-white/10 transition-all"
            >
              <div className="flex-1 min-w-0 pr-4">
                <p className="font-black text-sm truncate uppercase tracking-tight">{link.name}</p>
                <p className="text-xs text-slate-500 font-bold truncate mt-0.5">{link.url}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(link.url);
                    showToast('Link copiado!');
                  }}
                  className="p-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => window.open(link.url, '_blank')}
                  className="p-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => removeLink(idx)}
                  className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500/20 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

interface SectionViewProps {
  section: SectionContent;
  onBack: () => void;
  onAskMentor?: (message: string) => void;
  targetSubsectionId?: string;
}

export const SectionView: React.FC<SectionViewProps> = ({ section, onBack, onAskMentor, targetSubsectionId }) => {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);
  const [completedSubsections, setCompletedSubsections] = React.useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem(`completed_${section.id}`);
    return saved ? JSON.parse(saved) : {};
  });
  
  const { showToast } = useToast();
  const { t } = useLanguage();
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    localStorage.setItem(`completed_${section.id}`, JSON.stringify(completedSubsections));
  }, [completedSubsections, section.id]);

  const toggleCompletion = (id: string, title: string) => {
    const newState = !completedSubsections[id];
    setCompletedSubsections(prev => ({ ...prev, [id]: newState }));
    if (newState) {
      showToast(`${t('sections.completed')}: ${title}`, 'success');
    }
  };
  
  const { scrollYProgress } = useScroll({
    container: scrollContainerRef
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  React.useEffect(() => {
    if (targetSubsectionId) {
      const timer = setTimeout(() => {
        scrollToId(targetSubsectionId);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [targetSubsectionId, section.id]);

  const handleShare = async (title: string, text: string, id?: string) => {
    const url = window.location.href + (id ? `#${id}` : '');
    
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        });
        showToast(t('sections.share_success'), 'success');
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      copyToClipboard(url, id || 'main');
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showToast(t('sections.copy_success'), 'success');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatText = (text: string) => {
    if (typeof text !== 'string') return text;
    const parts = text.split(/(\*\*.*?\*\*|\[\[.*?\]\])/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-extrabold text-slate-900 dark:text-white underline decoration-blue-500/30 decoration-2 underline-offset-2">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('[[') && part.endsWith(']]')) {
        return (
          <span key={i} className="mx-0.5 px-2 py-0.5 rounded-lg bg-blue-600 dark:bg-blue-500 text-white font-bold text-xs shadow-sm shadow-blue-500/20 inline-block align-middle mb-0.5">
            {part.slice(2, -2)}
          </span>
        );
      }
      return part;
    });
  };

  const shareToWhatsApp = (title: string, id?: string) => {
    const url = window.location.href + (id ? `#${id}` : '');
    const shareMsg = t('sections.share_msg')
      .replace('{{title}}', title)
      .replace('{{url}}', url);
    const text = encodeURIComponent(shareMsg);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const scrollToId = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 180;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-[73px] sm:top-[89px] left-0 right-0 h-1 bg-blue-600 dark:bg-blue-500 origin-left z-40"
        style={{ scaleX }}
      />

      {/* Header */}
      <div className="p-4 sm:p-6 flex items-center justify-between border-b border-slate-100 dark:border-white/5 bg-white dark:bg-slate-900 sticky top-0 z-30 transition-colors duration-300">
        <div className="flex items-center gap-3 sm:gap-4">
          <button 
            onClick={onBack}
            className="p-3 bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-400 rounded-2xl active:scale-90 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">{section.title}</h1>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={() => handleShare(section.title, section.description)}
            className="p-3 bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-400 rounded-2xl active:scale-90 transition-all"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Sub-navigation for many subsections */}
      {section.subsections.length > 2 && (
        <div className="sticky top-[73px] sm:top-[89px] z-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-white/5 px-4 py-3 flex gap-2 overflow-x-auto no-scrollbar scroll-smooth">
          {section.subsections.map((sub) => (
            <button
              key={`nav-${sub.id}`}
              onClick={() => scrollToId(sub.id)}
              className="whitespace-nowrap px-4 py-2 bg-slate-100 dark:bg-white/5 rounded-full text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-blue-500/20 hover:text-blue-600 dark:hover:text-blue-400 transition-all shadow-sm"
            >
              {sub.title}
            </button>
          ))}
        </div>
      )}

      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto no-scrollbar select-none">
        {/* Banner Area */}
        <div className="p-6 sm:p-8 bg-slate-50 dark:bg-white/5 border-b border-slate-100 dark:border-white/5 flex flex-col items-center text-center">
          <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-xs">{section.description}</p>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-10 pb-20">
          {section.subsections.map((sub, idx) => (
            <motion.section 
              key={sub.id}
              id={sub.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => toggleCompletion(sub.id, sub.title)}
                    className={`p-1.5 rounded-lg border-2 transition-all ${
                      completedSubsections[sub.id] 
                        ? 'bg-blue-600 border-blue-600 text-white' 
                        : 'border-slate-200 dark:border-white/10 text-transparent'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                  <h2 className={`text-xl sm:text-2xl font-black leading-tight transition-all ${
                    completedSubsections[sub.id] ? 'text-slate-400 dark:text-slate-600 line-through' : 'text-slate-900 dark:text-white'
                  }`}>
                    {sub.title}
                  </h2>
                </div>
                <div className="flex gap-1">
                   <button 
                    onClick={() => handleShare(sub.title, sub.title, sub.id)}
                    className="p-2 text-slate-400 hover:text-blue-500 transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => copyToClipboard(window.location.href + `#${sub.id}`, sub.id)}
                    className="p-2 text-slate-400 hover:text-blue-500 transition-colors"
                  >
                    <LinkIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="space-y-6">
                {sub.content.map((item, i) => {
                  if (typeof item === 'string') {
                    return <p key={i} className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{formatText(item)}</p>;
                  }

                  switch (item.type) {
                    case 'video':
                      return (
                        <div key={i} className="space-y-3">
                          {item.title && (
                            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 px-1 text-xs uppercase tracking-wider">
                              <Play className="w-3.5 h-3.5 text-blue-600 fill-blue-600" />
                              {item.title}
                            </h4>
                          )}
                          <div className="aspect-video w-full bg-slate-100 dark:bg-slate-800 rounded-[32px] overflow-hidden shadow-xl relative border border-slate-200 dark:border-white/10">
                            <video 
                              key={item.url}
                              controls 
                              className="w-full h-full object-cover"
                              playsInline
                            >
                              <source src={item.url} type="video/mp4" />
                              {t('sections.no_video')}
                            </video>
                          </div>
                        </div>
                      );
                    case 'image':
                      return (
                        <div key={i} className="space-y-3">
                          {item.title && (
                            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 px-1 text-xs uppercase tracking-wider">
                              <Info className="w-3.5 h-3.5 text-blue-600" />
                              {item.title}
                            </h4>
                          )}
                          <div className="w-full bg-white dark:bg-white/5 rounded-[32px] overflow-hidden shadow-xl border border-slate-100 dark:border-white/10 p-2">
                            <img 
                              src={item.url} 
                              alt={item.title || 'Imagem de Renda Extra'}
                              className="w-full h-auto rounded-2xl"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        </div>
                      );
                    case 'steps':
                      return (
                        <div key={i} className="bg-slate-50 dark:bg-white/5 p-6 rounded-3xl space-y-4 transition-colors">
                          {item.title && <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-blue-500" />
                            {item.title}
                          </h4>}
                          <ul className="space-y-3">
                            {item.items.map((li, j) => (
                              <li key={j} className="text-slate-600 dark:text-slate-400 text-sm flex gap-3 leading-relaxed">
                                <span className="text-blue-500 font-bold">•</span>
                                {formatText(li)}
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    case 'tips':
                      return (
                        <div key={i} className="bg-amber-50 dark:bg-amber-900/10 p-6 rounded-3xl border border-amber-100 dark:border-amber-900/20 flex gap-4 transition-colors">
                          <Lightbulb className="w-6 h-6 text-amber-500 shrink-0" />
                          <div className="space-y-2">
                             {item.items.map((li, j) => (
                                <p key={j} className="text-amber-800 dark:text-amber-500 text-sm font-bold leading-relaxed">{formatText(li)}</p>
                             ))}
                          </div>
                        </div>
                      );
                    case 'info':
                       return (
                        <div key={i} className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-3xl border border-blue-100 dark:border-blue-900/20 space-y-3 transition-colors">
                           {item.title && <h4 className="font-bold text-blue-900 dark:text-blue-400 flex items-center gap-2">
                            <Info className="w-5 h-5 text-blue-600" />
                            {item.title}
                          </h4>}
                          <div className="space-y-2">
                            {item.items.map((li, j) => (
                              <p key={j} className="text-blue-800 dark:text-blue-300 text-sm font-medium">{formatText(li)}</p>
                            ))}
                          </div>
                        </div>
                       );
                    case 'list':
                      return (
                        <ul key={i} className="space-y-3 px-2">
                          {item.items.map((li, j) => (
                            <li key={j} className="flex flex-col gap-2">
                              <div className="text-slate-600 dark:text-slate-400 text-sm flex gap-3 leading-relaxed font-medium">
                                <ArrowLeft className="w-4 h-4 text-emerald-500 rotate-180 shrink-0 mt-1" />
                                {formatText(li)}
                              </div>
                              {sub.id === 'income_ideas' && onAskMentor && (
                                <button
                                  onClick={() => onAskMentor(`Crie um plano de ação detalhado para começar com a ideia: "${li}". Foque em passos práticos para iniciantes, como monetizar e o que é necessário para começar hoje.`)}
                                  className="ml-7 self-start text-[10px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-3 py-1.5 rounded-full hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                                >
                                  <Lightbulb className="w-3 h-3" />
                                  {t('sections.action_plan')}
                                </button>
                              )}
                            </li>
                          ))}
                        </ul>
                      );
                    case 'affiliate_manager':
                      return <AffiliateLinkManager key={i} />;
                    default:
                      return null;
                  }
                })}
              </div>
            </motion.section>
          ))}
        </div>
      </div>
      
      {/* Bottom Ad Sticky */}
      <div className="p-4 border-t border-slate-100 dark:border-white/5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky bottom-0 z-20">
         <div className="bg-slate-900 dark:bg-white/10 text-white p-4 rounded-2xl flex items-center justify-between shadow-xl border border-white/5">
            <div className="flex items-center gap-3">
               <div className="bg-blue-500 p-2 rounded-lg">
                  <TrendingUp className="w-4 h-4 " />
               </div>
               <div>
                  <p className="text-xs font-bold text-slate-400 leading-none mb-1">PROMOÇÃO</p>
                  <p className="text-sm font-bold leading-none">Ganhe bônus de 500%</p>
               </div>
            </div>
            <button className="bg-white text-slate-900 px-4 py-2 rounded-xl text-xs font-black">
               SABER MAIS
            </button>
         </div>
      </div>
    </div>
  );
};
