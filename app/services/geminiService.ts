'use server'
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Language } from '../types';

// IMPORTANT: Add your Google AI API key to the .env.local file
const API_KEY = process.env.GOOGLE_AI_API_KEY;

if (!API_KEY) {
  throw new Error("Missing GOOGLE_AI_API_KEY in .env.local");
}

const genAI = new GoogleGenerativeAI(API_KEY);

export async function generateItinerary(
  destination: string, 
  duration: string, 
  interests: string,
  language: Language
) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const languageMap = {
    en: 'English',
    ru: 'Russian',
    ka: 'Georgian'
  }

  const prompt = `
    You are an expert travel planner for Georgia (the country).
    Generate a concise, compelling, and well-structured travel itinerary based on the following details. 
    The output must be in ${languageMap[language]}.

    **Destination:** ${destination}
    **Trip Duration:** ${duration}
    **Main Interests:** ${interests}

    **Output Requirements:**
    - Start with a catchy, one-sentence headline.
    - Follow with a 2-3 sentence summary paragraph.
    - Provide a day-by-day breakdown (e.g., Day 1, Day 2). 
    - For each day, list 2-4 key activities or sights with brief, enticing descriptions.
    - Keep the total output under 200 words.
    - Format the output nicely using Markdown (headings, bold text, lists). 
    - Do not include any pre-amble or post-amble, just the itinerary itself.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    return text;
  } catch (error) {
    console.error("Error generating itinerary:", error);
    return "Sorry, I couldn't generate an itinerary at this time. Please try again later.";
  }
}
