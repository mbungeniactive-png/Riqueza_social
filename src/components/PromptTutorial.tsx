import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  Target, 
  MapPin, 
  Zap, 
  Camera,
  CheckCircle2
} from 'lucide-react';

interface TutorialStep {
  title: string;
  description: string;
  icon: React.ElementType;
  example: string;
  tip: string;
  color: string;
}

const steps: TutorialStep[] = [
  {
    title: 'O Sujeito',
    description: 'Comece definindo QUEM ou O QUE é o foco do vídeo. Seja específico.',
    icon: Target,
    example: 'Um robô cibernético futurista',
    tip: 'Em vez de "um homem", tente "um executivo de tecnologia cansado".',
    color: 'blue'
  },
  {
    title: 'A Ação',
    description: 'O que está acontecendo? Descritores de movimento são cruciais para vídeo.',
    icon: Zap,
    example: 'digitando furiosamente em um teclado flutuante de neon',
    tip: 'Use verbos dinâmicos como "correndo", "flutuando", "disparando".',
    color: 'purple'
  },
  {
    title: 'O Cenário',
    description: 'Onde a cena se passa? A iluminação e o ambiente ditam o clima.',
    icon: MapPin,
    example: 'dentro de uma base lunar com vista para a Terra',
    tip: 'Mencione a iluminação: "luz de pôr do sol", "luz de neon azul", "nublado".',
    color: 'emerald'
  },
  {
    title: 'Estilo e Qualidade',
    description: 'Defina a estética visual e a qualidade técnica desejada.',
    icon: Camera,
    example: 'estilo cinematográfico, 4k, cores vibrantes, plano detalhado',
    tip: 'Palavras-chave como "cinematográfico", "hiper-realista" ou "cyberpunk" ajudam muito.',
    color: 'amber'
  }
];

interface PromptTutorialProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyPrompt: (prompt: string) => void;
}

export const PromptTutorial: React.FC<PromptTutorialProps> = ({ isOpen, onClose, onApplyPrompt }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const finalExample = steps.map(s => s.example).join(', ');

  const colorMap: Record<string, { bg: string; text: string; bgSoft: string; accent: string }> = {
    blue: { bg: 'bg-blue-50', text: 'text-blue-600', bgSoft: 'bg-blue-500/5', accent: 'bg-blue-600' },
    purple: { bg: 'bg-purple-50', text: 'text-purple-600', bgSoft: 'bg-purple-500/5', accent: 'bg-purple-600' },
    emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', bgSoft: 'bg-emerald-500/5', accent: 'bg-emerald-600' },
    amber: { bg: 'bg-amber-50', text: 'text-amber-600', bgSoft: 'bg-amber-500/5', accent: 'bg-amber-600' },
  };

  const activeColor = colorMap[steps[currentStep].color] || colorMap.blue;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-lg bg-white rounded-[40px] shadow-2xl overflow-hidden overflow-y-auto max-h-[90vh]"
        >
          {/* Progress Bar */}
          <div className="absolute top-0 left-0 right-0 flex h-1.5 gap-1 p-1 px-4 mt-2">
            {steps.map((_, i) => (
              <div 
                key={i} 
                className={`flex-1 rounded-full transition-all duration-500 ${i <= currentStep ? 'bg-blue-600' : 'bg-slate-100'}`}
              />
            ))}
          </div>

          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 bg-slate-50 rounded-2xl text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-8 pt-12 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className={`p-4 rounded-3xl ${activeColor.bg} ${activeColor.text} shadow-sm`}>
                  {React.createElement(steps[currentStep].icon, { className: 'w-8 h-8' })}
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Passo {currentStep + 1} de {steps.length}</p>
                  <h2 className="text-2xl font-black text-slate-900">{steps[currentStep].title}</h2>
                </div>
              </div>
              <p className="text-slate-600 font-medium leading-relaxed">
                {steps[currentStep].description}
              </p>
            </div>

            <div className={`bg-slate-50 border border-slate-100 rounded-3xl p-6 relative overflow-hidden`}>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Exemplo</p>
              <p className="text-slate-900 font-bold italic relative z-10">"{steps[currentStep].example}"</p>
              <div className={`absolute -right-4 -bottom-4 w-24 h-24 ${activeColor.bgSoft} rounded-full blur-2xl`} />
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-3xl p-6 flex items-start gap-4">
              <Sparkles className="w-5 h-5 text-blue-600 shrink-0 mt-1" />
              <div>
                <p className="text-blue-600 text-[10px] font-black uppercase tracking-widest mb-1">Dica de Pro</p>
                <p className="text-blue-900 text-xs font-bold leading-relaxed">{steps[currentStep].tip}</p>
              </div>
            </div>

            {currentStep === steps.length - 1 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 bg-slate-900 rounded-[32px] text-white space-y-3"
              >
                <p className="text-[10px] font-black uppercase tracking-widest text-blue-400">Resultado Final do Tutorial</p>
                <p className="text-sm font-medium italic text-slate-300 leading-relaxed">
                  "{finalExample}"
                </p>
              </motion.div>
            )}

            <div className="flex items-center gap-3 pt-4">
              {currentStep > 0 && (
                <button
                  onClick={handlePrev}
                  className="p-4 rounded-2xl border border-slate-200 text-slate-400 hover:bg-slate-50 transition-all"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}
              
              {currentStep < steps.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="flex-1 bg-slate-900 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 shadow-xl shadow-slate-200 active:scale-[0.98] transition-all"
                >
                  Próximo Passo
                  <ChevronRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={() => {
                    onApplyPrompt(finalExample);
                    onClose();
                  }}
                  className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 shadow-xl shadow-blue-200 active:scale-[0.98] transition-all"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  Usar este exemplo
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
