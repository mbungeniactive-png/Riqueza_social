import React, { createContext, useContext, useState, ReactNode } from 'react';

export type ResponseStyle = 'detailed' | 'concise';
export type ThemeColor = 'blue' | 'green' | 'purple' | 'orange' | 'rose';

interface Settings {
  responseStyle: ResponseStyle;
  themeColor: ThemeColor;
  notificationsEnabled: boolean;
}

interface SettingsContextType {
  settings: Settings;
  updateSettings: (updates: Partial<Settings>) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(() => {
    const saved = localStorage.getItem('app_settings');
    return saved ? JSON.parse(saved) : {
      responseStyle: 'detailed',
      themeColor: 'blue',
      notificationsEnabled: true
    };
  });

  const updateSettings = (updates: Partial<Settings>) => {
    setSettings(prev => {
      const newSettings = { ...prev, ...updates };
      localStorage.setItem('app_settings', JSON.stringify(newSettings));
      return newSettings;
    });
  };

  // Apply theme color to document root
  React.useEffect(() => {
    const root = document.documentElement;
    const colors: Record<ThemeColor, string> = {
      blue: '#2563eb',
      green: '#16a34a',
      purple: '#9333ea',
      orange: '#ea580c',
      rose: '#e11d48'
    };
    root.style.setProperty('--primary-color', colors[settings.themeColor]);
  }, [settings.themeColor]);

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useSettings must be used within SettingsProvider');
  return context;
};
