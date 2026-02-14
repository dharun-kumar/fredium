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

## How to get Google Client ID & Secret (100% Free)

You don't need to pay for Google Cloud to use Sign-In. It's a free service for hobby projects.

1.  Go to the [Google Cloud Console](https://console.cloud.google.com/).
2.  Create a new project (name it "Fredium").
3.  Go to **APIs & Services > OAuth consent screen**.
    - Choose **External**.
    - Fill in "App name" (Fredium) and your email.
4.  Go to **APIs & Services > Credentials**.
    - Click **Create Credentials > OAuth client ID**.
    - Select **Web application**.
    - **Authorized JavaScript origins**:
      - `http://localhost:3000`
      - `https://your-domain.onrender.com` (your Render URL)
    - **Authorized redirect URIs**:
      - `http://localhost:3000/api/auth/callback/google`
      - `https://your-domain.onrender.com/api/auth/callback/google`
5.  Copy the **Client ID** and **Client Secret** into your `.env` file.

## Getting Started Locally

1. **Install dependencies**: `npm install`
2. **Setup .env**: Copy `.env.example` to `.env` and add your Google credentials.
3. **Setup Database**: `npx prisma db push`
4. **Run the app**: `npm run dev`

## Deployment on Render

1. Connect your GitHub repository to Render.
2. Render will use `render.yaml` to build the site.
3. **In the Render Dashboard**:
   - Set `NEXTAUTH_URL` to your actual domain.
   - Set `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Database**: [SQLite](https://www.sqlite.org/) with [Prisma](https://www.prisma.io/)
- **Auth**: [NextAuth.js](https://next-auth.js.org/) with Google Provider
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
