# Blueprint

## Overview

This application is a travel guide for Georgia, designed to help users discover routes, plan trips with an AI assistant, and discuss their travel plans in a forum. It features a modern, responsive design, supports multiple languages, and provides an interactive and seamless user experience with background processing and local storage for travel plans.

## Style, Design, and Features

### General
- **Framework:** Next.js with App Router
- **Styling:** Tailwind CSS for a modern, utility-first approach.
- **UI:** Responsive design, ensuring a seamless experience on both mobile and desktop. Components are designed to be interactive and visually appealing, with a focus on clean layouts, good typography, and a vibrant color palette.
- **Internationalization (i18n):** The application supports multiple languages (English, Georgian, Russian) using a custom `LanguageContext`.
- **Visuals (In Progress):** A major visual enhancement is underway to create a more polished, premium, and aesthetically pleasing user interface.

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

## Previous Task: Add "Save Plan" Feature

### Goal
To add a "Save Plan" button and ensure the application builds successfully after a series of fixes related to internationalization (i18n) files.

### Steps Taken
1.  **Initial Attempt:** Added a "Save Plan" button to the planner UI, but encountered build failures due to missing translations.
2.  **Troubleshooting i18n:**
    - Identified that the `savePlan` key was missing from the `ru.ts` and `en.ts` translation files.
    - Attempted to add the keys, but introduced further build errors due to mismatched type definitions between the language files.
    - Discovered that the `backToCategory` key was missing from the `forum` object in the `ka.ts` file, and several planner-related keys were also absent.
3.  **Resolution:**
    - Corrected the `ru.ts` file by adding the missing `backToCategory` key to the `forum` object and ensuring correct syntax.
    - Fully updated the `ka.ts` file to match the structure of the `en.ts` (the reference file), adding all missing keys for `forum` and `planner` sections with their Georgian translations.
4.  **Final Build:** Ran `npm run build` successfully after unifying the structure of all translation files (`en.ts`, `ru.ts`, `ka.ts`).

### Outcome
The "Save Plan" functionality is now reflected in the codebase, and the application is stable and build-ready. The i18n system is robust and consistent across all supported languages.

## Current Task: Visual Design Enhancement

### Goal
To transform the application's visual design into a beautiful, premium, and highly polished user experience that is both modern and intuitive. The design will evoke the rich and authentic feel of Georgia.

### Plan
1.  **Establish a Design System:**
    - **Color Palette:** Introduce a sophisticated color palette.
        - **Primary:** A deep, rich maroon (`#5a0d27`), inspired by Georgian Saperavi wine, for key elements and accents.
        - **Secondary:** A warm beige (`#f5f5dc`) for backgrounds, providing a soft, tactile feel.
        - **Accent:** A vibrant gold (`#ffc72c`) for calls-to-action and highlights.
        - **Text:** Dark slate gray (`#2f4f4f`) for primary text and a lighter gray (`#708090`) for secondary text.
    - **Typography:** Implement a new font pairing to enhance readability and elegance.
        - **Headings:** Use 'Lora', a well-balanced contemporary serif with roots in calligraphy, for a touch of class.
        - **Body:** Use 'Inter', a clean, highly readable sans-serif font for all body text, UI elements, and components.
    - **Global Styles:** Update `app/globals.css` and `tailwind.config.ts` to reflect the new design system.

2.  **Redesign Core Components:**
    - **Layout & Header:** Update the main layout to use the new background color. Redesign the header for a cleaner look.
    - **Buttons & Inputs:** Create new styles for buttons and form inputs, featuring the new color palette, rounded corners, and subtle hover effects to improve interactivity.
    - **Cards:** Redesign the route and destination cards with soft, multi-layered drop shadows to create a "lifted" effect, rounded corners, and improved typography.
    - **Hero Section:** Revamp the homepage's hero section with more impactful typography and a stronger call-to-action.

3.  **Implementation:**
    - Modify `app/layout.tsx` to import the new Google Fonts.
    - Update `tailwind.config.ts` with the new color palette and font families.
    - Systematically refactor the `.tsx` components (`page.tsx`, `Header.tsx`, `RouteCard.tsx`, etc.) to apply the new utility classes for colors, fonts, shadows, and spacing.
