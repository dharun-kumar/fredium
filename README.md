# Fredium

A blog platform similar to Medium or Substack, built with Next.js, Prisma, and NextAuth.

## Features

- **Google OAuth**: Secure sign-in using Google.
- **Publish Stories**: Any logged-in user can publish their stories.
- **Profile Management**: Customize your name, profile picture, and bio.
- **Responsive Design**: Built with Tailwind CSS.

## Storage and Database

This project uses **Prisma** as an ORM and **PostgreSQL** for data persistence.

**Note on Render Free Tier**:
Render's Free Web Services have an ephemeral file system. This means if we used a local database like SQLite, all data would be lost every time the server restarts or redeploys. To ensure your blogs are saved permanently, we use **Render's Free PostgreSQL service**, which provides persistent storage even on the free plan.

## Getting Started

1. **Clone the repository**
2. **Install dependencies**: `npm install`
3. **Setup Database**:
   - Provide a `DATABASE_URL` in `.env`.
   - Run migrations: `npx prisma db push`
4. **Setup Auth**:
   - Create a project on [Google Cloud Console](https://console.cloud.google.com/).
   - Configure OAuth consent screen and create credentials.
   - Add `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` to `.env`.
5. **Run the app**: `npm run dev`

## Deployment on Render

This project is ready to be deployed on Render using the included `render.yaml`.

1. Connect your GitHub repository to Render.
2. Render will automatically detect the `render.yaml` and setup the Web Service and PostgreSQL database.
3. **Important**:
   - Update `NEXTAUTH_URL` in the Render dashboard to your actual domain.
   - Add your `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in the Render environment variables.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) with [Prisma](https://www.prisma.io/)
- **Auth**: [NextAuth.js](https://next-auth.js.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
