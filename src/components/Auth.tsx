import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, User as UserIcon, Loader2 } from 'lucide-react';
import { signInWithName } from '../lib/firebase';
import { useLanguage } from '../hooks/useLanguage';

interface AuthProps {
  onLoginSuccess: (user: any) => Promise<void> | void;
}

export const Auth: React.FC<AuthProps> = ({ onLoginSuccess }) => {
  const { t } = useLanguage();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName) {
      setError('Por favor, preencha seu nome e sobrenome.');
      return;
    }
    
    setLoading(true);
    setError(null);
    try {
      const user = await signInWithName(firstName, lastName);
      // Wait a tick to ensure Firebase fully propagated the profile change internally
      await new Promise(resolve => setTimeout(resolve, 500));
      await onLoginSuccess(user);
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro ao entrar. Tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-950 p-6 sm:p-8 transition-colors duration-300 overflow-y-auto">
      <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-2 leading-tight tracking-tight">
            Seja bem-vindo.<br />
            <span className="text-blue-600 dark:text-blue-400">
              Qual é o seu nome?
            </span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium mb-8 leading-relaxed">
            Insira seu nome e sobrenome para personalizar sua experiência.
          </p>
        </motion.div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 p-4 rounded-2xl mb-6 text-sm font-bold border border-red-100 dark:border-red-500/20 italic"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          <div className="relative group">
            <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-600 w-5 h-5 transition-colors group-focus-within:text-blue-500" />
            <input
              type="text"
              placeholder="Nome"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full pl-12 pr-4 py-4 sm:py-5 bg-slate-50 dark:bg-white/5 border-none rounded-3xl focus:ring-2 focus:ring-blue-500 transition-all font-medium outline-none text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-600"
            />
          </div>
          
          <div className="relative group">
            <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-600 w-5 h-5 transition-colors group-focus-within:text-blue-500" />
            <input
              type="text"
              placeholder="Sobrenome"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full pl-12 pr-4 py-4 sm:py-5 bg-slate-50 dark:bg-white/5 border-none rounded-3xl focus:ring-2 focus:ring-blue-500 transition-all font-medium outline-none text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-600"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !firstName || !lastName}
            className="w-full bg-slate-900 dark:bg-blue-600 text-white py-4 sm:py-5 rounded-3xl mt-4 font-bold shadow-xl shadow-slate-200 dark:shadow-none active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
              <>
                Entrar
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

