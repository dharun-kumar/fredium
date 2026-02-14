# Fredium

A blog platform similar to Medium or Substack, built with Next.js, Prisma, and NextAuth.

## ⚠️ Important Note on Database & Persistence

To comply with the requirement of **not using a separate database instance**, this project uses **SQLite** (a file-based database).

**On Render's Free Tier**, the file system is **ephemeral**. This means:
- Any blog posts you create will be **deleted** whenever the site restarts (which happens at least once a day or on every deploy).
- To have permanent storage, you would normally need a separate database (like Render's Free PostgreSQL) or a paid plan with a persistent disk.

## Features

- **Read Anonymously**: Anyone can read stories without logging in.
- **Google OAuth**: Secure sign-in to write and manage your profile.
- **Publish Stories**: Easy-to-use editor.
- **Profile Management**: Customize your name, profile picture, and bio.

## How to get Google Client ID & Secret

To allow users to log in with Google, you need to create credentials in the Google Cloud Console:

1.  Go to the [Google Cloud Console](https://console.cloud.google.com/).
2.  Create a new project.
3.  Go to **APIs & Services > OAuth consent screen**.
    - Choose "External" and fill in the required app information.
    - Add the scope `.../auth/userinfo.email` and `.../auth/userinfo.profile`.
4.  Go to **APIs & Services > Credentials**.
    - Click **Create Credentials > OAuth client ID**.
    - Select **Web application**.
    - Add **Authorized JavaScript origins**: `http://localhost:3000` (and your Render URL later).
    - Add **Authorized redirect URIs**: `http://localhost:3000/api/auth/callback/google` (and `https://your-domain.onrender.com/api/auth/callback/google` later).
5.  Copy the **Client ID** and **Client Secret**.

## Getting Started Locally

1. **Install dependencies**: `npm install`
2. **Setup Auth**: Add `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` to `.env`.
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
- **Auth**: [NextAuth.js](https://next-auth.js.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
