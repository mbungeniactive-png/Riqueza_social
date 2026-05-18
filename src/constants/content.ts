import { Language } from './translations';

export interface ContentItem {
  title: string;
  items: string[];
  tips?: string[];
}

export interface SectionContent {
  id: string;
  title: string;
  description: string;
  subsections: {
    id: string;
    title: string;
    content: (string | { type: 'list' | 'tips' | 'steps' | 'info' | 'video' | 'image' | 'affiliate_manager'; title?: string; items?: string[]; url?: string })[];
  }[];
}

export const APP_CONTENT_PT: SectionContent[] = [
  {
    id: 'tiktok',
    title: 'TikTok',
    description: 'Aprenda a crescer e monetizar sua conta no TikTok.',
    subsections: [
      {
        id: 'growth',
        title: 'Crescimento de conta',
        content: [
          { type: 'info', title: '👤 Organização do Perfil Profissional', items: [
            'FOTO: Rosto claro ou logo simples e marcante.',
            'NOME: Exemplos: Dicas do João, Renda Inteligente, Vida de Sucesso.',
            'BIO: Deve prometer valor real (Ex: "Te ensino a ganhar dinheiro online", "Dicas diárias de renda extra").'
          ] },
          { type: 'steps', title: '1. Acerte no tipo de conteúdo', items: ['Você precisa de um foco (nicho), senão o algoritmo não sabe pra quem mostrar seus vídeos.', 'Exemplos: Humor, Dicas, Lifestyle, Motivação, Educativo, Trends adaptadas'] },
          { type: 'steps', title: '2. Gancho nos primeiros 3 segundos', items: ['Se ninguém para pra assistir, o vídeo morre.', 'Exemplos: "Ninguém te conta isso sobre...", "Se você fizer isso, você perde dinheiro"'] },
          { type: 'steps', title: '3. Vídeos curtos e dinâmicos', items: ['7 a 20 segundos funciona muito bem', 'Cortes rápidos, sem silêncio'] },
          { type: 'steps', title: '4. Consistência Profissional', items: ['Poste 1 a 3 vídeos por dia', 'Teste ideias diferentes', 'Reposte o que performar bem'] },
          { type: 'steps', title: '5. Engajamento = Combustível', items: ['Faça perguntas no vídeo', 'Responda comentários com vídeos', 'Incentive salvar e compartilhar'] },
          { type: 'tips', items: ['Viral = padrão repetido, não acaso. Analise o que deu certo e repita o formato.'] }
        ]
      },
      {
        id: 'tiktok_affiliates',
        title: 'TikTok para Afiliados',
        content: [
          { type: 'info', title: 'Pare de divulgar, comece a vender', items: ['Ninguém compra link — compra resultado', 'Mostre transformação, não apenas o produto'] },
          { type: 'list', items: ['Tipo 1: Problema → Solução', 'Tipo 2: Antes e Depois', 'Tipo 3: Testando Produto', 'Tipo 4: Prova Social'] },
          { type: 'tips', items: ['Use Call to Action inteligente: "Comenta \'quero\' que eu te mando o link" funciona melhor que "Link na bio".'] }
        ]
      },
      {
        id: 'tiktok_money_machine',
        title: 'Máquina de Vendas 2026',
        content: [
          { type: 'info', title: '🚀 PASSO 1: O Nicho Certo', items: ['💄 Beleza e Estética', '💪 Fitness e Saúde', '📱 Gadgets e Tecnologia', '❤️ Relacionamento, Frases e Motivação', '👉 Regra: Escolha o que você consegue postar todo dia sem cansar.'] },
          { type: 'info', title: '🎥 PASSO 2: Formatos que Vendem', items: [
            '1. Problema → Solução: "Se você vive isso, olha isso..."',
            '2. Antes e Depois: Transformação visual impactante.',
            '3. Teste de Produto: "Será que isso funciona mesmo?" (Ideal para afiliados).',
            '4. Storytelling: "Eu comecei a ganhar dinheiro quando descobri isso..."'
          ] },
          { type: 'steps', title: '🔥 PASSO 3: Estratégia de Postagem', items: [
             'Todos os dias: 2 vídeos no TikTok e 1–2 Reels no Instagram.',
             'Dica: Use o mesmo vídeo, apenas reposte (mude a música se necessário).',
             'Frequência é mais importante que perfeição no início.'
          ] },
          { type: 'info', title: '💰 PASSO 4: Como o Dinheiro Entra', items: [
            '1. Afiliados: Link na bio + "Comenta QUERO que te envio".',
            '2. Vendas Diretas: WhatsApp/Telegram (Revenda ou Produto Próprio).',
            '3. Parcerias: Marcas pagam conforme sua base cresce.'
          ] },
          { type: 'info', title: '⚡ PASSO 5: O Segredo do Top 1%', items: [
            'Você não precisa viralizar sempre. Você precisa de 1 vídeo que funcione.',
            'Repita o formato do seu vídeo vencedor várias vezes.',
            'Exemplo: Se um vídeo bate 10k views, faça 5 versões dele mudando só o gancho.'
          ] },
          { type: 'steps', title: '📈 Plano Rápido de 7 Dias', items: [
            'Dias 1–2: Testar 5 estilos de vídeos diferentes.',
            'Dias 3–4: Repetir o estilo que teve melhor retenção.',
            'Dias 5–7: Focar 100% no formato que deu resultado real.'
          ] },
          { type: 'tips', title: '⚠️ Erros que Matam seus Ganhos', items: [
            'Postar conteúdo aleatório (sem nicho).',
            'Não ter link ou oferta clara na bio.',
            'Desistir antes de repetir o que funciona.',
            'Tentar falar de tudo ao mesmo tempo.'
          ] },
          { type: 'tips', title: '💡 Quer acelerar 10x?', items: [
            'Posso montar: Ideias de vídeos prontas, roteiros persuasivos e até um funil automático para você vender em poucos dias.'
          ] }
        ]
      },
      {
        id: 'tiktok_ebook',
        title: 'Produtos Digitais (Ebooks e +)',
        content: [
          'Criar e vender um produto digital (Infoproduto) é o caminho mais rápido para a liberdade financeira no TikTok.',
          { type: 'info', title: '📘 O que você pode criar?', items: [
            'Ebooks: Guias práticos sobre nichos específicos.',
            'Packs/Templates: Edições prontas, artes no Canva, roteiros de vídeos.',
            'Cursos Rápidos: Aulas em vídeo ensinando uma habilidade.',
            'Mentorias: Acompanhamento para quem quer resultados mais rápidos.'
          ] },
          { type: 'info', title: '📘 1. Escolha um Tema que Vende', items: [
            'O erro de muita gente é escrever sobre o que gosta — não sobre o que vende.',
            '🔥 Temas quentes: Ganhar dinheiro online, Emagrecimento/Fitness, Beleza, Relacionamentos, Estudos/Produtividade, Afiliados.',
            '👉 Regra: Escolha algo que resolve um problema rápido.'
          ] },
          { type: 'steps', title: '✍️ 2. Crie o Conteúdo', items: [
            'Estrutura: Promessa (Resultado) → Introdução → Passos Práticos (3 a 7 capítulos) → Resumo + Ação.',
            'Ferramentas: Google Docs (escrita) e Canva (design profissional).'
          ] },
          { type: 'steps', title: '🎨 3. Design Profissional', items: [
            'No Canva: Escolha o formato "Ebook", use títulos chamativos e imagens simples.',
            'Exporte sempre em PDF para ser um produto vendável.'
          ] },
          { type: 'info', title: '💰 4. Precificação e Venda', items: [
            'Preço Inicial: R$10 a R$50 (ou $5 a $20 em mercados internacionais).',
            'Onde vender: Hotmart, Kiwify, Monetizze ou direto via WhatsApp/Link na bio.'
          ] },
          { type: 'steps', title: '🚀 5. Como Vender Todos os Dias', items: [
            'Use vídeos curtos: "Eu fiz R$200 com esse método", "3 erros que te impedem de ganhar dinheiro".',
            'Chamada para Ação: "Comenta QUERO que te envio o link".',
            'Estratégia: Viralização (TikTok/Reels) → Link/DM → Venda Automática.'
          ] },
          { type: 'tips', title: '⚠️ Erros Comuns', items: [
            'Ebook que não resolve um problema real.',
            'Texto longo demais e chato.',
            'Não produzir conteúdo de divulgação.',
            'Esperar vendas sem postar vídeos.'
          ] },
          { type: 'steps', title: '💡 Plano para Começar HOJE', items: [
            '1. [[CRIAR]]: Escolha um tema de dor extrema e escreva 5-10 páginas no Canva Doc ou Google Docs.',
            '2. [[PUBLICAR]]: Suba o PDF na Kiwify ou Hotmart e gere seu link de venda.',
            '3. [[PROMOVER]]: Grave 3 vídeos de "Gancho forte + Resultado" e poste no TikTok com o link na Bio.'
          ] }
        ]
      },
      {
        id: 'viral_affiliate_script',
        title: 'Roteiro Viral: Venda como Afiliado',
        content: [
          'Este roteiro foi desenhado para prender a atenção e converter curiosos em leads/vendas. Use uma edição dinâmica e boa iluminação.',
          { type: 'steps', title: '🪝 1. O Gancho (0-3 segundos)', items: [
            'Visual: Você apontando para a tela com um texto chamativo.',
            'Texto na Tela: "Como eu fiz R$ [Valor] como afiliado sem aparecer (ou começando do zero)".',
            'Áudio (Script): "Para de tentar vender link na internet do jeito errado. Se você quer ganhar dinheiro como afiliado de verdade, faz isso aqui."'
          ] },
          { type: 'steps', title: '🧠 2. O Conteúdo (4-15 segundos)', items: [
            'Ação: Mostre a tela do seu celular em uma plataforma (Hotmart/Kiwify) ou o produto que você vende.',
            'Script: "Primeiro, esquece o botão de \'vender\'. As pessoas compram SOLUÇÕES. Se você vende um curso de emagrecimento, você não posta o curso, você posta a receita ou o treino que resolve o problema."'
          ] },
          { type: 'steps', title: '🚀 3. A Estratégia de Ouro (16-25 segundos)', items: [
            'Script: "O segredo é o Tráfego Orgânico massivo. Poste 2 vídeos por dia focando na dor do seu cliente. Quando eles comentarem, você não manda o link direto, você chama no WhatsApp ou Direct."'
          ] },
          { type: 'steps', title: '📢 4. CTA Poderosa (Final)', items: [
            'Script: "Eu preparei um guia completo mostrando como eu escolho os produtos que mais vendem. Comenta \'MAPA\' aqui embaixo que eu te envio no privado."'
          ] },
          { type: 'tips', title: 'Dicas de Edição para Viralizar', items: [
            'Cortes rápidos: Remova cada milissegundo de silêncio.',
            'Legendas Dinâmicas: Use o CapCut para gerar legendas que mudam de cor ou pulam.',
            'Música \"Em Alta\": Procure músicas que estão bombando mas deixe o volume baixo (5-10%).',
            'Loop Infinito: Tente terminar a frase final de um jeito que ela conecte com o início do vídeo.'
          ] }
        ]
      },

      {
        id: 'tiktok_monetization',
        title: 'Monetização e Ativação',
        content: [
          { type: 'info', title: '1. Requisitos para Ativação', items: [
            'Geralmente: 10.000 seguidores, 100.000 views nos últimos 30 dias e +18 anos.',
            'Importante: Use conteúdo 100% original. O TikTok detecta vídeos roubados e corta o alcance.',
            'Consulte as regras oficiais na "TikTok Creator Academy".'
          ] },
          { type: 'info', title: '2. Como aumentar a chance de Monetizar', items: [
            'Use narração própria e edição autoral.',
            'Evite reposts simples; adicione seus comentários ou seu rosto.',
            'Storytelling é o rei: vídeos de 1 minuto que contam uma história completa retêm mais.'
          ] },
          { type: 'info', title: '3. Monetizar sem ser pelo TikTok', items: [
            'Não espere o algoritmo pagar. Use o TikTok para atrair pessoas para:',
            '• Afiliados (Kiwify, Hotmart, Eduzz).',
            '• Venda de Serviços ou Produtos Próprios (Ebooks).',
            '• Parcerias diretas com marcas.'
          ] },
          { type: 'tips', items: ['TikTok → atrai audiência → vende algo externo. Esse é o jogo do milhão.'] }
        ]
      },
      {
        id: 'tiktok_lives_mastery',
        title: 'Lives: O Guia da Conexão',
        content: [
          'As lives são o motor de crescimento mais rápido no TikTok para criar comunidade, ganhar seguidores e monetizar através de confiança.',
          { type: 'info', title: '⚙️ Como Ativar e Participar', items: [
            '• Ativação: Exige idade mínima, número de seguidores (geralmente 1k) e conta saudável.',
            '• Como entrar: Procure a tag "LIVE" no feed ou perfis. Clique e interaja imediatamente no chat.',
            '• A primeira regra: Você NÃO precisa falar perfeito. Você precisa gerar conexão e energia.'
          ] },
          { type: 'steps', title: '🎙️ Como Começar e Manter a Conversa', items: [
            '1. ABERTURA FORTE: "Fala pessoal, sejam bem-vindos! Comenta de onde você é". Isso movimenta o algoritmo logo de cara.',
            '2. FAÇA PERGUNTAS: Perguntas mantêm as pessoas no chat. "Quem aqui quer crescer no TikTok?" ou "Qual maior dificuldade de vocês?"',
            '3. COMENTE O CHAT: Nunca ignore o público. Chame as pessoas pelo nome: "Boa noite, João! Ótima pergunta, Carlos!".',
            '4. STORYTELLING: Conte histórias sobre sua jornada. "Quando comecei, meus vídeos não passavam de 200 views...". Isso gera identificação.'
          ] },
          { type: 'tips', title: 'Energia na Live', items: [
            'Lives sem energia morrem rápido. Varie o tom de voz, sorria e reaja com entusiasmo ao chat. A audiência fica pela sua personalidade e conexão humana.'
          ] }
        ]
      },
      {
        id: 'tiktok_lives_retention',
        title: 'Retenção e Crescimento em Lives',
        content: [
          'Fazer a pessoa entrar é fácil; fazer ela ficar é o desafio. Use gatilhos mentais para manter a audiência presa.',
          { type: 'info', title: '⏱️ Como Segurar a Audiência', items: [
            '• Crie Expectativa: "Daqui a pouco vou mostrar algo que ninguém te conta sobre o algoritmo".',
            '• Use Open Loops: Abra uma dúvida/curiosidade no início e só responda no final.',
            '• Silêncio Automático: Nunca deixe o áudio parado. Se o chat estiver lento, conte experiências, dê opiniões sobre tendências ou ensine algo rápido.'
          ] },
          { type: 'steps', title: '📈 Estratégia Profissional', items: [
            '1. FREQUÊNCIA: Faça lives em horários fixos para criar hábito na sua audiência.',
            '2. TEMA DEFINIDO: Live sem assunto perde retenção. Tenha um objetivo (Ensinar, Responder dúvidas, React).',
            '3. MONETIZAÇÃO E GIFTS: Crie motivos divertidos para as pessoas enviarem presentes (ex: Meta de Gifts).',
            '4. QUALIDADE TÉCNICA: Pelo menos um rosto bem iluminado e áudio limpo são essenciais para parecer profissional.'
          ] },
          { type: 'tips', title: '💡 O Segredo Final das Lives', items: [
            'No começo pode ser estranho e com pouca gente. A live é uma habilidade que se desenvolve com a PRÁTICA. Quanto mais você faz, mais natural e lucrativa ela se torna.'
          ] }
        ]
      },
      {
        id: 'tiktok_algorithm_mastery',
        title: 'Algoritmo: Detalhes Técnicos',
        content: [
          'O TikTok é uma máquina de análise de comportamento humano que tenta responder: "Qual vídeo vai prender mais atenção?".',
          { type: 'info', title: '🔍 Como a IA Analisa seu Vídeo', items: [
            '• TEXTO: Legendas, hashtags e palavras-chave.',
            '• ÁUDIO: Música, sons e PALAVRAS FALADAS (a IA entende o assunto).',
            '• VÍDEO: Reconhecimento de objetos, rostos, movimentos e estilo de edição.',
            '👉 O objetivo é descobrir exatamente para QUEM mostrar esse conteúdo.'
          ] },
          { type: 'info', title: '🚀 O Ciclo de Distribuição em Fases', items: [
            'O vídeo não vai direto para milhões. Ele passa por testes:',
            'Fase 1: Teste com 100-500 pessoas.',
            'Fase 2: Escala para 5k se as métricas iniciais forem boas.',
            'Fase 3: Se a retenção continuar alta, escala para 50k a 500k.',
            'Fase 4: Viralização real (Milhões).',
            '⚠️ O vídeo para de crescer quando a retenção cai ou as pessoas começam a sair rápido.'
          ] },
          { type: 'list', title: '📊 Métricas de Ouro (Mantenha o Foco)', items: [
            '1. HOLD RATE: Quantos ficaram nos primeiros 3 segundos.',
            '2. WATCH TIME: Tempo médio total assistido.',
            '3. COMPLETION RATE: Quantos assistiram até o final.',
            '4. REWATCH: Quantos assistiram novamente (Sinal fortíssimo!).',
            '5. ENGAGEMENT: Comentários e Compartilhamentos valem mais que curtidas.',
            '6. FOLLOW CONVERSION: Se as pessoas seguem após ver o vídeo.'
          ] },
          { type: 'tips', title: 'Por que Retenção é Tudo?', items: [
            'Retenção = Atenção. Atenção = Dinheiro para a plataforma. O TikTok promove quem mantém as pessoas no app.'
          ] }
        ]
      },
      {
        id: 'tiktok_hooks_psychology',
        title: 'Ganchos e Psicologia da Atenção',
        content: [
          'O cérebro humano decide em 1 a 3 segundos se continua vendo ou desliza. Você precisa de estímulo constante.',
          { type: 'info', title: '🪝 Fórmulas de Ganchos Virais', items: [
            '• MEDO: "Se você faz isso, está perdendo dinheiro." (O cérebro foca em perigo).',
            '• CURIOSIDADE: "Existe algo que ninguém te contou." (Cria tensão mental).',
            '• CHOQUE/SURPRESA: "Eu perdi tudo por causa disso." (O cérebro ama surpresas).',
            '• IDENTIFICAÇÃO: "Se seus vídeos não passam de 300 views..." (A pessoa se reconhece).',
            '• PROMESSA: "Vou te ensinar a viralizar rápido." (O cérebro espera recompensa).',
            '• SEGREDO: "O TikTok esconde isso." (Mistério prende a atenção).'
          ] },
          { type: 'steps', title: '🧠 Gatilhos que Seguram o Público', items: [
            '1. IDENTIFICAÇÃO: "Isso sou eu". Faça o espectador se sentir compreendido.',
            '2. CURIOSITY GAP: Deixe uma pergunta aberta e só responda no final.',
            '3. STORYTELLING: O cérebro humano é viciado em histórias (Problema → Tensão → Resolução).',
            '4. RECOMPENSA: Ofereça algo valioso: informação, emoção ou entretenimento.',
            '5. OPEN LOOPS: Abra uma tensão no começo e só feche no final para induzir a retenção total.'
          ] },
          { type: 'tips', title: 'O Que o Cérebro Ama', items: [
            'O cérebro procura por novidade, emoção, perigo, curiosidade e recompensa. Se o seu vídeo for previsível, a pessoa desliza.'
          ] }
        ]
      },
      {
        id: 'tiktok_growth_hacks',
        title: 'Estratégia de Crescimento Acelerado',
        content: [
          'Crescimento não é sorte, é repetição de padrões que funcionam.',
          { type: 'info', title: '🚀 Como Pensar como o Algoritmo', items: [
            'Antes de postar, pergunte:',
            '1. Isso prende atenção rápido?',
            '2. Isso gera curiosidade?',
            '3. Isso cria emoção?',
            '4. As pessoas assistiriam até o final?',
            '5. Isso é compartilhável?'
          ] },
          { type: 'steps', title: '📈 Plano para Seguidores Rápido', items: [
            '1. Nicho Ultra-Claro: O algoritmo precisa saber exatamente QUEM é seu público.',
            '2. Alta Frequência: No início, poste de 2 a 5 vídeos por dia para acelerar o aprendizado.',
            '3. Vídeos Curtos (10s-20s): Aumentam a chance de replay e conclusão.',
            '4. Crie Séries: "Erros do TikTok #5" ou "Parte 1, Parte 2". Isso obriga o follow.',
            '5. Peça Interação: "Qual parte você quer?" ou "Comenta sua dúvida".'
          ] },
          { type: 'tips', title: 'O Maior Segredo', items: [
            'A maioria posta aleatoriamente. Grandes criadores estudam o comportamento humano e os dados.'
          ] }
        ]
      },
      {
        id: 'tiktok_strategies_faceless',
        title: 'Crescimento e Contas "Sem Rosto"',
        content: [
          'Você não precisa aparecer para ficar gigante no TikTok. O que importa é o Valor + Retenção.',
          { type: 'info', title: '🎭 Formatos que Mais Viralizam', items: [
            '• Curiosidades: Imagens impactantes + narração forte.',
            '• Motivação: Cenas de filmes/estética luxury + frases poderosas.',
            '• Histórias: Narrativas envolventes com imagens/vídeos de estoque ou IA.',
            '• Top 5: Listas "viciantes" de lugares, produtos ou fatos estranhos.',
            '• Dicas e Erros: Tutoriais rápidos focados em dor (ex: nicho de renda extra).',
            '• Gameplay + Storytelling: Narrativas sobrepostas a vídeos de jogos.'
          ] },
          { type: 'steps', title: '📈 Pilares do Canal Sem Rosto', items: [
            '1. NARRAÇÃO FORTE: Sua voz deve ter energia, emoção e ritmo.',
            '2. GANCHO IMPECÁVEL: Como você não tem o rosto para magnetizar, o gancho verbal é tudo.',
            '3. EDIÇÃO DINÂMICA: Use movimento constante (zooms, trocas de cena) para evitar o tédio.',
            '4. LEGENDAS OBRIGATÓRIAS: Elas mantêm o foco e ajudam na compreensão em ambientes barulhentos.',
            '5. STORYTELLING: Crie uma jornada no vídeo, mesmo que seja de apenas 20 segundos.'
          ] },
          { type: 'tips', title: 'Atenção ao Valor', items: [
            'As pessoas não seguem apenas rostos. Elas seguem emoção, valor, entretenimento e personalidade (mesmo que seja só na voz).'
          ] }
        ]
      },
      {
        id: 'tiktok_editing_secrets',
        title: 'Segredos da Edição Viral',
        content: [
          'A edição deve servir para prender a atenção e eliminar o tédio. TikTok é velocidade e estímulo constante.',
          { type: 'list', title: '⚡ Princípios da Edição Viral', items: [
            '• CORTES RÁPIDOS: Remova cada milissegundo de silêncio e pausas inúteis.',
            '• MOVIMENTO CONSTANTE: O cérebro ignora o que está estático. Use zooms e troca de cena.',
            '• LEGENDAS ANIMADAS: Aumentam a retenção e mantêm o espectador focado no conteúdo.',
            '• MÚSICA E EFEITOS (SFX): Crie emoção e energia. Sons em transições aumentam o impacto.',
            '• MUDANÇA DE ESTÍMULO: A cada 3 segundos, mude a escala do zoom ou adicione um elemento novo.'
          ] },
          { type: 'info', title: '🎯 Ferramentas Recomendas', items: [
            'CapCut: A mais poderosa e intuitiva para criadores de vídeos curtos.',
            'Canva: Excelente para criar capas e elementos gráficos para os vídeos.'
          ] },
          { type: 'tips', title: 'Regra de Ouro do Editor', items: [
            'Pergunte-se: "Existe algum momento chato no vídeo?". Se a resposta for sim, corte sem dó. Vídeos lentos morrem rapidamente.'
          ] }
        ]
      },
      {
        id: 'tiktok_monetization_full',
        title: 'Guia de Monetização 2026',
        content: [
          'Views sozinhas não pagam as contas. Use o TikTok como um ímã de atenção para atrair audiência para o seu próprio negócio.',
          { type: 'info', title: '💰 As 7 Principais Formas de Ganhar Dinheiro', items: [
            '1. MONETIZAÇÃO OFICIAL: Programa de Criadores (ganhe por views em vídeos +1 min).',
            '2. AFILIADOS: Venda produtos de terceiros e ganhe comissão por cada venda.',
            '3. VENDER SERVIÇOS: Ofereça Edição de Vídeo, Gestão de Redes ou Copywriting.',
            '4. PRODUTOS DIGITAIS: Crie e venda seus próprios Ebooks, Mentorias ou Cursos.',
            '5. LIVES: Receba presentes (gifts) da sua audiência em tempo real.',
            '6. PARCERIAS: Marcas pagam pela sua influência e pelo seu nicho específico.',
            '7. CONSTRUÇÃO DE MARCA: Use a rede para crescer seu nome e criar um negócio sólido.'
          ] },
          { type: 'tips', title: 'Dica Estratégica', items: [
            'O TikTok é o topo do seu funil. Atraia a atenção e direcione para uma oferta clara (Link na bio, WhatsApp ou E-commerce).'
          ] }
        ]
      },
      {
        id: 'tiktok_viral_formats_niches',
        title: 'Formatos Virais por Nicho',
        content: [
          'O segredo é unir conteúdo viral com estratégia de dinheiro em nichos de alta demanda.',
          { type: 'info', title: '💡 Nicho de Dicas', items: [
            'Formato: "3 dicas para...". Rápido, organizado e fácil de salvar.',
            'Gancho: "Se você quer ganhar dinheiro, veja isso."',
            'Exemplos: "3 dicas para economizar", "3 dicas para vender online".'
          ] },
          { type: 'info', title: '⚠️ Nicho de Erros', items: [
            'O medo prende a atenção. O cérebro foca em perigo e perda.',
            'Exemplos: "3 erros que te deixam pobre", "Erro que destrói seu alcance no TikTok".',
            'Chamada: "Pare de fazer isso imediatamente."'
          ] },
          { type: 'info', title: '🔥 Nicho de Renda Extra', items: [
            'Um dos nichos mais fortes para monetização direta e afiliado.',
            'Exemplos: "3 formas de ganhar dinheiro com celular", "Como comecei sem investimento".',
            'Importante: Nunca faça promessas falsas; a confiança é seu maior ativo.'
          ] },
          { type: 'info', title: '💪 Nicho de Motivação', items: [
            'Funciona quando emociona, inspira ou cria identificação.',
            'Estética "Luxury" ou "Dark" costuma viralizar muito aqui.',
            'Exemplo: "Ninguém acreditava nele... hoje ele venceu."'
          ] }
        ]
      },
      {
        id: 'tiktok_digital_services',
        title: 'Ser uma Agência/Prestador',
        content: [
          'Você não precisa de um produto próprio para começar a lucrar com o TikTok.',
          { type: 'list', title: '💰 Serviços em Alta Demanda', items: [
            '• Edição de Vídeo: Especialista em retenção (Shorts/Reels).',
            '• Gestão de TikTok: Cuidar de contas para empresas/profissionais.',
            '• Criação de Posts/Designs: Capas, logos e thumbnails.',
            '• Narração: Locução para canais "sem rosto" (Faceless).'
          ] },
          { type: 'tips', title: 'Como conseguir clientes', items: [
            'Faça vídeos mostrando sua habilidade ("Antes e Depois da minha edição"). Isso atrai clientes organicamente.'
          ] }
        ]
      },
      {
        id: 'tiktok_copy_structures',
        title: 'Como Copiar Estruturas Virais',
        content: [
          'Grandes criadores NÃO copiam vídeos exatamente iguais. Eles estudam padrões e recriam a estrutura psicológica.',
          { type: 'info', title: '🧠 O que é uma Estrutura Viral?', items: [
            'Não é o assunto, é a forma: Sequência psicológica, ritmo, emoção e retenção.',
            'Exemplo: Se um vídeo de "Erro que destrói seu TikTok" viralizou, você adapta para "Erro que destrói suas vendas". Mesma estrutura, tema diferente.'
          ] },
          { type: 'steps', title: '🔍 Como Analisar um Vídeo Viral', items: [
            '1. ANALISE O GANCHO: Por que isso me prendeu nos primeiros segundos?',
            '2. ANALISE O RITMO: É rápido? Tem zooms? Cortes de silêncio?',
            '3. ANALISE A EMOÇÃO: Qual emoção domina? Medo, humor, surpresa ou inspiração?',
            '4. ANALISE O FINAL: Como ele induz ao replay ou ao comentário?'
          ] },
          { type: 'steps', title: '🚀 Como Recriar sem Copiar', items: [
            'Passo 1: Pegue a estrutura (ex: Gancho forte → Tensão → Solução).',
            'Passo 2: Troque o assunto para o seu nicho.',
            'Passo 3: Adicione sua personalidade e melhore o ritmo.',
            '⚠️ O erro do iniciante é copiar as falas; o certo é copiar os princípios.'
          ] }
        ]
      },
      {
        id: 'tiktok_trends',
        title: 'Dominando as Tendências',
        content: [
          'Tendência é algo que recebe muita atenção rapidamente. O segredo é entrar cedo e adaptar ao seu nicho.',
          { type: 'list', title: '🎵 Tipos de Tendência', items: [
            '• ÁUDIO: Músicas ou áudios virais.',
            '• FORMATO: Jeitos específicos de gravar ou contar histórias.',
            '• MEME: Humor coletivo adaptável.',
            '• EDIÇÃO: Novos efeitos visuais ou transições.'
          ] },
          { type: 'steps', title: '⏱️ O Ciclo da Tendência', items: [
            'Fase 1: Início (Poucos usam - Melhor momento para entrar).',
            'Fase 2: Explosão (Todo mundo vê).',
            'Fase 3: Saturação (Pessoas cansam e começam a deslizar rápido).'
          ] },
          { type: 'tips', title: 'Regra de Ouro da Trend', items: [
            'Misture a Tendência + Sua Identidade. Não copie igual, adapte para o seu nicho (ex: use um som viral para dar dicas de renda extra).'
          ] }
        ]
      },
      {
        id: 'tiktok_study_plan_2months',
        title: 'Plano de Estudo: 2 Meses',
        content: [
          'TikTok é prática, análise e ajuste constante. Domine a rede com este roteiro intensivo.',
          { type: 'steps', title: '📅 Mês 1: Fundamentos e Testes', items: [
            'Semana 1: Aprenda o Algoritmo. Estude retenção, watch time e analise 20 vídeos virais por dia.',
            'Semana 2: Domine os Ganchos. Treine 10 ganchos diferentes por dia (medo, curiosidade, choque).',
            'Semana 3: Melhore a Retenção. Use o CapCut para cortes rápidos, zooms e legendas dinâmicas.',
            'Semana 4: Padrões de Viralização. Estude o ritmo e as emoções que mais engajam seu público.'
          ] },
          { type: 'steps', title: '📅 Mês 2: Escala e Monetização', items: [
            'Semana 5: Identidade Própria. Defina um nicho ultra-claro, um estilo de edição e voz única.',
            'Semana 6: Alta Frequência. Teste postar de 3 a 5 vídeos por dia para acelerar o aprendizado.',
            'Semana 7: Estratégias de Venda. Escolha um produto de afiliado ou serviço e crie CTAs inteligentes.',
            'Semana 8: Otimização Profissional. Analise o Analytics, melhore seu storytelling e copy final.'
          ] },
          { type: 'info', title: '🚀 Rotina Diária de Sucesso', items: [
            '1. Estudar e Analisar (30-60 min): O que está viralizando e por quê?',
            '2. Escrita de Ganchos: Treino diário para impedir o scroll.',
            '3. Gravação e Edição: Sem busca por perfeição, foque na entrega de valor e estímulo visual.',
            '4. Postagem e Análise: Veja onde as pessoas saíram e ajuste o próximo vídeo.'
          ] },
          { type: 'tips', title: '💡 Mentalidade de Ouro', items: [
            'O TikTok não recompensa apenas qualidade visual, recompensa ATENÇÃO e EMOÇÃO. Quem entende o comportamento humano cresce mais rápido.'
          ] }
        ]
      },
      {
        id: 'tiktok_social_media_career',
        title: 'Carreira: Social Media & Criador',
        content: [
          'Social Media é quem cria conteúdo, planeja estratégias e gerencia o crescimento de marcas e pessoas nas redes sociais.',
          { type: 'info', title: '🛠️ O que um Social Media faz?', items: [
            'Cria e edita vídeos curtos (Reels/TikToks).',
            'Analisa métricas (views, retenção, alcance).',
            'Planeja calendários de postagem.',
            'Cresce contas usando estratégias de algoritmo.'
          ] },
          { type: 'steps', title: '🚀 Como começar do zero', items: [
            '1. Aprenda a Base: Estude ganchos, retenção e edição básica (CapCut).',
            '2. Crie seu Portfólio: Sua própria conta no TikTok é seu cartão de visitas.',
            '3. Escolha um Nicho: Dicas, Motivação, Renda Extra ou Curiosidades.',
            '4. Mostre Resultados: "Fiz esse vídeo pegar 20k views". Isso atrai clientes.'
          ] },
          { type: 'tips', title: 'Dica para Criadores', items: [
            'Não espere a perfeição. O maior erro é demorar para postar enquanto tenta fazer o vídeo "perfeito". Você melhora na prática.'
          ] }
        ]
      },
      {
        id: 'tiktok_account_technical_setup',
        title: 'Configuração Técnica da Conta',
        content: [
          'Para crescer profissionalmente, sua conta precisa estar configurada corretamente para o algoritmo.',
          { type: 'steps', title: '⚙️ Mudando para Conta Profissional', items: [
            '1. Clique nas 3 linhas no canto superior do perfil.',
            '2. Vá em "Configurações e Privacidade" → "Conta".',
            '3. Selecione "Mudar para conta de Criador" ou "Empresa".',
            'Vantagem: Libera o Analytics e ferramentas avançadas de monetização.'
          ] },
          { type: 'info', title: '👤 Perfil que Converte', items: [
            'Nome de Usuário: Curto, fácil e memorável (Ex: @DicasDoJoao).',
            'Bio Clara: O que você faz + Para quem você faz + CTA (Ex: "Te ensino marketing | Rumo aos 100k").',
            'Foto: Seu rosto bem iluminado ou um logo profissional.'
          ] }
        ]
      },
      {
        id: 'tiktok_fast_start_7days',
        title: 'Plano: 7 Dias para Começar',
        content: [
          'Se você quer resultados rápidos, siga este roteiro intensivo de 7 dias.',
          { type: 'steps', title: '📅 Roteiro Semanal', items: [
            'Dia 1: Criar conta e definir Bio/Nicho.',
            'Dia 2: Configurar perfil profissional e Analytics.',
            'Dia 3: Postar primeiro vídeo (Dica rápida ou Gancho de Curiosidade).',
            'Dia 4: Estudar 20 vídeos virais do seu nicho e anotar os ganchos.',
            'Dia 5: Aprender uma técnica nova de edição (Zoom ou Legendas dinâmicas).',
            'Dia 6: Postar 2 vídeos focando em alta retenção.',
            'Dia 7: Analisar métricas e planejar a próxima semana.'
          ] },
          { type: 'tips', title: 'Meta Inicial', items: [
            'Postar diariamente, aprender o que segura a atenção e não desistir nos primeiros 30 dias.'
          ] }
        ]
      },
      {
        id: 'tiktok_shop',
        title: 'TikTok Shop: O Guia Completo',
        content: [
          'O TikTok Shop é o sistema de vendas nativo que permite comprar e vender sem sair do aplicativo, transformando entretenimento em faturamento imediato.',
          { type: 'info', title: '🛍️ O que é o TikTok Shop?', items: [
            'Permite vender e divulgar produtos diretamente nos vídeos e lives.',
            'Botão de compra, preço e link aparecem direto na tela.',
            'Ideal para compras por impulso (Demonstração → Emoção → Desejo → Compra).'
          ] },
          { type: 'list', title: '👤 Quem pode usar?', items: [
            '• Vendedores: Empresas que criam a loja e gerenciam o estoque.',
            '• Afiliados (Criadores): Divulguam produtos de terceiros e ganham comissão por cada venda realizada.'
          ] },
          { type: 'tips', title: 'Dica Estratégica', items: [
            'Produtos virais (gadgets, beleza, organização) vendem muito mais rápido. O segredo é criar desejo + prender a atenção com ganchos fortes.',
            'Consulte as regras oficiais no "TikTok Shop Academy" para saber as exigências do seu país.'
          ] }
        ]
      },
      {
        id: 'tiktok_shop_onboarding',
        title: 'Passo a Passo: Entrar no TikTok Shop',
        content: [
          'Existem duas formas principais de entrar: Como Criador/Afiliado ou como Vendedor (Loja própria).',
          { type: 'steps', title: '🛠️ Cadastro como Criador (Afiliado)', items: [
            '1. Mudança de Conta: Vá em Perfil → Menu (3 linhas) → Configurações → Conta → Mudar para conta Profissional/Criador.',
            '2. Escolha a Categoria: Selecione o nicho que você vai atuar (ex: Educação, Entretenimento, Negócios).',
            '3. Seller Center: Acesse o TikTok Shop Seller Center oficial para iniciar o processo de afiliação.',
            '4. Verificação: Envie documentos de identidade e dados bancários para receber as comissões.',
            '5. Aprovação: Aguarde a análise da conta pelo TikTok.'
          ] },
          { type: 'steps', title: '🏭 Cadastro como Vendedor (Loja Própria)', items: [
            '1. Registro: Cadastre-se no TikTok Shop Seller Center como "Business" ou "Individual".',
            '2. Dados Fiscais: Insira os dados da sua empresa ou CPF, dependendo da legislação local.',
            '3. Configuração da Loja: Adicione fotos, descrições e preços dos seus produtos.',
            '4. Logística: Configure as opções de envio e prazos de entrega.'
          ] },
          { type: 'tips', title: 'Checklist de Aprovação', items: [
            'Mantenha sua conta saudável, sem avisos de violação.',
            'Certifique-se de que o TikTok Shop já está liberado na sua região/país.'
          ] }
        ]
      },
      {
        id: 'tiktok_shop_strategy',
        title: 'Estratégia: O que mais vende?',
        content: [
          'O TikTok Shop não é apenas uma loja; é uma máquina de desejo baseada em retenção e demonstração visual. O segredo é criar uma conexão emocional rápida.',
          { type: 'info', title: '🧠 Psicologia da Venda no Shop', items: [
            '1. CURIOSIDADE: "O que é isso?" - O vídeo deve instigar o clique.',
            '2. SURPRESA: "Isso funciona mesmo?" - Quebra de padrão no uso do item.',
            '3. TRANSFORMAÇÃO: Antes e depois claro e satisfatório.',
            '4. IDENTIFICAÇÃO: "Eu preciso disso para resolver meu problema".'
          ] },
          { type: 'steps', title: '🎬 Estrutura de Vídeo que Vende', items: [
            'GANCHO (0-2s): "Eu não acreditava nisso..." ou "Como ninguém fala disso?". Pare o scroll!',
            'DEMONSTRAÇÃO: Mostre o produto funcionando IMEDIATAMENTE. O cérebro quer ver a solução.',
            'BENEFÍCIO/DOR: Mostre como o item resolve um problema real de forma simples.',
            'CTA: "Produto disponível no link da bio ou carrinho aqui no vídeo".'
          ] },
          { type: 'tips', title: 'O Maior Segredo', items: [
            'NÃO pareça uma propaganda tradicional. Vídeos naturais, rápidos e espontâneos geram muito mais confiança e retenção do que anúncios "limpos" demais.'
          ] }
        ]
      },
      {
        id: 'tiktok_shop_growth_manual',
        title: 'Manual de Crescimento: 20 Dicas de Elite',
        content: [
          'Crescer no Shop exige entender que o algoritmo agora busca a tríade: Retenção + Desejo + Conversão.',
          { type: 'list', title: '🚀 Pilares de Alta Performance', items: [
            '1. Escolha Produtos "Virais": Itens curiosos, úteis ou visualmente satisfatórios.',
            '2. Ganchos de 2 Segundos: Se o gancho falhar, o vídeo morre sem ser entregue.',
            '3. Velocidade é Tudo: Vídeos curtos (10s-30s) aumentam drasticamente a chance de replay.',
            '4. Tendências Adaptadas: Use áudios do momento mas foque na demonstração do seu produto.',
            '5. Edição Dinâmica: Use o CapCut para cortes rápidos e zooms constantes.',
            '6. Volume de Postagem: No início, poste de 2 a 5 vídeos por dia para testar o que "pega".',
            '7. Storytelling de Venda: Crie uma jornada de "Problema → Tensão → Resolução".',
            '8. Construção de Confiança: Fuja de promessas falsas. Conteúdo real converte melhor.',
            '9. Lives de Venda: As lives geram urgência e mostram o produto ao vivo, aumentando a conversão.',
            '10. Nicho Especializado: Ajude o algoritmo a entender que seu perfil é autoridade em um tema (ex: Cozinha ou Gadgets).',
            '11. Copywriting Persuasivo: Use frases como "Eu queria ter conhecido isso antes".',
            '12. Análise de Métricas: Foque no tempo assistido e na taxa de conclusão.',
            '13. Mudança de Estímulo: A cada 3 segundos mude algo visual ou sonoro no vídeo.',
            '14. CTA Contextual: Chame para a ação no momento de maior desejo do vídeo.',
            '15. Estudo de Concorrência: Analise diariamente os vídeos que estão vendendo muito e mapeie seus ganchos.',
            '16. Uso de Emoções: Pessoas compram felicidade, praticidade ou alívio de dor.',
            '17. Recompensa Mental: O vídeo deve ser prazeroso de assistir mesmo que o usuário não compre.',
            '18. Resolução de Objeções: Mostre o produto resolvendo dúvidas comuns no próprio vídeo.',
            '19. Consistência Profissional: O crescimento vem da repetição e do ajuste fino baseado em dados.',
            '20. Mentalidade Shop: Entenda que você está gerindo entretenimento + vendas. Domine a atenção e o dinheiro virá.'
          ] },
          { type: 'tips', title: '💡 Reflexão Final', items: [
            'O TikTok recompensa a atenção humana. Se o seu vídeo for chato, o produto não vende. Se for viciante e útil, você escala infinitamente.'
          ] }
        ]
      }
    ]
  },
  {
    id: 'meta',
    title: 'Meta (Instagram/FB)',
    description: 'Estratégias para Reels, Facebook Ads e Monetização Profissional.',
    subsections: [
      {
        id: 'meta_monetization',
        title: 'Formas de Ganhar Dinheiro',
        content: [
          { type: 'info', title: '1. Criação de Conteúdo', items: ['Você ganha dinheiro criando conteúdo: Reels e vídeos no Facebook/Instagram.', 'Programas de bônus (quando disponíveis).', '“Stars” (presentes dos seguidores no Facebook).', 'Publicidade em vídeos (em contas elegíveis).', '👉 Funciona melhor para criadores consistentes.'] },
          { type: 'info', title: '2. Parcerias com Marcas', items: ['Você é pago para divulgar produtos (Influenciador).', 'Posts patrocinados e Reels pagos.', 'Parcerias contínuas com marcas.', '👉 Mesmo com poucos seguidores, já pode começar (microinfluência).'] },
          { type: 'info', title: '3. Vendas Online (E-commerce)', items: ['Você usa a Meta para vender produtos: Loja online, produtos físicos ou digitais.', 'Dropshipping e serviços locais.', '👉 Aqui está o dinheiro mais estável.'] },
          { type: 'info', title: '4. Facebook Ads (Tráfego Pago)', items: ['Você usa anúncios para vender mais rápido.', 'Venda de produtos e geração de clientes (mensagens/WhatsApp).', 'Escalar negócios.', '👉 É o método mais usado por quem já fatura.'] },
          { type: 'info', title: '5. Marketing de Afiliados', items: ['Você vende produtos de outras pessoas e ganha comissão (Hotmart, Amazon, etc).', 'Links na bio ou anúncios.', 'Conteúdo explicando o produto.', '👉 Não precisa ter produto próprio.'] },
          { type: 'info', title: '6. Atendimento e Geração de Leads', items: ['Você usa a Meta para gerar clientes via WhatsApp/Messenger.', 'Anúncios para mensagens e captura de contatos.', 'Venda direta por conversa.', '👉 Muito forte para negócios locais.'] },
          { type: 'info', title: '7. Gestão de Redes Sociais', items: ['Você ganha dinheiro ajudando outras pessoas: Criar conteúdo e gerenciar páginas.', 'Rodar anúncios para terceiros.', '👉 Bom para começar sem produto próprio.'] },
          { type: 'info', title: '8. Crescer e Monetizar (Longo Prazo)', items: ['Cresce página com Reels.', 'Monetiza com ads, afiliados ou produtos próprios futuramente.'] },
          { type: 'tips', title: '⚠️ O que mais dá dinheiro de verdade', items: ['🥇 Vendas online + anúncios', '🥈 Afiliados bem feitos', '🥉 Influência + parcerias'] }
        ]
      },
      {
        id: 'meta_strategy',
        title: 'Estratégia para Começar',
        content: [
          { type: 'steps', title: 'Resumo Simples', items: [
            '1. Conteúdo: Reels, vídeos e Stars focado em audiência.',
            '2. Vendas: Escolha um produto, serviço ou seja afiliado.',
            '3. Anúncios: Use o Facebook Ads para escalar o que já funciona.'
          ]}
        ]
      },
      {
        id: 'ads',
        title: 'Facebook Ads Básico',
        content: [
          { type: 'info', title: 'Use o Gerenciador de Anúncios', items: ['Pare de impulsionar botões simples', 'Use o Ads Manager para controle total de segmentação e testes'] },
          { type: 'steps', title: 'Estrutura Profissional', items: ['Campanha: Objetivo (vendas, mensagens)', 'Conjunto: Público + Orçamento', 'Anúncio: Vídeo/Imagem + Texto'] },
          { type: 'tips', items: ['Remarketing é onde está o dinheiro. Mostre anúncios para quem já interagiu com você.'] }
        ]
      },
      {
        id: 'meta_platforms_deep_dive',
        title: '🧠 A Meta e o Ecossistema',
        content: [
          'A Meta Platforms é um império de atenção desenhado para manter o usuário o máximo de tempo possível dentro de seus aplicativos.',
          { type: 'info', title: '📍 Plataformas e Objetivos', items: [
            'O ecossistema inclui Instagram, Facebook, WhatsApp e Threads.',
            'O objetivo central é a Retenção: quanto mais tempo você passa no app, mais dados são gerados e mais anúncios são exibidos.'
          ] },
          { type: 'info', title: '⚙️ O que é Viralizar na Meta?', items: [
            'Viralizar é atingir uma massa crítica de pessoas organicamente (sem pagar anúncios).',
            'Isso acontece quando o algoritmo detecta padrões matemáticos de interesse e decide amplificar o alcance para novos usuários.'
          ] }
        ]
      },
      {
        id: 'meta_algorithm_anatomy',
        title: '🤖 Anatomia do Algoritmo',
        content: [
          'O algoritmo não "pensa", ele processa sinais de comportamento humano para prever o que o usuário quer ver em seguida.',
          { type: 'list', title: '📊 Os 4 Sinais de Ouro', items: [
            '1. Retenção: As pessoas estão parando no conteúdo? (Interrupção de Scroll).',
            '2. Interação: Curtir, comentar e salvar são sinais de valor.',
            '3. COMPARTILHAMENTO: O sinal mais forte. Significa: "Isso é bom o suficiente para eu recomendar".',
            '4. Tempo de Exibição: Assistir até o fim (ou repetir) é o veredito final de qualidade.'
          ] },
          { type: 'info', title: '🧪 O Teste de Viralização', items: [
            'Todo post passa por um teste inicial com um grupo pequeno. Se a reação for positiva (alta retenção e shares), o algoritmo expande em ondas progressivas.'
          ] },
          { type: 'tips', title: '💡 Relevância Pessoal', items: [
            'O feed é uma bolha personalizada. A Meta aprende o que você ignora tanto quanto aprende o que você gosta.'
          ] }
        ]
      },
      {
        id: 'meta_viral_psychology',
        title: '🔥 Psicologia do Viral',
        content: [
          'Conteúdos que explodem na Meta possuem gatilhos psicológicos universais.',
          { type: 'info', title: '🧠 Gatilhos Emocionais', items: [
            'Surpresa, Choque, Curiosidade extrema, Humor e Indignação são os motores da viralização rápida.'
          ] },
          { type: 'list', title: '🎬 Formatos de Alto Impacto', items: [
            '• Reels: O motor principal de descoberta e alcance orgânico hoje.',
            '• Humor do Dia a Dia: Situações identificáveis que geram compartilhamentos por empatia.',
            '• Curiosidades e Fatos: "Você sabia?" que interrompem o tédio.',
            '• Histórias de Transformação: Narrativas emocionais de superação ou drama real.',
            '• Polêmicas Leves: Debates que convidam o usuário a deixar sua opinião no comentário.'
          ] },
          { type: 'tips', title: '🎯 Regras de Ouro', items: [
            'Clareza Imediata: Se o usuário não entender o que está acontecendo em 1.5 segundos, ele desliza.',
            'Simplicidade: Conteúdos complexos demais raramente viralizam para o grande público.'
          ] }
        ]
      },
      {
        id: 'meta_2_month_study_plan',
        title: '📅 Estudo: Meta & Viralidade (60 Dias)',
        content: [
          'Um plano intensivo para dominar a lógica de distribuição das redes da Meta.',
          { type: 'steps', title: 'Mês 1: Entendendo o Sistema', items: [
            'Semana 1: Base da Meta e o Ecossistema (Insta, FB, Threads).',
            'Semana 2: Prática do Algoritmo (Retenção e Distribuição).',
            'Semana 3: Psicologia do Usuário e Gatilhos de Atenção.',
            'Semana 4: Análise de Padrões: Estudando posts que já viralizaram.'
          ] },
          { type: 'steps', title: 'Mês 2: Estratégia e Criação', items: [
            'Semana 5: Dominando Formatos (Reels, Carrossel, Stories).',
            'Semana 6: Implementação de Gatilhos (Choque, Curiosidade, Emoção).',
            'Semana 7: Storytelling e Copywriting para Prender a Atenção.',
            'Semana 8: Planejamento, Teste e Ajuste baseado em Dados.'
          ] }
        ]
      },
      {
        id: 'meta_core_philosophy_wrap',
        title: '💡 A Filosofia Final',
        content: [
          'O algoritmo não escolhe o "melhor" conteúdo técnico, ele escolhe o que gera a maior reação humana.',
          { type: 'info', title: '🚀 O que isso significa na prática?', items: [
            'Não é sobre ser perfeito; é sobre ser interessante rapidamente.',
            'Priorize a Emoção sobre a Produção e a Retenção sobre a Estética.',
            'O sucesso na Meta vem da união entre Dados (o que o algoritmo quer) e Coração (o que as pessoas sentem).'
          ] }
        ]
      },
      {
        id: 'meta_growth_roadmap_zero',
        title: '📈 Crescer na Meta (Do Zero)',
        content: [
          'A Meta não cresce perfis; ela cresce conteúdos específicos que retêm a atenção.',
          { type: 'steps', title: '🚀 O Plano de Decolagem', items: [
            '1. TEMA FIXO: Escolha um nicho (Curiosidades, Motivação, Memes, Tech) para o algoritmo entender seu público.',
            '2. CONSISTÊNCIA: 1 a 2 posts por dia, mantendo o mesmo estilo visual e editorial.',
            '3. FORMATO ATUAL: Reels curtos (5-20s) com texto na tela e cortes dinâmicos.',
            '4. REGRA DOS 3 SEGUNDOS: Se o "hook" falhar nos primeiros 3 segundos, o vídeo morre.'
          ] },
          { type: 'tips', title: '🧠 O Segredo do Alcance', items: [
            'Não importa quem você é, importa o que você posta. O algoritmo é meritocrático por conteúdo.'
          ] }
        ]
      },
      {
        id: 'meta_ready_viral_ideas',
        title: '💡 Ideias Virais Prontas',
        content: [
          'Use estes ganchos e estruturas que já provaram ter alta taxa de compartilhamento na Meta.',
          { type: 'list', title: '🔥 Categoria: Curiosidade e Fatos', items: [
            '• "Você sabia que seu cérebro te engana todos os dias?"',
            '• "Isso parece mentira, mas é 100% real."',
            '• "3 coisas que você faz errado todos os dias sem saber."'
          ] },
          { type: 'list', title: '😂 Categoria: Humor e Relacional', items: [
            '• "Quando você promete ser produtivo e abre o Instagram."',
            '• "Expectativa vs Realidade da vida adulta."',
            '• "Eu tentando focar por 5 minutos."'
          ] },
          { type: 'list', title: '❤️ Categoria: Histórias e Gancho', items: [
            '• "Ele começou do zero e mudou de vida assim..."',
            '• "Ninguém fala sobre isso, mas é o segredo do sucesso."',
            '• "Isso vai mudar sua forma de pensar sobre X."'
          ] }
        ]
      },
      {
        id: 'meta_viral_simulation_real',
        title: '🎬 Simulação: O Post Viral',
        content: [
          'Veja como a estrutura de um post de milhões de visualizações é construída na prática.',
          { type: 'steps', title: 'Estrutura: "O Controle do Algoritmo"', items: [
            '1. HOOK (0-2s): Texto na tela: "Você não controla o Instagram... ele controla você."',
            '2. EXPLICAÇÃO (3-10s): "Cada vídeo foi escolhido para te manter aqui o máximo de tempo possível."',
            '3. VIRADA (10-15s): "O algoritmo aprende o que te prende e te entrega mais sem você notar."',
            '4. FINAL (Retenção): "Por isso você não consegue parar de rolar o feed."'
          ] },
          { type: 'info', title: '📊 Por que isso viraliza?', items: [
            'Gera curiosidade e um desconforto leve, forçando a pessoa a assistir até o fim e compartilhar para "alertar" outros.'
          ] }
        ]
      },
      {
        id: 'meta_8_week_execution_plan',
        title: '🚀 Plano de 8 Semanas',
        content: [
          'Um cronograma prático para quem quer resultados reais de crescimento na Meta.',
          { type: 'steps', title: 'Semanas 1-2: Teste de Campo', items: [
            'Poste 1 vídeo por dia e teste 5 ganchos diferentes para ver qual segura mais atenção.'
          ] },
          { type: 'steps', title: 'Semanas 3-4: Refinamento', items: [
            'Repita apenas o que funcionou. Melhore os primeiros 3 segundos e use textos mais impactantes.'
          ] },
          { type: 'steps', title: 'Semanas 5-8: Escala', items: [
            'Crie séries de vídeos (Parte 1, 2, 3) e foque em narrativas mais emocionais para gerar shares.'
          ] },
          { type: 'tips', title: '🏆 O Veredito', items: [
            'Na Meta, não ganha quem posta o vídeo mais "bonito", ganha quem prende a atenção primeiro.'
          ] }
        ]
      },
      {
        id: 'meta_advanced_growth_system',
        title: '🧭 Sistema: Crescimento Avançado',
        content: [
          'Domine as regras invisíveis que separam os amadores dos profissionais na Meta Platforms.',
          { type: 'info', title: '🧠 Regra 1: Desempenho > Identidade', items: [
            'O algoritmo não promove pessoas; ele promove o desempenho individual de cada vídeo.',
            'Métricas vitais: Retenção (tempo assistido), Replays, Compartilhamentos e Salvamentos.',
            '👉 Um vídeo novo pode viralizar em uma conta zerada se as métricas de reação forem altas.'
          ] },
          { type: 'info', title: '🌊 Regra 2: O Crescimento em Ondas', items: [
            'O crescimento não é linear. Ele acontece em fases:',
            '• 0-10 vídeos: Fase de teste e coleta de dados.',
            '• 10-30 vídeos: Primeiros sinais de tração do algoritmo.',
            '• 30-60 vídeos: Viralizações isoladas começam a acontecer.',
            '• 60+ vídeos: Consistência de viralização por autoridade de nicho.'
          ] },
          { type: 'tips', title: '🚀 A Regra de Ouro', items: [
            'Um único vídeo viral vale mais que 50 vídeos normais. Ele serve para testar o algoritmo, atrair seguidores reais e definir seu nicho permanentemente.'
          ] }
        ]
      },
      {
        id: 'meta_30_day_advanced_plan',
        title: '📅 Plano Profissional (30 Dias)',
        content: [
          'Um cronograma agressivo para forçar o algoritmo da Meta a entender e recomendar seu perfil.',
          { type: 'steps', title: 'Instruções Gerais', items: [
            'Mínimo de 1 vídeo por dia (Reels).',
            'Duração ideal: 7 a 20 segundos.',
            'Foco absoluto nos primeiros 2 segundos (Hook).'
          ] },
          { type: 'steps', title: 'Semana 1: Teste de Formatos', items: [
            'Dia 1: Curiosidade | Dia 2: Meme simples | Dia 3: Frase impactante | Dia 4: História curta | Dia 5: Dica rápida | Dia 6: Opinião forte | Dia 7: Repetir o melhor da semana.'
          ] },
          { type: 'steps', title: 'Semana 2: Duplicar o Vencedor', items: [
            'Repita o melhor estilo da semana 1 mudando apenas o tema. Refine ao máximo o gancho visual inicial.'
          ] },
          { type: 'steps', title: 'Semana 3: Otimização Emocional', items: [
            'Use storytelling mais agressivo. Ganchos como "Você está sendo manipulado" ou "Isso muda tudo o que você pensa".'
          ] },
          { type: 'steps', title: 'Semana 4: Escala e Engajamento', items: [
            'Transforme vídeos em séries (Parte 1, 2, 3). No final, incentive o comentário com perguntas diretas sobre a dor do público.'
          ] }
        ]
      },
      {
        id: 'meta_viral_video_formulas_advanced',
        title: '🎬 Fórmulas de Vídeo Viral',
        content: [
          'Estruturas psicológicas que forçam a retenção e o engajamento na Meta.',
          { type: 'steps', title: '⚡ Fórmula 1: Choque + Explicação', items: [
            'Hook: "Você está fazendo isso errado todos os dias" → Explicação: "Isso acontece porque seu cérebro..." → Final: "Agora nada será igual".'
          ] },
          { type: 'steps', title: '⚡ Fórmula 2: Segredo Revelado', items: [
            'Hook: "Ninguém te conta isso..." → Meio: "Mas o algoritmo funciona assim..." → Final: "Por isso você se vicia no feed".'
          ] },
          { type: 'steps', title: '⚡ Fórmula 2: Erro Comum', items: [
            'Hook: "Isso está destruindo seu resultado" → Meio: "Todo mundo faz isso no Instagram..." → Final: "E por isso não cresce".'
          ] },
          { type: 'steps', title: '⚡ Fórmula 4: História de Transformação', items: [
            'Hook: "Ele começou do zero..." → Meio: "Postou por 30 dias sem parar..." → Final: "Hoje ele vive dessa estratégia".'
          ] },
          { type: 'steps', title: '⚡ Fórmula 5: Curto e Direto (Impacto)', items: [
            'Frase forte na tela → Explicação de 1 linha → Impacto final. Ex: "Você não está sem sorte. Está sem estratégia."'
          ] }
        ]
      },
      {
        id: 'meta_professional_analysis_metrics',
        title: '📊 Análise Profissional de Dados',
        content: [
          'Pare de olhar apenas para as curtidas e comece a analisar o que realmente gera dinheiro e alcance.',
          { type: 'list', title: '📌 Métricas Vitais', items: [
            '• Retenção: Se a saída nos primeiros 3s for alta, o gancho é fraco. Se assistir até o final, o conteúdo é excelente.',
            '• Compartilhamentos: O maior sinal de viralização possível. Indica que o conteúdo é emocionalmente relevante.',
            '• Salvamentos: Indica valor educativo e utilidade real. Ajuda a manter a conta "viva".',
            '• Comentários: Aumentam a entrega orgânica e criam comunidade.'
          ] },
          { type: 'tips', title: '🧠 Regra Final', items: [
            'O algoritmo não pergunta se o vídeo é "bom", ele pergunta se "as pessoas estão reagindo". O sucesso vem da reação, não da perfeição técnica.'
          ] }
        ]
      },
      {
        id: 'meta_monetization_expert_methods',
        title: '💰 Monetização Profissional',
        content: [
          'Existem quatro caminhos principais para transformar seu alcance na Meta em lucro real e sustentável.',
          { type: 'info', title: '1. Conteúdo + Monetização Indireta', items: [
            'Cresça no Instagram/Facebook e ganhe com parcerias de marcas e anúncios de terceiros.',
            'Marketing de Afiliados: Promova produtos e ganhe comissão por venda sem precisar de estoque.'
          ] },
          { type: 'info', title: '2. Página de Conteúdo + Tráfego', items: [
            'Use a página como um motor de tráfego para seu WhatsApp, site ou negócio local.',
            'Venda seus próprios serviços ou produtos digitais (infoprodutos) para sua audiência.'
          ] },
          { type: 'info', title: '3. Monetização Direta (Bônus)', items: [
            'Bônus de desempenho de Reels e presentes (Stars) em países elegíveis.',
            '⚠️ Nota: Não dependa apenas disso, pois as regras de pagamento direto mudam constantemente.'
          ] }
        ]
      },
      {
        id: 'meta_faceless_content_blueprint',
        title: '🕶️ Crescer sem Aparecer (Faceless)',
        content: [
          'Você não precisa ser o rosto da marca para dominar o algoritmo. O foco deve ser 100% na mensagem.',
          { type: 'list', title: '🎬 Formatos que Funcionam', items: [
            '• Texto + Vídeo de Fundo: Frases motivacionais ou fatos sobre imagens cinemáticas.',
            '• Narração (Voiceover): Use sua voz ou IA para contar histórias ou explicar notícias.',
            '• Slides e Carrosséis: "5 coisas que ninguém te conta" ou tutoriais passo a passo.',
            '• Edição de Memes: Reutilização de vídeos virais com sua própria edição e contexto.'
          ] },
          { type: 'tips', title: '💡 Vantagem Estratégica', items: [
            'Canais Faceless são mais fáceis de escalar e vender no futuro, pois não dependem da imagem de uma pessoa específica.'
          ] }
        ]
      },
      {
        id: 'meta_viral_automaton_machine',
        title: '⚙️ Máquina de Página Viral',
        content: [
          'Transforme sua página em um sistema automático de visualizações e engajamento.',
          { type: 'steps', title: 'O Ciclo de Automação', items: [
            '1. Nicho Viral: Escolha temas de alta demanda (Motivação, Curiosidades, Finanças, Futebol).',
            '2. Identidade Visual simples: Nome curto, logo clara e tema consistente.',
            '3. Volume Estratégico: Poste 1 a 3 vídeos por dia para coletar dados constantes do algoritmo.',
            '4. Dobrar a Aposta: Se um vídeo "clica", faça 10 variações dele imediatamente.',
            '5. Ciclo de Refinamento: Postar → Analisar → Identificar Padrão → Repetir → Escalar.'
          ] }
        ]
      },
      {
        id: 'meta_long_term_strategy_pro',
        title: '🧠 Estratégia Pro de Longo Prazo',
        content: [
          'O sucesso na Meta não é sobre sorte, é sobre um plano de execução em fases bem definidas.',
          { type: 'steps', title: 'As 3 Fases do Sucesso', items: [
            'Fase 1: Teste (0-30 dias): Descobrir o nicho vencedor e o formato de viralização.',
            'Fase 2: Consistência (30-90 dias): Repetir o que funciona e criar uma identidade forte.',
            'Fase 3: Escala (90+ dias): Criar séries, fechar parcerias e ativar modelos de monetização sérios.'
          ] },
          { type: 'tips', title: '🏆 Regra Final', items: [
            'Na Meta, não vence necessariamente quem é o "melhor" tecnicamente, mas quem é o mais consistente em entregar o que o algoritmo já provou que o público quer.'
          ] }
        ]
      },
      {
        id: 'meta_daily_viral_ideas',
        title: '⚡ Ideias Virais Todos os Dias',
        content: [
          'O segredo da viralidade constante não é a inspiração, é um sistema de extração de ideias de alta demanda.',
          { type: 'info', title: '🧠 Método: 3 Fontes Fixas', items: [
            '1. Reels & Viral Feed: Observe o que já está funcionando na sua área e nos comentários.',
            '2. Tendências Gerais: Notícias, memes, temas polêmicos leves e curiosidades mundiais.',
            '3. Experiências Humanas: Ataque medos, desejos financeiros, relacionamentos e situações da vida real.'
          ] },
          { type: 'steps', title: '🔥 Transformação de Ideia', items: [
            'Pegue um fato seco e transforme em curiosidade chocante. Ex: "Cérebro esquece rápido" → "Seu cérebro apaga memórias que você nem percebe...".',
            'Sempre aplique um ângulo de curiosidade ou urgência em cada ideia.'
          ] }
        ]
      },
      {
        id: 'meta_ethical_copying',
        title: '🎬 Copiar vs. Modelar',
        content: [
          'Você pode (e deve) usar o que funciona como base, desde que faça do jeito certo para evitar punições.',
          { type: 'info', title: '⚙️ O que Modelar (Copiar a Estrutura)', items: [
            'A ideia central, o formato visual, o ritmo da edição e o tipo de gancho (hook).',
            'Regra: "Mesmo tema + Nova execução = Conteúdo original".'
          ] },
          { type: 'tips', title: '❌ O que NÃO Fazer', items: [
            'Nunca poste vídeos idênticos de outros criadores, mantenha marcas d\'água de terceiros ou use conteúdo sem qualquer modificação.'
          ] }
        ]
      },
      {
        id: 'meta_high_productivity_batching',
        title: '⚡ 10 Vídeos em 1 Hora',
        content: [
          'A velocidade de produção é o que permite testar o algoritmo até encontrar o seu primeiro grande viral.',
          { type: 'steps', title: '🚀 O Fluxo de Produção em Lote', items: [
            '1. Escolha 1 Tema Único: Foco total em um assunto (ex: produtividade).',
            '2. Crie 10 Variações: Use ganchos diferentes para o mesmo assunto ("Você faz errado", "O erro que destrói", "Ninguém ensina").',
            '3. Gravação e Edição em Massa: Use o mesmo cenário/fundo e aplique edições rápidas com legendas dinâmicas.'
          ] },
          { type: 'tips', title: '💡 Dica de Velocidade', items: [
            'Não busque a perfeição em cada vídeo. O volume de postagem é o que gera os dados necessários para o algoritmo te notar.'
          ] }
        ]
      },
      {
        id: 'meta_view_machine_profile',
        title: '🤖 Perfil: Máquina de Views',
        content: [
          'Configurando sua conta para ser um motor de visualizações orgânicas dentro da Meta Platforms.',
          { type: 'list', title: '🧭 Estrutura da Máquina', items: [
            '• 1 Nicho Apenas: Não misture temas no início para não confundir o algoritmo.',
            '• 1 Estilo Fixo: O cérebro do seguidor e o algoritmo aprendem mais rápido quando há consistência visual.',
            '• 1 Objetivo Claro: Decida se o post é para ganhar seguidores, gerar engajamento ou vender.'
          ] },
          { type: 'info', title: '🔁 Ciclo de Operação', items: [
            'Postar → Medir Retenção → Repetir o Vencedor → Eliminar o Falho → Escalar o Formato.'
          ] }
        ]
      },
      {
        id: 'meta_viral_prediction_signals',
        title: '📊 Sinais de Viralização',
        content: [
          'Como identificar precocemente que um vídeo tem potencial para atingir milhões de pessoas.',
          { type: 'info', title: '🚨 Sinais de Explosão', items: [
            'Muitas visualizações nos primeiros 30 minutos, comentários rápidos e sequenciais, e alta taxa de replays.',
            'Compartilhamentos imediatos para grupos ou Stories são o maior sinal de "estoque de viralidade".'
          ] },
          { type: 'info', title: '❌ Sinais de Estagnação', items: [
            'Pessoas saindo nos primeiros 2 segundos (indicador de hook fraco) e alcance travado mesmo com boas curtidas.'
          ] }
        ]
      },
      {
        id: 'meta_viral_24_72h_boom',
        title: '⚡ Viralizar em 24-72h',
        content: [
          'O algoritmo testa seu vídeo em pequenas amostras; se a reação for explosiva, ele expande o alcance rapidamente.',
          { type: 'info', title: '🔥 Estratégia de Explosão', items: [
            '1. HOOK Agressivo (0-2s): Pare o scroll imediatamente com frases como "Você faz isso errado" ou "Isso muda tudo".',
            '2. Vídeo Curto (7-15s): Maximiza a chance de retenção total e visualizações repetidas.',
            '3. Loop Invisível: O final conecta com o início, forçando o replay automático.',
            '4. Final Aberto: Use ganchos que deixam uma curiosidade pendente.'
          ] }
        ]
      },
      {
        id: 'meta_fast_money_roads',
        title: '💰 Dinheiro Rápido na Meta',
        content: [
          'Caminhos realistas para começar a faturar enquanto sua audiência ainda está crescendo.',
          { type: 'info', title: '🟢 Caminho Rápido: Venda Indireta', items: [
            'Use Reels virais para atrair tráfego e direcione para links de afiliados, produtos digitais ou WhatsApp Business.'
          ] },
          { type: 'info', title: '🟡 Caminho Médio: Serviços', items: [
            'Páginas com autoridade podem vender consultoria, edição de vídeo ou gestão de tráfego para outros nichos.'
          ] },
          { type: 'tips', title: '⚠️ Nota sobre Monetização Direta', items: [
            'Bônus do Instagram e Ads em vídeos são instáveis. Construa seu próprio ecossistema de vendas para maior segurança.'
          ] }
        ]
      },
      {
        id: 'meta_ai_content_automation',
        title: '🤖 IA e Automação de Conteúdo',
        content: [
          'Use a inteligência artificial para escalar sua produção de 1 para 10 vídeos por dia sem perder qualidade.',
          { type: 'steps', title: '⚙️ Fluxo Automatizado', items: [
            '1. Ideação: Use IAs para identificar temas virais e gerar roteiros curtos (7-15s).',
            '2. Áudio: Utilize narrações de alta fidelidade ou clones de voz para o storytelling.',
            '3. Visual: Combine stock footage com edições dinâmicas e legendas automáticas chamativas.'
          ] },
          { type: 'tips', title: '💡 Dica de Escala', items: [
            'A automação permite focar na estratégia e no teste de ganchos, enquanto a IA cuida do trabalho pesado de edição.'
          ] }
        ]
      },
      {
        id: 'meta_trend_hacking_legal',
        title: '📊 Hack de Tendências (Legal)',
        content: [
          'Antecipação é a chave para surfar ondas de alcance antes que o mercado fique saturado.',
          { type: 'steps', title: '🧠 Método de Antecipação', items: [
            '1. Monitoramento: Identifique vídeos pequenos que começam a ter picos anormais de views.',
            '2. Recriação Superior: Pegue a ideia central, melhore o gancho e reduza o tempo total do vídeo.',
            '3. Agilidade: Postar antes da saturação garante que o algoritmo te escolha como um dos pioneiros do tema.'
          ] }
        ]
      },
      {
        id: 'meta_strategic_growth_summary',
        title: '🚀 Resumo Estratégico',
        content: [
          'O plano mestre para dominar a Meta Platforms em 90 dias.',
          { type: 'steps', title: '📅 Do Zero ao Topo', items: [
            'Mês 1: Testar ganchos e aprender formatos vencedores.',
            'Mês 2: Consistência diária com os melhores formatos identificados.',
            'Mês 3+: Escala real, parcerias e monetização massiva.'
          ] },
          { type: 'tips', title: '🧠 O Verbo das Redes', items: [
            'O algoritmo não recompensa qualidade técnica isolada, ele recompensa COMPORTAMENTO HUMANO (Atenção + Reação).'
          ] }
        ]
      },
      {
        id: 'meta_million_view_formula',
        title: '🚀 De 10k a 1 Milhão de Views',
        content: [
          'O algoritmo escala um vídeo quando detecta alta retenção, replays e compartilhamentos massivos.',
          { type: 'info', title: '⚡ Fórmula do Viral Real', items: [
            '1. HOOK (0-1.5s): "Você está sendo enganado agora" ou "99% das pessoas não sabem disso".',
            '2. Curva de Curiosidade (2-10s): Crie uma pergunta mental no usuário (ex: "como isso funciona?").',
            '3. Recompensa Rápida (10-20s): Entrega simples, direta e satisfatória.',
            '4. Loop Final: O final deve conectar logicamente com o início para forçar o replay.'
          ] }
        ]
      },
      {
        id: 'meta_advanced_faceless_models',
        title: '🕶️ Faceless Avançado',
        content: [
          'Domine o crescimento sem aparecer usando estruturas de conteúdo que o algoritmo prioriza.',
          { type: 'list', title: '🎬 Formatos de Elite', items: [
            '• Texto + Vídeos Stock: Frases fortes sobre imagens de alta qualidade (estética cinematográfica).',
            '• Narração Storytelling: Use voz (real ou IA) para contar histórias de curiosidade ou fatos.',
            '• Conteúdo em Série: Crie Partes 1/2/3 para forçar o usuário a visitar seu perfil.'
          ] }
        ]
      },
      {
        id: 'meta_zero_to_hero_stages',
        title: '📈 Crescer do Zero (As 4 Fases)',
        content: [
          'O crescimento na Meta é um processo de amadurecimento algorítmico da sua conta.',
          { type: 'steps', title: '📅 Roteiro de Amadurecimento', items: [
            'Fase 1 (0-10 vídeos): Testar formatos e aprender o que prende atenção (ignore seguidores).',
            'Fase 2 (10-30 vídeos): Repetir os formatos que funcionaram e refinar hooks.',
            'Fase 3 (30-60 vídeos): Surgem os primeiros virais e o padrão de entrega fica claro.',
            'Fase 4 (60+ vídeos): Consistência de alcance e crescimento orgânico real.'
          ] }
        ]
      },
      {
        id: 'meta_real_monetization_methods',
        title: '💰 Ganhar Dinheiro de Verdade',
        content: [
          'Saia do amadorismo e entenda como as páginas realmente faturam alto na Meta Platforms.',
          { type: 'info', title: '💵 Métodos de Lucro', items: [
            '1. Conteúdo Viral + Afiliados: Recomende produtos de terceiros para sua audiência qualificada.',
            '2. Tráfego para Serviços: Use o alcance para vender edição, consultoria ou gestão de páginas.',
            '3. Marca Pessoal Forte: Parcerias diretas onde marcas pagam pelo acesso à sua audiência.'
          ] }
        ]
      },
      {
        id: 'meta_high_scale_productivity',
        title: '🤖 Vídeos em Lote (Escala)',
        content: [
          'A produtividade é o que separa quem tenta de quem domina as redes sociais.',
          { type: 'steps', title: '⚙️ Sistema de Escala Profissional', items: [
            '1. Tema Único: Escolha um tema por dia (ex: curiosidades financeiras).',
            '2. Roteirização em Massa: Crie 10 variações de ganchos e scripts para esse tema.',
            '3. Gravação em Lote: Reserve 1 hora para gravar todos os 10 vídeos de uma vez.',
            '4. Postagem Estratégica: Distribua os vídeos ao longo do dia/semana, não todos de uma vez.'
          ] }
        ]
      },
      {
        id: 'meta_viral_radar',
        title: '📊 Radar de Viralização',
        content: [
          'Como ler os sinais do algoritmo para saber se um vídeo vai explodir antes de acontecer.',
          { type: 'info', title: '🚨 Identificando o Boom', items: [
            'Sinais Fortes: Aumento rápido de views nos primeiros 60 min, comentários espontâneos e compartilhamentos.',
            'Sinais Fracos: Visualizações travadas, baixa retenção (pessoas saem cedo) e zero interação.'
          ] }
        ]
      },
      {
        id: 'meta_the_real_game_rule',
        title: '🧠 A Regra Real do Jogo',
        content: [
          'Na Meta, a técnica é secundária à psicologia do comportamento humano.',
          { type: 'tips', title: '🏆 O Veredito Final', items: [
            'Não vence quem cria o vídeo "melhor" tecnicamente.',
            'Vence quem prende a atenção mais rápido e a mantém por mais tempo.',
            'Entenda a retenção e você dominará o algoritmo.'
          ] }
        ]
      },
      {
        id: 'meta_ultimate_mastery_plan',
        title: '🧩 Estratégia Completa Final',
        content: [
          'Um plano de 90 dias para transformar sua conta em uma autoridade viral.',
          { type: 'steps', title: '📅 Roteiro de 3 Meses', items: [
            'Mês 1: Aprender o que viraliza e testar todos os ganchos possíveis.',
            'Mês 2: Encontrar seu formato vencedor e manter consistência diária.',
            'Mês 3: Crescimento real de seguidores e ativação de monetização estruturada.'
          ] }
        ]
      }
    ]
  },
  {
    id: 'youtube',
    title: 'YouTube',
    description: 'Domine o AdSense, Shorts e nichos lucrativos.',
    subsections: [
      {
        id: 'youtube_internal_workings',
        title: 'O Algoritmo por Dentro',
        content: [
          'O YouTube não é apenas uma rede social; é um sistema de recomendação baseado em IA que decide qual vídeo prenderá a atenção de cada usuário por mais tempo.',
          { type: 'info', title: '🧠 Onde a Recomendação Acontece', items: [
            '1. Página Inicial (Home): Baseado no interesse e histórico do usuário.',
            '2. Vídeos Sugeridos: Recomendados ao lado ou logo após o vídeo atual.',
            '3. Pesquisa (Search): Baseado no que o usuário está buscando ativamente.'
          ] },
          { type: 'list', title: '📊 O que o Algoritmo Analisa', items: [
            '• CLT (CTR): Taxa de clique - quantas pessoas clicam ao ver a thumbnail.',
            '• RETENÇÃO: Quanto tempo a pessoa assiste sem sair do vídeo.',
            '• SATISFAÇÃO: Likes, comentários, compartilhamentos e o comportamento pós-vídeo.',
            '• HISTÓRICO: O que o usuário costuma consumir na plataforma.'
          ] },
          { type: 'tips', title: 'A Regra de Ouro', items: [
            'O YouTube quer usuários felizes e presos na plataforma. Se seu vídeo faz as pessoas ficarem e assistirem mais vídeos depois, você será recompensado com mais alcance.'
          ] }
        ]
      },
      {
        id: 'youtube_viralization_phases',
        title: 'Como um Vídeo Viraliza',
        content: [
          'A viralização não é sorte, é um processo de validação em fases realizado pela inteligência artificial da plataforma.',
          { type: 'steps', title: '🚀 As 3 Fases da Viralização', items: [
            'Fase 1: Teste Pequeno - O vídeo é mostrado para uma pequena amostragem de usuários.',
            'Fase 2: Avaliação - Se o CTR e a Retenção forem altos, o YouTube escala para um grupo maior.',
            'Fase 3: Explosão - Vídeo entra em recomendados, página inicial e sugestões em massa.'
          ] },
          { type: 'info', title: '⚡ Os 3 Pilares do Vídeo Viral', items: [
            '1. Título + Thumbnail: A porta de entrada. Use curiosidade, emoção e promessas claras.',
            '2. Retenção: O coração do vídeo. Comece forte, mude o ritmo (cortes/zoom) e feche loops de curiosidade.',
            '3. Engajamento: Comentários e compartilhamentos mostram que o vídeo é relevante.'
          ] }
        ]
      },
      {
        id: 'youtube_shorts_strategy',
        title: 'YouTube Shorts e Tendências',
        content: [
          'Shorts são a forma mais rápida de crescer hoje, dependendo quase inteiramente de retenção total e loops viciantes.',
          { type: 'list', title: '🔥 Formatos que Mais Viralizam Hoje', items: [
            '• Curiosidades e Fatos Absurdos: Prendem pelo fator "Eu não sabia disso".',
            '• Histórias Pessoais/Storytelling: Narrativas que criam identificação emocional.',
            '• Antes e Depois: Resultados visuais rápidos e impactantes.',
            '• Conteúdo Educativo Simples: "3 dicas rápidas para...".',
            '• Entretenimento de Velocidade: Ritmo frenético que impede o scroll.'
          ] },
          { type: 'steps', title: '🛠️ Regras Milionárias para Shorts', items: [
            '1. FOCO NA RETENÇÃO: Se a pessoa não vê até o final, o Shorts para de ser entregue.',
            '2. GANCHO NOS 2 SEGUNDOS: O início deve ser impossível de ignorar.',
            '3. LOOP INFINITO: Tente fazer o final conectar perfeitamente com o início do vídeo.'
          ] }
        ]
      },
      {
        id: 'youtube_shopping_monetization',
        title: 'YouTube Shopping e Vendas',
        content: [
          'O YouTube Shopping permite marcar produtos nos vídeos e gerar vendas diretas sem que o usuário saia do aplicativo.',
          { type: 'info', title: '🛍️ Como funciona o Shopping', items: [
            'Os criadores podem marcar produtos de lojas parceiras ou da sua própria loja.',
            'Links de compra aparecem abaixo do vídeo ou durante a exibição.',
            'Ideal para nichos de Tecnologia, Beleza, Moda e Cozinha.'
          ] },
          { type: 'list', title: '💰 Outras Formas de Ganhar Dinheiro', items: [
            '• ADSENSE: Receba por mil views (CPM). Geralmente R$1 a R$10 no Brasil.',
            '• AFILIADOS: Links na descrição/comentário fixado para produtos de terceiros.',
            '• PUBLIS: Marcas pagam pela divulgação direta do produto.',
            '• CLUBE DE MEMBROS: Receitas recorrentes de fãs leais.'
          ] },
          { type: 'tips', title: 'Dica Estratégica', items: [
            'Mesmo canais pequenos podem faturar alto com YouTube Shopping e Afiliados focando em demonstração técnica de produtos.'
          ] }
        ]
      },
      {
        id: 'youtube_plan_2months',
        title: 'Plano de 2 Meses: Rumo ao Sucesso',
        content: [
          'Siga este cronograma de 8 semanas para sair do zero e entender profissionalmente a plataforma.',
          { type: 'steps', title: '📅 Mês 1: Fundamentos e Otimização', items: [
            'Semana 1-2: Estude o Algoritmo. Foque em aprender como criar ganchos e analisar métricas.',
            'Semana 3-4: Prática de Produção. Teste 1 vídeo longo por semana ou 3 Shorts por dia para ganhar ritmo.'
          ] },
          { type: 'steps', title: '📅 Mês 2: Prática e Escala', items: [
            'Semana 5-6: Melhore a Otimização. Melhore drasticamente suas thumbnails e os primeiros 30s do vídeo.',
            'Semana 7-8: Estratégia de Crescimento. Copie padrões (estruturas) de vídeos virais e analise a fundo o retorno do público.'
          ] },
          { type: 'tips', title: '🚀 Perguntas do Criador de Elite', items: [
            'Por que alguém clicaria nisso? Por que alguém ficaria até o final? O que faz esse vídeo ser único no meio de tantos outros?'
          ] }
        ]
      },
      {
        id: 'youtube_common_mistakes',
        title: '7 Erros que Matam Canais Iniciantes',
        content: [
          'Não culpe o algoritmo. Na maioria das vezes, o problema está na execução básica.',
          { type: 'list', title: '⚠️ Evite esses erros agora', items: [
            '1. Vídeo chato no começo: Você tem 5 segundos para prender a pessoa. Não enrole.',
            '2. Título sem curiosidade: Se o título for óbvio demais, ninguém clica.',
            '3. Thumbnail de baixa qualidade: A miniatura é 80% do motivo do clique.',
            '4. Pouca Retenção: Se o ritmo cair no meio do vídeo, o gráfico cai e o YouTube para a entrega.',
            '5. Falar de tudo: Não ter um nicho confunde o algoritmo.',
            '6. Desistir rápido: O YouTube é uma maratona, não uma corrida de 100 metros.',
            '7. Não analisar dados: Ignore o Analytics e você estará jogando no escuro.'
          ] }
        ]
      },
      {
        id: 'niches',
        title: 'Nichos Mais Lucrativos (2026)',
        content: [
          'Aqui estão alguns dos nichos mais lucrativos no YouTube — aqueles que costumam pagar melhor e facilitar monetização.',
          { type: 'info', title: '💰 1. Finanças e Dinheiro', items: ['Um dos mais lucrativos de todos.', 'Exemplos: Como ganhar dinheiro online, Investimentos, Economia pessoal.', '📈 Por quê? Anunciantes pagam muito (CPM alto) e facilidade com afiliados.'] },
          { type: 'info', title: '💻 2. Tecnologia', items: ['Exemplos: Apps úteis, IA e ferramentas (ChatGPT), Dicas de celular/produtividade.', '📈 Vantagem: Público grande + anúncios caros + muitos afiliados de softwares.'] },
          { type: 'info', title: '🧠 3. Curiosidades e Fatos', items: ['Exemplos: "Você sabia?", Mistérios, História rápida.', '📈 Vantagem: Viraliza muito fácil em Shorts. Bom para crescer rápido.'] },
          { type: 'tips', title: '⚠️ Dica de Ouro', items: [
            'Escolha um nicho que tenha: Fácil produção, Potencial de viralizar e formas claras de ganhar dinheiro (afiliados, cursos).'
          ] }
        ]
      },
      {
        id: 'youtube_seo',
        title: 'YouTube SEO Profissional',
        content: [
          { type: 'info', title: 'Apareça na Busca', items: ['Keywords (palavras-chave) ajudam o algoritmo a entender seu vídeo.', 'O SEO do YouTube é Retenção + CTR.'] },
          { type: 'steps', title: 'Passos para o SEO Perfeito', items: [
            '1. Pesquisa: Use o auto-complete da barra de busca para ver o que as pessoas querem.',
            '2. Otimização: Palavra-chave no início do título e nas primeiras 2 linhas da descrição.',
            '3. Tags: Use 10 a 15 tags relevantes (sem exagero).'
          ] },
          { type: 'tips', items: ['Dica: Edite o nome do arquivo do vídeo (ex: como-ganhar-dinheiro.mp4) antes de subir.'] }
        ]
      },
      {
        id: 'youtube_daily_plan_60',
        title: '🗓️ Plano Diário: 60 Dias para Viralizar',
        content: [
          'Este é o seu roteiro de treino diário. Siga cada passo para dominar a plataforma.',
          { type: 'info', title: '📅 DIAS 1–10: FUNDAMENTOS', items: [
            'Dia 1: Entenda como o YouTube recomenda vídeos (Home, sugestões e pesquisa).',
            'Dia 2: Estude o que é CTR (cliques no vídeo) e por que ele é importante.',
            'Dia 3: Estude retenção de público (tempo que as pessoas assistem).',
            'Dia 4: Veja 10 vídeos virais e analise os títulos.',
            'Dia 5: Veja 10 thumbnails e descubra por que chamam atenção.',
            'Dia 6: Entenda o que faz uma pessoa clicar em um vídeo.',
            'Dia 7: Estude tipos de conteúdo que viralizam hoje (Shorts, histórias, curiosidades).',
            'Dia 8: Assista vídeos grandes e observe como eles começam.',
            'Dia 9: Aprenda o conceito de “gancho” nos primeiros 5 segundos.',
            'Dia 10: Escreva 5 ideias de vídeos que você poderia fazer.'
          ] },
          { type: 'info', title: '📅 DIAS 11–20: IDEIAS E ROTEIRO', items: [
            'Dia 11: Crie 10 ideias de vídeos com base em curiosidade.',
            'Dia 12: Aprenda como fazer títulos com curiosidade.',
            'Dia 13: Escreva 5 títulos chamativos para suas ideias.',
            'Dia 14: Estude como começar vídeos de forma forte (hook).',
            'Dia 15: Escreva o roteiro de um vídeo curto (Short).',
            'Dia 16: Escreva outro roteiro mais longo.',
            'Dia 17: Veja vídeos e copie a estrutura (não o conteúdo).',
            'Dia 18: Entenda como manter atenção no vídeo.',
            'Dia 19: Crie 5 ideias de Shorts virais.',
            'Dia 20: Escolha 3 ideias para produzir.'
          ] },
          { type: 'info', title: '📅 DIAS 21–30: PRODUÇÃO', items: [
            'Dia 21: Grave seu primeiro vídeo.',
            'Dia 22: Poste o primeiro Short.',
            'Dia 23: Analise o desempenho do vídeo (retenção e views).',
            'Dia 24: Grave mais um vídeo melhorado.',
            'Dia 25: Estude edição básica (cortes, ritmo).',
            'Dia 26: Poste mais um Short.',
            'Dia 27: Melhore seu título e thumbnail de vídeos antigos.',
            'Dia 28: Grave vídeo focando no começo forte.',
            'Dia 29: Compare vídeos bons e ruins de outros canais.',
            'Dia 30: Ajuste seu estilo de conteúdo.'
          ] },
          { type: 'info', title: '📅 DIAS 31–40: RETENÇÃO', items: [
            'Dia 31: Aprenda como segurar atenção nos primeiros 10 segundos.',
            'Dia 32: Grave vídeo com início mais forte possível.',
            'Dia 33: Estude por que pessoas saem dos vídeos.',
            'Dia 34: Poste outro Short com ritmo rápido.',
            'Dia 35: Melhore edição (cortes mais rápidos).',
            'Dia 36: Analise comentários dos seus vídeos.',
            'Dia 37: Grave vídeo usando curiosidade até o final.',
            'Dia 38: Estude vídeos virais de outros países.',
            'Dia 39: Refaça um vídeo antigo melhorado.',
            'Dia 40: Poste e compare resultados.'
          ] },
          { type: 'info', title: '📅 DIAS 41–50: OTIMIZAÇÃO', items: [
            'Dia 41: Aprenda o que faz um vídeo ser recomendado.',
            'Dia 42: Melhore thumbnails (mais simples e curiosas).',
            'Dia 43: Grave vídeo focado em viralização.',
            'Dia 44: Poste 1–2 Shorts por dia.',
            'Dia 45: Estude canais grandes e copie estrutura.',
            'Dia 46: Ajuste seus títulos para mais curiosidade.',
            'Dia 47: Analise seus melhores vídeos.',
            'Dia 48: Grave vídeo com história envolvente.',
            'Dia 49: Teste formatos diferentes.',
            'Dia 50: Veja qual tipo de vídeo mais funciona.'
          ] },
          { type: 'info', title: '📅 DIAS 51–60: ESCALA', items: [
            'Dia 51: Foque no formato que mais funcionou.',
            'Dia 52: Poste com consistência diária.',
            'Dia 53: Melhore ainda mais retenção.',
            'Dia 54: Crie vídeos mais planejados.',
            'Dia 55: Estude monetização e YouTube Shopping.',
            'Dia 56: Aprenda como ganhar dinheiro com vídeos.',
            'Dia 57: Ajuste estratégia para crescer rápido.',
            'Dia 58: Poste vídeo mais forte até agora.',
            'Dia 59: Analise todo seu progresso.',
            'Dia 60: Defina seu plano para os próximos meses.'
          ] },
          { type: 'tips', title: '🔥 Segredo do Sucesso', items: [
            'Consistência + Teste + Melhoria contínua.',
            'Responda sempre: Por que alguém clicaria? Por que ficaria até o final? O que é diferente?'
          ] }
        ]
      },
      {
        id: 'youtube_ctr_thumbnails',
        title: '🔥 Títulos e Thumbnails (O Segredo do Clique)',
        content: [
          'O CTR (Click Through Rate) é a métrica mais importante para o crescimento. Se ninguém clica, o vídeo morre mesmo sendo excelente.',
          { type: 'info', title: '🧠 Psicologia do Clique', items: [
            '1. Curiosidade: "Quero saber o que acontece".',
            '2. Emoção: "Isso parece engraçado/chocante/intenso".',
            '3. Identificação: "Isso parece comigo ou resolve meu problema".'
          ] },
          { type: 'list', title: '✍️ Fórmulas de Títulos Virais', items: [
            '• Curiosidade: "Eu fiz isso por 24 horas e não esperava isso..."',
            '• Problema + Resultado: "Eu tentei crescer no YouTube por 30 dias e isso aconteceu".',
            '• Proibição/Choque: "Nunca faça isso no YouTube..." ou "O erro que destrói canais pequenos".',
            '• Número + Promessa: "5 formas de viralizar em 2026".'
          ] },
          { type: 'steps', title: '🖼️ Regras de Thumbnails que Vendem', items: [
            '1. POUCO TEXTO: Use de 2 a 4 palavras no máximo (Ex: "NÃO FAÇA ISSO").',
            '2. EMOÇÃO FORTE: Rostos expressando surpresa, choque ou dúvida.',
            '3. CONTRASTE: Fundo simples e objeto principal com cores vibrantes.',
            '4. HISTÓRIA VISUAL: A imagem deve contar o que está acontecendo sem precisar ler.'
          ] },
          { type: 'info', title: '⚡ Fórmulas Combinadas (Título + Thumb)', items: [
            'Ex 1: Título "Eu errei tudo..." + Thumb com "0 VIEWS".',
            'Ex 2: Título "O erro que mata canais" + Thumb com "NUNCA FAÇA".',
            'Ex 3: Título "Fiz um vídeo viral sem experiência" + Thumb com "DEU CERTO?".'
          ] },
          { type: 'tips', title: '🚀 Mentalidade Viral', items: [
            'Não pergunte "Isso é interessante para mim?". Pergunte: "Por que alguém PRECISA clicar nisso agora?".'
          ] },
          { type: 'steps', title: '🧪 Exercício: Treine seu Clique', items: [
            'Pegue uma ideia de vídeo e crie 3 títulos diferentes.',
            'Imagine 3 thumbnails diferentes para cada um.',
            'Escolha a combinação mais curiosa.',
            'Exemplo (Ideia: "Aprender YouTube"): ',
            '1. "Como crescer no YouTube"',
            '2. "Eu tentei isso no YouTube..."',
            '3. "O segredo que ninguém te conta" (Vencedor: Gera mais curiosidade)'
          ] }
        ]
      },
      {
        id: 'youtube_viral_ideas',
        title: '💡 Como Criar Ideias Virais',
        content: [
          'Ideias virais não dependem de inspiração, mas de padrões psicológicos repetíveis que prendem a atenção.',
          { type: 'info', title: '🧠 A Tríade da Ideia Viral', items: [
            '1. Curiosidade: Algo que faz o usuário querer saber o final.',
            '2. Transformação: Uma mudança de estado (Ruim → Bom, Zero → Sucesso).',
            '3. Emoção: Surpresa, choque, humor ou desafio extremo.'
          ] },
          { type: 'list', title: '🧩 Modelos Prontos para Usar', items: [
            '• Experiência Pessoal: "Eu fiz X por Y dias e aconteceu isso".',
            '• Desafio: "Vou tentar viralizar um canal do zero sem mostrar o rosto".',
            '• Segredo/Erro: "O erro que destrói canais pequenos" ou "O que ninguém te conta".'
          ] },
          { type: 'steps', title: '🚀 Método da Cópia Inteligente', items: [
            'Não copie o vídeo, copie a estrutura, o ângulo e a ideia base.',
            'Se um vídeo "Eu virei milionário com X" viralizou, adapte para seu nicho: "Eu tentei crescer só com Y por 30 dias".'
          ] },
          { type: 'tips', title: 'Exercício Diário', items: [
            'Crie 5 ideias todo dia: 1 experiência, 1 desafio, 1 erro/segredo, 1 transformação e 1 curiosidade.'
          ] }
        ]
      },
      {
        id: 'youtube_fast_growth_strategy',
        title: '⚡ Estratégia de Crescimento Real',
        content: [
          'Crescer rápido no YouTube é sobre encontrar um formato que funciona e repeti-lo exaustivamente com melhorias constantes.',
          { type: 'info', title: '📊 O que o Algoritmo Prioriza', items: [
            'CTR (Cliques) + Retenção (Tempo assistido) + Satisfação (Interação).',
            'O YouTube testa seu vídeo em grupos pequenos e amplia o alcance se os dados forem positivos.'
          ] },
          { type: 'list', title: '🔥 Por que focar em Shorts?', items: [
            '• Alcance orgânico explosivo.',
            '• Não depende de inscritos para viralizar.',
            '• Perfeito para testar muitas ideias em pouco tempo.'
          ] },
          { type: 'steps', title: '🧠 Fórmula do Short Milionário', items: [
            '1. GANCHO (0-2s): Frase de impacto ou visual chocante.',
            '2. RITMO: Sem enrolação, cortes rápidos.',
            '3. DESFECHO: Final satisfatório ou loop que conecta com o início.'
          ] },
          { type: 'steps', title: '📈 Plano de Execução (30 Dias)', items: [
            'Dias 1-10: Poste 1-2 Shorts por dia para testar vários estilos.',
            'Dias 10-20: Identifique os vídeos com melhor performance e repita o estilo.',
            'Dias 20-30: Foque 100% no formato vencedor e otimize a qualidade.'
          ] },
          { type: 'tips', title: '⚠️ Regra de Ouro', items: [
            'Não é sobre fazer muitos vídeos diferentes; é sobre achar 1 formato que funciona e dominá-lo.'
          ] }
        ]
      },
      {
        id: 'youtube_viral_scripts_ready',
        title: '🎬 Roteiros Virais Prontos',
        content: [
          'Um roteiro viral é um sistema de retenção desenhado para manter o público atento até o clímax.',
          { type: 'info', title: '⚡ Estrutura Base de Retenção', items: [
            '1. HOOK (0-3s): Prenda a atenção imediatamente.',
            '2. PROMESSA: O que vai acontecer no vídeo?',
            '3. DESENVOLVIMENTO: Conteúdo rápido e sem enrolação.',
            '4. CLÍMAX: O momento mais forte ou revelação.',
            '5. FECHAMENTO: Entrega final e satisfação.'
          ] },
          { type: 'steps', title: '🔥 Modelo 1: Experiência Pessoal', items: [
            'HOOK: "Eu tentei crescer no YouTube por 30 dias... e isso aconteceu."',
            'PROBLEMA: "Comecei sem inscritos e sem ideia de como o algoritmo funciona."',
            'DESENVOLVIMENTO: "No começo nada funcionava, pensei em desistir..."',
            'VIRADA: "Mas mudei uma coisa simples e tudo mudou."',
            'CLÍMAX: "Um vídeo começou a ser recomendado sozinho!"',
            'FINAL: "Foi assim que entendi o jogo real."'
          ] },
          { type: 'steps', title: '🔥 Modelo 2: Desafio do Zero', items: [
            'HOOK: "Vou tentar viralizar um canal do zero só com Shorts."',
            'PROBLEMA: "Sem inscritos, sem seguidores, sem ajuda."',
            'DESENVOLVIMENTO: "Postei todos os dias e nada acontecia..."',
            'CLÍMAX: "Até que um vídeo explodiu!"',
            'FINAL: "Isso mudou tudo no meu canal."'
          ] },
          { type: 'steps', title: '🔥 Modelo 3: O Erro Fatal', items: [
            'HOOK: "O erro que destrói canais pequenos no YouTube."',
            'PROBLEMA: "Você posta e não entende por que não cresce."',
            'REVELAÇÃO: "O problema é o seu gancho que ninguém presta atenção."',
            'SOLUÇÃO: "Se você corrigir isso, seus vídeos decolam."'
          ] }
        ]
      },
      {
        id: 'youtube_shorts_mastery_viral',
        title: '🚀 Shorts: O Caminho do Milhão',
        content: [
          'O Shorts viraliza se a pessoa assistir até o final. Retenção é a única métrica que importa aqui.',
          { type: 'info', title: '🧠 Fórmula do Short Viral', items: [
            '1. GANCHO (0-2s): Algo impossível de ignorar (Visual ou Frase).',
            '2. DESENVOLVIMENTO (2-10s): Conteúdo ultra rápido.',
            '3. RECOMPENSA (Final): Desfecho inesperado ou satisfatório.'
          ] },
          { type: 'list', title: '⚡ Segredos da Viralização', items: [
            '• Começo Agressivo: Esqueça o "Oi pessoal". Vá direto ao ponto.',
            '• Duração Ideal: 10 a 25 segundos gera mais retenção que vídeos longos.',
            '• O Loop Infinito: Conecte a última frase com a primeira do vídeo.',
            '• Emoção Constante: Nunca deixe o vídeo em tom neutro.'
          ] },
          { type: 'steps', title: '📈 Estratégia de Escala (30 Dias)', items: [
            'Dias 1-7: Poste 1-3 Shorts por dia para testar vários nichos.',
            'Dias 8-15: Analise a retenção e repita o estilo que funcionou.',
            'Dias 16-30: Otimize os ganchos e foque 100% no formato vencedor.'
          ] },
          { type: 'tips', title: '⚠️ Erro que Mata o Canal', items: [
            'Vídeos lentos, explicações longas e falta de surpresa no final. O Shorts é consumo rápido!'
          ] }
        ]
      },
      {
        id: 'youtube_shorts_one_million_blueprint',
        title: '🚀 Shorts: O Plano do 1 Milhão',
        content: [
          'O YouTube amplifica Shorts que possuem alta retenção, loops viciantes e estímulos emocionais constantes.',
          { type: 'info', title: '🧠 A Física do Viral', items: [
            '1. Retenção Alta: A pessoa assiste até o fim ou repete o vídeo.',
            '2. Loop: O vídeo "reinicia na cabeça" do usuário.',
            '3. Emoção Rápida: Surpresa, curiosidade ou choque em poucos segundos.'
          ] },
          { type: 'steps', title: '⚡ Fórmula dos Shorts Virais', items: [
            '1. GANCHO (0-2s): Algo impossível de ignorar.',
            '2. PROGRESSO RÁPIDO (2-10s): Mostra o que está acontecendo sem enrolar.',
            '3. VIRADA / SURPRESA (Final): Algo inesperado ou satisfatório.'
          ] },
          { type: 'steps', title: '🎬 Exemplos Prontos (Copiáveis)', items: [
            '• Ex 1 (Curiosidade): Gancho "Eu postei 1 vídeo por dia por 7 dias..." → Meio "Ninguém via nada..." → Final "...até que explodiu sozinho".',
            '• Ex 2 (Desafio): Gancho "Vou viralizar um canal do zero..." → Meio "Sem inscritos, sem ajuda..." → Final "Isso aconteceu no 3º dia".',
            '• Ex 3 (Segredo): Gancho "Seu vídeo não viraliza por isso..." → Meio "Não é o conteúdo..." → Final "É o gancho de 2 segundos".'
          ] },
          { type: 'tips', title: '🔄 O Segredo do Loop', items: [
            'Termine com uma frase incompleta ou conecte o final com o início (ex: "E foi aí que tudo começou..."). A mente humana odeia ciclos abertos e quer rever o começo.'
          ] },
          { type: 'steps', title: '📈 Estratégia de Crescimento Rápido', items: [
            'Fase 1 (Dias 1-7): Poste 2-3 Shorts por dia para testar vários nichos.',
            'Fase 2 (Dias 8-15): Identifique vídeos com +70% de retenção e repita o estilo.',
            'Fase 3 (Dias 16-30): Foque apenas no formato vencedor e otimize.'
          ] },
          { type: 'list', title: '💡 Ideias Prontas para Hoje', items: [
            '• "Eu tentei crescer no YouTube por 30 dias"',
            '• "O erro que faz seus vídeos morrerem"',
            '• "Como canais pequenos ficam virais"',
            '• "Isso mudou tudo no meu canal"',
            '• "Ninguém fala isso sobre Shorts"'
          ] },
          { type: 'tips', title: '⚠️ Regra de Ouro', items: [
            'No Shorts, você não precisa de inscritos. Você precisa de retenção + curiosidade + repetição.'
          ] }
        ]
      },
      {
        id: 'youtube_viral_shorts_complete_system',
        title: '🎬 Sistema: 1 Short Viral Completo',
        content: [
          'Este é um sistema de produção de ponta a ponta para criar Shorts que o algoritmo ama.',
          { type: 'steps', title: '🧠 1. Roteiro de Retenção (Exemplo)', items: [
            'GANCHO (0-2s): "Eu postei Shorts por 7 dias e isso aconteceu..."',
            'MEIO (2-10s): "No começo ninguém via meus vídeos, pensei em parar..."',
            'VIRADA: "Mas no terceiro dia, um vídeo começou a explodir..."',
            'FINAL (Loop): "E foi aí que eu entendi como o YouTube realmente funciona."'
          ] },
          { type: 'list', title: '🧲 2. Embalagem Viral', items: [
            '• TÍTULO: Use "O que mudou tudo no meu canal em 3 dias" ou "Ninguém viu meus vídeos até isso acontecer".',
            '• THUMBNAIL: Texto grande "0 → VIRAL" ou "EU ERREI" + expressão de surpresa ou gráfico subindo.'
          ] },
          { type: 'info', title: '✂️ 3. Edição de Alto Impacto', items: [
            'Cortes rápidos a cada 1-2 segundos.',
            'Zoom leve em palavras ou momentos importantes.',
            'Legendas dinâmicas no centro da tela sempre.',
            'Música de fundo leve mas constante.'
          ] }
        ]
      },
      {
        id: 'youtube_monetization_30_days',
        title: '💰 Canal Monetizado em 30 Dias',
        content: [
          'Uma estratégia agressiva e real para bater os requisitos de monetização rapidamente.',
          { type: 'steps', title: '🚀 Fase 1: Teste (Dias 1-7)', items: [
            'Poste 2-4 Shorts por dia.',
            'Teste ideias radicalmente diferentes.',
            'Ignore views baixas; o objetivo é encontrar O VÍDEO que funciona.'
          ] },
          { type: 'steps', title: '🔥 Fase 2: Repetição (Dias 8-20)', items: [
            'Pegue o seu melhor vídeo e faça variações dele.',
            'Mude o gancho, mas mantenha a estrutura vencedora.',
            'Escala o que já provou que o público gosta.'
          ] },
          { type: 'steps', title: '💰 Fase 3: Escala (Dias 21-30)', items: [
            'Poste apenas o formato vencedor (2-3 vezes por dia).',
            'Otimize a retenção ao máximo.',
            'Aqui o crescimento se torna exponencial.'
          ] },
          { type: 'tips', title: '🎯 Meta Real', items: [
            '1000 inscritos e consistência diária. O Shorts é a ponte para a monetização rápida hoje.'
          ] }
        ]
      },
      {
        id: 'youtube_shorts_editing_step_by_step',
        title: '🎥 Edição Viral Passo a Passo',
        content: [
          'A edição no Shorts não é estética, é funcional. Cada corte deve ter o objetivo de prender o olho.',
          { type: 'info', title: '🛠️ Ferramentas', items: [
            'CapCut (Mobile/Desktop) é a ferramenta mais eficiente para este estilo de edição rápida.'
          ] },
          { type: 'steps', title: '🧠 Estrutura da Edição', items: [
            '1. GANCHO VISUAL: Texto grande e chamativo logo no frame 1.',
            '2. SEM SILÊNCIO: Remova cada milissegundo de pausa entre as falas.',
            '3. LEGENDAS SEMPRE: Essencial para retenção em ambientes sem som.',
            '4. ZOOM E DESTAQUE: Use zooms leves quando a emoção ou o valor da informação sobe.',
            '5. LOOP FINAL: Termine a última frase de modo que ela se conecte com o início.'
          ] },
          { type: 'steps', title: '🔥 Exemplo Prático de Edição', items: [
            'Vídeo: "Eu postei 1 vídeo por dia..."',
            '0s: Texto grande na tela: "EU ERREI".',
            '2s: Corte rápido com fala: "ninguém viu".',
            '5s: Mudança de cena rápida para gráfico ou resultado.',
            '8s: Reação de surpresa ou virada.',
            '10s: Final rápido conectando com o início (Loop).'
          ] },
          { type: 'tips', title: '🚀 Regra de Ouro da Edição', items: [
            'Se o vídeo parecer "lento" em algum momento, ele vai morrer. No Shorts, menos é mais: mais cortes, menos enrolação.'
          ] }
        ]
      },
      {
        id: 'youtube_complete_growth_summary',
        title: '🧭 Resumo: O Sistema Completo',
        content: [
          'Para crescer no YouTube em 2026, você precisa integrar Ideia, Roteiro, Crescimento e Edição em um único ciclo.',
          { type: 'info', title: '🎬 Short Viral', items: [
            'Gancho Forte (2s) → História Simples → Virada Emocional → Final com Loop.'
          ] },
          { type: 'info', title: '📈 Crescimento', items: [
            'Poste 2-4 Shorts por dia → Encontre o formato vencedor → Repita e melhore.'
          ] },
          { type: 'info', title: '🎭 Edição', items: [
            'Cortes rápidos → Legenda sempre → Zoom leve → Sem enrolação.'
          ] },
          { type: 'tips', title: '🚀 O Próximo Nível', items: [
            'Se você fizer isso por 30 dias, você entenderá o algoritmo, encontrará o que funciona e criará a base para a monetização real.'
          ] }
        ]
      },
      {
        id: 'youtube_auto_ideas_strategy',
        title: '🧠 Ideias Virais Todo Dia',
        content: [
          'Pare de esperar pela inspiração e comece a usar métodos automáticos para encontrar o que já está funcionando.',
          { type: 'info', title: '🔥 Métodos de Extração', items: [
            '1. Método da Cópia Estrutural: Busque por "shorts viral", "storytime" ou "I tried" e pegue vídeos com milhões de views. Use a mesma estrutura para seu nicho.',
            '2. Três Fontes Infinitas: Tendências (IA, Jogos, Notícias), Problemas (Erros comuns, Como viralizar) e Emoção (Choque, Surpresa).'
          ] },
          { type: 'steps', title: '⚡ Rotina Automática', items: [
            'Dedique 10 min por dia assistindo Shorts do seu nicho.',
            'Anote as 3 melhores ideias que prenderam sua atenção.',
            'Crie 2 variações para cada ideia adaptando para seu estilo.'
          ] }
        ]
      },
      {
        id: 'youtube_100k_subscribers_roadmap',
        title: '📈 Estratégia rumo aos 100k',
        content: [
          'O crescimento de um canal não é linear, ele acontece em fases de teste, repetição e escala.',
          { type: 'steps', title: '🚀 Fase 1 (0-10k): Teste Total', items: [
            'Poste 2-4 Shorts por dia para aprender o que o público gosta.',
            'Não pare por falta de views; o algoritmo precisa de dados para te entender.'
          ] },
          { type: 'steps', title: '🔥 Fase 2 (10k-50k): Repetição Estratégica', items: [
            'Identifique o vídeo que funcionou e faça múltiplas variações dele.',
            'Mude apenas o gancho ou o ângulo, mantendo a estrutura vencedora.'
          ] },
          { type: 'steps', title: '💣 Fase 3 (50k-100k): Escala e Domínio', items: [
            'Foque 100% no formato vencedor e aumente a qualidade da retenção.',
            'Consistência absoluta é o que faz o canal explodir nesta fase.'
          ] }
        ]
      },
      {
        id: 'youtube_10m_views_shorts_blueprint',
        title: '🚀 Shorts de 1 a 10 Milhões',
        content: [
          'Vídeos de milhões de views seguem uma engenharia rigorosa de atenção e repetição.',
          { type: 'info', title: '🧠 O que o Algoritmo Prioriza', items: [
            'Retenção alta + Replay (assistir de novo) + Emoção rápida.',
            'Se o usuário assiste mais de uma vez, o YouTube entende que o vídeo é viciante.'
          ] },
          { type: 'steps', title: '🔥 Fórmula do Vídeo Milionário', items: [
            '1. GANCHO (0-2s): Frase ou visual que interrompe o scroll IMEDIATAMENTE.',
            '2. ESCALA (2-8s): Desenvolvimento rápido da história ou progresso.',
            '3. VIRADA: Final satisfatório, surpresa ou recompensa emocional.'
          ] },
          { type: 'tips', title: '🔄 Segredo do Loop Infinito', items: [
            'Termine com uma frase incompleta ou conecte o final ao início. O cérebro quer fechar o ciclo e acaba revendo o vídeo.'
          ] }
        ]
      },
      {
        id: 'youtube_final_machine_summary',
        title: '🧭 Resumo: A Máquina de Canal',
        content: [
          'Integre ideias, crescimento e estrutura para dominar o YouTube em 30 dias.',
          { type: 'info', title: '🧠 Ideias Automáticas', items: [
            'Copie estruturas virais e use tendências + problemas + emoção. 10 min por dia gera conteúdo infinito.'
          ] },
          { type: 'info', title: '📈 Crescimento 100k', items: [
            'Testar tudo (Fase 1) → Repetir o que funciona (Fase 2) → Escalar o formato (Fase 3).'
          ] },
          { type: 'info', title: '🚀 Shorts Milionários', items: [
            'Gancho agressivo, história ultra rápida, virada emocional e loop final viciante.'
          ] }
        ]
      },
      {
        id: 'youtube_ultimate_pro_blueprint',
        title: '🧭 Guia: Canal Pro do Zero',
        content: [
          'Um guia completo para quem quer tratar o YouTube como um negócio lucrativo desde o primeiro dia.',
          { type: 'info', title: '🎯 Escolha do Nicho (Decisivo)', items: [
            'Crescimento Digital/YouTube, Histórias/Curiosidades, Motivação/Disciplina, Tecnologia/IA e Entretenimento Rápido.',
            '👉 Escolha uma única direção e mantenha a consistência por pelo menos 30 dias.'
          ] },
          { type: 'steps', title: '🚀 Primeiros Vídeos (Para Começar Hoje)', items: [
            'Poste 2-4 Shorts por dia para ganhar tração.',
            'Vídeos entre 10 e 25 segundos com foco total em curiosidade.',
            'Ideias: "Eu tentei X por 7 dias", "O erro que mata canais", "Ninguém te conta isso".'
          ] },
          { type: 'list', title: '🧠 Método de Ideias Infinitas', items: [
            '• Cópia Estrutural: Busque por "shorts viral" ou "storytime" e adapte a estrutura para seu nicho.',
            '• A Tríade: Misture Problema + Curiosidade + Transformação em cada roteiro.',
            '• 10 Minutos por Dia: Veja Shorts, anote 3 ideias e crie 2 variações para cada uma.'
          ] }
        ]
      },
      {
        id: 'youtube_monetization_methods_real',
        title: '💰 Como Ganhar Dinheiro Real',
        content: [
          'Existem três pilares de receita para canais que crescem rápido no YouTube moderno.',
          { type: 'info', title: '💸 1. AdSense (Anúncios)', items: [
            'Requisitos: 1.000 inscritos + 4.000h de exibição ou visualizações de Shorts equivalentes.',
            'Receita passiva proporcional ao alcance do canal.'
          ] },
          { type: 'info', title: '💸 2. Marketing de Afiliados', items: [
            'Recomende produtos (cursos, apps, ferramentas) e ganhe comissão por venda.',
            'Funciona mesmo para canais pequenos que ainda não monetizaram com o Google.'
          ] },
          { type: 'info', title: '💸 3. Canais Faceless (Sem Rosto)', items: [
            'Use narração, textos na tela e imagens de apoio.',
            'Cresce muito rápido e permite criar múltiplos canais escalando a operação.'
          ] },
          { type: 'tips', title: '⚠️ Realidade do Sucesso', items: [
            'Ninguém cresce tentando ser perfeito. Quem cresce é quem testa, erra rápido e repete o que funciona melhorando 1% a cada dia.'
          ] }
        ]
      },
      {
        id: 'youtube_30_day_pro_plan',
        title: '📅 Plano de Ação: Os Primeiros 30 Dias',
        content: [
          'Siga este cronograma para forçar o algoritmo a entender e recomendar seu canal.',
          { type: 'steps', title: 'Dias 1–7: Fundação e Teste', items: [
            'Crie o canal e poste 2-4 Shorts por dia.',
            'Teste ideias radicalmente diferentes para ver qual chama mais atenção.'
          ] },
          { type: 'steps', title: 'Dias 8–15: Identificação e Repetição', items: [
            'Identifique os vídeos que tiveram melhor performance.',
            'Repita o estilo, o tom e a estrutura desses vídeos vencedores.'
          ] },
          { type: 'steps', title: 'Dias 16–30: Foco e Escala', items: [
            'Foque 100% no formato que provou funcionar.',
            'Melhore os ganchos (0-2s) e busque retenção acima de 80%.',
            'Prepare a base para os primeiros 1.000 inscritos.'
          ] }
        ]
      },
      {
        id: 'youtube_pro_channel_blueprint',
        title: '🎯 Plano: Canal Pro do Zero',
        content: [
          'Um guia completo para quem quer tratar o YouTube como um negócio lucrativo desde o primeiro dia.',
          { type: 'info', title: '🎯 Escolha do Nicho (O Caminho Mais Fácil)', items: [
            'Nichos que mais crescem hoje: Crescimento no YouTube + Curiosidades, Histórias que parecem mentira, Motivação/Disciplina, Tecnologia/IA e Explicações Rápidas.',
            '👉 Escolha 1 direção e permaneça nela por pelo menos 30 dias para o algoritmo te entender.'
          ] },
          { type: 'list', title: '🏷️ Sugestões de Nomes Fortes', items: [
            '• Modo Viral',
            '• Segredos do YouTube',
            '• Shorts Academy',
            '• Viralizar Agora',
            '• Crescimento Rápido'
          ] },
          { type: 'info', title: '🖼️ Estilo Visual do Canal', items: [
            'Foco em Shorts de 10 a 25 segundos.',
            'Textos grandes e dinâmicos na tela.',
            'Uso de curiosidade extrema para manter a retenção.'
          ] }
        ]
      },
      {
        id: 'youtube_30_ready_ideas_list',
        title: '💡 30 Ideias Prontas para Usar',
        content: [
          'Use estas ideias como base para seus primeiros vídeos. Elas são desenhadas para atacar a curiosidade e os problemas comuns.',
          { type: 'list', title: '🔥 Categoria: Crescimento', items: [
            '1. O erro que destrói canais pequenos',
            '2. Como crescer no YouTube do zero',
            '3. Por que seus vídeos não viralizam',
            '4. O segredo dos canais grandes',
            '5. Isso muda tudo no YouTube',
            '6. Como viralizar com 0 inscritos',
            '7. O algoritmo do YouTube explicado',
            '8. Isso faz seus vídeos morrerem',
            '9. O que prende atenção no YouTube',
            '10. Como canais pequenos ficam grandes'
          ] },
          { type: 'list', title: '⚡ Categoria: Shorts e Curiosidade', items: [
            '11. Ninguém te conta isso sobre Shorts',
            '12. Isso parece mentira mas é verdade',
            '13. Você está errando isso sem saber',
            '14. Esse detalhe muda tudo no seu canal',
            '15. Como viralizar em 24h',
            '16. O que o YouTube esconde de você',
            '17. Pare de postar Shorts agora',
            '18. O segredo do loop infinito',
            '19. Por que a retenção cai',
            '20. O gancho perfeito para 2026'
          ] },
          { type: 'list', title: '🚀 Categoria: Desafios e Resultados', items: [
            '21. Testei postar 3 vídeos por dia',
            '22. O resultado de 30 dias de Shorts',
            '23. Como ganhei meus primeiros 100 inscritos',
            '24. A verdade sobre canais sem rosto',
            '25. Quanto o YouTube paga por milhão',
            '26. Como edito meus vídeos virais',
            '27. O melhor horário para postar',
            '28. Tags não servem pra nada?',
            '29. O que mudou no meu canal em 3 dias',
            '30. Plano para 1000 inscritos rápido'
          ] }
        ]
      },
      {
        id: 'youtube_10_scripts_pack_ready',
        title: '🎬 10 Roteiros Prontos (Plug & Play)',
        content: [
          'Apenas preencha as lacunas e grave. Estes roteiros seguem a estrutura Hook → Middle → Value → Loop.',
          { type: 'steps', title: 'Roteiros 1 a 5: Base Algorítmica', items: [
            '• 1. GANCHO: "Você não precisa de inscritos para crescer..." → MEIO: "O algoritmo mostra vídeos mesmo para canais pequenos..." → FINAL: "Se prender a atenção, viraliza."',
            '• 2. GANCHO: "O erro que mata canais pequenos..." → MEIO: "não é o conteúdo..." → FINAL: "é o começo do vídeo que ninguém presta atenção"',
            '• 3. GANCHO: "Eu postei 1 vídeo por dia..." → MEIO: "e no começo ninguém viu nada..." → FINAL: "até que um vídeo explodiu sozinho"',
            '• 4. GANCHO: "Isso é o que faz um vídeo viral..." → MEIO: "retenção nos primeiros segundos..." → FINAL: "se isso falhar, o vídeo morre"',
            '• 5. GANCHO: "Ninguém te explica isso..." → MEIO: "o algoritmo testa seus vídeos em pequenos grupos..." → FINAL: "e depois decide se vai viralizar"'
          ] },
          { type: 'steps', title: 'Roteiros 6 a 10: Storytelling e Gancho', items: [
            '• 6. GANCHO: "Eu tentei crescer do zero..." → MEIO: "sem inscritos, sem ajuda..." → FINAL: "e isso aconteceu em poucos dias"',
            '• 7. GANCHO: "Isso é o segredo dos Shorts virais..." → MEIO: "começo forte + retenção alta..." → FINAL: "sem isso, não existe viral"',
            '• 8. GANCHO: "Seu vídeo pode estar morrendo por isso..." → MEIO: "os primeiros 2 segundos são fracos..." → FINAL: "e ninguém continua assistindo"',
            '• 9. GANCHO: "Como canais pequenos ficam grandes..." → MEIO: "eles repetem o que funciona..." → FINAL: "e não desistem no começo"',
            '• 10. GANCHO: "Isso pode mudar seu canal..." → MEIO: "foco em retenção, não em perfeição..." → FINAL: "é isso que viraliza vídeos"'
          ] }
        ]
      },
      {
        id: 'youtube_viral_24h_roadmap_fast',
        title: '🚀 Viralizar em 24h: O Método',
        content: [
          'Uma estratégia prática para forçar o algoritmo a notar sua conta rapidamente.',
          { type: 'steps', title: '⚡ Plano de Ação Imediata', items: [
            '1. Poste 3 Shorts no mesmo dia em horários diferentes.',
            '2. Use ganchos fortes (primeiros 2 segundos devem ser visuais e verbais).',
            '3. Mantenha o vídeo curto (10 a 20 segundos máximo).',
            '4. Repetir os formatos que gerarem qualquer pico de views.'
          ] },
          { type: 'info', title: '⚠️ A Física do Algoritmo', items: [
            'O YouTube não viraliza vídeo "bonito", ele viraliza vídeos com Retenção + Curiosidade + Replay.'
          ] }
        ]
      },
      {
        id: 'youtube_1000_subs_fast_blueprint',
        title: '📈 Rumo aos 1.000 Inscritos',
        content: [
          'Os primeiros 1.000 inscritos são os marcos da monetização. Veja como chegar lá mais rápido.',
          { type: 'steps', title: 'O Caminho da Base (30 Dias)', items: [
            'Dias 1-7: Poste 2-4 Shorts por dia para testar vários ganchos e nichos.',
            'Dias 8-15: Identifique o vídeo com mais views e faça 5 variações dele (mude o título, mas mantenha a ideia).',
            'Dias 16-30: Repita o formato vencedor religiosamente. Melhore a edição a cada vídeo.'
          ] },
          { type: 'tips', title: '💡 Dica de Ouro', items: [
            'No Shorts, você não precisa de inscritos. Você precisa de retenção + curiosidade + repetição. A base vem como consequência da viralização.'
          ] }
        ]
      },
      {
        id: 'youtube_7_day_plan_detailed',
        title: '📅 Plano de 7 Dias: Execução Real',
        content: [
          'Este é um manual de execução para quem quer testar a viralização e o algoritmo do YouTube Shorts na prática.',
          { type: 'steps', title: 'O que Postar Todos os Dias', items: [
            'Dia 1: Curiosidade + Problema. Exemplos: "Você não precisa de inscritos para crescer", "O erro que destrói canais pequenos".',
            'Dia 2: Aprendizado + Curiosidade. Exemplos: "Eu tentei crescer do zero", "Ninguém te conta isso sobre Shorts".',
            'Dia 3: Experiência Pessoal. Exemplos: "Eu postei 1 vídeo por dia", "Isso mudou meu canal".',
            'Dia 4: Promessa Forte. Exemplos: "Como viralizar com 0 inscritos", "O segredo dos canais grandes".',
            'Dia 5: Foco em Retenção. Exemplos: "O começo do vídeo é tudo", "Seu vídeo pode estar morrendo por isso".',
            'Dia 6: Erro + Solução. Exemplos: "Eu errei isso por muito tempo", "Isso muda tudo no crescimento".',
            'Dia 7: Identificar o Vencedor. Repita o melhor vídeo dos dias anteriores e faça 2 variações dele.'
          ] }
        ]
      },
      {
        id: 'youtube_1_to_10_multiplier',
        title: '📈 Sistema de Multiplicação Viral',
        content: [
          'Domine o segredo dos grandes canais: não crie sempre conteúdo novo, multiplique o que já funciona.',
          { type: 'steps', title: 'Como Transformar 1 Vídeo em 10', items: [
            '1. Encontre o Vídeo Vencedor: Identifique qual vídeo teve o maior pico de views ou retenção.',
            '2. Crie Variações Estratégicas: Não mude a ideia, mude apenas o foco do gancho.',
            'Exemplo: Se "Erro que destrói canais" funcionou, faça: "Erro que destrói Shorts", "Erro que mata retenção", "Erro que impede viralizar".',
            '3. Repetição Inteligente: Poste variações diariamente para o algoritmo te reconhecer como autoridade no tema.'
          ] },
          { type: 'tips', title: '🚀 Regra de Ouro', items: [
            'O algoritmo recompensa a especialização. Se um tema "clica", explore todas as variações possíveis antes de mudar de assunto.'
          ] }
        ]
      },
      {
        id: 'youtube_money_low_subs',
        title: '💰 Dinheiro com Poucos Inscritos',
        content: [
          'Você não precisa esperar pela monetização oficial do AdSense para começar a lucrar com seu alcance.',
          { type: 'info', title: '💸 Monetização Imediata', items: [
            '1. Marketing de Afiliados: Recomende cursos, ferramentas de edição ou apps e ganhe comissão.',
            '2. Canais Faceless: Use voz, textos e imagens de apoio para escalar rápido sem precisar aparecer.',
            '3. Venda de Conhecimento/Serviço: Quando tiver uma audiência curiosa, venda consultoria ou acesso exclusivo.'
          ] },
          { type: 'tips', title: '⚠️ Onde colocar o Link', items: [
            'Sempre direcione para o link na bio ou no comentário fixado. Use CTAs como "Clique no link do perfil para saber mais".'
          ] }
        ]
      },
      {
        id: 'youtube_fast_growth_summary_final',
        title: '🧭 Resumo: Estratégia de Velocidade',
        content: [
          'Combine consistência, análise e repetição para dominar o algoritmo.',
          { type: 'info', title: '🔥 As 4 Regras de Ouro', items: [
            '1. Poste 2-4 Shorts por dia.',
            '2. Mantenha os vídeos entre 10 e 25 segundos.',
            '3. Foque 100% nos primeiros 2 segundos (Gancho).',
            '4. Repita e melhore o que já provou funcionar.'
          ] },
          { type: 'tips', title: '🧠 O Segredo Final', items: [
            'O algoritmo não busca perfeição técnica, ele busca Retenção + Curiosidade + Replay. Se as pessoas assistem de novo, você venceu.'
          ] }
        ]
      }
    ]
  },
  {
    id: 'marketing',
    title: 'Marketing Digital',
    description: 'Afiliados, Dropshipping e muito mais.',
    subsections: [
      {
        id: 'what_is_marketing_full',
        title: 'Curso Completo: Fundamentos',
        content: [
          'O Marketing Digital é o uso da internet para atrair pessoas, construir audiência, criar relacionamento, gerar confiança e fazer vendas.',
          { type: 'info', title: 'Os 4 Pilares da Base', items: [
            '1. ATRAIR: Fazer pessoas conhecerem você.',
            '2. ENGAJAR: Fazer pessoas prestarem atenção.',
            '3. CONFIANÇA: Fazer pessoas acreditarem em você.',
            '4. VENDER: Transformar audiência em clientes.'
          ]},
          { type: 'info', title: 'A Revolução Digital', items: [
            'Antes: TV, Rádio e Jornais eram caros e limitados.',
            'Hoje: Qualquer pessoa com um celular pode construir uma marca global.'
          ]}
        ]
      },
      {
        id: 'social_media_pro',
        title: 'Social Media e Algoritmos',
        content: [
          { type: 'info', title: 'Como funcionam os Algoritmos', items: [
            'Eles analisam: Curtidas, Compartilhamentos, Comentários, Tempo assistindo e Salvamentos.',
            'Regra: Quanto melhor o conteúdo, mais o algoritmo entrega.'
          ]},
          { type: 'list', title: 'Tipos de Conteúdo', items: [
            'Educativo: Ensina algo (gera autoridade).',
            'Entretenimento: Faz rir ou prende atenção (gera alcance).',
            'Inspiracional: Motiva pessoas (gera conexão).',
            'Conversão: Focado em venda (gera lucro).'
          ]},
          { type: 'tips', title: 'Estratégia de Conteúdo', items: [
            'Não venda o tempo todo. Misture valor com oferta.',
            'Conteúdo viral geralmente tem: Curiosidade, Emoção ou Identificação.'
          ]}
        ]
      },
      {
        id: 'branding_positioning',
        title: 'Branding e Posicionamento',
        content: [
          { type: 'info', title: 'O que é Branding?', items: [
            'Não é só o logo. É a imagem, reputação e percepção da marca (Ex: Apple = Inovação).',
            'Identidade Visual: Cores, tipografia e estilo que comunicam sua essência.'
          ]},
          { type: 'info', title: 'Posicionamento de Mercado', items: [
            'Como você quer ser enxergado? (Ex: Nike = Superação, Rolex = Luxo).',
            'Sua persona: Você deve saber a idade, problemas, medos e desejos do seu cliente ideal.'
          ]},
          { type: 'tips', items: [
            '💡 Prompt para o Mentor IA: "Atuo no nicho de [Seu Nicho]. Crie 3 opções de bios persuasivas para meu Instagram e TikTok que foquem na transformação que gero e incluam uma CTA clara."',
            'Exemplo de Bio: "🚀 Te ajudo a monetizar no TikTok do zero | 🏆 +R$10k gerados | 👇 Comece aqui [Link]"'
          ]}
        ]
      },
      {
        id: 'copywriting_mastery_pro_v2',
        title: 'Copywriting e Gatilhos',
        content: [
          'Copywriting é a arte da escrita persuasiva para convencer pessoas a tomarem uma ação.',
          { type: 'list', title: 'Gatilhos Mentais Poderosos', items: [
            'Escassez: "Últimas vagas"',
            'Urgência: "Promoção acaba hoje"',
            'Autoridade: "Especialista com 10 anos de experiência"',
            'Prova Social: "Mais de 50 mil clientes satisfeitos"',
            'Exclusividade: "Acesso apenas para membros VIP"'
          ]},
          { type: 'tips', title: 'A importância da CTA', items: [
            'Sem Call To Action (Chamada para Ação), as pessoas não sabem o que fazer.',
            'Exemplos: "Clique aqui", "Compre agora", "Baixe grátis".'
          ]}
        ]
      },
      {
        id: 'sales_funnel_deep',
        title: 'Funil de Vendas Profissional',
        content: [
          { type: 'steps', title: 'As Etapas do Funil', items: [
            'Topo: Aprendizado e Descoberta (Dicas, curiosidades).',
            'Meio: Consideração da Solução (Explicações, depoimentos).',
            'Fundo: Decisão de Compra (Oferta direta, descontos).'
          ]},
          { type: 'info', title: 'Marketing de Conteúdo e Email', items: [
            'Crie conteúdo de valor para ganhar confiança antes de pedir a venda.',
            'Email Marketing: Use ferramentas como Mailchimp ou Brevo para manter o relacionamento.'
          ]}
        ]
      },
      {
        id: 'traffic_strategy_v2',
        title: 'Tráfego: Trazendo Pessoas',
        content: [
          'Tráfego é o movimento de pessoas chegando ao seu site, WhatsApp ou loja. Sem tráfego, não existem vendas.',
          { type: 'info', title: '1. Tráfego Orgânico (Gratuito)', items: [
            'Você atrai pessoas sem pagar anúncios através de vídeos e conteúdos únicos.',
            'O que faz viralizar: Gancho (primeiros segundos decisivos), Retenção (tempo assistindo) e Interação.',
            'Fontes: TikTok, Instagram (Reels), YouTube (Shorts) e Facebook.'
          ]},
          { type: 'info', title: '2. Tráfego Pago (Anúncios)', items: [
            'Pague para plataformas (Meta, Google, TikTok Ads) mostrarem seu produto para o público certo.',
            'O segredo: Criativo forte (vídeo/imagem), Copy persuasiva e Oferta irresistível.',
            'Métricas: CPM (Custo/1000 views), CPC (Custo por clique), CTR (Taxa de clique) e ROI (Retorno).'
          ]},
          { type: 'steps', title: 'Estrutura de um Anúncio Vencedor', items: [
            '1. Gancho: "Esse produto está explodindo nas vendas."',
            '2. Dor: "Milhares de pessoas têm esse problema."',
            '3. Solução: "Esse produto resolve rapidamente."',
            '4. Prova/Demonstração: Mostrar resultados reais.',
            '5. CTA: "Compre agora" ou "Clique no link".'
          ]}
        ]
      },
      {
        id: 'seo_and_google',
        title: 'SEO: Dominando o Google',
        content: [
          'SEO (Search Engine Optimization) é a técnica para aparecer no topo do Google sem pagar.',
          { type: 'info', title: 'O que o Google analisa', items: [
            'Qualidade do conteúdo e uso correto de Palavras-chave.',
            'SEO On Page: Títulos, texto, imagens e velocidade do site.',
            'SEO Off Page: Links externos e autoridade da sua marca na web.'
          ]}
        ]
      },
      {
        id: 'sales_psychology_pro',
        title: 'Psicologia de Vendas',
        content: [
          'As pessoas compram por Emoção, Desejo, Status, Segurança e Transformação. Elas não compram apenas produtos.',
          { type: 'info', title: 'O Processo da Venda', items: [
            '1. Atenção: Prender a pessoa nos primeiros segundos.',
            '2. Interesse: Mostrar que você entende o problema dela.',
            '3. Desejo: Mostrar a transformação que o produto gera.',
            '4. Ação: Fazer a pessoa tomar a decisão de compra.'
          ]},
          { type: 'steps', title: 'Técnicas de Convencimento', items: [
            'Foque nos Benefícios: "Bateria que dura o dia todo" vs "Bateria de 5000mAh".',
            'Siga a Multidão: Use Prova Social ("Mais de 20 mil clientes", "Produto Viral").',
            'Escassez e Urgência: "Últimas unidades", "Promoção termina hoje".',
            'Redução de Medo: Ofereça garantias fortes (ex: 7 dias de satisfação).'
          ]},
          { type: 'info', title: 'Cores e Emoções', items: [
            'Vermelho: Urgência | Azul: Confiança | Preto: Luxo | Verde: Saúde.'
          ]}
        ]
      },
      {
        id: 'skills_and_future',
        title: 'Carreira e Futuro (IA)',
        content: [
          { type: 'list', title: 'Profissões em Alta', items: [
            'Gestor de Tráfego, Social Media, Copywriter, Designer e Especialista em SEO.',
            'Habilidades: Comunicação, Criatividade, Estratégia e Análise de Dados.'
          ]},
          { type: 'info', title: 'O Futuro com Inteligência Artificial', items: [
            'A IA ajuda a criar textos, imagens e analisar grandes volumes de dados.',
            'Quem domina ferramentas de IA terá uma vantagem competitiva gigante no mercado.'
          ]},
          { type: 'tips', title: 'Conclusão', items: [
            'Marketing Digital é Estratégia + Tecnologia + Vendas.',
            'Estude fundamentos, pratique diariamente e nunca pare de testar.'
          ]}
        ]
      },
      {
        id: 'study_plan_marketing',
        title: 'Plano de Estudo (2 Meses)',
        content: [
          { type: 'steps', title: 'Mês 1: Fundamentos', items: [
            'Semana 1: Redes Sociais, Branding, Persona.',
            'Semana 2: Copywriting, Gatilhos, Funil.',
            'Semana 3: SEO e Conteúdo Orgânico.',
            'Semana 4: Tráfego Pago (Ads).'
          ]},
          { type: 'steps', title: 'Mês 2: Prática', items: [
            'Semana 5: Criar sua página profissional.',
            'Semana 6: Criar conteúdos diariamente.',
            'Semana 7: Aprender e testar anúncios.',
            'Semana 8: Criar sua estratégia completa de vendas.'
          ]},
          { type: 'tips', title: 'Erros de Iniciantes', items: [
            'Querer dinheiro rápido sem praticar.',
            'Estudar demais e não executar nada.',
            'Não entender quem é o público (persona).',
            'Desistir nos primeiros obstáculos.'
          ]}
        ]
      },
      {
        id: 'internet_success_keys',
        title: 'Sucesso na Internet: Fundamentos',
        content: [
          'Antes de qualquer estratégia, você deve entender que a internet funciona como qualquer profissão: exige habilidades reais.',
          { type: 'list', title: 'Os 5 Pilares do Sucesso', items: [
            '1. ATENÇÃO: Quem consegue atenção ganha dinheiro. É a moeda atual.',
            '2. CONFIANÇA: As pessoas não compram de desconhecidos. Mostre autoridade.',
            '3. RESOLUÇÃO DE PROBLEMAS: Quem resolve problemas reais é recompensado.',
            '4. COMUNICAÇÃO: Falar, escrever e explicar bem é o que vende.',
            '5. CONSISTÊNCIA: A internet recompensa quem continua. A maioria desiste cedo.'
          ]},
          { type: 'info', title: 'O Que Aprender Primeiro', items: [
            'Marketing e Vendas: Entender audiência e persuasão.',
            'Criação e Edição: Saber criar vídeos que prendem atenção.',
            'Copywriting: Escrita persuasiva baseada em psicologia.'
          ]}
        ]
      },
      {
        id: 'digital_product_creation',
        title: 'Produtos Digitais do Zero',
        content: [
          'Um produto digital (Curso, Ebook, Mentoria, Template) nasce de um problema real que precisa de solução.',
          { type: 'steps', title: 'Passo a Passo da Criação', items: [
            '1. Escolha um Nicho: Dinheiro, Saúde, Relacionamentos ou Habilidades.',
            '2. Identifique o Problema: O que as pessoas querem resolver HOJE?',
            '3. Organize a Solução: Separe em módulos (Introdução → Prática → Escala).',
            '4. Produza o Conteúdo: Grave aulas simples ou escreva o ebook no Canva.',
            '5. Página de Vendas: Título forte, benefícios, prova social e CTA.'
          ]},
          { type: 'tips', items: ['💡 Quer ajuda para criar seu primeiro Ebook? Pergunte ao Mentor IA: "Como estruturar um ebook de 10 páginas sobre [seu tema]?"'] },
          { type: 'info', title: 'Precificação Estratégica', items: [
            'Produto de Entrada: 10 a 50 dólares (fácil de vender).',
            'Produto Premium/Mentoria: 100 a 1000+ dólares (exige mais autoridade).'
          ]}
        ]
      },
      {
        id: 'affiliate_marketing_mastery_v2',
        title: 'Vender sem Produto Próprio',
        content: [
          'O Marketing de Afiliados permite que você venda soluções de terceiros e ganhe comissões (geralmente 40% a 60%).',
          { type: 'info', title: 'Onde encontrar produtos?', items: [
            'Plataformas: Hotmart, Monetizze, Eduzz, Kiwify.',
            'Filtro: Olhe avaliações, qualidade da página de vendas e suporte do produtor.'
          ]},
          { type: 'steps', title: 'Caminhos para Vender', items: [
            'Orgânico: Crie conteúdo no TikTok/Reels focado no problema que o produto resolve.',
            'Tráfego Pago: Invista anúncios direto para a página de vendas ou WhatsApp.',
            'Autoridade: Construa audiência no Instagram e ganhe confiança antes de ofertar.'
          ]},
          { type: 'tips', items: [
            'As pessoas não compram um "Curso", elas compram a "Transformação" que ele gera no final.'
          ]}
        ]
      },
      {
        id: 'video_editing_skill_full',
        title: 'Domine a Edição de Vídeo',
        content: [
          'Edição é uma das habilidades mais lucrativas hoje porque o vídeo domina o consumo digital.',
          { type: 'info', title: 'Ferramentas Recomendadas', items: [
            'Celular: CapCut (Poderoso e intuitivo).',
            'Computador: Adobe Premiere ou DaVinci Resolve (Profissional).'
          ]},
          { type: 'steps', title: 'O que focar para viralizar', items: [
            '1. O Gancho: Os primeiros 3 segundos decidem se o vídeo será assistido.',
            '2. O Ritmo: Cortes rápidos e dinâmicos para manter a retenção.',
            '3. Legendas: Ativas e dinâmicas aumentam o tempo de visualização.',
            '4. Áudio: Música de fundo e efeitos sonoros (SFX) criam imersão.'
          ]},
          { type: 'tips', title: 'Como ganhar dinheiro editando', items: [
            'Trabalhe como Freelancer para YouTubers e Infoprodutores.',
            'Crie sua própria agência de Shorts/Reels.',
            'Venda packs de edição e presets específicos.'
          ]}
        ]
      },
      {
        id: 'winning_products_hunting',
        title: 'Como Achar Produtos Virais',
        content: [
          'O sucesso no Dropshipping depende 80% da escolha do produto. Um produto ruim destrói sua margem com anúncios.',
          { type: 'info', title: 'Onde encontrar minas de ouro?', items: [
            '1. TikTok: Procure por #TikTokMadeMeBuyIt e veja o que tem milhões de views e comentários recentes.',
            '2. Meta Ads Library: Pesquise anúncios ativos de grandes lojas. Se o anúncio está rodando há semanas, ele está dando lucro.',
            '3. Amazon Best Sellers: Veja o que as pessoas estão comprando em massa agora.',
            '4. Ferramentas de Espionagem: Minea (anúncios em geral) e Pipiads (focado em TikTok).'
          ]},
          { type: 'list', title: 'Checklist do Produto Vencedor', items: [
            'Resolve um problema real?',
            'Tem um efeito "Uau" imediato?',
            'É difícil de achar em lojas comuns?',
            'Permite uma margem de pelo menos 3x o custo?'
          ]}
        ]
      },
      {
        id: 'marketing_roadmap_pro',
        title: 'Caminho Inteligente (Roadmap)',
        content: [
          'Para não se perder na montanha de informações, siga esta ordem de aprendizado:',
          { type: 'steps', items: [
            '1. Marketing e Psicologia: Entender por que as pessoas compram.',
            '2. Conteúdo e Edição: Aprender a atrair atenção gratuitamente.',
            '3. Copywriting: Aprender a converter atenção em desejo.',
            '4. Tráfego Pago: Escalar seus resultados com anúncios.',
            '5. Vendas e Fechamento: Aprender a colocar o dinheiro no bolso.',
            '6. Shopify/Dropshipping: Construir sua própria infraestrutura de vendas.'
          ]},
          { type: 'tips', items: ['O mais importante: Habilidades geram dinheiro, CONSISTÊNCIA gera liberdade.'] }
        ]
      },
      {
        id: 'marketing_100_tips',
        title: '100 Coisas sobre Marketing Digital',
        content: [
          'O marketing digital é um mercado baseado em atenção, psicologia humana, vendas e estratégia. Quem entende os pilares cresce.',
          { type: 'info', title: '🧠 1-20: Mentalidade e Redes Sociais', items: [
            '1. Marketing digital não é dinheiro rápido.',
            '2. Resultados levam tempo e esforço.',
            '3. Consistência vale mais que motivação passageira.',
            '11. Cada plataforma tem um algoritmo diferente.',
            '12. O TikTok recompensa Retenção; o Instagram valoriza Relacionamento.',
            '16. Gancho forte é 80% do sucesso de um vídeo curto.'
          ] },
          { type: 'info', title: '🎭 21-40: Psicologia e Conteúdo', items: [
            '21. Pessoas compram Emoção e justificam com Lógica.',
            '23. Curiosidade é o melhor combustível para cliques.',
            '24. Histórias (Storytelling) vendem muito mais que especificações técnicas.',
            '31. Conteúdo é um ativo digital que trabalha para você 24h.',
            '36. Edição não deve ser apenas "bonita", mas funcional para prender atenção.'
          ] },
          { type: 'info', title: '💰 41-60: Vendas e Afiliados', items: [
            '41. Vendas são habilidades treináveis, não um "dom".',
            '42. Pessoas compram SOLUÇÕES para suas dores.',
            '47. Toda peça de conteúdo deve ter um CTA (Chamada para Ação).',
            '51. Afiliados de sucesso criam confiança antes de oferecer links.',
            '59. Spam e insistência destroem sua credibilidade.'
          ] },
          { type: 'info', title: '🚦 61-90: Tráfego e Erros Comuns', items: [
            '61. Algoritmos observam o comportamento humano real.',
            '63. Compartilhamentos são o sinal mais forte de viralização.',
            '71. Marketing digital é um NEGÓCIO, trate-o com seriedade operacional.',
            '81. O maior erro é querer dinheiro rápido sem aprender a base.',
            '89. Comprar cursos e não aplicar é o caminho para o fracasso.'
          ] },
          { type: 'list', title: '🏆 Os 10 Pilares do Sucesso', items: [
            '1. ATENÇÃO: A moeda mais valiosa do mundo digital.',
            '2. COMUNICAÇÃO: Saber explicar e vender sua ideia.',
            '3. COPYWRITING: Escrita persuasiva que guia a ação.',
            '4. PSICOLOGIA: Entender as dores e desejos humanos.',
            '5. CONTEÚDO: O imã que atrai sua audiência.',
            '6. VENDAS: O motor que gera lucro real.',
            '7. TRÁFEGO: Trazer pessoas qualificadas para sua oferta.',
            '8. OFERTA: Algo tão bom que seria loucura recusar.',
            '9. RELACIONAMENTO: Criar comunidade e fidelidade.',
            '10. CONSISTÊNCIA: A base de todo o crescimento de longo prazo.'
          ] },
          { type: 'info', title: '🚀 Dicas para Começar HOJE', items: [
            '• Escolha UM Nicho e UMA Plataforma para dominar primeiro.',
            '• Aprenda Copywriting: é a habilidade que mais traz retorno em todas as áreas.',
            '• Resolva Problemas: quem resolve as maiores dores ganha mais dinheiro.',
            '• Não espere a perfeição: comece com o que tem e melhore no caminho.'
          ] }
        ]
      },
      {
        id: 'income_ideas',
        title: '15 Ideias de Renda Extra',
        content: [
          { type: 'image', title: 'Como Gerar Mais Renda', url: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=800' },
          'Aqui estão 15 formas comprovadas para você começar a faturar hoje no mercado digital e físico.',
          {
            type: 'list',
            title: 'Escolha uma ideia para ver o plano de ação:',
            items: [
              'Afiliado de Produtos Digitais',
              'Gestor de Tráfego Pago',
              'Social Media para Negócios Locais',
              'Edição de Vídeos para YouTube/TikTok',
              'Dropshipping',
              'Freelancer de Design (Canva/Photoshop)',
              'Criação de Conteúdo (TikTok/Reels)',
              'Copywriter para E-mails e Ads',
              'Venda de Infoprodutos (PLR)',
              'Assistente Virtual',
              'Consultoria de Marketing Digital',
              'Venda de Fotos/Vídeos (UGC)',
              'Influenciador de Nicho',
              'Gestão de Grupos VIP (WhatsApp/Telegram)',
              'Criação de Landing Pages'
            ]
          }
        ]
      },
      {
        id: '20_income_ideas',
        title: '20 Coisas para Gerar Renda Extra',
        content: [
          { type: 'image', title: 'Diversificando seus Ganhos', url: 'https://img.freepik.com/vetores-gratis/homem-trabalhando-no-laptop-e-ganhando-dinheiro_23-2148464303.jpg' },
          'Expandir suas fontes de renda é o segredo para a liberdade financeira. Escolha uma dessas 20 opções e comece hoje mesmo.'
        ]
      },
      {
        id: 'marketing_isp_startup',
        title: 'Negócio de Impacto: Provedor de Internet',
        content: [
          'Abrir um provedor de internet é um negócio sério que exige infraestrutura e conhecimento técnico.',
          { type: 'steps', title: '📋 O que você precisa para começar', items: [
            '1. Planejamento: Estude a demanda da área e a concorrência local.',
            '2. Licença: Em muitos países você precisa de autorização (Ex: Moçambique - INCM).',
            '3. Link de Internet: Compre link dedicado de empresas maiores para redistribuir.',
            '4. Equipamentos: Torres, roteadores MikroTik (muito comum em pequenos/médios), fibra e antenas.'
          ] },
          { type: 'info', title: '🚀 Estratégia de Crescimento', items: [
            'Comece pequeno: Atenda um bairro específico com fibra ou rádio.',
            'Foque na Estabilidade: O cliente quer velocidade, mas valoriza mais a conexão que não cai.',
            'Suporte Rápido: Esse é o diferencial contra as grandes operadoras.'
          ] }
        ]
      },
      {
        id: 'marketing_tips',
        title: 'Como Gerar Mais Renda',
        content: [
          { type: 'image', title: 'Visão Geral de Ganhos', url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800' },
          { 
            type: 'list', 
            title: 'Dicas de Marketing Digital', 
            items: [
              'Defina seu nicho de mercado com clareza.',
              'Crie conteúdo que resolva as dores do seu público.',
              'Mantenha consistência nas postagens (TikTok, Instagram).',
              'Use tráfego pago para acelerar seus resultados.',
              'Analise métricas para saber o que está funcionando.',
              'Construa uma lista de contatos ou comunidade.'
            ] 
          }
        ]
      },
      {
        id: 'thirty_k_strategy',
        title: 'Como Ganhar 30k em 1 Mês',
        content: [
          { type: 'info', title: 'É possível?', items: [
            'Sim, mas depende de: Seu conhecimento prévio, Tempo/dinheiro disponível e Moeda (MT, R$, $).',
            'Em Moçambique, 30.000 MT é totalmente alcançável. Para 30k reais/dólares começando do zero, a estratégia precisa ser agressiva.'
          ]},
          { type: 'steps', title: 'Caminho 1: Gestão de Redes Sociais', items: [
            'Ideal para gerar caixa rápido com negócios locais (restaurantes, clínicas, lojas).',
            'Ofereça: Gestão de posts, Reels, Anúncios locais e WhatsApp Marketing.',
            'Meta: 5 clientes x 6k = 30k ou 3 clientes x 10k = 30k.',
            'Dica: Ofereça 7 dias de teste grátis ou uma auditoria de perfil para fechar rápido.'
          ]},
          { type: 'steps', title: 'Caminho 2: Tráfego Pago (Ads)', items: [
            'Ajude empresas a vender mais usando Facebook/Instagram Ads.',
            'Aprenda Meta Ads e Copywriting.',
            'Nichos lucrativos: Imobiliárias, Clínicas e Lojas Online.',
            'Estratégia: Comece com 1-2 campanhas grátis para criar prova social e depois cobre mensalidade + % das vendas.'
          ]},
          { type: 'steps', title: 'Caminho 3: Marketing de Afiliados', items: [
            'Venda produtos de terceiros sem precisar criar nada.',
            'Plataformas: Hotmart, Eduzz, Digistore24.',
            'Ganhe rápido: Use TikTok/Reels para resolver problemas e faça CTA para o WhatsApp ou link na Bio.',
            'Nichos: Ganhar dinheiro, Emagrecimento, Inglês e IA.'
          ]},
          { type: 'steps', title: 'Caminho 4: Criação de Conteúdo', items: [
            'Estilo TikTok, Reels e YouTube Shorts.',
            'Conteúdo viral: Marketing, IA, Motivação, Dinheiro e Lifestyle.',
            'Monetize com: Parcerias, Afiliados, Consultorias e Ebooks.'
          ]},
          { type: 'steps', title: 'Caminho 5: Agência "Low Cost"', items: [
            'Modelo "Freelance Arbitrage": Você vende, freelancers executam.',
            'Exemplo: Cliente paga 12k -> Designer recebe 3k -> Editor recebe 2k -> Seu lucro é 7k.'
          ]},
          { type: 'info', title: 'Plano Agressivo de 30 Dias', items: [
            'Semana 1: Escolha UM serviço, crie portfólio e defina sua oferta.',
            'Semana 2: Contacte 50 negócios/dia, publique conteúdo e faça propostas.',
            'Semana 3: Feche os primeiros clientes, peça testemunhos e reinvesta em anúncios.',
            'Semana 4: Faça Upsell (venda mais para o mesmo cliente) e peça indicações.'
          ]},
          { type: 'tips', items: [
            'O erro comum: Tentar aprender tudo de uma vez. O dinheiro vem de falar com clientes e resolver problemas todos os dias.',
            'Habilidades de Ouro: Copywriting, Vendas no WhatsApp, Meta Ads e Criação de Reels.',
            'Ferramentas Essenciais: Canva, CapCut, Batch e Meta Ads Manager.'
          ]}
        ]
      },
      {
        id: 'thirty_day_plan_detailed',
        title: 'Plano 30 Dias (Passo a Passo)',
        content: [
          { type: 'info', title: 'Objetivo do Plano', items: [
            'Conseguir os primeiros clientes e construir autoridade.',
            'Gerar renda rapidamente e escalar para 30k+.',
            'Modelo: Gestão de redes sociais + conteúdo + anúncios para negócios locais.'
          ]},
          { type: 'steps', title: 'O Que Oferecer (Oferta Irresistível)', items: [
            'Ajudo negócios locais a conseguir clientes pelo Instagram e WhatsApp.',
            'Entrega: 12 posts/mês, 8 reels, Gestão de perfil e Anúncios simples.',
            'Preço Sugerido: 5k–10k por cliente. Meta: 3 a 6 clientes.'
          ]},
          { type: 'steps', title: 'Semana 1: Preparação', items: [
            'Escolha um nicho (restaurantes, clínicas, ginásios).',
            'Crie seu perfil profissional (Bio clara + Promessa forte).',
            'Crie um portfólio "inteligente": redesenhe páginas fracas como exemplo.',
            'Faça uma lista de 100 potenciais clientes no Google Maps/Instagram.'
          ]},
          { type: 'steps', title: 'Semana 2: Prospecção Massiva', items: [
            'Meta: Contactar 50 negócios por dia via Direct ou WhatsApp.',
            'Abordagem: "Vi sua página e tenho ideias para aumentar suas vendas. Posso enviar uma análise gratuita?"',
            'Poste conteúdo diário na sua página para passar autoridade.'
          ]},
          { type: 'steps', title: 'Semana 3: Fechar Clientes', items: [
            'Foque em reuniões e propostas: não venda "posts", venda "clientes".',
            'Oferta de entrada: "Primeiros 7 dias promocionais" ou "3 conteúdos grátis".',
            'Estrutura: Mostre o problema -> Consequência -> Sua Solução.'
          ]},
          { type: 'steps', title: 'Semana 4: Escalar e Resultados', items: [
            'Melhore a entrega e peça depoimentos para usar como prova social.',
            'Faça Upsell: ofereça tráfego pago avançado ou fotografia.',
            'Reinvesta o lucro em anúncios para atrair seus próprios clientes.'
          ]},
          { type: 'info', title: 'Rotina Diária de Sucesso', items: [
            '08h-10h: Estudo | 10h-13h: Prospecção | 14h-17h: Conteúdo | 18h-21h: Follow-up.'
          ]},
          { type: 'tips', items: [
            'A consistência é o que separa quem ganha de quem desiste em 7 dias.',
            'O dinheiro está no Follow-up: muitos clientes fecham no 3º ou 4º contato.',
            'Evite: Esperar perfeição, estudar sem executar ou cobrar barato demais.'
          ]}
        ]
      },
      {
        id: 'whatsapp_sales_mastery',
        title: 'Fechamento no WhatsApp',
        content: [
          'O WhatsApp é onde o relacionamento vira lucro. A venda deve parecer uma ajuda, não uma empurrada.',
          { type: 'steps', title: 'O Script de Ouro', items: [
            '1. Não comece vendendo: Faça perguntas para entender a dor ("Qual sua maior dificuldade hoje?").',
            '2. Diagnóstico: Mostre que você entendeu o problema.',
            '3. Solução Guiada: "Baseado no que você disse, este produto/serviço resolve isso por causa de X".',
            '4. Fechamento de Escolha: "Você prefere o plano básico ou o premium?" (Não dê chance para o "não").'
          ]},
          { type: 'info', title: 'Follow-up e Status', items: [
            'O dinheiro está no acompanhamento. A maioria das vendas acontece após o 3º contato.',
            'Status: Manhã (Valor), Tarde (Prova Social/Resultados), Noite (Oferta com CTA).'
          ]},
          { type: 'tips', items: [
            'Velocidade é TUDO. Responda em minutos, não em horas. Use a Escassez ("As vagas acabam hoje") para fechar na hora.'
          ]}
        ]
      },
      {
        id: 'viral_scripts',
        title: 'Como Criar Roteiros Virais',
        content: [
          { type: 'info', title: 'A Estrutura de OURO (3 Pilares)', items: [
            '1. Gancho (0-3s): É o que para o scroll. Deve atacar uma dor, curiosidade ou desejo imediato.',
            '2. Retenção (3-15s): O "miolo" do vídeo. Entregue o valor prometido sem enrolação. Use cortes rápidos.',
            '3. CTA (Chamada para Ação): Diga exatamente o que fazer. Se não houver comando, não há ação.'
          ]},
          { type: 'list', title: '🍿 Ganchos que Param o Dedo', items: [
            '"Pare de postar Reels antes de ver isso..."',
            '"O segredo que os grandes players não te contam..."',
            '"Como eu sairia do zero hoje se perdesse tudo..."',
            '"3 erros que estão matando o seu perfil..."',
            '"Foi assim que eu fiz R$ [Valor] usando apenas o celular..."'
          ]},
          { type: 'steps', title: 'Roteiro: Afiliado (Modelo Problema-Solução)', items: [
            'Gancho: Mostre um problema comum (ex: falta de dinheiro ou cansaço do trabalho 9-17).',
            'Conteúdo: Apresente o produto como a "ponte" para a liberdade. Mostre resultados na tela (prova social).',
            'CTA: "Se você quer o mapa para começar, comenta LIBERDADE que eu te envio no privado."'
          ]},
          { type: 'steps', title: 'Roteiro: Gestão de Redes (Modelo Autoridade)', items: [
            'Gancho: "Por que sua loja não vende nada pelo Instagram."',
            'Conteúdo: Mostre um perfil "morto" (sem reels, sem bio clara) vs um perfil otimizado.',
            'Explicação: Mostre como você faz essa transição para seus clientes.',
            'CTA: "Clique no link da Bio se você quer transformar seu perfil em uma máquina de vendas."'
          ]},
          { type: 'tips', title: 'Checklist da Viralidade', items: [
            'Iluminação: Luz natural ou frontal sempre ajuda demais.',
            'Legendas: 80% das pessoas assistem no mudo. Use legendas dinâmicas.',
            'Áudios em Alta: Use a aba "Em Alta", mas baixe o volume para 5% se estiver falando.',
            'Tendências: Adapte a trend em menos de 48h. Se demorar, ela morre.'
          ]},
          { type: 'tips', title: 'Como Adaptar Tendências', items: [
            'Não copie, adapte: Pegue o conceito da trend e aplique ao seu nicho específico (ex: um meme de namoro adaptado para "relação com cliente").',
            'Seja o primeiro: Siga contas gringas para ver o que vai bombar no Brasil em 1 semana.',
            'Qualidade Visual: Vídeos com boa resolução (4k ou 1080p bem iluminado) o algoritmo prioriza.'
          ]}
        ]
      },
      {
        id: 'client_scripts',
        title: 'Scripts de Vendas e Prospecção',
        content: [
          { type: 'info', title: '1. Primeira Mensagem (Abordagem)', items: [
            'Olá 👋 Vi a página do vosso negócio e acredito que vocês têm potencial para conseguir muito mais clientes pelo Instagram e WhatsApp.',
            'Notei algumas oportunidades que podem aumentar o alcance, mensagens e vendas.',
            'Posso enviar uma análise gratuita da página?'
          ]},
          { type: 'info', title: '2. Mensagem Após Resposta', items: [
            'Perfeito 👌 Analisei a página e vejo 3 pontos principais que podem melhorar rapidamente:',
            '1. Pouca frequência de conteúdo | 2. Falta de reels para alcance | 3. Ausência de estratégia para gerar mensagens no WhatsApp.',
            'Com algumas mudanças simples já dá para aumentar bastante a visibilidade e os clientes. Queres que eu explique como funcionaria a estratégia?'
          ]},
          { type: 'info', title: '3. Mensagem de Fechamento', items: [
            'Gestão completa: Conteúdo para IG/FB, Reels estratégicos, Crescimento da página e Estratégia de WhatsApp.',
            'O objetivo é transformar seguidores em clientes reais.',
            'Tenha uma vaga disponível esta semana. Preferes começar agora ou na próxima?'
          ]},
          { type: 'list', title: 'Frases de Follow-up (Recuperação)', items: [
            '"Ainda tens interesse em melhorar as vendas pelo WhatsApp?"',
            '"Posso mostrar uma estratégia simples que pode trazer mais clientes."',
            '"Tenho algumas ideias específicas para o teu negócio."',
            '"Empresas que respondem rápido no WhatsApp vendem muito mais."'
          ]},
          { type: 'tips', title: 'O que EVITAR', items: [
            'Textos enormes que ninguém lê.',
            'SPAM: mensagens copiadas sem nenhuma personalização.',
            'Começar falando de preço antes de mostrar valor.'
          ]},
          { type: 'info', title: 'O Caminho do Sucesso', items: [
            'O ideal é: Despertar curiosidade -> Gerar conversa -> Mostrar valor -> Fechar naturalmente.'
          ]}
        ]
      },
      {
        id: 'affiliates_digital',
        title: 'Mercado de Afiliados',
        content: [
          { type: 'video', title: 'Como funciona o Afiliado?', url: 'https://cdn.pixabay.com/video/2016/09/13/5144-182312674_large.mp4' },
          'O Marketing de Afiliados funciona em 3 passos: Você escolhe um produto, divulga seu link exclusivo e ganha uma comissão por cada venda realizada.',
          { type: 'info', title: 'Plataformas Principais', items: ['Hotmart', 'Eduzz / Monetizze', 'Amazon Associates', 'ClickBank'] },
          { type: 'steps', title: 'Como Vender', items: ['Escolha um único nicho no início', 'Aprenda COPYWRITING (escrita persuasiva)', 'Aprenda a gerar tráfego (orgânico ou pago)'] },
          { type: 'affiliate_manager', title: 'Seus Links de Afiliado' }
        ]
      },
      {
        id: 'shopify_masterclass_v2',
        title: 'Shopify: Sua Loja Online do Zero',
        content: [
          'Shopify é a plataforma líder para criar lojas profissionais sem saber programar. É a base para quem quer fazer Dropshipping ou ter sua própria marca online.',
          {
            type: 'info',
            title: 'O Que é a Shopify?',
            items: [
              'Uma ferramenta completa para: criar o site, gerenciar produtos, receber pagamentos e controlar pedidos.',
              'Ela funciona como a "espinha dorsal" do seu negócio de e-commerce.'
            ]
          },
          {
            type: 'steps',
            title: 'Como Começar (Passo a Passo)',
            items: [
              '1. [[CRIAR CONTA]]: Cadastre-se na Shopify.',
              '2. [[ESCOLHER NICHO]]: Beleza, Fitness, Pets, Casa ou Tecnologia.',
              '3. [[CRIAR A LOJA]]: Escolha um tema, logo e cores profissional.',
              '4. [[IMPORTAR PRODUTOS]]: Use fornecedores como AliExpress ou CJ Dropshipping.',
              '5. [[CONFIGURAR PAGAMENTO]]: Ative os métodos de recebimento (Cartão, PIX, etc).',
              '6. [[TRAZER TRÁFEGO]]: Use TikTok, Instagram ou Anúncios para atrair clientes.'
            ]
          },
          {
            type: 'info',
            title: 'Dropshipping com Shopify',
            items: [
              'Modelo onde você vende sem estoque. O fornecedor envia direto para o cliente.',
              '**Vantagem**: Baixo investimento inicial e alta escala.',
              '**Segredo**: O lucro está na diferença entre o que você cobra e o que o fornecedor custa.'
            ]
          },
          {
            type: 'list',
            title: 'O que faz uma Loja Vender?',
            items: [
              '• [[PRODUTO VENCEDOR]]: Deve resolver um problema, ser visual e ter apelo emocional.',
              '• [[BOA OFERTA]]: Não venda o produto, venda a TRANSFORMAÇÃO.',
              '• [[DESIGN LIMPO]]: Página rápida, fotos de alta qualidade e prova social (depoimentos).',
              '• [[TRAFEGO QUALIFICADO]]: Pessoas certas entrando na loja através de bons anúncios.'
            ]
          },
          {
            type: 'tips',
            title: 'Como Achar Produtos Vencedores',
            items: [
              'Pesquise no TikTok por: "#TikTokMadeMeBuyIt".',
              'Use a Biblioteca de Anúncios do Facebook para ver o que outras lojas estão vendendo.',
              'Foque em produtos que tenham um efeito "UAU" e que as pessoas não achem em lojas comuns.'
            ]
          },
          {
            type: 'info',
            title: 'A Verdade sobre o Sucesso',
            items: [
              'Shopify é apenas a ferramenta. O que faz dinheiro é o seu [[MARKETING]] e a sua [[OFERTA]].',
              'No começo, teste vários produtos. Nem tudo vai vender, e isso faz parte do jogo.'
            ]
          }
        ]
      },
      {
        id: 'first_sales_strategy',
        title: 'Primeiras Vendas: Estratégia',
        content: [
          'No começo, o objetivo não é ficar rico rápido, mas aprender a vender. Se você aprende a vender, consegue vender qualquer coisa.',
          { type: 'info', title: 'Modelo: Conteúdo + Produto + WhatsApp', items: [
            'Não precisa de muito dinheiro.',
            'Pode começar apenas com o celular.',
            'Aprende rápido o processo de conversão.'
          ]},
          { type: 'steps', title: 'Passo a Passo para Começar', items: [
            '1. Escolha um Nicho: Dinheiro, Saúde, Beleza, Relacionamento ou Tecnologia.',
            '2. Crie sua Base: Perfil no Instagram ou TikTok focado no nicho.',
            '3. Poste Diariamente: Problemas ("3 erros que..."), Dicas, Curiosidades e Transformações.',
            '4. Use CTA: "Link na bio" ou "Me chama no WhatsApp".',
            '5. Venda no WhatsApp: Converse primeiro, entenda a dor e mostre o benefício real do produto.'
          ]},
          { type: 'tips', title: 'O Segredo', items: [
            'Você não precisa de milhares de seguidores ou equipamentos caros. Precisa de Oferta Boa, Consistência e Comunicação.'
          ]}
        ]
      },
      {
        id: 'social_media_management_v2',
        title: 'Gestão de Redes Sociais: Profissão Digital',
        content: [
          'Gestão de redes sociais é a profissão de cuidar da presença online de empresas ou pessoas para gerar crescimento e vendas. Quase todos os negócios hoje precisam estar na internet.',
          {
            type: 'info',
            title: 'O Que faz um Gestor?',
            items: [
              'Não é apenas "postar fotos". É criar conteúdo estratégico ([[Reels]], [[Stories]], [[Vídeos]]) que gere resultados reais (clientes e autoridade).',
              'O gestor cuida do planejamento (o que e quando postar) e do engajamento com o público.'
            ]
          },
          {
            type: 'list',
            title: 'Habilidades Fundamentais',
            items: [
              '• [[EDIÇÃO DE VÍDEO]]: Saber usar o CapCut para criar vídeos dinâmicos.',
              '• [[DESIGN]]: Usar o Canva para criar posts e identidades visuais.',
              '• [[COPYWRITING]]: Escrever legendas e chamadas que convencem.',
              '• [[ESTRATÉGIA]]: Entender para quem postar e qual o objetivo de cada conteúdo.'
            ]
          },
          {
            type: 'steps',
            title: 'Tipos de Conteúdo Essenciais',
            items: [
              '1. [[EDUCATIVO]]: Ensina algo ao público e gera autoridade.',
              '2. [[ENTRETENIMENTO]]: Posts leves ou engraçados que aumentam o alcance.',
              '3. [[INSPIRAÇÃO]]: Histórias e bastidores que criam conexão emocional.',
              '4. [[VENDA]]: Ofertas diretas e promoções para converter seguidores.'
            ]
          },
          {
            type: 'info',
            title: 'Diferença entre Social Media e Editor',
            items: [
              'O **Editor** foca apenas na montagem do vídeo.',
              'O **Social Media** é mais completo: ele cuida da estratégia, do crescimento da página e da conversão em vendas. Por isso, costuma ganhar mais.'
            ]
          },
          {
            type: 'steps',
            title: 'Como Começar do Zero',
            items: [
              '• Aprenda o básico de edição e design.',
              '• Crie um **Portfólio** mesmo sem clientes (use negócios fictícios como exemplo).',
              '• Prospecção: Procure empresas locais com páginas fracas e ofereça uma melhoria.',
              '• Mostre seu próprio trabalho: Use suas redes para provar que você sabe o que faz.'
            ]
          },
          {
            type: 'tips',
            title: 'O Segredo para o Sucesso',
            items: [
              'O foco deve ser sempre no [[RESULTADO]]. Não basta postar "bonito", tem que gerar crescimento ou vendas para o cliente.',
              'Estude vídeos virais constantemente para entender o que está retendo a atenção das pessoas no momento.',
              'Marketing é teste: não tenha medo de errar e ajustar a rota.'
            ]
          }
        ]
      },
      {
        id: 'amazon_tasks_truth',
        title: 'As "Tarefas da Amazon"',
        content: [
          'Cuidado com promessas de dinheiro fácil online. Existem dois mundos diferentes aqui.',
          { type: 'info', title: '1. Amazon Real (Afiliados)', items: [
            'Programa legítimo (Amazon Associates).',
            'Você divulga produtos reais e ganha comissão sobre a venda.',
            'Seguro e profissional.'
          ]},
          { type: 'info', title: '2. Golpes de "Tarefas"', items: [
            'Promessas de ganhar dinheiro apenas curtindo produtos.',
            'Geralmente pedem depósitos ou taxas para "subir de nível".',
            'Fique longe de sites que prometem ganhos irreais por tarefas simples.'
          ]}
        ]
      },
      {
        id: 'kiwify_guide_full',
        title: 'Como começar no Kiwify',
        content: [
          'A Kiwify é uma plataforma excelente para vender produtos digitais ou ser afiliado pela sua simplicidade.',
          { type: 'steps', title: 'Iniciando como Afiliado', items: [
            '1. Crie sua conta gratuitamente.',
            '2. Escolha produtos no Marketplace com boa comissão e página de vendas forte.',
            '3. Divulgue seu link exclusivo usando Tráfego Orgânico (TikTok/Instagram) focado na dor do cliente.',
            '4. Meta: Poste 2-3 conteúdos por dia focados no problema que o produto resolve.'
          ]},
          { type: 'tips', items: [
            'O segredo do resultado no Kiwify é a escala de visualizações. Mais views = Mais cliques = Mais vendas.'
          ]}
        ]
      },
      {
        id: 'power_of_content',
        title: 'Domínio de Conteúdo: A Habilidade #1',
        content: [
          'Hoje o conteúdo controla praticamente toda internet. Quem domina conteúdo consegue: crescer redes sociais, ganhar audiência, fazer vendas e ganhar influência.',
          {
            type: 'info',
            title: 'O que é Conteúdo?',
            items: [
              'Qualquer material criado para: Informar, Entreter, Ensinar, Inspirar ou Convencer.',
              'Exemplos: Vídeos (Reels, TikTok), Posts, Podcasts, Lives, Blogs.'
            ]
          },
          {
            type: 'info',
            title: 'O Objetivo Real',
            items: [
              'Muitas pessoas pensam: "Conteúdo serve para postar." Não. Conteúdo serve para CONTROLAR ATENÇÃO.',
              'Atenção gera Audiência → Autoridade → Dinheiro.'
            ]
          },
          {
            type: 'steps',
            title: 'Como o Conteúdo Funciona (O Funil)',
            items: [
              '1. ATRAIR: Pessoa vê o vídeo.',
              '2. PRENDER: Pessoa continua assistindo.',
              '3. CONECTAR: Pessoa cria confiança.',
              '4. CONVERTER: Pessoa compra.'
            ]
          },
          {
            type: 'list',
            title: 'Os 4 Pilares do Conteúdo',
            items: [
              '1. [[ATENÇÃO]]: Use curiosidade ("Poucas pessoas sabem"), polêmica ("Pare de fazer isso") ou benefício ("Como ganhar clientes").',
              '2. [[RETENÇÃO]]: Tempo assistindo. Use cortes rápidos, legendas e zooms para prender o olhar.',
              '3. [[CONEXÃO]]: Histórias, bastidores e dificuldades aproximam você da audiência.',
              '4. [[CONVERSÃO]]: Depois da atenção ganha, você faz a oferta.'
            ]
          },
          {
            type: 'info',
            title: 'Tipos de Conteúdo Estratégico',
            items: [
              '• EDUCATIVO: Ensina algo e gera autoridade.',
              '• ENTRETENIMENTO: Faz rir ou sentir emoção (gera alcance).',
              '• INSPIRAÇÃO: Motiva através de histórias e transformações.',
              '• CONVERSÃO: Focado em venda (ofertas, depoimentos, prova social).'
            ]
          },
          {
            type: 'steps',
            title: 'Estrutura de Vídeo Profissional',
            items: [
              '1. [[GANCHO]]: Primeiros segundos. Use **curiosidade** ("Esse erro destrói suas vendas") ou **mistério** ("Ninguém fala disso").',
              '2. [[DESENVOLVIMENTO]]: Explique sem enrolar. A internet é rápida.',
              '3. [[CTA]]: Chamada para ação ("Segue para mais", "Comenta QUERO").'
            ]
          },
          {
            type: 'info',
            title: 'Storytelling e Viralidade',
            items: [
              'O cérebro ama histórias. Use: Situação → Problema → Transformação → Resultado.',
              'Vídeos viralizam por: Emoção, Curiosidade, Identificação e Simplicidade.'
            ]
          },
          {
            type: 'list',
            title: 'Como ter Ideias Constantes',
            items: [
              '1. Observe os comentários (perguntas viram conteúdo).',
              '2. Veja vídeos virais de concorrentes (copie a estrutura, não o vídeo).',
              '3. Use suas experiências e problemas que você já resolveu.'
            ]
          },
          {
            type: 'tips',
            title: 'Plano de Ação Prático',
            items: [
              'TikTok: 2–5 vídeos por dia | Reels: 1–3 vídeos por dia.',
              'Foco inicial: Postar muito. Você está aprendendo, não busque perfeição.',
              'Edição: Legendas, zooms e cortes rápidos no CapCut aumentam drasticamente a retenção.'
            ]
          },
          {
            type: 'info',
            title: 'O Maior Segredo',
            items: [
              'As pessoas não seguem apenas informação. Elas seguem Personalidade, Energia e histórias de Transformação.',
              'No começo seus vídeos serão ruins. É normal. O segredo é continuar postando até ficar bom.'
            ]
          }
        ]
      },
      {
        id: 'video_editing_masterclass_v2',
        title: 'Edição de Vídeo: Habilidade de Ouro',
        content: [
          'Hoje praticamente toda internet gira em volta de vídeos (TikTok, Instagram, YouTube). Quem sabe editar vídeos domina a atenção e consegue crescer páginas ou ganhar dinheiro prestando serviços.',
          {
            type: 'info',
            title: 'O Verdadeiro Objetivo da Edição',
            items: [
              'Edição não é apenas colocar efeitos. O objetivo principal é [[PRENDER ATENÇÃO]] (Retenção).',
              'Uma boa edição cria **ritmo**, gera **emoção** e faz as pessoas assistirem até o final.',
              'Internet moderna é rápida; se o vídeo é lento, as pessoas pulam.'
            ]
          },
          {
            type: 'list',
            title: 'Ferramentas de Edição',
            items: [
              '📱 CELULAR (Iniciantes): CapCut (mais recomendado por ser fácil, gratuito e poderoso).',
              '💻 COMPUTADOR (Profissional): Adobe Premiere Pro ou DaVinci Resolve (gratuito e muito forte).'
            ]
          },
          {
            type: 'steps',
            title: 'A Base do Editor Profissional',
            items: [
              '1. CORTES: Remova erros, silêncios e respirações excessivas. Use cortes rápidos para manter a energia.',
              '2. RITMO: Velocidade emocional do vídeo. Use zooms e mudanças de cena para evitar o tédio.',
              '3. ÁUDIO: Extremamente importante. Use trilhas que combinem com a emoção e efeitos sonoros (SFX) como "pops" e "swipes" para marcar transições.',
              '4. LEGENDAS: 80% das pessoas assistem no mudo. Use legendas dinâmicas com cores e destaques em palavras-chave.',
              '5. ZOOM: Use Zoom In/Out para destacar emoções ou frases importantes.',
              '6. CORREÇÃO DE COR: Deixe o vídeo com aspecto limpo, profissional e bem iluminado.'
            ]
          },
          {
            type: 'info',
            title: 'O Segredo dos Vídeos Virais',
            items: [
              'GANCHO FORTE: Os primeiros 3 segundos decidem tudo. Ex: "Você está cometendo esse erro."',
              'MUDANÇAS VISUAIS: O cérebro precisa de movimento constante para não dispersar.',
              'STORYTELLING: Edição é narrativa. Use o ritmo para criar curiosidade e suspense.'
            ]
          },
          {
            type: 'info',
            title: '🚀 Técnicas Avançadas para Viralização',
            items: [
              '• [[TRANSIÇÕES]: Use transições de máscara (masking) ou movimento de câmera para conectar cenas sem que o espectador perceba o corte.',
              '• [[EFEITOS SONOROS (SFX)]: Use efeitos (Swish, Pop, Whoosh) para marcar cada mudança de texto ou zoom. Isso cria um estímulo auditivo que aumenta a retenção.',
              '• [[LOOP PERFEITO]: Termine sua frase final de forma que ela se conecte gramaticalmente com a frase inicial. Isso faz o vídeo recomeçar sem a pessoa notar.'
            ]
          },
          {
            type: 'steps',
            title: 'Como Aprender Rápido',
            items: [
              '• Assista vídeos profissionais e observe cada corte.',
              '• Tente recriar vídeos que deram certo (a prática é tudo).',
              '• Edite todos os dias, mesmo que sejam vídeos de 30 segundos.',
              '• Aprenda Storytelling: Entenda por que as pessoas continuam assistindo.'
            ]
          },
          {
            type: 'list',
            title: 'Como Ganhar Dinheiro Editando',
            items: [
              '1. Edição para Influenciadores: Mercado gigante que precisa de produtores de Shorts/Reels.',
              '2. Edição para Empresas: Restaurantes, Lojas e Academias precisam de vídeos de venda.',
              '3. Freelancer: Use plataformas como Fiverr ou Upwork.',
              '4. Criar Agência: Agrupar editores e vender pacotes de conteúdo em escala.'
            ]
          },
          {
            type: 'tips',
            title: 'Conseguindo seus Primeiros Clientes',
            items: [
              'Crie um portfólio mesmo sem ter clientes (edite vídeos da internet como exemplo).',
              'Ofereça uma edição de teste gratuita para pequenos criadores.',
              'Poste seus próprios trabalhos no TikTok e Instagram como portfólio vivo.'
            ]
          },
          {
            type: 'steps',
            title: 'Plano de 4 Semanas para Dominar',
            items: [
              'Semana 1: Foco total em Cortes, Legendas e Áudio.',
              'Semana 2: Foco em Zoom, Ritmo e Retenção.',
              'Semana 3: Recriar fielmente 3 vídeos virais.',
              'Semana 4: Criar seus próprios vídeos com identidade única diariamente.'
            ]
          }
        ]
      },
      {
        id: 'copywriting_pro',
        title: 'Copywriting: A Arte de Vender',
        content: [
          'Copywriting é a arte de escrever textos persuasivos que levam as pessoas a tomarem uma ação imediata (comprar, clicar, seguir). É uma das habilidades mais lucrativas da internet.',
          {
            type: 'info',
            title: 'O Que é Copywriting?',
            items: [
              'Não é "escrever bonito", é escrever para [[CONVENCER]].',
              'As pessoas compram por **Emoção**, **Desejo**, **Medo** ou **Sonhos**, e justificam com a lógica.',
              'Copy forte foca na [[TRANSFORMAÇÃO]] (o corpo bonito, não a academia).'
            ]
          },
          {
            type: 'list',
            title: 'Os Pilares da Copy que Vende',
            items: [
              '1. GANCHO (Hook): A primeira frase deve prender a atenção. Ex: "Você está perdendo dinheiro".',
              '2. DOR: Toque no problema que o cliente quer resolver.',
              '3. DESEJO: Mostre o cenário ideal após a solução.',
              '4. PROVA SOCIAL: Mostre que outros já tiveram resultados.',
              '5. ESCASSEZ/URGÊNCIA: "Últimas vagas", "Oferta acaba hoje".',
              '6. CTA (Chamada para Ação): Diga exatamente o que a pessoa deve fazer agora.'
            ]
          },
          {
            type: 'steps',
            title: 'O Modelo AIDA (Clássico)',
            items: [
              '• ATENÇÃO: Gancho forte.',
              '• INTERESSE: Fatos que façam a pessoa continuar lendo.',
              '• DESEJO: Criar a vontade de ter o benefício.',
              '• AÇÃO: O comando final para o clique ou compra.'
            ]
          },
          {
            type: 'info',
            title: 'Palavras Poderosas para Usar',
            items: [
              'Segredo, Revelado, Rápido, Fácil, Grátis, Novo, Exclusivo, Simples, Vitalício.',
              'Ex: "Estratégia simples e revelada para crescer rápido".'
            ]
          },
          {
            type: 'tips',
            title: 'Copy para WhatsApp e Vendas Diretas',
            items: [
              'Não chegue vendendo. Primeiro Converse → Entenda a Dor → Mostre a Solução → Feche a Venda.',
              'Use a garantia (ex: 7 dias) para quebrar a última barreira de medo do cliente.',
              'Exercício: Escreva 10 ganchos diferentes para o mesmo produto todos os dias.'
            ]
          }
        ]
      },
      {
        id: 'paid_traffic_mastery',
        title: 'Tráfego Pago: A Máquina de Vendas',
        content: [
          'Tráfego pago é a habilidade de pagar ferramentas (Meta, Google, TikTok) para levar pessoas qualificadas até sua oferta. É a forma mais rápida de escalar resultados.',
          {
            type: 'info',
            title: 'O Verdadeiro Objetivo',
            items: [
              'Não é apenas "apertar botões". É mostrar a [[OFERTA CERTA]] para a [[PESSOA CERTA]].',
              'Anúncios trazem clientes rapidamente e permitem que você controle o fluxo de vendas do seu negócio.'
            ]
          },
          {
            type: 'list',
            title: 'Estrutura de um Anúncio Vencedor',
            items: [
              '1. [[CRIATIVO]]: O vídeo ou imagem. É o mais importante para prender o scroll.',
              '2. [[COPY]]: O texto persuasivo que reforça o desejo.',
              '3. [[OFERTA]]: Como você apresenta o produto e o valor que ele gera.',
              '4. [[PÚBLICO]]: Segmentação por idade, interesses e comportamentos.',
              '5. [[PÁGINA]]: O destino final onde a conversão acontece.'
            ]
          },
          {
            type: 'steps',
            title: 'Métricas que Você Deve Dominar',
            items: [
              '• [[CTR]] (Taxa de Cliques): Indica se o seu anúncio é interessante.',
              '• [[CPC]] (Custo por Clique): Quanto você paga por cada interessado.',
              '• [[CPM]] (Custo por Mil): O preço para aparecer para 1.000 pessoas.',
              '• [[ROAS]] (Retorno sobre Gasto): O quanto você lucra para cada real investido.'
            ]
          },
          {
            type: 'info',
            title: 'O Poder do Remarketing',
            items: [
              'A maioria das pessoas não compra na primeira vez que vê o anúncio.',
              '[[REMARKETING]] é mostrar o anúncio novamente para quem já visitou seu site ou interagiu com seu perfil, quebrando as últimas objeções.'
            ]
          },
          {
            type: 'tips',
            title: 'Estratégia para Iniciantes',
            items: [
              'Comece pelo [[WhatsApp Ads]]: Leve as pessoas para o chat direto. É mais fácil converter conversando.',
              'Use Vídeos de [[UGC]] (User Generated Content): Anúncios que parecem vídeos de pessoas reais gravando com celular tendem a performar melhor.',
              'Teste PELO MENOS 3 criativos diferentes para cada público. O mercado é quem decide o que funciona.'
            ]
          }
        ]
      },
      {
        id: 'sales_mastery_v2',
        title: 'Vendas: O Poder de Persuadir',
        content: [
          'Vendas é a habilidade que move o dinheiro. Todo negócio depende de vendas para sobreviver e crescer. Vender não é "empurrar", é AJUDAR a resolver problemas.',
          {
            type: 'info',
            title: 'A Base das Vendas',
            items: [
              'As pessoas compram por [[EMOÇÃO]] e justificam com a [[LÓGICA]].',
              'Quem entende de pessoas, vende melhor. O foco deve ser sempre na **TRANSFORMAÇÃO** que o produto gera.',
              'Sem confiança, não existe venda. Provas e autoridade são fundamentais.'
            ]
          },
          {
            type: 'steps',
            title: 'O Processo da Venda (Funil)',
            items: [
              '1. [[ATENÇÃO]]: Chame a atenção com ganchos fortes.',
              '2. [[INTERESSE]]: Mostre que você entende o problema do cliente.',
              '3. [[DESEJO]]: Crie vontade mostrando os benefícios e resultados.',
              '4. [[CONFIANÇA]]: Use depoimentos e provas sociais.',
              '5. [[AÇÃO]]: CTA clara ("Compre agora", "Link na bio").'
            ]
          },
          {
            type: 'list',
            title: 'Gatilhos que Convertem',
            items: [
              '• [[PROVA SOCIAL]]: "Mais de 10 mil clientes satisfeitos". As pessoas seguem a multidão.',
              '• [[ESCASSEZ]]: "Últimas vagas disponíveis". O medo de perder gera ação.',
              '• [[URGÊNCIA]]: "Promoção termina hoje à meia-noite".',
              '• [[BENEFÍCIO]]: Foque no resultado ("Perca 5kg") e não na característica ("Dieta de 30 dias").'
            ]
          },
          {
            type: 'tips',
            title: 'Vendas no WhatsApp',
            items: [
              'Não tente vender de cara. Primeiro CONVERSE → ENTENDA A DOR → MOSTRE A SOLUÇÃO.',
              'Dica: Use perguntas abertas como "Qual sua maior dificuldade hoje?" para envolver o cliente.',
              'Seja rápido! Responder em minutos aumenta drasticamente as chances de fechamento.'
            ]
          },
          {
            type: 'info',
            title: 'O Segredo Final',
            items: [
              'As pessoas não compram produtos, elas compram [[ESPERANÇA]] e [[IDENTIDADE]].',
              'No começo, você vai ouvir muitos "nãos". Faz parte do aprendizado. O segredo é continuar praticando e melhorando sua comunicação.'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'challenge',
    title: 'Desafio 7 Dias',
    description: 'Um roteiro prático para sair do zero e começar a monetizar em uma semana.',
    subsections: [
      {
        id: 'day1',
        title: 'Dia 1: O Alicerce',
        content: [
          'Hoje seu objetivo é definir seu nicho e preparar suas contas.',
          { type: 'steps', items: ['Escolha UM nicho que você goste (ex: Finanças, Curiosidades, Review)', 'Crie um nome fácil de lembrar', 'Otimize sua Bio com uma promessa clara'] }
        ]
      },
      {
        id: 'day2',
        title: 'Dia 2: Produção em Massa',
        content: [
          'Grave seus primeiros 3 vídeos seguindo os modelos virais.',
          { type: 'steps', items: ['Grave 3 vídeos curtos (15s)', 'Use ganchos nos primeiros 2 segundos', 'Foque em um problema comum do seu nicho'] }
        ]
      },
      {
        id: 'day3',
        title: 'Dia 3: Consistência',
        content: [
          'Poste nos horários de pico e interaja com quem comentar.',
          { type: 'tips', items: ['A consistência diz ao algoritmo que você é um criador sério. Não pare!'] }
        ]
      },
      {
        id: 'day4',
        title: 'Dia 4: Estratégia de Afiliado',
        content: [
          'Escolha um produto que combine com seu nicho.',
          { type: 'steps', items: ['Cadastre-se na Hotmart ou Amazon', 'Escolha um produto com boa comissão', 'Crie um vídeo focado na transformação que o produto traz'] }
        ]
      },
      {
        id: 'day5',
        title: 'Dia 5: Primeira Live',
        content: [
          'Entre ao vivo para criar conexão real com seus seguidores.',
          { type: 'steps', items: ['Prepare 3 tópicos para falar', 'Agradeça cada presente (gift) nominalmente', 'Fale sobre o produto que você é afiliado'] }
        ]
      },
      {
        id: 'day6',
        title: 'Dia 6: Otimização',
        content: [
          'Analise quais vídeos deram mais certo e repita o formato.',
          { type: 'info', items: ['Veja a retenção nos dados analíticos', 'Onde as pessoas param de assistir?', 'Ajuste seu gancho no próximo vídeo'] }
        ]
      },
      {
        id: 'day7',
        title: 'Dia 7: Escala',
        content: [
          'Agora que você tem o ritmo, é hora de aumentar a frequência.',
          { type: 'list', items: ['Tente postar 2 ou 3 vezes ao dia', 'Comece a testar pequenos anúncios se tiver lucro', 'Mantenha o foco em ajudar sua audiência primeiro'] }
        ]
      }
    ]
  }
];

export const APP_CONTENT_EN: SectionContent[] = [
  {
    id: 'tiktok',
    title: 'TikTok',
    description: 'Learn how to grow and monetize your TikTok account.',
    subsections: [
      {
        id: 'growth',
        title: 'Account Growth',
        content: [
          { type: 'info', title: '👤 Professional Profile Setup', items: [
            'PHOTO: Clear face or iconic simple logo.',
            'NAME: Examples: John\'s Tips, Smart Income, Success Life.',
            'BIO: Must promise real value (Ex: "I teach you to make money online", "Daily side hustle tips").'
          ] },
          { type: 'steps', title: '1. Nail your content type', items: ['You need a focus (niche), otherwise the algorithm won\'t know who to show your videos to.', 'Examples: Humor, Tips, Lifestyle, Motivation, Educational, Adapted Trends'] },
          { type: 'steps', title: '2. Hook in the first 3 seconds', items: ['If no ones stops to watch, the video dies.', 'Examples: "No one tell you this about...", "If you do this, you lose money"'] },
          { type: 'steps', title: '3. Short and dynamic videos', items: ['7 to 20 seconds works very well', 'Fast cuts, no silence'] },
          { type: 'steps', title: '4. Professional Consistency', items: ['Post 1 to 3 videos a day', 'Test different ideas', 'Repost what performs well'] },
          { type: 'steps', title: '5. Engagement = Fuel', items: ['Ask questions in the video', 'Reply to comments with videos', 'Encourage saving and sharing'] },
          { type: 'tips', items: ['Viral = repeated pattern, not chance. Analyze what worked and repeat the format.'] }
        ]
      },
      {
        id: 'tiktok_affiliates',
        title: 'TikTok for Affiliates',
        content: [
          { type: 'info', title: 'Stop promoting, start selling', items: ['No one buys a link — they buy a result', 'Show transformation, not just the product'] },
          { type: 'list', items: ['Type 1: Problem → Solution', 'Type 2: Before and After', 'Type 3: Product Testing', 'Type 4: Social Proof'] },
          { type: 'tips', items: ['Use smart Call to Action: "Comment \'I want\' and I\'ll send you the link" works better than "Link in bio".'] }
        ]
      }
    ]
  },
  {
    id: 'meta',
    title: 'Meta (Instagram/FB)',
    description: 'Strategies for Reels, Facebook Ads, and Professional Monetization.',
    subsections: [
      {
        id: 'meta_monetization',
        title: 'Ways to Make Money',
        content: [
          { type: 'info', title: '1. Content Creation', items: ['Earn money creating content: Reels and videos on Facebook/Instagram.', 'Bonus programs (when available).', '“Stars” (gifts from followers on Facebook).', 'In-video ads (for eligible accounts).', '👉 Works best for consistent creators.'] },
          { type: 'info', title: '2. Brand Partnerships', items: ['Get paid to promote products (Influencer).', 'Sponsored posts and paid Reels.', 'Ongoing brand partnerships.', '👉 Even with few followers, you can start (micro-influence).'] }
        ]
      }
    ]
  },
  {
    id: 'youtube',
    title: 'YouTube',
    description: 'Master AdSense, Shorts, and profitable niches.',
    subsections: [
      {
        id: 'youtube_internal_workings',
        title: 'The Algorithm Inside',
        content: [
          'YouTube is not just a social network; it is an AI-based recommendation system.',
          { type: 'info', title: '🧠 Where Recommendations Happen', items: [
            '1. Home Page: Based on user interest and history.',
            '2. Suggested Videos: Recommended next to or after the current video.',
            '3. Search: Based on what the user is actively searching for.'
          ] }
        ]
      }
    ]
  }
];

export const APP_CONTENT_ES: SectionContent[] = [
  {
    id: 'tiktok',
    title: 'TikTok',
    description: 'Aprende a crecer y monetizar tu cuenta en TikTok.',
    subsections: [
      {
        id: 'growth',
        title: 'Crecimiento de la cuenta',
        content: [
          { type: 'info', title: '👤 Configuración del Perfil Profesional', items: [
            'FOTO: Rostro claro o logo simple.',
            'NOMBRE: Ejemplos: Consejos de Juan, Ingresos Inteligentes, Vida de Éxito.',
            'BIO: Debe prometer valor real (Ej: "Te enseño a ganar dinero online", "Tips diarios de ingresos extra").'
          ] }
        ]
      }
    ]
  }
];

export const APP_CONTENT_FR: SectionContent[] = [
  {
    id: 'tiktok',
    title: 'TikTok',
    description: 'Apprenez à développer et monétiser votre compte TikTok.',
    subsections: [
      {
        id: 'growth',
        title: 'Croissance du compte',
        content: [
          { type: 'info', title: '👤 Configuration du Profil Professionnel', items: [
            'PHOTO: Visage clair ou logo simple et marquant.',
            'NOM: Exemples: Conseils de Jean, Revenu Intelligent, Vie de Succès.',
            'BIO: Doit promettre une valeur réelle (Ex: "Je t\'enseigne à gagner de l\'argent en ligne").'
          ] }
        ]
      }
    ]
  }
];

export const CONTENT_BY_LANGUAGE: Record<Language, SectionContent[]> = {
  pt: APP_CONTENT_PT,
  en: APP_CONTENT_EN,
  es: APP_CONTENT_ES,
  fr: APP_CONTENT_FR
};

export const APP_CONTENT = APP_CONTENT_PT; // Keep as default legacy export
