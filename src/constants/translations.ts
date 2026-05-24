export type Language = 'pt' | 'en' | 'es' | 'fr';

export const TRANSLATIONS: Record<Language, any> = {
  pt: {
    dashboard: {
      title: 'Dashboard',
      welcome: 'Olá',
      search_placeholder: 'Pesquisar tópicos, nichos ou estratégias...',
      categories_title: 'Módulos de Domínio',
      quick_stats: 'Estatísticas de Hoje',
      social_reach: 'Alcance Social',
      active_campaigns: 'Aulas Vistas',
      mentor_badge: 'Mentor IA Ativo',
      refresh: 'Conteúdo atualizado!',
      more_menu: {
        profile: 'Meu Perfil',
        settings: 'Configurações',
        notifications: 'Notificações',
        logout: 'Sair',
        refresh: 'Atualizar Conteúdo',
        theme_light: 'Modo Claro',
        theme_dark: 'Modo Escuro',
        share: 'Compartilhar App',
        change_country: 'Mudar País',
        change_language: 'Mudar Idioma',
        clear_cache: 'Limpar Progresso',
        about: 'Sobre o MoneyNet Ai',
        contact: 'Contato & Suporte',
        contact_whatsapp: 'Fale conosco no WhatsApp',
        privacy_policy: 'Política de Privacidade',
        contact_convo: 'Converse com MoneyNet Ai no WhatsApp',
        response_style: 'Estilo de Resposta',
        response_detailed: 'Explicativo',
        response_concise: 'Resumido',
        theme_color: 'Cor do Tema',
        notifs_enabled: 'Notificações Ativas'
      }
    },
    onboarding: {
      slides: [
        {
          title: 'Ganhe Dinheiro Online',
          description: 'Descubra as melhores estratégias para transformar seu tempo em renda extra ou principal.',
        },
        {
          title: 'Domine as Redes Sociais',
          description: 'Aprenda a crescer e monetizar seu TikTok, YouTube e Instagram de forma profissional.',
        },
        {
          title: 'Marketing Digital',
          description: 'Explore o mundo dos afiliados, dropshipping e tráfego pago para escalar seus resultados.',
        }
      ],
      start: 'Começar Agora'
    },
    selectors: {
      country_title: 'Seu País',
      country_subtitle: 'Personalize sua experiência com conteúdo local.',
      country_search: 'Buscar país...',
      country_not_found: 'Nenhum país encontrado',
      lang_title: 'Qual seu idioma?',
      lang_subtitle: 'Você poderá mudar isso mais tarde nas configurações.',
      lang_soon: 'Expansão de idiomas em breve!',
      lang_confirm: 'Confirmar Idioma'
    },
    common: {
      back: 'Voltar',
      next: 'Próximo',
      confirm: 'Confirmar'
    },
    sections: {
      completed: 'Concluído',
      share_success: 'Compartilhado com sucesso!',
      copy_success: 'Link copiado!',
      share_msg: 'Olha que interessante! 🚀\n\n*{{title}}*\n\nVeja no app:\n{{url}}',
      no_video: 'Seu navegador não suporta vídeos.',
      action_plan: 'Plano de Ação',
      save_link: 'Salvar Link',
      link_saved: 'Link salvo!',
      link_removed: 'Link removido',
      product_name: 'Nome do Produto',
      affiliate_manager: 'Gerenciador de Links',
      no_links: 'Nenhum link salvo ainda.'
    },
    auth: {
      title: 'Investir em si mesmo.',
      subtitle: 'Entre na sua conta para acessar todo o conteúdo exclusivo.',
      email_placeholder: 'E-mail',
      password_placeholder: 'Senha',
      forgot_password: 'Esqueceu a senha?',
      login_button: 'Entrar',
      or_divider: 'OU ENTRE COM',
      google_button: 'Entrar com Google',
      phone_button: 'Telefone',
      no_account: 'Ainda não tem uma conta?',
      has_account: 'Já tem uma conta?',
      signup_button: 'Cadastre-se',
      reset_success: 'E-mail de redefinição enviado com sucesso!',
      google_error: 'Falha no login com Google. Tente novamente.'
    }
  },
  en: {
    dashboard: {
      title: 'Dashboard',
      welcome: 'Hello',
      search_placeholder: 'Search topics, niches or strategies...',
      categories_title: 'Mastery Modules',
      quick_stats: 'Today\'s Stats',
      social_reach: 'Social Reach',
      active_campaigns: 'Lessons Viewed',
      mentor_badge: 'AI Mentor Active',
      refresh: 'Content updated!',
      more_menu: {
        profile: 'My Profile',
        settings: 'Settings',
        notifications: 'Notifications',
        logout: 'Logout',
        refresh: 'Refresh Content',
        theme_light: 'Light Mode',
        theme_dark: 'Dark Mode',
        share: 'Share App',
        change_country: 'Change Country',
        change_language: 'Change Language',
        clear_cache: 'Clear Progress',
        about: 'About MoneyNet Ai',
        contact: 'Contact & Support',
        contact_whatsapp: 'Contact us on WhatsApp',
        privacy_policy: 'Privacy Policy',
        contact_convo: 'Chat with MoneyNet Ai on WhatsApp',
        response_style: 'Response Style',
        response_detailed: 'Detailed',
        response_concise: 'Concise',
        theme_color: 'Theme Color',
        notifs_enabled: 'Notifications Active'
      }
    },
    onboarding: {
      slides: [
        {
          title: 'Make Money Online',
          description: 'Discover the best strategies to turn your time into extra or main income.',
        },
        {
          title: 'Master Social Media',
          description: 'Learn how to grow and monetize your TikTok, YouTube, and Instagram like a pro.',
        },
        {
          title: 'Digital Marketing',
          description: 'Explore affiliates, dropshipping, and paid traffic to scale your results.',
        }
      ],
      start: 'Start Now'
    },
    selectors: {
      country_title: 'Your Country',
      country_subtitle: 'Personalize your experience with local content.',
      country_search: 'Search country...',
      country_not_found: 'No country found',
      lang_title: 'Your Language?',
      lang_subtitle: 'You can change this later in settings.',
      lang_soon: 'Language expansion coming soon!',
      lang_confirm: 'Confirm Language'
    },
    common: {
      back: 'Back',
      next: 'Next',
      confirm: 'Confirm'
    },
    sections: {
      completed: 'Completed',
      share_success: 'Shared successfully!',
      copy_success: 'Link copied!',
      share_msg: 'Look at this! 🚀\n\n*{{title}}*\n\nSee it in the app:\n{{url}}',
      no_video: 'Your browser does not support videos.',
      action_plan: 'Action Plan',
      save_link: 'Save Link',
      link_saved: 'Link saved!',
      link_removed: 'Link removed',
      product_name: 'Product Name',
      affiliate_manager: 'Link Manager',
      no_links: 'No links saved yet.'
    },
    auth: {
      title: 'Invest in yourself.',
      subtitle: 'Sign in to your account to access all exclusive content.',
      email_placeholder: 'Email',
      password_placeholder: 'Password',
      forgot_password: 'Forgot password?',
      login_button: 'Sign In',
      or_divider: 'OR SIGN IN WITH',
      google_button: 'Sign in with Google',
      phone_button: 'Phone',
      no_account: "Don't have an account?",
      has_account: 'Already have an account?',
      signup_button: 'Sign Up',
      reset_success: 'Password reset email sent successfully!',
      google_error: 'Google login failed. Please try again.'
    }
  },
  es: {
    dashboard: {
      title: 'Tablero',
      welcome: 'Hola',
      search_placeholder: 'Buscar temas, nichos o estrategias...',
      categories_title: 'Módulos de Maestría',
      quick_stats: 'Estadísticas de Hoy',
      social_reach: 'Alcance Social',
      active_campaigns: 'Clases Vistas',
      mentor_badge: 'Mentor IA Activo',
      refresh: '¡Contenido actualizado!',
      more_menu: {
        profile: 'Mi Perfil',
        settings: 'Ajustes',
        notifications: 'Notificaciones',
        logout: 'Cerrar Sesión',
        refresh: 'Actualizar Contenido',
        theme_light: 'Modo Claro',
        theme_dark: 'Modo Oscuro',
        share: 'Compartir App',
        change_country: 'Cambiar País',
        change_language: 'Cambiar Idioma',
        clear_cache: 'Limpiar Progreso',
        about: 'Sobre MoneyNet Ai',
        contact: 'Contacto y Soporte',
        contact_whatsapp: 'Contáctanos por WhatsApp',
        privacy_policy: 'Política de Privacidad',
        contact_convo: 'Chatea con MoneyNet Ai en WhatsApp',
        response_style: 'Estilo de Respuesta',
        response_detailed: 'Explicativo',
        response_concise: 'Resumido',
        theme_color: 'Color del Tema',
        notifs_enabled: 'Notificaciones Activas'
      }
    },
    onboarding: {
      slides: [
        {
          title: 'Gana Dinero Online',
          description: 'Descubre las mejores estrategias para transformar tu tiempo en ingresos extra o principales.',
        },
        {
          title: 'Domina las Redes Sociales',
          description: 'Aprende a crecer y monetizar tu TikTok, YouTube e Instagram de forma profesional.',
        },
        {
          title: 'Marketing Digital',
          description: 'Explora afiliados, dropshipping y tráfico pagado para escalar tus resultados.',
        }
      ],
      start: 'Empezar Ahora'
    },
    selectors: {
      country_title: 'Tu País',
      country_subtitle: 'Personaliza tu experiencia con contenido local.',
      country_search: 'Buscar país...',
      country_not_found: 'No se encontró ningún país',
      lang_title: '¿Tu Idioma?',
      lang_subtitle: 'Puedes cambiar esto más tarde en los ajustes.',
      lang_soon: '¡Pronto más idiomas!',
      lang_confirm: 'Confirmar Idioma'
    },
    common: {
      back: 'Volver',
      next: 'Siguiente',
      confirm: 'Confirmar'
    },
    sections: {
      completed: 'Completado',
      share_success: '¡Compartido con éxito!',
      copy_success: '¡Enlace copiado!',
      share_msg: '¡Mira qué interesante! 🚀\n\n*{{title}}*\n\nVer en la app:\n{{url}}',
      no_video: 'Tu navegador no soporta videos.',
      action_plan: 'Plan de Acción',
      save_link: 'Guardar Enlace',
      link_saved: '¡Enlace guardado!',
      link_removed: 'Enlace eliminado',
      product_name: 'Nombre del Producto',
      affiliate_manager: 'Gestor de Enlaces',
      no_links: 'Aún no hay enlaces guardados.'
    },
    auth: {
      title: 'Invierte en ti mismo.',
      subtitle: 'Inicia sesión en tu cuenta para acceder a todo el contenido exclusivo.',
      email_placeholder: 'Correo electrónico',
      password_placeholder: 'Contraseña',
      forgot_password: '¿Olvidaste tu contraseña?',
      login_button: 'Entrar',
      or_divider: 'O ENTRA CON',
      google_button: 'Entrar con Google',
      phone_button: 'Teléfono',
      no_account: '¿Aún no tienes una cuenta?',
      has_account: '¿Ya tienes una cuenta?',
      signup_button: 'Regístrate',
      reset_success: '¡Correo de restablecimiento enviado con éxito!',
      google_error: 'Fallo en el inicio de sesión con Google. Inténtalo de nuevo.'
    }
  },
  fr: {
    dashboard: {
      title: 'Tableau de bord',
      welcome: 'Bonjour',
      search_placeholder: 'Rechercher des thèmes, niches ou stratégies...',
      categories_title: 'Modules de Maîtrise',
      quick_stats: 'Stats d\'aujourd\'hui',
      social_reach: 'Portée Sociale',
      active_campaigns: 'Leçons Vues',
      mentor_badge: 'Mentor IA Actif',
      refresh: 'Contenu mis à jour !',
      more_menu: {
        profile: 'Mon Profil',
        settings: 'Paramètres',
        notifications: 'Notifications',
        logout: 'Déconnexion',
        refresh: 'Actualiser le contenu',
        theme_light: 'Mode Clair',
        theme_dark: 'Mode Sombre',
        share: 'Partager l\'App',
        change_country: 'Changer de pays',
        change_language: 'Changer de langue',
        clear_cache: 'Effacer le progrès',
        about: 'À propos de MoneyNet Ai',
        contact: 'Contact & Support',
        contact_whatsapp: 'Contactez-nous sur WhatsApp',
        privacy_policy: 'Politique de Confidentialité',
        contact_convo: 'Discutez avec MoneyNet Ai sur WhatsApp',
        response_style: 'Style de Réponse',
        response_detailed: 'Détaillé',
        response_concise: 'Concis',
        theme_color: 'Couleur du Thème',
        notifs_enabled: 'Notifications Actives'
      }
    },
    onboarding: {
      slides: [
        {
          title: 'Gagnez de l\'argent en ligne',
          description: 'Découvrez les meilleures stratégies pour transformer votre temps en revenus complémentaires ou principaux.',
        },
        {
          title: 'Maîtrisez les réseaux sociaux',
          description: 'Apprenez à développer et monétiser votre TikTok, YouTube et Instagram comme un pro.',
        },
        {
          title: 'Marketing Digital',
          description: 'Explorez l\'affiliation, le dropshipping et la publicité payante pour booster vos résultats.',
        }
      ],
      start: 'Commencer'
    },
    selectors: {
      country_title: 'Votre Pays',
      country_subtitle: 'Personnalisez votre expérience avec du contenu local.',
      country_search: 'Chercher un pays...',
      country_not_found: 'Aucun pays trouvé',
      lang_title: 'Votre Langue ?',
      lang_subtitle: 'Vous pourrez changer cela plus tard.',
      lang_soon: 'Bientôt plus de langues !',
      lang_confirm: 'Confirmer la Langue'
    },
    common: {
      back: 'Retour',
      next: 'Suivant',
      confirm: 'Confirmer'
    },
    sections: {
      completed: 'Complété',
      share_success: 'Partagé avec succès !',
      copy_success: 'Lien copié !',
      share_msg: 'Regardez ça ! 🚀\n\n*{{title}}*\n\nVoir dans l\'app :\n{{url}}',
      no_video: 'Votre navigateur ne supporte pas les vidéos.',
      action_plan: 'Plan d\'Action',
      save_link: 'Enregistrer le lien',
      link_saved: 'Lien enregistré !',
      link_removed: 'Lien supprimé',
      product_name: 'Nom du Produit',
      affiliate_manager: 'Gestionnaire de Liens',
      no_links: 'Aucun lien enregistré pour le moment.'
    },
    auth: {
      title: 'Investissez en vous.',
      subtitle: 'Connectez-vous à votre compte pour accéder à tout le contenu exclusif.',
      email_placeholder: 'E-mail',
      password_placeholder: 'Mot de passe',
      forgot_password: 'Mot de passe oublié ?',
      login_button: 'Se connecter',
      or_divider: 'OU SE CONNECTER AVEC',
      google_button: 'Se connecter avec Google',
      phone_button: 'Téléphone',
      no_account: "Vous n'avez pas encore de compte ?",
      has_account: 'Vous avez déjà un compte ?',
      signup_button: "S'inscrire",
      reset_success: 'E-mail de réinitialisation envoyé avec succès !',
      google_error: 'Échec de la connexion avec Google. Veuillez réessayer.'
    }
  }
};
