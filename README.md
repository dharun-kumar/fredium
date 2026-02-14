# Fredium

A blog platform similar to Medium or Substack, built with Next.js, Prisma, and NextAuth.

## ⚠️ Important Note on Database

To keep this project running on a **single free instance** without extra servers, it uses **SQLite** (a file-based database).

**On Render's Free Tier**, the file system is **ephemeral**. This means:
- Any blog posts you create will be **deleted** whenever the site restarts (which happens once a day or on every deploy).
- This is perfect for a hobby project to learn. For a permanent blog, you would eventually need a separate database.

## Features

- **Public Reading**: Anyone can read stories without logging in.
- **Google Sign-In (OAuth)**: Secure, free, and easy authentication handled by Google.
- **Publish Stories**: Easy-to-use editor.
- **Profile Management**: Customize your name, profile picture, and bio.

## 🛠️ Setup Guide

### 1. Get Google Client ID & Client Secret (100% Free)

You don't need to pay for Google Cloud to use Sign-In. It's a free service for hobby projects.

1.  Go to the [Google Cloud Console](https://console.cloud.google.com/).
2.  Create a project (name it "Fredium").
3.  Go to **APIs & Services > OAuth consent screen**.
    - Choose **External**.
    - Fill in "App name" (Fredium) and your email.
4.  Go to **APIs & Services > Credentials**.
    - Click **Create Credentials > OAuth client ID**.
    - Select **Web application**.
    - **Authorized JavaScript origins**:
      - `http://localhost:3000`
      - `https://fredium.onrender.com` (Replace with your actual Render URL)
    - **Authorized redirect URIs**:
      - `http://localhost:3000/api/auth/callback/google`
      - `https://fredium.onrender.com/api/auth/callback/google` (**CRITICAL**: Replace `fredium.onrender.com` with your actual Render URL)
5.  After clicking "Create", a popup will show your **Client ID** and **Client Secret**.

### 2. Configure Environment Variables

#### For Local Development:
1.  In the **root folder**, create a file named `.env`.
2.  Copy these lines into `.env`:
    ```
    DATABASE_URL="file:./dev.db"
    NEXTAUTH_URL="http://localhost:3000"
    NEXTAUTH_SECRET="any-random-string"
    GOOGLE_CLIENT_ID="your-id"
    GOOGLE_CLIENT_SECRET="your-secret"
    ```

#### For Production (Render):
1.  Go to your **Render Dashboard > Web Service > Environment**.
2.  Add:
    - `NEXTAUTH_URL`: `https://fredium.onrender.com` (Your actual URL)
    - `NEXTAUTH_SECRET`: (A random secret)
    - `GOOGLE_CLIENT_ID`: (From Google)
    - `GOOGLE_CLIENT_SECRET`: (From Google)

## Getting Started Locally

1. **Install dependencies**: `npm install`
2. **Setup Database**: `npx prisma db push`
3. **Run the app**: `npm run dev`

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Database**: [SQLite](https://www.sqlite.org/) with [Prisma](https://www.prisma.io/)
- **Auth**: [NextAuth.js](https://next-auth.js.org/) with Google Provider
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
