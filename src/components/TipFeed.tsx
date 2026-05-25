import React from 'react';
import { motion } from 'motion/react';
import { Heart, Bookmark, Share2, Flame, Sparkles, AlertCircle, ShoppingBag, Eye, Copy } from 'lucide-react';

interface TipFeedProps {
  showToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

interface FeedItem {
  id: string;
  category: string;
  source: string;
  time: string;
  title: string;
  content: string;
  initialLikes: number;
}

export const TipFeed: React.FC<TipFeedProps> = ({ showToast }) => {
  const [feedLikes, setFeedLikes] = React.useState<Record<string, number>>({
    feed_1: 184,
    feed_2: 243,
    feed_3: 109,
    feed_4: 312,
    feed_5: 97
  });

  const [likedList, setLikedList] = React.useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('liked_feed_tips');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [savedTips, setSavedTips] = React.useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('saved_feed_tips');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const feedItems: FeedItem[] = [
    {
      id: 'feed_1',
      category: 'TikTok Viral',
      source: 'Mundo Viral',
      time: 'Há 2h',
      title: 'A Nova Diretriz de Áudio Original do TikTok e Reels',
      content: 'O algoritmo do TikTok e do Instagram começou a dar 2x mais alcance orgânico em vídeos com vozes originais gravadas em alta resolução diretamente no aplicativo. Se você faz cortes ou vídeos sem aparecer (Faceless), use vozes realistas do ElevenLabs ou do próprio app. Evite usar músicas famosas em 100% de volume; coloque-as apenas em 3% como fundo e use a narração limpa em destaque.',
      initialLikes: 184
    },
    {
      id: 'feed_2',
      category: 'Estratégia de Afiliado',
      source: 'Mestre do Funil',
      time: 'Há 5h',
      title: 'Escolha Segura de Infoprodutos na Kiwify',
      content: 'Para vender muito como afiliado sem gastar com anúncios, escolha infoprodutos com alta conversão em páginas de vendas de nichos como: Receitas Fitness Low Carb, Mentoria Estóica de Disciplina, e Prompts de IA para Produtividade. Evite produtos genéricos de ganhar dinheiro fácil. Crie vídeos curtos resolvendo uma dor específica do público e feche com: "Se quiser o manual secreto gratuito que me ajudou, clique no meu link de perfil."',
      initialLikes: 243
    },
    {
      id: 'feed_3',
      category: 'YouTube SEO',
      source: 'Canal Blindado',
      time: 'Ontem',
      title: 'Anatomia da Thumbnail de Alta Conversão (CTR > 12%)',
      content: 'A miniatura do YouTube é responsável por 80% do clique inicial. Regra Pro: Coloque no máximo 3 palavras grandes com cores contrastantes como Amarelo e Branco. Sempre utilize rostos com expressões faciais intensas no lado direito (já que o relógio de duração do Shorts/Vídeo fica no canto inferior direito e tampa qualquer texto colocado ali). Adicione bordas brilhantes no elemento em destaque.',
      initialLikes: 109
    },
    {
      id: 'feed_4',
      category: 'Técnica Viral',
      source: 'Growth Hacker',
      time: 'Há 1 dia',
      title: 'O Funil do Comentário com Envio Automatizado',
      content: 'A métrica que mais gera viralização rápida no momento é o Salvamento e Compartilhamento de vídeo. Crie suspense absoluto ao apresentar um site valioso e instigue: "O nome desse site está escondido nos meus stories, ou comente QUERO abaixo que eu te envio o tutorial gratuito na hora". Isso triplica a retenção orgânica pelos comentários inflados e força o algoritmo a impulsioná-lo globalmente.',
      initialLikes: 312
    },
    {
      id: 'feed_5',
      category: 'Tendência Legal',
      source: 'Notícias Digitais',
      time: 'Há 2 dias',
      title: 'Formatos de Curiosidades com Imagens Curtas IA',
      content: 'Vídeos com roteiros do tipo: "3 Coisas que as grandes empresas sabem de você e escondem no seu telefone" estão faturando alto do programa de recompensas do TikTok. Crie sequências de fotos com zoom dinâmico e use legendas rápidas de 1 segundo por palavra para forçar o usuário a reassistir os trechos várias vezes. Essa re-visualização rápida maximiza seu CPM.',
      initialLikes: 97
    }
  ];

  const handleToggleLike = (id: string) => {
    let updated: string[];
    let delta = 0;
    if (likedList.includes(id)) {
      updated = likedList.filter(item => item !== id);
      delta = -1;
    } else {
      updated = [...likedList, id];
      delta = 1;
      showToast('Obrigado pelo feedback!', 'success');
    }
    setLikedList(updated);
    localStorage.setItem('liked_feed_tips', JSON.stringify(updated));
    setFeedLikes(prev => ({ ...prev, [id]: prev[id] + delta }));
  };

  const handleToggleSave = (id: string, title: string) => {
    let updated: string[];
    if (savedTips.includes(id)) {
      updated = savedTips.filter(item => item !== id);
      showToast('Sacada removida dos favoritos', 'info');
    } else {
      updated = [...savedTips, id];
      showToast('Sacada salva nos seus Favoritos!', 'success');
    }
    setSavedTips(updated);
    localStorage.setItem('saved_feed_tips', JSON.stringify(updated));
  };

  const handleShareTip = (item: FeedItem) => {
    const textToShare = `🔥 *SACADA MONEYNET AI* 🔥\n\n*${item.title}*\n_${item.category}_\n\n${item.content}\n\n👉 Aprenda mais no app MoneyNet AI!`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(textToShare)}`;
    window.open(whatsappUrl, '_blank');
    showToast('Link de compartilhamento aberto!', 'success');
  };

  return (
    <div className="px-6 py-4 space-y-6 text-left" id="feed_tab_container">
      {/* Intro Feed Alert banner */}
      <div className="bg-gradient-to-br from-indigo-500/15 via-purple-500/5 to-transparent p-5 rounded-3xl border border-indigo-500/10 flex items-start gap-4">
        <div className="p-3 bg-indigo-600 rounded-2xl shrink-0 shadow-lg shadow-indigo-600/10">
          <Flame className="w-6 h-6 text-white animate-pulse" />
        </div>
        <div className="space-y-1">
          <h4 className="font-extrabold text-sm text-slate-800 dark:text-white leading-tight">Insight em Tempo Real</h4>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
            Confira sacadas práticas de quem já fatura alto na internet. Sem rodeios ou teorias demoradas. Use estas sacadas hoje nos seus posts.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between px-1">
        <h3 className="font-black text-lg text-slate-900 dark:text-white tracking-tight">Estúdio Diário</h3>
        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500 bg-emerald-500/10 dark:bg-emerald-500/20 px-3 py-1 rounded-full flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
          Atualizado hoje
        </span>
      </div>

      {/* AdSense Unit inline */}
      <div className="bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 p-4 rounded-3xl border-dashed relative text-center">
        <span className="absolute left-4 top-3 text-[9px] font-black uppercase text-slate-400 tracking-wider">Patrocinado | AdSense</span>
        <div className="h-14 flex items-center justify-center pt-2">
          <p className="text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline cursor-pointer flex items-center gap-1">
            <ShoppingBag className="w-4 h-4" /> Quer monetizar mais rápido? Ative a Inteligência Renda e multiplique alcances.
          </p>
        </div>
      </div>

      {/* Feed Cards List */}
      <div className="space-y-5">
        {feedItems.map((item) => {
          const isLiked = likedList.includes(item.id);
          const isSaved = savedTips.includes(item.id);
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 rounded-[28px] p-6 shadow-sm flex flex-col gap-4 relative"
              id={`feed_card_${item.id}`}
            >
              {/* Card Meta details */}
              <div className="flex justify-between items-center shrink-0">
                <span className="text-[10px] uppercase font-black tracking-widest bg-blue-500/10 text-blue-600 dark:bg-blue-600/20 dark:text-blue-300 px-3 py-1 rounded-full">
                  {item.category}
                </span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">{item.time}</span>
              </div>

              {/* Card Body Title & Text Content */}
              <div className="space-y-2">
                <h4 className="font-black text-base text-slate-900 dark:text-white leading-snug">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal whitespace-normal">
                  {item.content}
                </p>
              </div>

              {/* Action Toolbar */}
              <div className="h-px bg-slate-50 dark:bg-white/5 w-full mt-2" />
              <div className="flex justify-between items-center mt-1 shrink-0">
                <div className="flex gap-4">
                  {/* Like Button */}
                  <button
                    onClick={() => handleToggleLike(item.id)}
                    className="flex items-center gap-1.5 p-1 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 group transition-colors"
                    id={`like_btn_${item.id}`}
                  >
                    <Heart
                      className={`w-4 h-4 transition-transform duration-200 group-active:scale-125 ${
                        isLiked ? 'text-rose-500 fill-rose-500' : 'text-slate-400 group-hover:text-rose-500'
                      }`}
                    />
                    <span className={`text-xs font-bold ${isLiked ? 'text-rose-600' : 'text-slate-400'}`}>
                      {feedLikes[item.id] || item.initialLikes}
                    </span>
                  </button>

                  {/* Bookmark Button */}
                  <button
                    onClick={() => handleToggleSave(item.id, item.title)}
                    className="flex items-center p-1 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 group transition-colors"
                    title="Salvar nos Favoritos"
                    id={`save_btn_${item.id}`}
                  >
                    <Bookmark
                      className={`w-4 h-4 transition-transform ${
                        isSaved ? 'text-amber-500 fill-amber-500' : 'text-slate-400 group-hover:text-amber-500'
                      }`}
                    />
                  </button>
                </div>

                {/* Share Button */}
                <button
                  onClick={() => handleShareTip(item)}
                  className="p-2 bg-slate-50 dark:bg-white/5 rounded-xl hover:bg-blue-500/10 hover:text-blue-600 dark:hover:text-blue-400 text-slate-400 transition-colors"
                  title="Compartilhar pelo WhatsApp"
                  id={`share_btn_${item.id}`}
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
