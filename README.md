# Fredium

A blog platform similar to Medium or Substack, built with Next.js, Prisma, and NextAuth.

## 🚀 Features

- **Public Reading**: Anyone can read stories without logging in.
- **Google Sign-In (OAuth)**: Secure, free, and easy authentication.
- **Rich Text Editor**: Support for Markdown with live preview.
- **Image Support**: Paste images directly or upload from local (stored as Base64).
- **Persistent Storage**: Uses PostgreSQL on Render to ensure your blogs are never lost.
- **Profile Management**: Customize your name, profile picture (local upload), and bio.

## 🛠️ Setup Guide

### 1. Get Google Client ID & Client Secret (100% Free)

1.  Go to the [Google Cloud Console](https://console.cloud.google.com/).
2.  Create a project named "Fredium".
3.  Go to **APIs & Services > OAuth consent screen**.
    - Choose **External**.
    - Fill in "App name" and your email.
4.  Go to **APIs & Services > Credentials**.
    - Click **Create Credentials > OAuth client ID**.
    - Select **Web application**.
    - **Authorized JavaScript origins**:
      - `http://localhost:3000`
      - `https://fredium.onrender.com` (Your actual Render URL)
    - **Authorized redirect URIs**:
      - `http://localhost:3000/api/auth/callback/google`
      - `https://fredium.onrender.com/api/auth/callback/google` (**IMPORTANT**: Must match your Render URL)
5.  Copy the **Client ID** and **Client Secret**.

### 2. Configure Environment Variables

#### For Local Development:
Create a `.env` file in the root folder:
```
DATABASE_URL="postgresql://user:password@localhost:5432/fredium"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="any-random-string"
GOOGLE_CLIENT_ID="your-id"
GOOGLE_CLIENT_SECRET="your-secret"
```

#### For Production (Render):
Add these in **Render Dashboard > Web Service > Environment**:
- `DATABASE_URL` (Auto-filled if using Render Postgres)
- `NEXTAUTH_URL`: Your site's URL (e.g., `https://fredium.onrender.com`)
- `NEXTAUTH_SECRET`: (A random string)
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`

## 📦 Deployment on Render

This project uses **Render PostgreSQL** to maintain data across redeploys.

1. Connect your GitHub repository to Render.
2. Render will detect `render.yaml` and create:
   - A **Web Service** (Next.js app)
   - A **PostgreSQL Database** (Persistent storage)
3. Ensure you update `NEXTAUTH_URL` and Google credentials in the Render dashboard.

## 💻 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) with [Prisma](https://www.prisma.io/)
- **Auth**: [NextAuth.js](https://next-auth.js.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with Typography plugin
