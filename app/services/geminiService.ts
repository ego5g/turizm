import { GoogleGenAI } from "@google/genai";
import { Language } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const generateItinerary = async (
  destination: string,
  duration: string,
  interests: string,
  language: Language
): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';

    let langInstruction = "Respond in English.";
    let welcomeMessage = `Your name is Dato. Start with a warm, welcoming introduction.`;

    if (language === 'ru') {
      langInstruction = "Отвечай на русском языке.";
      welcomeMessage = `Тебя зовут Дато. Начни с теплого, приветственного вступления. Например: \"Добро пожаловать в гостеприимную Грузию! Меня зовут Дато, и я буду вашим личным гидом в этом незабываемом путешествии.\"`;
    }
    if (language === 'ka') {
      langInstruction = "უპასუხე ქართულ ენაზე.";
      welcomeMessage = `შენი სახელია დათო. დაიწყე თბილი, მისასალმებელი შესავლით.`;
    }

    const prompt = `
      Act as a professional and friendly Georgian tour guide. ${welcomeMessage}
      Create a detailed, high-quality ${duration} itinerary for visiting ${destination} in Georgia.
      The traveler is interested in: ${interests}.
      
      ${langInstruction}
      
      **VERY IMPORTANT: Format the response using Markdown.**
      
      Your response MUST include:
      1.  A creative and exciting title for the trip.
      2.  A detailed daily breakdown: Morning, Afternoon, and Evening activities.
      3.  Specific recommendations for local dishes or restaurants for each day.
      4.  Cultural tips or interesting facts about the places visited.
      5.  Estimated travel times between locations where applicable.
      
      Keep the tone very welcoming, personal, and exciting throughout. Make it sound like a real, passionate guide is talking.
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
