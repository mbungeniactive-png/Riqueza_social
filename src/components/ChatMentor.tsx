import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, 
  Bot, 
  User as UserIcon, 
  Trash2, 
  Sparkles, 
  Tv, 
  AlertCircle,
  ArrowLeft,
  Loader2
} from 'lucide-react';
import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  onSnapshot, 
  serverTimestamp, 
  doc, 
  updateDoc, 
  getDoc,
  deleteDoc,
  getDocs,
  writeBatch,
  where
} from 'firebase/firestore';
import { auth, db, handleFirestoreError, OperationType } from '../lib/firebase';
import { chatWithMentor, chatWithMentorStream } from '../services/geminiService';
import { useSettings } from '../hooks/useSettings';

declare global {
  interface Window {
    aistudio?: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: any;
}

interface ChatMentorProps {
  onBack: () => void;
  initialMessage?: string;
  onClearInitialMessage?: () => void;
}

// Sub-helper to parse inline formatting like **bold** dynamically
const parseInlineFormatting = (text: string) => {
  if (!text) return '';
  // Strip any legacy hashtag/asterisk noise first
  const sanitized = text.replace(/[#\*]{2,}/g, '**').replace(/#\*/g, '').replace(/\*#/g, '');
  const parts = sanitized.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const clean = part.slice(2, -2);
      return (
        <strong key={index} className="font-extrabold text-blue-600 dark:text-blue-400 bg-blue-500/10 dark:bg-blue-500/15 p-1 rounded-lg mx-1 inline">
          {clean}
        </strong>
      );
    }
    // Clean up any rogue formatting characters or double spaces left behind
    return part.replace(/[\*_#\r]/g, '');
  });
};

// Elegant, well-structured renderer for Chat Messages
const FormattedMessageContent: React.FC<{ content: string; isUser: boolean }> = ({ content, isUser }) => {
  if (isUser) {
    return (
      <div className="space-y-1 text-slate-100 font-medium">
        {content.split('\n').map((line, i) => (
          <p key={i} className={line.trim() ? '' : 'h-2'}>{line}</p>
        ))}
      </div>
    );
  }

  const lines = content.split('\n');
  return (
    <div className="space-y-6 text-[15px] leading-relaxed select-text font-normal text-slate-800 dark:text-slate-100 py-2">
      {lines.map((line, lineIdx) => {
        let trimmed = line.trim();
        if (!trimmed) {
          return <div key={lineIdx} className="h-3" />;
        }

        // Clean headers with asterisk hashtags (e.g., #* TÍTULO *# or *# TÍTULO #*)
        const isLegacyCompositeHeader = trimmed.startsWith('#*') || trimmed.startsWith('*#') || trimmed.startsWith('###') || trimmed.startsWith('##') || trimmed.startsWith('#');
        if (isLegacyCompositeHeader) {
          const headerText = trimmed.replace(/^([#\*]+|\*#+|#\*+)\s*/, '').replace(/\s*([#\*]+|\*#+|#\*+)$/, '').trim();
          return (
            <h4
              key={lineIdx}
              className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-wide uppercase mt-6 mb-3 flex items-center gap-2 border-b-2 border-slate-100 dark:border-white/5 pb-2.5 w-full font-sans"
            >
              <span className="w-2.5 h-5 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full shrink-0 animate-pulse" />
              <span>{parseInlineFormatting(headerText)}</span>
            </h4>
          );
        }

        // Identify full lines enclosed with ** as <h4> headings, ex: **ESTRATÉGIA DE VENDA:** ou **Roteiro:**
        const isFullLineBold = trimmed.startsWith('**') && (trimmed.endsWith('**') || trimmed.endsWith('**:') || trimmed.endsWith(':**') || trimmed.endsWith(':'));
        if (isFullLineBold) {
          const cleanHeader = trimmed.replace(/\*\*+/g, '').replace(/:$/, '').trim();
          return (
            <h4
              key={lineIdx}
              className="text-sm sm:text-base font-black text-slate-900 dark:text-white tracking-normal mt-5 mb-3 flex items-center gap-2 font-sans"
            >
              <span className="w-2 h-4 bg-emerald-500 rounded-full shrink-0" />
              <span>{cleanHeader.toUpperCase()}</span>
            </h4>
          );
        }

        // Convert numbered lists into beautiful badge steps (e.g. 1. Passo, 2. Passo)
        const isNumbered = /^\d+\.\s+/.test(trimmed);
        if (isNumbered) {
          const numMatch = trimmed.match(/^(\d+)\.\s+/);
          const numberValue = numMatch ? numMatch[1] : '1';
          const restText = trimmed.replace(/^\d+\.\s+/, '');
          return (
            <div key={lineIdx} className="flex items-start gap-3 my-3 bg-slate-50/50 dark:bg-white/5 p-3 rounded-2xl border border-slate-100 dark:border-white/5 text-left">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-sm font-sans">
                {numberValue}
              </span>
              <div className="flex-1 text-slate-800 dark:text-slate-200 font-semibold leading-relaxed">
                {parseInlineFormatting(restText)}
              </div>
            </div>
          );
        }

        // Bullet list item rendering (capturing items starting with *, -, •)
        const isBullet = trimmed.startsWith('* ') || trimmed.startsWith('- ') || trimmed.startsWith('• ');
        if (isBullet) {
          const bulletText = trimmed.replace(/^[\*\-\•]\s*/, '');
          return (
            <div key={lineIdx} className="flex items-start gap-2.5 pl-2.5 my-2.5 text-left">
              <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 mt-2 shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.5)] animate-pulse" />
              <div className="flex-1 text-slate-700 dark:text-slate-200 font-semibold leading-relaxed">
                {parseInlineFormatting(bulletText)}
              </div>
            </div>
          );
        }

        // Regular Parsed Paragraphs
        return (
          <p key={lineIdx} className="text-slate-700 dark:text-slate-200 leading-relaxed font-semibold whitespace-pre-line my-2 text-left">
            {parseInlineFormatting(trimmed)}
          </p>
        );
      })}
    </div>
  );
};

export const ChatMentor: React.FC<ChatMentorProps> = ({ onBack, initialMessage, onClearInitialMessage }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const [credits, setCredits] = useState<number | null>(null);
  const [showingAdModal, setShowingAdModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
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

  // Handle initial message from props
  useEffect(() => {
    if (initialMessage && user && credits !== null && !loading) {
      handleSendMessage(initialMessage);
      onClearInitialMessage?.();
    }
  }, [initialMessage, user, credits]);

  useEffect(() => {
    if (!user) return;

    if (user.uid.startsWith('mock-')) {
      // Use local state only for mock users
      setCredits(100); // Give plenty of fake credits
      const stored = localStorage.getItem(`mock_chat_messages_${user.uid}`);
      if (stored) {
        try {
          setMessages(JSON.parse(stored));
        } catch {
          setMessages([]);
        }
      } else {
        setMessages([]);
      }
      return;
    }

    // Listen to credits
    const userDocRef = doc(db, 'users', user.uid);
    const unsubUser = onSnapshot(userDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setCredits(data.aiCredits ?? 5); // Default 5 credits
      }
    });

    // Listen to messages
    const q = query(
      collection(db, 'users', user.uid, 'messages'),
      orderBy('timestamp', 'asc')
    );

    const unsubMessages = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Message[];
      setMessages(msgs);
    }, (err) => handleFirestoreError(err, OperationType.LIST, `users/${user.uid}/messages`));

    return () => {
      unsubUser();
      unsubMessages();
    };
  }, [user]);

  // Persist mock messages to localStorage
  useEffect(() => {
    if (user && user.uid.startsWith('mock-') && messages.length > 0) {
      localStorage.setItem(`mock_chat_messages_${user.uid}`, JSON.stringify(messages));
    }
  }, [messages, user]);

  // Clean up messages older than 30 days
  useEffect(() => {
    if (!user || user.uid.startsWith('mock-')) return;
    
    const cleanupOldMessages = async () => {
      try {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        
        const qCleanup = query(
          collection(db, 'users', user.uid, 'messages'),
          where('timestamp', '<', thirtyDaysAgo)
        );
        
        const snapshot = await getDocs(qCleanup);
        if (!snapshot.empty) {
          const batch = writeBatch(db);
          snapshot.docs.forEach(docSnap => batch.delete(docSnap.ref));
          await batch.commit();
        }
      } catch (err) {
        console.error("Auto-cleanup error:", err);
      }
    };
    
    cleanupOldMessages();
  }, [user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (customMessage?: string) => {
    const text = typeof customMessage === 'string' ? customMessage : input;
    if (!text || typeof text !== 'string' || !text.trim() || !user || loading) return;
    
    const messageToSend = text.trim();
    
    if (credits !== null && credits <= 0) {
      setShowingAdModal(true);
      return;
    }

    const userMessage = messageToSend;
    if (!customMessage) setInput('');
    setLoading(true);
    setStreamingText('');

    try {
      // 1. Immediately update UI with user message
      const tempMsgId = 'temp-' + Date.now();
      setMessages(prev => [...prev, { 
        id: tempMsgId, 
        role: 'user', 
        content: userMessage, 
        timestamp: { seconds: Date.now() / 1000 } as any 
      }]);

      // 2. Save user message to database if real user
      if (!user.uid.startsWith('mock-')) {
        await addDoc(collection(db, 'users', user.uid, 'messages'), {
          role: 'user',
          content: userMessage,
          timestamp: serverTimestamp()
        });
      }

      // 3. Prepare context for Gemini
      const history = messages
        .filter(m => m.id !== 'temp' && !m.id.startsWith('temp-'))
        .map(m => ({
          role: m.role,
          parts: [{ text: m.content }]
        }));
      
      if (history.length === 0 || history[history.length - 1].role !== 'user') {
        history.push({ role: 'user', parts: [{ text: userMessage }] });
      } else {
        history[history.length - 1].parts = [{ text: userMessage }];
      }

      // 4. Get AI Response via Stream
      const responseText = await chatWithMentorStream(history, (chunk) => {
        if (!chunk) return;
        setStreamingText(chunk);
      });

      // 5. Save AI Response
      if (responseText) {
        if (!user.uid.startsWith('mock-')) {
          await addDoc(collection(db, 'users', user.uid, 'messages'), {
            role: 'model',
            content: responseText,
            timestamp: serverTimestamp()
          });

          // 6. Deduct credit
          const userDocRef = doc(db, 'users', user.uid);
          await updateDoc(userDocRef, {
            aiCredits: (credits || 5) - 1,
            updatedAt: serverTimestamp()
          });
        } else {
          // If mock, just update local state with final AI message
          setMessages(prev => [...prev, {
            id: 'temp-m-' + Date.now(),
            role: 'model',
            content: responseText,
            timestamp: { seconds: Date.now() / 1000 } as any
          }]);
        }
      }
    } catch (err: any) {
      console.error("Chat communication errored:", err);
      let errorText = "Desculpe, ocorreu um erro ao falar com o Mentor. Verifique sua conexão de internet e tente novamente.";
      
      const errMsg = err?.message || String(err);
      if (errMsg.includes("500") || errMsg.includes("Key") || errMsg.includes("Chave") || errMsg.includes("API_KEY") || errMsg.includes("API key")) {
        errorText = "⚠️ Atenção: Não foi possível obter resposta. A sua Chave de API do Gemini no servidor pode não estar configurada nas Configurações da plataforma ou sua quota esgotou.";
      } else if (errMsg.includes("404") || errMsg.includes("not found")) {
        errorText = "⚠️ Erro de endpoint: O servidor do Mentor não pôde ser encontrado. Verifique se o servidor está rodando.";
      } else {
        errorText = `⚠️ Erro na comunicação: ${errMsg}`;
      }

      setMessages(prev => [...prev, {
        id: 'err-' + Date.now(),
        role: 'model',
        content: errorText,
        timestamp: { seconds: Date.now() / 1000 } as any
      }]);
    } finally {
      setLoading(false);
      setStreamingText('');
    }
  };

  const [showingDeleteModal, setShowingDeleteModal] = useState(false);

  const clearChat = async () => {
    if (!user) return;
    setLoading(true);
    setShowingDeleteModal(false);

    try {
      if (!user.uid.startsWith('mock-')) {
        const qClear = collection(db, 'users', user.uid, 'messages');
        const snapshot = await getDocs(qClear);
        const batch = writeBatch(db);
        snapshot.docs.forEach((docSnap) => {
          batch.delete(docSnap.ref);
        });
        await batch.commit();
      } else {
        localStorage.removeItem(`mock_chat_messages_${user.uid}`);
      }
      setMessages([]); // Optimistic or direct update for mock user
    } catch (err) {
      console.error("Clear chat error:", err);
    } finally {
      setLoading(false);
    }
  };

  const simulateWatchingAd = async () => {
    if (!user) return;
    setLoading(true);
    setShowingAdModal(false);
    
    // Simulate delay
    await new Promise(r => setTimeout(r, 2000));
    
    try {
      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, {
        aiCredits: (credits || 0) + 5,
        updatedAt: serverTimestamp()
      });
      alert('Você ganhou 5 créditos de fada do mentor! ✨');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-950 relative transition-colors duration-300">
      {/* Header */}
      <div className="p-4 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-white/5 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 bg-slate-50 dark:bg-white/5 rounded-xl">
            <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-100 dark:shadow-none">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-slate-900 dark:text-white leading-tight">Mentor IA</h1>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Online</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="bg-blue-50 dark:bg-blue-500/10 px-3 py-1.5 rounded-full flex items-center gap-2 border border-blue-100 dark:border-blue-500/20">
            <span className="text-[10px] font-black text-blue-600 dark:text-blue-400">{credits ?? 0}</span>
            <div className="w-2 h-2 bg-blue-500 rounded-full" />
          </div>
          <button 
            onClick={() => setShowingDeleteModal(true)}
            className="p-2 text-slate-400 dark:text-slate-600 hover:text-red-500 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 pb-32 no-scrollbar">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center p-8 space-y-4">
            <div className="w-20 h-20 bg-blue-50 dark:bg-white/5 rounded-[32px] flex items-center justify-center">
              <Bot className="w-10 h-10 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white">Olá! Eu sou seu Mentor Digital</h3>
              <p className="text-slate-500 dark:text-slate-400 max-w-xs mx-auto mt-2 font-medium">
                Dúvidas sobre TikTok? Ideias de nicho? Como vender como afiliado? Pergunte qualquer coisa!
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 w-full pt-4">
               {['Ideia de vídeo viral', 'Roteiro TikTok', 'Nicho lucrativo', 'Estratégia afiliado'].map(s => (
                 <button 
                   key={s}
                   onClick={() => setInput(s)}
                   className="p-3 bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:border-blue-200 dark:hover:border-blue-500 transition-all text-left"
                 >
                   {s}
                 </button>
               ))}
            </div>
          </div>
        )}

        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-1 ${
                msg.role === 'user' ? 'bg-slate-200 dark:bg-white/10' : 'bg-blue-600 dark:bg-blue-500'
              }`}>
                {msg.role === 'user' ? <UserIcon className="w-4 h-4 text-slate-600 dark:text-slate-400" /> : <Bot className="w-4 h-4 text-white" />}
              </div>
              <div className={`p-4 rounded-[24px] text-sm leading-relaxed shadow-sm select-text ${
                msg.role === 'user' 
                  ? 'bg-blue-600 dark:bg-blue-500 text-white rounded-tr-none' 
                  : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-white rounded-tl-none border border-slate-100 dark:border-white/5'
              }`}>
                <FormattedMessageContent content={msg.content} isUser={msg.role === 'user'} />
              </div>
            </div>
          </motion.div>
        ))}

        {streamingText && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="max-w-[85%] flex gap-3 flex-row">
              <div className="w-8 h-8 rounded-xl bg-blue-600 dark:bg-blue-500 flex items-center justify-center shrink-0 mt-1">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="p-4 rounded-[24px] rounded-tl-none text-sm leading-relaxed shadow-sm select-text bg-white dark:bg-slate-900 text-slate-800 dark:text-white border border-slate-100 dark:border-white/5">
                <FormattedMessageContent content={streamingText} isUser={false} />
              </div>
            </div>
          </motion.div>
        )}

        {loading && !streamingText && (
          <div className="flex justify-start">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-600 dark:bg-blue-500 flex items-center justify-center shrink-0 animate-pulse">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl rounded-tl-none border border-slate-100 dark:border-white/5 flex gap-2">
                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity }} className="w-1.5 h-1.5 bg-blue-200 dark:bg-blue-800 rounded-full" />
                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, delay: 0.2 }} className="w-1.5 h-1.5 bg-blue-300 dark:bg-blue-700 rounded-full" />
                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, delay: 0.4 }} className="w-1.5 h-1.5 bg-blue-400 dark:bg-blue-600 rounded-full" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-white/5">
        <div className="flex items-center gap-3 bg-slate-50 dark:bg-white/5 p-2 rounded-[28px] border border-slate-100 dark:border-white/10 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
          <input
            type="text"
            placeholder="Pergunte ao mentor..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1 bg-transparent px-4 py-3 outline-none text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-600"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!input.trim() || loading}
            className="p-3 bg-blue-600 dark:bg-blue-500 text-white rounded-2xl disabled:opacity-50 disabled:bg-slate-300 dark:disabled:bg-white/5 transition-all"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <p className="text-[10px] text-center text-slate-400 dark:text-slate-600 mt-3 font-bold uppercase tracking-widest">As mensagens são guardadas por 30 dias • IA Generativa</p>
      </div>

      {/* Ad Modal */}
      <AnimatePresence>
        {showingAdModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white dark:bg-slate-900 rounded-[40px] p-8 max-w-xs w-full text-center shadow-2xl border border-white/5"
            >
              <div className="w-20 h-20 bg-blue-50 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <Tv className="w-10 h-10 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Sem créditos!</h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-8 leading-relaxed">
                Você usou todos os seus créditos gratuitos. Assista um vídeo curto para ganhar mais 5 mensagens.
              </p>
              
              <div className="space-y-3">
                <button
                  onClick={simulateWatchingAd}
                  className="w-full bg-blue-600 dark:bg-blue-500 text-white py-5 rounded-3xl font-black shadow-xl shadow-blue-100 dark:shadow-none flex items-center justify-center gap-3 active:scale-95 transition-all"
                >
                  <Tv className="w-6 h-6" />
                  Assistir Vídeo (+5)
                </button>
                <button
                  onClick={() => setShowingAdModal(false)}
                  className="w-full py-4 text-slate-400 dark:text-slate-500 font-bold"
                >
                  Agora não
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showingDeleteModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white dark:bg-slate-900 rounded-[40px] p-8 max-w-xs w-full text-center shadow-2xl border border-white/5"
            >
              <div className="w-20 h-20 bg-red-50 dark:bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Trash2 className="w-10 h-10 text-red-600 dark:text-red-400" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Limipar Histórico?</h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-8 leading-relaxed">
                Isso removerá todas as mensagens permanentemente da sua conta.
              </p>
              
              <div className="space-y-3">
                <button
                  onClick={clearChat}
                  className="w-full bg-red-600 dark:bg-red-500 text-white py-5 rounded-3xl font-black shadow-xl shadow-red-100 dark:shadow-none active:scale-95 transition-all"
                >
                  Confirmar e Limpar
                </button>
                <button
                  onClick={() => setShowingDeleteModal(false)}
                  className="w-full py-4 text-slate-400 dark:text-slate-500 font-bold"
                >
                  Cancelar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
