import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Quote, Sparkles, TrendingUp, DollarSign, Award } from 'lucide-react';

interface SuccessStory {
  id: string;
  name: string;
  location: string;
  avatarBg: string; // Gradient color for profile icon
  initials: string;
  outcomeStats: string;
  description: string;
  storyText: string;
  niche: string;
}

const SUCCESS_STORIES: SuccessStory[] = [
  {
    id: 'mateus',
    name: 'Mateus Silvestre',
    location: 'Maputo',
    avatarBg: 'from-blue-600 to-indigo-600',
    initials: 'MS',
    outcomeStats: 'U$ 400 / mês',
    niche: 'Canva & Design Rápido',
    description: 'Trabalhava de repositor e hoje cria posts profissionais pelo celular para comércios locais.',
    storyText: '“Eu achava que precisava de um computador super caro para ser designer. Depois de ler o Passo 1 e o Passo 3 aqui, criei meu portfólio no Canva pelo celular. Fiz modelos grátis para restaurantes locais no Facebook e conquistei meus primeiros clientes recorrentes!”'
  },
  {
    id: 'beatriz',
    name: 'Beatriz Lemos',
    location: 'São Paulo, Brasil',
    avatarBg: 'from-fuchsia-600 to-pink-600',
    initials: 'BL',
    outcomeStats: 'U$ 1.500 / mês',
    niche: 'Edição no CapCut',
    description: 'Especialista em vídeos curtos e reels para infoprodutores internacionais.',
    storyText: '“Aprendi a olhar para as métricas do TikTok e a estruturar ganchos (hooks) em vídeo. Hoje edito mais de 30 reels por mês usando o CapCut no celular e computador. Meus clientes são todos de fora do país e me pagam de forma segura em dólar.”'
  },
  {
    id: 'antonio',
    name: 'António Gouveia',
    location: 'Nampula',
    avatarBg: 'from-emerald-600 to-teal-600',
    initials: 'AG',
    outcomeStats: 'U$ 300 / mês',
    niche: 'Social Media Local',
    description: 'Gerencia as redes sociais de salões de beleza, farmácias e igrejas na sua província.',
    storyText: '“Usei a mensagem pronta do Passo 5 e fui pessoalmente bater de porta em porta nos negócios do meu bairro. Hoje moro no interior de Nampula e cuido do Instagram de 4 lojas locais. Eles me pagam todo mês de forma rápida.”'
  },
  {
    id: 'clara',
    name: 'Clara Mendes',
    location: 'Luanda, Angola',
    avatarBg: 'from-amber-600 to-orange-600',
    initials: 'CM',
    outcomeStats: 'Kz 350.000 / mês',
    niche: 'Criação de Conteúdo Sem Rosto',
    description: 'Trabalha com canais faceless (copiar e colar legalmente) no YouTube e TikTok.',
    storyText: '“Sempre tive muita vergonha de aparecer em vídeos. Estudei a estratégia de canais sem rosto (faceless) recomendada aqui. Criei um canal focado em produtividade usando roteiros de IA e áudios narrados. O canal monetizou e hoje gera renda constante em Angola.”'
  }
];

export const SuccessCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SUCCESS_STORIES.length);
    }, 8500); // Transitions every 8.5 seconds
    return () => clearInterval(interval);
  }, [isHovered]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + SUCCESS_STORIES.length) % SUCCESS_STORIES.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % SUCCESS_STORIES.length);
  };

  const story = SUCCESS_STORIES[currentIndex];

  return (
    <div 
      className="bg-slate-900 dark:bg-slate-900 border border-slate-800 rounded-[32px] p-6 sm:p-8 text-white relative h-auto overflow-hidden shadow-2xl transition-colors duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      id="success-carousel-pro"
    >
      {/* Absolute Background Lighting Effect */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-emerald-500/10 rounded-full blur-[60px] pointer-events-none" />

      {/* Header section with sparkles */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-5 mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/15 text-blue-400 rounded-xl">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-black tracking-tight uppercase italic text-white">Casos de Sucesso</h3>
            <p className="text-[10px] text-slate-400 font-extrabold tracking-widest uppercase">Resultados Reais dos Nossos Alunos</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-black bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
            <Award className="w-3.5 h-3.5" /> Prova Social
          </span>
        </div>
      </div>

      {/* Main Carousel Experience Section */}
      <div className="relative min-h-[220px] flex flex-col justify-between z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={story.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="space-y-4"
          >
            {/* Top stats info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white/5 border border-white/5 p-4 rounded-3xl">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${story.avatarBg} flex items-center justify-center font-black text-white text-base shadow-lg`}>
                  {story.initials}
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-white leading-tight">{story.name}</h4>
                  <p className="text-[11px] text-slate-400 font-medium">{story.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="px-3 py-1.5 bg-emerald-500/15 border border-emerald-500/20 rounded-2xl flex items-center gap-1.5 text-emerald-400">
                  <DollarSign className="w-4 h-4" />
                  <span className="font-black text-xs sm:text-sm tracking-tight">{story.outcomeStats}</span>
                </div>
                <div className="hidden sm:inline-block px-3 py-1.5 bg-white/5 border border-white/10 rounded-2xl text-[11px] font-extrabold text-slate-300 uppercase tracking-widest leading-none">
                  {story.niche}
                </div>
              </div>
            </div>

            {/* Testimonial message with icon */}
            <div className="relative pl-7 py-2">
              <Quote className="w-6 h-6 text-slate-700 absolute left-0 top-0 rotate-180" />
              <p className="text-slate-300 leading-relaxed font-bold italic text-sm text-justify">
                {story.storyText}
              </p>
              <div className="mt-3 flex items-center gap-2 text-blue-400 font-extrabold text-xs">
                <TrendingUp className="w-4 h-4" />
                <span>{story.description}</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel controls & progress Indicators */}
        <div className="flex items-center justify-between border-t border-slate-800 pt-5 mt-6">
          {/* Bullet points indicators */}
          <div className="flex gap-2">
            {SUCCESS_STORIES.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? 'w-6 bg-blue-500' : 'w-2 bg-slate-800'
                }`}
                aria-label={`Story ${idx + 1}`}
              />
            ))}
          </div>

          {/* Nav arrows buttons with high contrast */}
          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              className="p-3 bg-slate-800 hover:bg-slate-750 text-slate-300 rounded-xl transition-all hover:scale-105 active:scale-95"
              aria-label="Previous story"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="p-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-500/10 transition-all hover:scale-105 active:scale-95"
              aria-label="Next story"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
