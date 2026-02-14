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
      - `https://your-domain.onrender.com` (your Render URL)
    - **Authorized redirect URIs**:
      - `http://localhost:3000/api/auth/callback/google`
      - `https://your-domain.onrender.com/api/auth/callback/google`
5.  After clicking "Create", a popup will show your **Client ID** and **Client Secret**.
    - *If you missed it*: Click the **Pencil icon (Edit)** next to your client ID in the Credentials list to see the Secret again.

### 2. Configure Environment Variables

#### For Local Development:
1.  In the **root folder** of this project (where `package.json` is), create a new file named `.env`.
2.  Open `.env.example` and copy everything into your new `.env` file.
3.  Fill in your Google Client ID and Secret.
4.  Set `NEXTAUTH_SECRET` to any random string (e.g., `secret123`).

#### For Production (Render):
Do **NOT** upload your `.env` file to GitHub. Instead:
1.  Go to your **Render Dashboard**.
2.  Select your Web Service > **Environment**.
3.  Add the variables:
    - `GOOGLE_CLIENT_ID`
    - `GOOGLE_CLIENT_SECRET`
    - `NEXTAUTH_URL`: Your site's URL (e.g., `https://fredium.onrender.com`)
    - `NEXTAUTH_SECRET`: A random secret string.

## Getting Started Locally

1. **Install dependencies**: `npm install`
2. **Setup Database**: `npx prisma db push`
3. **Run the app**: `npm run dev`

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Database**: [SQLite](https://www.sqlite.org/) with [Prisma](https://www.prisma.io/)
- **Auth**: [NextAuth.js](https://next-auth.js.org/) with Google Provider
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
