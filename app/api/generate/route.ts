import { NextResponse } from 'next/server';
import { generateItinerary } from '../../services/geminiService';
import { Language } from '../../types';

export async function POST(req: Request) {
  try {
    // 1. Get data from the client request
    const { destination, duration, interests, language } = await req.json();

    // 2. Validate the data
    if (!destination || !duration || !interests || !language) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 3. Call the dedicated service to handle AI generation
    const itinerary = await generateItinerary(destination, duration, interests, language as Language);

    // 4. Check if the service returned an error
    if (itinerary.startsWith("An error occurred")) {
      // The service already logged the detailed error, so we just return the user-friendly message
      return NextResponse.json({ error: itinerary }, { status: 500 });
    }

    // 5. Send the successful response back to the client
    return NextResponse.json({ itinerary });

  } catch (error: any) {
    // This will catch errors from req.json() or other unexpected issues
    console.error("API Route Critical Error:", error);
    return NextResponse.json({ error: `An unexpected server error occurred: ${error.message}` }, { status: 500 });
  }
}
