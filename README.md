# Fredium

A blog platform similar to Medium or Substack, built with Next.js, Prisma, and NextAuth.

## ⚠️ Important Note on Database & Persistence

This project uses **SQLite** (a file-based database) to avoid needing a separate database server.

**On Render's Free Tier**, the file system is **ephemeral**. This means:
- Any blog posts you create will be **deleted** whenever the site restarts (which happens at least once a day or on every deploy).
- For a hobby project, this is fine for testing. For a real blog, you would need a persistent database.

## Features

- **Public Reading**: Anyone can read stories without logging in.
- **Magic Link Auth**: Sign in using just your email (no passwords, no Google Cloud needed).
- **Publish Stories**: Easy-to-use editor.
- **Profile Management**: Customize your name, profile picture, and bio.

## How to setup Free Email Authentication

You have two main free options to send magic links:

### Option A: Using Resend (Recommended)
1.  Go to [Resend](https://resend.com/) and create a free account.
2.  Get your **API Key**.
3.  In your environment variables, set:
    - `EMAIL_SERVER_HOST`: `smtp.resend.com`
    - `EMAIL_SERVER_PORT`: `465`
    - `EMAIL_SERVER_USER`: `resend`
    - `EMAIL_SERVER_PASSWORD`: (Your Resend API Key)
    - `EMAIL_FROM`: `onboarding@resend.dev` (or your verified domain)

### Option B: Using Gmail (Zero Cost)
1.  Use a Gmail account.
2.  Enable **2-Step Verification** in your Google Account settings.
3.  Go to **App Passwords** and generate a new password for "Mail".
4.  In your environment variables, set:
    - `EMAIL_SERVER_HOST`: `smtp.gmail.com`
    - `EMAIL_SERVER_PORT`: `465`
    - `EMAIL_SERVER_USER`: (Your Gmail Address)
    - `EMAIL_SERVER_PASSWORD`: (The 16-character App Password)
    - `EMAIL_FROM`: (Your Gmail Address)

## Getting Started Locally

1. **Install dependencies**: `npm install`
2. **Setup .env**: Copy `.env.example` to `.env` and fill in your email settings.
3. **Setup Database**: `npx prisma db push`
4. **Run the app**: `npm run dev`

## Deployment on Render

1. Connect your GitHub repository to Render.
2. Render will use `render.yaml` to build the site.
3. **In the Render Dashboard**:
   - Set `NEXTAUTH_URL` to your actual domain.
   - Fill in all the `EMAIL_SERVER_...` environment variables.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Database**: [SQLite](https://www.sqlite.org/) with [Prisma](https://www.prisma.io/)
- **Auth**: [NextAuth.js](https://next-auth.js.org/) with Email Provider
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
