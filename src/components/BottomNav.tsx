import React from 'react';
import { Home, MessageSquare, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

interface BottomNavProps {
  currentStep: string;
  onNavigate: (step: any) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentStep, onNavigate }) => {
  const tabs = [
    { id: 'dashboard', icon: Home, label: 'Início' },
    { id: 'tiktok_insights', icon: TrendingUp, label: 'Trends' },
    { id: 'mentor_ia', icon: MessageSquare, label: 'Mentor' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center p-4 sm:p-6 pointer-events-none">
      <motion.nav 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="max-w-md w-full bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl border border-white/20 dark:border-white/5 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] p-2 flex items-center justify-between pointer-events-auto transition-colors duration-500 relative overflow-hidden"
      >
        {tabs.map((tab) => {
          const isActive = currentStep === tab.id;
          const Icon = tab.icon;
          
          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className="flex-1 flex flex-col items-center justify-center py-2.5 relative group outline-none"
            >
              {isActive && (
                <motion.div 
                  layoutId="activePill"
                  className="absolute inset-x-2 inset-y-1 bg-blue-600/10 dark:bg-blue-500/20 rounded-2xl z-0"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              
              <motion.div 
                whileTap={{ scale: 0.85 }}
                className={`relative z-10 p-1.5 transition-colors duration-300 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-600 group-hover:text-slate-600 dark:group-hover:text-slate-300'}`}
              >
                <Icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'scale-110' : 'scale-100'}`} />
              </motion.div>
              
              <motion.span 
                animate={{ 
                  scale: isActive ? 1 : 0.9,
                  opacity: isActive ? 1 : 0.7 
                }}
                className={`relative z-10 text-[9px] font-black mt-0.5 uppercase tracking-wider transition-colors duration-300 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-600'}`}
              >
                {tab.label}
              </motion.span>

              {isActive && (
                <motion.div 
                  layoutId="activeDot"
                  className="absolute -bottom-0.5 w-1 h-1 bg-blue-600 dark:bg-blue-400 rounded-full shadow-[0_0_8px_rgba(37,99,235,0.6)]"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          );
        })}
      </motion.nav>
    </div>
  );
};
