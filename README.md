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
      - `https://your-app-name.onrender.com`
    - **Authorized redirect URIs**:
      - `http://localhost:3000/api/auth/callback/google`
      - `https://your-app-name.onrender.com/api/auth/callback/google`
5.  After clicking "Create", a popup will show your **Client ID** and **Client Secret**. (If you miss it, click the Pencil icon next to the ID).

### 2. Configure Environment Variables Locally

1.  In the **root folder** of this project, create a file named `.env`.
2.  Copy these lines into `.env` and fill them in:
    ```
    DATABASE_URL="file:./dev.db"
    NEXTAUTH_URL="http://localhost:3000"
    NEXTAUTH_SECRET="any-random-string"
    GOOGLE_CLIENT_ID="your-id"
    GOOGLE_CLIENT_SECRET="your-secret"
    ```

---

## 🚀 How to Deploy on Render (Step-by-Step)

If you see a "Dockerfile not found" error, it means you selected Docker. **Do NOT use Docker.** Follow these steps:

1.  Push this code to your GitHub repository.
2.  Log in to [Render](https://dashboard.render.com/).
3.  Click **New +** > **Web Service**.
4.  Connect your GitHub repository.
5.  On the configuration page:
    - **Name**: `fredium`
    - **Region**: Choose the one closest to you.
    - **Runtime**: **Node** (NOT Docker).
    - **Build Command**: `npm install && npx prisma generate && npx prisma db push && npm run build`
    - **Start Command**: `npm run start`
    - **Instance Type**: **Free**
6.  Click **Advanced** and add the following **Environment Variables**:
    - `NODE_VERSION`: `20`
    - `NEXTAUTH_SECRET`: (Generate a random string)
    - `NEXTAUTH_URL`: (Your Render URL, e.g., `https://fredium-xyz.onrender.com`)
    - `GOOGLE_CLIENT_ID`: (From Google Console)
    - `GOOGLE_CLIENT_SECRET`: (From Google Console)
7.  Click **Create Web Service**.

---

## Getting Started Locally

1. **Install dependencies**: `npm install`
2. **Setup Database**: `npx prisma db push`
3. **Run the app**: `npm run dev`

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Database**: [SQLite](https://www.sqlite.org/) with [Prisma](https://www.prisma.io/)
- **Auth**: [NextAuth.js](https://next-auth.js.org/) with Google Provider
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
