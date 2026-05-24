import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Video, 
  ArrowLeft, 
  Sparkles, 
  Play, 
  Download, 
  Loader2, 
  AlertCircle,
  Key,
  Info,
  CheckCircle
} from 'lucide-react';
import { 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  serverTimestamp,
  doc,
  updateDoc
} from 'firebase/firestore';
import { auth, db, handleFirestoreError, OperationType } from '../lib/firebase';
import { generateVideo, checkVideoOperation, fetchVideoData } from '../services/geminiService';
import { PromptTutorial } from './PromptTutorial';

interface VideoItem {
  id: string;
  prompt: string;
  videoUrl?: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: any;
}

interface VideoGeneratorProps {
  onBack: () => void;
}

export const VideoGenerator: React.FC<VideoGeneratorProps> = ({ onBack }) => {
  const [prompt, setPrompt] = useState('');
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [generating, setGenerating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const [user, setUser] = useState<any>(() => {
    if (auth.currentUser) return auth.currentUser;
    const mockUserStr = localStorage.getItem('mock_user_session');
    if (mockUserStr) {
      try {
        return JSON.parse(mockUserStr);
      } catch {
        return null;
      }
    }
    return null;
  });

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((u) => {
      if (u) {
        setUser(u);
      } else {
        const mockUserStr = localStorage.getItem('mock_user_session');
        if (mockUserStr) {
          try {
            setUser(JSON.parse(mockUserStr));
          } catch {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      }
    });
    return () => unsub();
  }, []);

  const [videoBlobUrls, setVideoBlobUrls] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!user) return;

    if (user.uid.startsWith('mock-')) {
      const stored = localStorage.getItem(`mock_videos_${user.uid}`);
      if (stored) {
        try {
          setVideos(JSON.parse(stored));
        } catch {
          setVideos([]);
        }
      } else {
        setVideos([]);
      }
      return;
    }

    const q = query(
      collection(db, 'users', user.uid, 'videos'),
      orderBy('createdAt', 'desc')
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const vids = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as VideoItem[];
      setVideos(vids);
    }, (err) => handleFirestoreError(err, OperationType.LIST, `users/${user.uid}/videos`));

    return () => unsub();
  }, [user]);

  // Persist mock videos to localStorage
  useEffect(() => {
    if (user && user.uid.startsWith('mock-') && videos.length > 0) {
      localStorage.setItem(`mock_videos_${user.uid}`, JSON.stringify(videos));
    }
  }, [videos, user]);

  // Handle blob fetching separately to avoid infinite loops and unnecessary re-renders
  useEffect(() => {
    videos.forEach(async (vid) => {
      if (vid.status === 'completed' && vid.videoUrl && !videoBlobUrls[vid.id]) {
        try {
          const blobUrl = await fetchVideoData(vid.videoUrl);
          setVideoBlobUrls(prev => ({ ...prev, [vid.id]: blobUrl }));
        } catch (e) {
          console.error("Failed to fetch video blob:", e);
        }
      }
    });
  }, [videos, videoBlobUrls]);

  const checkApiKey = async () => {
    try {
      const hasKey = await (window as any).aistudio?.hasSelectedApiKey();
      setHasApiKey(!!hasKey);
    } catch (e) {
      console.error(e);
    }
  };

  const handleOpenKeySelector = async () => {
    try {
      await (window as any).aistudio?.openSelectKey();
      setHasApiKey(true);
    } catch (e) {
      console.error(e);
    }
  };

  const handleGenerate = async (overridePrompt?: string) => {
    const finalPrompt = overridePrompt || prompt;
    if (!finalPrompt.trim() || !user || generating) return;
    
    if (!hasApiKey && process.env.NODE_ENV === 'production') {
       setError('Por favor, selecione sua chave da API para gerar vídeos.');
       return;
    }

    setGenerating(true);
    setError(null);

    let videoId = '';
    try {
      // 1. Create entry in Firestore or local state
      if (!user.uid.startsWith('mock-')) {
        const docRef = await addDoc(collection(db, 'users', user.uid, 'videos'), {
          prompt: finalPrompt,
          status: 'pending',
          createdAt: serverTimestamp()
        });
        videoId = docRef.id;
      } else {
        videoId = 'mock-vid-' + Date.now();
        const newVideo: VideoItem = {
          id: videoId,
          prompt: finalPrompt,
          status: 'pending',
          createdAt: { seconds: Date.now() / 1000 } as any
        };
        setVideos(prev => [newVideo, ...prev]);
      }

      // 2. Start generation
      const operation = await generateVideo(finalPrompt);
      
      // 3. Start polling
      pollOperation(operation, videoId);
      
      if (!overridePrompt) setPrompt('');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err: any) {
      console.error(err);
      let msg = 'Erro ao iniciar geração de vídeo.';
      
      const errorString = err.message?.toLowerCase() || '';
      
      if (errorString.includes('permission') || errorString.includes('403') || errorString.includes('not authorized')) {
        msg = 'Permissão negada. Certifique-se de usar uma chave de API de um projeto com faturamento ativado (Paid Billing).';
      } else if (errorString.includes('quota') || errorString.includes('429') || errorString.includes('exhausted')) {
        msg = 'Limite de uso atingido (Quota). Tente novamente em alguns minutos ou use outra chave de API.';
      } else if (errorString.includes('invalid') || errorString.includes('401')) {
        msg = 'Chave de API inválida. Por favor, reconfigure sua chave nas configurações.';
      } else if (errorString.includes('safety') || errorString.includes('blocked') || errorString.includes('content')) {
        msg = 'O prompt foi bloqueado pelos filtros de segurança. Tente descrever sua ideia com outras palavras.';
      } else if (errorString.includes('server') || errorString.includes('500') || errorString.includes('503')) {
        msg = 'A IA está temporariamente ocupada ou instável. Tente novamente em instantes.';
      } else if (errorString.includes('network') || errorString.includes('fetch')) {
        msg = 'Erro de conexão. Verifique sua internet e tente novamente.';
      }
      
      setError(msg);
      if (videoId) {
        if (!user.uid.startsWith('mock-')) {
          await updateDoc(doc(db, 'users', user.uid, 'videos', videoId), {
            status: 'failed'
          });
        } else {
          setVideos(prev => {
            const updated = prev.map(v => v.id === videoId ? { ...v, status: 'failed' as const } : v);
            localStorage.setItem(`mock_videos_${user.uid}`, JSON.stringify(updated));
            return updated;
          });
        }
      }
    } finally {
      setGenerating(false);
    }
  };

  const pollOperation = async (initialOp: any, videoId: string) => {
    if (!user) return;
    let currentOp = initialOp;
    
    try {
      while (!currentOp.done) {
        await new Promise(r => setTimeout(r, 10000)); // Increased interval to 10s
        currentOp = await checkVideoOperation(currentOp);
      }

      if (currentOp.response?.generatedVideos?.[0]?.video?.uri) {
        const rawUrl = currentOp.response.generatedVideos[0].video.uri;
        
        if (!user.uid.startsWith('mock-')) {
          await updateDoc(doc(db, 'users', user.uid, 'videos', videoId), {
            videoUrl: rawUrl, // Store Gemini URI instead of blob
            status: 'completed'
          });
        } else {
          setVideos(prev => {
            const updated = prev.map(v => v.id === videoId ? { ...v, videoUrl: rawUrl, status: 'completed' as const } : v);
            localStorage.setItem(`mock_videos_${user.uid}`, JSON.stringify(updated));
            return updated;
          });
        }
        
        const blobUrl = await fetchVideoData(rawUrl);
        setVideoBlobUrls(prev => ({ ...prev, [videoId]: blobUrl }));
      } else {
        throw new Error('Video generation produced no result');
      }
    } catch (err) {
      console.error("Polling error:", err);
      if (!user.uid.startsWith('mock-')) {
        await updateDoc(doc(db, 'users', user.uid, 'videos', videoId), {
          status: 'failed'
        });
      } else {
        setVideos(prev => {
          const updated = prev.map(v => v.id === videoId ? { ...v, status: 'failed' as const } : v);
          localStorage.setItem(`mock_videos_${user.uid}`, JSON.stringify(updated));
          return updated;
        });
      }
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-white border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 bg-slate-50 rounded-xl">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </button>
          <div>
            <h1 className="font-bold text-slate-900 leading-tight">Gerador de Vídeos</h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Powered by Veo 3.1</p>
          </div>
        </div>
        {!hasApiKey && (
          <button 
            onClick={handleOpenKeySelector}
            className="flex items-center gap-2 bg-amber-50 text-amber-600 px-3 py-1.5 rounded-full border border-amber-100 text-xs font-bold shadow-sm"
          >
            <Key className="w-3.5 h-3.5" />
            Configurar API
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-32">
        {/* Featured Prompts */}
        <div className="space-y-4">
          <h4 className="text-slate-900 font-black text-lg px-2">Sugestões Especiais</h4>
          <div className="grid grid-cols-1 gap-3">
            <button
              onClick={() => handleGenerate("Introductory video for MoneyNet app, highlighting core purpose of teaching online money-making strategies through social media and digital marketing, visually appealing, concise, onboarding style.")}
              disabled={generating}
              className="group relative bg-slate-900 p-5 rounded-[28px] overflow-hidden text-left active:scale-[0.98] transition-all disabled:opacity-50"
            >
              <div className="relative z-10 flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-blue-400 text-[10px] font-black uppercase tracking-widest">Recomendado</p>
                  <h5 className="text-white font-black text-lg">Intro do Aplicativo</h5>
                  <p className="text-slate-400 text-xs font-medium">Gere o vídeo de apresentação oficial.</p>
                </div>
                <div className="bg-white/10 p-2 rounded-full group-hover:bg-blue-600 transition-colors">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl -mr-10 -mt-10" />
            </button>
          </div>
        </div>

        {/* Generator Input Card */}
        <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-100">
              <Video className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-slate-900">Novo Vídeo</h3>
                <button 
                  onClick={() => setIsTutorialOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-blue-100 transition-colors"
                >
                  <Info className="w-3 h-3" />
                  Como funciona?
                </button>
              </div>
              <p className="text-xs text-slate-500 font-medium italic">Descreva o que deseja ver no vídeo...</p>
            </div>
          </div>

          <div className="space-y-4">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ex: Um astronauta andando em um campo de lavanda em Marte, estilo cinematográfico, 4k..."
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none h-24"
            />

            <div className="flex flex-wrap gap-2">
              {[
                { label: 'Vídeo de meme engraçado', prompt: 'Um vídeo de meme engraçado e viral, estilo TikTok, edição dinâmica.' },
                { label: 'Tutorial rápido de culinária', prompt: 'Tutorial rápido de culinária, close-up nos ingredientes, iluminação suave, estilo reels.' },
                { label: 'Promoção de produto', prompt: 'Promoção de produto premium, estilo cinematográfico, iluminação de estúdio, comercial de alta qualidade.' }
              ].map((s, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setPrompt(s.prompt)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-white hover:border-blue-500 hover:text-blue-600 text-slate-600 rounded-xl text-[10px] font-bold transition-all border border-slate-200"
                >
                  {s.label}
                </button>
              ))}
            </div>

            {error && (
              <div className="flex items-start gap-2 p-3 bg-red-50 text-red-600 rounded-xl text-xs font-medium">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}

            <button
              onClick={() => handleGenerate()}
              disabled={!prompt.trim() || generating}
              className={`w-full py-4 rounded-2xl font-black shadow-xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:bg-slate-300 active:scale-[0.98] transition-all ${
                showSuccess 
                ? 'bg-green-500 text-white shadow-green-500/20' 
                : 'bg-blue-600 text-white shadow-blue-100'
              }`}
            >
              {generating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Iniciando Geração...
                </>
              ) : showSuccess ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Solicitação Enviada!
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Gerar Vídeo IA
                </>
              )}
            </button>
          </div>

          <div className="flex items-start gap-3 p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
            <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <p className="text-[10px] text-blue-600/70 font-medium leading-relaxed">
              Vídeos gerados pela IA levam entre 1 a 3 minutos para ficarem prontos. Você pode sair desta tela e voltar depois.
            </p>
          </div>
        </div>

        {/* History Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h4 className="text-slate-900 font-black text-lg">Suas Criações</h4>
            <div className="flex items-center gap-2">
              {videos.some(v => v.status === 'pending') ? (
                <div className="flex items-center gap-2 text-blue-600 bg-blue-50 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest animate-pulse">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  Gerando...
                </div>
              ) : videos.length > 0 && videos[0].status === 'failed' ? (
                <div className="text-red-600 bg-red-50 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                  Falhou
                </div>
              ) : videos.length > 0 ? (
                <div className="text-green-600 bg-green-50 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                  Pronto
                </div>
              ) : null}
            </div>
          </div>
          
          {videos.length === 0 && !generating && (
            <div className="text-center py-12 px-6">
              <div className="w-20 h-20 bg-slate-100 rounded-[32px] flex items-center justify-center mx-auto mb-4 opacity-50">
                <Video className="w-10 h-10 text-slate-400" />
              </div>
              <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">Nenhum vídeo gerado ainda</p>
            </div>
          )}

          <div className="grid grid-cols-1 gap-6">
            <AnimatePresence>
              {videos.map((vid) => (
                <motion.div
                  key={vid.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm group"
                >
                  <div className="aspect-[9/16] bg-slate-900 relative flex items-center justify-center overflow-hidden">
                    {vid.status === 'completed' ? (
                      videoBlobUrls[vid.id] ? (
                        <video 
                          src={videoBlobUrls[vid.id]} 
                          controls 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-center p-6 space-y-4">
                          <Loader2 className="w-12 h-12 text-blue-500 mx-auto animate-spin" />
                          <p className="text-white text-xs font-bold">Carregando vídeo...</p>
                        </div>
                      )
                    ) : vid.status === 'failed' ? (
                      <div className="text-center p-6 space-y-2">
                        <AlertCircle className="w-10 h-10 text-red-500 mx-auto" />
                        <p className="text-white text-sm font-bold">Falha na geração</p>
                      </div>
                    ) : (
                      <div className="text-center p-6 space-y-4">
                        <Loader2 className="w-12 h-12 text-blue-500 mx-auto animate-spin" />
                        <div className="space-y-1">
                          <p className="text-white text-sm font-black animate-pulse">Criando Magia...</p>
                          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Aguarde um momento</p>
                        </div>
                      </div>
                    )}
                    
                    <div className="absolute top-4 right-4">
                      <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        vid.status === 'completed' ? 'bg-green-500 text-white' : 
                        vid.status === 'failed' ? 'bg-red-500 text-white' : 
                        'bg-blue-600 text-white'
                      }`}>
                        {vid.status === 'completed' ? 'Pronto' : vid.status === 'failed' ? 'Erro' : 'Gerando'}
                      </div>
                    </div>
                  </div>
                  <div className="p-5 space-y-3">
                    <p className="text-sm font-medium text-slate-700 line-clamp-2 italic">
                      "{vid.prompt}"
                    </p>
                    <div className="flex items-center justify-between">
                       <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                         {vid.createdAt?.toDate().toLocaleDateString('pt-BR')}
                       </p>
                       {vid.status === 'completed' && videoBlobUrls[vid.id] && (
                         <a 
                           href={videoBlobUrls[vid.id]} 
                           download={`money-net-ai-${vid.id}.mp4`}
                           className="flex items-center gap-2 text-blue-600 font-bold text-xs"
                         >
                           <Download className="w-4 h-4" />
                           Baixar
                         </a>
                       )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <PromptTutorial 
        isOpen={isTutorialOpen} 
        onClose={() => setIsTutorialOpen(false)} 
        onApplyPrompt={(p) => setPrompt(p)}
      />
    </div>
  );
};
