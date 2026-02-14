# Fredium

A blog platform similar to Medium or Substack, built with Next.js, Prisma, and NextAuth.

## 🚀 Features

- **Data Persistence**: Uses a persistent PostgreSQL database so your blogs are **not** deleted on redeploy.
- **Public Reading**: Anyone can read stories without logging in.
- **Google Sign-In (OAuth)**: Secure, free authentication.
- **Rich Text Editor**: Support for Markdown with live preview.
- **Image Support**: Paste images directly or upload from local (stored as Base64).
- **Profile Management**: Customize your name, profile picture, and bio.

## 🛠️ Setup Guide

### 1. Get Google Client ID & Client Secret
Follow the steps in the [Google Cloud Console](https://console.cloud.google.com/) to create an OAuth 2.0 Client ID.

### 2. Deployment on Render (To keep your blogs)

To ensure your blogs are saved permanently, you **must** use a PostgreSQL database. On Render, this is free.

#### Option A: Automatic (Recommended)
1.  Click **New +** > **Blueprint**.
2.  Connect this repository.
3.  Render will automatically create both the **Web Service** and the **Database** and link them together.

#### Option B: Manual (If you already created the Web Service)
1.  **Create a Database**: Click **New +** > **PostgreSQL**. Name it `fredium-db`.
2.  **Get the URL**: Once created, copy the **Internal Database URL**.
3.  **Link to Web Service**:
    - Go to your Web Service > **Environment**.
    - Add a new variable: `DATABASE_URL`.
    - Paste the **Internal Database URL** you just copied.
4.  **Add other variables**: `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `NEXTAUTH_SECRET`, and `NEXTAUTH_URL`.

### 🛑 Common Error: "Environment variable not found: DATABASE_URL"
This happens if you haven't linked your database to your web service. Follow the **Manual** steps above to fix it.

## Getting Started Locally

1. **Install dependencies**: `npm install`
2. **Setup Database**: Ensure you have a Postgres URL in your `.env`.
3. **Generate Client**: `npx prisma generate`
4. **Push Schema**: `npx prisma db push`
5. **Run the app**: `npm run dev`

## Tech Stack

- **Framework**: Next.js 15
- **Database**: PostgreSQL with Prisma
- **Auth**: NextAuth.js
- **Styling**: Tailwind CSS
