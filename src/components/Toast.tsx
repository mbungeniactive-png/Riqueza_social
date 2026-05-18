import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, AlertCircle, Info, Bell } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-24 left-0 right-0 z-[100] px-6 pointer-events-none flex flex-col items-center gap-2">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
              className="pointer-events-auto max-w-sm w-full bg-white dark:bg-slate-900 shadow-2xl rounded-2xl border border-slate-100 dark:border-white/10 p-4 flex items-start gap-4 overflow-hidden"
            >
              <div className={`p-2 rounded-xl shrink-0 ${
                toast.type === 'success' ? 'bg-green-500/10 text-green-500' :
                toast.type === 'error' ? 'bg-red-500/10 text-red-500' :
                toast.type === 'warning' ? 'bg-amber-500/10 text-amber-500' :
                'bg-blue-500/10 text-blue-500'
              }`}>
                {toast.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> :
                 toast.type === 'error' ? <AlertCircle className="w-5 h-5" /> :
                 toast.type === 'warning' ? <Bell className="w-5 h-5" /> :
                 <Info className="w-5 h-5" />}
              </div>
              <div className="flex-1 min-w-0 pr-6">
                <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                  {toast.message}
                </p>
              </div>
              <button 
                onClick={() => removeToast(toast.id)}
                className="absolute top-4 right-4 text-slate-300 dark:text-slate-600 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              
              {/* Progress Bar */}
              <motion.div 
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: 4, ease: 'linear' }}
                className={`absolute bottom-0 left-0 h-1 ${
                  toast.type === 'success' ? 'bg-green-500' :
                  toast.type === 'error' ? 'bg-red-500' :
                  toast.type === 'warning' ? 'bg-amber-500' :
                  'bg-blue-500'
                }`}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
};
