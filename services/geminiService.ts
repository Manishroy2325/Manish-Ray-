
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you'd handle this more gracefully.
  // For this environment, we assume the key is present.
  console.warn("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const getFitnessTip = async (prompt: string): Promise<string> => {
  if (!API_KEY) {
    return "API Key not configured. Please set the API_KEY environment variable.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are a friendly and encouraging fitness coach. A user has a question: "${prompt}". Provide a clear, concise, and helpful tip. Do not use markdown.`,
    });
    return response.text;
  } catch (error) {
    console.error("Error fetching from Gemini API:", error);
    if (error instanceof Error) {
        return `Sorry, I couldn't get a tip for you right now. Error: ${error.message}`;
    }
    return "Sorry, I couldn't get a tip for you right now. An unknown error occurred.";
  }
};
