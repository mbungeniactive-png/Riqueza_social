import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Calendar, DollarSign, Sliders, CheckSquare, Copy, ClipboardList, Target, Flame, Lightbulb, Check } from 'lucide-react';
import { ProfileAuditor } from './ProfileAuditor';

interface ToolsPanelProps {
  showToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

export const ToolsPanel: React.FC<ToolsPanelProps> = ({ showToast }) => {
  // Sliders states
  const [calcViews, setCalcViews] = React.useState(25000);
  const [calcCtr, setCalcCtr] = React.useState(3); // CTR in percent
  const [calcConv, setCalcConv] = React.useState(1.5); // Conversion in percent
  const [calcComm, setCalcComm] = React.useState(60); // Value of commission

  // Idea generator states
  const [ideaNiche, setIdeaNiche] = React.useState('financas');
  const [ideaPlatform, setIdeaPlatform] = React.useState('tiktok');
  const [generatedIdea, setGeneratedIdea] = React.useState<any | null>(null);
  const [copiedIdea, setCopiedIdea] = React.useState(false);

  // Checklist state
  const [postingChecklist, setPostingChecklist] = React.useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('weekly_posting_checklist');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const handleToggleChecklist = (day: string, hour: string) => {
    const key = `${day}_${hour}`;
    setPostingChecklist(prev => {
      const copy = { ...prev, [key]: !prev[key] };
      localStorage.setItem('weekly_posting_checklist', JSON.stringify(copy));
      return copy;
    });
  };

  const getCompletedCount = () => {
    return Object.values(postingChecklist).filter(Boolean).length;
  };

  const handleGenerateIdea = () => {
    const templates: Record<string, Record<string, { hook: string, description: string, cta: string, tag: string }>> = {
      financas: {
        tiktok: {
          hook: "Se você quer sair do zero, pare de economizar cafezinho e faça as 3 coisas que este site secreto ensina...",
          description: "Abra a tela de um site freelancing na gringa, mostre vagas pagando $25/hora por tarefas simples como digitação de resumos, e ensine como automatizar com IA grátis.",
          cta: "Comente 'SECRETO' que te envio o link de início do tutorial gratuitamente nos directs.",
          tag: "#financas #ganhardinheiro #rendaextra #trabalhoremoto"
        },
        reels: {
          hook: "Este é o maior segredo que os bancos não querem que você descubra sobre poupar dinheiro...",
          description: "Apresente uma conta digital com rendimentos de 110% do CDI, faça a simulação de quanto renderia R$ 5.000,00 nos próximos 12 meses, e compare com a poupança tradicional.",
          cta: "Toque no link da minha bio e confira o guia completo passo a passo.",
          tag: "#investimentos #financas #poupardinheiro #reelsviral"
        },
        shorts: {
          hook: "Os 3 cartões de crédito mais fáceis de aprovar com limite alto em 2026!",
          description: "Faça um corte rápido, listando 3 opções de cartões sem anuidade atuais, destaque o benefício de cada um e qual aceita pontuação diretamente.",
          cta: "Confira a lista completa de solicitação imediata no primeiro comentário fixado.",
          tag: "#cartao #limitealto #cartaodecredito #shorts"
        }
      },
      decoracao: {
        tiktok: {
          hook: "Parar de morar em casa simples sem graça! Fiz este quarto de hotel chique gastando R$ 150 no site chinês...",
          description: "Mostre fitas de LED de alta qualidade compradas baratinhas, colagens estéticas de quadros sem furos e capas de almofada de veludo combinando.",
          cta: "Comente 'EU QUERO' para receber os links diretos de compra sem taxas.",
          tag: "#achadinhos #decoracao #quartoestetico #casa"
        },
        reels: {
          hook: "3 Erros que você comete na decoração da sua sala que fazem ela parecer menor!",
          description: "Ensine por que usar cortina arrastando no chão, sofá encostado diretamente na porta, e tapete pequeno demais diminuem os espaços.",
          cta: "Inscreva-se em nosso canal e salve este post de dicas domésticas.",
          tag: "#sala #decorar #casapequena #reelsdecor"
        },
        shorts: {
          hook: "Transformei este canto vazio da minha varanda em um escritório de luxo!",
          description: "Sequência acelerada de montagem de mesa suspensa dobrável, planta artificial realista, e suporte articulado de celular inteligente.",
          cta: "Links imperdíveis de frete grátis fixados no comentário abaixo.",
          tag: "#escritorio #varanda #transformação #shorts"
        }
      },
      curiosidades: {
        tiktok: {
          hook: "As 3 descobertas arqueológicas mais assustadoras do fundo do mar que a ciência não consegue explicar...",
          description: "Use imagens realistas geradas com IA sobre ruínas marinhas e fale em tom suspenso sobre a anomalia de Antikythera.",
          cta: "Compartilhe este vídeo com o seu segundo amigo do WhatsApp.",
          tag: "#curioso #misterio #fatoscuriosos #mar"
        },
        reels: {
          hook: "Você sabia? Se você colocar seu dedo neste local do seu telefone por 3 segundos aconteceu isso...",
          description: "Apresente segredos escondidos e configurações ocultas de privacidade no sistema operacional para acelerar as conexões de rede.",
          cta: "Me siga para receber hacks e truques diários de tecnologia.",
          tag: "#hacks #tecnologia #truques #reels"
        },
        shorts: {
          hook: "A IA recriou o rosto dos imperadores romanos mais cruéis da história!",
          description: "Mostre fotos estáticas em alta de retratos de busto de Júlio César, Nero e Calígula e compare com a projeção realista tridimensional.",
          cta: "Inscreva-se para mais resumos históricos incríveis.",
          tag: "#historia #roma #imperador #ia"
        }
      }
    };

    const nicheData = templates[ideaNiche] || templates['financas'];
    const selected = nicheData[ideaPlatform] || nicheData['tiktok'];
    setGeneratedIdea(selected);
    showToast('Ideia gerada com sucesso!', 'success');
  };

  const handleCopyIdea = () => {
    if (!generatedIdea) return;
    const text = `🔥 IDEIA VIRAL MONEYNET AI 🔥\n\n🎯 GANCHO: "${generatedIdea.hook}"\n\n🎬 CENA/ROTEIRO: ${generatedIdea.description}\n\n💬 CTA: "${generatedIdea.cta}"\n\n🏷️ HASHTAGS: ${generatedIdea.tag}`;
    navigator.clipboard.writeText(text);
    showToast('Copiado para a área de transferência!', 'success');
    setCopiedIdea(true);
    setTimeout(() => {
      setCopiedIdea(false);
    }, 1500);
  };

  // Funil Calculations
  const calculatedProfit = Math.round(
    calcViews * (calcCtr / 100) * (calcConv / 100) * calcComm
  );

  return (
    <div className="px-6 py-4 space-y-8 text-left" id="tools_panel_container">
      {/* 1. Calculadora de ganhos slider */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 rounded-[32px] p-6 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-500/10 text-emerald-600 rounded-xl">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white leading-none">Simulador de Funil</h3>
            <p className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase mt-1">Ganhos de Afiliado Estimados</p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Views slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-350">
              <span>Visualizações no Vídeo:</span>
              <span className="text-blue-600 dark:text-blue-400 font-black">{(calcViews / 1000).toFixed(0)}k</span>
            </div>
            <input
              type="range"
              min="2000"
              max="150000"
              step="1000"
              value={calcViews}
              onChange={(e) => setCalcViews(Number(e.target.value))}
              className="w-full accent-blue-600"
              id="slider_views"
            />
          </div>

          {/* CTR slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-350">
              <span>Fração que clica no perfil (CTR):</span>
              <span className="text-blue-600 dark:text-blue-400 font-black">{calcCtr.toFixed(1)}%</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="12"
              step="0.5"
              value={calcCtr}
              onChange={(e) => setCalcCtr(Number(e.target.value))}
              className="w-full accent-blue-600"
              id="slider_ctr"
            />
          </div>

          {/* Conversion slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-350">
              <span>Conversão de Vendas na Página:</span>
              <span className="text-blue-600 dark:text-blue-400 font-black">{calcConv.toFixed(1)}%</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="6"
              step="0.1"
              value={calcConv}
              onChange={(e) => setCalcConv(Number(e.target.value))}
              className="w-full accent-blue-600"
              id="slider_conv"
            />
          </div>

          {/* Commission slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-350">
              <span>Valor da sua comissão (R$):</span>
              <span className="text-blue-600 dark:text-blue-400 font-black">R$ {calcComm}</span>
            </div>
            <input
              type="range"
              min="10"
              max="250"
              step="5"
              value={calcComm}
              onChange={(e) => setCalcComm(Number(e.target.value))}
              className="w-full accent-blue-600"
              id="slider_comm"
            />
          </div>
        </div>

        {/* Calculations Result Output */}
        <div className="bg-emerald-50 dark:bg-emerald-500/5 rounded-[24px] border border-emerald-100/30 p-5 flex items-center justify-between shadow-inner">
          <div className="text-left space-y-0.5">
            <p className="text-[10px] uppercase font-black tracking-widest text-emerald-600 dark:text-emerald-400">Total Mensal Estimado:</p>
            <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
              R$ {calculatedProfit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </div>
          <span className="text-2xl animate-spin">🚀</span>
        </div>
      </div>

      {/* 1.5. Auditoria de Perfil IA */}
      <ProfileAuditor showToast={showToast} />

      {/* 2. Gerador de Roteiros e Ideias */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 rounded-[32px] p-6 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-500/10 text-blue-600 rounded-xl">
            <Sparkles className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white leading-none">Gerador de Roteiro Viral</h3>
            <p className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase mt-1">Criação Instantânea de Vídeos</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 shrink-0">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Nicho:</label>
            <select
              value={ideaNiche}
              onChange={(e) => setIdeaNiche(e.target.value)}
              className="w-full p-3 bg-slate-50 dark:bg-white/5 rounded-2xl border-none outline-none font-bold text-xs text-slate-700 dark:text-slate-350 focus:ring-2 focus:ring-blue-500"
            >
              <option value="financas">💰 Finanças & Investimentos</option>
              <option value="decoracao">🏠 Decor & Achadinhos</option>
              <option value="curiosidades">🔮 Fatos & Curiosidades IA</option>
            </select>
          </div>

          <div className="space-y-1.5 col-span-1">
            <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Plataforma:</label>
            <select
              value={ideaPlatform}
              onChange={(e) => setIdeaPlatform(e.target.value)}
              className="w-full p-3 bg-slate-50 dark:bg-white/5 rounded-2xl border-none outline-none font-bold text-xs text-slate-700 dark:text-slate-350 focus:ring-2 focus:ring-blue-500"
            >
              <option value="tiktok">🎵 TikTok</option>
              <option value="reels">🎬 Reels</option>
              <option value="shorts">📺 Shorts</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleGenerateIdea}
          className="w-full py-4.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs tracking-wide rounded-2xl transition-all shadow-md active:scale-95 shadow-blue-500/10"
          id="btn_generate_idea"
        >
          Gerar Novo Roteiro Viral ⚡
        </button>

        <AnimatePresence>
          {generatedIdea && (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-slate-50 dark:bg-white/5 p-5 rounded-2xl border border-slate-100 dark:border-white/5 text-xs text-slate-700 dark:text-slate-350 text-left relative space-y-3.5"
              id="generated_idea_box"
            >
              <div>
                <p className="text-[9px] uppercase font-black tracking-widest text-blue-600 dark:text-blue-400 mb-0.5">Gancho de Entrada (Primeiros 3 Segundos):</p>
                <div className="text-sm font-black text-slate-900 dark:text-white leading-tight">
                  "{generatedIdea.hook}"
                </div>
              </div>

              <div>
                <p className="text-[9px] uppercase font-black tracking-widest text-slate-400 mb-0.5">Descrição da Cena / Roteiro:</p>
                <p className="font-medium leading-relaxed">
                  {generatedIdea.description}
                </p>
              </div>

              <div>
                <p className="text-[9px] uppercase font-black tracking-widest text-emerald-600 dark:text-emerald-400 mb-0.5">Chamada para Ação (CTA):</p>
                <div className="font-bold border-l-2 border-emerald-500 pl-2.5 py-0.5">
                  "{generatedIdea.cta}"
                </div>
              </div>

              <div>
                <p className="text-[9px] uppercase font-black tracking-widest text-slate-400 mb-0.5">Hashtags Recomendadas:</p>
                <p className="font-mono text-[10px] text-indigo-500">
                  {generatedIdea.tag}
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleCopyIdea}
                  className="w-full py-2.5 bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/15 text-slate-800 dark:text-white font-black rounded-lg transition-all text-[11px] flex items-center justify-center gap-1.5"
                  id="btn_copy_generated_idea"
                >
                  {copiedIdea ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  {copiedIdea ? 'Copiado para Área de Transferência!' : 'Copiar Roteiro Prontinho'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 3. Checklist Calendário de Postagens */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 rounded-[32px] p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-500/10 text-indigo-600 rounded-xl">
              <Calendar className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white leading-none">Grade de Postagem</h3>
              <p className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase mt-1">Checklist Semanal Organizado</p>
            </div>
          </div>
          <span className="text-[10px] font-black uppercase text-indigo-600 bg-indigo-600/10 dark:bg-indigo-600/20 px-3 py-1 rounded-full">
            Meta: {getCompletedCount()}/6 Concluídos
          </span>
        </div>

        <p className="text-xs text-slate-500 leading-relaxed font-semibold">
          Especialistas recomendam postar nestas 3 horas chave diariamente: 
          <strong className="text-blue-600 dark:text-blue-400"> 12:00 PM, 15:00 PM, e 18:00 PM</strong>. Marque as ações realizadas abaixo:
        </p>

        <div className="divide-y divide-slate-50 dark:divide-white/5">
          {[
            { key: 'post_almoço', label: '🌞 Vídeo de Almoço (12h)', hour: '12h' },
            { key: 'post_tarde', label: '🌤️ Vídeo de Tarde (15h)', hour: '15h' },
            { key: 'post_noite', label: '🌙 Vídeo de Noite (18h)', hour: '18h' },
          ].map((item) => {
            const isCompletedToday = !!postingChecklist[`today_${item.key}`];
            const isCompletedTomorrow = !!postingChecklist[`tomorrow_${item.key}`];
            return (
              <div key={item.key} className="py-4 flex items-center justify-between" id={`checklist_row_${item.key}`}>
                <span className="font-black text-slate-800 dark:text-slate-200 text-xs">
                  {item.label}
                </span>

                <div className="flex gap-4 shrink-0">
                  {/* Hoje switch */}
                  <button
                    onClick={() => handleToggleChecklist('today', item.key)}
                    className={`px-3 py-1 px-3.5 py-1.5 rounded-xl text-[10px] font-black transition-all ${
                      isCompletedToday 
                        ? 'bg-green-600 text-white shadow-sm' 
                        : 'bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 text-slate-400'
                    }`}
                    id={`btn_chk_today_${item.key}`}
                  >
                    Hoje
                  </button>

                  {/* Amanhã switch */}
                  <button
                    onClick={() => handleToggleChecklist('tomorrow', item.key)}
                    className={`px-3 py-1 px-3.5 py-1.5 rounded-xl text-[10px] font-black transition-all ${
                      isCompletedTomorrow 
                        ? 'bg-blue-600 text-white shadow-sm' 
                        : 'bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 text-slate-400'
                    }`}
                    id={`btn_chk_tomorrow_${item.key}`}
                  >
                    Amanhã
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
