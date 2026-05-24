import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Image as ImageIcon, 
  ArrowLeft, 
  Sparkles, 
  Download, 
  Loader2, 
  AlertCircle,
  Key,
  Info,
  Maximize2,
  Trash2,
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
  updateDoc,
  deleteDoc
} from 'firebase/firestore';
import { auth, db, handleFirestoreError, OperationType } from '../lib/firebase';
import { generateImage } from '../services/geminiService';

interface ImageItem {
  id: string;
  prompt: string;
  imageUrl?: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: any;
}

interface ImageGeneratorProps {
  onBack: () => void;
}

export const ImageGenerator: React.FC<ImageGeneratorProps> = ({ onBack }) => {
  const [prompt, setPrompt] = useState('');
  const [images, setImages] = useState<ImageItem[]>([]);
  const [generating, setGenerating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(true);
  const [error, setError] = useState<string | null>(null);
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

  useEffect(() => {
    if (!user) return;

    if (user.uid.startsWith('mock-')) {
      const stored = localStorage.getItem(`mock_images_${user.uid}`);
      if (stored) {
        try {
          setImages(JSON.parse(stored));
        } catch {
          setImages([]);
        }
      } else {
        setImages([]);
      }
      return;
    }

    const q = query(
      collection(db, 'users', user.uid, 'images'),
      orderBy('createdAt', 'desc')
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const ims = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ImageItem[];
      setImages(ims);
    }, (err) => handleFirestoreError(err, OperationType.LIST, `users/${user.uid}/images`));

    return () => unsub();
  }, [user]);

  // Persist mock images to localStorage
  useEffect(() => {
    if (user && user.uid.startsWith('mock-') && images.length > 0) {
      localStorage.setItem(`mock_images_${user.uid}`, JSON.stringify(images));
    }
  }, [images, user]);

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
       setError('Por favor, selecione sua chave da API para gerar imagens.');
       return;
    }

    setGenerating(true);
    setError(null);

    let imageId = '';
    try {
      // 1. Create entry in Firestore or local state
      if (!user.uid.startsWith('mock-')) {
        const docRef = await addDoc(collection(db, 'users', user.uid, 'images'), {
          prompt: finalPrompt,
          status: 'pending',
          createdAt: serverTimestamp()
        });
        imageId = docRef.id;
      } else {
        imageId = 'mock-img-' + Date.now();
        const newImage: ImageItem = {
          id: imageId,
          prompt: finalPrompt,
          status: 'pending',
          createdAt: { seconds: Date.now() / 1000 } as any
        };
        setImages(prev => [newImage, ...prev]);
      }

      // 2. Generate Image
      const base64Data = await generateImage(finalPrompt);
      
      // 3. Update status
      if (!user.uid.startsWith('mock-')) {
        await updateDoc(doc(db, 'users', user.uid, 'images', imageId), {
          imageUrl: base64Data,
          status: 'completed'
        });
      } else {
        setImages(prev => {
          const updated = prev.map(im => im.id === imageId ? { ...im, imageUrl: base64Data, status: 'completed' as const } : im);
          localStorage.setItem(`mock_images_${user.uid}`, JSON.stringify(updated));
          return updated;
        });
      }
      
      if (!overridePrompt) setPrompt('');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    } catch (err: any) {
      console.error(err);
      let msg = 'Erro ao gerar imagem.';
      
      const errorString = err.message?.toLowerCase() || '';
      
      if (errorString.includes('permission') || errorString.includes('403') || errorString.includes('not authorized')) {
        msg = 'Permissão negada. Use uma chave de API válida com faturamento ativado (Paid Billing).';
      } else if (errorString.includes('quota') || errorString.includes('429') || errorString.includes('exhausted')) {
        msg = 'Limite de uso atingido (Quota). Tente novamente em alguns minutos ou use outra chave.';
      } else if (errorString.includes('invalid') || errorString.includes('401')) {
        msg = 'Chave de API inválida. Verifique sua chave nas configurações.';
      } else if (errorString.includes('safety') || errorString.includes('blocked') || errorString.includes('content')) {
        msg = 'O prompt foi bloqueado por filtros de segurança. Tente mudar o tema da sua descrição.';
      } else if (errorString.includes('server') || errorString.includes('500') || errorString.includes('503')) {
        msg = 'Servidor de IA ocupado. Tente novamente em instantes.';
      } else if (errorString.includes('network') || errorString.includes('fetch')) {
        msg = 'Erro de conexão. Verifique sua internet.';
      }
      
      setError(msg);
      if (imageId) {
        if (!user.uid.startsWith('mock-')) {
          await updateDoc(doc(db, 'users', user.uid, 'images', imageId), {
            status: 'failed'
          });
        } else {
          setImages(prev => {
            const updated = prev.map(im => im.id === imageId ? { ...im, status: 'failed' as const } : im);
            localStorage.setItem(`mock_images_${user.uid}`, JSON.stringify(updated));
            return updated;
          });
        }
      }
    } finally {
      setGenerating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!user) return;
    try {
      if (!user.uid.startsWith('mock-')) {
        await deleteDoc(doc(db, 'users', user.uid, 'images', id));
      } else {
        const updated = images.filter(im => im.id !== id);
        setImages(updated);
        localStorage.setItem(`mock_images_${user.uid}`, JSON.stringify(updated));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-white border-b border-slate-100 flex items-center justify-between shadow-sm relative z-10">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </button>
          <div>
            <h1 className="font-bold text-slate-900 leading-tight">Portfólio de Imagens</h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Nano Banana 3 AI</p>
          </div>
        </div>
        {!hasApiKey && (
          <button 
            onClick={handleOpenKeySelector}
            className="flex items-center gap-2 bg-amber-50 text-amber-600 px-3 py-1.5 rounded-full border border-amber-100 text-xs font-bold shadow-sm"
          >
            <Key className="w-3.5 h-3.5" />
            API Key
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-32">
        {/* Suggested Prompts */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h4 className="text-slate-900 font-black text-lg">Sugestões de Estilo</h4>
            <Sparkles className="w-4 h-4 text-blue-500 animate-pulse" />
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {[
              { label: '3D Profissional', prompt: '3D high-quality professional render of a futuristic home office for a digital nomad, soft lighting, Octane render style, 8k.' },
              { label: 'Minimalista', prompt: 'Minimalist clean flat design illustration of a business growth chart with social media icons, pastel colors, white background.' },
              { label: 'Cinematográfico', prompt: 'Cinematic portrait of a successful digital entrepreneur, soft bokeh background, high contrast, professional photography.' }
            ].map((s, i) => (
              <button
                key={i}
                onClick={() => handleGenerate(s.prompt)}
                disabled={generating}
                className="shrink-0 bg-white px-4 py-3 rounded-2xl border border-slate-100 text-xs font-bold text-slate-600 shadow-sm active:scale-95 transition-all hover:bg-slate-50"
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Generator Card */}
        <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-100">
              <ImageIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-black text-slate-900">Criação Instantânea</h3>
              <p className="text-xs text-slate-500 font-medium italic">Transforme ideias em realidade visual.</p>
            </div>
          </div>

          <div className="space-y-4">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ex: Uma mesa de escritório futurista com holograma de ganhos financeiros, estilo 3D..."
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none h-24"
            />

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
                : 'bg-indigo-600 text-white shadow-indigo-100'
              }`}
            >
              {generating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Gerando Obra...
                </>
              ) : showSuccess ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Solicitação Recebida!
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Criar Imagem Profissional
                </>
              )}
            </button>
          </div>

          <div className="flex items-start gap-3 p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100">
            <Info className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
            <p className="text-[10px] text-indigo-600/70 font-medium leading-relaxed">
              Imagens profissionais ajudam a aumentar em até 300% o engajamento nas redes sociais. Use para thumbnails e posts.
            </p>
          </div>
        </div>

        {/* Gallery */}
        <div className="space-y-4">
          <h4 className="text-slate-900 font-black text-lg px-2">Suas Criações</h4>
          
          {images.length === 0 && !generating && (
            <div className="text-center py-12 px-6">
              <div className="w-20 h-20 bg-slate-100 rounded-[32px] flex items-center justify-center mx-auto mb-4 opacity-50">
                <ImageIcon className="w-10 h-10 text-slate-400" />
              </div>
              <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">Nenhuma imagem gerada</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <AnimatePresence>
              {images.map((img) => (
                <motion.div
                  key={img.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm group relative"
                >
                  <div className="aspect-square bg-slate-100 relative flex items-center justify-center">
                    {img.status === 'completed' && img.imageUrl ? (
                      <img 
                        src={img.imageUrl} 
                        alt={img.prompt}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                    ) : img.status === 'failed' ? (
                      <div className="text-center p-4">
                        <AlertCircle className="w-8 h-8 text-red-500 mx-auto" />
                        <p className="text-slate-400 text-[10px] font-bold mt-2">Falha</p>
                      </div>
                    ) : (
                      <div className="text-center p-4 space-y-2">
                        <Loader2 className="w-8 h-8 text-indigo-500 mx-auto animate-spin" />
                        <p className="text-indigo-400 text-[10px] font-bold animate-pulse">Criando...</p>
                      </div>
                    )}
                    
                    {/* Action overlays */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                       {img.status === 'completed' && img.imageUrl && (
                         <>
                           <a 
                             href={img.imageUrl} 
                             download={`money-net-${img.id}.png`}
                             className="p-2 bg-white rounded-full text-indigo-600"
                           >
                             <Download className="w-4 h-4" />
                           </a>
                           {/* Modal integration could go here */}
                         </>
                       )}
                       <button 
                         onClick={() => handleDelete(img.id)}
                         className="p-2 bg-white/20 hover:bg-red-500 rounded-full text-white transition-colors"
                       >
                         <Trash2 className="w-4 h-4" />
                       </button>
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-[10px] font-medium text-slate-500 line-clamp-1 italic">
                      "{img.prompt}"
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
