# Project managment commenting System

A React-based commenting system with real-time updates across multiple browser tabs.

## Features

-   ✅ **Comment Management**: Add, delete, and view comments
-   ✅ **Nested Comments**: Reply to existing comments with unlimited nesting
-   ✅ **Local Database**: Uses IndexedDB (Dexie) for persistent storage
-   ✅ **Real-time Updates**: Changes sync instantly across multiple tabs using BroadcastChannel API
-   ✅ **Modern UI**: Built with React 19, TypeScript, and Tailwind CSS
-   ✅ **Responsive Design**: Works seamlessly on desktop and mobile devices

## Real-time Updates

The system automatically synchronizes comments across multiple browser tabs in real-time:

-   **Adding Comments**: New comments appear instantly in all open tabs
-   **Replying to Comments**: New comment appear instantly under the parent comment
-   **Deleting Comments**: Deleted comments are removed from all tabs immediately
-   **Nested Replies**: All comment operations sync across tabs
-   **Visual Feedback**: Users see when updates are happening from other tabs

## Technology Stack

-   **Frontend**: React 19 + TypeScript + Vite
-   **Database**: IndexedDB via Dexie
-   **Styling**: Tailwind CSS
-   **Real-time**: BroadcastChannel API
-   **Icons**: Lucide React

## Getting Started

1. Install dependencies:

    ```bash
    npm install
    ```

2. Start development server:

    ```bash
    npm run dev
    ```

3. Open multiple browser tabs to test real-time functionality

## Browser Support

-   **Real-time Updates**: Chrome 54+, Firefox 38+, Safari 15.4+
-   **Database**: All modern browsers with IndexedDB support

## Project Structure

## Development

-   **Build**: `npm run build`
-   **Lint**: `npm run lint`
-   **Preview**: `npm run preview`
# nwtzbqws
