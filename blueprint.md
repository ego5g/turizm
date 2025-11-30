# Georgia Tour Guide - Application Blueprint

## 1. Overview

This application is a "Georgia Tour Guide" web app, designed to provide tourists with personalized travel itineraries. Leveraging the power of the Google Gemini Pro AI model, users can receive detailed travel plans by specifying their destination, trip duration, and interests. The application is built to be multilingual (supporting English, Russian, and Georgian) and features a modern, visually appealing, and responsive design, ensuring a seamless experience on both desktop and mobile devices.

## 2. Implemented Features & Design

### Core Technology

*   **Framework:** Next.js 14+ with App Router
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS for a utility-first styling approach.
*   **Deployment:** Configured for Vercel, utilizing serverless functions for backend logic.

### AI Itinerary Generation

*   **Core Feature:** The primary capability is the AI-powered generation of travel itineraries.
*   **Backend Logic:** A dedicated serverless function (`/app/api/generate/route.ts`) acts as a secure backend. It receives user requests from the client, adds the secret `GEMINI_API_KEY` (stored securely as an environment variable), and makes the API call to the Gemini Pro model. This prevents the API key from ever being exposed on the client-side.
*   **User Inputs:** The AI considers the user's desired `destination`, `duration`, and `interests` to create a tailored plan.

### User Interface & Components

*   **`ItineraryForm.tsx`:** A client-side interactive component (`"use client"`) that provides the user with a form to submit their travel preferences. It manages form state, loading indicators (disabling the button and showing a spinner), and displays any errors that occur during the generation process.
*   **`ItineraryDisplay.tsx`:** A component responsible for rendering the AI-generated itinerary. It uses the `react-markdown` library to safely convert the Markdown response from the AI into formatted HTML, providing a rich and readable layout.
*   **`Header.tsx`:** A shared navigation component that includes the application logo and the language switcher.
*   **`Footer.tsx`:** A shared footer component.

### Multilingual Support

*   **`LanguageContext.tsx`:** A React Context that manages the global language state (`en`, `ru`, `ka`) throughout the application.
*   **`LanguageSwitcher.tsx`:** A UI component that allows users to seamlessly switch between the supported languages.
*   **Persistence:** The user's language preference is saved to the browser's `localStorage`, ensuring that their selected language persists across visits.
*   **`translations.ts`:** A centralized file holding all static UI strings, organized by language, for easy management and scaling.

### Design Philosophy

*   **Aesthetics:** The UI is designed to be modern, clean, and visually engaging, using a combination of high-quality background imagery, iconography, and a well-balanced layout.
*   **Color Palette:** The palette is vibrant and energetic, designed to inspire a sense of adventure.
*   **Typography:** A clear and expressive typographic hierarchy is used to guide the user's attention, with distinct styles for hero titles, section headlines, and body text.
*   **Interactivity:** All interactive elements, like buttons and form fields, provide clear visual feedback (e.g., hover effects, focus rings, loading states) to enhance usability.
*   **Responsiveness:** The application is fully mobile-responsive, providing an optimal viewing and interaction experience on all screen sizes.

## 3. Current Task: Local Environment Setup

### Goal

To configure the project for local development, allowing the user to run the application on their own machine and test the AI features by securely using their Gemini API key.

### Plan

1.  **Create `.env.local`:** Create a `.env.local` file in the project's root directory. This file is specifically for local environment variables and is ignored by Git, ensuring keys are not committed.
2.  **Add API Key:** Add the line `GEMINI_API_KEY=` to the `.env.local` file.
3.  **Provide Instructions:** Instruct the user to paste their personal Gemini API key into the file and then run `npm install` followed by `npm run dev` to start the local development server.
