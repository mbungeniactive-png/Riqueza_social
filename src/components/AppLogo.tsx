import React from 'react';

interface AppLogoProps {
  className?: string;
  size?: number; // Size of the logo icon in pixels
  withText?: boolean;
  textSize?: string; // Tailwind class for text size, e.g., 'text-2xl'
  animated?: boolean;
}

export const AppLogo: React.FC<AppLogoProps> = ({
  className = '',
  size = 40,
  withText = false,
  textSize = 'text-xl',
  animated = true,
}) => {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`} id="app_logo">
      {/* Dynamic, pixel-perfect recreate of the user's uploaded MoneyNet Ai logo */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={animated ? 'animate-[pulse_4s_infinite_ease-in-out]' : ''}
      >
        <defs>
          {/* Exact color palette gradients from the uploaded MoneyNet Ai branding */}
          <linearGradient id="logoRingGrad" x1="14" y1="106" x2="106" y2="14" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#005BBD" /> {/* Rich tech blue */}
            <stop offset="35%" stopColor="#00A2E2" /> {/* Cyber cyan */}
            <stop offset="70%" stopColor="#00D2B4" /> {/* Teal-emerald */}
            <stop offset="100%" stopColor="#A6E600" /> {/* Lime neon green */}
          </linearGradient>
          
          <linearGradient id="logoArrowGrad" x1="30" y1="90" x2="90" y2="30" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#008BE2" />
            <stop offset="100%" stopColor="#6EE7B7" />
          </linearGradient>

          <filter id="glowEffect" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="3" result="glow" />
            <feComposite in="SourceGraphic" in2="glow" operator="over" />
          </filter>
        </defs>

        {/* Outer Circular Gradient Ring */}
        <circle
          cx="60"
          cy="60"
          r="52"
          stroke="url(#logoRingGrad)"
          strokeWidth="6"
          className="opacity-95"
          strokeLinecap="round"
        />

        {/* Inner Stylized Tech Arrow pointing top-right (growth symbol) */}
        <path
          d="M32 88 
             C30 84, 32 78, 38 72 
             C48 62, 70 42, 76 36 
             L58 36 
             C54 36, 52 32, 54 28 
             L84 28 
             C89 28, 92 31, 92 36 
             L92 66 
             C92 68, 88 70, 84 66 
             L84 48 
             C78 54, 56 76, 44 86 
             C38 90, 34 90, 32 88 Z"
          fill="url(#logoRingGrad)"
          filter="url(#glowEffect)"
        />

        {/* Dynamic decorative growth indicators */}
        <circle cx="84" cy="36" r="3" fill="#A6E600" />
      </svg>

      {/* Font paired with Space Grotesk/Outfit light sans-serif look of the logo */}
      {withText && (
        <span 
          className={`font-sans tracking-wide text-slate-900 dark:text-white font-light flex items-center ${textSize}`}
          style={{ fontFamily: '"Inter", sans-serif' }}
        >
          MoneyNet <span className="font-extrabold text-blue-600 dark:text-blue-400 ml-1.5">Ai</span>
        </span>
      )}
    </div>
  );
};
