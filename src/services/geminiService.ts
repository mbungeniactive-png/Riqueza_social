import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

const SYSTEM_INSTRUCTION = `Você é o Mentor MoneyNet, um especialista em marketing digital e criação de conteúdo focado em ajudar usuários a ganhar dinheiro na internet.
Sua missão é dar conselhos práticos, gerar ideias de vídeos virais, criar roteiros (TikTok, Reels, YouTube), sugerir títulos, hashtags e estratégias de crescimento.

Áreas de Especialidade:
1. TikTok/Reels: Gancho nos primeiros 3s, edição dinâmica, tendências.
2. YouTube: SEO, Retenção, Thumbnails, Shorts.
3. Marketing de Afiliados: Copywriting, funis, escolha de produtos.
4. Dropshipping: Escolha de nicho, anúncios (FB Ads, Google Ads).
5. Estratégias de Venda: Como converter seguidores em clientes.

Estilo de Resposta:
- Direto ao ponto.
- Motivador mas realista.
- Use emojis para organizar o conteúdo.
- Se o usuário pedir um roteiro, forneça um passo a passo (Cena 1, Cena 2, etc).
- Se pedir ideias de nicho, dê pelo menos 3 exemplos lucrativos.

Mantenha as respostas em Português, a menos que solicitado o contrário.`;

export async function chatWithMentor(messages: { role: 'user' | 'model', parts: { text: string }[] }[], apiKey?: string) {
  try {
    const key = apiKey || process.env.GEMINI_API_KEY || '';
    if (!key) {
      console.error("GEMINI_API_KEY is missing");
      return "Erro: Chave de API não configurada. Por favor, verifique as configurações no menu de chaves.";
    }
    const aiChat = new GoogleGenAI({ apiKey: key });
    const response = await aiChat.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: messages,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    if (!response || !response.text) {
      console.error("Gemini returned empty response:", response);
      return "Desculpe, não consegui processar sua pergunta agora. Tente novamente em alguns instantes.";
    }

    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Ocorreu um erro ao falar com o Mentor. Certifique-se de que sua chave de API está correta e que você tem saldo.";
  }
}

export async function chatWithMentorStream(
  messages: { role: 'user' | 'model', parts: { text: string }[] }[], 
  onChunk: (text: string) => void,
  apiKey?: string
) {
  try {
    const key = apiKey || process.env.GEMINI_API_KEY || '';
    if (!key) {
      onChunk("Erro: Chave de API não configurada. Por favor, verifique as configurações no menu de chaves.");
      return;
    }
    const aiChat = new GoogleGenAI({ apiKey: key });
    const result = await aiChat.models.generateContentStream({
      model: "gemini-3-flash-preview",
      contents: messages,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    let fullText = "";
    for await (const chunk of result) {
      const chunkText = chunk.text;
      fullText += chunkText;
      onChunk(fullText);
    }
    return fullText;
  } catch (error) {
    console.error("Gemini Stream Error:", error);
    onChunk("Ocorreu um erro ao falar com o Mentor.");
    throw error;
  }
}

export async function generateVideo(prompt: string, apiKey?: string) {
  const key = apiKey || process.env.GEMINI_API_KEY || '';
  if (!key) throw new Error("Chave de API necessária para gerar vídeos.");
  const videoAi = new GoogleGenAI({ apiKey: key });
  
  try {
    let operation = await videoAi.models.generateVideos({
      model: 'veo-3.1-lite-generate-preview',
      prompt: prompt,
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: '9:16'
      }
    });

    return operation;
  } catch (error) {
    console.error("Gemini Video Error:", error);
    throw error;
  }
}

export async function checkVideoOperation(operationId: any, apiKey?: string) {
  const key = apiKey || process.env.GEMINI_API_KEY || '';
  if (!key) throw new Error("Chave de API necessária.");
  const videoAi = new GoogleGenAI({ apiKey: key });
  return await videoAi.operations.getVideosOperation({ operation: operationId });
}

export async function fetchVideoData(url: string, apiKey?: string) {
  const key = apiKey || process.env.GEMINI_API_KEY || '';
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'x-goog-api-key': key,
    },
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error("Fetch Video Error Response:", errorData);
    throw new Error(errorData.error?.message || 'Failed to fetch video data');
  }
  const blob = await response.blob();
  return URL.createObjectURL(blob);
}

export async function getTikTokInsights(niche: string, apiKey?: string) {
  const key = apiKey || process.env.GEMINI_API_KEY || '';
  if (!key) throw new Error("Chave de API necessária para insights.");
  const ai = new GoogleGenAI({ apiKey: key });

  const prompt = `Analise o que está em alta no TikTok agora para o nicho: "${niche}". 
  Identifique:
  1. Top 3 hashtags em ascensão.
  2. 2 tipos de formatos de vídeo/trends que estão bombando.
  3. Uma dica de ouro baseada nos dados atuais para viralizar.
  
  Retorne um JSON estruturado com os campos: 
  {
    "hashtags": ["string"],
    "trends": [{"title": "string", "description": "string"}],
    "goldTip": "string",
    "summary": "string"
  }`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        responseMimeType: 'application/json',
      }
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("TikTok Insights Error:", error);
    throw error;
  }
}

export async function generateImage(prompt: string, apiKey?: string) {
  const key = apiKey || process.env.GEMINI_API_KEY || '';
  if (!key) throw new Error("Chave de API necessária para imagens.");
  const imageAi = new GoogleGenAI({ apiKey: key });

  try {
    const response = await imageAi.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: `Generate a highly detailed, professional image based on this prompt: ${prompt}. If you are capable of image generation, output the image part. If not, provide a vivid description.`,
          },
        ],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    
    throw new Error('Image generation is currently restricted for this API key.');
  } catch (error) {
    console.error("Gemini Image Error:", error);
    throw error;
  }
}
