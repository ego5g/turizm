import { GoogleGenAI } from "@google/genai";
import { Language } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const generateItinerary = async (destination: string, duration: string, interests: string, language: Language): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    
    let langInstruction = "Respond in English.";
    if (language === 'ru') langInstruction = "Отвечай на русском языке.";
    if (language === 'ka') langInstruction = "უპასუხე ქართულ ენაზე.";

    const prompt = `
      Act as a professional Georgian tour guide.
      Create a detailed ${duration} itinerary for visiting ${destination} in Georgia.
      The traveler is interested in: ${interests}.
      
      ${langInstruction}
      Format the response using Markdown.
      Include:
      - Daily breakdown (Morning, Afternoon, Evening)
      - Recommended local dishes to try
      - Estimated travel times between spots
      
      Keep the tone welcoming and exciting.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "Sorry, I couldn't generate an itinerary at this time. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "An error occurred while contacting the AI guide. Please check your connection or API key.";
  }
};
