import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { image, mimeType } = req.body;
    if (!image || !mimeType) {
      return res.status(400).json({ error: "Missing image data or mime type." });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: "GEMINI_API_KEY is missing in environment variables." });
    }

    const prompt = "You are an expert agricultural scientist. Analyze this crop image precisely and provide a diagnosis.";

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
            severity: { type: Type.STRING, enum: ["Mild", "Moderate", "Severe"] },
            treatment: { type: Type.ARRAY, items: { type: Type.STRING } },
            prevention: { type: Type.ARRAY, items: { type: Type.STRING } },
            urdu_summary: { type: Type.STRING }
          },
          required: ["disease", "cause", "severity", "treatment", "prevention", "urdu_summary"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No data received from AI.");
    
    res.status(200).json(JSON.parse(text));
  } catch (error: any) {
    console.error("Diagnosis Error:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
}
