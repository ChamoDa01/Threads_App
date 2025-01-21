# Threads App

A full-stack clone of Threads, built with Next.js 14+, MongoDB, Shadcn UI, and TailwindCSS, with features like nested comments, real-time search, notifications, and more.

## Features

- **Authentication**: Login via email, password, Google, or GitHub using Clerk.
- **Threads**: Create and interact with threads, including nested comments.
- **User Search & Pagination**: Search and explore users with pagination.
- **Activity Page**: Notifications for thread interactions.
- **Community Management**: Create communities, invite members, and manage roles.
- **Profile Page**: User profile with modifiable settings.
- **Admin Tools**: Admins can manage threads and community members.
- **Real-Time Updates**: Real-time notifications with webhooks.

## Tech Stack

- **Frontend**: Next.js, React, Shadcn UI, TailwindCSS
- **Backend**: MongoDB, Clerk, Webhooks, Serverless APIs
- **Other**: TypeScript, Zod, React Hook Form, UploadThing

## Quick Start

### Prerequisites
Ensure you have the following installed:
- Git
- Node.js
- npm

### Setup
1. Clone the repo:
   ```bash
   git clone https://github.com/ChamoDa01/Threads_App.git
   cd threads
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
   
3. Set Up Environment Variables
   ```env
    MONGODB_URL=
    CLERK_SECRET_KEY=
    UPLOADTHING_SECRET=
    UPLOADTHING_APP_ID=
    NEXT_CLERK_WEBHOOK_SECRET=
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   ```
    Replace the placeholder values with your actual credentials. You can obtain these     credentials by signing up for the corresponding websites on [MongoDB](https://www.mongodb.com/), [Clerk](https://clerk.com/), and [Uploadthing](https://uploadthing.com/).

4. Running the Project:
   ```bash
    npm run dev
   ```
5. Open http://localhost:3000 in your browser to view the project.
