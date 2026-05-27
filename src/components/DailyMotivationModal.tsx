import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Flame, 
  CheckCircle2, 
  Sparkles, 
  X, 
  Calendar, 
  TrendingUp, 
  Share2, 
  MessageSquare, 
  Zap, 
  Clock, 
  Award,
  HelpCircle,
  Volume2
} from 'lucide-react';

interface DailyMotivationModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
}

const MOTIVATIONAL_PHRASES = [
  "O sucesso digital não acontece da noite para o dia, mas sim acumulando vídeos diários consistentes.",
  "Atenção é a nova moeda global. Quem domina os primeiros 3 segundos de vídeo domina o mercado.",
  "Não espere o momento perfeito para começar, faça o começo se tornar perfeito.",
  "O algoritmo recompensa quem mantém o usuário engajado. Foque em entregar valor real.",
  "Seu celular é uma máquina de fazer dinheiro, desde que você pare de apenas consumir e passe a produzir.",
  "A consistência silenciosa gera resultados barulhentos. Continue postando!",
  "Existe uma versão sua no futuro olhando para este momento e agradecendo por você não ter desistido agora.",
  "Toda nova fase parece confusa no início. Cair faz parte do aprendizado. O segredo é continuar tentando.",
  "O flyer simples ou vídeo modesto de hoje treina seu olhar e sua criatividade para as grandes oportunidades de amanhã.",
  "Não se compare com o nível 100 de alguém que já começou há anos. Seu compromisso é ser apenas 1% melhor do que você mesmo ontem."
];

export const DailyMotivationModal: React.FC<DailyMotivationModalProps> = ({ isOpen, onClose, userName }) => {
  const [quote, setQuote] = useState("");
  const [todos, setTodos] = useState<{ id: string; text: string; done: boolean }[]>(() => {
    const saved = localStorage.getItem('daily_checkbox_todos');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      { id: 'script', text: 'Escrever Roteiro de Vídeo (com gancho forte nos 3s)', done: false },
      { id: 'edit', text: 'Editar Vídeo Curto / Post de Canva com Capricho', done: false },
      { id: 'post', text: 'Postar nas Redes (Tiktok, Reels ou Facebook)', done: false },
      { id: 'prospect', text: 'Enviar 1 Mensagem de Prospecção ou Postar Portfólio', done: false },
      { id: 'learn', text: 'Estudar 15 min do Aplicativo ou Novas Dicas', done: false }
    ];
  });

  const [focusText, setFocusText] = useState(() => {
    return localStorage.getItem('daily_focus_goal') || "";
  });

  const [streak, setStreak] = useState<number>(() => {
    const value = localStorage.getItem('daily_login_streak_count');
    return value ? parseInt(value) : 1;
  });

  // Load random quote on open
  useEffect(() => {
    if (isOpen) {
      const rand = MOTIVATIONAL_PHRASES[Math.floor(Math.random() * MOTIVATIONAL_PHRASES.length)];
      setQuote(rand);

      // Manage/increment streak safely
      const todayStr = new Date().toDateString();
      const lastCheckIn = localStorage.getItem('last_daily_login_date');
      if (lastCheckIn !== todayStr) {
        let currentStreak = streak;
        if (lastCheckIn) {
          const lastDate = new Date(lastCheckIn);
          const diffTime = Math.abs(new Date().getTime() - lastDate.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          
          if (diffDays === 1) {
            currentStreak += 1;
          } else if (diffDays > 1) {
            currentStreak = 1; // Reset streak if missed more than 1 day
          }
        } else {
          currentStreak = 1;
        }
        setStreak(currentStreak);
        localStorage.setItem('daily_login_streak_count', currentStreak.toString());
        localStorage.setItem('last_daily_login_date', todayStr);
      }
    }
  }, [isOpen]);

  // Save todos whenever modified
  const handleToggleTodo = (id: string) => {
    const updated = todos.map(t => t.id === id ? { ...t, done: !t.done } : t);
    setTodos(updated);
    localStorage.setItem('daily_checkbox_todos', JSON.stringify(updated));
  };

  // Save personal focus/note goal
  const handleFocusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const txt = e.target.value;
    setFocusText(txt);
    localStorage.setItem('daily_focus_goal', txt);
  };

  const completedCount = todos.filter(t => t.done).length;
  const progressPercent = Math.round((completedCount / todos.length) * 100);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark Glass Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md"
            onClick={onClose}
            id="daily_motivation_backdrop"
          />

          {/* Modal Centered Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-[32px] overflow-hidden shadow-2xl relative flex flex-col max-h-[85vh] text-white"
              id="daily_motivation_modal_body"
            >
              {/* Glowing Top Lighting */}
              <div className="absolute top-0 right-0 w-60 h-60 bg-gradient-to-tr from-amber-500/10 to-orange-500/10 rounded-full blur-[80px] pointer-events-none" />
              <div className="absolute top-0 left-0 w-60 h-60 bg-gradient-to-tr from-blue-500/10 to-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />

              {/* Header */}
              <div className="p-6 shrink-0 relative border-b border-slate-800">
                <button
                  onClick={onClose}
                  className="absolute right-4 top-4 p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full transition-all active:scale-95"
                  id="daily_motivation_close_btn"
                >
                  <X className="w-4 h-4" />
                </button>
                
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-gradient-to-tr from-amber-500 to-orange-500 rounded-2xl shadow-lg shadow-orange-500/20">
                    <Flame className="w-5 h-5 text-white animate-pulse" />
                  </div>
                  <div>
                    <span className="text-[10px] text-amber-400 font-extrabold tracking-widest uppercase">CHECK-IN DIÁRIO</span>
                    <h3 className="font-extrabold text-base text-white leading-tight">
                      Olá, {userName || "Investidor"}!
                    </h3>
                  </div>
                </div>

                {/* Daily Streak Indicator */}
                <div className="mt-4 flex items-center justify-between bg-white/5 border border-white/5 p-3 rounded-2xl">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-400" />
                    <span className="text-xs text-slate-300 font-bold">Aproveite para faturar hoje</span>
                  </div>
                  <div className="flex items-center gap-1 bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full text-xs font-black">
                    <Flame className="w-3.5 h-3.5" />
                    <span>{streak} {streak === 1 ? 'Dia' : 'Dias'} Seguidos</span>
                  </div>
                </div>
              </div>

              {/* Scrollable Body */}
              <div className="p-6 overflow-y-auto no-scrollbar space-y-6 flex-1 text-left">
                
                {/* Random motivational quote */}
                <div className="bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800 rounded-2xl p-4 relative overflow-hidden shadow-inner">
                  <div className="absolute -right-2 -top-2 text-slate-800 font-black text-6xl italic leading-none pointer-events-none opacity-40">“</div>
                  <p className="text-slate-300 text-xs leading-relaxed font-bold italic tracking-wide relative z-10">
                    {quote || "A consistência supera a perfeição. Faça seu melhor hoje e o algoritmo responderá."}
                  </p>
                  <div className="mt-2.5 flex items-center gap-1.5 text-[10px] text-amber-400 font-bold uppercase tracking-widest">
                    <Sparkles className="w-3 h-3" />
                    <span>Mindset Indomável</span>
                  </div>
                </div>

                {/* Personal main Focus for today */}
                <div className="space-y-2">
                  <label className="text-[11px] text-slate-400 font-extrabold tracking-widest uppercase block">
                    🎯 Qual é o seu foco principal de hoje?
                  </label>
                  <input
                    type="text"
                    value={focusText}
                    onChange={handleFocusChange}
                    placeholder="Ex: Mandar 5 mensagens / Enviar vídeo novo"
                    className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-2xl px-4 py-3 text-slate-200 text-xs font-bold transition-all placeholder:text-slate-600 outline-none"
                  />
                </div>

                {/* "Já Postou Hoje" Interactive Checklist */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-[11px] text-slate-300 font-black tracking-widest uppercase">
                        🎥 JÁ POSTOU HOJE?
                      </h4>
                      <p className="text-[10px] text-slate-400">Marque as ações concluídas hoje:</p>
                    </div>
                    <span className="text-[11px] font-black bg-blue-500/10 text-blue-400 px-2.5 py-1 rounded-full">
                      {progressPercent}%
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercent}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>

                  {/* Checklist items */}
                  <div className="space-y-2.5 pt-1">
                    {todos.map((todo) => (
                      <button
                        key={todo.id}
                        onClick={() => handleToggleTodo(todo.id)}
                        className={`w-full p-3.5 rounded-2xl border text-left flex items-start gap-3 transition-all ${
                          todo.done 
                            ? 'bg-blue-950/20 border-blue-900/40 text-blue-200' 
                            : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
                        }`}
                        id={`checkin_item_${todo.id}`}
                      >
                        <div className={`p-0.5 rounded-lg border shrink-0 mt-0.5 transition-all ${
                          todo.done 
                            ? 'bg-blue-600 border-blue-500 text-white' 
                            : 'border-slate-700 text-transparent'
                        }`}>
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <span className={`text-xs font-semibold leading-tight ${todo.done ? 'line-through text-slate-400' : ''}`}>
                          {todo.text}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Pro Tip Callout */}
                <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-2xl flex items-start gap-3">
                  <Zap className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-extrabold text-xs text-indigo-300 leading-none">Dica de Crescimento Orgânico</h5>
                    <p className="text-[11px] text-slate-400 leading-normal font-medium mt-1">
                      O algoritmo de vídeos curtos valoriza a velocidade média de retenção. Faça com que seu conteúdo tenha legendas nítidas e cortes dinâmicos.
                    </p>
                  </div>
                </div>

              </div>

              {/* Footer Button to dismiss checkin */}
              <div className="p-6 bg-slate-950 border-t border-slate-850 shrink-0">
                <button
                  onClick={onClose}
                  className="w-full py-3.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:brightness-110 active:scale-[0.98] text-white font-black text-xs rounded-2xl transition-all shadow-lg"
                  id="daily_checkin_confirm_btn"
                >
                  Confirmar Progresso e Continuar
                </button>
              </div>

            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
