import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, User as UserIcon, Loader2, ShieldCheck, Sparkles, Check, ArrowLeft, Lock } from 'lucide-react';
import { signInWithName } from '../lib/firebase';
import { useLanguage } from '../hooks/useLanguage';
import { AppLogo } from './AppLogo';

interface AuthProps {
  onLoginSuccess: (user: any) => Promise<void> | void;
}

const contentByLang: Record<string, {
  privacyTitle: string;
  privacySub: string;
  privacyPoints: string[];
  privacyBtn: string;
  
  aboutTitle: string;
  aboutSub: string;
  aboutPoints: { title: string; desc: string }[];
  aboutBtn: string;
}> = {
  pt: {
    privacyTitle: "Política de Privacidade & Termos",
    privacySub: "Respeitamos a sua privacidade e segurança física/digital. Seus dados estão completamente protegidos conosco.",
    privacyPoints: [
      "Seu nome e progresso de aprendizado são armazenados de forma segura localmente e em nuvem criptografada.",
      "Processamos informações estritamente para personalizar seu ecossistema de criação de conteúdo, insights e conversas de mentoria.",
      "Garantimos zero spam: nunca compartilharemos, alugaremos ou venderemos seus dados de perfil a terceiros.",
      "Controle total dos seus dados: você possui o direito de apagar todos os caches e histórico a qualquer momento nas configurações."
    ],
    privacyBtn: "Aceitar e Continuar",
    
    aboutTitle: "Descubra o MoneyNet Ai",
    aboutSub: "Seu ecossistema definitivo de inteligência para prosperar no ambiente digital e construir negócios reais.",
    aboutPoints: [
      { title: "Mentoria de IA Avançada", desc: "Acesse um Mentor IA treinado com estratégias de marketing digital do mundo real, disponível 24/7 para planejar seus projetos." },
      { title: "Módulos de Alta Performance", desc: "Vídeos e roteiros focados diretamente no que funciona: monetização veloz, TikTok, Reels, dropshipping e mentalidade defensiva." },
      { title: "Engrenagens de Criação Integradas", desc: "Modelos práticos de vídeos virais, insights automatizados de métricas e prompts refinados para impulsionar suas postagens diárias." }
    ],
    aboutBtn: "Encontrar Conteúdo 🚀"
  },
  en: {
    privacyTitle: "Privacy Policy & Terms",
    privacySub: "We prioritize your physical and digital privacy. Your personal progression track data is completely safe.",
    privacyPoints: [
      "Your credentials, name, and learning milestones are stored securely locally and via end-to-end cloud encryption.",
      "Process optimization: we analyze tracking purely to tailor custom generative tips, insights, and AI tutor memory.",
      "Zero spam guarantee: we will never monetize, lease, or distribute your name or profile information.",
      "Total control over your footprint: wipe all history, stored messages, and cache at any time inside settings."
    ],
    privacyBtn: "Accept & Continue",
    
    aboutTitle: "Discover MoneyNet Ai",
    aboutSub: "The modern high-tech ecosystem for building real, scalable, and automated digital online businesses.",
    aboutPoints: [
      { title: "Real-time AI Mentorship", desc: "An exclusive AI expert optimized with battle-tested viral marketing frameworks, ready on demand 24/7." },
      { title: "Premium Mastery Lessons", desc: "Short, distraction-free actionable guides focusing on digital tools, copywriting, TikTok Shop, and audience building." },
      { title: "Smart Automated Engines", desc: "Built-in scripts, optimized hooks, content structures, and viral video blueprints to 10x your content output." }
    ],
    aboutBtn: "Find Content 🚀"
  },
  es: {
    privacyTitle: "Política de Privacidad y Términos",
    privacySub: "Garantizamos tu privacidad y seguridad digital. Tus datos de usuario están totalmente resguardados.",
    privacyPoints: [
      "Tu nombre y progreso de estudio se almacenan de manera local y en la nube con cifrado seguro de última generación.",
      "Optimización inteligente: procesamos datos únicamente para adaptar sugerencias académicas, resúmenes y tu tutor virtual.",
      "Absoluta ausencia de spam: jamás cederemos ni venderemos tu información a anunciantes o terceros.",
      "Tu derecho al olvido: elimina tu progreso acumulado y datos guardados inmediatamente desde el panel de ajustes."
    ],
    privacyBtn: "Aceptar y Continuar",
    
    aboutTitle: "Descubre MoneyNet Ai",
    aboutSub: "Tu ecosistema central para triunfar en internet, desarrollar habilidades y construir fuentes de ingreso de forma legítima.",
    aboutPoints: [
      { title: "Mentoría de IA de Élite", desc: "Un consultor de IA especializado disponible las 24 horas del día para desglosar nichos y resolver desafíos de ventas." },
      { title: "Módulos de Rendimiento Ágil", desc: "Lecciones y consejos optimizados de monetización digital, TikTok, edición móvil y resiliencia mental." },
      { title: "Engranajes de Crecimiento Prácticos", desc: "Acceso inmediato a ideas, copies para guiones virales rápidos de alta retención de atención." }
    ],
    aboutBtn: "Encontrar Contenido 🚀"
  },
  fr: {
    privacyTitle: "Politique de Confidentialité and Conditions",
    privacySub: "Nous garantissons votre sécurité numérique et la protection totale de vos interactions privées.",
    privacyPoints: [
      "Vos informations, nom de profil et progression sont stockés en totale sécurité de façon locale et nuage.",
      "Traitement interne uniquement pour configurer le profil de mentorat IA adapté à votre rythme d'apprentissage.",
      "Zéro spam garanti : aucune revente ou partage de données personnelles à des tierces parties.",
      "Gestion libre de vos données : videz vos caches et effacez l'historique quand vous le souhaitez dans les paramètres."
    ],
    privacyBtn: "Accepter & Continuer",
    
    aboutTitle: "Découvrez MoneyNet Ai",
    aboutSub: "Votre écosystème intelligent complet pour matérialiser et monétiser vos compétences sur le web.",
    aboutPoints: [
      { title: "Mentorat IA Interactif", desc: "Bénéficiez des conseils d'une intelligence artificielle experte en stratégies de marketing et viralité digitale 24h/24." },
      { title: "Modules Modernes Ultra-Ciblés", desc: "Des guides d'apprentissage directs, clairs et efficaces sur la rentabilité en ligne, l'édition et l'IA." },
      { title: "Assistance Opérationnelle Intégrée", desc: "Génération de scripts pour vos vidéos, modèles pour retenir l'attention et accroches stratégiques." }
    ],
    aboutBtn: "Découvrir le Contenu 🚀"
  }
};

export const Auth: React.FC<AuthProps> = ({ onLoginSuccess }) => {
  const { language } = useLanguage();
  const [subStep, setSubStep] = useState<'name' | 'privacy' | 'about_moneynet'>('name');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const text = contentByLang[language] || contentByLang['pt'];

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim()) {
      setError(
        language === 'pt' ? 'Por favor, preencha seu nome e sobrenome.' :
        language === 'en' ? 'Please enter your first and last name.' :
        language === 'es' ? 'Por favor, introduce tu nombre y apellido.' :
        'Veuillez entrer votre prénom et votre nom.'
      );
      return;
    }
    setError(null);
    setSubStep('privacy');
  };

  const handleFinalSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const user = await signInWithName(firstName.trim(), lastName.trim());
      // Wait a tick to ensure Firebase fully propagated the profile change internally
      await new Promise(resolve => setTimeout(resolve, 500));
      await onLoginSuccess(user);
    } catch (err: any) {
      setError(
        language === 'pt' ? 'Ocorreu um erro ao entrar. Tente novamente.' :
        'An error occurred. Please try again.'
      );
      console.error(err);
      setSubStep('name'); // fallback to let them edit/retry
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-950 p-6 sm:p-8 transition-colors duration-300 overflow-y-auto">
      <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full py-4">
        {/* Premium Application Branding Header */}
        <div className="flex justify-center mb-8 select-none shrink-0 border-b border-slate-100 dark:border-white/5 pb-6">
          <AppLogo withText size={52} textSize="text-2xl" />
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 p-4 rounded-2xl mb-6 text-sm font-bold border border-red-100 dark:border-red-500/20 italic"
          >
            {error}
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {subStep === 'name' && (
            <motion.div
              key="name-step"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-2 leading-tight tracking-tight">
                {language === 'pt' ? <>Seja bem-vindo.<br /><span className="text-blue-600 dark:text-blue-400">Qual é o seu nome?</span></> :
                 language === 'en' ? <>Welcome.<br /><span className="text-blue-600 dark:text-blue-400">What is your name?</span></> :
                 language === 'es' ? <>Bienvenido.<br /><span className="text-blue-600 dark:text-blue-400">¿Cuál es tu nombre?</span></> :
                 <>Bienvenue.<br /><span className="text-blue-600 dark:text-blue-400">Quel est votre nom?</span></>}
              </h1>
              <p className="text-slate-500 dark:text-slate-400 font-medium mb-8 leading-relaxed">
                {language === 'pt' ? 'Insira seu nome e sobrenome para personalizar sua experiência.' :
                 language === 'en' ? 'Enter your first and last name to personalize your experience.' :
                 language === 'es' ? 'Introduce tu nombre y apellido para personalizar tu experiencia.' :
                 'Entrez votre prénom et votre nom pour personnaliser votre expérience.'}
              </p>

              <form onSubmit={handleNameSubmit} className="space-y-4">
                <div className="relative group">
                  <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-600 w-5 h-5 transition-colors group-focus-within:text-blue-500" />
                  <input
                    type="text"
                    required
                    placeholder={language === 'pt' ? "Nome" : language === 'en' ? "First Name" : language === 'es' ? "Nombre" : "Prénom"}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-white/5 border-none rounded-3xl focus:ring-2 focus:ring-blue-500 transition-all font-medium outline-none text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-600"
                  />
                </div>
                
                <div className="relative group">
                  <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-600 w-5 h-5 transition-colors group-focus-within:text-blue-500" />
                  <input
                    type="text"
                    required
                    placeholder={language === 'pt' ? "Sobrenome" : language === 'en' ? "Last Name" : language === 'es' ? "Apellido" : "Nom"}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-white/5 border-none rounded-3xl focus:ring-2 focus:ring-blue-500 transition-all font-medium outline-none text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-600"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!firstName.trim() || !lastName.trim()}
                  className="w-full bg-slate-900 dark:bg-blue-600 text-white py-4 rounded-3xl mt-4 font-bold shadow-xl shadow-slate-200 dark:shadow-none active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {language === 'pt' ? 'Próximo' : language === 'en' ? 'Next' : language === 'es' ? 'Siguiente' : 'Suivant'}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            </motion.div>
          )}

          {subStep === 'privacy' && (
            <motion.div
              key="privacy-step"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4">
                <button 
                  onClick={() => setSubStep('name')}
                  className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-slate-500 dark:text-slate-400 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="p-2 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl">
                  <ShieldCheck className="w-6 h-6" />
                </div>
              </div>

              <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
                {text.privacyTitle}
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-6 leading-relaxed">
                {text.privacySub}
              </p>

              <div className="space-y-4 bg-slate-50 dark:bg-white/5 p-5 rounded-3xl mb-6 border border-slate-100 dark:border-white/5 max-h-[290px] overflow-y-auto">
                {text.privacyPoints.map((point, index) => (
                  <div key={index} className="flex gap-3 items-start">
                    <div className="p-1 bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 rounded-lg shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 text-sm font-medium leading-relaxed">
                      {point}
                    </p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setSubStep('about_moneynet')}
                className="w-full bg-slate-900 dark:bg-blue-600 text-white py-4 rounded-3xl font-bold shadow-xl shadow-slate-200 dark:shadow-none active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                {text.privacyBtn}
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}

          {subStep === 'about_moneynet' && (
            <motion.div
              key="about-step"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4">
                <button 
                  disabled={loading}
                  onClick={() => setSubStep('privacy')}
                  className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-slate-500 dark:text-slate-400 transition-colors disabled:opacity-50"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="p-2 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-xl">
                  <Sparkles className="w-6 h-6" />
                </div>
              </div>

              <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
                {text.aboutTitle}
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-6 leading-relaxed">
                {text.aboutSub}
              </p>

              <div className="space-y-4 mb-6">
                {text.aboutPoints.map((pt, index) => (
                  <div key={index} className="bg-slate-50 dark:bg-white/5 p-4 rounded-2xl border border-slate-100 dark:border-white/5">
                    <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm mb-1 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-500 dark:bg-blue-400 rounded-full shrink-0" />
                      {pt.title}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-xs font-medium leading-relaxed">
                      {pt.desc}
                    </p>
                  </div>
                ))}
              </div>

              <p className="text-center text-xs text-slate-400 dark:text-slate-500 mb-6 font-medium flex items-center justify-center gap-1.5">
                <Lock className="w-3.5 h-3.5" />
                {language === 'pt' ? 'Clique abaixo para encontrar e obter acesso ao conteúdo' :
                 language === 'en' ? 'Click below to locate and unlock all content' :
                 language === 'es' ? 'Haz clic abajo para encontrar y acceder al contenido' :
                 'Cliquez ci-dessous pour trouver et déverrouiller le contenu'}
              </p>

              <button
                onClick={handleFinalSubmit}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-3xl font-bold shadow-xl shadow-blue-200 dark:shadow-none active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-75"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    {text.aboutBtn}
                  </>
                )}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

