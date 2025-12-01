import { NextResponse } from 'next/server';
import { generateItinerary } from '../../services/geminiService';
import { Language } from '../../types';

export async function POST(req: Request) {
  try {
    const { destination, duration, interests, language } = await req.json();

    if (!destination || !duration || !interests || !language) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const itinerary = await generateItinerary(destination, duration, interests, language as Language);

    return NextResponse.json({ itinerary });

  } catch (error: any) {
    console.error("API Route Error:", error);
    // Now we correctly handle the thrown error from the service
    return NextResponse.json(
      { 
        error: error.message || 'An unexpected server error occurred.' 
      }, 
      { status: 500 }
    );
  }
}
