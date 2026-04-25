import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

// Increase payload limit for base64 images
app.use(express.json({ limit: "10mb" }));

// Initialize Gemini Client
let genAI: any = null;
function getAI() {
  if (!genAI) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is missing. Please set it in the Secrets panel.");
    }
    genAI = new GoogleGenAI({ apiKey });
  }
  return genAI;
}

// Secure API Route
app.post("/api/diagnose", async (req, res) => {
  try {
    const { image, mimeType } = req.body;
    if (!image || !mimeType) {
      return res.status(400).json({ error: "Missing image data or mime type." });
    }

    const ai = getAI();
    const prompt = "You are an expert agricultural scientist with 20 years of experience. Analyze this crop image precisely and provide a diagnosis.";

    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash", 
      contents: [
        {
          parts: [
            { text: prompt },
            { inlineData: { data: image, mimeType } }
          ]
        }
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            disease: { type: Type.STRING },
            cause: { type: Type.STRING },
            severity: { 
              type: Type.STRING,
              enum: ["Mild", "Moderate", "Severe"]
            },
            treatment: { 
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of 5 treatment steps"
            },
            prevention: { 
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of 3 prevention tips"
            },
            urdu_summary: { type: Type.STRING, description: "Key points in simple Urdu" }
          },
          required: ["disease", "cause", "severity", "treatment", "prevention", "urdu_summary"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No data received from AI.");
    
    res.json(JSON.parse(text));
  } catch (error: any) {
    console.error("Diagnosis Error:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});

async function startServer() {
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
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
