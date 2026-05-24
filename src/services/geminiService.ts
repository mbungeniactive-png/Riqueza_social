export async function chatWithMentor(
  messages: { role: 'user' | 'model', parts: { text: string }[] }[], 
  apiKey?: string
) {
  try {
    const response = await fetch("/api/gemini/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages })
    });

    if (!response.ok) {
      throw new Error("Erro na comunicação com o Mentor.");
    }

    return await response.text();
  } catch (error) {
    console.error("Gemini Client Error:", error);
    return "Desculpe, não consegui processar sua pergunta agora. Tente novamente em alguns instantes.";
  }
}

export async function chatWithMentorStream(
  messages: { role: 'user' | 'model', parts: { text: string }[] }[], 
  onChunk: (text: string) => void,
  apiKey?: string
) {
  try {
    const response = await fetch("/api/gemini/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages })
    });

    if (!response.ok) {
      const errorMsg = await response.text();
      throw new Error(errorMsg || "Erro ao conectar com o Mentor IA.");
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error("Resposta de streaming não suportada pelo navegador.");
    }

    const decoder = new TextDecoder();
    let done = false;
    let fullText = "";

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      if (value) {
        const chunkText = decoder.decode(value, { stream: !done });
        fullText += chunkText;
        onChunk(fullText);
      }
    }

    return fullText;
  } catch (error: any) {
    console.error("Gemini Stream Client Error:", error);
    onChunk("Ocorreu um erro ao falar com o Mentor. Verifique sua conexão ou tente novamente mais tarde.");
    throw error;
  }
}

export async function generateVideo(prompt: string, apiKey?: string) {
  try {
    const response = await fetch("/api/gemini/generate-video", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });

    if (!response.ok) {
      throw new Error("Erro ao iniciar geração de vídeo.");
    }

    const data = await response.json();
    return { name: data.operationName };
  } catch (error) {
    console.error("Video Client Error:", error);
    throw error;
  }
}

export async function checkVideoOperation(operationId: any, apiKey?: string) {
  const operationName = typeof operationId === 'object' ? operationId.name : operationId;
  try {
    const response = await fetch("/api/gemini/check-video", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ operationName })
    });

    if (!response.ok) {
      throw new Error("Erro ao checar status do vídeo.");
    }

    return await response.json();
  } catch (error) {
    console.error("Check Video Client Error:", error);
    throw error;
  }
}

export async function fetchVideoData(url: string, apiKey?: string) {
  try {
    const response = await fetch(`/api/gemini/download-video?url=${encodeURIComponent(url)}`);
    if (!response.ok) {
      throw new Error("Erro ao carregar vídeo.");
    }
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error("Fetch Video Client Error:", error);
    throw error;
  }
}

export async function getTikTokInsights(niche: string, apiKey?: string) {
  try {
    const response = await fetch("/api/gemini/tiktok-insights", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ niche })
    });

    if (!response.ok) {
      throw new Error("Erro ao obter insights do TikTok.");
    }

    return await response.json();
  } catch (error) {
    console.error("TikTok Insights Client Error:", error);
    throw error;
  }
}

export async function generateImage(prompt: string, apiKey?: string) {
  try {
    const response = await fetch("/api/gemini/generate-image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });

    if (!response.ok) {
      throw new Error("Erro ao gerar imagem.");
    }

    const data = await response.json();
    return data.imageUrl;
  } catch (error) {
    console.error("TikTok Insights Client Error:", error);
    throw error;
  }
}
