import React from 'react';
import { motion } from 'motion/react';
import { Bookmark, Clock, ArrowRight, Trash2, Award, Clipboard, Copy, FileText, Globe } from 'lucide-react';
import { CONTENT_BY_LANGUAGE } from '../constants/content';

interface SavedCentralProps {
  onSelectSection: (sectionId: string) => void;
  showToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
  language: string;
}

interface AffiliateLink {
  id: string;
  name: string;
  url: string;
}

export const SavedCentral: React.FC<SavedCentralProps> = ({ onSelectSection, showToast, language }) => {
  const appContent = CONTENT_BY_LANGUAGE[language] || CONTENT_BY_LANGUAGE['pt'] || [];

  // Bookmarks state
  const [favoriteIds, setFavoriteIds] = React.useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('favorite_subsections');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Reading history state
  const [historyIds, setHistoryIds] = React.useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('reading_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Local affiliate links
  const [affiliateLinks, setAffiliateLinks] = React.useState<AffiliateLink[]>(() => {
    try {
      const saved = localStorage.getItem('user_affiliate_links');
      return saved ? JSON.parse(saved) : [
        { id: 'lnk_1', name: 'Meu Produto Kiwify', url: 'https://pay.kiwify.com.br/exemplo' },
        { id: 'lnk_2', name: 'Canal de Telegram Parceiro', url: 'https://t.me/seuchanel' }
      ];
    } catch {
      return [];
    }
  });

  const [newLinkName, setNewLinkName] = React.useState('');
  const [newLinkUrl, setNewLinkUrl] = React.useState('');

  const getSubsectionMetadata = (subId: string) => {
    for (const section of appContent) {
      if (section.subsections) {
        const sub = section.subsections.find(s => s.id === subId);
        if (sub) {
          return {
            sectionId: section.id,
            sectionTitle: section.title,
            subId: sub.id,
            subTitle: sub.title,
            subDesc: sub.description
          };
        }
      }
    }
    return null;
  };

  const clearHistory = () => {
    if (window.confirm('Quer realmente limpar seu histórico de leitura?')) {
      localStorage.removeItem('reading_history');
      setHistoryIds([]);
      showToast('Histórico limpo com sucesso!', 'info');
    }
  };

  const handleAddAffiliateLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLinkName || !newLinkUrl) {
      showToast('Preencha os dados do link!', 'error');
      return;
    }
    const newLnk: AffiliateLink = {
      id: `aff_${Date.now()}`,
      name: newLinkName,
      url: newLinkUrl
    };
    const updated = [...affiliateLinks, newLnk];
    setAffiliateLinks(updated);
    localStorage.setItem('user_affiliate_links', JSON.stringify(updated));
    setNewLinkName('');
    setNewLinkUrl('');
    showToast('Link do parceiro cadastrado com sucesso!', 'success');
  };

  const handleDeleteAffLink = (id: string) => {
    const updated = affiliateLinks.filter(item => item.id !== id);
    setAffiliateLinks(updated);
    localStorage.setItem('user_affiliate_links', JSON.stringify(updated));
    showToast('Link removido.', 'info');
  };

  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    showToast('Link copiado pronto para enviar!', 'success');
  };

  // Resolve metadata lists
  const favoriteItems = favoriteIds.map(getSubsectionMetadata).filter(Boolean);
  const historyItems = historyIds.map(getSubsectionMetadata).filter(Boolean);

  return (
    <div className="px-6 py-4 space-y-8 text-left" id="saved_central_tab">
      
      {/* 1. Saved Lectures (Favorited Subsections) */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 rounded-[32px] p-6 shadow-sm space-y-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-yellow-500/10 text-yellow-500 rounded-xl">
            <Bookmark className="w-5 h-5 fill-yellow-500" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white leading-none">Minhas Aulas Salvas</h3>
            <p className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase mt-1">Sua Trilha Sob Medida</p>
          </div>
        </div>

        {favoriteItems.length === 0 ? (
          <div className="border border-dashed border-slate-200 dark:border-white/5 p-8 rounded-2xl text-center space-y-2">
            <span className="text-xl">🔖</span>
            <p className="font-black text-xs text-slate-800 dark:text-slate-200">Nenhuma aula marcada ainda</p>
            <p className="text-[11px] text-slate-400 max-w-[200px] mx-auto font-medium">Toque no marcador dentro de qualquer aula para salvar aqui para estudar depois.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {favoriteItems.map((item: any, idx) => (
              <button
                key={`${item.subId}-${idx}`}
                onClick={() => onSelectSection(item.sectionId)}
                className="w-full bg-slate-50 dark:bg-white/5 p-4 rounded-2xl text-left border border-slate-100 dark:border-white/5 flex items-center justify-between group hover:border-blue-500/30 transition-all active:scale-[0.98]"
                id={`fav_item_${item.subId}`}
              >
                <div className="space-y-0.5 pr-4">
                  <p className="text-[9px] uppercase font-black text-slate-400 leading-none">{item.sectionTitle}</p>
                  <h4 className="font-extrabold text-xs text-slate-900 dark:text-white leading-tight mt-1 group-hover:text-blue-500 shadow-none">
                    {item.subTitle}
                  </h4>
                </div>
                <div className="p-1 px-2.5 bg-blue-500/10 text-blue-600 dark:bg-blue-600/20 dark:text-blue-400 rounded-lg text-[10px] uppercase font-black tracking-wider flex items-center gap-1 shrink-0">
                  Estudar
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 2. Reading History */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 rounded-[32px] p-6 shadow-sm space-y-5">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-505/10 text-indigo-600 rounded-xl">
              <Clock className="w-5 h-5 text-indigo-500" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white leading-none">Acessados Recentemente</h3>
              <p className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase mt-1 font-sans">Histórico de Visualização</p>
            </div>
          </div>
          {historyItems.length > 0 && (
            <button
              onClick={clearHistory}
              className="text-[10px] font-black uppercase text-red-500 tracking-wider flex items-center gap-1"
              id="btn_clear_history"
            >
              <Trash2 className="w-3 h-3" />
              Limpar
            </button>
          )}
        </div>

        {historyItems.length === 0 ? (
          <div className="p-8 text-center text-slate-400 border border-dashed border-slate-100 dark:border-white/5 rounded-2xl text-xs font-semibold">
            Você ainda não abriu nenhuma seção hoje.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {historyItems.map((item: any, idx) => (
              <button
                key={`${item.subId}-${idx}`}
                onClick={() => onSelectSection(item.sectionId)}
                className="w-full bg-slate-50 dark:bg-white/5 p-4 rounded-2xl text-left border border-slate-100 dark:border-white/5 flex items-center justify-between group hover:border-blue-500/10 transition-all active:scale-[0.98]"
                id={`hist_item_${item.subId}`}
              >
                <div className="space-y-0.5">
                  <p className="text-[9px] uppercase font-black text-slate-400 leading-none">{item.sectionTitle}</p>
                  <h4 className="font-extrabold text-xs text-slate-900 dark:text-white leading-tight mt-1">
                    {item.subTitle}
                  </h4>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 transition-colors shrink-0" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 3. Link de Afiliado Assistant (Custom tool) */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 rounded-[32px] p-6 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-500/10 text-blue-600 rounded-xl">
            <Globe className="w-5 h-5 text-blue-500 animate-spin" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white leading-none">Assistente de Links Afiliados</h3>
            <p className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase mt-1">Organização Rápida de Vendas</p>
          </div>
        </div>

        <p className="text-xs text-slate-500 leading-relaxed font-semibold">
          Guarde seus links especiais de afiliado da Kiwify, Hotmart ou Amazon para copiá-los de forma imediata quando for enviar para os clientes!
        </p>

        {/* List of links */}
        <div className="space-y-3">
          {affiliateLinks.map((item) => (
            <div key={item.id} className="p-3 bg-slate-50 dark:bg-white/5 rounded-2xl flex items-center justify-between border border-slate-100 dark:border-white/5" id={`link_row_${item.id}`}>
              <div className="min-w-0 pr-3">
                <p className="font-extrabold text-slate-900 dark:text-white text-xs truncate leading-none mb-1">{item.name}</p>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 font-mono truncate">{item.url}</p>
              </div>

              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => handleCopyLink(item.url)}
                  className="px-2.5 py-1.5 bg-blue-600 text-white rounded-xl text-[10px] font-black flex items-center gap-1 active:scale-95"
                  id={`btn_copy_link_${item.id}`}
                >
                  <Copy className="w-3 h-3" />
                  Copiar
                </button>
                <button
                  onClick={() => handleDeleteAffLink(item.id)}
                  className="p-1.5 hover:bg-red-50 text-red-500 rounded-xl"
                  id={`btn_delete_link_${item.id}`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Link Form */}
        <form onSubmit={handleAddAffiliateLink} className="space-y-3 shrink-0 pt-4 border-t border-slate-100 dark:border-white/5">
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Nome do Produto:</label>
            <input
              type="text"
              value={newLinkName}
              onChange={(e) => setNewLinkName(e.target.value)}
              placeholder="Ex: Guia de Prompts IA"
              className="w-full p-3 bg-slate-50 dark:bg-white/5 border-none outline-none font-bold text-xs rounded-xl focus:ring-1 focus:ring-blue-500 dark:text-white"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Link de Afiliado Oficial:</label>
            <input
              type="text"
              value={newLinkUrl}
              onChange={(e) => setNewLinkUrl(e.target.value)}
              placeholder="Ex: https://kiwify..."
              className="w-full p-3 bg-slate-50 dark:bg-white/5 border-none outline-none font-bold text-xs rounded-xl focus:ring-1 focus:ring-blue-500 dark:text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4.5 bg-slate-900 hover:bg-slate-950 dark:bg-white/10 dark:hover:bg-white/20 text-white font-extrabold text-xs rounded-2xl transition-all"
            id="btn_add_affiliate_link"
          >
            Cadastrar Novo Link de Vendas 💸
          </button>
        </form>
      </div>
    </div>
  );
};
