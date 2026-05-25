import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, TrendingUp, Users, DollarSign, Rocket } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { AppLogo } from './AppLogo';

const icons = [
  <DollarSign className="w-16 h-16 text-green-500" />,
  <TrendingUp className="w-16 h-16 text-blue-500" />,
  <Rocket className="w-16 h-16 text-purple-500" />,
];

const slideColors = [
  'bg-green-50',
  'bg-blue-50',
  'bg-purple-50',
];

interface OnboardingProps {
  onComplete: () => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { t } = useLanguage();

  // Get dynamic slides from translations
  const slides = (t('onboarding.slides') as unknown as any[]) || [];
  const totalSlides = slides.length || 3;

  const nextSlide = () => {
    if (currentSlide === totalSlides - 1) {
      onComplete();
    } else {
      setCurrentSlide(s => s + 1);
    }
  };

  const prevSlide = () => {
    setCurrentSlide(s => Math.max(0, s - 1));
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-950 relative overflow-hidden transition-colors duration-300">
      <div className="pt-8 px-8 flex justify-center shrink-0">
        <AppLogo withText size={48} textSize="text-2xl" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="flex flex-col items-center"
          >
            <div className={`p-8 rounded-full mb-8 ${slideColors[currentSlide] || 'bg-blue-50'} dark:bg-white/5`}>
              {icons[currentSlide] || <Rocket className="w-16 h-16 text-blue-500" />}
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
              {slides[currentSlide]?.title}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-xs mx-auto">
              {slides[currentSlide]?.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
 
      <div className="p-8 flex flex-col items-center gap-6">
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentSlide ? 'w-8 bg-blue-600' : 'w-2 bg-gray-200 dark:bg-gray-800'
              }`}
            />
          ))}
        </div>
 
        <div className="flex justify-between w-full items-center">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className={`p-4 rounded-full ${currentSlide === 0 ? 'text-transparent' : 'text-gray-400 dark:text-gray-600 active:bg-gray-100 dark:active:bg-white/5'}`}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
 
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={nextSlide}
            className="bg-blue-600 dark:bg-blue-500 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-blue-200 dark:shadow-none active:scale-95 transition-transform"
          >
            {currentSlide === totalSlides - 1 ? t('onboarding.start') : t('common.next')}
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};
