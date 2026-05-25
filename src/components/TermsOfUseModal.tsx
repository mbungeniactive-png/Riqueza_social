import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, Check } from 'lucide-react';

interface TermsOfUseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsOfUseModal: React.FC<TermsOfUseModalProps> = ({ isOpen, onClose }) => {
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
            id="terms_backdrop"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 rounded-[32px] overflow-hidden shadow-2xl relative flex flex-col max-h-[85vh]"
              id="terms_modal_body"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-teal-600 via-emerald-600 to-green-600 p-6 text-white shrink-0 relative">
                <button
                  onClick={onClose}
                  className="absolute right-4 top-4 p-1.5 bg-white/20 hover:bg-white/30 text-white rounded-full transition-all active:scale-95"
                  id="terms_close_btn"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-3">
                  <div className="bg-white/15 p-2 rounded-xl">
                    <ShieldCheck className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-black text-lg tracking-tight text-white leading-tight">
                      Termos de Uso
                    </h3>
                    <p className="text-teal-100/90 text-[10px] font-semibold tracking-wider uppercase">Políticas MoneyNet Ai</p>
                  </div>
                </div>
              </div>

              {/* Scrollable text */}
              <div className="p-6 overflow-y-auto no-scrollbar space-y-4 text-xs text-slate-600 dark:text-slate-400 leading-relaxed text-left flex-1 select-text">
                <p className="font-bold text-slate-800 dark:text-white">
                  Última atualização: Maio de 2026.
                </p>
                <p>
                  Seja muito bem-vindo ao <strong>MoneyNet Ai</strong>. Ao continuar utilizando nosso aplicativo de aprendizado, você concorda de maneira livre e espontânea com os Termos de Uso aqui apresentados.
                </p>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-800 dark:text-white mb-1">
                      1. Proposta Educativa (Sem Promessas de Ganhos Fáceis)
                    </h4>
                    <p>
                      O MoneyNet Ai é uma plataforma informativa de curadoria de dados e mentoria auxiliada por Inteligência Artificial. Nós compartilhamos roteiros e estratégias de marketing de afiliados, monetização e tráfego orgânico. Seus resultados dependem unicamente da sua disciplina, dedicação e aplicação prática das estratégias expostas. Não garantimos rentabilidade automática.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-extrabold text-sm text-slate-800 dark:text-white mb-1">
                      2. Ferramentas e Links de Terceiros
                    </h4>
                    <p>
                      Para auxiliar os estudos, podemos indicar ferramentas externas ou links de parceiros afiliados (tais como Kiwify, Udemy, Amazon). Note que estas plataformas possuem seus próprios termos de conduta, taxas e regras de privacidade. O MoneyNet Ai não se responsabiliza por acordos ou problemas gerados em sites de terceiros.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-extrabold text-sm text-slate-800 dark:text-white mb-1">
                      3. Modelo Base e Mentor IA
                    </h4>
                    <p>
                      Nosso Mentor IA auxilia na ideação lógica e brainstorming de criação de vídeos. Todas as ideias geradas devem ser validadas pelo bom senso do próprio estudante. Fica proibida a geração ou envio de conteúdos ofensivos por meio da caixa de diálogo do Mentor.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-extrabold text-sm text-slate-800 dark:text-white mb-1">
                      4. Modificações nos Termos
                    </h4>
                    <p>
                      Reservamo-nos o direito de calibrar e atualizar estas regras sempre que novas tendências exigirem no ecossistema digital. O uso contínuo manifestará sua aceitação.
                    </p>
                  </div>
                </div>
              </div>

              {/* Button */}
              <div className="p-6 bg-slate-50 dark:bg-slate-900/40 border-t border-slate-100 dark:border-white/5 shrink-0">
                <button
                  onClick={onClose}
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-black text-xs rounded-2xl transition-all shadow-md shadow-emerald-500/15"
                  id="terms_agree_btn"
                >
                  Entendi & Aceito os Termos
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
