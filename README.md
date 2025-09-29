# TripEase Checklist

Welcome to TripEase Checklist, your smart travel companion for packing perfectly. This application helps you generate personalized travel checklists based on your trip details using generative AI.

## Core Features

-   **Travel Input Collection**: Collect travel details like destination, purpose of travel, and travel dates.
-   **Dynamic Traveler Details**: Add multiple travelers to a trip, specifying their name and relationship, to get a checklist tailored for the whole group.
-   **AI-Powered Checklist Generation**: Leverages a generative AI model to create a personalized travel checklist based on your inputs.
-   **Data Persistence**: Uses Firebase Firestore to save generated checklists, so your data is safe.
-   **User Authentication**: Secure user sign-up and login using Firebase Authentication with Google as a provider.
-   **Interactive UI**: A clean, tab-based interface to switch between exploring destinations and managing your checklists.

## Tech Stack

-   **Framework**: [Next.js](https://nextjs.org/) (with App Router)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/) with [ShadCN UI](https://ui.shadcn.com/) components
-   **Backend & Database**: [Firebase](https://firebase.google.com/) (Authentication and Firestore)
-   **Generative AI**: [Genkit](https://firebase.google.com/docs/genkit)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)

## Getting Started

The application is configured to work with a Firebase backend.

### Prerequisites

1.  **Firebase Project**: The app is connected to the Firebase project `studio-8101432412-26f20`.
2.  **Authentication**: Make sure to enable **Google Sign-In** in the Firebase console under **Authentication > Sign-in method**.
3.  **Authorized Domains**: Add `localhost` to the list of authorized domains in **Authentication > Settings**.
4.  **Firestore Rules**: For development, you can use the following open rules. Remember to secure these before going to production.

    ```
    rules_version = '2';
    service cloud.firestore {
      match /databases/{database}/documents {
        match /checklists/{checklistId} {
          allow read, write: if true;
        }
      }
    }
    ```

### Running the Application

To get started, take a look at `src/app/page.tsx`, which is the main entry point of the application.
