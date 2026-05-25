import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowUpRight, CheckCircle2, ShieldAlert } from 'lucide-react';
import { useToast } from './Toast';

interface SponsorBannerProps {
  type: 'top-leaderboard' | 'inline-native' | 'bottom-article' | 'sidebar-sticky';
  niche?: 'finance' | 'tiktok' | 'ai' | 'marketing';
}

interface AdTemplate {
  title: string;
  desc: string;
  cta: string;
  url: string;
  sponsor: string;
  badge: string;
}

const ADS_BY_NICHE: Record<string, AdTemplate[]> = {
  finance: [
    {
      title: 'Cartão de Crédito Black XP Sem Anuidade',
      desc: 'Ganhe até 1% de Investback em todas as compras e garanta acessos VIP a salas VIP exclusivas nos aeroportos.',
      cta: 'Solicitar Agora',
      url: 'https://xp.com.br',
      sponsor: 'XP Investimentos S.A.',
      badge: 'Patrocinado • Finanças'
    },
    {
      title: 'Como Viver de dividendos de Fundos Imobiliários',
      desc: 'Aprenda o método exclusivo para receber aluguéis mensais isentos de imposto de renda com menos de R$ 100 de investimento.',
      cta: 'Baixar Guia Grátis',
      url: 'https://moneynet.ai',
      sponsor: 'Valor Inteligente',
      badge: 'Patrocinado • Investimentos'
    }
  ],
  tiktok: [
    {
      title: 'Pack de 1.500 Clipes Editáveis Sem Marca d\'água',
      desc: 'Baixe em lote os melhores cortes de podcasts, curiosidades e reflexões filosóficas em alta resolução com letterings integrados.',
      cta: 'Acessar Pack',
      url: 'https://kiwify.com.br',
      sponsor: 'Cortes Lucrativos Inc.',
      badge: 'Patrocinado • TikTok'
    },
    {
      title: 'Criador Automático de Dublagens por IA fotorrealistas',
      desc: 'Clone sua própria voz ou use locutores premium em segundos. Teste gratuitamente os primeiros clipes.',
      cta: 'Fazer Teste Grátis',
      url: 'https://elevenlabs.io',
      sponsor: 'ElevenLabs AI',
      badge: 'Anúncio • Tecnologia'
    }
  ],
  ai: [
    {
      title: 'ChatGPT Premium Hack: Guia Secreto de Geração de Roteiros',
      desc: 'Copie os prompts altamente refinados de engenharia de instruções para criar roteiros magnéticos de 30 segundos no TikTok.',
      cta: 'Garantir Acesso',
      url: 'https://openai.com',
      sponsor: 'Prompting Elite',
      badge: 'Patrocinado • IA'
    },
    {
      title: 'Gere Modelos de Vídeo 3D Realistas de graça',
      desc: 'Crie avatares fotorrealistas que respiram e gesticulam naturalmente a partir de qualquer texto em português.',
      cta: 'Experimentar',
      url: 'https://synthesia.io',
      sponsor: 'Synthesia Labs',
      badge: 'Anúncio • Vídeos Pro'
    }
  ],
  marketing: [
    {
      title: 'Software de Automação de WhatsApp e Envio em Lote',
      desc: 'Configure o seu robô de suporte para converter clientes frios em vendas recorrentes no piloto automático direto do PC.',
      cta: 'Instalar Bot',
      url: 'https://moneynet.ai',
      sponsor: 'ZapFlow Bot',
      badge: 'Patrocinado • Marketing'
    }
  ]
};

export const SponsorBanner: React.FC<SponsorBannerProps> = ({ type, niche = 'finance' }) => {
  const { showToast } = useToast();
  const [clicked, setClicked] = useState(false);

  // Fallback if niche list is empty
  const ad = useMemo(() => {
    const ads = ADS_BY_NICHE[niche] || ADS_BY_NICHE['finance'];
    return ads[Math.floor(Math.random() * ads.length)];
  }, [niche]);

  const handleAdClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!clicked) {
      setClicked(true);
      showToast('Ação registrada! Simulação de Clique convertida no AdSense Dashboard.', 'success');
      
      // Update simulated credits or XP
      try {
        const savedXp = localStorage.getItem('ad_p_xp');
        const xp = savedXp ? parseInt(savedXp, 10) : 1500;
        localStorage.setItem('ad_p_xp', (xp + 80).toString());
      } catch (err) {}
    }
    // Simulate navigation with a slight delay
    setTimeout(() => {
      window.open(ad.url, '_blank');
    }, 450);
  };

  if (type === 'top-leaderboard') {
    return (
      <div className="w-full px-4 pt-4 shrink-0" id="adsense_top_leaderboard">
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="bg-gradient-to-r from-amber-500/5 to-blue-500/5 dark:from-white/3 dark:to-white/5 border border-slate-200/60 dark:border-white/5 rounded-2xl p-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-left relative overflow-hidden shadow-sm"
        >
          {/* Subtle ad indicator */}
          <div className="absolute top-1 right-2 text-[7px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-bold">
            Google AdSense Premium Unit
          </div>

          <div className="flex items-center gap-2.5">
            <div className="bg-amber-400/10 p-2 rounded-xl text-amber-500 hidden sm:flex shrink-0">
              <Sparkles className="w-4 h-4 animate-bounce" />
            </div>
            <div>
              <span className="text-[8px] bg-slate-200 dark:bg-white/10 text-slate-500 dark:text-slate-400 font-bold px-1.5 py-0.5 rounded tracking-wide uppercase">{ad.badge}</span>
              <h4 className="text-[11.5px] font-extrabold text-slate-800 dark:text-white mt-1 leading-none">{ad.title}</h4>
              <p className="text-[9.5px] text-slate-500 leading-snug mt-0.5 max-w-md line-clamp-1">{ad.desc}</p>
            </div>
          </div>

          <button 
            onClick={handleAdClick}
            className="w-full sm:w-auto py-1.5 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[10px] font-semibold flex items-center justify-center gap-1 shrink-0 transition-all cursor-pointer whitespace-nowrap shadow-sm shadow-blue-500/15"
          >
            <span>{ad.cta}</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>
        </motion.div>
      </div>
    );
  }

  if (type === 'inline-native') {
    return (
      <div className="w-full my-4" id="adsense_inline_native">
        <motion.div 
          whileHover={{ y: -2 }}
          className="bg-slate-50 dark:bg-white/5 border border-slate-200/65 dark:border-white/5 rounded-[24px] p-4.5 space-y-2.5 text-left transition-colors relative shadow-sm"
        >
          <div className="flex justify-between items-center text-[8px] text-slate-400 font-mono">
            <span className="bg-slate-200 dark:bg-white/10 text-slate-500 dark:text-slate-450 font-bold px-1.5 py-0.5 rounded tracking-wide uppercase">{ad.badge}</span>
            <span>PUBLICIDADE AD SENSE</span>
          </div>

          <div className="space-y-1">
            <h4 className="text-xs font-black text-slate-850 dark:text-white leading-snug flex items-center gap-1 group-hover:text-blue-500">{ad.title}</h4>
            <p className="text-[10.5px] text-slate-500 leading-relaxed font-medium">{ad.desc}</p>
          </div>

          <div className="flex justify-between items-center pt-1 leading-none border-t border-slate-200/50 dark:border-white/5">
            <span className="text-[8px] text-slate-400">{ad.sponsor}</span>
            <button 
              onClick={handleAdClick}
              className="py-1.5 px-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-sans font-black text-[9.5px] uppercase rounded-xl transition-all hover:scale-103 cursor-pointer"
            >
              {ad.cta}
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (type === 'bottom-article') {
    return (
      <div className="w-full mt-6" id="adsense_bottom_article">
        <div className="h-0.5 w-full bg-slate-100 dark:bg-white/5 mb-6" />
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="bg-indigo-600/5 dark:bg-white/5 border-2 border-dashed border-indigo-500/20 dark:border-white/10 rounded-[28px] p-5 text-center relative overflow-hidden"
        >
          <span className="absolute top-2 right-3 text-[7.5px] text-indigo-400 font-mono tracking-widest uppercase">Sponsored Match</span>
          
          <div className="max-w-md mx-auto space-y-3">
            <div className="mx-auto bg-indigo-500/10 text-indigo-500 py-1 px-3 rounded-full text-[9px] font-black uppercase tracking-wider w-max">
              Recomendado para você por AdSense
            </div>
            
            <h4 className="text-sm font-black text-slate-850 dark:text-white leading-snug">{ad.title}</h4>
            <p className="text-xs text-slate-500 leading-relaxed font-semibold">{ad.desc}</p>
            
            <button 
              onClick={handleAdClick}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-650 hover:from-blue-500 hover:to-indigo-550 active:scale-95 text-white font-extrabold text-[11px] uppercase tracking-wider rounded-2xl transition-all shadow-md shadow-blue-500/20 cursor-pointer"
            >
              {ad.cta}
            </button>
            <p className="text-[8.5px] text-slate-400">Ao acessar este parceiro, você apoia diretamente a gratuidade do MoneyNet AI.</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return null;
};
