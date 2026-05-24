import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Camera, 
  User, 
  Check, 
  Sparkles, 
  Flame, 
  DollarSign, 
  Instagram, 
  Youtube, 
  Play, 
  Globe, 
  Award, 
  Target, 
  Upload, 
  Edit3, 
  CheckSquare, 
  Bookmark,
  TrendingUp,
  Sliders,
  CheckCircle2
} from 'lucide-react';
import { useToast } from './Toast';
import { useLanguage } from '../hooks/useLanguage';

interface UserProfileProps {
  onBack: () => void;
  onProfileUpdated?: (newName: string, newPhoto?: string) => void;
}

interface ProfileData {
  displayName: string;
  avatar: string; // Base64 or Emoji/Preset name
  platform: 'tiktok' | 'meta' | 'youtube' | '';
  handle: string;
  niche: string;
  bioName: string; // Custom promise/bio
  targetIncome: string;
  dailyVideoGoal: string;
  linkInBio: string;
}

// Gorgeous preset avatars with theme-coded gradients and icons
const PRESET_AVATARS = [
  { id: 'preset_rocket', label: 'Foguete 🚀', gradient: 'from-blue-600 via-indigo-600 to-purple-600', text: '🚀' },
  { id: 'preset_cash', label: 'Investidor 💸', gradient: 'from-emerald-500 to-teal-600', text: '💸' },
  { id: 'preset_star', label: 'Estrela ✨', gradient: 'from-amber-400 to-orange-500', text: '✨' },
  { id: 'preset_laptop', label: 'Nômade 💻', gradient: 'from-slate-700 to-slate-900', text: '💻' },
  { id: 'preset_fire', label: 'Viral 🔥', gradient: 'from-red-500 to-rose-600', text: '🔥' },
  { id: 'preset_crown', label: 'Mestre 👑', gradient: 'from-yellow-400 to-amber-600', text: '👑' },
];

const NICHES = [
  { id: 'financas', label: 'Finanças & Inteligência Renda', icon: '💰' },
  { id: 'motivacao', label: 'Estilo de Vida & Motivação Estóica', icon: '🔥' },
  { id: 'dropshipping', label: 'Negócios Online & E-commerce', icon: '🛒' },
  { id: 'reviews', label: 'Achadinhos & Reviews de Gadgets', icon: '📦' },
  { id: 'humor', label: 'Cortes Viral & Humor Limpo', icon: '🎭' },
];

const INCOME_TARGETS = [
  'R$ 2.000 / mês',
  'R$ 5.000 / mês',
  'R$ 10.000 / mês',
  'R$ 20.000 / mês',
  'R$ 50.000+ / mês'
];

const DAILY_GOALS = [
  '1 Vídeo / dia (Consistente)',
  '2 Vídeos / dia (Agressivo)',
  '3+ Vídeos / dia (Extremo viral)',
];

export const UserProfile: React.FC<UserProfileProps> = ({ onBack, onProfileUpdated }) => {
  const { showToast } = useToast();
  const { t } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<ProfileData>(() => {
    // Attempt loading from user_profile or fallback to auth user / mock user
    const saved = localStorage.getItem('user_profile_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // ignore
      }
    }

    // Default template fallbacks
    let fallbackName = 'Criador de Sucesso';
    const mockUserStr = localStorage.getItem('mock_user_session');
    if (mockUserStr) {
      try {
        const u = JSON.parse(mockUserStr);
        if (u.displayName) fallbackName = u.displayName;
      } catch (e) {}
    }

    return {
      displayName: fallbackName,
      avatar: 'preset_rocket',
      platform: 'tiktok',
      handle: '',
      niche: 'motivacao',
      bioName: '',
      targetIncome: 'R$ 5.000 / mês',
      dailyVideoGoal: '1 Vídeo / dia (Consistente)',
      linkInBio: '',
    };
  });

  const [showAvatarSelector, setShowAvatarSelector] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'goals' | 'audit'>('profile');

  // Calculate Profile Completeness Score
  const getCompletenessScore = () => {
    let score = 0;
    if (formData.displayName.trim() && formData.displayName !== 'Criador de Sucesso') score += 15;
    if (formData.avatar) score += 15;
    if (formData.platform) score += 15;
    if (formData.handle.trim()) score += 15;
    if (formData.niche) score += 15;
    if (formData.bioName.trim()) score += 10;
    if (formData.linkInBio.trim()) score += 15;
    return score;
  };

  const completenessScore = getCompletenessScore();

  // Tier names based on scores
  const getProfileTier = () => {
    if (completenessScore < 40) return { name: 'Aspirante a Viral 🔴', desc: 'Preencha mais campos para otimizar sua imagem profissional.', color: 'text-red-500' };
    if (completenessScore < 80) return { name: 'Estrategista Inteligente 🟡', desc: 'Seu perfil está tomando corpo profissional! Quase lá.', color: 'text-amber-500' };
    return { name: 'Mestre do Algoritmo 🟢', desc: 'Seu perfil está impecavelmente estruturado e calibrado para monetizar!', color: 'text-green-500' };
  };

  const tier = getProfileTier();

  // Handle Photo File upload and conversion to Base64
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      showToast('A foto deve ser menor do que 2MB', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setFormData(prev => ({ ...prev, avatar: base64String }));
      showToast('Foto do perfil adicionada com sucesso!', 'success');
    };
    reader.readAsDataURL(file);
  };

  // Select a preset avatar
  const handleSelectPreset = (presetId: string) => {
    setFormData(prev => ({ ...prev, avatar: presetId }));
    setShowAvatarSelector(false);
    showToast('Avatar atualizado!', 'success');
  };

  // Handle profile save
  const handleSaveProfile = () => {
    if (!formData.displayName.trim()) {
      showToast('Por favor, informe seu nome de criador.', 'error');
      return;
    }

    // Persist profile
    localStorage.setItem('user_profile_data', JSON.stringify(formData));

    // Also synchronize this display name with mock session so Dashboard header updates instantly
    const mockUserStr = localStorage.getItem('mock_user_session');
    if (mockUserStr) {
      try {
        const u = JSON.parse(mockUserStr);
        u.displayName = formData.displayName;
        localStorage.setItem('mock_user_session', JSON.stringify(u));
      } catch (e) {}
    }

    // Trigger update handler for App state
    if (onProfileUpdated) {
      onProfileUpdated(formData.displayName, formData.avatar);
    }

    showToast('Perfil salvo e otimizado com sucesso!', 'success');
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 select-text">
      {/* Top Header */}
      <div className="p-4 sm:p-5 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-white/5 flex items-center justify-between shadow-sm shrink-0">
        <div className="flex items-center gap-3">
          <button 
            type="button"
            id="btn_back_profile"
            onClick={onBack}
            className="p-2 sm:p-2.5 bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 rounded-xl text-slate-500 dark:text-slate-400 Transition-all active:scale-90"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-white uppercase">
              MEU PERFIL CRIADOR
            </h1>
            <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 tracking-wider uppercase">
              Otimize sua máquina de views
            </p>
          </div>
        </div>
        
        <button
          type="button"
          id="btn_save_profile_top"
          onClick={handleSaveProfile}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-black tracking-wider uppercase shadow-[0_4px_12px_rgba(37,99,235,0.2)] hover:shadow-[0_4px_16px_rgba(37,99,235,0.3)] active:scale-95 transition-all flex items-center gap-1.5"
        >
          <Check className="w-3.5 h-3.5" />
          {t('common.save') || 'Salvar'}
        </button>
      </div>

      {/* Tabs navigation */}
      <div className="px-4 sm:px-6 py-2.5 bg-white dark:bg-slate-900/40 border-b border-slate-100 dark:border-white/5 flex gap-2 shrink-0">
        <button
          type="button"
          onClick={() => setActiveTab('profile')}
          className={`flex-1 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-colors ${
            activeTab === 'profile' 
              ? 'bg-blue-600/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400' 
              : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
          }`}
        >
          1. Identidade
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('goals')}
          className={`flex-1 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-colors ${
            activeTab === 'goals' 
              ? 'bg-blue-600/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400' 
              : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
          }`}
        >
          2. Planejamento
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('audit')}
          className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-black uppercase tracking-wider transition-colors flex items-center justify-center gap-1 ${
            activeTab === 'audit' 
              ? 'bg-emerald-600/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400' 
              : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
          }`}
        >
          <Award className="w-3.5 h-3.5 text-emerald-500" />
          3. Auditoria
        </button>
      </div>

      {/* Scrollable Form Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5 custom-scrollbar pb-10">
        {activeTab === 'profile' && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-5"
          >
            {/* Visual Header / Profile Photo Section */}
            <div className="bg-white dark:bg-slate-900 rounded-[32px] p-6 border border-slate-100 dark:border-white/5 flex flex-col items-center text-center shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 dark:bg-blue-500/10 rounded-full filter blur-xl pointer-events-none" />
              
              {/* Avatar Rendering */}
              <div className="relative mb-4 group cursor-pointer" onClick={() => setShowAvatarSelector(!showAvatarSelector)}>
                {formData.avatar.startsWith('data:image/') ? (
                  <img 
                    src={formData.avatar} 
                    alt="Custom Avatar" 
                    referrerPolicy="no-referrer"
                    className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-slate-800 shadow-xl"
                  />
                ) : (
                  (() => {
                    const preset = PRESET_AVATARS.find(p => p.id === formData.avatar) || PRESET_AVATARS[0];
                    return (
                      <div className={`w-24 h-24 rounded-full bg-gradient-to-tr ${preset.gradient} flex items-center justify-center text-4xl shadow-xl border-4 border-white dark:border-slate-800 relative`}>
                        {preset.text}
                      </div>
                    );
                  })()
                )}
                
                {/* Overlay edit banner */}
                <div className="absolute inset-0 bg-slate-900/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-6 h-6 text-white" />
                </div>
                
                <button 
                  type="button"
                  className="absolute bottom-0 right-0 p-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-lg border border-white dark:border-slate-800"
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Show preset selectors or upload fields */}
              <AnimatePresence>
                {showAvatarSelector ? (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="w-full bg-slate-50 dark:bg-white/5 rounded-2xl p-4 mb-4 border border-slate-100 dark:border-white/5 space-y-3"
                  >
                    <p className="text-xs font-black tracking-wider text-slate-400 dark:text-slate-500 uppercase">
                      Escolha um preset ou faça upload
                    </p>
                    <div className="grid grid-cols-6 gap-2">
                      {PRESET_AVATARS.map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => handleSelectPreset(p.id)}
                          className={`h-10 rounded-xl bg-gradient-to-tr ${p.gradient} text-lg flex items-center justify-center transition-all ${
                            formData.avatar === p.id ? 'ring-2 ring-blue-500 scale-105' : 'hover:scale-105'
                          }`}
                          title={p.label}
                        >
                          {p.text}
                        </button>
                      ))}
                    </div>

                    <div className="h-px bg-slate-200 dark:bg-white/10 my-1" />

                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full py-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10 rounded-xl text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Upload className="w-3.5 h-3.5 text-blue-500" />
                      ESCOLHER FOTO DA GALERIA
                    </button>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handlePhotoUpload} 
                      accept="image/*" 
                      className="hidden" 
                    />
                  </motion.div>
                ) : (
                  <button 
                    type="button"
                    onClick={() => setShowAvatarSelector(true)}
                    className="text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline mb-3"
                  >
                    Alterar Foto ou Avatar
                  </button>
                )}
              </AnimatePresence>

              {/* Name Display */}
              <h2 className="text-lg font-black text-slate-900 dark:text-white leading-tight">
                {formData.displayName || 'Criador'}
              </h2>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 tracking-wide">
                Configurações visuais do canal de vendas
              </p>
            </div>

            {/* Input Form Fields */}
            <div className="bg-white dark:bg-slate-900 rounded-[32px] p-5 sm:p-6 border border-slate-100 dark:border-white/5 space-y-4 shadow-sm">
              <h3 className="text-xs font-black text-slate-900 dark:text-white tracking-widest uppercase mb-1 flex items-center gap-1.5">
                <span className="w-1.5 h-3.5 bg-blue-600 rounded-full" />
                IDENTIDADE DE CRIADOR
              </h3>

              {/* Editable Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide flex items-center justify-between">
                  <span>Nome do Criador</span>
                  <span className="text-[10px] text-slate-300 dark:text-slate-600">Obrigatório</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-600 w-4 h-4" />
                  <input
                    type="text"
                    value={formData.displayName}
                    onChange={(e) => setFormData(prev => ({ ...prev, displayName: e.target.value }))}
                    placeholder="Digite seu nome ou nickname..."
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-xs sm:text-sm font-medium text-slate-800 dark:text-white"
                  />
                </div>
              </div>

              {/* Niche Choice */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide block">
                  Nicho de Atuação
                </label>
                <div className="space-y-1.5">
                  {NICHES.map((n) => (
                    <button
                      key={n.id}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, niche: n.id }))}
                      className={`w-full p-3 rounded-xl border flex items-center justify-between text-left transition-all ${
                        formData.niche === n.id 
                          ? 'border-blue-500 bg-blue-600/5 dark:bg-blue-500/10 text-slate-900 dark:text-white' 
                          : 'border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:border-slate-200 dark:hover:border-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-base leading-none">{n.icon}</span>
                        <span className="text-xs font-bold tracking-tight">{n.label}</span>
                      </div>
                      {formData.niche === n.id && (
                        <div className="w-5 h-5 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center text-white shrink-0">
                          <Check className="w-3 h-3" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Platform & Account Form Fields */}
            <div className="bg-white dark:bg-slate-900 rounded-[32px] p-5 sm:p-6 border border-slate-100 dark:border-white/5 space-y-4 shadow-sm">
              <h3 className="text-xs font-black text-slate-900 dark:text-white tracking-widest uppercase mb-1 flex items-center gap-1.5">
                <span className="w-1.5 h-3.5 bg-indigo-600 rounded-full" />
                CONTA E REDE SOCIAL CANAL
              </h3>

              {/* Platform Selector Cards */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, platform: 'tiktok' }))}
                  className={`p-3 rounded-2xl border flex flex-col items-center gap-2 text-center transition-all ${
                    formData.platform === 'tiktok' 
                      ? 'border-black bg-black/5 dark:bg-black/40 text-black dark:text-white scale-102 ring-1 ring-black/20' 
                      : 'border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/5 text-slate-400 hover:border-slate-200 dark:hover:border-white/10'
                  }`}
                >
                  <div className={`p-1.5 rounded-lg text-white ${formData.platform === 'tiktok' ? 'bg-black' : 'bg-slate-300'}`}>
                    <Play className="w-4 h-4 fill-white" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider">TikTok</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, platform: 'meta' }))}
                  className={`p-3 rounded-2xl border flex flex-col items-center gap-2 text-center transition-all ${
                    formData.platform === 'meta' 
                      ? 'border-pink-500 bg-pink-500/5 text-pink-600 dark:text-pink-400 scale-102 ring-1 ring-pink-500/20' 
                      : 'border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/5 text-slate-400 hover:border-slate-200 dark:hover:border-white/10'
                  }`}
                >
                  <div className={`p-1.5 rounded-lg text-white ${formData.platform === 'meta' ? 'bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600' : 'bg-slate-300'}`}>
                    <Instagram className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider">Instagram</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, platform: 'youtube' }))}
                  className={`p-3 rounded-2xl border flex flex-col items-center gap-2 text-center transition-all ${
                    formData.platform === 'youtube' 
                      ? 'border-red-600 bg-red-600/5 text-red-600 scale-102 ring-1 ring-red-600/20' 
                      : 'border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/5 text-slate-400 hover:border-slate-200 dark:hover:border-white/10'
                  }`}
                >
                  <div className={`p-1.5 rounded-lg text-white ${formData.platform === 'youtube' ? 'bg-red-600' : 'bg-slate-300'}`}>
                    <Youtube className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider">Youtube</span>
                </button>
              </div>

              {/* Username Handle Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide block">
                  @ Nome do Usuário (Handle)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-600 text-xs sm:text-sm font-black">@</span>
                  <input
                    type="text"
                    value={formData.handle.startsWith('@') ? formData.handle.slice(1) : formData.handle}
                    onChange={(e) => setFormData(prev => ({ ...prev, handle: '@' + e.target.value.trim().replace(/@/g, '') }))}
                    placeholder="seu_perfil"
                    className="w-full pl-8 pr-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-xs sm:text-sm font-semibold text-slate-800 dark:text-white"
                  />
                </div>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 leading-normal">
                  Insira o @usuario do seu perfil para que a inteligência artificial organize conselhos personalizados.
                </p>
              </div>

              {/* Unique Bio Promise Value (Promessa da bio) */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide block">
                  Promessa Forte / Bio do Perfil
                </label>
                <div className="relative">
                  <Edit3 className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-600 w-4 h-4" />
                  <input
                    type="text"
                    value={formData.bioName}
                    onChange={(e) => setFormData(prev => ({ ...prev, bioName: e.target.value }))}
                    placeholder="Ex: Te mostro o caminho da independência financeira com cortes"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-xs sm:text-sm font-medium text-slate-800 dark:text-white"
                  />
                </div>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 leading-normal">
                  Sua proposta única de valor que converte visitantes frios em seguidores quentes.
                </p>
              </div>

              {/* Link na Bio */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide block">
                  Link de Afiliado ou Site na Bio
                </label>
                <div className="relative">
                  <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-600 w-4 h-4" />
                  <input
                    type="url"
                    value={formData.linkInBio}
                    onChange={(e) => setFormData(prev => ({ ...prev, linkInBio: e.target.value }))}
                    placeholder="https://suapagina.com/afiliado"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-xs sm:text-sm font-medium text-slate-800 dark:text-white"
                  />
                </div>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 leading-normal">
                  É para onde você vai direcionar todo o engajamento dos seus vídeos!
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'goals' && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-5"
          >
            {/* Income Settings Panel */}
            <div className="bg-white dark:bg-slate-900 rounded-[32px] p-5 sm:p-6 border border-slate-100 dark:border-white/5 space-y-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-orange-500/10 text-orange-500 rounded-2xl">
                  <DollarSign className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase leading-none">
                    META DE FATURAMENTO
                  </h3>
                  <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 mt-1 uppercase tracking-wider">
                    Sua meta mensal com o algoritmo
                  </p>
                </div>
              </div>

              <div className="h-px bg-slate-100 dark:bg-white/5 my-2" />

              <div className="space-y-2">
                {INCOME_TARGETS.map((target) => (
                  <button
                    key={target}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, targetIncome: target }))}
                    className={`w-full p-4 rounded-xl border flex items-center justify-between text-left transition-all ${
                      formData.targetIncome === target 
                        ? 'border-orange-500 bg-orange-500/5 text-orange-600 dark:text-orange-400 font-extrabold scale-101 shadow-sm' 
                        : 'border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:border-slate-200 dark:hover:border-white/10'
                    }`}
                  >
                    <span className="text-xs sm:text-sm">{target}</span>
                    {formData.targetIncome === target && (
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white shrink-0 shadow-lg shadow-orange-500/30">
                        <Check className="w-3 h-3" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Posting Goals Panel */}
            <div className="bg-white dark:bg-slate-900 rounded-[32px] p-5 sm:p-6 border border-slate-100 dark:border-white/5 space-y-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-500/10 text-blue-500 rounded-2xl">
                  <Flame className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase leading-none">
                    FREQUÊNCIA DE POSTAGEM
                  </h3>
                  <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 mt-1 uppercase tracking-wider">
                    Volume planejado por dia
                  </p>
                </div>
              </div>

              <div className="h-px bg-slate-100 dark:bg-white/5 my-2" />

              <div className="space-y-2">
                {DAILY_GOALS.map((goal) => (
                  <button
                    key={goal}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, dailyVideoGoal: goal }))}
                    className={`w-full p-4 rounded-xl border flex items-center justify-between text-left transition-all ${
                      formData.dailyVideoGoal === goal 
                        ? 'border-blue-500 bg-blue-600/5 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 font-extrabold scale-101 shadow-sm' 
                        : 'border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:border-slate-200 dark:hover:border-white/10'
                    }`}
                  >
                    <span className="text-xs sm:text-sm">{goal}</span>
                    {formData.dailyVideoGoal === goal && (
                      <div className="w-5 h-5 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-500/30">
                        <Check className="w-3 h-3" />
                      </div>
                    )}
                  </button>
                ))}
              </div>

              <div className="p-3.5 bg-blue-600/5 dark:bg-blue-500/5 border border-blue-500/10 dark:border-blue-500/20 rounded-2xl text-[11px] leading-relaxed text-blue-700 dark:text-blue-300">
                💡 <strong>DICA DO REELS:</strong> O algoritmo de entrega orgânica favorece perfis de nicho que postam de forma recorrente e estruturada nos mesmos horários todos os dias.
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'audit' && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-5"
          >
            {/* Gamified optimization Audit Panel */}
            <div className="bg-white dark:bg-slate-900 rounded-[32px] p-5 sm:p-6 border border-slate-100 dark:border-white/5 text-center space-y-4 shadow-sm relative overflow-hidden">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full filter blur-2xl pointer-events-none" />
              
              <div className="mx-auto w-16 h-16 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/20 text-white mb-2">
                <Award className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-xs font-black tracking-widest text-slate-400 dark:text-slate-500 uppercase">
                  STATUS DA OTIMIZAÇÃO
                </h3>
                <h2 className={`text-base sm:text-lg font-black tracking-tight mt-1 ${tier.color}`}>
                  {tier.name}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto leading-relaxed">
                  {tier.desc}
                </p>
              </div>

              {/* Score Progress bar */}
              <div className="space-y-2 pt-2">
                <div className="flex justify-between items-center text-xs font-bold uppercase">
                  <span className="text-slate-400 dark:text-slate-600">Completude</span>
                  <span className="text-emerald-500">{completenessScore}%</span>
                </div>
                <div className="w-full h-3.5 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden p-0.5 border border-slate-200/50 dark:border-white/5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${completenessScore}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-green-400 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                  />
                </div>
              </div>
            </div>

            {/* Checklist items list */}
            <div className="bg-white dark:bg-slate-900 rounded-[32px] p-5 sm:p-6 border border-slate-100 dark:border-white/5 space-y-4 shadow-sm">
              <h3 className="text-xs font-black text-slate-900 dark:text-white tracking-widest uppercase mb-1 flex items-center gap-1.5">
                <span className="w-1.5 h-3.5 bg-emerald-600 rounded-full" />
                CHECKLIST DE AUDITORIA DE PERFIL
              </h3>

              <div className="space-y-2.5">
                {/* Rule 1 */}
                <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100/50 dark:border-white/5 transition-all">
                  <div className="mt-0.5 shrink-0">
                    {formData.displayName && formData.displayName !== 'Criador de Sucesso' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-slate-300 dark:border-slate-600" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      Nome Customizado do Perfil (+15%)
                    </h4>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 leading-normal">
                      Mostre quem você é ou o nome do seu canal de cortes em vez do padrão genérico.
                    </p>
                  </div>
                </div>

                {/* Rule 2 */}
                <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100/50 dark:border-white/5 transition-all">
                  <div className="mt-0.5 shrink-0">
                    {formData.handle ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-slate-300 dark:border-slate-600" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      @ Nome de Usuário Identificado (+15%)
                    </h4>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 leading-normal">
                      Configura o @ para dar clareza de pertencimento ao nicho.
                    </p>
                  </div>
                </div>

                {/* Rule 3 */}
                <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100/50 dark:border-white/5 transition-all">
                  <div className="mt-0.5 shrink-0">
                    {formData.bioName ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-slate-300 dark:border-slate-600" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      Proposta Única de Valor Preenchida (+10%)
                    </h4>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 leading-normal">
                      Garante que o visitante saiba exatamente qual benefício seu conteúdo traz.
                    </p>
                  </div>
                </div>

                {/* Rule 4 */}
                <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100/50 dark:border-white/5 transition-all">
                  <div className="mt-0.5 shrink-0">
                    {formData.linkInBio ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-slate-300 dark:border-slate-600" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      Link na Bio Configurado (+15%)
                    </h4>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 leading-normal">
                      Caminho principal de monetização e comissionamento.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Persistent Call to Action Base Button */}
      <div className="p-4 sm:p-5 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-white/5 shadow-inner shrink-0">
        <button
          type="button"
          id="btn_save_profile_footer"
          onClick={handleSaveProfile}
          className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl text-xs sm:text-sm font-black tracking-widest uppercase transition-all shadow-[0_4px_16px_rgba(37,99,235,0.2)] hover:shadow-[0_4px_20px_rgba(37,99,235,0.4)] active:scale-98 flex items-center justify-center gap-2"
        >
          <CheckCircle2 className="w-5 h-5" />
          SALVAR E ATUALIZAR MEU PERFIL
        </button>
      </div>
    </div>
  );
};
