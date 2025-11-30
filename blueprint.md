# Overlook

This project is a Next.js application that integrates with Google's Gemini Pro API. It provides a simple chat interface for users to interact with the language model.

## Features and Style

*   **Chat Interface:** A clean and simple page with a text input for prompts and a display area for the model's responses.
*   **Next.js App Router:** Uses the latest Next.js features, including Server Components and Server Actions.
*   **Gemini Pro Integration:** Connects to the Google AI platform to leverage the Gemini Pro model for text generation.
*   **Styling:** Uses Tailwind CSS for a modern and responsive design.

## Current Plan

**Objective:** Integrate Gemini Pro to create a simple chat application.

**Steps:**

1.  **Install Dependencies:** Add the `@google/generative-ai` package to the project.
2.  **Create Chat UI:** Build a new page at `/app/chat/page.tsx` with a form for user input.
3.  **Implement Server Action:** Create a file at `/app/actions.ts` to handle the logic of calling the Gemini Pro API. This action will take the user's prompt and return the model's response.
4.  **Secure API Key:** Guide the user on how to create and use an environment variable for the Google AI Studio API key.
5.  **Connect UI and Action:** Link the form on the chat page to the server action and display the returned response.
