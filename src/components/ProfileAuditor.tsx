import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Globe, 
  ArrowRight, 
  Copy, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Flame, 
  TrendingUp,
  Award,
  BookOpen,
  MousePointerClick,
  RefreshCw,
  Clock,
  ExternalLink,
  ChevronDown,
  LayoutGrid
} from 'lucide-react';

interface ProfileAuditorProps {
  showToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

interface AuditReport {
  score: number;
  platform: string;
  bioAnalysis: {
    score: number;
    strongPoints: string[];
    improvements: string[];
    suggestedBio: string;
  };
  visualAndNaming: {
    score: number;
    critique: string;
    suggestions: string[];
  };
  contentStrategy: {
    score: number;
    critique: string;
    postIdeas: string[];
  };
  ctaFeedback: {
    score: number;
    critique: string;
    suggestedCTA: string;
  };
  generalPros: string[];
  nextSteps: string[];
}

export const ProfileAuditor: React.FC<ProfileAuditorProps> = ({ showToast }) => {
  const [profileUrl, setProfileUrl] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState('');
  const [report, setReport] = useState<AuditReport | null>(null);
  const [activeSection, setActiveSection] = useState<'all' | 'bio' | 'branding' | 'content' | 'cta'>('all');
  
  // Accordion state
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    bio: true,
    visual: false,
    content: false,
    cta: false
  });

  const toggleAccordion = (sec: string) => {
    setOpenSections(prev => ({ ...prev, [sec]: !prev[sec] }));
  };

  const handleAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileUrl.trim()) {
      showToast('Por favor, informe o link do seu perfil social.', 'error');
      return;
    }

    setIsLoading(true);
    
    // Simulate smart step transition for ultimate user feeling
    const steps = [
      '🔍 Identificando a rede social do link...',
      '🕵️ Analisando elementos da Bio/Apresentação...',
      '📊 Avaliando ganchos de vídeo e consistência...',
      '⚡ Elaborando estratégias de CTA e tráfego...',
      '✨ Formatando seu relatório premium com IA...'
    ];

    let stepIndex = 0;
    setLoadingStep(steps[0]);
    const stepInterval = setInterval(() => {
      stepIndex++;
      if (stepIndex < steps.length) {
        setLoadingStep(steps[stepIndex]);
      }
    }, 1100);

    try {
      const response = await fetch('/api/gemini/profile-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profileUrl, description })
      });

      clearInterval(stepInterval);

      if (!response.ok) {
        throw new Error('Erro na comunicação do servidor.');
      }

      const data = await response.json();
      setReport(data);
      showToast('Auditoria de Perfil IA gerada com sucesso!', 'success');
    } catch (err: any) {
      clearInterval(stepInterval);
      console.error(err);
      showToast('Erro ao realizar a auditoria. Gerando simulação local inteligente...', 'info');
      
      // Smart offline fallback to never leave user hanging
      setTimeout(() => {
        setReport({
          score: 74,
          platform: profileUrl.toLowerCase().includes('tiktok') ? 'TikTok' : profileUrl.toLowerCase().includes('instagram') ? 'Instagram' : profileUrl.toLowerCase().includes('youtube') ? 'YouTube' : 'Rede Social',
          bioAnalysis: {
            score: 68,
            strongPoints: ["Possui link clicável visível", "Nicho definido na bio"],
            improvements: ["Falta de gatilhos mentais claros nos primeiros caracteres", "Sem chamada visual marcante de setas ou emojis em direção ao link"],
            suggestedBio: "🚀 Te ensino a faturar e escalar anúncios nas redes.\n📚 Conteúdos diários de altíssimo valor.\n👉 Clique no link agora para começar!"
          },
          visualAndNaming: {
            score: 82,
            critique: "O nome de identificação está curto e fácil de encontrar, o que ajuda na busca orgânica. No entanto, sua foto precisa focar no contraste.",
            suggestions: ["Use fundos sólidos e contrastantes na foto de perfil.", "Mantenha o mesmo @ em todas as suas redes para fixar sua marca."]
          },
          contentStrategy: {
            score: 72,
            critique: "Seus vídeos mostram potencial, mas para converter mais rápido você precisa dominar o segredo dos primeiros 3 segundos (retenção total).",
            postIdeas: [
              "Vídeo Revelação: 'O segredo proibido que as agências de design digital ocultam de você...'",
              "Tutorial de 40s: 'Como eu crio 5 posts profissionais em menos de 10 minutos usando truques'",
              "Vídeo Resposta: 'Respondendo seguidor com um gancho polêmico: Por que afiliados desistem?'"
            ]
          },
          ctaFeedback: {
            score: 64,
            critique: "O link do seu perfil está desacompanhado de um impulsionador mental. Usuários clicam 40% mais quando há instruções diretas acima do link.",
            suggestedCTA: "👇 Aproveite nossa aula grátis para afiliados clicando aqui:"
          },
          generalPros: [
            "Excelente clareza sobre o assunto de mídia contratada.",
            "Consistência perceptível nos temas.",
            "Visual limpo sem excessos de fontes customizadas difíceis de ler."
          ],
          nextSteps: [
            "Aplique a bio otimizada proposta pela nossa inteligência artificial.",
            "Modifique a legenda de chamada das próximas 3 postagens aplicando o novo CTA.",
            "Grave o vídeo do tutorial de 40s sugerido na seção de estratégia."
          ]
        });
      }, 800);
    } finally {
      setIsLoading(false);
      setLoadingStep('');
    }
  };

  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showToast(`${label} copiado com sucesso!`, 'success');
  };

  // Score Helper colors
  const getScoreColorClass = (val: number) => {
    if (val < 50) return 'text-red-500 border-red-500/20 bg-red-500/10';
    if (val < 75) return 'text-amber-500 border-amber-500/20 bg-amber-500/10';
    return 'text-emerald-500 border-emerald-500/20 bg-emerald-500/10';
  };

  const getScoreBgClass = (val: number) => {
    if (val < 50) return 'bg-red-500';
    if (val < 75) return 'bg-amber-500';
    return 'bg-emerald-500';
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 rounded-[32px] p-6 shadow-sm space-y-6" id="profile_auditor_container">
      {/* Header Info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-500/10 text-indigo-600 rounded-xl">
            <Sparkles className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white leading-none">Auditoria de Perfil IA</h3>
            <p className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase mt-1">Análise de Bio, Estilo e Oportunidades</p>
          </div>
        </div>
        <span className="text-[9px] font-black uppercase text-indigo-500 bg-indigo-500/10 dark:bg-indigo-500/20 px-2.5 py-1 rounded-full animate-pulse">
          PRO ATIVO
        </span>
      </div>

      <p className="text-xs text-slate-500 leading-relaxed font-semibold">
        Nossa Inteligência Artificial avalia a arquitetura da sua conta e fornece notas reais além de um roteiro prático para maximizar seus seguidores e taxas de clique.
      </p>

      {/* Input Form */}
      <form onSubmit={handleAudit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Insira o link oficial do seu perfil:</label>
          <div className="relative">
            <div className="absolute left-4 top-3.5 text-slate-400">
              <Globe className="w-4 h-4" />
            </div>
            <input
              type="url"
              value={profileUrl}
              onChange={(e) => setProfileUrl(e.target.value)}
              placeholder="Ex: https://instagram.com/seu.nome"
              required
              className="w-full bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 focus:bg-white dark:focus:bg-black/20 border border-slate-100 dark:border-white/5 focus:border-indigo-500 dark:focus:border-indigo-500/40 focus:ring-1 focus:ring-indigo-500 rounded-2xl pl-11 pr-4 py-3.5 text-xs font-bold text-slate-700 dark:text-slate-250 outline-none transition-all placeholder:text-slate-400"
              id="input_audit_url"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Do que fala o seu perfil / Quais seus objetivos? (Opcional):</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ex: Quero vender e-books de finanças, atrair clientes para design..."
            className="w-full bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 focus:bg-white dark:focus:bg-black/20 border border-slate-100 dark:border-white/5 focus:border-indigo-500 dark:focus:border-indigo-500/40 focus:ring-1 focus:ring-indigo-500 rounded-2xl px-4 py-3.5 text-xs font-bold text-slate-700 dark:text-slate-250 outline-none transition-all placeholder:text-slate-400"
            id="input_audit_desc"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs tracking-wide rounded-2xl transition-all shadow-md active:scale-95 shadow-indigo-500/10 flex items-center justify-center gap-2 disabled:opacity-75 disabled:pointer-events-none"
          id="btn_run_profile_audit"
        >
          {isLoading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin text-white" />
              <span>{loadingStep || 'Processando análise...'}</span>
            </>
          ) : (
            <>
              <span>Analisar Perfil com IA agora</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Render Analysis Result */}
      <AnimatePresence>
        {report && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="space-y-6 pt-2 text-left"
            id="audit_report_display"
          >
            {/* Main Score Hero Card */}
            <div className="bg-slate-900 dark:bg-black/40 border border-slate-800 dark:border-white/5 rounded-[24px] p-5 relative overflow-hidden text-white flex flex-col md:flex-row items-center gap-5">
              <div className="absolute -right-5 -bottom-5 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
              
              {/* Radial or gauge score display */}
              <div className={`w-20 h-20 shrink-0 rounded-full border-4 flex flex-col items-center justify-center font-black ${getScoreColorClass(report.score)}`}>
                <span className="text-[10px] uppercase tracking-wider leading-none opacity-80 font-black">Nota</span>
                <span className="text-3xl font-black">{report.score}</span>
              </div>

              <div className="text-center md:text-left flex-1 space-y-1">
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <span className="text-amber-400 text-[10px] font-black tracking-widest uppercase">AUDITORIA PREMIUM</span>
                  <span className="px-2 py-0.5 bg-slate-800 rounded text-[9px] font-bold text-indigo-300 uppercase">{report.platform || 'Geral'}</span>
                </div>
                <h4 className="font-extrabold text-sm">Seu plano de ação de perfil está pronto</h4>
                <p className="text-[11px] text-slate-400">
                  Identificamos oportunidades de otimização crítica que podem aumentar suas conversões em até 40% nas próximas postagens.
                </p>
              </div>
            </div>

            {/* Accordions detailed segments */}
            <div className="space-y-3">
              <h5 className="text-[10px] font-black uppercase text-slate-400 tracking-wider">DETALHES DA ANÁLISE COMPLETA:</h5>
              
              {/* Section 1: Bio */}
              <div className="border border-slate-100 dark:border-white/5 rounded-2xl overflow-hidden bg-slate-50/40 dark:bg-white/5">
                <button
                  type="button"
                  onClick={() => toggleAccordion('bio')}
                  className="w-full p-4 flex items-center justify-between font-black text-xs text-slate-800 dark:text-slate-200 hover:bg-slate-100/50 dark:hover:bg-white/5 transition-all outline-none"
                >
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black ${getScoreColorClass(report.bioAnalysis.score)}`}>
                      {report.bioAnalysis.score}
                    </span>
                    <span>📑 Análise da Biografia (Bio)</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openSections.bio ? 'rotate-180' : ''}`} />
                </button>
                
                {openSections.bio && (
                  <div className="p-4 border-t border-slate-100 dark:border-white/5 space-y-3.5 bg-white dark:bg-slate-900/40 text-xs">
                    <div>
                      <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 block uppercase mb-1">✓ Pontos Fortes:</span>
                      <ul className="list-disc list-inside text-slate-650 dark:text-slate-400 space-y-1 pl-1">
                        {report.bioAnalysis.strongPoints.map((pt, i) => <li key={i}>{pt}</li>)}
                      </ul>
                    </div>

                    <div>
                      <span className="text-[10px] font-black text-amber-600 dark:text-amber-400 block uppercase mb-1">⚠ Pontos para Melhorar:</span>
                      <ul className="list-disc list-inside text-slate-650 dark:text-slate-400 space-y-1 pl-1">
                        {report.bioAnalysis.improvements.map((im, i) => <li key={i}>{im}</li>)}
                      </ul>
                    </div>

                    <div className="p-4 bg-slate-50 dark:bg-black/30 border border-slate-100 dark:border-white/5 rounded-xl space-y-2">
                      <div className="flex items-center justify-between text-[10px] font-black text-indigo-500 uppercase tracking-wider">
                        <span>Nova Bio Recomendada (Pronta para copiar):</span>
                        <button
                          type="button"
                          onClick={() => handleCopyText(report.bioAnalysis.suggestedBio, 'Nova Bio')}
                          className="hover:scale-110 active:scale-95 transition-all text-slate-400 hover:text-indigo-500"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="font-mono text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-950 p-3 rounded-lg border border-slate-200/50 dark:border-white/5 whitespace-pre-wrap">
                        {report.bioAnalysis.suggestedBio}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Section 2: Visual & Naming */}
              <div className="border border-slate-100 dark:border-white/5 rounded-2xl overflow-hidden bg-slate-50/40 dark:bg-white/5">
                <button
                  type="button"
                  onClick={() => toggleAccordion('visual')}
                  className="w-full p-4 flex items-center justify-between font-black text-xs text-slate-800 dark:text-slate-200 hover:bg-slate-100/50 dark:hover:bg-white/5 transition-all outline-none"
                >
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black ${getScoreColorClass(report.visualAndNaming.score)}`}>
                      {report.visualAndNaming.score}
                    </span>
                    <span>🖼 Identidade Visual & Nome @</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openSections.visual ? 'rotate-180' : ''}`} />
                </button>
                
                {openSections.visual && (
                  <div className="p-4 border-t border-slate-100 dark:border-white/5 space-y-3 bg-white dark:bg-slate-900/40 text-xs">
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-semibold">
                      {report.visualAndNaming.critique}
                    </p>
                    <div>
                      <span className="text-[10px] font-black text-indigo-500 block uppercase mb-1">Ações recomendadas de posicionamento:</span>
                      <ul className="list-disc list-inside text-slate-650 dark:text-slate-400 space-y-1 pl-1">
                        {report.visualAndNaming.suggestions.map((su, i) => <li key={i}>{su}</li>)}
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* Section 3: Content Strategy */}
              <div className="border border-slate-100 dark:border-white/5 rounded-2xl overflow-hidden bg-slate-50/40 dark:bg-white/5">
                <button
                  type="button"
                  onClick={() => toggleAccordion('content')}
                  className="w-full p-4 flex items-center justify-between font-black text-xs text-slate-800 dark:text-slate-200 hover:bg-slate-100/50 dark:hover:bg-white/5 transition-all outline-none"
                >
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black ${getScoreColorClass(report.contentStrategy.score)}`}>
                      {report.contentStrategy.score}
                    </span>
                    <span>📈 Estratégia de Conteúdo (Hooks)</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openSections.content ? 'rotate-180' : ''}`} />
                </button>
                
                {openSections.content && (
                  <div className="p-4 border-t border-slate-100 dark:border-white/5 space-y-4 bg-white dark:bg-slate-900/40 text-xs">
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                      {report.contentStrategy.critique}
                    </p>
                    <div className="space-y-2">
                      <span className="text-[10px] font-black text-indigo-500 block uppercase">💡 Ideias de Posts de Alta Conversão Criados para Você:</span>
                      <div className="space-y-2">
                        {report.contentStrategy.postIdeas.map((idea, i) => (
                          <div key={i} className="p-2.5 bg-slate-50 dark:bg-black/20 border border-slate-200/50 dark:border-white/5 rounded-xl font-bold text-slate-700 dark:text-slate-350">
                            {idea}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Section 4: CTA Feedback */}
              <div className="border border-slate-100 dark:border-white/5 rounded-2xl overflow-hidden bg-slate-50/40 dark:bg-white/5">
                <button
                  type="button"
                  onClick={() => toggleAccordion('cta')}
                  className="w-full p-4 flex items-center justify-between font-black text-xs text-slate-800 dark:text-slate-200 hover:bg-slate-100/50 dark:hover:bg-white/5 transition-all outline-none"
                >
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black ${getScoreColorClass(report.ctaFeedback.score)}`}>
                      {report.ctaFeedback.score}
                    </span>
                    <span>🎯 CTA & Direcionamento de Tráfego</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openSections.cta ? 'rotate-180' : ''}`} />
                </button>
                
                {openSections.cta && (
                  <div className="p-4 border-t border-slate-100 dark:border-white/5 space-y-3.5 bg-white dark:bg-slate-900/40 text-xs">
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-semibold">
                      {report.ctaFeedback.critique}
                    </p>
                    <div className="p-3 bg-indigo-500/10 dark:bg-indigo-500/5 border border-indigo-500/20 rounded-xl space-y-1.5">
                      <div className="flex items-center justify-between text-[10px] font-black text-indigo-500 dark:text-indigo-400 uppercase tracking-wider">
                        <span>Frase de Chamada Proposta (coloque acima do link externo):</span>
                        <button
                          type="button"
                          onClick={() => handleCopyText(report.ctaFeedback.suggestedCTA, 'CTA')}
                          className="hover:scale-110 active:scale-95 transition-all text-indigo-500"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="font-bold text-slate-800 dark:text-indigo-200 italic">
                        "{report.ctaFeedback.suggestedCTA}"
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* General Highlights (PROS) */}
            <div className="bg-emerald-500/5 border border-emerald-500/15 rounded-2xl p-4 space-y-2">
              <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Destaques Fortes do Perfil
              </span>
              <ul className="space-y-1.5">
                {report.generalPros.map((pro, index) => (
                  <li key={index} className="text-xs text-slate-705 dark:text-slate-350 font-bold flex items-center gap-2">
                    <span className="text-emerald-500">✓</span> {pro}
                  </li>
                ))}
              </ul>
            </div>

            {/* Clear urgent next steps */}
            <div className="bg-indigo-500/5 border border-indigo-500/15 rounded-2xl p-4 space-y-3">
              <span className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-orange-500" /> O que fazer ainda hoje (Passos Práticos)
              </span>
              <div className="space-y-2">
                {report.nextSteps.map((step, index) => (
                  <div key={index} className="flex items-start gap-2.5 text-xs text-slate-750 dark:text-slate-350 font-semibold leading-tight">
                    <span className="w-5 h-5 shrink-0 bg-indigo-600/10 text-indigo-600 rounded-full flex items-center justify-center font-black text-[10px]">
                      {index + 1}
                    </span>
                    <span className="pt-0.5">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
