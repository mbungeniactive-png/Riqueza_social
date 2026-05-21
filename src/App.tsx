/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Onboarding } from './components/Onboarding';
import { CountrySelector } from './components/CountrySelector';
import { LanguageSelector } from './components/LanguageSelector';
import { Auth } from './components/Auth';
import { Dashboard } from './components/Dashboard';
import { SectionView } from './components/SectionView';
import { ChatMentor } from './components/ChatMentor';
import { TikTokInsights } from './components/TikTokInsights';
import { useLanguage } from './hooks/useLanguage';
import { CONTENT_BY_LANGUAGE } from './constants/content';
import { auth, createUserProfile } from './lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

type AppStep = 'onboarding' | 'country' | 'language' | 'auth' | 'dashboard' | 'section' | 'mentor_ia' | 'tiktok_insights';

export default function App() {
  const { language } = useLanguage();
  const [step, setStep] = useState<AppStep>(() => {
    const onboardingDone = localStorage.getItem('onboarding_done') === 'true';
    if (!onboardingDone) return 'onboarding';
    
    const countrySelected = localStorage.getItem('selected_country');
    if (!countrySelected) return 'country';
    
    const langSelected = localStorage.getItem('app_language');
    if (!langSelected) return 'language';
    
    return 'auth';
  });
  const [selectedCountry, setSelectedCountry] = useState<string | undefined>(() => localStorage.getItem('selected_country') || undefined);
  const [selectedLanguage, setSelectedLanguage] = useState<string | undefined>(() => localStorage.getItem('app_language') || undefined);
  const [selectedSectionId, setSelectedSectionId] = useState<string>();
  const [targetSubsectionId, setTargetSubsectionId] = useState<string>();
  const [mentorInitialMessage, setMentorInitialMessage] = useState<string>();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        // If user is authenticated, jump to dashboard unless in a specific view
        setStep(currentStep => {
          if (currentStep === 'auth' || currentStep === 'onboarding' || currentStep === 'country' || currentStep === 'language') {
            return 'dashboard';
          }
          return currentStep;
        });
      } else {
        // If user logs out, go back to auth
        setStep(currentStep => {
          if (currentStep === 'dashboard' || currentStep === 'section' || currentStep === 'mentor_ia' || currentStep === 'tiktok_insights') {
            return 'auth';
          }
          return currentStep;
        });
      }
      setInitializing(false);
    });
    return () => unsubscribe();
  }, []);

  const handleOnboardingComplete = () => {
    localStorage.setItem('onboarding_done', 'true');
    setStep('country');
  };
  
  const handleCountrySelect = (code: string) => {
    setSelectedCountry(code);
    localStorage.setItem('selected_country', code);
    setStep('language');
  };

  const handleLanguageSelect = (id: string) => {
    setSelectedLanguage(id);
    // LanguageProvider already updates localStorage via its setLanguage call if used elsewhere,
    // but here we are setting local state too.
    setStep('auth');
  };

  const handleLoginSuccess = async (user: User) => {
    setCurrentUser(user);
    if (user.email) {
      try {
        await createUserProfile(
          user.uid, 
          user.email, 
          user.displayName || 'Investidor', 
          selectedCountry, 
          selectedLanguage,
          5 // Initial credits
        );
      } catch (err) {
        console.error('Error creating user profile:', err);
      }
    }
    setStep('dashboard');
  };

  const handleAskMentor = (message: string) => {
    setMentorInitialMessage(message);
    setStep('mentor_ia');
  };

  const handleSelectSection = (id: string) => {
    const appContent = CONTENT_BY_LANGUAGE[language] || CONTENT_BY_LANGUAGE['pt'];
    
    if (id === 'mentor_ia') {
      setStep('mentor_ia');
    } else if (id === 'change_country') {
      setStep('country');
    } else if (id === 'change_language') {
      setStep('language');
    } else {
      // Find if it's a top-level section
      let section = appContent.find(s => s.id === id);
      let subsectionId: string | undefined = undefined;
      
      // If not, it might be a subsection ID
      if (!section) {
        section = appContent.find(s => s.subsections.some(sub => sub.id === id));
        if (section) {
          subsectionId = id;
        }
      }

      if (section) {
        setSelectedSectionId(section.id);
        setTargetSubsectionId(subsectionId);
        setStep('section');
      }
    }
  };

  const handleBackToDashboard = () => {
    setTargetSubsectionId(undefined);
    setStep('dashboard');
  };
  const handleLogout = () => {
    auth.signOut();
    setStep('auth');
  };

  if (initializing) return null;
  
  return (
    <div className="max-w-md mx-auto h-screen bg-slate-50 dark:bg-slate-950 flex flex-col overflow-hidden shadow-2xl relative transition-colors duration-300">
      {step === 'onboarding' && <Onboarding onComplete={handleOnboardingComplete} />}
      
      {step === 'country' && (
        <CountrySelector onSelect={handleCountrySelect} />
      )}
      
      {step === 'language' && (
        <LanguageSelector 
          selected={selectedLanguage} 
          onSelect={handleLanguageSelect} 
        />
      )}
      
      {step === 'auth' && (
        <Auth onLoginSuccess={handleLoginSuccess} />
      )}
      
      {step === 'dashboard' && (
        <div className="flex-1 overflow-hidden">
          <Dashboard 
            userName={currentUser?.displayName || undefined}
            onSelectSection={handleSelectSection} 
            onLogout={handleLogout}
          />
        </div>
      )}
      
      {step === 'section' && selectedSectionId && (
        <div className="flex-1 overflow-hidden">
          <SectionView 
            section={(CONTENT_BY_LANGUAGE[language] || CONTENT_BY_LANGUAGE['pt']).find(s => s.id === selectedSectionId)!} 
            onBack={handleBackToDashboard} 
            onAskMentor={handleAskMentor}
            targetSubsectionId={targetSubsectionId}
          />
        </div>
      )}

      {step === 'mentor_ia' && (
        <div className="flex-1 overflow-hidden">
          <ChatMentor 
            onBack={handleBackToDashboard} 
            initialMessage={mentorInitialMessage}
            onClearInitialMessage={() => setMentorInitialMessage(undefined)}
          />
        </div>
      )}

      {step === 'tiktok_insights' && (
        <div className="flex-1 overflow-hidden">
          <TikTokInsights onBack={handleBackToDashboard} />
        </div>
      )}

    </div>
  );
}

