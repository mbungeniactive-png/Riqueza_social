import express from "express";
import path from "path";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Helper to safely parse JSON responses from Gemini, stripping any potential markdown backticks
function parseJSONSafely(text: string | null | undefined): any {
  if (!text) return {};
  let cleaned = text.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\n?/i, "");
    cleaned = cleaned.replace(/\n?```$/i, "");
    cleaned = cleaned.trim();
  }
  try {
    return JSON.parse(cleaned);
  } catch (err) {
    console.error("Failed to parse JSON directly:", err, "Original text:", text);
    return {
      hashtags: ["marketing", "viral", "tiktok"],
      trends: [
        { title: "Vídeos Narrados", description: "Use voz de IA para contar uma curiosidade sobre o assunto." },
        { title: "Antes vs Depois", description: "Mostre uma transformação ou contraste nítido." }
      ],
      goldTip: "Mantenha a atenção total nos primeiros 3 segundos para reter seu público e aumentar as chances de viralizar.",
      summary: "Análise prévia do nicho fornecida como alternativa rápida."
    };
  }
}

// Create Vite server in development
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with telemetry headers
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

const SYSTEM_INSTRUCTION = `Você é o Mentor MoneyNet, um especialista em marketing digital e criação de conteúdo focado em ajudar usuários a ganhar dinheiro na internet.
Sua missão é dar conselhos práticos, gerar ideias de vídeos virais, criar roteiros (TikTok, Reels, YouTube), sugerir títulos, hashtags e estratégias de crescimento.

Áreas de Especialidade:
1. TikTok/Reels: Gancho nos primeiros 3s, edição dinâmica, tendências.
2. YouTube: SEO, Retenção, Thumbnails, Shorts.
3. Marketing de Afiliados: Copywriting, funis, escolha de produtos.
4. Dropshipping: Escolha de nicho, anúncios (FB Ads, Google Ads).
5. Estratégias de Venda: Como converter seguidores em clientes.

Estilo de Resposta:
- Direto ao ponto e de alto nível.
- Mantenha uma organização de texto impecável e extremamente bem-estruturada.
- Use cabeçalhos claros com letras maiúsculas (UPPERCASE) para destacar seções ou títulos grandes (ex: PASSA-A-PASSO, ROTEIRO PARTE 1, SACADA DE OURO:), tornando a leitura limpa, elegante e original.
- IMPORTANTE: Evite poluir suas respostas com excesso de asteriscos (**) ou símbolos de markdown (#). Prefira termos limpos e use letras grandes/maiúsculas ou marcadores com emojis de forma original e profissional para destacar as coisas.
- Se o usuário pedir um roteiro, forneça um roteiro passo a passo com seções claras.
- Se pedir ideias de nicho, dê exemplos práticos e lucrativos.

Mantenha as respostas em Português, a menos que solicitado o contrário.`;

// 1. API: Chat Streaming endpoint
app.post("/api/gemini/chat", async (req, res) => {
  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Messages array is required." });
  }

  try {
    const key = process.env.GEMINI_API_KEY || "";
    if (!key) {
      return res.status(500).json({ error: "Chave de API não configurada no servidor." });
    }

    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Transfer-Encoding", "chunked");

    const result = await ai.models.generateContentStream({
      model: "gemini-3.5-flash",
      contents: messages,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    for await (const chunk of result) {
      if (chunk.text) {
        res.write(chunk.text);
      }
    }
    res.end();
  } catch (error: any) {
    console.error("Gemini stream error in server:", error);
    // Write error message chunk to stream or return standard status
    if (!res.headersSent) {
      res.status(500).json({ error: error?.message || "Ocorreu um erro ao gerar conteúdo." });
    } else {
      res.write("\n\n[Erro no Servidor: Não foi possível continuar gerando a resposta.]");
      res.end();
    }
  }
});

// 2. API: TikTok Insights endpoint
app.post("/api/gemini/tiktok-insights", async (req, res) => {
  const { niche } = req.body;
  if (!niche) {
    return res.status(400).json({ error: "Niche is required." });
  }

  try {
    const prompt = `Analise o que está em alta no TikTok agora para o nicho: "${niche}". 
Identifique:
1. Top 3 hashtags em ascensão.
2. 2 tipos de formatos de vídeo/trends que estão bombando.
3. Uma dica de ouro baseada nos dados atuais para viralizar.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            hashtags: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Lista com as top 3 hashtags mais importantes e relevantes.",
            },
            trends: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING, description: "Título do formato/tendência de conteúdo." },
                  description: { type: Type.STRING, description: "Instruções claras de como o usuário pode criar um vídeo com essa tendência." },
                },
                required: ["title", "description"],
              },
              description: "Lista de 2 tipos de formatos ou ideias de vídeo/trends.",
            },
            goldTip: {
              type: Type.STRING,
              description: "Dica avançada profissional de ouro para aumentar o engajamento e a conversão do nicho.",
            },
            summary: {
              type: Type.STRING,
              description: "Resumo explicativo do porquê esse nicho está performando tão bem no TikTok Atualmente.",
            },
          },
          required: ["hashtags", "trends", "goldTip", "summary"],
        },
      },
    });

    const parsedData = parseJSONSafely(response.text);
    res.json(parsedData);
  } catch (error: any) {
    console.error("TikTok Insights Error:", error);
    res.status(500).json({ error: error.message || "Erro nos insights do TikTok." });
  }
});

// 3. API: Generate Video endpoint
app.post("/api/gemini/generate-video", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required." });
  }

  try {
    const operation = await ai.models.generateVideos({
      model: "veo-3.1-lite-generate-preview",
      prompt: prompt,
      config: {
        numberOfVideos: 1,
        resolution: "720p",
        aspectRatio: "9:16",
      },
    });

    res.json({ operationName: operation.name });
  } catch (error: any) {
    console.error("Video Generation Error:", error);
    res.status(500).json({ error: error.message || "Erro ao gerar vídeo." });
  }
});

// 4. API: Check Video Operation
app.post("/api/gemini/check-video", async (req, res) => {
  const { operationName } = req.body;
  if (!operationName) {
    return res.status(400).json({ error: "Operation name is required." });
  }

  try {
    const op = { name: operationName };
    const updated = await ai.operations.getVideosOperation({ operation: op as any });
    res.json({ done: updated.done, response: updated.response });
  } catch (error: any) {
    console.error("Check Video Error:", error);
    res.status(500).json({ error: error.message || "Erro ao checar operação." });
  }
});

// 5. API: Download/Proxy Video
app.get("/api/gemini/download-video", async (req, res) => {
  const url = req.query.url as string;
  if (!url) {
    return res.status(400).json({ error: "URL is required." });
  }

  try {
    const key = process.env.GEMINI_API_KEY || "";
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-goog-api-key": key,
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: "Failed to download video from upstream." });
    }

    res.setHeader("Content-Type", "video/mp4");
    const arrayBuffer = await response.arrayBuffer();
    res.send(Buffer.from(arrayBuffer));
  } catch (error: any) {
    console.error("Download video proxy error:", error);
    res.status(500).json({ error: error.message || "Erro no proxy do vídeo." });
  }
});

// 6. API: Generate Image endpoint
app.post("/api/gemini/generate-image", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required." });
  }

  try {
    const response = await ai.models.generateContent({
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
        return res.json({ imageUrl: `data:image/png;base64,${part.inlineData.data}` });
      }
    }
    
    throw new Error('Image generation is currently restricted for this API key.');
  } catch (error: any) {
    console.error("Gemini Image Error:", error);
    res.status(500).json({ error: error.message || "Erro ao gerar imagem." });
  }
});

// Vite & Static file serving setup
async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

setupVite().catch((err) => {
  console.error("Failed to boot Vite server middleware:", err);
});
