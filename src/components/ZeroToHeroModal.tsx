import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Target, Flame, Lightbulb, TrendingUp, Sliders, Play, Award } from 'lucide-react';

interface ZeroToHeroModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ZeroToHeroModal: React.FC<ZeroToHeroModalProps> = ({ isOpen, onClose }) => {
  const steps = [
    {
      number: '01',
      title: 'Mentalidade Fora da Média',
      desc: 'Sua mente dita o tamanho das suas vendas. Esqueça esquemas de ganho fácil; trate redes de visualização como negócios sérios e de longo prazo.',
      icon: <Target className="w-5 h-5 text-indigo-500" />
    },
    {
      number: '02',
      title: 'Definição do Nicho de Exploração',
      desc: 'Os nichos mais lucrativos de 2026 são: Finanças Simplificadas, Curiosidades Geradas por IA, Achadinhos/Review de Produtos Físicos, e Motivação Diária.',
      icon: <Flame className="w-5 h-5 text-orange-500" />
    },
    {
      number: '03',
      title: 'Estruturação Técnica Segura',
      desc: 'Crie uma conta profissional separada em cada plataforma. Use uma foto limpa (ou o avatar obtido em seu Perfil) e um handle de fácil leitura.',
      icon: <Sliders className="w-5 h-5 text-blue-500" />
    },
    {
      number: '04',
      title: 'Fórmula Espelho dos 3 Segundos',
      desc: 'O gancho de entrada decide se o usuário fica ou passa. Comece com textos de alto contraste na tela e uma voz narradora engajante.',
      icon: <Lightbulb className="w-5 h-5 text-amber-500" />
    },
    {
      number: '05',
      title: 'Funil e Tráfego Orgânico Conectado',
      desc: 'Nunca publique sem chamada para ação. Oriente o público a curtir e indique que há um link exclusivo de afiliado esperando em sua bio.',
      icon: <TrendingUp className="w-5 h-5 text-emerald-500" />
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            id="zero_hero_backdrop"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 rounded-[32px] overflow-hidden shadow-2xl relative flex flex-col max-h-[85vh]"
              id="zero_hero_modal_body"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-6 text-white shrink-0 relative">
                <button
                  onClick={onClose}
                  className="absolute right-4 top-4 p-1.5 bg-white/20 hover:bg-white/30 text-white rounded-full transition-all active:scale-95"
                  id="zero_hero_close_btn"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-3">
                  <div className="bg-white/15 p-2 rounded-xl">
                    <Award className="w-6 h-6 text-yellow-300 animate-bounce" />
                  </div>
                  <div>
                    <h3 className="font-black text-lg tracking-tight text-white leading-tight">
                      Manual do Iniciante
                    </h3>
                    <p className="text-blue-100/90 text-xs font-semibold">Como Começar do Zero Absoluto</p>
                  </div>
                </div>
              </div>

              {/* Scrolling steps list */}
              <div className="p-6 overflow-y-auto no-scrollbar space-y-5 flex-1 text-left">
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-1">
                  Dominar o mercado digital exige método e clareza. Siga estes 5 pilares estruturados para transformar cliques em renda extra orgânica.
                </p>

                <div className="relative border-l-2 border-slate-100 dark:border-white/5 pl-4 ml-2.5 space-y-6">
                  {steps.map((step) => (
                    <div key={step.number} className="relative group" id={`zero_step_${step.number}`}>
                      {/* Anchor number bubble */}
                      <span className="absolute -left-[30px] top-0 w-6 h-6 rounded-full bg-blue-600 dark:bg-indigo-600 text-white flex items-center justify-center text-[10px] font-black border-2 border-white dark:border-slate-900">
                        {step.number}
                      </span>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          {step.icon}
                          <h4 className="font-extrabold text-sm text-slate-900 dark:text-white leading-none">
                            {step.title}
                          </h4>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Call Out Note */}
                <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5 flex items-start gap-2.5">
                  <span className="text-sm">💡</span>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">
                    <strong className="text-blue-600 dark:text-blue-400">Dica de mestre:</strong> O maior vilão do iniciante é a procrastinação. Publique seu primeiro vídeo em até 48 horas.
                  </p>
                </div>
              </div>

              {/* Footer CTA */}
              <div className="p-6 bg-slate-50 dark:bg-slate-900/40 border-t border-slate-100 dark:border-white/5 shrink-0">
                <button
                  onClick={onClose}
                  className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-black text-xs rounded-2xl transition-all shadow-md shadow-indigo-600/20"
                  id="zero_hero_start_btn"
                >
                  Estou Pronto para Começar!
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
