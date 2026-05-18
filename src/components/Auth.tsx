import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, Phone, ArrowRight, Chrome, Loader2 } from 'lucide-react';
import { signInWithGoogle, resetPassword } from '../lib/firebase';
import { useLanguage } from '../hooks/useLanguage';

interface AuthProps {
  onLoginSuccess: (user: any) => void;
}

export const Auth: React.FC<AuthProps> = ({ onLoginSuccess }) => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resetSent, setResetSent] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const user = await signInWithGoogle();
      onLoginSuccess(user);
    } catch (err: any) {
      setError(t('auth.google_error'));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      setError(t('selectors.country_search')); // Fallback if no specific email error
      return;
    }
    setLoading(true);
    setError(null);
    setResetSent(false);
    try {
      await resetPassword(email);
      setResetSent(true);
    } catch (err: any) {
      setError(t('auth.google_error')); // Simple error handling
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
            {t('auth.title').split('.')[0]}.<br />
            <span className="text-blue-600 dark:text-blue-400">
              {t('auth.title').split('.')[1] || ''}
            </span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium mb-8 leading-relaxed">
            {t('auth.subtitle')}
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

        {resetSent && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 p-4 rounded-2xl mb-6 text-sm font-bold border border-green-100 dark:border-green-500/20 italic"
          >
            {t('auth.reset_success')}
          </motion.div>
        )}

        <div className="space-y-4 mb-8">
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-600 w-5 h-5 transition-colors group-focus-within:text-blue-500" />
            <input
              type="email"
              placeholder={t('auth.email_placeholder')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-4 sm:py-5 bg-slate-50 dark:bg-white/5 border-none rounded-3xl focus:ring-2 focus:ring-blue-500 transition-all font-medium outline-none text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-600"
            />
          </div>
          
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-600 w-5 h-5 transition-colors group-focus-within:text-blue-500" />
            <input
              type="password"
              placeholder={t('auth.password_placeholder')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-4 py-4 sm:py-5 bg-slate-50 dark:bg-white/5 border-none rounded-3xl focus:ring-2 focus:ring-blue-500 transition-all font-medium outline-none text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-600"
            />
          </div>

          <div className="flex justify-end px-2">
            <button 
              type="button"
              onClick={handleResetPassword}
              disabled={loading}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline disabled:opacity-50"
            >
              {t('auth.forgot_password')}
            </button>
          </div>

          <button
            disabled={loading}
            className="w-full bg-slate-900 dark:bg-blue-600 text-white py-4 sm:py-5 rounded-3xl font-bold shadow-xl shadow-slate-200 dark:shadow-none active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
              <>
                {t('auth.login_button')}
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>

        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-px bg-slate-100 dark:bg-white/5" />
          <span className="text-slate-300 dark:text-slate-600 font-bold text-[10px] tracking-widest uppercase">{t('auth.or_divider')}</span>
          <div className="flex-1 h-px bg-slate-100 dark:bg-white/5" />
        </div>

        <div className="grid grid-cols-1 gap-4">
          <button
            disabled={loading}
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 py-4 sm:py-5 bg-white dark:bg-white/5 border-2 border-slate-100 dark:border-white/10 rounded-3xl font-bold text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-white/10 active:scale-95 transition-all disabled:opacity-50 group"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  className="text-blue-600"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  className="text-green-600"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  className="text-yellow-500"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  className="text-red-500"
                />
              </svg>
            )}
            {t('auth.google_button')}
          </button>
        </div>
      </div>

      <div className="py-8 text-center mt-auto">
        <p className="text-slate-400 dark:text-slate-500 text-sm font-medium">
          {t('auth.no_account')}{' '}
          <button className="text-blue-600 dark:text-blue-400 font-black hover:underline">
            {t('auth.signup_button')}
          </button>
        </p>
      </div>
    </div>
  );
};

