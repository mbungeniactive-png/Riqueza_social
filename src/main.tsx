import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { LanguageProvider } from './hooks/useLanguage';
import { SettingsProvider } from './hooks/useSettings';
import { ToastProvider } from './components/Toast';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <SettingsProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </SettingsProvider>
    </LanguageProvider>
  </StrictMode>,
);
