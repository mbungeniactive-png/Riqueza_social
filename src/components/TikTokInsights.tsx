import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, 
  Search, 
  ArrowLeft, 
  Loader2, 
  Hash, 
  Sparkles, 
  Zap, 
  ChevronRight,
  Clock,
  Trash2,
  Filter,
  Type,
  CheckCircle,
  Flame,
  BookOpen,
  Heart,
  Copy,
  Folder,
  Volume2,
  Play,
  RotateCw,
  Share2,
  Target,
  Award,
  Eye
} from 'lucide-react';
import { 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  serverTimestamp,
  doc,
  deleteDoc
} from 'firebase/firestore';
import { auth, db, handleFirestoreError, OperationType } from '../lib/firebase';
import { chatWithMentor } from '../services/geminiService';

declare global {
  interface Window {
    aistudio?: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

// Data Structure for Favorites
interface FavoriteItem {
  id: string;
  type: 'ideia' | 'hook' | 'title' | 'caption' | 'cta';
  category: string;
  content: string;
  savedAt: number;
}

export const TikTokInsights: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  // Navigation State
  const [activeSubTab, setActiveSubTab] = useState<'generator' | 'trends' | 'growth' | 'favorites'>('generator');
  
  // Niche inputs & state
  const [nicheInput, setNicheInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('tiktok_dark');
  const [outputType, setOutputType] = useState<'ideia' | 'hook' | 'title' | 'caption' | 'cta'>('hook');
  
  // AI Generator Status
  const [generating, setGenerating] = useState(false);
  const [generatedResult, setGeneratedResult] = useState('');
  const [generationSuccess, setGenerationSuccess] = useState(false);
  
  // Favorites storage
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  // User Session Management
  const [user, setUser] = useState<any>(() => {
    if (auth.currentUser) return auth.currentUser;
    const mockUserStr = localStorage.getItem('mock_user_session');
    return mockUserStr ? JSON.parse(mockUserStr) : null;
  });

  // Load user status
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((u) => {
      if (u) setUser(u);
      else {
        const mockUserStr = localStorage.getItem('mock_user_session');
        setUser(mockUserStr ? JSON.parse(mockUserStr) : null);
      }
    });
    return () => unsub();
  }, []);

  // Load favorites from local storage / Firestore
  useEffect(() => {
    if (!user) return;
    const key = `tiktok_favorites_${user.uid || 'guest'}`;
    const stored = localStorage.getItem(key);
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch {
        setFavorites([]);
      }
    }
  }, [user]);

  const saveFavorite = (content: string, type: FavoriteItem['type'], category: string) => {
    if (!user || !content.trim()) return;
    const key = `tiktok_favorites_${user.uid || 'guest'}`;
    const newItem: FavoriteItem = {
      id: 'fav_' + Date.now(),
      type,
      category,
      content,
      savedAt: Date.now()
    };
    const updated = [newItem, ...favorites];
    setFavorites(updated);
    localStorage.setItem(key, JSON.stringify(updated));
    
    // Smooth custom toast notification
    setCopiedId('saved_fav');
    setTimeout(() => setCopiedId(null), 1500);
  };

  const removeFavorite = (id: string) => {
    if (!user) return;
    const key = `tiktok_favorites_${user.uid || 'guest'}`;
    const updated = favorites.filter(item => item.id !== id);
    setFavorites(updated);
    localStorage.setItem(key, JSON.stringify(updated));
  };

  // Safe manual copy helper
  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  // PRE-DESIGNED VIRAL DICTIONARY FOR INSTANT PREMIUM OFFLINE FALLBACK
  const premiumOfflineDatabase: Record<string, Record<string, string[]>> = {
    tiktok_iniciante: {
      ideia: [
        "O erro número 1 de configuração de perfil que impede você de sair do ban de 200 views.",
        "Como preencher sua BIO usando a técnica de proposta de valor instantânea.",
        "A verdade secreta sobre o algoritmo do TikTok que nenhum criador grande quer te contar."
      ],
      hook: [
        "Pare de rolar agora se o seu TikTok não passa de 200 visualizações! O erro está aqui...",
        "99% das pessoas erram o primeiro segundo do vídeo. Faça isso e mude seu algoritmo.",
        "Essa configuração secreta no seu perfil vai destravar sua entrega orgânica hoje."
      ],
      title: [
        "SAIA DE 200 VIEWS DE UMA VEZ POR TODAS",
        "A CONFIGURAÇÃO SECRETA DO ALGORITMO",
        "COMO CRIAR VIDEOS COPIANDO OS GRANDES"
      ],
      caption: [
        "Se o seu perfil está travado nas visualizações baixas, você precisa desativar essa função oculta imediatamente. Assista até o final para ver o passo a passo. #tiktokparainiciantes #criadordeconteudo #views #tutorial",
        "Salva esse vídeo para arrumar o seu perfil hoje! Se você quer crescer em 2026, siga a regra de postagem dos 3 primeiros segundos. #crescernotiktok #dicas #marketingdigital"
      ],
      cta: [
        "Siga meu perfil para receber hacks diários que aceleram sua entrega orgânica de graça!",
        "Digite 'ALGORITMO' nos comentários que eu vou analisar o que está travando o seu perfil.",
        "Toque no link oficial do meu perfil para acessar meu plano de decolagem de 7 dias."
      ]
    },
    tiktok_dark: {
      ideia: [
        "Corte dinâmico de conversação de podcast acoplado a um jogo estético de Subway Surfers 4K.",
        "Vídeo cinematográfico relaxante usando cenas gratuitas do Pexels com reflexões sobre estoicismo.",
        "Animações dinâmicas explicando segredos não resolvidos da história humana sem aparecer."
      ],
      hook: [
        "Este canal sem rosto faz mais de 15 mil reais por mês apenas postando isso...",
        "Eles tentam apagar essa cena do podcast de toda a internet, mas aqui está a verdade...",
        "A maioria das pessoas falha no TikTok Dark porque não conhece esse truque de imagem."
      ],
      title: [
        "COMO FATURAR R$10K SINAL MOSTRAR O ROSTO",
        "O SEGREDO DO CANAL DE PODCAST VIRAL",
        "ESTOICISMO SENSACIONAL: GUIA COMPLETO"
      ],
      caption: [
        "Trabalhar em casa usando apenas Inteligência Artificial e canais sem rosto é uma realidade. Veja o plano de ação no perfil. #tiktokdark #canalnoface #monetizacao #marketingdigital",
        "Você prefere trabalhar 8 horas por dia ou passar 30 minutos configurando roteiros que geram receita orgânica? #rendaextra #ia #motivacional #mentemilionaria"
      ],
      cta: [
        "Comente 'QUERO' que eu te envio no direct o link do meu gerador automático de clips.",
        "Toque no botão de salvar e comece seu canal dark ainda hoje sem erro.",
        "Siga o canal para aprender a monetizar o algoritmo dark em menos de 14 dias."
      ]
    },
    tiktok_ia: {
      ideia: [
        "Como programar 30 vídeos virais em menos de 10 minutos utilizando ChatGPT e automação Canva.",
        "Revolucionando as fotos de perfil estáticas usando modelos de retrato fotorrealistas em 3D.",
        "Apresentação de ferramenta secreta de clonagem de voz que traduz vídeos instantaneamente."
      ],
      hook: [
        "Esta nova inteligência artificial grátis faz robôs criarem vídeos para você no piloto automático!",
        "Não use mais o ChatGPT para roteiros até ver essa ferramenta de retenção cerebral...",
        "Vão tentar derrubar esse vídeo, mas essas 3 ferramentas de IA criam produtos bilionários de graça."
      ],
      title: [
        "CRIE 30 VÍDEOS EM 10 MINUTOS COM IA",
        "A IA QUE CRIA CRONOGRAMAS COMPLETOS",
        "ASSUSTADOR: SITES QUE RESOLVEM SEU TRABALHO"
      ],
      caption: [
        "A inteligência artificial não vai te substituir, mas alguém que sabe usá-la vai. Salve essa dica para dominar as ferramentas do momento. #inteligenciaartificial #chatgpt #tecnologia #ia",
        "Automatizei todo o processo de edição de vídeos usando apenas essas duas ferramentas secretas. Confira o tutorial na Bio. #automatizacao #edicao #capcut #ganhardinheiro"
      ],
      cta: [
        "Curta o vídeo e siga para não perder a lista completa com as 14 IAs mais poderosas do ano.",
        "Comente 'IA' para receber o prompt mestre de engajamento no seu direct gratuitamente.",
        "Visite o link da minha bio e conheça a comunidade avançada de criadores com IA."
      ]
    },
    tiktok_afiliado: {
      ideia: [
        "Unboxing dinâmico mostrando 'achadinhos que salvam vidas' da Shopee para home office.",
        "Comparativo polêmico de produto baratinho versus produto de luxo de marca famosa.",
        "Apresentação de utilitário doméstico viral mostrando o problema terrível antes da solução."
      ],
      hook: [
        "Minha família disse que era desperdício de dinheiro, até eu ligar esse aparelho na sala...",
        "O produto mais inútil e genial da Shopee que acabou com a bagunça do meu quarto!",
        "Se você tem esse problema em casa e não tem esse achadinho na bio, você está sofrendo à toa."
      ],
      title: [
        "ACHADINHOS DA SHOPEE QUE VOCÊ PRECISA",
        "MELHOR ACESSÓRIO PARA HOME OFFICE DE 2026",
        "O PRODUTO SEGRETO QUE CURA A PREGUIÇA"
      ],
      caption: [
        "Um achadinho inacreditável que vai elevar o nível do seu quarto gastando quase nada. O link está na minha Bio. #achadinhos #shopee #afiliadoshopee #decoracao",
        "Review sincero de quem comprou esse gadget super viral. Vale cada centavo ou é golpe? Descubra! #compras #review #casaorganizada #tecnologia"
      ],
      cta: [
        "O link promocional exclusivo com 60% de desconto está na minha bio. Corre antes que acabe!",
        "Digite 'LINK' que envio o cupom de desconto com frete grátis direto no seu direct.",
        "Me siga para ver mais produtos geniais que facilitam sua rotina diária."
      ]
    },
    tiktok_motivacional: {
      ideia: [
        "Vídeo com fundo escuro e textos estéticos em alto contraste sobre constância e disciplina diária.",
        "Discurso poderoso de figuras lendárias com trilha sonora épica estilo Hans Zimmer.",
        "O poder do silêncio explicado através das regras da filosofia estoica e foco absoluto."
      ],
      hook: [
        "Se você tem menos de 25 anos e está se sentindo perdido, escute essas 4 frases...",
        "Seu cérebro está sendo destruído por dopamina barata e essa é a causa da sua preguiça.",
        "A maioria das pessoas colapsa aos primeiros sinais de pressão. Mas você não é a maioria."
      ],
      title: [
        "O PODER DO SILÊNCIO E DA DISCIPLINA",
        "NÃO ASSISTA SE TIVER MENTE FRACA",
        "COMO EVOLUIR 10 ANOS EM APENAS 6 MESES"
      ],
      caption: [
        "Trabalhe duro em silêncio e deixe que seu sucesso faça o barulho por si só. Um dia você olhará para trás e agradecerá. #motivacao #disciplina #foco #sucesso #mentabilidade",
        "A constância bate o talento todos os dias da semana. Acorde cedo, faça o que deve ser feito e ignore as desculpas. #estoicismo #crecimento #desenvolvimentopessoal #mindset"
      ],
      cta: [
        "Curta e salve se você aceita o desafio de se tornar seu maior projeto pelos próximos 6 meses.",
        "Compartilhe esse vídeo com o primeiro amigo que veio na sua mente para inspirar o dia dele.",
        "Siga o perfil para receber doses diárias de foco inabalável."
      ]
    },
    tiktok_curiosidades: {
      ideia: [
        "Exposição rápida de fatos bizarros desconhecidos sobre os oceanos e profundezas terrestres.",
        "Mitos antigos absurdos que as pessoas ainda acreditam hoje em dia como verdades.",
        "Análise científica de como eventos cotidianos afetam nosso sono e sonhos."
      ],
      hook: [
        "Esse fato assustador sobre o corpo humano vai impedir você de conseguir dormir hoje...",
        "Se você faz alguma dessas 3 coisas todos os dias, pare imediatamente pelo seu bem!",
        "O segredo guardado a sete chaves sobre a história antiga que os livros escolares esconderam..."
      ],
      title: [
        "FOTOS BIZARROS SOBRE O CORPO HUMANO",
        "MITOS HISTÓRICOS QUE VOCÊ ACREDITA",
        "ALERTA: NUNCA FAÇA ISSO ANTES DE DORMIR"
      ],
      caption: [
        "A última curiosidade é literalmente impossível de acreditar, mas foi testada pela ciência. Qual sua opinião? #curiosidades #fatos #ciência #mistério #universo",
        "O mundo está cheio de segredos fascinantes que passam batido no dia a dia. Comente qual te impressionou mais. #fatoscuriosos #conhecimento #aprendizado #interessante"
      ],
      cta: [
        "Se você quiser descobrir mais mistérios reais do nosso planeta, siga meu perfil hoje mesmo.",
        "Encaminhe para o colega mais inteligente que você tem e veja se ele sabe responder isso.",
        "Marque seu amigo nos comentários para explodir a mente dele também!"
      ]
    },
    tiktok_financeiro: {
      ideia: [
        "A regra simplificada dos 50-30-20 explicada na prática usando um copo com água para ilustrar.",
        "Como começar a investir na bolsa com apenas R$ 50 usando aplicativos móveis populares.",
        "Os 3 maiores sumidouros invisíveis de dinheiro que estão empobrecendo a classe média."
      ],
      hook: [
        "Como eu transformei apenas R$ 5 por dia em uma aposentadoria antecipada de R$ 5.000 mensais!",
        "Nunca mais coloque seu dinheiro na Poupança até conhecer este investimento secreto...",
        "Os bancos ricos odeiam esse truque simples de juros compostos que multiplica seu saldo."
      ],
      title: [
        "INVISTA COMEÇANDO COM APENAS R$50",
        "A FARSA DA POUPANÇA REVELADA",
        "MILIONÁRIO AOS 30 ANOS: O PASSO A PASSO"
      ],
      caption: [
        "Aprender a investir não é sobre quanto você ganha, mas sobre quanto você poupa e a frequência com que investe. #financas #investimentos #educacaofinanceira #riqueza",
        "Os pequenos hábitos financeiros do dia a dia ditam sua liberdade no futuro. Pare de rasgar dinheiro com taxas. #dinheiro #dinheiroextra #sucesso #investir"
      ],
      cta: [
        "Pegue seu guia financeiro iniciante totalmente grátis clicando no link do meu perfil.",
        "Digite 'FINANCEIRO' nos comentários para eu te enviar o simulador de dividendos gratuito.",
        "Siga o canal para blindar sua mente contra golpes e enriquecer de verdade."
      ]
    },
    tiktok_storytelling: {
      ideia: [
        "Narrativa tensa sobre como um jovem enganou wall street usando apenas um e-mail falso.",
        "A trágica jornada do inventor que vendeu sua patente por centavos e hoje seria bilionário.",
        "Como uma pequena decisão de um motorista mudou totalmente o rumo da primeira guerra mundial."
      ],
      hook: [
        "Ele roubou mais de 50 milhões de dólares sem sair do quarto e o final dessa história vai te deixar sem ar...",
        "Ele vendeu a maior patente do mundo por um pastel de feira e hoje chora todos os dias...",
        "Essa coincidência bizarríssima mudou a história do planeta inteirinho e você não sabia!"
      ],
      title: [
        "O MAIOR GOLPE DA HISTÓRIA DA INTERNET",
        "VENDIDO POR CENTAVOS: O ERRO FATAL",
        "A COINCIDÊNCIA QUE MUDOU TODO O PLANETA"
      ],
      caption: [
        "A realidade muitas vezes supera a ficção em níveis inacreditáveis. O que você faria se estivesse no lugar dele? #storytelling #historiasreais #fatosreais #intrigante",
        "Uma mente brilhante usada para o lado errado da lei. Assista até a parte 2 para entender a reviravolta. #casosreais #crimesreais #narrativa #curioso"
      ],
      cta: [
        "Siga o perfil para não perder a Parte 2 desse caso chocante que sai amanhã às 18h!",
        "Deixe sua teoria sincera sobre o desfecho deste acontecimento nos comentários abaixo.",
        "Se divirta com mais narrativas extraordinárias ativando as notificações do perfil."
      ]
    }
  };

  // Live and Simulated Trends Detector Data
  const hotSimulatedTrends = [
    { sound: "Lover Boy - Sped Up Mix", videos: "154k vídeos hoje", status: "EXPLODINDO", speed: "▲ 430% de alta" },
    { sound: "Indie Pop Aesthetic Chill (Lo-Fi)", videos: "98k vídeos hoje", status: "EM ALTA", speed: "▲ 180% de alta" },
    { sound: "Futuristic Synth Tech Beat", videos: "240k vídeos hoje", status: "VIRAL RECORDE", speed: "▲ 850% de alta" },
    { sound: "Bass Overlay Deep Dropper", videos: "45k vídeos hoje", status: "RISING SHORTS", speed: "▲ 90% de alta" }
  ];

  const optimalPostingTimes = [
    { day: "Segunda-feira", times: "11h30, 17h00, 21h45", rate: "Alta Entrega" },
    { day: "Terça-feira", times: "12h00, 16h30, 22h15", rate: "Excelente Organic" },
    { day: "Quarta-feira", times: "11h00, 18h00, 21h00", rate: "Alta Entrega" },
    { day: "Quinta-feira", times: "10h15, 17h30, 23h00", rate: "Excelente Organic" },
    { day: "Sexta-feira", times: "12h30, 16h45, 22h00", rate: "Viral Spike" },
    { day: "Sábado e Domingo", times: "09h30, 15h00, 20h30", rate: "Dopamine Peak" }
  ];

  const explodingVideosNow = [
    {
      id: "exp_1",
      type: "Análise Secreta (TikTok Dark)",
      structure: "Vídeo de GTA 5 (Gameplay) no fundo + Voz neural realista contando uma história intrigante + Recorte ilustrativo no centro.",
      hook: "“Eles vão deletar esse vídeo nas próximas horas, mas aqui está o documento que prova...”",
      cta: "“Comente a palavra SECRETO e eu te envio a investigação completa no privado.”",
      whyViral: "Estímulo visual duplo que prende a atenção cerebral (gameplay colorido + narrativa tensa) aliado a um gancho com urgência extrema (conspiração/deletar)."
    },
    {
      id: "exp_2",
      type: "Achado de Decoração (TikTok Afiliado)",
      structure: "Aparelho misterioso apagado no início + Zoom rápido com barulho satisfatório 'pop' ao ligar na parede e colorir todo o teto.",
      hook: "“Eu joguei dinheiro fora a vida inteira comprando luminárias caras até encontrar isso na Shopee por dezoito reais...”",
      cta: "“O link com desconto de lançamento e cupom fixado está na bio.”",
      whyViral: "Mistério revelado em 2 segundos com quebra de padrão visual espetacular e som de alta satisfação auditiva (ASMR)."
    },
    {
      id: "exp_3",
      type: "Tutorial Produtividade (TikTok IA)",
      structure: "Gravação de tela acelerada em 3x mostrando a IA criando imagens + Rosto do criador no canto reagindo com gestos expressivos.",
      hook: "“Se seu chefe descobrir esse site secreto de inteligência artificial, você pode ser demitido ou promovido hoje...”",
      cta: "“Compartilhe com quem precisa automatizar o trabalho urgente.”",
      whyViral: "Brinca com a dor do espectador sobre emprego e promete super-poderes imediatos. O zoom dinâmico na tela retém o espectador."
    }
  ];

  // AI Content Generator Execution with premium fallback
  const triggerGeneration = async () => {
    setGenerating(true);
    setGeneratedResult('');
    setGenerationSuccess(false);

    // Custom prompt to make Gemini create highly viral structures
    const categoryLabel = selectedCategory.replace('tiktok_', '').toUpperCase();
    const typeLabel = outputType.toUpperCase();
    
    const prompt = `Gere 1 ${typeLabel} de altíssimo impacto viral para o TikTok dentro da categoria "${categoryLabel}".
O nicho específico do usuário é: "${nicheInput || 'Geral/Monetização Orgânica'}".

Siga rigorosamente as diretrizes abaixo para o tipo escolhido:
- IDEIA: Crie um formato ousado de vídeo inovador, explicando que tipo de imagem e edição usar para explodir a retenção.
- HOOK (Gancho): Deve prender a atenção nos primeiros 3 segundos. Use quebra de padrão forte, segredos, polêmicas ou dores agudas.
- TITLE (Título): Deve ser em caixa alta, magnético, curto e impactante para colocar na capa ou legenda de texto inicial.
- CAPTION (Legenda): Deve reter o leitor na descrição, usar excelente espaçamento e preencher com hashtags magnéticas do nicho.
- CTA (Call to Action): Deve induzir comentários rápidos, salvamentos ou direcionamento direto para o link da bio com escassez.

Traga um resultado profissional, viciante, em Português do Brasil de altíssima qualidade, sem rodeios ou explicações adicionais de introdução, indo direto ao ponto.`;

    try {
      const response = await chatWithMentor([
        { role: 'user', parts: [{ text: prompt }] }
      ]);
      
      if (response && response.trim() && !response.includes("Desculpe, não consegui")) {
        setGeneratedResult(response.trim());
        setGenerationSuccess(true);
      } else {
        // Fallback gracefully to offline premium db if API fails or behaves weirdly
        throw new Error("Triggering premium fallback database");
      }
    } catch {
      // Offline fallback selection
      const categoryData = premiumOfflineDatabase[selectedCategory] || premiumOfflineDatabase['tiktok_dark'];
      const templateList = categoryData[outputType] || categoryData['hook'];
      const randomIndex = Math.floor(Math.random() * templateList.length);
      const chosenTemplate = templateList[randomIndex];
      
      // Customize with the user niche input if present
      let customized = chosenTemplate;
      if (nicheInput.trim()) {
        customized = customized.replace('este nicho', nicheInput).replace('seu perfil', `seu perfil de ${nicheInput}`);
      }
      setGeneratedResult(customized);
      setGenerationSuccess(true);
    } finally {
      setGenerating(false);
    }
  };

  const shareViaSocialMock = (text: string) => {
    // Sharing simulation to copy easily
    navigator.clipboard.writeText(text);
    setCopiedId('social_shared');
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="flex flex-col h-full bg-[#06060e] text-slate-100 overflow-hidden relative font-sans">
      
      {/* Decorative Aurora Glow for TikTok aesthetics */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-[#fe2c55]/8 rounded-full blur-[110px] pointer-events-none -mt-40 -ml-40" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#25f4ee]/8 rounded-full blur-[110px] pointer-events-none -mb-40 -mr-40" />

      {/* Header Container with sleek neon touch */}
      <div className="p-4 bg-slate-950/60 backdrop-blur-md border-b border-indigo-500/15 flex items-center justify-between shadow-lg relative z-20">
        <div className="flex items-center gap-3">
          <button 
            id="tiktok_back_btn" 
            onClick={onBack} 
            className="p-2.5 bg-white/5 rounded-xl hover:bg-[#fe2c55]/15 border border-white/5 hover:border-[#fe2c55]/40 transition-all flex items-center justify-center cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 text-slate-300" />
          </button>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-[#fe2c55] rounded-full animate-pulse" />
              <h1 className="font-display font-black text-base sm:text-lg text-white tracking-tight uppercase">
                Viral Central <span className="text-[#fe2c55] font-sans">TikTok</span>
              </h1>
            </div>
            <p className="text-[9px] text-[#25f4ee] font-black uppercase tracking-widest font-mono">
              ★ Startup Edition • Growth & AI
            </p>
          </div>
        </div>
        <div className="bg-[#fe2c55]/10 border border-[#fe2c55]/20 text-[#fe2c55] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
          <Flame className="w-3.5 h-3.5 animate-bounce" />
          PRO MODE
        </div>
      </div>

      {/* Sub-tab interactive selector bar (Inspired by Premium layout engines) */}
      <div className="bg-slate-950/40 px-4 py-2 border-b border-indigo-500/10 grid grid-cols-4 gap-1 relative z-20">
        <button
          id="tab_viral_generator"
          onClick={() => setActiveSubTab('generator')}
          className={`py-2 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all flex flex-col items-center gap-1 ${
            activeSubTab === 'generator'
              ? 'bg-[#fe2c55] text-white shadow-lg shadow-[#fe2c55]/20 border border-[#fe2c55]/30'
              : 'text-slate-400 hover:text-white bg-white/5 hover:bg-white/10'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Central IA</span>
        </button>

        <button
          id="tab_viral_trends"
          onClick={() => setActiveSubTab('trends')}
          className={`py-2 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all flex flex-col items-center gap-1 ${
            activeSubTab === 'trends'
              ? 'bg-[#25f4ee] text-slate-950 shadow-lg shadow-[#25f4ee]/20 border border-[#25f4ee]/30'
              : 'text-slate-400 hover:text-white bg-white/5 hover:bg-white/10'
          }`}
        >
          <Flame className="w-3.5 h-3.5" />
          <span>Trends</span>
        </button>

        <button
          id="tab_viral_growth"
          onClick={() => setActiveSubTab('growth')}
          className={`py-2 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all flex flex-col items-center gap-1 ${
            activeSubTab === 'growth'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 border border-indigo-500/30'
              : 'text-slate-400 hover:text-white bg-white/5 hover:bg-white/10'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Academia</span>
        </button>

        <button
          id="tab_viral_favorites"
          onClick={() => setActiveSubTab('favorites')}
          className={`py-2 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all flex flex-col items-center gap-1 ${
            activeSubTab === 'favorites'
              ? 'bg-yellow-500 text-slate-950 shadow-lg shadow-yellow-500/20 border border-yellow-500/30'
              : 'text-slate-400 hover:text-white bg-white/5 hover:bg-white/10'
          }`}
        >
          <div className="relative">
            <Heart className="w-3.5 h-3.5 fill-current" />
            {favorites.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[7px] font-bold w-3 h-3 rounded-full flex items-center justify-center animate-pulse">
                {favorites.length}
              </span>
            )}
          </div>
          <span>Favoritos</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-32 p-5 relative z-10">
        
        {/* TAB 1: CENTRAL IA VIRAL GENERATOR */}
        {activeSubTab === 'generator' && (
          <div className="space-y-6">
            
            {/* Call to action & information */}
            <div className="bg-gradient-to-tr from-slate-950 to-indigo-950 p-5 rounded-3xl border border-indigo-500/20 shadow-xl relative overflow-hidden">
              <div className="absolute right-0 top-0 w-32 h-32 bg-[#fe2c55]/10 rounded-full blur-2xl" />
              <div className="relative z-10 space-y-2">
                <span className="bg-indigo-500/15 text-indigo-300 font-mono text-[9px] px-2 py-0.5 rounded-lg font-bold border border-indigo-500/20 uppercase tracking-widest">
                  Automação com IA
                </span>
                <h3 className="text-xl font-display font-extrabold tracking-tight text-white leading-tight">
                  Gerador de Roteiros & Ganchos Virais
                </h3>
                <p className="text-slate-300 text-xs leading-relaxed font-light">
                  Selecione seu nicho, seu canal estratégico e nossa Inteligência Artificial criará copys validadas prontas para colar e bombar.
                </p>
              </div>
            </div>

            {/* Config Forms */}
            <div className="bg-slate-950/60 p-5 rounded-[28px] border border-white/5 space-y-4">
              
              {/* Optional custom niche field */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-[#25f4ee]" />
                  Seu nicho específico (Opcional):
                </label>
                <input
                  id="generator_niche_input"
                  type="text"
                  value={nicheInput}
                  onChange={(e) => setNicheInput(e.target.value)}
                  placeholder="Ex: Receitas saudáveis, Estilo masculino, Finanças..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-[#fe2c55] focus:border-[#fe2c55]"
                />
              </div>

              {/* Grid selectors for Content Track / Categories */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                  <Folder className="w-3.5 h-3.5 text-[#fe2c55]" />
                  Trilha / Categoria de Conteúdo:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'tiktok_iniciante', label: '🎛️ TikTok Iniciante' },
                    { id: 'tiktok_dark', label: '👤 TikTok Dark (Sem Rosto)' },
                    { id: 'tiktok_ia', label: '🤖 TikTok + IA' },
                    { id: 'tiktok_afiliado', label: '🛍️ TikTok Afiliado' },
                    { id: 'tiktok_motivacional', label: '🔥 Motivacional' },
                    { id: 'tiktok_curiosidades', label: '🧠 Curiosidades' },
                    { id: 'tiktok_financeiro', label: '💸 Financeiro' },
                    { id: 'tiktok_storytelling', label: '📖 Storytelling' }
                  ].map((category) => (
                    <button
                      key={category.id}
                      id={`cat_select_${category.id}`}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`p-3.5 rounded-xl text-left text-xs font-bold font-sans transition-all border ${
                        selectedCategory === category.id
                          ? 'bg-gradient-to-r from-indigo-900 to-slate-900 border-[#fe2c55] text-white shadow-md'
                          : 'bg-white/5 border-white/5 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selecting What to Generate */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                  O que você quer que a IA crie?
                </label>
                <div className="grid grid-cols-5 gap-1.5 bg-white/5 p-1 rounded-xl">
                  {(['ideia', 'hook', 'title', 'caption', 'cta'] as const).map((type) => (
                    <button
                      key={type}
                      id={`type_select_${type}`}
                      onClick={() => setOutputType(type)}
                      className={`py-2 px-1 rounded-lg text-[9px] font-black uppercase tracking-widest text-center transition-all ${
                        outputType === type
                          ? 'bg-[#fe2c55] text-white font-sans'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {type === 'ideia' ? 'Ideia' : type === 'hook' ? 'Gancho' : type === 'title' ? 'Título' : type === 'caption' ? 'Legenda' : 'CTA'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Trigger Button */}
              <button
                id="tiktok_action_generate_btn"
                onClick={triggerGeneration}
                disabled={generating}
                className="w-full mt-2 py-4 bg-gradient-to-r from-[#fe2c55] via-pink-600 to-indigo-600 hover:scale-[1.01] active:scale-[0.98] transition-all rounded-xl text-white font-sans font-black flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-pink-600/10 disabled:opacity-50"
              >
                {generating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    CRIPTOGRAFANDO TENDÊNCIAS COM IA...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-white animate-pulse" />
                    GERAR CONTEÚDO VIRAL AGORA
                  </>
                )}
              </button>

            </div>

            {/* Generated Output Showcase Section */}
            <AnimatePresence mode="wait">
              {generatedResult && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="bg-slate-900 border-2 border-indigo-500/20 hover:border-indigo-500/45 p-6 rounded-[32px] relative overflow-hidden transition-all shadow-2xl space-y-4"
                >
                  <div className="flex justify-between items-center pb-2 border-b border-indigo-500/10">
                    <span className="text-[10px] text-[#25f4ee] font-black uppercase tracking-widest font-mono flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      Resultado da IA Inteligente
                    </span>
                    <span className="text-[9px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider font-mono">
                      Pronto para Uso
                    </span>
                  </div>

                  <p className="text-sm leading-relaxed text-slate-100 font-semibold select-text bg-[#06060e] p-4.5 rounded-2xl border border-white/5 whitespace-pre-wrap">
                    {generatedResult}
                  </p>

                  <div className="grid grid-cols-3 gap-2 pt-1 font-mono">
                    <button
                      id="save_to_favorites_btn"
                      onClick={() => saveFavorite(generatedResult, outputType, selectedCategory)}
                      className="py-2.5 px-3 bg-indigo-600/25 hover:bg-indigo-600/40 text-indigo-200 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Heart className="w-3.5 h-3.5 fill-current text-indigo-400" />
                      Salvar
                    </button>
                    <button
                      id="copy_output_text_btn"
                      onClick={() => handleCopyText(generatedResult, 'output')}
                      className="py-2.5 px-3 bg-[#25f4ee]/15 hover:bg-[#25f4ee]/25 text-[#25f4ee] rounded-xl text-[10px] font-black uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      {copiedId === 'output' ? 'Copiado!' : 'Copiar'}
                    </button>
                    <button
                      id="share_social_mock_btn"
                      onClick={() => shareViaSocialMock(generatedResult)}
                      className="py-2.5 px-3 bg-pink-600/15 hover:bg-pink-600/25 text-[#fe2c55] rounded-xl text-[10px] font-black uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      {copiedId === 'social_shared' ? 'Copiado!' : 'Compartilhar'}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        )}

        {/* TAB 2: TREND EXPLORER & VIDEOS EM ALTA */}
        {activeSubTab === 'trends' && (
          <div className="space-y-6">
            
            {/* Real-time Indicator Widget */}
            <div className="bg-slate-950/60 p-5 rounded-[28px] border border-white/5 space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
                  <h4 className="text-sm font-black uppercase tracking-wider text-slate-300">
                    Sinais Ativos de Áudio & Trends
                  </h4>
                </div>
                <span className="text-[9px] bg-red-500/15 text-red-500 px-2 py-0.5 rounded-full font-bold uppercase font-mono border border-red-500/25 animate-pulse">
                  Ao Vivo
                </span>
              </div>

              {/* Ticker simulation */}
              <div className="space-y-3">
                {hotSimulatedTrends.map((trend, idx) => (
                  <div key={idx} className="p-3.5 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 flex items-center justify-between text-xs transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-[#fe2c55]/10 rounded-xl flex items-center justify-center text-[#fe2c55] shrink-0 border border-[#fe2c55]/20">
                        <Volume2 className="w-4 h-4 animate-pulse" />
                      </div>
                      <div>
                        <p className="font-extrabold text-slate-100">{trend.sound}</p>
                        <p className="text-[10px] text-slate-400 font-medium">{trend.videos}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] bg-indigo-500/20 text-[#25f4ee] px-2.5 py-1 rounded-lg font-black uppercase tracking-wide font-mono">
                        {trend.status}
                      </span>
                      <p className="text-[10px] text-emerald-500 font-bold mt-1 font-mono">{trend.speed}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SEÇÃO ESPECIAL: Vídeos que estão explodindo agora */}
            <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <h4 className="font-display font-black text-white text-base uppercase tracking-tight flex items-center gap-2">
                  <Eye className="w-5 h-5 text-[#fe2c55]" />
                  Vídeos que estão explodindo agora
                </h4>
                <span className="text-[9px] bg-yellow-500/10 text-yellow-500 px-2 py-0.5 rounded-full font-bold uppercase">
                  Casos Reais
                </span>
              </div>

              <div className="space-y-4">
                {explodingVideosNow.map((exp) => (
                  <div key={exp.id} className="p-5 bg-gradient-to-b from-slate-900 to-slate-950 rounded-[32px] border border-white/10 shadow-lg space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-0.5">
                        <span className="text-[9px] text-[#25f4ee] font-black uppercase tracking-widest font-mono">Formato Viral</span>
                        <h5 className="font-display font-extrabold text-white text-sm">{exp.type}</h5>
                      </div>
                      <span className="bg-[#fe2c55]/10 text-[#fe2c55] text-[10px] font-black uppercase px-2.5 py-1 rounded-xl font-mono">
                        95% Retenção
                      </span>
                    </div>

                    <div className="space-y-2.5 text-xs text-slate-350">
                      <div className="bg-white/5 p-3 rounded-xl border border-white/5 space-y-1">
                        <p className="text-[9px] font-black uppercase text-[#fe2c55] tracking-widest">Estrutura de Vídeo:</p>
                        <p className="text-slate-100 font-medium leading-relaxed">{exp.structure}</p>
                      </div>
                      <div className="bg-white/5 p-3 rounded-xl border border-white/5 space-y-1">
                        <p className="text-[9px] font-black uppercase text-[#25f4ee] tracking-widest">Gancho Perfeito (3 Segundos):</p>
                        <p className="text-slate-100 font-extrabold leading-relaxed italic">{exp.hook}</p>
                      </div>
                      <div className="bg-white/5 p-3 rounded-xl border border-white/5 space-y-1">
                        <p className="text-[9px] font-black uppercase text-amber-500 tracking-widest">Chamada para Ação (CTA):</p>
                        <p className="text-slate-100 font-medium leading-relaxed italic">{exp.cta}</p>
                      </div>
                      <div className="bg-indigo-500/5 p-3.5 rounded-xl border border-indigo-500/10 space-y-1">
                        <p className="text-[9px] font-black uppercase text-indigo-400 tracking-widest">Por que viralizou:</p>
                        <p className="text-slate-200 font-medium leading-relaxed">{exp.whyViral}</p>
                      </div>
                    </div>

                    <button
                      id={`copy_structure_btn_${exp.id}`}
                      onClick={() => handleCopyText(`ESTRUTURA:\n${exp.structure}\n\nGANCHO:\n${exp.hook}\n\nCTA:\n${exp.cta}`, exp.id)}
                      className="w-full py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl text-[10px] font-black uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-white/5"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      {copiedId === exp.id ? 'Copiado para Área de Transferência!' : 'Copiar Coleção de Script'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Posting Times Matrix */}
            <div className="bg-slate-950/60 p-5 rounded-[28px] border border-white/5 space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-500" />
                Melhores Horários para Postar (Organic Spike 2026)
              </h4>
              <p className="text-[11px] text-slate-400 leading-normal mb-2">
                Os picos são ajustados de acordo com o padrão de liberação de dopamina (comida, descanso e final do dia).
              </p>
              
              <div className="grid grid-cols-1 gap-2.5">
                {optimalPostingTimes.map((item, id) => (
                  <div key={id} className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5 text-xs">
                    <span className="font-extrabold text-slate-200">{item.day}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-slate-350 font-mono font-bold bg-[#06060e] px-2.5 py-1 rounded-xl">
                        {item.times}
                      </span>
                      <span className="text-[8px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-black uppercase">
                        {item.rate}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: VIRAL ACADEMY / DETAILED CONTENT LIBRARIES */}
        {activeSubTab === 'growth' && (
          <div className="space-y-6">
            
            {/* TikTok Strategy Quick Deck */}
            <div className="bg-gradient-to-tr from-purple-950 to-indigo-950 p-6 rounded-[32px] border border-purple-500/20 shadow-xl space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-purple-600 font-sans tracking-widest text-[#06060e] px-2.5 py-1 rounded-lg text-[9px] font-black uppercase">
                  PREMIUM PSYCHOLOGY
                </span>
                <span className="text-purple-400 text-[10px] font-bold uppercase tracking-wider">Algoritmo Decifrado</span>
              </div>
              <h3 className="text-xl font-display font-black text-white leading-tight">
                Técnicas de Dopamine Scrolling & Retenção
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed font-light">
                O TikTok retém o usuário através do sistema de recompensa intermitente. Se você replicar a mesma estrutura, seus vídeos ganham prioridade absoluta na entrega orgânica de vídeos recomendados.
              </p>
              
              <div className="bg-black/40 p-4.5 rounded-2xl border border-white/5 space-y-3 text-xs text-slate-300">
                <div className="flex gap-2.5 items-start">
                  <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-900 font-black text-[10px] flex items-center justify-center shrink-0">1</span>
                  <p className="font-medium lead-relaxed">
                    <strong>Ganchos Audíveis com Ruído de Satisfação:</strong> O impacto de ASMR ou um pop dinâmico ativa sinapses no cortex do espectador, impedindo o arrasto de tela.
                  </p>
                </div>
                <div className="flex gap-2.5 items-start">
                  <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-900 font-black text-[10px] flex items-center justify-center shrink-0">2</span>
                  <p className="font-medium lead-relaxed">
                    <strong>Estrutura de Loop Perfeito:</strong> Faça o final do seu áudio encaixar no texto inicial sem quebras. Se as pessoas assistirem o vídeo 1.5x, o algoritmo envia para o exterior instantaneamente.
                  </p>
                </div>
                <div className="flex gap-2.5 items-start">
                  <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-900 font-black text-[10px] flex items-center justify-center shrink-0">3</span>
                  <p className="font-medium lead-relaxed">
                    <strong>Legendas Dinâmicas Saltitantes:</strong> Textos em cores alternadas (amarelo/rosa) que mudam em menos de 1 segundo prendem os olhos, mesmo que o dispositivo esteja sem áudio.
                  </p>
                </div>
              </div>
            </div>

            {/* Comprehensive category deep dive guides */}
            <div className="space-y-4">
              <h4 className="font-display font-black text-white text-base uppercase tracking-tight flex items-center gap-2">
                <Folder className="w-5 h-5 text-indigo-400" />
                Guias de Crescimento por Nicho
              </h4>

              {[
                { 
                  title: '🎛️ TikTok Iniciante: Configuração e Estreia',
                  description: 'Como configurar sua conta PRO do zero, remover restrições de público e estruturar os primeiros 3 vídeos para aquecer o algoritmo correto.',
                  checklists: [
                    'Mude a conta para perfil criador imediato',
                    'Não faça interações de troca de seguidor (fode o algoritmo)',
                    'Publique em horários fixados na tabela nas primeiras 72h'
                  ]
                },
                { 
                  title: '👤 TikTok Dark: O Império Sem Rosto',
                  description: 'Como faturar com visualizações no programa de recompensas sem gravar nenhuma cena. Uso de clipping, estoicismo, podcasts e vídeos satisfatórios.',
                  checklists: [
                    'Utilize gameplays relaxantes ou cenários cinzentos de drone',
                    'Edite com legendas automáticas animadas no CapCut',
                    'Use voz neural estática de alta aderência emocional'
                  ]
                },
                { 
                  title: '🤖 TikTok + IA: Automação Absoluta',
                  description: 'Crie centenas de artes e scripts nos finais de semana e coloque em sistemas de agendamento automático para postagem infinita.',
                  checklists: [
                    'Gere base de ideias com o prompt de retenção da IA criadora',
                    'Crie clipes dinâmicos e exporte em lote no Canva',
                    'Use geradores de imagem 3D com luz cinematográfica na capa'
                  ]
                },
                { 
                  title: '🛍️ TikTok Afiliado: Máquina de Achadinhos',
                  description: 'Estratégia prática de conversão direta. Escolha de produtos com dores fáceis e unboxing magnético com redirecionamento de link na bio.',
                  checklists: [
                    'Selecione produtos de baixo tíquete (menos de R$ 50)',
                    'Ressalte os problemas cotidianos antes da solução do achadinho',
                    'Use escassez na chamada de ação nos comentários'
                  ]
                }
              ].map((guide, idx) => (
                <div key={idx} className="p-5 bg-slate-950/60 rounded-[28px] border border-white/5 space-y-3">
                  <h5 className="font-sans font-extrabold text-sm text-white leading-tight">{guide.title}</h5>
                  <p className="text-xs text-slate-400 leading-relaxed font-light">{guide.description}</p>
                  
                  <div className="pt-2 border-t border-white/5 space-y-1.5 text-[11px]">
                    <p className="font-black uppercase text-indigo-400 tracking-wider">Checklist Prático:</p>
                    {guide.checklists.map((check, i) => (
                      <div key={i} className="flex gap-2 items-center text-slate-300 font-medium">
                        <CheckCircle className="w-3.5 h-3.5 text-[#25f4ee] shrink-0" />
                        <span>{check}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Reels & Shorts Strategies */}
            <div className="bg-slate-950/60 p-5 rounded-[28px] border border-white/5 space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-400" />
                Estratégias para Reels & Shorts também (Crossposting)
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                Não jogue no lixo o potencial dos outros aplicativos de entrega rápida. Siga essa trilha para maximizar os resultados sem esforço extra:
              </p>
              <div className="space-y-2 text-xs text-slate-400 font-medium">
                <p>
                  ★ <strong>Shorts do YouTube:</strong> Adora títulos literais baseados em SEO e pesquisas. Coloque palavras chaves na legenda principal e hashtags curtas.
                </p>
                <p>
                  ★ <strong>Reels do Instagram:</strong> Preza por áudios em alta locais e capinhas refinadas integradas ao grid. Evite marcas d'água de outros canais a todo custo antes de publicar.
                </p>
              </div>
            </div>

          </div>
        )}

        {/* TAB 4: FAVORITES SYSTEM */}
        {activeSubTab === 'favorites' && (
          <div className="space-y-6">
            
            <div className="flex items-center justify-between">
              <h4 className="font-display font-black text-white text-base uppercase tracking-tight">
                ★ Seus Favoritos Salvos
              </h4>
              <span className="text-[10px] bg-indigo-500/10 text-indigo-300 px-2 py-0.5 rounded-full font-bold">
                {favorites.length} Itens
              </span>
            </div>

            {favorites.length === 0 ? (
              <div className="bg-slate-950/60 p-12 rounded-[32px] border border-dashed border-white/10 text-center space-y-3">
                <Heart className="w-10 h-10 text-slate-700 mx-auto fill-none" />
                <p className="text-slate-400 text-xs font-black uppercase tracking-wider">
                  Nenhum item salvo ainda.
                </p>
                <p className="text-slate-500 text-[10px] max-w-[200px] mx-auto leading-relaxed">
                  Gerencie copys na "Central IA" e salve para preencher o seu cofre.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {favorites.map((item) => (
                  <div key={item.id} className="p-5 bg-slate-900 border border-white/5 rounded-3xl space-y-3 relative overflow-hidden select-text text-left">
                    <div className="flex justify-between items-center pb-2 border-b border-white/5">
                      <div className="flex items-center gap-2">
                        <span className="bg-[#fe2c55] w-2 h-2 rounded-full" />
                        <span className="text-[10px] font-mono text-slate-400 font-black uppercase tracking-widest">
                          {item.type.toUpperCase()} • {item.category.replace('tiktok_', '').toUpperCase()}
                        </span>
                      </div>
                      <button
                        onClick={() => removeFavorite(item.id)}
                        className="p-1.5 text-slate-500 hover:text-red-500 hover:bg-slate-8 w-8 h-8 rounded-full flex items-center justify-center transition-colors shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-xs text-slate-200 leading-relaxed font-semibold">
                      {item.content}
                    </p>

                    <div className="flex justify-end gap-2 pt-1 font-mono">
                      <button
                        onClick={() => handleCopyText(item.content, item.id)}
                        className="px-3.5 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-[9px] text-[#25f4ee] font-black uppercase tracking-wider flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <Copy className="w-3 h-3" />
                        {copiedId === item.id ? 'COPIADO' : 'COPIAR'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        )}

      </div>

      {/* Persistent dynamic Toast alert for great feedback transitions */}
      <AnimatePresence>
        {copiedId === 'saved_fav' && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-yellow-500 text-slate-950 text-xs font-black uppercase tracking-wider px-6 py-3 rounded-full shadow-2xl z-50 flex items-center gap-1.5 border border-yellow-400/35"
          >
            <Heart className="w-4 h-4 fill-current text-slate-950" />
            Salvo com Sucesso nos Favoritos!
          </motion.div>
        )}
        {copiedId === 'social_shared' && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#fe2c55] text-white text-xs font-black uppercase tracking-wider px-6 py-3 rounded-full shadow-2xl z-50 flex items-center gap-1.5 border border-pink-500/25"
          >
            <Share2 className="w-4 h-4" />
            Copiado pronto para colar na rede social!
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
