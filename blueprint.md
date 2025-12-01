# Blueprint

## Overview

This application is a travel guide for Georgia, designed to help users discover routes, plan trips with an AI assistant, and discuss their travel plans in a forum. It features a modern, responsive design, supports multiple languages, and provides an interactive and seamless user experience with background processing and local storage for travel plans.

## Style, Design, and Features

### General
- **Framework:** Next.js with App Router
- **Styling:** Tailwind CSS for a modern, utility-first approach.
- **UI:** Responsive design, ensuring a seamless experience on both mobile and desktop. Components are designed to be interactive and visually appealing, with a focus on clean layouts, good typography, and a vibrant color palette.
- **Internationalization (i18n):** The application supports multiple languages (English, Georgian, Russian) using a custom `LanguageContext`.

### Core Features
- **Homepage (`app/page.tsx`):**
    - A visually striking hero section.
    - An introduction to Georgia's main attractions.
    - A list of popular destinations.
- **Routes (`app/routes/page.tsx`):**
    - A dedicated page to browse various travel routes in Georgia.
    - Routes can be filtered by difficulty (Easy, Moderate, Hard).
    - Each route is displayed as a card with an image, title, description, duration, and difficulty.
- **AI Planner & History:**
    - **Personalized Guide:** The AI guide introduces itself as "Dato," adding a friendly and authentic Georgian touch.
    - **Background Generation:** AI itinerary generation is a non-blocking background process. Users can continue to navigate the site while their plan is being created.
    - **Notifications:** The application uses `react-hot-toast` to provide real-time feedback, notifying users when plan generation starts, completes, or encounters an error.
    - **Local Storage:** All generated travel plans are automatically saved to the browser's `localStorage`, ensuring they persist between sessions.
    - **History Sidebar (`app/components/HistorySidebar.tsx`):** A new sidebar, accessible from the header, displays a list of all saved travel plans. Users can view plan details, see their generation status (generating, completed, error), and clear their history.
    - **Centralized Logic (`app/hooks/useAiPlanner.ts`):** All logic for AI plan generation, state management, and interaction with `localStorage` is encapsulated in the `useAiPlanner` custom hook, providing a clean separation of concerns. This logic is made available globally through `AiPlannerContext`.
- **Forum (`app/forum/...`):**
    - A space for users to discuss travel plans.
    - Users can view existing topics, create new topics, and reply to discussions.
    - **(In Progress)** Data is being integrated with Firebase Realtime Database for persistence.

## Current Task: Enhanced AI Planner Experience

### Goal
To improve the user experience of the AI Planner by making it more interactive, non-blocking, and persistent. This involved changing the guide's name, implementing background generation, and adding a history feature.

### Steps Taken
1.  **Updated Guide Persona:**
    - Modified `app/services/geminiService.ts` to change the AI guide's persona to "Dato" and improved the prompt to generate more welcoming and detailed itineraries.

2.  **Implemented Background Generation & State Management:**
    - Installed `uuid` for unique plan IDs and `react-hot-toast` for notifications.
    - Created the `useAiPlanner.ts` custom hook to handle all planner-related logic:
        - Initiating API requests to `/api/generate`.
        - Managing the state of plans (generating, completed, error).
        - Storing and retrieving plans from `localStorage`.
        - Displaying toast notifications for user feedback.
    - Created `AiPlannerContext.tsx` to provide the hook's state and functions to the entire application.
    - Wrapped the root layout in `AiPlannerProvider` and added the `<Toaster />` component.

3.  **Refactored UI Components:**
    - Renamed `AIPlanner.tsx` to `AIPlannerForm.tsx` and simplified it to only be responsible for capturing user input and calling the `generatePlan` function from the shared context.
    - Created `HistorySidebar.tsx` to display the list of saved plans from the `useSharedAiPlanner` hook, allowing users to view details and manage their history.
    - Updated `Header.tsx` to include a `BookOpen` icon that toggles the `HistorySidebar`. The icon also displays a notification badge for new plans and a loading spinner during generation.

4.  **Integrated into Pages:**
    - Updated `app/routes/page.tsx` to use the new, simplified `<AIPlannerForm />`. The display of results is now handled by the history sidebar.

### Outcome
The AI Planner is now a much more powerful and user-friendly feature. The non-blocking UI, persistent history, and clear notifications create a polished and professional experience. The refactored code is clean, maintainable, and well-structured, using modern React patterns like hooks and context.
